import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDefaultRouteForRole } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

export default function SetPassword() {
  const navigate = useNavigate();
  const { session, role, loading, refreshProfile, isConfigured } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!session || !role) {
      return;
    }

    if (success) {
      navigate(getDefaultRouteForRole(role), { replace: true });
    }
  }, [navigate, role, session, success]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }

    if (password.length < 8) {
      setError('Use at least 8 characters for the password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setSubmitting(false);
      setError(updateError.message);
      return;
    }

    await refreshProfile();
    setSubmitting(false);
    setSuccess('Password updated successfully.');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden font-body text-on-background antialiased">
      <div className="fixed inset-0 z-0">
        <img src="/images/s6/1.jpg" alt="Set password" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,18,38,0.72)] to-[rgba(15,39,64,0.25)] backdrop-blur-[2px]" />
      </div>

      <section className="relative z-10 w-full max-w-xl bg-surface/90 backdrop-blur-2xl rounded-xl shadow-ambient p-8 md:p-16">
        <div className="mb-10 text-center">
          <span className="font-headline font-black text-primary tracking-tighter text-3xl mb-6 block">Lumimar</span>
          <h1 className="font-headline font-bold text-primary text-4xl tracking-tight mb-4">Set Your Password</h1>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
            Complete your account setup by choosing the password you will use for future sign-ins.
          </p>
        </div>

        {!isConfigured ? (
          <p className="text-sm text-error">Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` before using account setup.</p>
        ) : null}

        {!isConfigured || (!session && !loading) ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-error">This setup link is missing or has expired. Request a fresh invite or password reset.</p>
            <Link to="/owner/login" className="inline-flex text-primary font-semibold hover:underline">
              Back to owner login
            </Link>
          </div>
        ) : null}

        {loading ? (
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/15 border-t-primary animate-spin" />
            <p className="mt-4 text-sm text-on-surface-variant">Loading account setup...</p>
          </div>
        ) : null}

        {session && isConfigured && !loading ? (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-semibold text-outline mb-2 ml-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/30 py-4 px-1 text-primary focus:outline-none focus:border-primary transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-semibold text-outline mb-2 ml-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/30 py-4 px-1 text-primary focus:outline-none focus:border-primary transition-all duration-300"
                required
              />
            </div>

            {error ? <p className="text-sm text-error">{error}</p> : null}
            {success ? <p className="text-sm text-primary">{success}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-container text-surface py-5 rounded-lg font-semibold tracking-wide hover:bg-primary active:scale-[0.98] transition-all duration-300 shadow-ambient disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving Password...' : 'Save Password'}
            </button>
          </form>
        ) : null}
      </section>
    </div>
  );
}
