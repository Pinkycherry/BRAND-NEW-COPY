# BusinessIdea.io: site framework handoff

Written in my (the founder's) voice for whoever edits next, human or AI.
Last updated: 28 Oct 2026, 09:50 IST.

---

## 1. What I am doing

I bought the page layouts of another site (the seller). The seller knows we
are building on them and gave me a 7-day window, starting 28 Oct 2026. The
job has two steps:

1. **Framework first.** Every purchased page becomes a real page in our code
   (React / TanStack Start) in this repo, with the seller's structure and
   layout: same sections, same order, same components, same header.
2. **Our content second.** Wherever we have our own content, it goes into
   that framework: ideas, categories, subcategories, guides, calculators. Where
   we have nothing yet, the seller's placeholder stays until I supply ours.

When we connect the real domain, we switch to our own colours, logo and
fonts. Until then the seller's purple is fine.

### My rules (do not break)

- **Commit and push straight to `main`.** No branches, no pull requests,
  nothing for me to merge. `main` deploys https://bbinewcopy.vercel.app
  automatically on Vercel.
- **Do not write content of your own.** Use our database content or keep the
  seller's placeholder. Never invent text, numbers or claims.
- **No currency amounts** (dollar, euro, pound, rupee) copied from the seller.
  Never convert a dollar figure to rupees. Skip it.
- **No US/UK-only items** in the header or footer.
- **Do not use the seller's brand name.** We are BusinessIdea.io.
- **Never invent a URL or slug.** Link only to routes that exist in
  `src/routes` (list in section 6) or to our category/subcategory/idea pages.
- **Header first, it is the skeleton.** Keep the seller's header layout; fill
  it with our content.
- **Footer:** our 100 main categories plus essential links. No subcategories
  (they will grow to thousands).
- **Log every escalated issue** in the log artifact (section 9) with time,
  status and, for pending items, priority P1/P2/P3 and the reason.
- **Give me live page links** after each push, not commit links.

---

## 2. Where everything is

| What | Link |
|---|---|
| Live staging site (Vercel, deploys from `main`) | https://bbinewcopy.vercel.app |
| This repo | https://github.com/Pinkycherry/BRAND-NEW-COPY |
| Seller files (zips I uploaded) | https://github.com/Pinkycherry/staging (branch `main`) |
| Seller zips unpacked and cleaned (scripts removed) | https://github.com/Pinkycherry/staging/tree/claude/awesome-gates-dtsc52/site |
| Backup of all seller files | https://drive.google.com/drive/folders/1lghsax9fHbmTivBMftZ6OtZ3dX69kfRz |
| Supabase project (ideas database) | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux |
| Supabase table editor | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux/editor |
| Vercel project | https://vercel.com/pinky12/bbinewcopy |
| Work log + pending list (Claude artifact) | https://claude.ai/artifact/RLTddg7r1u7RFnFi76rzVj |
| Writing Desk (idea generation CMS) | https://claude.ai/artifact/6PvGEi3oE6iuTm2GX3kmSD |

No secret keys are in this file or the repo. The site reads the database with
the public anon key from Vercel environment variables `IDEAVAULT_DB_URL` and
`IDEAVAULT_DB_ANON_KEY`.

---

## 3. Our data (Supabase, project `ubuavzcuwvvedojsrmux`)

| Table | What it holds |
|---|---|
| `categories` | 100 main categories: `code` (C001-C100), `name`, `short_name`, `slug` |
| `subcategories` | 1,000 subcategories (10 per category): `code` (C001-S01), `name`, `slug`, `intro`, `how_to_choose`, `faq` (JSON list of `{q, a}`) |
| `ideas` | Published ideas (about 4,200 now, target 10,000+): `slug`, `title`, `hook`, `summary`, `what_it_is`, `who_pays_you`, `how_money_comes`, `what_you_need`, `first_30_days`, `what_hurts`, `verdict`, `faq`, `validate_prompt`, `investment_band`, `gender_fit`, `life_stage`, `place`, `work_mode`, `time_needed`, `skill_level`, `status` |

All three tables are publicly readable (RLS select policies). Only rows with
`status = 'published'` are shown. At the time of writing 42 categories and
420 subcategories have ideas; the rest fill in as ideas are written.

Budget labels live in `BAND_LABEL` in
[src/lib/ideas.functions.ts](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/lib/ideas.functions.ts).
The 100 categories and 1,000 subcategories are also in
[src/data/taxonomy.ts](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/data/taxonomy.ts)
(checked identical to the database on 28 Oct 2026).

---

## 4. What is built (framework status)

### Header (shared, the skeleton)

- File: [src/components/v2/frame.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/components/v2/frame.tsx)
  (`Header`, `ValidatePanel`, `LearnPanel`, `ToolsPanel`, `Footer`, `V2Frame`)
- Styles: [src/components/v2/v2.css](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/components/v2/v2.css)
  (menu classes use the `mm-` prefix; footer uses `v2-footer`)
- Seller layout: bar with logo, Validate / Learn / Free Tools mega menus,
  Pricing, search, Login, Get Report. Each menu: big card on the left, then
  columns with banners, tiles and link lists. Content is ours, every item a
  real link.
- Used by: the v2 pages (`/lists`, `/lists/<slug>`), the 44 pages on
  [src/components/glass-shell.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/components/glass-shell.tsx),
  and pages on [src/components/site-shell.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/components/site-shell.tsx).
- **Class-name warning:** never use the `bm-` prefix for the menu again.
  [src/components/business-models.css](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/components/business-models.css)
  uses `bm-` for the Business Models page and its rules (e.g.
  `.glass-home .bm-hero > div { max-width:48ch }`) broke the menu on every
  glass-shell page. Fixed 28 Oct by renaming the menu classes to `mm-`.

### Footer (shared)

- `Footer` in frame.tsx: brand line, three quick links, our 100 main
  categories in columns, then About, Contact, Privacy, Terms, Cookies,
  Disclaimer, Site Map. Used on v2 pages, glass-shell pages and the raw pages.

### Lists hub: https://bbinewcopy.vercel.app/lists

- File: [src/routes/lists.index.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/lists.index.tsx)
- Converted from the seller's Lists page (sections `Section01`..`Section20`
  in order). The seller's six card sections and the complete index are
  replaced by our categories and subcategories with live counts
  (`OurCategories`, `OurIndex`). Hero counts and "Most ideas this month" are
  live. Every link goes to our pages.

### Subcategory list pages: https://bbinewcopy.vercel.app/lists/home-cooked-meal-subscription-business-ideas

- File: [src/routes/lists.$slug.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/lists.%24slug.tsx)
- One page per subcategory that has ideas: `/lists/<subcategory-slug>`.
  Seller's single-list layout (zip `sub category-pages-business-ideas`).
- Filled from our data: title, TL;DR, intro, comparison table, top 5 idea
  cards, more options, cite box, FAQ, related lists, conclusion.
  Card mapping: Best for = `who_pays_you`; price box = money to start
  (`investment_band`); Revenue = `how_money_comes`; Pros/Cons boxes =
  What you need / What hurts; Our Verdict = `verdict`.
- Seller placeholder sections (links point to our pages):
  [src/components/v2/list-page-static.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/components/v2/list-page-static.tsx).
- Data loader: [src/lib/lists.functions.ts](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/lib/lists.functions.ts)
  (`getListsHub`, `getListPage`).

### 10 seller pages still served as raw HTML (not converted yet)

These return the seller's cleaned HTML exactly, with our header menus and our
footer injected:

| Live page | Route file | HTML source |
|---|---|---|
| https://bbinewcopy.vercel.app/ | [src/routes/index.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/index.tsx) | [src/bought/home.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/home.html) |
| https://bbinewcopy.vercel.app/templates | [templates.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/templates.tsx) | [templates.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/templates.html) |
| https://bbinewcopy.vercel.app/topics | [topics.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/topics.tsx) | [topics.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/topics.html) |
| https://bbinewcopy.vercel.app/tools | [tools.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/tools.tsx) | [tools.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/tools.html) |
| https://bbinewcopy.vercel.app/faq | [faq.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/faq.tsx) | [faq.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/faq.html) |
| https://bbinewcopy.vercel.app/case-studies | [case-studies.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/case-studies.tsx) | [case-studies.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/case-studies.html) |
| https://bbinewcopy.vercel.app/frameworks-comparison | [frameworks-comparison.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/frameworks-comparison.tsx) | [frameworks-comparison.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/frameworks-comparison.html) |
| https://bbinewcopy.vercel.app/open-source | [open-source.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/open-source.tsx) | [open-source.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/open-source.html) |
| https://bbinewcopy.vercel.app/market-research | [market-research.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/market-research.tsx) | [research-1.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/research-1.html) |
| https://bbinewcopy.vercel.app/failed-startups/india | [failed-startups.india.tsx](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/routes/failed-startups.india.tsx) | [research-2.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/research-2.html) |

- Shared helper: [src/bought/serve.ts](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/serve.ts)
  injects [src/bought/menus.html](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/src/bought/menus.html)
  (menu script + styles) and replaces the seller footer with ours.
- Images and stylesheets for these pages: `public/bought/<page>/`.
- **After any change to the header or footer**, regenerate the raw pages'
  copy: `bun scripts/render-menu-panels.tsx > src/bought/menu-panels.json`
  ([script](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/scripts/render-menu-panels.tsx)).
  Otherwise those 10 pages show an old menu.

### How a raw page gets converted (what was done for /lists)

1. Take the seller's page HTML (`src/bought/<page>.html` or the staging repo).
2. Convert each top-level section to JSX: `class` to `className`, inline
   `style` strings to objects, self-closing tags, SVG attributes camelCased,
   links to `#` or our routes, images removed, currency items removed.
3. One component per section, same order, inside `V2Frame` (header + footer).
4. Replace the seller's data blocks with our database content; keep the
   remaining sections as placeholders.
5. Delete the raw route's `boughtPage(html)` handler.

---

## 5. Pending tasks (priority order)

| Priority | Task | Why pending |
|---|---|---|
| P1 | Check header layout and spacing on every page type (v2, glass-shell, site-shell, raw) at desktop and phone width | Claude cannot see the live site; layout must be checked visually |
| P1 | Convert the 10 raw pages above to real React pages, one by one | Framework step 1 |
| P1 | FAQ from the database (agreed plan): subcategory page = its FAQ + one question from each of its 10 ideas, collapsed, linking to the idea; category page = its FAQ + one per subcategory; Lists hub = short FAQ only | Not built yet |
| P2 | Lists hub: seller text still in Featured card, Tools & Resources and Strategy card descriptions/item counts, FAQ answers, key facts | Needs our wording |
| P2 | Subcategory pages: seller placeholder sections (author box, deeper answers, resource directory, before you build, intelligence report, related resources text, market watch news) | No matching content yet |
| P2 | Header tool tiles under Validate show blank image boxes | No illustrations yet |
| P3 | Our colours, logo and fonts | At domain launch |
| P3 | Seller pages not supplied as zips | Only uploaded pages can be copied; the seller's live site is blocked from Claude's sandbox |

---

## 6. Routes that exist (link only to these)

Our pages:
`/`, `/about`, `/blog`, `/blog/<slug>`, `/blueprints`, `/browse`,
`/business-demand-test-india`, `/business-idea-pivot-or-stop`,
`/business-idea-reading-room`, `/business-idea-research-india`,
`/business-idea-risk-check`, `/business-idea-time-fit`,
`/business-idea-toolkit`, `/business-ideas-india`, `/business-models-india`,
`/business-pricing-india`, `/calculator`, `/calculator/<slug>` (break-even,
startup-cost, roi, funding-needed), `/category/<category-slug>`,
`/category/<category-slug>/<subcategory-slug>`,
`/coaching-batch-business-idea-india`, `/contact`, `/cookie-policy`,
`/disclaimer`, `/first-customer-india`, `/founder-decision-journal`,
`/founder-glossary`, `/founder-stories`, `/founders`, `/gdpr`,
`/idea/<idea-slug>`, `/learning-resources`, `/lists`, `/lists/<subcategory-slug>`,
`/local-business-ideas-india`, `/online-business-ideas-india`, `/pricing`,
`/privacy`, `/product`, `/product-business-ideas-india`, `/refund-policy`,
`/search`, `/service-business-ideas-india`, `/services`,
`/side-business-ideas-india`, `/sign-in`, `/sitemap`, `/startup-cash-flow-india`,
`/startup-costs-india`, `/startup-guides`, `/startup-guides/<slug>`,
`/startup-idea-comparison`, `/startup-idea-validation`,
`/startup-launch-plan-india`, `/startup-terms-india`, `/terms`,
`/unit-economics-india`, `/useful-tools`, `/weekend-market-stall-profit-check`.

Seller pages (raw for now): `/templates`, `/topics`, `/tools`, `/faq`,
`/case-studies`, `/frameworks-comparison`, `/open-source`,
`/market-research`, `/failed-startups/india`.

Full list: https://github.com/Pinkycherry/BRAND-NEW-COPY/tree/main/src/routes

---

## 7. How to work in this repo

- Package manager: **bun only** (`bun install`, `bun run build`). Never npm.
- Build check before every push: `bun run build` must pass.
- Type check: `bunx tsc --noEmit -p .` (some old warnings exist in
  `site-shell.tsx`; do not add new ones).
- Stack: TanStack Start + React 19 + Tailwind CSS v4, deployed on Vercel.
  Route files in `src/routes`; `src/routeTree.gen.ts` is generated by the
  build.
- Every page is `noindex` until launch (do not remove).
- Project instructions: [CLAUDE.md](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/CLAUDE.md).

---

## 8. History of mistakes so you do not repeat them

1. Seller pages were first parked under `/layouts/...` with invented folder
   names. Wrong: pages must live at the seller's own addresses.
2. Raw HTML hosting is not the framework. Pages must be converted to code.
3. A self-designed header with invented content ("Food" under "Food") was
   rejected. Keep the seller's layout; put our content into it.
4. Seller text left in the header was rejected. Fill it with our content.
5. The menu class prefix `bm-` clashed with `business-models.css` and broke
   the menu on 44 pages. Use `mm-`.
6. After header edits, the 10 raw pages kept an old menu until the panels
   were regenerated (see section 4).
7. Never claim something is fixed without checking the live page that the
   founder is looking at.

---

## 9. Log

Timestamped work log and the live pending list:
https://claude.ai/artifact/RLTddg7r1u7RFnFi76rzVj
