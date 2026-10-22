import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { z } from "zod";
import { GlassShell } from "@/components/glass-shell";
import { categoryImage } from "@/config/category-imagery";
import { getLegacyIdeaCards } from "@/lib/legacy-ideas.functions";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";

export const Route = createFileRoute("/blueprints/")({
  validateSearch: z.object({ q: z.string().optional(), page: z.coerce.number().int().min(1).default(1) }),
  loaderDeps: ({ search }) => ({ q: search.q ?? "", page: search.page }),
  loader: ({ deps }) => getLegacyIdeaCards({ data: { q: deps.q, page: deps.page } }),
  head: () => ({ meta: [
    { title: "Published Business Idea Blueprints | BusinessIdea.io" },
    { name: "description", content: "Browse published BBI business idea blueprints with buyers, costs, risks, steps and validation." },
    { property: "og:type", content: "website" },
  ] }),
  component: BlueprintLibrary,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>The blueprint library could not load.</h1><p>Please try again shortly.</p><Link to="/browse">Explore the category map</Link></div></GlassShell>,
});

function BlueprintLibrary() {
  const { q, page } = Route.useSearch();
  const { items, total } = Route.useLoaderData();
  const navigate = useNavigate({ from: "/blueprints/" });
  const [term, setTerm] = useState(q ?? "");
  const pages = Math.ceil(total / 24);
  return <>
    <JsonLd schema={[
      collectionPageSchema({ path: "/blueprints", name: "Published business idea blueprints", description: "Completed BBI idea research in the new library.", itemCount: total }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }, { name: "Blueprints", path: "/blueprints" }]),
    ]} />
    <GlassShell><div className="gl-page gl-blueprint-index">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore</Link><span>/</span><span>Published blueprints</span></nav>
      <header className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">EXISTING BBI LIBRARY</p><h1>Ideas with <em>the details filled in.</em></h1><p>Search completed research blueprints from the existing BBI library. Each page lays out the buyer, the money, the hard parts and a way to validate the idea.</p><div className="gl-hero-stats"><span><strong>{total.toLocaleString("en-IN")}</strong> matching published blueprints</span></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></header>
      <section className="gl-index" aria-labelledby="blueprint-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">SEARCH THE PUBLISHED IDEAS</p><h2 id="blueprint-title">Find a blueprint.</h2><p>Start with a topic or browse the completed research in title order.</p></div><span className="gl-count">{total.toLocaleString("en-IN")} results</span></div>
        <form className="gl-controls" onSubmit={(event) => { event.preventDefault(); navigate({ search: { q: term.trim() || undefined, page: 1 } }); }}><label className="gl-search"><Search size={20} aria-hidden="true" /><span className="gh-sr-only">Search published blueprint titles</span><input type="search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Try tattoo, farming, tutor, repair..." maxLength={80} /></label><button className="gh-button gh-button-primary" type="submit">Search <ArrowRight size={17} /></button></form>
        {items.length ? <div className="gl-blueprint-grid">{items.map((item) => { const image = categoryImage(item.categorySlug); return <article className="gl-blueprint-card" key={item.slug}><Link className="gl-blueprint-media" to="/idea/$slug" params={{ slug: item.slug }} tabIndex={-1}><img src={image.src} alt={image.alt} width={1280} height={549} loading="lazy" /></Link><div><span className="gh-eyebrow">{item.categoryName}</span><h3><Link to="/idea/$slug" params={{ slug: item.slug }}>{item.title}</Link></h3><p>{item.description}</p><Link className="gl-idea-action" to="/idea/$slug" params={{ slug: item.slug }}>Read blueprint <ArrowUpRight size={17} /></Link></div></article>; })}</div> : <div className="gl-empty"><h3>No completed blueprint matched.</h3><p>Try a broader word, or explore the category map.</p><Link to="/browse">Browse categories</Link></div>}
        {pages > 1 && <nav className="gl-blueprint-pagination" aria-label="Blueprint pages">{page > 1 && <Link to="/blueprints" search={{ q, page: page - 1 }}>Previous</Link>}<span>Page {page} of {pages}</span>{page < pages && <Link to="/blueprints" search={{ q, page: page + 1 }}>Next <ArrowUpRight size={16} /></Link>}</nav>}
      </section>
      <aside className="gl-bottom-note"><div><p className="gh-eyebrow">EXPLORE ANOTHER WAY</p><h2>Start with your situation.</h2><p>The category map has 100 directions and 1,000 focused paths to narrow your search.</p></div><Link to="/browse" className="gh-button gh-button-primary">Explore categories <ArrowUpRight size={18} /></Link></aside>
    </div></GlassShell>
  </>;
}
