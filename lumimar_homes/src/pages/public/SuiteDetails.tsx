import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { getSuiteBySlug } from '../../data/suites';
import { submitBookingRequest, verifyPaystackPayment } from '../../lib/bookingRequests';

const WA_LINK = 'https://wa.me/254705551021';

const encodeBookingText = (suiteName: string) =>
  encodeURIComponent(
    `Hi, I would like to book ${suiteName}. Please confirm availability and share the direct booking details.`,
  );

const calculateNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
};

const formatKes = (amount: number) => `KES ${amount.toLocaleString('en-KE')}`;

export default function SuiteDetails() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const suite = getSuiteBySlug(slug);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);
  const total = suite && nights > 0 ? nights * suite.nightlyRateKes : suite?.nightlyRateKes ?? 0;

  useEffect(() => {
    const reference = searchParams.get('payment_reference') || searchParams.get('reference') || searchParams.get('trxref');

    if (!reference) {
      return;
    }

    let cancelled = false;
    setVerifyingPayment(true);
    setError(null);
    setNotice('Verifying your Paystack payment...');

    verifyPaystackPayment(reference)
      .then(() => {
        if (cancelled) {
          return;
        }

        setNotice('Payment confirmed. Your booking request is now marked as paid.');
        setSearchParams({}, { replace: true });
      })
      .catch((verificationError) => {
        if (cancelled) {
          return;
        }

        setNotice(null);
        setError(verificationError instanceof Error ? verificationError.message : 'Payment verification failed.');
      })
      .finally(() => {
        if (!cancelled) {
          setVerifyingPayment(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams, setSearchParams]);

  if (!suite) {
    return <Navigate to="/suites-rooms" replace />;
  }

  const handlePaymentRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      setError('Add your name, email, and phone number before payment.');
      return;
    }

    if (nights < 1) {
      setError('Choose a valid check-in and check-out date.');
      return;
    }

    if (guests > suite.guests) {
      setError(`This suite hosts up to ${suite.guests} guests.`);
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitBookingRequest({
        suiteName: suite.name,
        roomType: suite.type,
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        guests,
        message: `Online payment request for ${nights} night${nights === 1 ? '' : 's'}.`,
        initiatePayment: true,
        website,
      });

      if (!response.payment?.authorizationUrl) {
        throw new Error('Payment could not be started. Please try again.');
      }

      setNotice('Availability confirmed. Redirecting to secure Paystack checkout...');
      window.location.href = response.payment.authorizationUrl;
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to start payment.');
    } finally {
      setSubmitting(false);
    }
  };

  const bookingPanel = (
    <aside className="rounded-lg border border-outline-variant/30 bg-surface p-5">
      <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Direct rate</p>
      <p className="mt-2 text-3xl font-bold text-primary">{suite.rate}</p>
      <p className="text-sm text-on-surface-variant">{suite.usdRate} / night</p>
      <p className="mt-2 text-sm font-semibold text-primary">
        {nights > 0 ? `${nights} night${nights === 1 ? '' : 's'} total: ${formatKes(total)}` : 'Select dates to calculate total'}
      </p>
      <a
        href={`${WA_LINK}?text=${encodeBookingText(suite.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1ebc5a]"
      >
        Message on WhatsApp
      </a>
      <form onSubmit={handlePaymentRequest} className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Check in</span>
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              className="h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-sm text-primary outline-none focus:border-primary"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Check out</span>
            <input
              type="date"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              className="h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-sm text-primary outline-none focus:border-primary"
              required
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Guests</span>
          <input
            type="number"
            min="1"
            max={suite.guests}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value) || 1)}
            className="h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-sm text-primary outline-none focus:border-primary"
            required
          />
        </label>
        <input
          type="text"
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
          placeholder="Full name"
          className="h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-sm text-primary outline-none focus:border-primary"
          required
        />
        <input
          type="email"
          value={guestEmail}
          onChange={(event) => setGuestEmail(event.target.value)}
          placeholder="Email address"
          className="h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-sm text-primary outline-none focus:border-primary"
          required
        />
        <input
          type="tel"
          value={guestPhone}
          onChange={(event) => setGuestPhone(event.target.value)}
          placeholder="Phone number"
          className="h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-sm text-primary outline-none focus:border-primary"
          required
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
        {error ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
        {notice ? <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p> : null}
        <button
          type="submit"
          disabled={submitting || verifyingPayment}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-lg">calendar_month</span>
          {submitting ? 'Checking availability...' : verifyingPayment ? 'Verifying payment...' : 'Send booking request'}
        </button>
      </form>
    </aside>
  );

  return (
    <>
      <section className="bg-white px-6 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/suites-rooms"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-container"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to rooms
          </Link>

          <div>
            <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
              {suite.type}
            </span>
            <h1 className="font-headline mt-3 max-w-3xl text-4xl font-bold leading-tight text-primary md:text-5xl">
              {suite.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-base text-on-surface-variant">
              <span className="material-symbols-outlined text-xl">location_on</span>
              {suite.location}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 pb-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
            {suite.gallery.slice(0, 5).map((image, index) => (
              <figure
                key={`${image}-${index}`}
                className={`overflow-hidden rounded-lg bg-surface-container ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${suite.name} photo ${index + 1}`}
                  className={`w-full object-cover ${index === 0 ? 'h-[460px]' : 'h-[224px]'}`}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary">Room details</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant">{suite.details}</p>

            <div className="mt-8 grid grid-cols-3 gap-3 text-primary">
              <div className="rounded-lg bg-surface px-4 py-4">
                <span className="material-symbols-outlined block text-2xl">group</span>
                <p className="mt-2 text-sm font-bold">{suite.guests} guests</p>
              </div>
              <div className="rounded-lg bg-surface px-4 py-4">
                <span className="material-symbols-outlined block text-2xl">bed</span>
                <p className="mt-2 text-sm font-bold">{suite.bedrooms} beds</p>
              </div>
              <div className="rounded-lg bg-surface px-4 py-4">
                <span className="material-symbols-outlined block text-2xl">shower</span>
                <p className="mt-2 text-sm font-bold">{suite.baths} baths</p>
              </div>
            </div>

            <h2 className="font-headline mt-10 text-3xl font-bold text-primary">Amenities</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {suite.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3 text-sm font-semibold text-primary">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {bookingPanel}
            <aside className="rounded-lg bg-secondary-container p-6">
              <h2 className="font-headline text-2xl font-bold text-primary">Good to know</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-on-secondary-container">
                <p>Bookings are confirmed after Lumimar checks live availability for your dates.</p>
                <p>Photos, direct rates, check-in details, and payment steps are shared before confirmation.</p>
                <p>Guest support is available for arrival coordination and stay questions.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
