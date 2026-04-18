import { useState } from 'react';
import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/254705551021';

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const faqs = [
  {
    q: 'What is your management fee?',
    a: 'Our commission ranges from 15% to 25% of gross rental income depending on the service tier. Full Management is 20-25%; Co-Hosting starts from 15%. There are no hidden fees - your monthly statement shows every line item clearly.'
  },
  {
    q: 'How do you handle guest screenings?',
    a: 'Every guest is verified against our screening criteria: a government-issued ID, a positive review history on their platform, and a pre-arrival communication assessment. For long-term stays, we additionally require employment verification and reference checks.'
  },
  {
    q: 'Can I still use my home for personal trips?',
    a: "Absolutely. You maintain full control of your calendar. Simply mark personal dates in the owner portal and we plan around them. We recommend 2 weeks' notice during high season so we can optimise bookings around your dates."
  },
  {
    q: 'What about damage and insurance?',
    a: "We operate with a layered protection model. Airbnb's AirCover provides up to $3M for structural damage. We additionally carry an operational insurance policy. Any guest-caused damage is documented, reported, and pursued through the platform within 48 hours of checkout."
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[751px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/s6/1.jpg" alt="Shanzu coastal villa" className="w-full h-full object-cover brightness-[0.85]" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="max-w-2xl bg-surface/10 backdrop-blur-sm p-12 rounded-xl">
            <span className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-dim mb-4 block">
              For Property Owners on the Kenya Coast
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6">
              Your Property<br />Should Be Earning More.
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-lg leading-relaxed">
              Lumimar helps property owners increase consistency, improve presentation, and run cleaner operations across the Kenya Coast. Request a tailored revenue estimate based on your property, location, and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply" className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all text-center">
                Get a Free Revenue Estimate
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white backdrop-blur-sm px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-primary text-white py-10 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: 'Local', label: 'Coast-Based Team' },
            { stat: 'Live', label: 'Owner Portal Access' },
            { stat: 'Clear', label: 'Monthly Reporting' },
            { stat: 'Full', label: 'Operational Support' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="text-3xl font-headline font-bold text-tertiary-fixed-dim">{stat}</p>
              <p className="text-xs uppercase tracking-widest text-white/60 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diaspora callout strip ── */}
      <section className="bg-tertiary-fixed-dim py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-on-tertiary-fixed font-headline text-2xl md:text-3xl font-bold leading-snug">
              Based in London. Own in Diani.<br className="hidden md:block" /> We handle everything in between.
            </p>
            <p className="text-on-tertiary-fixed/70 mt-2 text-sm max-w-xl">
              Lumimar is built for owners who want reliable local operations, clear reporting, and fewer day-to-day interruptions.
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/full-management" className="inline-block bg-[#001226] text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-[#001226] transition-all whitespace-nowrap">
              See Full Management &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-16 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <p className="font-headline text-2xl text-primary italic leading-snug mb-4">
              "What matters most is clear communication, consistent operations, and knowing the property is being cared for properly."
            </p>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Owner Expectations / Lumimar Service Standard</p>
          </div>
          <div className="md:w-72 shrink-0">
            <div className="bg-secondary-container rounded-xl p-6 space-y-3">
              <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">What owners care about</p>
              <div className="rounded-lg bg-white/60 p-4">
                <p className="text-primary font-bold text-base">Clear reporting</p>
                <p className="text-xs text-on-surface-variant mt-1">Understand bookings, costs, and payouts without chasing updates.</p>
              </div>
              <div className="rounded-lg bg-white/60 p-4">
                <p className="text-primary font-bold text-base">Reliable operations</p>
                <p className="text-xs text-on-surface-variant mt-1">Housekeeping, maintenance, and guest communication handled consistently.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-headline text-4xl text-primary mb-4">Why most owners leave money on the table.</h2>
          <div className="w-24 h-1 bg-tertiary-fixed-dim"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-surface-container-low p-10 rounded-xl flex flex-col justify-between border-l-4 border-error/30 min-h-[220px]">
            <div>
              <span className="material-symbols-outlined text-4xl text-primary mb-6">trending_down</span>
              <h3 className="font-headline text-2xl mb-4">Low Occupancy & Seasonal Dips</h3>
              <p className="text-on-surface-variant max-w-md">Most owners miss out on 40% of potential annual revenue due to static pricing and poor platform visibility. We fix both - automatically, every day.</p>
            </div>
            <div className="mt-8 text-sm font-medium text-error">Many self-managed homes underperform because pricing, presentation, and response time are inconsistent.</div>
          </div>
          <div className="md:col-span-5 bg-surface-container-high p-10 rounded-xl flex flex-col justify-center border-l-4 border-primary/20 min-h-[220px]">
            <span className="material-symbols-outlined text-4xl text-primary mb-6">home_repair_service</span>
            <h3 className="font-headline text-2xl mb-4">Management Stress</h3>
            <p className="text-on-surface-variant">Midnight maintenance calls, guest vetting, and coordinating cleaning crews shouldn't be your weekend reality.</p>
          </div>
          <div className="md:col-span-12 bg-secondary-container p-10 rounded-xl flex items-center gap-12">
            <div className="flex-1">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">visibility_off</span>
              <h3 className="font-headline text-2xl mb-4">Poor Visual Presentation</h3>
              <p className="text-on-surface-variant">In a crowded market, generic photos and unoptimized listings get scrolled past. You have 3 seconds to capture a guest's attention.</p>
            </div>
            <div className="hidden md:block w-1/3 h-48 rounded-xl overflow-hidden shrink-0">
              <img src="/images/s9/2.jpg" alt="Shanzu property" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why owners choose Lumimar ── */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-headline text-5xl leading-tight">What You Stop Worrying About.</h2>
            <p className="text-white/70 text-lg">We don't just "list" your home. We curate an experience that guests crave, algorithms reward, and owners never have to think about.</p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">stars</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Professional Co-Hosting</h4>
                  <p className="text-white/60">AI-powered, data-driven pricing and elite guest communication that consistently ranks our properties at the top of every search - year-round.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">shutter_speed</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Full Management</h4>
                  <p className="text-white/60">360-degree service including housekeeping, maintenance, professional staging, and monthly payouts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">palette</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Interior Styling</h4>
                  <p className="text-white/60">Turnkey furnishing and photography that transforms empty spaces into high-converting listings.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <img src="/images/s5/1.jpg" alt="Shanzu managed property" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Service selector ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-headline text-4xl mb-4">Where are you starting from?</h2>
          <p className="text-on-surface-variant">Pick your situation - we'll show you exactly how we can help.</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Link to="/full-management" className="bg-white p-8 rounded-xl shadow-ambient cursor-pointer hover:border-tertiary-fixed-dim border-2 border-transparent transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">chair</span>
              <div className="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-tertiary-fixed-dim group-hover:bg-tertiary-fixed-dim transition-colors"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#0F2740]">I have a furnished unit</h3>
            <p className="text-on-surface-variant text-sm">Ready for immediate listing. We optimise your current setup for high-yield bookings from day one.</p>
          </Link>
          <Link to="/interior-styling" className="bg-white p-8 rounded-xl shadow-ambient cursor-pointer hover:border-tertiary-fixed-dim border-2 border-transparent transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">architecture</span>
              <div className="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-tertiary-fixed-dim transition-colors"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#0F2740]">I need setup support</h3>
            <p className="text-on-surface-variant text-sm">From interior design to procurement, we transform empty spaces into guest-ready, high-performing homes.</p>
          </Link>
          <Link to="/long-term-stays" className="bg-white p-8 rounded-xl shadow-ambient cursor-pointer hover:border-tertiary-fixed-dim border-2 border-transparent transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">calendar_month</span>
              <div className="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-tertiary-fixed-dim transition-colors"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#0F2740]">I want monthly stays</h3>
            <p className="text-on-surface-variant text-sm">Stable, mid-term occupancy for remote professionals and corporate relocations with a lower operational burden.</p>
          </Link>
          <Link to="/full-management" className="bg-white p-8 rounded-xl shadow-ambient cursor-pointer hover:border-tertiary-fixed-dim border-2 border-transparent transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">key</span>
              <div className="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-tertiary-fixed-dim transition-colors"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#0F2740]">I want fully hands-off</h3>
            <p className="text-on-surface-variant text-sm">Our Full Management tier. We handle everything - tax filings to lawn care - and you receive a monthly payout.</p>
          </Link>
        </div>
          <div className="text-center mt-12">
            <Link to="/apply" className="inline-block bg-primary text-white px-10 py-4 rounded-lg font-bold">Get a Custom Plan &rarr;</Link>
          </div>
      </section>

      {/* ── Transparency section ── */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative bg-surface-container-high rounded-xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="px-3 py-1 bg-primary text-white text-[10px] rounded-full uppercase tracking-widest font-bold">Owner Visibility</span>
              </div>
              <h4 className="font-headline text-lg mb-6">Performance Dashboard</h4>
              <div className="space-y-4">
                <div className="h-32 w-full bg-white rounded-lg flex items-end justify-between p-4 gap-2">
                  <div className="w-full bg-primary/20 h-[40%] rounded-t-sm"></div>
                  <div className="w-full bg-primary/30 h-[60%] rounded-t-sm"></div>
                  <div className="w-full bg-primary/40 h-[55%] rounded-t-sm"></div>
                  <div className="w-full bg-primary/50 h-[80%] rounded-t-sm"></div>
                  <div className="w-full bg-tertiary-fixed-dim h-[95%] rounded-t-sm"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-xs text-on-surface-variant">Reporting</p>
                    <p className="text-xl font-bold text-primary">Live</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-xs text-on-surface-variant">Statements</p>
                    <p className="text-xl font-bold text-primary">Monthly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="font-headline text-4xl leading-tight">Total Transparency. Total Peace of Mind.</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">analytics</span>
                <div>
                  <p className="font-bold text-lg">Real-Time Reporting</p>
                  <p className="text-on-surface-variant">Live access to booking calendars, revenue reports, and guest feedback through your owner portal. Every shilling accounted for.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">map</span>
                <div>
                  <p className="font-bold text-lg">Hyper-Local Market Intelligence</p>
                  <p className="text-on-surface-variant">Each part of the coast behaves differently. We price and position properties around local demand patterns instead of treating the entire region as one market.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">gavel</span>
                <div>
                  <p className="font-bold text-lg">Tax & Compliance Support</p>
                  <p className="text-on-surface-variant">We organise KRA income documentation, STR licensing guidance, and vendor invoice records monthly - so your rental income stays fully above board.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">security</span>
                <div>
                  <p className="font-bold text-lg">Premium Asset Protection</p>
                  <p className="text-on-surface-variant">Vetted guests only, accompanied by layered short-term rental insurance coverage on every stay.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Journey steps ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl mb-4">From First Call to First Payout</h2>
            <p className="text-on-surface-variant">From consultation to first booking in as little as 14 days.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-outline-variant z-0"></div>
            {[
              { n: '01', title: 'Valuation', desc: 'We perform a detailed market analysis and give you a clear revenue projection - for free.' },
              { n: '02', title: 'Preparation', desc: 'Professional staging and photography to make your home stand out from the first search result.' },
              { n: '03', title: 'Launch', desc: 'Multi-channel listing across Airbnb, Booking.com, VRBO, and our private direct portal.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="relative z-10 flex-1 text-center md:text-left">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-surface shadow-ambient flex items-center justify-center mx-auto md:mx-0 mb-6">
                  <span className="text-3xl font-headline font-bold text-tertiary-fixed-dim">{n}</span>
                </div>
                <h4 className="font-bold text-xl mb-2">{title}</h4>
                <p className="text-sm text-on-surface-variant">{desc}</p>
              </div>
            ))}
            <div className="relative z-10 flex-1 text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-primary border-4 border-surface shadow-ambient flex items-center justify-center mx-auto md:mx-0 mb-6">
                <span className="material-symbols-outlined text-4xl text-white">payments</span>
              </div>
              <h4 className="font-bold text-xl mb-2">Earn</h4>
              <p className="text-sm text-on-surface-variant">Receive monthly payouts direct to your account. Most owners see their first transfer within 45 days of onboarding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <h2 className="font-headline text-4xl text-center mb-4">Common Questions</h2>
        <p className="text-on-surface-variant text-center mb-12">Everything you need to know before partnering with us.</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface-container rounded-xl overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-6 text-left hover:bg-surface-container-high transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span className="font-bold pr-4">{faq.q}</span>
                <span className="material-symbols-outlined shrink-0 transition-transform duration-200" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  expand_more
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-on-surface-variant text-sm mb-4">Still have questions?</p>
          <a
            href="https://wa.me/254705551021"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1ebc5a] transition-colors"
          >
            <WhatsAppIcon />
            Ask us on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto bg-primary rounded-3xl p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="/images/s4/1.jpg" alt="Shanzu property" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="font-headline text-5xl text-white">Ready to see what your property can earn?</h2>
            <p className="text-white/70 max-w-xl mx-auto text-lg leading-relaxed">
              Get a free, no-obligation revenue estimate based on real data from our active portfolio on the Kenya Coast.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
              <Link to="/apply" className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-12 py-5 rounded-lg font-bold text-lg hover:bg-white transition-colors">
                Get Free Revenue Estimate
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
