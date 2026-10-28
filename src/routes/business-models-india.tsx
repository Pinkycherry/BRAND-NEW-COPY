import { V2PageComparison, V2PageCta, V2PageFaq, V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Calculator, Compass } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/business-models.css";

const models = [
  { id: "service", name: "Service", promise: "Sell work you can deliver.", buyer: "A person or company with a task they cannot or do not want to do themselves.", firstSale: "A scoped job with an outcome, date and price.", work: "Your time, skill, scheduling and quality control.", cash: "Deposit or payment after delivery; the timing needs to be agreed.", pressure: "Your available hours cap delivery unless you can document and delegate the work.", test: "Offer one small job to a real buyer and track all hours, including finding and serving them." },
  { id: "product", name: "Product & stock", promise: "Sell something you make or source.", buyer: "Someone choosing your item over the alternative already available.", firstSale: "A small, specified batch or pre-order, where suitable.", work: "Sourcing, stock, packaging, fulfilment and support.", cash: "You may pay suppliers before collecting from buyers; unsold stock ties up cash.", pressure: "Returns, damage, slow stock and repeated buying costs can eat a headline margin.", test: "Test one small batch or a legitimate pre-order with the actual delivered price." },
  { id: "subscription", name: "Subscription", promise: "Deliver repeated value for repeated payment.", buyer: "Someone whose need returns often enough to justify a continuing commitment.", firstSale: "A clear first period with what is included and how to stop.", work: "Ongoing delivery, onboarding, retention and customer support.", cash: "Recurring collection helps only while value continues and cancellations remain manageable.", pressure: "Acquiring customers repeatedly while existing ones leave can overwhelm revenue.", test: "Deliver the first cycle manually and ask whether the buyer would renew at the stated price." },
  { id: "marketplace", name: "Marketplace", promise: "Connect two sides and earn from a transaction.", buyer: "Both sides must trust the match, timing, payment and recourse.", firstSale: "A manually arranged transaction with a transparent fee.", work: "Supply, demand, verification, dispute handling and matching.", cash: "A commission is received only when a real transaction completes and fees are collected.", pressure: "Neither side returns if the other side is thin or unreliable.", test: "Arrange a few manual matches in one narrow area before building a platform." },
  { id: "licensing", name: "Licensing", promise: "Let another party use something you own.", buyer: "A business that can use a defined method, design, brand or intellectual property.", firstSale: "A specific permitted use, term, territory and payment arrangement.", work: "Creating the asset, documenting rights and supporting permitted use.", cash: "Upfront or recurring fees depend on the actual agreement and collection.", pressure: "Rights, enforcement and support obligations need specialist review.", test: "Speak to a likely licensee about the exact use and commercial terms; obtain qualified advice before signing." },
] as const;
type ModelId = (typeof models)[number]["id"];
const formatRupees = (value: number) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
const clean = (value: string) => Math.max(0, Number(value) || 0);

export const Route = createFileRoute("/business-models-india")({
  head: () => ({ meta: [
    { title: "Business Models in India: Compare How an Idea Earns | BusinessIdea.io" },
    { name: "description", content: "Compare service, product, subscription, marketplace and licensing models for a business idea in India. See the buyer, delivery work, cash timing and a transparent rupee worksheet." },
    { property: "og:title", content: "Business Models in India | BusinessIdea.io" },
    { property: "og:description", content: "The model changes who pays, when cash arrives and what work your startup must carry." },
    { property: "og:type", content: "article" },
  ] }),
  component: BusinessModelsPage,
});

function BusinessModelsPage() {
  const [first, setFirst] = useState<ModelId>("service");
  const [second, setSecond] = useState<ModelId>("product");
  const [price, setPrice] = useState("1000");
  const [direct, setDirect] = useState("350");
  const [fees, setFees] = useState("100");
  const [monthly, setMonthly] = useState("5000");
  const [sales, setSales] = useState("10");
  const left = models.find((model) => model.id === first)!;
  const right = models.find((model) => model.id === second)!;
  const contribution = clean(price) - clean(direct) - clean(fees);
  const afterFixed = contribution * clean(sales) - clean(monthly);
  return <>
    <JsonLd schema={[
      webPageSchema({ path: "/business-models-india", name: "Business models for an idea in India", description: "Compare who pays, how delivery works, when cash arrives and what could make the model fail." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Business models in India", path: "/business-models-india" }]),
    ]} />
    <GlassShell><div className="bm-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Business models in India</span></nav>
      <V2PageHero className="bm-hero"><p className="gh-eyebrow">THE MONEY PATH · INDIA</p><h1>How does this <em>business idea</em> earn?</h1><div><p>The same customer problem can become a service, a stocked product or a recurring offer. The model decides what you must deliver, when cash reaches you and which risk you carry first.</p><a href="#compare-models" className="gh-button gh-button-primary">Compare two models <ArrowRight size={17} /></a></div></V2PageHero>

      <V2PageSection className="bm-frame" aria-labelledby="bm-frame-title"><div><p className="gh-eyebrow">THE THREE QUESTIONS</p><h2 id="bm-frame-title">A model is a set of obligations.</h2></div><ol><li><strong>Who pays?</strong><p>Identify the person who makes the decision and the account the payment leaves.</p></li><li><strong>What do you owe them?</strong><p>Name the work, product, access or match you must keep delivering.</p></li><li><strong>When is cash yours?</strong><p>Track supplier payments, collection, refunds and the next cycle.</p></li></ol></V2PageSection>

      <V2PageComparison id="compare-models" className="bm-compare" aria-labelledby="bm-compare-title"><div className="bm-section-intro"><p className="gh-eyebrow">SIDE BY SIDE</p><h2 id="bm-compare-title">Compare the work behind the money.</h2><p>Pick two models. These are operating patterns, not rankings or a prediction that one will succeed in your market.</p></div><div className="bm-selectors"><label>First model<select value={first} onChange={(event) => setFirst(event.target.value as ModelId)}>{models.map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}</select></label><label>Second model<select value={second} onChange={(event) => setSecond(event.target.value as ModelId)}>{models.map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}</select></label></div><div className="bm-comparison" aria-live="polite"><div className="bm-comparison-head"><span>THE QUESTION</span><strong>{left.name}</strong><strong>{right.name}</strong></div>{([
        ["Buyer","buyer"],["First sale","firstSale"],["Work you carry","work"],["Cash timing","cash"],["Breaking point","pressure"],["Smallest sensible test","test"]
      ] as const).map(([label,key]) => <div className="bm-comparison-row" key={key}><strong>{label}</strong><p>{left[key]}</p><p>{right[key]}</p></div>)}</div></V2PageComparison>

      <V2PageSection className="bm-cash" aria-labelledby="bm-cash-title"><div><p className="gh-eyebrow">PUT YOUR RUPEES IN</p><h2 id="bm-cash-title">The price is not the money you keep.</h2><p>Use your own assumptions to see contribution per sale and a simple monthly amount after fixed costs. This illustration excludes tax, financing, unpaid owner time and the timing of collections. It is arithmetic, not a profit forecast.</p><Link to="/startup-costs-india">Map the cash needed before the first sale <ArrowUpRight size={17} /></Link></div><div className="bm-calculation"><div className="bm-fields"><label>Price per sale (₹)<input type="number" min="0" inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} /></label><label>Direct delivery cost (₹)<input type="number" min="0" inputMode="decimal" value={direct} onChange={(event) => setDirect(event.target.value)} /></label><label>Fees and returns allowance (₹)<input type="number" min="0" inputMode="decimal" value={fees} onChange={(event) => setFees(event.target.value)} /></label><label>Monthly fixed costs (₹)<input type="number" min="0" inputMode="decimal" value={monthly} onChange={(event) => setMonthly(event.target.value)} /></label><label>Sales in a month<input type="number" min="0" inputMode="numeric" value={sales} onChange={(event) => setSales(event.target.value)} /></label></div><div className="bm-results"><div><span>Contribution per sale</span><strong>{formatRupees(contribution)}</strong><small>Price − direct cost − allowance</small></div><div><span>After fixed costs, before tax and other omissions</span><strong>{formatRupees(afterFixed)}</strong><small>Contribution × sales − monthly fixed costs</small></div></div><p>If the number is negative, your assumptions do not cover these costs. A positive number still says nothing about whether those sales will happen or cash arrives in time.</p></div></V2PageSection>

      <V2PageSection className="bm-patterns" aria-labelledby="bm-patterns-title"><div className="bm-section-intro"><p className="gh-eyebrow">FIVE WAYS TO DELIVER VALUE</p><h2 id="bm-patterns-title">What each model asks of a founder.</h2><p>Start with the delivery burden you can carry. A clever revenue label cannot remove stock, customer support or the hours required to serve someone well.</p></div><div className="bm-pattern-list">{models.map((model) => <article key={model.id}><div><h3>{model.name}</h3><strong>{model.promise}</strong></div><p>{model.pressure}</p></article>)}</div></V2PageSection>

      <V2PageSection className="bm-reality" aria-labelledby="bm-reality-title"><div><p className="gh-eyebrow">THE INDIA CHECK</p><h2 id="bm-reality-title">Follow the cash before you admire the margin.</h2><p>Depending on your model, stock may be purchased before a sale, an invoice may be paid later, or a returned order may reverse a collection. Local fulfilment and owner time can matter more than a neat margin percentage. Write down the actual order of payments in your case.</p></div><div className="bm-reality-list"><div><strong>Money out</strong><span>Supplier, labour, delivery, platform, rent, equipment.</span></div><div><strong>Work done</strong><span>Finding the buyer, making or sourcing, serving, resolving a problem.</span></div><div><strong>Money in</strong><span>Deposit, delivery payment, credit period, renewal or commission.</span></div><div><strong>What can reverse it</strong><span>Refund, return, cancellation, failed collection or unplanned rework.</span></div></div></V2PageSection>

      <V2PageSection className="bm-interview" aria-labelledby="bm-interview-title"><div className="bm-section-intro"><p className="gh-eyebrow">ASK BEFORE YOU BUILD</p><h2 id="bm-interview-title">Four questions for a real buyer.</h2></div><div className="bm-interview-grid"><blockquote>“What did you do the last time this problem happened?”<small>Find the existing workaround.</small></blockquote><blockquote>“Who approved and paid for that?”<small>Separate the user from the buyer.</small></blockquote><blockquote>“What went wrong with the current option?”<small>Locate the reason to change.</small></blockquote><blockquote>“Would you try this defined offer at this price and date?”<small>Watch for a concrete action, not a compliment.</small></blockquote></div><Link to="/startup-idea-validation" className="bm-interview-next">Use the validation field notebook <ArrowUpRight size={17} /></Link></V2PageSection>

      <V2PageFaq className="bm-faq" aria-labelledby="bm-faq-title"><div><p className="gh-eyebrow">BEFORE CHOOSING A MODEL</p><h2 id="bm-faq-title">Questions that change the choice.</h2></div><div><details><summary>Can one business use more than one model?</summary><p>Yes. A service can add a product, or a product can include ongoing support. Test the first delivery and cash path before adding another operational promise.</p></details><details><summary>Is a subscription always better than a one-time sale?</summary><p>No. A recurring payment needs recurring value, retention and support. Compare collection after cancellations and delivery costs, not just the appeal of a monthly price.</p></details><details><summary>Does a marketplace need an app first?</summary><p>A narrow manual match can test whether both sides will participate. Software becomes useful when a real matching process repeats and the economics can support it.</p></details></div></V2PageFaq>
      <V2PageCta className="bm-final"><h2>Take the model into a real idea.</h2><p>Read a completed blueprint for the buyer, costs and first steps. Then test the part that could make you stop.</p><div><Link to="/blueprints" className="gh-button gh-button-primary">Search completed business ideas <Compass size={17} /></Link><Link to="/business-pricing-india" className="gh-button gh-button-secondary">Work through a first price <Calculator size={17} /></Link></div></V2PageCta>
    </div></GlassShell>
  </>;
}
