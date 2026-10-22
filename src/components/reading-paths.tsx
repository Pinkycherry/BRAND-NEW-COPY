import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Calculator, Compass, Search } from "lucide-react";
import "@/components/glass-library.css";

export function ReadingPaths({ context = "article" }: { context?: "article" | "guide" }) {
  const lead = context === "guide"
    ? "Take one concept from this guide into a real decision."
    : "The article gives you a perspective. These pages help you test it.";
  return <aside className="gl-reading-paths" aria-label="Related next steps">
    <div className="gl-reading-paths-intro">
      <p className="gh-eyebrow">A USEFUL DETOUR</p>
      <h2>Pause here. Put this to work.</h2>
      <p>{lead} Every destination below is available now.</p>
    </div>
    <div className="gl-reading-path-grid">
      <Link to="/blueprints"><Compass size={22} aria-hidden="true" /><strong>Find a real blueprint</strong><span>Read buyers, costs and risks <ArrowUpRight size={15} /></span></Link>
      <Link to="/calculator"><Calculator size={22} aria-hidden="true" /><strong>Check the numbers</strong><span>Try a live calculator <ArrowUpRight size={15} /></span></Link>
      <Link to="/startup-guides"><BookOpen size={22} aria-hidden="true" /><strong>Learn the next move</strong><span>Read a practical guide <ArrowUpRight size={15} /></span></Link>
      <Link to="/founder-glossary"><Search size={22} aria-hidden="true" /><strong>Decode the terms</strong><span>Open the glossary <ArrowUpRight size={15} /></span></Link>
    </div>
  </aside>;
}
