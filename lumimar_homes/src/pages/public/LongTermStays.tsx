import { Link } from 'react-router-dom';

export default function LongTermStays() {
  return (
    <>
      <section className="relative min-h-[751px] flex items-center px-8 lg:px-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
          <div className="lg:col-span-7 z-10">
            <span className="font-label uppercase tracking-[0.2em] text-on-primary-fixed-variant font-semibold mb-6 block">Refined Stability</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary leading-[1.1] tracking-tighter mb-8">
              The Stability of <span className="italic">Long-Term.</span><br />
              The Yield of Furnished.
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
              Bridging the gap between transient rentals and traditional leases. We curate premium monthly stays for a new era of global professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/apply" className="bg-primary-container text-on-primary px-8 py-4 rounded-md font-medium hover:bg-primary transition-all shadow-ambient">
                List Your Property
              </Link>
              <Link to="/apply" className="border-b-2 border-primary text-primary px-8 py-4 font-semibold hover:text-tertiary-fixed-dim hover:border-tertiary-fixed-dim transition-all">
                Explore Destinations
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden shadow-ambient transform lg:rotate-3 hover:rotate-0 transition-transform duration-700">
              <img src="/images/s1/1.jpg" alt="Shanzu furnished apartment" className="w-full h-[600px] object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-xl shadow-ambient hidden md:block max-w-[280px]">
              <p className="font-headline italic text-primary text-lg">"The perfect balance of home comfort and resort-style liberty."</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')]"></div>
      </section>

      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl text-primary mb-4">Targeted High-Value Audiences</h2>
              <p className="text-on-surface-variant text-lg">We don't just fill beds; we curate communities of vetted, professional residents seeking premium environments.</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-headline text-tertiary-fixed-dim">Stable</span>
              <p className="uppercase text-xs tracking-widest text-on-surface-variant">Monthly Booking Focus</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface rounded-xl overflow-hidden flex flex-col md:flex-row shadow-ambient hover:translate-y-[-4px] transition-all duration-300">
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img src="/images/s7/1.jpg" alt="remote professional workspace" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-xs font-bold tracking-widest text-tertiary-fixed-dim uppercase mb-2">The Remote Expert</span>
                <h3 className="font-headline text-2xl text-primary mb-4">Remote Professionals</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Seeking 36 month stays with high-speed connectivity and inspiring coastal workspaces  trading the city commute for ocean views.</p>
                <span className="material-symbols-outlined text-primary self-start">arrow_forward</span>
              </div>
            </div>
            <div className="bg-surface rounded-xl overflow-hidden flex flex-col md:flex-row shadow-ambient hover:translate-y-[-4px] transition-all duration-300">
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img src="/images/s2/1.jpg" alt="executive apartment Shanzu" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-xs font-bold tracking-widest text-tertiary-fixed-dim uppercase mb-2">Corporate Mobility</span>
                <h3 className="font-headline text-2xl text-primary mb-4">Executive Relocations</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Corporate-backed stays for professionals transitioning between global offices with high standards.</p>
                <span className="material-symbols-outlined text-primary self-start">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-ambient">
            <div className="bg-primary-container p-12 lg:p-20 text-on-primary relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-headline text-4xl mb-6">I am a Property Owner</h3>
                <p className="text-on-primary-container text-lg mb-8 opacity-90">Maximize your asset value with reduced turnover and professional management. Secure your cash flow today.</p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
                    <span>Vetted high-net-worth tenants</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
                    <span>Zero maintenance headache</span>
                  </li>
                </ul>
                <Link to="/apply" className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform">
                  Partner with us
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            </div>
            <div className="bg-secondary-container p-12 lg:p-20 text-on-secondary-container relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-headline text-4xl mb-6">I am a Stay Seeker</h3>
                <p className="text-on-secondary-fixed-variant text-lg mb-8 opacity-90">Find your home away from home. Curated, fully furnished apartments in Kenya's most desirable coastal hubs.</p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <span>Curated interior styling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <span>Flexible monthly terms</span>
                  </li>
                </ul>
                <Link to="/apply" className="inline-block bg-primary text-on-primary px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl text-primary mb-4">Why Furnished Long-Term?</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Optimizing for the sweet spot between hospitality premiums and rental consistency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-xl p-12 flex flex-col justify-between relative overflow-hidden group">
              <div className="z-10">
                <span className="material-symbols-outlined text-4xl text-primary mb-6">payments</span>
                <h3 className="font-headline text-3xl text-primary mb-4">Consistent Cash Flow</h3>
                <p className="text-on-surface-variant text-lg max-w-md">Eliminate the "peak and trough" cycle of vacation rentals. Monthly stays provide a predictable, high-yield revenue stream that stabilizes your investment portfolio year-round.</p>
              </div>
              <div className="mt-8 z-10">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span>Learn about our yield model</span>
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
                <img src="/images/s8/2.jpg" alt="property yield chart" className="object-contain" loading="lazy" />
              </div>
            </div>
            <div className="bg-surface-container-highest rounded-xl p-8 flex flex-col justify-center">
              <span className="material-symbols-outlined text-3xl text-primary mb-4">engineering</span>
              <h4 className="font-headline text-xl text-primary mb-2">Lower Turnover</h4>
              <p className="text-on-surface-variant text-sm">Reduced wear and tear through long-term occupancy and meticulous bi-weekly professional cleaning.</p>
            </div>
            <div className="bg-tertiary-fixed-dim rounded-xl p-8 flex flex-col justify-center">
              <span className="material-symbols-outlined text-3xl text-primary mb-4">badge</span>
              <h4 className="font-headline text-xl text-primary mb-2">Vetted Professionals</h4>
              <p className="text-primary text-sm opacity-80">Every guest undergoes a rigorous background and employment verification process to ensure asset security.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 text-center max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl text-primary mb-6">Ready to stabilise your rental yield?</h2>
        <p className="text-on-surface-variant mb-10 text-lg">Our curators are ready to evaluate your property for the Lumimar Long-Term Collection.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/apply" className="bg-primary text-white px-10 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-colors">
            Get a Free Property Evaluation
          </Link>
          <a
            href="https://wa.me/254705551021"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-10 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
