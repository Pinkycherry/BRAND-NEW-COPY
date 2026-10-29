# Pinky 2 — Revised Product and UX Execution Plan
**BusinessIdea.io · 2026-10-30 04:36:38 IST**
**Status: planning/documentation only. No site code changed by this plan update.**

## The product we are building

BusinessIdea.io is an India-focused business-idea library connected to a practical founder workspace. The website helps someone find real published ideas, compare up to four of them, describe their actual constraints, and hand a carefully prepared prompt to **ChatGPT, Claude, Grok or Perplexity**. BusinessIdea.io does not run an AI-inference API for this workflow.

The central promise is not “read more startup articles.” It is: **choose an idea, understand the trade-offs, ask sharper questions, and leave with a useful next action.** Original articles, guides, calculators and glossary content are protected. Paid seller files stay in the repository as source material; their names, logos and images must not appear in the rebuilt site.

## Findings confirmed from the latest screenshots and source code

| Priority | What the user sees | What the current code indicates | Fix |
|---|---|---|---|
| **P0** | The comparison table repeats “Not included in this published record” for target buyer, revenue model, risks and first steps across several selected ideas. | Browse’s server query selects a compact set of card fields. The local WorkspaceIdea type saves those same short fields, but the comparison page tries to display richer fields that often were never carried into local storage. The table therefore confuses “not carried by the shortlist” with “not in the source record.” | Rehydrate each selected idea from the existing published source before comparing. Show actual available fields. If the source genuinely lacks a field, summarize the gaps and provide one “Research missing details for all selected ideas” action with the selected-AI choices below it. No invented buyer, revenue, risk, step, price or winner score. |
| **P0** | Grok sometimes opens without the prepared prompt. | The shared ProviderPromptActions component builds a URL-encoded prompt but uses a common 7,200-character URL threshold. Beyond that threshold it opens only the provider base URL, dropping the prompt. The four-idea prompt builder permits much longer text. This is a plausible direct cause of the empty Grok handoff. | Keep direct Grok prefill. Prepare a compact provider-safe handoff that still includes the selected idea titles, constraints, requested task and output. Test short and four-idea prompts. Never display “open with prepared prompt” if the link has dropped that prompt. Keep a full prompt preview/copy fallback for genuinely long briefs. |
| **P0** | The comparison table can become very wide; some wording says “your AI account.” | The selected ideas are rendered as table columns and become hard to scan at mobile widths. Shared copy uses “your AI account,” which the founder does not want. | Use a real desktop comparison table; on phones use comparison rows/cards that label the value by idea and avoid whole-page horizontal overflow. Replace “your AI account” with “selected AI tool” or the provider’s name. |
| **P0** | Idea-list cards look visually harsh: large green and red blocks, purple revenue/verdict elements, and only “Read this idea.” | The category route, focused-list routes and subcategory routes reuse the ListPageBody/TopCard renderer in src/routes/lists.$slug.tsx. The card currently uses saturated positive/risk panels and a single read action. | Rebuild the shared card once, then verify every route using it. Use calm neutral surfaces, one restrained blue/violet accent, clear risk/benefit labels, compact readable sections and three small but obvious actions: **Read full idea**, **Add to compare**, **Validate this idea**. |
| **P0** | Users select ideas, navigate away, and cannot always tell where their choices went or clear them in one click. | Shortlist selection is local, but a single persistent, always-visible tray has not yet been verified across all the layout families. | Add one reusable shortlist tray: “3 of 4 selected,” visible idea chips/titles, remove per idea, Clear all, and Compare. Keep it visible on desktop and mobile without hiding the page controls. Ensure it follows users across Browse, Blueprints, category/list routes, idea details, comparison and validation. |
| **P1** | The Validation Workbench has several long sections and inputs, but the sequence and outcome do not feel obvious. | The page has real local fields and four task modes, but does not yet give users a clear, ordered “select → describe → choose output → review → open AI” progression. “Evidence Desk” is vague when used without a plain-language explanation. | Give the user a visible four-step sequence. Rename vague actions to describe their outcome, e.g. “Build a buyer-research brief.” Add requested output choices and explain which outputs are supported by which provider, without promising that every account/tier can generate every file or image. |
| **P1** | Cash-flow and startup-cost pages feel spaced too far apart in the supplied screenshots. | The tool routes repeat section paddings such as py-12 / lg:py-16, equivalent to generous 48/64px vertical padding, across many adjacent sections. Both pages already contain real calculators and useful decision material. | Tighten repeated utility-page section spacing to about 32px phone / 40px desktop, retaining larger spacing for the main hero and the primary worksheet. Remove redundant sections before adding content. Place a few contextual next actions near the result area, not random filler in the gaps. Preserve the existing calculations. |
| **P1** | The first-customer/pricing/cash-flow tools risk being mistaken for simple articles. | Source review shows real interactions already exist: buyer-setting selection on First Customer, numeric price inputs and offer modes on Business Pricing, dated events and a delayed-collections stress case on Cash Flow, and a rupee ledger on Startup Costs. | Improve the instruction, result clarity, local continuity and layout around the existing working tools. Do not throw away calculations or rebuild these pages as static content. |
| **P2** | The example page suggests animated soft components, moving article/guide cards and a “Built with” strip. | These are useful visual references but not permission to reuse seller artwork or claims. | Create a reusable, original component system and a measured carousel; use only BBI-owned images and real content. Motion must pause where needed, allow touch navigation and respect reduced-motion settings. Only list technologies that are actually used in the site. |

## Execution rule for all batches

- **Five page edits per batch. One committed completion at a time.** After each completed page edit, update this master artifact, WORK_LOG.md and PENDING.md in the same commit. Do not wait until all five are done to record the work.
- Every page begins with the before URL. After the edit, provide the same canonical URL as the after link and a genuine before/after screenshot when one can actually be captured. Never fabricate a screenshot or claim live visual QA from a successful build alone.
- Work only in Pinkycherry/BRAND-NEW-COPY on main. Do not work in the reference seller repository. Do not edit/delete the source files under src/bought/. Do not mutate Supabase or production idea rows.
- Keep preview routes/assets noindex. Do not start or deploy a local server.
- Preserve the existing authored articles, guides, calculators and glossary. Keep seller brand names/logos/images out of the rebuilt pages.
- The allowed AI-provider set is ChatGPT, Claude, Grok and Perplexity only. No fifth provider. No BBI AI-inference call for this journey.
- Store the shortlist and founder constraints locally in the browser. Provide remove/export/clear where persistent data is introduced; explain that local storage is tied to that browser/device.
- A page is not complete until controls do what they say, source data is truthful, links work, mobile/desktop layout is inspected, noindex remains in place, and deployment/SSR has been checked.

## Next batch: five page edits, in this order

### Page edit 1 — Startup Idea Comparison
**Route:** /startup-idea-comparison

1. Hydrate the two to four selected slugs from the existing published idea data. Reuse current read-only source functions where possible; do not add a new production table or write to Supabase.
2. Map actual source fields into the matrix, including existing buyer/revenue/need/risk/verdict/cost/time/skill facts where present. Preserve source wording and identify genuinely absent fields accurately.
3. Stop repeating the same long “not included” sentence in every cell. Use a short neutral “Needs research” state and a visible list of which facts are missing.
4. Add a clear action labelled “Research missing details for all selected ideas.” It opens the four approved provider choices with one prompt containing all selected ideas, available source fields, founder context and the missing questions.
5. Keep the user's lens selections and evidence notes in the prompt. Remove “your AI account” language. No winner score.
6. Mobile: retain the side-by-side comparison intent without causing page-wide horizontal overflow. Use vertically readable comparison blocks or a clearly scrollable comparison region with a sticky first column only where it actually helps. Ensure the persistent shortlist tray does not cover the final action.

**Acceptance:** four selected ideas appear once each; full source fields arrive where they exist; only genuinely missing fields are flagged; the research action includes all selected ideas; the prompt is prefilled in the selected provider; mobile page itself does not overflow horizontally.

### Page edit 2 — Category and focused-list cards
**Routes:** /category/$categorySlug, /category/$categorySlug/$subcategorySlug, /lists/$slug

1. Rebuild the shared TopCard / ListPageBody card system so the footwear-and-bag category and every other category/focused-list page benefit consistently.
2. Reduce saturated green/red card fills. Keep meaningful “what you need” and “what hurts” content, but present it with restrained surfaces, consistent text contrast and small semantic accents. Make the revenue model and verdict visually subordinate to the actual business description and source evidence.
3. Add three real actions for every published idea: **Read full idea**; **Add to compare / Added to compare**; and **Validate this idea**. The validation action goes to that idea's detail validation section, where the user can add context before choosing a provider.
4. Enforce the four-idea maximum with an explicit message. Selected status follows the user as they navigate. The user can remove one idea or clear the whole shortlist in one click.
5. Verify that the list's source idea fields and image/link behaviour remain intact. Do not invent demand scores or change a score's interpretation without verifying its source.

**Acceptance:** at least one category route, one focused list and one subcategory route are checked; all three actions work at desktop and phone widths; selection visibly persists and clears; card color semantics and contrast are consistent.

### Page edit 3 — Browse ideas
**Route:** /browse

1. Keep existing search, category, investment, time and skill filters. Do not replace real query results with sample cards.
2. Put the shortlist in a fixed or sticky mobile tray above the safe-area bottom, and a compact visible desktop tray. It shows selected titles/count, Compare, remove and Clear all.
3. Add the same three idea actions in the results presentation. On small screens, keep the actions compact and easy to tap.
4. Add accessible “Back to top” and “Jump to ideas/compare” controls on the long page. Avoid floating controls covering search fields or cards.
5. Make it obvious that “Add to compare” saves locally and that the four selected ideas travel across routes.

**Acceptance:** filtered results remain accurate; no page-wide horizontal overflow at 360px/390px; tray never hides core controls; clear/add/remove are real actions.

### Page edit 4 — Blueprints
**Route:** /blueprints

1. Reuse the same card-action and shortlist behaviour as Browse. Do not create a second shortlist implementation.
2. Show the selected count and comparison/validation next action. If the data is a legacy published record, preserve its existing detail/Validate route.
3. On phones, avoid duplicating multiple control rows or making cards excessively tall. Keep the read action primary and comparison/validation secondary.
4. Ensure the shortlist limit and remove/clear state work from this page as well.

**Acceptance:** a blueprint can be added, selected state is visible, the same tray follows it, and the item appears in Compare after navigation.

### Page edit 5 — Validation Workbench
**Route:** /product

1. Present four clear steps: **Choose idea(s)** → **Add your constraints** → **Choose the output** → **Review prompt and continue**.
2. Retain explicit fields for city/market, state when known, available INR budget, hours, skills, target buyer, language, problem, workaround and proposed offer. Keep optional free text so users can write naturally, including comma-separated or mixed-language notes.
3. The prompt should be instructed to extract any clear budget/city/state/language/time/output constraints from the user's free text, distinguish facts from assumptions, and ask only concise high-impact questions when ambiguity would change the recommendation. Do not pretend the website has semantically interpreted the text before an external AI receives the prompt.
4. Add selectable outputs such as detailed report, step-by-step roadmap, HTML artifact/prototype, chart/infographic and image/visual concept. These are instructions to the external AI, not a guarantee that every provider or plan can create every artifact. Under the founder's current rule, image-generation choices are offered only with ChatGPT and Grok; verify each provider option before release.
5. Correct the shared prefill path. Current code opens the base provider URL when the encoded prompt crosses a common length threshold. Use provider-aware prompt compaction/length handling and preserve the direct prefilled link as the primary flow. Keep the full prompt preview/copy fallback and be honest when an extremely long prompt needs a fallback.
6. Replace “your AI account” and vague “Evidence Desk” labels with plain task-language and “selected AI tool.” Explain that BBI does not run the model or store the external result; the user still reviews and sends the prepared prompt.
7. Use recognizable provider marks only under each provider's brand terms. The card may have depth and lighting, but the supplied logo artwork itself must remain unmodified.

**Acceptance:** task and output options change the generated prompt; current shortlist and context are carried through; all four providers are available; long prompts do not silently lose their content; local storage/noindex remain in place; phone workflow is understandable without a long scroll back to earlier sections.

## Batch after that: five more page edits

| Page | Practical target |
|---|---|
| **6. Published idea detail** | Place validation beside the title and keep the hero action anchored to the validation section. Keep optional user context, task/output choices and four provider actions in that section. Make “Add to compare” visible beside “Validate this idea”; avoid implying an AI-generated verdict already exists. |
| **7. First Customer India** | Turn the buyer-setting selector into a usable buyer worksheet: buyer moment, decision-maker/payer, neutral interview questions, response/observation record, and a copyable interview/outreach script. Persist the founder's own notes locally with edit/clear controls. |
| **8. Business Pricing India** | Preserve the working inputs and formulas. Make the result easier to act on: direct costs, labour/time, fees, fixed-cost contribution and break-even meaning, with clearly marked assumptions. Add a copyable quote/test brief. Validate arithmetic before altering any formula. |
| **9. Startup Cash Flow India** | Preserve the dated event arithmetic and delayed-collection stress case. Tighten section intervals and reduce repeated card padding. Keep the main cash calendar prominent. Add nearby actions for startup costs, pricing and first buyer; optionally add local save/export only after checking data handling and formula behaviour. |
| **10. Startup Costs India** | Preserve the working rupee ledger. Reduce repeated vertical spacing, make the cash gap and monthly burden easier to scan on phone, and connect the result to the pricing/cash-flow/first-customer actions. No unrelated filler blocks. |

## Following batches

### Batch 3 — motion, tools and templates
- Homepage hero: use the “Plan / Test / Build” direction with original BBI composition, a clear Browse and Validate path, and no invented metrics.
- Learning Resources: slow, touch-friendly carousels of genuine BBI articles and guides. Pause for focus/hover where available and respect reduced motion.
- Technology strip: list only libraries/tools actually used. Do not use the strip as unsupported social proof.
- Tools directory: searchable and categorized using verified, real destinations.
- Templates: real editable/copyable/downloadable payloads before any download CTA appears.

### Batch 4 — source-backed research pages
- Business idea research: working research brief tied to the selected idea and local context.
- Failed-startup research: real source-backed case records, source dates and known limitations; no borrowed headline totals without verification.
- Case studies: verified, attributable cases only; keep placeholders out of any “verified” collection.
- Framework comparison: a real comparison matrix of method, evidence needed, steps, limits and suitable stage.
- Open-source directory / FAQ / Topics: each page must perform the task promised by its title rather than duplicate a guide directory.

## Section spacing and visual system

For dense utility pages, start with about **32px vertical section padding on phones and 40px on desktop** for the repeated middle sections. Keep roughly 48–64px only for a main hero or a deliberate major chapter. The current 48/64px repeated pattern should not be copied everywhere.

Do not fill an empty gap with unrelated cards. First remove duplicate explanation, cut unnecessary padding, and place the useful action immediately beside the input/result that calls for it. Keep a clear page rhythm with restrained alternating surfaces, readable line length and consistent card density. The cash-flow and startup-cost pages already have real tools; tightening their structure is preferable to adding more content.

The category/list card language should use deep charcoal text on white/off-white; a restrained blue/violet accent for actions and selection; subtle borders; gentle shadows; and muted semantic color only where it communicates meaning. The “what you need” and “what hurts” panels should not dominate the page with saturated fills. Three card actions should remain visible at desktop and mobile widths.

A reusable shortlist tray should be tested in every relevant layout family. If implemented in a shared shell, check its blast radius on the homepage, guide, article, category, blueprint and utility routes. It must not overlap content, header, cookie/accessibility controls or the footer. No giant floating toolbar.

### Provider marks and visual depth

Raised, soft, dimensional provider **cards** are welcome. Do not assume all provider logos are “free of copyright,” and do not modify the actual logo artwork into a 3D texture. OpenAI's official guidelines say to use its marks only to identify its services and not to distort, crop or add effects/textures. xAI's brand guidelines likewise require use of its logos exactly as provided. Use official permitted marks with proper visual hierarchy, or use plain provider names when permission/conditions are unclear:
- OpenAI: https://openai.com/brand/
- xAI / Grok: https://x.ai/legal/brand-guidelines

### Prompt work and release gate

Keep prompts in named, reusable source templates rather than scattering prompt strings across routes. During the page batches, record each prompt revision, its input contract, output modes and expected result in WORK_LOG.md. Maintain a prompt catalogue artifact before the final release test. **Prompt polishing remains a release-stage task**: once the user flow is stable, make a dedicated final pass to maximize prompt specificity, language adaptation, source/date discipline, artifact instructions and concise follow-up questions. Do not claim external account trials, free quotas or generated artifact capabilities are universal; these depend on provider and plan.

The external prompt should be explicit that:
- published BBI idea text is source context, not proof of local demand;
- unknown buyer, price, cost, market, legal or competition facts must not be invented;
- requested output language and budget should be followed;
- the model should ask concise clarification questions only where answers materially change the plan;
- output type (report, roadmap, HTML, infographic/chart, image) should be attempted only where the selected service supports it, and limitations should be stated;
- the final answer must end in the next practical task the founder can complete, not a fabricated score.

## Current completion state and immediate next step

- Batch 1 page edits are committed: Browse, Blueprints, shared idea detail, Startup Idea Comparison and Validation Workbench. The Vercel status was green for that code commit, but actual rendered/phone visual QA was not independently captured in this environment.
- The user's new screenshots show the comparison, list-card design and spacing issues remain worth correcting; treat source-code edits and user-visible correctness separately.
- This plan update changes documentation only. No React route, CSS, database data or seller archive file was edited.
- **The first code change after this plan:** fix full-record hydration and “research missing details for all selected ideas” on /startup-idea-comparison. Then proceed through the five Page-edit entries in the next-batch table and update this artifact after each completion.


## 2026-10-30 05:03:59 IST — Hybrid AI, account gate and BYOK expansion

### Product modes
1. Deep-link mode: keep ChatGPT, Claude, Grok and Perplexity prefilled links. This is the no-BBI-inference-cost option. Provider limits and consumer-account entitlements remain controlled by the provider.
2. OpenRouter API mode: authenticated users can connect an OpenRouter key and choose a model to get in-app results. API use is billed to the user's OpenRouter usage. A consumer ChatGPT/Claude subscription does not automatically pay for separate API requests.
3. Future provider-specific BYOK: support directly supplied provider keys only after OpenRouter mode is safe and working; use one shared credential interface and server-side model adapter.
4. Future extension: only after web workflows are proven. An extension adds distribution, permission, privacy and maintenance costs, so it is not needed for the initial hybrid.

### Mandatory account rule
- Public: home, marketing, category taxonomy, authored articles, guides, glossary and other public educational routes.
- Sign-in required: individual idea details, full idea records, comparisons including full source details, validation actions and in-platform/API output.
- Signed-out visitors may see category names and high-level descriptions, but must not receive full idea text in SSR HTML or an unauthenticated server-function response.
- A visual login redirect alone is insufficient. Protected data functions must authenticate the Supabase access token; the idea-content RLS policy needs a reviewed migration before claiming full protection. Do not apply a production schema change from this session; record the migration and dashboard prerequisite before release.
- Current auth discovery: src/lib/auth-client.ts has a PKCE Google OAuth helper and src/hooks/use-auth.ts exists, but src/routes/sign-in.tsx currently says sign-in is disabled. Verify VITE_IDEAVAULT_DB_URL, VITE_IDEAVAULT_DB_ANON_KEY and Google OAuth callback on live deployment before declaring sign-in usable.

### User-owned API keys — security design
- Never store a raw OpenRouter/provider API key in plaintext in a normal profile table, local logs, analytics, URL, or client-readable row.
- Preferred design: an authenticated server-side credential service with a user-to-secret reference, strict ownership, key encryption at rest (Supabase Vault or envelope encryption with a deployment-held key), RLS denying client reads, and a server-only inference proxy. Decrypted keys exist only for provider requests, are never returned to the browser, and are never logged.
- Provide set/replace, connection test, masked status, usage/limit preview if exposed by provider, revoke/delete, and explicit billing/provider-limit warning. Never send one provider's key to another provider.
- Each request needs per-user rate/size limits, timeout, model allowlist, prompt limit, abuse controls, usage transparency and prompt/body redaction from app logs. Keep deep links separate so auth/API outage cannot break them.
- OpenRouter has an OpenAI-compatible endpoint and one key for many models; its API key creation docs say the plaintext key is returned only once. Key-loss/recovery and secure connection flows are therefore explicit requirements. References: https://openrouter.ai/developers and https://openrouter.ai/docs/api/api-reference/api-keys/create-a-new-api-key.
- Device cap: one active session is available through Supabase session controls on eligible plans; exactly two active devices needs custom session/device tracking and enforcement. Do not promise a two-device limit based only on comparing emails.
- Auth gate and BYOK need a dedicated implementation/verification batch before public rollout. This planning note does not modify auth settings or production database.


## 2026-10-30 05:12:16 IST — Screenshot-led batch, page edit 2/5: Shared list cards and travelling compare tray
- Rebuilt the shared TopCard/MoreCard system used by category, subcategory and focused-list routes. The former saturated positive/risk panels are replaced with calm white/slate surfaces and restrained blue/amber cues. Every published idea card exposes Read full idea, Add to compare, and Validate this idea.
- Added one global comparison tray in V2Frame for routes without an inline shortlist panel: visible selected titles/count, remove-one, Clear all, and Compare selected/Add one more. It uses mobile-safe bottom positioning and page-bottom clearance. Routes that already show their own shortlist hide the global tray to avoid duplicate controls.


## 2026-10-30 05:14:40 IST — Founder clarification: API keys remain planning-only
- Do not implement OpenRouter BYOK, direct-provider API keys, credential storage, or in-platform model calls during this rebuild batch. No new key table, secret storage, API proxy, key entry UI or model execution is authorized now.
- Keep the architecture notes for possible future expansion only. The active product work remains the user-owned AI deep-link flow, website interactions, account/route flow, India tools, mobile experience and source-backed content. A later business decision will choose whether API mode is added.

## 2026-10-30 05:14:40 IST — Screenshot-led batch, page edit 3/5: Browse ideas stays with the shortlist
- Enabled the shared comparison tray on Browse, removed the duplicated deep-page shortlist panel, and added three explicit actions to the picker cards and published idea table: Read full idea, Add to compare, Validate this idea. The fixed tray keeps selected titles/count, remove-one, Clear all and Compare selected visible while filtering or scrolling.
- This fixes the specific browse interaction where the user added ideas near the top but had to scroll to discover the full saved selection.


## 2026-10-30 05:16:23 IST — Screenshot-led batch, page edit 4/5: Blueprints follows the same shortlist
- Enabled the global sticky comparison tray on Blueprints and removed the duplicate shortlist panel that required users to scroll beneath the search area. Blueprint cards now have Read full idea, Add to compare and Validate this idea actions.
- Marked saved records as source=blueprint so the comparison rehydrates the matching legacy blueprint record rather than assuming it belongs to the current idea catalog. The selected title stays visible in the shared tray during pagination/search and navigation.


## 2026-10-30 05:18:30 IST — Screenshot-led batch, page edit 5/5: Validation Workbench sequence and output intent
- The Workbench now explicitly numbers the flow: 1 choose ideas, 2 add context, 3 choose task and output, 4 review prompt and continue. Added report, roadmap, HTML prototype, infographic/chart, and image-generation intent options. Image-generation intent exposes only ChatGPT and Grok buttons. Prompts ask for supported artifacts while retaining source/date discipline and avoiding fabricated results.
- Added explicit three actions to the workbench's suggested idea cards. Added more Indian response-language choices, an example of mixed free-form context, and removed “your AI account” wording.
- Provider card visuals have raised dimensional cards with undistorted icons. Grok uses the live service's own favicon asset as its original mark; its art itself is not transformed.
- API-key/OpenRouter integration is not part of this implementation. It remains a documented option only, pending a later founder decision.
