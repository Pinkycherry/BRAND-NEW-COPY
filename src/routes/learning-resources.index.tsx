import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Calculator, Compass, TrendingUp } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { PAGE_IMAGES, pageImageMeta } from "@/config/page-imagery";
import { STARTUP_GUIDES } from "@/lib/guides-data";
import { CALCULATORS } from "@/lib/calculators";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { GLOSSARY_DATA } from "@/lib/glossary-data";
import { absoluteUrl, JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";

export const Route = createFileRoute("/learning-resources/")({
  head: () => ({ meta: [
    { title: "Founder Learning Resources & Toolkit | BusinessIdea.io" },
    { name: "description", content: "Practical startup guides, calculators, founder stories, glossary terms and useful operating frameworks." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    ...pageImageMeta(PAGE_IMAGES.resources, absoluteUrl),
  ] }),
  component: LearningResourcesIndexPage,
});

const OPERATOR_FRAMEWORKS = [
  {
    name: "The Mom Test (Rob Fitzpatrick)",
    summary:
      "How to talk to customers & learn if your business is a good idea when everyone is lying to you.",
    actionable_rule:
      "Never ask someone if your idea is good. Ask about past behavior and what they currently pay to solve the friction.",
  },
  {
    name: "Sean Ellis 40% PMF Benchmark",
    summary:
      "Quantitative survey metric assessing whether product-market fit has been reached before scaling marketing spend.",
    actionable_rule:
      "Survey active users: If >40% say they would be 'very disappointed' if your product disappeared tomorrow, you have PMF.",
  },
  {
    name: "Paul Graham's Default Alive / Dead",
    summary:
      "Mental model for calculating if current growth rate and burn rate reach profitability before bank balance reaches zero.",
    actionable_rule:
      "Simulate cash balance against compound monthly revenue growth. If cash reaches $0 before revenue crosses expenses, you are Default Dead.",
  },
  {
    name: "Productized Service Staircase",
    summary:
      "How to bootstrap from customized agency hours into standardized monthly recurring packages, and finally software.",
    actionable_rule:
      "Standardize scope, turnaround time, and price. Sell the outcome rather than hourly billing to escape the time-for-money trap.",
  },
];

const RECOMMENDED_BOOKS = [
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    takeaway:
      "The definitive guide on customer discovery interviews without pitching false optimism.",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    takeaway: "Build-Measure-Learn feedback loops, MVP smoke testing, and validated learning.",
  },
  {
    title: "High Output Management",
    author: "Andy Grove",
    takeaway:
      "Managerial leverage, operational bottlenecks, and production line analogies for startups.",
  },
  {
    title: "$100M Offers",
    author: "Alex Hormozi",
    takeaway:
      "Value equation: Dream outcome × Perceived likelihood / (Time delay × Effort & sacrifice).",
  },
];

const sections = [
  { title: "Interactive calculators", body: "Test market size, costs, break-even and runway using your own numbers.", count: CALCULATORS.length + " calculators", to: "/calculator", icon: Calculator },
  { title: "Startup guides", body: "Read practical steps on validation, customer discovery, pricing and launch.", count: STARTUP_GUIDES.length + " guides", to: "/startup-guides", icon: BookOpen },
  { title: "Founder stories", body: "Verified case studies will appear here when their numbers can be checked.", count: CASE_STUDIES.length + " published stories", to: "/founder-stories", icon: TrendingUp },
  { title: "Founder glossary", body: "Plain-language terms and formulas for the decisions in front of you.", count: GLOSSARY_DATA.length + " terms", to: "/founder-glossary", icon: Compass },
] as const;

function LearningResourcesIndexPage() {
  const image = PAGE_IMAGES.resources;
  return <>
    <JsonLd schema={[
      collectionPageSchema({ path: "/learning-resources", name: "Founder learning resources", description: "Startup guides, calculators, glossary and checked case studies.", itemCount: sections.length, image: image.src }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Learning resources", path: "/learning-resources" }]),
    ]} />
    <GlassShell><div className="gl-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Learning resources</span></nav>
      <header className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">YOUR FOUNDER TOOLKIT</p><h1>One useful step <em>at a time.</em></h1><p>Use a guide to understand the work, a calculator to test your numbers, and the glossary when a term gets in the way.</p></div><figure className="gl-image-hero"><img src={image.src} alt={image.alt} width={1280} height={549} loading="eager" fetchPriority="high" /><figcaption>{image.description}</figcaption></figure></header>
      <section className="gl-index" aria-labelledby="resources-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">CHOOSE A RESOURCE</p><h2 id="resources-title">Explore the toolkit.</h2></div></div><div className="gl-resource-grid">{sections.map(({ title, body, count, to, icon: Icon }) => <Link key={to} to={to} className="gl-resource-card"><span className="gl-resource-icon"><Icon size={24} aria-hidden="true" /></span><h3>{title}</h3><p>{body}</p><span className="gl-resource-foot">{count}<ArrowUpRight size={18} aria-hidden="true" /></span></Link>)}</div></section>
      <section className="gl-index" aria-labelledby="frameworks-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">IDEAS TO APPLY</p><h2 id="frameworks-title">Operating frameworks.</h2><p>Use these as prompts, then check the details for your own business.</p></div></div><div className="gl-resource-grid">{OPERATOR_FRAMEWORKS.map((item) => <article className="gl-resource-card" key={item.name}><h3>{item.name}</h3><p>{item.summary}</p><p><strong>Try this:</strong> {item.actionable_rule}</p></article>)}</div></section>
      <section className="gl-index" aria-labelledby="reading-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">FURTHER READING</p><h2 id="reading-title">Books to explore.</h2></div></div><div className="gl-resource-grid">{RECOMMENDED_BOOKS.map((book) => <article className="gl-resource-card" key={book.title}><p className="gh-eyebrow">{book.author}</p><h3>{book.title}</h3><p>{book.takeaway}</p></article>)}</div></section>
      <aside className="gl-bottom-note"><div><p className="gh-eyebrow">PUT IT INTO PRACTICE</p><h2>Find one idea to test.</h2><p>Explore the library and start with a small check of local demand.</p></div><Link to="/browse" className="gh-button gh-button-primary">Browse ideas <ArrowUpRight size={18} /></Link></aside>
    </div></GlassShell>
  </>;
}
