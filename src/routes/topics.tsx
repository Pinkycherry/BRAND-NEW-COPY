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
    { name: "description", content: "Explore 20 original startup guides across customer evidence, market research, pricing, cash flow, distribution, product development, retention, hiring and bootstrapping. Follow the subject map or search the original guide collection." },
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
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">A useful guide should help you understand a business decision in context. This library connects customer evidence, market choices, money, distribution, product work, retention and the responsibilities of building a team.</p>
        <div className="mt-6 flex flex-wrap gap-3"><a href="/business-idea-research-india" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Research a buyer problem <ArrowRight size={17}/></a><a href="/startup-guides" className="inline-flex min-h-11 items-center rounded-lg border bg-card px-6 py-3 font-semibold">Browse all guides</a></div>
      </div>
    </section>

    <section className="py-10 lg:py-12">
      <div className={wrap}>
        <h2 className="text-2xl font-bold">Choose your next decision</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["I have an idea, but little buyer evidence","Start with a recent customer problem, a workaround, the person who paid and a small test.","/business-idea-research-india","/startup-guides/business-idea-validation-framework"],
            ["I need to understand the market","Map the actual alternatives, the reachable buyer group and a narrow entry point.","/market-research","/startup-guides/competitor-analysis-framework"],
            ["I need to protect cash","Follow the full payment sequence: supplier, delivery, collection, refund and tax reserve.","/startup-cash-flow-india","/startup-guides/startup-cash-flow-management"],
            ["I am preparing a first offer","Define one customer promise and the smallest test that can prove or disprove it.","/startup-idea-validation","/startup-guides/minimum-viable-product-development"],
            ["I need a route to first customers","Choose a reachable buyer and a channel you can operate consistently before increasing volume.","/first-customer-india","/startup-guides/go-to-market-strategy-b2b"],
            ["Customers try it but do not return","Study the reason for repeat use, cancellation or switching before adding more acquisition.","/founder-decision-journal","/startup-guides/user-retention-strategies-saas"],
            ["I want to start with limited capital","Compare what each model asks you to deliver, pay for and carry before the first sale.","/business-models-india","/startup-guides/zero-investment-business-models"],
            ["I am bringing in a co-founder or first hire","Clarify contribution, decision rights, responsibilities and incentives before commitments are made.","/startup-launch-plan-india","/startup-guides/startup-equity-split-guide"],
          ].map(([title,copy,href,secondary])=><article key={title} className={card}><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold"><a href={href} className="inline-flex items-center gap-1 text-primary hover:underline">Explore this decision <ArrowRight size={15}/></a><a href={secondary} className="text-muted-foreground underline-offset-4 hover:underline">Read the source guide</a></div></article>)}
        </div>
      </div>
    </section>

    <section className="py-10 lg:py-12">
      <div className={wrap}>
        <div className="max-w-3xl"><h2 className="text-2xl font-bold">Explore the subject, not just the next task.</h2><p className="mt-2 leading-7 text-muted-foreground">The guide collection covers more than idea validation. It includes customer discovery, market boundaries, pricing, cash discipline, distribution, product development, retention, hiring and founder ownership. These subjects connect: a pricing decision changes cash timing; a channel decision changes acquisition work; a hiring decision changes the cost and pace of delivery.</p></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Customer evidence","Problem interviews, first buyers, willingness to pay and validation.","/startup-guides/business-idea-validation-framework"],
            ["Market and alternatives","Competitor positioning, reachable markets and market sizing.","/startup-guides/tam-sam-som-market-sizing"],
            ["Pricing and cash","Pricing structure, working capital, runway and collection timing.","/startup-guides/startup-cash-flow-management"],
            ["Sales and distribution","B2B outreach, inbound discovery and go-to-market choices.","/startup-guides/go-to-market-strategy-b2b"],
            ["Product and launch","MVP scope, pre-launch checks and the first usable customer outcome.","/startup-guides/minimum-viable-product-development"],
            ["Retention and growth","Activation, repeat use, churn and product-market-fit evidence.","/startup-guides/product-market-fit-metrics"],
            ["People and ownership","Early hiring, founder roles, equity and long-term commitments.","/startup-guides/startup-equity-split-guide"],
            ["Bootstrapping","Low-capital offers, productized services and operating discipline.","/startup-guides/zero-investment-business-models"],
          ].map(([title,copy,href])=><a key={title} href={href} className={card}><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open a relevant guide <ArrowRight size={15}/></span></a>)}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-muted-foreground">Context note: several source guides are written for B2B or SaaS businesses. Their original examples and assumptions remain specific to those settings. For a local service, physical product or small offline business, use the underlying question only where it transfers; do not copy software metrics, acquisition benchmarks or subscription logic without evidence.</p>
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
