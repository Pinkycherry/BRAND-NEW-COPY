import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { ValidateButton } from "@/components/validate-button";
import { categoryImage } from "@/config/category-imagery";
import { TAXONOMY } from "@/data/taxonomy";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/schema";
import type { LegacyIdea } from "@/lib/legacy-ideas.functions";
import "@/components/glass-library.css";

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="gl-idea-section"><p className="gh-eyebrow">{eyebrow}</p><h2>{title}</h2>{children}</section>;
}

/** The source blueprint fields, carried verbatim into the glass reading layout. */
export function LegacyIdeaPage({ idea }: { idea: LegacyIdea }) {
  const [copied, setCopied] = useState(false);
  const image = categoryImage(idea.categorySlug);
  const intro = idea.description.split(/(?<=[.!?])\s+/)[0]?.slice(0, 260) || idea.summary.slice(0, 260);
  const category = TAXONOMY.find((item) => item.slug === idea.categorySlug);
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 2500); }
    catch { setCopied(false); }
  };
  return <><JsonLd schema={[articleSchema({ path: "/idea/" + idea.slug, headline: idea.title, description: idea.description || idea.summary, datePublished: idea.createdAt, categoryName: idea.categoryName, image: image.src }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }, { name: idea.title, path: "/idea/" + idea.slug }])]}/><GlassShell><div className="gl-page gl-idea-page gl-legacy-idea">
    <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore</Link><span>/</span>{category && <><Link to="/category/$categorySlug" params={{ categorySlug: category.slug }}>{category.short}</Link><span>/</span></>}<span>{idea.title}</span></nav>
    <header className="gl-idea-hero gl-legacy-hero">
      <div><p className="gh-eyebrow">A PUBLISHED BBI BLUEPRINT</p><h1>{idea.title}</h1><p className="gl-idea-hook">{intro}</p><p className="gl-legacy-category">{idea.categoryName}{idea.subcategoryName ? " · " + idea.subcategoryName : ""}</p><div className="gl-idea-actions"><a href="#validate" className="gh-button gh-button-primary">Validate this idea <ArrowUpRight size={17} /></a><a href="#blueprint" className="gh-button gh-button-secondary">Read the blueprint</a><button type="button" className="gh-button gh-button-secondary" onClick={share}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Link copied" : "Copy link"}</button></div></div>
      <figure className="gl-image-hero"><img src={image.src} alt={image.alt} width={1280} height={549} loading="eager" fetchPriority="high" /><figcaption>{image.description}</figcaption></figure>
    </header>
    <div className="gl-idea-layout"><article className="gl-idea-body" id="blueprint">
      {idea.description && <Section eyebrow="01 / THE BUSINESS" title="What this business is"><p>{idea.description}</p></Section>}
      {idea.marketOpportunity && <Section eyebrow="02 / THE OPPORTUNITY" title="Why it might matter"><p>{idea.marketOpportunity}</p></Section>}
      {idea.targetCustomer && <Section eyebrow="03 / THE BUYER" title="Who the customer is"><p>{idea.targetCustomer}</p></Section>}
      {idea.howMakeMoney && <Section eyebrow="04 / REVENUE" title="How it makes money"><p>{idea.howMakeMoney}</p></Section>}
      {(idea.startupCost || idea.incomePotential || idea.firstCustomer) && <Section eyebrow="05 / PRACTICAL NUMBERS" title="Cost and timing">{idea.startupCost && <p><strong>Startup cost.</strong> {idea.startupCost}</p>}{idea.incomePotential && <p><strong>Income potential.</strong> {idea.incomePotential}</p>}{idea.firstCustomer && <p><strong>First customer.</strong> {idea.firstCustomer}</p>}</Section>}
      {idea.competitionEdge && <Section eyebrow="06 / POSITIONING" title="Where you could stand out"><p>{idea.competitionEdge}</p></Section>}
      {idea.steps.length > 0 && <Section eyebrow="07 / GETTING STARTED" title="First steps"><ol className="gl-steps">{idea.steps.map((step, index) => <li key={index}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></Section>}
      {idea.tools.length > 0 && <Section eyebrow="08 / SETUP" title="Tools you may need"><ul className="gl-legacy-list">{idea.tools.map((tool, index) => <li key={index}>{tool}</li>)}</ul></Section>}
      {(idea.pros.length > 0 || idea.cons.length > 0) && <Section eyebrow="09 / REALITY CHECK" title="Upsides and hard parts"><div className="gl-legacy-pros">{idea.pros.length > 0 && <div><h3>What could work</h3><ul>{idea.pros.map((item, index) => <li key={index}>{item}</li>)}</ul></div>}{idea.cons.length > 0 && <div><h3>What to watch</h3><ul>{idea.cons.map((item, index) => <li key={index}>{item}</li>)}</ul></div>}</div></Section>}
      {idea.verdict && <Section eyebrow="10 / THE VERDICT" title="Worth a closer look?"><p className="gl-verdict">{idea.verdict}</p></Section>}
      {idea.faq.length > 0 && <Section eyebrow="11 / QUESTIONS" title="What people ask"><div className="gl-faq">{idea.faq.map((item, index) => <details key={index}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></Section>}
      <section id="validate" className="gl-idea-section"><p className="gh-eyebrow">12 / VALIDATE THE IDEA</p><h2>Research before you commit</h2><ValidateButton slug={idea.slug} /><p className="gl-validation-caution">AI research is a starting point. Confirm prices, licensing and demand with local sources and potential buyers.</p></section>
    </article><aside className="gl-idea-sidebar"><div><p className="gh-eyebrow">ON THIS PAGE</p><nav aria-label="Idea sections"><a href="#blueprint">The blueprint</a><a href="#validate">Validate this idea</a></nav></div><div><p className="gh-eyebrow">COMPARE DIRECTIONS</p><p>Use the library to explore another business path.</p><Link to="/browse">Browse ideas <ArrowUpRight size={16} /></Link></div></aside></div>
  </div></GlassShell></>;
}
