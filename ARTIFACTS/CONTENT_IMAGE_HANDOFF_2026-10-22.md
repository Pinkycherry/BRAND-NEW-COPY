# Published content and featured-image handoff — 22 October 2026

**Owner:** Pinky 1. **Repo:** Pinkycherry/BRAND-NEW-COPY, `main`. **Human preview:** https://bbinewcopy.vercel.app/. **Search hold:** all preview paths and image responses carry noindex; leave it in place until the founder explicitly releases indexing after the actual domain is connected.

## Source and binding

- Source: public published blog rows in the connected BBI Supabase project `jqzadwobnfypmytcbpkw`, `public.blog_posts`, read-only on 22 October 2026. Exactly 23 published records were versioned in `content/blog-posts/*.json`; `src/data/blog-posts.ts` imports the snapshot and `src/lib/blog.server.ts` serves it after the original sanitizer. The demo database lacked `public.blog_posts`, so the versioned snapshot restores the pages without changing a database.
- Guide source: 20 existing Markdown guides in `content/guides/*.md`, through `src/lib/guides-data.ts`.
- All 20 guide and 23 blog WebPs already existed in this target repository and had **identical Git blob SHAs** to their counterparts in `Pinkycherry/newbusinessideas3`. No duplicate binary upload was needed. The canonical slug maps are `src/config/guide-imagery.ts` and `src/config/blog-imagery.ts`; each entry retains src, intrinsic dimensions, alt, focus keyword, three supporting keywords, two long-tail phrases and description/caption.
- The glass list/detail routes now render those exact images and appropriate alt/dimensions/captions; detail pages set OG/Twitter image and image alt. Editorial review of every old image SEO phrase against `IMAGE_SEO.md` remains separate from the migration.
- Snapshot updates require copying only newly published source rows into the repository; never copy drafts, credentials or personal data. Verify live post count and asset loads after updating.

## Exact current image path map

| Content | Slug | Repository asset | Page route |
|---|---|---|---|
| Guide | `competitor-analysis-framework` | `public/images/guides/competitor-analysis-framework-for-founders-positioning-gaps-feature-matrix-startup.webp` | `/startup-guides/competitor-analysis-framework` |
| Guide | `early-stage-startup-hiring` | `public/images/guides/early-stage-startup-hiring-finding-founding-engineers-high-agency-ownership-team.webp` | `/startup-guides/early-stage-startup-hiring` |
| Guide | `freemium-to-paid-conversion` | `public/images/guides/freemium-to-paid-conversion-strategies-free-plan-pro-plan-upgrade-saas.webp` | `/startup-guides/freemium-to-paid-conversion` |
| Guide | `go-to-market-strategy-b2b` | `public/images/guides/go-to-market-strategy-for-b2b-startups-target-customers-pricing-sales-distribution.webp` | `/startup-guides/go-to-market-strategy-b2b` |
| Guide | `inbound-marketing-bootstrapped-startups` | `public/images/guides/inbound-marketing-for-bootstrapped-startups-seo-content-organic-growth-low-cac.webp` | `/startup-guides/inbound-marketing-bootstrapped-startups` |
| Guide | `minimum-viable-product-development` | `public/images/guides/minimum-viable-product-development-ship-faster-validate-ideas-real-users-feedback-iterate.webp` | `/startup-guides/minimum-viable-product-development` |
| Guide | `pre-launch-checklist-for-startups` | `public/images/guides/pre-launch-checklist-for-startups-technical-marketing-audit-test-track-secure-launch.webp` | `/startup-guides/pre-launch-checklist-for-startups` |
| Guide | `product-led-growth-onboarding` | `public/images/guides/product-led-growth-onboarding-rapid-user-activation-retention-aha-moment.webp` | `/startup-guides/product-led-growth-onboarding` |
| Guide | `product-market-fit-metrics` | `public/images/guides/product-market-fit-metrics-how-to-measure-true-pmf-retention-churn-activation.webp` | `/startup-guides/product-market-fit-metrics` |
| Guide | `saas-pricing-models` | `public/images/guides/micro-saas-pricing-models-structuring-for-profitability-tiered-value-based-subscription.webp` | `/startup-guides/saas-pricing-models` |
| Guide | `startup-cash-flow-management` | `public/images/guides/startup-cash-flow-management-extending-your-runway-reduce-burn-rate-expenses.webp` | `/startup-guides/startup-cash-flow-management` |
| Guide | `startup-equity-split-guide` | `public/images/guides/startup-equity-split-guide-avoiding-co-founder-conflict-vesting-cap-table-founder-agreement.webp` | `/startup-guides/startup-equity-split-guide` |
| Guide | `startup-metrics-dashboard` | `public/images/guides/startup-metrics-dashboard-kpis-that-actually-matter-burn-rate-cac-churn-north-star.webp` | `/startup-guides/startup-metrics-dashboard` |
| Guide | `tam-sam-som-market-sizing` | `public/images/guides/tam-sam-som-market-sizing-practical-guide-total-addressable-serviceable-obtainable-market.webp` | `/startup-guides/tam-sam-som-market-sizing` |
| Guide | `user-retention-strategies-saas` | `public/images/guides/user-retention-strategies-for-saas-keeping-customers-engagement-cohorts-renewals-customer-success.webp` | `/startup-guides/user-retention-strategies-saas` |
| Guide | `zero-investment-business-models` | `public/images/guides/zero-investment-business-models-for-bootstrapped-founders.webp` | `/startup-guides/zero-investment-business-models` |
| Guide | `b2b-cold-email-lead-generation` | `public/images/guides/b2b-cold-email-lead-generation-high-converting-frameworks.webp` | `/startup-guides/b2b-cold-email-lead-generation` |
| Guide | `b2b-saas-churn-reduction` | `public/images/guides/b2b-saas-churn-reduction-high-retention-strategies.webp` | `/startup-guides/b2b-saas-churn-reduction` |
| Guide | `business-idea-validation-framework` | `public/images/guides/business-idea-validation-framework-test-before-you-build.webp` | `/startup-guides/business-idea-validation-framework` |
| Guide | `calculating-customer-lifetime-value` | `public/images/guides/calculating-customer-lifetime-value-cltv-saas-churn-mrr-unit-economics.webp` | `/startup-guides/calculating-customer-lifetime-value` |
| Blog | `how-to-price-a-side-hustle-with-no-customers` | `public/images/blog/how-to-price-a-side-hustle-with-no-customers-yet.webp` | `/blog/how-to-price-a-side-hustle-with-no-customers` |
| Blog | `online-business-no-money-no-laptop` | `public/images/blog/starting-an-online-business-with-no-money-and-no-laptop.webp` | `/blog/online-business-no-money-no-laptop` |
| Blog | `passive-income-myths-reality` | `public/images/blog/the-passive-income-promises-that-fail-in-real-life.webp` | `/blog/passive-income-myths-reality` |
| Blog | `find-first-paying-customer-without-ads` | `public/images/blog/how-to-find-your-first-paying-customer-without-spending-on-ads.webp` | `/blog/find-first-paying-customer-without-ads` |
| Blog | `packing-error-subscription-box-inventory-software` | `public/images/blog/the-packing-error-that-ends-a-subscription-box-company.webp` | `/blog/packing-error-subscription-box-inventory-software` |
| Blog | `why-your-cobbler-said-no-and-who-still-says-yes` | `public/images/blog/why-your-cobbler-said-no-and-who-still-says-yes.webp` | `/blog/why-your-cobbler-said-no-and-who-still-says-yes` |
| Blog | `zero-investment-business-ideas-start-with-zero` | `public/images/blog/stop-waiting-50-zero-investment-business-ideas-you-can-start-with-zero.webp` | `/blog/zero-investment-business-ideas-start-with-zero` |
| Blog | `side-hustle-ideas-after-your-day-job` | `public/images/blog/50-side-hustle-ideas-you-can-run-after-your-day-job-ends.webp` | `/blog/side-hustle-ideas-after-your-day-job` |
| Blog | `50-untold-work-from-home-business-ideas` | `public/images/blog/50-untold-work-from-home-business-ideas-you-can-start-with-no-money.webp` | `/blog/50-untold-work-from-home-business-ideas` |
| Blog | `mobile-bike-repair-business-startup` | `public/images/blog/two-week-wait-that-built-a-van-business.webp` | `/blog/mobile-bike-repair-business-startup` |
| Blog | `is-a-gutter-cleaning-business-profitable` | `public/images/blog/one-off-gutter-jobs-are-a-bad-business-contracts-are-not.webp` | `/blog/is-a-gutter-cleaning-business-profitable` |
| Blog | `selling-invoice-templates-online` | `public/images/blog/the-invoice-your-client-judged-before-reading-it.webp` | `/blog/selling-invoice-templates-online` |
| Blog | `selling-social-media-caption-templates` | `public/images/blog/selling-social-media-caption-templates-for-niche-businesses.webp` | `/blog/selling-social-media-caption-templates` |
| Blog | `selling-business-templates-online` | `public/images/blog/business-onboarding-templates-sop-checklists-new-hire-day-one-plan.webp` | `/blog/selling-business-templates-online` |
| Blog | `starting-a-small-batch-coffee-roasting-business` | `public/images/blog/that-date-on-the-coffee-bag-is-not-a-roast-date.webp` | `/blog/starting-a-small-batch-coffee-roasting-business` |
| Blog | `how-to-start-a-niche-job-board` | `public/images/blog/niche-job-board-startup-two-hundred-applications-licensed-candidates-hiring.webp` | `/blog/how-to-start-a-niche-job-board` |
| Blog | `paid-community-business-model-trades` | `public/images/blog/five-contradictory-answers-and-real-liability.webp` | `/blog/paid-community-business-model-trades` |
| Blog | `flexible-business-ideas-for-women` | `public/images/blog/flexible-business-ideas-for-women-balancing-work-and-life-home-based-india.webp` | `/blog/flexible-business-ideas-for-women` |
| Blog | `high-margin-online-business-ideas` | `public/images/blog/high-margin-online-business-ideas-low-capital-seo-dropshipping-ai-tools-digital-products.webp` | `/blog/high-margin-online-business-ideas` |
| Blog | `passive-income-business-ideas-honest-list` | `public/images/blog/passive-income-that-still-needs-work-templates-digital-assets-earn-while-you-build.webp` | `/blog/passive-income-business-ideas-honest-list` |
| Blog | `realistic-part-time-business-ideas` | `public/images/blog/realistic-part-time-business-ideas-extra-income-evening-hustles-weekend-jobs-skills.webp` | `/blog/realistic-part-time-business-ideas` |
| Blog | `realistic-small-town-business-ideas` | `public/images/blog/realistic-small-town-business-ideas-local-entrepreneurs-trade-businesses-bazaar-services.webp` | `/blog/realistic-small-town-business-ideas` |
| Blog | `30-smart-village-business-ideas` | `public/images/blog/smart-village-business-ideas-agri-input-store-milk-collection-solar-dryer-rural-income.webp` | `/blog/30-smart-village-business-ideas` |

## Article idea links

The 23 posts contain 440 unique legacy `/idea/` links. Source project `public.ideas` had 879 completed slugs; 433 of 440 matched exactly. The other seven were renamed and are mapped at render time in `src/lib/blog.server.ts`:

| Original slug | Published source replacement |
|---|---|
| `social-caption-template-packs` | `passive-income-caption-template-selling-business` |
| `onboarding-checklist-sets-employers` | `new-hire-onboarding-document-service` |
| `niche-job-board-one-trade` | `niche-job-board-business-idea-2` |
| `home-inspector-member-community` | `home-inspector-membership-community-idea` |
| `weekend-coffee-roasting-market` | `part-time-coffee-roasting-business` |
| `subscription-box-curation-software` | `subscription-box-software-business-idea` |
| `invoice-template-sets-trades` | `passive-income-invoice-template-selling-business` |

These article idea links currently open the existing source blueprint at bbusiness.online because the new demo idea schema has not imported the old library. The archived HTML in JSON is unchanged. When the old blueprints are migrated, update the render mapping and verify all 440 references. No source database records were modified.

## Noindex release gate

`src/lib/site-config.ts` hardcodes `siteIndexable() = false`, which adds page robots metadata, disallows robots.txt and empties generated sitemaps. `vercel.json` adds `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex` for all paths and assets. Do not release this hold based only on a deployed URL; the founder explicitly requested it remain until the actual domain is connected and indexing is approved.
