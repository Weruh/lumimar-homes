import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/254705551021';

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const services = [
  {
    icon: 'support_agent',
    title: 'Guest Management',
    desc: '24/7 concierge communication from first inquiry to post-checkout review. You never answer a single guest message.'
  },
  {
    icon: 'insights',
    title: 'AI-Powered Dynamic Pricing',
    desc: 'Daily rate adjustments using PriceLabs data — driven by live demand, local events, and seasonality — maximising your yield every night.'
  },
  {
    icon: 'cleaning_services',
    title: 'Professional Housekeeping',
    desc: 'Vetted cleaning crews for every turnover and scheduled deep cleans. Linen, supplies, and presentation are always guest-ready.'
  },
  {
    icon: 'handyman',
    title: 'Maintenance & Repairs',
    desc: 'We coordinate all vendors, get approvals for estimates above your threshold, and handle every repair end-to-end.'
  },
  {
    icon: 'hub',
    title: 'Platform Management',
    desc: 'Your property listed and optimised across Airbnb, Booking.com, VRBO, and our private direct portal — all in sync.'
  },
  {
    icon: 'analytics',
    title: 'Monthly Reporting',
    desc: "Clear, line-item financial statements and a real-time owner portal. You always know exactly what's happening."
  },
  {
    icon: 'gavel',
    title: 'Tax & Compliance',
    desc: 'KRA income documentation, STR licensing guidance, and vendor invoice records — organised every month so your earnings stay fully above board.'
  },
];

export default function FullManagement() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[707px] flex items-center px-8 md:px-24 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/s11/1.jpg" alt="Shanzu managed property" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#001226]/90 to-[#0F2740]/70"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <p className="font-label text-tertiary-fixed-dim tracking-[0.3em] uppercase mb-6 text-sm">Platinum Tier · Fully Hands-Off</p>
          <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight mb-8 tracking-tighter">
            Full Management:<br />Nothing Left to Chance.
          </h1>
          <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-2xl font-light">
            For owners who want zero operational involvement — whether you live in Nairobi, London, or Dubai. We take total stewardship of your property. You just receive your monthly transfer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/apply" className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-10 py-4 rounded-md font-semibold tracking-wide hover:bg-white transition-all duration-300 shadow-ambient text-center">
              Get a Free Revenue Estimate
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/30 text-white backdrop-blur-sm px-10 py-4 rounded-md font-semibold tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Diaspora strip ── */}
      <section className="bg-tertiary-fixed-dim py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-on-tertiary-fixed font-headline text-2xl md:text-3xl font-bold">
              Based in London. Own in Diani. We handle everything in between.
            </p>
            <p className="text-on-tertiary-fixed/70 mt-2 text-sm max-w-2xl">
              Full Management was built for the diaspora owner. Monthly payouts wired to your account, zero guest messages, full financial statements — whether you are in Manchester, Toronto, or Dubai.
            </p>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-[#001226] text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-[#001226] transition-all whitespace-nowrap"
          >
            <WhatsAppIcon />
            Talk to Us
          </a>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl md:text-5xl text-primary mb-6">Everything. Handled.</h2>
            <p className="text-on-surface-variant text-lg">Full Management is a complete operational takeover. Here is every responsibility we remove from your plate.</p>
          </div>
          <span className="font-headline italic text-tertiary-fixed-dim text-xl whitespace-nowrap">The Platinum Tier</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon, title, desc }) => (
            <div key={title} className="bg-surface-container-low p-8 rounded-xl flex flex-col hover:bg-white hover:shadow-ambient transition-all duration-500 group border border-transparent hover:border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 group-hover:scale-110 duration-300 transition-transform">{icon}</span>
              <h3 className="font-headline text-xl mb-4">{title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing transparency ── */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4 block text-sm">No Hidden Fees. Ever.</span>
          <h2 className="font-headline text-4xl text-primary mb-6">Simple, Transparent Pricing</h2>
          <p className="text-on-surface-variant mb-16 max-w-xl mx-auto">We charge a percentage of gross revenue — nothing else. Your monthly statement shows every booking, every deduction, every shilling.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-10 shadow-ambient border border-outline-variant/10 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Co-Hosting</p>
              <p className="font-headline text-5xl text-primary mb-2">15%</p>
              <p className="text-on-surface-variant text-sm mb-6">of gross booking revenue</p>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-primary">check</span> AI-powered dynamic pricing</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-primary">check</span> 24/7 guest communication</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-primary">check</span> Multi-platform listing management</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-primary">check</span> Real-time owner portal</li>
              </ul>
              <Link to="/co-hosting" className="inline-block mt-8 text-primary font-bold border-b-2 border-tertiary-fixed-dim pb-0.5 hover:border-primary transition-colors text-sm">
                Learn about Co-Hosting →
              </Link>
            </div>
            <div className="bg-primary rounded-2xl p-10 shadow-2xl text-left relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-widest">Most Popular</div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Full Management</p>
              <p className="font-headline text-5xl text-tertiary-fixed-dim mb-2">20–25%</p>
              <p className="text-white/60 text-sm mb-6">of gross booking revenue</p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-tertiary-fixed-dim">check</span> Everything in Co-Hosting</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-tertiary-fixed-dim">check</span> Professional housekeeping and linen</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-tertiary-fixed-dim">check</span> Full maintenance coordination</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-tertiary-fixed-dim">check</span> Tax and compliance documentation</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-tertiary-fixed-dim">check</span> Direct bank payout every month</li>
              </ul>
              <Link to="/apply" className="inline-block mt-8 bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-3 rounded-md font-bold hover:bg-white transition-colors text-sm">
                Get a Free Estimate
              </Link>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant/60">No setup fees. No exit penalties. No surprises. The exact rate depends on property type and location — your estimate will confirm it.</p>
        </div>
      </section>

      {/* ── Ideal owner profile ── */}
      <section className="bg-secondary-container py-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 rounded-xl overflow-hidden shadow-ambient">
            <img src="/images/s12/1.jpg" alt="Shanzu coastal property" className="w-full aspect-square object-cover" loading="lazy" />
          </div>
          <div className="lg:w-1/2">
            <span className="font-label text-on-secondary-container tracking-widest uppercase mb-4 block text-sm">Who Is Full Management For?</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary mb-8 leading-tight">Designed for the Truly Hands-Off Owner.</h2>
            <div className="space-y-5">
              {[
                'Diaspora owners based in the UK, US, or Middle East who cannot manage day-to-day operations from abroad.',
                'Investors with multiple properties who need a professional operator — not another job.',
                'Owners transitioning from traditional renting who want zero operational involvement and predictable yields.',
                'Anyone who wants reliable, growing rental income without a single guest interaction.'
              ].map(text => (
                <div key={text} className="flex gap-4">
                  <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <p className="text-on-secondary-container">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Responsibility split ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline text-4xl text-primary mb-4">Who Does What</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">A clear breakdown so there are no surprises. Short version: Lumimar does everything.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-primary text-white p-12 rounded-xl shadow-ambient">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-headline italic text-2xl text-tertiary-fixed-dim">Lumimar</span>
              <div className="h-px flex-grow bg-white/20"></div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">We Handle</span>
            </div>
            <ul className="space-y-5">
              {[
                ['support_agent', 'Guest Comms & Concierge', '24/7 messaging, check-in coordination, and review management.'],
                ['insights', 'Pricing & Revenue Strategy', 'Daily AI-powered rate optimisation across all platforms.'],
                ['cleaning_services', 'Housekeeping & Linen', 'Every turnover clean, deep clean, and supply restock.'],
                ['handyman', 'Maintenance & Vendors', 'All repairs, from reporting to sign-off and payment.'],
                ['hub', 'Platform & Listing Management', 'Photos, copy, SEO, and channel syncing.'],
                ['gavel', 'Tax & Compliance', 'KRA documentation, STR licensing guidance, monthly records.'],
                ['payments', 'Financial Reporting & Payouts', 'Monthly statements and direct bank transfer.'],
              ].map(([icon, title, desc]) => (
                <li key={title as string} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">{icon}</span>
                  <div>
                    <h4 className="font-semibold mb-0.5">{title}</h4>
                    <p className="text-white/60 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-low p-12 rounded-xl flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-headline italic text-2xl text-primary">Owner</span>
              <div className="h-px flex-grow bg-outline-variant/30"></div>
              <span className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">You Do</span>
            </div>
            <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-4xl">payments</span>
              </div>
              <h3 className="font-headline text-2xl text-primary">Receive Your Monthly Payout.</h3>
              <p className="text-on-surface-variant max-w-xs leading-relaxed">
                Direct to your account, every month, with a full statement detailing every booking and every deduction. Whether you are in Nairobi or abroad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Local market intelligence ── */}
      <section className="bg-primary py-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4 block text-sm">Why Local Knowledge Wins</span>
            <h2 className="font-headline text-4xl text-white mb-6 leading-tight">We Know This Coast Intimately.</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              No agency based outside Kenya can replicate what we know. We price with precision because we understand the micro-markets — not just the Kenya Coast as a whole.
            </p>
            <div className="space-y-4">
              {[
                ['Diani', 'Peaks 40% above baseline in Q1 during triathlon and safari season. We hold rates firm and fill at premium.'],
                ['Watamu', 'Commands a year-round eco-premium due to the marine reserve. International eco-tourists pay more — and we target them.'],
                ['Kilifi & Malindi', 'Strong long-stay demand from October to March. We shift strategy seasonally to maximise yield.'],
              ].map(([location, insight]) => (
                <div key={location as string} className="flex gap-4 bg-white/5 rounded-lg p-4">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim mt-0.5 shrink-0">location_on</span>
                  <div>
                    <p className="text-tertiary-fixed-dim font-bold text-sm mb-0.5">{location}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center bg-white/5 rounded-2xl p-12">
            <p className="font-headline text-7xl text-tertiary-fixed-dim font-bold mb-2">14–18%</p>
            <p className="text-white/60 uppercase tracking-widest text-xs mb-8">Average Annual Net Yield</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
              Across our active portfolio. Ask us what your specific property should be generating — we will tell you honestly.
            </p>
            <Link to="/apply" className="inline-block mt-8 bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-4 rounded-md font-bold hover:bg-white hover:text-primary transition-all">
              Get My Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">Full Management vs. Doing It Yourself</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">The real cost of self-managing is not just the missed revenue — it is your time, stress, and guest relationships.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-4 pr-8 font-medium text-on-surface-variant"></th>
                  <th className="text-center py-4 px-6 font-bold text-primary">Self-Managed</th>
                  <th className="text-center py-4 px-6 bg-primary/5 rounded-t-lg">
                    <span className="text-primary font-bold">Full Management</span>
                    <span className="block text-tertiary-fixed-dim text-[10px] uppercase tracking-widest font-bold mt-0.5">Lumimar</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  ['Average occupancy', '45–60%', '94%'],
                  ['Annual net yield', '6–9%', '14–18%'],
                  ['Revenue vs self-managed', '—', '+65% avg'],
                  ['Guest communication', 'You, 24/7', 'Lumimar team only'],
                  ['Dynamic pricing', 'Manual guesswork', 'AI-powered, daily'],
                  ['Housekeeping management', 'You coordinate', 'Lumimar schedules & pays'],
                  ['Maintenance response', 'You handle calls', 'Lumimar end-to-end'],
                  ['Tax & compliance', 'DIY', 'Organised monthly'],
                  ['Owner time required', 'Hours per week', 'Zero'],
                ].map(([feature, self, lumimar]) => (
                  <tr key={feature as string}>
                    <td className="py-4 pr-8 font-medium text-primary">{feature}</td>
                    <td className="py-4 px-6 text-center text-on-surface-variant">{self}</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-bold text-primary">{lumimar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-10">
            <Link to="/pricing" className="text-primary font-bold border-b-2 border-tertiary-fixed-dim pb-1 hover:border-primary transition-colors">
              View full pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 pb-32 pt-20">
        <div className="max-w-7xl mx-auto relative rounded-xl overflow-hidden py-24 text-center">
          <div className="absolute inset-0 z-0">
            <img src="/images/s10/1.jpg" alt="Shanzu property" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto px-8">
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-6">
              See exactly how much your property should be earning.
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Request a free, personalised revenue estimate and we will show you the gap between what you are earning now and what is possible under Full Management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply" className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-12 py-5 rounded-md font-bold text-lg hover:bg-white transition-all duration-300 shadow-ambient">
                Get Free Revenue Estimate
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-5 rounded-md font-bold text-lg hover:bg-white/10 transition-all"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
