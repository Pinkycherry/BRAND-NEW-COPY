import { createServerFn } from "@tanstack/react-start";

import { dbOrNull } from "./db";

/**
 * Live counts for the /lists hub. Every number on that page comes from here,
 * read from published rows, so nothing on the page is typed by hand.
 */
export type ListsCounts = {
  total: number;
  byCategory: Record<string, number>;
  bySubcategory: Record<string, number>;
  byBand: Record<string, number>;
  /** Named combinations used by the budget cards, keyed by card id. */
  combos: Record<string, number>;
};

type Row = {
  category_code: string;
  subcategory_code: string;
  investment_band: string | null;
  gender_fit: string | null;
  life_stage: string[] | null;
  place: string[] | null;
  work_mode: string | null;
};

const EMPTY: ListsCounts = { total: 0, byCategory: {}, bySubcategory: {}, byBand: {}, combos: {} };

const has = (list: string[] | null, value: string) => !!list && list.includes(value);
const lowCost = (r: Row) => r.investment_band === "zero" || r.investment_band === "under_25k";

/** Budget-card filters. Each id is used once in src/routes/lists.tsx. */
const COMBOS: Record<string, (r: Row) => boolean> = {
  "zero-women": (r) => r.investment_band === "zero" && r.gender_fit === "women",
  "zero-students": (r) => r.investment_band === "zero" && has(r.life_stage, "student"),
  "zero-online": (r) => r.investment_band === "zero" && r.work_mode === "online",
  "low-home": (r) => lowCost(r) && r.work_mode === "home",
  "low-homemakers": (r) => lowCost(r) && has(r.life_stage, "homemaker"),
  "low-village": (r) => lowCost(r) && has(r.place, "village"),
};

export const getListsCounts = createServerFn({ method: "GET" }).handler(
  async (): Promise<ListsCounts> => {
    const client = dbOrNull();
    if (!client) return EMPTY;
    const rows: Row[] = [];
    const PAGE = 1000;
    for (let from = 0; from < 50000; from += PAGE) {
      const { data, error } = await client
        .from("ideas")
        .select("category_code,subcategory_code,investment_band,gender_fit,life_stage,place,work_mode")
        .eq("status", "published")
        .order("code", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) return EMPTY;
      rows.push(...((data ?? []) as Row[]));
      if (!data || data.length < PAGE) break;
    }
    const out: ListsCounts = { total: rows.length, byCategory: {}, bySubcategory: {}, byBand: {}, combos: {} };
    for (const r of rows) {
      out.byCategory[r.category_code] = (out.byCategory[r.category_code] ?? 0) + 1;
      out.bySubcategory[r.subcategory_code] = (out.bySubcategory[r.subcategory_code] ?? 0) + 1;
      const band = r.investment_band ?? "unknown";
      out.byBand[band] = (out.byBand[band] ?? 0) + 1;
      for (const [id, test] of Object.entries(COMBOS)) if (test(r)) out.combos[id] = (out.combos[id] ?? 0) + 1;
    }
    return out;
  },
);
