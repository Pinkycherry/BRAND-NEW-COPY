import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { TAXONOMY } from "@/data/taxonomy";
import { dbOrNull } from "./db";
import { faqEntries, uniqueFaqBySource, type ListIdea } from "./lists.functions";

type CategoryPageData = {
  name: string;
  short: string;
  slug: string;
  intro: string;
  subs: { name: string; slug: string; count: number }[];
  ideas: ListIdea[];
  faq: { q: string; a: string; href?: string }[];
  total: number;
};

/** Category overview from the approved taxonomy and current published rows. */
export const getCategoryPage = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }): Promise<CategoryPageData | null> => {
    const category = TAXONOMY.find(c => c.slug === data.slug);
    if (!category) return null;
    const code = `C${String(category.n).padStart(3, "0")}`;
    const client = dbOrNull();
    const [subsResult, ideasResult] = client ? await Promise.all([
      client.from("subcategories").select("code,slug,faq").eq("category_code", code),
      client.from("ideas").select("slug,title,hook,summary,who_pays_you,how_money_comes,what_you_need,what_hurts,verdict,investment_band,time_needed,skill_level,updated_at,subcategory_code,faq")
        .eq("category_code", code).eq("status", "published").order("position").limit(1000),
    ]) : [{ data: [] }, { data: [] }];
    const rows = (ideasResult.data ?? []) as (ListIdea & { subcategory_code: string })[];
    const counts = new Map<string, number>();
    for (const idea of rows) counts.set(idea.subcategory_code, (counts.get(idea.subcategory_code) ?? 0) + 1);
    const subRows = new Map(((subsResult.data ?? []) as { code: string; slug: string; faq: unknown }[]).map(s => [s.slug, s]));
    const subs = category.subcategories.map(s => ({ name: s.name, slug: s.slug, count: counts.get(subRows.get(s.slug)?.code ?? "") ?? 0 }));
    const faqSources = category.subcategories.map(s => {
      const source = subRows.get(s.slug);
      const own = faqEntries(source?.faq).map(entry => ({ ...entry, href: `/lists/${s.slug}` }));
      const fromIdeas = rows.filter(i => i.subcategory_code === source?.code)
        .flatMap(idea => faqEntries(idea.faq).map(entry => ({ ...entry, href: `/idea/${idea.slug}` })));
      return [...own, ...fromIdeas];
    });
    const faq = uniqueFaqBySource([], faqSources);
    return {
      name: category.name,
      short: category.short,
      slug: category.slug,
      intro: `Explore ten more specific directions within ${category.name}. Read who each one may suit, then open the path that matches your situation.`,
      subs,
      ideas: rows.slice(0, 5),
      faq,
      total: rows.length,
    };
  });
