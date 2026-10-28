import { SellerFaq } from "@/components/v2/faq";
import { ReadOnlyChecklist } from "@/components/v2/read-only-checklist";
import { V2PageFaq, V2PageHero, V2PageSection } from "@/components/v2/page-sections";

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CollectionFrame, CollectionLinks } from "@/components/collection-framework";

export const Route = createFileRoute("/product")({
 head: () => ({ meta: [
  { title: "Business Idea Validation Workbench in India | BusinessIdea.io" },
  { name: "description", content: "Write a specific buyer, problem, current workaround and small offer. Take the brief into a real buyer conversation and existing research tools." },
  { name: "robots", content: "noindex,nofollow,noarchive,noimageindex" },
 ] }), component: ProductPage,
});
const prompts = [
 { id:"buyer",label:"Who is the buyer?",hint:"A person in a situation, not everybody",example:"Office workers who miss the canteen window" },
 { id:"event",label:"What happened recently?",hint:"A specific recurring problem, not a broad trend",example:"They needed lunch after the kitchen closed" },
 { id:"workaround",label:"What do they do now?",hint:"Include a purchase, time cost or existing alternative",example:"They order from a nearby shop and wait" },
 { id:"offer",label:"What small offer will you test?",hint:"An outcome, delivery window and stated price",example:"A preordered lunch delivered before the break" },
] as const;
type Field = (typeof prompts)[number]["id"];
function ProductPage(){
 const [values,setValues]=useState<Record<Field,string>>({buyer:"",event:"",workaround:"",offer:""});
 const [step,setStep]=useState(0);
 const [attempted,setAttempted]=useState(false);
 const [copyState,setCopyState]=useState("");
 const complete=prompts.every(item=>values[item.id].trim().length>=8);
 const brief=prompts.map(item=>item.label+"\n"+values[item.id].trim()).join("\n\n");
 const copy=async()=>{if(!complete){setAttempted(true);return;}try{await navigator.clipboard.writeText(brief);setCopyState("Brief copied. Keep it somewhere you control.");}catch{setCopyState("Copy is unavailable here. Select the text above and copy it manually.");}};
 return <CollectionFrame active="/product">
  <V2PageHero className="cf-wrap cf-hero"><div><span className="cf-kicker">THE VALIDATION WORKBENCH</span><h1>A sharper idea starts with <em>a buyer you can name.</em></h1><p>Write down the person, the last occurrence, the current workaround and a small offer. These questions help you ask a better question. It does not produce an AI score or claim a market verdict.</p><div className="cf-actions"><a href="#workbench" className="cf-button cf-button-dark">Review the four questions <ArrowRight size={17}/></a><a href="/blueprints" className="cf-button cf-button-light">Start from a published idea <ArrowUpRight size={17}/></a></div></div><div className="cf-visual" aria-label="Validation brief stages"><span>FROM CLAIM TO CONTACT</span><strong>Four fields. One useful conversation.</strong><div className="cf-visual-row">A buyer in a situation <span>WHO</span></div><div className="cf-visual-row">A recent workaround <span>WHAT</span></div><div className="cf-visual-row">A small next action <span>TEST</span></div></div></V2PageHero>
  <div className="cf-band"><div className="cf-wrap"><b>WHAT THIS DOES</b><span>Organises your claim</span><span>Lists the four questions</span><span>Points you to working validation paths</span></div></div>
  <V2PageSection className="cf-section cf-wrap"><div className="cf-section-heading"><span className="cf-kicker">THE PRODUCT JOURNEY</span><h2>Evidence before a confident answer.</h2><p>The current workbench prepares your next test. Research models and reports require their own working integrations; this page will not simulate either.</p></div><div className="cf-steps"><div className="cf-step"><h3>Describe the situation.</h3><p>Name a buyer and the last time they encountered the problem.</p></div><div className="cf-step"><h3>Inspect the alternative.</h3><p>Find what they already do, including inconvenience and money spent.</p></div><div className="cf-step"><h3>Ask for commitment.</h3><p>Take a clear offer into an appropriate conversation, booking or small test.</p></div></div></V2PageSection>
  <ReadOnlyChecklist id="workbench" title="Put the assumption into words." items={prompts.map(item => `${item.label} ${item.hint}`)} />
  <V2PageSection className="cf-section cf-wrap cf-feature"><div><span className="cf-kicker">NEXT: THE REAL WORLD</span><h2>Take the brief to a buyer.</h2><p>Ask about a recent event before describing your offer. Keep the buyer's own words separate from your interpretation. A polite reaction is weaker than a specific booking, purchase or agreed next step.</p><p>Then put your price, delivery cost and cash timing beside the field evidence. A buyer's yes can still lead to a losing sale.</p></div><aside className="cf-feature-panel"><h3>Follow the evidence</h3><a href="/first-customer-india">Find one reachable buyer <ArrowUpRight size={17}/></a><a href="/business-demand-test-india">Design a small demand test <ArrowUpRight size={17}/></a><a href="/startup-costs-india">Check cash at risk <ArrowUpRight size={17}/></a><a href="/templates">Preview the evidence tracker <ArrowUpRight size={17}/></a></aside></V2PageSection>
  <V2PageSection className="cf-dark cf-section"><div className="cf-wrap cf-feature"><div><span className="cf-kicker">PUBLISHED IDEA PATH</span><h2>Research a completed blueprint.</h2><p>The published idea pages have a Validate choice that prepares research prompts for external models. Each provider has its own account and rules. Check any cited source yourself and bring the questions back to a buyer.</p></div><div className="cf-feature-panel"><h3>Choose where to continue</h3><a href="/blueprints">Select a published idea <ArrowUpRight size={17}/></a><a href="/startup-idea-validation">Read the full validation field guide <ArrowUpRight size={17}/></a><a href="/business-idea-risk-check">Set a stop boundary <ArrowUpRight size={17}/></a></div></div></V2PageSection>
  <SellerFaq title="What this workbench can tell you." faq={[{q:"Is this an AI validation result?",a:<><p>No. It structures your own claim and shows working next steps. It does not estimate market size, score viability or generate a report.</p></>},{q:"Are my answers stored?",a:<><p>No. This page presents questions to take into a real buyer conversation.</p></>},{q:"What if I cannot answer a question?",a:<><p>That is a useful research gap. Speak to a person who recently faced the problem and ask about what happened last time.</p></>}]} />
  <CollectionLinks current="/product"/>
 </CollectionFrame>;
}
