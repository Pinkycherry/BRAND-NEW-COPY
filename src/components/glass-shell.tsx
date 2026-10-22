import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "@/components/glass-home.css";

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
          <Link to="/browse">Explore ideas</Link>
          <Link to="/calculator">Tools</Link>
          <Link to="/startup-guides">Guides</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/pricing">Pricing</Link>
        </nav>
        <div className="gh-nav-actions">
          <Link to="/sign-in" className="gh-sign-in">Sign in</Link>
          <Link to="/browse" className="gh-nav-cta">Explore ideas <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <button
          type="button"
          className="gh-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="gh-mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="gh-mobile-nav" className="gh-mobile-nav" aria-label="Mobile navigation">
          {([
            { label: "Explore ideas", to: "/browse" },
            { label: "Tools and calculators", to: "/calculator" },
            { label: "Startup guides", to: "/startup-guides" },
            { label: "Blog", to: "/blog" },
            { label: "Pricing", to: "/pricing" },
            { label: "Sign in", to: "/sign-in" },
          ] as const).map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}<ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function GlassFooter() {
  return (
    <footer className="gh-footer">
      <div className="gh-footer-top">
        <div>
          <Link to="/" className="gh-brand"><span className="gh-brand-mark" aria-hidden="true">b<span>.</span></span><span className="gh-brand-name">businessidea<span>.io</span></span></Link>
          <p>For the person starting with an idea and a real life to work around.</p>
        </div>
        <div className="gh-footer-links">
          <div><h3>Explore</h3><Link to="/browse">All categories</Link><Link to="/search">Search</Link><Link to="/calculator">Calculators</Link><Link to="/startup-guides">Guides</Link></div>
          <div><h3>About</h3><Link to="/about">Our story</Link><Link to="/pricing">Pricing</Link><Link to="/contact">Contact</Link><Link to="/founder-glossary">Glossary</Link></div>
          <div><h3>Policies</h3><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/cookie-policy">Cookies</Link><Link to="/disclaimer">Disclaimer</Link></div>
        </div>
      </div>
      <div className="gh-footer-bottom"><span>© {new Date().getFullYear()} BusinessIdea.io</span><span>Made for people starting from zero.</span></div>
    </footer>
  );
}

export function GlassShell({ children }: { children: ReactNode }) {
  return <div className="glass-home"><a className="gh-skip" href="#main">Skip to content</a><GlassHeader /><main id="main">{children}</main><GlassFooter /></div>;
}
