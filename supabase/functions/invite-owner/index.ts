import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

type InvitePayload = {
  email?: string;
  fullName?: string;
  phone?: string;
  displayName?: string;
  legalName?: string;
  primaryResidence?: string;
};

const DEFAULT_SITE_URL = 'https://home.lumimarbrand.com';

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const sanitize = (value: string | undefined) => value?.trim() ?? '';
const getBaseUrl = (request: Request) => {
  const configuredSiteUrl = sanitize(Deno.env.get('PUBLIC_SITE_URL')) || DEFAULT_SITE_URL;
  const requestOrigin = sanitize(request.headers.get('origin'));
  const allowedOrigins = new Set([
    configuredSiteUrl,
    'http://127.0.0.1:3000',
    'http://localhost:3000',
  ]);

  return requestOrigin && allowedOrigins.has(requestOrigin) ? requestOrigin : configuredSiteUrl;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return json(500, { error: 'Supabase function is not configured.' });
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return json(401, { error: 'Missing authorization header.' });
  }

  const client = createClient(supabaseUrl, anonKey, {
    global: {
      headers: {
        Authorization: authHeader,
      },
    },
    auth: {
      persistSession: false,
    },
  });

  const {
    data: { user },
    error: authError,
  } = await client.auth.getUser();

  if (authError || !user) {
    return json(401, { error: 'Unauthorized.' });
  }

  const { data: profile, error: profileError } = await client
    .schema('lumimar')
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || !['staff', 'admin'].includes(profile.role)) {
    return json(403, { error: 'Only staff or admins can invite owners.' });
  }

  let payload: InvitePayload;

  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  const email = sanitize(payload.email).toLowerCase();
  const fullName = sanitize(payload.fullName);
  const displayName = sanitize(payload.displayName);

  if (!email || !fullName || !displayName) {
    return json(400, { error: 'Email, full name, and display name are required.' });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });

  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name: fullName,
    },
    redirectTo: new URL('/auth/set-password', getBaseUrl(request)).toString(),
  });

  if (inviteError || !invited.user) {
    return json(500, { error: inviteError?.message ?? 'Failed to invite owner.' });
  }

  const { error: profileUpsertError } = await admin.schema('lumimar').from('profiles').upsert({
    id: invited.user.id,
    full_name: fullName,
    phone: sanitize(payload.phone) || null,
    role: 'owner',
  });

  if (profileUpsertError) {
    return json(500, { error: 'Failed to create owner profile.' });
  }

  const { error: ownerError } = await admin
    .schema('lumimar')
    .from('owners')
    .upsert(
      {
        primary_contact_user_id: invited.user.id,
        display_name: displayName,
        legal_name: sanitize(payload.legalName) || null,
        email,
        phone: sanitize(payload.phone) || null,
        primary_residence: sanitize(payload.primaryResidence) || null,
      },
      {
        onConflict: 'primary_contact_user_id',
      },
    );

  if (ownerError) {
    return json(500, { error: 'Failed to create owner record.' });
  }

  return json(200, { ok: true, userId: invited.user.id });
});
