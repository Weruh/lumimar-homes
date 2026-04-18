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

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const sanitize = (value: string | undefined) => value?.trim() ?? '';

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

  const { error } = await supabase.schema('lumimar').from('lead_inquiries').insert({
    ...lead,
    metadata: {
      ip: forwardedFor,
      userAgent,
      source: 'website_apply_form',
    },
  });

  if (error) {
    return json(500, {
      error: 'Failed to store lead.',
      details: error.message,
      hint: error.hint,
      code: error.code,
    });
  }

  return json(200, { ok: true });
});
