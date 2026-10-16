-- Which subcategory prompt was copied, by which tool/account, and when.
-- Used by the writing dashboard to show "in progress" across devices.
create table if not exists public.subcategory_claims (
  subcategory_code text primary key references public.subcategories(code),
  writer           text not null,
  claimed_at       timestamptz not null default now()
);
alter table public.subcategory_claims enable row level security;
