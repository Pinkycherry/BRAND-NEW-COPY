import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
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
    ],
  }),
  component: BrowsePage,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>We could not load the library.</h1><p>Please try again in a moment.</p><Link to="/">Return home</Link></div></GlassShell>,
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
        collectionPageSchema({ path: "/browse", name: "Business idea categories", description: "100 categories and 1,000 focused paths for India.", itemCount: catalog.totalCategories }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }]),
      ]} />
      <GlassShell>
        <div className="gl-page">
          <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>Explore ideas</span></nav>
          <header className="gl-hero">
            <div className="gl-hero-copy">
              <p className="gh-eyebrow">THE IDEA LIBRARY</p>
              <h1>Find a direction <em>worth exploring.</em></h1>
              <p>Start with a category you know, or search for a specific kind of work. Every path is a way to narrow your question.</p>
              <div className="gl-hero-stats"><span><strong>{catalog.totalCategories}</strong> categories</span><span><strong>{catalog.totalSubcategories.toLocaleString()}</strong> focused paths</span></div>
            </div>
            <div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span><span className="gl-art-pill gl-pill-one">Begin here</span><span className="gl-art-pill gl-pill-two">Follow curiosity ↗</span></div>
          </header>

          <section className="gl-index" aria-labelledby="gl-index-title">
            <div className="gl-section-heading"><div><p className="gh-eyebrow">EXPLORE THE MAP</p><h2 id="gl-index-title">All categories</h2><p>Open a category to see its ten approved subcategories.</p></div><span className="gl-count">{categories.length} of {catalog.totalCategories} categories</span></div>
            <div className="gl-controls">
              <label className="gl-search"><Search size={20} aria-hidden="true" /><span className="gh-sr-only">Search categories and subcategories</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories or specific paths..." type="search" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={19} /></button>}</label>
              <label className="gl-sort">Sort <select value={order} onChange={(event) => setOrder(event.target.value as "sheet" | "az")}><option value="sheet">Original order</option><option value="az">A to Z</option></select></label>
            </div>
            {categories.length === 0 ? (
              <div className="gl-empty"><span aria-hidden="true">✳</span><h3>No matching path yet.</h3><p>Try a broader word such as food, home, design or farming.</p><button type="button" onClick={() => setQuery("")}>Show all categories <ArrowRight size={17} /></button></div>
            ) : (
              <div className="gl-category-grid">
                {categories.map((category) => {
                  const matches = needle && !category.name.toLowerCase().includes(needle)
                    ? category.subcategories.filter((sub) => sub.name.toLowerCase().includes(needle))
                    : category.subcategories;
                  return (
                    <article className="gl-category" key={category.slug}>
                      <div className="gl-category-top"><span className="gl-category-number">{String(category.n).padStart(2, "0")}</span><span className="gl-category-spark" aria-hidden="true">✦</span></div>
                      <h3><Link to="/category/$categorySlug" params={{ categorySlug: category.slug }}>{category.short}</Link></h3>
                      <p>{category.subcategories.length} focused paths</p>
                      <details open={Boolean(needle)} key={needle ? category.slug + needle : category.slug}>
                        <summary>View paths <span aria-hidden="true">⌄</span></summary>
                        <ul>{matches.map((sub) => <li key={sub.slug}><Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: category.slug, subcategorySlug: sub.slug }}>{sub.name.replace(/ Business Ideas$/i, "")}<ArrowUpRight size={15} aria-hidden="true" /></Link></li>)}</ul>
                      </details>
                      <Link className="gl-category-cta" to="/category/$categorySlug" params={{ categorySlug: category.slug }}>Explore category <ArrowUpRight size={17} aria-hidden="true" /></Link>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
          <aside className="gl-bottom-note"><div><p className="gh-eyebrow">A CLEARER START</p><h2>Take one path at a time.</h2><p>Some subcategories are still filling up with published ideas. You can explore the structure now, and we will show the current content honestly on each page.</p></div><Link to="/calculator" className="gh-button gh-button-primary">Try a calculator <ArrowUpRight size={18} /></Link></aside>
        </div>
      </GlassShell>
    </>
  );
}
