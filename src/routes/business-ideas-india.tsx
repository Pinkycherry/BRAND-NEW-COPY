import { SellerFaq } from "@/components/v2/faq";
import { V2PageCta, V2PageFaq, V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Calculator, Compass, Search } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { categoryImage } from "@/config/category-imagery";
import { findCategory } from "@/lib/catalog";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/india-decision.css";

const startingPoints = [
  {
    id: "job", label: "I have a job", cue: "Time is your tightest resource",
    headline: "Your salary pays the bills. Your first experiment should fit around it.",
    body: "A business idea that needs you available all day may cost more than the cash you put in. Begin by asking what can be tested after work without promising customers a schedule you cannot keep.",
    categorySlugs: ["side-hustle-business-ideas", "online-business-ideas", "work-from-home-business-ideas"],
    next: "List the hours you can protect each week, then read one blueprint for the customer and first sale.",
    path: "/startup-idea-comparison", action: "Compare two ideas against those hours",
  },
  {
    id: "home", label: "I need to stay close to home", cue: "Place and care come first",
    headline: "The right starting point should respect the people who depend on you.",
    body: "Home is not a limitation to hide. It changes the delivery model, customer radius and how often you can be away. Compare paths that can be examined from where you already are.",
    categorySlugs: ["work-from-home-business-ideas", "women-friendly-business-ideas", "online-business-ideas"],
    next: "Check the actual work, not the label. A home-based idea can still require stock, visits or a fixed daily window.",
    path: "/startup-costs-india", action: "See cash tied up before a home sale",
  },
  {
    id: "town", label: "I know my town", cue: "Local trust is an advantage",
    headline: "The gap may be on the road you walk every day.",
    body: "People already travel, wait or settle for a poor workaround. A local business starts by finding that repeated inconvenience and learning who would pay to remove it.",
    categorySlugs: ["village-and-small-town-business-ideas", "agriculture-and-farming-business-ideas", "side-hustle-business-ideas"],
    next: "Speak to potential customers where the problem occurs. Ask what they did last time and what it cost them.",
    path: "/business-idea-research-india", action: "Observe a local workaround",
  },
  {
    id: "student", label: "I am studying", cue: "Protect your learning and your cash",
    headline: "You can test a skill before it becomes a full company.",
    body: "A small first customer teaches more than a polished name or logo. Look for a problem you can solve well while keeping the time you need to study.",
    categorySlugs: ["student-business-ideas", "side-hustle-business-ideas", "online-business-ideas"],
    next: "Try one clear offer with one real buyer before buying equipment or committing to a recurring expense.",
    path: "/business-demand-test-india", action: "Ask for one real buyer action",
  },
] as const;

export const Route = createFileRoute("/business-ideas-india")({
  head: () => ({ meta: [
    { title: "Business Ideas in India for Real Life | BusinessIdea.io" },
    { name: "description", content: "Explore business ideas in India by your time, place and obligations. Read completed blueprints, test customer demand and check startup costs before you commit." },
    { property: "og:title", content: "Business Ideas in India for Real Life | BusinessIdea.io" },
    { property: "og:description", content: "Start with the life you have. Find a business direction, read the hard parts and make one useful test." },
    { property: "og:type", content: "website" },
  ] }),
  component: IndiaBusinessIdeasPage,
});

function IndiaBusinessIdeasPage() {
  const [choice, setChoice] = useState<(typeof startingPoints)[number]["id"]>("job");
  const selected = startingPoints.find((point) => point.id === choice)!;
  const categories = selected.categorySlugs.map((slug) => findCategory(slug)).filter((category): category is NonNullable<typeof category> => Boolean(category));
  return <>
    <JsonLd schema={[
      webPageSchema({ path: "/business-ideas-india", name: "Business ideas in India for real life", description: "A founder's decision path from situation to first proof." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Business ideas in India", path: "/business-ideas-india" }]),
    ]} />
    <GlassShell><div className="gl-india">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Business ideas in India</span></nav>
      <V2PageHero className="gl-india-hero">
        <div className="gl-india-hero-copy">
          <p className="gh-eyebrow">THE FIRST MOVE · INDIA</p>
          <h1>Business ideas for <em>the life you actually have.</em></h1>
          <p>A salary you cannot leave. A family that needs you. A town you know by heart. Start there. Then find an idea that can survive contact with your real life.</p>
          <div className="gl-india-hero-actions"><a href="#choose-your-start" className="gh-button gh-button-primary">Find your starting point <ArrowRight size={18} /></a><Link to="/blueprints" className="gh-button gh-button-secondary">Read published ideas</Link></div>
        </div>
        <aside className="gl-india-hero-path"><strong>Pick the question that is keeping you awake</strong><Link to="/startup-idea-comparison"><span>Two ideas in mind?</span>Compare them with the same evidence <ArrowUpRight size={17}/></Link><Link to="/first-customer-india"><span>No buyer yet?</span>Trace the first person who may pay <ArrowUpRight size={17}/></Link><Link to="/startup-costs-india"><span>Money is tight?</span>See the cash you must risk first <ArrowUpRight size={17}/></Link></aside>
      </V2PageHero>

      <V2PageSection className="gl-india-statement" aria-labelledby="gl-india-statement-title"><div><span>01 / BEFORE THE IDEA</span><h2 id="gl-india-statement-title">The cost of a wrong start is personal.</h2><p>A month of savings, evenings you cannot get back, or a promise to someone who trusts you. Decide what this business can ask of your life before you choose the attractive idea.</p></div><div className="gl-india-statement-checks"><Link to="/startup-costs-india"><strong>Cash you can risk</strong><span>Write the amount before the first sale.</span><ArrowUpRight size={17}/></Link><Link to="/first-customer-india"><strong>A buyer you can reach</strong><span>Find the last workaround, not a compliment.</span><ArrowUpRight size={17}/></Link><Link to="/startup-idea-comparison"><strong>Two possible directions</strong><span>Give both ideas the same five questions.</span><ArrowUpRight size={17}/></Link></div></V2PageSection>

      <V2PageSection id="choose-your-start" className="gl-india-choice" aria-labelledby="gl-india-choice-title">
        <div className="gl-india-choice-intro"><p className="gh-eyebrow">02 / CHOOSE YOUR REALITY</p><h2 id="gl-india-choice-title">What must this business work around?</h2><p>Choose the constraint that matters most today. These are starting directions, not guarantees of income or fit.</p><a href="#first-proof">What happens next <ArrowRight size={16} /></a></div>
        <div className="gl-india-choice-stage">
          <div className="gl-india-tabs" role="group" aria-label="Choose a starting situation">{startingPoints.map((point) => <button key={point.id} type="button" aria-pressed={choice === point.id} onClick={() => setChoice(point.id)}>{point.label}</button>)}</div>
          <div className="gl-india-choice-story" key={choice}><div className="gl-india-choice-copy"><p className="gh-eyebrow">{selected.cue.toUpperCase()}</p><h3>{selected.headline}</h3><p>{selected.body}</p><div className="gl-india-note"><strong>One useful next step</strong><span>{selected.next}</span></div></div><aside className="gl-india-choice-next"><span>DO THIS WITH YOUR SITUATION</span><strong>{selected.action}</strong><p>Use the page to turn this direction into a question you can answer before a bigger spend.</p><Link to={selected.path}>Open the working page <ArrowUpRight size={17}/></Link></aside></div>
          <div className="gl-india-category-picks">{categories.map((category) => { const art = categoryImage(category.slug); return <Link key={category.slug} to="/category/$categorySlug" params={{ categorySlug: category.slug }}><img src={art.src} alt={art.alt} loading="lazy" /><span>{category.name}<ArrowUpRight size={16} /></span></Link>; })}</div>
        </div>
      </V2PageSection>

      <V2PageFaq className="gl-india-questions" aria-labelledby="gl-india-questions-title"><div><p className="gh-eyebrow">03 / THREE THINGS TO PROTECT</p><h2 id="gl-india-questions-title">Before you spend a rupee, make the risk visible.</h2></div><div className="gl-india-question-list">
        <article><span>01</span><div><h3>Who has the problem today?</h3><p>Ask about the last time it happened. A compliment about your idea is not the same as a customer paying for the solution.</p><Link to="/business-idea-research-india">Look for the last purchase <ArrowUpRight size={16}/></Link></div></article>
        <article><span>02</span><div><h3>When does cash come back?</h3><p>Stock, rent, credit and late payment can defeat a busy business. Put your own numbers into a calculator before you trust a headline margin.</p><Link to="/startup-cash-flow-india">Compare bill dates with collections <ArrowUpRight size={16} /></Link></div></article>
        <article><span>03</span><div><h3>What would make you stop?</h3><p>Write down a failure condition in advance. A researched blueprint should help you say no to the wrong opportunity as well as yes to the right one.</p><Link to="/business-idea-risk-check">Set your cash and time boundary <ArrowUpRight size={16} /></Link></div></article>
      </div></V2PageFaq>

      <V2PageSection id="first-proof" className="gl-india-proof" aria-labelledby="gl-india-proof-title"><p className="gh-eyebrow">04 / FROM HOPE TO EVIDENCE</p><h2 id="gl-india-proof-title">A first proof you can do this week.</h2><p>Pick one idea, one customer question and one number. You do not need a company name to learn whether a problem is real.</p><div className="gl-india-proof-path"><Link to="/blueprints"><Compass size={25} /><strong>Open a completed idea</strong><span>Read the actual buyer, work and risk in a published blueprint.</span><ArrowUpRight size={18} /></Link><Link to="/business-demand-test-india"><BookOpen size={25} /><strong>Ask for one real move</strong><span>Choose a conversation, booking or paid trial and count the action.</span><ArrowUpRight size={18} /></Link><Link to="/business-pricing-india"><Calculator size={25} /><strong>Put a price on the promise</strong><span>Count delivery, owner time and fixed costs for one sale.</span><ArrowUpRight size={18} /></Link></div></V2PageSection>

      <V2PageSection className="gl-india-lens" aria-labelledby="gl-india-lens-title"><div className="gl-india-lens-art"><img src="/images/guides/business-idea-validation-framework-test-before-you-build.webp" alt="Original business idea validation framework guide artwork in a complete 16:9 display" loading="lazy" /></div><div><p className="gh-eyebrow">05 / KEEP THE RIGHT QUESTION</p><h2 id="gl-india-lens-title">A model can challenge the idea. Your customers must answer it.</h2><p>On a completed blueprint, the Validate button prepares a research prompt for Claude, Perplexity, ChatGPT or Grok. Ask it for opposing evidence and missing assumptions. Then verify the answer with people and sources in your market.</p><div className="gl-india-lens-actions"><Link to="/startup-idea-validation" className="gh-button gh-button-primary">Work through the validation field guide <ArrowUpRight size={17} /></Link><Link to="/business-idea-research-india" className="gh-button gh-button-secondary">Check the buyer and countercase</Link></div></div></V2PageSection>

      <SellerFaq title="Questions worth asking first." faq={[{q:"Are all 1,000 category paths filled with ideas?",a:<><p>No. The approved map has 100 categories and ten paths in each. The separate published-blueprint index shows completed source records you can read now. We do not label an empty path as a published idea.</p></>},{q:"Does “work from home” mean zero startup cost?",a:<><p>No. It describes where work may happen, not what it costs. Check the specific blueprint and your own inputs before spending.</p></>},{q:"Will an AI model tell me if my business will succeed?",a:<><p>No model can promise that. Use the prepared prompt to find questions and possible risks, then speak to buyers, test demand and check your numbers.</p></>},{q:"Where can I ask a person?",a:<><p><Link to="/contact">Contact the BBI team</Link> with your question and the market you are considering. A person reads the inbox.</p></>}]} />

      <V2PageCta className="gl-india-final"><p className="gh-eyebrow">THE NEXT STEP IS SMALL ON PURPOSE</p><h2>Find one idea worth testing. Keep the rest of your life intact.</h2><div><Link to="/blueprints" className="gh-button gh-button-primary">Search published business ideas <Search size={17} /></Link><Link to="/browse" className="gh-button gh-button-secondary">Explore all categories</Link></div></V2PageCta>
    </div></GlassShell>
  </>;
}
