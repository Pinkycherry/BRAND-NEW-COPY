import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, BookOpen, ChevronDown, FileText, Layers3, Menu, X } from "lucide-react";
import "./templates.css";

const items = [
  { id: "persona", group: "Discover & define", title: "Customer persona template", type: "Persona", brief: "Record the buyer, the decision maker, the buying occasion and the current workaround.", pages: "Persona worksheet", tone: "sand" },
  { id: "interview", group: "Discover & define", title: "Customer interview script", type: "Script", brief: "Ask about a recent purchase, what went wrong, the price paid and who decided.", pages: "Interview guide", tone: "blue" },
  { id: "competitive", group: "Position & validate", title: "Competitor analysis template", type: "Table", brief: "Compare local alternatives by price, delivery, trust and reach in one visible table.", pages: "Competitor grid", tone: "rose" },
  { id: "evidence", group: "Position & validate", title: "Validation evidence tracker", type: "Grid", brief: "Track interviews, observed demand, paid tests and unanswered questions.", pages: "Evidence grid", tone: "green" },
  { id: "plan", group: "Plan & pitch", title: "Business plan template", type: "Outline", brief: "Position & validate the buyer, offer, distribution, costs and first test in one outline.", pages: "Plan outline", tone: "lilac" },
  { id: "pitch", group: "Plan & pitch", title: "Pitch deck template", type: "Slides", brief: "Show the problem, evidence, market route, economics and the next ask.", pages: "Deck", tone: "gold" },
] as const;
type Item = (typeof items)[number];
const groups = [
  { name: "Discover & define", prompt: "Start with the buyer.", intro: "Define who buys and learn from what they have already paid for.", ids: ["persona", "interview"] },
  { name: "Position & validate", prompt: "Make the case visible.", intro: "Compare alternatives and keep a record of real signals.", ids: ["competitive", "evidence"] },
  { name: "Plan & pitch", prompt: "Put the plan in front of people.", intro: "Turn evidence into a plan or a concise presentation.", ids: ["plan", "pitch"] },
] as const;
const faqs = [
  ["Which template should I use first?", "Start with the customer persona if the buyer is still vague. Use an interview script when you can speak to people, then record what actually happened in the evidence tracker."],
  ["Can I preview the formats?", "Yes. Preview updates the specimen on this page. Downloadable versions are a later step."],
  ["Are downloads available?", "Not yet. The format previews are live, while download and account actions await their own implementation."],
  ["How do I choose between a plan and a deck?", "Use a plan to work through assumptions, costs and distribution. Use a deck to present the evidence and a specific next ask."],
];
export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [
    { title: "Business Plan, Pitch Deck & Validation Templates India | BusinessIdea.io" },
    { name: "description", content: "Explore customer persona, interview, competitive analysis, validation, business plan and pitch deck template previews for Indian founders." },
    { name: "robots", content: "noindex, nofollow, noarchive, noimageindex" },
  ] }),
  component: TemplatesPage,
});
function Specimen({ item, large = false }: { item: Item; large?: boolean }) {
  return <div className={`tm-specimen tm-specimen--${item.tone} ${large ? "tm-specimen--large" : ""}`} aria-label={`Preview of ${item.title}`}>
    <div className="tm-paper"><div className="tm-paper-head"><span className="tm-paper-mark"><BookOpen size={large ? 21 : 15} strokeWidth={1.8}/></span><span>{item.type.toUpperCase()}</span></div>
    <div className="tm-paper-title">{item.title}</div><div className="tm-paper-line tm-paper-line--strong"/><div className="tm-paper-line"/><div className="tm-paper-line tm-paper-line--short"/>
    <div className="tm-paper-columns"><span/><span/></div><div className="tm-paper-foot"><span>BUYER</span><span>EVIDENCE</span><span>NEXT</span></div></div>
  </div>;
}
function TemplatesPage() {
  const [selected, setSelected] = useState<Item>(items[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const preview = (item: Item) => { setSelected(item); setNotice(`${item.title} is shown in the specimen below.`); document.getElementById("specimen")?.scrollIntoView({ behavior: "smooth", block: "center" }); };
  return <div className="tm-page">
    <a href="#content" className="tm-skip">Skip to content</a>
    <header className="tm-header"><div className="tm-nav">
      <div className="tm-brand"><span className="tm-brand-icon">b<span>.</span></span><span>businessidea<span>.io</span></span></div>
      <nav className="tm-nav-desktop" aria-label="Page sections"><a href="#collection">Collection</a><a href="#choose">Choose a format</a><a href="#specimen">Preview</a><a href="#questions">Questions</a></nav>
      <span className="tm-stage-label">TEMPLATE LIBRARY</span>
      <button className="tm-menu-button" aria-label={menuOpen ? "Close page menu" : "Open page menu"} aria-expanded={menuOpen} type="button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>{menuOpen && <nav className="tm-mobile-menu" aria-label="Page sections">{[["Collection","#collection"],["Choose a format","#choose"],["Preview","#specimen"],["Questions","#questions"]].map(([name, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{name}<ArrowRight size={16}/></a>)}</nav>}</header>
    <main id="content">
      <section className="tm-hero tm-wrap">
        <div className="tm-hero-copy"><p className="tm-eyebrow"><span className="tm-pip"/> TEMPLATES FOR AN INDIAN STARTUP</p><h1>Give the idea a shape. <em>Then test what holds.</em></h1><p className="tm-lead">From the first buyer conversation to a business plan or pitch deck, choose a working format that makes the next decision visible. These previews show the structure before downloadable files are ready.</p><div className="tm-actions"><a href="#collection" className="tm-button tm-button-dark">See the collection <ArrowDown size={18}/></a><a href="#choose" className="tm-button tm-button-light">Help me choose <ArrowRight size={18}/></a></div></div>
        <div className="tm-hero-visual" aria-hidden="true"><div className="tm-hero-back"/><div className="tm-hero-middle"/><div className="tm-hero-front"><div className="tm-folio-top"><BookOpen size={26}/><span>READING SHEET</span></div><strong>Customer</strong><div className="tm-folio-rule"/><div className="tm-folio-rule short"/><div className="tm-folio-boxes"><span/><span/></div><div className="tm-folio-caption">A structure for your next decision</div></div><div className="tm-hero-stamp">SIX FORMATS<br/>ONE STARTUP</div></div>
      </section>
      <div className="tm-ribbon"><div className="tm-wrap"><span>Explore by decision</span><span>Persona worksheet</span><span>Script</span><span>Table</span><span>Grid</span><span>Outline</span><span>Slides</span></div></div>
      <section id="collection" className="tm-wrap tm-collection"><div className="tm-section-title"><p className="tm-eyebrow">THE COLLECTION</p><h2>Start with the decision in front of you.</h2><p>Move from a real buyer to evidence, then into a plan. Preview each format in the specimen panel.</p></div>
        {groups.map(group => <div className="tm-group" key={group.name}><div className="tm-group-intro"><span className="tm-group-tag">{group.name}</span><h3>{group.prompt}</h3><p>{group.intro}</p></div><div className="tm-card-grid">{group.ids.map(id => { const item = items.find(candidate => candidate.id === id)!; return <article className="tm-card" key={item.id}><Specimen item={item}/><div className="tm-card-content"><div className="tm-card-meta"><span>{item.type}</span><span><FileText size={14}/> {item.pages}</span></div><h4>{item.title}</h4><p>{item.brief}</p><button type="button" onClick={() => preview(item)}>Preview format <ArrowRight size={17}/></button></div></article>; })}</div></div>)}
      </section>
      <section id="choose" className="tm-choice"><div className="tm-wrap"><div className="tm-section-title"><p className="tm-eyebrow">A QUICK WAY TO CHOOSE</p><h2>What do you need to decide next?</h2><p>Pick the task on your desk. Each row opens the corresponding preview below.</p></div><div className="tm-choice-list">{items.map(item => <button type="button" key={item.id} onClick={() => preview(item)} className="tm-choice-row"><span className="tm-choice-type">{item.type}</span><strong>{item.title}</strong><span>{item.pages}</span><ArrowRight size={19}/></button>)}</div></div></section>
      <section id="specimen" className="tm-wrap tm-preview"><div className="tm-preview-copy"><p className="tm-eyebrow">OPEN SPECIMEN</p><h2>{selected.title}</h2><p>{selected.brief} This preview shows the structure. It does not save inputs or lead to an unfinished download.</p><div className="tm-preview-switch"><span>Switch specimen</span><div>{items.map(item => <button key={item.id} type="button" className={selected.id === item.id ? "is-selected" : ""} onClick={() => setSelected(item)} aria-label={`Show ${item.title}`} aria-pressed={selected.id === item.id}>{item.type}</button>)}</div></div><p className="tm-live" role="status">{notice}</p></div><Specimen item={selected} large/></section>
      <section className="tm-formats"><div className="tm-wrap"><div className="tm-formats-head"><div><p className="tm-eyebrow">BY FORMAT</p><h2>Go straight to a working format.</h2></div><Layers3 size={39} strokeWidth={1.3}/></div><div className="tm-format-grid">{(["Persona","Script","Table","Grid","Outline","Slides"] as const).map(type => { const item = items.find(x => x.type === type)!; return <button type="button" key={type} onClick={() => preview(item)}><span>{type}</span><ArrowRight size={20}/></button>; })}</div></div></section>
      <section id="questions" className="tm-wrap tm-faq"><div><p className="tm-eyebrow">COMMON QUESTIONS</p><h2>Before you open a template</h2><p>The page structure and previews are live. Downloadable files and saved work come later.</p></div><div className="tm-faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={19}/></summary><p>{a}</p></details>)}</div></section>
      <section className="tm-end tm-wrap"><div><p className="tm-eyebrow">KEEP THE WORK MOVING</p><h2>Choose a format. Inspect the work.</h2><p>Start with the buyer, then gather evidence before turning it into a plan or pitch.</p></div><button type="button" onClick={() => { setSelected(items[0]); document.getElementById("collection")?.scrollIntoView({behavior:"smooth"}); }} className="tm-button tm-button-light">Return to collection <ArrowRight size={18}/></button></section>
    </main><nav aria-label="Continue to other collections" className="tm-wrap" style={{display:"flex",flexWrap:"wrap",gap:16,paddingBottom:42}}><a href="/tools">Working tools</a><a href="/topics">Founder topics</a><a href="/lists">Business idea lists</a><a href="/product">Validation workbench</a></nav><footer className="tm-footer"><div className="tm-wrap"><span className="tm-footer-brand">businessidea.io</span><span>Template collection · Preview is not indexed</span><a href="#content">Back to top ↑</a></div></footer>
  </div>;
}
