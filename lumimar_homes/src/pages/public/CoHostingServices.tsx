import { Link } from 'react-router-dom';

export default function CoHostingServices() {
  return (
    <>
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-surface-container-lowest"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <p className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4">For the Involved Owner</p>
            <h1 className="text-5xl md:text-7xl text-primary leading-[1.1] mb-8 tracking-tighter font-headline">
              Co-Hosting: <br />
              <span className="italic font-normal">You Stay Involved. We Drive Revenue.</span>
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl font-light leading-relaxed mb-10">
              You keep the hands-on aspects you enjoy. We take over the digital complexity  pricing, listings, guest comms  and make your property perform like a professionally managed asset.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply" className="bg-primary text-white px-8 py-4 rounded-md font-semibold tracking-wide hover:bg-primary/90 transition-all shadow-ambient text-center">
                Get a Free Revenue Estimate
              </Link>
              <a
                href="https://wa.me/254705551021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-md font-semibold tracking-wide hover:bg-primary hover:text-white transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img src="/images/s12/2.jpg" alt="Shanzu co-hosted property" className="rounded-2xl shadow-2xl object-cover aspect-[4/5] w-full max-w-md mx-auto" loading="lazy" />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">trending_up</span>
                <span className="font-bold text-primary">Revenue Share</span>
              </div>
              <p className="text-sm text-on-surface-variant">Transparent split models designed to align our success with yours.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-primary mb-4 font-headline">How We Partner</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">A seamless integration of your property into the Lumimar portfolio  starting from 15% of gross revenue, no setup fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">handshake</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">1. The Agreement</h3>
              <p className="text-on-surface-variant leading-relaxed">We establish a clear co-hosting agreement outlining responsibilities, revenue splits, and performance targets.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">campaign</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">2. Digital Takeover</h3>
              <p className="text-on-surface-variant leading-relaxed">We optimize your listings across Airbnb, Booking.com, and our direct channels with new photography and copy.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">3. Guest Operations</h3>
              <p className="text-on-surface-variant leading-relaxed">From inquiry to checkout, our team handles 24/7 communication, vetting, and on-the-ground support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-headline mb-6">Let's see what your listing can earn.</h2>
            <p className="text-primary-fixed-dim text-lg mb-8 max-w-md">Our Co-Hosting partners average a 65% revenue increase within the first 90 days  driven by AI-powered pricing and elite listing optimisation. Let's find out what's possible for your property.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span> Daily Dynamic Pricing</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span> 24/7 Guest Communication</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span> Real-Time Owner Portal</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/apply" className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-4 rounded-md font-bold hover:bg-white transition-colors text-center">
                Get My Free Estimate
              </Link>
              <a
                href="https://wa.me/254705551021"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-md font-bold hover:bg-white/10 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img src="/images/s6/3.jpg" alt="Shanzu property" className="rounded-xl object-cover h-48 w-full" loading="lazy" />
            <img src="/images/s2/2.jpg" alt="Shanzu property interior" className="rounded-xl object-cover h-48 w-full translate-y-8" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
