import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { getListsHub } from "@/lib/lists.functions";
import { TAXONOMY } from "@/data/taxonomy";

export const Route = createFileRoute("/browse")({
  loader: () => getListsHub(),
  head: () => ({ meta: [{ title: "Browse Published Business Ideas | BusinessIdea.io" }, { name: "description", content: "Browse published Indian business ideas by category and focused list." }] }),
  component: BrowsePage,
});
const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50 hover:-translate-y-0.5";

function BrowsePage() {
  const hub = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"order"|"az">("order");
  const all = useMemo(() => hub.categories.map(c=>({ ...c, taxonomy:TAXONOMY.find(t=>t.code===c.code) })), [hub]);
  const needle = query.trim().toLocaleLowerCase();
  const categories = all.filter(c=>!needle || c.name.toLocaleLowerCase().includes(needle) || c.subs.some(s=>s.name.toLocaleLowerCase().includes(needle)));
  if(sort==="az") categories.sort((a,b)=>a.name.localeCompare(b.name));
  return <V2Frame active="/browse">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav className={`${wrap} flex items-center gap-2 py-3 text-sm`} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={15}/><span>Browse</span></nav></div>
    <section className="border-b bg-gradient-to-b from-amber-500/10 to-background py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Published idea library</span><h1 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Find a direction worth exploring.</h1><p className="mt-4 max-w-2xl text-muted-foreground">{hub.total.toLocaleString("en-IN")} published ideas across {all.length} categories and {all.reduce((n,c)=>n+c.subs.length,0)} focused lists.</p><div className="mt-6 flex flex-wrap gap-3"><a href="/lists" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Browse idea lists <ArrowRight size={17}/></a><a href="/tools" className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-6 py-3 font-semibold">Explore tools</a></div></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Categories</h2><p className="mt-2 text-muted-foreground">Open a category to explore its published lists.</p></div><span className="text-sm text-muted-foreground">{categories.length} categories</span></div><div className="my-6 flex flex-wrap gap-3"><label className="flex min-w-60 flex-1 items-center gap-2 rounded-lg border bg-card px-4"><Search size={19}/><span className="sr-only">Search categories and lists</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search categories or lists" className="min-h-11 w-full min-w-0 bg-transparent outline-none"/></label><label className="flex items-center gap-2 rounded-lg border bg-card px-4">Sort <select value={sort} onChange={e=>setSort(e.target.value as "order"|"az")} className="min-h-11 bg-transparent"><option value="order">Category order</option><option value="az">A to Z</option></select></label></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(c=><article className={card} key={c.code}><h3 className="text-xl font-bold"><a className="hover:text-primary" href={`/category/${c.taxonomy?.slug}`}>{c.name}</a></h3><p className="mt-2 text-sm text-muted-foreground">{c.subs.length} lists · {c.subs.reduce((n,s)=>n+s.count,0)} published ideas</p><ul className="mt-5 space-y-2 border-t pt-4 text-sm">{c.subs.filter(s=>!needle||c.name.toLocaleLowerCase().includes(needle)||s.name.toLocaleLowerCase().includes(needle)).slice(0,5).map(s=><li key={s.code}><a className="hover:text-primary hover:underline" href={`/lists/${s.slug}`}>{s.name}</a></li>)}</ul><a className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary" href={`/category/${c.taxonomy?.slug}`}>Explore category <ArrowRight size={16}/></a></article>)}</div>{categories.length===0&&<p className="rounded-xl border p-6 text-muted-foreground">No published category matches this search.</p>}</div></section>
    <section className="border-t bg-muted/20 py-12"><div className={wrap}><h2 className="text-2xl font-bold">Next step</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{[["Compare two ideas","/startup-idea-comparison"],["Test demand","/business-demand-test-india"],["Calculate startup costs","/calculator/startup-cost"]].map(([t,h])=><a key={h} className={card} href={h}>{t}<ArrowRight className="mt-3 text-primary" size={17}/></a>)}</div><h2 className="mt-10 text-2xl font-bold">Related resources</h2><div className="mt-4 flex flex-wrap gap-3">{[["All idea lists","/lists"],["Calculators","/calculator"],["Startup guides","/startup-guides"]].map(([t,h])=><a key={h} className="rounded-full border bg-card px-4 py-2 text-sm" href={h}>{t}</a>)}</div></div></section>
  </V2Frame>;
}
