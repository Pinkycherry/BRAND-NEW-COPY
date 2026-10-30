import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { STARTUP_GUIDES } from "@/lib/guides-data";

const wrap="mx-auto max-w-6xl px-4 md:px-6";
const card="rounded-2xl border border-border bg-card p-5 shadow-sm";
const guideSlugs=["tam-sam-som-market-sizing","competitor-analysis-framework","business-idea-validation-framework","calculating-customer-lifetime-value"];
const formatINR=(value:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);

export const Route=createFileRoute("/market-research")({
  head:()=>({meta:[
    {title:"Market Research for Founders: Bottom-Up Market Sizing and Evidence | BusinessIdea.io"},
    {name:"description",content:"Estimate TAM, SAM and SOM from your own buyer-count and spend assumptions, then check those assumptions against official data and real customer evidence."},
    {property:"og:title",content:"Market research for founders | BusinessIdea.io"},
    {property:"og:type",content:"website"},
  ]}),
  component:MarketResearchPage
});

function MarketResearchPage(){
  const [buyerCount,setBuyerCount]=useState("");
  const [segmentShare,setSegmentShare]=useState("100");
  const [annualSpend,setAnnualSpend]=useState("");
  const [reachShare,setReachShare]=useState("10");
  const [winShare,setWinShare]=useState("10");
  const buyers=Number(buyerCount);
  const segment=Number(segmentShare);
  const spend=Number(annualSpend);
  const reach=Number(reachShare);
  const win=Number(winShare);
  const valid=buyers>0&&spend>0&&[segment,reach,win].every(value=>Number.isFinite(value)&&value>=0&&value<=100);
  const tam=valid?buyers*spend:0;
  const sam=valid?tam*(segment/100):0;
  const reachable=valid?sam*(reach/100):0;
  const som=valid?reachable*(win/100):0;
  const guides=STARTUP_GUIDES.filter(guide=>guideSlugs.includes(guide.slug));
  const reset=()=>{setBuyerCount("");setSegmentShare("100");setAnnualSpend("");setReachShare("10");setWinShare("10");};
  return <V2Frame active="/topics">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><nav aria-label="Breadcrumb" className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm`}><a href="/" className="hover:text-primary">Home</a><ChevronRight size={15}/><span>Market research</span></nav></div>

    <section className="border-b bg-gradient-to-b from-amber-500/10 to-background py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Founder research desk</span><h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">Size the market you can actually reach.</h1><p className="mt-5 max-w-3xl text-lg text-muted-foreground">Start with a defined buyer and geography. Estimate what those buyers already spend, narrow to the segment you can serve, and then model what you could realistically reach and win.</p><div className="mt-6 flex flex-wrap gap-3"><a href="#market-sizing" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Build a market scenario <ArrowRight size={17}/></a><a href="/business-idea-research-india" className="inline-flex min-h-11 items-center rounded-lg border bg-card px-6 py-3 font-semibold">Record buyer evidence</a></div></div></section>

    <section id="market-sizing" className="scroll-mt-24 py-12 lg:py-16"><div className={wrap}><div className="max-w-3xl"><h2 className="text-3xl font-bold">Bottom-up TAM, SAM and SOM scenario</h2><p className="mt-3 text-muted-foreground">Enter your own assumptions. The calculator does not fetch market data or decide whether the inputs are true.</p></div>
      <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-7"><div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">Potential buyers in your defined geography<input type="number" min="1" step="1" inputMode="numeric" value={buyerCount} onChange={event=>setBuyerCount(event.target.value)} placeholder="e.g. 12,000" className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/><span className="text-xs font-normal text-muted-foreground">Use a specific buyer type and area, not the whole population.</span></label>
          <label className="grid gap-2 text-sm font-semibold">Share that fits your target segment (%)<input type="number" min="0" max="100" step="0.1" value={segmentShare} onChange={event=>setSegmentShare(event.target.value)} className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/><span className="text-xs font-normal text-muted-foreground">Narrow the total to buyers who have the problem you serve.</span></label>
          <label className="grid gap-2 text-sm font-semibold">Annual spend per buyer on the current solution (₹)<input type="number" min="1" step="1" inputMode="decimal" value={annualSpend} onChange={event=>setAnnualSpend(event.target.value)} placeholder="e.g. 18,000" className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/><span className="text-xs font-normal text-muted-foreground">Use observed spend where possible, not the price you hope to charge.</span></label>
          <label className="grid gap-2 text-sm font-semibold">Target buyers you can reach in 12 months (%)<input type="number" min="0" max="100" step="0.1" value={reachShare} onChange={event=>setReachShare(event.target.value)} className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/><span className="text-xs font-normal text-muted-foreground">Account for geography, channel access and your team's capacity.</span></label>
          <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Share of reachable buyers you could win (%)<input type="number" min="0" max="100" step="0.1" value={winShare} onChange={event=>setWinShare(event.target.value)} className="min-h-11 w-full rounded-lg border bg-background px-3 py-2 font-normal"/><span className="text-xs font-normal text-muted-foreground">A conservative scenario, not a forecast. Consider existing alternatives and switching friction.</span></label>
        </div><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={reset} className="min-h-10 rounded-lg border px-4 py-2 text-sm font-semibold hover:border-primary/50">Reset assumptions</button><span className="text-xs text-muted-foreground">All values stay in this page session; nothing is saved or sent.</span></div></div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 md:p-7" aria-live="polite"><p className="text-sm font-bold text-blue-900">Your scenario · annual value</p>{valid?<div className="mt-5 space-y-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-800">TAM · total defined market</p><p className="mt-1 text-2xl font-bold text-slate-950">{formatINR(tam)}</p><p className="text-xs text-slate-600">{buyers.toLocaleString("en-IN")} buyers × {formatINR(spend)} annual spend</p></div><div className="border-t border-blue-200 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-blue-800">SAM · target segment</p><p className="mt-1 text-2xl font-bold text-slate-950">{formatINR(sam)}</p><p className="text-xs text-slate-600">TAM × {segment}% target-segment share</p></div><div className="border-t border-blue-200 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-blue-800">SOM · first-year obtainable scenario</p><p className="mt-1 text-3xl font-bold text-slate-950">{formatINR(som)}</p><p className="text-xs text-slate-600">SAM × {reach}% reachable × {win}% expected capture</p></div><p className="rounded-lg bg-white/70 p-3 text-xs leading-5 text-slate-700">This is arithmetic on your inputs, not an independent market estimate, sales forecast or promise of revenue. Replace assumptions with dated sources and buyer evidence.</p></div>:<div className="mt-5 rounded-xl border border-dashed border-blue-300 bg-white/70 p-5"><h3 className="font-bold text-slate-950">Add your assumptions to see the scenario</h3><p className="mt-2 text-sm leading-6 text-slate-700">Enter a buyer count and annual spend greater than zero. Keep all percentage inputs between 0 and 100.</p></div>}</div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3"><article className={card}><h3 className="font-bold">TAM</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">All buyers in the market boundary you defined × annual spend per buyer.</p></article><article className={card}><h3 className="font-bold">SAM</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The part of that market that fits your actual customer segment, location and offer.</p></article><article className={card}><h3 className="font-bold">SOM</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The portion you could plausibly reach and win within a stated time period, given capacity and alternatives.</p></article></div>
    </div></section>

    <section className="border-y bg-muted/20 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Where to find India market evidence</h2><p className="mt-3 max-w-3xl text-muted-foreground">Official datasets can help establish population, sector and economic context. They do not automatically tell you how many people will buy your specific product.</p><div className="mt-6 grid gap-4 md:grid-cols-3">
      <article className={card}><h3 className="font-bold">Open Government Data Platform</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Search datasets by sector, state, ministry and subject. Check the dataset owner, geography, period, update date and definitions.</p><a href="https://data.gov.in/catalogs" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Search government datasets <ExternalLink size={14}/></a></article>
      <article className={card}><h3 className="font-bold">Ministry of Statistics and Programme Implementation</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use official survey reports and statistical publications for broader household, labour, industry and economic context.</p><a href="https://mospi.gov.in/publications-reports" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Browse reports and publications <ExternalLink size={14}/></a></article>
      <article className={card}><h3 className="font-bold">Reserve Bank of India · Database on Indian Economy</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use macroeconomic, banking and financial time series where relevant. These indicators provide context, not direct customer counts.</p><a href="https://data.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Open RBI data <ExternalLink size={14}/></a></article>
    </div></div></section>

    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">A research sequence that keeps assumptions visible</h2><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{[
      ["Define the unit","One buyer, one location, one use case and one time period. Do not mix households, users and paying organisations."],
      ["Find the buyer count","Use a source with the right geography and date. If the count is an estimate, label it and show how you derived it."],
      ["Check current spend","Ask what buyers pay now—in money, time, waste, transport or workarounds. Separate observed spend from willingness to pay."],
      ["Map alternatives","Include direct competitors, informal providers, DIY, manual work and doing nothing."],
      ["Run a small demand test","Ask for a specific action at a stated price. Track actual responses, not likes or compliments."],
      ["Update the model","Replace assumptions as evidence arrives. Keep the source date and explain any change to the estimate."],
    ].map(([title,copy])=><article key={title} className={card}><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div><div className="mt-7 flex flex-wrap gap-4"><a href="/business-idea-research-india" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Record buyer observations <ArrowRight size={15}/></a><a href="/open-source" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Research existing products <ArrowRight size={15}/></a><a href="/business-demand-test-india" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Test demand <ArrowRight size={15}/></a></div></div></section>

    <section className="border-t bg-muted/20 py-12"><div className={wrap}><h2 className="text-2xl font-bold">Guides for the next research step</h2><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{guides.map(guide=><a key={guide.slug} href={`/startup-guides/${guide.slug}`} className={card+" group hover:border-primary/50"}><span className="text-xs font-bold uppercase text-primary">{guide.category}</span><h3 className="mt-2 font-semibold group-hover:text-primary">{guide.title}</h3><p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{guide.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read guide <ArrowRight size={15}/></span></a>)}</div><div className="mt-7 flex flex-wrap gap-4 text-sm"><a href="/topics" className="font-semibold text-primary hover:underline">Explore all topics</a><a href="/faq" className="font-semibold text-primary hover:underline">Founder FAQ</a><a href="/browse" className="font-semibold text-primary hover:underline">Browse business ideas</a></div></div></section>
  </V2Frame>;
}
