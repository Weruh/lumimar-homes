import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

type BookingPayload = {
  suiteName?: string;
  roomType?: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message?: string;
  initiatePayment?: boolean;
  website?: string;
};

type SuiteRate = {
  slug: string;
  nightlyRateKes: number;
};

const DEFAULT_NOTIFY_EMAIL = 'hello@home.lumimarbrand.com';
const DEFAULT_SITE_URL = 'https://home.lumimarbrand.com';
const PAYMENT_HOLD_MINUTES = 15;
const PAYMENT_CURRENCY = 'KES';

const suiteRates: Record<string, SuiteRate> = {
  'VIP 1-Bedroom Penthouse': { slug: 'vip-1-bedroom-penthouse', nightlyRateKes: 9500 },
  'Coastal 2-Bedroom Suite': { slug: 'coastal-2-bedroom-suite', nightlyRateKes: 12500 },
  'Executive 2-Bed Penthouse': { slug: 'executive-2-bed-penthouse', nightlyRateKes: 13500 },
  'Shanzu Garden Villa': { slug: 'shanzu-garden-villa', nightlyRateKes: 15500 },
  'Premium 3-Bedroom Residence': { slug: 'premium-3-bedroom-residence', nightlyRateKes: 17000 },
  'Signature 3-Bedroom Suite': { slug: 'signature-3-bedroom-suite', nightlyRateKes: 17500 },
  'Classic 1-Bedroom Penthouse': { slug: 'classic-1-bedroom-penthouse', nightlyRateKes: 8800 },
  'Deluxe 2-Bedroom Apartment': { slug: 'deluxe-2-bedroom-apartment', nightlyRateKes: 12800 },
  'Ocean Breeze 2-Bedroom Suite': { slug: 'ocean-breeze-2-bedroom-suite', nightlyRateKes: 13000 },
  'Family 2-Bedroom Villa': { slug: 'family-2-bedroom-villa', nightlyRateKes: 15500 },
  'Grand 3-Bedroom Apartment': { slug: 'grand-3-bedroom-apartment', nightlyRateKes: 16800 },
  'Executive 3-Bedroom Residence': { slug: 'executive-3-bedroom-residence', nightlyRateKes: 17500 },
  'Palm View Villa Suite': { slug: 'palm-view-villa-suite', nightlyRateKes: 15800 },
  'Premium Group Suite': { slug: 'premium-group-suite', nightlyRateKes: 18200 },
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const sanitize = (value: string | undefined | null) => value?.trim() ?? '';
const sanitizeSecret = (value: string | undefined | null) => {
  const sanitized = sanitize(value);

  if (
    (sanitized.startsWith('"') && sanitized.endsWith('"')) ||
    (sanitized.startsWith("'") && sanitized.endsWith("'"))
  ) {
    return sanitized.slice(1, -1).trim();
  }

  return sanitized;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const parseDate = (value: string | null) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const calculateNights = (checkIn: string | null, checkOut: string | null) => {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);

  if (!start || !end) {
    return 0;
  }

  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
};

const isBlockingBooking = (booking: { status: string; payment_status: string | null; payment_expires_at: string | null }) => {
  if (booking.status === 'confirmed' || booking.status === 'paid' || booking.payment_status === 'paid') {
    return true;
  }

  if (booking.payment_status !== 'pending') {
    return false;
  }

  return booking.payment_expires_at ? new Date(booking.payment_expires_at).getTime() > Date.now() : true;
};

async function initializePaystackPayment(args: {
  secretKey: string;
  email: string;
  amountKes: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, unknown>;
}) {
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${args.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: args.email,
      amount: String(Math.round(args.amountKes * 100)),
      currency: PAYMENT_CURRENCY,
      reference: args.reference,
      callback_url: args.callbackUrl,
      metadata: JSON.stringify(args.metadata),
    }),
  });

  const body = await response.json().catch(() => null) as
    | { status?: boolean; message?: string; data?: { authorization_url?: string; access_code?: string; reference?: string } }
    | null;

  if (!response.ok || !body?.status || !body.data?.authorization_url || !body.data?.reference) {
    throw new Error(body?.message || `Paystack request failed (${response.status}).`);
  }

  return {
    authorizationUrl: body.data.authorization_url,
    accessCode: body.data.access_code || null,
    reference: body.data.reference,
  };
}

function parseSender(value: string) {
  const match = value.match(/^\s*([^<]+?)\s*<([^>]+)>\s*$/);

  if (!match) {
    return { from: value, name: undefined as string | undefined };
  }

  return {
    name: sanitize(match[1]),
    from: sanitize(match[2]),
  };
}

function readPlunkApiKey() {
  return sanitizeSecret(Deno.env.get('PLUNK_API_KEY')) || sanitizeSecret(Deno.env.get('PLUNK_PRIVATE_KEY'));
}

function getNotificationConfigError(args: { plunkApiKey: string; fromEmail: string }) {
  if (!args.plunkApiKey) {
    return 'Email notifications are disabled because PLUNK_API_KEY is missing.';
  }

  if (args.plunkApiKey.startsWith('pk_')) {
    return 'Email notifications are disabled because PLUNK_API_KEY is using a public key. Use your secret key.';
  }

  if (!args.fromEmail) {
    return 'Email notifications are disabled because LEADS_FROM_EMAIL is missing.';
  }

  return '';
}

async function sendPlunkEmail(args: {
  apiKey: string;
  from: string;
  fromName?: string;
  to: string | string[];
  subject: string;
  body: string;
  replyTo?: string;
}) {
  const response = await fetch('https://api.useplunk.com/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({
      to: args.to,
      subject: args.subject,
      body: args.body,
      from: args.from,
      name: args.fromName,
      reply: args.replyTo,
      subscribed: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Plunk request failed (${response.status}): ${await response.text()}`);
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    return json(500, { error: 'Supabase function is not configured.' });
  }

  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  if (sanitize(payload.website) !== '') {
    return json(200, { ok: true });
  }

  const booking = {
    suite_name: sanitize(payload.suiteName),
    room_type: sanitize(payload.roomType),
    guest_name: sanitize(payload.guestName),
    guest_email: sanitize(payload.guestEmail).toLowerCase(),
    guest_phone: sanitize(payload.guestPhone),
    check_in: sanitize(payload.checkIn) || null,
    check_out: sanitize(payload.checkOut) || null,
    guests: Math.max(1, Number(payload.guests || 1)),
    message: sanitize(payload.message),
  };
  const initiatePayment = payload.initiatePayment === true;

  if (!booking.suite_name || !booking.room_type || !booking.guest_name || !booking.guest_email || !booking.guest_phone) {
    return json(400, { error: 'Missing required fields.' });
  }

  const suiteRate = suiteRates[booking.suite_name];
  const nights = calculateNights(booking.check_in, booking.check_out);

  if (initiatePayment) {
    if (!suiteRate) {
      return json(400, { error: 'This suite is not configured for online payment.' });
    }

    if (nights < 1) {
      return json(400, { error: 'Choose a valid check-in and check-out date before payment.' });
    }

    if (booking.guests > 8) {
      return json(400, { error: 'Please contact Lumimar for groups above 8 guests.' });
    }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  if (initiatePayment) {
    const { data: overlappingBookings, error: availabilityError } = await supabase
      .schema('lumimar')
      .from('booking_requests')
      .select('id, status, payment_status, payment_expires_at')
      .eq('suite_name', booking.suite_name)
      .lt('check_in', booking.check_out)
      .gt('check_out', booking.check_in);

    if (availabilityError) {
      return json(500, { error: 'Failed to check availability.', details: availabilityError.message });
    }

    if ((overlappingBookings ?? []).some(isBlockingBooking)) {
      return json(409, { error: 'This suite is not available for the selected dates.' });
    }
  }

  const paymentReference = initiatePayment ? `LH-${crypto.randomUUID()}` : null;
  const paymentExpiresAt = initiatePayment
    ? new Date(Date.now() + PAYMENT_HOLD_MINUTES * 60_000).toISOString()
    : null;
  const paymentAmountKes = initiatePayment && suiteRate ? nights * suiteRate.nightlyRateKes : null;

  const { data, error } = await supabase
    .schema('lumimar')
    .from('booking_requests')
    .insert({
      ...booking,
      status: initiatePayment ? 'payment_pending' : 'new',
      payment_status: initiatePayment ? 'pending' : 'unpaid',
      payment_reference: paymentReference,
      payment_amount_kes: paymentAmountKes,
      payment_currency: PAYMENT_CURRENCY,
      payment_expires_at: paymentExpiresAt,
      metadata: {
        ip: request.headers.get('x-forwarded-for'),
        userAgent: request.headers.get('user-agent'),
        source: initiatePayment ? 'suite_detail_payment' : 'suites_rooms_page',
        nights,
      },
    })
    .select('id')
    .single();

  if (error) {
    return json(500, { error: 'Failed to store booking request.', details: error.message });
  }

  let payment:
    | {
      authorizationUrl: string;
      reference: string;
      amountKes: number;
      currency: string;
    }
    | null = null;

  if (initiatePayment && suiteRate && paymentReference && paymentAmountKes) {
    const paystackSecretKey = sanitizeSecret(Deno.env.get('PAYSTACK_SECRET_KEY'));
    const publicSiteUrl = sanitizeSecret(Deno.env.get('PUBLIC_SITE_URL')) || DEFAULT_SITE_URL;

    if (!paystackSecretKey) {
      await supabase
        .schema('lumimar')
        .from('booking_requests')
        .update({ payment_status: 'configuration_error', status: 'payment_failed' })
        .eq('id', data.id);

      return json(500, { error: 'Paystack is not configured. Add PAYSTACK_SECRET_KEY to the Supabase Edge Function secrets.' });
    }

    try {
      const paystackPayment = await initializePaystackPayment({
        secretKey: paystackSecretKey,
        email: booking.guest_email,
        amountKes: paymentAmountKes,
        reference: paymentReference,
        callbackUrl: `${publicSiteUrl}/suites-rooms/${suiteRate.slug}?payment_reference=${encodeURIComponent(paymentReference)}`,
        metadata: {
          bookingRequestId: data.id,
          suiteName: booking.suite_name,
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          guests: booking.guests,
        },
      });

      await supabase
        .schema('lumimar')
        .from('booking_requests')
        .update({
          payment_authorization_url: paystackPayment.authorizationUrl,
          payment_access_code: paystackPayment.accessCode,
          payment_reference: paystackPayment.reference,
        })
        .eq('id', data.id);

      payment = {
        authorizationUrl: paystackPayment.authorizationUrl,
        reference: paystackPayment.reference,
        amountKes: paymentAmountKes,
        currency: PAYMENT_CURRENCY,
      };
    } catch (paymentError) {
      const paymentMessage = paymentError instanceof Error ? paymentError.message : String(paymentError);
      const configurationError = /invalid key|authorization/i.test(paymentMessage);

      await supabase
        .schema('lumimar')
        .from('booking_requests')
        .update({ payment_status: configurationError ? 'configuration_error' : 'failed', status: 'payment_failed' })
        .eq('id', data.id);

      return json(502, {
        error: configurationError
          ? 'Online payment is not configured correctly. Replace PAYSTACK_SECRET_KEY with a valid Paystack secret key and redeploy the function.'
          : 'Failed to initialize Paystack payment.',
        details: paymentMessage,
      });
    }
  }

  const plunkApiKey = readPlunkApiKey();
  const fromEmail = sanitizeSecret(Deno.env.get('LEADS_FROM_EMAIL'));
  const notifyEmail = sanitizeSecret(Deno.env.get('BOOKINGS_NOTIFY_EMAIL')) || sanitizeSecret(Deno.env.get('LEADS_NOTIFY_EMAIL')) || DEFAULT_NOTIFY_EMAIL;
  const replyToEmail = sanitizeSecret(Deno.env.get('LEADS_REPLY_TO_EMAIL')) || notifyEmail;
  const publicSiteUrl = sanitizeSecret(Deno.env.get('PUBLIC_SITE_URL')) || DEFAULT_SITE_URL;
  const configError = getNotificationConfigError({ plunkApiKey, fromEmail });

  const notifications = { teamNotified: false, userConfirmed: false };
  const notificationErrors: Record<string, string> = {};

  if (!configError) {
    const sender = parseSender(fromEmail);
    const teamBody = `
      <div style="font-family: Arial, sans-serif; color: #10233e; line-height: 1.6;">
        <h2>New Room Booking Request</h2>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tbody>
            <tr><td style="font-weight: 700; padding: 6px 0;">Room</td><td>${escapeHtml(booking.suite_name)}</td></tr>
            <tr><td style="font-weight: 700; padding: 6px 0;">Room Type</td><td>${escapeHtml(booking.room_type)}</td></tr>
            <tr><td style="font-weight: 700; padding: 6px 0;">Guest</td><td>${escapeHtml(booking.guest_name)}</td></tr>
            <tr><td style="font-weight: 700; padding: 6px 0;">Email</td><td><a href="mailto:${escapeHtml(booking.guest_email)}">${escapeHtml(booking.guest_email)}</a></td></tr>
            <tr><td style="font-weight: 700; padding: 6px 0;">Phone</td><td>${escapeHtml(booking.guest_phone)}</td></tr>
            <tr><td style="font-weight: 700; padding: 6px 0;">Dates</td><td>${escapeHtml(booking.check_in || 'Not set')} to ${escapeHtml(booking.check_out || 'Not set')}</td></tr>
            <tr><td style="font-weight: 700; padding: 6px 0;">Guests</td><td>${booking.guests}</td></tr>
          </tbody>
        </table>
        <div style="background: #f7f4ee; border-radius: 12px; padding: 16px;">
          <p style="margin: 0 0 8px; font-weight: 700;">Message</p>
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(booking.message || 'No message provided.')}</p>
        </div>
      </div>
    `;
    const confirmationBody = `
      <div style="font-family: Arial, sans-serif; color: #10233e; line-height: 1.6;">
        <h2>Thanks, ${escapeHtml(booking.guest_name)}.</h2>
        <p>We received your booking request for <strong>${escapeHtml(booking.suite_name)}</strong>.</p>
        <p>Our team will confirm availability and the direct booking rate shortly.</p>
        <p><a href="${escapeHtml(publicSiteUrl)}" style="display: inline-block; background: #10233e; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px;">Visit Lumimar Homes</a></p>
      </div>
    `;

    const [teamResult, userResult] = await Promise.allSettled([
      sendPlunkEmail({
        apiKey: plunkApiKey,
        from: sender.from,
        fromName: sender.name,
        to: notifyEmail,
        subject: `New room booking: ${booking.suite_name}`,
        body: teamBody,
        replyTo: booking.guest_email,
      }),
      sendPlunkEmail({
        apiKey: plunkApiKey,
        from: sender.from,
        fromName: sender.name,
        to: booking.guest_email,
        subject: 'We received your Lumimar booking request',
        body: confirmationBody,
        replyTo: replyToEmail,
      }),
    ]);

    if (teamResult.status === 'fulfilled') {
      notifications.teamNotified = true;
    } else {
      notificationErrors.team = teamResult.reason instanceof Error ? teamResult.reason.message : String(teamResult.reason);
    }

    if (userResult.status === 'fulfilled') {
      notifications.userConfirmed = true;
    } else {
      notificationErrors.user = userResult.reason instanceof Error ? userResult.reason.message : String(userResult.reason);
    }
  } else {
    notificationErrors.config = configError;
  }

  return json(200, { ok: true, id: data.id, payment, notifications, notificationErrors });
});
