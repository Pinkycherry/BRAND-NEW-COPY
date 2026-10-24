import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Calculator, ClipboardList } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/startup-costs.css";

const costLines = [
  { key:"deposit", label:"Refundable deposit", group:"before", hint:"Cash locked up even if the deposit may later return." },
  { key:"equipment", label:"Equipment and setup", group:"before", hint:"Purchase, repair, fit-out, device or basic tools." },
  { key:"stock", label:"Initial stock or materials", group:"before", hint:"Only the smallest quantity needed for a real first offer." },
  { key:"registration", label:"Registration and permissions", group:"before", hint:"Include only obligations that apply to your actual activity and location." },
  { key:"launch", label:"Launch and first customer test", group:"before", hint:"Samples, local outreach, transport or a small experiment." },
  { key:"rent", label:"Rent or workspace", group:"monthly", hint:"Count this separately from a refundable deposit." },
  { key:"people", label:"People and owner draw", group:"monthly", hint:"Include the cash you need to live, even if you take no formal salary." },
  { key:"supplies", label:"Replenishment and delivery", group:"monthly", hint:"Regular supplies, packaging and the trips you make to fulfil." },
  { key:"software", label:"Utilities, software and fees", group:"monthly", hint:"Electricity, data, subscriptions, platform or payment fees." },
] as const;
type CostKey = (typeof costLines)[number]["key"];
type Scenario = "service" | "product" | "local";
const scenarios: Record<Scenario,{ title:string; question:string; before:string; repeat:string; proof:string }> = {
  service:{title:"A service from your skills",question:"Can a buyer commit before you pay for tools or a workspace?",before:"Equipment, travel to a first client, any required permission.",repeat:"Your working hours, travel, data, subcontracting and rework.",proof:"Offer one tightly scoped job, name the price and count every hour."},
  product:{title:"A small physical product",question:"How little stock can you test without losing the buyer's trust?",before:"Sample, initial materials, packaging, supplier minimum, deposit.",repeat:"Replenishment, delivery, returns, damaged units and storage.",proof:"Sell one limited batch at the actual delivered price; track leftovers."},
  local:{title:"A neighbourhood operation",question:"Will the local repeat demand cover a fixed place and schedule?",before:"Premises deposit, basic setup, permission and opening stock.",repeat:"Rent, power, staff, replenishment and local delivery.",proof:"Observe the catchment and collect specific buyer commitments before a long lease."}
};
const money=(n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
const amount=(s:string)=>Math.max(0,Number(s)||0);

export const Route=createFileRoute("/startup-costs-india")({
  head:()=>({meta:[
    {title:"Startup Costs in India: Plan the Cash Before Your First Sale | BusinessIdea.io"},
    {name:"description",content:"Build a transparent startup cost ledger in rupees. Separate one-time setup, recurring commitments, deposits, owner needs and your first-month cash gap before starting a business in India."},
    {property:"og:title",content:"Startup costs in India | BusinessIdea.io"},
    {property:"og:description",content:"What must leave your pocket before money comes back? Make your own first-sale cost map."},
    {property:"og:type",content:"article"},
  ]}),
  component:StartupCostsPage,
});

function StartupCostsPage(){
  const [values,setValues]=useState<Record<CostKey,string>>({deposit:"",equipment:"",stock:"",registration:"",launch:"",rent:"",people:"",supplies:"",software:""});
  const [months,setMonths]=useState("3");
  const [buffer,setBuffer]=useState("");
  const [receipts,setReceipts]=useState("");
  const [scenario,setScenario]=useState<Scenario>("service");
  const [notes,setNotes]=useState("");
  const before=costLines.filter(x=>x.group==="before").reduce((n,x)=>n+amount(values[x.key]),0);
  const monthly=costLines.filter(x=>x.group==="monthly").reduce((n,x)=>n+amount(values[x.key]),0);
  const planned=before+monthly*amount(months)+amount(buffer);
  const gap=Math.max(0,planned-amount(receipts));
  const filled=Object.values(values).some(Boolean)||Boolean(buffer)||Boolean(receipts);
  const current=scenarios[scenario];
  return <>
    <JsonLd schema={[
      webPageSchema({path:"/startup-costs-india",name:"Startup costs in India before the first sale",description:"An editable cash ledger and practical guide for separating one-time setup, recurring commitments and timing risk."}),
      breadcrumbSchema([{name:"Home",path:"/"},{name:"Startup costs in India",path:"/startup-costs-india"}]),
    ]}/>
    <GlassShell><div className="sc-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Startup costs in India</span></nav>
      <header className="sc-hero">
        <div><p className="gh-eyebrow">THE FIRST RUPEE · INDIA</p><h1>Know the cost <em>before</em> the courage.</h1><p className="sc-lede">A new business idea can ask for money long before it earns any. Put the awkward payments on one page: the deposit, the first delivery, the month your customer pays late, and the amount you still need at home.</p><a href="#cost-ledger" className="gh-button gh-button-primary">Open your cost ledger <ArrowRight size={17}/></a></div>
        <aside className="sc-hero-note" aria-label="Cost sequence"><span>BEFORE OPENING</span><strong>Cash leaves.</strong><span>WHILE WORKING</span><strong>Cash keeps leaving.</strong><span>AFTER SELLING</span><strong>Cash may arrive later.</strong><p>The timing is part of the startup cost.</p></aside>
      </header>

      <section className="sc-opening" aria-labelledby="sc-opening-title"><div><p className="gh-eyebrow">THE REFRAME</p><h2 id="sc-opening-title">“How much to start?” is three questions.</h2><p>Most founders hear a setup number. That number does not tell you how many weeks you can keep the promise you have made to customers.</p></div><div className="sc-triple"><article><h3>What must be paid first?</h3><p>Deposit, essentials, a small test batch, permissions that apply, and the cost of finding the first buyer.</p></article><article><h3>What repeats before collection?</h3><p>Rent, data, ingredients, transport, people and the cash your household needs each month.</p></article><article><h3>When does money return?</h3><p>Advance, delivery payment, invoice terms and refunds make a different cash picture for the same sales total.</p></article></div></section>

      <section id="cost-ledger" className="sc-ledger" aria-labelledby="sc-ledger-title"><div className="sc-ledger-head"><div><p className="gh-eyebrow">YOUR NUMBERS, NOT A GUESS</p><h2 id="sc-ledger-title">Make the first-sale cash map.</h2><p>Enter rupees you can defend with a quote, a bill or a careful estimate. Blank fields count as zero for arithmetic, but they do not mean the true cost is zero. Nothing is sent or saved.</p></div><div className="sc-ledger-symbol" aria-hidden="true">₹<span>→</span>₹</div></div>
      <div className="sc-workspace"><div className="sc-inputs">
        <fieldset><legend>Cash needed before opening</legend>{costLines.filter(x=>x.group==="before").map(line=><label className="sc-field" key={line.key}><span><strong>{line.label}</strong><small>{line.hint}</small></span><span className="sc-number"><i>₹</i><input type="number" min="0" inputMode="decimal" aria-label={line.label+" in rupees"} placeholder="0" value={values[line.key]} onChange={e=>setValues(v=>({...v,[line.key]:e.target.value}))}/></span></label>)}</fieldset>
        <fieldset><legend>Cash needed each month</legend>{costLines.filter(x=>x.group==="monthly").map(line=><label className="sc-field" key={line.key}><span><strong>{line.label}</strong><small>{line.hint}</small></span><span className="sc-number"><i>₹</i><input type="number" min="0" inputMode="decimal" aria-label={line.label+" in rupees"} placeholder="0" value={values[line.key]} onChange={e=>setValues(v=>({...v,[line.key]:e.target.value}))}/></span></label>)}</fieldset>
      </div><div className="sc-summary">
        <p className="gh-eyebrow">CASH READOUT</p><div><span>Before opening</span><strong>{money(before)}</strong></div><div><span>Each month</span><strong>{money(monthly)}</strong></div>
        <label>Months of operating cash to plan for<input type="number" min="0" max="36" step="1" value={months} onChange={e=>setMonths(e.target.value)} inputMode="numeric"/></label>
        <label>Extra cash buffer (₹)<input type="number" min="0" value={buffer} onChange={e=>setBuffer(e.target.value)} inputMode="decimal" placeholder="0"/></label>
        <label>Cash you expect to collect during this window (₹)<input type="number" min="0" value={receipts} onChange={e=>setReceipts(e.target.value)} inputMode="decimal" placeholder="0"/></label>
        <div className="sc-total" aria-live="polite"><span>Uncovered cash in this plan</span><strong>{money(gap)}</strong><small>Before opening + ({amount(months)} × monthly) + buffer − expected collections, floored at zero.</small></div>
        <p className="sc-caveat">{filled?"This is only as reliable as the amounts and collection dates you enter.": "Start with your own numbers. The all-zero readout is an empty worksheet, not a zero-cost business."} Taxes, interest, inflation and unexpected losses are outside this simple ledger. A deposit is cash tied up, not necessarily an expense.</p>
      </div></div></section>

      <section className="sc-patterns" aria-labelledby="sc-patterns-title"><div><p className="gh-eyebrow">SAME IDEA, DIFFERENT WEIGHT</p><h2 id="sc-patterns-title">The model changes what you pay for first.</h2><p>Choose a working pattern. The amounts stay yours; these questions change because the actual obligations change.</p><div className="sc-choice" role="group" aria-label="Business pattern">{(Object.keys(scenarios) as Scenario[]).map(key=><button type="button" key={key} aria-pressed={scenario===key} onClick={()=>setScenario(key)}>{scenarios[key].title}</button>)}</div></div><article className="sc-pattern-panel" aria-live="polite"><p className="gh-eyebrow">{current.title}</p><h3>{current.question}</h3><dl><div><dt>Before opening</dt><dd>{current.before}</dd></div><div><dt>While operating</dt><dd>{current.repeat}</dd></div><div><dt>Cheapest useful proof</dt><dd>{current.proof}</dd></div></dl><Link to="/business-models-india">Compare the full business models <ArrowUpRight size={17}/></Link></article></section>

      <section className="sc-calendar" aria-labelledby="sc-calendar-title"><div><p className="gh-eyebrow">THE DATE MATTERS</p><h2 id="sc-calendar-title">A sale can happen before the payment does.</h2><p>Consider a local service: the founder pays to travel, delivers the work, sends an invoice and waits for the client’s payment date. Even if the job earns more than it costs, the founder needs cash during that gap.</p></div><ol><li><span>Day 0</span><strong>Promise</strong><p>Agree on scope, date, deposit and what triggers final payment.</p></li><li><span>Before delivery</span><strong>Spend</strong><p>Buy materials or travel. Keep the receipt and record the date.</p></li><li><span>After delivery</span><strong>Collect</strong><p>Record the due date and actual date, including deductions or rework.</p></li><li><span>Next cycle</span><strong>Repeat?</strong><p>Could you fund another order if this buyer paid a week later?</p></li></ol><p><Link to="/startup-cash-flow-india">Put those dates into the cash-flow calendar <ArrowUpRight size={17}/></Link></p></section>

      <section className="sc-decisions" aria-labelledby="sc-decisions-title"><div><p className="gh-eyebrow">PROTECT THE PERSON STARTING</p><h2 id="sc-decisions-title">Lower the fixed promise, not the quality.</h2><p>If the ledger feels heavy, revise the first version of the business. A smaller test should still deliver a real outcome to a real buyer.</p><Link to="/business-idea-risk-check">Set a personal cash and time boundary <ArrowUpRight size={17}/></Link></div><div className="sc-decision-list"><article><div><h3>Delay the permanent space.</h3><p>Can you serve the first buyer from a permitted home setup, a rented slot, or the customer’s location? Check local rules and suitability before assuming any option is allowed.</p></div></article><article><div><h3>Buy for a named first order.</h3><p>Ask suppliers about small quantities, lead times and return terms. A bulk discount is not a saving if cash sits on a shelf.</p></div></article><article><div><h3>Ask for a fair deposit where appropriate.</h3><p>Put scope, payment milestones and cancellation terms in writing. Do not treat a promise to pay as collected cash.</p></div></article><article><div><h3>Count your own breathing room.</h3><p>The business does not get to borrow indefinitely from rent, food or family obligations. Put a realistic owner draw in the monthly line.</p></div></article></div></section>

      <section className="sc-notebook" aria-labelledby="sc-notebook-title"><div><p className="gh-eyebrow">KEEP THE NEXT QUESTION</p><h2 id="sc-notebook-title">Which number needs a real quote?</h2><p>Write down the assumption you would verify first. This note stays in this browser tab during the visit; copy it before leaving.</p></div><label>My first cost question<textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Example: What would a supplier charge for only 20 units, delivered to my area?" rows={5}/></label></section>

      <section className="sc-faq" aria-labelledby="sc-faq-title"><div><p className="gh-eyebrow">BEFORE YOU COMMIT</p><h2 id="sc-faq-title">Questions founders ask too late.</h2></div><div><details><summary>Is the cheapest startup idea automatically safer?</summary><p>No. Low initial spending can still leave you with unpaid time, difficult customers or a model that cannot earn enough per sale. Compare cash at risk, buyer evidence and your ability to deliver.</p></details><details><summary>Should I count a refundable security deposit?</summary><p>Yes, in cash needed before opening. It may be recoverable later, but you cannot use it to pay a current bill while it is held elsewhere. Read the actual agreement and conditions.</p></details><details><summary>Can I use estimated sales to reduce the cash gap?</summary><p>You can enter a collection scenario, but keep it separate from committed orders or money received. Run the ledger again with zero collections and with a later payment date.</p></details><details><summary>Where do taxes and registrations fit?</summary><p>Requirements depend on the activity, entity, location and scale. Verify the obligations for your exact case with current official sources or qualified advice, then enter the actual expected cash amount. This worksheet does not determine legal obligations.</p></details></div></section>
      <footer className="sc-final"><div><p className="gh-eyebrow">THE NEXT DECISION</p><h2>Can one sale carry its share?</h2><p>The cash map shows what must be funded. Now test the price, direct cost and repeat work of one real offer; then speak to the first buyer before spending on a polished launch.</p></div><div><Link to="/business-models-india" className="gh-button gh-button-primary">Test the money model <Calculator size={17}/></Link><Link to="/startup-idea-validation" className="gh-button gh-button-secondary">Take the field notebook <ClipboardList size={17}/></Link></div></footer>
    </div></GlassShell>
  </>;
}
