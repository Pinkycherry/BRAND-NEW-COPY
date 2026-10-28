import { V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";

import { GlassShell } from "@/components/glass-shell";
import { searchTaxonomy } from "@/lib/catalog";
import "@/components/glass-library.css";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({ meta: [
    { title: "Search Business Idea Paths | BusinessIdea.io" },
    { name: "robots", content: "noindex,follow" },
    { name: "description", content: "Search approved business idea categories and subcategories for India." },
    { property: "og:type", content: "website" },
  ] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [term, setTerm] = useState(q ?? "");
  const hits = useMemo(() => searchTaxonomy(q ?? "", 200), [q]);
  return <GlassShell><div className="gl-page gl-search-page">
    <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Search</span></nav>
    <V2PageHero className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">FIND YOUR PATH</p><h1>What are you <em>curious about?</em></h1><p>Search the approved category map by topic, skill or kind of work. Open a result to see what is published there.</p></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></V2PageHero>
    <V2PageSection className="gl-index" aria-labelledby="search-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">ALL CATEGORIES & PATHS</p><h2 id="search-title">Search the library.</h2></div></div><form className="gl-search-form" onSubmit={(event) => { event.preventDefault(); navigate({ search: { q: term.trim() } }); }}><label className="gl-search"><Search size={20} aria-hidden="true" /><span className="gh-sr-only">Search business categories and paths</span><input type="search" placeholder="Try food, tuition, repair, farming..." value={term} onChange={(event) => setTerm(event.target.value)} /></label><button type="submit" className="gh-button gh-button-primary">Search <Search size={17} /></button></form>
      {!q?.trim() ? <div className="gl-empty"><span aria-hidden="true">✳</span><h3>Start with a word.</h3><p>Try a topic you know or a skill you have.</p></div> : <><p className="gl-result-count">{hits.length} {hits.length === 1 ? "result" : "results"} for “{q}”</p>{hits.length ? <ul className="gl-search-results">{hits.map((hit) => <li key={hit.kind === "category" ? `c-${hit.categorySlug}` : `s-${hit.categorySlug}-${hit.subcategorySlug}`}>{hit.kind === "category" ? <Link to="/category/$categorySlug" params={{ categorySlug: hit.categorySlug }}><span className="gh-eyebrow">CATEGORY</span><strong>{hit.name}</strong><span className="gl-idea-action">Explore ↗</span></Link> : <Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: hit.categorySlug, subcategorySlug: hit.subcategorySlug }}><span className="gh-eyebrow">{hit.categoryName}</span><strong>{hit.name}</strong><span className="gl-idea-action">Explore ↗</span></Link>}</li>)}</ul> : <div className="gl-empty"><h3>No matching path yet.</h3><p>Try a broader word, or explore the full category map.</p><Link to="/browse">Browse all categories</Link></div>}</>}
    </V2PageSection>
  </div></GlassShell>;
}
