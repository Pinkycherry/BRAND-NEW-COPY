import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";

import { categoryImage } from "@/config/category-imagery";
import { absoluteUrl } from "@/lib/schema";
import { GlassShell } from "@/components/glass-shell";
import { PartTimeCategory } from "@/components/part-time-category";
import { findCategory, neighbourCategories } from "@/lib/catalog";
import { getCategoryDetails } from "@/lib/taxonomy.functions";
import { JsonLd, breadcrumbSchema, collectionPageSchema, itemListSchema } from "@/lib/schema";
import "@/components/glass-library.css";

const PART_TIME_FEATURE = { src: "/images/blog/realistic-part-time-business-ideas-extra-income-evening-hustles-weekend-jobs-skills.webp", alt: "Part-time business ideas across evening, weekend and teaching work in the original feature artwork" };

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
    return { name: category.name, short: category.short, image: category.slug === "part-time-business-ideas" ? { ...categoryImage(category.slug), ...PART_TIME_FEATURE } : categoryImage(category.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.name === "Part Time Business Ideas" ? "Part-Time Business Ideas for Your Actual Week | BusinessIdea.io" : `${loaderData?.name ?? "Business Ideas"} | BusinessIdea.io` },
      { name: "description", content: loaderData?.name === "Part Time Business Ideas" ? "Choose a part-time business idea around evenings, weekends or daytime hours. Explore ten real India-focused collections and the risks to check first." : `Explore ten focused paths within ${loaderData?.name ?? "this category"} in India. See who each one suits before choosing an idea.` },
      { property: "og:title", content: `${loaderData?.name ?? "Business Ideas"} | BusinessIdea.io` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: loaderData?.image ? absoluteUrl(loaderData.image.src) : undefined },
      { property: "og:image:alt", content: loaderData?.image?.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: loaderData?.image ? absoluteUrl(loaderData.image.src) : undefined },
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
  const image = categorySlug === "part-time-business-ideas" ? { ...categoryImage(categorySlug), ...PART_TIME_FEATURE } : categoryImage(categorySlug);
  const schema = [
        collectionPageSchema({ path, name: category.name, description: `Ten focused paths for ${category.short.toLowerCase()} businesses in India.`, itemCount: category.subcategories.length, image: image.src }),
        itemListSchema({ name: `${category.name}: subcategories`, items: category.subcategories.map((sub) => ({ name: sub.name, path: `${path}/${sub.slug}` })) }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }, { name: category.name, path }]),
      ];
  if (categorySlug === "part-time-business-ideas") return <><JsonLd schema={schema} /><PartTimeCategory category={category} related={related} /></>;
  return (
    <>
      <JsonLd schema={schema} />
      <GlassShell>
        <div className="gl-page">
          <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore ideas</Link><span>/</span><span>{category.short}</span></nav>
          <header className="gl-hero gl-detail-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">BUSINESS IDEA COLLECTION</p><h1>{category.short} <em>business ideas.</em></h1><p>Explore ten more specific directions. Read who each one may suit, then open the path that matches your situation.</p><div className="gl-hero-stats"><span><strong>{category.subcategories.length}</strong> focused paths</span><span>India-focused library</span></div></div><figure className="gl-image-hero"><img src={image.src} alt={image.alt} width={1280} height={549} loading="eager" fetchPriority="high" /><figcaption>{image.description}</figcaption></figure></header>
          <section className="gl-index" aria-labelledby="paths-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">GO ONE LEVEL DEEPER</p><h2 id="paths-heading">Choose a focused path.</h2><p>Each path has its own context and published ideas when available.</p></div></div>
            <ol className="gl-path-grid">{category.subcategories.map((sub) => {
              const people = details[sub.slug]?.targetPeople?.slice(3, 6) ?? [];
              return <li key={sub.slug} className="gl-path-card"><h3>{sub.name.replace(/ Business Ideas$/i, "")}</h3>{people.length > 0 && <p>Often relevant to {people.join(", ").toLowerCase()}.</p>}<Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug, subcategorySlug: sub.slug }} aria-label={`Explore ${sub.name}`}>Explore this path <ArrowUpRight size={18} aria-hidden="true" /></Link></li>;
            })}</ol>
          </section>
          <section className="gl-related" aria-labelledby="related-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">KEEP EXPLORING</p><h2 id="related-heading">Other directions to consider.</h2></div></div><div className="gl-related-list">{related.map((item) => <Link key={item.slug} to="/category/$categorySlug" params={{ categorySlug: item.slug }}>{item.short}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div></section>
          <aside className="gl-bottom-note"><div><p className="gh-eyebrow">ONE STEP AT A TIME</p><h2>Not ready to choose?</h2><p>See the full category map or use a calculator to test your own numbers.</p></div><Link to="/browse" className="gh-button gh-button-primary">All categories <ArrowUpRight size={18} /></Link></aside>
        </div>
      </GlassShell>
    </>
  );
}
