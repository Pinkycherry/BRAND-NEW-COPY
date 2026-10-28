import { V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { ValidateButton } from "@/components/validate-button";
import { LegacyIdeaPage } from "@/components/legacy-idea";
import { categoryImage } from "@/config/category-imagery";
import { getLegacyIdea } from "@/lib/legacy-ideas.functions";
import { absoluteUrl } from "@/lib/schema";
import { TAXONOMY } from "@/data/taxonomy";
import { MODE_LABEL, SKILL_LABEL, TIME_LABEL, getIdea, type Idea } from "@/lib/ideas.functions";
import { TopCard } from "./lists.$slug";
import "@/components/glass-library.css";

const ideaQuery = (slug: string) => queryOptions({
  queryKey: ["idea", slug],
  queryFn: () => getIdea({ data: { slug } }),
  staleTime: 60_000,
});

const legacyQuery = (slug: string) => queryOptions({
  queryKey: ["legacy-idea", slug],
  queryFn: () => getLegacyIdea({ data: { slug } }),
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
    if (idea) return { kind: "new" as const, idea, title: idea.title, summary: idea.summary, image: categoryImage(TAXONOMY[Number(idea.category_code.slice(1)) - 1]?.slug ?? "") };
    const legacy = await context.queryClient.ensureQueryData(legacyQuery(params.slug));
    if (!legacy) throw notFound();
    return { kind: "legacy" as const, idea: legacy, title: legacy.seoTitle || legacy.title, summary: legacy.metaDescription || legacy.summary, image: categoryImage(legacy.categorySlug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Business idea"} | BusinessIdea.io` },
      { name: "description", content: loaderData?.summary ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: loaderData?.image ? absoluteUrl(loaderData.image.src) : undefined },
      { property: "og:image:alt", content: loaderData?.image?.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: loaderData?.image ? absoluteUrl(loaderData.image.src) : undefined },
    ],
  }),
  component: IdeaPage,
  notFoundComponent: () => <GlassShell><div className="gl-page gl-message"><h1>We do not have that published idea.</h1><Link to="/browse">Explore the library</Link></div></GlassShell>,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>This idea could not load.</h1><p>Please try again shortly.</p><Link to="/browse">Explore the library</Link></div></GlassShell>,
});

function IdeaSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <V2PageSection id={id} className="gl-idea-section" aria-labelledby={`${id}-title`}><p className="gh-eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2>{children}</V2PageSection>;
}

function IdeaPage() {
  const data = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  if (data.kind === "legacy") return <LegacyIdeaPage idea={data.idea} />;
  const idea = data.idea;
  const where = placeOf(idea);
  const tags = [TIME_LABEL[idea.time_needed], SKILL_LABEL[idea.skill_level], MODE_LABEL[idea.work_mode]].filter(Boolean);
  const sections = [
    idea.what_it_is && { id: "what", label: "The idea" },
    idea.who_pays_you && { id: "buyers", label: "Who pays" },
    idea.how_money_comes && { id: "money", label: "How money comes" },
    idea.what_you_need && { id: "needs", label: "What you need" },
    idea.first_30_days?.length && { id: "first", label: "First 30 days" },
    idea.what_hurts && { id: "risks", label: "The hard parts" },
    idea.verdict && { id: "verdict", label: "Verdict" },
    idea.faq?.length && { id: "faq", label: "Questions" },
    { id: "validate", label: "Validate" },
  ].filter((section): section is { id: string; label: string } => Boolean(section));
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); }
  };
  return <GlassShell><div className="gl-page gl-idea-page">
    <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore</Link>{where && <><span>/</span><Link to="/category/$categorySlug" params={{ categorySlug: where.category.slug }}>{where.category.short}</Link><span>/</span><Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: where.category.slug, subcategorySlug: where.subcategory.slug }}>{where.subcategory.name.replace(/ Business Ideas$/i, "")}</Link></>}<span>/</span><span>Idea</span></nav>
    <V2PageHero className="gl-idea-hero"><div><p className="gh-eyebrow">A PUBLISHED IDEA · {idea.code}</p><h1>{idea.title}</h1><p className="gl-idea-hook">{idea.hook}</p><ul className="gl-chips">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><p className="gl-idea-summary">{idea.summary}</p><div className="gl-idea-actions"><a href="#validate" className="gh-button gh-button-primary">Validate this idea <ArrowUpRight size={17} /></a><a href="#what" className="gh-button gh-button-secondary">Read the blueprint</a><button type="button" className="gh-button gh-button-secondary" onClick={share}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Link copied" : "Copy link"}</button></div></div><figure className="gl-idea-feature"><img src={data.image.src} alt={data.image.alt} width={1280} height={549} /><figcaption>{where ? <Link to="/category/$categorySlug" params={{ categorySlug: where.category.slug }}>Explore more {where.category.short} paths <ArrowUpRight size={16} aria-hidden="true" /></Link> : "Artwork for this business idea category"}</figcaption></figure></V2PageHero>
    <div className="gl-idea-layout"><article className="gl-idea-body">
      <TopCard idea={{ ...idea, updated_at: null }} n={1} actionHref="#validate" />
      {idea.what_it_is && <IdeaSection id="what" eyebrow="THE IDEA" title="What this business is"><p>{idea.what_it_is}</p></IdeaSection>}
      {idea.who_pays_you && <IdeaSection id="buyers" eyebrow="CUSTOMER" title="Who pays you"><p>{idea.who_pays_you}</p></IdeaSection>}
      {idea.how_money_comes && <IdeaSection id="money" eyebrow="REVENUE" title="How the money comes"><p>{idea.how_money_comes}</p></IdeaSection>}
      {idea.what_you_need && <IdeaSection id="needs" eyebrow="SETUP" title="What you need"><p>{idea.what_you_need}</p></IdeaSection>}
      {idea.first_30_days?.length > 0 && <IdeaSection id="first" eyebrow="EARLY ACTION" title="Your first 30 days"><ol className="gl-steps">{idea.first_30_days.map((step, index) => <li key={index}><p>{step}</p></li>)}</ol></IdeaSection>}
      {idea.what_hurts && <IdeaSection id="risks" eyebrow="REALITY CHECK" title="What can hurt in year one"><p>{idea.what_hurts}</p></IdeaSection>}
      {idea.verdict && <IdeaSection id="verdict" eyebrow="THE STRAIGHT VERDICT" title="Is this worth a closer look?"><p className="gl-verdict">{idea.verdict}</p></IdeaSection>}
      {idea.faq?.length > 0 && <IdeaSection id="faq" eyebrow="QUESTIONS" title="What people ask"><div className="gl-faq">{idea.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></IdeaSection>}
      <IdeaSection id="validate" eyebrow="VALIDATE THE IDEA" title="Run the research before you commit"><ValidateButton slug={idea.slug} /><p className="gl-validation-caution">AI research is a starting point. Confirm prices, licensing and demand with local sources and potential buyers.</p><Link to="/calculator" className="gl-inline-link">Test your own numbers <ArrowUpRight size={17} /></Link></IdeaSection>
      {where && <div className="gl-back-path"><p>Want to compare another direction?</p><Link to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: where.category.slug, subcategorySlug: where.subcategory.slug }}>See more in {where.subcategory.name.replace(/ Business Ideas$/i, "")} <ArrowUpRight size={17} /></Link></div>}
    </article><aside className="gl-idea-sidebar"><div><p className="gh-eyebrow">ON THIS PAGE</p><nav aria-label="Idea sections">{sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}</nav></div><div><p className="gh-eyebrow">PUT IT TO A TEST</p><p>Use the calculator with your own assumptions. The figures on this page are a starting frame, not a promise of returns.</p><Link to="/calculator">Open calculators <ArrowUpRight size={16} /></Link></div></aside></div>
  </div></GlassShell>;
}
