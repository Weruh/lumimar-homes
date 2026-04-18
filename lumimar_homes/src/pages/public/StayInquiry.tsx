import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/254705551021';

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const stayPreferences = [
  {
    title: 'Short Stays',
    description: 'Tell us your travel dates, group size, and preferred area and we will recommend currently available options.',
    icon: 'hotel',
  },
  {
    title: 'Longer Stays',
    description: 'For 30+ day bookings, we can match you with furnished properties suited to work, relocation, or extended holidays.',
    icon: 'calendar_month',
  },
  {
    title: 'Direct Support',
    description: 'You speak to a real person instead of browsing placeholder listings or waiting on platform chat queues.',
    icon: 'support_agent',
  },
];

export default function StayInquiry() {
  return (
    <>
      <section className="bg-surface-container-lowest px-8 pb-12 pt-20 text-center">
        <span className="mb-4 block text-sm uppercase tracking-[0.2em] text-tertiary-fixed-dim">Direct Booking / Kenya Coast</span>
        <h1 className="mb-6 font-headline text-5xl leading-tight text-primary md:text-6xl">
          Ask About Availability.
          <br />
          <span className="italic font-normal">We&apos;ll Match You Manually.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          This page has been cleaned for production and no longer shows hardcoded properties, rates, or occupancy claims. Message Lumimar directly with your dates, guest count, and preferred location and we&apos;ll recommend suitable live options.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`${WA_LINK}?text=Hi%2C+I%27d+like+help+finding+a+stay+on+the+Kenya+Coast.+Here+are+my+dates+and+preferences%3A`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-8 py-4 font-bold text-white transition-colors hover:bg-[#1ebc5a]"
          >
            <WhatsAppIcon />
            Message on WhatsApp
          </a>
          <Link to="/long-term-stays" className="inline-flex items-center justify-center rounded-lg border border-outline-variant/30 px-8 py-4 font-bold text-primary transition-colors hover:bg-surface-container">
            Explore Long-Term Stays
          </Link>
        </div>
      </section>

      <section className="bg-primary px-8 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-semibold text-white">Send your dates, budget, and preferred area. We&apos;ll reply with live options instead of showing stale or fabricated inventory.</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-6 py-3 font-bold text-primary transition-colors hover:bg-surface-container-low"
          >
            <WhatsAppIcon />
            Start Inquiry
          </a>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {stayPreferences.map(({ title, description, icon }) => (
            <div key={title} className="rounded-2xl border border-outline-variant/10 bg-white p-8 shadow-ambient">
              <span className="material-symbols-outlined mb-5 text-4xl text-primary">{icon}</span>
              <h2 className="mb-3 font-headline text-2xl text-primary">{title}</h2>
              <p className="leading-relaxed text-on-surface-variant">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary-container px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-headline text-4xl text-primary">Need a Longer Stay?</h2>
          <p className="mb-8 text-lg leading-relaxed text-on-secondary-container">
            If you are looking for a monthly stay, relocation base, or remote-work setup, tell us the duration and location you need and we&apos;ll advise on the best available fit.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/long-term-stays" className="inline-block rounded-md bg-primary px-8 py-4 font-bold text-white transition-colors hover:bg-primary/90">
              View Long-Term Stays
            </Link>
            <a
              href={`${WA_LINK}?text=Hi%2C+I%27m+looking+for+a+monthly+stay+and+would+like+to+share+my+requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-outline-variant/30 px-8 py-4 font-bold text-primary transition-colors hover:bg-white/60"
            >
              <WhatsAppIcon />
              Ask About Monthly Options
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
