import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, House, Library } from "lucide-react";

import { V2Frame } from "@/components/v2/frame";
import { getCategoryPage } from "@/lib/category-page.functions";
import { Faq, TopCard } from "./lists.$slug";

export const Route = createFileRoute("/category/$categorySlug/")({
  loader: async ({ params }) => {
    const page = await getCategoryPage({ data: { slug: params.categorySlug } });
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Business ideas"} | BusinessIdea.io` },
    { name: "description", content: loaderData?.name ?? "Business ideas" },
  ] }),
  component: CategoryPage,
});

function CategoryPage() {
  const page = Route.useLoaderData();
  return <V2Frame active="/lists">
    <div className="border-b bg-muted/30 pt-24 lg:pt-28"><div className="mx-auto max-w-6xl px-4 md:px-6 py-3"><nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground"><a href="/"><House size={16}/><span className="sr-only">Home</span></a><ChevronRight size={15}/><a href="/browse">Browse</a><ChevronRight size={15}/><span aria-current="page">{page.name}</span></nav></div></div>
    <article className="mx-auto max-w-6xl px-4 md:px-6 pt-8 pb-16">
      <div className="mb-8 text-center"><span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{page.short}</span><h1 className="mt-4 text-3xl font-bold md:text-5xl">{page.name}</h1>{page.intro && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{page.intro}</p>}<div className="mt-5 flex flex-wrap justify-center gap-3"><a className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white" href="/browse">Browse ideas</a><a className="rounded-lg border bg-card px-6 py-3 font-semibold" href="/lists">Explore lists</a></div></div>
      <div className="tldr-section mb-9 rounded-2xl border-l-4 border-primary bg-primary/5 p-5"><h2 className="text-sm font-bold uppercase tracking-wide text-primary">Start here</h2><p className="mt-2 text-foreground/90">Choose a focused path, then read each idea’s buyer, work and risks before testing a small next step.</p></div>
      <section aria-labelledby="paths-title" className="mb-12"><div className="mb-6 flex items-center gap-2"><Library className="text-primary"/><h2 id="paths-title" className="text-2xl font-bold">Focused lists</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{page.subs.map(s=><a key={s.slug} href={`/lists/${s.slug}`} className="group rounded-lg border bg-card p-5 shadow-sm premium-card transition hover:border-primary/50"><h3 className="text-lg font-semibold group-hover:text-primary">{s.name}</h3><div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary"><span className="flex items-center gap-1"><List size={15}/>Explore ideas</span><ChevronRight size={17}/></div></a>)}</div></section>
      {page.ideas.length ? <section aria-labelledby="top-title" className="mb-12"><h2 id="top-title" className="mb-6 text-2xl font-bold">Ideas to explore</h2><div className="mb-7 rounded-lg border bg-card p-5 shadow-sm"><h3 className="font-semibold">At a glance</h3><div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead><tr><th className="p-3 text-left">Idea</th><th className="p-3 text-left">Who may pay</th><th className="p-3 text-left">Explore</th></tr></thead><tbody>{page.ideas.map(i=><tr className="border-t" key={i.slug}><td className="p-3 font-semibold">{i.title}</td><td className="p-3">{i.who_pays_you}</td><td className="p-3"><a className="text-primary underline" href={`/idea/${i.slug}`}>Read idea</a></td></tr>)}</tbody></table></div></div><div className="space-y-7">{page.ideas.map((i,n)=><TopCard idea={i} n={n+1} key={i.slug}/>)}</div></section> : null}
      <Faq faq={page.faq}/><section className="py-12"><h2 className="text-2xl font-bold">Related resources</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[["Business idea validation","/startup-idea-validation"],["Startup cost calculator","/calculator/startup-cost"],["All idea lists","/lists"]].map(([t,h])=><a className="rounded-xl border bg-card p-4 font-semibold" href={h} key={h}>{t} <ArrowRight className="inline text-primary" size={16}/></a>)}</div><h2 className="mt-10 text-2xl font-bold">People also search for</h2><div className="mt-4 flex flex-wrap gap-2">{page.subs.map(s=><a className="rounded-full border bg-card px-4 py-2 text-sm" href={`/lists/${s.slug}`} key={s.slug}>{s.name}</a>)}</div></section>
      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"><h2 className="text-2xl font-bold">Keep the next step small.</h2><p className="mt-3 text-muted-foreground">Compare a focused list, then test the costs and demand in your setting.</p><a className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white" href="/tools">Explore tools <ArrowRight size={16}/></a></section>
    </article>
  </V2Frame>;
}
