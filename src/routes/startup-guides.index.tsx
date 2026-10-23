import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { STARTUP_GUIDES } from "@/lib/guides-data";
import { guideImage } from "@/config/guide-imagery";
import { hideImgIfBroken } from "@/lib/utils";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";
import "@/components/guide-reading-room.css";

export const Route = createFileRoute("/startup-guides/")({
  head: () => ({ meta: [
    { title: "Startup Guides in India: Read for Your Next Founder Decision | BusinessIdea.io" },
    { name: "description", content: "Read 20 published startup guides with original featured images. Choose the founder decision in front of you: validation, market, cash, launch or growth." },
    { property: "og:title", content: "Startup Guides | BusinessIdea.io" },
    { property: "og:type", content: "website" },
  ] }),
  component: GuidesIndex,
});

const readingPaths = [
  { label:"I need a real first test", detail:"Name the buyer, show the offer, listen for a commitment.", slug:"business-idea-validation-framework", next:"/startup-idea-validation" },
  { label:"I need to understand the market", detail:"Study alternatives and the segment you can actually reach.", slug:"competitor-analysis-framework", next:"/business-ideas-india" },
  { label:"I need to keep cash breathing", detail:"Put collection dates next to the bills, not just revenue totals.", slug:"startup-cash-flow-management", next:"/startup-costs-india" },
  { label:"I am nearly ready to launch", detail:"Check the operational promises before a public announcement.", slug:"pre-launch-checklist-for-startups", next:"/business-models-india" },
] as const;
const featureSlug="business-idea-validation-framework";
const featureGuide=STARTUP_GUIDES.find(guide=>guide.slug===featureSlug)!;
const featureArt=guideImage(featureSlug);

const categories = ["All", ...Array.from(new Set(STARTUP_GUIDES.map((guide) => guide.category)))];

function GuidesIndex() {
  const [selected, setSelected] = useState("All");
  const guides = selected === "All" ? STARTUP_GUIDES : STARTUP_GUIDES.filter((guide) => guide.category === selected);
  return <>
    <JsonLd schema={[
      collectionPageSchema({ path: "/startup-guides", name: "Startup guides", description: "Published guides for the decisions a founder faces.", itemCount: STARTUP_GUIDES.length }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/startup-guides" }]),
    ]} />
    <GlassShell><div className="gl-page gr-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Guides</span></nav>
      <header className="gr-hero"><div><p className="gh-eyebrow">THE FOUNDER READING ROOM · INDIA</p><h1>Read for the decision in front of you.</h1><p>Twenty published startup guides, each with its original article and featured image. Begin with the question that is costing you sleep, then go deeper when the next question becomes clear.</p><a href="#choose-a-path" className="gh-button gh-button-primary">Find a reading path <ArrowUpRight size={17}/></a></div><Link to="/startup-guides/$slug" params={{slug:featureGuide.slug}} className="gr-hero-feature">{featureArt && <img src={featureArt.src} alt={featureArt.alt} width={featureArt.width} height={featureArt.height} ref={hideImgIfBroken}/>}<span><small>START HERE / VALIDATION</small><strong>{featureGuide.title}</strong><span>Read the guide <ArrowUpRight size={16}/></span></span></Link></header>
      <section className="gr-choice" id="choose-a-path" aria-labelledby="gr-choice-title"><div className="gr-choice-intro"><p className="gh-eyebrow">01 / YOUR NEXT DECISION</p><h2 id="gr-choice-title">Where is the uncertainty?</h2><p>You do not have to read a library in order. Pick the part of your business idea that could change what you do this week.</p></div><div className="gr-paths">{readingPaths.map((path,index)=><article key={path.slug}><span>0{index+1}</span><h3>{path.label}</h3><p>{path.detail}</p><Link to="/startup-guides/$slug" params={{slug:path.slug}}>Read the source guide <ArrowUpRight size={16}/></Link></article>)}</div></section>
      <section className="gr-method" aria-labelledby="gr-method-title"><div><p className="gh-eyebrow">02 / READ WITH A PENCIL</p><h2 id="gr-method-title">Take one useful action from an article.</h2><p>A guide is worth reading when it changes a real decision. Put the new question beside a customer, a supplier or a number from your own situation.</p></div><ol><li><strong>Before reading</strong><p>Write down the decision: customer, cost, model or launch date.</p></li><li><strong>While reading</strong><p>Mark assumptions that the author cannot know about your town, buyer or budget.</p></li><li><strong>After reading</strong><p>Run one small test. Keep what you observed separate from what you hoped.</p></li></ol></section>
      <section className="gl-index gr-index" aria-labelledby="guides-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">03 / THE COMPLETE SHELF</p><h2 id="guides-title">All published startup guides.</h2><p>Every article below is an existing source guide with its own featured image. Filter by subject, then open the full reading page.</p></div><span className="gl-count">{guides.length} guides</span></div><div className="gl-filter" role="group" aria-label="Filter guides by topic">{categories.map((category) => <button key={category} type="button" aria-pressed={selected === category} onClick={() => setSelected(category)}>{category}</button>)}</div><div className="gl-guide-grid">{guides.map((guide) => { const art = guideImage(guide.slug); return <article key={guide.slug} className="gl-guide-card">
        {art && <Link to="/startup-guides/$slug" params={{ slug: guide.slug }} className="gl-guide-media" tabIndex={-1}><img src={art.src} alt={art.alt} width={art.width} height={art.height} loading="lazy" decoding="async" ref={hideImgIfBroken} /></Link>}
        <span className="gl-tool-icon"><BookOpen size={23} strokeWidth={1.7} aria-hidden="true" /></span><span className="gh-eyebrow">{guide.category} · <Clock size={14} aria-hidden="true" /> {guide.readTime}</span><h3><Link to="/startup-guides/$slug" params={{ slug: guide.slug }}>{guide.title}</Link></h3><p>{guide.description}</p><Link to="/startup-guides/$slug" params={{ slug: guide.slug }} className="gl-idea-action">Read guide <ArrowUpRight size={17} /></Link></article>; })}</div></section>
      <section className="gr-crossroads" aria-labelledby="gr-crossroads-title"><div><p className="gh-eyebrow">04 / FROM READING TO REALITY</p><h2 id="gr-crossroads-title">Give the next question a place to land.</h2><p>The source guides cover different stages, including SaaS and B2B. If your idea is a local service, a product or a side business, use the principle that applies and test the actual numbers in your context.</p></div><div><Link to="/startup-costs-india"><strong>What will leave my pocket?</strong><span>Make the first-sale rupee map <ArrowUpRight size={16}/></span></Link><Link to="/startup-idea-validation"><strong>Will anybody commit?</strong><span>Use the field notebook <ArrowUpRight size={16}/></span></Link><Link to="/business-models-india"><strong>What must I deliver?</strong><span>Compare operating models <ArrowUpRight size={16}/></span></Link></div></section>
      <aside className="gl-bottom-note"><div><p className="gh-eyebrow">MAKE IT CONCRETE</p><h2>Put a number beside the idea.</h2><p>Use one of the live calculators to check a cost, a margin or a time horizon using your own assumptions.</p></div><Link to="/calculator" className="gh-button gh-button-primary">Explore calculators <ArrowUpRight size={17} /></Link></aside>
    </div></GlassShell>
  </>;
}
