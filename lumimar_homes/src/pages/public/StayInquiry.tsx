import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/254705551021';

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const properties = [
  {
    name: 'Shanzu 3-Bedroom Villa',
    location: 'Shanzu, Mombasa',
    locationIcon: 'villa',
    beds: 3,
    guests: 6,
    baths: 2,
    rate: 'KES 17,000',
    usdRate: '$130',
    tag: 'Best Value',
    tagColor: 'bg-primary text-white',
    desc: 'Spacious 3-bedroom villa in a prime Shanzu location. Fully furnished with modern finishes, fast Wi-Fi, and a private outdoor area. Ideal for families and groups.',
    img: '/images/s6/1.jpg',
  },
  {
    name: 'Shanzu 2-Bed Penthouse',
    location: 'Shanzu, Mombasa',
    locationIcon: 'apartment',
    beds: 2,
    guests: 4,
    baths: 2,
    rate: 'KES 13,500',
    usdRate: '$105',
    tag: 'Penthouse',
    tagColor: 'bg-[#1a237e] text-white',
    desc: 'Top-floor penthouse with panoramic views. Features a dedicated workspace with high-speed fibre, premium furnishings, and a wraparound balcony - built for remote professionals.',
    img: '/images/s5/1.jpg',
  },
  {
    name: 'Shanzu Ocean Villa',
    location: 'Shanzu, Mombasa',
    locationIcon: 'water',
    beds: 2,
    guests: 4,
    baths: 2,
    rate: 'KES 15,500',
    usdRate: '$120',
    tag: 'Villa',
    tagColor: 'bg-[#2e7d32] text-white',
    desc: 'A beautifully appointed 2-bedroom villa with resort-style interiors, private garden, and premium kitchen. Professionally managed with hotel-standard linen and amenities.',
    img: '/images/s9/1.jpg',
  },
  {
    name: 'Shanzu 1-Bed VIP Penthouse',
    location: 'Shanzu, Mombasa',
    locationIcon: 'star',
    beds: 1,
    guests: 2,
    baths: 1,
    rate: 'KES 9,500',
    usdRate: '$75',
    tag: 'VIP Suite',
    tagColor: 'bg-tertiary-fixed-dim text-on-tertiary-fixed',
    desc: 'Intimate VIP penthouse for couples or solo travellers who demand quality. Curated d(c)cor, rooftop access, and a fully-equipped kitchen in the heart of Shanzu.',
    img: '/images/s10/1.jpg',
  },
];

export default function StayInquiry() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-20 pb-12 px-8 bg-surface-container-lowest text-center">
        <span className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4 block text-sm">Direct Booking / Shanzu, Mombasa</span>
        <h1 className="font-headline text-5xl md:text-6xl text-primary mb-6 leading-tight">
          Book Direct.<br />
          <span className="italic font-normal">Skip the Platform Fee.</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
          Every property below is managed by Lumimar in Shanzu, Mombasa. Book directly with us via WhatsApp and save the 12-15% platform commission - we pass a portion of that saving straight back to you.
        </p>
        <div className="inline-flex items-center gap-2 bg-tertiary-fixed-dim/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
          <span className="material-symbols-outlined text-base">verified</span>
          All properties professionally managed / 4.9 average guest rating
        </div>
      </section>

      {/* ── Direct booking incentive strip ── */}
      <section className="bg-primary py-6 px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-2xl">savings</span>
            <p className="text-white font-semibold">Book direct and save up to 15% vs. Airbnb pricing - same property, better rate, direct relationship.</p>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-md font-bold hover:bg-[#1ebc5a] transition-colors whitespace-nowrap">
            <WhatsAppIcon />
            Chat to Book
          </a>
        </div>
      </section>

      {/* ── Property grid ── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((p) => (
            <div key={p.name} className="bg-white rounded-2xl shadow-ambient overflow-hidden border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 group flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${p.tagColor}`}>{p.tag}</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {p.location}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-headline text-2xl text-primary mb-2">{p.name}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">{p.desc}</p>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-6 border-t border-outline-variant/10 pt-4">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bed</span>{p.beds} beds</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span>{p.guests} guests</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">shower</span>{p.baths} baths</span>
                  <span className="ml-auto font-bold text-primary text-sm">
                    {p.rate}<span className="font-normal text-on-surface-variant"> / night</span>
                    <span className="text-on-surface-variant font-normal ml-1">({p.usdRate})</span>
                  </span>
                </div>
                <a
                  href={`${WA_LINK}?text=Hi%2C+I'm+interested+in+booking+${encodeURIComponent(p.name)}+in+Shanzu.+Could+you+confirm+availability+and+rates%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-bold hover:bg-[#1ebc5a] transition-colors"
                >
                  <WhatsAppIcon />
                  Book via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── More properties note ── */}
      <section className="py-12 px-8 bg-surface-container-low text-center">
        <p className="text-on-surface-variant mb-2">More properties available - we list across all major platforms too.</p>
        <p className="text-sm text-on-surface-variant/60 mb-6">Can't find what you're looking for? Message us and we'll match you to the right property in Shanzu.</p>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
          <WhatsAppIcon />
          Ask About Availability
        </a>
      </section>

      {/* ── Long-term stays CTA ── */}
      <section className="py-20 px-8 bg-secondary-container">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="font-label text-on-secondary-container tracking-widest uppercase mb-3 block text-xs">Staying Longer?</span>
            <h2 className="font-headline text-3xl text-primary mb-4">Monthly Stays From KES 250,000</h2>
            <p className="text-on-secondary-container leading-relaxed mb-6">
              Remote professionals and corporate relocations get preferential monthly rates in Shanzu. Fully furnished, fibre internet, dedicated workspace - everything set up before you arrive.
            </p>
            <Link to="/long-term-stays" className="inline-block bg-primary text-white px-8 py-4 rounded-md font-bold hover:bg-primary/90 transition-colors">
              Explore Long-Term Options
            </Link>
          </div>
          <div className="shrink-0 text-center bg-white rounded-2xl p-8 shadow-ambient">
            <p className="font-headline text-5xl text-primary font-bold mb-1">98%</p>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant">Long-stay occupancy</p>
            <div className="mt-4 pt-4 border-t border-outline-variant/10">
              <p className="font-headline text-3xl text-tertiary-fixed-dim font-bold mb-1">30-90</p>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant">Day stay options</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
