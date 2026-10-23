# Pinky 1 — page collection and engagement build plan

**23 October 2026, 11:50 IST.** This is the active build specification for the public preview at `bbinewcopy.vercel.app`, committed to `Pinkycherry/BRAND-NEW-COPY` `main`. Read alongside `PINKY_1_SITE_BUILD.md`, `PAGE_SYSTEM_2026-10-23.md`, `SEO_URL_FRAMEWORK_2026-10-23.md`, `REFERENCE_PAGE_ARCHITECTURE_2026-10-22.md`, `BUTTERFLY_EFFECT.md`, `SOURCE_BRIEF_2026-10-22.txt`, and `WORK_LOG.md` before edits. The real domain is businessidea.io. Keep every preview page, post, image and asset on a noindex hold until the founder authorizes domain migration.

## Founder correction

The current pages can read as isolated, oversized headline panels with a small amount of prose, wasted width and weak reasons to continue. Fix the composition, not just the line height. The reader should meet another relevant decision while reading, with a useful preview and a working destination. Build the destination first. The entire collection must work on a phone. Source images with typography must remain completely visible inside a 16:9 display stage. The site must speak to founders in India in its own emotional, practical voice, without copying IdeaProof text or appearance.

## Research: what the reference does mechanically

The reference's validation guide has a contents list, key takeaways, sectioned long-form answers and several related resource families after the article: guides, short questions, calculators, comparisons and lists. Its resource hub groups hundreds of destinations by founder intent and places each item next to a working tool. Its sitemap makes the breadth searchable by page family. A question page opens with a direct answer and quick facts, then leads into deeper method and linked paths. These are **mechanics to surpass**, not source content or visual patterns to reproduce. Do not import its unsupported statistics, US-dollar assumptions, proprietary scores, automated-verdict claims, generic founder stories or commercial CTAs. Reference URLs: `https://ideaproof.io/guides/business-idea-validation-guide`, `https://ideaproof.io/resources`, `https://ideaproof.io/questions/cost-to-validate-business-idea`, `https://ideaproof.io/sitemap`. Research checked on 23 October 2026.

## Original BusinessIdea.io engagement language

A page is a **decision scene**: name the real-life pressure, give a direct answer, let the reader test one assumption, show the cost of being wrong, then offer the next specific page or source record. Use human names for modules. Each card says what the reader will do there, not “learn more.” Select only links that answer the question raised in the preceding section. No fabricated market demand, “success probabilities,” quotes from imaginary founders or arbitrary rankings.

### Reusable section and widget inventory

| Widget | Reader action | Required destination/data | Good placement |
|---|---|---|---|
| **Choose the next constraint** | Tap money, buyer, time, delivery or evidence; see a one-sentence consequence | Completed routes only | After lead answer or at a fork |
| **Rupee reality check** | Use current values or enter a small scenario; see transparent formula | Actual cost, pricing or cash-flow route | Immediately after an economic claim |
| **Street-level question** | Copy or adapt one neutral question for a real buyer or supplier | First-customer or research page | After an example, before advice |
| **Evidence drawer** | Expand what is known, assumed and missing | Source guide/blueprint and date | Beside research claims |
| **Keep reading if...** | Pick a situation with a meaningful next read | Existing 20 guide/23 journal pages | Mid-article at a natural change of topic |
| **One sale under pressure** | Reveal one scenario change and its effect | Relevant live tool | After explaining costs or collection |
| **Glossary in context** | Understand a term, then apply it | Verified existing definition and related tool | Next to the first technical term |
| **From this idea to your life** | Move from a published blueprint to time, buyer, cash and validation | Source idea + completed tools | Between idea-detail modules |
| **The next honest move** | Choose test, adjust or stop based on collected evidence | Completed decision page | End of page; avoid generic CTA stack |
| **Proof trail** | See source image, original author/date where present, and limits | Real content record | Beside a guide/post/idea excerpt |

Every widget must disclose whether it is a worksheet, source fact or hypothetical example. Interactive values stay browser-local unless persistence is actually implemented. Do not show fake progress, random numbers or dead buttons.

## Page-first delivery order

1. **Research and evidence:** `/business-idea-research-india` with a street-and-search observation table, claim/source/date/counterexample notebook, buyer route and competitor comparison; then `/business-demand-test-india` and `/startup-idea-comparison`.
2. **Money and personal risk:** Already live cost, pricing and cash-flow pages are broadened with compact contextual widgets, then `/unit-economics-india`, `/business-idea-risk-check`, `/business-idea-time-fit`.
3. **Situation-led shelves:** `/side-business-ideas-india`, `/local-business-ideas-india`, `/online-business-ideas-india`, `/service-business-ideas-india`, `/product-business-ideas-india`. Each shelf must use actual published blueprints and category mapping; no fabricated per-topic idea counts.
4. **Action and reflection:** `/startup-launch-plan-india`, `/business-idea-pivot-or-stop`, `/founder-decision-journal`.
5. **Knowledge doors:** `/startup-terms-india`, `/business-idea-reading-room`, `/business-idea-toolkit`. These expose the existing 159 definitions, 20 guides, 23 posts and 60 calculators with precise status, titles and images.
6. **Existing family depth:** strengthen `/business-ideas-india`, browse/category/subcategory, 879 published idea detail pages, original guide and journal detail pages, home, header and footer. Integrate all complete destinations at useful reading moments. Repair shared patterns systematically.

The 24-route status table in `PAGE_SYSTEM_2026-10-23.md` is the route ledger; update it on each verified release. Existing source URLs must remain valid. A standalone page should have a real answer, method, worked example or input, countercase, source next step, FAQ and two or more distinct embedded engagement moments. Do not add identical boxes merely to reach a section count.

## Composition rules

- Reduce editorial H1 to roughly 42–64px desktop and 34–42px phone, with a concise lead and an immediately visible substantive object. H2 roughly 28–42px desktop and 25–32px phone. Use 48–76px desktop and 40–64px mobile section spacing as a starting range, then edit against screenshots.
- Let prose occupy a readable column; use adjacent space for a source image, working control, example or table. A wide blank second column is a bug. Sections vary: editorial opening, dense evidence strip, live worksheet, 16:9 source art, stacked mobile reading path.
- Source artwork stage: `aspect-ratio:16/9`; image `width:100%;height:100%;object-fit:contain`; neutral backing so no letterbox gap looks broken. Never overlay new captions on baked typography, crop away image text, or stretch. Alt text describes the original featured image and serves image SEO.
- Avoid text crossings: `min-width:0` on grid/flex children, `overflow-wrap:anywhere` only where needed for user inputs/URLs, scalable type, visible focus, safe button wrap, no absolute text over imagery. Test long labels and currency values.
- Phone: one column at narrow widths, no body overflow, controls 44px or greater, table/ledger gets a clear horizontal container or stacked rows, sticky controls avoid covering content, and no font below a comfortably legible size. Audit 390px and 360px in a real rendered view when available.
- Respect reduced motion; no section should depend on animation to appear. Cinematic means intentional progression and transitions, not long empty scroll intervals.
- Each page: one H1; intent-matched slug/title/H2; natural India business idea, startup idea and founder wording; canonical strategy consistent with SEO framework; preview noindex in metadata/robots and `X-Robots-Tag` where configured.

## Per-release gate and cadence

1. Read required ARTIFACTS and source record before editing.
2. Implement a complete destination in `main`; append timestamped `WORK_LOG.md` with files, commit, QA and unresolved issues. Update the route ledger.
3. Verify live SSR, noindex, links, controls and representative desktop + phone layout. Check image dimensions, alt and full 16:9 artwork. Fix crossings before promotion.
4. Add a small number of contextual hooks to related pages and header only after the destination works. Use a question-specific preview, never a repeated generic recommendation grid.
5. Show the founder screenshots after three to five edits, and after each visual correction. Continue work without waiting for a reply.

## Current honest status

As of this plan, the guide and journal indexes retain original source images and counts; text overlap was fixed by putting captions below artwork and showing the full image. Cost, pricing, first-customer and cash-flow pages work on the live demo at desktop width, but phone visual QA and sitewide integration are incomplete. `/business-idea-research-india` is next. This document is a build plan, not a claim of completed routes.

### Execution checkpoint — 23 October 2026, 12:07 IST

Research desk is live and linked contextually. Its short destination cards were corrected from stretched panels to 157px content height on desktop. The demand-test destination is implemented next, with specific commitment formats and transparent response counts. Wait for live verification before promoting it to shared navigation. Four existing money/customer route CSS files have smaller phone type rules; device-width visual QA is still open.
