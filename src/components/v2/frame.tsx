import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Mail, Menu, Search, X } from "lucide-react";

import "./v2.css";

/**
 * Header and footer for the v2 page family (the purchased page architecture,
 * filled with BusinessIdea.io content). Every link points to a route that
 * exists in src/routes. Pages opt in by wrapping themselves in <V2Frame>.
 */

type NavLink = { label: string; href: string; note?: string };

const MEGA: { label: string; links: NavLink[] }[] = [
  {
    label: "Validate",
    links: [
      { label: "Validation workbench", href: "/product", note: "Buyer, problem and a small offer on one page" },
      { label: "How to validate an idea", href: "/startup-idea-validation", note: "A field guide for India" },
      { label: "Test demand", href: "/business-demand-test-india", note: "A booking or payment, not polite interest" },
      { label: "Risk check", href: "/business-idea-risk-check", note: "Cash and time at risk" },
      { label: "Compare two ideas", href: "/startup-idea-comparison", note: "Same questions for both" },
      { label: "First customer", href: "/first-customer-india", note: "Reach one real buyer" },
      { label: "Pivot or stop", href: "/business-idea-pivot-or-stop", note: "Read the evidence before spending more" },
    ],
  },
  {
    label: "Learn",
    links: [
      { label: "Idea lists", href: "/lists", note: "Every list on one page" },
      { label: "Browse categories", href: "/browse", note: "100 categories, 1,000 subcategories" },
      { label: "Published blueprints", href: "/blueprints", note: "Search every published idea" },
      { label: "Topics", href: "/topics", note: "Grouped by founder stage" },
      { label: "Startup guides", href: "/startup-guides" },
      { label: "Journal", href: "/blog" },
      { label: "Founder stories", href: "/founder-stories" },
      { label: "Glossary", href: "/founder-glossary" },
      { label: "Reading room", href: "/business-idea-reading-room" },
    ],
  },
  {
    label: "Free Tools",
    links: [
      { label: "Tools and calculators", href: "/tools", note: "Everything free, in one place" },
      { label: "Calculators", href: "/calculator" },
      { label: "Startup cost calculator", href: "/calculator/startup-cost" },
      { label: "Break-even calculator", href: "/calculator/break-even" },
      { label: "Templates", href: "/templates" },
      { label: "Founder toolkit", href: "/business-idea-toolkit" },
      { label: "Unit economics", href: "/unit-economics-india" },
      { label: "Cash flow", href: "/startup-cash-flow-india" },
    ],
  },
];

const FOOTER: { label: string; links: NavLink[] }[] = [
  { label: "Product", links: [
    { label: "Validation workbench", href: "/product" },
    { label: "Idea lists", href: "/lists" },
    { label: "Browse categories", href: "/browse" },
    { label: "Published blueprints", href: "/blueprints" },
    { label: "Search", href: "/search" },
  ] },
  { label: "Free Tools", links: [
    { label: "Tools and calculators", href: "/tools" },
    { label: "Founder toolkit", href: "/business-idea-toolkit" },
    { label: "Useful tools", href: "/useful-tools" },
  ] },
  { label: "Tools Directory", links: [
    { label: "Useful tools", href: "/useful-tools" },
    { label: "Learning resources", href: "/learning-resources" },
    { label: "Reading room", href: "/business-idea-reading-room" },
  ] },
  { label: "Finding Customers", links: [
    { label: "First customer", href: "/first-customer-india" },
    { label: "Test demand", href: "/business-demand-test-india" },
    { label: "Pricing", href: "/business-pricing-india" },
  ] },
  { label: "Calculators", links: [
    { label: "Startup cost", href: "/calculator/startup-cost" },
    { label: "Break-even", href: "/calculator/break-even" },
    { label: "Return on investment", href: "/calculator/roi" },
    { label: "Funding needed", href: "/calculator/funding-needed" },
    { label: "All calculators", href: "/calculator" },
  ] },
  { label: "Templates", links: [{ label: "Template library", href: "/templates" }] },
  { label: "Check by Model", links: [
    { label: "Business models", href: "/business-models-india" },
    { label: "Coaching batch check", href: "/coaching-batch-business-idea-india" },
    { label: "Weekend stall profit check", href: "/weekend-market-stall-profit-check" },
  ] },
  { label: "Resources", links: [
    { label: "Learning resources", href: "/learning-resources" },
    { label: "Glossary", href: "/founder-glossary" },
    { label: "Founder stories", href: "/founder-stories" },
    { label: "Decision journal", href: "/founder-decision-journal" },
  ] },
  { label: "Guides", links: [
    { label: "Startup guides", href: "/startup-guides" },
    { label: "Validation framework", href: "/startup-guides/business-idea-validation-framework" },
    { label: "Competitor analysis", href: "/startup-guides/competitor-analysis-framework" },
    { label: "Pre-launch checklist", href: "/startup-guides/pre-launch-checklist-for-startups" },
    { label: "Market sizing", href: "/startup-guides/tam-sam-som-market-sizing" },
  ] },
  { label: "Compare", links: [
    { label: "Compare two ideas", href: "/startup-idea-comparison" },
    { label: "Business models", href: "/business-models-india" },
    { label: "Time fit", href: "/business-idea-time-fit" },
  ] },
  { label: "Business Ideas", links: [
    { label: "Business ideas in India", href: "/business-ideas-india" },
    { label: "Side business ideas", href: "/side-business-ideas-india" },
    { label: "Local business ideas", href: "/local-business-ideas-india" },
    { label: "Online business ideas", href: "/online-business-ideas-india" },
    { label: "Service business ideas", href: "/service-business-ideas-india" },
    { label: "Product business ideas", href: "/product-business-ideas-india" },
  ] },
  { label: "Idea Lists", links: [
    { label: "All idea lists", href: "/lists" },
    { label: "Complete index", href: "/lists#all-lists" },
  ] },
  { label: "Ideas by Who You Are", links: [
    { label: "Women friendly", href: "/category/women-friendly-business-ideas" },
    { label: "Students", href: "/category/student-business-ideas" },
    { label: "Senior citizens", href: "/category/senior-citizen-business-ideas" },
    { label: "Childcare and parenting", href: "/category/childcare-and-parenting-support-business-ideas" },
  ] },
  { label: "Ideas by Budget", links: [{ label: "Budget lists", href: "/lists#by-budget" }] },
  { label: "Ideas by Industry", links: [
    { label: "Food", href: "/category/food-business-ideas" },
    { label: "Beauty", href: "/category/beauty-business-ideas" },
    { label: "Fashion and apparel", href: "/category/fashion-and-apparel-business-ideas" },
    { label: "Education", href: "/category/education-business-ideas" },
    { label: "Digital marketing", href: "/category/digital-marketing-business-ideas" },
  ] },
  { label: "Ideas by Location", links: [
    { label: "Work from home", href: "/category/work-from-home-business-ideas" },
    { label: "Home based", href: "/category/home-based-business-ideas" },
    { label: "Village and small town", href: "/category/village-and-small-town-business-ideas" },
    { label: "Local service", href: "/category/local-service-business-ideas" },
  ] },
  { label: "Risk and Stopping", links: [
    { label: "Risk check", href: "/business-idea-risk-check" },
    { label: "Pivot or stop", href: "/business-idea-pivot-or-stop" },
    { label: "Cash flow", href: "/startup-cash-flow-india" },
  ] },
  { label: "Research", links: [
    { label: "Research desk", href: "/business-idea-research-india" },
    { label: "Startup costs", href: "/startup-costs-india" },
    { label: "Startup terms", href: "/startup-terms-india" },
  ] },
  { label: "Topics", links: [
    { label: "All topics", href: "/topics" },
    { label: "Launch plan", href: "/startup-launch-plan-india" },
    { label: "Unit economics", href: "/unit-economics-india" },
  ] },
];

const LEGAL: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Site Map", href: "/sitemap" },
];

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a className="flex items-center gap-3 cursor-pointer group" href="/">
      <img
        src="/images/bbi-logo.png"
        alt="BusinessIdea.io logo"
        width={48}
        height={48}
        loading={footer ? "lazy" : "eager"}
        decoding="async"
        className="object-contain rounded-xl group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-3 w-9 h-9 bg-white/50 p-1"
      />
      <span
        className={
          footer
            ? "text-base sm:text-lg tracking-tight text-slate-900 whitespace-nowrap font-sans font-bold"
            : "text-display-lg tracking-tight transition-all duration-500 whitespace-nowrap shrink-0 hidden [@media(min-width:380px)]:inline text-base sm:text-lg text-slate-900"
        }
      >
        Business<span className="text-primary">Idea</span>.io
      </span>
    </a>
  );
}

function Header({ active }: { active?: string | undefined }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setMobile(false));
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <div ref={ref}>
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 py-4 pointer-events-none">
        <div className="mx-auto flex items-center justify-between rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto relative overflow-visible glass-nav-scrolled max-w-6xl px-6 h-16">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-3/4 opacity-100" />
          <Logo />
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-600">
            {MEGA.map((m, i) => {
              const current = m.links.some((l) => l.href === active);
              return (
                <div key={m.label}>
                  <button
                    type="button"
                    aria-expanded={open === i}
                    aria-haspopup="true"
                    onClick={() => setOpen(open === i ? null : i)}
                    className={`px-4 py-2 rounded-full hover:bg-slate-100 hover:text-primary transition-all flex items-center gap-1 relative${current ? " text-primary" : ""}`}
                  >
                    {m.label}
                    <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-300${open === i ? " rotate-180" : ""}`} />
                    {current && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />}
                  </button>
                </div>
              );
            })}
            <a className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-primary transition-all relative" href="/browse">
              Browse
            </a>
            <a href="/search" aria-label="Search" title="Search" className="ml-1 p-2 rounded-full hover:bg-slate-100 hover:text-primary transition-all">
              <Search className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/sign-in" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </a>
            <a
              href="/product"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 min-h-[44px] touch-manipulation active:scale-[0.98] active:opacity-90 text-white h-11 btn-primary px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all font-semibold"
            >
              <span className="sm:hidden">Validate</span>
              <span className="hidden sm:inline">Validate an idea</span>
            </a>
            <a href="/search" aria-label="Search" className="lg:hidden text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </a>
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

      {open !== null && (
        <div
          className="hidden lg:block fixed left-1/2 -translate-x-1/2 z-[9999] transition-all duration-200 ease-out"
          style={{ top: "4.5rem", width: "min(1180px, -2rem + 100vw)" }}
        >
          <div className="h-2 w-full" aria-hidden="true" />
          <div className="glass-nav-scrolled rounded-2xl p-6 grid grid-cols-3 gap-2">
            {(MEGA[open]?.links ?? []).map((l) => (
              <a key={l.href} href={l.href} className="rounded-xl px-4 py-3 hover:bg-slate-100 transition-colors">
                <span className="block text-sm font-semibold text-slate-900">{l.label}</span>
                {l.note && <span className="block text-xs text-slate-500 mt-0.5">{l.note}</span>}
              </a>
            ))}
          </div>
        </div>
      )}

      {mobile && (
        <div className="lg:hidden fixed inset-x-4 top-24 z-40 glass-nav-scrolled rounded-2xl p-5 max-h-[75vh] overflow-y-auto">
          {MEGA.map((m) => (
            <div key={m.label} className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">{m.label}</p>
              {m.links.map((l) => (
                <a key={l.href} href={l.href} className="block py-2 text-sm font-medium text-slate-800 hover:text-primary">
                  {l.label}
                </a>
              ))}
            </div>
          ))}
          <a href="/browse" className="block py-2 text-sm font-medium text-slate-800">Browse</a>
          <a href="/sign-in" className="block py-2 text-sm font-medium text-slate-800">Login</a>
        </div>
      )}
    </div>
  );
}

function FooterGroup({ group, id }: { group: (typeof FOOTER)[number]; id: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-state={open ? "open" : "closed"} className="border-b border-slate-200/80">
      <h3 className="flex">
        <button
          type="button"
          aria-controls={`v2-footer-${id}`}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex flex-1 items-center justify-between transition-all text-[13px] font-medium text-slate-700 hover:no-underline py-3"
        >
          {group.label}
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200${open ? " rotate-180" : ""}`} />
        </button>
      </h3>
      <div id={`v2-footer-${id}`} hidden={!open} role="region" className="overflow-hidden text-sm transition-all">
        <ul className="pb-3 space-y-2">
          {group.links.map((l) => (
            <li key={l.href + l.label}>
              <a href={l.href} className="text-slate-500 hover:text-primary transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="min-h-[320px]">
      <footer className="relative bg-slate-50/50 text-slate-900 overflow-hidden border-t border-slate-200/80" role="contentinfo">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-[#fafaf7] to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-px w-[60%] max-w-3xl -translate-x-1/2"
          style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--primary) 25%, transparent), transparent)" }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-200/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Logo footer />
              <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-[320px]">
                A free library of researched business ideas for India: who pays you, how the money works and what hurts in year one.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-full border border-emerald-200/60">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Free to read
              </div>
              <div className="mt-5 flex gap-2">
                <a
                  className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-200/80 shadow-sm"
                  aria-label="Contact BusinessIdea.io"
                  href="/contact"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid w-full gap-x-8 md:grid-cols-2 lg:grid-cols-3">
                {FOOTER.map((g, i) => (
                  <FooterGroup key={g.label} group={g} id={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} BusinessIdea.io — All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
                  {l.label}
                </a>
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
