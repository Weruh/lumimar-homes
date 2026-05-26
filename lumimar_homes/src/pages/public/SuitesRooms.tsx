import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomTypes, suites, type RoomType, type Suite } from '../../data/suites';
import { submitBookingRequest } from '../../lib/bookingRequests';

const WA_LINK = 'https://wa.me/254705551021';

const encodeBookingText = (suiteName: string, checkIn: string, checkOut: string, guests: number) => {
  const dates = checkIn && checkOut ? ` from ${checkIn} to ${checkOut}` : '';
  return encodeURIComponent(
    `Hi, I would like to book ${suiteName}${dates} for ${guests} guest${guests === 1 ? '' : 's'}. Please confirm availability and the direct booking rate.`,
  );
};

export default function SuitesRooms() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<RoomType>('All');
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submittingSuite, setSubmittingSuite] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredSuites = useMemo(
    () =>
      suites.filter((suite) => {
        const matchesType = selectedType === 'All' || suite.type === selectedType;
        const matchesGuests = suite.guests >= guests;
        return matchesType && matchesGuests;
      }),
    [selectedType, guests],
  );

  const sendBookingRequest = async (suite: Suite) => {
    setNotice(null);
    setError(null);

    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      setError('Please add your name, email, and phone before sending a booking request.');
      return;
    }

    setSubmittingSuite(suite.name);

    try {
      await submitBookingRequest({
        suiteName: suite.name,
        roomType: suite.type,
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        guests,
        message,
        website,
      });
      setNotice(`Your request for ${suite.name} was sent. Lumimar will reply by email or phone.`);
      setMessage('');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to send booking request.');
    } finally {
      setSubmittingSuite(null);
    }
  };

  const openSuite = (suite: Suite) => {
    navigate(`/suites-rooms/${suite.slug}`);
  };

  return (
    <>
      <section className="relative min-h-[520px] overflow-hidden bg-primary text-white">
        <img
          src="/images/s6/2.jpg"
          alt="Lumimar coastal suite"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001226]/80 via-[#001226]/55 to-[#001226]/10" />
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-6 py-16 md:px-8">
          <div className="max-w-2xl">
            <span className="font-label mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-tertiary-fixed-dim">
              Suites and Rooms
            </span>
            <h1 className="font-headline text-4xl font-bold leading-[0.98] tracking-tight md:text-6xl">
              Book a managed coastal stay in Shanzu.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/82 md:text-lg">
              Browse Lumimar-managed suites, penthouses, and villas. Choose your dates, select a room, and confirm availability directly on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-outline-variant/30 bg-white px-6 py-5 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_150px_auto]">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Check in</span>
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              className="h-12 w-full rounded-lg border border-outline-variant bg-white px-4 text-sm text-primary outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Check out</span>
            <input
              type="date"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              className="h-12 w-full rounded-lg border border-outline-variant bg-white px-4 text-sm text-primary outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Guests</span>
            <input
              type="number"
              min="1"
              max="8"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value) || 1)}
              className="h-12 w-full rounded-lg border border-outline-variant bg-white px-4 text-sm text-primary outline-none focus:border-primary"
            />
          </label>
          <a
            href={`${WA_LINK}?text=${encodeBookingText('a Lumimar suite', checkIn, checkOut, guests)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center self-end rounded-lg bg-[#25D366] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1ebc5a]"
          >
            Check Availability
          </a>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_1.4fr]">
            <input
              type="text"
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Your name"
              className="h-12 rounded-lg border border-outline-variant bg-white px-4 text-sm text-primary outline-none focus:border-primary"
            />
            <input
              type="email"
              value={guestEmail}
              onChange={(event) => setGuestEmail(event.target.value)}
              placeholder="Email address"
              className="h-12 rounded-lg border border-outline-variant bg-white px-4 text-sm text-primary outline-none focus:border-primary"
            />
            <input
              type="tel"
              value={guestPhone}
              onChange={(event) => setGuestPhone(event.target.value)}
              placeholder="Phone number"
              className="h-12 rounded-lg border border-outline-variant bg-white px-4 text-sm text-primary outline-none focus:border-primary"
            />
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Optional note"
              className="h-12 rounded-lg border border-outline-variant bg-white px-4 text-sm text-primary outline-none focus:border-primary"
            />
            <input
              type="text"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
          </div>

          {notice ? <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}
          {error ? <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
        </div>
      </section>

      <section className="bg-surface px-6 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
            {roomTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`h-10 shrink-0 rounded-full px-5 text-sm font-bold transition-colors ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-white text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredSuites.map((suite) => (
              <article
                key={suite.name}
                role="link"
                tabIndex={0}
                aria-label={`View details for ${suite.name}`}
                onClick={() => openSuite(suite)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) {
                    return;
                  }
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openSuite(suite);
                  }
                }}
                className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-ambient transition-transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div className="grid min-h-full grid-cols-1 md:grid-cols-[42%_1fr]">
                  <div className="relative min-h-[260px] overflow-hidden bg-surface-container">
                    <img src={suite.image} alt={suite.name} loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                      {suite.type}
                    </span>
                  </div>
                  <div className="flex flex-col p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-headline text-2xl font-bold leading-tight text-primary">{suite.name}</h2>
                        <p className="mt-1 flex items-center gap-1 text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-base">location_on</span>
                          {suite.location}
                        </p>
                      </div>
                      <p className="shrink-0 text-right text-sm font-bold text-primary">
                        {suite.rate}
                        <span className="block text-xs font-normal text-on-surface-variant">{suite.usdRate} / night</span>
                      </p>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">{suite.description}</p>

                    <div className="mb-5 grid grid-cols-3 gap-2 text-sm text-primary">
                      <div className="rounded-md bg-surface-container-low px-3 py-2">
                        <span className="material-symbols-outlined block text-lg">group</span>
                        {suite.guests} guests
                      </div>
                      <div className="rounded-md bg-surface-container-low px-3 py-2">
                        <span className="material-symbols-outlined block text-lg">bed</span>
                        {suite.bedrooms} beds
                      </div>
                      <div className="rounded-md bg-surface-container-low px-3 py-2">
                        <span className="material-symbols-outlined block text-lg">shower</span>
                        {suite.baths} baths
                      </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {suite.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full bg-tertiary-fixed-dim/25 px-3 py-1 text-xs font-semibold text-primary">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void sendBookingRequest(suite);
                      }}
                      disabled={submittingSuite === suite.name}
                      className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="material-symbols-outlined text-lg">calendar_month</span>
                      {submittingSuite === suite.name ? 'Sending request...' : 'Send booking request'}
                    </button>
                    <a
                      href={`${WA_LINK}?text=${encodeBookingText(suite.name, checkIn, checkOut, guests)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="mt-3 flex items-center justify-center rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-surface-container"
                    >
                      WhatsApp instead
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredSuites.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow-ambient">
              <h2 className="font-headline text-2xl text-primary">No rooms match those filters.</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Try fewer guests or choose all room types.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary-container px-6 py-14 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-on-secondary-container">
              Need help choosing?
            </span>
            <h2 className="font-headline mt-3 text-3xl font-bold text-primary">Tell us your dates and group size.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-secondary-container">
              We can recommend the best available suite, confirm the direct booking rate, and share more photos before you pay.
            </p>
          </div>
          <a
            href={`${WA_LINK}?text=${encodeURIComponent('Hi, I need help choosing a Lumimar room. Please send available suites for my travel dates.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-[#1ebc5a]"
          >
            Message Lumimar
          </a>
        </div>
      </section>
    </>
  );
}
