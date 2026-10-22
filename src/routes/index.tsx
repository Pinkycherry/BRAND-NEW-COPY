import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Compass,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { catalogQuery } from "@/lib/catalog";
import { TAXONOMY } from "@/data/taxonomy";
import { GlassShell } from "@/components/glass-shell";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  head: () => ({
    meta: [
      { title: "BusinessIdea.io | Find a business idea that fits your real life" },
      {
        name: "description",
        content:
          "Explore 100 business idea categories and 1,000 focused paths. Understand who pays, how money works and what gets difficult before you begin.",
      },
      { property: "og:title", content: "BusinessIdea.io | A clearer way to begin" },
      {
        property: "og:description",
        content: "Honest, practical business ideas for people starting from zero.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
  errorComponent: () => (
    <div className="gh-error">
      <h1>The library could not load.</h1>
      <p>Please try again in a moment.</p>
      <a href="/browse">Browse categories</a>
    </div>
  ),
});

const entryPaths = [
  { label: "Work from home", match: "work-from-home-business-ideas", icon: "⌂" },
  { label: "Side hustles", match: "side-hustle-business-ideas", icon: "↗" },
  { label: "For students", match: "student-business-ideas", icon: "✳" },
  { label: "Small towns", match: "village-and-small-town-business-ideas", icon: "◌" },
  { label: "Food", match: "food-business-ideas", icon: "◈" },
  { label: "Online", match: "online-business-ideas", icon: "◎" },
];

const steps = [
  {
    number: "01",
    title: "Start with your situation",
    text: "Find a direction that fits your time, skills, place and budget. There is no need to know the industry first.",
  },
  {
    number: "02",
    title: "Read the honest version",
    text: "See who buys, how income works and what tends to hurt before you spend money.",
  },
  {
    number: "03",
    title: "Test one small step",
    text: "Use the guides and calculators to decide what to check locally before you commit.",
  },
];

const resourceLinks = [
  { title: "Run the numbers", description: "Start with a simple calculator.", to: "/calculator", icon: Calculator },
  { title: "Read a guide", description: "Learn one practical next step.", to: "/startup-guides", icon: BookOpen },
  { title: "Learn the language", description: "Plain-English business terms.", to: "/founder-glossary", icon: Compass },
] as const;

function HomePage() {
  const { data: catalog } = useSuspenseQuery(catalogQuery);
  const [query, setQuery] = useState("");
  const [surprise, setSurprise] = useState<{ categorySlug: string; subcategorySlug: string; category: string; name: string } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const featured = entryPaths
    .map((entry) => ({ ...entry, category: TAXONOMY.find((category) => category.slug === entry.match) }))
    .filter((entry) => Boolean(entry.category));
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];
    return TAXONOMY.filter((category) => category.name.toLowerCase().includes(needle)).slice(0, 6);
  }, [query]);

  const drawSurprise = () => {
    const category = TAXONOMY[Math.floor(Math.random() * TAXONOMY.length)];
    if (!category) return;
    const subcategory = category.subcategories[Math.floor(Math.random() * category.subcategories.length)];
    if (!subcategory) return;
    setSurprise({ categorySlug: category.slug, subcategorySlug: subcategory.slug, category: category.name, name: subcategory.name });
    document.getElementById("gh-surprise")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <GlassShell>
        <section className="gh-hero" aria-labelledby="gh-title">
          <div className="gh-hero-copy">
            <span className="gh-kicker"><span className="gh-kicker-dot" /> YOUR NEXT CHAPTER STARTS HERE</span>
            <h1 id="gh-title">A business idea that fits <em>your life.</em></h1>
            <p className="gh-lede">Explore practical ideas for the time, money and skills you have. Get the honest details before you decide what to build.</p>
            <div className="gh-hero-actions">
              <Link to="/browse" className="gh-button gh-button-primary">Browse the library <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <button className="gh-button gh-button-secondary" type="button" onClick={drawSurprise}><Sparkles size={18} aria-hidden="true" /> Surprise me</button>
            </div>
            <div className="gh-hero-proof" aria-label="Library structure">
              <div><strong>{catalog.totalCategories}</strong><span>main categories</span></div>
              <div className="gh-proof-rule" aria-hidden="true" />
              <div><strong>{catalog.totalSubcategories.toLocaleString("en-IN")}</strong><span>focused paths</span></div>
              <div className="gh-proof-rule" aria-hidden="true" />
              <div><strong>₹0</strong><span>to browse</span></div>
            </div>
          </div>
          <div className="gh-hero-art" aria-label="An abstract glowing idea map" role="img">
            <div className="gh-art-halo gh-art-halo-one" />
            <div className="gh-art-halo gh-art-halo-two" />
            <div className="gh-art-core">
              <span className="gh-art-label">YOUR POSSIBILITIES</span>
              <span className="gh-art-line gh-art-line-one" />
              <span className="gh-art-line gh-art-line-two" />
              <span className="gh-art-line gh-art-line-three" />
              <span className="gh-art-spark">✦</span>
            </div>
            <div className="gh-float gh-float-one"><span className="gh-float-icon">✳</span><span><small>BEGIN WITH</small><strong>what you have</strong></span></div>
            <div className="gh-float gh-float-two"><span className="gh-float-icon">↗</span><span><small>MOVE TOWARD</small><strong>what could work</strong></span></div>
            <div className="gh-float gh-float-three"><span className="gh-mini-dot" /><span>One clear next step</span></div>
          </div>
        </section>

        <div className="gh-trust-line"><ShieldCheck size={17} aria-hidden="true" /><span>Research you can question. Clear risks you can see. No pressure to choose today.</span></div>

        <section className="gh-section gh-discovery" aria-labelledby="gh-explore-title">
          <div className="gh-section-head">
            <div><p className="gh-eyebrow">FIND YOUR WAY IN</p><h2 id="gh-explore-title">Start where you are.</h2><p>Choose a familiar starting point, or search across the full category map.</p></div>
            <Link to="/browse" className="gh-text-link">See all {catalog.totalCategories} categories <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="gh-search-wrap">
            <Search size={21} aria-hidden="true" />
            <label className="gh-sr-only" htmlFor="gh-search">Search categories</label>
            <input id="gh-search" value={query} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} placeholder="Try “work from home” or “food”" autoComplete="off" />
            {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); setSearchOpen(false); }}><X size={18} /></button>}
            {searchOpen && query.trim().length >= 2 && (
              <div className="gh-search-results">
                {matches.length ? matches.map((category) => (
                  <Link key={category.slug} to="/category/$categorySlug" params={{ categorySlug: category.slug }} onClick={() => setSearchOpen(false)}>{category.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>
                )) : <p>No matching category. <Link to="/search">Search all ideas</Link></p>}
              </div>
            )}
          </div>
          <div className="gh-category-grid">
            {featured.map((entry, index) => entry.category && (
              <Link key={entry.match} to="/category/$categorySlug" params={{ categorySlug: entry.category.slug }} className={"gh-category-card gh-category-" + index}>
                <span className="gh-category-top"><span className="gh-category-symbol" aria-hidden="true">{entry.icon}</span><ArrowUpRight size={20} aria-hidden="true" /></span>
                <span className="gh-category-title">{entry.category.short}</span>
                <span className="gh-category-bottom">{entry.category.subcategories.length} focused paths <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section id="gh-surprise" className="gh-section gh-surprise" aria-labelledby="gh-surprise-title">
          <div className="gh-surprise-orb" aria-hidden="true">✳</div>
          <div><p className="gh-eyebrow">A LITTLE SERENDIPITY</p><h2 id="gh-surprise-title">Not sure where to begin?</h2><p>Let the library open one real subcategory. If it is not for you, draw another.</p></div>
          <div className="gh-surprise-action">
            <button className="gh-button gh-button-dark" type="button" onClick={drawSurprise}>Find a direction <ArrowUpRight size={18} aria-hidden="true" /></button>
            {surprise && <Link className="gh-surprise-pick" to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: surprise.categorySlug, subcategorySlug: surprise.subcategorySlug }}><small>{surprise.category}</small><strong>{surprise.name}</strong><span>Explore this path <ArrowRight size={16} aria-hidden="true" /></span></Link>}
          </div>
        </section>

        <section className="gh-section gh-process" aria-labelledby="gh-process-title">
          <div className="gh-section-head"><div><p className="gh-eyebrow">HOW IT WORKS</p><h2 id="gh-process-title">Less guessing. Better first steps.</h2></div><p>No perfect founder story required. Just a useful place to begin.</p></div>
          <div className="gh-steps">{steps.map((step) => <article key={step.number} className="gh-step"><span className="gh-step-number">{step.number}</span><span className="gh-step-orb" aria-hidden="true">✦</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </section>

        <section className="gh-section gh-honesty" aria-labelledby="gh-honesty-title">
          <div className="gh-honesty-visual" aria-hidden="true"><span className="gh-honesty-ring"><span>?</span></span><span className="gh-honesty-chip gh-chip-one">Who pays?</span><span className="gh-honesty-chip gh-chip-two">What is hard?</span><span className="gh-honesty-chip gh-chip-three">First customer?</span></div>
          <div><p className="gh-eyebrow">THE HONEST VERSION</p><h2 id="gh-honesty-title">An idea is only useful when the difficult parts are visible.</h2><p>Each published blueprint should help you judge the customer, the money and the first obstacles. If a subcategory is still filling up, we say so.</p><Link to="/browse" className="gh-text-link">Explore the library <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </section>

        <section className="gh-section gh-toolkit" aria-labelledby="gh-toolkit-title">
          <div className="gh-section-head"><div><p className="gh-eyebrow">YOUR FOUNDER TOOLKIT</p><h2 id="gh-toolkit-title">Make the next move clearer.</h2><p>Use what is already here, whenever you need it.</p></div></div>
          <div className="gh-resource-grid">{resourceLinks.map(({ title, description, to, icon: Icon }) => <Link key={title} to={to} className="gh-resource"><span className="gh-resource-icon"><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span><ArrowUpRight className="gh-resource-arrow" size={20} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></Link>)}</div>
        </section>

        <section className="gh-section gh-final" aria-labelledby="gh-final-title"><div className="gh-final-glow" aria-hidden="true" /><p className="gh-eyebrow">TAKE YOUR TIME. START SOMEWHERE.</p><h2 id="gh-final-title">Your next idea might begin with one better question.</h2><p>Browse the paths, read the hard parts, and decide what deserves a small test.</p><div className="gh-final-actions"><Link to="/browse" className="gh-button gh-button-primary">Explore ideas <ArrowUpRight size={18} aria-hidden="true" /></Link><Link to="/contact" className="gh-button gh-button-secondary">Ask us a question</Link></div></section>
    </GlassShell>
  );
}
