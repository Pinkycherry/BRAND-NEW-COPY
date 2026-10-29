# Pinky 2 — Master Execution Artifact
**BusinessIdea.io · 2026-10-30 02:47:18 IST**
**Status: plan/source audit committed; no page code changed in this planning commit.**

This is the running handover artifact. **Update it at every implementation commit** with what changed, why it benefits the user, tests actually run, deployment evidence, before/after page URL or screenshot when available, defects still open, and the next task. Keep `ARTIFACTS/WORK_LOG.md` updated at the same commit boundary. Do not delete the original seller archive.

## 1. Founder product rules

- **No Gemini.** The provider set is ChatGPT, Claude, Grok and Perplexity only. Do not add other providers to the provider selector, menus, prompt links, help pages or seller-page reconstructions unless the founder changes this rule.
- BusinessIdea.io is a **founder workspace and prefilled-prompt handoff**, not an AI-credit platform. Do not call a paid AI model API from this journey and do not simulate a BBI-generated AI report.
- Preserve the existing URL-prefill handoff. `src/lib/validate.functions.ts` already URL-encodes the prepared prompt for each of the four providers. When the user has access and the provider accepts the URL format, the destination opens with the prompt prefilled. **Prefilled is not submitted**; the user remains in control of sending it.
- A founder's shortlist, local constraints and decision notes should live in browser `localStorage`, not in the BusinessIdea.io database. Provide remove/export/clear actions and explain that browser data/device changes can remove local state.
- Use published business-idea records read-only. Never mutate production database rows/schema for these features.
- Seller source files under `src/bought/` are an archive. Keep them unchanged. Do not serve them raw as final routes: the embedded seller name, brand, logo, images and seller-only claims must not leak into our site.
- Do not use the seller's name, logo, images or branded assets in the rebuilt site. Rebuild our own React pages from the purchased written material and information architecture.
- Do not publish unverified counts, made-up case studies, false “verified” badges, unsupported scores, seller-only credit/API promises, or dollar/euro/pound figures. Validate the source claim before using a number.
- Do not rewrite the founder's original articles, authored guides, existing calculators or glossary in this pass. Concentrate on Codex-created decision pages, workbenches and purchased seller page families.
- Keep preview routes/assets noindex. Never start a local server or create branches/PRs. Use the approved `main` workflow. A commit or green build is not proof the deployed route is healthy.

## 2. Purchased seller pages: source material versus current gap

These source files were inspected. They already contain substantial written sections, directories and interaction concepts; current BBI routes often expose only a fraction of that value.

| Seller source file | What the purchased source contains | What our current route is missing |
|---|---|---|
| `src/bought/home.html` | Main validation landing/workbench, text input, file-upload affordance, sample multi-step report and paths into tool families. | `/product` is mainly explanatory. Rebuild the decision flow as an actual prompt workspace; do not claim BBI creates a model report. |
| `src/bought/lists.html` | Situation-based filtering, shortlist-ideas journey and a next-step path from discovery to validation. | `/browse` has real DB filters, but no shared shortlist that travels into comparison and validation. |
| `src/bought/tools.html` | Large tool directory by journey stage and category. Seller headline totals need verification. | `/tools` searches a small number of working calculators and worksheet links; it lacks the bigger categorized directory. |
| `src/bought/templates.html` | Persona, validation interview, competitor analysis, validation pack, business plan and pitch-deck template families. | `/templates` is currently a six-link directory, not a real template pack. Create actual editable/copyable/downloadable outputs before promising them. |
| `src/bought/research-1.html` | Market research workflow: describe market, analyze, get a report. | `/market-research` mostly lists guides. Rebuild as a source-led research brief + prefilled prompt, not a pretend BBI research engine. |
| `src/bought/research-2.html` | India failure-research themes, sectors, periods, failure causes and case-study pathway. Internal headline counts are inconsistent; some aggregate claims need checking. | `/failed-startups/india` is currently four links. Build an attributable failure explorer, not an unverified statistics page. |
| `src/bought/case-studies.html` | Case-study structure, filters, failure/validation patterns and outcome narratives; source claims real founders and aggregate outcomes. | Current React data marks all five available entries as placeholders and filters them out. No fictional “verified” stories. |
| `src/bought/frameworks-comparison.html` | Seven established methods with comparison, scorecard and use-case sections. | `/frameworks-comparison` mainly links to guides. It needs an actual side-by-side comparison and an “apply this method to my idea” action. |
| `src/bought/open-source.html` | Search/filter directory of open-source projects with category, licence and maintenance themes. Headline totals/currentness require checking. | `/open-source` is a three-link hub. Rebuild the directory from inspectable records; do not state unchecked totals or statuses. |
| `src/bought/faq.html` | Broad product FAQ: onboarding, validation, privacy, report generation, credits, accuracy and troubleshooting. Some items apply only to the seller's product. | `/faq` currently searches general idea-library questions, not our product help model. Replace seller-specific promises with true BBI help and keep only useful general answers. |
| `src/bought/topics.html` | Intent-based groups for validate, learn, plan, numbers, compare, failure, ideas and tools. | `/topics` mainly groups guides. Make it an action/decision hub rather than another article directory. |
| `src/bought/menus.html`, `src/bought/menu-panels.json` | Seller navigation and menu panels. | Information-architecture reference only. Do not copy seller branding or edit shared header casually; it has a large blast radius. |
| `src/bought/serve.ts` | Helper for serving purchased raw HTML under our header/footer. | Do not use as the final route technique because embedded seller branding/assets/claims could leak through. Port to our own React implementation. |

Original source files remain in Git unchanged. This commit changes only documentation.

## 3. Page-by-page rebuild plan

Each row says **page, current value, planned practical improvement**.

| Priority and page | Current value | Practical rebuild |
|---|---|---|
| **P0 — `/browse`, `/lists`, `/blueprints`** | Real database-backed browse filters and published idea records already exist. | Add a browser-local shortlist of up to four published idea slugs. Preserve search/filters/paging; add/remove/clear selection and “Compare selected” when two or more are chosen. No invented idea records. |
| **P0 — `/idea/:slug` and `ValidateButton`** | The real idea detail uses published data; ValidateButton already creates a source-specific prefilled prompt. | Add an “Add to shortlist” action linked to the shared local selection. Carry the real idea fields and current local constraints into the provider prompt. Preserve the four current providers. |
| **P0 — `/product`, Validation Workbench** | Mostly a theory/explainer page with redirect links. | Turn into a useful workspace: shortlist summary; optional location, rupee limit, weekly hours, skills, buyer and preferred language; task choice (validate one, compare selected, challenge assumption, draft a field test); visible prompt preview; four prefilled provider actions. No BBI AI API call. |
| **P0 — `/startup-idea-comparison`** | Source declares state for idea names/choices/notes, but visible page uses a ReadOnlyChecklist instead of a real comparison form. | Compare two to four selected published records side-by-side using fields the data actually contains, plus personal constraints. Generate a comparison prompt. No artificial winner or success probability. |
| **P0 — `/startup-idea-validation`** | Good interview/evidence content, but the declared buyer/problem/workaround/offer states are not exposed as real form fields; visible UI is checklist-style. | Build a practical validation brief, completeness status, buyer-interview script and prefilled prompt tied to the selected idea. Keep the authored long guide separate. |
| **P1 — `/startup-launch-plan-india`** | Four useful gates but no local remembered progress or obvious single unanswered step. | Turn the gates into a local stepper. Surface the next unresolved gate; carry selected idea/context to the real next tool. Mark visits separately from evidence collected. |
| **P1 — `/founder-decision-journal`** | Source has entry state/function, but visible UI is a read-only checklist and temporary React state disappears on reload. | Real entry form, local timeline, edit/remove, export and clear. Record claim, source/date, observed result, counterevidence, decision and review date; no server write. |
| **P1 — `/business-idea-time-fit`** | Situation tabs change guidance, but the time ledger shows prompts rather than calculating capacity. | Actual hours ledger for available/protected time, setup, each order, admin and buffer. Show required/remaining hours, not a made-up viability score. |
| **P1 — `/business-demand-test-india`, `/first-customer-india`** | Strong advice but the user's real test/script is still spread across explanatory sections and links. | Generate a copyable field brief from buyer, last occurrence, workaround, defined offer, price, delivery date, channel and evidence to record. Add review date and prefilled “challenge this test” prompt; never send outreach automatically. |
| **P1 — `/business-models-india`** | Already provides a real interactive comparison of service, product/stock, subscription, marketplace and licensing models. | Keep the existing selector. Add an option to apply the saved idea/context to those patterns and generate a provider-ready prompt. Do not rebuild useful logic from scratch. |
| **P1 — `/tools`** | Directory of working calculators and read-only worksheets, plus search. | Reconstruct the purchased tool-directory structure with categories and real outgoing URLs. Label each record as external tool, working BBI calculator, worksheet or template. Verify link/free-status and don't repeat unverified seller totals. Leave the founder's existing calculators alone. |
| **P1 — `/templates`** | Six links to other BBI pages; no genuine template payload is delivered. | Build BBI-owned editable/copyable template outputs: persona/interview, competitor matrix, validation brief, business-plan outline, pitch-deck outline. A download CTA only appears after its actual file exists. |
| **P1 — `/market-research`** | Mostly a list of research guides. | User-input research brief: market/geography, buyer, problem, alternatives, source URLs/dates and unknowns. Create a prefilled prompt for evidence/date citations and fact-versus-hypothesis separation; no claim of live BBI research. |
| **P1 — `/failed-startups/india`** | Four links to other guides; seller source includes more failure-research structure. | Source-backed failure explorer, filterable only by fields present in records. Each case needs source/date, failure mechanism, evidence quality, lesson and what remains uncertain. No invented counts or loss totals. |
| **P1 — `/case-studies`** | Five local entries are placeholders and are intentionally filtered out. | Verify each seller case individually. Publish only traceable cases with source links and limitations; clearly label composites or leave them outside “verified case studies.” |
| **P1 — `/open-source`** | Only a few related links, despite a bought searchable directory source. | Filterable project directory with original source URL and verified licence/maintenance fields where available. Do not echo unverified totals or stale “active/dead” labels. |
| **P2 — `/frameworks-comparison`** | Mostly a directory of existing guides. | Genuine method matrix: problem it helps answer, evidence needed, steps, limits and suitable stage. Let founder apply one method to a saved idea and build a prefilled prompt. Cite original framework sources, no arbitrary weighted ranking. |
| **P2 — `/faq`** | Searches idea-library Q&A but doesn't clearly explain how our own workspace works. | Product help for shortlist, provider login/prefill, browser-local privacy, export/clear, published source records and limitations. Remove seller-specific credit/subscription claims. |
| **P2 — `/topics`** | Groups guides by topic. | Task-led discovery: find ideas, compare, validate, investigate competition, test demand, check cash/time, examine failures, use a template or record a decision. |
| **Verify — `/business-idea-pivot-or-stop`** | Rupee cash-boundary calculation and four diagnostic patterns; founder screenshot showed cards stretched vertically. A source patch exists, but live visual closure is still pending. | Verify deployed desktop and phone geometry before calling the defect fixed. Avoid disturbing useful logic. |

**Protected work:** Original articles, guides, calculators, glossary and their URLs remain intact. Use them as supporting material; do not regenerate them as duplicate content.

## 4. One-week seller-package recovery sequence

| Day | Work | Exit test |
|---|---|---|
| **Day 1: source transfer map** | Complete page/file inventory, preserve originals, map each seller source into a BBI route, flag forbidden assets and unsupported factual claims. | Source archive intact; transfer plan and provider/privacy rules written down. |
| **Days 2–3: core workspace** | Local shortlist, user constraints, idea carryover, real 2–4 idea comparison, validation inputs and provider-prefilled prompt generation. | From Browse, select ideas → Compare → review prompt → open one approved provider. No database write or BBI inference call. |
| **Day 4: progress stays with the user** | Real launch gates, time ledger, demand-test brief, first-customer script and local journal. | Inputs produce usable output; local persistence/export/clear work; no read-only checklist masquerading as a worksheet. |
| **Day 5: tool directory/templates** | Port tool categories and create actual editable/copyable template deliverables. | Filters work, links have status, downloads exist, and seller assets/branding are absent. |
| **Day 6: research/data pages** | Rebuild market research, failure database, case studies, open-source directory, framework comparison, product FAQ and topics. | Every factual record has a source; no unverified totals or placeholders are called real. |
| **Day 7: end-to-end QA** | Check every changed route/control, links, all four provider prefill destinations, long prompt fallback, local state/export/clear, mobile 360/390px and desktop, seller asset exclusion, preview noindex. | Screenshots and QA outcome recorded; Vercel deployment checked. A commit alone is not deployment evidence. |

Local Indian context should be incorporated during porting wherever it affects a real decision; do not publish global unsupported claims “for now” and promise to fix them later. Use INR when money figures are necessary.

## 5. Acceptance rule: page must do a job

A title plus a stack of redirect links is not a finished page. It must deliver a real outcome:
- Select and compare published ideas using genuine data.
- Produce a transparent calculation from validated inputs (existing calculators are outside this pass).
- Generate a usable brief/script or local journal entry with copy/export/persistence.
- Search a source-backed directory with truthful metadata.
- Deliver an actual editable/downloadable template.
- Open a prefilled provider prompt that carries the chosen idea/context.

No dead anchors, empty buttons, invented stories, fabricated scores, generic placeholder outputs or “download” CTAs without files.

## 6. Current state and first implementation target

- This planning commit changes only documentation; no route, CSS, database or original seller file has been modified.
- The Pivot-or-Stop card-height source patch is in the repo; deployed visual QA is still outstanding.
- The end-user audit lives at `ARTIFACTS/END_USER_VALUE_AUDIT_2026-10-30.md`.
- **First implementation target:** build the reusable local shortlist/context foundation, then wire Browse/Blueprints → Compare → Validation Workbench. Do not start by adding more directory pages or rewriting existing authored content.
- Update this artifact and `ARTIFACTS/WORK_LOG.md` at every implementation commit. Send the founder the before URL and after URL, exact changed page URL, and honest screenshot/QA status. Do not lead with commit IDs.

## 2026-10-30 03:32:28 IST — Batch 1, page edit 1/5: Browse shortlist
- Added browser-local workspace storage and reusable shortlist/provider handoff components. The workspace stores only the user's shortlist/context in localStorage; it does not call or write to Supabase. Maximum shortlist is four published ideas. Provider list remains ChatGPT, Claude, Grok and Perplexity; prepared prompts are passed via URL query prefill with a copy fallback.
- Updated `src/routes/browse.tsx`: users can add/remove actual published records from the shortlist in result cards/table, see selected ideas, clear the list, and continue to comparison or validation. Original search/filter/paging and links are preserved.
- This is completion 1 of 5. Next: wire the same shortlist into the purchased blueprint library, then idea detail, comparison, and workbench. Validation/deployment evidence is recorded separately per completion; don't infer visual success from a push alone.


## 2026-10-30 03:34:55 IST — Batch 1, page edit 2/5: Blueprints shortlist
- Updated `src/routes/blueprints.index.tsx` so published legacy blueprints can be added to the same browser-local shortlist and removed/cleared from a visible selection panel. It shows the selected count and links to comparison when at least two are selected, otherwise to validation.
- Hardened shared workspace normalisation and provider handoff: safe object assignment for stored idea fields; visible prompt preview; direct provider-prefill links preserved, with a copy/open fallback for overly long URLs. The approved providers remain ChatGPT, Claude, Grok and Perplexity.
- Original published records and BBI-owned category imagery remain intact; seller source files/images are untouched. Count 2/5 complete; next is the shared idea-detail action.


## 2026-10-30 03:36:06 IST — Batch 1, page edit 3/5: Published idea detail
- Updated shared `IdeaArticle` so every published idea detail page can add/remove its actual idea from the same browser-local shortlist. The saved object includes available source fields (summary, buyer/revenue/cost fields when present, risks and first steps) and does not query or mutate the database.
- The idea-detail header now offers a next action to compare the saved shortlist once there are at least two ideas, or return to Browse to find another candidate. Existing ValidateButton and four provider-prefilled prompt paths remain unchanged. Count 3/5; next is making comparison itself a real interactive comparison.


## 2026-10-30 03:38:18 IST — Batch 1, page edit 4/5: Real comparison workspace
- Replaced the two read-only checklist panels in `/startup-idea-comparison` with an actual two-to-four idea comparison sourced from the browser-local shortlist. The table only displays saved/published fields; missing information is visible as a research gap, not filled with invented claims.
- Added five evidence lenses with idea choices and notes, a next action/review field, and a four-provider prefilled prompt carrying the selected records and personal context. No BBI AI API and no database writes. Count 4/5; next is the central Validation Workbench.


## 2026-10-30 03:40:00 IST — Batch 1, page edit 5/5: Practical Validation Workbench
- Rebuilt `/product` into the core founder workspace. It now shows/adds/clears the browser-local shortlist, captures location, INR budget, weekly hours, skills, buyer, language, recent problem, existing workaround and proposed offer; offers four real tasks; and prepares a source-conscious prompt for the four approved providers. All saved constraints use localStorage; no BBI AI/API call or database write.
- The prompt includes the selected published record(s), constraints and user-written task notes. The provider composer opens prefilled where the URL format is accepted; the user presses send in their account. The provider component provides prompt preview and long-URL fallback. Count 5/5 page edits committed; live build/interaction/mobile verification remains the next gate.

## 2026-10-30 03:42:18 IST — Batch 1 deployment status
- Vercel combined status for the fifth page-edit commit `5d8d3a316d602852395741b44d6ab363f9a4588c` reports **success**: https://vercel.com/pinky12/bbinewcopy/7S2JyZpS8Z3hUtNAxNuWLAY8nhox. The earlier four page-edit commits also report Vercel success.
- The public browser tool cannot fetch `https://bbinewcopy.vercel.app/product`; direct HTTP lookup from the execution container also failed at DNS resolution. Therefore build/deployment status is confirmed, but rendered HTTP/SSR behavior, interactions and screenshots are not independently verified here. Do not treat visual QA as closed.
- Batch page edits 1–5 are committed. Next work should run browser QA for the five updated pages, then continue the next batch only after any failures are corrected.

## 2026-10-30 04:36:38 IST — Revised screenshot-led product/UX plan
- Founder supplied screenshots of the comparison matrix, list cards, cash-flow calendar and startup-cost ledger. Confirmed source diagnosis: comparison uses a compact local shortlist while requesting richer fields; the shared category/list TopCard uses large green/red sections, violet revenue/verdict styles and only one card action; utility pages repeat 48/64px section padding; provider component drops the prefill and opens a bare destination if the encoded prompt exceeds its shared URL threshold.
- Grok's consumer web prefill is supported via its query-link flow; its current release notes say prefilled prompts ask the user to confirm before sending. In current code, prompt URLs above 7,200 characters fall back to Grok's base URL, which can explain why users see no prompt. Preserve the prefilling design and make long-prompt handling provider-aware rather than opening a blank destination.
- Canonical revised plan: ARTIFACTS/PINKY_2_REVISED_EXECUTION_PLAN_2026-10-30.md. It lays out the next five page edits, subsequent India tool batch, card/spacing system, prompt and logo policy, and QA acceptance. This commit is documentation-only; no React/CSS/database/seller source is changed.
- Official brand guardrail: OpenAI and xAI guidelines do not support arbitrary effects on their logo marks. Use an elevated provider card, not a modified 3D logo asset. Record prompt polishing as a final release gate in the master plan.


## 2026-10-30 05:03:59 IST — Comparison source hydration and hybrid model decision
- Comparison rehydrates selected slugs using existing current-idea and blueprint read-only sources. Missing fields are summarized once per selected idea and sent in a compact provider-safe comparison prompt. The full prompt remains reviewable/copyable.
- Provider handoff removes “your AI account.” It uses brand icon components present in the dependencies for ChatGPT, Claude and Perplexity; Grok is shown with a clear text mark until its official asset is added unmodified. Overlong links visibly instruct the user to copy first, instead of pretending the prompt was prefilled.
- Founder requires sign-in for full idea details and validation, with category taxonomy and public educational resources remaining public. The revised plan records protected-data, Supabase RLS and Google OAuth configuration requirements.
- Hybrid model recorded: provider deep links for no BBI inference cost; optional OpenRouter BYOK in-platform mode with encrypted server-only credentials, per-user rate/usage limits and delete/disconnect. Consumer subscriptions do not automatically cover separate API use. The two-device limit requires custom logic; built-in Supabase single-session is a one-session feature.
- Code edit 1/5 in the screenshot-led batch: startup-idea-comparison. Full source fields, mobile comparison cards, grouped gaps and compact provider prefill are implemented in source. Build/live rendering still needs verification.


## 2026-10-30 05:08:07 IST — Repair following failed Vercel check
- The first comparison/handoff edit triggered a failed Vercel status. A static source review found raw-string generation had left backslashes before TypeScript template literal delimiters/interpolations in `buildProviderHandoffPrompt` and the comparison route. Removed those literal escapes from the affected TypeScript source.
- This is a corrective commit for page edit 1/5, not a new page edit. Keep the page-1 deployment and visual QA open until Vercel returns success and the rendered route is checked.


## 2026-10-30 05:12:16 IST — Screenshot-led batch, page edit 2/5: List cards and comparison tray
- Shared TopCard/MoreCard renderer used by category, subcategory and focused-list routes now has neutral surfaces and three actions per idea: Read full idea, Add to compare, Validate this idea (links to the detail page validation section). Conditional sections only render when source values exist.
- Added global comparison tray in V2Frame for routes without their own shortlist panel: all selected titles, remove one, Clear all and Compare selected. Mobile uses a two-column tray and safe-area bottom offset; main content has reserved space while visible. Browse, Blueprints, Product and Comparison hide the global tray where inline panels already exist.
- Vercel check for the preceding comparison edit failed because template-literal escapes remained in the generated source; a repair commit is made and its fresh Vercel check succeeded. This second edit must also pass Vercel and live layout checks.


## 2026-10-30 05:14:40 IST — Founder clarification: BYOK/API is not implementation scope
- OpenRouter API mode, user API-key entry/storage, and in-platform inference are future-option planning only. No key-entry UX, credential schema, vault/API proxy, or API inference code should be implemented until the founder decides after the deep-link workflow is complete.
- The active work continues with deep-link handoff, list actions, mobile shortlist continuity, validation prompt UX, India-focused tools and sign-in/route policy. Keep future API feasibility documented, not deployed.

## 2026-10-30 05:14:40 IST — Screenshot-led batch, page edit 3/5: Browse interaction
- Browse now uses the shared persistent tray rather than placing its only full shortlist block far below the idea picker/table. The tray is available during search/filter and scroll. Removed the duplicate local shortlist panel.
- Top picker cards and table rows now have explicit Read full idea, Add to compare and Validate this idea controls. Validate anchors to the detail page validation section.
