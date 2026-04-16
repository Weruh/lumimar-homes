import { Link } from 'react-router-dom';

export default function InteriorStyling() {
  return (
    <>
      <section className="relative min-h-[795px] flex items-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/s8/1.jpg" alt="Shanzu property interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <p className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4">Lumimar Living</p>
          <h1 className="text-6xl md:text-8xl text-white leading-[1.1] mb-8 tracking-tighter">
            Design for Performance.<br />
            <span className="italic font-normal">Style for Yield.</span>
          </h1>
          <p className="text-white/80 text-xl max-w-xl font-light leading-relaxed mb-10">
            We transform coastal properties into editorial-standard stays that command premium rates and achieve consistent 90%+ occupancy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/apply" className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-4 rounded-md font-semibold tracking-wide hover:bg-white transition-all text-center">
              Request a Styling Consultation
            </Link>
            <a
              href="https://wa.me/254705551021"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/30 text-white backdrop-blur-sm px-8 py-4 rounded-md font-semibold tracking-wide hover:bg-white/10 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl text-primary mb-6">The Alchemy of Transformation</h2>
              <p className="text-on-surface-variant leading-relaxed">Evidence-based design. We bridge the gap between architectural beauty and the functional demands of high-traffic hospitality.</p>
            </div>
            <div className="flex gap-4 pb-2">
              <span className="text-primary font-bold border-b-2 border-tertiary-fixed-dim">Waterfront Suites</span>
              <span className="text-on-surface-variant/50">Island Villas</span>
              <span className="text-on-surface-variant/50">Urban Lofts</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-5 flex flex-col justify-center">
              <div className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-surface shadow-ambient">
                <img src="/images/s3/1.jpg" alt="before styling" className="w-full h-full object-cover grayscale opacity-60" />
                <div className="absolute top-6 left-6 bg-primary text-white px-4 py-1 text-xs tracking-widest uppercase">The Canvas</div>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-primary/80 to-transparent">
                  <p className="text-white/70 text-sm">Underperforming Unit, 2023</p>
                  <h3 className="text-white text-xl">Pre-Styling Audit</h3>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:col-span-2 items-center justify-center">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-6xl">arrow_forward_ios</span>
            </div>
            <div className="md:col-span-5">
              <div className="group relative rounded-xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img src="/images/s3/3.jpg" alt="after Lumimar styling" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-tertiary-fixed-dim text-on-tertiary-fixed px-4 py-1 text-xs tracking-widest uppercase font-bold">The Lumimar Signature</div>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-primary/90 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                    <span className="text-tertiary-fixed-dim font-bold text-sm uppercase">42% Increase in RevPAR</span>
                  </div>
                  <h3 className="text-white text-3xl">Nyali Waterfront Refresh</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">Curated Collections</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Turnkey furnishing solutions tailored to the unique spirit of the Kenya Coast.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-10 rounded-xl flex flex-col border border-outline-variant/10 hover:shadow-ambient transition-all duration-500">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-on-secondary-container">waves</span>
              </div>
              <h3 className="text-2xl text-primary mb-4">Coastal Essential</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">A light, airy foundation featuring whitewashed woods, durable linens, and organic textures. Designed for resilience and effortless maintenance.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Turnkey Bedroom & Lounge</li>
                <li className="flex items-center gap-3 text-sm text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> High-Traffic Textiles</li>
                <li className="flex items-center gap-3 text-sm text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Local Artisan Decor</li>
              </ul>
              <Link to="/apply" className="block w-full py-3 rounded-md border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all text-center">Explore Package</Link>
            </div>
            <div className="bg-primary-container p-10 rounded-xl flex flex-col shadow-2xl relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-widest">Most Popular</span>
              </div>
              <div className="w-12 h-12 bg-tertiary-fixed-dim rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <h3 className="text-2xl text-white mb-4">Azure Premium</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-8 flex-grow">Deep indigos, brass accents, and custom-made mvule furniture. This collection is engineered for remote professionals, expats, and luxury vacationers who expect hotel standards.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm text-white/90"><span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">check_circle</span> Full Property Staging</li>
                <li className="flex items-center gap-3 text-sm text-white/90"><span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">check_circle</span> Curated Tech & Audio</li>
                <li className="flex items-center gap-3 text-sm text-white/90"><span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">check_circle</span> Professional Photography</li>
              </ul>
              <Link to="/apply" className="block w-full py-4 rounded-md bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold hover:scale-[1.02] transition-all text-center">Request Quote</Link>
            </div>
            <div className="bg-surface-container-low p-10 rounded-xl flex flex-col border border-outline-variant/10 hover:shadow-ambient transition-all duration-500">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-on-secondary-container">palette</span>
              </div>
              <h3 className="text-2xl text-primary mb-4">The Collectors Suite</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">Bespoke interior architecture. We source unique Swahili antiques and contemporary African art to create a singular, unforgettable narrative.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Custom Carpentry</li>
                <li className="flex items-center gap-3 text-sm text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Fine Art Curation</li>
                <li className="flex items-center gap-3 text-sm text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Garden & Terrace Landscape</li>
              </ul>
              <Link to="/apply" className="block w-full py-3 rounded-md border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all text-center">Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto bg-secondary-container rounded-xl overflow-hidden flex flex-col md:flex-row shadow-ambient">
          <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4">Rescue & Revitalize</span>
            <h2 className="text-4xl md:text-5xl text-primary mb-8">The Relaunch Service</h2>
            <p className="text-on-secondary-container leading-relaxed mb-8 text-lg">
              Is your unit sitting empty? Our Relaunch service is designed specifically for underperforming properties. We perform a radical 48-hour styling refresh and a total platform optimization to get your calendar back to black.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <div>
                  <h4 className="font-bold text-primary">Visual Audit</h4>
                  <p className="text-sm text-on-secondary-container/80">Identifying friction points in your current presentation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">speed</span>
                <div>
                  <h4 className="font-bold text-primary">Rapid Restyling</h4>
                  <p className="text-sm text-on-secondary-container/80">Soft furnishings and lighting upgrades in 72 hours.</p>
                </div>
              </div>
            </div>
            <Link to="/apply" className="bg-primary text-white px-10 py-4 rounded-md font-bold self-start hover:shadow-lg transition-all">Audit My Unit</Link>
          </div>
          <div className="md:w-1/2 relative min-h-[400px]">
            <img src="/images/s6/5.jpg" alt="Shanzu property interior" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
