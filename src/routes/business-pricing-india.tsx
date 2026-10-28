import { V2PageCta, V2PageFaq, V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/business-pricing.css";

const rupees=(n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
const value=(s:string)=>Math.max(0,Number(s)||0);
const offers=[
  {name:"Service",question:"What exactly is included?",detail:"Quote the outcome, revision limit, date and travel. Count finding the client and following up, not only the delivery hour."},
  {name:"Product",question:"What reaches the buyer?",detail:"Count packaging, damage, delivery, payment fees and returns. A supplier's price is only one line of the sale."},
  {name:"Repeat offer",question:"What happens next month?",detail:"Define the renewal, support and stopping terms. A repeated charge needs repeated value and delivery work."},
] as const;
export const Route=createFileRoute("/business-pricing-india")({
  head:()=>({meta:[
    {title:"Business Pricing in India: Quote a First Sale with Real Costs | BusinessIdea.io"},
    {name:"description",content:"Build a transparent first-price worksheet for a business idea in India. Compare direct cost, owner time, monthly commitments and realistic sales capacity."},
    {property:"og:title",content:"Business pricing in India | BusinessIdea.io"},
    {property:"og:type",content:"article"},
  ]}),
  component:PricingPage,
});
function PricingPage(){
  const [price,setPrice]=useState(""),[materials,setMaterials]=useState(""),[fees,setFees]=useState("");
  const [hours,setHours]=useState(""),[hourValue,setHourValue]=useState(""),[fixed,setFixed]=useState(""),[units,setUnits]=useState("");
  const [offer,setOffer]=useState(0),[note,setNote]=useState("");
  const direct=value(materials)+value(fees),time=value(hours)*value(hourValue),contribution=value(price)-direct-time;
  const capacity=value(units),share=capacity>0?value(fixed)/capacity:0,floor=direct+time+share;
  const month=contribution*capacity-value(fixed),breakEven=contribution>0?Math.ceil(value(fixed)/contribution):null;
  const ready=price!==""&&capacity>0;
  return <>
    <JsonLd schema={[
      webPageSchema({path:"/business-pricing-india",name:"Business pricing in India for a first sale",description:"A first-price workbench with direct costs, owner time, fixed commitments and buyer evidence."}),
      breadcrumbSchema([{name:"Home",path:"/"},{name:"Business pricing in India",path:"/business-pricing-india"}]),
    ]}/>
    <GlassShell><div className="bp-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Business pricing in India</span></nav>
      <V2PageHero className="bp-hero"><div><p className="gh-eyebrow">THE FIRST QUOTE · INDIA</p><h1>Put a price on the <em>whole promise.</em></h1><p>You are quoting a real buyer, not filling a blank in a business plan. The number has to carry what you buy, the hours you give, the bills that repeat and an outcome the customer understands.</p><a href="#pricing-workbench" className="gh-button gh-button-primary">Work through a first price <ArrowRight size={17}/></a></div><aside><span>THE SENTENCE TO FINISH</span><strong>Name the price. Name the work. Name the date.</strong><p>If the scope is blurry, the number will be blurry too.</p></aside></V2PageHero>
      <V2PageSection className="bp-scope" aria-labelledby="bp-scope-title"><div><p className="gh-eyebrow">BEFORE THE RUPEE</p><h2 id="bp-scope-title">What does one sale include?</h2><p>A founder can lose money while the invoice looks good. The unspoken second visit, packaging and two hours of follow-up still belong to the offer.</p></div><ol><li><strong>Output</strong><p>One unit, one project or one month of access. Say exactly what arrives.</p></li><li><strong>Boundary</strong><p>State quantity, revisions, timing and what costs extra.</p></li><li><strong>Collection</strong><p>Agree when the buyer pays and what happens if the work changes.</p></li></ol></V2PageSection>
      <V2PageSection id="pricing-workbench" className="bp-workbench" aria-labelledby="bp-workbench-title"><div className="bp-intro"><p className="gh-eyebrow">YOUR RUPEE WORKBENCH</p><h2 id="bp-workbench-title">Can this price carry the work?</h2><p>Enter assumptions for one sale and one month. Blank fields count as zero in the arithmetic but are still missing evidence. The readout is a planning check, not a demand forecast or tax calculation.</p></div><div className="bp-workspace"><div className="bp-fields">
        <fieldset><legend>For one sale</legend>
          <label>Proposed price (₹)<input type="number" min="0" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Your quote"/><small>Compare actual scope, not only another shop's number.</small></label>
          <label>Materials, stock or subcontracting (₹)<input type="number" min="0" inputMode="decimal" value={materials} onChange={e=>setMaterials(e.target.value)} placeholder="0"/><small>Cash you spend because this sale happens.</small></label>
          <label>Delivery, fees and returns allowance (₹)<input type="number" min="0" inputMode="decimal" value={fees} onChange={e=>setFees(e.target.value)} placeholder="0"/><small>Packaging, trips, payment or platform charges.</small></label>
        </fieldset><fieldset><legend>Time and monthly commitments</legend>
          <label>Hours spent per sale<input type="number" min="0" inputMode="decimal" value={hours} onChange={e=>setHours(e.target.value)} placeholder="0"/><small>Include finding, serving and following up.</small></label>
          <label>Value needed per hour (₹)<input type="number" min="0" inputMode="decimal" value={hourValue} onChange={e=>setHourValue(e.target.value)} placeholder="0"/><small>Your planning value for the work, not a legal wage calculation.</small></label>
          <label>Other fixed costs per month (₹)<input type="number" min="0" inputMode="decimal" value={fixed} onChange={e=>setFixed(e.target.value)} placeholder="0"/><small>Rent, software and bills not charged to one sale.</small></label>
          <label>Sales you can deliver per month<input type="number" min="0" inputMode="numeric" value={units} onChange={e=>setUnits(e.target.value)} placeholder="Your capacity"/><small>Check hours, stock and real buyer conversations.</small></label>
        </fieldset>
      </div><aside className="bp-readout" aria-live="polite"><p className="gh-eyebrow">THE MATH, VISIBLE</p><div><span>Direct cash per sale</span><strong>{rupees(direct)}</strong></div><div><span>Your time value per sale</span><strong>{rupees(time)}</strong></div><div><span>Fixed cost share per sale</span><strong>{capacity>0?rupees(share):"Enter sales capacity"}</strong></div><div className="bp-floor"><span>Cost-covering price at this volume</span><strong>{capacity>0?rupees(floor):"—"}</strong><small>Direct cash + time value + fixed cost ÷ sales capacity.</small></div><div><span>After these costs for a month</span><strong>{ready?rupees(month):"—"}</strong></div><div><span>Sales to cover fixed costs</span><strong>{price!==""&&breakEven!==null?String(breakEven):"—"}</strong></div><p>{ready?"The result uses your proposed price and sales capacity. A positive number does not prove those buyers exist.":"Enter your own price and a realistic sales capacity to interpret the result."} Taxes, financing, losses beyond your allowance and collection delays are excluded. <Link to="/startup-cash-flow-india">Check collection dates against bills <ArrowUpRight size={15}/></Link></p></aside></div></V2PageSection>
      <V2PageSection className="bp-patterns" aria-labelledby="bp-patterns-title"><div><p className="gh-eyebrow">THE SHAPE OF THE OFFER</p><h2 id="bp-patterns-title">What are you really selling?</h2><p>Change the pattern to see the question your quote must answer. The worksheet amounts remain yours.</p><div className="bp-switch" role="group" aria-label="Offer type">{offers.map((item,index)=><button type="button" key={item.name} aria-pressed={offer===index} onClick={()=>setOffer(index)}>{item.name}</button>)}</div></div><article aria-live="polite"><p className="gh-eyebrow">{offers[offer].name}</p><h3>{offers[offer].question}</h3><p>{offers[offer].detail}</p><Link to="/business-models-india">Compare delivery models <ArrowUpRight size={17}/></Link></article></V2PageSection>
      <V2PageSection className="bp-buyer" aria-labelledby="bp-buyer-title"><div><p className="gh-eyebrow">BEYOND YOUR SPREADSHEET</p><h2 id="bp-buyer-title">The buyer already has an alternative.</h2><p>The workbench shows what a price needs to cover. It cannot tell you whether this person will buy. Walk the local options: another provider, doing it themselves or postponing the problem.</p></div><div className="bp-buyer-grid"><article><strong>Ask what they paid before</strong><p>Find the actual scope, quality and date. “Too expensive” needs context.</p></article><article><strong>Show one defined offer</strong><p>Give a price, delivery date and boundary. Ask for a decision or a specific objection.</p></article><article><strong>Record what changed</strong><p>Adjust the offer when evidence says so. Do not quietly omit work to make it look cheaper.</p></article></div></V2PageSection>
      <V2PageSection className="bp-discount" aria-labelledby="bp-discount-title"><div><p className="gh-eyebrow">WHEN THEY ASK FOR LESS</p><h2 id="bp-discount-title">Reduce the scope before you cut the price.</h2><p>Offer fewer revisions, a smaller batch or a simpler delivery window. Name what changes. Keep the promise you can deliver without shifting hidden cost to yourself.</p></div><blockquote>“I can do the smaller version for ₹____. It includes ____ and is delivered by ____. The full version costs ₹____.”<span>A useful quote makes the trade-off clear.</span></blockquote></V2PageSection>
      <V2PageSection className="bp-note" aria-labelledby="bp-note-title"><div><p className="gh-eyebrow">THE NEXT CONVERSATION</p><h2 id="bp-note-title">Which assumption will you check?</h2><p>Write the question you can ask a customer this week. This note is held only in the open browser tab; copy it before leaving.</p></div><label>My first pricing question<textarea value={note} onChange={e=>setNote(e.target.value)} rows={5} placeholder="Would you pay for this exact offer at this price and date?"/></label></V2PageSection>
      <V2PageFaq className="bp-faq" aria-labelledby="bp-faq-title"><div><p className="gh-eyebrow">BEFORE THE QUOTE</p><h2 id="bp-faq-title">A few useful distinctions.</h2></div><div><details><summary>Is the cost-covering price the final selling price?</summary><p>No. It checks your assumptions at the chosen volume. The buyer's alternative, value and ability to pay need separate research.</p></details><details><summary>What if I cannot estimate sales yet?</summary><p>Keep the field blank and test small. Direct cash and time still matter. Do not spread rent across an optimistic sales count to make the quote look affordable.</p></details><details><summary>Should owner time count if I pay myself later?</summary><p>Yes for this planning view. Unpaid time remains a constraint. Enter the value needed to make the work sustainable.</p></details><details><summary>Does this calculate GST or pricing rules?</summary><p>No. Requirements depend on the activity and current rules. Check official sources or qualified advice for your case before quoting or invoicing.</p></details></div></V2PageFaq>
      <V2PageCta className="bp-final"><div><p className="gh-eyebrow">ONE STEP FURTHER</p><h2>Test the quote with a real buyer.</h2><p>If the price works in your ledger, ask whether someone will commit to the defined offer. If cash needed first is high, revise the first version.</p></div><div><Link to="/startup-idea-validation" className="gh-button gh-button-primary">Plan a buyer test <ArrowUpRight size={17}/></Link><Link to="/startup-costs-india" className="gh-button gh-button-secondary">Map startup cash <ArrowUpRight size={17}/></Link></div></V2PageCta>
    </div></GlassShell>
  </>;
}
