import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { getBrowseIdeas } from "@/lib/browse.functions";

export const Route = createFileRoute("/product")({
  head: () => ({ meta: [
    { title: "Business Idea Validation Workbench in India | BusinessIdea.io" },
    { name: "description", content: "Use buyer, problem, current workaround and small-offer questions in a real conversation, with published ideas and working research paths." },
    { name: "robots", content: "noindex,nofollow,noarchive,noimageindex" },
  ] }),
  loader: async () => {
    const result = await getBrowseIdeas({ data: { q: "", category: "", investment: "", time: "", skill: "", page: 1 } });
    return { ideas: result.ideas.slice(0, 6) };
  },
  component: ProductPage,
});
const prompts = [
  { label: "Who is the buyer?", hint: "A person in a situation, not everybody" },
  { label: "What happened recently?", hint: "A specific recurring problem, not a broad trend" },
  { label: "What do they do now?", hint: "Include a purchase, time cost or existing alternative" },
  { label: "What small offer will you test?", hint: "An outcome, delivery window and stated price" },
] as const;
const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500";
const button = "inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700";
function ProductPage() {
  const { ideas } = Route.useLoaderData();
  return <V2Frame active="/product">
    <div className="bg-slate-50 pt-24 lg:pt-28"><nav className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm text-slate-600`} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={15}/><span>Validation workbench</span></nav></div>
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">The validation workbench</span><h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">A sharper idea starts with <span className="text-blue-700">a buyer you can name.</span></h1><p className="mt-5 max-w-3xl text-lg text-slate-600">Write down the person, the last occurrence, the current workaround and a small offer. These questions help you ask a better question. It does not produce an AI score or claim a market verdict.</p><div className="mt-7 flex flex-wrap gap-3"><a href="/browse" className={button}>Browse published ideas <ArrowRight size={17}/></a><a href="#workbench" className="inline-flex min-h-11 items-center rounded-xl border bg-white px-6 py-3 font-semibold hover:border-blue-500">Review the questions</a></div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Evidence before a confident answer.</h2><p className="mt-3 max-w-3xl text-slate-600">The current workbench prepares your next test. Research models and reports require their own working integrations; this page does not simulate either.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Describe the situation.", "Name a buyer and the last time they encountered the problem."],
      ["Inspect the alternative.", "Find what they already do, including inconvenience and money spent."],
      ["Ask for commitment.", "Take a clear offer into an appropriate conversation, booking or small test."],
    ].map(([title, copy], index) => <article className={card} key={title}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section id="workbench" className="scroll-mt-28 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Put the assumption into words.</h2><ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{prompts.map((item, index) => <li className={card} key={item.label}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><h3 className="mt-3 font-bold">{item.label}</h3><p className="mt-3 text-slate-600">{item.hint}</p></li>)}</ol></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Take the brief to a buyer.</h2><p className="mt-3 max-w-3xl text-slate-600">Ask about a recent event before describing your offer. Keep the buyer's own words separate from your interpretation. A polite reaction is weaker than a specific booking, purchase or agreed next step.</p><p className="mt-3 max-w-3xl text-slate-600">Then put your price, delivery cost and cash timing beside the field evidence. A buyer's yes can still lead to a losing sale.</p><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
      ["Find one reachable buyer", "/first-customer-india"],
      ["Design a small demand test", "/business-demand-test-india"],
      ["Check cash at risk", "/startup-costs-india"],
      ["Preview the evidence tracker", "/templates"],
    ].map(([title, href]) => <a className={card} href={href} key={href}><h3 className="font-bold">{title}</h3><ArrowRight className="mt-4 text-blue-700" size={17}/></a>)}</div></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Research a completed blueprint.</h2><p className="mt-3 max-w-3xl text-slate-600">Published idea pages offer research prompts for external models. Each provider has its own account and rules. Check any cited source yourself and bring the questions back to a buyer.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Select a published idea", "/blueprints"],
      ["Read the full validation field guide", "/startup-idea-validation"],
      ["Set a stop boundary", "/business-idea-risk-check"],
    ].map(([title, href]) => <a className={card} href={href} key={href}><h3 className="font-bold">{title}</h3><ArrowRight className="mt-4 text-blue-700" size={17}/></a>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Published ideas to inspect</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ideas.map(idea => <a className={card} href={`/idea/${idea.slug}`} key={idea.slug}><h3 className="text-xl font-bold">{idea.title}</h3><p className="mt-3 line-clamp-3 text-slate-600">{idea.hook || idea.summary}</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Read idea <ArrowRight size={17}/></span></a>)}</div></div></section>
    <SellerFaq title="What this workbench can tell you" faq={[
      { q: "Is this an AI validation result?", a: "No. It structures your own claim and shows working next steps. It does not estimate market size, score viability or generate a report." },
      { q: "Are my answers stored?", a: "No. This page presents questions to take into a real buyer conversation." },
      { q: "What if I cannot answer a question?", a: "That is a useful research gap. Speak to a person who recently faced the problem and ask about what happened last time." },
    ]} />
    <section className="bg-blue-700 py-12 text-white lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Take one question into the world.</h2><p className="mt-3 max-w-3xl text-blue-100">Choose a published idea, identify a buyer and compare what they do today with a small offer you can deliver.</p><a href="/browse" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-800 hover:bg-blue-50">Browse ideas <ArrowRight size={17}/></a></div></section>
  </V2Frame>;
}
