import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { type CSSProperties } from "react";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { ExploreRail } from "@/components/explore-rail";
import { categoryImage } from "@/config/category-imagery";
import { findSubcategory } from "@/lib/catalog";
import { getSubcategoryDetail } from "@/lib/taxonomy.functions";
import { JsonLd, absoluteUrl, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { hideImgIfBroken } from "@/lib/utils";
import { useDepthScene, useScrollProgress, useTextReveal } from "@/motion";

const detailQuery = (categorySlug: string, subcategorySlug: string) =>
  queryOptions({
    queryKey: ["subcategory-detail", categorySlug, subcategorySlug],
    queryFn: () => getSubcategoryDetail({ data: { categorySlug, subcategorySlug } }),
    staleTime: Infinity,
  });

/** "Home Cooked Meal Subscription Business Ideas" -> "home cooked meal subscription". */
function topicOf(name: string) {
  return name.replace(/\s+Business Ideas$/i, "").toLowerCase();
}

function describe(subName: string, categoryName: string) {
  return `${subName} in India: who this business suits, what people search for before starting ${topicOf(subName)}, and practical ideas under ${categoryName}.`;
}

export const Route = createFileRoute("/category/$categorySlug/$subcategorySlug")({
  loader: async ({ context, params }) => {
    const found = findSubcategory(params.categorySlug, params.subcategorySlug);
    if (!found) throw notFound();
    await context.queryClient.ensureQueryData(
      detailQuery(params.categorySlug, params.subcategorySlug),
    );
    return { name: found.subcategory.name, categoryName: found.category.name };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.name ?? "Business Ideas";
    const description = describe(name, loaderData?.categoryName ?? "");
    // The subcategory shares its parent category's image.
    const image = categoryImage(params.categorySlug);
    return {
      meta: [
        { title: `${name} in India | BBI` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} in India | BBI` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: absoluteUrl(image.src) },
        { property: "og:image:alt", content: image.alt },
        { name: "twitter:image", content: absoluteUrl(image.src) },
      ],
    };
  },
  component: SubcategoryPage,
  errorComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-6xl px-4 py-24">
        Couldn't load this subcategory — try refreshing.
      </p>
    </SiteShell>
  ),
  notFoundComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-6xl px-4 py-24">We don't have that subcategory.</p>
    </SiteShell>
  ),
});

function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = Route.useParams();
  const { category, subcategory, index } = findSubcategory(categorySlug, subcategorySlug)!;
  const { data: detail } = useSuspenseQuery(detailQuery(categorySlug, subcategorySlug));
  const categoryPath = `/category/${categorySlug}`;
  const subcategoryPath = `${categoryPath}/${subcategorySlug}`;
  const featured = categoryImage(categorySlug);
  const siblings = category.subcategories.filter((s) => s.slug !== subcategorySlug);
  const topic = topicOf(subcategory.name);

  const headingRef = useTextReveal<HTMLHeadingElement>();
  const depthRef = useScrollProgress<HTMLDivElement>();
  const mastheadRef = useDepthScene<HTMLDivElement>({ strength: 0.45, scroll: false });

  return (
    <>
      <JsonLd
        schema={[
          collectionPageSchema({
            path: subcategoryPath,
            name: subcategory.name,
            description: describe(subcategory.name, category.name),
            itemCount: 0,
            image: featured.src,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Browse", path: "/browse" },
            { name: category.name, path: categoryPath },
            { name: subcategory.name, path: subcategoryPath },
          ]),
        ]}
      />
      <SiteShell tone="instrument">
        <div ref={depthRef} className="bbi-depth mx-auto max-w-6xl px-4 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Browse", to: "/browse" },
              {
                label: category.name,
                to: "/category/$categorySlug",
                params: { categorySlug },
              },
              { label: subcategory.name },
            ]}
          />
          <div ref={mastheadRef} className="bbi-depth-back cx-scene">
            <p className="ins-legend mt-4">
              Subcategory {index + 1} of 10 · {category.short}
            </p>
            <h1
              ref={headingRef}
              style={{ "--z": 0.5 } as CSSProperties}
              className="bbi-heading-glow cx-layer mt-2 text-3xl font-bold tracking-tight"
            >
              {subcategory.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Ideas are being added</p>
            <figure className="mo-media glass relative mt-6 aspect-[21/9] w-full overflow-hidden">
              <img
                ref={hideImgIfBroken}
                src={featured.src}
                alt={featured.alt}
                width={1200}
                height={514}
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
              <figcaption className="absolute bottom-3 left-4 right-4 text-[11px] leading-snug text-[var(--ins-read)]">
                {subcategory.name}, part of {category.name}.
              </figcaption>
            </figure>
          </div>

          <div className="bbi-depth-front mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-10">
              {detail?.searchIntent && (
                <section aria-labelledby="intent-heading">
                  <h2 id="intent-heading" className="text-xl font-semibold tracking-tight">
                    Who looks for {topic} ideas
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {detail.searchIntent}
                  </p>
                </section>
              )}
              {detail?.scope && (
                <section aria-labelledby="scope-heading">
                  <h2 id="scope-heading" className="text-xl font-semibold tracking-tight">
                    What this subcategory will cover
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {detail.scope}
                  </p>
                </section>
              )}
              <section
                aria-labelledby="ideas-heading"
                className="glass rounded-xl border border-dashed border-border/70 p-6"
              >
                <h2 id="ideas-heading" className="text-lg font-semibold tracking-tight">
                  {subcategory.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  No ideas are published here yet. Researched {topic} ideas will appear on this page
                  as they are written. Until then, the other {category.short.toLowerCase()}{" "}
                  subcategories below are one click away.
                </p>
              </section>
            </div>

            <aside className="space-y-8">
              {detail && detail.targetPeople.length > 0 && (
                <section aria-labelledby="people-heading">
                  <h2 id="people-heading" className="ins-legend">
                    Who it suits
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {detail.targetPeople.map((person) => (
                      <li
                        key={person}
                        className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {person}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {detail && detail.keywords.length > 0 && (
                <section aria-labelledby="keywords-heading">
                  <h2 id="keywords-heading" className="ins-legend">
                    What people search for
                  </h2>
                  <ul className="mt-3 grid gap-1.5">
                    {detail.keywords.map((keyword) => (
                      <li key={keyword} className="text-sm text-muted-foreground">
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </div>

          <section className="bbi-depth-front mt-14" aria-labelledby="siblings-heading">
            <h2 id="siblings-heading" className="text-xl font-semibold tracking-tight">
              More in {category.name}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  to="/category/$categorySlug/$subcategorySlug"
                  params={{ categorySlug, subcategorySlug: s.slug }}
                  className="glass block rounded-xl border border-border/50 p-4 text-sm font-semibold transition-colors hover:border-primary/60"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <Link
              to="/category/$categorySlug"
              params={{ categorySlug }}
              className="mo-link t-eyebrow mt-5 inline-block"
            >
              All ten {category.short} subcategories →
            </Link>
          </section>

          <ExploreRail exclude="ideas" heading="Keep exploring" />
        </div>
      </SiteShell>
    </>
  );
}
