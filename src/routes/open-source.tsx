import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Download, ExternalLink, Search, Trash2 } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { ProviderPromptActions } from "@/components/founder-workspace/provider-prompt-actions";
import { buildFounderPrompt, buildProviderHandoffPrompt, useFounderWorkspace } from "@/lib/founder-workspace";

type Candidate = {
  id: string;
  name: string;
  url: string;
  license: string;
  lastActivity: string;
  maintenance: string;
  deployment: string;
  restrictions: string;
  problem: string;
  gap: string;
  evidence: string;
  nextQuestion: string;
};
type CandidateDraft = Omit<Candidate,"id">;
const CANDIDATE_KEY="bbi-open-source-research-v1";
const emptyCandidate=():CandidateDraft=>({name:"",url:"",license:"",lastActivity:"",maintenance:"Unverified",deployment:"Unknown",restrictions:"",problem:"",gap:"",evidence:"",nextQuestion:""});
function normaliseCandidate(value:unknown):Candidate|null{
  if(!value||typeof value!=="object")return null;
  const raw=value as Record<string,unknown>;
  if(typeof raw.id!=="string")return null;
  const read=(key:keyof CandidateDraft,max=1200)=>typeof raw[key]==="string"?(raw[key] as string).slice(0,max):"";
  return {id:raw.id.slice(0,100),name:read("name",200),url:read("url",800),license:read("license",200),lastActivity:read("lastActivity",100),maintenance:read("maintenance",80),deployment:read("deployment",200),restrictions:read("restrictions",800),problem:read("problem",1000),gap:read("gap",1000),evidence:read("evidence",1000),nextQuestion:read("nextQuestion",800)};
}

export const Route=createFileRoute("/open-source")({
  head:()=>({meta:[
    {title:"Open-Source Competitor Research: Find, Check and Compare Existing Tools | BusinessIdea.io"},
    {name:"description",content:"Search existing software, check licences and maintenance signals, and save a local competitor research record before building."},
    {property:"og:title",content:"Open-source competitor research | BusinessIdea.io"},
    {property:"og:type",content:"website"},
  ]}),
  component:OpenSourcePage
});
const wrap="mx-auto max-w-6xl px-4 md:px-6";
const card="rounded-2xl border border-border bg-card p-5 shadow-sm";

function OpenSourcePage(){
  const workspace=useFounderWorkspace();
  const [query,setQuery]=useState("");
  const [draft,setDraft]=useState<CandidateDraft>(emptyCandidate);
  const [candidates,setCandidates]=useState<Candidate[]>([]);
  const [storageReady,setStorageReady]=useState(false);
  useEffect(()=>{
    try{
      const saved=JSON.parse(window.localStorage.getItem(CANDIDATE_KEY)||"[]") as unknown;
      if(Array.isArray(saved))setCandidates(saved.map(normaliseCandidate).filter((item):item is Candidate=>Boolean(item)).slice(0,50));
    }catch{setCandidates([]);}finally{setStorageReady(true);}
  },[]);
  useEffect(()=>{
    if(!storageReady)return;
    try{window.localStorage.setItem(CANDIDATE_KEY,JSON.stringify(candidates));}catch{/* current-session research remains available */}
  },[candidates,storageReady]);
  const updateDraft=(field:keyof CandidateDraft,value:string)=>setDraft(current=>({...current,[field]:value}));
  const addCandidate=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!draft.name.trim()||!draft.url.trim())return;
    setCandidates(current=>[{...draft,id:window.crypto?.randomUUID?.()||String(Date.now())},...current].slice(0,50));
    setDraft(emptyCandidate());
  };
  const removeCandidate=(id:string)=>setCandidates(current=>current.filter(item=>item.id!==id));
  const clearCandidates=()=>{if(window.confirm("Clear all saved competitor records from this browser?"))setCandidates([]);};
  const exportCandidates=()=>{
    const body=candidates.map((item,index)=>["## Candidate "+(index+1)+": "+item.name,"Repository/product: "+item.url,"License: "+(item.license||"Not checked"),"Last activity/release: "+(item.lastActivity||"Not checked"),"Maintenance signal: "+item.maintenance,"Deployment: "+item.deployment,"Commercial restrictions: "+item.restrictions,"Problem served: "+item.problem,"Gap for my buyer: "+item.gap,"Evidence: "+item.evidence,"Next question: "+item.nextQuestion].join("\n")).join("\n\n");
    const url=URL.createObjectURL(new Blob(["# Open-source competitor research\n\n"+body],{type:"text/markdown;charset=utf-8"}));
    const anchor=document.createElement("a");anchor.href=url;anchor.download="businessidea-open-source-research.md";anchor.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  const searchTerm=query.trim();
  const githubUrl="https://github.com/search?q="+encodeURIComponent(searchTerm)+"&type=repositories";
  const gitlabUrl="https://gitlab.com/search?search="+encodeURIComponent(searchTerm)+"&scope=projects";
  const sourceforgeUrl="https://sourceforge.net/directory/?q="+encodeURIComponent(searchTerm);
  const notes=candidates.slice(0,5).map(item=>["Project: "+item.name,"URL: "+item.url,"License: "+item.license,"Last activity: "+item.lastActivity,"Maintenance: "+item.maintenance,"Deployment: "+item.deployment,"Restrictions: "+item.restrictions,"Problem: "+item.problem,"Gap: "+item.gap,"Evidence: "+item.evidence,"Next question: "+item.nextQuestion].filter(Boolean).join(" | ")).join("\n").slice(0,1800);
  const researchPrompt=buildFounderPrompt("red-team",workspace.shortlist,workspace.context)+"\n\nOPEN-SOURCE COMPETITOR NOTES (user-entered; not independently verified by BusinessIdea.io):\n"+(notes||"No candidate records saved yet.")+"\n\nCompare the candidates against the founder's buyer problem. Check official repository and licence sources, maintenance and security evidence, deployment burden, total cost of ownership, commercial restrictions and the specific gap for the buyer. Separate confirmed facts from assumptions. Do not assume a public repository is open source, maintained, secure or commercially reusable.";
  const compactPrompt=buildProviderHandoffPrompt("red-team",workspace.shortlist,workspace.context,notes);

  return <V2Frame active="/topics">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm`}><a href="/" className="hover:text-primary">Home</a><ChevronRight size={15}/><span>Open-source research</span></nav></div>
    <section className="border-b bg-gradient-to-b from-blue-500/10 to-background py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Competitor discovery desk</span><h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">Before you build it, find out what already exists.</h1><p className="mt-5 max-w-3xl text-lg text-muted-foreground">Search public software repositories, check the licence and maintenance signals, then compare the actual gap for your buyer. An existing tool is not automatically a competitor—and an open repository is not automatically safe to reuse.</p><div className="mt-6 flex flex-wrap gap-3"><a href="#discover" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Find existing projects <ArrowRight size={17}/></a><a href="/business-idea-research-india" className="inline-flex min-h-11 items-center rounded-lg border bg-card px-6 py-3 font-semibold">Research the buyer problem</a></div></div></section>

    <section id="discover" className="scroll-mt-24 py-12 lg:py-16"><div className={wrap}><div className="max-w-3xl"><h2 className="text-3xl font-bold">Search the places developers publish projects</h2><p className="mt-3 text-muted-foreground">Search with the problem, the job to be done and likely technical terms—not only the name you invented for your product.</p></div><div className="mt-6 flex max-w-3xl items-center gap-2 rounded-xl border bg-card px-4"><Search size={19}/><label htmlFor="project-search" className="sr-only">Problem or project keywords</label><input id="project-search" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="e.g. inventory for small pharmacies, invoice OCR, appointment booking" className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"/></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><a href={githubUrl} target="_blank" rel="noopener noreferrer" className={card+" group hover:border-primary/50"}><h3 className="font-bold">GitHub repositories</h3><p className="mt-2 text-sm text-muted-foreground">Search repository names, descriptions and code topics.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open search <ExternalLink size={14}/></span></a><a href={gitlabUrl} target="_blank" rel="noopener noreferrer" className={card+" group hover:border-primary/50"}><h3 className="font-bold">GitLab projects</h3><p className="mt-2 text-sm text-muted-foreground">Look for public projects and check whether the repository is active or archived.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open search <ExternalLink size={14}/></span></a><a href={sourceforgeUrl} target="_blank" rel="noopener noreferrer" className={card+" group hover:border-primary/50"}><h3 className="font-bold">SourceForge</h3><p className="mt-2 text-sm text-muted-foreground">Find downloadable and established open-source software projects.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open search <ExternalLink size={14}/></span></a></div><p className="mt-3 text-xs text-muted-foreground">Search opens in a new tab. Results belong to the external directory and have not been verified by BusinessIdea.io.</p></div></section>

    <section className="border-y bg-muted/20 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Check more than the feature list</h2><p className="mt-3 max-w-3xl text-muted-foreground">Use the repository and project documentation as evidence. A star count or a polished demo cannot tell you whether a tool fits your buyer or can be safely operated.</p><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article className={card}><h3 className="font-bold">Licence and commercial use</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Find the actual licence file and read its conditions. If no licence is present, do not assume you can copy, modify or redistribute the code.</p><a className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline" href="https://opensource.org/licenses" target="_blank" rel="noopener noreferrer">OSI approved licences <ExternalLink size={14}/></a><a className="mt-2 flex items-center gap-1 text-sm font-semibold text-primary hover:underline" href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository" target="_blank" rel="noopener noreferrer">GitHub licensing guidance <ExternalLink size={14}/></a></article>
      <article className={card}><h3 className="font-bold">Maintenance and releases</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Check the last meaningful release, recent commits, archived status, unanswered issues and whether maintainers respond to bug reports.</p><a className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline" href="https://docs.gitlab.com/user/project/working_with_projects/" target="_blank" rel="noopener noreferrer">GitLab project activity guide <ExternalLink size={14}/></a></article>
      <article className={card}><h3 className="font-bold">Security signals</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Look for security policy, vulnerability handling, dependency updates and reproducible release practices. A badge is a signal, not a guarantee.</p><a className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline" href="https://openssf.org/projects/best-practices-badge/" target="_blank" rel="noopener noreferrer">OpenSSF Best Practices Badge <ExternalLink size={14}/></a></article>
      <article className={card}><h3 className="font-bold">Deployment and support</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Check whether it is hosted or self-hosted, what infrastructure it needs, how upgrades work and who handles support when it breaks.</p></article>
      <article className={card}><h3 className="font-bold">Total cost to operate</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Include hosting, backups, monitoring, security patches, integrations, support and the time needed to maintain it. “No licence fee” does not mean zero cost.</p></article>
      <article className={card}><h3 className="font-bold">The buyer gap</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Ask which buyer, workflow, language, compliance need or service expectation is still poorly served. A gap must be observed, not invented to justify building.</p></article>
    </div></div></section>

    <section id="candidate-notebook" className="scroll-mt-24 py-12 lg:py-16"><div className={wrap}><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">Local research notebook</span><h2 className="mt-4 text-3xl font-bold">Record a project you might otherwise build</h2><p className="mt-3 max-w-3xl text-muted-foreground">Save what you checked, what is still unknown and the specific buyer gap. Use a source URL for each important claim.</p></div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full border bg-card px-3 py-2 text-sm font-semibold" aria-live="polite">{candidates.length} / 50 records</span>{candidates.length>0&&<><button type="button" onClick={exportCandidates} className="inline-flex min-h-10 items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-semibold"><Download size={15}/> Export</button><button type="button" onClick={clearCandidates} className="inline-flex min-h-10 items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-semibold"><Trash2 size={15}/> Clear</button></>}</div></div>
      <form onSubmit={addCandidate} className="mt-6 rounded-2xl border bg-card p-5 shadow-sm md:p-7"><h3 className="text-xl font-bold">Add a candidate project</h3><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold">Project name · required<input required maxLength={200} value={draft.name} onChange={event=>updateDraft("name",event.target.value)} placeholder="Project or product name" className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">Repository or product URL · required<input required type="url" maxLength={800} value={draft.url} onChange={event=>updateDraft("url",event.target.value)} placeholder="https://github.com/owner/project" className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold">Licence shown in repository<input maxLength={200} value={draft.license} onChange={event=>updateDraft("license",event.target.value)} placeholder="Exact name or not found" className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold">Last release / meaningful activity<input maxLength={100} value={draft.lastActivity} onChange={event=>updateDraft("lastActivity",event.target.value)} placeholder="Date and source checked" className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold">Maintenance signal<select value={draft.maintenance} onChange={event=>updateDraft("maintenance",event.target.value)} className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"><option>Unverified</option><option>Active signals found</option><option>Slow activity</option><option>Archived / inactive</option><option>Conflicting signals</option></select></label>
        <label className="grid gap-2 text-sm font-semibold">Deployment model<select value={draft.deployment} onChange={event=>updateDraft("deployment",event.target.value)} className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"><option>Unknown</option><option>Hosted service</option><option>Self-hosted</option><option>Both hosted and self-hosted</option><option>Local / desktop</option></select></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2 lg:col-span-3">Commercial-use or other restrictions<textarea rows={2} maxLength={800} value={draft.restrictions} onChange={event=>updateDraft("restrictions",event.target.value)} placeholder="Record exact licence conditions, hosted-service terms or restrictions to review." className="w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2 lg:col-span-3">Problem this project solves<textarea rows={2} maxLength={1000} value={draft.problem} onChange={event=>updateDraft("problem",event.target.value)} placeholder="Describe the buyer and the workflow it supports." className="w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2 lg:col-span-3">Specific gap for your buyer<textarea rows={2} maxLength={1000} value={draft.gap} onChange={event=>updateDraft("gap",event.target.value)} placeholder="What is missing for your buyer, based on evidence?" className="w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2 lg:col-span-3">Evidence and source notes<textarea rows={2} maxLength={1000} value={draft.evidence} onChange={event=>updateDraft("evidence",event.target.value)} placeholder="URLs, dates, release notes, issue links, licence file or buyer interview reference." className="w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2 lg:col-span-3">Next question to verify<textarea rows={2} maxLength={800} value={draft.nextQuestion} onChange={event=>updateDraft("nextQuestion",event.target.value)} placeholder="What missing fact could change your decision to build?" className="w-full rounded-lg border bg-background px-3 py-2 font-normal"/></label>
      </div><div className="mt-5 flex flex-wrap items-center gap-3"><button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">Save candidate <ArrowRight size={16}/></button><p className="text-sm text-muted-foreground">Saved only in this browser. Do not record credentials or private customer information.</p></div></form>
      <div className="mt-6 grid gap-4">{candidates.length===0?<div className="rounded-xl border border-dashed p-6 text-muted-foreground"><h3 className="font-semibold text-foreground">No candidate projects saved</h3><p className="mt-2 text-sm">Search a few terms above, inspect the repository and save only the evidence you can verify.</p></div>:candidates.map(item=><article key={item.id} className={card}><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-lg font-bold">{item.name}</h3><a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex max-w-full items-center gap-1 break-all text-sm text-primary underline">{item.url} <ExternalLink size={13}/></a></div><button type="button" onClick={()=>removeCandidate(item.id)} className="inline-flex min-h-9 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold"><Trash2 size={14}/> Remove</button></div><div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3"><p><strong>Licence:</strong> {item.license||"Not checked"}</p><p><strong>Last activity:</strong> {item.lastActivity||"Not checked"}</p><p><strong>Maintenance:</strong> {item.maintenance}</p><p><strong>Deployment:</strong> {item.deployment}</p><p className="sm:col-span-2"><strong>Restrictions:</strong> {item.restrictions||"Not checked"}</p><p className="sm:col-span-2 lg:col-span-3"><strong>Buyer gap:</strong> {item.gap||"Not recorded"}</p><p className="sm:col-span-2 lg:col-span-3"><strong>Evidence:</strong> {item.evidence||"Not recorded"}</p><p className="sm:col-span-2 lg:col-span-3"><strong>Next question:</strong> {item.nextQuestion||"Not recorded"}</p></div></article>)}</div>
      <div className="mt-8"><ProviderPromptActions prompt={researchPrompt} prefillPrompt={compactPrompt} title="Challenge your competitor research with an AI partner"/><p className="mt-3 text-xs leading-5 text-muted-foreground">The prompt includes your saved notes and selected founder context only when you choose a provider. BusinessIdea.io does not verify the project automatically or send the prompt for you.</p></div>
    </div></section>

    <section className="border-t bg-muted/20 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Use these checks before treating a tool as a competitor</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><article className={card}><h3 className="font-bold">A feature match is not a buyer match</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Check the target customer, language, workflow, support expectations and buying process. A tool may solve the same technical task for a different customer.</p></article><article className={card}><h3 className="font-bold">A public repository is not a commercial permission slip</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Read the licence and the hosted product terms separately. Check dependencies, trademarks, data terms and any additional restrictions with qualified advice where needed.</p></article></div><div className="mt-7 flex flex-wrap gap-4"><a href="/startup-guides/competitor-analysis-framework" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Read the competitor analysis framework <ArrowRight size={16}/></a><a href="/business-idea-research-india" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Test the buyer problem <ArrowRight size={16}/></a><a href="/startup-idea-comparison" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Compare ideas <ArrowRight size={16}/></a></div></div></section>
  </V2Frame>;
}
