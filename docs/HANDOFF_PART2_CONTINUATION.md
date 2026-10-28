# BusinessIdea.io: Part 2 — continuation brief for the editor (Codex)

From the founder. Project manager review written 28 Oct 2026.
Part 1 brief: [docs/HANDOFF_SITE_FRAMEWORK.md](https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/docs/HANDOFF_SITE_FRAMEWORK.md). Read it first; every rule there still applies.

---

## 0. Before you touch anything: report your status

Reply with this, filled in, and nothing else. Do not start Part 2 until I answer.

```
STATUS REPORT
1. Last commit on main you made (hash + one line):
2. Done since Part 1 (bullet list, each with the live URL you checked):
3. Started but not finished (what, which files, what is left):
4. Pending from the Part 1 list (section 5) that you did not touch:
5. Anything you changed that Part 1 did not ask for:
6. Anything broken or unsure right now (page + what you saw):
7. Files you need from me (zips, content, access):
```

---

## 1. Setup, every session

1. Clone or pull **all** of https://github.com/Pinkycherry/BRAND-NEW-COPY, branch `main`. Work from the full repo, not single files.
2. Also pull https://github.com/Pinkycherry/staging (branch `main`). It holds the seller's page zips. The unpacked, script-free copies are on its branch `claude/awesome-gates-dtsc52`, folder `site/`.
3. Read, in order: `AGENTS.md`, `CLAUDE.md`, `docs/HANDOFF_SITE_FRAMEWORK.md`, this file.
4. `bun install`, then `bun run build` must pass before every push.
5. Commit and push **straight to `main`**. No branches, no pull requests. `main` deploys https://bbinewcopy.vercel.app.
6. After each push, open the live page you changed and check it yourself. Then give me the live link.

---

## 2. Review of Part 1 (what I checked on the live site, 28 Oct)

| Item | Status | Evidence |
|---|---|---|
| Shared header (Validate / Learn / Free Tools) on every page type | **Done by Codex** (commits `2239f14`, `07fec1c`). One rendered header for React and raw pages, scoped CSS, tool icons, mobile disclosure, keyboard fix, `scripts/header.test.tsx` | Header markup present on `/`, `/tools`, `/calculator` |
| Footer with our 100 categories on every page type | Done | `v2-footer` present on all checked pages |
| `/lists` hub on our data | Done | https://bbinewcopy.vercel.app/lists |
| `/lists/<subcategory-slug>` pages (420 live, grows automatically) | Done | https://bbinewcopy.vercel.app/lists/home-cooked-meal-subscription-business-ideas |
| Home `/` | **Not done.** Still the seller's raw HTML: seller brand name appears 22 times, dollar amounts 22 times, seller figures ("1,798") | https://bbinewcopy.vercel.app/ |
| `/tools` | **Not done.** Raw seller HTML: seller brand name 36 times, dollar amounts present | https://bbinewcopy.vercel.app/tools |
| `/templates`, `/topics`, `/faq`, `/case-studies`, `/frameworks-comparison`, `/open-source`, `/market-research`, `/failed-startups/india` | **Not done.** Raw seller HTML | links in Part 1, section 4 |
| Our own core pages (`/calculator`, `/browse`, `/category/...`, `/idea/...`, `/blog`, `/startup-guides`, `/founder-glossary`, and the India guide pages) | **Not done.** Still our old design. They have the new header and footer, but the body is not on the seller's framework, so they look dull next to `/lists` | e.g. https://bbinewcopy.vercel.app/calculator |
| FAQ from the database | Not started | |

---

## 3. The goal of Part 2

**Every page on the site uses the seller's page framework, filled with our content.** Nothing raw, nothing in the old design, no seller brand, no seller figures, no currency amounts.

For each page: take the matching seller layout, rebuild it as React sections (like `src/routes/lists.$slug.tsx`), put our database content in, and keep the seller's placeholder only where we have nothing yet. Placeholders get logged as pending.

### The seller's site, mapped to ours

The seller's `llms-full.txt` (`llms-full_txt.html` in the staging repo) lists about 4,760 pages. Their page families and what each becomes on our site:

| Seller page family (count) | Our page | Our data | Seller layout file we have? | Priority |
|---|---|---|---|---|
| Home `/` | `/` | counts, 100 categories, top lists, latest ideas | **Yes**: `structure.zip` → `src/bought/home.html` | **P1** |
| Single idea `/startup-idea/<slug>` (1,798) | `/idea/<slug>` (4,200+, target 10,000) | `ideas` table, every field | **No** | **P1** |
| Category `/business-ideas/<slug>` (51) | `/category/<slug>` (100) | `categories` + its 10 subcategories + counts | **No** (the list-page layout can stand in until I send it) | **P1** |
| Category pillar `/business-ideas` | `/browse` | all 100 categories | **No** | **P1** |
| Lists hub + list pages (131) | `/lists`, `/lists/<slug>` | done | Yes | Done |
| Tools hub `/tools` | `/tools` | our calculators, worksheets, useful tools | **Yes**: `tools.zip` → `src/bought/tools.html` | **P1** |
| Calculators `/calculators/<slug>` (11) | `/calculator`, `/calculator/<slug>` | 4 working calculators + generated ones in `src/lib/generated-calculators.ts` | **No** | **P1** |
| Templates `/templates` | `/templates` | our worksheets (launch plan, demand test, decision journal, comparison) | **Yes**: `templates.zip` | **P2** |
| Topics hub `/topics` | `/topics` | our guides grouped by founder stage | **Yes**: `topics templates.zip` | **P2** |
| FAQ `/faq` | `/faq` | site FAQ + subcategory FAQs | **Yes**: `FAQ.zip` | **P2** |
| Questions `/questions/<slug>` (129) | `/questions/<slug>` (new) | idea and subcategory `faq` Q&A, thousands of entries | **No** | **P2** |
| Guides `/guides/<slug>` (44) | `/startup-guides/<slug>` | `src/lib/guides-data.ts` | **No** | **P2** |
| Case studies `/case-studies` | `/case-studies` | `/founder-stories` content | **Yes**: `case-studies.zip` | **P2** |
| Glossary `/glossary` | `/founder-glossary` | `src/lib/glossary-data.ts` | **No** | **P2** |
| Blog `/blog` | `/blog` | our blog posts | **No** | **P2** |
| Feature matrix | new page, path to agree | none yet | **Yes**: `feature-matrix.zip` (new, not built) | **P3** |
| Market research, open source, failed startups India, frameworks comparison | same paths | none yet | Yes | **P3** (convert to code, seller placeholders, no brand, no currency) |
| Failure database (1,092), open-source ledger (856), SaaS pricing (236), launch directories (211), versus pages (71), validate-idea (21), seller product pages (pricing, features, logo generator, ad creatives and so on) | not planned | we have no content | No | **Skip** for now |

---

## 4. Work order for Part 2 (do in this order, push after each)

### Step 1 — Home `/` (P1)
Convert `src/bought/home.html` to React sections like `/lists`. Our content: hero with live idea and category counts, our 100 categories, top lists, latest ideas, our guides and tools. Remove every seller brand mention, seller figure and currency amount. Delete the `boughtPage(html)` handler in `src/routes/index.tsx`.

### Step 2 — `/tools` (P1)
Convert `src/bought/tools.html`. Our content: calculators, worksheets, useful tools, founder toolkit. Same removals.

### Step 3 — Idea page `/idea/<slug>` and category page `/category/<slug>` (P1)
These carry our 4,200+ ideas and 100 categories, our most important pages.
- **Wait for my zips** of the seller's single idea page and category page (section 6). Do not invent a layout.
- Until they arrive, the category page may reuse the `/lists/<slug>` framework (sections and card styles), showing the category's 10 subcategories and its ideas.

### Step 4 — Calculators `/calculator` (P1)
After the seller calculator zip arrives: hub plus each calculator page on the seller layout, keeping our calculator logic (`src/lib/calculators.ts`).

### Step 5 — FAQ from the database (P1, plan already agreed)
- Subcategory page: its own FAQ, plus one question from each of its 10 ideas, collapsed, each linking to the idea.
- Category page: its FAQ, plus one question per subcategory.
- `/lists` hub: one short FAQ only.
- Keep pages light; the full Q&A for an idea stays on the idea page.

### Step 6 — P2 pages
In this order: `/templates`, `/topics`, `/faq`, `/case-studies`, then guides, glossary and blog once their zips arrive, then `/questions/<slug>`.

### Step 7 — P3
Feature matrix, then market research, open source, failed startups India, frameworks comparison, all converted to code with placeholders.

---

## 5. Hard rules (repeat of Part 1, plus what went wrong)

1. Seller **layout and structure**, **our content**. Do not invent layout. Do not keep seller text where we have our own.
2. No seller brand name anywhere visible (search the rendered HTML before pushing).
3. No currency amounts copied from the seller, and never convert them to rupees. No US/UK-only items in header or footer.
4. Never invent a URL. Link only to routes in `src/routes` or our category, subcategory, list and idea pages.
5. Menu classes use the `mm-` prefix. Never reuse a class prefix another stylesheet already uses (the `bm-` clash broke 44 pages once).
6. After any header or footer change, regenerate the raw pages' copy: `bun scripts/render-menu-panels.tsx > src/bought/menu-panels.json`.
7. Every page stays `noindex` until launch.
8. Colours: keep the seller's purple until I say we launch on the real domain.
9. Check the live page yourself before telling me it is done. Never claim a fix you have not seen live.

---

## 6. Files I (the founder) will upload next

Save each as a rendered page zip, exactly like the earlier ones, to https://github.com/Pinkycherry/staging (branch `main`):

1. A single idea page (any `/startup-idea/<slug>`) — **most important**
2. A category page (any `/business-ideas/<slug>`)
3. The category pillar `/business-ideas`
4. The calculators hub `/calculators`, plus one calculator page (e.g. `/calculators/break-even`)
5. A guide page (any `/guides/<slug>`) and the guides hub
6. The questions hub `/questions`, plus one question page
7. `/glossary`
8. `/blog`

---

## 7. Reporting format after each step

```
STEP <n> DONE
Live: <full URL(s)>
Commit: <hash>
Our content used: <tables / files>
Seller placeholders left (pending): <list>
Checked live: yes, at <time>
```

Every escalated issue and every pending item also goes into the log with timestamp and P1/P2/P3:
https://claude.ai/artifact/RLTddg7r1u7RFnFi76rzVj
