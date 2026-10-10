import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { ExploreRail } from "@/components/explore-rail";
import { catalogQuery } from "@/lib/catalog";
import { TAXONOMY } from "@/data/taxonomy";
import FocusCards from "@/components/aceternity/focus-cards";
import { categoryImage } from "@/config/category-imagery";
import { absoluteUrl, JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { PAGE_IMAGES, pageImageMeta } from "@/config/page-imagery";
import { PageHeroImage } from "@/components/page-hero-image";
import { useScrollProgress, useTextReveal } from "@/motion";

export const Route = createFileRoute("/browse")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  head: () => ({
    meta: [
      { title: "Browse Business Idea Categories | BBI – Bro Business Ideas" },
      {
        name: "description",
        content:
          "Browse 100 business idea categories and 1,000 subcategories for India, from work from home and food to farming, home services and small manufacturing.",
      },
      {
        property: "og:title",
        content: "Browse Business Idea Categories | BBI – Bro Business Ideas",
      },
      {
        property: "og:description",
        content:
          "100 business idea categories, ten subcategories each, written for readers in India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...pageImageMeta(PAGE_IMAGES.browse, absoluteUrl),
    ],
  }),
  component: BrowsePage,
  errorComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-6xl px-4 py-24">
        Couldn't load the idea library — try refreshing.
      </p>
    </SiteShell>
  ),
  notFoundComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-6xl px-4 py-24">That page doesn't exist.</p>
    </SiteShell>
  ),
});

function BrowsePage() {
  const { data } = useSuspenseQuery(catalogQuery);
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const depthRef = useScrollProgress<HTMLDivElement>();
  return (
    <>
      <JsonLd
        schema={[
          collectionPageSchema({
            path: "/browse",
            name: "Browse Business Idea Categories",
            description: "100 business idea categories and 1,000 subcategories for India.",
            itemCount: data.totalCategories,
            image: PAGE_IMAGES.browse.src,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Browse", path: "/browse" },
          ]),
        ]}
      />
      <SiteShell tone="instrument">
        <div ref={depthRef} className="bbi-depth mx-auto max-w-6xl px-4 py-12">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Browse" }]} />
          <div className="bbi-depth-back">
            <h1 ref={headingRef} className="mt-4 text-3xl font-bold tracking-tight">
              Every business idea category
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {data.totalCategories} categories · {data.totalSubcategories} subcategories
            </p>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Each category opens into ten focused subcategories. Ideas fill the subcategories as
              they are published.
            </p>
            {/* Someone landing on the library from search has no idea what it
                costs, and the answer is the most persuasive thing on the page. */}
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Free after one sign-in · No credit card · Pay nothing, ever
            </p>
            <PageHeroImage image={PAGE_IMAGES.browse} />
          </div>
          {/* Was `space-y-6`: fourteen full-width bars, each holding a single
              line of text and a count, roughly 1,600px of page to say what a
              grid says in 400. FocusCards instead: hovering one category pulls
              it forward and lets the rest fall back, so a long grid answers
              where the reader is looking. Photography is this site's own
              committed category images (src/config/category-imagery.ts) --
              matched to the category, not an external, unreliable source. */}
          <FocusCards
            className="bbi-depth-front mt-8"
            cards={data.categories.map((category) => {
              const photo = categoryImage(category.categorySlug);
              return {
                title: category.categoryName,
                meta: `${category.subcategoryCount} subcategories`,
                src: photo.src,
                alt: photo.alt,
                to: "/category/$categorySlug",
                params: { categorySlug: category.categorySlug },
              };
            })}
          />

          {/* Every subcategory, one link each, so all 1,000 are one click from
              the library and reachable by a crawler without the menus. */}
          <section className="bbi-depth-front mt-16" aria-labelledby="all-subcategories">
            <h2 id="all-subcategories" className="text-2xl font-semibold tracking-tight">
              All {data.totalSubcategories} subcategories
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {TAXONOMY.map((category) => (
                <div key={category.slug}>
                  <h3 className="text-sm font-semibold">
                    <Link
                      to="/category/$categorySlug"
                      params={{ categorySlug: category.slug }}
                      className="hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  </h3>
                  <ul className="mt-2 grid gap-1">
                    {category.subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          to="/category/$categorySlug/$subcategorySlug"
                          params={{ categorySlug: category.slug, subcategorySlug: sub.slug }}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          {sub.name.replace(/ Business Ideas$/, "")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <ExploreRail exclude="ideas" heading="Keep exploring" />
        </div>
      </SiteShell>
    </>
  );
}
