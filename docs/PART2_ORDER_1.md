# Part 2 — Order 1 (from the founder, via the project manager)

Status report received and accepted. Start Part 2 now. Brief: docs/HANDOFF_PART2_CONTINUATION.md. Do these four jobs in this order, without waiting for the zips. Push each to `main`, check it live, report in the section 7 format, then go straight to the next one.

## Job 1: Header at phone width (finish what you started)
- Open the live site at 390px and 768px width (browser device emulation on https://bbinewcopy.vercel.app, no local server) on `/`, `/lists` and `/business-models-india`.
- Fix anything broken: menu opening and closing, scrolling inside the menu, tap targets, the logo/Login/Get Report row fitting on one line.
- Done = all three pages work at 390, 768 and 1440 wide.

## Job 2: Home `/` (Step 1 of the brief)
- Convert `src/bought/home.html` to React sections inside `V2Frame`, keeping the same section order and layout. Same method as `src/routes/lists.index.tsx`.
- Our content, from the database and `src/data/taxonomy.ts`:
  - Live counts of ideas, categories and lists. Use `getListsHub` in `src/lib/lists.functions.ts`.
  - Our 100 categories.
  - Most-filled lists.
  - Latest published ideas, linking to `/idea/<slug>`.
  - Links to our guides and calculators.
- Where we have nothing (testimonials, report previews, ratings): keep the seller section as a placeholder with generic wording. No seller brand, no seller figures, no currency, no fake ratings or user counts. Write each placeholder into your report.
- Remove the `boughtPage(html)` handler from `src/routes/index.tsx`.
- Done = search the live HTML of `/`: zero seller brand mentions, zero "$", zero "€", zero "£".

## Job 3: `/tools` (Step 2 of the brief)
- Convert `src/bought/tools.html` the same way.
- Our content:
  - Calculators: `/calculator` and `/calculator/<slug>` for break-even, startup-cost, roi and funding-needed.
  - Worksheets: launch plan, demand test, compare two ideas, decision journal, weekend stall profit check, coaching batch check.
  - `/useful-tools`, `/business-idea-toolkit`, `/product`.
- The seller's 1,000+ external tool directory has no equivalent on our side. Keep its section as a framework placeholder, unlinked, and list it as pending.
- Same done test as Job 2.

## Job 4: Category page `/category/<slug>`, interim, plus the database FAQ
- Until I send the seller's category zip, rebuild `/category/<slug>` on the `/lists/<slug>` framework: same section and card components, reused rather than copied.
- Show the category name, the intro, its subcategories as list cards with live counts linking to `/lists/<subcategory-slug>`, its top ideas, and the FAQ.
- FAQ from the database (Step 5 of the brief):
  - Subcategory page: its own FAQ, plus one question from each of its ideas. Each extra answer is collapsed and links to its idea.
  - Category page: one question from each subcategory.
  - Keep pages light.
- Categories with no ideas yet show a simple "ideas coming" state, not an error.

## Work log
- Do not put private details in the public repo.
- Your report back to me is the log. The project manager copies it into the founder's log.
- In the repo, `ARTIFACTS/WORK_LOG.md` gets one short public line per job only: what changed and the live link.

## Reminders
- Seller layout, our content. No invented layout, URLs or figures.
- No seller brand. No currency amounts. No US/UK-only items in the header or footer.
- Never reuse another stylesheet's class prefix. Menu = `mm-`.
- After any header or footer change: `bun scripts/render-menu-panels.tsx > src/bought/menu-panels.json`.
- `bun run build` passes before every push. Push to `main` only. Check live before you say done.

Next order comes when the founder uploads the seller zips (idea, category, calculators, guides, questions, glossary, blog).
