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

function Links({ items, className = "bm-list" }: { items: (string | [string, string])[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((x) => {
        const [t, href] = typeof x === "string" ? [x, undefined] : x;
        return (
          <A key={t} href={href}>
            {t}
          </A>
        );
      })}
    </div>
  );
}

function Hero({ tone = "", badge, badgeTone = "", icon, title, body, cta, href }: { tone?: string; badge: string; badgeTone?: string; icon: string; title: string; body: string[]; cta: string; href: string }) {
  return (
    <div className={`bm-hero ${tone}`}>
      <span className={`bm-badge ${badgeTone}`}>{badge}</span>
      <div className="ic">{icon}</div>
      <h4>{title}</h4>
      {body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <A className="bm-btn" href={href}>
        {cta}
      </A>
    </div>
  );
}

/** Category n (1-100) from the approved taxonomy as [label, link]. */
function cat(n: number, label?: string): [string, string] {
  const c = TAXONOMY.find((x) => x.n === n);
  return [label ?? c?.short ?? "", c ? `/category/${c.slug}` : "/browse"];
}

/** Our broad idea categories for Learn > Startup ideas, from the approved taxonomy. */
const OUR_IDEAS: [string, string][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => cat(n));

function Tile({ label, href }: { label: string; href: string }) {
  return (
    <A className="bm-tile" href={href}>
      <i />
      {label}
    </A>
  );
}

function Pdf({ title, sub, href }: { title: string; sub: string; href: string }) {
  return (
    <A className="bm-pdf" href={href}>
      <div>
        {title}
        <em>{sub}</em>
      </div>
    </A>
  );
}

export function ValidatePanel() {
  return (
    <>
      <div>
        <Hero badge="FREE" icon="✓" title="Validation Workbench" body={["Write your buyer, their problem and a small first offer on one page.", "Then test it with real buyers before you spend."]} cta="Start free →" href="/product" />
        <div className="bm-label">Popular checks</div>
        <Links
          items={[
            ["How to validate an idea", "/startup-idea-validation"],
            ["Test demand", "/business-demand-test-india"],
            ["Business idea risk check", "/business-idea-risk-check"],
            ["Compare two ideas", "/startup-idea-comparison"],
            ["Find your first customer", "/first-customer-india"],
          ]}
        />
      </div>
      <div className="bm-cols" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <div className="bm-label bm-dot" style={{ marginTop: 0 }}>Founder tools (11)</div>
          <div className="bm-tiles">
            <Tile label="Startup Cost" href="/calculator/startup-cost" />
            <Tile label="Break-even" href="/calculator/break-even" />
            <Tile label="Return on Investment" href="/calculator/roi" />
            <Tile label="Funding Needed" href="/calculator/funding-needed" />
            <Tile label="Unit Economics" href="/unit-economics-india" />
            <Tile label="Cash Flow" href="/startup-cash-flow-india" />
            <Tile label="Pricing" href="/business-pricing-india" />
            <Tile label="Launch Plan" href="/startup-launch-plan-india" />
            <Tile label="Research Desk" href="/business-idea-research-india" />
            <Tile label="Time Fit" href="/business-idea-time-fit" />
            <Tile label="Decision Journal" href="/founder-decision-journal" />
            <A className="bm-tile" href="/calculator">
              <i className="bm-tile-more">→</i>VIEW ALL<br />calculators →
            </A>
          </div>
        </div>
        <div>
          <div className="bm-label bm-dot" style={{ marginTop: 0 }}>Founder guides</div>
          <Banner title="All startup guides" sub="Step-by-step guides for first-time founders" href="/startup-guides" />
          <div className="bm-pdfs">
            <Pdf title="Startup Costs in India" sub="What leaves your pocket first" href="/startup-costs-india" />
            <Pdf title="Business Models in India" sub="How an idea earns" href="/business-models-india" />
            <Pdf title="When to Pivot or Stop" sub="Reading the evidence" href="/business-idea-pivot-or-stop" />
            <Pdf title="Your First Customer" sub="Reach one real buyer" href="/first-customer-india" />
          </div>
          <div className="bm-cols" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <div>
              <div className="bm-label" style={{ margin: "0 0 4px" }}>By place</div>
              <Links items={[cat(1), cat(5), cat(9, "Small Town"), cat(10), cat(4)]} />
            </div>
            <div>
              <div className="bm-label" style={{ margin: "0 0 4px" }}>For you</div>
              <Links items={[cat(6, "Women"), cat(7, "Students"), cat(8, "Senior Citizens"), cat(14, "Parents"), cat(11, "Skilled People")]} />
            </div>
            <div>
              <div className="bm-label" style={{ margin: "0 0 4px" }}>By industry</div>
              <Links items={[cat(16), cat(27), cat(30), cat(37), cat(47)]} />
            </div>
          </div>
          <A className="bm-pill" href="/browse">See all 100 categories →</A>
        </div>
      </div>
    </>
  );
}

export function LearnPanel() {
  return (
    <>
      <div>
        <Hero tone="orange" badge="100 CATEGORIES" badgeTone="o" icon="💡" title="Business Ideas Database" body={["Researched business ideas for India, sorted into 100 categories."]} cta="Browse →" href="/browse" />
        <div className="bm-label">Start here</div>
        <Links
          items={[
            ["Business ideas in India", "/business-ideas-india"],
            ["Side business ideas", "/side-business-ideas-india"],
            ["Local business ideas", "/local-business-ideas-india"],
            ["Online business ideas", "/online-business-ideas-india"],
            ["Service business ideas", "/service-business-ideas-india"],
            ["Product business ideas", "/product-business-ideas-india"],
          ]}
        />
      </div>
      <div className="bm-cols" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div>
          <div className="bm-label bm-dot o" style={{ marginTop: 0 }}>Startup ideas</div>
          <Banner tone="o" title="All Idea Lists" sub="Every business idea list in one place" href="/lists" />
          <Links items={OUR_IDEAS} />
        </div>
        <div>
          <div className="bm-label bm-dot r" style={{ marginTop: 0 }}>Money and risk</div>
          <Banner tone="r" title="Startup Costs" sub="What you spend before the first sale" href="/startup-costs-india" />
          <Links
            items={[
              ["Cash flow", "/startup-cash-flow-india"],
              ["Unit economics", "/unit-economics-india"],
              ["Pricing your offer", "/business-pricing-india"],
              ["Business models", "/business-models-india"],
              ["Risk check", "/business-idea-risk-check"],
              ["Pivot or stop", "/business-idea-pivot-or-stop"],
              ["Launch plan", "/startup-launch-plan-india"],
            ]}
          />
          <div className="bm-label">More categories</div>
          <Links className="bm-two bm-list" items={[cat(17), cat(19), cat(28), cat(38)]} />
          <A className="bm-pill" href="/browse">See all 100 categories →</A>
        </div>
        <div>
          <div className="bm-label bm-dot b" style={{ marginTop: 0 }}>Knowledge</div>
          <Banner tone="b" title="Startup Guides" sub="Step-by-step guides for founders" href="/startup-guides" />
          <Links
            items={[
              ["Glossary", "/founder-glossary"],
              ["Startup terms", "/startup-terms-india"],
              ["Founder stories", "/founder-stories"],
              ["Journal", "/blog"],
              ["Reading room", "/business-idea-reading-room"],
              ["Learning resources", "/learning-resources"],
              ["Research desk", "/business-idea-research-india"],
              ["Our founders", "/founders"],
              ["About us", "/about"],
              ["Contact", "/contact"],
            ]}
          />
        </div>
      </div>
    </>
  );
}

export function ToolsPanel() {
  return (
    <>
      <div>
        <Hero badge="FREE" badgeTone="p" icon="✓" title="Founder Toolkit" body={["Pick a founder question and work it through with your own numbers."]} cta="Open the toolkit →" href="/business-idea-toolkit" />
        <div className="bm-label">Popular tools</div>
        <Links
          items={[
            ["Startup cost calculator", "/calculator/startup-cost"],
            ["Break-even calculator", "/calculator/break-even"],
            ["Validation workbench", "/product"],
          ]}
        />
      </div>
      <div className="bm-cols" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div>
          <div className="bm-label bm-dot g" style={{ marginTop: 0 }}>Calculators</div>
          <Banner tone="g" title="All Calculators" sub="Free money calculators for founders" href="/calculator" />
          <Links
            className="bm-two bm-list"
            items={[
              ["Startup Cost", "/calculator/startup-cost"],
              ["Break-even", "/calculator/break-even"],
              ["ROI", "/calculator/roi"],
              ["Funding Needed", "/calculator/funding-needed"],
              ["Unit Economics", "/unit-economics-india"],
              ["Cash Flow", "/startup-cash-flow-india"],
            ]}
          />
        </div>
        <div>
          <div className="bm-label bm-dot pk" style={{ marginTop: 0 }}>Worksheets</div>
          <Banner tone="pk" title="Templates" sub="Plans, interviews and more" href="/templates" />
          <Links
            items={[
              ["Launch plan", "/startup-launch-plan-india"],
              ["Demand test", "/business-demand-test-india"],
              ["Compare two ideas", "/startup-idea-comparison"],
              ["Decision journal", "/founder-decision-journal"],
              ["Weekend stall profit check", "/weekend-market-stall-profit-check"],
              ["Coaching batch check", "/coaching-batch-business-idea-india"],
            ]}
          />
          <A className="bm-pill g" href="/learning-resources">All Resources →</A>
        </div>
        <div>
          <div className="bm-label bm-dot g" style={{ marginTop: 0 }}>Tools directory</div>
          <Banner tone="g" title="Useful Tools" sub="Free tools we recommend to founders" href="/useful-tools" />
          <Links
            className="bm-two bm-list"
            items={[
              ["Learning resources", "/learning-resources"],
              ["Reading room", "/business-idea-reading-room"],
              ["Search ideas", "/search"],
              ["Blueprints", "/blueprints"],
            ]}
          />
          <A className="bm-pill g" href="/useful-tools">See all tools →</A>
          <div className="bm-label bm-dot">Idea lists</div>
          <Banner title="All Idea Lists" sub="Every business idea list in one place" href="/lists" />
          <Links className="bm-two bm-list" items={[cat(1), cat(2), cat(3), cat(4), cat(5), cat(10)]} />
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
