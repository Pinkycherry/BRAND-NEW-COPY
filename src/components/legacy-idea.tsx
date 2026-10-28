import { Link } from "@tanstack/react-router";
import { V2Frame } from "@/components/v2/frame";
import { SellerHero, SellerSection, SellerLinkGrid, SellerChips, contentCard } from "@/components/v2/content-page";
import { SellerFaq } from "@/components/v2/faq";
import { ValidateButton } from "@/components/validate-button";
import { TAXONOMY } from "@/data/taxonomy";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/schema";
import type { LegacyIdea } from "@/lib/legacy-ideas.functions";

export function LegacyIdeaPage({ idea }: { idea: LegacyIdea }) {
  const intro = idea.description.split(/(?<=[.!?])\s+/)[0]?.slice(0, 260) || idea.summary.slice(0, 260);
  const category = TAXONOMY.find(item => item.slug === idea.categorySlug);
  const fields = [
    { title: "What this business is", text: idea.description },
    { title: "Why it might matter", text: idea.marketOpportunity },
    { title: "Who the customer is", text: idea.targetCustomer },
    { title: "How it makes money", text: idea.howMakeMoney },
    { title: "Startup cost", text: idea.startupCost },
    { title: "Income potential", text: idea.incomePotential },
    { title: "First customer", text: idea.firstCustomer },
    { title: "Where you could stand out", text: idea.competitionEdge },
    { title: "Worth a closer look?", text: idea.verdict },
  ].filter(field => field.text);
  return <><JsonLd schema={[articleSchema({ path: "/idea/" + idea.slug, headline: idea.title, description: idea.description || idea.summary, datePublished: idea.createdAt, categoryName: idea.categoryName }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }, { name: idea.title, path: "/idea/" + idea.slug }])]} />
    <V2Frame>
      <SellerHero breadcrumbs={[{label:"Home",href:"/"},{label:"Browse",href:"/browse"},...(category?[{label:category.short,href:`/category/${category.slug}`}]:[])]} badge="PUBLISHED BUSINESS IDEA" title={idea.title} intro={intro} primary={{label:"Validate your idea",href:"#validate"}} secondary={{label:"Browse ideas",href:"/browse"}} />
      <SellerSection title="The blueprint"><p className="mb-6 text-slate-600">{idea.categoryName}{idea.subcategoryName ? ` · ${idea.subcategoryName}` : ""}</p><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{fields.map(field=><article key={field.title} className={contentCard}><h3 className="mb-3 font-semibold text-slate-950">{field.title}</h3><p className="text-sm leading-relaxed text-slate-600">{field.text}</p></article>)}</div></SellerSection>
      {idea.steps.length > 0 && <SellerSection title="First steps"><ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{idea.steps.map((step,index)=><li key={index} className={contentCard}><strong className="text-violet-700">{index+1}</strong><p className="mt-2 text-sm text-slate-600">{step}</p></li>)}</ol></SellerSection>}
      {(idea.tools.length > 0 || idea.pros.length > 0 || idea.cons.length > 0) && <SellerSection title="Setup and reality check"><div className="grid gap-4 md:grid-cols-3">{[{title:"Tools you may need",items:idea.tools},{title:"What could work",items:idea.pros},{title:"What to watch",items:idea.cons}].filter(x=>x.items.length).map(group=><div key={group.title} className={contentCard}><h3 className="font-semibold">{group.title}</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">{group.items.map((item,index)=><li key={index}>{item}</li>)}</ul></div>)}</div></SellerSection>}
      {idea.faq.length > 0 && <SellerFaq title="What people ask" faq={idea.faq} />}
      <SellerSection id="validate" title="Research before you commit"><p className="mb-5 text-slate-600">AI research is a starting point. Confirm prices, licensing and demand with local sources and potential buyers.</p><ValidateButton slug={idea.slug} /></SellerSection>
      <SellerLinkGrid title="Next step" links={[{label:"Browse published ideas",href:"/browse"},{label:"Run a calculator",href:"/calculator"},{label:"Read the validation guide",href:"/startup-idea-validation"}]} />
      <SellerLinkGrid title="Related resources" links={category ? [{label:category.name,href:`/category/${category.slug}`},...category.subcategories.slice(0,3).map(sub=>({label:sub.name,href:`/lists/${sub.slug}`}))] : [{label:"Idea lists",href:"/lists"}]} />
      <SellerChips links={category ? [{label:category.short,href:`/category/${category.slug}`}] : [{label:"Business ideas",href:"/browse"}]} />
    </V2Frame>
  </>;
}
