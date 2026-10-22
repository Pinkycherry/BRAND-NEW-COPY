import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calculator } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { CALCULATORS } from "@/lib/calculators";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";

const DESCRIPTION = "Free startup calculators in rupees. Enter your own numbers and inspect the formula behind each result.";

export const Route = createFileRoute("/calculator/")({
  head: () => ({ meta: [
    { title: "Startup Calculators | BusinessIdea.io" },
    { name: "description", content: DESCRIPTION },
    { property: "og:title", content: "Startup Calculators | BusinessIdea.io" },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" },
  ] }),
  component: CalculatorIndex,
});

function CalculatorIndex() {
  return <>
    <JsonLd schema={[
      collectionPageSchema({ path: "/calculator", name: "Startup calculators", description: DESCRIPTION, itemCount: CALCULATORS.length }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculator" }]),
    ]} />
    <GlassShell><div className="gl-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Calculators</span></nav>
      <header className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">THE FOUNDER TOOLKIT</p><h1>Give your numbers <em>a closer look.</em></h1><p>Start with a question. Add your own rupee figures and see the arithmetic behind each answer.</p><div className="gl-hero-stats"><span><strong>{CALCULATORS.length}</strong> live calculators</span><span>No account needed to calculate</span></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></header>
      <section className="gl-index" aria-labelledby="tools-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">PICK A QUESTION</p><h2 id="tools-heading">Small tools. Clear workings.</h2><p>Each calculator explains its inputs and shows the formula used.</p></div></div><div className="gl-tool-grid">{CALCULATORS.map((tool, index) => <Link key={tool.slug} to="/calculator/$slug" params={{ slug: tool.slug }} className="gl-tool-card"><span className="gl-tool-icon"><Calculator size={24} strokeWidth={1.7} aria-hidden="true" /></span><span className="gl-path-index">TOOL {String(index + 1).padStart(2, "0")}</span><h3>{tool.title} <em>{tool.highlight}</em></h3><p>{tool.answers}</p><span className="gl-idea-action">Open calculator <ArrowUpRight size={18} /></span></Link>)}</div></section>
      <aside className="gl-bottom-note"><div><p className="gh-eyebrow">READ THE RESULT CAREFULLY</p><h2>Your inputs shape the answer.</h2><p>The tools calculate from your figures. They do not know local demand, tax or every cost you may face. Check the formula and confirm assumptions before you make a decision.</p></div><Link to="/browse" className="gh-button gh-button-primary">Explore ideas <ArrowUpRight size={18} /></Link></aside>
    </div></GlassShell>
  </>;
}
