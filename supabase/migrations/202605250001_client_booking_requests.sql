create table if not exists lumimar.booking_requests (
  id uuid primary key default gen_random_uuid(),
  suite_name text not null,
  room_type text not null,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  check_in date,
  check_out date,
  guests integer not null default 1,
  status text not null default 'new',
  message text,
  admin_notes text,
  last_response_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists lumimar.client_messages (
  id uuid primary key default gen_random_uuid(),
  booking_request_id uuid references lumimar.booking_requests(id) on delete cascade,
  recipient_email text not null,
  recipient_name text,
  subject text not null,
  message text not null,
  sent_by uuid references lumimar.profiles(id) on delete set null,
  delivery_status text not null default 'queued',
  delivery_error text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table lumimar.booking_requests
  add column if not exists payment_status text not null default 'unpaid',
  add column if not exists payment_reference text,
  add column if not exists payment_authorization_url text,
  add column if not exists payment_access_code text,
  add column if not exists payment_amount_kes numeric(12,2),
  add column if not exists payment_currency text not null default 'KES',
  add column if not exists payment_expires_at timestamptz,
  add column if not exists payment_verified_at timestamptz,
  add column if not exists payment_gateway_response jsonb;

create unique index if not exists booking_requests_payment_reference_key
  on lumimar.booking_requests(payment_reference)
  where payment_reference is not null;

create index if not exists booking_requests_availability_idx
  on lumimar.booking_requests(suite_name, check_in, check_out, status, payment_status, payment_expires_at);

drop trigger if exists set_booking_requests_updated_at on lumimar.booking_requests;
create trigger set_booking_requests_updated_at
  before update on lumimar.booking_requests
  for each row execute procedure lumimar.set_updated_at();

alter table lumimar.booking_requests enable row level security;
alter table lumimar.client_messages enable row level security;

drop policy if exists "Booking requests are readable by staff" on lumimar.booking_requests;
drop policy if exists "Staff can manage booking requests" on lumimar.booking_requests;
drop policy if exists "Client messages are readable by staff" on lumimar.client_messages;
drop policy if exists "Staff can manage client messages" on lumimar.client_messages;

create policy "Booking requests are readable by staff"
  on lumimar.booking_requests for select
  using (lumimar.is_staff());

create policy "Staff can manage booking requests"
  on lumimar.booking_requests for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

create policy "Client messages are readable by staff"
  on lumimar.client_messages for select
  using (lumimar.is_staff());

create policy "Staff can manage client messages"
  on lumimar.client_messages for all
  using (lumimar.is_staff())
  with check (lumimar.is_staff());

grant all on lumimar.booking_requests to anon, authenticated, service_role;
grant all on lumimar.client_messages to anon, authenticated, service_role;
