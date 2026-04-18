import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <section className="pt-32 pb-24 px-8 max-w-4xl mx-auto text-center">
        <p className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4">Our Story</p>
        <h1 className="text-5xl md:text-7xl text-primary leading-[1.1] mb-8 font-headline">
          Redefining Coastal <br />
          <span className="italic font-normal">Hospitality.</span>
        </h1>
        <p className="text-on-surface-variant text-xl font-light leading-relaxed">
          Lumimar Homes was founded on a simple premise: the Kenya Coast deserves a property management standard that matches its natural beauty. We bridge the gap between luxury hospitality and private rentals.
        </p>
      </section>

      <section className="py-24 px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="/images/s9/1.jpg" alt="Lumimar managed property" className="rounded-2xl shadow-ambient w-full object-cover aspect-square" loading="lazy" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl text-primary mb-6 font-headline">Local Heart, Global Standards</h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Our team consists of hospitality veterans, interior architects, and local operations experts who understand the unique nuances of managing properties in coastal environments.
            </p>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              We don't just manage keys; we curate experiences. From the thread count of our linens to the responsiveness of our 24/7 concierge, every detail is engineered for excellence.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8">
              <div>
                <h4 className="text-4xl font-bold text-primary mb-2">Local</h4>
                <p className="text-sm text-on-surface-variant uppercase tracking-widest">Coast-Based Operations</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-primary mb-2">Owner</h4>
                <p className="text-sm text-on-surface-variant uppercase tracking-widest">First Reporting Standard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Local market intelligence -- */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4 block text-sm">Micro-Market Expertise</span>
            <h2 className="font-headline text-4xl text-primary mb-4">We Know Every Corner of This Coast.</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Most agencies treat "Kenya Coast" as one market. We don't. Each location has its own demand patterns, its own premium seasons, its own ideal guest. That knowledge is our edge.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { location: 'Diani Beach', icon: 'surfing', insight: 'Leisure demand, event calendars, and seasonal travel patterns all shape pricing and positioning here.', tag: 'Seasonal Demand' },
              { location: 'Watamu', icon: 'water', insight: 'Eco-tourism and destination travel influence the kind of guests who book and what they value.', tag: 'Destination Travel' },
              { location: 'Kilifi', icon: 'sailing', insight: 'Longer-stay demand and lifestyle travel make listing strategy different from pure holiday inventory.', tag: 'Longer Stays' },
              { location: 'Malindi', icon: 'flight', insight: 'Cultural travel and repeat regional demand require a more local, relationship-driven operating approach.', tag: 'Repeat Demand' },
            ].map(({ location, icon, insight, tag }) => (
              <div key={location} className="bg-white p-8 rounded-xl shadow-ambient border border-outline-variant/10 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">{tag}</span>
                </div>
                <h3 className="font-headline text-xl text-primary mb-3">{location}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-tertiary-fixed-dim text-5xl mb-6">format_quote</span>
          <h3 className="text-3xl md:text-4xl font-light leading-snug mb-8">
            "Owners deserve clear communication, disciplined operations, and honest reporting instead of vague promises."
          </h3>
          <p className="text-primary-fixed-dim uppercase tracking-widest text-sm font-bold">Lumimar Service Standard</p>
        </div>
      </section>

      {/* -- Contact -- */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl text-primary mb-4">Let's Talk About Your Property</h2>
          <p className="text-on-surface-variant text-lg mb-12 leading-relaxed">
            Whether you're ready to partner or just exploring your options, we'd love to hear from you. No pressure, no scripts, just a straight conversation about what your property can earn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="inline-block bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-primary-container transition-colors shadow-ambient"
            >
              Get a Free Revenue Estimate
            </Link>
            <a
              href="https://wa.me/254705551021"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-lg font-bold hover:bg-[#1ebc5a] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +254 705 551 021
            </a>
            <a
              href="mailto:hello@lumimarbrand.co.ke"
              className="inline-flex items-center justify-center gap-3 border border-outline-variant/30 text-primary px-10 py-4 rounded-lg font-bold hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined">mail</span>
              hello@lumimarbrand.co.ke
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
