import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function InternalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const isActive = (path: string) =>
    location.pathname === path ? 'bg-[#001226] text-white' : 'text-[#1F2937] dark:text-slate-400 hover:bg-[#eeddc7]/50';

  const handleSignOut = async () => {
    await signOut();
    navigate('/internal/login', { replace: true });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body antialiased">
      <aside className="fixed left-0 top-0 h-[calc(100vh-48px)] w-64 m-6 rounded-3xl bg-[#f5f3ef] dark:bg-slate-900 shadow-ambient hidden md:flex flex-col gap-4 p-6 z-50 overflow-hidden">
        <div className="mb-6 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/s1/1.jpg" alt="Manager" className="w-12 h-12 rounded-xl object-cover ring-2 ring-white" />
            <div>
              <h3 className="text-primary font-bold text-sm leading-tight">{profile?.full_name ?? 'Operations Lead'}</h3>
              <p className="text-on-surface-variant text-xs opacity-80">Internal Operations</p>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full mt-1 inline-block font-semibold">Authenticated</span>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/internal/dashboard" className={`${isActive('/internal/dashboard')} rounded-xl flex items-center gap-3 p-3 transition-transform duration-200 hover:translate-x-1`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium tracking-wide">Dashboard</span>
          </Link>
          <Link to="/internal/leads" className={`${isActive('/internal/leads')} rounded-xl flex items-center gap-3 p-3 transition-transform duration-200 hover:translate-x-1`}>
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="text-sm font-medium tracking-wide">Lead Management</span>
          </Link>
          <Link to="/internal/cleaning" className={`${isActive('/internal/cleaning')} flex items-center gap-3 p-3 rounded-xl transition-transform duration-200 hover:translate-x-1`}>
            <span className="material-symbols-outlined">cleaning_services</span>
            <span className="text-sm font-medium tracking-wide">Cleaning</span>
          </Link>
          <Link to="/internal/maintenance" className={`${isActive('/internal/maintenance')} flex items-center gap-3 p-3 rounded-xl transition-transform duration-200 hover:translate-x-1`}>
            <span className="material-symbols-outlined">handyman</span>
            <span className="text-sm font-medium tracking-wide">Maintenance</span>
          </Link>
          <Link to="/internal/finance" className={`${isActive('/internal/finance')} flex items-center gap-3 p-3 rounded-xl transition-transform duration-200 hover:translate-x-1`}>
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm font-medium tracking-wide">Finance</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-xl border border-outline-variant/20 px-4 py-3 text-left text-sm font-semibold text-primary hover:bg-white/60 transition-colors"
          >
            Sign Out
          </button>
          <p className="text-[10px] text-outline mt-4 uppercase tracking-widest">Internal Operations v2.4</p>
        </div>
      </aside>

      <div className="md:ml-72 min-h-screen flex flex-col">
        <header className="flex justify-between items-center w-full px-8 py-4 sticky top-0 bg-[#fbf9f5]/80 dark:bg-slate-950/80 backdrop-blur-md z-40">
          <div className="flex flex-col">
            <h1 className="text-2xl font-headline text-[#0F2740] dark:text-white leading-tight">Operational Overview</h1>
            <p className="text-xs font-medium text-on-surface-variant/70 uppercase tracking-widest">Protected Internal Workspace</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors" aria-label="Search">
              <span className="material-symbols-outlined text-primary">search</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
              <span className="text-sm font-bold text-primary">
                {(profile?.full_name ?? 'Ops')
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant/10 px-6 py-4 flex justify-between items-center z-50">
        <Link to="/internal/dashboard" className="text-primary flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link to="/internal/leads" className="text-on-surface-variant/50 flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="text-[10px] font-bold">Leads</span>
        </Link>
        <Link to="/internal/cleaning" className="text-on-surface-variant/50 flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">engineering</span>
          <span className="text-[10px] font-bold">Ops</span>
        </Link>
        <Link to="/internal/finance" className="text-on-surface-variant/50 flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">payments</span>
          <span className="text-[10px] font-bold">Finance</span>
        </Link>
        <button type="button" onClick={handleSignOut} className="text-on-surface-variant/50 flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[10px] font-bold">Exit</span>
        </button>
      </nav>
    </div>
  );
}
