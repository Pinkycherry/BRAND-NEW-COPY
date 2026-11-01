import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/home-bbi.html?raw";
import { boughtPage } from "@/bought/serve";
import { getRecentIdeas } from "@/lib/home.functions";
import { getListsHub } from "@/lib/lists.functions";

function safe(value: string | null | undefined): string {
  return (value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] ?? char);
}

function card(title: string, description: string, href: string, image?: string | null) {
  return `<a class="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl" href="${safe(href)}">${image ? `<img src="${safe(image)}" alt="" loading="lazy" width="275" height="145" class="mb-4 h-36 w-full rounded-xl object-cover">` : ""}<h3 class="font-display text-lg font-semibold leading-snug text-[#0f172a]">${safe(title)}</h3><p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">${safe(description)}</p><span class="mt-auto pt-5 text-sm font-semibold text-[#7c3aed]">Explore →</span></a>`;
}

function rail(cards: string[]) {
  if (!cards.length) return "";
  return `<div class="bbi-home-track"><div class="flex gap-4">${cards.join("")}</div><div class="flex gap-4" aria-hidden="true" inert>${cards.join("")}</div></div>`;
}

async function homeResponse() {
  const [{ categories }, ideas, posts] = await Promise.all([
    getListsHub().catch(() => ({ categories: [] })),
    getRecentIdeas().catch(() => []),
    import("@/lib/blog.server").then(({ fetchPosts }) => fetchPosts(1, 12)).catch(() => ({ posts: [] })),
  ]);
  const { STARTUP_GUIDES } = await import("@/lib/guides-data");
  const selected = ideas[0];
  const previewUrl = selected ? `/idea/${encodeURIComponent(selected.slug)}` : "/browse";
  const values: Record<string, string> = {
    BBI_IDEA_TITLE: selected?.title ?? "Explore a published business idea",
    BBI_IDEA_SUMMARY: selected?.summary || selected?.hook || "Browse the library for an idea that fits your situation.",
    BBI_IDEA_HOOK: selected?.hook || selected?.summary || "",
    BBI_IDEA_BUYER: selected?.who_pays_you || "Read who pays in the full idea.",
    BBI_IDEA_MONEY: selected?.how_money_comes || "Read how money comes in on the idea page.",
    BBI_IDEA_RISK: selected?.what_hurts || "Read the hard parts on the idea page.",
    BBI_IDEA_URL: previewUrl,
    BBI_CATEGORY_CARDS: categories.slice(0, 8).map((c) => card(c.name, "Explore focused lists and published ideas.", `/category/${encodeURIComponent(c.slug)}`)).join(""),
    BBI_GUIDE_CARDS: rail(STARTUP_GUIDES.slice(0, 8).map((g) => card(g.title, g.description, `/startup-guides/${encodeURIComponent(g.slug)}`))),
    BBI_BLOG_CARDS: rail(posts.posts.slice(0, 8).map((p) => card(p.title, p.excerpt, `/blog/${encodeURIComponent(p.slug)}`, p.image))),
    BBI_RECENT_CARDS: rail(ideas.map((i) => card(i.title, i.hook || i.summary || "Read this published idea.", `/idea/${encodeURIComponent(i.slug)}`))),
  };
  let page = purchasedPage.replace(/\{\{(BBI_[A-Z_]+)\}\}/g, (_, key: string) => values[key] === undefined ? "" : key.endsWith("_CARDS") ? values[key] : safe(values[key]));
  if (!selected) page = page.replace(/<section id="reports"[\s\S]*?<\/section>/, "");
  return boughtPage(page, "home");
}

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: homeResponse,
    },
  },
});
