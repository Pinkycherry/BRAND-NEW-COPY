import { SellerFaq as Faq } from "@/components/v2/faq";
export { SellerFaq as Faq } from "@/components/v2/faq";
import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  CircleCheck,
  CircleX,
  House,
  Lightbulb,
  Star,
  ThumbsDown,
  ThumbsUp,
  Wallet,
  Zap,
} from "lucide-react";

import { V2Frame } from "@/components/v2/frame";
import { ListReportPromo, ListCitation, ListDeeperAnswers, ListBeforeBuild, ListRelatedResources, ListRecentResearch } from "@/components/v2/list-detail-sections";
import { getListPage, type ListIdea, type ListPage } from "@/lib/lists.functions";

export const Route = createFileRoute("/lists/$slug")({
  loader: async ({ params }) => {
    const page = await getListPage({ data: { slug: params.slug } });
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} | BusinessIdea.io` : "Business idea list | BusinessIdea.io" },
      { name: "robots", content: "noindex,nofollow,noarchive,noimageindex" },
    ],
  }),
  component: ListPageView,
});

/** First n sentences of a text. */
function sentences(text: string | null | undefined, n: number): string {
  if (!text) return "";
  const parts = text.replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  return parts.slice(0, n).join("").trim();
}
function clip(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
function points(text: string | null | undefined, n: number): string[] {
  if (!text) return [];
  return (text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+/g) ?? [text]).map((s) => s.trim()).filter(Boolean).slice(0, n);
}
const COST_LEVEL: Record<string, string> = { zero: "Almost no money", under_25k: "Lower startup cost", "25k_1l": "Moderate startup cost", "1l_5l": "Higher startup cost", above_5l: "Significant startup cost" };
const band = (i: ListIdea) => (i.investment_band ? COST_LEVEL[i.investment_band] ?? "" : "");
const lower = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const BTN =
  "inline-flex items-center justify-center whitespace-nowrap font-medium duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation active:scale-[0.98] active:opacity-90";

function Head({ p, title, words, updated }: { p: ListPage; title: string; words: number; updated: string }) {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 standard-badge-primary mb-3">
        {lower(p.name)}
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-sm md:text-base text-muted-foreground mb-3 max-w-2xl mx-auto">{sentences(p.intro, 1)}</p>
      <div className="flex items-center justify-center mb-3">
        <a href="/product" className={`${BTN} rounded-lg hover:bg-slate-700 h-11 py-2 gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] transition-all min-h-[44px] px-5 text-sm font-semibold`}>
          <Lightbulb className="h-4 w-4" />
          Validate your idea
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <p className="mt-2 text-xs text-muted-foreground/80">Updated {updated}</p>
    </div>
  );
}

function Tldr({ p, title, month }: { p: ListPage; title: string; month: string }) {
  return (
    <div className="tldr-section mb-6 rounded-2xl border-l-4 border-primary bg-primary/5 p-5 lg:p-6" data-featured-snippet="true">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          TL;DR • {p.name.toLowerCase()} • as of {month}
        </span>
      </div>
      <p className="text-base lg:text-lg leading-relaxed text-foreground/90">
        As of {month}, this page presents published entries for {title}. Each entry lists the opportunity, who it is for, the money
        needed to start and the main risk, using the live BusinessIdea.io library.
      </p>
    </div>
  );
}

function Intro({ p }: { p: ListPage }) {
  return (
    <section className="mb-6">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {p.intro && <p>{p.intro}</p>}
        {p.howToChoose && <p>{p.howToChoose}</p>}
      </div>
    </section>
  );
}

function Comparison({ ideas }: { ideas: ListIdea[] }) {
  const rows: [string, (i: ListIdea) => string][] = [
    ["Money to Start", band],
    ["Best For", (i) => clip(sentences(i.who_pays_you, 1), 90)],
  ];
  return (
    <div className="rounded-lg bg-card text-card-foreground overflow-hidden border border-border/60 shadow-sm mb-8">
      <div className="px-4 py-3 bg-primary/[0.03] border-b border-border/50 flex items-center gap-2">
        <Star className="h-4 w-4 text-primary fill-primary" />
        <div>
          <h2 className="text-sm font-bold text-foreground leading-none">Quick Comparison</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-none">Compare top options at a glance</p>
        </div>
      </div>
      <div className="p-0">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-foreground bg-muted/40 w-32 sm:w-40 sticky left-0 z-10">Feature</th>
                {ideas.map((i) => (
                  <th key={i.slug} className="px-3 py-2 text-center text-[11px] font-semibold text-foreground/80 border-l border-border/40 min-w-[110px] max-w-[180px]">
                    <span className="block leading-tight">
                      {i.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, get]) => (
                <tr key={label} className="border-b border-border/30 last:border-b-0 hover:bg-primary/[0.02] transition-colors">
                  <td className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-foreground sticky left-0 bg-muted/40 z-10 border-r border-border/20">{label}</td>
                  {ideas.map((i) => (
                    <td key={i.slug} className="px-3 py-2 text-center text-[13px] text-foreground/90 border-l border-border/20">
                      <span className="font-medium">{get(i)}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TopCard({ idea, actionHref, showAction = true }: { idea: ListIdea; n?: number; actionHref?: string; showAction?: boolean }) {
  const need = points(idea.what_you_need, 4);
  const hurts = points(idea.what_hurts, 3);
  return (
    <div className="rounded-lg border bg-card text-card-foreground premium-card overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-0">
        <div className="relative flex items-start gap-3 sm:gap-5 p-4 sm:p-6 bg-card border-b border-border/60">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
              <h3 className="text-lg sm:text-2xl font-bold text-foreground break-words leading-tight">
                {idea.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground break-words">
              <span className="font-semibold text-foreground/80">Best for:</span> {sentences(idea.who_pays_you, 1)}
            </p>
            <p className="mt-2 text-sm sm:hidden">
              <span className="text-muted-foreground">Money to start: </span>
              <span className="font-bold text-foreground">{band(idea)}</span>
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end shrink-0 rounded-lg border border-border/70 bg-muted/40 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Money to start</p>
            <p className="font-bold text-base text-foreground leading-tight">{band(idea)}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <p className="text-muted-foreground leading-relaxed">
              <span>{idea.summary ?? idea.hook}</span>
            </p>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
              <div className="rounded-lg bg-primary/5 border border-primary/15 px-3 py-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary/80 mb-0.5">
                  <Wallet className="h-3.5 w-3.5" />
                  Revenue
                </div>
                <div className="text-sm text-foreground leading-snug">{sentences(idea.how_money_comes, 1)}</div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4 border border-green-100 dark:border-green-900">
              <h4 className="font-semibold flex items-center gap-2 mb-3 text-green-700 dark:text-green-400">
                <ThumbsUp className="h-4 w-4" />
                What you need
              </h4>
              <ul className="space-y-2">
                {need.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm">
                    <CircleCheck className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-4 border border-red-100 dark:border-red-900">
              <h4 className="font-semibold flex items-center gap-2 mb-3 text-red-700 dark:text-red-400">
                <ThumbsDown className="h-4 w-4" />
                What hurts
              </h4>
              <ul className="space-y-2">
                {hurts.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm">
                    <CircleX className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Our Verdict</p>
            <p className="text-sm text-foreground/85 leading-relaxed">{sentences(idea.verdict, 2)}</p>
          </div>
          {showAction && <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <a
              href={actionHref ?? `/idea/${idea.slug}`}
              className={`${BTN} bg-slate-900 hover:bg-slate-700 h-12 rounded-lg px-6 text-base gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] transition-all w-full sm:w-auto min-h-[44px]`}
            >
              <Lightbulb className="h-4 w-4" />
              Read this idea
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>}
        </div>
      </div>
    </div>
  );
}

function MoreCard({ idea }: { idea: ListIdea; n?: number }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold mb-2">
              {idea.title}
            </h3>
            <p className="text-muted-foreground">
              <span>{idea.summary ?? idea.hook}</span>
            </p>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              <div className="rounded-lg bg-primary/5 border border-primary/15 px-3 py-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary/80 mb-0.5">
                  <Wallet className="h-3.5 w-3.5" />
                  Revenue
                </div>
                <div className="text-sm text-foreground leading-snug">{sentences(idea.how_money_comes, 1)}</div>
              </div>
            </div>
          </div>
          <a
            href={`/idea/${idea.slug}`}
            className={`${BTN} border bg-white hover:border-slate-400 shadow-sm h-10 rounded-lg px-3 text-sm flex-shrink-0 gap-1.5 text-primary border-primary/30 hover:bg-primary/10 min-h-[40px]`}
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Read idea</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function RelatedLists({ p }: { p: ListPage }) {
  if (p.siblings.length === 0) return null;
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card mb-12">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-2">Related Business Idea Lists</h2>
        <p className="text-muted-foreground mb-6">Explore more curated lists that might interest you</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {p.siblings.map((s) => (
            <a key={s.slug} href={`/lists/${s.slug}`} className="group flex items-center justify-between gap-2 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors">
              <span>{s.name}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                Explore <ChevronRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Conclusion({ p }: { p: ListPage }) {
  const last = p.ideas[0];
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card mb-12">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p className="text-muted-foreground leading-relaxed">{p.howToChoose ?? sentences(last?.verdict, 3)}</p>
      </div>
    </div>
  );
}

function ListPageView() {
  return <ListPageBody p={Route.useLoaderData()} />;
}

export function ListPageBody({ p, categorySlug, canonicalPath, parent, directory }: { p: ListPage; categorySlug?: string; canonicalPath?: string; parent?:{label:string;href:string}; directory?:{name:string;slug:string}[] }) {
  const latest = p.ideas.map((i) => i.updated_at ?? "").sort().pop() ?? "";
  const d = latest ? new Date(latest) : new Date();
  const updated = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone:'Asia/Kolkata' });
  const month = d.toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone:'Asia/Kolkata' });
  const title = p.name;
  const words = p.ideas.reduce((n, i) => n + [i.summary, i.who_pays_you, i.how_money_comes, i.verdict].join(" ").split(/\s+/).length, 0);
  const top = p.ideas.slice(0, 5);
  const more = p.ideas.slice(5);

  return (
    <V2Frame active="/lists">
      <div className="bg-muted/30 border-b pt-24 lg:pt-28">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              <li className="inline-flex items-center gap-1.5">
                <a href="/" aria-label="Home" className="transition-colors flex items-center text-muted-foreground hover:text-primary">
                  <House className="h-4 w-4" />
                </a>
              </li>
              <li aria-hidden="true" className="mx-1 text-muted-foreground"><ChevronRight className="h-4 w-4" /></li>
              <li className="inline-flex items-center gap-1.5">
                <a href={parent?.href ?? (categorySlug ? `/category/${categorySlug}` : "/lists")} className="flex items-center transition-colors text-muted-foreground hover:text-primary">{parent?.label ?? (categorySlug ? p.categoryName : "Lists")}</a>
              </li>
              <li aria-hidden="true" className="mx-1 text-muted-foreground"><ChevronRight className="h-4 w-4" /></li>
              <li className="inline-flex items-center gap-1.5">
                <span aria-current="page" className="flex items-center font-medium text-foreground">{title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="pt-6 pb-8 px-4 hover:!translate-y-0 hover:!shadow-none">
        <div className="container mx-auto max-w-5xl">
          <Head p={p} title={title} words={words} updated={updated} />
          <Tldr p={p} title={title} month={month} />
          <Intro p={p} />
          {directory && directory.length>0 && <section id="focused-lists" className="mb-12 scroll-mt-28"><h2 className="mb-5 text-2xl font-bold">Focused lists</h2><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{directory.map(sub=><a key={sub.slug} href={`/lists/${sub.slug}`} className="group flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm"><span className="min-w-0 break-words">{sub.name}</span><ArrowRight className="shrink-0 text-primary" size={16}/></a>)}</div></section>}
          <ListReportPromo p={p}/>
          <Comparison ideas={top} />
          <section className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Featured {p.name.toLowerCase()}
            </h2>
            {top.map((i, n) => (
              <TopCard key={i.slug} idea={i} n={n + 1} />
            ))}
          </section>
          {more.length > 0 && (
            <section className="space-y-6 mb-12">
              <h2 className="text-2xl font-bold">More Options</h2>
              {more.map((i, n) => (
                <MoreCard key={i.slug} idea={i} n={n + 6} />
              ))}
            </section>
          )}
          <ListCitation p={p} updated={updated} path={canonicalPath}/>
          <Faq faq={p.faq} />
          <ListDeeperAnswers p={p}/>
          <RelatedLists p={p} />
          <ListBeforeBuild p={p}/>
          <Conclusion p={p} />
        </div>
      </article>
      <ListRelatedResources p={p}/>
      <div className="sr-only">
        <h2>Quick Answer: {title}</h2>
        <p>{p.intro}</p>
      </div>
      <ListRecentResearch p={p}/>
    </V2Frame>
  );
}
