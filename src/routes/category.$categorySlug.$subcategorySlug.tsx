import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { findSubcategory } from "@/lib/catalog";
import { getSubcategoryDetail } from "@/lib/taxonomy.functions";
import { BAND_LABEL, TIME_LABEL, getSubcategoryIdeas } from "@/lib/ideas.functions";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";

const detailQuery = (categorySlug: string, subcategorySlug: string) => queryOptions({
  queryKey: ["subcategory-detail", categorySlug, subcategorySlug],
  queryFn: () => getSubcategoryDetail({ data: { categorySlug, subcategorySlug } }),
  staleTime: Infinity,
});
const codeFor = (categoryN: number, index: number) => `C${String(categoryN).padStart(3, "0")}-S${String(index + 1).padStart(2, "0")}`;
const ideasQuery = (code: string) => queryOptions({
  queryKey: ["subcategory-ideas", code],
  queryFn: () => getSubcategoryIdeas({ data: { code } }),
  staleTime: 60_000,
});

export const Route = createFileRoute("/category/$categorySlug/$subcategorySlug")({
  loader: async ({ context, params }) => {
    const found = findSubcategory(params.categorySlug, params.subcategorySlug);
    if (!found) throw notFound();
    await Promise.all([
      context.queryClient.ensureQueryData(detailQuery(params.categorySlug, params.subcategorySlug)),
      context.queryClient.ensureQueryData(ideasQuery(codeFor(found.category.n, found.index))),
    ]);
    return { name: found.subcategory.name, categoryName: found.category.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Business ideas"} in India | BusinessIdea.io` },
      { name: "description", content: `Explore ${loaderData?.name ?? "this focused path"} under ${loaderData?.categoryName ?? "the idea library"}. Read who it suits and see ideas as they are published.` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SubcategoryPage,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>This path could not load.</h1><Link to="/browse">All categories</Link></div></GlassShell>,
  notFoundComponent: () => <GlassShell><div className="gl-page gl-message"><h1>We do not have that path.</h1><Link to="/browse">Browse the library</Link></div></GlassShell>,
});

function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = Route.useParams();
  const { category, subcategory, index } = findSubcategory(categorySlug, subcategorySlug)!;
  const { data: detail } = useSuspenseQuery(detailQuery(categorySlug, subcategorySlug));
  const { data: ideas } = useSuspenseQuery(ideasQuery(codeFor(category.n, index)));
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"curated" | "az">("curated");
  const visible = useMemo(() => {
    const filtered = ideas.filter((idea) => (idea.title + " " + idea.hook).toLowerCase().includes(query.toLowerCase().trim()));
    return sort === "az" ? [...filtered].sort((a, b) => a.title.localeCompare(b.title)) : filtered;
  }, [ideas, query, sort]);
  const topic = subcategory.name.replace(/ Business Ideas$/i, "");
  const path = `/category/${categorySlug}/${subcategorySlug}`;
  const siblings = category.subcategories.filter((sub) => sub.slug !== subcategorySlug);
  return (
    <>
      <JsonLd schema={[
        collectionPageSchema({ path, name: subcategory.name, description: `${subcategory.name} under ${category.name}.`, itemCount: ideas.length }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }, { name: category.name, path: `/category/${categorySlug}` }, { name: subcategory.name, path }]),
      ]} />
      <GlassShell>
        <div className="gl-page">
          <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore</Link><span>/</span><Link to="/category/$categorySlug" params={{ categorySlug }}>{category.short}</Link><span>/</span><span>{topic}</span></nav>
          <header className="gl-hero gl-detail-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">PATH {String(index + 1).padStart(2, "0")} / {category.subcategories.length} · {category.short.toUpperCase()}</p><h1>{topic} <em>business ideas.</em></h1><p>{detail?.searchIntent || `A closer look at ${topic.toLowerCase()} and the published ideas in this path.`}</p><div className="gl-hero-stats"><span><strong>{ideas.length}</strong> published {ideas.length === 1 ? "idea" : "ideas"} here</span></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></header>
          <div className="gl-detail-columns">
            <div>
              {detail?.scope && <section className="gl-editorial" aria-labelledby="scope-title"><p className="gh-eyebrow">THE SCOPE</p><h2 id="scope-title">What this path covers.</h2><p>{detail.scope}</p></section>}
              <section className="gl-index gl-ideas" aria-labelledby="ideas-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">PUBLISHED BLUEPRINTS</p><h2 id="ideas-title">Ideas in this path.</h2><p>Only published ideas appear below.</p></div><span className="gl-count">{ideas.length} published</span></div>
                {ideas.length ? <><div className="gl-controls"><label className="gl-search"><Search size={19} aria-hidden="true" /><span className="gh-sr-only">Search ideas in this path</span><input type="search" placeholder="Search these ideas..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="gl-sort">Sort <select value={sort} onChange={(event) => setSort(event.target.value as "curated" | "az")}><option value="curated">Curated order</option><option value="az">A to Z</option></select></label></div>{visible.length ? <ol className="gl-idea-list">{visible.map((idea) => <li key={idea.code}><div className="gl-idea-card"><span className="gh-eyebrow">{BAND_LABEL[idea.investment_band] ?? "Business idea"} · {TIME_LABEL[idea.time_needed] ?? "Explore the detail"}</span><h3>{idea.title}</h3><p>{idea.hook}</p><div className="gl-idea-card-actions"><Link to="/idea/$slug" params={{ slug: idea.slug }} className="gl-idea-action">Read blueprint <ArrowUpRight size={17} /></Link><Link to="/idea/$slug" params={{ slug: idea.slug }} hash="validate" className="gl-idea-validate-link">Validate this idea <ArrowUpRight size={17} /></Link></div></div></li>)}</ol> : <div className="gl-empty"><h3>No matching published idea.</h3><p>Try a shorter search.</p><button type="button" onClick={() => setQuery("")}>Clear search</button></div>}</> : <div className="gl-empty gl-publishing"><span aria-hidden="true">✳</span><h3>Ideas are being prepared for this path.</h3><p>There are no published blueprints here yet. Explore a nearby path or use the context above to decide what to research locally.</p><Link to="/category/$categorySlug" params={{ categorySlug }}>See all {category.short} paths <ArrowUpRight size={17} /></Link></div>}
              </section>
            </div>
            <aside className="gl-side"><section><p className="gh-eyebrow">WHO IT MAY SUIT</p><h2>Start with your situation.</h2>{detail?.targetPeople?.length ? <ul className="gl-chips">{detail.targetPeople.map((person) => <li key={person}>{person}</li>)}</ul> : <p>Check the time, skills and local demand before committing to this direction.</p>}</section><section><p className="gh-eyebrow">THE NEXT QUESTION</p><h2>Test the numbers.</h2><p>Use your own cost and price assumptions in a calculator before spending money.</p><Link to="/calculator">Open calculators <ArrowUpRight size={17} /></Link></section></aside>
          </div>
          <section className="gl-related" aria-labelledby="nearby-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">KEEP EXPLORING</p><h2 id="nearby-title">Other {category.short} paths.</h2></div></div><div className="gl-related-list">{siblings.map((sub) => <Link key={sub.slug} to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug, subcategorySlug: sub.slug }}>{sub.name.replace(/ Business Ideas$/i, "")}<ArrowUpRight size={17} /></Link>)}</div></section>
        </div>
      </GlassShell>
    </>
  );
}
