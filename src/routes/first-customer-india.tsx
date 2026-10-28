import { SellerFaq } from "@/components/v2/faq";
import { ReadOnlyChecklist } from "@/components/v2/read-only-checklist";
import { V2PageCta, V2PageFaq, V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/first-customer.css";

type Signal="heard"|"asked"|"committed";
type Entry={id:number;group:string;problem:string;alternative:string;signal:Signal};
const contexts=[
  {key:"neighbourhood",title:"A neighbourhood buyer",where:"Observe the street, market, apartment group or service queue where the problem already appears.",ask:"What did you pay for the last time this happened?",risk:"A friend who likes you may praise the idea without needing the offer."},
  {key:"work",title:"A business buyer",where:"Find the person who owns the budget, not only the person who uses the service.",ask:"Who approved the last purchase, and when did it become urgent?",risk:"A meeting is not a purchase order; procurement and payment timing matter."},
  {key:"online",title:"An online buyer",where:"Watch existing searches, product reviews and questions; then speak with people in a narrow group.",ask:"Which option did you almost buy, and what stopped you?",risk:"Views and followers do not prove that a defined offer will sell."},
] as const;
export const Route=createFileRoute("/first-customer-india")({
  head:()=>({meta:[
    {title:"Find Your First Customer in India: A Practical Business Idea Field Map | BusinessIdea.io"},
    {name:"description",content:"Locate a first customer for a business idea in India. Map the trigger, current alternative, payer and evidence of a real commitment with a browser-local conversation log."},
    {property:"og:title",content:"Find your first customer in India | BusinessIdea.io"},
    {property:"og:type",content:"article"},
  ]}),
  component:FirstCustomerPage,
});
function FirstCustomerPage(){
  const [context,setContext]=useState(0),[group,setGroup]=useState(""),[problem,setProblem]=useState(""),[alternative,setAlternative]=useState("");
  const [signal,setSignal]=useState<Signal>("heard"),[entries,setEntries]=useState<Entry[]>([]);
  const current=contexts[context];
  function add(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!group.trim()||!problem.trim())return;
    setEntries(rows=>[{id:Date.now(),group:group.trim(),problem:problem.trim(),alternative:alternative.trim(),signal},...rows]);
    setGroup("");setProblem("");setAlternative("");setSignal("heard");
  }
  return <>
    <JsonLd schema={[
      webPageSchema({path:"/first-customer-india",name:"Find a first customer for a business idea in India",description:"A field map for identifying the buyer, their existing alternative and a specific commitment."}),
      breadcrumbSchema([{name:"Home",path:"/"},{name:"First customer in India",path:"/first-customer-india"}]),
    ]}/>
    <GlassShell><div className="fc-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>First customer in India</span></nav>
      <V2PageHero className="fc-hero"><div><p className="gh-eyebrow">THE PERSON BEFORE THE PLAN · INDIA</p><h1>Your first customer has a <em>Tuesday.</em></h1><p>They are already fixing the problem somehow, between work, family and the rest of their day. Find that moment before you buy a logo, a lease or a month of ads.</p><a href="#buyer-map" className="gh-button gh-button-primary">Map one buyer <ArrowRight size={17}/></a></div><aside><span>THE FIELD QUESTION</span><strong>“What happened the last time this problem interrupted your day?”</strong><p>Start with a past event. It is easier to learn from than a compliment about a future idea.</p></aside></V2PageHero>
      <V2PageSection id="buyer-map" className="fc-map" aria-labelledby="fc-map-title"><div><p className="gh-eyebrow">THE BUYER MAP</p><h2 id="fc-map-title">Look for a moment, not a demographic.</h2><p>“Everyone in my city” is too broad for a first sale. Name the situation that makes someone act, where it occurs and who can actually pay.</p></div><div className="fc-map-lanes"><article><span>TRIGGER</span><h3>What broke, ran out or became urgent?</h3><p>A leaking tap, a delayed order, a missed deadline, a training gap. Look for a repeated moment rather than a vague preference.</p></article><article><span>WORKAROUND</span><h3>What do they do today?</h3><p>Ask about the last purchase, person they called, app they used or task they postponed. That is the alternative you have to beat.</p></article><article><span>PAYMENT</span><h3>Who decides and who transfers money?</h3><p>For a household or a company, the user and payer may differ. Know the approval step and collection date.</p></article></div></V2PageSection>
      <V2PageSection className="fc-lens" aria-labelledby="fc-lens-title"><div><p className="gh-eyebrow">CHOOSE THE SETTING</p><h2 id="fc-lens-title">Where can you meet that moment?</h2><p>The first conversation depends on the buying setting. Choose a lens; these are prompts, not a claim that any channel will work for your idea.</p><div className="fc-lens-tabs" role="group" aria-label="Buyer setting">{contexts.map((item,index)=><button type="button" key={item.key} aria-pressed={context===index} onClick={()=>setContext(index)}>{item.title}</button>)}</div></div><article aria-live="polite"><p className="gh-eyebrow">{current.title}</p><h3>Where to look</h3><p>{current.where}</p><h3>What to ask</h3><blockquote>“{current.ask}”</blockquote><h3>What can fool you</h3><p>{current.risk}</p></article></V2PageSection>
      <V2PageSection className="fc-conversation" aria-labelledby="fc-conversation-title"><div><p className="gh-eyebrow">A SHORT CONVERSATION</p><h2 id="fc-conversation-title">Ask about their life, then your offer.</h2><p>A sales pitch too early teaches you what people say to be polite. Start with a specific past situation. Let them explain the trade-off they already make.</p></div><ol><li><strong>When did this last happen?</strong><p>Hear the date, setting and consequence. A remembered incident is more useful than “it happens sometimes.”</p></li><li><strong>What did you do?</strong><p>Find the existing provider, price, delay and effort. Do not argue against their workaround.</p></li><li><strong>What would change the choice?</strong><p>Ask about quality, trust, timing, proximity and the real payer.</p></li><li><strong>Will you try a defined offer?</strong><p>State scope, date and price. Listen for a payment, booking, introduction or concrete refusal.</p></li></ol></V2PageSection>
      <aside className="fc-research-path"><strong>Before you pitch a new answer:</strong> observe the place, current alternatives and one counterexample. <Link to="/business-idea-research-india">Use the business idea evidence desk <ArrowUpRight size={16}/></Link></aside>
      <V2PageSection className="fc-signals" aria-labelledby="fc-signals-title"><div><p className="gh-eyebrow">READ THE SIGNAL HONESTLY</p><h2 id="fc-signals-title">Interest is a door. Commitment is a step through it.</h2><p>Do not turn polite responses into a market-size number. Separate what someone said from what they spent, booked or introduced.</p></div><div><article><span>HEARD</span><strong>“That sounds useful.”</strong><p>A conversation starter. Ask about the last incident and current alternative.</p></article><article><span>ASKED</span><strong>“Can you send the details?”</strong><p>More specific interest. Send exact scope and price; watch what happens next.</p></article><article><span>COMMITTED</span><strong>“I will book or pay.”</strong><p>Record the agreed amount, date and conditions. A verbal plan can still change before collection.</p></article></div><p className="fc-signal-next">Turn that first interest into a defined test: <Link to="/business-demand-test-india">choose a commitment and record the reply <ArrowUpRight size={16}/></Link></p></V2PageSection>
      <ReadOnlyChecklist eyebrow="YOUR CONVERSATION LOG" title="Keep observation separate from hope." items={["Buyer group or situation","Problem they described","What they used or paid for instead"]} />
      <V2PageSection className="fc-reality" aria-labelledby="fc-reality-title"><div><p className="gh-eyebrow">INDIA, IN REAL LIFE</p><h2 id="fc-reality-title">Make the first promise small enough to keep.</h2><p>Distance, timing, trust, language, payment method and a local referral can change a first sale. Use what you learned to define an offer you can actually deliver.</p></div><div><article><strong>Place</strong><p>Can you reach the buyer or fulfil the order reliably in their area?</p></article><article><strong>Trust</strong><p>What proof, sample or clear terms would make a stranger comfortable trying you?</p></article><article><strong>Cash</strong><p>Will you pay to deliver before the customer pays you? Count that gap.</p></article><article><strong>Repeat</strong><p>Is the need occasional or recurring, and would they choose you again?</p></article></div></V2PageSection>
      <SellerFaq title="Common first-customer questions." faq={[{q:"Should I run ads to find the first buyer?",a:<><p>Ads can reach people, but a small founder can often learn more from direct conversations first. Choose the channel that can reach the actual payer and measure a defined offer, not only clicks.</p></>},{q:"Can friends and family be customers?",a:<><p>They can buy, but separate support for you from repeatable demand. Ask whether the same offer would make sense to someone who does not know you.</p></>},{q:"How many interviews prove the idea?",a:<><p>No fixed count proves a business. Look for patterns in real past behaviour, specific commitments, delivery cost and repeated objections. Keep testing until you understand the risk you are about to pay for.</p></>}]} />
      <V2PageCta className="fc-final"><div><p className="gh-eyebrow">THE NEXT REAL STEP</p><h2>Take one offer into the world.</h2><p>Use the conversation to name the smallest useful delivery, price it with your own costs, and validate what could make you stop.</p></div><div><Link to="/business-pricing-india" className="gh-button gh-button-primary">Work out the first price <ArrowUpRight size={17}/></Link><Link to="/startup-idea-validation" className="gh-button gh-button-secondary">Plan a field test <ArrowUpRight size={17}/></Link><Link to="/blog/find-first-paying-customer-without-ads" className="fc-article-link">Read the original first-customer article <ArrowUpRight size={17}/></Link></div></V2PageCta>
    </div></GlassShell>
  </>;
}
