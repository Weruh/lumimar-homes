import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/254705551021';

const tiers = [
  {
    name: 'Co-Hosting',
    price: '15%',
    unit: 'of gross revenue',
    tag: null,
    tagColor: '',
    desc: 'You stay involved in the day-to-day. We handle the digital complexity - pricing, listings, and guest communication - and make your property perform like a professionally managed asset.',
    features: [
      'Dynamic pricing updated daily',
      'Full listing optimisation (all platforms)',
      '24/7 guest communication',
      'Monthly owner reporting',
      'Real-time owner portal access',
      'No setup fee / No hidden charges',
    ],
    cta: 'Get Started',
    ctaStyle: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    link: '/apply',
  },
  {
    name: 'Full Management',
    price: '20-25%',
    unit: 'of gross revenue',
    tag: 'Most Popular',
    tagColor: 'bg-tertiary-fixed-dim text-on-tertiary-fixed',
    desc: 'Completely hands-off ownership. Lumimar handles every aspect of your property - from guest communication and housekeeping to maintenance, compliance, and monthly payouts.',
    features: [
      'Everything in Co-Hosting, plus:',
      'Professional housekeeping every turnover',
      'Maintenance coordination end-to-end',
      'Interior staging & professional photography',
      'KRA documentation & STR licensing guidance',
      'Direct bank transfer every month',
    ],
    cta: 'Get Free Estimate',
    ctaStyle: 'bg-primary text-white hover:bg-primary/90',
    link: '/apply',
  },
  {
    name: 'Long-Term Stays',
    price: 'Custom',
    unit: 'monthly rate',
    tag: null,
    tagColor: '',
    desc: 'Optimised for 30-90 day stays targeting remote professionals and corporate relocations. Predictable monthly income with zero short-let volatility.',
    features: [
      'Vetted professional tenants only',
      'Employment & background verification',
      'Fully furnished, fibre internet included',
      'Bi-weekly professional cleaning',
      'Dedicated workspace setup',
      'Preferential monthly rate pricing',
    ],
    cta: 'Learn More',
    ctaStyle: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    link: '/long-term-stays',
  },
];

export default function Pricing() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-8 max-w-4xl mx-auto text-center">
        <p className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4 text-sm">Transparent Pricing</p>
        <h1 className="font-headline text-5xl md:text-6xl text-primary leading-tight mb-6">
          No Setup Fees.<br />
          <span className="italic font-normal">No Hidden Charges.</span>
        </h1>
        <p className="text-on-surface-variant text-xl font-light leading-relaxed max-w-2xl mx-auto">
          We earn when you earn. Our commission model means our interests are perfectly aligned with yours - we only make money when your property performs.
        </p>
      </section>

      {/* ── Pricing cards ── */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative rounded-2xl border flex flex-col ${tier.tag ? 'border-primary shadow-2xl md:-translate-y-4' : 'border-outline-variant/20 shadow-ambient'}`}>
              {tier.tag && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${tier.tagColor}`}>{tier.tag}</span>
                </div>
              )}
              <div className={`p-10 rounded-2xl flex flex-col flex-grow ${tier.tag ? 'bg-primary-container' : 'bg-white'}`}>
                <h2 className="font-headline text-2xl text-primary mb-2">{tier.name}</h2>
                <div className="mb-6">
                  <span className="font-headline text-5xl font-bold text-primary">{tier.price}</span>
                  <span className="text-on-surface-variant text-sm ml-2">{tier.unit}</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">{tier.desc}</p>
                <ul className="space-y-3 mb-10 flex-grow">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm mt-0.5 shrink-0">check_circle</span>
                      <span className="text-on-surface-variant">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={tier.link} className={`block w-full text-center py-4 rounded-md font-bold transition-colors ${tier.ctaStyle}`}>
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-16 px-8 bg-surface-container-low">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl text-primary mb-3">Lumimar vs. Managing It Yourself</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">A qualitative view of how owner responsibilities and support levels differ across service models.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-4 pr-8 text-on-surface-variant font-medium"></th>
                  <th className="text-center py-4 px-6 text-primary font-bold">Self-Managed</th>
                  <th className="text-center py-4 px-6 text-primary font-bold">Other Agency</th>
                  <th className="text-center py-4 px-6 bg-primary/5 rounded-t-lg">
                    <span className="text-primary font-bold">Lumimar</span>
                    <span className="block text-tertiary-fixed-dim text-[10px] uppercase tracking-widest font-bold mt-0.5">Recommended</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  ['Operational consistency', 'Owner dependent', 'Mixed', 'Structured process'],
                  ['Revenue optimisation', 'Manual', 'Agency dependent', 'Active management'],
                  ['Reporting visibility', 'Manual tracking', 'Varies by agency', 'Owner portal and statements'],
                  ['Guest communication', 'You, 24/7', 'Business hours', '24/7 by Lumimar'],
                  ['Dynamic pricing', 'Manual', 'Weekly updates', 'Daily AI-powered'],
                  ['Monthly reporting', 'Manual spreadsheet', 'PDF report', 'Live owner portal'],
                  ['Tax & compliance', 'DIY', 'Not included', 'Included'],
                  ['Setup fee', 'N/A', 'Often charged', 'None'],
                ].map(([feature, self, agency, lumimar]) => (
                  <tr key={feature as string}>
                    <td className="py-4 pr-8 font-medium text-primary">{feature}</td>
                    <td className="py-4 px-6 text-center text-on-surface-variant">{self}</td>
                    <td className="py-4 px-6 text-center text-on-surface-variant">{agency}</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-bold text-primary">{lumimar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-8 max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl text-primary text-center mb-10">Common Questions</h2>
        <div className="space-y-6">
          {[
            ['When do you take your commission?', 'We deduct our commission from gross booking revenue before transferring the balance to you. Your monthly statement shows every booking, every deduction, and every transfer - line by line.'],
            ['Are there any other fees?', 'No setup fees, no photography fees, no listing fees. The only cost is our commission on revenue actually earned. If your property earns nothing, you pay nothing.'],
            ['How quickly can you onboard my property?', 'We can onboard within 5-7 business days. That includes a property visit, professional photography, listing creation, and platform setup.'],
            ['Can I switch tiers later?', 'Yes. You can upgrade from Co-Hosting to Full Management or switch to Long-Term Stays at any time with 30 days notice.'],
          ].map(([q, a]) => (
            <div key={q as string} className="border border-outline-variant/20 rounded-xl p-6">
              <h3 className="font-bold text-primary mb-2">{q}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-8 bg-primary text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl text-white mb-4">Not sure which tier is right?</h2>
          <p className="text-white/70 mb-10 text-lg leading-relaxed">
            Tell us about your property and we'll tell you honestly which service will maximise your returns. Free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply" className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-10 py-4 rounded-md font-bold hover:bg-white transition-colors">
              Get a Free Revenue Estimate
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-4 rounded-md font-bold hover:bg-white/10 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
