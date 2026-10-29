import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { getListsHub } from "@/lib/lists.functions";
import { getBrowseIdeas } from "@/lib/browse.functions";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500";
const primary = "inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700";
export const Route = createFileRoute("/business-demand-test-india")({
  head: () => ({ meta: [
    { title: "Test Demand for a Business Idea in India | BusinessIdea.io" },
    { name: "description", content: "Design a small, honest demand test for a startup idea in India. Define the offer, audience and action, then separate polite interest from a booking or payment." },
    { property: "og:title", content: "Test demand for a business idea in India | BusinessIdea.io" },
    { property: "og:type", content: "article" },
  ] }),
  loader: async () => {
    const hub = await getListsHub();
    const category = hub.categories.find(item => /local service|home service|online service/i.test(item.name));
    const result = await getBrowseIdeas({ data: { q: "", category: category?.code ?? "", investment: "", time: "", skill: "", page: 1 } });
    return { categories: hub.categories, ideas: result.ideas };
  },
  component: DemandPage,
});
function DemandPage() {
  const { categories, ideas } = Route.useLoaderData();
  const related = categories.filter(item => /local|service|online/i.test(item.name)).slice(0, 6);
  return <V2Frame active="/startup-guides">
    <JsonLd schema={[
      webPageSchema({ path: "/business-demand-test-india", name: "Test demand for a business idea in India", description: "Define a small offer and record the difference between people approached, requests for details and meaningful commitments." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Business demand test in India", path: "/business-demand-test-india" }]),
    ]} />
    <div className="bg-slate-50 pt-24 lg:pt-28"><nav className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm text-slate-600`} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={15}/><a href="/startup-guides">Guides</a><ChevronRight size={15}/><span>Business demand test in India</span></nav></div>
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">The moment after “sounds good”</span><h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Will anyone make a <span className="text-blue-700">real move?</span></h1><p className="mt-5 max-w-3xl text-lg text-slate-600">Your business idea deserves a fair test before it takes your savings and weekends. Put one useful offer in front of the right person, ask for a specific action, and record what happened without rounding a maybe up to a yes.</p><div className="mt-7 flex flex-wrap gap-3"><a href="/browse" className={primary}>Browse ideas <ArrowRight size={17}/></a><a href="#design-test" className="inline-flex min-h-11 items-center rounded-xl border bg-white px-6 py-3 font-semibold hover:border-blue-500">Design a small test</a></div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">A busy conversation can test the wrong thing.</h2><p className="mt-3 max-w-3xl text-slate-600">Interest in the problem, interest in your proposed solution and willingness to pay are separate questions. Name one for this round. If you ask a cousin whether your logo looks good, you have learned about a logo, not a paying customer.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Problem", "Can the buyer describe a recent, costly workaround?"],
      ["Offer", "Do they choose your specific scope over that workaround?"],
      ["Commitment", "Will they take a suitable next step at a stated price and date?"],
    ].map(([title, copy]) => <article className={card} key={title}><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div><a href="/business-idea-research-india" className="mt-6 inline-flex font-semibold text-blue-700 hover:underline">First check the buyer and current alternatives <ArrowRight className="ml-2" size={17}/></a></div></section>
    <section id="design-test" className="scroll-mt-28 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Choose what a yes would mean.</h2><p className="mt-3 text-slate-600">Build one small ask with a defined offer and a response you can observe.</p><ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{["One defined offer", "Who will see it?", "When will you check the response?", "What outcome would make you change the offer?"].map((question, index) => <li className={card} key={question}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><p className="mt-3 font-semibold">{question}</p></li>)}</ol></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Make the decision easy to understand.</h2><p className="mt-3 max-w-3xl text-slate-600">A polished teaser may attract clicks that vanish when price, delivery or trust becomes real. Include the inconvenient details early enough that the answer means something.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Price", "State the amount.", "Include what is and is not covered. If you cannot quote it yet, use the first-price workbench."],
      ["Delivery", "Name the work and date.", "Promise only what you can serve in the first small version."],
      ["Trust", "Explain the terms.", "Show identity, contact, cancellation and refund conditions where relevant."],
    ].map(([label, title, copy], index) => <article className={card} key={label}><span className="text-sm font-bold uppercase text-blue-700">0{index + 1} · {label}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div><a href="/business-pricing-india" className="mt-6 inline-flex font-semibold text-blue-700 hover:underline">Use the first-price workbench <ArrowRight className="ml-2" size={17}/></a></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Count actions without inventing a verdict.</h2><p className="mt-3 text-slate-600">Keep these observations separate; a request for details is not a booking.</p><ol className="mt-6 grid gap-4 md:grid-cols-3">{["People who saw the offer", "Asked for details", "Took the agreed action"].map((question, index) => <li className={card} key={question}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><p className="mt-3 font-semibold">{question}</p></li>)}</ol></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={`${wrap} grid items-center gap-8 lg:grid-cols-2`}><img className="w-full rounded-2xl object-cover" src="/images/blog/how-to-find-your-first-paying-customer-without-spending-on-ads.webp" alt="Original featured artwork for the first paying customer article" loading="lazy" /><div><h2 className="text-3xl font-bold">Check the route before blaming the idea.</h2><p className="mt-3 text-slate-600">Did the message reach the payer, or just the person who likes the concept? Could they understand the price and next step? Silence is evidence about this offer and route. Try a clearer or smaller version before buying more reach.</p><div className="mt-5 flex flex-col gap-3"><a href="/first-customer-india" className="font-semibold text-blue-700 hover:underline">Map the first payer and approach <ArrowRight className="inline" size={17}/></a><a href="/blog/find-first-paying-customer-without-ads" className="font-semibold text-blue-700 hover:underline">Read the original first-customer article <ArrowRight className="inline" size={17}/></a></div></div></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">One yes is a beginning. One no is a clue.</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["No response", "Check the audience, channel and clarity. Do not pay for scale until the right person understands the ask."],
      ["Details, no action", "Ask what prevented a decision: price, timing, trust, scope or a weaker problem than expected."],
      ["Action", "Deliver the small promise, record all costs and follow up on whether they would choose it again. A first sale is evidence, not automatic repeat demand."],
    ].map(([title, copy]) => <article className={card} key={title}><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Can you afford to fulfil the test?</h2><p className="mt-3 max-w-3xl text-slate-600">If a customer pays after delivery, the first order may still require cash you do not have. Check supplies, travel, refunds and payment timing before you invite a second order.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{[
      ["Upfront need", "Map cash before opening", "/startup-costs-india"],
      ["Payment timing", "Put due dates beside collections", "/startup-cash-flow-india"],
    ].map(([title, copy, href]) => <a className={card} href={href} key={href}><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p><ArrowRight className="mt-4 text-blue-700" size={17}/></a>)}</div></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Published ideas to inspect</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ideas.map(idea => <a className={card} href={`/idea/${idea.slug}`} key={idea.slug}><h3 className="text-xl font-bold">{idea.title}</h3><p className="mt-3 line-clamp-3 text-slate-600">{idea.hook || idea.summary}</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Read idea <ArrowRight size={17}/></span></a>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Related categories</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(category => <a className={card} href={`/category/${category.slug}`} key={category.slug}><h3 className="text-xl font-bold">{category.name}</h3><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Explore category <ArrowRight size={17}/></span></a>)}</div></div></section>
    <SellerFaq title="Questions a small test can answer" faq={[
      { q: "Is a waitlist enough to validate demand?", a: "It shows interest in a promise, not a purchase. State what happens next and compare later actions against those sign-ups." },
      { q: "Should I take money before the product exists?", a: "Only if you can describe the offer honestly, fulfil it, and meet the rules and obligations for your specific activity. A small real pilot is often clearer than a vague pre-order." },
      { q: "How many people should I ask?", a: "Choose a reachable buyer group and a stopping condition in advance. The goal is to learn the objection and behaviour, not hit an arbitrary universal interview count." },
    ]} />
    <section className="bg-blue-700 py-12 text-white lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Take the answer seriously.</h2><p className="mt-3 max-w-3xl text-blue-100">Record what the buyer actually did and what it cost you. If the result is uncertain, narrow the promise and test again before taking on fixed expense.</p><div className="mt-6 grid gap-4 sm:grid-cols-3">{[
      ["Use the validation field guide", "/startup-idea-validation"], ["Check the countercase", "/business-idea-research-india"], ["Browse ideas", "/browse"],
    ].map(([label, href]) => <a href={href} key={href} className="flex min-h-11 items-center justify-between rounded-xl bg-white p-4 font-semibold text-blue-800 hover:bg-blue-50">{label}<ArrowRight size={17}/></a>)}</div></div></section>
  </V2Frame>;
}
