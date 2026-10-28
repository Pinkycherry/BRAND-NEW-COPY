import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";

import { PAGE_IMAGES, pageImageMeta } from "@/config/page-imagery";
import { categoryImage } from "@/config/category-imagery";
import { absoluteUrl } from "@/lib/schema";
import { V2Frame } from "@/components/v2/frame";
import { catalogQuery } from "@/lib/catalog";
import { TAXONOMY } from "@/data/taxonomy";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";

export const Route = createFileRoute("/browse")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  head: () => ({
    meta: [
      { title: "Browse 100 Business Idea Categories | BusinessIdea.io" },
      { name: "description", content: "Explore 100 approved business idea categories and 1,000 focused subcategories for people starting in India." },
      { property: "og:title", content: "Explore business ideas | BusinessIdea.io" },
      { property: "og:description", content: "Find a direction that fits your time, skills and place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...pageImageMeta(PAGE_IMAGES.browse, absoluteUrl),
    ],
  }),
  component: BrowsePage,
  errorComponent: () => <V2Frame><div className="container mx-auto min-h-[50vh] px-4 pt-32"><h1>We could not load the library.</h1><p>Please try again in a moment.</p><Link to="/">Return home</Link></div></V2Frame>,
});

function BrowsePage() {
  const { data: catalog } = useSuspenseQuery(catalogQuery);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"sheet" | "az">("sheet");
  const needle = query.trim().toLowerCase();
  const categories = useMemo(() => {
    const candidates = TAXONOMY.filter((category) =>
      !needle || category.name.toLowerCase().includes(needle) ||
      category.subcategories.some((sub) => sub.name.toLowerCase().includes(needle))
    );
    return order === "az" ? [...candidates].sort((a, b) => a.name.localeCompare(b.name)) : candidates;
  }, [needle, order]);

  return (
    <>
      <JsonLd schema={[
        collectionPageSchema({ path: "/browse", name: "Business idea categories", description: "100 categories and 1,000 focused paths for India.", itemCount: catalog.totalCategories, image: PAGE_IMAGES.browse.src }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }]),
      ]} />
      <V2Frame active="/browse">
        <div className="container mx-auto max-w-6xl px-4 pb-20 pt-28">
          <nav className="mb-5 flex gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>Explore ideas</span></nav>
          <header className="grid items-center gap-8 rounded-2xl border border-border bg-gradient-to-b from-amber-500/10 to-background p-6 md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <div><p className="text-xs font-bold uppercase tracking-widest text-primary">THE IDEA LIBRARY</p><h1 className="mt-4 text-4xl font-bold md:text-5xl">Find a direction <span className="text-primary">worth exploring.</span></h1><p className="mt-5 text-muted-foreground">Start with a category you know, or search for a specific kind of work. Every path is a way to narrow your question.</p><div className="mt-7 flex gap-8 text-sm"><span><strong>{catalog.totalCategories}</strong> categories</span><span><strong>{catalog.totalSubcategories.toLocaleString()}</strong> focused paths</span></div></div>
            <figure><img className="w-full rounded-xl object-cover" src={PAGE_IMAGES.browse.src} alt={PAGE_IMAGES.browse.alt} width={1280} height={549} loading="eager" fetchPriority="high" /><figcaption className="mt-2 text-xs text-muted-foreground">{PAGE_IMAGES.browse.description}</figcaption></figure>
          </header>

          <section className="pt-16" aria-labelledby="gl-index-title">
            <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">EXPLORE THE MAP</p><h2 id="gl-index-title" className="mt-2 text-3xl font-bold">All categories</h2><p className="mt-2 text-muted-foreground">Open a category to see its ten approved subcategories.</p></div><span className="text-sm text-muted-foreground">{categories.length} of {catalog.totalCategories} categories</span></div>
            <div className="my-6 flex flex-wrap gap-3">
              <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4"><Search size={20} aria-hidden="true" /><span className="sr-only">Search categories and subcategories</span><input className="w-full bg-transparent py-4 outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories or specific paths..." type="search" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={19} /></button>}</label>
              <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-4">Sort <select className="bg-transparent py-4" value={order} onChange={(event) => setOrder(event.target.value as "sheet" | "az")}><option value="sheet">Original order</option><option value="az">A to Z</option></select></label>
            </div>
            {categories.length === 0 ? (
              <div className="rounded-xl border border-border p-8 text-center"><h3>No matching path yet.</h3><p>Try a broader word such as food, home, design or farming.</p><button type="button" onClick={() => setQuery("")}>Show all categories <ArrowRight size={17} /></button></div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const image = categoryImage(category.slug);
                  const matches = needle && !category.name.toLowerCase().includes(needle)
                    ? category.subcategories.filter((sub) => sub.name.toLowerCase().includes(needle))
                    : category.subcategories;
                  return (
                    <article className="premium-card flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm" key={category.slug}>
                      
                      <Link to="/category/$categorySlug" params={{ categorySlug: category.slug }} aria-label={`Explore ${category.short}`}><img className="aspect-[2/1] w-full object-cover" src={image.src} alt={image.alt} width={1280} height={549} loading="lazy" /></Link>
                      <div className="flex flex-1 flex-col p-5"><h3 className="text-xl font-bold"><Link to="/category/$categorySlug" params={{ categorySlug: category.slug }}>{category.short}</Link></h3><p className="mt-2 text-sm text-muted-foreground">{category.subcategories.length} focused paths</p><details className="mt-5 border-t border-border pt-3" open={Boolean(needle)} key={needle ? category.slug + needle : category.slug}><summary className="cursor-pointer font-semibold text-primary">View paths</summary><ul className="mt-3 max-h-64 space-y-2 overflow-auto text-sm">{matches.map((sub) => <li key={sub.slug}><Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: category.slug, subcategorySlug: sub.slug }}>{sub.name.replace(/ Business Ideas$/i, "")}</Link></li>)}</ul></details><Link className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary" to="/category/$categorySlug" params={{ categorySlug: category.slug }}>Explore category <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
          <section className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-border bg-muted/30 p-8"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">ALREADY RESEARCHED</p><h2 className="mt-2 text-2xl font-bold">Browse published idea blueprints.</h2><p className="mt-2 text-muted-foreground">Explore the completed BBI library by title, then open any idea in the new layout.</p></div><Link to="/blueprints" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">See published blueprints <ArrowUpRight size={18} /></Link></section>
          <aside className="mt-8 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-8"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">A CLEARER START</p><h2 className="mt-2 text-2xl font-bold">Take one path at a time.</h2><p className="mt-2 text-muted-foreground">Some subcategories are still filling up with published ideas. You can explore the structure now, and we will show the current content honestly on each page.</p></div><Link to="/calculator" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">Try a calculator <ArrowUpRight size={18} /></Link></aside>
        </div>
      </V2Frame>
    </>
  );
}
