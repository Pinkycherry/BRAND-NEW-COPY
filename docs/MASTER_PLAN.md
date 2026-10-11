# BusinessIdea.io Master Plan

The user manual for everyone who works on BusinessIdea.io. If a chat, a memory or an older document disagrees with this file, this file wins. Only the founder changes it.

- Version: 1.0, written 10 October 2026
- Code freeze: 25 October 2026
- Go live: 26 October 2026
- Repository: `pinkycherry/brand-new-copy`, branch `main`
- Staging: Vercel project `bbinewcopy` (https://bbinewcopy.vercel.app), free plan
- Live host from 26 October: Cloudflare (free)
- Final domain: businessidea.io

---

## Part 1. Why we are building this

### 1.1 The one-line answer

BusinessIdea.io is the place an ordinary Indian goes to find a business they can actually start, explained in a warm, honest voice, organised so they can find their door in two clicks.

### 1.2 Who it is for

- People in India starting from zero: little money, no team, often only a phone.
- Homemakers, students, retired people, people in villages and small towns, salaried people looking for a second income.
- They do not want a lecture. They want someone who talks to them like an elder brother or sister would: polite, direct, encouraging, honest about what will hurt.

### 1.3 What we learned from bbusiness.online

The old site (bbusiness.online) stays live and untouched. We copy nothing from its database. What it taught us:

1. Researching and citing every single idea is a failure process. It took one and a half months to reach 679 ideas.
2. Indexing idea pages created layout and indexing problems we kept fixing for weeks.
3. Multi-stage review pipelines with many agents burned time and tokens and still let template phrases through.
4. Real-time numbers go stale. The Validate button solves this better than any number we could print.

So the new site is built the other way round: structure first, one research pass per subcategory, ideas written in one confident pass, live numbers handed to the Validate button.

### 1.4 What the site is

| Level | Count | Indexed by search engines |
|---|---|---|
| Main categories | 100 | Yes |
| Subcategories | 1,000 (10 per category) | Yes |
| Ideas | 10,000 (10 per subcategory) at launch, more later | **No, never** |
| Articles / blog | Separate setup, separate task | Yes |
| Main pages (home, browse, about, founder, pricing, legal) | About 15 | Yes |

The category and subcategory list is fixed. It comes from the approved architecture sheet and lives in `src/data/taxonomy.ts` and `src/data/taxonomy-details.json`. Nobody invents, renames or re-slugs a category or subcategory.

---

## Part 2. The oath (rules nobody breaks)

### 2.1 We are the source

1. We never use the word "source" for an idea, anywhere: not in the database, not on the page, not in a prompt.
2. No idea and no category ever credits, cites or links to another website, person, Reddit thread, article or company as its origin.
3. Ideas are researched and written by BusinessIdea.io, guided by the founder. That is the only credit. (See decision D3 for the exact public wording.)
4. We do not scrape, copy or rewrite any other idea site. The ideas come from the subcategory research plus the writer's own knowledge.

### 2.2 India only

1. Every amount on the site is in Indian rupees, written with the ₹ sign and Indian grouping: ₹1,00,000 not ₹100,000. Never dollars, never another currency.
2. Every idea is designed for India: Indian customers, Indian places, Indian habits, Indian festivals, Indian payment habits (UPI, cash, credit to known customers).
3. External links go only to Indian websites. No foreign link anywhere on the site.

### 2.3 Numbers

1. Ideas do not print market sizes, statistics, growth rates or "X people earn Y" claims.
2. An idea may show an **investment band** (see 6.4) and plain-language ranges where common sense supports them ("a few thousand rupees for the first stock"). It never shows a precise figure presented as fact.
3. For live, local, exact numbers the reader taps **Validate**. That is the promise: we give the honest idea, Validate gives today's numbers.

### 2.4 Voice

1. The narrator talks to the reader as "you". The reader is the one who will start, charge, sell, hire.
2. The narrator may say "I" only to give an opinion, a caution or encouragement ("I like this one for homemakers because..."). Never "I charge", "my customers", "I will deliver". We are not pretending to run the business.
3. Warm, polite, emotional, direct, like the founder talks to a person sitting in front of him. Short sentences. Indian English that a first-time reader understands. Hindi or regional words are fine where Indians actually use them (dabba, kirana, mandi, tiffin).
4. Honest about pain. Every idea says what will hurt in year one and gives a straight verdict, including "walk away from this one if...".
5. No template sentences repeated across ideas. If two ideas share an opening line, one of them is rewritten.

### 2.5 Speed over ceremony

1. There is no draft, checked, approved, published chain.
2. A writer who is confident in an idea publishes it. A writer who is not confident marks it `flagged` with one line saying why. Flagged ideas go to the founder, who decides.
3. The founder audits after the fact (Part 9). Audits never block writing.

### 2.6 Names

Platforms are never named in our work files or public copy. Everyone works under a name (Part 5). Public copy never names an AI vendor, except the destinations inside the Validate picker.

### 2.7 Rules carried over from the old site

1. **Free tiers only.** No paid plan on any platform and no paid API until revenue starts. One free Supabase account now, a second free account when the first nears 500 MB.
2. **No paid AI API inside the site.** The Validate button opens the reader's own assistant; the site never calls a paid model.
3. **Never invent** a category slug, a subcategory, an idea title for another writer's range, or a statistic.
4. **Never change database rows by hand without the founder's go-ahead.** Ideas reach the database only through the import script.
5. **Commit and push after every finished piece of work**, with a message that says what changed and why. Nothing stays only on one machine.
6. **Packages: bun only.** `bun.lock` is the only lockfile.
7. **Never commit a key or password.** If someone pastes one in chat, do not store it anywhere.
8. **Report work with full URLs**, never bare commit numbers.
9. **The custom cursor stays removed.**
10. **Plain, matter-of-fact replies** to the founder: do the task, say what was done in a line or two.

---

## Part 3. Facts we checked (10 October 2026)

These were verified on the official pages on 10 October 2026. Re-check before spending money.

| Topic | Fact | What it means for us |
|---|---|---|
| Vercel Hobby (free) | Non-commercial use only. | Vercel is **staging only**. The live site runs on Cloudflare (free), where the code already builds; switching takes minutes, as on the old site. |
| Supabase Free | 2 projects, 500 MB database, 5 GB egress, 50,000 auth users a month. **Paused after 1 week of inactivity. No backups.** | One free account for now. 10,000 ideas at about 8 KB each is about 80 MB, which fits. When usage nears 500 MB we open another free account. Paid plans only after revenue starts. Nightly backup to GitHub (7.4). |
| Domain | businessidea.io points to the live Cloudflare site at launch. | DNS values are taken from the Cloudflare dashboard, never from memory. |
| Search engines and AI text | Google does not penalise content for being AI-written. It penalises pages made mainly to rank without helping the reader. | Every subcategory page must genuinely help a reader choose. That is our only SEO rule for content. |

---

## Part 4. Roadmap (10 to 26 October)

| Phase | Dates | What gets done | Owner |
|---|---|---|---|
| 0. Foundation | 10 to 11 Oct | This master plan. Names given to every worker. New Supabase project created by the founder. | Founder |
| 1. Core build | 11 to 16 Oct | Database tables and import pipeline. Idea page template. Subcategory page with idea cards and compare table. Validate button. Pricing ₹199 / ₹399, sign-in, paywall. External links block. Validator script. | Founder |
| 1b. Look and feel | 12 to 18 Oct | Brand: name, logo, colours, mobile layout fixes, interactivity. | Design agent (founder approves) |
| 2. Subcategory research | 13 to 15 Oct | One research note per subcategory (1,000 notes). This is the only research we do. | Writers, by category range |
| 3. Idea writing | 14 to 22 Oct | 10,000 ideas, 10 per subcategory, as JSON files through GitHub. | Writers |
| 4. Audit | 18 to 24 Oct | Every category sampled, fixed or sent back. Flagged ideas decided. | Founder |
| 5. Launch prep | 23 to 25 Oct | Switch live hosting to Cloudflare (free). Domain businessidea.io. Search Console, sitemaps. Code freeze 25 Oct night. | Founder |
| 6. Live | 26 Oct | Switch on. Watch errors, payments and indexing. | Everyone |

Daily rhythm: each writer commits after every subcategory and opens one pull request per finished category. Progress is simply the files in `content/`.

---

## Part 5. Team and work distribution

### 5.1 The team

| Name | Role |
|---|---|
| Krishna (the founder) | Owner and final word: structure, database, imports, audits, flagged ideas, domain and accounts |
| Agent 1, Agent 2, ... | Writers. Each gets its own assignment file in `docs/agents/AGENT_N.md` |

Writers are named Agent 1, Agent 2 and so on. Platforms are never named.

### 5.2 Writing in batches

| Batch | Categories | Ideas | Writers |
|---|---|---|---|
| 1 | C001 to C010 | 1,000 | Agent 1: C001 (S02 to S10) to C008. Agent 2: C009 and C010 |
| 2 | C011 to C030 | 2,000 | Assigned after batch 1 audit |
| 3 | C031 to C060 | 3,000 | Assigned after batch 2 audit |
| 4 | C061 to C100 | 4,000 | Assigned after batch 3 audit |

Each batch is audited once, at its end, then imported. If a writer runs out of capacity, the founder moves whole categories, never half a subcategory.

### 5.3 Ownership rule

One category belongs to one writer at a time. Nobody writes into another writer's category. This is how we avoid duplicate ideas and overwritten files.

---

## Part 6. The idea format

### 6.1 Idea address

Every idea has a fixed address: `C016-S03-I07` means category 16, subcategory 3 (in sheet order), idea 7. Ten ideas per subcategory means I01 to I10. Later expansions continue at I11.

### 6.2 The fields

| Field | What | Length |
|---|---|---|
| `code` | `C016-S03-I07` | fixed |
| `slug` | Lowercase, hyphenated, unique across the site, from the title | 3 to 8 words |
| `title` | The business, plainly named. Ends without "Business Idea". | 3 to 9 words |
| `hook` | One sentence a person would say to a friend: why this one | 12 to 25 words |
| `summary` | Card text on the subcategory page | 35 to 60 words |
| `what_it_is` | What you actually do day to day | 70 to 140 words |
| `who_pays_you` | Who the buyers are, specifically, in India | 45 to 120 words |
| `how_money_comes` | How money changes hands, repeat business, pricing approach in words | 50 to 120 words |
| `what_you_need` | Skills, space, tools, licences in plain words | 40 to 100 words |
| `first_30_days` | 4 to 6 concrete steps | list |
| `what_hurts` | Honest year-one pain | 50 to 120 words |
| `verdict` | Build it if... / Walk away if... | 30 to 80 words |
| `faq` | 3 questions a real reader would ask, with answers | 3 items |
| `validate_prompt` | The question the Validate button sends, specific to this idea | 1 to 3 sentences |
| tags | See 6.3 | fixed values |
| `investment_band` | See 6.4 | fixed value |
| `confidence` | `confident` or `flagged` | fixed |
| `flag_reason` | One line, only when flagged | short |
| `writer` | Writer name, e.g. `Agent 1` | fixed |

Total visible text per idea: about 500 to 800 words. Every idea is different. No two ideas in the same subcategory may describe the same business with different words.

### 6.3 Tags (fixed values only)

These power filters now and audience bundles later ("business ideas for women", "low investment ideas for students").

| Tag | Allowed values |
|---|---|
| `gender_fit` | any, women, men |
| `life_stage` | any, student, homemaker, working_professional, senior_citizen |
| `place` | any, village, small_town, city, metro |
| `work_mode` | home, shop, online, field, mixed |
| `time_needed` | part_time, full_time, weekends |
| `skill_level` | none, basic, trained |

`gender_fit` is `any` unless the idea genuinely fits one group better. More than one value is allowed for `life_stage` and `place`.

### 6.4 Investment bands

| Band | Label shown |
|---|---|
| `zero` | Start with almost nothing |
| `under_25k` | Under ₹25,000 |
| `25k_1l` | ₹25,000 to ₹1,00,000 |
| `1l_5l` | ₹1,00,000 to ₹5,00,000 |
| `above_5l` | Above ₹5,00,000 |

The band is the writer's honest judgement. The exact amount comes from Validate.

### 6.5 Subcategory research note

Before writing a subcategory's ten ideas, the writer writes one research note for that subcategory (this is the only research we do):

- `intro`: 200 to 350 words shown at the top of the subcategory page. Who this subcategory suits, how these businesses work in India, what to watch.
- `how_to_choose`: 80 to 150 words: how a reader picks between the ten ideas.
- `faq`: 4 questions and answers about the subcategory as a whole.
- `idea_plan`: the 10 planned idea titles, checked for overlap before writing starts.

---

## Part 7. Database and pipeline

### 7.1 Why ideas travel through GitHub

Writers never get database keys. They write JSON files into the repository. An import script, run by the founder, checks every file and loads it into Supabase. This keeps four platforms away from the database, gives us a full history and a free backup.

```
writer → content/C016/S03.json → validator (automatic) → import (founder) → Supabase → site
```

### 7.2 Folder layout

```
content/
  C016/S03.json                   one subcategory: research note + its 10 ideas
docs/
  MASTER_PLAN.md                  this file
  WRITER_GUIDE.md                 format, lengths, voice and rules for writers
  DATABASE.md                     database setup and where values live
  agents/AGENT_N.md               each writer's assignment
scripts/
  validate-content.mjs            the checker (also runs automatically on GitHub)
  import-content.mjs              loads checked files into Supabase
supabase/
  001_schema.sql, 002_seed_taxonomy.sql
```

The finished example every writer copies is `content/C001/S01.json`.

### 7.3 Tables (new Supabase project, built from zero)

| Table | Purpose |
|---|---|
| `categories` | 100 rows from the taxonomy: code, name, slug, position |
| `subcategories` | 1,000 rows: code, category code, name, slug, position, intro, how_to_choose, faq (json), audience, keywords, search intent |
| `ideas` | One row per idea, every field in 6.2, tags, band, confidence, writer, created_at, updated_at |
| `external_links` | Name, url, domain, group, rel (nofollow by default), show_logo, active |
| `profiles` | One row per signed-in user |
| `plans` | The two paid plans: code, name, price in paise, what it unlocks |
| `purchases` | User, plan, payment order id, amount in paise, status, created_at |
| `saved_ideas` | User, idea code (a reader's shortlist) |

Rules:
- Row level security on every table. The public reads categories, subcategories, published ideas and active links. Writes only through the import script (service key, kept by the founder only) and the payment webhook.
- Money is stored in paise as whole numbers. ₹199 is `19900`.
- `ideas.code` and `ideas.slug` are unique. An idea must point at an existing subcategory.
- `updated_at` changes only when content really changes.

### 7.4 Backups

The free plan has no backups. A scheduled GitHub Action exports the `ideas`, `subcategories` and `external_links` tables to the repository every night. The JSON files in `content/` are also a backup on their own.

---

## Part 8. The website

### 8.1 Pages

| Page | URL | Indexed | Notes |
|---|---|---|---|
| Home | `/` | Yes | Rewritten for paid plans (8.4) |
| Browse | `/browse` | Yes | All 100 categories, all 1,000 subcategories |
| Category | `/category/{category}` | Yes | 10 subcategory cards |
| Subcategory | `/category/{category}/{subcategory}` | Yes | The money page (8.2) |
| Idea | `/idea/{slug}` | **No** (`noindex, follow`, not in sitemap, not blocked in robots.txt) | Full idea, paywalled parts, Validate |
| Pricing | `/pricing` | Yes | ₹199 and ₹399 |
| Checkout result | `/checkout/success`, `/checkout/failed` | No | |
| Account | `/account` | No | Plan, saved ideas |
| Sign in | `/sign-in` | No | |
| Search | `/search` | No | |
| About | `/about` | Yes | |
| Founder / author | `/founder` | Yes | Who stands behind the site. Same as today, wording changed from free to paid |
| Others building in India | `/building-in-india` | Yes | The external links block (Part 10) |
| Contact | `/contact` | Yes | |
| Terms, Privacy, Refund, Disclaimer, Cookies | `/terms` etc. | Yes | Refund page needed once payments start |
| Blog / articles | `/blog` | Yes | Separate task |
| Glossary, calculators, guides | as today | Yes for now | Kept for launch. Founder may remove later |
| HTML sitemap | `/sitemap` | Yes | |

### 8.2 The subcategory page (where we win or lose)

Top to bottom:
1. Breadcrumb and title.
2. Research note intro (6.5).
3. Quick filters: investment band, time needed, place.
4. The 10 idea cards: title, hook, summary, band, tags, a "Read the full idea" link.
5. Compare table: the 10 ideas side by side (band, time, skill, work mode, best for).
6. How to choose (6.5).
7. FAQ (4 questions), with FAQ structured data.
8. Validate prompt for the subcategory as a whole.
9. Sibling subcategories and the parent category.

A subcategory page stays `noindex` and out of the sitemap until it has its 10 published ideas. It switches itself on automatically.

### 8.3 The idea page

- Free part: title, hook, summary, what it is, who pays you, band and tags.
- Paid part: how the money comes, what you need, first 30 days, what hurts, verdict, FAQ (see decision D1).
- Validate button always visible and free.
- Save idea, share on WhatsApp.
- Next and previous idea in the same subcategory.

### 8.4 Homepage changes

Keep all sections and animations. Change the words:
- Every "free forever", "pay nothing, ever", "₹0 for life" line is replaced with the paid story: what ₹199 and ₹399 unlock, and that Validate stays free.
- The counters show 100 categories, 1,000 subcategories, 10,000 ideas (live numbers from the database).
- Featured blocks show subcategories, not idea pages.

### 8.5 Pricing

| Plan | Price | Proposed contents (decision D1) |
|---|---|---|
| Starter | ₹199 | Full idea pages for one category of your choice, saved list, lifetime |
| Full library | ₹399 | Full idea pages for all 100 categories and every idea added later, lifetime |

Validate stays free on both. Shown only in rupees.

### 8.6 Components and hooks to build

Components:
- `IdeaCard`, `IdeaCompareTable`, `IdeaFilters`, `InvestmentBandPill`, `AudienceChips`
- `SubcategoryIntro`, `SubcategoryFaq`, `HowToChoose`
- `ValidateButton` (reuse from the old site's design, rewired to the idea's `validate_prompt`)
- `PaywallGate` (shows the locked part with a clear upgrade card)
- `PlanCard`, `CheckoutButton`
- `SaveIdeaButton`, `ShareWhatsApp`
- `ExternalLinksBlock` (Part 10)
- `IdeaPager` (previous / next in subcategory)

Hooks:
- `useEntitlement(categoryCode)`: can this reader see the paid part
- `usePlan()`: current plan of the signed-in reader
- `useSavedIdeas()`
- `useIdeaFilters()`: filter state kept in the URL hash, not in the query string, so filter combinations never become crawlable pages

Server functions:
- `getSubcategoryPage(category, subcategory)`, `getIdea(slug)`, `getCatalogCounts()`
- `createOrder(plan)` and `confirmPayment`, wired to a payment provider chosen later

### 8.7 Search engine settings

- Index: home, browse, 100 categories, 1,000 subcategories (once filled), main pages, articles.
- Never index: idea pages, search, account, checkout, sign-in, filter states.
- Idea pages: `noindex, follow`. Not in any sitemap. Not blocked in robots.txt (a blocked page cannot show its noindex).
- Sitemaps list only indexable pages, with real `lastmod` dates.
- Category and subcategory pages are cached at the edge, so crawling stays cheap.

---

## Part 9. Quality without ceremony

### 9.1 The validator (automatic, runs on every push)

A file fails and is not imported if:
- a required field is missing or outside its length range
- a tag or band has a value not in the lists in 6.3 and 6.4
- a slug or code is duplicated anywhere on the site
- the text contains `$`, `USD`, "source", a URL, or a foreign domain
- the text contains operator first person ("I charge", "my customers", "we deliver")
- the same sentence appears in another idea
- two titles in the same subcategory are too similar

### 9.2 Founder audit (after the fact)

- At least one full subcategory from every category is read.
- Problems are fixed directly when small, or sent back to the writer with the exact file and line.
- Repeated problems from one writer mean that writer's whole range is re-checked.

### 9.3 Flagged ideas

Writers flag what they are unsure about. The founder sees a list on `/account` (admin only) or in `docs/agents/FLAGGED.md`, and decides: publish, rewrite or drop.

---

## Part 10. External links block

### 10.1 What it is

One dedicated page, `/building-in-india`, plus a small version of the same block at the bottom of category pages. It lists well-known Indian websites in business, finance, government services and entrepreneurship.

### 10.2 How it is worded

Heading idea: **"Others building in India"** with a line like "People and platforms also working to help Indians build." Never "our sources", "inspired by", "references", "credits" or "we found ideas here".

### 10.3 Rules

1. Indian sites only (`.in`, `.gov.in`, `.co.in`, or clearly Indian companies).
2. `rel="nofollow noopener"` by default. The founder marks individual links as follow.
3. Links are grouped: Government services, Banking and finance, Business news, Learning, Marketplaces.
4. Logos: shown through the browser favicon of the site (auto-updates when they change it). Government sites show the name only, no emblem.
5. Never next to an idea. Never inside idea text.
6. Up to about 1,000 links, stored in `content/external-links/links.json` and the `external_links` table. A monthly check removes dead links.

---

## Part 11. Writer brief (the full version is docs/WRITER_GUIDE.md and docs/agents/AGENT_N.md)

> You are **{NAME}**, a writer for BusinessIdea.io. Read `docs/MASTER_PLAN.md` first. Your categories: **{RANGE}**.
>
> For each subcategory in your range, in order:
> 1. Read its row in `src/data/taxonomy.ts` and `src/data/taxonomy-details.json` (audience, keywords, search intent).
> 2. Plan 10 different idea titles first and check none overlap.
> 3. Write the research note and the 10 ideas to `content/{C}/{S}.json` (one file), using exactly the fields in Part 6.2, tags in 6.3, band in 6.4.
> 4. Run `node scripts/validate-content.mjs content/{C}/{S}.json`. Fix every error.
> 5. Commit with message `{NAME}: {C}-{S} 10 ideas`. Push.
>
> Voice: you are talking to one Indian person who wants to start something. Say "you". Be warm, polite and honest. Say what will hurt. Give a straight verdict. Never write as if you run the business. Never cite, credit or link anything. Never write a statistic. Money only in ₹ with Indian grouping.
>
> Confidence: if you are sure the idea is good, real and useful in India, set `confidence: "confident"`. If not, set `"flagged"` and write one line in `flag_reason`. Do not hold back a whole subcategory for one doubtful idea.
>
> Never touch: site code, other writers' categories, the taxonomy files.

### 11.1 Example idea (tone reference, not to be copied)

```json
{
  "code": "C016-S01-I01",
  "slug": "office-dabba-route",
  "title": "Office Dabba Route for One Business Park",
  "hook": "If you cook well and live near an office area, ten people eating your food every day is a real business, not a dream.",
  "summary": "You cook simple home-style lunches and deliver them on a fixed route to people working in one office area. Same people, same time, every working day. It starts small and grows only as fast as your kitchen can keep quality.",
  "what_it_is": "Every morning you cook one fixed menu, pack it in steel or sealed boxes and deliver it before lunch to a fixed set of people in one business park or office street...",
  "verdict": "Build this if you enjoy cooking for others every single day and can keep your timing even when you are tired. Walk away if you cannot stand repeating the same routine, because this business is the routine.",
  "investment_band": "under_25k",
  "gender_fit": "any",
  "life_stage": ["homemaker", "working_professional"],
  "place": ["city", "metro"],
  "work_mode": "home",
  "time_needed": "part_time",
  "skill_level": "basic",
  "confidence": "confident",
  "writer": "Agent 1"
}
```

---

## Part 12. Brand and design changes

The design agent works on design only, with the founder approving each change before it reaches `main`.

| Area | Change |
|---|---|
| Name | BusinessIdea.io everywhere. Remove "BBI", "Bro Business Ideas" and "B Business" from the new site. |
| Logo | New wordmark and icon for BusinessIdea.io. Favicon set (48, 192, 512, Apple touch). Founder approves. |
| Colours | New brand palette proposed by the design agent, approved by founder. Applied through the base colour tokens in `src/styles.css`. |
| Typography | Keep Poppins unless the founder chooses otherwise. |
| Mobile | Fix every layout issue at 360 to 430 px width. No sideways scrolling. Tap targets at least 44 px. |
| Interactivity | Idea filters, compare table, save and share, smooth navigation between subcategories. |
| Share images | New default social share image with the new brand. |

Technical notes for whoever edits styles:
1. The compiled stylesheet declares colour tokens in several separate `:root` blocks, then again under `html.light`. An override must be unlayered, at least as specific, and printed after them.
2. `--color-primary` is an alias of `--primary`. Change the base variable, not the alias.
3. Unlayered rules beat every `@layer`, including Tailwind utilities.
4. Tailwind only builds class names it finds written in full in the source. Never build a class name from a variable.

---

## Part 13. Launch checklist (25 and 26 October)

- [ ] All 1,000 subcategories have a research note and 10 ideas; flagged list cleared by founder
- [ ] Validator passes on every file; import complete; counts match (100 / 1,000 / 10,000)
- [ ] Live hosting switched to Cloudflare (free); businessidea.io and www connected, HTTPS active
- [ ] Site address setting switched to https://businessidea.io (canonicals and sitemaps)
- [ ] Terms, Privacy, Refund, Contact live
- [ ] Supabase environment variables set on the live host (build and runtime)
- [ ] Nightly backup action ran once successfully
- [ ] Search Console: domain verified, `sitemap-index.xml` submitted
- [ ] Spot check on a phone: home, browse, 3 categories, 3 subcategories, 3 ideas, pricing, checkout
- [ ] Idea pages show `noindex`; idea URLs absent from every sitemap

---

## Part 14. Decisions waiting for the founder

| # | Question | Proposal |
|---|---|---|
| D1 | What exactly does ₹199 unlock and what does ₹399 unlock? One-time or yearly? | ₹199: one category, lifetime. ₹399: everything, lifetime. Validate free for all. |
| D2 | Final brand colours and logo | Design agent proposes three directions by 14 Oct |
| D3 | Public credit line | "Researched and written by BusinessIdea.io" on every page. The old house rule was never to name an AI vendor in public copy, so we suggest not printing the name of the AI tool. |
| D4 | Which external links are follow instead of nofollow | All nofollow at launch; founder picks follow links later |
| D7 | Keep or remove glossary, calculators and guides | Keep for launch, review in November |
| D8 | Writer names | Agent 1, Agent 2, ... as in 5.1 |
