# Part 2 — Order 2 (from the founder, via the project manager)

## Job 1 is DONE. Stop working on it.
The project manager ran the width check on commit `e106709`, on `/`, `/lists` and `/business-models-india`, each at 390, 768 and 1440 wide. 9 of 9 passed:
- The header fits; Logo, Login and Get Report sit on one row.
- Zero horizontal overflow.
- Phone and tablet: the menu opens, stays on screen, scrolls, sections expand, and it closes.
- Desktop: the mega menus open, stay on screen and close.

## New rule: width checks are not your blocker
- Check each page live at the width your browser has.
- After each push, the project manager runs the 390, 768 and 1440 checks and reports failures to you.
- Never stop the chain waiting for a viewport tool. Report and move on.

## Do now, in order, without stopping between jobs
Push each job to `main`, check it live, then go straight to the next. One report at the end with all jobs in the section 7 format.

**Job 2: Home `/`.** As in docs/PART2_ORDER_1.md.

**Job 3: `/tools`.** As in docs/PART2_ORDER_1.md.

**Job 4: `/category/<slug>` and the database FAQ.** As in docs/PART2_ORDER_1.md.

**Job 5: Every remaining page of ours still in the old design.**
The founder's complaint: the site still has the previous look everywhere. Every page below must move onto the seller framework the same way `/lists` did:
- `V2Frame` (seller header and footer).
- Sections built from the seller's components: hero, cards, premium cards, comparison table, FAQ accordion and CTA, taken from `src/routes/lists.index.tsx`, `src/routes/lists.$slug.tsx` and the converted home and tools pages.
- Seller colours.
- Our existing content and logic unchanged.

Order:
1. `/browse`
2. `/idea/<slug>`, all 4,200+ ideas. Use the `/lists/<slug>` top-card layout for the idea body until the seller's idea-page zip arrives.
3. `/calculator` and `/calculator/<slug>`. Keep all calculator logic.
4. `/blueprints`, `/search`
5. `/startup-guides` and `/startup-guides/<slug>`, `/founder-glossary`, `/blog` and `/blog/<slug>`, `/founder-stories`
6. The India guide pages:
   - `/business-ideas-india`
   - `/side-business-ideas-india`
   - `/local-business-ideas-india`
   - `/online-business-ideas-india`
   - `/service-business-ideas-india`
   - `/product-business-ideas-india`
   - `/business-models-india`
   - `/startup-costs-india`
   - `/startup-cash-flow-india`
   - `/unit-economics-india`
   - `/business-pricing-india`
   - `/startup-launch-plan-india`
   - `/startup-idea-validation`
   - `/business-demand-test-india`
   - `/first-customer-india`
   - `/business-idea-risk-check`
   - `/business-idea-pivot-or-stop`
   - `/business-idea-time-fit`
   - `/startup-idea-comparison`
   - `/startup-terms-india`
   - `/business-idea-research-india`
   - `/business-idea-toolkit`
   - `/founder-decision-journal`
   - `/weekend-market-stall-profit-check`
   - `/coaching-batch-business-idea-india`
   - `/business-idea-reading-room`
   - `/learning-resources`
   - `/useful-tools`
   - `/product`
7. `/about`, `/founders`, `/contact`, `/pricing`, `/services`, and the policy pages

Done test for each page:
- The body uses the seller framework components and colours. No old `glass-home`, `gh-` or `cf-` look left.
- Zero seller brand, zero currency, no invented content.
- `bun run build` passes.

## Reminders
- Our content stays as it is. Do not rewrite our text. Only the layout and components change.
- Never reuse another stylesheet's class prefix.
- After any header or footer change, run `bun scripts/render-menu-panels.tsx > src/bought/menu-panels.json`.
- `main` only. Check live. No private details in the public repo.
