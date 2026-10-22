import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { findCategory, neighbourCategories } from "@/lib/catalog";
import { getCategoryDetails } from "@/lib/taxonomy.functions";
import { JsonLd, breadcrumbSchema, collectionPageSchema, itemListSchema } from "@/lib/schema";
import "@/components/glass-library.css";

const detailsQuery = (categorySlug: string) => queryOptions({
  queryKey: ["category-details", categorySlug],
  queryFn: () => getCategoryDetails({ data: { categorySlug } }),
  staleTime: Infinity,
});

export const Route = createFileRoute("/category/$categorySlug/")({
  loader: async ({ context, params }) => {
    const category = findCategory(params.categorySlug);
    if (!category) throw notFound();
    await context.queryClient.ensureQueryData(detailsQuery(params.categorySlug));
    return { name: category.name, short: category.short };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Business Ideas"} | BusinessIdea.io` },
      { name: "description", content: `Explore ten focused paths within ${loaderData?.name ?? "this category"} in India. See who each one suits before choosing an idea.` },
      { property: "og:title", content: `${loaderData?.name ?? "Business Ideas"} | BusinessIdea.io` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CategoryPage,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>This category could not load.</h1><p>Please try again shortly.</p><Link to="/browse">All categories</Link></div></GlassShell>,
  notFoundComponent: () => <GlassShell><div className="gl-page gl-message"><h1>We do not have that category.</h1><Link to="/browse">Browse the library</Link></div></GlassShell>,
});

function CategoryPage() {
  const { categorySlug } = Route.useParams();
  const category = findCategory(categorySlug)!;
  const { data: details } = useSuspenseQuery(detailsQuery(categorySlug));
  const path = `/category/${categorySlug}`;
  const related = neighbourCategories(categorySlug, 4);
  return (
    <>
      <JsonLd schema={[
        collectionPageSchema({ path, name: category.name, description: `Ten focused paths for ${category.short.toLowerCase()} businesses in India.`, itemCount: category.subcategories.length }),
        itemListSchema({ name: `${category.name}: subcategories`, items: category.subcategories.map((sub) => ({ name: sub.name, path: `${path}/${sub.slug}` })) }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }, { name: category.name, path }]),
      ]} />
      <GlassShell>
        <div className="gl-page">
          <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore ideas</Link><span>/</span><span>{category.short}</span></nav>
          <header className="gl-hero gl-detail-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">CATEGORY {String(category.n).padStart(2, "0")} / 100</p><h1>{category.short} <em>business ideas.</em></h1><p>Explore ten more specific directions. Read who each one may suit, then open the path that matches your situation.</p><div className="gl-hero-stats"><span><strong>{category.subcategories.length}</strong> focused paths</span><span>India-focused library</span></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></header>
          <section className="gl-index" aria-labelledby="paths-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">GO ONE LEVEL DEEPER</p><h2 id="paths-heading">Choose a focused path.</h2><p>Each path has its own context and published ideas when available.</p></div></div>
            <ol className="gl-path-grid">{category.subcategories.map((sub, index) => {
              const people = details[sub.slug]?.targetPeople?.slice(3, 6) ?? [];
              return <li key={sub.slug} className="gl-path-card"><span className="gl-path-index">{String(index + 1).padStart(2, "0")} / 10</span><h3>{sub.name.replace(/ Business Ideas$/i, "")}</h3>{people.length > 0 && <p>Often relevant to {people.join(", ").toLowerCase()}.</p>}<Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug, subcategorySlug: sub.slug }} aria-label={`Explore ${sub.name}`}>Explore this path <ArrowUpRight size={18} aria-hidden="true" /></Link></li>;
            })}</ol>
          </section>
          <section className="gl-related" aria-labelledby="related-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">KEEP EXPLORING</p><h2 id="related-heading">Other directions to consider.</h2></div></div><div className="gl-related-list">{related.map((item) => <Link key={item.slug} to="/category/$categorySlug" params={{ categorySlug: item.slug }}>{item.short}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div></section>
          <aside className="gl-bottom-note"><div><p className="gh-eyebrow">ONE STEP AT A TIME</p><h2>Not ready to choose?</h2><p>See the full category map or use a calculator to test your own numbers.</p></div><Link to="/browse" className="gh-button gh-button-primary">All categories <ArrowUpRight size={18} /></Link></aside>
        </div>
      </GlassShell>
    </>
  );
}
