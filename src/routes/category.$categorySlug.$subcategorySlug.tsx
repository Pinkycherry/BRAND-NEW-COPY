import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

import { categoryImage } from "@/config/category-imagery";
import { absoluteUrl } from "@/lib/schema";
import { GlassShell } from "@/components/glass-shell";
import { PART_TIME_PATHS } from "@/lib/part-time-paths";
import { findSubcategory } from "@/lib/catalog";
import { getSubcategoryDetail } from "@/lib/taxonomy.functions";
import { BAND_LABEL, TIME_LABEL, getSubcategoryIdeas } from "@/lib/ideas.functions";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";
import "@/components/part-time-subcategory.css";

const PART_TIME_ART = "/images/blog/realistic-part-time-business-ideas-extra-income-evening-hustles-weekend-jobs-skills.webp";
const PART_TIME_ART_ALT = "Original part-time business ideas feature showing evening work, teaching and weekend selling";

const detailQuery = (categorySlug: string, subcategorySlug: string) => queryOptions({
  queryKey: ["subcategory-detail", categorySlug, subcategorySlug],
  queryFn: () => getSubcategoryDetail({ data: { categorySlug, subcategorySlug } }),
  staleTime: Infinity,
});
const codeFor = (categoryN: number, index: number) => `C${String(categoryN).padStart(3, "0")}-S${String(index + 1).padStart(2, "0")}`;
const ideasQuery = (code: string) => queryOptions({
  queryKey: ["subcategory-ideas", code],
  queryFn: () => getSubcategoryIdeas({ data: { code } }),
  staleTime: 60_000,
});

export const Route = createFileRoute("/category/$categorySlug/$subcategorySlug")({
  loader: async ({ context, params }) => {
    const found = findSubcategory(params.categorySlug, params.subcategorySlug);
    if (!found) throw notFound();
    await Promise.all([
      context.queryClient.ensureQueryData(detailQuery(params.categorySlug, params.subcategorySlug)),
      context.queryClient.ensureQueryData(ideasQuery(codeFor(found.category.n, found.index))),
    ]);
    return { name: found.subcategory.name, categoryName: found.category.name, image: found.category.slug === "part-time-business-ideas" ? { ...categoryImage(found.category.slug), src: PART_TIME_ART, alt: PART_TIME_ART_ALT } : categoryImage(found.category.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Business ideas"} in India | BusinessIdea.io` },
      { name: "description", content: `Explore ${loaderData?.name ?? "this focused path"} under ${loaderData?.categoryName ?? "the idea library"}. Read who it suits and see ideas as they are published.` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: loaderData?.image ? absoluteUrl(loaderData.image.src) : undefined },
      { property: "og:image:alt", content: loaderData?.image?.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: loaderData?.image ? absoluteUrl(loaderData.image.src) : undefined },
    ],
  }),
  component: SubcategoryPage,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>This path could not load.</h1><Link to="/browse">All categories</Link></div></GlassShell>,
  notFoundComponent: () => <GlassShell><div className="gl-page gl-message"><h1>We do not have that path.</h1><Link to="/browse">Browse the library</Link></div></GlassShell>,
});

function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = Route.useParams();
  const { category, subcategory, index } = findSubcategory(categorySlug, subcategorySlug)!;
  const { data: detail } = useSuspenseQuery(detailQuery(categorySlug, subcategorySlug));
  const { data: ideas } = useSuspenseQuery(ideasQuery(codeFor(category.n, index)));
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"curated" | "az">("curated");
  const visible = useMemo(() => {
    const filtered = ideas.filter((idea) => (idea.title + " " + idea.hook).toLowerCase().includes(query.toLowerCase().trim()));
    return sort === "az" ? [...filtered].sort((a, b) => a.title.localeCompare(b.title)) : filtered;
  }, [ideas, query, sort]);
  const topic = subcategory.name.replace(/ Business Ideas$/i, "");
  const path = `/category/${categorySlug}/${subcategorySlug}`;
  const image = categorySlug === "part-time-business-ideas" ? { ...categoryImage(categorySlug), src: PART_TIME_ART, alt: PART_TIME_ART_ALT } : categoryImage(categorySlug);
  const siblings = category.subcategories.filter((sub) => sub.slug !== subcategorySlug);
  const partTime = categorySlug === "part-time-business-ideas" ? PART_TIME_PATHS[subcategorySlug] : undefined;
  return (
    <>
      <JsonLd schema={[
        collectionPageSchema({ path, name: subcategory.name, description: `${subcategory.name} under ${category.name}.`, itemCount: ideas.length, image: image.src }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Browse", path: "/browse" }, { name: category.name, path: `/category/${categorySlug}` }, { name: subcategory.name, path }]),
      ]} />
      <GlassShell>
        <div className={"gl-page" + (partTime ? " pt-sub-page" : "")}>
          <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/browse">Explore</Link><span>/</span><Link to="/category/$categorySlug" params={{ categorySlug }}>{category.short}</Link><span>/</span><span>{topic}</span></nav>
          {partTime ? <header className="pt-sub-hero"><div><p className="gh-eyebrow">PART-TIME BUSINESS IDEA COLLECTION</p><h1>{topic} business ideas.</h1><p>{partTime.lead}</p><a href="#ideas-title" className="pt-sub-jump">See {ideas.length} published ideas <ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="pt-sub-prompt"><p className="gh-eyebrow">THE FIRST BOUNDARY</p><h2>{partTime.question}</h2><ul>{partTime.checks.map(check => <li key={check}>{check}</li>)}</ul><a href={partTime.nextHref}>{partTime.nextLabel} <ArrowUpRight size={16} aria-hidden="true" /></a></div></header> :           <header className="gl-hero gl-detail-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">FOCUSED BUSINESS IDEA COLLECTION</p><h1>{topic} <em>business ideas.</em></h1><p>{detail?.searchIntent || `A closer look at ${topic.toLowerCase()} and the published ideas in this path.`}</p><div className="gl-hero-stats"><span><strong>{ideas.length}</strong> published {ideas.length === 1 ? "idea" : "ideas"} here</span></div></div><figure className="gl-image-hero"><img src={image.src} alt={image.alt} width={1280} height={549} loading="eager" fetchPriority="high" /><figcaption>{image.description}</figcaption></figure></header>}
          <div className="gl-detail-columns">
            <div>
              {!partTime && detail?.scope && <section className="gl-editorial" aria-labelledby="scope-title"><p className="gh-eyebrow">THE SCOPE</p><h2 id="scope-title">What this path covers.</h2><p>{detail.scope}</p></section>}
              <section className="gl-index gl-ideas" aria-labelledby="ideas-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">PUBLISHED BLUEPRINTS</p><h2 id="ideas-title">{partTime ? "Choose a first promise." : "Ideas in this path."}</h2><p>{partTime ? "Open a blueprint to see its buyer, work, money and risks before you choose." : "Only published ideas appear below."}</p></div><span className="gl-count">{ideas.length} published</span></div>
                {ideas.length ? <><div className="gl-controls"><label className="gl-search"><Search size={19} aria-hidden="true" /><span className="gh-sr-only">Search ideas in this path</span><input type="search" placeholder="Search these ideas..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="gl-sort">Sort <select value={sort} onChange={(event) => setSort(event.target.value as "curated" | "az")}><option value="curated">Curated order</option><option value="az">A to Z</option></select></label></div>{visible.length ? <ol className="gl-idea-list">{visible.map((idea) => <li key={idea.code}><div className="gl-idea-card"><span className="gh-eyebrow">{BAND_LABEL[idea.investment_band] ?? "Business idea"} · {TIME_LABEL[idea.time_needed] ?? "Explore the detail"}</span><h3>{idea.title}</h3><p>{idea.hook}</p><div className="gl-idea-card-actions"><Link to="/idea/$slug" params={{ slug: idea.slug }} className="gl-idea-action">Read blueprint <ArrowUpRight size={17} /></Link><Link to="/idea/$slug" params={{ slug: idea.slug }} hash="validate" className="gl-idea-validate-link">Validate this idea <ArrowUpRight size={17} /></Link></div></div></li>)}</ol> : <div className="gl-empty"><h3>No matching published idea.</h3><p>Try a shorter search.</p><button type="button" onClick={() => setQuery("")}>Clear search</button></div>}</> : <div className="gl-empty gl-publishing"><h3>Ideas are being prepared for this path.</h3><p>There are no published blueprints here yet. Explore a nearby path or use the context above to decide what to research locally.</p><Link to="/category/$categorySlug" params={{ categorySlug }}>See all {category.short} paths <ArrowUpRight size={17} /></Link></div>}
              </section>
            </div>
            {partTime ? <aside className="pt-sub-reading"><figure><img src={PART_TIME_ART} width={1280} height={720} loading="lazy" alt={PART_TIME_ART_ALT} /><figcaption>From the founder journal</figcaption></figure><p className="gh-eyebrow">KEEP THE WEEK IN VIEW</p><h2>Look beyond the idea title.</h2><p>The part-time article compares published ideas by the hours they take. Read the section that matches your schedule, then return to a blueprint here.</p><Link to="/blog/$slug" params={{slug:"realistic-part-time-business-ideas"}}>Read the part-time business guide <ArrowUpRight size={17} /></Link></aside> :             <aside className="gl-side"><section><p className="gh-eyebrow">WHO IT MAY SUIT</p><h2>Start with your situation.</h2>{detail?.targetPeople?.length ? <ul className="gl-chips">{detail.targetPeople.map((person) => <li key={person}>{person}</li>)}</ul> : <p>Check the time, skills and local demand before committing to this direction.</p>}</section><section><p className="gh-eyebrow">THE NEXT QUESTION</p><h2>Test the numbers.</h2><p>Use your own cost and price assumptions in a calculator before spending money.</p><Link to="/calculator">Open calculators <ArrowUpRight size={17} /></Link></section></aside>}
          </div>
          {partTime ? <section className="pt-sub-end" aria-labelledby="pt-sub-next"><div><p className="gh-eyebrow">YOUR NEXT MOVE</p><h2 id="pt-sub-next">Keep the promise small enough to keep.</h2><p>Choose one blueprint, ask one possible buyer, and decide what the first paid version includes.</p></div><div><Link to="/category/$categorySlug" params={{categorySlug}}>Explore the part-time business idea paths <ArrowUpRight size={17} /></Link><Link to="/business-idea-time-fit">Check your available hours <ArrowUpRight size={17} /></Link><Link to="/first-customer-india">Ask the first buyer <ArrowUpRight size={17} /></Link></div></section> :           <section className="gl-related" aria-labelledby="nearby-title"><div className="gl-section-heading"><div><p className="gh-eyebrow">KEEP EXPLORING</p><h2 id="nearby-title">Other {category.short} paths.</h2></div></div><div className="gl-related-list">{siblings.map((sub) => <Link key={sub.slug} to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug, subcategorySlug: sub.slug }}>{sub.name.replace(/ Business Ideas$/i, "")}<ArrowUpRight size={17} /></Link>)}</div></section>}
        </div>
      </GlassShell>
    </>
  );
}
