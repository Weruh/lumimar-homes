# Lumimar Homes Supabase Backend

This folder contains the Supabase backend for Lumimar Homes: database schema, row-level security, storage buckets, seed data, and Edge Functions.

## Contents

- `config.toml` - Local Supabase CLI configuration for API, database, Studio, Auth, storage, and Edge Functions.
- `migrations/202604180001_init_backend.sql` - Initial backend migration.
- `seed.sql` - Local seed data for sample owner lead inquiries.
- `functions/submit-owner-lead` - Public lead capture function used by the website apply flow.
- `functions/invite-owner` - Staff/admin-only function for inviting owner portal users.
- `functions/_shared/cors.ts` - Shared CORS headers for Edge Functions.

## Local Setup

Prerequisites:

- Node.js 20+
- Supabase CLI
- Docker running locally

From the app package directory:

```powershell
cd lumimar_homes
npm install
npm run supabase:start
npm run supabase:reset
```

Useful commands:

```powershell
npm run supabase:status
npm run supabase:stop
```

`supabase db reset` rebuilds the local database from migrations and then runs `seed.sql`.

## Frontend Environment

The Vite frontend only needs public Supabase values:

```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=your-local-or-hosted-anon-key
```

Never put `SUPABASE_SERVICE_ROLE_KEY` in a frontend `.env` file.

## Database Schema

All business tables live in the `lumimar` schema.

Core tables:

- `profiles` - App profile for each Supabase Auth user, including `role`.
- `owners` - Property owner records and payout contact details.
- `properties` - Managed homes, rates, location, status, and metadata.
- `property_media` - Storage references for property images.
- `lead_inquiries` - Owner acquisition leads submitted from the website.
- `bookings` - Guest booking records by property.
- `cleaning_jobs` - Turnover and cleaning schedule records.
- `maintenance_tickets` - Maintenance requests and owner approvals.
- `payouts` - Owner payout periods and payment status.
- `financial_statements` - Generated owner statement metadata.
- `activity_logs` - Staff-visible audit/activity records.

Views:

- `owner_dashboard_summary` - Owner dashboard totals for active properties, upcoming bookings, revenue, payouts, and maintenance.
- `lead_pipeline_summary` - Lead counts grouped by pipeline stage.

Enums:

- `app_role`: `owner`, `staff`, `admin`
- `lead_stage`: `new`, `discovery`, `site_visit`, `proposal`, `closing`, `won`, `lost`
- `property_status`: `draft`, `onboarding`, `active`, `paused`, `archived`
- `booking_status`: `inquiry`, `confirmed`, `in_house`, `completed`, `cancelled`
- `job_status`: `scheduled`, `in_progress`, `completed`, `cancelled`
- `ticket_priority`: `low`, `medium`, `high`, `urgent`
- `ticket_status`: `open`, `in_progress`, `awaiting_owner`, `resolved`, `cancelled`
- `payout_status`: `draft`, `pending`, `approved`, `paid`, `failed`
- `statement_status`: `draft`, `published`

## Auth And Roles

Supabase Auth owns authentication. The `lumimar.profiles` table owns app authorization.

Roles:

- `owner` - Can read their own owner/property data, bookings, maintenance, payouts, and statements.
- `staff` - Can manage operational records.
- `admin` - Staff permissions plus admin profile updates.

When a new Auth user is created, the `lumimar.handle_new_user()` trigger creates a matching `profiles` row.

Bootstrap the first admin manually in the Supabase SQL editor:

```sql
update lumimar.profiles
set role = 'admin'
where id = 'YOUR_USER_UUID';
```

## Row-Level Security

RLS is enabled on every `lumimar` table.

Access is based on helper functions:

- `lumimar.current_app_role()` - Reads the current user's app role.
- `lumimar.is_staff()` - True for `staff` and `admin`.
- `lumimar.is_admin()` - True for `admin`.
- `lumimar.owns_owner(owner_id)` - True when the owner belongs to the current user.
- `lumimar.owns_property(property_id)` - True when the property belongs to the current user.

The public `anon` role does not directly write owner leads through table access. Public lead capture should go through the `submit-owner-lead` Edge Function.

## Storage

The migration creates three storage buckets:

- `property-media` - Public bucket for property images.
- `owner-documents` - Private bucket for owner documents.
- `maintenance-attachments` - Private bucket for maintenance files.

Storage policies allow public reads from `property-media`. Uploads and protected bucket access require staff/admin authorization.

## Edge Functions

### `submit-owner-lead`

Public function used by the website apply form.

Configuration:

- `verify_jwt = false`
- Method: `POST`
- Stores rows in `lumimar.lead_inquiries` using the service role key.
- Sends optional Plunk emails to the team and the lead.
- Includes a honeypot field named `website`.

Expected payload:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+254700000000",
  "location": "Diani",
  "currentEarnings": "100k-200k",
  "service": "full-management",
  "message": "Optional notes",
  "website": ""
}
```

Secrets:

```powershell
npx supabase secrets set `
  PLUNK_API_KEY=sk_your_plunk_secret_key `
  LEADS_FROM_EMAIL="Lumimar Homes <hello@home.lumimarbrand.com>" `
  LEADS_NOTIFY_EMAIL=hello@home.lumimarbrand.com `
  LEADS_REPLY_TO_EMAIL=hello@home.lumimarbrand.com `
  PUBLIC_SITE_URL=https://home.lumimarbrand.com
```

`PLUNK_PRIVATE_KEY` is also accepted as a fallback. Use a Plunk secret key, not a public `pk_*` key.

### `invite-owner`

Authenticated staff/admin function for creating owner portal access.

Configuration:

- `verify_jwt = true`
- Method: `POST`
- Requires a valid staff/admin bearer token.
- Invites the owner through Supabase Auth.
- Upserts `lumimar.profiles` and `lumimar.owners`.
- Redirects invited users to `/auth/set-password`.

Expected payload:

```json
{
  "email": "owner@example.com",
  "fullName": "Owner Name",
  "phone": "+254700000000",
  "displayName": "Owner Display Name",
  "legalName": "Legal Owner Name",
  "primaryResidence": "Nairobi"
}
```

## Auth Email

Auth email is configured in `config.toml` to use Gmail SMTP for confirmation, recovery, magic link, and invite emails.

For local CLI runs, create a repo-root `.env`:

```env
GMAIL_SMTP_USER=your-gmail-address@gmail.com
GMAIL_SMTP_PASS=your-gmail-app-password
GMAIL_SMTP_ADMIN_EMAIL=your-gmail-address@gmail.com
```

For hosted Supabase, configure the same values in Authentication > Emails > SMTP provider. Use a Gmail app password.

## Deploy

Link the project once:

```powershell
npx supabase link --project-ref your-project-ref
```

Push database changes:

```powershell
npx supabase db push
```

Deploy functions:

```powershell
npx supabase functions deploy submit-owner-lead
npx supabase functions deploy invite-owner
```

Set hosted function secrets after deployment or before first use:

```powershell
npx supabase secrets set `
  PLUNK_API_KEY=sk_your_plunk_secret_key `
  LEADS_FROM_EMAIL="Lumimar Homes <hello@home.lumimarbrand.com>" `
  LEADS_NOTIFY_EMAIL=hello@home.lumimarbrand.com `
  LEADS_REPLY_TO_EMAIL=hello@home.lumimarbrand.com `
  PUBLIC_SITE_URL=https://home.lumimarbrand.com
```

## Notes

- Keep all business queries scoped to `.schema('lumimar')` from the Supabase client.
- Keep service role usage inside Edge Functions or trusted server environments only.
- Add new schema changes as new files in `supabase/migrations`; do not edit applied migrations after they have been pushed to a shared or hosted project.
