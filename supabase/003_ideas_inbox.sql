-- Inbox for ideas written through the batch prompts and the Google Sheet.
-- The Sheet's Ideas tab is downloaded as CSV and imported into ideas_inbox
-- (Table editor > Import data from CSV). Its 31 column headers match this table.
-- Then run:  select * from public.promote_ideas_inbox();
-- which moves every usable row into public.ideas and marks the rest rejected
-- with a reason. Safe to run again: only rows with status 'new' are touched,
-- and ideas are upserted by code (a later paste of the same code wins).

create table if not exists public.ideas_inbox (
  id                bigint generated always as identity primary key,
  code text, title text, slug text, hook text, summary text, what_it_is text,
  who_pays_you text, how_money_comes text, what_you_need text,
  step1 text, step2 text, step3 text, step4 text, step5 text,
  what_hurts text, verdict text,
  faq1_q text, faq1_a text, faq2_q text, faq2_a text, faq3_q text, faq3_a text,
  validate_prompt text, investment_band text, gender_fit text, life_stage text,
  place text, work_mode text, time_needed text, skill_level text, end_marker text,
  writer        text not null default 'batch',
  status        text not null default 'new' check (status in ('new','moved','rejected')),
  reason        text,
  imported_at   timestamptz not null default now()
);
create index if not exists ideas_inbox_status_idx on public.ideas_inbox (status);

-- Not readable by the public site: no policies, so only the dashboard and
-- the service role can touch it.
alter table public.ideas_inbox enable row level security;

create or replace function public.promote_ideas_inbox()
returns table (moved int, rejected int, still_new int)
language plpgsql
set search_path = public
as $$
declare
  r       public.ideas_inbox%rowtype;
  why     text;
  v_slug  text;
  v_ls    text[];
  v_pl    text[];
  n_moved int := 0;
  n_rej   int := 0;
begin
  for r in select * from public.ideas_inbox where status = 'new' order by id loop
    why := null;
    r.code := upper(btrim(r.code));

    if r.code is null or r.code !~ '^C[0-9]{3}-S[0-9]{2}-I[0-9]{2}$' then
      why := 'bad code';
    elsif upper(btrim(coalesce(r.end_marker, ''))) <> 'END' then
      why := 'no END: columns shifted';
    elsif not exists (select 1 from public.subcategories s where s.code = left(r.code, 8)) then
      why := 'unknown subcategory';
    elsif coalesce(btrim(r.title), '') = '' or coalesce(btrim(r.hook), '') = ''
       or coalesce(btrim(r.summary), '') = '' or coalesce(btrim(r.what_it_is), '') = ''
       or coalesce(btrim(r.who_pays_you), '') = '' or coalesce(btrim(r.how_money_comes), '') = ''
       or coalesce(btrim(r.what_you_need), '') = '' or coalesce(btrim(r.what_hurts), '') = ''
       or coalesce(btrim(r.verdict), '') = '' or coalesce(btrim(r.validate_prompt), '') = '' then
      why := 'empty main field';
    end if;

    if why is not null then
      update public.ideas_inbox set status = 'rejected', reason = why where id = r.id;
      n_rej := n_rej + 1;
      continue;
    end if;

    -- Slug: clean it; if another idea already owns it, add the idea code.
    v_slug := trim(both '-' from regexp_replace(lower(coalesce(nullif(btrim(r.slug), ''), r.title)), '[^a-z0-9]+', '-', 'g'));
    v_slug := regexp_replace(v_slug, '-business-idea$', '');
    if exists (select 1 from public.ideas i where i.slug = v_slug and i.code <> r.code) then
      v_slug := v_slug || '-' || lower(r.code);
    end if;

    -- Tag lists: keep only allowed values, fall back to 'any'.
    select coalesce(array_agg(distinct x), '{any}') into v_ls
      from unnest(string_to_array(regexp_replace(lower(coalesce(r.life_stage, '')), '[^a-z_,]', '', 'g'), ',')) x
     where x in ('any','student','homemaker','working_professional','senior_citizen');
    select coalesce(array_agg(distinct x), '{any}') into v_pl
      from unnest(string_to_array(regexp_replace(lower(coalesce(r.place, '')), '[^a-z_,]', '', 'g'), ',')) x
     where x in ('any','village','small_town','city','metro');

    begin
    insert into public.ideas as i (
      code, subcategory_code, category_code, position, slug, title, hook, summary,
      what_it_is, who_pays_you, how_money_comes, what_you_need, first_30_days,
      what_hurts, verdict, faq, validate_prompt, investment_band, gender_fit,
      life_stage, place, work_mode, time_needed, skill_level, status, writer
    ) values (
      r.code, left(r.code, 8), left(r.code, 4), right(r.code, 2)::int, v_slug,
      btrim(r.title), btrim(r.hook), btrim(r.summary), btrim(r.what_it_is),
      btrim(r.who_pays_you), btrim(r.how_money_comes), btrim(r.what_you_need),
      (select coalesce(jsonb_agg(btrim(s) order by n), '[]'::jsonb)
         from unnest(array[r.step1, r.step2, r.step3, r.step4, r.step5]) with ordinality t(s, n)
        where coalesce(btrim(s), '') <> ''),
      btrim(r.what_hurts), btrim(r.verdict),
      (select coalesce(jsonb_agg(jsonb_build_object('q', btrim(q), 'a', btrim(a)) order by n), '[]'::jsonb)
         from (values (1, r.faq1_q, r.faq1_a), (2, r.faq2_q, r.faq2_a), (3, r.faq3_q, r.faq3_a)) f(n, q, a)
        where coalesce(btrim(q), '') <> '' and coalesce(btrim(a), '') <> ''),
      btrim(r.validate_prompt),
      case when lower(btrim(r.investment_band)) in ('zero','under_25k','25k_1l','1l_5l','above_5l') then lower(btrim(r.investment_band)) else 'under_25k' end,
      case when lower(btrim(r.gender_fit)) in ('any','women','men') then lower(btrim(r.gender_fit)) else 'any' end,
      v_ls, v_pl,
      case when lower(btrim(r.work_mode)) in ('home','shop','online','field','mixed') then lower(btrim(r.work_mode)) else 'mixed' end,
      case when lower(btrim(r.time_needed)) in ('part_time','full_time','weekends') then lower(btrim(r.time_needed)) else 'part_time' end,
      case when lower(btrim(r.skill_level)) in ('none','basic','trained') then lower(btrim(r.skill_level)) else 'basic' end,
      'published', r.writer
    )
    on conflict (code) do update set
      slug = excluded.slug, title = excluded.title, hook = excluded.hook, summary = excluded.summary,
      what_it_is = excluded.what_it_is, who_pays_you = excluded.who_pays_you,
      how_money_comes = excluded.how_money_comes, what_you_need = excluded.what_you_need,
      first_30_days = excluded.first_30_days, what_hurts = excluded.what_hurts,
      verdict = excluded.verdict, faq = excluded.faq, validate_prompt = excluded.validate_prompt,
      investment_band = excluded.investment_band, gender_fit = excluded.gender_fit,
      life_stage = excluded.life_stage, place = excluded.place, work_mode = excluded.work_mode,
      time_needed = excluded.time_needed, skill_level = excluded.skill_level,
      writer = excluded.writer, updated_at = now();

    update public.ideas_inbox set status = 'moved', reason = null where id = r.id;
    n_moved := n_moved + 1;
    exception when others then
      update public.ideas_inbox set status = 'rejected', reason = left(sqlerrm, 200) where id = r.id;
      n_rej := n_rej + 1;
    end;
  end loop;

  return query select n_moved, n_rej, (select count(*)::int from public.ideas_inbox where status = 'new');
end;
$$;

revoke all on function public.promote_ideas_inbox() from public, anon, authenticated;
