# Lumimar Homes

Marketing site, owner portal, and internal operations app for Lumimar Homes, built with React, TypeScript, Tailwind CSS, Vite, and Supabase.

## Local Setup

Prerequisites:

- Node.js 20+
- Supabase CLI

1. Install dependencies:
   `npm install`
2. Copy the frontend env template to `.env` and fill in your hosted Supabase project values.
3. Start Supabase locally when you want the database, auth, storage, and edge functions:
   `npm run supabase:start`
4. Apply migrations and seed data:
   `npm run supabase:reset`
5. Start the frontend:
   `npm run dev`

## Frontend Env Vars

The Vite app expects:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Do not put the service role key in a client `.env` file.

## Supabase Auth Gmail

Supabase Auth confirmation, recovery, magic-link, and invite emails are configured to send through Gmail SMTP in `supabase/config.toml`.

Create a repo-root `.env` for local Supabase CLI runs:

```env
GMAIL_SMTP_USER=your-gmail-address@gmail.com
GMAIL_SMTP_PASS=your-gmail-app-password
GMAIL_SMTP_ADMIN_EMAIL=your-gmail-address@gmail.com
```

For the hosted Supabase project, set the same Gmail SMTP values in Authentication > Emails > SMTP provider. Do not add these values under Edge Function secrets; Supabase reserves the `SUPABASE_` prefix there, and Auth SMTP settings are configured separately from Edge Functions. Use a Gmail app password, not the regular account password.

## Supabase Backend

This repository now includes:

- `supabase/migrations/202604180001_init_backend.sql`
  Creates roles, core business tables, RLS policies, helper functions, storage buckets, and dashboard views.
- `supabase/seed.sql`
  Seeds example lead data.
- `supabase/functions/submit-owner-lead`
  Public edge function used by the `/apply` page.
- `supabase/functions/invite-owner`
  Staff/admin-only edge function for inviting owner accounts.

## Edge Function Secrets

The `submit-owner-lead` function can send:

- an internal notification email to your team
- a confirmation email to the person who requested an estimate

Set these Supabase secrets before deploying that function:

- `PLUNK_API_KEY` or `PLUNK_PRIVATE_KEY`
- `LEADS_FROM_EMAIL`
- `LEADS_NOTIFY_EMAIL`
- `LEADS_REPLY_TO_EMAIL` (optional)
- `PUBLIC_SITE_URL`

Use your Plunk secret key for `PLUNK_API_KEY` or `PLUNK_PRIVATE_KEY`. Public keys (`pk_*`) cannot send transactional email.

Example:

```powershell
npx supabase secrets set ^
  PLUNK_API_KEY=sk_your_plunk_secret_api_key ^
  LEADS_FROM_EMAIL="Lumimar Homes <hello@home.lumimarbrand.com>" ^
  LEADS_NOTIFY_EMAIL=hello@home.lumimarbrand.com ^
  LEADS_REPLY_TO_EMAIL=hello@home.lumimarbrand.com ^
  PUBLIC_SITE_URL=https://home.lumimarbrand.com
```

## Auth Model

- `owner` users can access `/owner/*`
- `staff` and `admin` users can access `/internal/*`
- Role data lives in `lumimar.profiles.role`

When a new auth user is created, a `profiles` row is created automatically by the database trigger.

## First Admin Bootstrap

After creating your first internal user in Supabase Auth, set its role in the SQL editor:

```sql
update lumimar.profiles
set role = 'admin'
where id = 'YOUR_USER_UUID';
```

## Build Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Deployment Note

The existing GitHub Pages workflow builds the frontend only. If you deploy this project with the owner portal and lead capture enabled, point the frontend at a hosted Supabase project and deploy the edge functions there as well.
