# BusinessIdea.io — active site build brief

**Owner:** Pinky 1. **Companion:** Pinky 2. **Approved by founder:** 22 October 2026 (IST).  
**Target:** [businessidea.io](https://businessidea.io). **Working public demo:** [bbinewcopy.vercel.app](https://bbinewcopy.vercel.app/).  
**Only implementation repository:** [Pinkycherry/BRAND-NEW-COPY](https://github.com/Pinkycherry/BRAND-NEW-COPY), branch `main`.  
**Exact supplied brief:** [SOURCE_BRIEF_2026-10-22.txt](SOURCE_BRIEF_2026-10-22.txt). **Visual reference:** [REFERENCE_AARAV_2026-10-22.png](REFERENCE_AARAV_2026-10-22.png). **Running handoff:** [WORK_LOG.md](WORK_LOG.md).

## Mandatory start of every site task

Read this file, the exact source brief, the image, and the latest entries in WORK_LOG.md **before** any site/page/layout/structure research or edit. Also read [BUTTERFLY_EFFECT.md](../BUTTERFLY_EFFECT.md) and the relevant current code. Record the founder's new instructions, findings, decisions, edits, tests, deployment status, and issues with IST timestamps in WORK_LOG.md. Commit the log and implementation directly to `main` through the connected GitHub repository. Make each commit coherent; inspect the current branch head before writing. Do not leave the only copy of any deliverable in a local folder. Keep the project public so Pinky 2 can open this exact handoff. Never commit credentials or private information.

## What is being built

A premium, mobile-first (80%+ expected phone traffic) business idea library and founder toolkit for people starting small in India. The intended structure is about 100 main categories, exactly 10 subcategories per category, and a minimum of 10 researched ideas per subcategory as content becomes available. The long-term goal is 50,000+ ideas, **not a claim that 50,000 are currently published**. Use the approved taxonomy and existing real records; bind future data to the existing Supabase read contract later. The current assignment is visual framework, navigation, and working interactions with honest placeholders. Do not invent idea titles, numbers, testimonials, logos, trend scores, market-size figures, or tool results.

The current demo is a partial copy of the separate existing site [bbusiness.online](https://bbusiness.online/) / `newbusinessideas3`; develop **BRAND-NEW-COPY** as the distinct future `businessidea.io` experience. Preserve working routes and real content while the visual redesign proceeds. Do not modify the other repository, production site, or live Supabase rows.

## Active visual direction — newest founder reference

The screenshot is a *visual reference*, not a page to copy or an endorsement. It shows a luminous off-white canvas, a translucent rounded floating navigation bar, soft lavender and blue accents, gentle blur and light, an editorial left-aligned hero, a portrait treatment on the right with small floating metric tiles, generous spacing, rounded glass surfaces, soft shadows, small line icons, and calm typography. Adapt that language to a business idea library; never reproduce the person's name, portrait, fake partner logos, statistics, testimonials, or portfolio copy.

- Off-white/soft-white base and deep charcoal copy; violet-to-blue gradient accents with restrained cyan/mint. Glass layers have subtle borders, real contrast, and restrained depth.
- Use organic rounded and pill shapes, floating orbs, and expressive uneven composition. Avoid generic square card grids. Cards may remain rounded and readable; the source screenshot itself includes soft rectangular sections.
- Clean sans typography, comfortable mobile reading size, and large tap targets. Mobile layout is designed first; no clipped floating content.
- Scroll reveals, selective sticky moments, slight parallax, progressive disclosure, and tactile controls should reward exploration. Respect `prefers-reduced-motion`, performance budgets, keyboard access, focus visibility, and WCAG AA text contrast. Make content readable before animation/hydration.
- Use clean inline SVG or an existing icon system. No stock placeholder images. Create any needed original abstract art through CSS/SVG or a separately approved consistent asset set.

The new light-glass reference **supersedes the former dark homepage visual direction in DESIGN.md**, but that file records the current code and remains useful until the redesign is implemented. Do not flip global tokens in a way that breaks existing routes. Work in isolated, testable increments and update DESIGN.md when actual code changes make its description stale. Earlier brand cues such as the golden tree need an explicit integration decision; do not silently destroy a working signature visual.

## Site architecture to build

1. **Home:** glass header and mobile navigation; accurate hero promise, real counts where available, browse and Surprise Me; featured taxonomy, how it works, real trending/published ideas, genuine tools, honest trust, final CTA, contact/newsletter when connected, full footer.
2. **Explore:** searchable and filterable category index with ten subcategories per category; responsive sticky controls and progressive disclosure.
3. **Subcategory:** readable overview and 10+ published ideas when available; sort/filter, load more, real price/time/skill facts where available, working detail links and Validate actions.
4. **Idea detail:** 12–15 relevant sections: hero, honest verdict, market evidence where sourced, buyer, revenue, startup costs, competition, risks, launch steps, validation, related ideas, FAQ, save/share and final actions. Render unsupported modules as transparently labelled future features rather than invented reports.
5. **Tools and calculators:** hub and focused live-input tools, transparent formulas, save to idea only when implemented. Intended deeper toolkit includes validation, business plans, brand kits, Lean Canvas, naming and creative tools.
6. **Validation center:** multi-step input, useful report, next actions and PDF export when an actual engine exists; no fake AI result screens.
7. **Knowledge:** startup guides, blog, founder glossary, practical long-form article layouts.
8. **About, pricing, contact/support, FAQ, privacy, terms, cookies:** truthful copy and working pathways; don't assert sign-in, free forever, paid products or support features beyond implementation.
9. **Account/dashboard:** saved ideas, validation history, plans and notes, gated by real auth.
10. **Further roadmap:** founder stories, failure database, category map, template library, generated brand results, submit/community, idea comparison, daily idea. These are scoped follow-on pages, not claims of launched functionality.

For every page, define exact section order, mobile behavior, loading/error/empty states, and clear future data bindings. Prefer existing React/TanStack/Tailwind conventions in the repo over introducing Framer Motion merely because the source brief mentions it. Existing `src/motion` can serve appropriate interactions. The hierarchy is category → subcategory → idea. Continue to use the approved taxonomy, slugs, and real published data. Do not hand-write new category slugs.

## Source-of-truth and conflict resolution

1. The founder's latest direct instruction and supplied brief/image set the current target.
2. This handoff and the verbatim source file record that target, and WORK_LOG.md records outcomes.
3. Current `PRODUCT.md`, `DESIGN.md`, `MOTION_SPEC.md`, `CLAUDE.md`, and `BUTTERFLY_EFFECT.md` describe existing code, product constraints, and known failure modes. Retain factual safeguards (no fabricated stats, no live DB mutation, accessible motion). When design instructions conflict, the new reference wins.
4. Distinguish a **target**, an **existing implementation**, and a **verified live behavior**. A successful GitHub commit is not proof that Vercel built or deployed it. Check the preview before marking a feature live.
5. Prior conversation gave a roughly four-day launch target; confirm the actual launch date before claiming a deadline. The requested site is much wider than one code change, so track page status and dependencies in the log.

## Handoff format for every subsequent task

Read the linked artifacts; inspect the affected route and shared dependencies; note the blast radius; implement directly in `main`; run the relevant checks; verify the Vercel deployment when observable; append an IST log entry containing instruction, files, commit, tests, live result, remaining issue, and next action. Pinky 2 should be able to resume from the public URLs above without relying on chat history.
