import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { getListsHub } from "@/lib/lists.functions";
import { getBrowseIdeas } from "@/lib/browse.functions";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

const rupees = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const value = (s: string) => Math.max(0, Number(s) || 0);
const offers = [
  { name: "Service", question: "What exactly is included?", detail: "Quote the outcome, revision limit, date and travel. Count finding the client and following up, not only the delivery hour." },
  { name: "Product", question: "What reaches the buyer?", detail: "Count packaging, damage, delivery, payment fees and returns. A supplier's price is only one line of the sale." },
  { name: "Repeat offer", question: "What happens next month?", detail: "Define the renewal, support and stopping terms. A repeated charge needs repeated value and delivery work." },
] as const;
const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500";
const primary = "inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700";
const input = "mt-2 block min-h-11 w-full rounded-xl border bg-white px-3 outline-none focus:border-blue-600";

export const Route = createFileRoute("/business-pricing-india")({
  head: () => ({ meta: [
    { title: "Business Pricing in India: Quote a First Sale with Real Costs | BusinessIdea.io" },
    { name: "description", content: "Build a transparent first-price worksheet for a business idea in India. Compare direct cost, owner time, monthly commitments and realistic sales capacity." },
    { property: "og:title", content: "Business pricing in India | BusinessIdea.io" },
    { property: "og:type", content: "article" },
  ] }),
  loader: async () => {
    const hub = await getListsHub();
    const category = hub.categories.find(item => /service|food processing|e-commerce/i.test(item.name));
    const result = await getBrowseIdeas({ data: { q: "", category: category?.code ?? "", investment: "", time: "", skill: "", page: 1 } });
    return { categories: hub.categories, ideas: result.ideas };
  },
  component: PricingPage,
});

function PricingPage() {
  const { categories, ideas } = Route.useLoaderData();
  const related = categories.filter(item => /service|food processing|e-commerce/i.test(item.name)).slice(0, 6);
  const [price, setPrice] = useState(""), [materials, setMaterials] = useState(""), [fees, setFees] = useState("");
  const [hours, setHours] = useState(""), [hourValue, setHourValue] = useState(""), [fixed, setFixed] = useState(""), [units, setUnits] = useState("");
  const [offer, setOffer] = useState(0);
  const direct = value(materials) + value(fees), time = value(hours) * value(hourValue), contribution = value(price) - direct - time;
  const capacity = value(units), share = capacity > 0 ? value(fixed) / capacity : 0, floor = direct + time + share;
  const month = contribution * capacity - value(fixed), breakEven = contribution > 0 ? Math.ceil(value(fixed) / contribution) : null;
  const ready = price !== "" && capacity > 0;
  const fields = [
    { label: "Proposed price (₹)", hint: "Compare actual scope, not only another shop's number.", state: price, setter: setPrice },
    { label: "Materials, stock or subcontracting (₹)", hint: "Cash you spend because this sale happens.", state: materials, setter: setMaterials },
    { label: "Delivery, fees and returns allowance (₹)", hint: "Packaging, trips, payment or platform charges.", state: fees, setter: setFees },
    { label: "Hours spent per sale", hint: "Include finding, serving and following up.", state: hours, setter: setHours },
    { label: "Value needed per hour (₹)", hint: "Your planning value for the work, not a legal wage calculation.", state: hourValue, setter: setHourValue },
    { label: "Other fixed costs per month (₹)", hint: "Rent, software and bills not charged to one sale.", state: fixed, setter: setFixed },
    { label: "Sales you can deliver per month", hint: "Check hours, stock and real buyer conversations.", state: units, setter: setUnits },
  ];
  return <V2Frame active="/startup-guides">
    <JsonLd schema={[
      webPageSchema({ path: "/business-pricing-india", name: "Business pricing in India for a first sale", description: "A first-price workbench with direct costs, owner time, fixed commitments and buyer evidence." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Business pricing in India", path: "/business-pricing-india" }]),
    ]} />
    <div className="bg-slate-50 pt-24 lg:pt-28"><nav className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm text-slate-600`} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={15}/><a href="/startup-guides">Guides</a><ChevronRight size={15}/><span>Business pricing in India</span></nav></div>
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16"><div className={wrap}><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">The first quote · India</span><h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Put a price on the <span className="text-blue-700">whole promise.</span></h1><p className="mt-5 max-w-3xl text-lg text-slate-600">You are quoting a real buyer, not filling a blank in a business plan. The number has to carry what you buy, the hours you give, the bills that repeat and an outcome the customer understands.</p><div className="mt-7 flex flex-wrap gap-3"><a href="/browse" className={primary}>Browse ideas <ArrowRight size={17}/></a><a href="#pricing-workbench" className="inline-flex min-h-11 items-center rounded-xl border bg-white px-6 py-3 font-semibold hover:border-blue-500">Work through a first price</a></div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">What does one sale include?</h2><p className="mt-3 max-w-3xl text-slate-600">A founder can lose money while the invoice looks good. The unspoken second visit, packaging and two hours of follow-up still belong to the offer.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Output", "One unit, one project or one month of access. Say exactly what arrives."],
      ["Boundary", "State quantity, revisions, timing and what costs extra."],
      ["Collection", "Agree when the buyer pays and what happens if the work changes."],
    ].map(([title, copy], index) => <article className={card} key={title}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section id="pricing-workbench" className="scroll-mt-28 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Can this price carry the work?</h2><p className="mt-3 max-w-3xl text-slate-600">Enter assumptions for one sale and one month. Blank fields count as zero in the arithmetic but are still missing evidence. The readout is a planning check, not a demand forecast or tax calculation.</p><div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className={`${card} grid gap-4 sm:grid-cols-2`}>{fields.map(field => <label className="text-sm font-semibold" key={field.label}>{field.label}<input className={input} type="number" min="0" inputMode="decimal" value={field.state} onChange={event => field.setter(event.target.value)} /><small className="mt-2 block font-normal text-slate-600">{field.hint}</small></label>)}</div>
      <aside className={`${card} bg-blue-50`} aria-live="polite"><h3 className="text-xl font-bold">The math, visible</h3><dl className="mt-5 grid gap-4">{[
        ["Direct cash per sale", rupees(direct)], ["Your time value per sale", rupees(time)],
        ["Fixed cost share per sale", capacity > 0 ? rupees(share) : "Enter sales capacity"],
        ["Cost-covering price at this volume", capacity > 0 ? rupees(floor) : "—"],
        ["After these costs for a month", ready ? rupees(month) : "—"],
        ["Sales to cover fixed costs", price !== "" && breakEven !== null ? String(breakEven) : "—"],
      ].map(([label, reading]) => <div className="flex flex-wrap justify-between gap-2" key={label}><dt>{label}</dt><dd className="font-bold text-blue-700">{reading}</dd></div>)}</dl><p className="mt-5 text-sm text-slate-600">{ready ? "The result uses your proposed price and sales capacity. A positive number does not prove those buyers exist." : "Enter your own price and a realistic sales capacity to interpret the result."} Taxes, financing, losses beyond your allowance and collection delays are excluded.</p><a className="mt-4 inline-flex font-semibold text-blue-700 hover:underline" href="/startup-cash-flow-india">Check collection dates against bills <ArrowRight className="ml-2" size={17}/></a></aside>
    </div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">What are you really selling?</h2><p className="mt-3 max-w-3xl text-slate-600">Change the pattern to see the question your quote must answer. The worksheet amounts remain yours.</p><div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Offer type">{offers.map((item, index) => <button type="button" key={item.name} aria-pressed={offer === index} onClick={() => setOffer(index)} className={`min-h-11 rounded-xl border px-5 py-3 font-semibold ${offer === index ? "border-blue-600 bg-blue-600 text-white" : "bg-white hover:border-blue-500"}`}>{item.name}</button>)}</div><article className={`${card} mt-5`} aria-live="polite"><span className="font-bold text-blue-700">{offers[offer]?.name}</span><h3 className="mt-2 text-xl font-bold">{offers[offer]?.question}</h3><p className="mt-3 text-slate-600">{offers[offer]?.detail}</p><a href="/business-models-india" className="mt-4 inline-flex font-semibold text-blue-700 hover:underline">Compare delivery models <ArrowRight className="ml-2" size={17}/></a></article></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">The buyer already has an alternative.</h2><p className="mt-3 max-w-3xl text-slate-600">The workbench shows what a price needs to cover. It cannot tell you whether this person will buy. Walk the local options: another provider, doing it themselves or postponing the problem.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Ask what they paid before", "Find the actual scope, quality and date. “Too expensive” needs context."],
      ["Show one defined offer", "Give a price, delivery date and boundary. Ask for a decision or a specific objection."],
      ["Record what changed", "Adjust the offer when evidence says so. Do not quietly omit work to make it look cheaper."],
    ].map(([title, copy]) => <article className={card} key={title}><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Reduce the scope before you cut the price.</h2><p className="mt-3 max-w-3xl text-slate-600">Offer fewer revisions, a smaller batch or a simpler delivery window. Name what changes. Keep the promise you can deliver without shifting hidden cost to yourself.</p><p className={`${card} mt-6 font-semibold`}>A useful quote makes the trade-off clear.</p></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Published ideas to inspect</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ideas.map(idea => <a className={card} href={`/idea/${idea.slug}`} key={idea.slug}><h3 className="text-xl font-bold">{idea.title}</h3><p className="mt-3 line-clamp-3 text-slate-600">{idea.hook || idea.summary}</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Read idea <ArrowRight size={17}/></span></a>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Related categories</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(category => <a className={card} href={`/category/${category.slug}`} key={category.slug}><h3 className="text-xl font-bold">{category.name}</h3><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Explore category <ArrowRight size={17}/></span></a>)}</div></div></section>
    <SellerFaq title="A few useful distinctions" faq={[
      { q: "Is the cost-covering price the final selling price?", a: "No. It checks your assumptions at the chosen volume. The buyer's alternative, value and ability to pay need separate research." },
      { q: "What if I cannot estimate sales yet?", a: "Keep the field blank and test small. Direct cash and time still matter. Do not spread rent across an optimistic sales count to make the quote look affordable." },
      { q: "Should owner time count if I pay myself later?", a: "Yes for this planning view. Unpaid time remains a constraint. Enter the value needed to make the work sustainable." },
      { q: "Does this calculate GST or pricing rules?", a: "No. Requirements depend on the activity and current rules. Check official sources or qualified advice for your case before quoting or invoicing." },
    ]} />
    <section className="bg-blue-700 py-12 text-white lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Test the quote with a real buyer.</h2><p className="mt-3 max-w-3xl text-blue-100">If the price works in your ledger, ask whether someone will commit to the defined offer. If cash needed first is high, revise the first version.</p><div className="mt-6 grid gap-4 sm:grid-cols-3">{[
      ["Plan a buyer test", "/startup-idea-validation"], ["Map startup cash", "/startup-costs-india"], ["Browse ideas", "/browse"],
    ].map(([label, href]) => <a href={href} key={href} className="flex min-h-11 items-center justify-between rounded-xl bg-white p-4 font-semibold text-blue-800 hover:bg-blue-50">{label}<ArrowRight size={17}/></a>)}</div></div></section>
  </V2Frame>;
}
