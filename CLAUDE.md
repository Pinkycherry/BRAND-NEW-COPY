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

### Push rule (updated 4 Nov 2026, replaces "wait for my reply")

Within a batch, do not stop after a page and do not wait for a reply: build the page, push it to main, post only its full live URL in one line, then go straight to the next page until every page in the batch is done. Do not open or update the logs after each page; keep track yourself and update both logs once, at the end of the batch. The founder checks each URL live and may interrupt with a fix: apply it to that page and every page after it, then carry on. (git push is refused from the Claude sandbox; commits go through the GitHub web upload page in the founder's browser, one existing folder per upload.)

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
- Original only, never scraped or reworded from the seller. Never invent a number, statistic, law or source; if it can't be verified, leave the number out.
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
