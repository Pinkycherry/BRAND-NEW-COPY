import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { formatDate } from "@/lib/blog-shared";
import { getBlogPosts } from "@/lib/blog.functions";
import { hideImgIfBroken } from "@/lib/utils";
import "@/components/glass-library.css";

const postsQuery = queryOptions({ queryKey: ["blog", "posts", 1], queryFn: () => getBlogPosts({ data: { page: 1 } }) });

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: () => ({ meta: [
    { title: "Founder Notes & Articles | BusinessIdea.io" },
    { name: "description", content: "Read published articles and practical notes for founders." },
    { property: "og:type", content: "website" },
  ] }),
  component: BlogIndex,
  errorComponent: () => <GlassShell><div className="gl-page gl-message"><h1>The articles could not load.</h1><p>Please try again in a moment.</p><Link to="/">Return home</Link></div></GlassShell>,
});

function BlogIndex() {
  const { data } = useSuspenseQuery(postsQuery);
  return <GlassShell><div className="gl-page">
    <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Blog</span></nav>
    <header className="gl-hero"><div className="gl-hero-copy"><p className="gh-eyebrow">NOTES FOR THE JOURNEY</p><h1>Ideas are a start. <em>Keep learning.</em></h1><p>Published writing on markets, decisions, early experiments and what founders learn along the way.</p><div className="gl-hero-stats"><span><strong>{data.posts.length}</strong> articles on this page</span></div></div><div className="gl-hero-art" aria-hidden="true"><span className="gl-art-orbit gl-art-orbit-one" /><span className="gl-art-orbit gl-art-orbit-two" /><span className="gl-art-core">✦</span></div></header>
    <section className="gl-index" aria-labelledby="articles-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">THE JOURNAL</p><h2 id="articles-heading">Recent articles.</h2><p>Open a story when you have time to think it through.</p></div></div>{data.posts.length ? <div className="gl-guide-grid gl-blog-grid">{data.posts.map((post, index) => <article key={post.id} className={index === 0 ? "gl-guide-card gl-feature-article" : "gl-guide-card"}>
      {post.image && <Link to="/blog/$slug" params={{ slug: post.slug }} className="gl-guide-media" tabIndex={-1}><img src={post.image} alt={post.imageAlt ?? post.title} width={post.imageWidth ?? 1672} height={post.imageHeight ?? 941} loading="lazy" decoding="async" ref={hideImgIfBroken} /></Link>}
      <span className="gh-eyebrow">{formatDate(post.date)} · {post.readingMinutes} min read</span><h3><Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link></h3><p>{post.excerpt}</p><Link to="/blog/$slug" params={{ slug: post.slug }} className="gl-idea-action">Read article <ArrowUpRight size={17} /></Link></article>)}</div> : <div className="gl-empty"><h3>No posts published yet.</h3><p>Explore the guides while the journal fills up.</p><Link to="/startup-guides">Read the guides</Link></div>}</section>
    <aside className="gl-bottom-note"><div><p className="gh-eyebrow">KEEP EXPLORING</p><h2>Find a practical direction.</h2><p>The category map is a good place to turn a broad question into a focused path.</p></div><Link to="/browse" className="gh-button gh-button-primary">Explore ideas <ArrowUpRight size={17} /></Link></aside>
  </div></GlassShell>;
}
