import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Library, List, Search } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { getListsHub } from "@/lib/lists.functions";
import { TAXONOMY } from "@/data/taxonomy";

export const Route = createFileRoute("/lists/")({
  head: () => ({ meta: [{ title: "Business Idea Lists | BusinessIdea.io" }, { name: "description", content: "Explore published business idea lists by category in India." }] }),
  loader: () => getListsHub(), component: ListsPage,
});
const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "group block h-full rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50 hover:-translate-y-0.5";

function ListsPage() {
  const hub = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("all");
  const categories = hub.categories;
  const all = useMemo(() => categories.flatMap(c => c.subs.map(s => ({ ...s, category: c.name, categoryCode: c.code }))), [categories]);
  const matches = useMemo(() => all.filter(s => (selected === "all" || s.categoryCode === selected) && `${s.name} ${s.category}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [all, selected, query]);
  const top = [...all].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, 10);
  const featured = top[0];
  return <V2Frame active="/lists">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex items-center gap-2 py-3 text-sm`}><a href="/" className="text-muted-foreground hover:text-primary">Home</a><ChevronRight size={15}/><span>Lists</span></nav></div>
    <section className="border-b bg-gradient-to-b from-amber-500/10 via-background to-background py-10 lg:py-14"><div className={wrap}>
      <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold"><Library size={15}/>{all.length} published lists</span>
      <h1 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Business Idea Lists, Tools &amp; Strategy Guides</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Explore {hub.total.toLocaleString("en-IN")} published ideas across {categories.length} categories and {all.length} focused lists.</p>
      <div className="mt-6 flex flex-wrap gap-3"><a href="/browse" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700">Browse ideas <ArrowRight size={17}/></a><a href="/tools" className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-6 py-3 font-semibold">Explore tools <ArrowRight size={17}/></a></div>
      <label className="mt-7 flex max-w-lg items-center gap-2 rounded-lg border bg-card px-3"><Search size={19} className="text-muted-foreground"/><span className="sr-only">Search lists</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search lists" className="min-h-11 min-w-0 flex-1 bg-transparent outline-none"/></label>
      <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground"><span>{all.length} lists</span><span>{hub.total.toLocaleString("en-IN")} ideas</span><span>{categories.length} categories</span></div>
    </div></section>
    <section className="border-b py-6"><div className={wrap}><h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Most published ideas</h2><div className="mt-3 flex flex-wrap gap-2">{top.map(s=><a key={s.code} className="rounded-full border bg-muted px-3 py-1.5 text-sm hover:border-primary/50" href={`/lists/${s.slug}`}>{s.name} · {s.count}<ChevronRight className="ml-1 inline" size={14}/></a>)}</div></div></section>
    <section className="border-b bg-muted/20 py-8"><div className={wrap}><h2 className="text-xl font-bold">Filter by your situation</h2><p className="mt-1 text-sm text-muted-foreground">Choose a category or search the published lists.</p><div className="mt-4 flex max-h-36 flex-wrap gap-2 overflow-y-auto" role="group" aria-label="Filter lists by category"><button aria-pressed={selected==="all"} onClick={()=>setSelected("all")} className={`rounded-full px-4 py-2 text-sm ${selected==="all"?"bg-primary text-white":"bg-card border"}`}>All lists</button>{categories.map(c=><button key={c.code} aria-pressed={selected===c.code} onClick={()=>setSelected(c.code)} className={`rounded-full px-4 py-2 text-sm ${selected===c.code?"bg-primary text-white":"bg-card border"}`}>{c.name}</button>)}</div><p className="mt-3 text-sm text-muted-foreground">{matches.length} matching lists</p></div></section>
    <section className="border-b py-10"><div className={wrap}><h2 className="text-xl font-bold">Choose what to do next</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{[["Compare two ideas", "/startup-idea-comparison"],["Test demand", "/business-demand-test-india"],["Check startup costs", "/startup-costs-india"]].map(([title,href])=><a key={href} className={card} href={href}><span className="flex items-center justify-between font-semibold">{title}<ArrowRight size={17}/></span></a>)}</div></div></section>
    {featured && <section className="border-b bg-amber-500/5 py-10"><div className={wrap}><span className="text-xs font-bold uppercase tracking-wide text-primary">Featured list</span><h2 className="mt-2 text-2xl font-bold">{featured.name}</h2><p className="mt-2 text-muted-foreground">{featured.count} published ideas</p><a className="mt-5 inline-flex items-center gap-2 font-semibold text-primary" href={`/lists/${featured.slug}`}>Open list <ArrowRight size={17}/></a></div></section>}
    <div id="categories" className="scroll-mt-24">{categories.filter(c=>selected==="all"||selected===c.code).map((c,i)=>{
      const subs=matches.filter(s=>s.categoryCode===c.code); if(!subs.length) return null;
      const slug=TAXONOMY.find(t=>`C${String(t.n).padStart(3,"0")}`===c.code)?.slug;
      return <section key={c.code} id={c.code} className={`scroll-mt-24 py-12 lg:py-16 ${i%2===0?"bg-muted/20":""}`}><div className={wrap}><div className="mb-6 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">{c.name}</h2><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{subs.length} lists</span>{slug&&<a href={`/category/${slug}`} className="ml-auto text-sm font-semibold text-primary">View category <ArrowRight size={15} className="inline"/></a>}</div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{subs.map(s=><a href={`/lists/${s.slug}`} key={s.code} className={card}><h3 className="font-semibold group-hover:text-primary">{s.name}</h3><span className="mt-4 flex items-center justify-between text-sm text-muted-foreground"><span><List size={15} className="mr-1 inline"/>{s.count} ideas</span><ChevronRight size={17}/></span></a>)}</div></div></section>;
    })}</div>
    <section id="all-lists" className="scroll-mt-24 border-t py-12 lg:py-16"><div className={wrap}><h2 className="text-2xl font-bold">Complete index — every list</h2><p className="mt-2 text-sm text-muted-foreground">{matches.length} published list pages</p><ul className="mt-6 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{[...matches].sort((a,b)=>a.name.localeCompare(b.name)).map(s=><li key={s.code}><a className="hover:text-primary hover:underline" href={`/lists/${s.slug}`}>{s.name}</a></li>)}</ul></div></section>
    <section className="border-t bg-muted/20 py-12"><div className={wrap}><h2 className="text-2xl font-bold">Have an idea? Validate it now</h2><div className="mt-5 flex flex-wrap gap-3"><a href="/product" className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Validate your idea</a><a href="/browse" className="rounded-lg border bg-card px-6 py-3 font-semibold">Browse more ideas</a></div></div></section>
    <section className="py-12"><div className={wrap}><h2 className="text-2xl font-bold">Related lists and guides</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{top.slice(0,6).map(s=><a key={s.code} className={card} href={`/lists/${s.slug}`}>{s.name}<ArrowRight className="ml-2 inline text-primary" size={16}/></a>)}{[["Business ideas in India","/business-ideas-india"],["Startup costs in India","/startup-costs-india"],["Business idea validation","/startup-idea-validation"]].map(([t,h])=><a className={card} href={h} key={h}>{t}<ArrowRight className="ml-2 inline text-primary" size={16}/></a>)}</div></div></section>
  </V2Frame>;
}
