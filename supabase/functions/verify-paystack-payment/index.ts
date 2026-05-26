import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

type VerifyPayload = {
  reference?: string;
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

async function verifyPaystackTransaction(secretKey: string, reference: string) {
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  const body = await response.json().catch(() => null) as
    | { status?: boolean; message?: string; data?: { status?: string; reference?: string; amount?: number; currency?: string } }
    | null;

  if (!response.ok || !body?.status || !body.data) {
    throw new Error(body?.message || `Paystack verification failed (${response.status}).`);
  }

  return body.data;
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
  const paystackSecretKey = sanitizeSecret(Deno.env.get('PAYSTACK_SECRET_KEY'));

  if (!supabaseUrl || !serviceRoleKey || !paystackSecretKey) {
    return json(500, { error: 'Payment verification is not configured.' });
  }

  let payload: VerifyPayload;

  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  const reference = sanitize(payload.reference);

  if (!reference) {
    return json(400, { error: 'Missing payment reference.' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: booking, error: bookingError } = await supabase
    .schema('lumimar')
    .from('booking_requests')
    .select('id, payment_amount_kes, payment_currency, payment_status')
    .eq('payment_reference', reference)
    .single();

  if (bookingError || !booking) {
    return json(404, { error: 'Booking request not found for this payment reference.' });
  }

  if (booking.payment_status === 'paid') {
    return json(200, { ok: true, status: 'paid', bookingRequestId: booking.id });
  }

  try {
    const transaction = await verifyPaystackTransaction(paystackSecretKey, reference);
    const expectedAmount = Math.round(Number(booking.payment_amount_kes ?? 0) * 100);
    const amountMatches = Number(transaction.amount ?? 0) === expectedAmount;
    const currencyMatches = String(transaction.currency ?? '').toUpperCase() === String(booking.payment_currency ?? 'KES').toUpperCase();
    const referenceMatches = transaction.reference === reference;
    const paid = transaction.status === 'success' && amountMatches && currencyMatches && referenceMatches;

    await supabase
      .schema('lumimar')
      .from('booking_requests')
      .update({
        payment_status: paid ? 'paid' : String(transaction.status || 'failed'),
        status: paid ? 'paid' : 'payment_failed',
        payment_verified_at: new Date().toISOString(),
        payment_gateway_response: transaction,
      })
      .eq('id', booking.id);

    if (!paid) {
      return json(402, { error: 'Payment was not successful.', status: transaction.status || 'failed' });
    }

    return json(200, { ok: true, status: 'paid', bookingRequestId: booking.id });
  } catch (error) {
    return json(502, {
      error: 'Failed to verify Paystack payment.',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});
