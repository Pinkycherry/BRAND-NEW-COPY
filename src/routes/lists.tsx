import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronRight,
  Filter,
  House,
  ImageIcon,
  IndianRupee,
  Laptop,
  Library,
  Lightbulb,
  List,
  MapPin,
  Rocket,
  Search,
  Target,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";

import { V2Frame } from "@/components/v2/frame";
import { TAXONOMY } from "@/data/taxonomy";
import { BAND_LABEL } from "@/lib/ideas.functions";
import { getListsCounts, type ListsCounts } from "@/lib/lists.functions";
import { canonicalUrl } from "@/lib/site-config";

/*
 * /lists — the Lists hub, built on the purchased page architecture: same
 * sections in the same order, same components, filled with our own library.
 * Card titles come from the approved taxonomy (never typed by hand) and
 * every count comes from published rows via getListsCounts().
 */

type Card = { id: string; title: string; href?: string; count: number };

/** Resolve a category (C006) or subcategory (C006-S04) code to a card. */
function fromCode(code: string, counts: ListsCounts): Card {
  const m = /^C(\d{3})(?:-S(\d{2}))?$/.exec(code);
  const cat = m ? TAXONOMY.find((c) => c.n === Number(m[1])) : undefined;
  if (!m || !cat) throw new Error(`Unknown taxonomy code ${code}`);
  if (!m[2]) {
    return { id: code, title: cat.name, href: `/category/${cat.slug}`, count: counts.byCategory[code] ?? 0 };
  }
  const sub = cat.subcategories[Number(m[2]) - 1];
  if (!sub) throw new Error(`Unknown taxonomy code ${code}`);
  return {
    id: code,
    title: sub.name,
    href: `/category/${cat.slug}/${sub.slug}`,
    count: counts.bySubcategory[code] ?? 0,
  };
}

const TRENDING = ["C001", "C002", "C004", "C005", "C006", "C007", "C016", "C003", "C012", "C009"];

const SECTIONS: {
  key: string;
  anchor: string;
  title: string;
  blurb: string;
  icon: ComponentType<{ className?: string }>;
  codes: string[];
}[] = [
  {
    key: "who",
    anchor: "by-who-you-are",
    title: "By Who You Are",
    blurb: "Business ideas for your stage of life",
    icon: Users,
    codes: [
      "C006", "C007", "C008", "C014", "C006-S04", "C006-S10", "C006-S01", "C006-S02", "C006-S03",
      "C006-S05", "C006-S06", "C006-S07", "C006-S09", "C007-S01", "C007-S02", "C007-S05", "C007-S06",
      "C007-S07", "C008-S01", "C008-S02", "C008-S05", "C008-S07", "C008-S10", "C014-S08", "C011",
    ],
  },
  { key: "budget", anchor: "by-budget", title: "By Budget", blurb: "", icon: IndianRupee, codes: [] },
  {
    key: "place",
    anchor: "by-place",
    title: "By Place & Work Style",
    blurb: "Ideas based on where and how you work",
    icon: MapPin,
    codes: ["C001", "C005", "C009", "C010", "C004", "C002", "C003", "C003-S03", "C002-S02", "C003-S05"],
  },
  {
    key: "industry",
    anchor: "by-industry",
    title: "By Industry",
    blurb: "Ideas in specific business sectors",
    icon: Building2,
    codes: [
      "C016", "C017", "C018", "C019", "C020", "C021", "C022", "C024", "C025", "C027",
      "C028", "C030", "C031", "C032", "C034", "C035", "C036", "C037", "C038", "C015",
    ],
  },
  {
    key: "online",
    anchor: "online-digital",
    title: "Online & Digital",
    blurb: "Ideas you run on a phone or laptop",
    icon: Laptop,
    codes: ["C004", "C047", "C056", "C057", "C012", "C004-S03", "C004-S07", "C004-S08", "C004-S09", "C012-S08"],
  },
  {
    key: "models",
    anchor: "business-models",
    title: "Business Models",
    blurb: "Ideas by the way the money comes in",
    icon: TrendingUp,
    codes: [
      "C013", "C001-S01", "C056-S09", "C028-S09", "C004-S02", "C056-S01", "C056-S03", "C013-S07",
      "C013-S06", "C057-S01", "C057-S07", "C012-S05", "C016-S04", "C020-S10", "C019-S06", "C031-S10",
      "C031-S09", "C034-S09", "C015-S10", "C036-S10", "C037-S10", "C038-S08", "C010-S07", "C021-S09",
      "C002-S06", "C039",
    ],
  },
];

const FILTERS = [
  { key: "all", label: "All Lists" },
  { key: "who", label: "By Who You Are" },
  { key: "budget", label: "By Budget" },
  { key: "place", label: "Place & Work Style" },
  { key: "industry", label: "By Industry" },
  { key: "online", label: "Online & Digital" },
  { key: "models", label: "Business Models" },
] as const;

/** Budget cards: counts are live, pages are not built yet, so no link. */
function budgetCards(c: ListsCounts): Card[] {
  const b = c.byBand;
  const zero = b["zero"] ?? 0;
  const u25 = zero + (b["under_25k"] ?? 0);
  const u1l = u25 + (b["25k_1l"] ?? 0);
  const u5l = u1l + (b["1l_5l"] ?? 0);
  return [
    { id: "b-zero", title: "Business Ideas With Almost No Money", count: zero },
    { id: "b-25k", title: "Business Ideas Under ₹25,000", count: u25 },
    { id: "b-1l", title: "Business Ideas Under ₹1 Lakh", count: u1l },
    { id: "b-5l", title: "Business Ideas Under ₹5 Lakh", count: u5l },
    { id: "b-above", title: "Business Ideas Above ₹5 Lakh", count: b["above_5l"] ?? 0 },
    { id: "b-zw", title: "Almost No Money Ideas for Women", count: c.combos["zero-women"] ?? 0 },
    { id: "b-zs", title: "Almost No Money Ideas for Students", count: c.combos["zero-students"] ?? 0 },
    { id: "b-zo", title: "Almost No Money Online Ideas", count: c.combos["zero-online"] ?? 0 },
    { id: "b-lh", title: "Home Business Ideas Under ₹25,000", count: c.combos["low-home"] ?? 0 },
    { id: "b-lhm", title: "Homemaker Ideas Under ₹25,000", count: c.combos["low-homemakers"] ?? 0 },
    { id: "b-lv", title: "Village Business Ideas Under ₹25,000", count: c.combos["low-village"] ?? 0 },
  ];
}

const NEXT = [
  { href: "/startup-idea-comparison", title: "Compare two ideas before choosing", body: "Hold both to the same buyer, cash and time questions." },
  { href: "/business-demand-test-india", title: "Test demand before buying stock", body: "Separate polite interest from a booking or a payment." },
  { href: "/startup-costs-india", title: "Check the cash before opening a shop", body: "List what leaves your pocket before the first payment." },
];

const TOOLS = [
  { href: "/tools", title: "Tools and Calculators", body: "Startup cost, break-even and customer acquisition calculators, plus buyer and cash worksheets.", unit: "Calculators" },
  { href: "/templates", title: "Founder Templates", body: "Customer persona, interview, competitor, validation, business plan and pitch deck templates.", unit: "Templates" },
  { href: "/business-idea-toolkit", title: "Founder Toolkit", body: "Pick a founder question and run the calculators with your own figures.", unit: "Worksheets" },
  { href: "/product", title: "Validation Workbench", body: "Write the buyer, the problem, today's workaround and a small offer, then test it.", unit: "Workbench" },
];

const STRATEGY: { href: string; tag: string; icon: ComponentType<{ className?: string }>; title: string; body: string }[] = [
  { href: "/startup-costs-india", tag: "Money", icon: IndianRupee, title: "Startup Costs in India", body: "What leaves your pocket before the first payment comes in." },
  { href: "/startup-cash-flow-india", tag: "Money", icon: IndianRupee, title: "Startup Cash Flow", body: "Every bill has a date. Keep cash between paying and getting paid." },
  { href: "/unit-economics-india", tag: "Numbers", icon: TrendingUp, title: "Unit Economics", body: "Check whether one sale covers its own cost and leaves profit." },
  { href: "/business-pricing-india", tag: "Money", icon: IndianRupee, title: "Pricing Your Offer", body: "Put a price on the work that covers cost and still sells." },
  { href: "/business-models-india", tag: "Strategy", icon: Target, title: "Business Models in India", body: "Service, product, subscription, marketplace and licensing compared." },
  { href: "/startup-idea-validation", tag: "Strategy", icon: Target, title: "How to Validate an Idea", body: "Name a buyer, interview without leading and test an offer." },
  { href: "/business-demand-test-india", tag: "Customers", icon: Users, title: "Demand Test", body: "Define the offer, audience and action before you spend." },
  { href: "/first-customer-india", tag: "Customers", icon: Users, title: "Your First Customer", body: "Reach one specific buyer before building for everyone." },
  { href: "/business-idea-risk-check", tag: "Strategy", icon: Target, title: "Risk Check", body: "Map the cash and time at risk, and record when you would stop." },
  { href: "/business-idea-pivot-or-stop", tag: "Strategy", icon: TrendingUp, title: "Pivot or Stop", body: "Read the evidence before putting more money in." },
];

const MOST_READ = [
  { href: "/business-ideas-india", label: "business ideas in India" },
  { href: "/side-business-ideas-india", label: "side business ideas" },
  { href: "/local-business-ideas-india", label: "local business ideas" },
  { href: "/online-business-ideas-india", label: "online business ideas" },
  { href: "/service-business-ideas-india", label: "service business ideas" },
  { href: "/product-business-ideas-india", label: "product business ideas" },
  { href: "/startup-idea-validation", label: "how to validate a business idea" },
  { href: "/startup-costs-india", label: "startup costs in India" },
  { href: "/business-models-india", label: "business models in India" },
  { href: "/first-customer-india", label: "finding your first customer" },
  { href: "/category/food-business-ideas", label: "food business ideas" },
  { href: "/category/women-friendly-business-ideas", label: "business ideas for women" },
  { href: "/category/student-business-ideas", label: "business ideas for students" },
  { href: "/category/village-and-small-town-business-ideas", label: "village and small town business ideas" },
  { href: "/category/work-from-home-business-ideas", label: "work from home business ideas" },
];

const fmt = (n: number) => n.toLocaleString("en-IN");

export const Route = createFileRoute("/lists")({
  loader: () => getListsCounts(),
  head: () => ({
    meta: [
      { title: "Business Idea Lists for India by Budget, Situation & Industry | BusinessIdea.io" },
      {
        name: "description",
        content:
          "Every business idea list in one place: by who you are, your budget in rupees, where you work, your industry and how the money comes in. Each list opens real published ideas.",
      },
      { name: "robots", content: "noindex,nofollow,noarchive,noimageindex" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/lists") }],
  }),
  component: ListsPage,
});

const BADGE =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
const BTN =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] touch-manipulation active:scale-[0.98] active:opacity-90 h-12 rounded-lg px-6 text-base";
const BTN_DARK = `${BTN} bg-slate-900 text-white hover:bg-slate-700 shadow-sm hover:shadow-md`;
const BTN_LIGHT = `${BTN} border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-900 shadow-sm`;

function SectionHead({ icon: Icon, title, count, unit }: { icon: ComponentType<{ className?: string }>; title: string; count: number; unit: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className={`${BADGE} border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`}>
        {fmt(count)} {unit}
      </div>
    </div>
  );
}

function ListCard({ card }: { card: Card }) {
  const inner = (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card h-full hover:border-primary/50 hover:-translate-y-0.5 transition-all">
      <div className="p-4">
        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors text-balance">{card.title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <List className="h-3.5 w-3.5" />
            {fmt(card.count)} ideas
          </span>
          {card.href ? (
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          ) : (
            <span className="text-xs">Page coming</span>
          )}
        </div>
      </div>
    </div>
  );
  return card.href ? (
    <a className="block group" href={card.href}>
      {inner}
    </a>
  ) : (
    <div className="block group">{inner}</div>
  );
}

function CardSection({
  id,
  muted,
  icon,
  title,
  blurb,
  cards,
}: {
  id: string;
  muted: boolean;
  icon: ComponentType<{ className?: string }>;
  title: string;
  blurb: string;
  cards: Card[];
}) {
  if (cards.length === 0) return null;
  return (
    <section id={id} className={`py-12 lg:py-16 scroll-mt-24${muted ? " bg-muted/30" : ""}`}>
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHead icon={icon} title={title} count={cards.length} unit="lists" />
        <p className="text-muted-foreground mb-6">{blurb}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <ListCard key={c.id} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-border bg-card p-5 open:shadow-sm">
      <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
        <h3 className="font-semibold text-base md:text-lg pr-4">{q}</h3>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90 shrink-0 mt-0.5" />
      </summary>
      <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{children}</p>
    </details>
  );
}

function ListsPage() {
  const counts = Route.useLoaderData();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [query, setQuery] = useState("");

  const sections = useMemo(
    () =>
      SECTIONS.map((s) => ({
        ...s,
        blurb: s.key === "budget" ? "Business ideas sorted by the money you need to start, in rupees" : s.blurb,
        cards: s.key === "budget" ? budgetCards(counts) : s.codes.map((code) => fromCode(code, counts)),
      })),
    [counts],
  );

  const q = query.trim().toLowerCase();
  const shown = sections.map((s) => ({
    ...s,
    cards: filter !== "all" && filter !== s.key ? [] : s.cards.filter((c) => !q || c.title.toLowerCase().includes(q)),
  }));

  /** Complete index: every linked list on this page plus every filled category. */
  const index = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of sections) for (const c of s.cards) if (c.href && c.count > 0) map.set(c.href, c.title);
    for (const cat of TAXONOMY) {
      const code = `C${String(cat.n).padStart(3, "0")}`;
      if ((counts.byCategory[code] ?? 0) > 0) map.set(`/category/${cat.slug}`, cat.name);
    }
    return [...map.entries()].map(([href, title]) => ({ href, title })).sort((a, b) => a.title.localeCompare(b.title));
  }, [sections, counts]);

  const filledCategories = Object.values(counts.byCategory).filter((n) => n > 0).length;
  const bandCount = Object.keys(BAND_LABEL).filter((k) => (counts.byBand[k] ?? 0) > 0).length;
  const trending = TRENDING.map((code) => fromCode(code, counts));
  const featured = fromCode("C001", counts);
  const total = fmt(counts.total);
  const lists = fmt(index.length);

  return (
    <V2Frame active="/lists">
      <div className="bg-muted/30 border-b pt-24 lg:pt-28">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex flex-wrap items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              <li className="inline-flex items-center gap-1.5">
                <a className="transition-colors flex items-center text-muted-foreground hover:text-primary" href="/" aria-label="Home">
                  <House className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              <li className="mx-1 text-muted-foreground" aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <a className="flex items-center transition-colors text-muted-foreground hover:text-primary" href="/learning-resources">
                  Resources
                </a>
              </li>
              <li className="mx-1 text-muted-foreground" aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="flex items-center font-medium text-foreground" aria-current="page">
                  Lists
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-8 md:py-10 lg:py-14 border-b border-border/40">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="container mx-auto max-w-6xl px-4 relative">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <div className={`${BADGE} border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-3`}>
                <Library className="w-3 h-3 mr-1" />
                {lists} lists · Counts read live
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
                Business Idea Lists for India: By Budget, Situation &amp; Industry
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-xl">
                {lists} lists · {total} business ideas for India, sorted by who you are, the money you have in rupees, where you work and how
                the business earns — every idea ends with a Validate button.
              </p>
              <p className="text-sm text-muted-foreground mb-5">
                New here? Start with{" "}
                <a className="font-semibold text-primary hover:underline" href="/business-ideas-india">
                  business ideas in India
                </a>{" "}
                — ideas by your time, place and obligations — then use the lists below to go deep on one situation.
              </p>
              <p className="text-xs text-muted-foreground mb-5 flex flex-wrap gap-x-3 gap-y-1">
                <span>
                  <strong className="text-foreground">{lists}</strong> lists
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong className="text-foreground">{total}</strong> ideas
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong className="text-foreground">{filledCategories}</strong> categories
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong className="text-foreground">{bandCount}</strong> budget tiers
                </span>
              </p>
              <div className="relative max-w-md mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm pl-9 pr-9 h-11"
                  inputMode="search"
                  aria-label="Search business idea lists"
                  placeholder="Search lists — e.g. 'tuition', 'women', 'bakery'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/product" className={`${BTN_DARK} w-full sm:w-auto`}>
                  <Rocket className="mr-2 h-4 w-4" />
                  Validate your idea
                </a>
                <a href="/blueprints" className={`${BTN_LIGHT} w-full sm:w-auto`}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Browse all ideas
                </a>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-full" aria-hidden="true" />
              {/* Image placeholder until our own hero image is made. */}
              <div
                role="img"
                aria-label="Image placeholder"
                className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto aspect-[3/2] rounded-2xl border-2 border-dashed border-primary/30 bg-background/70 grid place-items-center text-muted-foreground"
              >
                <ImageIcon className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending row */}
      <section className="py-6 lg:py-8 border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Start with these</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trending.map((c) => (
              <a
                key={c.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted hover:bg-primary/10 hover:text-primary border border-border/50 transition-colors"
                href={c.href}
              >
                {fmt(c.count)} {c.title}
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-20 z-30 bg-background/85 backdrop-blur border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide pr-2">
              <Filter className="h-3.5 w-3.5" /> Filter
            </span>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === f.key ? "bg-primary text-white shadow-sm" : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Three steps */}
      <section className="py-6 lg:py-8 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <ol className="grid sm:grid-cols-3 gap-3">
            {[
              ["Filter by your situation", `Narrow ${lists} lists by who you are, budget, place, industry or business model.`],
              ["Shortlist 3 ideas", "Each idea page shows who pays you, how the money comes in, what you need and what hurts in year one."],
              ["Validate before you spend", "Click Validate on any idea to copy a ready research prompt, then talk to real buyers."],
            ].map(([t, d], i) => (
              <li key={t} className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                <div className="h-7 w-7 shrink-0 rounded-full bg-primary text-white text-sm font-bold grid place-items-center">{i + 1}</div>
                <div>
                  <h3 className="font-semibold text-sm">{t}</h3>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Next step */}
      <section className="py-8 lg:py-10 border-b border-border bg-muted/20" aria-labelledby="next-step-guides">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-2xl mb-5">
            <h2 id="next-step-guides" className="text-xl font-bold">
              Choose what to do next
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Found an idea worth exploring? Take the next step before spending on stock, equipment or a shop.
            </p>
          </div>
          <nav aria-label="Next-step guides" className="grid gap-4 md:grid-cols-3">
            {NEXT.map((n) => (
              <a
                key={n.href}
                className="group rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-primary/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                href={n.href}
              >
                <span className="flex items-center justify-between gap-3 font-semibold">
                  {n.title}
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{n.body}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Featured list */}
      <section className="py-10 lg:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-6">Featured List</h2>
          <a href={featured.href}>
            <div className="rounded-lg bg-card text-card-foreground shadow-sm premium-card border-2 border-primary/30 hover:border-primary/50 transition-all bg-gradient-to-r from-primary/5 to-transparent">
              <div className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${BADGE} border-transparent hover:bg-primary/80 bg-primary text-white`}>Featured</div>
                      <div className={`${BADGE} text-foreground`}>Home &amp; Online</div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                      {fmt(featured.count)} {featured.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Ten kinds of work you can run from home in India, from home-cooked meal subscriptions to live online workshops.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <List className="h-4 w-4" />
                        {fmt(featured.count)} ideas
                      </span>
                    </div>
                  </div>
                  <span className={`${BTN_DARK} lg:flex-shrink-0`}>
                    View List
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* The six card sections */}
      {shown.map((s, i) => (
        <CardSection key={s.key} id={s.anchor} muted={i % 2 === 0} icon={s.icon} title={s.title} blurb={s.blurb} cards={s.cards} />
      ))}

      {/* Tools & Resources */}
      {(filter === "all" && !q) && (
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead icon={Wrench} title="Tools & Resources" count={TOOLS.length} unit="lists" />
            <p className="text-muted-foreground mb-6">Free tools for checking an idea before you spend on it</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOOLS.map((t) => (
                <a key={t.href} className="block group" href={t.href}>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card h-full hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Wrench className="h-5 w-5" />
                        </div>
                        <div className={`${BADGE} text-foreground`}>Tools</div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-balance">{t.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t.body}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <List className="h-4 w-4" />
                          {t.unit}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Read <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Strategy & Money */}
      {(filter === "all" && !q) && (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead icon={Target} title="Strategy & Money" count={STRATEGY.length} unit="lists" />
            <p className="text-muted-foreground mb-6">Guides on cash, pricing, customers and when to stop</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STRATEGY.map((t) => (
                <a key={t.href} className="block group" href={t.href}>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm premium-card h-full hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <t.icon className="h-5 w-5" />
                        </div>
                        <div className={`${BADGE} text-foreground`}>{t.tag}</div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-balance">{t.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t.body}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <List className="h-4 w-4" />
                          Guide
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Read <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Complete index */}
      <section id="all-lists" className="py-12 lg:py-16 border-t border-border scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHead icon={Library} title="Complete index — every list" count={index.length} unit="" />
          <p className="text-muted-foreground mb-6 text-sm">Alphabetical index of all {lists} list pages on BusinessIdea.io.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-1.5 text-sm">
            {index.map((l) => (
              <li key={l.href}>
                <a className="text-foreground/80 hover:text-primary hover:underline underline-offset-4 transition-colors" href={l.href}>
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-8">
            <div className={`${BADGE} text-foreground mb-3`}>FAQ</div>
            <h2 className="text-2xl md:text-3xl font-bold text-balance">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            <Faq q="What is the Lists hub?">
              A map of the BusinessIdea.io library: {total} published business ideas for India, grouped by who you are, the money you need to
              start, where and how you work, the industry and the way the business earns. Every linked card opens a category or subcategory page
              with the ideas inside.
            </Faq>
            <Faq q="Which list should I start with if I have under ₹25,000?">
              Open the By Budget section: {fmt(counts.byBand["zero"] ?? 0)} ideas need almost no money and{" "}
              {fmt((counts.byBand["zero"] ?? 0) + (counts.byBand["under_25k"] ?? 0))} need under ₹25,000. Then read the &ldquo;what you
              need&rdquo; part of each idea before buying anything.
            </Faq>
            <Faq q="Do you cover ideas for women, students, homemakers and senior citizens?">
              Yes. The Women Friendly, Student and Senior Citizen categories hold {fmt(counts.byCategory["C006"] ?? 0)},{" "}
              {fmt(counts.byCategory["C007"] ?? 0)} and {fmt(counts.byCategory["C008"] ?? 0)} ideas, and the By Who You Are section opens
              subcategories such as Homemaker Reselling and Retired Teacher Class.
            </Faq>
            <Faq q="Are the ideas in these lists validated?">
              No. Each idea explains who pays you, how the money comes in, what you need and what hurts in year one, but only buyers in your own
              town can confirm demand. Every idea page has a Validate button that copies a ready research prompt so you can check it yourself.
            </Faq>
            <Faq q="How often are the lists updated?">
              The counts on this page are read from the published library when the page loads, so a newly published idea is counted here
              without anyone editing this page.
            </Faq>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Have an idea? Validate it now</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Found an idea you like? Write down the buyer, the problem and a small offer in the validation workbench, then test it with real
            buyers before you invest time and money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/product" className={`${BTN_DARK} w-full sm:w-auto`}>
              <Rocket className="mr-2 h-5 w-5" />
              Validate Your Idea
            </a>
            <a href="/blueprints" className={`${BTN_LIGHT} w-full sm:w-auto`}>
              <Lightbulb className="mr-2 h-5 w-5" />
              Browse More Ideas
            </a>
          </div>
        </div>
      </section>

      {/* Key facts, for screen readers and language models */}
      <section aria-label="Key facts" className="sr-only">
        <h2>BusinessIdea.io Lists — Key Facts</h2>
        <ul>
          <li>Total lists: {lists}</li>
          <li>Total published business ideas: {total}</li>
          <li>Sections: by who you are, by budget, by place and work style, by industry, online and digital, business models, tools, strategy and money</li>
          <li>Audiences: women, students, homemakers, senior citizens, working professionals</li>
          <li>Budget tiers: {Object.values(BAND_LABEL).join(", ")}</li>
          <li>Counts are read live from the published library</li>
          <li>Each idea page has a Validate button that copies a ready research prompt</li>
          <li>Canonical URL: {canonicalUrl("/lists")}</li>
          <li>Terms: {canonicalUrl("/terms")}</li>
        </ul>
      </section>

      {/* Most-read */}
      <section className="py-12" aria-labelledby="most-read-heading">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 id="most-read-heading" className="text-2xl md:text-3xl font-bold">
              Lists and guides to read first
            </h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">Start with the pages that answer the first questions before choosing an idea.</p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {MOST_READ.map((m) => (
              <li key={m.href}>
                <a
                  className="group flex items-center justify-between gap-2 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors"
                  href={m.href}
                >
                  <span>{m.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </V2Frame>
  );
}
