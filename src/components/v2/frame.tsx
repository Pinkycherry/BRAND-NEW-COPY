import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";

import { TAXONOMY } from "@/data/taxonomy";

import "./v2.css";

/**
 * Header and footer of the purchased page architecture, converted to React
 * and filled with our own pages. The menu layout (hero card, columns,
 * banners, tiles) follows the seller's header; every item links to a route
 * that exists on our site. Footer lists our 100 main categories.
 */

type L = { label: string; href: string; note?: string };

/** Category n (1-100) from the approved taxonomy, linked to its page. */
function cat(n: number, label?: string): L {
  const c = TAXONOMY.find((x) => x.n === n);
  return { label: label ?? c?.short ?? "", href: c ? `/category/${c.slug}` : "/browse" };
}

function Links({ items, two = false }: { items: L[]; two?: boolean }) {
  return (
    <div className={two ? "bm-list bm-two" : "bm-list"}>
      {items.map((l) => (
        <a key={l.href + l.label} href={l.href}>
          {l.label}
        </a>
      ))}
    </div>
  );
}

function Banner({ tone = "", title, sub, href }: { tone?: string; title: string; sub: string; href: string }) {
  return (
    <a href={href} className={`bm-banner ${tone}`}>
      <i className="ic" />
      <div>
        <b>{title}</b>
        <span>{sub}</span>
      </div>
      <ArrowRight className="bm-arrow" />
    </a>
  );
}

function Hero({ tone = "", badge, icon, title, body, cta, href }: { tone?: string; badge: string; icon: string; title: string; body: string; cta: string; href: string }) {
  return (
    <div className={`bm-hero ${tone}`}>
      <div className="bm-hero-top">
        <div className="ic">{icon}</div>
        <span className="bm-badge">{badge}</span>
      </div>
      <h4>{title}</h4>
      <p>{body}</p>
      <a className="bm-btn" href={href}>
        {cta}
      </a>
    </div>
  );
}

function Label({ children, dot = "" }: { children: ReactNode; dot?: string }) {
  return <div className={`bm-label${dot ? ` bm-dot ${dot}` : ""}`}>{children}</div>;
}

function ValidatePanel() {
  return (
    <>
      <aside>
        <Hero badge="FREE" icon="✓" title="Validation workbench" body="Write the buyer, the problem and a small offer, then test it with real buyers." cta="Start free →" href="/product" />
        <Label>Popular</Label>
        <Links
          items={[
            { label: "How to validate an idea", href: "/startup-idea-validation" },
            { label: "Test demand", href: "/business-demand-test-india" },
            { label: "Risk check", href: "/business-idea-risk-check" },
            { label: "Compare two ideas", href: "/startup-idea-comparison" },
            { label: "Find your first customer", href: "/first-customer-india" },
          ]}
        />
      </aside>
      <div className="bm-cols bm-cols-2">
        <div>
          <Label dot="v">Tools and calculators</Label>
          <div className="bm-tiles">
            {[
              { label: "Startup cost", href: "/calculator/startup-cost" },
              { label: "Break-even", href: "/calculator/break-even" },
              { label: "Return on investment", href: "/calculator/roi" },
              { label: "Funding needed", href: "/calculator/funding-needed" },
              { label: "Unit economics", href: "/unit-economics-india" },
              { label: "Cash flow", href: "/startup-cash-flow-india" },
              { label: "Pricing", href: "/business-pricing-india" },
              { label: "Launch plan", href: "/startup-launch-plan-india" },
              { label: "Research desk", href: "/business-idea-research-india" },
              { label: "Time fit", href: "/business-idea-time-fit" },
              { label: "Decision journal", href: "/founder-decision-journal" },
            ].map((t) => (
              <a key={t.href} href={t.href} className="bm-tile">
                {t.label}
              </a>
            ))}
            <a href="/calculator" className="bm-tile bm-tile-all">
              View all →
            </a>
          </div>
        </div>
        <div>
          <Label dot="v">Published ideas</Label>
          <Banner title="All published blueprints" sub="Search every published business idea" href="/blueprints" />
          <div className="bm-cols bm-cols-3 bm-tight">
            <div>
              <Label>Online</Label>
              <Links items={[cat(4, "Online"), cat(56, "E-commerce"), cat(57, "Affiliate sites"), cat(47, "Digital marketing"), cat(12, "Freelance")]} />
            </div>
            <div>
              <Label>Food</Label>
              <Links items={[cat(16, "Food"), cat(17, "Home kitchen"), cat(18, "Street food"), cat(19, "Bakery"), cat(20, "Catering")]} />
            </div>
            <div>
              <Label>Beauty and fashion</Label>
              <Links items={[cat(27, "Beauty"), cat(28, "Salon"), cat(30, "Fashion"), cat(31, "Tailoring"), cat(32, "Jewellery")]} />
            </div>
          </div>
          <a className="bm-pill" href="/browse">
            See all 100 categories →
          </a>
        </div>
      </div>
    </>
  );
}

function LearnPanel() {
  return (
    <>
      <aside>
        <Hero tone="orange" badge="100 CATEGORIES" icon="💡" title="Business ideas" body="Business ideas for India, sorted into 100 categories and 1,000 subcategories." cta="Browse →" href="/browse" />
        <Label>Start here</Label>
        <Links
          items={[
            { label: "Business ideas in India", href: "/business-ideas-india" },
            { label: "Side business ideas", href: "/side-business-ideas-india" },
            { label: "Local business ideas", href: "/local-business-ideas-india" },
            { label: "Online business ideas", href: "/online-business-ideas-india" },
            { label: "Service business ideas", href: "/service-business-ideas-india" },
            { label: "Product business ideas", href: "/product-business-ideas-india" },
          ]}
        />
      </aside>
      <div className="bm-cols bm-cols-3">
        <div>
          <Label dot="o">Business ideas</Label>
          <Banner tone="o" title="All idea lists" sub="Every subcategory list in one place" href="/lists" />
          <Links items={[cat(1), cat(2), cat(3), cat(4), cat(5), cat(6, "For Women"), cat(7, "For Students"), cat(8, "For Senior Citizens"), cat(9, "Village and Small Town"), cat(10)]} />
        </div>
        <div>
          <Label dot="r">Money and risk</Label>
          <Banner tone="r" title="Startup costs" sub="What leaves your pocket before the first sale" href="/startup-costs-india" />
          <Links
            items={[
              { label: "Cash flow", href: "/startup-cash-flow-india" },
              { label: "Unit economics", href: "/unit-economics-india" },
              { label: "Pricing", href: "/business-pricing-india" },
              { label: "Business models", href: "/business-models-india" },
              { label: "Risk check", href: "/business-idea-risk-check" },
              { label: "Pivot or stop", href: "/business-idea-pivot-or-stop" },
            ]}
          />
          <Label>By industry</Label>
          <Links two items={[cat(16, "Food"), cat(27, "Beauty"), cat(37, "Education"), cat(30, "Fashion")]} />
        </div>
        <div>
          <Label dot="b">Knowledge</Label>
          <Banner tone="b" title="Startup guides" sub="Step-by-step guides for founders" href="/startup-guides" />
          <Links
            items={[
              { label: "Glossary", href: "/founder-glossary" },
              { label: "Startup terms", href: "/startup-terms-india" },
              { label: "Founder stories", href: "/founder-stories" },
              { label: "Journal", href: "/blog" },
              { label: "Reading room", href: "/business-idea-reading-room" },
              { label: "Learning resources", href: "/learning-resources" },
              { label: "About us", href: "/about" },
            ]}
          />
        </div>
      </div>
    </>
  );
}

function ToolsPanel() {
  return (
    <>
      <aside>
        <Hero badge="FREE" icon="✓" title="Founder toolkit" body="Pick a founder question and work it through with your own figures." cta="Open the toolkit →" href="/business-idea-toolkit" />
        <Label>Popular</Label>
        <Links
          items={[
            { label: "Startup cost calculator", href: "/calculator/startup-cost" },
            { label: "Break-even calculator", href: "/calculator/break-even" },
            { label: "Validation workbench", href: "/product" },
          ]}
        />
      </aside>
      <div className="bm-cols bm-cols-3">
        <div>
          <Label dot="g">Calculators</Label>
          <Banner tone="g" title="All calculators" sub="Free money calculators for founders" href="/calculator" />
          <Links
            two
            items={[
              { label: "Startup cost", href: "/calculator/startup-cost" },
              { label: "Break-even", href: "/calculator/break-even" },
              { label: "ROI", href: "/calculator/roi" },
              { label: "Funding needed", href: "/calculator/funding-needed" },
              { label: "Unit economics", href: "/unit-economics-india" },
              { label: "Cash flow", href: "/startup-cash-flow-india" },
            ]}
          />
        </div>
        <div>
          <Label dot="pk">Worksheets</Label>
          <Banner tone="pk" title="Templates" sub="Plans, interviews and more" href="/templates" />
          <Links
            items={[
              { label: "Launch plan", href: "/startup-launch-plan-india" },
              { label: "Demand test", href: "/business-demand-test-india" },
              { label: "Compare two ideas", href: "/startup-idea-comparison" },
              { label: "Decision journal", href: "/founder-decision-journal" },
              { label: "Weekend stall profit check", href: "/weekend-market-stall-profit-check" },
            ]}
          />
        </div>
        <div>
          <Label dot="g">Directory</Label>
          <Banner tone="g" title="Useful tools" sub="Free tools we point founders to" href="/useful-tools" />
          <Links
            items={[
              { label: "Learning resources", href: "/learning-resources" },
              { label: "Reading room", href: "/business-idea-reading-room" },
              { label: "Search ideas", href: "/search" },
            ]}
          />
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
    <a href="/" className="flex items-center gap-3 cursor-pointer group" aria-label="BusinessIdea.io home">
      <span className={footer ? "text-lg tracking-tight text-slate-900 whitespace-nowrap font-bold" : "text-display-lg tracking-tight whitespace-nowrap shrink-0 text-base sm:text-lg text-slate-900"}>
        Business<span className="text-brand-500">Idea</span>.io
      </span>
    </a>
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
    timer.current = setTimeout(() => setOpen(null), 180);
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

  return (
    <div ref={ref} className="v2 v2-header">
      <nav className="fixed top-0 inset-x-0 z-50 py-4 px-4 pointer-events-none">
        <div className="mx-auto flex items-center justify-between rounded-3xl pointer-events-auto relative glass-nav-scrolled max-w-6xl px-5 sm:px-6 h-16">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent w-3/4" />
          <Logo />
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {MEGA.map((m, i) => (
              <div key={m.label} onMouseEnter={() => show(i)} onMouseLeave={hideSoon}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-haspopup="true"
                  onClick={() => (open === i ? setOpen(null) : show(i))}
                  className={`v2-nav-btn${open === i ? " is-open" : ""}`}
                >
                  {m.label}
                  <ChevronDown className="v2-chev" />
                </button>
              </div>
            ))}
            <a className="v2-nav-btn" href="/pricing">
              Pricing
            </a>
            <a href="/search" aria-label="Search" title="Search" className="v2-nav-btn v2-icon-btn">
              <Search className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/sign-in" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </a>
            <a href="/product" className="btn-primary inline-flex items-center justify-center h-11 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap">
              <span className="sm:hidden">Sign up</span>
              <span className="hidden sm:inline">Get Report</span>
            </a>
            <button
              className="lg:hidden text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition-colors"
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

      <div className={`bm-panel${open !== null ? " open" : ""}`} onMouseEnter={cancel} onMouseLeave={hideSoon} aria-hidden={open === null}>
        {MEGA.map((m, i) => (open === i ? <m.Panel key={m.label} /> : null))}
      </div>

      {mobile && (
        <div className="v2-mobile lg:hidden">
          {MEGA.map((m) => (
            <details key={m.label}>
              <summary>
                {m.label}
                <ChevronDown className="v2-chev" />
              </summary>
              <div className="v2-mobile-body">
                <m.Panel />
              </div>
            </details>
          ))}
          <a href="/pricing">Pricing</a>
          <a href="/search">Search</a>
          <a href="/sign-in">Login</a>
        </div>
      )}
    </div>
  );
}

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
