import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const WA_NUMBER = '254705551021';
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const EMAIL = 'hello@lumimarbrand.co.ke';

const SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Lumimar Homes | Property Management on the Kenya Coast',
    description: 'Lumimar Homes manages short-let and long-term rental properties on the Kenya Coast. 94% average occupancy, 65% avg revenue increase. Free estimate for Diani, Watamu, Kilifi owners.',
  },
  '/full-management': {
    title: 'Full Property Management Kenya Coast | Lumimar Homes',
    description: 'Completely hands-off property management for Kenya Coast homeowners and diaspora investors. We handle guests, pricing, housekeeping, maintenance, and monthly payouts.',
  },
  '/co-hosting': {
    title: 'Co-Hosting Services Kenya Coast | Lumimar Homes',
    description: 'Stay involved with your property while Lumimar handles digital operations — pricing, listings, and 24/7 guest communication. Diani, Watamu, Kilifi.',
  },
  '/interior-styling': {
    title: 'Interior Styling for Short-Let Properties | Lumimar Homes',
    description: 'We transform Kenya Coast properties into editorial-standard stays that command premium nightly rates and achieve 90%+ occupancy. Furnishing, photography, and listing optimisation.',
  },
  '/long-term-stays': {
    title: 'Furnished Long-Term Stays Kenya Coast | Lumimar Homes',
    description: 'Premium furnished monthly stays for remote professionals and corporate relocations. 98% occupancy, vetted tenants, zero management stress for property owners.',
  },
  '/case-studies': {
    title: 'Case Studies | Lumimar Homes Property Management Results',
    description: 'Real results from Lumimar-managed properties on the Kenya Coast. See how owners in Watamu, Diani, and Kilifi increased property yield by up to 65%.',
  },
  '/about': {
    title: 'About Lumimar Homes | Kenya Coast Property Management',
    description: 'Lumimar Homes brings luxury hospitality standards to private rental properties on the Kenya Coast. 40+ properties managed, 4.9 average guest rating.',
  },
  '/stay': {
    title: 'Book a Coastal Stay Directly | Lumimar Homes Kenya',
    description: 'Browse premium furnished properties for short-term and monthly stays on the Kenya Coast. Book direct and save — Diani, Watamu, Kilifi, Malindi.',
  },
  '/apply': {
    title: 'Get a Free Revenue Estimate | Lumimar Homes',
    description: 'Find out how much your Kenya Coast property could earn. Free, no-obligation revenue estimate from Lumimar Homes — response within 24 hours.',
  },
  '/pricing': {
    title: 'Pricing & Management Fees | Lumimar Homes',
    description: 'Transparent pricing for property management on the Kenya Coast. Co-Hosting from 15%, Full Management 20–25%. No setup fees, no hidden charges.',
  },
};

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const seo = SEO[location.pathname] ?? SEO['/'];
    document.title = seo.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = seo.description;
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) (ogTitle as HTMLMetaElement).content = seo.title;
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) (ogDesc as HTMLMetaElement).content = seo.description;
  }, [location.pathname]);

  return (
    <div className="bg-surface text-primary font-body antialiased min-h-screen flex flex-col">

      {/* ── Mobile full-screen nav overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-[#001226] flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">
            <Link to="/" onClick={() => setMobileOpen(false)} className="font-headline font-bold text-2xl tracking-tighter text-white">
              Lumimar Homes
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <span className="material-symbols-outlined text-white text-3xl">close</span>
            </button>
          </div>

          <nav className="flex flex-col px-8 pt-6 gap-1 flex-grow">
            {[
              { to: '/full-management', label: 'Full Management' },
              { to: '/co-hosting', label: 'Co-Hosting' },
              { to: '/interior-styling', label: 'Interior Styling' },
              { to: '/long-term-stays', label: 'Long-Term Stays' },
              { to: '/pricing', label: 'Pricing' },
              { to: '/case-studies', label: 'Case Studies' },
              { to: '/about', label: 'About' },
              { to: '/stay', label: 'Find a Stay' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-tertiary-fixed-dim text-xl font-semibold py-4 border-b border-white/10 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-8 py-10 space-y-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-lg font-bold w-full"
            >
              <WhatsAppIcon />
              +254 705 551 021
            </a>
            <Link
              to="/apply"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-4 rounded-lg font-bold w-full"
            >
              Get a Free Revenue Estimate
            </Link>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="bg-[#fbf9f5]/80 backdrop-blur-md sticky top-0 z-50 shadow-ambient">
        <nav className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[#0F2740]">menu</span>
            </button>
            <Link to="/" className="font-headline font-bold text-2xl tracking-tighter text-[#0F2740]">
              Lumimar Homes
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/full-management" className="text-[#0F2740] font-semibold hover:text-[#e9c178] transition-colors duration-300 font-label text-sm">
              Property Owners
            </Link>
            <Link to="/co-hosting" className="text-[#1F2937]/70 hover:text-[#e9c178] transition-colors duration-300 font-label text-sm">
              Co-Hosting
            </Link>
            <Link to="/interior-styling" className="text-[#1F2937]/70 hover:text-[#e9c178] transition-colors duration-300 font-label text-sm">
              Styling
            </Link>
            <Link to="/long-term-stays" className="text-[#1F2937]/70 hover:text-[#e9c178] transition-colors duration-300 font-label text-sm">
              Long-Term
            </Link>
            <Link to="/pricing" className="text-[#1F2937]/70 hover:text-[#e9c178] transition-colors duration-300 font-label text-sm">
              Pricing
            </Link>
            <Link to="/case-studies" className="text-[#1F2937]/70 hover:text-[#e9c178] transition-colors duration-300 font-label text-sm">
              Case Studies
            </Link>
            <Link to="/about" className="text-[#1F2937]/70 hover:text-[#e9c178] transition-colors duration-300 font-label text-sm">
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-[#25D366] hover:text-[#1ebc5a] transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
              <span className="text-sm font-semibold">WhatsApp</span>
            </a>
            <Link to="/owner/login" className="hidden md:flex items-center gap-2 text-primary hover:text-tertiary-fixed-dim transition-colors">
              <span className="material-symbols-outlined">account_circle</span>
              <span className="text-sm font-semibold">Owner Portal</span>
            </Link>
            <Link to="/apply" className="bg-primary text-white px-6 py-2 rounded-md font-medium scale-95 active:opacity-80 transition-transform text-sm">
              Get Estimate
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#001226] text-[#e9c178] py-16 px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="md:col-span-1">
            <span className="text-[#fbf9f5] font-headline text-3xl font-bold mb-4 block">Lumimar</span>
            <p className="text-[#fbf9f5]/60 text-sm leading-relaxed mb-6">
              Redefining luxury coastal property management in Kenya with local expertise and global hospitality standards.
            </p>
            <div className="space-y-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#fbf9f5]/70 hover:text-[#e9c178] transition-colors text-sm"
              >
                <WhatsAppIcon size={16} />
                +254 705 551 021
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-[#fbf9f5]/70 hover:text-[#e9c178] transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                {EMAIL}
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[#fbf9f5] font-bold mb-6 uppercase tracking-widest text-xs">Services</h5>
            <ul className="space-y-4">
              <li><Link to="/full-management" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Full Management</Link></li>
              <li><Link to="/co-hosting" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Co-Hosting</Link></li>
              <li><Link to="/interior-styling" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Interior Styling</Link></li>
              <li><Link to="/long-term-stays" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Long-Term Stays</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#fbf9f5] font-bold mb-6 uppercase tracking-widest text-xs">Company</h5>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">About Us</Link></li>
              <li><Link to="/case-studies" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Case Studies</Link></li>
              <li><Link to="/pricing" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Pricing</Link></li>
              <li><Link to="/stay" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Find a Stay</Link></li>
              <li><Link to="/apply" className="text-[#fbf9f5]/60 hover:text-[#fbf9f5] transition-all font-label">Get a Revenue Estimate</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#fbf9f5] font-bold mb-6 uppercase tracking-widest text-xs">Free Property Report</h5>
            <p className="text-[#fbf9f5]/60 text-xs mb-4 leading-relaxed">
              Enter your email to receive our Kenya Coastal Property Revenue Report — real benchmarks from 40+ managed units.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 focus:ring-1 focus:ring-[#e9c178] focus:outline-none rounded-l-md px-4 py-2 w-full text-white text-sm"
              />
              <button className="bg-[#e9c178] text-[#001226] px-4 py-2 rounded-r-md font-bold text-sm hover:bg-white transition-colors">→</button>
            </div>
            <p className="text-[#fbf9f5]/30 text-[10px] mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#fbf9f5]/40 text-xs">© 2026 Lumimar Homes. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#fbf9f5]/40 hover:text-[#e9c178] transition-colors" aria-label="WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
            <a href={`mailto:${EMAIL}`} className="text-[#fbf9f5]/40 hover:text-[#e9c178] transition-colors" aria-label="Email">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
            <span className="material-symbols-outlined text-[#fbf9f5]/40 hover:text-[#e9c178] cursor-pointer transition-colors">photo_camera</span>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp button ── */}
      <a
        href={`${WA_LINK}?text=Hi%2C+I'd+like+to+learn+more+about+Lumimar+property+management.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] hover:bg-[#1ebc5a] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
      >
        <WhatsAppIcon size={26} />
      </a>
    </div>
  );
}
