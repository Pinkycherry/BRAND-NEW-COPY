import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ClipboardList } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";

export const Route=createFileRoute("/templates")({head:()=>({meta:[{title:"Founder Checklists | BusinessIdea.io"},{name:"description",content:"Read practical founder checklists for planning, comparison, demand and risk."}]}),component:TemplatesPage});
const wrap="mx-auto max-w-6xl px-4 md:px-6";
const card="group block rounded-xl border bg-card p-5 shadow-sm transition hover:border-primary/50";
const checklists=[
  ["Startup launch plan","/startup-launch-plan-india"],
  ["Business demand test","/business-demand-test-india"],
  ["Compare two ideas","/startup-idea-comparison"],
  ["Founder decision journal","/founder-decision-journal"],
  ["Business idea risk check","/business-idea-risk-check"],
  ["Business idea research","/business-idea-research-india"],
];
function TemplatesPage(){return <V2Frame active="/tools">
  <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex items-center gap-2 py-3 text-sm`}><a href="/">Home</a><ChevronRight size={15}/><span>Templates</span></nav></div>
  <section className="border-b bg-gradient-to-b from-amber-500/10 to-background py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Read-only checklists</span><h1 className="mt-4 text-3xl font-bold md:text-5xl">Founder checklists</h1><p className="mt-4 max-w-2xl text-muted-foreground">Six existing checklists for discovery, planning and decisions. Open a page to read its questions and steps.</p><div className="mt-6 flex flex-wrap gap-3"><a href="#catalog" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Explore checklists <ArrowRight size={17}/></a><a href="/tools" className="inline-flex min-h-11 items-center rounded-lg border bg-card px-6 py-3 font-semibold">Tools</a></div></div></section>
  <section id="catalog" className="scroll-mt-24 py-12 lg:py-16"><div className={wrap}><h2 className="text-2xl font-bold">Discover &amp; Define</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{checklists.map(([title,href])=><a key={href} href={href} className={card}><ClipboardList className="text-primary"/><h3 className="mt-4 text-lg font-semibold group-hover:text-primary">{title}</h3><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read checklist <ArrowRight size={16}/></span></a>)}</div></div></section>
  <section className="border-t bg-muted/20 py-12"><div className={wrap}><h2 className="text-2xl font-bold">Pick a checklist by what you need to decide</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{checklists.map(([title,href])=><a className={card} key={href} href={href}>{title} <ArrowRight size={16} className="ml-1 inline text-primary"/></a>)}</div></div></section>
  <section className="py-12"><div className={wrap}><h2 className="text-2xl font-bold">Next step</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{[["Browse ideas","/browse"],["Calculate startup costs","/calculator/startup-cost"],["Read validation guide","/startup-idea-validation"]].map(([t,h])=><a key={h} href={h} className={card}>{t} <ArrowRight size={16} className="inline text-primary"/></a>)}</div><h2 className="mt-10 text-2xl font-bold">Related resources</h2><div className="mt-4 flex flex-wrap gap-2">{[["Tools","/tools"],["Idea lists","/lists"],["Startup guides","/startup-guides"]].map(([t,h])=><a className="rounded-full border bg-card px-4 py-2 text-sm" key={h} href={h}>{t}</a>)}</div></div></section>
</V2Frame>}
