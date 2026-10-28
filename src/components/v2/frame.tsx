import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { TAXONOMY } from "@/data/taxonomy";

import "./v2.css";

/**
 * Header and footer of the purchased page architecture, converted to React.
 * Names, menus and sections are as supplied (markup from the page files,
 * menu contents from the founder's screenshots). Framework only: every link
 * is inert (#), no images, no currency amounts, no US/UK items.
 */

const NO_LINK = "#";

type Item = string | [label: string, note: string];

function A({ children, className, href }: { children: ReactNode; className?: string | undefined; href?: string | undefined }) {
  return (
    <a href={href ?? NO_LINK} className={className}>
      {children}
    </a>
  );
}

function Banner({ tone = "", title, sub, href }: { tone?: string; title: string; sub: string; href?: string }) {
  return (
    <A className={`bm-banner ${tone}`} href={href}>
      <i className="ic" />
      <div>
        <b>{title}</b>
        <span>{sub}</span>
      </div>
    </A>
  );
}

/** Items are seller placeholders (plain text, inert) unless a real page of ours matches. */
const OURS: Record<string, string> = {
  "Break-even": "/calculator/break-even",
  Funding: "/calculator/funding-needed",
  ROI: "/calculator/roi",
  "Startup Cost": "/calculator/startup-cost",
};

function Links({ items, className = "bm-list" }: { items: (string | [string, string])[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((x) => {
        const [t, href] = typeof x === "string" ? [x, OURS[x]] : x;
        return (
          <A key={t} href={href}>
            {t}
          </A>
        );
      })}
    </div>
  );
}

function Counted({ items }: { items: Item[] }) {
  return (
    <div className="bm-items">
      {items.map((x) => {
        const [t, n] = typeof x === "string" ? [x, ""] : x;
        return (
          <A key={t}>
            <span>{t}</span>
            {n === "NEW" ? <span className="bm-new">NEW</span> : n ? <small>{n}</small> : null}
          </A>
        );
      })}
    </div>
  );
}

function Hero({ tone = "", badge, badgeTone = "", icon, title, body, cta }: { tone?: string; badge: string; badgeTone?: string; icon: string; title: string; body: string[]; cta: string }) {
  return (
    <div className={`bm-hero ${tone}`}>
      <span className={`bm-badge ${badgeTone}`}>{badge}</span>
      <div className="ic">{icon}</div>
      <h4>{title}</h4>
      {body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <A className="bm-btn">{cta}</A>
    </div>
  );
}

/** Our broad idea categories for Learn > Startup ideas, from the approved taxonomy. */
const OUR_IDEAS: [string, string][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
  const c = TAXONOMY.find((x) => x.n === n);
  return [c?.short ?? "", c ? `/category/${c.slug}` : "/browse"];
});

function ValidatePanel() {
  return (
    <>
      <div>
        <Hero badge="1 FREE VALIDATION" icon="✓" title="AI Idea Validator" body={["Instant score, market size & competitor map in 60 seconds.", "★ 4.9 · 30k+ founders validated"]} cta="Start free →" />
        <div className="bm-label">Popular searches</div>
        <Links items={["Free Validator", "Competitor Analysis", "Startup Failure Database", "Validate Marketplace", "Business Plan Generator"]} />
      </div>
      <div className="bm-cols" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <div className="bm-label bm-dot" style={{ marginTop: 0 }}>AI Generators (11)</div>
          <div className="bm-tiles">
            {["Idea Generator", "Business Name", "Validator", "Market Research", "Lean Canvas", "Business Plan", "Brand Strategy", "Logo Generator", "Visual Identity", "Marketing Suite", "Ad Creatives"].map((t) => (
              <A key={t} className="bm-tile"><i />{t}</A>
            ))}
            <A className="bm-tile"><i className="bm-tile-more">→</i>VIEW ALL<br />11 generators →</A>
          </div>
        </div>
        <div>
          <div className="bm-label bm-dot" style={{ marginTop: 0 }}>Validation reports (20)</div>
          <Banner title="All validation reports" sub="Industry-specific report landings" />
          <div className="bm-pdfs">
            {["The HealthTech Founder's Field Guide 2026", "The LegalTech Founder's Field Guide 2026", "Why 90% of Startups Fail in 2026"].map((t) => (
              <A key={t} className="bm-pdf"><div>{t}</div></A>
            ))}
          </div>
          <div className="bm-cols" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <div><div className="bm-label" style={{ margin: "0 0 4px" }}>Tech</div><Links items={["SaaS", "B2B SaaS", "AI / ML", "Mobile App", "GameTech"]} /></div>
            <div><div className="bm-label" style={{ margin: "0 0 4px" }}>Business</div><Links items={["E-commerce", "Marketplace", "Fintech", "HRTech", "LegalTech"]} /></div>
            <div><div className="bm-label" style={{ margin: "0 0 4px" }}>Vertical</div><Links items={["HealthTech", "EdTech", "PropTech", "FoodTech", "TravelTech"]} /></div>
          </div>
          <A className="bm-pill">See all 20 reports →</A>
        </div>
      </div>
    </>
  );
}

function LearnPanel() {
  return (
    <>
      <div>
        <Hero tone="orange" badge="1,798+ IDEAS" badgeTone="o" icon="💡" title="Ideas Database" body={["1,798+ validated startup ideas across 30 industries."]} cta="Browse →" />
        <div className="bm-label">Authority 2026</div>
        <Links items={["Best Validators 2026", "Best AI Validation Tools", "Best Market Research", "Frameworks Comparison", "Research Methodology", "About BusinessIdea.io"]} />
      </div>
      <div className="bm-cols" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div>
          <div className="bm-label bm-dot o" style={{ marginTop: 0 }}>Startup ideas</div>
          <Banner tone="o" title="All Idea Lists" sub="Every business idea list in one place" href="/lists" />
          <Links items={OUR_IDEAS} />
        </div>
        <div>
          <div className="bm-label bm-dot r" style={{ marginTop: 0 }}>Failures (1000+)</div>
          <Banner tone="r" title="All Failures Database" sub="1000+ post-mortems & lessons" />
          <Counted items={[["All Countries Hub", "(15)"], "Why Startups Fail", "Biggest Ever", "AI Pattern Analysis", "Failed vs Successful", "How to Avoid Failure", "Failure Analysis Hub", ["Yearly Report 2026", "NEW"], "Yearly Report 2025"]} />
          <div className="bm-label">By industry</div>
          <Links className="bm-two bm-list" items={["Fintech", "AI Startups", "EV & Auto", "E-commerce"]} />
          <A className="bm-pill">See all industries →</A>
        </div>
        <div>
          <div className="bm-label bm-dot b" style={{ marginTop: 0 }}>Knowledge</div>
          <Banner tone="b" title="Startup Knowledge Hub" sub="The complete BusinessIdea.io index" />
          <Counted items={[["Guides", "(15)"], ["Questions", "(100+)"], "Glossary", "Compare Tools", "Feature Matrix", "Versus Pages", "Frameworks", "Case Studies", "Industry Benchmarks", "Fundraising Benchmarks", "Funding FAQ", "Blog", "Changelog"]} />
        </div>
      </div>
    </>
  );
}

function ToolsPanel() {
  return (
    <>
      <div>
        <Hero badge="14 TOOLS" badgeTone="p" icon="✓" title="All AI Generators" body={["14 AI tools for validation, brand, marketing & launch."]} cta="Browse generators →" />
        <div className="bm-label">Popular generators</div>
        <Links items={["Idea Generator", "AI Idea Validator", "Brand Strategy"]} />
      </div>
      <div className="bm-cols" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div>
          <div className="bm-label bm-dot g" style={{ marginTop: 0 }}>Calculators (10)</div>
          <Banner tone="g" title="All Calculators" sub="10 free finance & growth calculators" />
          <Links className="bm-two bm-list" items={["Runway", "CAC", "LTV", "Valuation", "Break-even", "Equity Split", "Funding", "ROI", "Market Size", "Startup Cost"]} />
        </div>
        <div>
          <div className="bm-label bm-dot pk" style={{ marginTop: 0 }}>Templates</div>
          <Banner tone="pk" title="All Templates" sub="Pitch deck, plans, interviews & more" />
          <Links items={["Pitch Deck", "Business Plan", "Competitive Analysis", "Customer Persona", "Validation Interview Script", "Validation Templates"]} />
          <A className="bm-pill g">All Resources →</A>
        </div>
        <div>
          <div className="bm-label bm-dot g" style={{ marginTop: 0 }}>Free tools directory (1,060+)</div>
          <Banner tone="g" title="Browse all tools" sub="1,060+ tools across 30 categories" />
          <Links className="bm-two bm-list" items={["Validation & Research", "No-Code Builders", "AI Assistants", "Design & UI", "SEO Tools", "Fundraising"]} />
          <A className="bm-pill g">See all 30 categories →</A>
          <div className="bm-label bm-dot">Startup directories (867)</div>
          <Banner title="Where to submit your startup" sub="867 directories with DR, link type & ..." />
          <Links className="bm-two bm-list" items={["Tier 1 picks", "Dofollow links", "Free to submit", "DR 70+ sites", "AI directories", "PH alternatives"]} />
        </div>
      </div>
    </>
  );
}

const MEGA = [
  { label: "Validate", Panel: ValidatePanel },
  { label: "Learn", Panel: LearnPanel },
  { label: "Free Tools", Panel: ToolsPanel },
];

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <A className="flex items-center gap-3 cursor-pointer group">
      <span
        className={
          footer
            ? "text-base sm:text-lg tracking-tight text-slate-900 whitespace-nowrap font-sans font-bold"
            : "text-display-lg tracking-tight transition-all duration-500 whitespace-nowrap shrink-0 hidden [@media(min-width:380px)]:inline text-base sm:text-lg text-slate-900"
        }
      >
        Business<span className="text-brand-500">Idea</span>.io
      </span>
    </A>
  );
}

export function Header({ active: _active }: { active?: string | undefined }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const show = (i: number) => {
    cancel();
    setOpen(i);
  };
  const hideSoon = () => {
    cancel();
    timer.current = setTimeout(() => setOpen(null), 150);
  };

  useEffect(() => {
    const out = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", out);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", out);
      document.removeEventListener("keydown", esc);
      cancel();
    };
  }, []);

  const Panel = open === null ? null : MEGA[open]?.Panel;

  return (
    <div ref={ref} className="v2">
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 py-4 pointer-events-none">
        <div className="mx-auto flex items-center justify-between rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto relative overflow-visible glass-nav-scrolled max-w-6xl px-6 h-16">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-3/4 opacity-100" />
          <Logo />
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-600">
            {MEGA.map((m, i) => (
              <div key={m.label} data-mega-menu="true" onMouseEnter={() => show(i)} onMouseLeave={hideSoon}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-haspopup="true"
                  onClick={() => (open === i ? setOpen(null) : show(i))}
                  className={`px-4 py-2 rounded-full hover:bg-slate-100 hover:text-brand-600 transition-all flex items-center gap-1 relative${open === i ? " text-brand-600 bg-slate-100" : ""}`}
                >
                  {m.label}
                  <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-300${open === i ? " rotate-180" : ""}`} />
                  {open === i && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-brand-500 rounded-full" />}
                </button>
              </div>
            ))}
            <A className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-brand-600 transition-all relative">Pricing</A>
            <button type="button" aria-label="Search (⌘K)" title="Search (⌘K)" className="ml-1 p-2 rounded-full hover:bg-slate-100 hover:text-brand-600 transition-all">
              <Search className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <A className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Login</A>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 min-h-[44px] touch-manipulation active:scale-[0.98] active:opacity-90 text-white h-11 btn-primary px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all font-semibold">
              <span className="sm:hidden">Sign up</span>
              <span className="hidden sm:inline">Get Report</span>
            </button>
            <button type="button" aria-label="Search" className="lg:hidden text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button
              className="lg:hidden text-slate-900 hover:bg-slate-100 p-2 relative z-50 rounded-lg transition-colors"
              aria-label={mobile ? "Close navigation menu" : "Open navigation menu"}
              type="button"
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {Panel && (
        <div className="bm-panel open" onMouseEnter={cancel} onMouseLeave={hideSoon}>
          <Panel />
        </div>
      )}

      {mobile && (
        <div className="lg:hidden fixed inset-x-4 top-24 z-40 glass-nav-scrolled rounded-2xl p-5 max-h-[75vh] overflow-y-auto">
          {MEGA.map((m) => (
            <A key={m.label} className="block py-2 text-sm font-semibold text-slate-800">{m.label}</A>
          ))}
          <A className="block py-2 text-sm font-semibold text-slate-800">Pricing</A>
          <A className="block py-2 text-sm font-semibold text-slate-800">Login</A>
        </div>
      )}
    </div>
  );
}

type L = { label: string; href: string };

const LEGAL: L[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Site Map", href: "/sitemap" },
];

export function Footer() {
  return (
    <footer className="v2 v2-footer" role="contentinfo">
      <div className="v2-footer-inner">
        <div className="v2-footer-top">
          <div className="v2-footer-brand">
            <Logo footer />
            <p>A free library of researched business ideas for India: who pays you, how the money works and what hurts in year one.</p>
            <div className="v2-footer-actions">
              <a href="/browse">Browse ideas</a>
              <a href="/lists">Idea lists</a>
              <a href="/product">Validate an idea</a>
            </div>
          </div>
          <div className="v2-footer-cats">
            <h3>Business idea categories</h3>
            <ul>
              {TAXONOMY.map((c) => (
                <li key={c.slug}>
                  <a href={`/category/${c.slug}`}>{c.short}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <p>© {new Date().getFullYear()} BusinessIdea.io</p>
          <nav aria-label="Footer">
            {LEGAL.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function V2Frame({ active, children }: { active?: string | undefined; children: ReactNode }) {
  return (
    <div className="v2 min-h-screen flex flex-col bg-background">
      <Header active={active} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
