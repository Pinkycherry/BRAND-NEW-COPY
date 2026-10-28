import { SellerFaq } from "@/components/v2/faq";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";

import { V2Frame } from "@/components/v2/frame";
import { SellerHero, SellerSection, SellerLinkGrid, SellerChips, contentCard } from "@/components/v2/content-page";
import { ValidateButton } from "@/components/validate-button";
import { LegacyIdeaPage } from "@/components/legacy-idea";
import { categoryImage } from "@/config/category-imagery";
import { getLegacyIdea } from "@/lib/legacy-ideas.functions";
import { absoluteUrl } from "@/lib/schema";
import { TAXONOMY } from "@/data/taxonomy";
import { MODE_LABEL, SKILL_LABEL, TIME_LABEL, getIdea, getSubcategoryIdeas, type Idea } from "@/lib/ideas.functions";
import { TopCard } from "./lists.$slug";

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
    if (idea) { const related = await getSubcategoryIdeas({ data: { code: idea.subcategory_code } }); return { kind: "new" as const, idea, related: related.filter((item) => item.slug !== idea.slug).slice(0, 3), title: idea.title, summary: idea.summary, image: categoryImage(TAXONOMY[Number(idea.category_code.slice(1)) - 1]?.slug ?? "") }; }
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
  notFoundComponent: () => <V2Frame><SellerHero breadcrumbs={[{label:"Home",href:"/"}]} badge="IDEA LIBRARY" title="We do not have that published idea." intro="Explore the published idea library." primary={{label:"Browse ideas",href:"/browse"}} /></V2Frame>,
  errorComponent: () => <V2Frame><SellerHero breadcrumbs={[{label:"Home",href:"/"}]} badge="IDEA LIBRARY" title="This idea could not load." intro="Please try again shortly." primary={{label:"Browse ideas",href:"/browse"}} /></V2Frame>,
});

function IdeaPage() {
  const data = Route.useLoaderData();
  if (data.kind === "legacy") return <LegacyIdeaPage idea={data.idea} />;
  const { idea, related } = data;
  const where = placeOf(idea);
  const tags = [TIME_LABEL[idea.time_needed], SKILL_LABEL[idea.skill_level], MODE_LABEL[idea.work_mode]].filter(Boolean);
  const breadcrumbs = [{label:"Home",href:"/"},{label:"Browse",href:"/browse"},...(where ? [{label:where.category.short,href:`/category/${where.category.slug}`},{label:where.subcategory.name,href:`/lists/${where.subcategory.slug}`}] : [])];
  const fields = [
    {title:"What this business is",text:idea.what_it_is},
    {title:"Who pays you",text:idea.who_pays_you},
    {title:"How the money comes",text:idea.how_money_comes},
    {title:"What you need",text:idea.what_you_need},
    {title:"What can hurt in year one",text:idea.what_hurts},
    {title:"Is this worth a closer look?",text:idea.verdict},
  ].filter(field=>field.text);
  const relatedLists = where ? where.category.subcategories.filter(sub=>sub.slug!==where.subcategory.slug).slice(0,3).map(sub=>({label:sub.name,href:`/lists/${sub.slug}`})) : [];
  return <V2Frame>
    <SellerHero breadcrumbs={breadcrumbs} badge={`A PUBLISHED IDEA · ${idea.code}`} title={idea.title} intro={idea.hook || idea.summary} primary={{label:"Validate your idea",href:"#validate"}} secondary={{label:"Browse ideas",href:"/browse"}} />
    <SellerSection title="At a glance"><div className="mb-5 flex flex-wrap gap-2">{tags.map(tag=><span key={tag} className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">{tag}</span>)}</div><p className="mb-6 max-w-3xl text-slate-600">{idea.summary}</p><TopCard idea={{...idea,updated_at:null}} n={1} actionHref="#validate" /></SellerSection>
    <SellerSection id="blueprint" title="The blueprint"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{fields.map(field=><article key={field.title} className={contentCard}><h3 className="mb-3 text-lg font-semibold text-slate-950">{field.title}</h3><p className="text-sm leading-relaxed text-slate-600">{field.text}</p></article>)}</div></SellerSection>
    {idea.first_30_days?.length > 0 && <SellerSection title="Your first 30 days"><ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{idea.first_30_days.map((step,index)=><li key={index} className={contentCard}><span className="font-bold text-violet-700">{index+1}</span><p className="mt-2 text-sm text-slate-600">{step}</p></li>)}</ol></SellerSection>}
    {idea.faq?.length > 0 && <SellerFaq title="What people ask" faq={idea.faq} />}
    <SellerSection id="validate" title="Research before you commit"><p className="mb-5 max-w-3xl text-slate-600">AI research is a starting point. Confirm prices, licensing and demand with local sources and potential buyers.</p><ValidateButton slug={idea.slug} /></SellerSection>
    <SellerLinkGrid title="Next step" links={[{label:"Compare related ideas",href:where?`/lists/${where.subcategory.slug}`:"/browse"},{label:"Test the numbers",href:"/calculator"},{label:"Read the validation guide",href:"/startup-idea-validation"}]} />
    <SellerLinkGrid title="Related resources" links={[...related.map(item=>({label:item.title,href:`/idea/${item.slug}`,note:item.hook})),...relatedLists]} />
    <SellerChips links={where ? [{label:where.category.short,href:`/category/${where.category.slug}`},{label:where.subcategory.name,href:`/lists/${where.subcategory.slug}`}] : [{label:"Business ideas",href:"/browse"}]} />
  </V2Frame>;
}
