import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { searchTaxonomy } from "@/lib/catalog";
import { useDepthScene, useTextReveal } from "@/motion";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Search Business Idea Categories | BBI" },
      { name: "robots", content: "noindex,follow" },
      {
        name: "description",
        content:
          "Search 100 business idea categories and 1,000 subcategories for India by keyword: food, tuition, repair, farming, beauty and more.",
      },
      { property: "og:title", content: "Search Business Idea Categories | BBI" },
      {
        property: "og:description",
        content: "Search 100 categories and 1,000 subcategories of business ideas for India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [term, setTerm] = useState(q ?? "");
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const sceneRef = useDepthScene<HTMLDivElement>({ strength: 0.5 });
  const hits = useMemo(() => searchTaxonomy(q ?? "", 200), [q]);

  return (
    <SiteShell tone="instrument">
      <div ref={sceneRef} className="cx-scene mx-auto max-w-6xl px-4 py-12">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />
        <h1 ref={headingRef} className="cx-layer cx-z3 mt-4 text-3xl font-bold tracking-tight">
          Search every category
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          100 categories · 1,000 subcategories
        </p>
        <form
          className="mt-6 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { q: term } });
          }}
        >
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. tiffin, tuition, mobile repair, dairy"
            aria-label="Search business categories"
            className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-8">
          {!q?.trim() && (
            <p className="text-sm text-muted-foreground">
              Type a keyword to search every category and subcategory.
            </p>
          )}
          {q?.trim() && (
            <p className="text-sm text-muted-foreground">
              {hits.length} result{hits.length === 1 ? "" : "s"} for “{q}”
            </p>
          )}
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hits.map((hit) => (
              <li key={hit.kind === "category" ? hit.categorySlug : hit.subcategorySlug}>
                {hit.kind === "category" ? (
                  <Link
                    to="/category/$categorySlug"
                    params={{ categorySlug: hit.categorySlug }}
                    className="glass block h-full rounded-xl border border-border/50 p-4 transition-colors hover:border-primary/60"
                  >
                    <span className="ins-legend">Category</span>
                    <span className="mt-1 block text-sm font-semibold">{hit.name}</span>
                  </Link>
                ) : (
                  <Link
                    to="/category/$categorySlug/$subcategorySlug"
                    params={{ categorySlug: hit.categorySlug, subcategorySlug: hit.subcategorySlug }}
                    className="glass block h-full rounded-xl border border-border/50 p-4 transition-colors hover:border-primary/60"
                  >
                    <span className="ins-legend">{hit.categoryName}</span>
                    <span className="mt-1 block text-sm font-semibold">{hit.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SiteShell>
  );
}
