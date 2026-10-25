import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, FileText, Layers3, Menu, X } from "lucide-react";
import "./templates.css";

const items = [
  { id: "genesis", group: "Begin", title: "Genesis reading sheet", type: "Worksheet", brief: "A place for a title, a passage reference and room for notes.", pages: "Reading sheet", tone: "sand" },
  { id: "psalms", group: "Begin", title: "Psalms reflection page", type: "Journal", brief: "A quiet page with a prompt, ruled space and a closing thought.", pages: "Reflection page", tone: "blue" },
  { id: "proverbs", group: "Arrange", title: "Proverbs comparison table", type: "Table", brief: "Two columns, clear labels and space to record a comparison.", pages: "Comparison table", tone: "rose" },
  { id: "gospels", group: "Arrange", title: "Gospels study grid", type: "Grid", brief: "A structured grid for passages, observations and notes.", pages: "Study grid", tone: "green" },
  { id: "acts", group: "Present", title: "Acts chapter outline", type: "Outline", brief: "A sequence of editable sections for a longer document.", pages: "Chapter outline", tone: "lilac" },
  { id: "letters", group: "Present", title: "Letters presentation", type: "Slides", brief: "A title frame, section frames and a final recap frame.", pages: "Presentation", tone: "gold" },
] as const;
type Item = (typeof items)[number];
const groups = [
  { name: "Begin", prompt: "Start with a blank page.", intro: "Two compact entry formats with room to think and write.", ids: ["genesis", "psalms"] },
  { name: "Arrange", prompt: "Give the material shape.", intro: "Side-by-side and grid structures for sorting notes.", ids: ["proverbs", "gospels"] },
  { name: "Present", prompt: "Bring the pieces together.", intro: "A longer outline and a simple presentation sequence.", ids: ["acts", "letters"] },
] as const;
const faqs = [
  ["What is on this page?", "A visual framework with six temporary Bible themed template specimens. The final subject matter and actions will be set after the layout review."],
  ["Can I open a template?", "Select Preview on any card. It updates the specimen on this page without navigating to a destination that has not been built."],
  ["Are these downloads?", "No. Download and account actions have not been connected in this layout stage."],
  ["Why are the labels temporary?", "They make the hierarchy, cards, table and responsive behavior reviewable while the final page copy is still pending."],
];
export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [
    { title: "Templates — Layout Preview | BusinessIdea.io" },
    { name: "description", content: "A staging layout preview for the templates collection. The page copy and actions are temporary." },
    { name: "robots", content: "noindex, nofollow, noarchive, noimageindex" },
  ] }),
  component: TemplatesPage,
});
function Specimen({ item, large = false }: { item: Item; large?: boolean }) {
  return <div className={`tm-specimen tm-specimen--${item.tone} ${large ? "tm-specimen--large" : ""}`} aria-label={`Preview of ${item.title}`}>
    <div className="tm-paper"><div className="tm-paper-head"><span className="tm-paper-mark"><BookOpen size={large ? 21 : 15} strokeWidth={1.8}/></span><span>{item.type.toUpperCase()}</span></div>
    <div className="tm-paper-title">{item.title}</div><div className="tm-paper-line tm-paper-line--strong"/><div className="tm-paper-line"/><div className="tm-paper-line tm-paper-line--short"/>
    <div className="tm-paper-columns"><span/><span/></div><div className="tm-paper-foot"><span>READ</span><span>NOTICE</span><span>NOTE</span></div></div>
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
      <span className="tm-stage-label">STAGING LAYOUT</span>
      <button className="tm-menu-button" aria-label={menuOpen ? "Close page menu" : "Open page menu"} aria-expanded={menuOpen} type="button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>{menuOpen && <nav className="tm-mobile-menu" aria-label="Page sections">{[["Collection","#collection"],["Choose a format","#choose"],["Preview","#specimen"],["Questions","#questions"]].map(([name, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{name}<ArrowRight size={16}/></a>)}</nav>}</header>
    <main id="content">
      <section className="tm-hero tm-wrap">
        <div className="tm-hero-copy"><p className="tm-eyebrow"><span className="tm-pip"/> THE TEMPLATE COLLECTION / LAYOUT PREVIEW</p><h1>One page to begin. <em>Room to go further.</em></h1><p className="tm-lead">Six Bible themed placeholder formats show how the collection, selection tools and previews will work. This is a layout draft; the final copy comes later.</p><div className="tm-actions"><a href="#collection" className="tm-button tm-button-dark">See the collection <ArrowDown size={18}/></a><a href="#choose" className="tm-button tm-button-light">Help me choose <ArrowRight size={18}/></a></div></div>
        <div className="tm-hero-visual" aria-hidden="true"><div className="tm-hero-back"/><div className="tm-hero-middle"/><div className="tm-hero-front"><div className="tm-folio-top"><BookOpen size={26}/><span>READING SHEET</span></div><strong>Genesis</strong><div className="tm-folio-rule"/><div className="tm-folio-rule short"/><div className="tm-folio-boxes"><span/><span/></div><div className="tm-folio-caption">A structure for your own notes</div></div><div className="tm-hero-stamp">SIX FORMATS<br/>ONE COLLECTION</div></div>
      </section>
      <div className="tm-ribbon"><div className="tm-wrap"><span>Explore by shape</span><span>Reading sheet</span><span>Journal</span><span>Table</span><span>Grid</span><span>Outline</span><span>Slides</span></div></div>
      <section id="collection" className="tm-wrap tm-collection"><div className="tm-section-title"><p className="tm-eyebrow">THE COLLECTION</p><h2>Find the shape that fits what you have.</h2><p>Each group changes the kind of space on the page. Select a card to inspect its layout in the specimen panel.</p></div>
        {groups.map(group => <div className="tm-group" key={group.name}><div className="tm-group-intro"><span className="tm-group-tag">{group.name}</span><h3>{group.prompt}</h3><p>{group.intro}</p></div><div className="tm-card-grid">{group.ids.map(id => { const item = items.find(candidate => candidate.id === id)!; return <article className="tm-card" key={item.id}><Specimen item={item}/><div className="tm-card-content"><div className="tm-card-meta"><span>{item.type}</span><span><FileText size={14}/> {item.pages}</span></div><h4>{item.title}</h4><p>{item.brief}</p><button type="button" onClick={() => preview(item)}>Preview format <ArrowRight size={17}/></button></div></article>; })}</div></div>)}
      </section>
      <section id="choose" className="tm-choice"><div className="tm-wrap"><div className="tm-section-title"><p className="tm-eyebrow">A QUICK WAY TO CHOOSE</p><h2>What needs a place on the page?</h2><p>Follow the shape of the material. The buttons update the specimen on this same page.</p></div><div className="tm-choice-list">{items.map(item => <button type="button" key={item.id} onClick={() => preview(item)} className="tm-choice-row"><span className="tm-choice-type">{item.type}</span><strong>{item.title}</strong><span>{item.pages}</span><ArrowRight size={19}/></button>)}</div></div></section>
      <section id="specimen" className="tm-wrap tm-preview"><div className="tm-preview-copy"><p className="tm-eyebrow">OPEN SPECIMEN</p><h2>{selected.title}</h2><p>{selected.brief} This preview shows spacing and hierarchy only. It does not save any input or lead to an unfinished page.</p><div className="tm-preview-switch"><span>Switch specimen</span><div>{items.map(item => <button key={item.id} type="button" className={selected.id === item.id ? "is-selected" : ""} onClick={() => setSelected(item)} aria-label={`Show ${item.title}`} aria-pressed={selected.id === item.id}>{item.type}</button>)}</div></div><p className="tm-live" role="status">{notice}</p></div><Specimen item={selected} large/></section>
      <section className="tm-formats"><div className="tm-wrap"><div className="tm-formats-head"><div><p className="tm-eyebrow">BY FORMAT</p><h2>Go straight to a page shape.</h2></div><Layers3 size={39} strokeWidth={1.3}/></div><div className="tm-format-grid">{(["Worksheet","Journal","Table","Grid","Outline","Slides"] as const).map(type => { const item = items.find(x => x.type === type)!; return <button type="button" key={type} onClick={() => preview(item)}><span>{type}</span><ArrowRight size={20}/></button>; })}</div></div></section>
      <section id="questions" className="tm-wrap tm-faq"><div><p className="tm-eyebrow">COMMON QUESTIONS</p><h2>About this draft</h2><p>The framework is live for visual review. Functionality and final subject matter are pending.</p></div><div className="tm-faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={19}/></summary><p>{a}</p></details>)}</div></section>
      <section className="tm-end tm-wrap"><div><p className="tm-eyebrow">LAYOUT END</p><h2>Choose a format. See the page.</h2><p>The collection is ready for a page-by-page review of spacing, hierarchy and behavior.</p></div><button type="button" onClick={() => { setSelected(items[0]); document.getElementById("collection")?.scrollIntoView({behavior:"smooth"}); }} className="tm-button tm-button-light">Return to collection <ArrowRight size={18}/></button></section>
    </main><footer className="tm-footer"><div className="tm-wrap"><span className="tm-footer-brand">businessidea.io</span><span>Temporary template layout · No indexing</span><a href="#content">Back to top ↑</a></div></footer>
  </div>;
}
