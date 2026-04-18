import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDefaultRouteForRole, isRoleAllowed } from '../../lib/auth';
import type { AppRole } from '../../lib/database.types';

type AuthLoginPageProps = {
  allowedRoles: AppRole[];
  portalTitle: string;
  heading: string;
  description: string;
  backgroundImage: string;
  supportLink?: {
    label: string;
    to: string;
    prefix: string;
  };
  badgeLabel: string;
};

export default function AuthLoginPage({
  allowedRoles,
  portalTitle,
  heading,
  description,
  backgroundImage,
  supportLink,
  badgeLabel,
}: AuthLoginPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, session, role, loading, error: authError, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!session || !role) {
      return;
    }

    const requestedPath = typeof location.state?.from === 'string' ? location.state.from : null;
    const nextPath = requestedPath && isRoleAllowed(role, allowedRoles) ? requestedPath : getDefaultRouteForRole(role);
    navigate(nextPath, { replace: true });
  }, [allowedRoles, location.state, navigate, role, session]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const nextError = await signIn({ email, password });

    setSubmitting(false);

    if (nextError) {
      setFormError(nextError);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden font-body text-on-background antialiased">
      <div className="fixed inset-0 z-0">
        <img src={backgroundImage} alt={portalTitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,18,38,0.72)] to-[rgba(15,39,64,0.25)] backdrop-blur-[2px]" />
      </div>

      <section className="relative z-10 w-full max-w-xl bg-surface/90 backdrop-blur-2xl rounded-xl shadow-ambient p-8 md:p-16 flex flex-col items-center">
        <div className="mb-12 text-center">
          <span className="font-headline font-black text-primary tracking-tighter text-3xl mb-8 block">{portalTitle}</span>
          <h1 className="font-headline font-bold text-primary text-4xl md:text-5xl tracking-tight mb-4">{heading}</h1>
          <p className="text-on-surface-variant text-base md:text-lg max-w-sm leading-relaxed mx-auto">{description}</p>
        </div>

        <form className="w-full space-y-8" onSubmit={handleSubmit}>
          <div className="group">
            <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-semibold text-outline mb-2 ml-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/30 py-4 px-1 text-primary focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline/40"
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex justify-between items-center mb-2">
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-semibold text-outline ml-1">Password</label>
              <span className="font-label text-[10px] uppercase tracking-[0.05em] text-primary/60">Supabase Auth</span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/30 py-4 px-1 text-primary focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline/40"
                required
              />
            </div>
          </div>

          {!isConfigured ? (
            <p className="text-sm text-error">Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` before signing in.</p>
          ) : null}
          {formError ? <p className="text-sm text-error">{formError}</p> : null}
          {!formError && authError ? <p className="text-sm text-error">{authError}</p> : null}

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting || loading || !isConfigured}
              className="w-full bg-primary-container text-surface py-5 rounded-lg font-semibold tracking-wide hover:bg-primary active:scale-[0.98] transition-all duration-300 shadow-ambient disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        {supportLink ? (
          <div className="mt-12 text-center">
            <p className="text-on-surface-variant/70 text-sm">
              {supportLink.prefix}
              <Link
                to={supportLink.to}
                className="text-primary font-semibold underline decoration-tertiary-fixed-dim decoration-2 underline-offset-4 hover:decoration-primary transition-all ml-1"
              >
                {supportLink.label}
              </Link>
            </p>
          </div>
        ) : null}
      </section>

      <div className="fixed bottom-8 right-8 z-20 hidden md:block">
        <div className="flex items-center gap-3 bg-surface/40 backdrop-blur-md px-4 py-2 rounded-full border border-surface-container-highest/20">
          <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
          <span className="font-label text-[10px] uppercase tracking-[0.15em] text-primary font-bold">{badgeLabel}</span>
        </div>
      </div>
    </div>
  );
}
