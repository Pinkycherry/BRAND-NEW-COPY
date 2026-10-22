import { createContext, useContext, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";

type EditorialTone = "brief" | "document" | "notice" | "focus" | "default";
const Tone = createContext<EditorialTone>("default");

export function ContentPage({
  eyebrow, title, highlight, intro, children, tone = "brief",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro: string;
  children: ReactNode;
  tone?: EditorialTone;
  wide?: boolean;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <>
    <JsonLd schema={[
      webPageSchema({ path: pathname, name: `${title}${highlight ? ` ${highlight}` : ""}`, description: intro }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: eyebrow, path: pathname }]),
    ]} />
    <GlassShell>
      <div className="gl-page gl-editorial">
        <nav className="gl-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>{eyebrow}</span></nav>
        <header className="gl-editorial-hero">
          <p className="gh-eyebrow">{eyebrow.toUpperCase()}</p>
          <h1>{title}{highlight && <> <em>{highlight}</em></>}</h1>
          <p>{intro}</p>
        </header>
        <Tone.Provider value={tone}><div className="gl-editorial-stack">{children}</div></Tone.Provider>
      </div>
    </GlassShell>
  </>;
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  const tone = useContext(Tone);
  return <section className={`gl-editorial-section gl-editorial-${tone}`}>
    <h2>{heading}</h2><div className="gl-editorial-copy">{children}</div>
  </section>;
}

export function Bullets({ items }: { items: string[] }) {
  return <ul className="gl-editorial-bullets">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function metaFor(title: string, description: string) {
  return { meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] };
}
