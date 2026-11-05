# BusinessIdea.io: working rules for Claude

## Commits: always straight to main (founder rule, 28 Oct 2026)

Every commit goes to `main` and is pushed to `main`. No side branches, no pull
requests, nothing for the founder to merge by hand. `main` deploys
https://bbinewcopy.vercel.app automatically. After each push, give the founder
the live page links (not commit links) and add an entry to the site copy log
artifact: https://claude.ai/artifact/RLTddg7r1u7RFnFi76rzVj

## Links: always full, clickable URLs

Whenever you point the founder to any place (a repo file, a GitHub setting, a
PR, a Supabase screen, a Vercel page, an artifact, any website), give the full
URL that opens that exact place in one click. Never a path like
"Settings → Secrets and variables → Actions" or "src/routes/...", and never a
placeholder link.

Common ones:

| Place | URL |
|---|---|
| Repo | https://github.com/Pinkycherry/BRAND-NEW-COPY |
| A file on main | https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/PATH |
| GitHub Actions secrets | https://github.com/Pinkycherry/BRAND-NEW-COPY/settings/secrets/actions |
| "Import content" workflow | https://github.com/Pinkycherry/BRAND-NEW-COPY/actions/workflows/import-content.yml |
| Pull requests | https://github.com/Pinkycherry/BRAND-NEW-COPY/pulls |
| Supabase project | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux |
| Supabase API keys | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux/settings/api-keys |
| Supabase table editor | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux/editor |
| Supabase SQL editor | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux/sql/new |
| Staging site | https://bbinewcopy.vercel.app |
| Connectors in claude.ai | https://claude.ai/customize/connectors |

## Talking to the founder

Plain, short replies. Spoon-feed steps: numbered, one action each, with the
full URL for every place. He works night shifts; never assume a 9-to-5 day.

## Secrets

Never store a secret key (Supabase service_role, database password, API
tokens) in a file, commit or artifact. If one is pasted into chat, advise
rotating it at the Supabase API keys URL above and putting the new one only
in GitHub Actions secrets.

## Founder rules — India topic pages

Saved 4 Nov 2026 at the founder's request. When the founder says "recall", re-read this section before acting.

### Logs (exactly two, always referred to by name)

- **BBI Site Copy Log**: https://claude.ai/artifact/RLTddg7r1u7RFnFi76rzVj. One entry per push: date, page, live URL, what changed.
- **India Topic Pages Review**: https://claude.ai/artifact/Cxg3dZVdJ1DsLEDqMVVwFP. The page tracker. Mark a page "completed" only when layout, content, links, images and E-E-A-T are all done. Backup data: `data/topics-roadmap.json`, updated with the tracker.
- No other logs. The Codex log is reference only, for work up to 4 Nov 2026, 10:00 IST.

### Push rule (corrected 4 Nov 2026)

- Scope: only the pages of the current batch the founder approved. Nothing else from the roadmap. Stop when the batch is done.
- For each page: build it, push it to main, check it is live, then post one line as a user-visible message (SendUserMessage): `Live: ` followed by the page's full URL. Mandatory for every page, without exception. Then start the next page without waiting for a reply.
- Do not open or update the logs after each page; keep track yourself.
- When the batch is done: update both logs once, post the list of the batch's live URLs (full URLs), then stop and wait for the next batch.
- The founder checks each URL live and may interrupt with a fix: apply it to that page and every page after it, then carry on.
- git push is refused from the Claude sandbox; commits go through the GitHub web upload page in the founder's browser, one existing folder per upload. Vercel regenerates the route tree during the build.

### Quality rules (owner review, 5 Nov 2026)

Every page built before this date failed the owner's review: low-value, thin, generic content with an India tag added. No new pages until every existing page is rewritten to these rules, one at a time, each pushed with a `Live: ` line.

- **Tracker columns**: India Topic Pages Review has Quality check, Reviewed by and Reason for every URL. A page is "Passed" only after the owner approves its rewrite.
- **Numbers**: no researched figures on topic pages. Where a number is needed, write the point without it and point to the page's Validate button (see "Founder rules — India topic pages: numbers").
- **Every seller section** filled with full, substantial writing, not two or three lines.
- **Real Indian depth**: step-by-step processes on actual portals and offices (Udyam, GST, MUDRA, Startup India, bank branch loan steps).
- **Worked rupee examples** for a real Indian reader: the lines and how to work each one out, with the figures coming from the reader's own Validate session.
- **Differences** between metros, tier 2 and tier 3 cities and villages, and between sectors.
- **Mistakes Indians actually make**, and family, social and cash realities.
- **Checklists and worksheets** the reader can use, and **what to do this week**.
- **Inline links** to our ideas, lists, calculators and other topic pages, and to authoritative Indian sources.
- Every page needs something a reader cannot get from a generic AI answer. If a section is generic advice, rewrite it.

### Slugs and SEO (100% ours)

- A slug is the full phrase an Indian person types into Google or asks Gemini, e.g. seller `/validate-idea/traveltech` becomes `/how-to-validate-a-travel-tech-business-idea-in-india`, H1 "How to Validate a Travel Tech Business Idea in India".
- Slug, SEO title, H1 and meta description are our own wording, built on a main keyword + niche + India. Never the seller's slug or title with a word added. No one- or two-word slugs.
- The site is not indexed, so renames need no redirects: change the slug and update every internal link.

### Noindex

The whole site stays noindex (every URL, new pages included) until the founder says otherwise.

### Layout

Use the seller's layout and composition exactly: same sections, order, components, CSS and images (seller images stay until replaced). Wrap every page in our existing header and footer; change neither. Never load the seller's router script (it shows their "Page Not Found" screen); rebuild tabs, accordions, scroll reveals and hovers in our own small script. Content lives in data files (`src/data/topic-pages*.ts`), never hardcoded in components.

### Content

- India only: Indian buyers, rupees, GST, Udyam/MSME, MUDRA, UPI, Indian cities and towns, family and social realities, Indian rules.
- Warm, emotional, interactive, speaking to the reader as "you"; questions, small checks, real situations; plain words for a first-time founder on a phone. Never write as if the site runs the business.
- Original only, never scraped or reworded from the seller. Never invent a number, statistic, law or source; no researched figures; point to the Validate button instead (see the numbers rules).
- Future-proof: past budgets and years may be referenced, but never anchor content to an old year.
- No seller brand, no seller links, no `href="#"`, no visible counts.
- Q&A pages: no new Q&A research. Use our FAQ page and the Supabase FAQ data inside the seller's question-page structure.

### E-E-A-T on every page

A named reviewer or author line linking to /about, a last-updated date, a sources section with real Indian sources (RBI, Ministry of MSME, Startup India, government portals, credible research), and first-hand practical steps. No page may read as thin or scraped.

### Links

Many inline internal links in the body text to our lists, categories, ideas, calculators, guides, glossary and the other topic pages, plus related-reading sections; inline external links to authoritative Indian sources. Add links back to new pages from older pages. Goal: Google and Gemini cite us.

### Images

Every guide page has its 16:9 guide image; every blog or article page has its featured image. Use seller images until replaced.

### Choosing pages

Next pages come from the seller's header and footer menu pages (validate hub, tools hub, learn hub, key guides). List the 10 with their new India slugs in one message, then build the first.

## Founder rules — India topic pages: numbers

Updated 5 Nov 2026 (replaces the earlier sourcing rules, which are withdrawn).

1. **No number research.** Do not look up figures for any page on the site. Researched figures already added to topic pages have been removed. Where a page needs a number, write the point without it and add an inline line pointing to the page's Validate button ("Check today's figure for your city with the Validate button."). In data files write the marker `[Validate: what figure]`; the renderer turns it (and any old `[Data pending: ...]`) into that inline line. Real-time numbers come from the visitor's own Validate session, not from us.
2. **Validate button on every topic page:** reuse our existing picker exactly (`ProviderPromptActions`: Claude, Perplexity, ChatGPT, Grok). Build no new UI. It sits at the top of every topic page (`#validate`), at the end (before Sources), and the inline lines link to it.
3. **One backend prompt template** for all topic pages: `src/lib/topic-validate-prompt.ts`, filled automatically from the page title, topic and key questions (its section headings) plus today's date. Never write a separate prompt per page.
4. **Pending, not to be built now** (also listed in India Topic Pages Review):
   - A full redesign of the Validate button and validation area across the whole site (it works but is not engaging enough).
   - Much stronger, longer backend prompts for every Validate button.
5. **Content stays rich without numbers:** steps, processes, documents, eligibility, examples, checklists, a 7-day plan, Indian situations, and inline links to our pages.

## Founder rules — Validate inputs and prompts (5 Nov 2026)

- **Status:** all 20 live topic pages are approved and finalized by the owner (layout and content). Remaining work on them: prompt edits and page-specific user inputs.
- **Tap-to-select inputs on every topic page, no typing.** Common inputs: language (first), state/city or town type (metro, tier 2, tier 3, village), online / offline / both, budget band (for example under ₹10,000 · ₹10,000–50,000 · ₹50,000–1 lakh · above 1 lakh), social media following (none, small, large), plus page-specific add-ons (e.g. funding page: loan vs investor, stage; idea-check page: sector, time available). Each page gets its own input set that matches its intent.
- **Existing tick boxes must feed the prompt.** Today they change nothing; every selection must be sent to the Validate prompt.
- **The LLM must ask follow-up questions** after the redirect, in the chosen language, before answering.
- **Output tone:** everyday spoken local language (e.g. Telugu as people in Vijayawada speak it), simple and practical, never textbook or formal translation. The backend prompt is our strength; say this explicitly in it.
- **Prompt length:** no extra or padded words, now and in future. Grok fails on long prompts: when Grok is chosen, send a shorter version of the same prompt. ChatGPT, Claude and Perplexity get the full version. Still one template (src/lib/topic-validate-prompt.ts) with a short and a full variant.
- **Every page a different structure.** No two pages may look templated, for Google AdSense approval. Vary section types, order of our own additions, visuals and interactive pieces per page while keeping the seller section order.
- **Visuals:** add infographics and generated images (16:9) and HTML/SVG diagrams where they help.
- **Tokens:** low until Monday. Read less, write more; no repeated reads.

## Founder rules — motion rails and the "Brahmastra" (5 Nov 2026)

- **Motion rails:** guide, article, calculator/tool and category bands are small cards in a slow sideways motion; alternate rails move in opposite directions; they pause on hover or touch; still scroll for reduced-motion users. Built in src/bought/topic-page.ts (`marquee`, `MQ_CSS`). Each page gets 2–4 rails, their order and positions picked from the page slug, so pages differ. Mobile first.
- **Every page a different composition.** New pages vary section types and order around the seller's sections (quiz first on one, story first on another, takeaways last on a third, and so on).
- **Pending, the last step ("Brahmastra"), do NOT build until the founder says:** on high-traffic pages (idea pages, categories, topic pages) the layout and section order change on every refresh and differ between visitors (for example Vijayawada vs Mumbai), without breaking components or the reading flow and without changing colours. Plan it carefully; it is one switch at the end.

## Rewrite progress (resume point)

- All 20 live topic pages are rewritten (5 Nov 2026), one data file each, src/data/topic-pages-rw1.ts to rw20.ts, in tracker order. All follow the no-numbers rule with the Validate button at top, end and inline. The old thin files topic-pages-b/c/d/e.ts are deleted. Every page is still Quality check Failed / Reviewed by Owner until the owner approves its rewrite.
- New pages live (5 Nov 2026, src/data/topic-pages-n1.ts to n5.ts): 21 how-to-calculate-cash-runway-for-a-small-business-in-india, 22 how-to-calculate-customer-lifetime-value-for-a-small-business-in-india, 23 how-to-keep-customers-coming-back-to-your-small-business-in-india, 24 when-to-raise-funds-for-a-startup-in-india, 25 how-to-find-a-co-founder-for-a-startup-in-india. Route files copied from an existing topic route; scratchpad helper addpage.sh did it.
- Next: build the tap-to-select Validate inputs and the short/full prompt (rules above), page by page, then new pages from the roadmap. Pending (not to build now): Validate area redesign; stronger Validate prompts.
- Pattern: keep the seller's section order (see the comment above each page). Question pages: takeaways, step by step (rich), benchmarks (rich), mistakes (rich), real situations (cards), optional quiz, dbfaq, expert tips (rich), sources, optional compare, related chips, CTA, "What to do this week" (rich), keep reading, deeper chips, TOOLS, CALCS, EXPLORE, optional rules. Section anchors: quiz = #check, headings starting "Compare" = #compare, containing "stages" = #stages, "quick reference" = #numbers, rich = slug of heading (60 chars max).
- Renderer (src/bought/topic-page.ts): `rich` long-form sections, `[Validate: ...]` inline lines, Validate picker blocks, Supabase FAQ (`dbfaq`) and idea cards (`dbideas`), and bands between sections linking categories, business models, validation pages, guides (16:9 images), blog articles, glossary, failures, case studies, calculators and templates. `explore.guideCategory` must be one of: Bootstrapping, Growth & PMF, Launch & Ops, Market Sizing, Validation.
- Logs: update both logs once at the end of the batch.
