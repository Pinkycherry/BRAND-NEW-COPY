import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import "@/components/glass-home.css";
import { V2Frame } from "@/components/v2/frame";
import "@/components/v2/legacy-surface.css";

const navGroups = [
  { label: "Explore", links: [
    { label: "Start with your life", to: "/business-ideas-india", description: "An India-first decision path" },
    { label: "All categories", to: "/browse", description: "Find a path that fits your life" },
    { label: "Published blueprints", to: "/blueprints", description: "Search completed source ideas" },
    { label: "Search the library", to: "/search", description: "Start with a topic or need" },
    { label: "Business models", to: "/business-models-india", description: "Compare how an idea earns" },
    { label: "Side business ideas", to: "/side-business-ideas-india", description: "Fit a test around work and care" },
    { label: "Local business ideas", to: "/local-business-ideas-india", description: "Walk a real buying route" },
    { label: "Online business ideas", to: "/online-business-ideas-india", description: "Trace acquisition and fulfilment" },
  ] },
  { label: "Learn", links: [
    { label: "Startup guides", to: "/startup-guides", description: "Choose a founder decision" },
    { label: "Validation field guide", to: "/startup-idea-validation", description: "Test before you pay" },
    { label: "Business idea research", to: "/business-idea-research-india", description: "Check buyers and alternatives" },
    { label: "Founder journal", to: "/blog", description: "Stories and working lessons" },
    { label: "Founder glossary", to: "/founder-glossary", description: "Terms in plain language" },
    { label: "Learning resources", to: "/learning-resources", description: "Everything in one place" },
    { label: "Reading room", to: "/business-idea-reading-room", description: "Guides and original articles" },
    { label: "Startup terms by decision", to: "/startup-terms-india", description: "Exact source definitions" },
  ] },
  { label: "Tools", links: [
    { label: "Business idea toolkit", to: "/business-idea-toolkit", description: "Choose a question and working tool" },
    { label: "Available calculators", to: "/calculator", description: "Working tools and models under review" },
    { label: "Startup cost ledger", to: "/startup-costs-india", description: "Plan cash before a first sale" },
    { label: "First-price workbench", to: "/business-pricing-india", description: "Quote a defined offer" },
    { label: "Cash-flow calendar", to: "/startup-cash-flow-india", description: "See when bills outrun collections" },
    { label: "Launch evidence plan", to: "/startup-launch-plan-india", description: "Four checks before a bigger step" },
    { label: "Product batch worksheet", to: "/product-business-ideas-india", description: "Count stock and cash honestly" },
    { label: "Validate a published idea", to: "/blueprints", description: "Four external research choices on each idea" },
  ] },
  { label: "About", links: [
    { label: "Our story", to: "/about", description: "Why this library exists" },
    { label: "The founders", to: "/founders", description: "Who signs the research" },
    { label: "Pricing", to: "/pricing", description: "What costs nothing today" },
    { label: "Contact", to: "/contact", description: "Talk to a person" },
  ] },
] as const;

export function GlassHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="gh-header">
      <div className="gh-nav">
        <Link to="/" className="gh-brand" aria-label="BusinessIdea.io home" onClick={() => setMenuOpen(false)}>
          <span className="gh-brand-mark" aria-hidden="true">b<span>.</span></span>
          <span className="gh-brand-name">businessidea<span>.io</span></span>
        </Link>
        <nav className="gh-nav-links" aria-label="Main navigation">
          {navGroups.map((group) => (
            <details className="gh-nav-group" key={group.label}>
              <summary>{group.label}<ChevronDown size={14} aria-hidden="true" /></summary>
              <div className="gh-nav-dropdown">
                <span className="gh-nav-dropdown-label">{group.label} at BBI</span>
                {group.links.map((item) => (
                  <Link key={item.label} to={item.to} onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); }}>
                    <span><strong>{item.label}</strong><small>{item.description}</small></span><ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>
        <div className="gh-nav-actions">
          <Link to="/sign-in" className="gh-sign-in">Sign in</Link>
          <Link to="/blueprints" className="gh-nav-cta">Explore ideas <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <button type="button" className="gh-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="gh-mobile-nav" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="gh-mobile-nav" className="gh-mobile-nav" aria-label="Mobile navigation">
          {navGroups.map((group) => <details key={group.label} className="gh-mobile-group">
            <summary>{group.label}<ChevronDown size={17} aria-hidden="true" /></summary>
            <div>{group.links.map((item) => <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>
          </details>)}
          <Link to="/sign-in" onClick={() => setMenuOpen(false)}>Sign in<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
      )}
    </header>
  );
}

export function GlassFooter() {
  return (
    <footer className="gh-footer">
      <div className="gh-footer-journey">
        <div><p className="gh-eyebrow">KEEP MOVING</p><h2>One idea. One question. One useful next step.</h2><p>Find a blueprint, run the numbers, then test the assumptions with the research tool you choose.</p></div>
        <div><Link to="/blueprints" className="gh-button gh-button-primary">Browse published ideas <ArrowUpRight size={18} aria-hidden="true" /></Link><Link to="/calculator" className="gh-button gh-button-secondary">Open calculators</Link></div>
      </div>
      <div className="gh-footer-top">
        <div className="gh-footer-brand">
          <Link to="/" className="gh-brand"><span className="gh-brand-mark" aria-hidden="true">b<span>.</span></span><span className="gh-brand-name">businessidea<span>.io</span></span></Link>
          <p>For the person starting with an idea and a real life to work around.</p>
          <Link to="/contact" className="gh-footer-contact">Ask us a question <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="gh-footer-links">
          <div><h3>Ideas</h3><Link to="/business-ideas-india">Find your first move</Link><Link to="/business-models-india">Compare business models</Link><Link to="/side-business-ideas-india">Side businesses</Link><Link to="/local-business-ideas-india">Local businesses</Link><Link to="/online-business-ideas-india">Online businesses</Link><Link to="/browse">All categories</Link><Link to="/blueprints">Published blueprints</Link><Link to="/search">Search ideas</Link><Link to="/sitemap">All pages</Link></div>
          <div><h3>Learn</h3><Link to="/startup-guides">Startup guides</Link><Link to="/business-idea-reading-room">Reading room</Link><Link to="/startup-terms-india">Terms by decision</Link><Link to="/startup-idea-validation">Validation field guide</Link><Link to="/business-idea-research-india">Business idea research</Link><Link to="/blog">Founder journal</Link><Link to="/founder-glossary">Glossary</Link><Link to="/learning-resources">Resources</Link></div>
          <div><h3>Build</h3><Link to="/business-idea-toolkit">Business idea toolkit</Link><Link to="/startup-costs-india">Startup cost ledger</Link><Link to="/business-pricing-india">First-price workbench</Link><Link to="/startup-cash-flow-india">Cash-flow calendar</Link><Link to="/startup-launch-plan-india">Launch evidence plan</Link><Link to="/product-business-ideas-india">Product batch</Link><Link to="/calculator">Calculators</Link><Link to="/blueprints">Validate an idea</Link><Link to="/pricing">Pricing</Link><Link to="/services">Services</Link></div>
          <div><h3>People & policies</h3><Link to="/about">Our story</Link><Link to="/founders">Founders</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/cookie-policy">Cookies</Link><Link to="/disclaimer">Disclaimer</Link></div>
        </div>
      </div>
      <div className="gh-footer-bottom"><span>© {new Date().getFullYear()} BusinessIdea.io</span><span>Made for people starting from zero.</span></div>
    </footer>
  );
}

export function GlassShell({ children }: { children: ReactNode }) {
  return <V2Frame><div className="glass-home v2-surface"><a className="gh-skip" href="#main">Skip to content</a><div aria-hidden="true" style={{ height: "6rem" }} /><div id="main">{children}</div></div></V2Frame>;
}
