import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Github, Mail, Menu, Search, Twitter, X } from "lucide-react";

import "./v2.css";

/**
 * Header and footer of the purchased page architecture, converted to React.
 * Names, menus and sections are as supplied (markup from the page files,
 * menu contents from the founder's screenshots). Framework only: every link
 * is inert (#), no images, no currency amounts, no US/UK items.
 */

const NO_LINK = "#";

type Item = string | [label: string, note: string];

function A({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <a href={NO_LINK} className={className}>
      {children}
    </a>
  );
}

function Banner({ tone = "", title, sub }: { tone?: string; title: string; sub: string }) {
  return (
    <A className={`bm-banner ${tone}`}>
      <i className="ic" />
      <div>
        <b>{title}</b>
        <span>{sub}</span>
      </div>
    </A>
  );
}

function Links({ items, className = "bm-list" }: { items: string[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((t) => (
        <A key={t}>{t}</A>
      ))}
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
              <A key={t} className="bm-tile">{t}</A>
            ))}
            <A className="bm-tile">VIEW ALL<br />11 generators →</A>
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
          <Banner tone="o" title="All 55 Lists" sub="1,798+ ideas across 30 industries" />
          <Links items={["AI Startup Ideas", "B2B SaaS Ideas", "Micro-SaaS Ideas", "Online Business", "Dropshipping", "Side Hustles", "Fintech Ideas", "For Women", "Low Investment", "Passive Income"]} />
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

/* Footer sections in the seller's order. Contents from the screenshots; the
   four sections with no screenshot yet show their name only. */
const FOOTER: [string, string[]][] = [
  ["Product", ["AI Business Idea Validator", "AI Market Research Tool", "AI Business Plan Generator", "AI Competitor Analysis", "Features", "Connect AI Assistants", "Pricing & Plans"]],
  ["Free Tools", ["All Free Tools (1,000+)", "Launch Directories (867)", "Tier 1 Directories", "Free Submission Sites", "Startup Idea Generator", "Business Name Generator", "Lean Canvas Generator", "Business Plan Templates"]],
  ["Tools Directory", ["Validation & Research", "No-Code Builders", "Landing Pages", "SEO Tools", "Marketing Automation", "Fundraising & Investors", "Analytics", "Launch Directories"]],
  ["Marketing Suite", ["Brand Strategy", "Logo Generator", "Marketing Suite", "Ad Creatives", "Visual Identity"]],
  ["Calculators", ["Startup Cost Calculator", "Runway Calculator", "Break-Even Calculator", "Market Size Calculator", "Funding Calculator", "ROI Calculator", "CAC Calculator", "LTV Calculator", "Equity Calculator", "Validation ROI Calculator"]],
  ["Templates", ["Business Plan Templates", "Pitch Deck Templates", "Competitive Analysis", "Customer Persona", "Interview Script"]],
  ["Industry Validators", ["SaaS Validator", "E-commerce Validator", "Mobile App Validator", "Fintech Validator", "Healthtech Validator", "Edtech Validator", "Marketplace Validator", "PropTech Validator", "FoodTech Validator", "TravelTech Validator"]],
  ["Resources", ["Blog & Insights", "Terminology Glossary", "Validation FAQ", "Startup Questions", "Success Stories", "About BusinessIdea.io", "Contact Support", "Validation Templates", "Frameworks Comparison", "Funding FAQ"]],
  ["Guides", ["Product-Market Fit Guide", "Pre-Seed Funding Guide", "Business Model Canvas", "Validation Guide", "SaaS Validation Guide", "Validation Mistakes", "All Guides →"]],
  ["Compare", []],
  ["Startup Ideas", []],
  ["New Idea Lists (750+)", []],
  ["Ideas by Demographic", ["For Women", "For College Students", "For Retirees", "For Introverts", "For Developers", "For Teachers"]],
  ["Ideas by Budget", ["Zero-Cost Ideas", "Low Overhead", "High Profit Low Investment", "Million Dollar Ideas"]],
  ["Ideas by Industry", ["Food Business", "Food Truck Ideas", "Real Estate", "Beauty Business", "Fitness Business", "Cleaning Business"]],
  ["Ideas by Location", ["Home-Based", "Work From Home", "Digital Nomad", "Small Town", "Part-Time", "Solo Business"]],
  ["Failure Analysis", ["Failure Database (1000+)", "Failures by Country (Hub)", "Why Startups Fail", "Biggest Failures Ever", "Failure Analysis", "AI Pattern Analysis", "Failed vs Successful", "2025 Failure Report", "Fintech Failures", "AI Startup Failures", "Failed Startups Europe"]],
  ["Research Datasets", ["Open Source Ledger (1,665)", "Supabase vs Firebase", "SaaS Pricing Benchmarks (181)", "SaaS Pricing Patterns", "Notion Pricing", "Slack Pricing", "Ranked Business Ideas (50)", "Niche B2B Micro-SaaS", "AI Agents Business Idea"]],
  ["Topics", []],
];

function FooterGroup({ label, items, id }: { label: string; items: string[]; id: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-state={open ? "open" : "closed"} data-orientation="vertical" className="border-b border-slate-200/80">
      <h3 data-orientation="vertical" data-state={open ? "open" : "closed"} className="flex">
        <button
          type="button"
          aria-controls={`v2-footer-${id}`}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex flex-1 items-center justify-between transition-all text-[13px] font-medium text-slate-700 hover:no-underline py-3"
        >
          {label}
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200${open ? " rotate-180" : ""}`} />
        </button>
      </h3>
      <div id={`v2-footer-${id}`} hidden={!open} role="region" className="overflow-hidden text-sm transition-all">
        <div className="bm-foot-list">
          {items.map((t) => (
            <A key={t}>{t}</A>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="min-h-[320px] v2">
      <footer className="relative bg-slate-50/50 text-slate-900 overflow-hidden border-t border-slate-200/80" role="contentinfo">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-[#fafaf7] to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-[60%] max-w-3xl -translate-x-1/2" style={{ background: "linear-gradient(to right, transparent, rgba(124, 58, 237, 0.22), transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Logo footer />
              <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-[320px]">Data-driven validation for the modern entrepreneur.</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-full border border-emerald-200/60">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                All Systems Operational
              </div>
              <div className="mt-5 flex gap-2">
                {[Twitter, Github, Mail].map((Icon, i) => (
                  <A key={i} className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-400 hover:text-brand-600 transition-colors border border-slate-200/80 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </A>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid w-full gap-x-8 md:grid-cols-2 lg:grid-cols-3" data-orientation="vertical">
                {FOOTER.map(([label, items], i) => (
                  <FooterGroup key={label} label={label} items={items} id={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 BusinessIdea.io — All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Startup Transparency", "Site Map"].map((t) => (
                <A key={t} className="hover:text-brand-600 transition-colors">{t}</A>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
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
