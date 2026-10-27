import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calculator } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { READY_CALCULATORS, REVIEW_CALCULATORS } from "@/lib/calculators";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";
import "@/components/calculator-review.css";

const DESCRIPTION = "Five specifically modeled startup calculators in rupees, plus source calculator titles held for formula review. Enter your own numbers and inspect the working.";

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
      collectionPageSchema({ path: "/calculator", name: "Startup calculators", description: DESCRIPTION, itemCount: READY_CALCULATORS.length }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculator" }]),
    ]} />
    <GlassShell><div className="gl-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Calculators</span></nav>
      <header className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">THE FOUNDER TOOLKIT</p><h1>Give your numbers <em>a closer look.</em></h1><p>Five tools have specific inputs and visible working. The other 55 source entries are held for formula review; we will not show a number for a metric we cannot support.</p><div className="gl-hero-stats"><span><strong>{READY_CALCULATORS.length}</strong> available calculators</span><span>{REVIEW_CALCULATORS.length} source entries under review</span></div></div><figure className="gl-image-hero"><img src="/images/guides/startup-cash-flow-management-extending-your-runway-reduce-burn-rate-expenses.webp" alt="Startup cash flow guide artwork about runway and spending, fully visible" width={1338} height={753}/><figcaption>Start with a real cost, then check the timing.</figcaption></figure></header>
      <section className="gl-index" aria-labelledby="tools-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">CHOOSE A WORKING MODEL</p><h2 id="tools-heading">Five calculations you can inspect.</h2><p>Each available tool has named inputs and a visible formula. Replace the sample numbers with your own evidence.</p></div></div><div className="gl-tool-grid">{READY_CALCULATORS.map((tool) => <Link key={tool.slug} to="/calculator/$slug" params={{ slug: tool.slug }} className="gl-tool-card"><span className="gl-tool-icon"><Calculator size={24} strokeWidth={1.7} aria-hidden="true" /></span><h3>{tool.title} <em>{tool.highlight}</em></h3><p>{tool.answers}</p><span className="gl-idea-action">Open calculator <ArrowUpRight size={18} /></span></Link>)}</div></section>
      <section className="gl-review-index" aria-labelledby="review-heading"><p className="gh-eyebrow">SOURCE ARCHIVE / UNDER REVIEW</p><h2 id="review-heading">{REVIEW_CALCULATORS.length} metric pages are being rebuilt.</h2><p>Their old URLs remain available with an explanation, but the generic inputs and outputs are paused. These titles are a repair queue, not working recommendations.</p><details><summary>See the metric titles in review</summary><ul>{REVIEW_CALCULATORS.map(tool=><li key={tool.slug}>{tool.title}</li>)}</ul></details></section>
      <aside className="gl-bottom-note"><div><p className="gh-eyebrow">READ THE RESULT CAREFULLY</p><h2>Your inputs shape the answer.</h2><p>The tools calculate from your figures. They do not know local demand, tax or every cost you may face. Check the formula and confirm assumptions before you make a decision.</p></div><Link to="/browse" className="gh-button gh-button-primary">Explore ideas <ArrowUpRight size={18} /></Link></aside>
    </div></GlassShell>
  </>;
}
