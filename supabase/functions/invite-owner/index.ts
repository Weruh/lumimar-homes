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
const errorMessage = (error: unknown) => {
  if (typeof error === 'string') {
    return error === '{}' ? null : error;
  }

  if (error instanceof Error) {
    return error.message || error.name || null;
  }

  if (error && typeof error === 'object') {
    const record = error as Record<string, unknown>;
    const knownFields = [record.message, record.error, record.details, record.hint, record.code, record.status, record.name]
      .filter((value): value is string | number => typeof value === 'string' || typeof value === 'number')
      .map(String)
      .filter((value) => value.trim() && value !== '{}');

    if (knownFields.length > 0) {
      return knownFields.join(' ');
    }

    try {
      const allProperties = Object.fromEntries(
        Object.getOwnPropertyNames(error)
          .map((key) => [key, (record as Record<string, unknown>)[key]])
          .filter(([, value]) => value !== undefined),
      );
      const serializedProperties = JSON.stringify(allProperties);

      if (serializedProperties && serializedProperties !== '{}') {
        return serializedProperties;
      }
    } catch {
      // Fall through to plain JSON serialization.
    }

    try {
      const serialized = JSON.stringify(error);
      return serialized && serialized !== '{}' ? serialized : null;
    } catch {
      return null;
    }
  }

  return null;
};

const errorJson = (status: number, error: string, details?: unknown) => {
  const detailMessage = errorMessage(details);

  return json(status, {
    error,
    ...(detailMessage ? { details: detailMessage } : {}),
  });
};

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
    return errorJson(403, 'Only staff or admins can invite owners.', profileError);
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

  const { data: existingUsers, error: listUsersError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listUsersError) {
    return errorJson(500, 'Failed to check whether this applicant already has an account.', listUsersError);
  }

  const existingUser = existingUsers.users.find((user) => user.email?.toLowerCase() === email);

  if (existingUser) {
    return errorJson(
      409,
      'This email already belongs to an existing Supabase user. Use a different applicant email, or update that user/owner record manually.',
    );
  }

  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name: fullName,
    },
    redirectTo: new URL('/auth/set-password', getBaseUrl(request)).toString(),
  });

  if (inviteError || !invited.user) {
    const details = errorMessage(inviteError);
    const alreadyRegistered = details?.toLowerCase().includes('already') || details?.toLowerCase().includes('registered');

    return errorJson(
      alreadyRegistered ? 409 : 500,
      alreadyRegistered
        ? 'This email already belongs to an existing Supabase user. Use a different applicant email, or update that user/owner record manually.'
        : details
          ? 'Failed to send the owner invite.'
          : 'Supabase Auth could not send the invite email. Check Authentication > Emails > SMTP provider in the Supabase Dashboard, then try again.',
      inviteError,
    );
  }

  const { error: profileUpsertError } = await admin.schema('lumimar').from('profiles').upsert({
    id: invited.user.id,
    full_name: fullName,
    phone: sanitize(payload.phone) || null,
    role: 'owner',
  });

  if (profileUpsertError) {
    return errorJson(500, 'Failed to create owner profile.', profileUpsertError);
  }

  const { data: matchingOwners, error: findOwnerError } = await admin
    .schema('lumimar')
    .from('owners')
    .select('id')
    .eq('email', email)
    .limit(1);

  if (findOwnerError) {
    return errorJson(500, 'Failed to check for an existing owner record.', findOwnerError);
  }

  const ownerRecord = {
    primary_contact_user_id: invited.user.id,
    display_name: displayName,
    legal_name: sanitize(payload.legalName) || null,
    email,
    phone: sanitize(payload.phone) || null,
    primary_residence: sanitize(payload.primaryResidence) || null,
  };

  const existingOwnerId = matchingOwners?.[0]?.id;
  const { error: ownerError } = existingOwnerId
    ? await admin.schema('lumimar').from('owners').update(ownerRecord).eq('id', existingOwnerId)
    : await admin.schema('lumimar').from('owners').insert(ownerRecord);

  if (ownerError) {
    return errorJson(500, 'Failed to save owner record.', ownerError);
  }

  return json(200, { ok: true, userId: invited.user.id });
});
