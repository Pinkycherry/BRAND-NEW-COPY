import { V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import "@/components/glass-library.css";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "Pricing | BusinessIdea.io" },
    { name: "description", content: "Browse published ideas, use live calculators, and validate an idea with Claude, Perplexity, ChatGPT or Grok at no site charge." },
    { property: "og:title", content: "Pricing | BusinessIdea.io" },
    { property: "og:type", content: "website" },
  ] }),
  component: PricingPage,
});

function PricingPage() {
  return <GlassShell><div className="gl-page">
    <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Pricing</span></nav>
    <V2PageHero className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">SIMPLE, HONEST ACCESS</p><h1>Start exploring <em>for free.</em></h1><p>Explore the category map, published blueprints, guides and calculators. On any published idea, choose an AI service to run a prepared validation prompt for free.</p><div className="gl-hero-stats"><span><strong>₹0</strong> to browse</span><span>No checkout on this demo</span></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></V2PageHero>
    <V2PageSection className="gl-index" aria-labelledby="available-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">AVAILABLE NOW</p><h2 id="available-title">What you can use today.</h2><p>No site payment or account is needed for these public pages and validation links.</p></div></div><div className="gl-pricing-grid"><div className="gl-pricing-card"><span className="gl-path-index">THE IDEA LIBRARY</span><h3>Explore at your pace.</h3><p>Browse the categories and their approved paths. Read any published blueprint you find in a subcategory.</p><ul><li><Check size={18} /> Category and subcategory map</li><li><Check size={18} /> Published idea detail pages</li><li><Check size={18} /> Search and practical guides</li><li><Check size={18} /> Validate through your chosen AI service</li></ul><Link to="/browse" className="gh-button gh-button-primary">Browse ideas <ArrowUpRight size={17} /></Link></div><div className="gl-pricing-card"><span className="gl-path-index">THE FOUNDER TOOLKIT</span><h3>Run your own numbers.</h3><p>Use the live calculators with your figures and inspect how each answer was worked out.</p><ul><li><Check size={18} /> Live input and instant results</li><li><Check size={18} /> Visible formulas and input checks</li><li><Check size={18} /> No payment step to calculate</li></ul><Link to="/calculator" className="gh-button gh-button-secondary">Open calculators <ArrowUpRight size={17} /></Link></div></div></V2PageSection>
    <V2PageSection className="gl-editorial gl-pricing-note" aria-labelledby="future-title"><p className="gh-eyebrow">WHAT IS STILL BEING BUILT</p><h2 id="future-title">More tools will come later.</h2><p>Some subcategories do not yet have published ideas. Personal dashboards, saved work, and reports hosted on this site remain planned. The current Validate control opens a prepared prompt on your chosen AI service; that service may have its own account rules.</p></V2PageSection>
  </div></GlassShell>;
}
