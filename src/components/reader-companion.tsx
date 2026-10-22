import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import "@/components/glass-library.css";

export function ReaderCompanion({ sections, label }: { sections: { id: string; label: string }[]; label: string }) {
  return <aside className="gl-reader-companion" aria-label={label}>
    <p className="gh-eyebrow">ON THIS PAGE</p>
    {sections.length > 0 && <nav aria-label={label}>
      {sections.slice(0, 16).map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}
    </nav>}
    <div className="gl-companion-actions">
      <strong>Make it practical</strong>
      <Link to="/blueprints">Explore completed ideas <ArrowUpRight size={14} /></Link>
      <Link to="/calculator">Try a calculator <ArrowUpRight size={14} /></Link>
      <Link to="/founder-glossary">Open the glossary <ArrowUpRight size={14} /></Link>
    </div>
  </aside>;
}
