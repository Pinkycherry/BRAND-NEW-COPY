# BBI search architecture and staging hold — 23 October 2026

**Owner:** Pinky 1. **Target brand/domain:** businessidea.io. **Preview:** bbinewcopy.vercel.app. **Source/content:** bbusiness.online, Pinkycherry/newbusinessideas3. Read PINKY_1_SITE_BUILD.md, SOURCE_BRIEF_2026-10-22.txt, REFERENCE_PAGE_ARCHITECTURE_2026-10-22.md, BUTTERFLY_EFFECT.md and WORK_LOG.md before implementation.

## Founder instruction

Business idea, startup idea and founder intent should be visible across the correct routes, titles, H1/H2 hierarchy, links and image language. A short arbitrary slug or generic heading wastes a page's purpose. BBI must have its own India-first structure, naming and emotional voice. The competitor reference is only for the depth of page families; none of its copy, claims, numbers or composition is a template.

## Search hold before the real domain

The public Vercel demo must remain out of search results until the founder connects the actual domain and explicitly authorizes release. `siteIndexable()` is hard-coded false; root HTML emits `noindex,nofollow`; `vercel.json` sets `X-Robots-Tag: noindex,nofollow,noarchive,noimageindex` across HTML and image assets; XML sitemap is empty. Google Search Central says a crawler must be allowed to fetch a URL to read its noindex rule. Therefore a blanket `robots.txt Disallow: /` is counterproductive and can leave a URL-only result if linked externally. Preview robots.txt should allow fetching while the response header and meta tell crawlers not to index. Before domain launch, review every route and asset response, canonical origin, sitemap, Search Console and release controls together. A public URL cannot be guaranteed unseen by all services; this is the strongest search-indexing configuration available without making the preview private.

Sources: https://developers.google.com/search/docs/crawling-indexing/block-indexing and https://developers.google.com/search/docs/crawling-indexing/url-structure

## Naming system

- Use lower-case, short, readable words separated with hyphens. Include the actual topic and intent, not repetitive keyword strings. Google recommends simple descriptive URLs and hyphens as word boundaries.
- Keep published legacy slugs and their working inbound links. If a better public URL is introduced, first make it work, then use one canonical and a 301/308 redirect from the old URL; never let two indexable copies compete. During preview both remain noindex.
- Index route families by what the person is doing: exploring business ideas, validating a startup idea, calculating costs, reading a founder guide. The route name and headline should answer the same human question.
- One clear H1 per page; H2s for distinct decisions/sections; H3s for supporting subsections. Use natural variants: business idea, startup cost, first customer, founder, market test, India and a concrete business model where relevant. Never force every phrase into every heading.
- Images use source WebPs and their accurate alt/caption/width, not a pile of keywords. OG/Twitter image and image alt correspond to the page. Structured data only describes visible, real content.
- Internal links use descriptive labels attached to real routes and connect the next question: idea → costs → guide → validation → alternative idea.

## Existing page families and intended search framing

| Current route family | Human intent and H1 direction | Additional heading / onward paths |
|---|---|---|
| `/` | Find a business idea that fits your life in India | Starting situation, hard truths, published business idea paths, first test |
| `/browse`, `/category/:categorySlug`, `/category/:categorySlug/:subcategorySlug` | Explore [specific] business ideas and startup paths | Who this path fits, what to check, real available ideas, calculator and guide |
| `/blueprints` | Published business idea blueprints | Search completed startup ideas, buyer/cost/risk, related route |
| `/idea/:slug` | Exact published idea name | Customer, demand, money, risk, launch, validation; original source slug remains |
| `/startup-guides`, `/startup-guides/:slug` | Startup guides for a specific founder decision | Steps, examples, takeaways, linked calculator, idea and glossary |
| `/blog`, `/blog/:slug` | Specific founder problem or business idea list | Original article headings and contextual practical next step |
| `/calculator`, `/calculator/:slug` | Calculate one startup/business metric | Assumptions, result, formula, interpretation, guide and idea |
| `/founder-glossary` | Founder and startup terms explained | Definition, example, related metric and guide |
| `/learning-resources` | Founder toolkit with real resources | Different questions and paths, no unsupported tools |
| `/about`, `/founders`, `/contact` | Trust, authorship and human support | Real people, editorial method, exact contact |
| `/pricing`, `/services`, policies | Truthful current access and terms | No fake subscription, report or guarantee |

## Distinct page families to build

An India-first decision entry page, business model comparisons grounded in actual published ideas, a validation field guide, calculator-to-blueprint journeys and location/starting-budget discovery should become their own branded routes only when content and destination bindings are real. Names, exact slugs and redirect mapping are recorded at implementation time. Do not invent thousands of empty URLs to imitate a competitor page count. Keep the 100-category/1,000-path framework and 879 completed source idea pages navigable while expanding actual content.

## Implemented first original route

- `/business-ideas-india` — branded page name **The First Move**. SEO title “Business Ideas in India for Real Life | BusinessIdea.io”; H1 “Business ideas for the life you actually have.” Sections follow personal constraint → real category pathways → three financial/customer/risk questions → a first proof → four-provider research use → truthful FAQ. It links only to approved taxonomy categories, completed source blueprint index, real calculator, existing validation guide and contact. The four situation choices change original narrative and category artwork; no income figures or fake testimonials. This is an exemplary page family, not a competitor recreation.

## Implemented validation field guide

- `/startup-idea-validation` — SEO title “How to Validate a Startup Idea in India | BusinessIdea.io”; one H1 “Validate a startup idea before it costs you.” Eight substantive sections: falsifiable claim, buyer interviews, evidence ladder, four-field browser-local notebook, cash worksheet, four external AI research options through the existing blueprint Validate button, reversible next-decision selector, FAQ, plus a specific final action. The route does not claim an AI verdict or save/transmit notebook data. It is initially unlisted in the shared menu until live content, controls, SSR and noindex are checked; then add contextual links.

## Implemented business-model comparison route

- `/business-models-india` — SEO title “Business Models in India: Compare How an Idea Earns | BusinessIdea.io”; H1 “How does this business idea earn?” Seven substantive sections cover model obligations, a two-model comparison of five real operating patterns, a live rupee arithmetic worksheet, delivery burden, cash-order risks, buyer questions and FAQ. No market size, revenue promise or universal ranking. Initially unlisted in the shared menu pending live QA. The route is original BBI composition and copy.
