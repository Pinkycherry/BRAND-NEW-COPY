import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { STARTUP_GUIDES } from "@/lib/guides-data";

const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "group block rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50";
const categoryOrder = ["Validation", "Market Sizing", "Bootstrapping", "Growth & PMF", "Launch & Ops"];
const categoryDescriptions: Record<string,string> = {
  "Validation": "Find the buyer, understand the problem and test willingness to pay before you build.",
  "Market Sizing": "Understand the market, alternatives and unit economics behind a business opportunity.",
  "Bootstrapping": "Find customers and build momentum without assuming a large advertising budget.",
  "Growth & PMF": "Measure retention and product-market fit before trying to accelerate acquisition.",
  "Launch & Ops": "Turn a validated offer into a focused product, team and operating rhythm.",
};
const featuredSlugs = ["business-idea-validation-framework","competitor-analysis-framework","tam-sam-som-market-sizing","startup-cash-flow-management"];

export const Route = createFileRoute("/topics")({
  head: () => ({ meta: [
    { title: "Startup Knowledge Hub: Validation, Market Research and Growth | BusinessIdea.io" },
    { name: "description", content: "Find practical startup guides by the decision you need to make: validate a buyer problem, research a market, bootstrap, measure growth or prepare to launch." },
    { property: "og:title", content: "Startup Knowledge Hub | BusinessIdea.io" },
    { property: "og:type", content: "website" },
  ] }),
  component: TopicsPage,
});

function TopicsPage() {
  const [query,setQuery]=useState("");
  const term=query.trim().toLocaleLowerCase();
  const matched=STARTUP_GUIDES.filter(guide =>
    [guide.title,guide.description,guide.category,...guide.keywords].join(" ").toLocaleLowerCase().includes(term)
  );
  const groups=categoryOrder.filter(category=>STARTUP_GUIDES.some(guide=>guide.category===category));
  const visibleGroups=groups.map(category=>({category,guides:matched.filter(guide=>guide.category===category)})).filter(group=>group.guides.length>0);
  const featured=featuredSlugs.map(slug=>STARTUP_GUIDES.find(guide=>guide.slug===slug)).filter((guide):guide is NonNullable<typeof guide>=>Boolean(guide));
  return <V2Frame active="/topics">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm`}><a href="/" className="hover:text-primary">Home</a><ChevronRight size={15}/><span>Topics</span></nav></div>

    <section className="border-b bg-gradient-to-b from-amber-500/10 to-background py-12 lg:py-16">
      <div className={wrap}>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Founder decision library</span>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">Start with the decision you need to make.</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">A useful guide should move one decision forward. Find out whether a buyer problem is real, understand the market, protect your cash, or plan the next stage of execution.</p>
        <div className="mt-6 flex flex-wrap gap-3"><a href="/business-idea-research-india" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Research a buyer problem <ArrowRight size={17}/></a><a href="/startup-guides" className="inline-flex min-h-11 items-center rounded-lg border bg-card px-6 py-3 font-semibold">Browse all guides</a></div>
      </div>
    </section>

    <section className="py-10 lg:py-12">
      <div className={wrap}>
        <h2 className="text-2xl font-bold">Choose your next decision</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["I have an idea, but little buyer evidence","Start with a recent customer problem, a workaround and a small test.","/startup-idea-validation","/business-idea-research-india"],
            ["I need to understand the market","Map alternatives, market boundaries and a narrow entry point.","/market-research","/startup-guides/competitor-analysis-framework"],
            ["I need to protect cash","Understand pricing, startup costs and when money actually arrives.","/business-pricing-india","/startup-cash-flow-india"],
            ["I am preparing to launch or grow","Choose a focused MVP, acquisition path and measures that matter.","/tools","/startup-guides/minimum-viable-product-development"],
          ].map(([title,copy,href,secondary])=><article key={title} className={card}><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold"><a href={href} className="inline-flex items-center gap-1 text-primary hover:underline">Start here <ArrowRight size={15}/></a><a href={secondary} className="text-muted-foreground underline-offset-4 hover:underline">Related guide</a></div></article>)}
        </div>
      </div>
    </section>

    <section className="border-y bg-muted/20 py-12 lg:py-16">
      <div className={wrap}>
        <div className="max-w-3xl"><h2 className="text-2xl font-bold">Guides worth opening first</h2><p className="mt-2 text-muted-foreground">Selected by the decision they help with—not by their position in the content file.</p></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map(guide=><a key={guide.slug} className={card} href={`/startup-guides/${guide.slug}`}><span className="text-xs font-bold uppercase text-primary">{guide.category}</span><h3 className="mt-3 font-bold">{guide.title}</h3><p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{guide.description}</p><span className="mt-4 block text-xs text-muted-foreground">{guide.readTime}</span><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read guide <ArrowRight size={16}/></span></a>)}
        </div>
      </div>
    </section>

    <section className="py-10 lg:py-12">
      <div className={wrap}>
        <label className="flex max-w-2xl items-center gap-2 rounded-xl border bg-card px-4"><Search size={19}/><span className="sr-only">Search startup guides</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search guides by topic, problem or keyword…" className="min-h-11 min-w-0 flex-1 bg-transparent outline-none"/></label>
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">{matched.length} of {STARTUP_GUIDES.length} guides match</p>
        {visibleGroups.length===0 ? <div className="mt-6 rounded-xl border border-dashed p-6 text-sm text-muted-foreground">No guides match that search. Try a broader term such as validation, pricing or growth.</div> : <div className="mt-8 space-y-12">
          {visibleGroups.map(({category,guides})=><section key={category} id={category.toLowerCase().replace(/[^a-z0-9]+/g,"-")} className="scroll-mt-24 border-b pb-10 last:border-0">
            <div className="max-w-3xl"><h2 className="text-2xl font-bold">{category}</h2><p className="mt-2 text-muted-foreground">{categoryDescriptions[category]}</p></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map(guide=><a key={guide.slug} className={card} href={`/startup-guides/${guide.slug}`}><h3 className="font-semibold group-hover:text-primary">{guide.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{guide.description}</p><div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>{guide.readTime}</span><span>{guide.wordCount.toLocaleString()} words</span></div><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read guide <ArrowRight size={16}/></span></a>)}
            </div>
          </section>)}
        </div>}
      </div>
    </section>

    <section className="border-t bg-muted/20 py-12">
      <div className={wrap}><h2 className="text-2xl font-bold">Continue with a practical workspace</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{[["Compare business ideas","/startup-idea-comparison"],["Build a first-customer map","/first-customer-india"],["Review startup risk","/failed-startups/india"]].map(([title,href])=><a className={card} key={href} href={href}>{title} <ArrowRight size={16} className="inline text-primary"/></a>)}</div><div className="mt-8 flex flex-wrap gap-3 text-sm"><a href="/faq" className="font-semibold text-primary hover:underline">Founder FAQ</a><a href="/open-source" className="font-semibold text-primary hover:underline">Open-source research</a><a href="/browse" className="font-semibold text-primary hover:underline">Browse business ideas</a></div></div>
    </section>
  </V2Frame>;
}
