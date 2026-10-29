import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { getListsHub } from "@/lib/lists.functions";
import { getBrowseIdeas } from "@/lib/browse.functions";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

const models = [
  { id: "service", name: "Service", promise: "Sell work you can deliver.", buyer: "A person or company with a task they cannot or do not want to do themselves.", firstSale: "A scoped job with an outcome, date and price.", work: "Your time, skill, scheduling and quality control.", cash: "Deposit or payment after delivery; the timing needs to be agreed.", pressure: "Your available hours cap delivery unless you can document and delegate the work.", test: "Offer one small job to a real buyer and track all hours, including finding and serving them." },
  { id: "product", name: "Product & stock", promise: "Sell something you make or source.", buyer: "Someone choosing your item over the alternative already available.", firstSale: "A small, specified batch or pre-order, where suitable.", work: "Sourcing, stock, packaging, fulfilment and support.", cash: "You may pay suppliers before collecting from buyers; unsold stock ties up cash.", pressure: "Returns, damage, slow stock and repeated buying costs can eat a headline margin.", test: "Test one small batch or a legitimate pre-order with the actual delivered price." },
  { id: "subscription", name: "Subscription", promise: "Deliver repeated value for repeated payment.", buyer: "Someone whose need returns often enough to justify a continuing commitment.", firstSale: "A clear first period with what is included and how to stop.", work: "Ongoing delivery, onboarding, retention and customer support.", cash: "Recurring collection helps only while value continues and cancellations remain manageable.", pressure: "Acquiring customers repeatedly while existing ones leave can overwhelm revenue.", test: "Deliver the first cycle manually and ask whether the buyer would renew at the stated price." },
  { id: "marketplace", name: "Marketplace", promise: "Connect two sides and earn from a transaction.", buyer: "Both sides must trust the match, timing, payment and recourse.", firstSale: "A manually arranged transaction with a transparent fee.", work: "Supply, demand, verification, dispute handling and matching.", cash: "A commission is received only when a real transaction completes and fees are collected.", pressure: "Neither side returns if the other side is thin or unreliable.", test: "Arrange a few manual matches in one narrow area before building a platform." },
  { id: "licensing", name: "Licensing", promise: "Let another party use something you own.", buyer: "A business that can use a defined method, design, brand or intellectual property.", firstSale: "A specific permitted use, term, territory and payment arrangement.", work: "Creating the asset, documenting rights and supporting permitted use.", cash: "Upfront or recurring fees depend on the actual agreement and collection.", pressure: "Rights, enforcement and support obligations need specialist review.", test: "Speak to a likely licensee about the exact use and commercial terms; obtain qualified advice before signing." },
] as const;
type ModelId = (typeof models)[number]["id"];
const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500";
const primary = "inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700";

export const Route = createFileRoute("/business-models-india")({
  head: () => ({ meta: [
    { title: "Business Models in India: Compare How an Idea Earns | BusinessIdea.io" },
    { name: "description", content: "Compare service, product, subscription, marketplace and licensing models for a business idea in India. See the buyer, delivery work and cash timing." },
    { property: "og:title", content: "Business Models in India | BusinessIdea.io" },
    { property: "og:type", content: "article" },
  ] }),
  loader: async () => {
    const hub = await getListsHub();
    const category = hub.categories.find(item => /service|food processing|e-commerce/i.test(item.name));
    const result = await getBrowseIdeas({ data: { q: "", category: category?.code ?? "", investment: "", time: "", skill: "", page: 1 } });
    return { categories: hub.categories, ideas: result.ideas };
  },
  component: BusinessModelsPage,
});

function BusinessModelsPage() {
  const { categories, ideas } = Route.useLoaderData();
  const [first, setFirst] = useState<ModelId>("service");
  const [second, setSecond] = useState<ModelId>("product");
  const left = models.find(model => model.id === first)!;
  const right = models.find(model => model.id === second)!;
  const related = categories.filter(item => /service|food processing|e-commerce|handmade/i.test(item.name)).slice(0, 6);
  const fields = [
    ["Buyer", "buyer"], ["First sale", "firstSale"], ["Work you carry", "work"],
    ["Cash timing", "cash"], ["Breaking point", "pressure"], ["Smallest sensible test", "test"],
  ] as const;
  return <V2Frame active="/startup-guides">
    <JsonLd schema={[
      webPageSchema({ path: "/business-models-india", name: "Business models for an idea in India", description: "Compare who pays, how delivery works, when cash arrives and what could make the model fail." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Business models in India", path: "/business-models-india" }]),
    ]} />
    <div className="bg-slate-50 pt-24 lg:pt-28"><nav className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm text-slate-600`} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={15}/><a href="/startup-guides">Guides</a><ChevronRight size={15}/><span>Business models in India</span></nav></div>
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16"><div className={wrap}>
      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">The money path · India</span>
      <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">How does this <span className="text-blue-700">business idea</span> earn?</h1>
      <p className="mt-5 max-w-3xl text-lg text-slate-600">The same customer problem can become a service, a stocked product or a recurring offer. The model decides what you must deliver, when cash reaches you and which risk you carry first.</p>
      <div className="mt-7 flex flex-wrap gap-3"><a href="/browse" className={primary}>Browse ideas <ArrowRight size={17}/></a><a href="#compare-models" className="inline-flex min-h-11 items-center rounded-xl border bg-white px-6 py-3 font-semibold hover:border-blue-500">Compare models</a></div>
    </div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">A model is a set of obligations.</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{[
      ["Who pays?", "Identify the person who makes the decision and the account the payment leaves."],
      ["What do you owe them?", "Name the work, product, access or match you must keep delivering."],
      ["When is cash yours?", "Track supplier payments, collection, refunds and the next cycle."],
    ].map(([title, copy], index) => <article className={card} key={title}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section id="compare-models" className="scroll-mt-28 py-12 lg:py-16"><div className={wrap}>
      <h2 className="text-3xl font-bold">Compare the work behind the money.</h2><p className="mt-3 max-w-3xl text-slate-600">Pick two models. These are operating patterns, not rankings or a prediction that one will succeed in your market.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{[[first, setFirst, "First model"], [second, setSecond, "Second model"]].map(([value, update, label]) => <label className="font-semibold" key={label as string}>{label as string}<select className="mt-2 block min-h-11 w-full rounded-xl border bg-white px-3" value={value as string} onChange={event => (update as (value: ModelId) => void)(event.target.value as ModelId)}>{models.map(model => <option key={model.id} value={model.id}>{model.name}</option>)}</select></label>)}</div>
      <div className="mt-6 overflow-x-auto rounded-2xl border bg-white" aria-live="polite"><table className="w-full min-w-[600px] text-left"><thead className="bg-blue-50"><tr><th className="p-4">The question</th><th className="p-4">{left.name}</th><th className="p-4">{right.name}</th></tr></thead><tbody>{fields.map(([label, key]) => <tr className="border-t" key={key}><th className="p-4 align-top">{label}</th><td className="p-4 align-top">{left[key]}</td><td className="p-4 align-top">{right[key]}</td></tr>)}</tbody></table></div>
    </div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">What each model asks of a founder.</h2><p className="mt-3 max-w-3xl text-slate-600">Start with the delivery burden you can carry. A clever revenue label cannot remove stock, customer support or the hours required to serve someone well.</p><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{models.map(model => <article className={card} key={model.id}><h3 className="text-xl font-bold">{model.name}</h3><strong className="mt-3 block text-blue-700">{model.promise}</strong><p className="mt-3 text-slate-600">{model.pressure}</p></article>)}</div></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Follow the cash before you admire the margin.</h2><p className="mt-3 max-w-3xl text-slate-600">Depending on your model, stock may be purchased before a sale, an invoice may be paid later, or a returned order may reverse a collection. Local fulfilment and owner time can matter more than a neat margin percentage. Write down the actual order of payments in your case.</p><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
      ["Money out", "Supplier, labour, delivery, platform, rent, equipment."],
      ["Work done", "Finding the buyer, making or sourcing, serving, resolving a problem."],
      ["Money in", "Deposit, delivery payment, credit period, renewal or commission."],
      ["What can reverse it", "Refund, return, cancellation, failed collection or unplanned rework."],
    ].map(([title, copy]) => <article className={card} key={title}><h3 className="font-bold">{title}</h3><p className="mt-2 text-slate-600">{copy}</p></article>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Four questions for a real buyer.</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{[
      ["What did you do the last time this problem happened?", "Find the existing workaround."],
      ["Who approved and paid for that?", "Separate the user from the buyer."],
      ["What went wrong with the current option?", "Locate the reason to change."],
      ["Would you try this defined offer at this price and date?", "Watch for a concrete action, not a compliment."],
    ].map(([question, purpose], index) => <article className={card} key={question}><span className="text-sm font-bold text-blue-700">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">“{question}”</h3><p className="mt-3 text-slate-600">{purpose}</p></article>)}</div><a href="/startup-idea-validation" className="mt-6 inline-flex font-semibold text-blue-700 hover:underline">Use the validation field notebook <ArrowRight className="ml-2" size={17}/></a></div></section>
    <section className="py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Published ideas to inspect</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ideas.map(idea => <a className={card} href={`/idea/${idea.slug}`} key={idea.slug}><h3 className="text-xl font-bold">{idea.title}</h3><p className="mt-3 line-clamp-3 text-slate-600">{idea.hook || idea.summary}</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Read idea <ArrowRight size={17}/></span></a>)}</div></div></section>
    <section className="bg-slate-50 py-12 lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Related categories</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(category => <a className={card} href={`/category/${category.slug}`} key={category.slug}><h3 className="text-xl font-bold">{category.name}</h3><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">Explore category <ArrowRight size={17}/></span></a>)}</div></div></section>
    <SellerFaq title="Questions that change the choice" faq={[
      { q: "Can one business use more than one model?", a: "Yes. A service can add a product, or a product can include ongoing support. Test the first delivery and cash path before adding another operational promise." },
      { q: "Is a subscription always better than a one-time sale?", a: "No. A recurring payment needs recurring value, retention and support. Compare collection after cancellations and delivery costs, not just the appeal of a monthly price." },
      { q: "Does a marketplace need an app first?", a: "A narrow manual match can test whether both sides will participate. Software becomes useful when a real matching process repeats and the economics can support it." },
    ]} />
    <section className="bg-blue-700 py-12 text-white lg:py-16"><div className={wrap}><h2 className="text-3xl font-bold">Take the model into a real idea.</h2><p className="mt-3 max-w-3xl text-blue-100">Read a completed blueprint for the buyer, costs and first steps. Then test the part that could make you stop.</p><a href="/blueprints" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-800 hover:bg-blue-50">Search completed business ideas <ArrowRight size={17}/></a></div></section>
  </V2Frame>;
}
