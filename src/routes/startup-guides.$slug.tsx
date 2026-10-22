import { createFileRoute, Link } from "@tanstack/react-router";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { ReadingPaths } from "@/components/reading-paths";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getGuideBySlug, STARTUP_GUIDES } from "@/lib/guides-data";
import { guideImage } from "@/config/guide-imagery";
import { canonicalUrl } from "@/lib/site-config";
import { hideImgIfBroken } from "@/lib/utils";
import "@/components/glass-library.css";

export const Route = createFileRoute("/startup-guides/$slug")({
  head: ({ params }) => {
    const guide = getGuideBySlug(params.slug);
    const art = guide ? guideImage(guide.slug) : null;
    return { meta: [
      { title: guide ? `${guide.title} | BusinessIdea.io` : "Guide not found | BusinessIdea.io" },
      { name: "description", content: guide?.description ?? "Explore practical startup guides." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(art ? [
        { property: "og:image", content: canonicalUrl(art.src) },
        { property: "og:image:alt", content: art.alt },
        { name: "twitter:image", content: canonicalUrl(art.src) },
        { name: "twitter:image:alt", content: art.alt },
      ] : []),
    ] };
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useParams();
  const guide = getGuideBySlug(slug);
  if (!guide) return <GlassShell><div className="gl-page gl-message"><h1>We do not have that guide.</h1><Link to="/startup-guides">All guides</Link></div></GlassShell>;
  const art = guideImage(guide.slug);
  const index = STARTUP_GUIDES.findIndex((item) => item.slug === guide.slug);
  const previous = STARTUP_GUIDES[index - 1];
  const next = STARTUP_GUIDES[index + 1];
  const sectionStarts = Array.from(guide.rawMarkdown.matchAll(/^#{2,3}\s+.+$/gm), (match) => match.index ?? 0);
  const breakAt = sectionStarts.length > 1 ? sectionStarts[Math.floor(sectionStarts.length / 2)] : guide.rawMarkdown.length;
  return <>
    <JsonLd schema={[
      articleSchema({ path: `/startup-guides/${guide.slug}`, headline: guide.title, description: guide.description, datePublished: guide.publishedDate, categoryName: guide.category, ...(art ? { image: art.src } : {}) }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/startup-guides" }, { name: guide.title, path: `/startup-guides/${guide.slug}` }]),
    ]} />
    <GlassShell><div className="gl-page gl-article-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/startup-guides">Guides</Link><span>/</span><span>{guide.title}</span></nav>
      <article><header className="gl-article-hero"><p className="gh-eyebrow">{guide.category} · <Clock size={15} aria-hidden="true" /> {guide.readTime}</p><h1>{guide.title}</h1><p>{guide.description}</p></header>
        {art && <figure className="gl-featured-figure"><img src={art.src} alt={art.alt} width={art.width} height={art.height} loading="eager" fetchPriority="high" decoding="async" ref={hideImgIfBroken} /><figcaption>{art.description}</figcaption></figure>}
        {guide.keyTakeaways.length > 0 && <aside className="gl-takeaways"><p className="gh-eyebrow">THE MAIN POINTS</p><h2>Keep these in mind.</h2><ul>{guide.keyTakeaways.map((point, i) => <li key={i}><CheckCircle2 size={19} aria-hidden="true" />{point}</li>)}</ul></aside>}
        <div className="gl-prose"><Markdown rehypePlugins={[rehypeRaw]} components={{ a: ({ href, children }) => href?.startsWith("/") ? <Link to={href as "/"}>{children}</Link> : <a href={href}>{children}</a>, img: ({ src, alt }) => <img src={src} alt={alt ?? ""} loading="lazy" /> }}>{guide.rawMarkdown.slice(0, breakAt)}</Markdown></div>
        <ReadingPaths context="guide" />
        {breakAt < guide.rawMarkdown.length && <div className="gl-prose"><Markdown rehypePlugins={[rehypeRaw]} components={{ a: ({ href, children }) => href?.startsWith("/") ? <Link to={href as "/"}>{children}</Link> : <a href={href}>{children}</a>, img: ({ src, alt }) => <img src={src} alt={alt ?? ""} loading="lazy" /> }}>{guide.rawMarkdown.slice(breakAt)}</Markdown></div>}
      </article>
      <nav className="gl-article-nav" aria-label="More guides">{previous && <Link to="/startup-guides/$slug" params={{ slug: previous.slug }}><span>← Previous guide</span><strong>{previous.title}</strong></Link>}{next && <Link to="/startup-guides/$slug" params={{ slug: next.slug }}><span>Next guide →</span><strong>{next.title}</strong></Link>}</nav>
      <aside className="gl-bottom-note"><div><p className="gh-eyebrow">KEEP EXPLORING</p><h2>Put the idea to a test.</h2><p>Use your own numbers in one of the live calculators, or find a more focused category path.</p></div><Link to="/calculator" className="gh-button gh-button-primary">Open calculators <ArrowUpRight size={17} /></Link></aside>
    </div></GlassShell>
  </>;
}
