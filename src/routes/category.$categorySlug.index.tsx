import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, type CSSProperties } from "react";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { AdSlot } from "@/components/AdSlot";
import { categoryImage } from "@/config/category-imagery";
import { findCategory, neighbourCategories } from "@/lib/catalog";
import { getCategoryDetails } from "@/lib/taxonomy.functions";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbSchema,
  collectionPageSchema,
  itemListSchema,
} from "@/lib/schema";
import { hideImgIfBroken } from "@/lib/utils";
import {
  useElementPointerGroup,
  useDepthScene,
  useScrollProgress,
  useStaggerReveal,
  useTextReveal,
} from "@/motion";

const detailsQuery = (categorySlug: string) =>
  queryOptions({
    queryKey: ["category-details", categorySlug],
    queryFn: () => getCategoryDetails({ data: { categorySlug } }),
    staleTime: Infinity,
  });

/** The sheet opens every audience list with the same three broad groups;
 * the specific ones after them are what tell two subcategories apart. */
function suitedTo(people: string[]) {
  const specific = people.slice(3);
  return (specific.length > 0 ? specific : people).slice(0, 3).join(", ").toLowerCase();
}

function describe(name: string, short: string) {
  return `${name} for India: ten practical subcategories of ${short.toLowerCase()} businesses, who each one suits and what people search for before they start.`;
}

export const Route = createFileRoute("/category/$categorySlug/")({
  loader: async ({ context, params }) => {
    const category = findCategory(params.categorySlug);
    if (!category) throw notFound();
    await context.queryClient.ensureQueryData(detailsQuery(params.categorySlug));
    return { name: category.name, short: category.short };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.name ?? "Business Ideas";
    const description = describe(name, loaderData?.short ?? name);
    const image = categoryImage(params.categorySlug);
    return {
      meta: [
        { title: `${name} in India: 10 Subcategories | BBI` },
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
  component: CategoryPage,
  errorComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-6xl px-4 py-24">Couldn't load this category — try refreshing.</p>
    </SiteShell>
  ),
  notFoundComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-6xl px-4 py-24">We don't have that category.</p>
    </SiteShell>
  ),
});

function CategoryPage() {
  const { categorySlug } = Route.useParams();
  const category = findCategory(categorySlug)!;
  const { data: details } = useSuspenseQuery(detailsQuery(categorySlug));
  const categoryPath = `/category/${categorySlug}`;
  const featured = categoryImage(categorySlug);
  const related = neighbourCategories(categorySlug, 6);

  // Everyone the ten subcategories name, in first-seen order.
  const audience: string[] = [];
  for (const sub of category.subcategories) {
    for (const person of details[sub.slug]?.targetPeople ?? []) {
      if (!audience.includes(person)) audience.push(person);
    }
  }

  const headingRef = useTextReveal<HTMLHeadingElement>();
  const pointerRef = useElementPointerGroup<HTMLDivElement>(".mo-card");
  const revealRef = useStaggerReveal<HTMLDivElement>({ selector: ".mo-card", stagger: 0.03 });
  const depthRef = useScrollProgress<HTMLDivElement>();
  const mastheadRef = useDepthScene<HTMLDivElement>({ strength: 0.45, scroll: false });
  const gridRef = useCallback(
    (node: HTMLDivElement | null) => {
      pointerRef.current = node;
      revealRef.current = node;
    },
    [pointerRef, revealRef],
  );

  return (
    <>
      <JsonLd
        schema={[
          collectionPageSchema({
            path: categoryPath,
            name: category.name,
            description: describe(category.name, category.short),
            itemCount: category.subcategories.length,
            image: featured.src,
          }),
          itemListSchema({
            name: `${category.name}: subcategories`,
            items: category.subcategories.map((s) => ({
              name: s.name,
              path: `${categoryPath}/${s.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Browse", path: "/browse" },
            { name: category.name, path: categoryPath },
          ]),
        ]}
      />
      <SiteShell tone="instrument">
        <div ref={depthRef} className="bbi-depth mx-auto max-w-6xl px-4 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Browse", to: "/browse" },
              { label: category.name },
            ]}
          />
          <div ref={mastheadRef} className="bbi-depth-back cx-scene">
            <p className="ins-legend mt-4">Category {category.n} of 100</p>
            <h1
              ref={headingRef}
              style={{ "--z": 0.5 } as CSSProperties}
              className="bbi-heading-glow cx-layer mt-2 text-3xl font-bold tracking-tight"
            >
              {category.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              10 subcategories · Ideas are being added
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Ten practical doors into {category.short.toLowerCase()} businesses for readers in
              India. Each subcategory says who it suits, what people actually search for before
              they start, and what its business ideas will cover as they are published.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Free after one sign-in · No credit card · Pay nothing, ever
            </p>
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
                {category.name}: ten subcategories for India.
              </figcaption>
            </figure>
          </div>

          <section className="bbi-depth-front mt-10" aria-labelledby="subcategory-heading">
            <h2 id="subcategory-heading" className="text-2xl font-semibold tracking-tight">
              The ten {category.short} subcategories
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick a subcategory to see who it suits and what people search for. Business ideas
              fill each one as they are published.
            </p>
            <div ref={gridRef} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.subcategories.map((sub, index) => {
                const detail = details[sub.slug];
                return (
                  <Link
                    key={sub.slug}
                    to="/category/$categorySlug/$subcategorySlug"
                    params={{ categorySlug, subcategorySlug: sub.slug }}
                    className="mo-card glass flex flex-col rounded-xl border border-border/50 p-5 transition-colors hover:border-primary/60"
                  >
                    <span className="ins-num text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-base font-semibold leading-snug">
                      {sub.name}
                    </span>
                    {detail && (
                      <span className="mt-2 block text-sm text-muted-foreground">
                        Suits {suitedTo(detail.targetPeople)}
                      </span>
                    )}
                    <span className="mt-auto pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Ideas coming soon →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {audience.length > 0 && (
            <section className="bbi-depth-front mt-12" aria-labelledby="audience-heading">
              <h2 id="audience-heading" className="text-xl font-semibold tracking-tight">
                Who {category.short.toLowerCase()} businesses suit
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {audience.map((person) => (
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

          <div className="bbi-depth-front mt-10">
            <AdSlot position="category-above-grid" size="banner" />
          </div>

          <section className="bbi-depth-front mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-semibold tracking-tight">
              Related categories
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$categorySlug"
                  params={{ categorySlug: c.slug }}
                  className="glass block rounded-xl border border-border/50 p-4 transition-colors hover:border-primary/60"
                >
                  <span className="block text-sm font-semibold">{c.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {c.subcategories.length} subcategories
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </SiteShell>
    </>
  );
}
