import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { getListsHub } from "@/lib/lists.functions";
import { getBrowseIdeas } from "@/lib/browse.functions";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

const contexts = [
  { key: "neighbourhood", title: "A neighbourhood buyer", where: "Observe the street, market, apartment group or service queue where the problem already appears.", ask: "What did you pay for the last time this happened?", risk: "A friend who likes you may praise the idea without needing the offer." },
  { key: "work", title: "A business buyer", where: "Find the person who owns the budget, not only the person who uses the service.", ask: "Who approved the last purchase, and when did it become urgent?", risk: "A meeting is not a purchase order; procurement and payment timing matter." },
  { key: "online", title: "An online buyer", where: "Watch existing searches, product reviews and questions; then speak with people in a narrow group.", ask: "Which option did you almost buy, and what stopped you?", risk: "Views and followers do not prove that a defined offer will sell." },
] as const;
const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500";
const primary = "inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700";

export const Route = createFileRoute("/first-customer-india")({
  head: () => ({ meta: [
    { title: "Find Your First Customer in India: A Practical Business Idea Field Map | BusinessIdea.io" },
    { name: "description", content: "Locate a first customer for a business idea in India. Map the trigger, current alternative, payer and evidence of a real commitment." },
    { property: "og:title", content: "Find your first customer in India | BusinessIdea.io" },
    { property: "og:type", content: "article" },
  ] }),
  loader: async () => {
    const hub = await getListsHub();
    const category = hub.categories.find(item => /local service|home service|online service/i.test(item.name));
    const result = await getBrowseIdeas({ data: { q: "", category: category?.code ?? "", investment: "", time: "", skill: "", page: 1 } });
    return { categories: hub.categories, ideas: result.ideas };
  },
  component: FirstCustomerPage,
});

function FirstCustomerPage() {
  const { categories, ideas } = Route.useLoaderData();
  const [context, setContext] = useState(0);
  const current = contexts[context] ?? contexts[0];
  const related = categories.filter(item => /local|service|online/i.test(item.name)).slice(0, 6);
  return <V2Frame active="/startup-guides">
    <JsonLd schema={[
      webPageSchema({ path: "/first-customer-india", name: "Find a first customer for a business idea in India", description: "A field map for identifying the buyer, their existing alternative and a specific commitment." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "First customer in India", path: "/first-customer-india" }]),
    ]} />
    <div className="bg-slate-50 pt-24 lg:pt-28"><nav className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm text-slate-600`} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={15}/><a href="/startup-guides">Guides</a><ChevronRight size={15}/><span>First customer in India</span></nav></div>
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16"><div className={wrap}>
      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">The person before the plan · India</span>
      <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Your first customer has a <span className="text-blue-700">Tuesday.</span></h1>
      <p className="mt-5 max-w-3xl text-lg text-slate-600">They are already fixing the problem somehow, between work, family and the rest of their day. Find that moment before you buy a logo, a lease or a month of ads.</p>
      <div className="mt-7 flex flex-wrap gap-3"><a href="/browse" className={primary}>Browse ideas <ArrowRight size={17}/></a><a href="#buyer-map" className="inline-flex min-h-11 items-center rounded-xl border bg-white px-6 py-3 font-semibold hover:border-blue-500">Map one buyer</a></div>
    </div></section>
    <section id="buyer-map" className="scroll-mt-28 bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Look for a moment, not a demographic.</h2><p className="mt-3 max-w-3xl text-slate-600">“Everyone in my city” is too broad for a first sale. Name the situation that makes someone act, where it occurs and who can actually pay.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Trigger", "What broke, ran out or became urgent?", "A leaking tap, a delayed order, a missed deadline, a training gap. Look for a repeated moment rather than a vague preference."],
      ["Workaround", "What do they do today?", "Ask about the last purchase, person they called, app they used or task they postponed. That is the alternative you have to beat."],
      ["Payment", "Who decides and who transfers money?", "For a household or a company, the user and payer may differ. Know the approval step and collection date."],
    ].map(([label, title, copy]) => <article className={card} key={label}><span className="text-sm font-bold uppercase text-blue-700">{label}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Where can you meet that moment?</h2><p className="mt-3 max-w-3xl text-slate-600">The first conversation depends on the buying setting. Choose a lens; these are prompts, not a claim that any channel will work for your idea.</p><div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Buyer setting">{contexts.map((item, index) => <button type="button" className={`min-h-11 rounded-xl border px-5 py-3 font-semibold ${context === index ? "border-blue-600 bg-blue-600 text-white" : "bg-white hover:border-blue-500"}`} key={item.key} aria-pressed={context === index} onClick={() => setContext(index)}>{item.title}</button>)}</div><article className={`${card} mt-5`} aria-live="polite"><h3 className="text-xl font-bold">{current.title}</h3><dl className="mt-4 grid gap-4 md:grid-cols-3"><div><dt className="font-semibold text-blue-700">Where to look</dt><dd className="mt-2 text-slate-600">{current.where}</dd></div><div><dt className="font-semibold text-blue-700">What to ask</dt><dd className="mt-2 text-slate-600">“{current.ask}”</dd></div><div><dt className="font-semibold text-blue-700">What can fool you</dt><dd className="mt-2 text-slate-600">{current.risk}</dd></div></dl></article></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Ask about their life, then your offer.</h2><p className="mt-3 max-w-3xl text-slate-600">A sales pitch too early teaches you what people say to be polite. Start with a specific past situation. Let them explain the trade-off they already make.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{[
      ["When did this last happen?", "Hear the date, setting and consequence. A remembered incident is more useful than “it happens sometimes.”"],
      ["What did you do?", "Find the existing provider, price, delay and effort. Do not argue against their workaround."],
      ["What would change the choice?", "Ask about quality, trust, timing, proximity and the real payer."],
      ["Will you try a defined offer?", "State scope, date and price. Listen for a payment, booking, introduction or concrete refusal."],
    ].map(([title, copy], index) => <article className={card} key={title}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div><a href="/business-idea-research-india" className="mt-6 inline-flex font-semibold text-blue-700 hover:underline">Use the business idea evidence desk <ArrowRight className="ml-2" size={17}/></a></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Interest is a door. Commitment is a step through it.</h2><p className="mt-3 max-w-3xl text-slate-600">Do not turn polite responses into a market-size number. Separate what someone said from what they spent, booked or introduced.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Heard", "“That sounds useful.”", "A conversation starter. Ask about the last incident and current alternative."],
      ["Asked", "“Can you send the details?”", "More specific interest. Send exact scope and price; watch what happens next."],
      ["Committed", "“I will book or pay.”", "Record the agreed amount, date and conditions. A verbal plan can still change before collection."],
    ].map(([label, quote, copy]) => <article className={card} key={label}><span className="text-sm font-bold uppercase text-blue-700">{label}</span><h3 className="mt-3 text-xl font-bold">{quote}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div><a href="/business-demand-test-india" className="mt-6 inline-flex font-semibold text-blue-700 hover:underline">Choose a commitment and record the reply <ArrowRight className="ml-2" size={17}/></a></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Keep observation separate from hope.</h2><p className="mt-3 max-w-3xl text-slate-600">Use these questions as a read-only conversation checklist.</p><ol className="mt-6 grid gap-4 md:grid-cols-3">{["Buyer group or situation", "Problem they described", "What they used or paid for instead"].map((question, index) => <li className={card} key={question}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><p className="mt-3 font-semibold">{question}</p></li>)}</ol></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Make the first promise small enough to keep.</h2><p className="mt-3 max-w-3xl text-slate-600">Distance, timing, trust, language, payment method and a local referral can change a first sale. Use what you learned to define an offer you can actually deliver.</p><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
      ["Place", "Can you reach the buyer or fulfil the order reliably in their area?"],
      ["Trust", "What proof, sample or clear terms would make a stranger comfortable trying you?"],
      ["Cash", "Will you pay to deliver before the customer pays you? Count that gap."],
      ["Repeat", "Is the need occasional or recurring, and would they choose you again?"],
    ].map(([title, copy]) => <article className={card} key={title}><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Published ideas to inspect</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ideas.map(idea => <a className={card} href={`/idea/${idea.slug}`} key={idea.slug}><h3 className="text-xl font-bold">{idea.title}</h3><p className="mt-3 line-clamp-3 text-slate-600">{idea.hook || idea.summary}</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Read idea <ArrowRight size={17}/></span></a>)}</div></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Related categories</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(category => <a className={card} href={`/category/${category.slug}`} key={category.slug}><h3 className="text-xl font-bold">{category.name}</h3><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Explore category <ArrowRight size={17}/></span></a>)}</div></div></section>
    <SellerFaq title="Common first-customer questions" faq={[
      { q: "Should I run ads to find the first buyer?", a: "Ads can reach people, but a small founder can often learn more from direct conversations first. Choose the channel that can reach the actual payer and measure a defined offer, not only clicks." },
      { q: "Can friends and family be customers?", a: "They can buy, but separate support for you from repeatable demand. Ask whether the same offer would make sense to someone who does not know you." },
      { q: "How many interviews prove the idea?", a: "No fixed count proves a business. Look for patterns in real past behaviour, specific commitments, delivery cost and repeated objections. Keep testing until you understand the risk you are about to pay for." },
    ]} />
    <section className="bg-blue-700 py-12 text-white lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Take one offer into the world.</h2><p className="mt-3 max-w-3xl text-blue-100">Use the conversation to name the smallest useful delivery, price it with your own costs, and validate what could make you stop.</p><div className="mt-6 grid gap-4 sm:grid-cols-3">{[
      ["Work out the first price", "/business-pricing-india"], ["Plan a field test", "/startup-idea-validation"], ["Read the original first-customer article", "/blog/find-first-paying-customer-without-ads"],
    ].map(([label, href]) => <a href={href} key={href} className="flex min-h-11 items-center justify-between rounded-xl bg-white p-4 font-semibold text-blue-800 hover:bg-blue-50">{label}<ArrowRight size={17}/></a>)}</div></div></section>
  </V2Frame>;
}
