-- Ideas the founder saved with "Save anyway" in the Writing Desk.
-- The desk's "too short, rewrite" check skips these codes.
create table if not exists public.approved_ideas (
  code text primary key,
  approved_at timestamptz not null default now()
);
alter table public.approved_ideas enable row level security;
