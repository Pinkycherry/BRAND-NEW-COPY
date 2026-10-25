
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import "./collection-framework.css";

const nav = [
  { href: "/templates", label: "Templates" },
  { href: "/tools", label: "Tools" },
  { href: "/topics", label: "Topics" },
  { href: "/lists", label: "Idea lists" },
  { href: "/product", label: "Validator" },
];

export function CollectionFrame({ active, children }: { active: string; children: ReactNode }) {
  return <div className="cf">
    <a className="cf-skip" href="#main-content">Skip to content</a>
    <header className="cf-header"><div className="cf-wrap cf-header-inner">
      <a href="/" className="cf-brand" aria-label="BusinessIdea.io home"><b>b<span>.</span></b> businessidea.io</a>
      <nav aria-label="Collection pages">{nav.map(item => <a key={item.href} href={item.href} aria-current={active === item.href ? "page" : undefined}>{item.label}</a>)}</nav>
      <a className="cf-header-action" href="/blueprints">Browse ideas <ArrowUpRight size={16}/></a>
    </div></header>
    <main id="main-content">{children}</main>
    <footer className="cf-footer"><div className="cf-wrap">
      <div><strong>businessidea.io</strong><p>A practical starting place for people building from India.</p><a href="/contact">Contact</a></div>
      <div><span>Explore</span><a href="/browse">Categories</a><a href="/blueprints">Published blueprints</a><a href="/lists">Idea lists</a></div>
      <div><span>Work through it</span><a href="/tools">Tools</a><a href="/topics">Topics</a><a href="/templates">Templates</a><a href="/product">Validator</a></div>
      <div><span>Keep learning</span><a href="/startup-guides">Startup guides</a><a href="/founder-glossary">Glossary</a><a href="/blog">Journal</a></div>
    </div></footer>
  </div>;
}

export function CollectionLinks({ current }: { current: string }) {
  return <section className="cf-wrap cf-next" aria-label="Continue exploring"><div><span className="cf-kicker">CONTINUE THE WORK</span><h2>One question leads to the next.</h2><p>Pick a useful next step while the decision is still small.</p></div><div className="cf-next-links">{nav.filter(item => item.href !== current).map(item => <a key={item.href} href={item.href}>{item.label}<ArrowUpRight size={17}/></a>)}</div></section>;
}
