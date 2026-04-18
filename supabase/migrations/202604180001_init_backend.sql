create extension if not exists pgcrypto;

create schema if not exists lumimar;

grant usage on schema lumimar to anon, authenticated, service_role;

create type lumimar.app_role as enum ('owner', 'staff', 'admin');
create type lumimar.lead_stage as enum ('new', 'discovery', 'site_visit', 'proposal', 'closing', 'won', 'lost');
create type lumimar.property_status as enum ('draft', 'onboarding', 'active', 'paused', 'archived');
create type lumimar.booking_status as enum ('inquiry', 'confirmed', 'in_house', 'completed', 'cancelled');
create type lumimar.job_status as enum ('scheduled', 'in_progress', 'completed', 'cancelled');
create type lumimar.ticket_priority as enum ('low', 'medium', 'high', 'urgent');
create type lumimar.ticket_status as enum ('open', 'in_progress', 'awaiting_owner', 'resolved', 'cancelled');
create type lumimar.payout_status as enum ('draft', 'pending', 'approved', 'paid', 'failed');
create type lumimar.statement_status as enum ('draft', 'published');

create or replace function lumimar.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table lumimar.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role lumimar.app_role not null default 'owner',
  full_name text,
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.owners (
  id uuid primary key default gen_random_uuid(),
  primary_contact_user_id uuid unique references lumimar.profiles(id) on delete set null,
  legal_name text,
  display_name text not null,
  email text,
  phone text,
  primary_residence text,
  payout_method text,
  payout_reference text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references lumimar.owners(id) on delete cascade,
  name text not null,
  slug text unique,
  property_type text not null,
  status lumimar.property_status not null default 'draft',
  location_label text not null,
  address text,
  city text,
  region text,
  country text default 'Kenya',
  bedrooms integer not null default 1,
  bathrooms numeric(4,1) not null default 1,
  max_guests integer not null default 2,
  base_currency text not null default 'KES',
  nightly_rate numeric(12,2),
  monthly_rate numeric(12,2),
  cover_image_url text,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.property_media (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references lumimar.properties(id) on delete cascade,
  bucket_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table lumimar.lead_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  location text not null,
  current_earnings_band text,
  service text not null,
  message text,
  source text not null default 'website_apply_form',
  stage lumimar.lead_stage not null default 'new',
  assigned_to uuid references lumimar.profiles(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references lumimar.properties(id) on delete cascade,
  guest_name text not null,
  guest_email text,
  channel text not null,
  status lumimar.booking_status not null default 'inquiry',
  check_in date not null,
  check_out date not null,
  gross_amount numeric(12,2) not null default 0,
  platform_fee numeric(12,2) not null default 0,
  cleaning_fee numeric(12,2) not null default 0,
  net_amount numeric(12,2) not null default 0,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.cleaning_jobs (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references lumimar.properties(id) on delete cascade,
  booking_id uuid references lumimar.bookings(id) on delete set null,
  scheduled_start timestamptz not null,
  scheduled_end timestamptz not null,
  assigned_team text,
  status lumimar.job_status not null default 'scheduled',
  checklist jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.maintenance_tickets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references lumimar.properties(id) on delete cascade,
  created_by uuid references lumimar.profiles(id) on delete set null,
  assigned_to uuid references lumimar.profiles(id) on delete set null,
  title text not null,
  description text,
  priority lumimar.ticket_priority not null default 'medium',
  status lumimar.ticket_status not null default 'open',
  estimated_cost numeric(12,2),
  approval_required boolean not null default false,
  approved_by_owner boolean not null default false,
  owner_approved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.payouts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references lumimar.owners(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  gross_revenue numeric(12,2) not null default 0,
  deductions numeric(12,2) not null default 0,
  net_payout numeric(12,2) not null default 0,
  status lumimar.payout_status not null default 'draft',
  payout_method_snapshot text,
  payout_reference text,
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.financial_statements (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references lumimar.owners(id) on delete cascade,
  payout_id uuid references lumimar.payouts(id) on delete set null,
  period_start date not null,
  period_end date not null,
  statement_status lumimar.statement_status not null default 'draft',
  storage_path text,
  generated_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table lumimar.activity_logs (
  id bigint generated by default as identity primary key,
  actor_id uuid references lumimar.profiles(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function lumimar.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = lumimar, public
as $$
begin
  insert into lumimar.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure lumimar.handle_new_user();

create or replace function lumimar.current_app_role()
returns lumimar.app_role
language sql
stable
security definer
set search_path = lumimar, public
as $$
  select role
  from lumimar.profiles
  where id = auth.uid()
$$;

create or replace function lumimar.is_staff()
returns boolean
language sql
stable
security definer
set search_path = lumimar, public
as $$
  select coalesce(lumimar.current_app_role() in ('staff', 'admin'), false)
$$;

create or replace function lumimar.is_admin()
returns boolean
language sql
stable
security definer
set search_path = lumimar, public
as $$
  select coalesce(lumimar.current_app_role() = 'admin', false)
$$;

create or replace function lumimar.owns_owner(target_owner_id uuid)
returns boolean
language sql
stable
security definer
set search_path = lumimar, public
as $$
  select exists (
    select 1
    from lumimar.owners
    where id = target_owner_id
      and primary_contact_user_id = auth.uid()
  )
$$;

create or replace function lumimar.owns_property(target_property_id uuid)
returns boolean
language sql
stable
security definer
set search_path = lumimar, public
as $$
  select exists (
    select 1
    from lumimar.properties p
    join lumimar.owners o on o.id = p.owner_id
    where p.id = target_property_id
      and o.primary_contact_user_id = auth.uid()
  )
$$;

create or replace view lumimar.owner_dashboard_summary
with (security_invoker = true) as
select
  o.id as owner_id,
  count(distinct p.id) filter (where p.status = 'active') as active_properties,
  count(distinct b.id) filter (where b.status in ('confirmed', 'in_house') and b.check_in >= current_date) as upcoming_bookings,
  coalesce(sum(b.gross_amount) filter (where date_trunc('month', b.check_in::timestamp) = date_trunc('month', now())), 0)::numeric(12,2) as month_gross_revenue,
  coalesce(sum(py.net_payout) filter (where date_trunc('month', py.period_end::timestamp) = date_trunc('month', now())), 0)::numeric(12,2) as month_net_payouts,
  count(distinct mt.id) filter (where mt.status in ('open', 'in_progress', 'awaiting_owner')) as open_maintenance_tickets
from lumimar.owners o
left join lumimar.properties p on p.owner_id = o.id
left join lumimar.bookings b on b.property_id = p.id
left join lumimar.maintenance_tickets mt on mt.property_id = p.id
left join lumimar.payouts py on py.owner_id = o.id
group by o.id;

create or replace view lumimar.lead_pipeline_summary
with (security_invoker = true) as
select
  stage,
  count(*)::bigint as total
from lumimar.lead_inquiries
group by stage;

create trigger set_profiles_updated_at
  before update on lumimar.profiles
  for each row execute procedure lumimar.set_updated_at();

create trigger set_owners_updated_at
  before update on lumimar.owners
  for each row execute procedure lumimar.set_updated_at();

create trigger set_properties_updated_at
  before update on lumimar.properties
  for each row execute procedure lumimar.set_updated_at();

create trigger set_lead_inquiries_updated_at
  before update on lumimar.lead_inquiries
  for each row execute procedure lumimar.set_updated_at();

create trigger set_bookings_updated_at
  before update on lumimar.bookings
  for each row execute procedure lumimar.set_updated_at();

create trigger set_cleaning_jobs_updated_at
  before update on lumimar.cleaning_jobs
  for each row execute procedure lumimar.set_updated_at();

create trigger set_maintenance_tickets_updated_at
  before update on lumimar.maintenance_tickets
  for each row execute procedure lumimar.set_updated_at();

create trigger set_payouts_updated_at
  before update on lumimar.payouts
  for each row execute procedure lumimar.set_updated_at();

create trigger set_financial_statements_updated_at
  before update on lumimar.financial_statements
  for each row execute procedure lumimar.set_updated_at();

insert into storage.buckets (id, name, public)
values
  ('property-media', 'property-media', true),
  ('owner-documents', 'owner-documents', false),
  ('maintenance-attachments', 'maintenance-attachments', false)
on conflict (id) do nothing;

grant all on all tables in schema lumimar to anon, authenticated, service_role;
grant all on all routines in schema lumimar to anon, authenticated, service_role;
grant all on all sequences in schema lumimar to anon, authenticated, service_role;

alter default privileges in schema lumimar grant all on tables to anon, authenticated, service_role;
alter default privileges in schema lumimar grant all on routines to anon, authenticated, service_role;
alter default privileges in schema lumimar grant all on sequences to anon, authenticated, service_role;

alter table lumimar.profiles enable row level security;
alter table lumimar.owners enable row level security;
alter table lumimar.properties enable row level security;
alter table lumimar.property_media enable row level security;
alter table lumimar.lead_inquiries enable row level security;
alter table lumimar.bookings enable row level security;
alter table lumimar.cleaning_jobs enable row level security;
alter table lumimar.maintenance_tickets enable row level security;
alter table lumimar.payouts enable row level security;
alter table lumimar.financial_statements enable row level security;
alter table lumimar.activity_logs enable row level security;
create policy "Profiles are readable by self or staff"
  on lumimar.profiles for select
  using (id = auth.uid() or lumimar.is_staff());

create policy "Profiles can update themselves"
  on lumimar.profiles for update
  using (id = auth.uid() or lumimar.is_admin())
  with check (id = auth.uid() or lumimar.is_admin());

create policy "Staff can manage profiles"
  on lumimar.profiles for insert
  with check (lumimar.is_staff());

create policy "Owners are readable by owner or staff"
  on lumimar.owners for select
  using (primary_contact_user_id = auth.uid() or lumimar.is_staff());

create policy "Staff can create owners"
  on lumimar.owners for insert
  with check (lumimar.is_staff());

create policy "Owners or staff can update owners"
  on lumimar.owners for update
  using (primary_contact_user_id = auth.uid() or lumimar.is_staff())
  with check (primary_contact_user_id = auth.uid() or lumimar.is_staff());

create policy "Staff can delete owners"
  on lumimar.owners for delete
  using (lumimar.is_staff());

create policy "Properties are readable by owner or staff"
  on lumimar.properties for select
  using (lumimar.owns_property(id) or lumimar.is_staff());

create policy "Staff can manage properties"
  on lumimar.properties for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Property media is readable by owner or staff"
  on lumimar.property_media for select
  using (
    lumimar.is_staff()
    or exists (
      select 1
      from lumimar.properties p
      where p.id = property_media.property_id
        and lumimar.owns_property(p.id)
    )
  );

create policy "Staff can manage property media rows"
  on lumimar.property_media for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Lead inquiries are readable by staff"
  on lumimar.lead_inquiries for select
  using (lumimar.is_staff());

create policy "Lead inquiries are manageable by staff"
  on lumimar.lead_inquiries for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Bookings are readable by owner or staff"
  on lumimar.bookings for select
  using (lumimar.owns_property(property_id) or lumimar.is_staff());

create policy "Staff can manage bookings"
  on lumimar.bookings for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Cleaning jobs are readable by owner or staff"
  on lumimar.cleaning_jobs for select
  using (lumimar.owns_property(property_id) or lumimar.is_staff());

create policy "Staff can manage cleaning jobs"
  on lumimar.cleaning_jobs for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Maintenance tickets are readable by owner or staff"
  on lumimar.maintenance_tickets for select
  using (lumimar.owns_property(property_id) or lumimar.is_staff());

create policy "Owners can approve maintenance state"
  on lumimar.maintenance_tickets for update
  using (lumimar.owns_property(property_id) or lumimar.is_staff())
  with check (lumimar.owns_property(property_id) or lumimar.is_staff());

create policy "Staff can create maintenance tickets"
  on lumimar.maintenance_tickets for insert
  with check (lumimar.is_staff());

create policy "Payouts are readable by owner or staff"
  on lumimar.payouts for select
  using (lumimar.owns_owner(owner_id) or lumimar.is_staff());

create policy "Staff can manage payouts"
  on lumimar.payouts for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Statements are readable by owner or staff"
  on lumimar.financial_statements for select
  using (lumimar.owns_owner(owner_id) or lumimar.is_staff());

create policy "Staff can manage statements"
  on lumimar.financial_statements for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Activity logs are readable by staff"
  on lumimar.activity_logs for select
  using (lumimar.is_staff());

create policy "Activity logs are writeable by staff"
  on lumimar.activity_logs for insert
  with check (lumimar.is_staff());

drop policy if exists "Property media bucket is public" on storage.objects;
drop policy if exists "Staff can upload property media" on storage.objects;
drop policy if exists "Staff can manage protected storage" on storage.objects;

create policy "Property media bucket is public"
  on storage.objects for select
  using (bucket_id = 'property-media');

create policy "Staff can upload property media"
  on storage.objects for insert
  with check (bucket_id = 'property-media' and lumimar.is_staff());

create policy "Staff can manage protected storage"
  on storage.objects for all
  using (
    bucket_id in ('owner-documents', 'maintenance-attachments', 'property-media')
    and lumimar.is_staff()
  )
  with check (
    bucket_id in ('owner-documents', 'maintenance-attachments', 'property-media')
    and lumimar.is_staff()
  );

grant select on lumimar.owner_dashboard_summary to authenticated;
grant select on lumimar.lead_pipeline_summary to authenticated;
