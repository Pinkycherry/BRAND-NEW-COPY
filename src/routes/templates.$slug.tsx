import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowRight, ChevronRight, Printer, Trash2 } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { SellerFaq } from "@/components/v2/faq";
import { founderTemplateBySlug, FOUNDER_TEMPLATES, type FounderTemplate } from "@/data/template-library";
import "@/components/v2/templates-directory.css";

export const Route = createFileRoute("/templates/$slug")({
  loader: ({ params }) => {
    const template = founderTemplateBySlug(params.slug);
    if (!template) throw notFound();
    return template;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Template"} for Indian Founders | BusinessIdea.io` },
    { name: "description", content: loaderData?.short ?? "Practical founder templates for India." },
    { property: "og:image", content: loaderData?.image.src ?? "/images/templates/indian-founder-business-planning-template-lean-canvas-businessidea.webp" },
    { property: "og:image:alt", content: loaderData?.image.alt ?? "Indian business planning templates help founders examine buyers and costs." },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: loaderData?.image.src ?? "/images/templates/indian-founder-business-planning-template-lean-canvas-businessidea.webp" },
  ] }),
  component: TemplateDetailRoute,
});

function TemplateDetailRoute() {
  const template = Route.useLoaderData();
  return <TemplateDetail key={template.slug} template={template} />;
}

function TemplateDetail({ template }: { template: FounderTemplate }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const storageKey = `bbi-template-draft:${template.slug}`;
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setAnswers(stored ? JSON.parse(stored) as Record<string, string> : {});
    } catch { setAnswers({}); }
    setReady(true);
  }, [storageKey]);
  useEffect(() => {
    if (ready) try { localStorage.setItem(storageKey, JSON.stringify(answers)); } catch { /* Browser storage may be unavailable. Export remains usable. */ }
  }, [answers, ready, storageKey]);
  const setAnswer = (key: string, value: string) => setAnswers(current => ({ ...current, [key]: value }));
  const exportDraft = () => {
    const lines = [`# ${template.title}`, "", ...template.sections.flatMap(section => [
      `## ${section.title}`, "", ...section.fields.flatMap(field => [
        `### ${field.label}`, answers[field.label]?.trim() || "(Not filled in)", "",
      ]),
    ])];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `businessidea-${template.slug}.md`;
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const clear = () => { if (window.confirm("Clear this template draft from this browser?")) { setAnswers({}); localStorage.removeItem(storageKey); } };
  const related = FOUNDER_TEMPLATES.filter(item => item.slug !== template.slug).slice(0, 3);
  const faq = [
    { q: "Where is my draft saved?", a: "This draft stays in this browser on this device. Download a copy if you want to keep it when you change browsers or devices." },
    { q: "Can I take this to a mentor or lender?", a: "Yes. Download your written answers or print the page. Separate facts you observed from figures you are still estimating." },
    { q: "Will BusinessIdea.io fill in the answers for me?", a: "No. The prompts help you organise your own business knowledge and buyer evidence; a blank field is an honest unknown." },
  ];
  return <V2Frame active="/templates"><main className="tm-page tm-detail">
    <div className="tm-wrap"><nav className="tm-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={14}/><a href="/templates">Templates</a><ChevronRight size={14}/><span>{template.title}</span></nav></div>
    <section className="tm-wrap tm-detail-hero"><div><p className="tm-eyebrow">{template.group}</p><h1>{template.title}</h1><p className="tm-lead">{template.short} {template.outcome}</p><div className="tm-actions"><a className="tm-button tm-button-dark" href="#template-builder">Start writing <ArrowRight size={17}/></a><a className="tm-button tm-button-light" href="/lists">Browse business ideas <ArrowRight size={17}/></a></div></div><img src={template.image.src} alt={template.image.alt} title={template.image.description} width={template.image.width} height={template.image.height} loading="eager" fetchPriority="high" /></section>
    <section className="tm-detail-intro"><div className="tm-wrap"><p className="tm-eyebrow">Make the page your own</p><h2>Start with what you know. Leave the rest as a question.</h2><p>The strongest plan is not the fullest one. A clear unknown tells you whom to speak to next. Your answers save in this browser as you write, and you can download or print them at any time.</p></div></section>
    <section id="template-builder" className="tm-wrap tm-builder"><div className="tm-section-title"><p className="tm-eyebrow">Working template</p><h2>Your draft</h2><p>Write in your own words. If a figure is an estimate, label it before sharing.</p></div>
      <div className="tm-builder-actions"><button type="button" onClick={exportDraft}><ArrowDownToLine size={17}/> Download my draft</button><button type="button" onClick={() => window.print()}><Printer size={17}/> Print or save PDF</button><button type="button" onClick={clear}><Trash2 size={17}/> Clear draft</button></div>
      {template.sections.map((section, si) => <div className="tm-builder-section" key={section.title}><div className="tm-builder-section-copy"><span>{String(si + 1).padStart(2, "0")}</span><h3>{section.title}</h3><p>{section.intro}</p></div><div className="tm-builder-fields">{section.fields.map(field => <label key={field.label}><strong>{field.label}</strong><small>{field.prompt}</small><textarea rows={4} value={answers[field.label] ?? ""} onChange={event => setAnswer(field.label, event.target.value)} placeholder="Write your answer here" /></label>)}</div></div>)}
      <div className="tm-builder-actions tm-builder-actions-bottom"><button type="button" onClick={exportDraft}><ArrowDownToLine size={17}/> Download my draft</button><button type="button" onClick={() => window.print()}><Printer size={17}/> Print or save PDF</button></div>
    </section>
    <section className="tm-detail-next"><div className="tm-wrap"><p className="tm-eyebrow">Keep moving</p><h2>Choose the next question</h2><div className="tm-detail-related">{related.map(item => <a key={item.slug} href={`/templates/${item.slug}`}><span>{item.group}</span><strong>{item.title}</strong><small>{item.short}</small><ArrowRight size={19}/></a>)}</div></div></section>
    <SellerFaq faq={faq} title="Using this template" />
    <section className="tm-end"><div className="tm-wrap"><p className="tm-eyebrow">From plan to evidence</p><h2>Take one assumption into the real world.</h2><p>Read a published business idea, then speak to a buyer before you treat your draft as proof.</p><a className="tm-button tm-button-dark" href="/lists">Explore idea lists <ArrowRight size={17}/></a></div></section>
  </main></V2Frame>;
}
