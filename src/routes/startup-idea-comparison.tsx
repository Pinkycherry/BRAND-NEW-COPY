import { SellerFaq } from "@/components/v2/faq";
import { ReadOnlyChecklist } from "@/components/v2/read-only-checklist";
import { V2PageComparison, V2PageCta, V2PageFaq, V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/idea-comparison.css";

const lenses = [
  { title: "A buyer you can reach", prompt: "Can you name a real group and reach a decision-maker this week?", next: "/first-customer-india", link: "Map the first payer" },
  { title: "A problem that has happened", prompt: "Have you heard a recent workaround or seen an actual purchase?", next: "/business-idea-research-india", link: "Check the evidence" },
  { title: "Cash before collection", prompt: "Which idea ties up more money before a buyer pays?", next: "/startup-costs-india", link: "Map startup cash" },
  { title: "One sale that carries the work", prompt: "Which first offer has a defined price, scope and delivery cost?", next: "/business-pricing-india", link: "Quote the first sale" },
  { title: "Time you can truly give", prompt: "Can you make the first promise alongside work, travel and family obligations?", next: "/startup-idea-validation", link: "Plan a reversible test" },
] as const;
type Side = "a" | "b" | "unclear";
export const Route = createFileRoute("/startup-idea-comparison")({
  head: () => ({ meta: [
    { title: "Compare Two Startup Ideas in India with Evidence | BusinessIdea.io" },
    { name: "description", content: "Compare two business ideas in India by buyer access, observed need, cash, first-sale economics and the time you can truly give. Choose a small next test without a fake score." },
    { property: "og:title", content: "Compare two startup ideas in India | BusinessIdea.io" },
    { property: "og:type", content: "article" },
  ] }),
  component: ComparisonPage,
});
function ComparisonPage() {
  const [a, setA] = useState(""), [b, setB] = useState("");
  const [choices, setChoices] = useState<Side[]>(lenses.map(() => "unclear"));
  const [notes, setNotes] = useState<string[]>(lenses.map(() => ""));
  const [nextStep, setNextStep] = useState("");
  const decided = choices.filter(x => x !== "unclear").length;
  const label = (side: "a" | "b") => (side === "a" ? a.trim() : b.trim()) || (side === "a" ? "Idea A" : "Idea B");
  const setChoice = (i: number, side: Side) => setChoices(current => current.map((value, index) => index === i ? side : value));
  const setNote = (i: number, value: string) => setNotes(current => current.map((text, index) => index === i ? value : text));
  return <>
    <JsonLd schema={[
      webPageSchema({ path: "/startup-idea-comparison", name: "Compare two startup ideas in India", description: "A fair evidence comparison of buyer, need, cash, economics and time for two candidate businesses." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Startup idea comparison", path: "/startup-idea-comparison" }]),
    ]} />
    <GlassShell><div className="ic-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Startup idea comparison</span></nav>
      <V2PageHero className="ic-hero"><div><p className="gh-eyebrow">TWO IDEAS · ONE REAL LIFE</p><h1>Which idea deserves <em>your next Tuesday?</em></h1><p>You do not need to choose the rest of your life today. Compare the two startup ideas on what you can observe and afford to test now. A good-looking concept with no reachable buyer may wait while a plain, useful service earns a conversation.</p><a href="#compare-board" className="gh-button gh-button-primary">Put two ideas side by side <ArrowRight size={17}/></a></div><aside><strong>Compare two ideas using the same five questions.</strong></aside></V2PageHero>

      <V2PageSection className="ic-rule" aria-labelledby="ic-rule-title"><div><p className="gh-eyebrow">A FAIR COMPARISON</p><h2 id="ic-rule-title">Give both ideas the same questions.</h2><p>Do not give the favourite idea a full business plan and the other one a dismissive guess. Ask each about a buyer, a recent problem, cash before payment, one viable price and the hours you can actually deliver.</p></div><div className="ic-rule-pair"><article><span>ASSUMPTION</span><strong>“Everyone needs this.”</strong><p>Too broad to investigate.</p></article><article><span>OBSERVATION</span><strong>“Three shops described the same delay last week.”</strong><p>A useful lead, still a small sample.</p></article></div></V2PageSection>

      <ReadOnlyChecklist id="compare-board" eyebrow="YOUR COMPARISON BOARD" title="Where is the stronger next experiment?" intro="Give both ideas the same questions and note the observation that supports each choice." items={lenses.map(lens => `${lens.title}: ${lens.prompt}`)} />

      <V2PageSection className="ic-cost" aria-labelledby="ic-cost-title"><div><p className="gh-eyebrow">THE RISK YOU FEEL AT HOME</p><h2 id="ic-cost-title">A rupee at risk is personal.</h2><p>A business idea is not just a margin chart. A deposit, unsold stock or four nights a week can take room from a household. Compare the smallest useful version of each idea, then see the timing of the bills, not only the total.</p></div><div className="ic-cost-actions"><Link to="/startup-costs-india"><strong>What must I spend first?</strong><span>Enter the one-time and monthly cash for both ideas separately.</span><ArrowUpRight size={17}/></Link><Link to="/startup-cash-flow-india"><strong>When does cash run out?</strong><span>Place supplier bills before and after expected customer payment.</span><ArrowUpRight size={17}/></Link></div></V2PageSection>

      <V2PageSection className="ic-example" aria-labelledby="ic-example-title"><div><p className="gh-eyebrow">AN ILLUSTRATION, NOT A MARKET CLAIM</p><h2 id="ic-example-title">Two ideas can win different columns.</h2><p>Imagine comparing a local design service with a stocked stationery product. The service might need less cash before delivery but more hours per customer. The product could have a repeatable unit and still trap cash in unsold stock. Neither wins without a buyer, a price and delivery evidence.</p></div><div className="ic-example-columns"><article><span>SERVICE QUESTION</span><strong>Can I reach the first buyer and quote a bounded project?</strong><p>Test a real brief, revision limit and date.</p></article><article><span>PRODUCT QUESTION</span><strong>Can I sell a small batch before a larger purchase?</strong><p>Check supplier minimums, returns and collection.</p></article></div></V2PageSection>

      <V2PageSection className="ic-image" aria-labelledby="ic-image-title"><div className="ic-art"><img src="/images/categories/researched-business-ideas-library-startup-opportunity-blueprints-free.webp" alt="Original researched business ideas library artwork shown completely within a 16:9 frame" loading="lazy"/></div><div><p className="gh-eyebrow">USE THE ORIGINAL RECORDS</p><h2 id="ic-image-title">Compare finished ideas, not invented cards.</h2><p>The published blueprint library contains completed source records with their original URLs. Open two that resemble your candidates, read what each actually says, then bring their claims back to this board. A blueprint can suggest questions; it cannot decide your local demand.</p><Link to="/blueprints">Search published business ideas <ArrowUpRight size={17}/></Link></div></V2PageSection>

      <V2PageSection className="ic-week" aria-labelledby="ic-week-title"><div><p className="gh-eyebrow">ONE WEEK, TWO FAIR TESTS</p><h2 id="ic-week-title">Spend evidence before money.</h2><p>If the board is still unclear, give each idea a comparable small trial. Use the same discipline and record refusals as carefully as yeses.</p></div><ol><li><span>DAY 1</span><strong>Name the buyer</strong><p>Who experienced this last week, and who approved the spend?</p></li><li><span>DAY 2</span><strong>Observe the alternative</strong><p>What did the buyer buy, do or postpone instead?</p></li><li><span>DAY 3</span><strong>Quote a first promise</strong><p>Define scope, date, price and delivery cost for each.</p></li><li><span>DAY 4+</span><strong>Ask for a real move</strong><p>Offer a suitable conversation, booking or small paid trial.</p></li></ol><Link to="/business-demand-test-india">Design that small demand test <ArrowUpRight size={17}/></Link></V2PageSection>

      <ReadOnlyChecklist eyebrow="CHOOSE THE NEXT ACTION" title="Which uncertainty matters most?" items={["My next fair test", "One changed assumption", "A cash and time boundary", "A decision date"]} />

      <SellerFaq title="The comparison is a beginning." faq={[{q:"What if both ideas are still unclear?",a:<><p>Choose the cheaper, more reversible question to investigate first. A week of conversations can be more useful than selecting a winner from unsupported assumptions.</p></>},{q:"Should I choose the idea with the bigger market?",a:<><p>A broad market number cannot tell you whether you can reach one paying buyer, deliver well and collect enough to repeat. Verify the market definition and test the first sale.</p></>},{q:"Does this tool save my comparison?",a:<><p>No. Entries remain in the current browser tab and disappear when the session ends. Copy your notes if you want to keep them.</p></>}]} />
      <V2PageCta className="ic-final"><div><p className="gh-eyebrow">THE NEXT TUESDAY</p><h2>Choose a test you can finish.</h2><p>Take the idea whose next uncertainty you can resolve responsibly. If a buyer appears, use the validation guide to plan the smallest proof before a larger commitment.</p></div><div><Link to="/startup-idea-validation" className="gh-button gh-button-primary">Plan the proof <ArrowUpRight size={17}/></Link><Link to="/business-ideas-india" className="gh-button gh-button-secondary">Start from your constraints <ArrowUpRight size={17}/></Link></div></V2PageCta>
    </div></GlassShell>
  </>;
}
