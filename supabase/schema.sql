-- ============================================================================
-- Portfolio CMS schema for Supabase (Postgres)
-- ============================================================================
-- Run this once in your Supabase project's SQL Editor (or via the Supabase
-- CLI: `supabase db push`). Safe to re-run — uses IF NOT EXISTS / OR REPLACE
-- where practical, but on a fresh project just run it top to bottom.
--
-- Design notes:
-- - `profile` is a singleton table (exactly one row, id = 1) holding the
--   bio/contact fields that used to live in siteContent.ts's top level.
-- - `skill_categories`, `experience`, `education`, `certifications` are
--   simple ordered lists — the admin panel replaces a section's rows
--   wholesale on Save, same as it replaced the whole array in localStorage
--   before. This keeps the write logic simple and matches the existing
--   "edit a draft, then Save" UX exactly.
-- - `projects.id` is a plain integer (not uuid) because the frontend
--   displays it directly (case number "01", "02"...) — no frontend changes
--   needed for that.
-- - Public (anon) role can SELECT everything. Only an authenticated session
--   can INSERT/UPDATE/DELETE. There is exactly one admin user for this
--   project (create it in Authentication → Users in the Supabase
--   dashboard) — make sure "Allow new user signups" is OFF in
--   Authentication → Settings so no one else can create an account.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- profile — singleton row
-- ---------------------------------------------------------------------------
create table if not exists profile (
  id integer primary key default 1 check (id = 1),
  name text not null default '',
  role text not null default '',
  bio text not null default '',
  email text not null default '',
  phone text not null default '',
  github_url text not null default '',
  github_handle text not null default '',
  linkedin_url text not null default '',
  linkedin_handle text not null default '',
  website_url text not null default '',
  website_label text not null default '',
  location text not null default '',
  avatar_url text,
  badge_photo_url text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- skill_categories — e.g. "Languages" -> ["Python", "JavaScript", ...]
-- ---------------------------------------------------------------------------
create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  items text[] not null default '{}',
  sort_order integer not null default 0
);

-- ---------------------------------------------------------------------------
-- experience
-- ---------------------------------------------------------------------------
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  org text not null,
  date text not null default '',
  bullets text[] not null default '{}',
  sort_order integer not null default 0
);

-- ---------------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------------
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  school text not null,
  program text not null default '',
  degree text not null default '',
  expected text not null default '',
  cgpa text not null default '',
  sort_order integer not null default 0
);

-- ---------------------------------------------------------------------------
-- certifications
-- ---------------------------------------------------------------------------
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null default '',
  sort_order integer not null default 0
);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id integer generated always as identity primary key,
  name text not null,
  tag text not null default '',
  color text not null default '#5b7cd9',
  deep text not null default '#3f5fc0',
  on_dark boolean not null default false,
  devices text not null default 'phones'
    check (devices in ('phones', 'phone-tablet', 'laptop', 'phones-alt')),
  year text not null default '',
  role text not null default '',
  timeline text not null default '',
  tools text[] not null default '{}',
  overview text not null default '',
  highlights text[] not null default '{}',
  github text not null default '',
  demo text not null default '',
  featured boolean not null default true,
  sort_order integer not null default 0,
  image_url text
);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table profile enable row level security;
alter table skill_categories enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table certifications enable row level security;
alter table projects enable row level security;

-- Public read access (the live portfolio uses the anon key for this)
create policy "public can read profile" on profile for select using (true);
create policy "public can read skills" on skill_categories for select using (true);
create policy "public can read experience" on experience for select using (true);
create policy "public can read education" on education for select using (true);
create policy "public can read certifications" on certifications for select using (true);
create policy "public can read projects" on projects for select using (true);

-- Authenticated-only writes (the admin dashboard, after Supabase Auth sign-in)
create policy "authenticated can modify profile" on profile
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can modify skills" on skill_categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can modify experience" on experience
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can modify education" on education
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can modify certifications" on certifications
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can modify projects" on projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================================
-- Storage — avatar photo, badge photo, certificate files, project images
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "public can view portfolio media"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

create policy "authenticated can upload portfolio media"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

create policy "authenticated can update portfolio media"
  on storage.objects for update
  using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

create policy "authenticated can delete portfolio media"
  on storage.objects for delete
  using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');
