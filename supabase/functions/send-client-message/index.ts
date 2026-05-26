import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

type MessagePayload = {
  bookingRequestId?: string;
  recipientEmail?: string;
  recipientName?: string;
  subject?: string;
  message?: string;
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

async function sendPlunkEmail(args: {
  apiKey: string;
  from: string;
  fromName?: string;
  to: string;
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

  const authHeader = request.headers.get('authorization') ?? '';
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return json(500, { error: 'Supabase function is not configured.' });
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: isStaff, error: roleError } = await userClient.schema('lumimar').rpc('is_staff');

  if (roleError || !isStaff) {
    return json(403, { error: 'Only staff can send client messages.' });
  }

  let payload: MessagePayload;

  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  const message = {
    booking_request_id: sanitize(payload.bookingRequestId) || null,
    recipient_email: sanitize(payload.recipientEmail).toLowerCase(),
    recipient_name: sanitize(payload.recipientName),
    subject: sanitize(payload.subject),
    body: sanitize(payload.message),
  };

  if (!message.recipient_email || !message.subject || !message.body) {
    return json(400, { error: 'Recipient email, subject, and message are required.' });
  }

  const plunkApiKey = readPlunkApiKey();
  const fromEmail = sanitizeSecret(Deno.env.get('LEADS_FROM_EMAIL'));
  const replyToEmail = sanitizeSecret(Deno.env.get('LEADS_REPLY_TO_EMAIL')) || fromEmail;

  if (!plunkApiKey || !fromEmail) {
    return json(500, { error: 'Email sending is not configured. Set PLUNK_API_KEY and LEADS_FROM_EMAIL.' });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: userData } = await userClient.auth.getUser();
  const sender = parseSender(fromEmail);
  const html = `
    <div style="font-family: Arial, sans-serif; color: #10233e; line-height: 1.6;">
      <p>Hi ${escapeHtml(message.recipient_name || 'there')},</p>
      <div style="white-space: pre-wrap;">${escapeHtml(message.body)}</div>
      <p style="margin-top: 24px;">Lumimar Homes</p>
    </div>
  `;

  const { data: savedMessage, error: saveError } = await adminClient
    .schema('lumimar')
    .from('client_messages')
    .insert({
      booking_request_id: message.booking_request_id,
      recipient_email: message.recipient_email,
      recipient_name: message.recipient_name || null,
      subject: message.subject,
      message: message.body,
      sent_by: userData.user?.id ?? null,
      delivery_status: 'queued',
    })
    .select('id')
    .single();

  if (saveError) {
    return json(500, { error: 'Failed to store message.', details: saveError.message });
  }

  try {
    await sendPlunkEmail({
      apiKey: plunkApiKey,
      from: sender.from,
      fromName: sender.name,
      to: message.recipient_email,
      subject: message.subject,
      body: html,
      replyTo: replyToEmail,
    });

    await adminClient
      .schema('lumimar')
      .from('client_messages')
      .update({ delivery_status: 'sent' })
      .eq('id', savedMessage.id);

    if (message.booking_request_id) {
      await adminClient
        .schema('lumimar')
        .from('booking_requests')
        .update({
          status: 'responded',
          last_response_at: new Date().toISOString(),
        })
        .eq('id', message.booking_request_id);
    }

    return json(200, { ok: true, id: savedMessage.id });
  } catch (error) {
    const deliveryError = error instanceof Error ? error.message : String(error);

    await adminClient
      .schema('lumimar')
      .from('client_messages')
      .update({ delivery_status: 'failed', delivery_error: deliveryError })
      .eq('id', savedMessage.id);

    return json(500, { error: 'Failed to send email.', details: deliveryError });
  }
});
