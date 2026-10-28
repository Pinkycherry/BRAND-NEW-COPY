import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { dbOrNull } from "./db";

/** One idea as shown on a list page. */
export type ListIdea = {
  slug: string;
  title: string;
  hook: string | null;
  summary: string | null;
  who_pays_you: string | null;
  how_money_comes: string | null;
  what_you_need: string | null;
  what_hurts: string | null;
  verdict: string | null;
  investment_band: string | null;
  time_needed: string | null;
  skill_level: string | null;
  updated_at: string | null;
  faq?: { q: string; a: string }[] | null;
};

export type ListPage = {
  code: string;
  name: string;
  slug: string;
  intro: string | null;
  howToChoose: string | null;
  faq: { q: string; a: string; href?: string }[];
  categoryName: string;
  ideas: ListIdea[];
  siblings: { name: string; slug: string; count: number }[];
  totalIdeas: number;
};

export type ListsHub = {
  total: number;
  categories: { code: string; name: string; subs: { code: string; name: string; slug: string; count: number }[] }[];
};

const IDEA_COLUMNS =
  "slug,title,hook,summary,who_pays_you,how_money_comes,what_you_need,what_hurts,verdict,investment_band,time_needed,skill_level,updated_at,faq";

export function firstFaq(value: unknown): { q: string; a: string } | null {
  if (!Array.isArray(value)) return null;
  const item = value.find((f) => f && typeof f.q === "string" && typeof f.a === "string");
  return item ? { q: item.q, a: item.a } : null;
}

/** Published idea counts per subcategory code, read in pages of 1,000. */
async function subcategoryCounts(client: NonNullable<ReturnType<typeof dbOrNull>>) {
  const counts: Record<string, number> = {};
  for (let from = 0; from < 100000; from += 1000) {
    const { data, error } = await client
      .from("ideas")
      .select("subcategory_code")
      .eq("status", "published")
      .order("code", { ascending: true })
      .range(from, from + 999);
    if (error || !data) break;
    for (const r of data as { subcategory_code: string }[]) counts[r.subcategory_code] = (counts[r.subcategory_code] ?? 0) + 1;
    if (data.length < 1000) break;
  }
  return counts;
}

/** Every category that has published ideas, with its subcategories and counts. */
export const getListsHub = createServerFn({ method: "GET" }).handler(async (): Promise<ListsHub> => {
  const client = dbOrNull();
  if (!client) return { total: 0, categories: [] };
  const counts = await subcategoryCounts(client);
  const [{ data: cats }, { data: subs }] = await Promise.all([
    client.from("categories").select("code,name").order("code"),
    client.from("subcategories").select("code,category_code,name,slug").order("code"),
  ]);
  const byCat = new Map<string, ListsHub["categories"][number]>();
  for (const c of (cats ?? []) as { code: string; name: string }[]) byCat.set(c.code, { code: c.code, name: c.name, subs: [] });
  for (const s of (subs ?? []) as { code: string; category_code: string; name: string; slug: string }[]) {
    const n = counts[s.code] ?? 0;
    if (n > 0) byCat.get(s.category_code)?.subs.push({ code: s.code, name: s.name, slug: s.slug, count: n });
  }
  return {
    total: Object.values(counts).reduce((a, b) => a + b, 0),
    categories: [...byCat.values()].filter((c) => c.subs.length > 0),
  };
});

/** One subcategory list page by its slug, or null. */
export const getListPage = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }): Promise<ListPage | null> => {
    const client = dbOrNull();
    if (!client) return null;
    const { data: sub } = await client
      .from("subcategories")
      .select("code,category_code,name,slug,intro,how_to_choose,faq")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!sub) return null;
    const s = sub as { code: string; category_code: string; name: string; slug: string; intro: string | null; how_to_choose: string | null; faq: unknown };
    const [{ data: ideas }, { data: cat }, { data: sibs }, { count: total }] = await Promise.all([
      client.from("ideas").select(IDEA_COLUMNS).eq("subcategory_code", s.code).eq("status", "published").order("position"),
      client.from("categories").select("name").eq("code", s.category_code).maybeSingle(),
      client.from("subcategories").select("code,name,slug").eq("category_code", s.category_code).order("code"),
      client.from("ideas").select("code", { count: "exact", head: true }).eq("status", "published"),
    ]);
    const list = (ideas ?? []) as ListIdea[];
    if (list.length === 0) return null;
    const sibCodes = ((sibs ?? []) as { code: string }[]).map((x) => x.code).filter((c) => c !== s.code);
    const sibCounts: Record<string, number> = {};
    if (sibCodes.length) {
      const { data: rows } = await client.from("ideas").select("subcategory_code").in("subcategory_code", sibCodes).eq("status", "published");
      for (const r of (rows ?? []) as { subcategory_code: string }[]) sibCounts[r.subcategory_code] = (sibCounts[r.subcategory_code] ?? 0) + 1;
    }
    const faq = Array.isArray(s.faq)
      ? (s.faq as { q?: unknown; a?: unknown }[]).filter((f) => typeof f.q === "string" && typeof f.a === "string").map((f) => ({ q: f.q as string, a: f.a as string }))
      : [];
    return {
      code: s.code,
      name: s.name,
      slug: s.slug,
      intro: s.intro,
      howToChoose: s.how_to_choose,
      faq: [...faq, ...list.flatMap((idea) => {
        const entry = firstFaq(idea.faq);
        return entry ? [{ ...entry, href: `/idea/${idea.slug}` }] : [];
      })],
      categoryName: (cat as { name: string } | null)?.name ?? "",
      ideas: list,
      siblings: ((sibs ?? []) as { code: string; name: string; slug: string }[])
        .filter((x) => x.code !== s.code && (sibCounts[x.code] ?? 0) > 0)
        .map((x) => ({ name: x.name, slug: x.slug, count: sibCounts[x.code] ?? 0 })),
      totalIdeas: total ?? 0,
    };
  });
