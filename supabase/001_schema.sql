-- BusinessIdea.io database, part 1 of 2: tables, rules and security.
-- Run once in the Supabase SQL Editor of the new, empty project.
-- Safe to re-run: every statement checks before it creates.

-- Categories: 100 rows, fixed by the approved architecture.
create table if not exists public.categories (
  code        text primary key check (code ~ '^C[0-9]{3}$'),
  position    int  not null unique,
  name        text not null,
  short_name  text not null,
  slug        text not null unique,
  created_at  timestamptz not null default now()
);

-- Subcategories: 1,000 rows, ten per category. Research note fields are
-- filled later by the import script.
create table if not exists public.subcategories (
  code           text primary key check (code ~ '^C[0-9]{3}-S[0-9]{2}$'),
  category_code  text not null references public.categories(code),
  position       int  not null check (position between 1 and 99),
  name           text not null,
  slug           text not null unique,
  intro          text,
  how_to_choose  text,
  faq            jsonb not null default '[]'::jsonb,
  target_people  text[] not null default '{}',
  keywords       text[] not null default '{}',
  search_intent  text,
  scope          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (category_code, position)
);

-- Ideas: 10,000 at launch. Written to the repo as JSON, loaded by the import
-- script. Only 'published' rows are visible to the public.
create table if not exists public.ideas (
  code              text primary key check (code ~ '^C[0-9]{3}-S[0-9]{2}-I[0-9]{2,3}$'),
  subcategory_code  text not null references public.subcategories(code),
  category_code     text not null references public.categories(code),
  position          int  not null,
  slug              text not null unique,
  title             text not null,
  hook              text not null,
  summary           text not null,
  what_it_is        text not null,
  who_pays_you      text not null,
  how_money_comes   text not null,
  what_you_need     text not null,
  first_30_days     jsonb not null default '[]'::jsonb,
  what_hurts        text not null,
  verdict           text not null,
  faq               jsonb not null default '[]'::jsonb,
  validate_prompt   text not null,
  investment_band   text not null check (investment_band in ('zero','under_25k','25k_1l','1l_5l','above_5l')),
  gender_fit        text not null default 'any' check (gender_fit in ('any','women','men')),
  life_stage        text[] not null default '{any}' check (life_stage <@ array['any','student','homemaker','working_professional','senior_citizen']),
  place             text[] not null default '{any}' check (place <@ array['any','village','small_town','city','metro']),
  work_mode         text not null check (work_mode in ('home','shop','online','field','mixed')),
  time_needed       text not null check (time_needed in ('part_time','full_time','weekends')),
  skill_level       text not null check (skill_level in ('none','basic','trained')),
  status            text not null default 'published' check (status in ('published','flagged','hidden')),
  flag_reason       text,
  writer            text not null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (subcategory_code, position)
);
create index if not exists ideas_category_idx on public.ideas (category_code);
create index if not exists ideas_status_idx on public.ideas (status);

-- External links block ("Others building in India"). Indian sites only.
create table if not exists public.external_links (
  id          bigint generated always as identity primary key,
  name        text not null,
  url         text not null unique,
  domain      text not null,
  group_name  text not null,
  rel         text not null default 'nofollow' check (rel in ('nofollow','follow')),
  show_logo   boolean not null default true,
  active      boolean not null default true,
  position    int not null default 0,
  created_at  timestamptz not null default now()
);

-- Readers, plans and purchases. Money is stored in paise (Rs 199 = 19900).
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  created_at  timestamptz not null default now()
);

create table if not exists public.plans (
  code         text primary key,
  name         text not null,
  price_paise  int  not null check (price_paise >= 0),
  description  text not null,
  active       boolean not null default true
);

create table if not exists public.purchases (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  plan_code      text not null references public.plans(code),
  category_code  text references public.categories(code),
  order_id       text unique,
  amount_paise   int  not null check (amount_paise >= 0),
  status         text not null default 'created' check (status in ('created','paid','failed','refunded')),
  created_at     timestamptz not null default now()
);

create table if not exists public.saved_ideas (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  idea_code   text not null references public.ideas(code) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, idea_code)
);

-- updated_at moves only when the row really changed, so sitemap dates stay honest.
create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists ideas_touch on public.ideas;
create trigger ideas_touch before update on public.ideas
  for each row when (old.* is distinct from new.*) execute function public.touch_updated_at();
drop trigger if exists subcategories_touch on public.subcategories;
create trigger subcategories_touch before update on public.subcategories
  for each row when (old.* is distinct from new.*) execute function public.touch_updated_at();

-- A profile row for every new sign-in.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email) on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row level security: the public reads published content; readers see only
-- their own account rows. All writes to content go through the service key.
alter table public.categories     enable row level security;
alter table public.subcategories  enable row level security;
alter table public.ideas          enable row level security;
alter table public.external_links enable row level security;
alter table public.profiles       enable row level security;
alter table public.plans          enable row level security;
alter table public.purchases      enable row level security;
alter table public.saved_ideas    enable row level security;

drop policy if exists "public read categories" on public.categories;
create policy "public read categories" on public.categories for select using (true);
drop policy if exists "public read subcategories" on public.subcategories;
create policy "public read subcategories" on public.subcategories for select using (true);
drop policy if exists "public read published ideas" on public.ideas;
create policy "public read published ideas" on public.ideas for select using (status = 'published');
drop policy if exists "public read active links" on public.external_links;
create policy "public read active links" on public.external_links for select using (active);
drop policy if exists "public read active plans" on public.plans;
create policy "public read active plans" on public.plans for select using (active);

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "own purchases" on public.purchases;
create policy "own purchases" on public.purchases for select using (auth.uid() = user_id);
drop policy if exists "own saved read" on public.saved_ideas;
create policy "own saved read" on public.saved_ideas for select using (auth.uid() = user_id);
drop policy if exists "own saved add" on public.saved_ideas;
create policy "own saved add" on public.saved_ideas for insert with check (auth.uid() = user_id);
drop policy if exists "own saved remove" on public.saved_ideas;
create policy "own saved remove" on public.saved_ideas for delete using (auth.uid() = user_id);

-- The two plans. Contents are decision D1 in the master plan.
insert into public.plans (code, name, price_paise, description) values
  ('starter', 'Starter', 19900, 'Full idea pages for one category of your choice, lifetime.'),
  ('full',    'Full library', 39900, 'Full idea pages for every category and every idea added later, lifetime.')
on conflict (code) do nothing;
