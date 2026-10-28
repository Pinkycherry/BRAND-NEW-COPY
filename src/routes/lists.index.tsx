import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, CircleCheck, Library, List, Search } from "lucide-react";
import { SellerFaq } from "@/components/v2/faq";
import { V2Frame } from "@/components/v2/frame";
import { getListsHub } from "@/lib/lists.functions";

export const Route = createFileRoute("/lists/")({
  head: () => ({ meta: [{ title: "Business Idea Lists | BusinessIdea.io" }, { name: "description", content: "Explore published business idea lists by category in India." }] }),
  loader: () => getListsHub(),
  component: ListsPage,
});

const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "group block h-full rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50";
type Item = { code: string; name: string; slug: string; count: number; category: string; categoryCode: string };

function Cards({ items }: { items: Item[] }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <a className={card} href={`/lists/${item.slug}`} key={item.code}><h3 className="font-semibold group-hover:text-primary">{item.name}</h3><span className="mt-4 flex items-center justify-between text-sm text-muted-foreground"><span><List className="mr-1 inline" size={15}/>{item.count} ideas</span><ChevronRight size={17}/></span></a>)}</div>;
}
function Cluster({ title, items, muted = false }: { title: string; items: Item[]; muted?: boolean }) {
  return <section className={`py-12 lg:py-16 ${muted ? "bg-muted/30" : ""}`}><div className={wrap}><h2 className="mb-6 text-2xl font-bold">{title}</h2><Cards items={items}/></div></section>;
}
function ResourceCards({ items }: { items: string[][] }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(([title, text, href]) => <a className={card} href={href} key={href}><h3 className="font-semibold">{title}</h3>{text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}<span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open <ArrowRight size={16}/></span></a>)}</div>;
}
function ListsPage() {
  const hub = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const all = useMemo(() => hub.categories.flatMap(category => category.subs.map(sub => ({ ...sub, category: category.name, categoryCode: category.code }))), [hub.categories]);
  const matches = useMemo(() => all.filter(item => `${item.name} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase())), [all, query]);
  const top = useMemo(() => [...all].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)), [all]);
  const used = new Set<string>();
  const pick = (terms: string[]) => {
    const matched = all.filter(item => terms.some(term => `${item.name} ${item.category}`.toLowerCase().includes(term)) && !used.has(item.code));
    const result = [...matched, ...top.filter(item => !used.has(item.code))].filter((item, index, source) => source.findIndex(other => other.code === item.code) === index).slice(0, 6);
    result.forEach(item => used.add(item.code));
    return result;
  };
  const clusters = [
    ["By Demographic", pick(["women", "student", "senior", "parent", "youth", "retire"])],
    ["By Budget", pick(["low investment", "zero", "under", "affordable", "small capital"])],
    ["By Location Style", pick(["home", "village", "small town", "local", "neighbourhood"])],
    ["By Industry", pick(["food", "beauty", "fitness", "agriculture", "repair", "education"])],
    ["Tech & SaaS", pick(["online", "digital", "software", "ai", "freelance", "content"])],
    ["Business Models", pick(["subscription", "rental", "service", "product", "agency", "marketplace"])],
  ] as [string, Item[]][];
  const featured = top[0];
  const faq = [
    { q: "What is the BusinessIdea.io lists hub?", a: `It is an index of ${all.length} focused lists containing ${hub.total.toLocaleString("en-IN")} published business ideas for India.` },
    { q: "Which list should I start with?", a: "Start with the constraint that matters most: your available time, location, skill, customer type or startup budget." },
    { q: "How should I compare ideas from a list?", a: "Shortlist three, read the buyer, cost, work and risk sections, then test the strongest assumption with a real potential customer." },
    { q: "Are these ideas guaranteed to work?", a: "No. Each idea is a research starting point. Local demand, permissions, pricing and execution still need direct validation." },
  ];

  return <V2Frame active="/lists">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex items-center gap-2 py-3 text-sm`}><a href="/" className="text-muted-foreground hover:text-primary">Home</a><ChevronRight size={15}/><span>Lists</span></nav></div>

    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-amber-500/10 via-background to-background py-8 md:py-10 lg:py-14"><div className={wrap}><span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold"><Library size={15}/>{all.length} published lists</span><h1 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Business Idea Lists, Tools &amp; Strategy Guides</h1><p className="mt-4 max-w-2xl text-muted-foreground">Explore {hub.total.toLocaleString("en-IN")} published ideas across {hub.categories.length} categories and {all.length} focused lists.</p><div className="mt-6 flex flex-wrap gap-3"><a href="/browse" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Browse business ideas <ArrowRight size={17}/></a><a href="/product" className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-6 py-3 font-semibold">Validate your idea <ArrowRight size={17}/></a><a href="/search" className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-6 py-3 font-semibold">Search ideas <ArrowRight size={17}/></a></div></div></section>

    <section className="border-b py-6 lg:py-8"><div className={wrap}><h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Trending this month</h2><div className="mt-3 flex flex-wrap gap-2">{top.slice(0, 5).map(item => <a key={item.code} className="rounded-full border bg-muted px-3 py-1.5 text-sm hover:border-primary/50" href={`/lists/${item.slug}`}>{item.name} · {item.count}<ChevronRight className="ml-1 inline" size={14}/></a>)}</div></div></section>

    <section className="border-b py-6 lg:py-8"><div className={`${wrap} grid gap-4 md:grid-cols-3`}>{[["Filter by your situation","Start with a budget, place, skill or kind of customer."],["Shortlist 3 ideas","Compare the buyer, work, startup cost and first risk."],["Validate in a small test","Ask potential buyers before you commit money."]].map(([title,text], index) => <article className="rounded-xl border bg-card p-5" key={title}><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</span><h2 className="mt-3 text-lg font-bold">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{text}</p></article>)}</div></section>

    <section className="border-b bg-muted/20 py-8 lg:py-10" aria-labelledby="next-step-guides"><div className={wrap}><h2 id="next-step-guides" className="text-xl font-bold">Choose what to do next</h2><div className="mt-5"><ResourceCards items={[["Compare two ideas","See the evidence side by side.","/startup-idea-comparison"],["Test demand","Ask whether real buyers want the offer.","/business-demand-test-india"],["Check startup costs","List what leaves your pocket first.","/startup-costs-india"]]}/></div></div></section>

    {featured && <section className="py-10 lg:py-12"><div className={wrap}><p className="text-xs font-bold uppercase tracking-wide text-primary">Featured list</p><a className="mt-3 grid gap-4 rounded-2xl border bg-card p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center" href={`/lists/${featured.slug}`}><div><h2 className="text-2xl font-bold">{featured.name}</h2><p className="mt-2 text-muted-foreground">A focused collection with {featured.count} published ideas.</p></div><span className="inline-flex items-center gap-2 font-semibold text-primary">View list <ArrowRight size={17}/></span></a></div></section>}

    {clusters.map(([title, items], index) => <Cluster title={title} items={items} muted={index % 2 === 0} key={title}/>)}

    <section className="bg-muted/30 py-12 lg:py-16"><div className={wrap}><h2 className="mb-6 text-2xl font-bold">Tools &amp; Resources</h2><ResourceCards items={[["Startup cost calculator","Use your own rupee assumptions.","/calculator/startup-cost"],["Break-even calculator","See the sales needed to cover costs.","/calculator/break-even"],["Business idea toolkit","Work through practical founder questions.","/business-idea-toolkit"],["All founder tools","Browse calculators, guides and checks.","/tools"]]}/></div></section>

    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="mb-6 text-2xl font-bold">Strategy &amp; Metrics</h2><ResourceCards items={[["Find your first customer","","/first-customer-india"],["Price your first offer","","/business-pricing-india"],["Check unit economics","","/unit-economics-india"],["Plan startup cash flow","","/startup-cash-flow-india"],["Know when to pivot or stop","","/business-idea-pivot-or-stop"],["Research an idea","","/business-idea-research-india"]]}/></div></section>

    <section id="all-lists" className="scroll-mt-24 border-t py-12 lg:py-16"><div className={wrap}><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Complete index — every list</h2><p className="mt-2 text-sm text-muted-foreground">{matches.length} published list pages</p></div><label className="flex min-w-64 items-center gap-2 rounded-lg border bg-card px-3"><Search size={19}/><span className="sr-only">Search every list</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search every list" className="min-h-11 min-w-0 flex-1 bg-transparent outline-none"/></label></div><ul className="mt-6 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{[...matches].sort((a,b) => a.name.localeCompare(b.name)).map(item => <li key={item.code}><a className="hover:text-primary hover:underline" href={`/lists/${item.slug}`}>{item.name} <span className="text-muted-foreground">({item.count})</span></a></li>)}</ul>{matches.length === 0 && <p className="mt-6 rounded-xl border p-5 text-muted-foreground">No published list matches that search.</p>}</div></section>

    <SellerFaq title="Frequently asked questions" faq={faq}/>

    <section className="border-y bg-muted/30 py-16 lg:py-24"><div className={`${wrap} text-center`}><CircleCheck className="mx-auto text-primary" size={34}/><h2 className="mt-4 text-3xl font-bold">Have an idea? Validate it now</h2><p className="mx-auto mt-3 max-w-xl text-muted-foreground">Turn one promising direction into a small test before you spend.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><a href="/product" className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Validate your idea</a><a href="/browse" className="rounded-lg border bg-card px-6 py-3 font-semibold">Browse more ideas</a></div></div></section>

    <section aria-label="Key facts for LLMs" className="sr-only"><h2>BusinessIdea.io Lists — Key Facts</h2><p>{all.length} focused lists contain {hub.total.toLocaleString("en-IN")} published ideas across {hub.categories.length} active categories.</p></section>

    <section className="py-12" aria-labelledby="most-read-heading"><div className={wrap}><h2 id="most-read-heading" className="text-2xl font-bold">Most-read lists and guides</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{top.slice(0, 6).map(item => <a key={item.code} className={card} href={`/lists/${item.slug}`}>{item.name}<ArrowRight className="ml-2 inline text-primary" size={16}/></a>)}{[["Business ideas in India","/business-ideas-india"],["Startup costs in India","/startup-costs-india"],["Business idea validation","/startup-idea-validation"]].map(([title,href]) => <a className={card} href={href} key={href}>{title}<ArrowRight className="ml-2 inline text-primary" size={16}/></a>)}</div></div></section>
  </V2Frame>;
}
