import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  CircleX,
  House,
  Lightbulb,
  Quote,
  Star,
  ThumbsDown,
  ThumbsUp,
  Wallet,
  Zap,
} from "lucide-react";

import { V2Frame } from "@/components/v2/frame";
import {
  AuthorBox,
  BeforeYouBuild,
  DeeperAnswers,
  IntelligenceReport,
  MarketWatch,
  PeopleAlsoSearch,
  RelatedResources,
  ResourceDirectory,
  ReviewMeta,
} from "@/components/v2/list-page-static";
import { getListPage, type ListIdea, type ListPage } from "@/lib/lists.functions";

/*
 * /lists/<subcategory-slug>: one page per subcategory, on the purchased
 * single-list layout. Same sections and order as supplied; the idea cards,
 * comparison table, intro and FAQ are filled from our published ideas.
 * Remaining sections are the seller's placeholders (list-page-static.tsx).
 */

export const Route = createFileRoute("/lists/$slug")({
  loader: async ({ params }) => {
    const page = await getListPage({ data: { slug: params.slug } });
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.ideas.length} ${loaderData.name} (2026) | BusinessIdea.io` : "Business idea list | BusinessIdea.io" },
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
        <button className={`${BTN} rounded-lg hover:bg-slate-700 h-11 py-2 gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] transition-all min-h-[44px] px-5 text-sm font-semibold`}>
          <Lightbulb className="h-4 w-4" />
          Validate Your Idea Free — 120s
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground/80">
        {Math.max(1, Math.round(words / 220))} min read · {p.ideas.length} items · Updated {updated}
      </p>
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
        As of {month}, this page tracks {p.ideas.length} entries for {title}. Each entry lists the opportunity, who it is for, the money
        needed to start and the main risk, reviewed against BusinessIdea.io&apos;s catalog of {p.totalIdeas.toLocaleString("en-IN")} published
        business ideas.
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
                {ideas.map((i, n) => (
                  <th key={i.slug} className="px-3 py-2 text-center text-[11px] font-semibold text-foreground/80 border-l border-border/40 min-w-[110px] max-w-[180px]">
                    <span className="block leading-tight">
                      {n + 1}. {i.title}
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

export function TopCard({ idea, n, actionHref }: { idea: ListIdea; n: number; actionHref?: string }) {
  const need = points(idea.what_you_need, 4);
  const hurts = points(idea.what_hurts, 3);
  return (
    <div className="rounded-lg border bg-card text-card-foreground premium-card overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-0">
        <div className="relative flex items-start gap-3 sm:gap-5 p-4 sm:p-6 bg-card border-b border-border/60">
          {n === 1 && <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400" />}
          <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-lg sm:text-2xl font-extrabold shadow-[0_6px_18px_-6px_hsl(var(--primary)/0.6)] ring-1 ring-primary/30">{n}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
              <h3 className="text-lg sm:text-2xl font-bold text-foreground break-words leading-tight">
                {n}. {idea.title}
              </h3>
              {n === 1 && (
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors bg-amber-400 text-amber-950 border-transparent font-semibold uppercase tracking-wide text-[10px]">Top Pick</div>
              )}
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
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <a
              href={actionHref ?? `/idea/${idea.slug}`}
              className={`${BTN} bg-slate-900 hover:bg-slate-700 h-12 rounded-lg px-6 text-base gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] transition-all w-full sm:w-auto min-h-[44px]`}
            >
              <Lightbulb className="h-4 w-4" />
              Validate This Idea Free
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreCard({ idea, n }: { idea: ListIdea; n: number }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-bold">{n}</div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold mb-2">
              {n}. {idea.title}
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
            <span className="hidden sm:inline">Validate</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Cite({ title, slug, year }: { title: string; slug: string; year: string }) {
  const styles = ["APA", "MLA", "Chicago", "BibTeX"] as const;
  const [tab, setTab] = useState<(typeof styles)[number]>("APA");
  const url = `https://businessidea.io/lists/${slug}`;
  const text: Record<(typeof styles)[number], string> = {
    APA: `BusinessIdea.io. (${year}). ${title}. BusinessIdea.io. Retrieved from ${url}`,
    MLA: `"${title}." BusinessIdea.io, ${year}, ${url}.`,
    Chicago: `BusinessIdea.io. "${title}." ${year}. ${url}.`,
    BibTeX: `@misc{businessidea_${slug.replace(/-/g, "_")}, title={${title}}, author={BusinessIdea.io}, year={${year}}, url={${url}}}`,
  };
  return (
    <div className="mb-12">
      <section aria-labelledby="cite-heading" className="rounded-xl border border-border bg-muted/20 scroll-mt-24 p-5 lg:p-6" id="cite-this-page">
        <div className="flex items-center gap-2 mb-3">
          <Quote className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground" id="cite-heading">Cite this page</h3>
        </div>
        <div role="tablist" className="items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-4 mb-3 h-9">
          {styles.map((s) => (
            <button
              key={s}
              role="tab"
              type="button"
              aria-selected={tab === s}
              onClick={() => setTab(s)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 font-medium transition-all text-xs${tab === s ? " bg-background text-foreground shadow-sm font-semibold" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2">
          <p className="flex-1 rounded-md border border-border bg-background p-3 font-mono text-xs leading-relaxed break-all">{text[tab]}</p>
          <button type="button" onClick={() => void navigator.clipboard?.writeText(text[tab])} className="rounded-md border border-border px-3 py-2 text-xs font-medium">
            Copy
          </button>
        </div>
      </section>
    </div>
  );
}

export function Faq({ faq }: { faq: ListPage["faq"] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (faq.length === 0) return null;
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card mb-12">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CircleHelp className="h-6 w-6 text-primary" />
          Frequently Asked Questions
        </h2>
        <div className="w-full">
          {faq.map((f, i) => (
            <div key={f.q} className="border-b" data-state={open === i ? "open" : "closed"}>
              <h3 className="flex">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-left"
                >
                  {f.q}
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200${open === i ? " rotate-180" : ""}`} />
                </button>
              </h3>
              <div hidden={open !== i} className="overflow-hidden text-sm pb-4 text-muted-foreground leading-relaxed">
                {f.a} {f.href && <a className="font-semibold text-primary underline underline-offset-2" href={f.href}>Explore the source <ArrowRight className="inline h-3.5 w-3.5" /></a>}
              </div>
            </div>
          ))}
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
                {s.count} ideas <ChevronRight className="h-4 w-4" />
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
  const p = Route.useLoaderData();
  const latest = p.ideas.map((i) => i.updated_at ?? "").sort().pop() ?? "";
  const d = latest ? new Date(latest) : new Date();
  const updated = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const month = d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  const title = `${p.ideas.length} ${p.name} for ${d.getFullYear()}`;
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
                <a href="/lists" className="flex items-center transition-colors text-muted-foreground hover:text-primary">Lists</a>
              </li>
              <li aria-hidden="true" className="mx-1 text-muted-foreground"><ChevronRight className="h-4 w-4" /></li>
              <li className="inline-flex items-center gap-1.5">
                <span aria-current="page" className="flex items-center font-medium text-foreground">{title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="pt-6 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <Head p={p} title={title} words={words} updated={updated} />
          <Tldr p={p} title={title} month={month} />
          <AuthorBox />
          <ReviewMeta />
          <Intro p={p} />
          <Comparison ideas={top} />
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Top {top.length} {p.name.toLowerCase()}
            </h2>
            {top.map((i, n) => (
              <TopCard key={i.slug} idea={i} n={n + 1} />
            ))}
          </div>
          {more.length > 0 && (
            <div className="space-y-6 mb-12">
              <h2 className="text-2xl font-bold">More Options</h2>
              {more.map((i, n) => (
                <MoreCard key={i.slug} idea={i} n={n + 6} />
              ))}
            </div>
          )}
          <Cite title={title} slug={p.slug} year={String(d.getFullYear())} />
          <Faq faq={p.faq} />
          <DeeperAnswers />
          <PeopleAlsoSearch />
          <ResourceDirectory />
          <RelatedLists p={p} />
          <BeforeYouBuild />
          <IntelligenceReport />
          <Conclusion p={p} />
        </div>
      </article>
      <RelatedResources />
      <div className="sr-only">
        <h2>Quick Answer: {title}</h2>
        <p>{p.intro}</p>
      </div>
      <MarketWatch />
    </V2Frame>
  );
}
