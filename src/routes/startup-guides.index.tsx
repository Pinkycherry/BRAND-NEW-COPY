import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { STARTUP_GUIDES } from "@/lib/guides-data";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";

export const Route = createFileRoute("/startup-guides/")({
  head: () => ({ meta: [
    { title: "Startup Guides | BusinessIdea.io" },
    { name: "description", content: "Read practical published startup guides, from validation and market sizing to launch and growth." },
    { property: "og:title", content: "Startup Guides | BusinessIdea.io" },
    { property: "og:type", content: "website" },
  ] }),
  component: GuidesIndex,
});

const categories = ["All", ...Array.from(new Set(STARTUP_GUIDES.map((guide) => guide.category)))];

function GuidesIndex() {
  const [selected, setSelected] = useState("All");
  const guides = selected === "All" ? STARTUP_GUIDES : STARTUP_GUIDES.filter((guide) => guide.category === selected);
  return <>
    <JsonLd schema={[
      collectionPageSchema({ path: "/startup-guides", name: "Startup guides", description: "Published guides for the decisions a founder faces.", itemCount: STARTUP_GUIDES.length }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/startup-guides" }]),
    ]} />
    <GlassShell><div className="gl-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Guides</span></nav>
      <header className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">LEARN ONE THING WELL</p><h1>Practical reading for <em>your next step.</em></h1><p>Published guides for testing a direction, understanding a market and making a more informed first move.</p><div className="gl-hero-stats"><span><strong>{STARTUP_GUIDES.length}</strong> published guides</span></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></header>
      <section className="gl-index" aria-labelledby="guides-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">THE READING ROOM</p><h2 id="guides-title">Browse the guides.</h2><p>Choose a topic or explore the full collection.</p></div><span className="gl-count">{guides.length} guides</span></div><div className="gl-filter" role="group" aria-label="Filter guides by topic">{categories.map((category) => <button key={category} type="button" aria-pressed={selected === category} onClick={() => setSelected(category)}>{category}</button>)}</div><div className="gl-guide-grid">{guides.map((guide) => <article key={guide.slug} className="gl-guide-card"><span className="gl-tool-icon"><BookOpen size={23} strokeWidth={1.7} aria-hidden="true" /></span><span className="gh-eyebrow">{guide.category} · <Clock size={14} aria-hidden="true" /> {guide.readTime}</span><h3><Link to="/startup-guides/$slug" params={{ slug: guide.slug }}>{guide.title}</Link></h3><p>{guide.description}</p><Link to="/startup-guides/$slug" params={{ slug: guide.slug }} className="gl-idea-action">Read guide <ArrowUpRight size={17} /></Link></article>)}</div></section>
      <aside className="gl-bottom-note"><div><p className="gh-eyebrow">MAKE IT CONCRETE</p><h2>Put a number beside the idea.</h2><p>Use one of the live calculators to check a cost, a margin or a time horizon using your own assumptions.</p></div><Link to="/calculator" className="gh-button gh-button-primary">Explore calculators <ArrowUpRight size={17} /></Link></aside>
    </div></GlassShell>
  </>;
}
