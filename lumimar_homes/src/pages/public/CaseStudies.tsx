import { Link } from 'react-router-dom';

export default function CaseStudies() {
  return (
    <>
      <section className="pt-32 pb-16 px-8 max-w-7xl mx-auto">
        <p className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4">Proven Results</p>
        <h1 className="text-5xl md:text-7xl text-primary leading-[1.1] mb-8 font-headline">
          Case Studies.
        </h1>
        <p className="text-on-surface-variant text-xl font-light leading-relaxed max-w-2xl">
          Data-driven transformations. See how we've elevated property performance across the Kenyan coast.
        </p>
      </section>

      <section className="py-16 px-8 max-w-7xl mx-auto space-y-24">
        {/* Case Study 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-headline text-primary mb-4">The Sands Estate, Watamu</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              A premier 5-bedroom beachfront property struggling with stagnant occupancy rates and an outdated digital presence.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">build</span>
                <div>
                  <h4 className="font-bold text-primary text-sm">Intervention</h4>
                  <p className="text-sm text-on-surface-variant">Full Relaunch & Interior Curation. Implemented dynamic pricing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">trending_up</span>
                <div>
                  <h4 className="font-bold text-primary text-sm">Result</h4>
                  <p className="text-sm text-on-surface-variant">+40% RevPAR in the first 6 months. Achieved top-rated host status across all platforms.</p>
                </div>
              </div>
            </div>
            <Link to="/apply" className="text-primary font-bold border-b-2 border-tertiary-fixed-dim pb-1 hover:border-primary transition-colors">
              Discuss Your Property
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <img src="/images/s6/2.jpg" alt="Shanzu managed property" className="rounded-2xl shadow-ambient w-full object-cover aspect-[4/3]" loading="lazy" />
          </div>
        </div>

        {/* Case Study 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/images/s4/2.jpg" alt="Shanzu penthouse" className="rounded-2xl shadow-ambient w-full object-cover aspect-[4/3]" loading="lazy" />
          </div>
          <div>
            <h2 className="text-3xl font-headline text-primary mb-4">Mtwapa Creek Penthouse</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              A newly built penthouse needing positioning to attract high-end corporate expats for long-term stays.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">palette</span>
                <div>
                  <h4 className="font-bold text-primary text-sm">Intervention</h4>
                  <p className="text-sm text-on-surface-variant">Heritage-modern fusion styling. Corporate outreach program.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">task_alt</span>
                <div>
                  <h4 className="font-bold text-primary text-sm">Result</h4>
                  <p className="text-sm text-on-surface-variant">Leased in 48 hours to a multinational executive at premium rates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-tertiary-fixed-dim/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <span className="material-symbols-outlined text-sm">flight</span>
              Diaspora Owner / Based in Manchester
            </div>
            <h2 className="text-3xl font-headline text-primary mb-4">Kilifi Creek Villa, Kilifi</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              A 3-bedroom creek-view property owned by a Kenyan professional based in Manchester. Previously self-managed with irregular bookings and constant stress from 5,000km away.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">build</span>
                <div>
                  <h4 className="font-bold text-primary text-sm">Intervention</h4>
                  <p className="text-sm text-on-surface-variant">Full Management onboarding. Complete interior refresh, professional photography, and multi-platform listing. All guest communication transferred to Lumimar on day one.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">trending_up</span>
                <div>
                  <h4 className="font-bold text-primary text-sm">Result</h4>
                  <p className="text-sm text-on-surface-variant">Occupancy rose from 34% to 91% within 4 months. Owner receives a monthly KES transfer and has not answered a single guest message since onboarding.</p>
                </div>
              </div>
            </div>
            <Link to="/full-management" className="text-primary font-bold border-b-2 border-tertiary-fixed-dim pb-1 hover:border-primary transition-colors">
              Learn About Full Management
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <img src="/images/s7/2.jpg" alt="Shanzu creek view property" className="rounded-2xl shadow-ambient w-full object-cover aspect-[4/3]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-5xl text-white mb-6">Your property has a story waiting to be told.</h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Every case study above started with a free conversation. We looked at the property, ran the numbers, and showed the owner what was possible. That cost nothing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply" className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-10 py-4 rounded-md font-bold hover:bg-white transition-colors">
              Get a Free Revenue Estimate
            </Link>
            <a
              href="https://wa.me/254705551021"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-4 rounded-md font-bold hover:bg-white/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
