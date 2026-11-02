import { useEffect, useRef } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { V2Frame } from "./frame";
import { SellerFaq } from "./faq";
import { templateImages } from "@/config/template-imagery";
import { FOUNDER_TEMPLATES } from "@/data/template-library";
import "./templates-directory.css";

const groups = [
  { title: "Discover & define", description: "Listen to the buyer before deciding what to build." },
  { title: "Position & strategy", description: "Put your assumptions in one place and decide what to test." },
  { title: "Plan & pitch", description: "Turn what you know into a clear plan for your next conversation." },
];
const choices = [
  { need: "I need to understand the person who will pay", slug: "customer-persona" },
  { need: "I want to ask buyers without leading them", slug: "customer-interview" },
  { need: "I need to see the whole idea at a glance", slug: "lean-canvas" },
  { need: "I want a short plan for a first discussion", slug: "one-page-business-plan" },
  { need: "I am planning a software business", slug: "saas-business-plan" },
  { need: "I need a fuller plan for a shop or service", slug: "standard-business-plan" },
];
const formats = [
  { name: "Buyer profile", slug: "customer-persona" }, { name: "Trust and objections", slug: "customer-persona" },
  { name: "Interview questions", slug: "customer-interview" }, { name: "Conversation notes", slug: "customer-interview" },
  { name: "Problem and solution", slug: "lean-canvas" }, { name: "Revenue and cost", slug: "lean-canvas" },
  { name: "One-page plan", slug: "one-page-business-plan" }, { name: "First sales path", slug: "one-page-business-plan" },
  { name: "Software product plan", slug: "saas-business-plan" }, { name: "SaaS economics", slug: "saas-business-plan" },
  { name: "Local operations", slug: "standard-business-plan" }, { name: "Funding conversation", slug: "standard-business-plan" },
];

export function TemplatesDirectory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { rootMargin: "0px 0px -3% 0px" });
    host.querySelectorAll(".pt-reveal").forEach(el => { el.classList.add("motion-ready"); observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  const faq = [
    { q: "Which template should I choose first?", a: "Start with the question you cannot answer yet. Use the customer persona if the buyer is unclear, the interview script if you need to listen, or a plan when you have enough evidence to organise." },
    { q: "Will my answers be saved?", a: "The writing pages keep your draft in this browser on this device. Download a copy before changing browsers or clearing browser data." },
    { q: "Can I share a finished draft?", a: "Yes. Download your own answers as a Markdown file or use Print to save a PDF. Label guesses as estimates before sharing them." },
    { q: "Do these templates make a business idea valid?", a: "A filled template is a way to think clearly. Buyer conversations, real costs and a small test help you check whether the idea works." },
  ];
  return <V2Frame active="/templates"><main className="pt-page" ref={root}>
    <section className="pt-hero"><div className="pt-wrap"><nav className="pt-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={15}/><span>Templates</span></nav><div className="pt-hero-grid"><div><span className="pt-eyebrow">Founder templates</span><h1>Give your idea somewhere to become clear.</h1><p>When the questions are scattered, even a promising idea feels heavy. Choose a template, write what you know about your buyer and your business, then take the next unknown into the real world.</p><div className="pt-actions"><a href="#catalog" className="pt-primary">Browse templates <ArrowRight size={18}/></a><a href="/lists" className="pt-secondary">Explore business ideas <ArrowRight size={17}/></a></div></div><div className="pt-hero-art"><img src={templateImages.planning.src} alt={templateImages.planning.alt} width={1600} height={900} loading="eager" title={templateImages.planning.description} fetchPriority="high" /></div></div></div></section>
    <section className="pt-quick pt-reveal" aria-label="Jump to a template"><div className="pt-wrap"><p>Start with your question</p><nav>{FOUNDER_TEMPLATES.map(item => <a href={`/templates/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={14}/></a>)}</nav></div></section>
    <section className="pt-catalog pt-reveal" id="catalog"><div className="pt-wrap"><div className="pt-heading"><span className="pt-eyebrow">The collection</span><h2>Find the page that helps you move.</h2><p>Each template is a working draft. Your words stay in this browser, and you can download or print them when you are ready.</p></div>{groups.map(group => <div className="pt-group" key={group.title}><div className="pt-group-intro"><span>{group.title}</span><h3>{group.title}</h3><p>{group.description}</p></div><div className="pt-card-grid">{FOUNDER_TEMPLATES.filter(item => item.group === group.title).map(item => <a key={item.slug} className="pt-card" href={`/templates/${item.slug}`}><div className="pt-card-image"><img src={item.image.src} alt={item.image.alt} title={item.image.description} loading="lazy" width={item.image.width} height={item.image.height} /></div><div className="pt-card-copy"><span>{item.group}</span><h4>{item.title}</h4><p>{item.short}</p><strong>Open template <ArrowRight size={16}/></strong></div></a>)}</div></div>)}</div></section>
    <section className="pt-choice pt-reveal"><div className="pt-wrap"><div className="pt-heading"><span className="pt-eyebrow">Choose by decision</span><h2>What is holding you back right now?</h2><p>Pick the question closest to your next conversation. You can change templates as your evidence changes.</p></div><div className="pt-choice-grid">{choices.map(choice => {const template=FOUNDER_TEMPLATES.find(item=>item.slug===choice.slug)!;return <a key={choice.slug} href={`/templates/${choice.slug}`}><span>{choice.need}</span><strong>{template.title}</strong><ArrowRight size={19}/></a>;})}</div></div></section>
    <section className="pt-formats pt-reveal"><div className="pt-wrap"><div className="pt-heading"><span className="pt-eyebrow">Jump to the work</span><h2>Start from the part you need.</h2></div><div className="pt-formats-grid">{formats.map((item,index)=><a href={`/templates/${item.slug}`} key={`${item.slug}-${index}`}>{item.name}<ArrowRight size={16}/></a>)}</div><p className="pt-format-note">All writing pages can be printed or saved as a PDF from your browser.</p></div></section>
    <SellerFaq faq={faq} title="Common questions" />
    <section className="pt-end pt-reveal"><div className="pt-wrap"><span className="pt-eyebrow">Make the next move</span><h2>The template helps you see the gap. A buyer helps you close it.</h2><p>Take the question you could not answer and ask someone who lives with that problem.</p><a href="/templates/customer-interview" className="pt-primary">Prepare a customer conversation <ArrowRight size={18}/></a></div></section>
  </main></V2Frame>;
}
