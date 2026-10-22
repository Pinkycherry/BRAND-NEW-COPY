import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { TAXONOMY } from "@/data/taxonomy";
import { BAND_LABEL, MODE_LABEL, SKILL_LABEL, TIME_LABEL, getIdea, type Idea } from "@/lib/ideas.functions";
import "@/components/glass-library.css";

const ideaQuery = (slug: string) => queryOptions({
  queryKey: ["idea", slug],
  queryFn: () => getIdea({ data: { slug } }),
  staleTime: 60_000,
});

function placeOf(idea: Idea) {
  const category = TAXONOMY[Number(idea.category_code.slice(1)) - 1];
  const index = Number(idea.subcategory_code.slice(6)) - 1;
  const subcategory = category?.subcategories[index];
  return category && subcategory ? { category, subcategory } : null;
}

export const Route = createFileRoute("/idea/$slug")({
  loader: async ({ context, params }) => {
    const idea = await context.queryClient.ensureQueryData(ideaQuery(params.slug));
    if (!idea) throw notFound();
    return { title: idea.title, summary: idea.summary };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Business idea"} | BusinessIdea.io` },
      { name: "description", content: loaderData?.summary ?? "" },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: IdeaPage,
  notFoundComponent: () => <GlassShell><div className="gl-page gl-message"><h1>We do not have that published idea.</h1><Link to="/browse">Explore the library</Link></div></GlassShell>,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>This idea could not load.</h1><p>Please try again shortly.</p><Link to="/browse">Explore the library</Link></div></GlassShell>,
});

function IdeaSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="gl-idea-section" aria-labelledby={`${id}-title`}><p className="gh-eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2>{children}</section>;
}

function IdeaPage() {
  const { slug } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQuery(slug));
  const [copied, setCopied] = useState(false);
  if (!idea) return null;
  const where = placeOf(idea);
  const tags = [BAND_LABEL[idea.investment_band], TIME_LABEL[idea.time_needed], SKILL_LABEL[idea.skill_level], MODE_LABEL[idea.work_mode]].filter(Boolean);
  const sections = [
    idea.what_it_is && { id: "what", label: "The idea" },
    idea.who_pays_you && { id: "buyers", label: "Who pays" },
    idea.how_money_comes && { id: "money", label: "How money comes" },
    idea.what_you_need && { id: "needs", label: "What you need" },
    idea.first_30_days?.length && { id: "first", label: "First 30 days" },
    idea.what_hurts && { id: "risks", label: "The hard parts" },
    idea.verdict && { id: "verdict", label: "Verdict" },
    idea.faq?.length && { id: "faq", label: "Questions" },
    idea.validate_prompt && { id: "validate", label: "Validate locally" },
  ].filter((section): section is { id: string; label: string } => Boolean(section));
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); }
  };
  return <GlassShell><div className="gl-page gl-idea-page">
    <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore</Link>{where && <><span>/</span><Link to="/category/$categorySlug" params={{ categorySlug: where.category.slug }}>{where.category.short}</Link><span>/</span><Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: where.category.slug, subcategorySlug: where.subcategory.slug }}>{where.subcategory.name.replace(/ Business Ideas$/i, "")}</Link></>}<span>/</span><span>Idea</span></nav>
    <header className="gl-idea-hero"><div><p className="gh-eyebrow">A PUBLISHED IDEA · {idea.code}</p><h1>{idea.title}</h1><p className="gl-idea-hook">{idea.hook}</p><ul className="gl-chips">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><p className="gl-idea-summary">{idea.summary}</p><div className="gl-idea-actions"><a href="#what" className="gh-button gh-button-primary">Read the blueprint <ArrowUpRight size={17} /></a><button type="button" className="gh-button gh-button-secondary" onClick={share}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Link copied" : "Copy link"}</button></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></header>
    <div className="gl-idea-layout"><article className="gl-idea-body">
      {idea.what_it_is && <IdeaSection id="what" eyebrow="01 / THE IDEA" title="What this business is"><p>{idea.what_it_is}</p></IdeaSection>}
      {idea.who_pays_you && <IdeaSection id="buyers" eyebrow="02 / CUSTOMER" title="Who pays you"><p>{idea.who_pays_you}</p></IdeaSection>}
      {idea.how_money_comes && <IdeaSection id="money" eyebrow="03 / REVENUE" title="How the money comes"><p>{idea.how_money_comes}</p></IdeaSection>}
      {idea.what_you_need && <IdeaSection id="needs" eyebrow="04 / SETUP" title="What you need"><p>{idea.what_you_need}</p></IdeaSection>}
      {idea.first_30_days?.length > 0 && <IdeaSection id="first" eyebrow="05 / EARLY ACTION" title="Your first 30 days"><ol className="gl-steps">{idea.first_30_days.map((step, index) => <li key={index}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></IdeaSection>}
      {idea.what_hurts && <IdeaSection id="risks" eyebrow="06 / REALITY CHECK" title="What can hurt in year one"><p>{idea.what_hurts}</p></IdeaSection>}
      {idea.verdict && <IdeaSection id="verdict" eyebrow="07 / THE STRAIGHT VERDICT" title="Is this worth a closer look?"><p className="gl-verdict">{idea.verdict}</p></IdeaSection>}
      {idea.faq?.length > 0 && <IdeaSection id="faq" eyebrow="08 / QUESTIONS" title="What people ask"><div className="gl-faq">{idea.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></IdeaSection>}
      {idea.validate_prompt && <IdeaSection id="validate" eyebrow="09 / VALIDATE LOCALLY" title="Check today's facts before you start"><p>Prices, licensing and demand vary by place and time. Use this research question as a starting point, then confirm it with local sources and potential buyers.</p><blockquote>{idea.validate_prompt}</blockquote><Link to="/calculator" className="gl-inline-link">Test your own numbers <ArrowUpRight size={17} /></Link></IdeaSection>}
      {where && <div className="gl-back-path"><p>Want to compare another direction?</p><Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: where.category.slug, subcategorySlug: where.subcategory.slug }}>See more in {where.subcategory.name.replace(/ Business Ideas$/i, "")} <ArrowUpRight size={17} /></Link></div>}
    </article><aside className="gl-idea-sidebar"><div><p className="gh-eyebrow">ON THIS PAGE</p><nav aria-label="Idea sections">{sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}</nav></div><div><p className="gh-eyebrow">PUT IT TO A TEST</p><p>Use the calculator with your own assumptions. The figures on this page are a starting frame, not a promise of returns.</p><Link to="/calculator">Open calculators <ArrowUpRight size={16} /></Link></div></aside></div>
  </div></GlassShell>;
}
