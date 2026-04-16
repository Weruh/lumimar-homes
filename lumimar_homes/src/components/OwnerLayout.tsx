import { Link, Outlet, useLocation } from 'react-router-dom';

export default function OwnerLayout() {
  const location = useLocation();
  const isLogin = location.pathname === '/owner/login';

  if (isLogin) {
    return <Outlet />;
  }

  return (
    <div className="bg-surface text-on-background min-h-screen pb-32 font-body antialiased">
      <header className="bg-[#fbf9f5]/80 dark:bg-[#001226]/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-ambient">
        <div className="flex justify-between items-center px-6 h-20 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-container">
              <img src="/images/s1/2.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <Link to="/owner/dashboard" className="font-headline font-black text-[#001226] dark:text-[#fbf9f5] tracking-tighter text-2xl">
              Lumimar Owner Portal
            </Link>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/owner/dashboard" className={`font-semibold ${location.pathname === '/owner/dashboard' ? 'text-[#001226] dark:text-[#fbf9f5]' : 'text-[#1F2937]/60 dark:text-[#fbf9f5]/60 hover:text-[#001226] transition-all'}`}>
              Dashboard
            </Link>
            <Link to="/owner/properties" className={`font-semibold ${location.pathname === '/owner/properties' ? 'text-[#001226] dark:text-[#fbf9f5]' : 'text-[#1F2937]/60 dark:text-[#fbf9f5]/60 hover:text-[#001226] transition-all'}`}>
              Properties
            </Link>
            <Link to="/owner/earnings" className={`font-semibold ${location.pathname === '/owner/earnings' ? 'text-[#001226] dark:text-[#fbf9f5]' : 'text-[#1F2937]/60 dark:text-[#fbf9f5]/60 hover:text-[#001226] transition-all'}`}>
              Earnings
            </Link>
            <Link to="/owner/profile" className={`font-semibold ${location.pathname === '/owner/profile' ? 'text-[#001226] dark:text-[#fbf9f5]' : 'text-[#1F2937]/60 dark:text-[#fbf9f5]/60 hover:text-[#001226] transition-all'}`}>
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#f5f3ef] active:scale-95 duration-200 transition-all">
              <span className="material-symbols-outlined text-[#001226] dark:text-white">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 px-6 max-w-7xl mx-auto">
        <Outlet />
      </main>

      <nav className="md:hidden bg-[#fbf9f5]/90 dark:bg-[#001226]/90 backdrop-blur-lg fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe z-50 border-t border-[#c4c6ce]/15 shadow-ambient rounded-t-[1.5rem]">
        <Link to="/owner/dashboard" className={`flex flex-col items-center justify-center px-5 py-2 active:scale-90 duration-300 ${location.pathname === '/owner/dashboard' ? 'bg-[#eeddc7] dark:bg-[#0F2740] text-[#001226] dark:text-[#e9c178] rounded-[0.75rem]' : 'text-[#1F2937]/50 dark:text-[#fbf9f5]/40 hover:text-[#001226] transition-colors'}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label text-[10px] uppercase tracking-[0.05em] font-medium mt-1">Dashboard</span>
        </Link>
        <Link to="/owner/properties" className={`flex flex-col items-center justify-center px-5 py-2 active:scale-90 duration-300 ${location.pathname === '/owner/properties' ? 'bg-[#eeddc7] dark:bg-[#0F2740] text-[#001226] dark:text-[#e9c178] rounded-[0.75rem]' : 'text-[#1F2937]/50 dark:text-[#fbf9f5]/40 hover:text-[#001226] transition-colors'}`}>
          <span className="material-symbols-outlined">domain</span>
          <span className="font-label text-[10px] uppercase tracking-[0.05em] font-medium mt-1">Properties</span>
        </Link>
        <Link to="/owner/earnings" className={`flex flex-col items-center justify-center px-5 py-2 active:scale-90 duration-300 ${location.pathname === '/owner/earnings' ? 'bg-[#eeddc7] dark:bg-[#0F2740] text-[#001226] dark:text-[#e9c178] rounded-[0.75rem]' : 'text-[#1F2937]/50 dark:text-[#fbf9f5]/40 hover:text-[#001226] transition-colors'}`}>
          <span className="material-symbols-outlined">payments</span>
          <span className="font-label text-[10px] uppercase tracking-[0.05em] font-medium mt-1">Earnings</span>
        </Link>
        <Link to="/owner/profile" className={`flex flex-col items-center justify-center px-5 py-2 active:scale-90 duration-300 ${location.pathname === '/owner/profile' ? 'bg-[#eeddc7] dark:bg-[#0F2740] text-[#001226] dark:text-[#e9c178] rounded-[0.75rem]' : 'text-[#1F2937]/50 dark:text-[#fbf9f5]/40 hover:text-[#001226] transition-colors'}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-label text-[10px] uppercase tracking-[0.05em] font-medium mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
