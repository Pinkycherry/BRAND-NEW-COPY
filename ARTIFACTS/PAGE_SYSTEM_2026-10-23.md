# BusinessIdea.io page system — content and composition before cross-links

**Pinky 1 · 23 October 2026 IST.** Intended domain `businessidea.io`; preview `bbinewcopy.vercel.app`; implementation in `Pinkycherry/BRAND-NEW-COPY` main. Read PINKY_1_SITE_BUILD.md, SOURCE_BRIEF_2026-10-22.txt, REFERENCE_PAGE_ARCHITECTURE_2026-10-22.md, SEO_URL_FRAMEWORK_2026-10-23.md, BUTTERFLY_EFFECT.md and WORK_LOG.md before an edit. This is a build contract, not a list of already completed features. The preview and all assets stay noindex until the founder authorizes release on the real domain.

## Founder correction and design constraint

The founder rejected a pattern of oversized headlines, thin paragraphs, large empty intervals and generic link cards. Build full pages and useful content first. Add cross-page links at moments where the subject creates a genuine next question. A link module is not a substitute for the section that should answer the current question. Use India-specific decisions and plain, authored language; no competitor copy, invented market figures, fake founder stories, unsupported tool output or AI-filler paragraphs.

### Density and visual rules for implementation

- At a 1363px viewport, the page canvas can reach 1320px, but prose stays 58–75 characters per line. Use the remaining width for a worked example, checklist, source image, cost worksheet or in-page navigation, not empty columns.
- Editorial H1 normally 48–72px desktop and 36–48px phone; H2 normally 30–46px desktop and 27–36px phone. Reserve larger scale for a deliberate hero, and do not repeat it at every section. Body 16–18px with comfortable line height.
- A major section should generally have a useful answer, example, choice, calculation, image or specific next action; it should not be an eyebrow + huge heading + one sentence. Remove sections that cannot yet support substance.
- Adjacent sections need clear continuity and varied rhythm: a lead with supporting proof, a practical worksheet, an editorial split, then a dense source list or readable long-form. Avoid identical rows of three generic cards. Typical desktop section padding 48–88px, responsive to actual content; avoid repeated 112px gaps.
- Art must serve the topic: original category WebPs, post and guide featured images, or a small CSS diagram conveying an actual process. Alt text names what the image depicts. No placeholder portraits, fake scores or decorative giant symbols.
- Motion is progressive enhancement: content visible without animation, reduced-motion respected. On phone, stacks are intentional; horizontally scrolling choices retain clear affordance, 44px targets, no clipped cards or horizontal page overflow.
- One H1; descriptive slug and title; H2 is the question or subject answered below, H3 divides the answer. Natural business idea, startup idea, founder, India terms where relevant. Preserve legacy slugs and source titles. All preview routes and images remain noindex.

## Existing page-family inventory and build order

| Family and current route | Current state (23 Oct) | Page to build before promoting links |
|---|---|---|
| Home `/` | Glass redesign with some substantive sections; oversized type and sparse intervals need review | A guided starting point, actual source idea selection, category image rail, explanation of published vs planned, proof workflow, source-backed reading, current tools, FAQ, full footer |
| India starting point `/business-ideas-india` | First route live; section geometry repaired, content still relatively thin | Personal constraint choice, how to research local buyer, cost/risk worksheet, real pathway examples, evidence tests, four-model research context, FAQ |
| Browse `/browse` | Searchable approved taxonomy, 100 categories and ten subcategories each | Intent filters, category imagery and description, category-to-path disclosure, how to tell mapped versus published, selected source idea journeys, buyer/budget orientation |
| Category `/category/:categorySlug` | Approved category path and art; sparse | Specific promise and image, work/location/skills fit, ten pathways, cost and buyer checks, completed source matches only when verified, two useful guides |
| Subcategory `/category/:categorySlug/:subcategorySlug` | Route and truthful empty state; assignment gaps | Specific explanation, published ideas when mapped, comparison dimensions from actual fields, first buyer and cost questions, other routes; do not fabricate ten cards |
| Published library `/blueprints` | Searchable 879 completed source records; separate from new taxonomy | Query and topical browsing, honest record count, meaningful preview summaries, source image where mapped, reading method, concrete next step |
| Idea `/idea/:slug` | Source fallback/detail pages with original slug, four-provider Validate button | 12-15 **evidence-bearing** modules: summary, customer, demand, work, revenue, costs, unit economics when source data exists, competition, risks, first 30 days, validation, alternatives, source links, FAQ, final decision. Conditional modules when missing data, no fake metrics |
| Guides `/startup-guides`, `/startup-guides/:slug` | 20 original guides with featured WebPs and mid-read paths; index sparse | Decision/topic entrance, source guides with summaries/images, process grouping, reading rail, examples/worksheet sourced from text, conclusion and related specific tool |
| Journal `/blog`, `/blog/:slug` | 23 original posts, featured WebPs, reading rail; index sparse | Original authorial posts/images, search/topic orientation, excerpts, full article preserved, useful follow-up grounded in article topic |
| Calculator `/calculator`, `/calculator/:slug` | Working live-input tools; hub and detail sparse | Tool selection by question, source assumptions, inputs, formula, interpretation, scenario variants, limitations, worked example, relevant idea/guide |
| Glossary `/founder-glossary` | 159 source terms searchable | Topic clusters, actual terms/definitions, examples and formula where supplied, one practical application |
| Resource/tool hubs `/learning-resources`, `/useful-tools` | Existing content/wrapper; shallow | Curated journeys from problem to source guide/tool/idea, available-now labels, no dead tool links |
| Human trust `/about`, `/founders`, `/contact` | Glass editorial with source people/method; route-specific depth varies | Editorial method, authorship, limits, correction/contact channels and explicit user next step |
| Access `/pricing`, `/services` | Services truthful rewrite, pricing brief | Exact current free access, four-provider external usage boundary, tools available now, absent paid/automated promises, FAQ |
| Policies `/privacy`, `/terms`, `/cookie-policy`, `/gdpr`, `/refund-policy`, `/disclaimer` | Source copy preserved; most glass editorials | Specific truthful documents, readable hierarchy and update date; no marketing detours inside legal answer |
| Sitemap `/sitemap`, `/sitemap.xml` | HTML older renderer; XML empty by SEO hold | Public navigation index on existing routes only. Avoid importing glass-editorial in HTML sitemap until SSR 500 root cause resolved |
| Founder stories `/founder-stories` | Existing source routes | Publish only real attributed records; no invented case studies or testimonials |
| Sign in `/sign-in` | Existing auth | Keep real auth states and honest current benefit; no faux dashboard promise |

## Distinct BBI pages to implement with real depth

The next new pages must stand alone before being linked widely in header, footer or repeated panels. Do not create empty destinations. Proposed canonical slugs can change before public release, but preserve any route once linked.

### 1. `/startup-idea-validation` — “Before the business becomes a bill”

**Intent/H1:** How to validate a startup idea in India. A practical field guide tied to the existing Validate button. **Composition:** compact hero with a real six-step field card; a working notebook, not a score screen.

1. Name one buyer and their last costly workaround. Show the distinction between a buyer and a compliment.
2. Make a falsifiable claim about frequency and willingness to pay; text input is browser-local if added.
3. Collect five conversations as a method, without inventing results or claiming five is a universal threshold. Give neutral interview prompts and a response log.
4. Test a concrete offer with a small, reversible action; disclose consent and avoid fake commitments.
5. Price and costs: enter assumptions in the live calculator, distinguish margin from cash timing.
6. Research counterevidence with Claude, Perplexity, ChatGPT or Grok using the existing prepared prompt on a completed idea; external provider rules apply.
7. Decision: proceed, change the offer, or stop based on the evidence the reader actually collected. No algorithmic verdict.
8. Example worksheet using a clearly labelled illustrative scenario, no invented market data; printable or copyable text only if implemented.
9. Reader questions and a concise existing-guide/blueprint connection.

### 2. `/business-models-india` — “How this business earns”

**Intent/H1:** Business models for an India-first startup idea. **Composition:** comparison studio with a sticky model selector and a visible cost/revenue diagram, not generic tiles.

1. Frame the choice: who pays, when they pay, and who carries the working-capital risk.
2. Real models: service, product/inventory, subscription, marketplace/commission and licensing; plain definitions, not ranked trend claims.
3. Interactive two-model comparison with concrete fields: first customer, delivery work, recurring cost, cash collection, return/refund exposure, operational bottleneck.
4. A rupee-flow example labelled hypothetical with editable inputs; the arithmetic is transparent.
5. Where people go wrong in India: credit cycles, COD returns where relevant, local fulfilment and owner time; careful, non-universal language.
6. Evidence needed before choosing each model; exact interview and small-test prompts.
7. Point to completed source blueprints and calculator after the comparison, with category links only where mapping is verified.
8. FAQ and final “take this into an idea page” action.

### 3. `/startup-costs-india` — “What the first month really costs”

**Intent/H1:** Estimate startup costs for a small business idea in India. **Composition:** actual calculator embedded or directly reused with a month-one ledger, not a static prediction.

1. One-time vs monthly costs, cash tied up in stock, customer credit and personal runway.
2. Editable rows or existing calculator route, visible formula and assumptions.
3. Worked hypothetical comparison, not asserted market price.
4. Three scenarios from the reader's own inputs, break-even relationship, buffer.
5. Hidden costs and a decision on how much to risk before proof.
6. A route to a relevant guide and completed idea.

### 4. `/business-idea-research` — “The evidence desk”

**Intent/H1:** Research a business idea before launch. **Composition:** source ledger and question sequence, not a fake automated market report.

1. What a source can prove and cannot.
2. Local buyer evidence, competitor observation, price and distribution.
3. A reusable claim/source/date/counterargument table.
4. How to challenge an AI answer, verify citations and mark uncertainty.
5. Stop conditions, next experiment and relevant full blueprint.

### 5. `/founder-decisions` — “The founder's decision room”

**Intent/H1:** A decision map for first-time founders in India. **Composition:** choose the current constraint, then show the real route and short answer first; unlike The First Move, this is a reference hub for returning readers.

1. My idea, my numbers, my buyer, my time, my next test.
2. For each choice: one concrete decision, a source guide/tool, a finished idea example if mapped.
3. Glossary for terms that block action, current progress checklist stored only when real persistence exists.
4. Honest boundary of available tools and support.

## Cross-link contract after pages exist

A page only gains a link when the destination is built, loads, answers the promised question and preserves noindex. Place links at a semantic hinge: an idea's cost section → specific cost calculator; a guide's next experiment → validation page; a model comparison → matching completed idea; a glossary formula → actual calculator. Navigation can expose finished page families; unfinished work stays in this artifact, not a public menu. Link text names the question answered, never “learn more” repeated through every section.

## Implementation sequence and verification

1. Fix First Move's heading/body ratio and content density after founder's visual rejection; inspect screenshots across all sections, not only hero.
2. Build validation page as a complete original route with its own reusable field worksheet and accurate four-provider context; test content, controls, phone stack, noindex, SSR.
3. Build business-model comparison page and startup-cost journey with actual interactions.
4. Strengthen the existing browse/category/idea and knowledge indexes using source images/content; make internal links only after destinations pass.
5. Revisit home, shared header/footer and sitewide spacing *after* page families have substance. Check all routes sharing them.
6. Keep a public route/status table in WORK_LOG.md: designed, implemented, built, live-tested, image-audited, SEO-hold-verified. Screenshot after three to five edits, and when visual correction is requested. Green build alone is not a live SSR test.

## Twenty-four page collection — build sequence and real status

This is a page-first editorial route collection. It is a plan, not a claim that all routes exist. The first three are implemented and live-tested; remaining routes require page-specific content and QA before broad navigation links. Preserve old published URLs as additional entry points. Each page must answer a distinct founder decision with examples, useful input or a source-backed method, intentional composition, natural India business/startup language and the global noindex hold.

| Route | Founder question and designed anchor | Status |
|---|---|---|
| `/business-ideas-india` | Which business idea fits my actual constraints? Four starting choices, town/city context and next evidence. | Live; deepen |
| `/startup-idea-validation` | What would count as proof before I pay? Six-step field guide and local decision notebook. | Live; deepen |
| `/business-models-india` | How does this business actually make money? Five-model comparison and rupee worksheet. | Live; deepen |
| `/startup-costs-india` | What must I pay before my first sale? Cost ledger, deposits, tools, working capital and contingency. | Next build |
| `/first-customer-india` | Who will pay first and where can I meet them? Buyer map, outreach test and evidence notes. | Planned |
| `/business-idea-research-india` | What can I learn in my own street and search results? Local demand walk and competitor observations. | Planned |
| `/startup-idea-comparison` | Which two ideas deserve a fair test? Evidence-based side-by-side comparison. | Planned |
| `/business-idea-risk-check` | Which failure would hurt most? Personal downside and reversible experiment. | Planned |
| `/business-idea-time-fit` | Can this coexist with my job, caregiving and commute? Weekly capacity map. | Planned |
| `/side-business-ideas-india` | How do I start while earning elsewhere? Hours, boundaries and first sale plan. | Planned |
| `/local-business-ideas-india` | What does my neighbourhood need repeatedly? Catchment, channel and repeat purchase. | Planned |
| `/online-business-ideas-india` | When does online distribution actually help? Acquisition and fulfilment reality. | Planned |
| `/service-business-ideas-india` | How do I sell an ability before building a product? Scope, quote and delivery proof. | Planned |
| `/product-business-ideas-india` | What inventory and returns can I carry? Unit, stock and supplier decisions. | Planned |
| `/business-pricing-india` | What price survives all costs? Price ladder and scenario worksheet. | Planned |
| `/unit-economics-india` | Is one sale worth repeating? Contribution, capacity and break-even. | Planned |
| `/startup-cash-flow-india` | Will cash arrive before bills fall due? A timed cash calendar. | Planned |
| `/business-demand-test-india` | Does interest become a commitment? Conversation, pre-order and paid trial distinctions. | Planned |
| `/startup-launch-plan-india` | What belongs in the first 30 days? Week-by-week decision gates. | Planned |
| `/business-idea-pivot-or-stop` | When should I adjust or stop? Evidence thresholds and sunk cost check. | Planned |
| `/founder-decision-journal` | What did I actually observe? Browser-local dated decision record. | Planned |
| `/startup-terms-india` | Which terms matter for my next decision? Existing 159-term glossary organized by moment. | Planned |
| `/business-idea-reading-room` | What should I read next? Existing 20 guides and 23 posts grouped by decision, with original imagery. | Planned |
| `/business-idea-toolkit` | Which working tool answers this question now? Existing calculators and validation entry, with honest availability. | Planned |

### Collection order

Build the money chain first: startup costs, pricing, unit economics, cash flow. Then buyer/evidence chain and starting context; finally decision/reference compositions. Deepen the existing guide and blog indexes in parallel with links to completed pages. After each route, verify live SSR, interactions, phone layout, image/alt, metadata and noindex. Link it from neighbouring pages only once the destination is useful. Screenshots after every three to five edits.

## Verified progress checkpoint — 23 Oct 2026, 11:26 IST

| Route | Current observed state |
|---|---|
| `/business-ideas-india` | Live and desktop geometry repaired; further depth planned |
| `/startup-idea-validation` | Live interactive field guide; noindex |
| `/business-models-india` | Live comparison and rupee worksheet; noindex |
| `/startup-costs-india` | Live cash ledger; ₹61,000 sample arithmetic verified; result contrast fixed; noindex |
| `/business-pricing-india` | Live first-price worksheet; ₹1,000 planning floor and 12-sale fixed-cost break-even sample verified; noindex |
| `/startup-guides` | Live reading room, 20 image-backed source guides, working filter; noindex |
| `/blog` | Live journal, 23 image-backed source posts; noindex |

The remaining proposed routes in the twenty-four-page collection are still planned, not built. The original published idea, guide, blog, taxonomy, calculator and glossary routes remain separate live families. Desktop screenshots and arithmetic tests do not substitute for phone visual QA. Two original golden-tree PNGs are intentionally skipped per founder instruction.

### New live route — 23 Oct 2026, 11:37 IST

`/first-customer-india` is implemented and live-tested: trigger/workaround/payer map, three buying settings, conversation guide, signal ladder, tab-local evidence log, India delivery checks, FAQ and next paths. It is noindex. Guide and blog featured hero images were corrected to show their full original artwork and separate captions; pricing quote card corrected. Phone visual QA and deeper source-article copy review remain outstanding.

### Cash-flow route — 23/10/2026, 11:46 IST

`/startup-cash-flow-india` is live and browser-tested. With ₹3,100 opening cash, a ₹5,000 supplier bill, ₹8,000 collection, and ₹4,000 rent, dated balances are −₹1,900, ₹6,100, ₹2,100. The lowest balance is −₹1,900; the delayed-collections stress case is −₹5,900. The global noindex hold and desktop width check passed. The route is connected to the header, footer, cost and pricing pages. Mobile visual QA remains outstanding.

### Evidence desk — 23 Oct 2026, 11:56 IST

`/business-idea-research-india` is live: compact lead, neighbourhood/workplace/online selector, current alternatives, original guide image in a true 16:9 containment stage, editable claim/source/date/countercase rows, countercheck reveal, situational links, question note and FAQ. Browser QA confirmed state transitions, source artwork 1003×565 in a 682×384 stage, noindex, and no desktop horizontal overflow. The first visual pass exposed unnecessarily tall link cards beside a long section heading; CSS aligns cards to content. Contextual links added to first-customer and validation routes. Phone visual QA and broader article integration remain outstanding.

### Demand-test page — 23 Oct 2026, 12:07 IST

`/business-demand-test-india` implemented on main with three selectable commitment formats, a browser-local offer/audience/stop-condition slip, staged response counts with inconsistent-count warning, buyer and cash hooks, source journal artwork in a 16:9 containment stage, interpretation, FAQ and next decision. Verify Vercel, interaction, image, noindex and geometry before broad navigation integration. Mobile visual QA remains outstanding.

### Demand-test live QA — 23 Oct 2026, 12:12 IST

`/business-demand-test-india` deployed successfully and browser QA passed: booking selector changes the advice; 12 people shown the offer, five detail requests and two actions render “2 of 12”; noindex; 1363px viewport, 1348px document width; original journal artwork 1439×810 displayed in a 684×385 16:9 stage without cropping. A desktop screenshot exposed more vertical interval than needed between short sections, so the research and demand pages have tighter 1.8–2.8rem section spacing. Contextual hooks added to first-customer, research and validation. Phone visual QA remains outstanding.

### Two-idea comparison — 23 Oct 2026, 12:24 IST

`/startup-idea-comparison` implemented: two named candidates, five evidence lenses, choose stronger side or unclear per lens, editable observation notes, risk/cash questions, illustrated service-vs-stock example, original library artwork in 16:9 containment, one-week fair test, decision note and FAQ. No numerical verdict or fake winner. Await live deployment, interaction, noindex, image and geometry QA before contextual links.

### First Move repair — 23 Oct 2026, 12:33 IST

`/business-ideas-india` rebuilt at the exact section the founder flagged: the sparse “cost of a wrong start is personal” panel now pairs an answer with three useful cash, buyer and idea-comparison paths. Decorative hero orbit replaced by live decision links. Oversized hero and 5rem intervals reduced; the proof row points to completed blueprint, demand test and price workbench. All category artwork uses an uncropped 16:9 contain stage; the validation guide art replaces decorative text slips. Desktop and mobile type rules tightened. Live deployment, images, links and noindex need verification.

### Personal downside — 23 Oct 2026, 12:47 IST

`/business-idea-risk-check` implemented: cash-versus-time boundary worksheet, five selectable operating patterns and smaller tests, risk/contradiction/stop notebook, relevant original guide art in a full 16:9 stage, buyer and money hooks, FAQ. No universal score. Await Vercel and live QA before linking broadly. The First Move page meanwhile passed live desktop QA: noindex, 1280×720 category art at 426×240, no overflow; the selected-situation panel now has a tested working destination.
