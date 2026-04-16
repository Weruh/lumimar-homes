import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const WA_LINK = `https://wa.me/254705551021`;
const EMAIL = 'hello@lumimarbrand.co.ke';

const MOBILE_LINKS = [
  { to: '/full-management', label: 'Full Management' },
  { to: '/co-hosting', label: 'Co-Hosting' },
  { to: '/interior-styling', label: 'Interior Styling' },
  { to: '/long-term-stays', label: 'Long-Term Stays' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'About' },
  { to: '/stay', label: 'Find a Stay' },
];

const DESKTOP_LINKS = [
  { to: '/full-management', label: 'Property Owners', compact: 'Owners' },
  { to: '/co-hosting', label: 'Co-Hosting' },
  { to: '/interior-styling', label: 'Interior Styling', compact: 'Styling' },
  { to: '/long-term-stays', label: 'Long-Term Stays', compact: 'Long Stays' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/case-studies', label: 'Case Studies', compact: 'Results' },
  { to: '/about', label: 'About' },
];

const SEO: Record<string, { title: string; description: string }> = {
  '/': { title: 'Lumimar Homes | Property Management Kenya Coast', description: 'Lumimar Homes manages short-let and long-term rental properties on the Kenya Coast.' },
  '/full-management': { title: 'Full Property Management | Lumimar Homes', description: 'Hands-off property management for Kenya Coast homeowners.' },
  '/co-hosting': { title: 'Co-Hosting Services | Lumimar Homes', description: 'Operations support for property owners.' },
  '/interior-styling': { title: 'Interior Styling | Lumimar Homes', description: 'Transforming properties into premium stays.' },
  '/long-term-stays': { title: 'Long-Term Stays | Lumimar Homes', description: 'Premium furnished monthly stays.' },
  '/case-studies': { title: 'Case Studies | Lumimar Homes', description: 'Real results from managed properties.' },
  '/about': { title: 'About Us | Lumimar Homes', description: 'Luxury coastal property management in Kenya.' },
  '/stay': { title: 'Book a Stay | Lumimar Homes', description: 'Browse premium properties on the Kenya Coast.' },
  '/apply': { title: 'Get a Revenue Estimate | Lumimar Homes', description: 'Free revenue estimate for your property.' },
  '/pricing': { title: 'Pricing | Lumimar Homes', description: 'Transparent management fees.' },
};

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const data = SEO[pathname] || SEO['/'];
    document.title = data.title;
    const updateMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    updateMeta('description', data.description);
    updateMeta('og:title', data.title, 'property');
    updateMeta('og:description', data.description, 'property');
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
  }, [mobileOpen]);

  return (
    <div className="bg-[#fbf9f5] text-[#0F2740] font-sans antialiased min-h-screen flex flex-col">
      <style>{`
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .nav-anim { animation: slideIn 0.3s ease-out forwards; }
      `}</style>

      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-[#001226] flex flex-col">
          <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">
            <Link to="/" onClick={() => setMobileOpen(false)} className="font-bold text-2xl text-white">Lumimar Homes</Link>
            <button onClick={() => setMobileOpen(false)} className="text-white"><span className="material-symbols-outlined text-4xl">close</span></button>
          </div>
          <nav className="flex flex-col px-8 pt-8 flex-grow overflow-y-auto">
            {MOBILE_LINKS.map((link, i) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} style={{ animationDelay: `${i * 40}ms` }}
                className={({ isActive }) => `nav-anim py-4 text-xl font-semibold border-b border-white/5 ${isActive ? 'text-[#e9c178]' : 'text-white/80'}`}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-8 space-y-4">
            <Link to="/apply" onClick={() => setMobileOpen(false)} className="block w-full bg-[#0F2740] text-white py-4 rounded-xl text-center font-bold">Get Estimate</Link>
            <a href={WA_LINK} className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-bold"><WhatsAppIcon size={20}/> WhatsApp</a>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-black/5">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-[#0F2740] text-white w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold">LH</div>
            <div className="flex flex-col leading-[1.1] font-bold text-xl tracking-tight">
              <span>Lumimar</span>
              <span>Homes</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            {DESKTOP_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `relative py-2 text-sm font-semibold transition-colors ${isActive ? 'text-[#0F2740]' : 'text-gray-500 hover:text-[#0F2740]'}`}>
                {({ isActive }) => (
                  <>
                    <span className="2xl:hidden">{link.compact || link.label}</span>
                    <span className="hidden 2xl:inline">{link.label}</span>
                    {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F2740] rounded-full" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/owner/login" className="hidden xl:flex items-center gap-2 text-sm font-semibold text-[#0F2740]">
              <span className="material-symbols-outlined text-xl">account_circle</span>
              <span>Portal</span>
            </Link>
            
            <Link to="/apply" className="hidden xl:flex bg-[#0F2740] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
              Get Estimate
            </Link>

            <button onClick={() => setMobileOpen(true)} className="xl:hidden p-1">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow"><Outlet /></main>

      <footer className="bg-[#001226] text-white/60 py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white text-2xl font-bold mb-4">Lumimar</h4>
            <p className="text-sm mb-6 leading-relaxed">Luxury coastal property management in Kenya with global standards.</p>
            <div className="space-y-2 text-sm">
              <a href={WA_LINK} className="flex items-center gap-2 hover:text-[#e9c178]"><WhatsAppIcon size={14} /> +254 705 551 021</a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-[#e9c178]"><span className="material-symbols-outlined text-sm">mail</span> {EMAIL}</a>
            </div>
          </div>
          <div>
            <h5 className="text-white text-xs font-bold uppercase mb-6 tracking-widest">Services</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/full-management" className="hover:text-white">Full Management</Link></li>
              <li><Link to="/interior-styling" className="hover:text-white">Interior Styling</Link></li>
              <li><Link to="/long-term-stays" className="hover:text-white">Long-Term Stays</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-xs font-bold uppercase mb-6 tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-xs font-bold uppercase mb-6 tracking-widest">Newsletter</h5>
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <input type="email" placeholder="Email" className="bg-transparent border-none focus:ring-0 text-sm w-full px-3" />
              <button className="bg-[#e9c178] text-[#001226] px-4 py-2 rounded-md font-bold text-xs">→</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-[10px] uppercase tracking-widest flex justify-between">
          <p>© 2026 Lumimar Homes</p>
          <div className="flex gap-4">
            <a href={WA_LINK} className="hover:text-[#e9c178]">WhatsApp</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-[#e9c178]">Email</a>
          </div>
        </div>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <WhatsAppIcon size={28} />
      </a>
    </div>
  );
}