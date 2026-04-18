insert into lumimar.lead_inquiries (
  name,
  email,
  phone,
  location,
  current_earnings_band,
  service,
  message,
  stage,
  metadata
)
values
  (
    'Amina Njoroge',
    'amina@example.com',
    '+254712345678',
    'Diani Beach',
    '100k-200k',
    'full-management',
    'Three-bedroom villa currently self-managed.',
    'discovery',
    '{"source":"seed"}'::jsonb
  ),
  (
    'David Mwangi',
    'david@example.com',
    '+254723456789',
    'Watamu',
    'not-rented',
    'interior-styling',
    'New unit needs furnishing and launch support.',
    'proposal',
    '{"source":"seed"}'::jsonb
  )
on conflict do nothing;
