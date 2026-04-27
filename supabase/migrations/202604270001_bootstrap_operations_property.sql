insert into lumimar.owners (
  id,
  display_name,
  legal_name,
  email,
  phone,
  primary_residence,
  notes
)
values (
  '10000000-0000-4000-8000-000000000001',
  'Lumimar Demo Owner',
  'Lumimar Demo Owner',
  'hello@home.lumimarbrand.com',
  '+254705551021',
  'Diani Beach',
  'Bootstrap owner used so internal operations can create cleaning jobs and maintenance tickets before real owner onboarding.'
)
on conflict (id) do update
set
  display_name = excluded.display_name,
  legal_name = excluded.legal_name,
  email = excluded.email,
  phone = excluded.phone,
  primary_residence = excluded.primary_residence,
  notes = excluded.notes;

insert into lumimar.properties (
  id,
  owner_id,
  name,
  slug,
  property_type,
  status,
  location_label,
  address,
  city,
  region,
  country,
  bedrooms,
  bathrooms,
  max_guests,
  base_currency,
  nightly_rate,
  monthly_rate,
  description
)
values (
  '10000000-0000-4000-8000-000000000101',
  '10000000-0000-4000-8000-000000000001',
  'Lumimar Demo Coastal Home',
  'lumimar-demo-coastal-home',
  'villa',
  'active',
  'Diani Beach, Kenya',
  'Diani Beach Road',
  'Diani',
  'Kwale',
  'Kenya',
  3,
  2.5,
  6,
  'KES',
  18500,
  320000,
  'Bootstrap property used for operations workflows until real managed homes are onboarded.'
)
on conflict (id) do update
set
  owner_id = excluded.owner_id,
  name = excluded.name,
  slug = excluded.slug,
  property_type = excluded.property_type,
  status = excluded.status,
  location_label = excluded.location_label,
  address = excluded.address,
  city = excluded.city,
  region = excluded.region,
  country = excluded.country,
  bedrooms = excluded.bedrooms,
  bathrooms = excluded.bathrooms,
  max_guests = excluded.max_guests,
  base_currency = excluded.base_currency,
  nightly_rate = excluded.nightly_rate,
  monthly_rate = excluded.monthly_rate,
  description = excluded.description;
