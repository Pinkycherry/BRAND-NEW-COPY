import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { getFaqDirectory } from "@/lib/faq.functions";

type FaqItem = { q: string; a: string; href?: string };

const productFaq: FaqItem[] = [
  { q: "Does BusinessIdea.io tell me whether my idea will succeed?", a: "No. The site helps you organise a question, compare published source information and plan a small test. It does not certify demand, calculate a guaranteed success probability or replace a real buyer commitment.", href: "/startup-idea-validation" },
  { q: "How many ideas can I keep in my comparison shortlist?", a: "You can keep up to four ideas in the shared shortlist. Add or remove an idea from a page that offers the comparison action, then open the comparison workspace to review them together.", href: "/startup-idea-comparison" },
  { q: "Where are my shortlist and founder notes saved?", a: "They are saved in local storage in the browser you are using. They are not synced to another browser or device, and clearing browser data can remove them. Do not use the notebook for passwords or sensitive customer details.", href: "/browse" },
  { q: "Does adding an idea send my information to BusinessIdea.io?", a: "The shortlist and founder context are stored in your browser for the workspace. Selecting an idea does not itself send your notes to an AI provider or create a database record.", href: "/startup-idea-comparison" },
  { q: "Does BusinessIdea.io run the AI model or generate the validation report?", a: "No. BusinessIdea.io prepares a prompt and opens an external provider. The provider handles the model response; you review the prompt and choose whether to send it. BusinessIdea.io does not store the external response.", href: "/product" },
  { q: "Which AI providers are available in the prompt handoff?", a: "The current handoff offers ChatGPT, Claude, Grok and Perplexity. Access, account requirements, features and usage limits are controlled by each provider.", href: "/product" },
  { q: "Is the prepared prompt sent automatically when I click a provider?", a: "No. The provider opens with a prepared question when its link supports prefill. You can review or copy the full prompt and must confirm sending it on the provider's site.", href: "/product" },
  { q: "What if my prompt is too long for a provider link?", a: "The page keeps the full prompt available to review and copy. If a provider link cannot carry the prompt, the action tells you to copy it first rather than claiming that a blank page contains your question.", href: "/product" },
  { q: "What should I write down after speaking with a potential buyer?", a: "Record the date, the buyer's role, the last time the problem happened, the workaround they used, any price or spend they actually mentioned, your source or observation, and evidence that does not support your idea. Keep the person's identity private.", href: "/business-idea-research-india#field-notebook" },
  { q: "Does one positive interview prove that people will buy?", a: "No. A positive comment is a statement, not a purchase. Look for repeated recent problems, independent buyers, a decision-maker, a current workaround and a specific commitment to a priced test.", href: "/business-demand-test-india" },
  { q: "How can I test an idea without spending heavily?", a: "Choose one reachable buyer group, offer a small outcome with a clear price and delivery boundary, and set a short review date. Avoid long leases, large inventory or debt until the evidence justifies them.", href: "/business-demand-test-india" },
  { q: "Why does an idea comparison sometimes say that a detail needs research?", a: "The published source record may not contain that field. The page should not fill the gap with a guess. Treat it as a question to verify with the founder, buyer or a reliable public source.", href: "/startup-idea-comparison" },
  { q: "Are the startup shutdown examples a complete list of Indian failures?", a: "No. The current research page contains a small set of source-checked service shutdowns or pauses. It is not a complete database, and a service stopping does not by itself prove bankruptcy or legal company closure.", href: "/failed-startups/india" },
  { q: "Can I rely on an AI-generated market size or competitor claim?", a: "Not without checking it. Verify the source, date, geography, definition and calculation. Label estimates as estimates and keep unknowns visible; a generated answer is not proof of local demand.", href: "/business-idea-research-india" },
  { q: "Can the site confirm licences, tax treatment or legal compliance for my business?", a: "The workspace can help you list questions to investigate, but it does not provide a binding legal or tax determination. Check current official government sources and consult a qualified professional when the decision has legal or financial consequences.", href: "/startup-guides" },
];

export const Route=createFileRoute("/faq")({
  loader:async()=>{
    try { return await getFaqDirectory(); }
    catch { return []; }
  },
  head:()=>({meta:[
    {title:"BusinessIdea.io FAQ: Research, Comparison and Founder Workspace"},
    {name:"description",content:"Clear answers about researching business ideas, comparing up to four ideas, local notes and external AI prompt handoffs."},
    {property:"og:title",content:"BusinessIdea.io FAQ"},
    {property:"og:type",content:"website"},
  ]}),
  component:FaqPage
});
const wrap="mx-auto max-w-6xl px-4 md:px-6";

function FaqPage(){
  const sourceFaq=Route.useLoaderData();
  const [query,setQuery]=useState("");
  const term=query.trim().toLocaleLowerCase();
  const productVisible=productFaq.filter(item=>`${item.q} ${item.a}`.toLocaleLowerCase().includes(term));
  const sourceVisible=sourceFaq.filter(item=>`${item.q} ${item.a}`.toLocaleLowerCase().includes(term));
  return <V2Frame active="/faq">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm`}><a href="/">Home</a><ChevronRight size={15}/><span>FAQ</span></nav></div>
    <section className="border-b bg-gradient-to-b from-amber-500/10 to-background py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Founder help</span><h1 className="mt-4 text-3xl font-bold md:text-5xl">Questions before you spend time or money</h1><p className="mt-4 max-w-2xl text-muted-foreground">Straight answers about the idea library, research tools, comparison workspace and external AI handoff.</p><div className="mt-6 flex flex-wrap gap-3"><a href="/browse" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Browse ideas <ArrowRight size={17}/></a><a href="/business-idea-research-india" className="inline-flex min-h-11 items-center rounded-lg border bg-card px-6 py-3 font-semibold">Research an idea</a></div></div></section>
    <section className="py-10 lg:py-12"><div className={wrap}><label className="flex max-w-2xl items-center gap-2 rounded-xl border bg-card px-4"><Search size={19}/><span className="sr-only">Search questions and answers</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search saving, comparison, AI prompts, buyer research…" className="min-h-11 min-w-0 flex-1 bg-transparent outline-none"/></label><p className="mt-3 text-sm text-muted-foreground" aria-live="polite">{productVisible.length+sourceVisible.length} answers match your search</p></div></section>
    <SellerFaq key={`product-${query}`} faq={productVisible} title="Using BusinessIdea.io" />
    <SellerFaq key={`source-${query}`} faq={sourceVisible} title="Questions from published ideas" />
    {productVisible.length===0 && sourceVisible.length===0 && <p className="mx-auto max-w-6xl px-4 pb-12 text-sm text-muted-foreground md:px-6">No matching questions. Try a shorter search term or browse the guides.</p>}
    <section className="border-t bg-muted/20 py-12"><div className={wrap}><h2 className="text-2xl font-bold">Take the next practical step</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{[["Research a buyer problem","/business-idea-research-india"],["Compare up to four ideas","/startup-idea-comparison"],["Plan a small demand test","/business-demand-test-india"]].map(([title,href])=><a key={href} href={href} className="rounded-xl border bg-card p-5 font-semibold hover:border-primary/50">{title} <ArrowRight className="inline text-primary" size={16}/></a>)}</div><h2 className="mt-10 text-2xl font-bold">More founder resources</h2><div className="mt-4 flex flex-wrap gap-2">{[["Idea lists","/lists"],["Glossary","/glossary"],["Startup guides","/startup-guides"],["Tools","/tools"]].map(([title,href])=><a key={href} href={href} className="rounded-full border bg-card px-4 py-2 text-sm">{title}</a>)}</div></div></section>
  </V2Frame>
}
