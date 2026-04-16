import { Link, useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate('/owner/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden font-body text-on-background antialiased">
      <div className="fixed inset-0 z-0">
        <img src="/images/s6/1.jpg" alt="Shanzu coastal property" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,18,38,0.4)] to-[rgba(15,39,64,0.1)] backdrop-blur-[2px]"></div>
      </div>

      <section className="relative z-10 w-full max-w-xl bg-surface/90 backdrop-blur-2xl rounded-xl shadow-ambient p-8 md:p-16 flex flex-col items-center">
        <div className="mb-12 text-center">
          <span className="font-headline font-black text-primary tracking-tighter text-3xl mb-8 block">Lumimar</span>
          <h1 className="font-headline font-bold text-primary text-4xl md:text-5xl tracking-tight mb-4">Owner Access</h1>
          <p className="text-on-surface-variant text-base md:text-lg max-w-sm leading-relaxed mx-auto">
            View your properties, bookings, and earnings in one place.
          </p>
        </div>

        <form className="w-full space-y-8" onSubmit={handleLogin}>
          <div className="group">
            <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-semibold text-outline mb-2 ml-1">Email Address</label>
            <div className="relative">
              <input type="email" placeholder="owner@example.com" className="w-full bg-transparent border-b border-outline-variant/30 py-4 px-1 text-primary focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline/40" />
            </div>
          </div>

          <div className="group">
            <div className="flex justify-between items-center mb-2">
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-semibold text-outline ml-1">Password</label>
              <a href="#" className="font-label text-[10px] uppercase tracking-[0.05em] text-primary/60 hover:text-primary transition-colors">Forgot Password?</a>
            </div>
            <div className="relative">
              <input type="password" placeholder="••••••••" className="w-full bg-transparent border-b border-outline-variant/30 py-4 px-1 text-primary focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-outline/40" />
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-primary-container text-surface py-5 rounded-lg font-semibold tracking-wide hover:bg-primary active:scale-[0.98] transition-all duration-300 shadow-ambient">
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-12 text-center">
          <p className="text-on-surface-variant/70 text-sm">
            New to Lumimar? 
            <Link to="/apply" className="text-primary font-semibold underline decoration-tertiary-fixed-dim decoration-2 underline-offset-4 hover:decoration-primary transition-all ml-1">Request Access</Link>
          </p>
        </div>
      </section>

      <div className="fixed bottom-8 right-8 z-20 hidden md:block">
        <div className="flex items-center gap-3 bg-surface/40 backdrop-blur-md px-4 py-2 rounded-full border border-surface-container-highest/20">
          <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
          <span className="font-label text-[10px] uppercase tracking-[0.15em] text-primary font-bold">Secure Portal</span>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-64 h-64 bg-tertiary-fixed-dim/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    </div>
  );
}
