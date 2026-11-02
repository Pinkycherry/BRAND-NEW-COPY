import { useState } from "react";
import { ArrowRight, ChevronRight, Check, X } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { templateImages } from "@/config/template-imagery";
import type { ListPage } from "@/lib/lists.functions";
import "@/components/v2/customer-persona-page.css";

const ideaUrl = (slug: string) => `/idea/${encodeURIComponent(slug)}`;
const listUrl = (slug: string) => `/lists/${encodeURIComponent(slug)}`;
type Example = { list: ListPage; idea: ListPage["ideas"][number] };
const images = [templateImages.interview, templateImages.canvas, templateImages.planning];
const brief = (value: string | null | undefined, max = 210) => {
  const text = (value ?? "").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "").trimEnd()}…`;
};

/** Editorial research lenses, selected from the published business model rather than a slug. */
function buyerLens(idea: Example["idea"]) {
  const model = `${idea.title} ${idea.summary ?? ""} ${idea.how_money_comes ?? ""}`.toLowerCase();
  if (/affiliate|review website|referral commission|publisher/.test(model)) return {
    distinction: "The reader and the organisation paying a referral fee are different parties. Research both decisions separately.",
    occasion: "Tell me about the last phone or product you compared online. Which sources did you open, and what did you buy?",
    alternatives: "Which review, shopkeeper, friend or marketplace listing did you trust most? What made that source credible?",
    payment: "Trace the reader's purchase separately from any affiliate payment. A page visit is not a sale.",
    counterevidence: "If readers use the comparison but never change their buying decision, test whether the content solves a real decision problem.",
    decisions: [
      ["Readers repeatedly describe confusion about the same comparison", "Build one comparison around that decision and test whether they use it before buying."],
      ["Readers trust a shopkeeper or marketplace review more than your page", "Investigate the missing trust proof before producing more articles."],
      ["A reader clicks but no qualifying sale follows", "Treat traffic and affiliate revenue as different tests; do not call the visit a paying customer."],
    ],
  };
  if (/sev|namkeen|snack|packaged food/.test(model)) return {
    distinction: "A neighbour who accepts a sample is not necessarily a repeat customer. Watch the next paid choice.",
    occasion: "Think of the last time you bought a snack for home or guests. Where did you buy it and why there?",
    alternatives: "Did you choose loose namkeen, a packaged brand or something homemade? What would make you switch?",
    payment: "Ask who chooses the snack, who pays, and whether the same household bought it again without a personal request.",
    counterevidence: "Compliments from relatives are encouraging, but a paid reorder is a clearer sign than a courtesy purchase.",
    decisions: [
      ["A household buys a sample and orders again without prompting", "Investigate the flavour, pack size and purchase occasion behind that repeat choice."],
      ["People compliment a free sample but do not buy", "Do not write a loyal-customer persona; test a small paid offer first."],
      ["The household buys loose sev elsewhere for a different reason", "Compare freshness, trust and convenience before changing the recipe or price."],
    ],
  };
  if (/dabba|tiffin|lunch|meal subscription/.test(model)) return {
    distinction: "The person eating lunch, the office arranging meals and the person paying may be different buyers.",
    occasion: "Walk me through the last working day you needed lunch. What did you eat, who arranged it and when did you decide?",
    alternatives: "What made you choose the canteen, delivery app, home food or a nearby stall that day?",
    payment: "If the offer is monthly, ask what would justify advance payment and what would make someone cancel after delivery problems.",
    counterevidence: "A first order shows curiosity; a renewal after ordinary working days says more about fit and reliability.",
    decisions: [
      ["Workers already prepay another lunch provider", "Find out what would make them switch and what delivery reliability they expect before promising a monthly plan."],
      ["Workers only need lunch on occasional office days", "Test a paid single-day order before treating them as monthly subscribers."],
      ["An office administrator chooses and pays for staff meals", "Interview that administrator separately; the eater's preferences alone will not explain the contract."],
    ],
  };
  return {
    distinction: "Separate the person using the offer, the person choosing it and the person paying. Ask where those roles overlap.",
    occasion: "Tell me about the last time you needed this kind of solution. What happened just before you looked?",
    alternatives: "What did you use instead, including doing it yourself or postponing the purchase?",
    payment: "Who approved the cost, how did they pay, and what proof did they need before choosing?",
    counterevidence: "Interest alone is not a buying decision. Compare what people say with their last purchase or workaround.",
    decisions: [
      ["A person recently paid for the current alternative", "Find the switching trigger and the proof they would need from a new provider."],
      ["A person only says they might buy someday", "Keep demand unverified and seek someone with a recent buying occasion."],
      ["A different person approves the purchase", "Research that decision maker before changing price or messaging."],
    ],
  };
}

const interviewQuestions = [
  "Tell me about the last time this problem happened. Where were you and what set it off?",
  "What did you try first? What else did you consider, including doing nothing?",
  "Who suggested the option you chose? Who made the decision and who paid?",
  "What were you worried might go wrong? What proof or recommendation helped?",
  "On that occasion, what did it cost you in money, travel, waiting or effort?",
  "What happened after you used it? Did you repeat, switch or stop? Why?",
];

const steps = [
  { title: "Locate the actual buyer", body: "Start with a published idea and name the person who decides, the person who pays, and the person who uses the offer. A shop owner, parent and student may be three different people in the same sale." },
  { title: "Map the occasion and friction", body: "Ask what happened immediately before the search, what they tried locally, and where the current option falls short. Capture the buyer's words; do not substitute a founder's pitch." },
  { title: "Check the decision in the field", body: "Ask about the most recent purchase, who was consulted and what made the provider credible. Revise the profile when real conversations disagree with the idea page." },
];
const research = [
  { title: "Find people with a recent decision", body: "For a neighbourhood offer, speak to buyers near the actual service area, including people who chose a rival. For an online offer, find people who recently compared options. Friends who have never faced the problem can test your wording, not your demand." },
  { title: "Screen for the last occasion", body: "Open with 'When did this last happen?' and 'What did you do?' A person describing only what they might do someday belongs in the assumptions column. Include someone who declined or cancelled, because their objection is often more useful than praise." },
  { title: "Follow the purchase, not your pitch", body: "Begin with the event, then the existing alternative, the decision maker, the payer and the result. Do not show a mockup or ask 'Would you buy this?' before hearing the story; that turns the conversation into feedback on your idea." },
  { title: "Compare actions and words", body: "After each conversation, separate an exact quote, an action the person took and your interpretation. Compare the same decision across different people. Repeated reasons to buy, renew, delay or refuse matter more than a demographic label." },
  { title: "Write a testable buyer statement", body: "State the occasion, current alternative, payer, reason to switch and remaining objection in plain language. Mark anything not observed. Change one thing in the offer, channel or trust proof, then check whether the next buyer behaves differently." },
];
const tips = [
  { title: "Ask about an actual day", body: "For an evening tuition batch, ask how the family handled last week's homework problem, who found the tutor, and who approved the fee. 'Parents aged 35–45' cannot answer those questions." },
  { title: "Preserve their words", body: "If a buyer describes a service in Hindi, Telugu or another language, keep the phrase and its meaning. Test whether a WhatsApp message using that language earns a response before turning it into an advertising claim." },
  { title: "Name the non-buyer", body: "A customer who needs same-day delivery outside your route is not a fit for a fixed-time dabba service. A clear exclusion can save you from promising something operations cannot deliver." },
  { title: "Rank the evidence", body: "An idea page is a hypothesis. An interview recalls a decision. A receipt, paid order, cancellation or repeat purchase shows behaviour. None of these alone proves an entire market; each changes what you test next." },
];
const faq = [
  { q: "What is a customer persona?", a: "A working description of a particular buyer's situation, goal, buying decision and objections. It becomes useful when those details come from real conversations and observed behaviour." },
  { q: "How is it different from an ideal customer profile?", a: "An ideal customer profile describes an organisation or customer segment that fits your offer. A persona focuses on the human making or influencing the decision. For a local business, the payer and the user may be different people." },
  { q: "How is it different from a job to be done?", a: "The job describes the progress someone seeks in a situation. The persona adds who faces that situation, how they decide, where they look and what they need to trust you." },
  { q: "How many personas should I make?", a: "Start with the person you can reach and serve first. Separate a second profile only when the trigger, payer or decision process differs. A parent buying tuition and a school buying a batch may need different profiles even if the student uses both." },
  { q: "Do I need a fixed number of interviews?", a: "No fixed count makes a profile true. Keep talking while new conversations change who pays, the alternative used or the main objection. When those decisions stop changing, test a real offer and watch paid behaviour instead of collecting more agreeable opinions." },
  { q: "Can AI write my persona?", a: "It can help organise questions or summarise notes you supply. It cannot verify that a specific person in your market has a problem or will pay for your offer." },
  { q: "When should I update it?", a: "Update it when a buyer's actual decision contradicts it, when you change the offer or channel, or when a different person starts paying." },
  { q: "What if I have no customers yet?", a: "Start from a published idea, but label its proposed buyer as an assumption. Speak to people who recently used a competing option or handled the problem themselves. Ask about what they did, not what they promise to do for your future business." },
  { q: "Can I use WhatsApp or an online survey instead of interviews?", a: "Use a short message to recruit people who recently faced the problem. A survey may reveal patterns after you know the right questions, but a yes/no 'would you buy?' response cannot explain the last decision. A brief call or in-person conversation gives you the sequence, objections and exact language." },
  { q: "What belongs in the finished profile?", a: "Write the buying occasion, current alternative, user/decision maker/payer, outcome sought, evidence needed to trust a new provider, last observed action and the main unresolved assumption. Leave out fictional names, stock-photo biographies and income guesses that cannot change your decision." },
];

export function CustomerPersonaPage({ examples }: { examples: Example[] }) {
  const [tab, setTab] = useState(0);
  const chosen = examples[tab] ?? examples[0];
  const chosenLens = chosen ? buyerLens(chosen.idea) : null;
  return <V2Frame active="/templates"><main className="tm-page cp-page">
    <div className="cp-wrap"><nav className="cp-crumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={14}/><a href="/templates">Templates</a><ChevronRight size={14}/><span>Customer persona</span></nav></div>
    {/* 1 · Seller hero: narrative, image, two destinations. */}
    <section className="cp-hero cp-wrap"><div><p className="cp-kicker">Customer persona · Buyer research</p><h1>Know the person behind the purchase.</h1><p className="cp-lead">An Indian founder can spot an idea anywhere. Knowing who will actually choose it, pay for it and trust it takes a real conversation. Use this guide to turn an idea into a buyer question worth testing.</p><div className="cp-actions"><a className="cp-primary" href="#research">Follow the research playbook <ArrowRight size={18}/></a><a className="cp-secondary" href="/templates/customer-interview">Read the interview script <ArrowRight size={18}/></a></div></div><figure><img src={templateImages.interview.src} alt="Indian founder discussing a customer's buying decision, BusinessIdea.io customer persona guide" width={1600} height={900} fetchPriority="high"/><figcaption>Start with the buyer's last decision, then test your assumptions.</figcaption></figure></section>
    {/* 2 · Seller's short definition strip. */}
    <section className="cp-strip"><div className="cp-wrap"><strong>The useful distinction</strong><p><b>Customer segment</b> tells you who might buy. <b>Customer persona</b> explains one person's decision. <b>Interview evidence</b> tells you whether your explanation holds up.</p></div></section>
    {/* 3 · Published BBI situations in place of unverified seller statistics. */}
    <section className="cp-section cp-evidence"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">Start with published ideas</p><h2>One idea is not one buyer.</h2><p>A source idea can suggest a market. It cannot tell you who actually decided, paid or returned. Compare these distinct buying situations before writing a profile.</p></div><div className="cp-evidence-grid">{examples.map(({list,idea},i)=>{const lens=buyerLens(idea);return <a href={ideaUrl(idea.slug)} key={idea.slug} className="cp-evidence-item"><span>0{i+1} / {list.categoryName}</span><h3>{idea.title}</h3><p>{brief(idea.summary || idea.hook,180)}</p><p><b>Buyer boundary:</b> {lens.distinction}</p><strong>Investigate the published idea <ArrowRight size={16}/></strong></a>})}</div></div></section>
    {/* 4 · Three steps in the purchased composition. */}
    <section id="how-it-works" className="cp-section cp-steps"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">How it works</p><h2>From a business idea to a buyer you can meet.</h2><p>Move from an initial description to a decision story grounded in the real market.</p></div><div className="cp-step-grid">{steps.map((s,i)=><article key={s.title}><span className="cp-step-number">0{i+1}</span><h3>{s.title}</h3><p>{s.body}</p></article>)}</div></div></section>
    {/* 5 · Editorial overview, seller order. */}
    <section id="overview" className="cp-section cp-overview"><div className="cp-wrap cp-split"><div><p className="cp-kicker">What it is</p><h2>A persona is a decision story, not a fictional biography.</h2></div><div className="cp-prose"><p>“Urban, 25 to 35, uses Instagram” does not tell you why someone buys. A useful profile explains the event that created the need, the alternatives they considered, who controlled the money, and the proof they needed before choosing.</p><p>For a local food business, a customer may discover you through a neighbour, check hygiene with a family member, compare delivery timings, then pay by UPI. For an online service, the decision may involve an employer, an existing vendor and a trial. The right questions change with the offer.</p><p>Keep the first version small. A published <a href="/lists">business idea list</a> helps you find a starting market; an <a href="/templates/customer-interview">interview</a> tests the details you cannot infer from a page.</p></div></div></section>
    {/* 6 · The purchased builder slot becomes an evidence-led, read-only comparison. */}
    <section id="template" className="cp-section cp-workbench"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">The persona framework</p><h2>Turn a published claim into a question you can test.</h2><p>Select a business. Read its proposed buyer and offer alongside the questions that would verify or challenge them. These are source claims and research prompts, not invented interviews.</p></div>{chosen && chosenLens && <div className="cp-builder"><div className="cp-tabs" role="tablist" aria-label="Published idea contexts">{examples.map((e,i)=><button key={e.idea.slug} role="tab" type="button" aria-selected={tab===i} onClick={()=>setTab(i)}>{e.list.name}</button>)}</div><div className="cp-builder-body" role="tabpanel"><div className="cp-builder-title"><span>Published idea · research starting point</span><h3>{chosen.idea.title}</h3><a href={ideaUrl(chosen.idea.slug)}>Read the complete idea <ArrowRight size={17}/></a></div><div className="cp-question-grid"><div><small>Buyer claim in the idea</small><p>{brief(chosen.idea.who_pays_you || chosen.idea.summary,300)}</p><strong>Check who actually uses, decides and pays. {chosenLens.distinction}</strong></div><div><small>Offer described in the idea</small><p>{brief(chosen.idea.summary || chosen.idea.hook,300)}</p><strong>Ask: {chosenLens.occasion}</strong></div><div><small>Risk described in the idea</small><p>{brief(chosen.idea.what_hurts || chosen.idea.what_you_need,300)}</p><strong>Compare: {chosenLens.alternatives}</strong></div></div><div className="cp-evidence-rule"><b>What would change this draft?</b><p>{chosenLens.payment} {chosenLens.counterevidence}</p><small>Write a buyer statement only after you have a real account of the last decision. Keep this source description labelled as an assumption until then.</small></div><div className="cp-builder-links"><a href={listUrl(chosen.list.slug)}>See related business ideas <ArrowRight size={16}/></a><a href={chosen.list.categorySlug ? `/category/${encodeURIComponent(chosen.list.categorySlug)}` : "/lists"}>Explore {chosen.list.categoryName} <ArrowRight size={16}/></a></div></div></div>}</div></section>
    {/* 7 · The source's three image examples become three worked decision lenses. */}
    <section id="examples" className="cp-section cp-examples"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">Worked Indian buyer examples</p><h2>Investigate the last choice, not an invented character.</h2><p>Each example starts with a real published BBI idea. The questions and warning are a research plan. They are not quotes from interviewed customers.</p></div><div className="cp-example-grid">{examples.map(({list,idea},i)=>{const lens=buyerLens(idea);return <article key={idea.slug}><a href={ideaUrl(idea.slug)} className="cp-example-image"><img src={images[i]?.src || templateImages.interview.src} alt={`${idea.title} buyer research in India, BusinessIdea.io`} width={1600} height={900} loading="lazy"/></a><div className="cp-example-copy"><span>{list.categoryName}</span><h3><a href={ideaUrl(idea.slug)}>{idea.title}</a></h3><dl><dt>Find the buying moment</dt><dd>{lens.occasion}</dd><dt>Compare the alternative</dt><dd>{lens.alternatives}</dd><dt>Follow the money</dt><dd>{lens.payment}</dd><dt>Do not mistake this for proof</dt><dd>{lens.counterevidence}</dd></dl><a href={ideaUrl(idea.slug)}>Read the source idea <ArrowRight size={16}/></a></div></article>})}</div></div></section>
    {/* 8 · Five-step field workflow with a neutral script and decision memo. */}
    <section id="research" className="cp-section cp-research"><div className="cp-wrap cp-split"><div className="cp-sticky"><p className="cp-kicker">Research playbook</p><h2>Leave the conversation with a decision, not a fictional biography.</h2><p>Use a recent buying event. Ask the same neutral core questions across interviews, then compare what people actually did.</p><a className="cp-inline" href="/templates/customer-interview">Read the full interview guide <ArrowRight size={17}/></a></div><div><ol className="cp-research-steps">{research.map((s,i)=><li key={s.title}><span>0{i+1}</span><div><h3>{s.title}</h3><p>{s.body}</p>{i===2 && <div className="cp-script"><h4>Questions you can ask, in this order</h4><ol>{interviewQuestions.map(q=><li key={q}>{q}</li>)}</ol><p>Follow up with “What happened next?” Avoid explaining your proposed solution until the story is complete.</p></div>}{i===3 && <div className="cp-script"><h4>Keep these apart</h4><p><b>Observed:</b> the last action or transaction. <b>Quoted:</b> the buyer's actual words. <b>Assumed:</b> your explanation of why it happened. A compliment belongs in the quote column, not the sale column.</p></div>}{i===4 && <a href="/templates/lean-canvas">Carry the revised buyer into a lean canvas <ArrowRight size={16}/></a>}</div></li>)}</ol>{chosen && chosenLens && <aside className="cp-decision-example"><p className="cp-kicker">Worked decision memo · {chosen.idea.title}</p><h3>What you know, what you still need, what you would change</h3><p><b>Source hypothesis:</b> {brief(chosen.idea.who_pays_you || chosen.idea.summary,230)}</p><p><b>Missing evidence:</b> {chosenLens.occasion} {chosenLens.alternatives}</p><p><b>Decision rule:</b> {chosenLens.counterevidence} The next action depends on what a buyer actually did.</p><ul className="cp-decision-branches">{chosenLens.decisions.map(([signal,action])=><li key={signal}><span>If the interview or purchase shows…</span><strong>{signal}</strong><span>Then test…</span><p>{action}</p></li>)}</ul><a href={ideaUrl(chosen.idea.slug)}>Open the underlying idea <ArrowRight size={16}/></a></aside>}</div></div></section>
    {/* 9 · Do / avoid in source order. */}
    <section className="cp-section cp-practice"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">Best practices</p><h2>Make the profile useful. Keep the uncertainty visible.</h2></div><div className="cp-practice-grid"><div><h3><Check size={21}/> Do this</h3><ul><li>Choose a real buying occasion, not a demographic stereotype.</li><li>Separate the payer, user and influencer when they differ.</li><li>Record the exact words and recent actions of buyers.</li><li>Compare people who bought with people who walked away.</li><li>Update your assumptions after each contradictory conversation.</li></ul></div><div><h3><X size={21}/> Avoid this</h3><ul><li>Invent a name, salary or quote and call it customer research.</li><li>Ask whether someone likes your imagined product.</li><li>Assume an online audience buys through one channel.</li><li>Turn a published idea description into a “verified” buyer.</li><li>Collect details that never change a product or channel decision.</li></ul></div></div></div></section>
    {/* 10 · Four operator tips. */}
    <section className="cp-section cp-tips"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">Field notes</p><h2>What changes the quality of the research.</h2></div><div className="cp-tip-grid">{tips.map((t,i)=><article key={t.title}><span>0{i+1}</span><h3>{t.title}</h3><p>{t.body}</p></article>)}</div></div></section>
    {/* 11 · Same FAQ interaction used across site. */}
    <div className="cp-faq"><SellerFaq faq={faq} title="Frequently asked questions" id="faq"/></div>
    {/* 12 · Related template family. */}
    <section className="cp-section cp-next"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">Related templates</p><h2>Follow the question to the next framework.</h2></div><div className="cp-next-grid"><a href="/templates/customer-interview"><span>Hear the evidence</span><h3>Customer interview script</h3><p>Ask about the last real decision without selling your solution.</p><ArrowRight/></a><a href="/templates/lean-canvas"><span>Map the offer</span><h3>Lean canvas</h3><p>Connect the buyer's problem to channels, costs and revenue.</p><ArrowRight/></a><a href="/templates/one-page-business-plan"><span>Explain the direction</span><h3>One-page business plan</h3><p>Turn a tested buyer problem into a concise operating plan.</p><ArrowRight/></a></div></div></section>
    {/* 13 · Validation CTA. */}
    <section className="cp-cta"><div className="cp-wrap"><div><p className="cp-kicker">Validate the persona is real</p><h2>The next conversation matters more than a polished profile.</h2><p>Take one untested buyer assumption into an interview, then use the response to decide what to test next.</p></div><a className="cp-primary" href="/startup-idea-validation">Explore idea validation <ArrowRight size={19}/></a></div></section>
    {/* 14 · Resource directory, tied to the framework. */}
    <section className="cp-section cp-resources"><div className="cp-wrap"><div className="cp-intro"><p className="cp-kicker">Related resources</p><h2>Move from buyer research to a business decision.</h2></div><div className="cp-resource-grid"><div><h3>Guides</h3><a href="/startup-guides/competitor-analysis-framework">Compare the alternatives buyers already use <ArrowRight size={16}/></a><a href="/startup-guides/business-idea-validation-framework">Test the demand behind the idea <ArrowRight size={16}/></a></div><div><h3>Explore markets</h3>{examples.map(e=><a key={e.list.slug} href={listUrl(e.list.slug)}>{e.list.name} <ArrowRight size={16}/></a>)}</div><div><h3>Work the numbers</h3><a href="/calculator/startup-cost">Estimate the cost of serving a buyer <ArrowRight size={16}/></a><a href="/calculator/break-even">Check the sales needed to break even <ArrowRight size={16}/></a><a href="/calculator">Explore calculators <ArrowRight size={16}/></a></div></div></div></section>
  </main></V2Frame>;
}
