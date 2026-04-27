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

type StoredLead = {
  name: string;
  email: string;
  phone: string;
  location: string;
  current_earnings_band: string;
  service: string;
  message: string;
};

const DEFAULT_NOTIFY_EMAIL = 'hello@home.lumimarbrand.com';
const DEFAULT_SITE_URL = 'https://home.lumimarbrand.com';

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

const humanizeService = (value: string) => {
  const labels: Record<string, string> = {
    'full-management': 'Full Management',
    'co-hosting': 'Co-Hosting',
    'long-term': 'Long-Term / Monthly Stays',
    'interior-styling': 'Interior Styling & Property Setup',
    estimate: 'Free Revenue Estimate',
  };

  return labels[value] ?? (value || 'Not provided');
};

const humanizeEarnings = (value: string) => {
  const labels: Record<string, string> = {
    'not-rented': 'Not currently rented out',
    'under-50k': 'Under KES 50,000 / month',
    '50k-100k': 'KES 50,000 - 100,000 / month',
    '100k-200k': 'KES 100,000 - 200,000 / month',
    '200k-plus': 'KES 200,000+ / month',
    unsure: "I'm not sure",
  };

  return labels[value] ?? (value || 'Not provided');
};

function parseSender(value: string) {
  const match = value.match(/^\s*([^<]+?)\s*<([^>]+)>\s*$/);

  if (!match) {
    return {
      from: value,
      name: undefined as string | undefined,
    };
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
    return 'Email notifications are disabled because the Supabase secret PLUNK_API_KEY is missing.';
  }

  if (args.plunkApiKey.startsWith('pk_')) {
    return 'Email notifications are disabled because PLUNK_API_KEY is using a public Plunk key (pk_*). Use your secret Plunk key (sk_*).';
  }

  if (!args.fromEmail) {
    return 'Email notifications are disabled because the Supabase secret LEADS_FROM_EMAIL is missing.';
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
    const errorText = await response.text();

    if (response.status === 401) {
      throw new Error(
        'Plunk rejected the bearer token. Set the Supabase secret PLUNK_API_KEY to your current Plunk secret key (sk_*), without extra quotes.',
      );
    }

    throw new Error(`Plunk request failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

function buildTeamEmail(lead: StoredLead) {
  const escapedMessage = escapeHtml(lead.message || 'No additional notes provided.');

  return {
    subject: `New owner lead: ${lead.name} (${lead.location})`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #10233e; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">New Revenue Estimate Request</h2>
        <p>A new owner lead was submitted from the Lumimar website.</p>
        <table style="border-collapse: collapse; width: 100%; margin: 24px 0;">
          <tbody>
            <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${escapeHtml(lead.name)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Location</td><td style="padding: 8px 0;">${escapeHtml(lead.location)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Current Earnings</td><td style="padding: 8px 0;">${escapeHtml(humanizeEarnings(lead.current_earnings_band))}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Interested In</td><td style="padding: 8px 0;">${escapeHtml(humanizeService(lead.service))}</td></tr>
          </tbody>
        </table>
        <div style="background: #f7f4ee; border-radius: 12px; padding: 16px;">
          <p style="margin: 0 0 8px; font-weight: 700;">Notes</p>
          <p style="margin: 0; white-space: pre-wrap;">${escapedMessage}</p>
        </div>
      </div>
    `,
    text: [
      'New Revenue Estimate Request',
      '',
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Location: ${lead.location}`,
      `Current Earnings: ${humanizeEarnings(lead.current_earnings_band)}`,
      `Interested In: ${humanizeService(lead.service)}`,
      '',
      `Notes: ${lead.message || 'No additional notes provided.'}`,
    ].join('\n'),
  };
}

function buildConfirmationEmail(lead: StoredLead, siteUrl: string) {
  const safeUrl = siteUrl || DEFAULT_SITE_URL;

  return {
    subject: 'We received your Lumimar revenue estimate request',
    html: `
      <div style="font-family: Arial, sans-serif; color: #10233e; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">Thanks, ${escapeHtml(lead.name)}.</h2>
        <p>We received your request for a personalised revenue estimate for your property in <strong>${escapeHtml(lead.location)}</strong>.</p>
        <p>A Lumimar team member will review your details and reach out within 24 hours.</p>
        <div style="background: #f7f4ee; border-radius: 12px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0 0 8px; font-weight: 700;">What you submitted</p>
          <p style="margin: 0;">Service: ${escapeHtml(humanizeService(lead.service))}</p>
          <p style="margin: 8px 0 0;">Current earnings: ${escapeHtml(humanizeEarnings(lead.current_earnings_band))}</p>
        </div>
        <p>If you need a faster response, reply to this email or contact us on WhatsApp at <strong>+254 705 551 021</strong>.</p>
        <p style="margin-top: 24px;">
          <a href="${escapeHtml(safeUrl)}" style="display: inline-block; background: #10233e; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px;">
            Visit Lumimar Homes
          </a>
        </p>
      </div>
    `,
    text: [
      `Thanks, ${lead.name}.`,
      '',
      `We received your Lumimar revenue estimate request for ${lead.location}.`,
      'A Lumimar team member will review your details and reach out within 24 hours.',
      '',
      `Service: ${humanizeService(lead.service)}`,
      `Current earnings: ${humanizeEarnings(lead.current_earnings_band)}`,
      '',
      'If you need a faster response, reply to this email or contact us on WhatsApp at +254 705 551 021.',
      safeUrl,
    ].join('\n'),
  };
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

  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  if (sanitize(payload.website) !== '') {
    return json(200, {
      ok: true,
      notifications: {
        teamNotified: false,
        userConfirmed: false,
      },
    });
  }

  const lead: StoredLead = {
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

  const plunkApiKey = readPlunkApiKey();
  const fromEmail = sanitizeSecret(Deno.env.get('LEADS_FROM_EMAIL'));
  const notifyEmail = sanitizeSecret(Deno.env.get('LEADS_NOTIFY_EMAIL')) || DEFAULT_NOTIFY_EMAIL;
  const replyToEmail = sanitizeSecret(Deno.env.get('LEADS_REPLY_TO_EMAIL')) || notifyEmail;
  const publicSiteUrl = sanitizeSecret(Deno.env.get('PUBLIC_SITE_URL')) || DEFAULT_SITE_URL;

  const notifications = {
    teamNotified: false,
    userConfirmed: false,
  };
  const notificationErrors: {
    team?: string;
    user?: string;
  } = {};

  const notificationConfigError = getNotificationConfigError({ plunkApiKey, fromEmail });

  if (notificationConfigError) {
    console.warn(notificationConfigError);
    notificationErrors.team = notificationConfigError;
    notificationErrors.user = notificationConfigError;
    return json(200, { ok: true, notifications, notificationErrors });
  }

  const teamEmail = buildTeamEmail(lead);
  const confirmationEmail = buildConfirmationEmail(lead, publicSiteUrl);
  const sender = parseSender(fromEmail);

  const [teamResult, userResult] = await Promise.allSettled([
    sendPlunkEmail({
      apiKey: plunkApiKey,
      from: sender.from,
      fromName: sender.name,
      to: notifyEmail,
      subject: teamEmail.subject,
      body: teamEmail.html,
      replyTo: lead.email,
    }),
    sendPlunkEmail({
      apiKey: plunkApiKey,
      from: sender.from,
      fromName: sender.name,
      to: lead.email,
      subject: confirmationEmail.subject,
      body: confirmationEmail.html,
      replyTo: replyToEmail,
    }),
  ]);

  if (teamResult.status === 'fulfilled') {
    notifications.teamNotified = true;
  } else {
    console.error('Failed to send team lead notification.', teamResult.reason);
    notificationErrors.team = teamResult.reason instanceof Error ? teamResult.reason.message : String(teamResult.reason);
  }

  if (userResult.status === 'fulfilled') {
    notifications.userConfirmed = true;
  } else {
    console.error('Failed to send user confirmation email.', userResult.reason);
    notificationErrors.user = userResult.reason instanceof Error ? userResult.reason.message : String(userResult.reason);
  }

  return json(200, { ok: true, notifications, notificationErrors });
});
