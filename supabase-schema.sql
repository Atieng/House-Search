-- Run this once in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run)

-- 1. Exact locations, kept server-side only. Never sent to the browser
--    until a tenant's unlock submission is approved.
create table if not exists listing_locations (
  listing_id integer primary key,
  exact_location text not null,
  updated_at timestamptz not null default now()
);

-- 2. Pay-to-unlock submissions (M-Pesa Send Money + manual approval)
create table if not exists unlock_submissions (
  id uuid primary key default gen_random_uuid(),
  listing_id integer not null,
  phone text not null,
  mpesa_code text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create index if not exists idx_unlock_submissions_listing on unlock_submissions(listing_id);
create index if not exists idx_unlock_submissions_status on unlock_submissions(status);

-- 3. Viewing appointment bookings, created after a location unlock is approved
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id integer not null,
  submission_id uuid references unlock_submissions(id),
  name text not null,
  phone text not null,
  preferred_date date not null,
  preferred_time text not null,
  notes text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists idx_bookings_listing on bookings(listing_id);
create index if not exists idx_bookings_status on bookings(status);

-- Row Level Security: lock every table down. The app talks to Supabase
-- only from the server using the service role key, which bypasses RLS,
-- so the browser (using the public anon key, if ever exposed) can never
-- read or write these tables directly.
alter table listing_locations enable row level security;
alter table unlock_submissions enable row level security;
alter table bookings enable row level security;

-- Seed example: put your real exact locations here, one row per listing id
-- (matches the `id` field in data/properties.js).
-- insert into listing_locations (listing_id, exact_location) values
--   (12, 'Gate C, blue metal gate opposite the mini-mart, house 4'),
--   (13, 'Gate C, blue metal gate opposite the mini-mart, house 5'),
--   (16, 'Gate A, next to the police post, green gate');
