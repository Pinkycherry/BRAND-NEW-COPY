# Seller page map

Source: `src/bought/` on main. This is an inventory, not approval to reproduce seller claims. Repeated card/link groups are counted; the row order is the seller DOM order.

## Data keys

- **I** = `ideas` (`slug`, `title`, `summary`, `hook`, `status`, `subcategory_code`, `position`, `faq`, blueprint fields).
- **C/S** = `categories` and `subcategories` (`code`, `name`, `slug`, `intro`, `faq`) plus published idea counts.
- **G/T** = existing `guides-data.ts`, `glossary-data.ts`, `calculators.ts` and our published blog/worksheet routes; these are repository content, not Supabase tables.
- **None** = no matching approved data. Stop that component; do not copy seller claims or invent rows.

## Page mapping and ordered components

### `home.html` → /

Available fields: published ideas.slug,title,hook,summary,who_pays_you,how_money_comes,what_hurts; category and subcategory published counts; guides-data and calculators. Verified founder testimonials: none.

Order 4: `/` uses the most recently updated published idea for a compact preview and live published idea/category/list counts for the proof band. The seller six-step generated report has no matching report record. Verified founder stories are zero, so testimonials remain omitted. Seller market-watch and pricing claims also have no matching data. V2Frame `#` fallback is tracked in Order 4 job 2.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Product | heading, copy; cards/links ×6 | C/S, I, G/T navigation |
| 2 | Marketing Suite | heading, copy; cards/links ×5 | C/S, I, G/T navigation |
| 3 | Free Tools | heading, copy; cards/links ×8 | C/S, I, G/T navigation |
| 4 | Free Startup Calculators | heading, copy; cards/links ×10 | C/S, I, G/T navigation |
| 5 | Industry-Specific Validators | heading, copy; cards/links ×13 | C/S, I, G/T navigation |
| 6 | Startup Guides | heading, copy; cards/links ×11 | C/S, I, G/T navigation |
| 7 | Comparison Guides | heading, copy; cards/links ×10 | C/S, I, G/T navigation |
| 8 | Startup Idea Lists | heading, copy; cards/links ×23 | C/S, I, G/T navigation |
| 9 | Popular Startup Questions | heading, copy; cards/links ×13 | C/S, I, G/T navigation |
| 10 | Topic Hubs | heading, copy; cards/links ×4 | C/S, I, G/T navigation |
| 11 | Resources | heading, copy; cards/links ×10 | C/S, I, G/T navigation |
| 12 | Startup Failure Analysis | heading, copy; cards/links ×33 | C/S, I, G/T navigation |
| 13 | Legal | heading, copy; cards/links ×4 | C/S, I, G/T navigation |
| 14 | Account | heading, copy; cards/links ×3 | C/S, I, G/T navigation |
| 15 | Don't build productsnobody wants. (`#hero`) | heading, copy; image ×4; search/input ×1; tabs/buttons ×3; cards/links ×1 | I/C/S, G/T for applicable links; seller-only data: None |
| 16 | AI business idea validator — see a real 6-step report for "No-Code App Builder" (`#reports`) | heading, copy; tabs/buttons ×8; cards/links ×27 | I/C/S or G/T for links; seller metric/record: None |
| 17 | How IdeaProof works — AI startup validation in 120 seconds, then market research, business (`#how-it-works`) | heading, copy; cards/links ×2 | C/S, I; G/T where linked |
| 18 | Built for founder decisions. A validation engine, not a chatbot. (`#under-the-hood`) | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 19 | 13 AI generators for founders — startup idea generator, business name generator, lean canv (`#ai-generators`) | heading, copy; cards/links ×14 | C/S, I; G/T where linked |
| 20 | The largest founder data library on the open web. (`#learn-hub`) | heading, copy; cards/links ×59 | I/C/S, G/T for applicable links; seller-only data: None |
| 21 | Social proof and trust metrics (`#social-proof`) | heading, copy; cards/links ×24 | I/C/S or G/T for links; seller metric/record: None |
| 22 | Less FOMO. More signal. (`#testimonials`) | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 23 | Your report keeps watching the market. (`#live-radar`) | heading, copy; tabs/buttons ×1 | I/C/S or G/T for links; seller metric/record: None |
| 24 | Start free. Pay only when ready. (`#pricing-teaser`) | heading, copy; cards/links ×4 | I/C/S, G/T for applicable links; seller-only data: None |
| 25 | Honest answers to fair questions. (`#faq`) | heading, copy; search/input ×1; tabs/buttons ×11; cards/links ×4 | S.faq, I.faq; site-wide source: None |
| 26 | Most-read research on IdeaProof | heading, copy; cards/links ×15 | C/S, I; G/T where linked |

### `lists.html` → /lists; /lists/<slug> uses its top-card family

Available fields: categories.code,name; subcategories.code,name,slug,faq; ideas.slug,title,status,position,faq; live counts; seller metrics: none.

Current page gaps: Current /lists has hard-coded featured CTA and source-specific list buckets; /lists/<slug> includes unlinked Validate button and static intelligence/market-watch/author sections in `list-page-static.tsx`.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Business Idea Lists, Tools & Strategy Guides | heading, copy; image ×1; search/input ×1; tabs/buttons ×2; cards/links ×3 | C/S, I; G/T where linked |
| 2 | Trending this month | heading, copy; cards/links ×10 | I/C/S, G/T for applicable links; seller-only data: None |
| 3 | Filter by your situation | heading, copy | C/S, I; G/T where linked |
| 4 | Choose what to do next | heading, copy; cards/links ×3 | I/C/S, G/T for applicable links; seller-only data: None |
| 5 | Featured List | heading, copy; tabs/buttons ×1; cards/links ×1 | C/S, I; G/T where linked |
| 6 | By Demographic | heading, copy; cards/links ×25 | C/S, I; G/T where linked |
| 7 | By Budget | heading, copy; cards/links ×11 | C/S, I; G/T where linked |
| 8 | By Location & Style | heading, copy; cards/links ×10 | C/S, I; G/T where linked |
| 9 | By Industry | heading, copy; cards/links ×20 | C/S, I; G/T where linked |
| 10 | Tech & SaaS | heading, copy; cards/links ×10 | I/C/S, G/T for applicable links; seller-only data: None |
| 11 | Business Models | heading, copy; cards/links ×26 | I/C/S, G/T for applicable links; seller-only data: None |
| 12 | Tools & Resources | heading, copy; cards/links ×4 | G/T; I/C/S for related links |
| 13 | Strategy & Metrics | heading, copy; cards/links ×10 | I/C/S, G/T for applicable links; seller-only data: None |
| 14 | Complete index — every list (`#all-lists`) | heading, copy; cards/links ×142 | C/S, I; G/T where linked |
| 15 | Frequently asked questions | heading, copy; accordion ×5 | S.faq, I.faq; site-wide source: None |
| 16 | Have an idea? Validate it now | heading, copy; tabs/buttons ×2; cards/links ×2 | C/S, I; G/T where linked |
| 17 | IdeaProof Lists — Key Facts | heading, copy | C/S, I; G/T where linked |
| 18 | Most-read lists and guides | heading, copy; cards/links ×15 | C/S, I; G/T where linked |

### `tools.html` → /tools

Available fields: calculators.ts and generated-calculators.ts; guide/worksheet routes; external directory table: none.

Current page gaps: Current /tools has an unlinked external-directory placeholder; the seller's directory has no corresponding data.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | 1059+ Free Tools for Founders 2026 | heading, copy; image ×1; cards/links ×3 | G/T; I/C/S for related links |
| 2 | TL;DRA curated directory of 1059+ free tools for startup founders, organised into 30 categ (`#tools-search`) | heading, copy; search/input ×1 | I/C/S or G/T for links; seller metric/record: None |
| 3 | Free startup tools by founder journey stage | heading, copy; cards/links ×6 | G/T; I/C/S for related links |
| 4 | AI Assistants & Chatbots(30)Validation & User Research(31)No-Code Builders(7)Website Build | heading, copy; cards/links ×30 | C/S, I; G/T where linked |
| 5 | Where to submit your startup: 867 directories | heading, copy; cards/links ×5 | I/C/S, G/T for applicable links; seller-only data: None |
| 6 | Free AI tools built by IdeaProof | heading, copy; image ×4; cards/links ×4 | C/S, I; G/T where linked |
| 7 | Validate | heading, copy; image ×177; tabs/buttons ×28; cards/links ×217 | I/C/S, G/T for applicable links; seller-only data: None |
| 8 | Why this is the best free startup tools list | heading, copy | C/S, I; G/T where linked |
| 9 | How we picked these tools | heading, copy | G/T; I/C/S for related links |
| 10 | Frequently asked questions | heading, copy; tabs/buttons ×6 | S.faq, I.faq; site-wide source: None |
| 11 | Before you stack 10 tools — validate the idea | heading, copy; cards/links ×1 | C/S, I; G/T where linked |
| 12 | What changed in Market Validation & PMF | heading, copy; cards/links ×22 | I/C/S, G/T for applicable links; seller-only data: None |

### `topics.html` → /topics

Available fields: guides-data.ts, glossary-data.ts; ideas/category/subcategory fields; seller editorial metrics: none.

Current page gaps: Raw seller HTML is served; seller content, figures, links and CTAs are not mapped to our routes.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Startup Knowledge Hub | heading, copy; image ×2; cards/links ×2 | I/C/S, G/T for applicable links; seller-only data: None |
| 2 | Quick start by intent | heading, copy; cards/links ×4 | I/C/S, G/T for applicable links; seller-only data: None |
| 3 | Featured deep-dives | heading, copy; image ×3; cards/links ×3 | I/C/S, G/T for applicable links; seller-only data: None |
| 4 | 01. Validate your idea | heading, copy; cards/links ×82 | C/S, I; G/T where linked |
| 5 | Frequently asked questions | heading, copy; tabs/buttons ×6 | S.faq, I.faq; site-wide source: None |
| 6 | About IdeaProofAbout IdeaProofEntity & Knowledge GraphResearch MethodologyTransparency Rep | heading, copy; cards/links ×6 | C/S, I; G/T where linked |
| 7 | Don't build products nobody wants. | heading, copy; cards/links ×1 | I/C/S, G/T for applicable links; seller-only data: None |

### `templates.html` → /templates

Available fields: existing read-only worksheet routes; template catalog/download table: none.

Current page gaps: Raw seller HTML is served; seller template cards/download actions are not mapped to our worksheets.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Free Startup Templates 2026 | heading, copy; image ×1; cards/links ×2 | G/T; I/C/S for related links |
| 2 | TL;DR6 free templates covering the full founder journey — discovery, strategy, planning an | heading, copy; cards/links ×6 | G/T; I/C/S for related links |
| 3 | Discover & Define (`#catalog`) | heading, copy; image ×6; cards/links ×6 | I/C/S, G/T for applicable links; seller-only data: None |
| 4 | Pick a template by what you need to decide | heading, copy; cards/links ×6 | G/T; I/C/S for related links |
| 5 | Jump straight to the format you need | heading, copy; cards/links ×12 | I/C/S, G/T for applicable links; seller-only data: None |
| 6 | Common questions | heading, copy; tabs/buttons ×8 | S.faq, I.faq; site-wide source: None |
| 7 | Templates structure the thinking. AI gives the verdict. | heading, copy; cards/links ×2 | G/T; I/C/S for related links |

### `faq.html` → /faq

Available fields: subcategories.faq and ideas.faq; global site FAQ table: none.

Current page gaps: Raw seller HTML is served; seller FAQ answers and interactions have not been replaced with our database FAQ.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Frequently Asked Questions | heading, copy; image ×2 | S.faq, I.faq; site-wide source: None |
| 2 | What is IdeaProof? | heading, copy; search/input ×1; tabs/buttons ×111 | C/S, I; G/T where linked |
| 3 | Still have questions? | heading, copy; cards/links ×2 | S.faq, I.faq; site-wide source: None |

### `case-studies.html` → /case-studies

Available fields: founder-stories data (if available); case-study metric table: none.

Current page gaps: Raw seller HTML is served; seller founder claims and links have no corresponding data.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Startup validation case studies: real founders, real numbers | heading, copy; image ×2; cards/links ×2 | I/C/S or G/T for links; seller metric/record: None |
| 2 | Key numbers | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 3 | TL;DR | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 4 | Filter by industry | heading, copy; tabs/buttons ×7 | C/S, I; G/T where linked |
| 5 | Case studies | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 6 | The anatomy of a validation win | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 7 | Six patterns behind every success story | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 8 | By the numbers | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 9 | Frequently asked | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 10 | Learn from Startup Failures | heading, copy; cards/links ×8 | I/C/S or G/T for links; seller metric/record: None |
| 11 | Explore Our Free Startup Tools & Resources | heading, copy; tabs/buttons ×3; cards/links ×3 | G/T; I/C/S for related links |
| 12 | Related comparisons | heading, copy; cards/links ×6 | I/C/S, G/T for applicable links; seller-only data: None |
| 13 | Keep exploring | heading, copy; cards/links ×8 | I/C/S, G/T for applicable links; seller-only data: None |
| 14 | Browse by topic | heading, copy; cards/links ×15 | C/S, I; G/T where linked |
| 15 | Ready to write your case study? | heading, copy; cards/links ×2 | I/C/S or G/T for links; seller metric/record: None |

### `frameworks-comparison.html` → /frameworks-comparison

Available fields: guide and glossary source text where relevant; framework scorecard table: none.

Current page gaps: Raw seller HTML is served; scorecard, seller claims and links have no corresponding data.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Validation frameworks compared | heading, copy; image ×2; cards/links ×2 | I/C/S or G/T for links; seller metric/record: None |
| 2 | TL;DR | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 3 | Best fit by stage (weighted) | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 4 | Framework scorecard | heading, copy; table ×1; cards/links ×7 | I/C/S or G/T for links; seller metric/record: None |
| 5 | When to use which | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 6 | The 7 frameworks in depth | heading, copy; cards/links ×7 | I/C/S or G/T for links; seller metric/record: None |
| 7 | How frameworks are evolving in 2026 | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 8 | All 7 frameworks · ~2 minutes · cited sources | heading, copy; cards/links ×1 | I/C/S or G/T for links; seller metric/record: None |
| 9 | Frequently asked questions | heading, copy | S.faq, I.faq; site-wide source: None |
| 10 | Related comparisons | heading, copy; cards/links ×9 | I/C/S, G/T for applicable links; seller-only data: None |
| 11 | Browse by topic | heading, copy; cards/links ×8 | C/S, I; G/T where linked |
| 12 | Keep exploring | heading, copy; cards/links ×8 | I/C/S, G/T for applicable links; seller-only data: None |
| 13 | Explore Our Free Startup Tools & Resources | heading, copy; tabs/buttons ×3; cards/links ×3 | G/T; I/C/S for related links |
| 14 | Validate your idea in about 2 minutes | heading, copy; cards/links ×1 | C/S, I; G/T where linked |

### `open-source.html` → /open-source

Available fields: open-source ledger table: none; related guides and published ideas only.

Current page gaps: Raw seller HTML is served; repository directory and seller links have no corresponding data.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Is Your Idea Already Built? | heading, copy; image ×1; cards/links ×3 | C/S, I; G/T where linked |
| 2 | TL;DR • open source alternatives • as of August 2026Before you build, check whether a main | heading, copy; cards/links ×4 | I/C/S or G/T for links; seller metric/record: None |
| 3 | n8n (`#oss-search`) | heading, copy; search/input ×1; tabs/buttons ×8; cards/links ×139 | I/C/S, G/T for applicable links; seller-only data: None |
| 4 | Five ways to read this dataset | heading, copy; cards/links ×5 | I/C/S, G/T for applicable links; seller-only data: None |
| 5 | Licence rules, head-to-heads and the distribution gap | heading, copy; cards/links ×9 | I/C/S, G/T for applicable links; seller-only data: None |
| 6 | Saturation verdict by category | heading, copy; cards/links ×37 | C/S, I; G/T where linked |
| 7 | The 5-step open source competition check (`#playbook`) | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 8 | How to compete when a free version already exists | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 9 | Open source competition: common questions | heading, copy | S.faq, I.faq; site-wide source: None |
| 10 | Explore the open source database | heading, copy; cards/links ×29 | I/C/S or G/T for links; seller metric/record: None |

### `research-1.html` → /market-research

Available fields: published guide/article text; market-research report/benchmark table: none.

Current page gaps: Raw seller HTML is served; market-report form, benchmarks and seller links have no corresponding data.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Market Researchin minutes, not weeks | heading, copy; search/input ×1; tabs/buttons ×3 | C/S, I; G/T where linked |
| 2 | Three Simple Steps to Your Market Research Tool | heading, copy | C/S, I; G/T where linked |
| 3 | Why Use Our Market Research Tool? | heading, copy | C/S, I; G/T where linked |
| 4 | Key Statistics & Benchmarks | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 5 | Frequently Asked Questions | heading, copy; tabs/buttons ×8 | S.faq, I.faq; site-wide source: None |
| 6 | Continue Your Journey | heading, copy; cards/links ×4 | I/C/S, G/T for applicable links; seller-only data: None |
| 7 | Startup Resources Every Founder Needs | heading, copy; cards/links ×19 | G/T; I/C/S for related links |
| 8 | Ready to Research Your Market? | heading, copy; cards/links ×1 | C/S, I; G/T where linked |
| 9 | Deeper answers founders ask for | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 10 | How do you prepare data for an AI market research report? (`#deep-dive-0`) | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 11 | How much does AI market research cost compared to traditional agencies? (`#deep-dive-1`) | heading, copy | C/S, I; G/T where linked |
| 12 | What are common mistakes when using AI for market research? (`#deep-dive-2`) | heading, copy | C/S, I; G/T where linked |

### `research-2.html` → /failed-startups/india

Available fields: failed-startup case-study table: none; related guides and published ideas only.

Current page gaps: Raw seller HTML is served; 87 seller case cards, figures and links have no corresponding data.

| # | Seller section (DOM order) | Components in order | Our source / gap |
|---:|---|---|---|
| 1 | Failed Startups in India: 25+ Case Studies & Lessons | heading, copy; image ×1; cards/links ×2 | I/C/S or G/T for links; seller metric/record: None |
| 2 | On the "90% failure rate": this figure is an external estimate widely cited for India (typ | heading, copy; cards/links ×1 | I/C/S or G/T for links; seller metric/record: None |
| 3 | Startup Ecosystem Overview | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 4 | Failures by Industry | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 5 | Failure Reasons: India vs Global Average | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 6 | Cultural & Regulatory Factors | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 7 | The 4 Verdicts on India | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 8 | Ecosystem Eras | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 9 | Sectors to Watch in India | heading, copy | I/C/S, G/T for applicable links; seller-only data: None |
| 10 | Forward Predictions | heading, copy | I/C/S or G/T for links; seller metric/record: None |
| 11 | Capital raised before shutdown — India | heading, copy; image ×24 | I/C/S, G/T for applicable links; seller-only data: None |
| 12 | Failed Startups (87) (`#case-studies`) | heading, copy; image ×87; search/input ×1; cards/links ×87 | I/C/S, G/T for applicable links; seller-only data: None |
| 13 | Lessons for India Founders | heading, copy; tabs/buttons ×1; cards/links ×1 | I/C/S, G/T for applicable links; seller-only data: None |
| 14 | Frequently Asked Questions | heading, copy | S.faq, I.faq; site-wide source: None |

### `menus.html` → shared header/footer

Available fields: TAXONOMY and approved route registry; categories/subcategories for real links.

Current page gaps: The shared `V2Frame` A helper falls back to `href="#"` when no route is supplied.

Header/menu chrome: logo; Validate, Learn and Free Tools mega menus; pricing, search, login and report actions; mobile navigation; footer route groups. Fill from C/S, I and G/T only.

## Derived page families

- `/lists/<slug>`: seller list top-card order; `subcategories.intro`, `how_to_choose`, `faq`, `ideas.*`, related subcategories and counts. Remove static report/watch/author claims without matching rows.
- `/category/<slug>`: reuse list structure until category seller page exists; `categories.name`, `subcategories.*`, published `ideas.*`, database FAQ.
- `/idea/<slug>`: use the `/lists/<slug>` top-card layout until an idea page is supplied; `ideas.*`, `ideas.faq`, related published ideas and subcategory.
- `/browse`, calculators, guides, glossary, blog, founder stories, India guides and policy pages: no matching purchased body HTML in `src/bought/`; record the missing counterpart and do not claim side-by-side parity.

## Global link audit

- Replace every seller URL and unsupported CTA with an approved real route backed by I, C/S or G/T. Do not use `href="#"` or a disabled button.
- `src/components/v2/frame.tsx` has a `NO_LINK = "#"` fallback. Remove it when all menu entries have real destinations.
- Raw seller pages above remain unconverted and must not be called done.
