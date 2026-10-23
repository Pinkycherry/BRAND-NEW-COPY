import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BookOpen, Calculator, ClipboardCheck, Compass } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/validation-field.css";

export const Route = createFileRoute("/startup-idea-validation")({
  head: () => ({ meta: [
    { title: "How to Validate a Startup Idea in India | BusinessIdea.io" },
    { name: "description", content: "A practical founder field guide: name a buyer, interview without leading, test an offer, check startup costs and decide what evidence you still need." },
    { property: "og:title", content: "How to Validate a Startup Idea in India | BusinessIdea.io" },
    { property: "og:description", content: "Before the business becomes a bill, get close to the buyer, the cash and the reasons it might fail." },
    { property: "og:type", content: "article" },
  ] }),
  component: ValidationFieldPage,
});

const interviewQuestions = [
  { prompt: "Tell me about the last time this happened.", reason: "A recent episode reveals the real workaround and its cost. Ask for a story, not a rating of your idea." },
  { prompt: "What did you do instead?", reason: "The alternative may be another business, a spreadsheet, a family member or simply living with the problem." },
  { prompt: "What did that cost you in time or money?", reason: "The answer helps you distinguish a frustrating inconvenience from something worth buying a solution for." },
  { prompt: "Who decides and who pays?", reason: "The user and buyer can be different people. A founder needs to know whose approval and cash are involved." },
] as const;

type Choice = "wait" | "change" | "test";
const decisionCopy: Record<Choice, { title: string; body: string; next: string }> = {
  wait: { title: "Pause before spending.", body: "You have a theory, but too little buyer evidence. Keep your fixed costs at zero while you look for a recent, repeated problem and a person who has already tried to solve it.", next: "Your next action: ask for two concrete stories of the last time the problem occurred." },
  change: { title: "Change one part of the offer.", body: "The problem may be real while your buyer, delivery method or price is wrong. Change one assumption at a time so you can tell which change mattered.", next: "Your next action: rewrite the offer in one sentence and test it with a different buyer or channel." },
  test: { title: "Run a small, reversible test.", body: "A positive conversation is still not a sale. Offer a specific outcome at a stated price with a clear delivery window. Record what people actually commit to.", next: "Your next action: choose a limited pilot you can deliver without long rent, inventory or debt." },
};

function ValidationFieldPage() {
  const [buyer, setBuyer] = useState("");
  const [problem, setProblem] = useState("");
  const [workaround, setWorkaround] = useState("");
  const [offer, setOffer] = useState("");
  const [choice, setChoice] = useState<Choice>("wait");
  const completed = [buyer, problem, workaround, offer].filter((value) => value.trim().length > 0).length;

  return <>
    <JsonLd schema={[
      webPageSchema({ path: "/startup-idea-validation", name: "How to validate a startup idea in India", description: "A practical field guide for a buyer conversation, a reversible offer and a founder's decision." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Startup idea validation", path: "/startup-idea-validation" }]),
    ]} />
    <GlassShell><div className="vf-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Startup idea validation</span></nav>
      <header className="vf-hero">
        <div><p className="gh-eyebrow">FOUNDER FIELD GUIDE · INDIA</p><h1>Validate a startup idea <em>before it costs you.</em></h1><p>A friend saying “nice idea” is not a buyer. Work through the evidence you can collect while the decision is still small.</p><div className="vf-actions"><a href="#field-notebook" className="gh-button gh-button-primary">Open the field notebook <ArrowRight size={17} /></a><Link to="/startup-guides/$slug" params={{ slug: "business-idea-validation-framework" }} className="gh-button gh-button-secondary">Read the full guide</Link></div></div>
        <aside className="vf-hero-note" aria-label="Three questions before you launch"><span>BEFORE THE LOGO</span><ol><li><strong>Who is the buyer?</strong><small>Name a person, not an entire market.</small></li><li><strong>What happens now?</strong><small>Find the last real workaround.</small></li><li><strong>What will they commit?</strong><small>Ask for action at a stated price.</small></li></ol></aside>
      </header>

      <section className="vf-lead" aria-labelledby="vf-lead-title"><div><p className="gh-eyebrow">01 / THE CLAIM</p><h2 id="vf-lead-title">Write a sentence someone can prove wrong.</h2></div><div><p>“Everyone needs a better lunch” is too broad to test. “Office workers on this street who miss the canteen window will order a lunch delivered before their break” names a buyer, a situation and a behavior to check. The example is illustrative; it is not evidence about demand.</p><p>In your own idea, separate what you know from what you hope. A buyer's last purchase, failed workaround or refusal tells you more than a compliment.</p></div></section>

      <section className="vf-interviews" aria-labelledby="vf-interviews-title"><div className="vf-section-head"><p className="gh-eyebrow">02 / BUYER CONVERSATIONS</p><h2 id="vf-interviews-title">Ask about yesterday. Leave your pitch for later.</h2><p>Start with people who encountered the problem recently. Let them describe it before showing them your answer. Record their words and the specific event; do not turn politeness into a demand forecast.</p></div><div className="vf-interview-list">{interviewQuestions.map((item, index) => <article key={item.prompt}><span>0{index + 1}</span><div><h3>{item.prompt}</h3><p>{item.reason}</p></div></article>)}</div><aside className="vf-callout"><strong>What counts as a signal?</strong><p>A buyer names a recent problem, describes what they did, and agrees to a concrete next step. A “maybe someday” is a reason to keep learning.</p><Link to="/business-idea-research-india">Record the source and countercase in the research desk <ArrowUpRight size={17}/></Link></aside></section>

      <section className="vf-evidence" aria-labelledby="vf-evidence-title"><div><p className="gh-eyebrow">03 / THE EVIDENCE LADDER</p><h2 id="vf-evidence-title">Move from words to behavior.</h2><p>No rung guarantees a viable business. Each one asks a more expensive question of reality while keeping your own experiment reversible.</p></div><ol><li><span>01</span><div><strong>Problem story</strong><p>Someone can describe a recent inconvenience without prompting.</p></div></li><li><span>02</span><div><strong>Existing workaround</strong><p>They already spend time, money or effort getting around it.</p></div></li><li><span>03</span><div><strong>Specific offer</strong><p>They react to a clear outcome, delivery date and stated price.</p></div></li><li><span>04</span><div><strong>Real commitment</strong><p>They take an appropriate next action: a paid trial, a scheduled pilot or a documented purchasing step.</p></div></li></ol></section>

      <section id="field-notebook" className="vf-notebook" aria-labelledby="vf-notebook-title"><div className="vf-section-head"><p className="gh-eyebrow">04 / YOUR FIELD NOTEBOOK</p><h2 id="vf-notebook-title">Put the assumption on the page.</h2><p>These notes stay in this open tab only. They are not saved to an account or sent to BBI. Copy them elsewhere before you leave.</p></div><div className="vf-notebook-grid"><label><span>Who has the problem?</span><textarea value={buyer} onChange={(event) => setBuyer(event.target.value)} placeholder="A specific buyer in a specific situation" rows={3} /></label><label><span>What happened the last time?</span><textarea value={problem} onChange={(event) => setProblem(event.target.value)} placeholder="The event, frequency and consequence" rows={3} /></label><label><span>What do they do now?</span><textarea value={workaround} onChange={(event) => setWorkaround(event.target.value)} placeholder="The current alternative, time or money spent" rows={3} /></label><label><span>What small offer will you test?</span><textarea value={offer} onChange={(event) => setOffer(event.target.value)} placeholder="Outcome, stated price and delivery window" rows={3} /></label></div><div className="vf-notebook-foot"><ClipboardCheck size={20} /><span>{completed} of 4 assumptions written. Empty boxes are useful: they show what you still need to learn.</span></div></section>

      <section className="vf-cash" aria-labelledby="vf-cash-title"><div><p className="gh-eyebrow">05 / THE RUPEE QUESTION</p><h2 id="vf-cash-title">A sale can still lose cash.</h2><p>Write down what you pay before the buyer pays you. Include stock, travel, packaging, delivery, refunds, platform fees and your own time where they apply. A margin on paper does not pay a bill due before collection.</p><Link to="/startup-costs-india" className="gh-button gh-button-secondary">Map cash before your first sale <Calculator size={17} /></Link></div><div className="vf-cash-ledger"><strong>One order, in your own numbers</strong><div><span>Price the buyer actually pays</span><b>₹ ______</b></div><div><span>Direct cost to deliver it</span><b>− ₹ ______</b></div><div><span>Fees, returns and collection delay</span><b>− ₹ ______</b></div><div className="vf-cash-result"><span>Cash left before fixed costs</span><b>= ₹ ______</b></div><small>This is a worksheet, not an estimate or market benchmark. Use the live calculator for arithmetic.</small></div></section>

      <section className="vf-models" aria-labelledby="vf-models-title"><div><p className="gh-eyebrow">06 / RESEARCH WITH A SCEPTIC</p><h2 id="vf-models-title">Ask a model to find what you missed.</h2><p>A completed BBI blueprint has a Validate button that prepares a structured research prompt for Claude, Perplexity, ChatGPT or Grok. Choose the provider there. Its own account and usage rules apply. No automatic BBI score or report is created.</p><p>Ask for the strongest reason your buyer might stay with the current workaround, and request links for any market figure. Open those sources yourself. Then take the questions back to a buyer.</p><Link to="/blueprints">Choose a completed business idea to validate <ArrowUpRight size={17} /></Link></div><div className="vf-models-questions"><span>Three checks for an AI answer</span><ol><li>Can I open the cited source?</li><li>Does it describe my buyer and place?</li><li>What finding would reverse the conclusion?</li></ol></div></section>

      <section className="vf-decision" aria-labelledby="vf-decision-title"><div className="vf-section-head"><p className="gh-eyebrow">07 / THE NEXT DECISION</p><h2 id="vf-decision-title">Choose what the evidence allows.</h2><p>You are making a decision about the next experiment, not receiving a prediction about your future company.</p></div><div className="vf-decision-tabs" role="group" aria-label="Choose a next decision">{(["wait","change","test"] as const).map((item) => <button key={item} type="button" aria-pressed={choice === item} onClick={() => setChoice(item)}>{item === "wait" ? "I need more evidence" : item === "change" ? "The offer needs to change" : "I can run a small test"}</button>)}</div><article className="vf-decision-result" aria-live="polite"><h3>{decisionCopy[choice].title}</h3><p>{decisionCopy[choice].body}</p><strong>{decisionCopy[choice].next}</strong></article></section>

      <section className="vf-faq" aria-labelledby="vf-faq-title"><div><p className="gh-eyebrow">QUESTIONS BEFORE A BIGGER COMMITMENT</p><h2 id="vf-faq-title">Keep the questions honest.</h2></div><div><details><summary>How many interviews are enough?</summary><p>There is no universal count. Look for repeated, specific stories from the buyer you intend to serve, and notice contradictory answers. A handful of polite conversations is not proof of a market.</p></details><details><summary>Should I register a company before testing?</summary><p>That depends on your activity and applicable requirements. This field guide focuses on learning about the problem and offer before avoidable spending. Get qualified local advice for legal and tax steps.</p></details><details><summary>Can an AI model validate my startup idea for me?</summary><p>It can help surface assumptions and research questions. It cannot observe your buyer's actual decision or guarantee demand. Verify source claims and run a real, appropriate test.</p></details></div></section>
      <footer className="vf-final"><p className="gh-eyebrow">THE NEXT USEFUL STEP</p><h2>Find one buyer story. Then decide what to test.</h2><div><Link to="/first-customer-india" className="gh-button gh-button-primary">Map one first customer <Compass size={17} /></Link><Link to="/startup-guides/$slug" params={{ slug: "business-idea-validation-framework" }} className="gh-button gh-button-secondary">Use the detailed guide <BookOpen size={17} /></Link></div></footer>
    </div></GlassShell>
  </>;
}
