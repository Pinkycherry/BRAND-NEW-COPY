import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ClipboardList, Copy, Download } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";

export const Route=createFileRoute("/templates")({head:()=>({meta:[{title:"Founder Checklists | BusinessIdea.io"},{name:"description",content:"Read practical founder checklists for planning, comparison, demand and risk."}]}),component:TemplatesPage});
const wrap="mx-auto max-w-6xl px-4 md:px-6";
const card="group block rounded-xl border bg-card p-5 shadow-sm transition hover:border-primary/50";
const editableTemplates = [
  { id: "buyer-profile", title: "Buyer profile", category: "Discover", description: "Describe one reachable buyer and the situation in which the problem appears.", content: `BUYER PROFILE

Buyer group:
Role / situation:
Town, city or service area:
Who uses the product or service?
Who approves and pays?

RECENT PROBLEM
Describe the last time the problem happened:
What did the buyer do instead?
What did the workaround cost in money, time or effort?
How often has this happened?

BUYING CONDITIONS
What triggers a purchase?
What alternatives are already used?
What creates trust or hesitation?
What would make the buyer say no?

EVIDENCE
Direct observation or quote:
Source and date:
What is still an assumption?
Next question to verify:` },
  { id: "interview-script", title: "Customer interview script", category: "Validate", description: "Ask about past behaviour before presenting your offer.", content: `CUSTOMER INTERVIEW SCRIPT

Purpose of this conversation:
Buyer profile:
Recent problem to understand:

OPENING
“I am trying to understand how people handle [problem]. I am not asking you to approve an idea. May I ask about the last time this happened?”

QUESTIONS
1. Tell me about the last time this happened.
2. What did you do to handle it?
3. What did that cost in money, time or effort?
4. What have you already tried?
5. Who decides whether to pay for a solution?
6. What would make you change from the current option?

ONLY AFTER THE STORY
Describe the smallest offer:
State the price:
Ask for one specific next action:

RECORD
Exact words / observable action:
What was evidence?
What was opinion?
Follow-up date:
What should change in the next interview?` },
  { id: "competitor-matrix", title: "Alternative and competitor matrix", category: "Research", description: "Compare what buyers already use, including doing nothing.", content: `ALTERNATIVE COMPARISON

Buyer and problem:
Market / location:
Date checked:

| Alternative | Price / cost evidence | What it does well | Friction or gap | Source and date |
| --- | --- | --- | --- | --- |
| Existing provider | | | | |
| DIY / informal workaround | | | | |
| Delay / do nothing | | | | |
| Proposed offer | | | | |

BUYER CHOICE
What matters most to the buyer?
What switching cost exists?
What proof would make a new provider trustworthy?
What is still unknown?

Do not score an alternative unless the same evidence was collected for each one.` },
  { id: "demand-test", title: "Demand test brief", category: "Validate", description: "Define the offer, buyer, action and stopping condition before outreach.", content: `DEMAND TEST BRIEF

Idea / offer:
Specific buyer:
Location / channel:
Test start and end date:

OFFER
Outcome promised:
Included:
Not included:
Price and payment terms:
Delivery date / capacity:

THE ASK
What action will the buyer take?
What counts as a real commitment?
What is only interest?

MEASUREMENT
People reached:
Asked for details:
Booked / ordered / paid:
Objections heard:
Direct evidence and source:

DECISION RULE
What result would justify one more test?
What result would make you change the offer?
What result would make you stop?
Next review date:` },
  { id: "one-page-plan", title: "One-page business plan", category: "Plan", description: "A compact operating plan grounded in buyer, offer, costs and evidence.", content: `ONE-PAGE BUSINESS PLAN

Business / offer:
Founder and location:
Target buyer:
Problem and current alternative:

OFFER
What will be delivered?
Why would the buyer choose it?
Price and payment timing:
How will the first ten relevant buyers be reached?

DELIVERY
People, skills and time required:
Suppliers / equipment:
Permissions to verify for this activity:
Quality and customer support:

CASH
One-time setup:
Monthly commitments:
Direct cost per sale:
Cash needed before collection:
Expected collection date:

EVIDENCE AND RISKS
What has a buyer actually done?
What remains an assumption?
Three reasons this may fail:
Smallest next test:
Decision date:` },
  { id: "pitch-outline", title: "Pitch deck outline", category: "Present", description: "A concise investor or partner narrative; fill only with supportable facts.", content: `PITCH DECK OUTLINE

1. THE PROBLEM
Who experiences it?
What recent evidence shows it matters?

2. THE CUSTOMER
Who uses it?
Who pays?
What is the first reachable segment?

3. THE OFFER
What do you provide?
What changes for the customer?

4. ALTERNATIVES
What do customers use today?
Why might they switch?

5. BUSINESS MODEL
Who pays, how much and when?
What does delivery cost?

6. TRACTION / EVIDENCE
Paid pilots, repeat use, signed commitments or interviews:
Dates and sources:
Separate actuals from projections.

7. GO-TO-MARKET
First channel:
First customer acquisition steps:

8. OPERATIONS AND RISKS
What must be built or supplied?
Key dependencies and risks:

9. FINANCIAL NEED
Amount requested:
Use of funds:
Milestones the funds unlock:

10. THE ASK
What decision or introduction are you requesting?

Do not invent customer counts, revenue, market size or testimonials. Mark projections clearly.` },
] as const;
const checklists=[
  ["Startup launch plan","/startup-launch-plan-india"],
  ["Business demand test","/business-demand-test-india"],
  ["Compare two ideas","/startup-idea-comparison"],
  ["Founder decision journal","/founder-decision-journal"],
  ["Business idea risk check","/business-idea-risk-check"],
  ["Business idea research","/business-idea-research-india"],
];
function TemplatesPage(){
  const [selectedId,setSelectedId]=useState<string>(editableTemplates[0].id);
  const [draft,setDraft]=useState<string>(editableTemplates[0].content);
  const [status,setStatus]=useState("");
  const selectedTemplate=editableTemplates.find(item=>item.id===selectedId)??editableTemplates[0];
  function chooseTemplate(id:string){const next=editableTemplates.find(item=>item.id===id);if(!next)return;setSelectedId(id);setDraft(next.content);setStatus("");}
  async function copyDraft(){try{await navigator.clipboard.writeText(draft);setStatus("Template copied. You can paste and adapt it.");}catch{setStatus("Copy was blocked. Select the text in the editor and copy it manually.");}}
  function downloadDraft(){const blob=new Blob([draft],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=selectedTemplate.id+".txt";document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);setStatus("Your editable text file is ready.");}
  return <V2Frame active="/tools">
  <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex items-center gap-2 py-3 text-sm`}><a href="/">Home</a><ChevronRight size={15}/><span>Templates</span></nav></div>
  <section className="border-b bg-gradient-to-br from-amber-50 via-white to-sky-50 py-10 lg:py-14"><div className={wrap}><span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-bold text-amber-900">Editable founder templates</span><h1 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">Start with a useful first draft.</h1><p className="mt-4 max-w-2xl text-slate-600">Choose a template, edit the wording for your business and copy it or download a plain-text file. These are working starting points, not completed plans or evidence.</p><div className="mt-6 flex flex-wrap gap-3"><a href="#template-studio" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Open template editor <ArrowRight size={17}/></a><a href="/tools" className="inline-flex min-h-11 items-center rounded-lg border bg-white px-6 py-3 font-semibold">Tools directory</a></div></div></section>
  <section id="template-studio" className="scroll-mt-24 bg-slate-50 py-10 lg:py-12"><div className={wrap}><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-widest text-amber-800">Template editor</p><h2 className="mt-2 text-2xl font-bold text-slate-950">Choose, edit and take it with you.</h2><p className="mt-2 text-sm leading-6 text-slate-600">{selectedTemplate.description} Your edits stay in this page session; copy or download them before leaving.</p></div><div className="mt-5 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"><label className="text-sm font-semibold">Choose a template<select value={selectedId} onChange={event=>chooseTemplate(event.target.value)} className="mt-2 block min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3">{editableTemplates.map(item=><option key={item.id} value={item.id}>{item.title} · {item.category}</option>)}</select></label><label className="text-sm font-semibold">Edit your template<textarea value={draft} onChange={event=>{setDraft(event.target.value);setStatus("");}} rows={18} className="mt-2 block min-h-[22rem] w-full rounded-xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800"/></label><div className="flex flex-wrap gap-3"><button type="button" onClick={()=>void copyDraft()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"><Copy size={16}/>Copy template</button><button type="button" onClick={downloadDraft} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-blue-500"><Download size={16}/>Download .txt</button><button type="button" onClick={()=>{setDraft(selectedTemplate.content);setStatus("Original template restored.");}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500">Reset draft</button></div>{status&&<p className="text-sm text-blue-800" role="status">{status}</p>}</div></div></section>
  <section id="catalog" className="scroll-mt-24 py-12 lg:py-16"><div className={wrap}><h2 className="text-2xl font-bold">Connected founder workspaces</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{checklists.map(([title,href])=><a key={href} href={href} className={card}><ClipboardList className="text-primary"/><h3 className="mt-4 text-lg font-semibold group-hover:text-primary">{title}</h3><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open workspace <ArrowRight size={16}/></span></a>)}</div></div></section>
  <section className="border-t bg-muted/20 py-12"><div className={wrap}><h2 className="text-2xl font-bold">Pick a checklist by what you need to decide</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{checklists.map(([title,href])=><a className={card} key={href} href={href}>{title} <ArrowRight size={16} className="ml-1 inline text-primary"/></a>)}</div></div></section>
  <section className="py-12"><div className={wrap}><h2 className="text-2xl font-bold">Next step</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{[["Browse ideas","/browse"],["Calculate startup costs","/calculator/startup-cost"],["Read validation guide","/startup-idea-validation"]].map(([t,h])=><a key={h} href={h} className={card}>{t} <ArrowRight size={16} className="inline text-primary"/></a>)}</div><h2 className="mt-10 text-2xl font-bold">Related resources</h2><div className="mt-4 flex flex-wrap gap-2">{[["Tools","/tools"],["Idea lists","/lists"],["Startup guides","/startup-guides"]].map(([t,h])=><a className="rounded-full border bg-card px-4 py-2 text-sm" key={h} href={h}>{t}</a>)}</div></div></section>
</V2Frame>}
