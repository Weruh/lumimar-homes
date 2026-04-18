import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  currentEarnings?: string;
  service?: string;
  message?: string;
  website?: string;
};

const MAX_REQUESTS_PER_IP_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW_MINUTES = 15;
const DUPLICATE_EMAIL_WINDOW_HOURS = 24;
const GENERIC_SUBMIT_ERROR = 'We could not submit your request right now. Please try again or contact Lumimar directly.';

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const sanitize = (value: string | undefined) => value?.trim() ?? '';
const getClientIp = (forwardedFor: string | null) => forwardedFor?.split(',')[0]?.trim() ?? '';
const getIsoOffset = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000).toISOString();

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

  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  if (sanitize(payload.website) !== '') {
    return json(200, { ok: true });
  }

  const lead = {
    name: sanitize(payload.name),
    email: sanitize(payload.email).toLowerCase(),
    phone: sanitize(payload.phone),
    location: sanitize(payload.location),
    current_earnings_band: sanitize(payload.currentEarnings),
    service: sanitize(payload.service),
    message: sanitize(payload.message),
  };

  if (!lead.name || !lead.email || !lead.phone || !lead.location || !lead.service) {
    return json(400, { error: 'Missing required fields.' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const forwardedFor = request.headers.get('x-forwarded-for');
  const userAgent = request.headers.get('user-agent');
  const clientIp = getClientIp(forwardedFor);

  if (clientIp) {
    const { count, error: rateLimitError } = await supabase
      .schema('lumimar')
      .from('lead_inquiries')
      .select('id', { count: 'exact', head: true })
      .contains('metadata', { ip: clientIp })
      .gte('created_at', getIsoOffset(RATE_LIMIT_WINDOW_MINUTES));

    if (rateLimitError) {
      console.error('lead_ip_rate_limit_check_failed', {
        message: rateLimitError.message,
        code: rateLimitError.code,
      });
    } else if ((count ?? 0) >= MAX_REQUESTS_PER_IP_PER_WINDOW) {
      return json(429, { error: 'Too many requests. Please wait a few minutes and try again.' });
    }
  }

  const { count: duplicateCount, error: duplicateCheckError } = await supabase
    .schema('lumimar')
    .from('lead_inquiries')
    .select('id', { count: 'exact', head: true })
    .eq('email', lead.email)
    .gte('created_at', getIsoOffset(DUPLICATE_EMAIL_WINDOW_HOURS * 60));

  if (duplicateCheckError) {
    console.error('lead_duplicate_check_failed', {
      message: duplicateCheckError.message,
      code: duplicateCheckError.code,
    });
  } else if ((duplicateCount ?? 0) > 0) {
    return json(200, { ok: true });
  }

  const { error } = await supabase.schema('lumimar').from('lead_inquiries').insert({
    ...lead,
    metadata: {
      ip: clientIp || null,
      userAgent,
      source: 'website_apply_form',
    },
  });

  if (error) {
    console.error('lead_insert_failed', {
      message: error.message,
      hint: error.hint,
      code: error.code,
      email: lead.email,
      ip: clientIp || null,
    });

    return json(500, { error: GENERIC_SUBMIT_ERROR });
  }

  return json(200, { ok: true });
});
