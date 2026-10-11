#!/usr/bin/env node
/**
 * Loads checked content into Supabase. Run by the founder only, normally
 * through the "Import content" GitHub Action, which supplies the secrets.
 *
 *   node scripts/import-content.mjs                 every file under content/
 *   node scripts/import-content.mjs content/C001    one category folder
 *   node scripts/import-content.mjs --taxonomy      also load audience, keywords
 *                                                   and search intent for all
 *                                                   1,000 subcategories
 *
 * Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.
 * Refuses to import anything if the checker finds a single error.
 * Safe to run again: every write is an upsert keyed on the idea code.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = new URL("..", import.meta.url).pathname;
const args = process.argv.slice(2);
const withTaxonomy = args.includes("--taxonomy");
const only = args.filter((a) => !a.startsWith("--"));

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

function files() {
  const base = join(ROOT, "content");
  if (!existsSync(base)) return [];
  const out = [];
  for (const c of readdirSync(base).sort()) {
    const dir = join(base, c);
    if (!/^C\d{3}$/.test(c) || !statSync(dir).isDirectory()) continue;
    for (const f of readdirSync(dir).sort()) if (/^S\d{2}\.json$/.test(f)) out.push(join(dir, f));
  }
  if (!only.length) return out;
  const wanted = only.map((p) => join(process.cwd(), p));
  return out.filter((f) => wanted.some((w) => f === w || f.startsWith(w + "/")));
}

async function upsert(table, rows, conflict) {
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await db.from(table).upsert(rows.slice(i, i + 500), { onConflict: conflict });
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

if (withTaxonomy) {
  const src = readFileSync(join(ROOT, "src/data/taxonomy.ts"), "utf8");
  const taxonomy = JSON.parse(src.slice(src.indexOf("= [") + 2).trim().replace(/;$/, ""));
  const details = JSON.parse(readFileSync(join(ROOT, "src/data/taxonomy-details.json"), "utf8"));
  const rows = [];
  for (const c of taxonomy) {
    c.subcategories.forEach((s, i) => {
      const d = details[s.slug] ?? {};
      rows.push({
        code: `C${String(c.n).padStart(3, "0")}-S${String(i + 1).padStart(2, "0")}`,
        category_code: `C${String(c.n).padStart(3, "0")}`,
        position: i + 1,
        name: s.name,
        slug: s.slug,
        target_people: d.targetPeople ?? [],
        keywords: d.keywords ?? [],
        search_intent: d.searchIntent ?? null,
        scope: d.scope ?? null,
      });
    });
  }
  await upsert("subcategories", rows, "code");
  console.log(`Taxonomy details loaded for ${rows.length} subcategories.`);
}

const list = files();
if (!list.length) {
  console.log("No content files to import.");
  process.exit(0);
}

const check = spawnSync(process.execPath, [join(ROOT, "scripts/validate-content.mjs"), ...list], { stdio: "inherit" });
if (check.status !== 0) {
  console.error("\nImport stopped: the checker found errors. Nothing was written.");
  process.exit(1);
}

let ideaCount = 0;
let flagged = 0;
for (const file of list) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const note = data.subcategory;
  const { error } = await db
    .from("subcategories")
    .update({ intro: note.intro, how_to_choose: note.how_to_choose, faq: note.faq })
    .eq("code", note.code);
  if (error) throw new Error(`${note.code}: ${error.message}`);

  const rows = data.ideas.map((idea, i) => ({
    code: idea.code,
    subcategory_code: note.code,
    category_code: note.code.slice(0, 4),
    position: i + 1,
    slug: idea.slug,
    title: idea.title,
    hook: idea.hook,
    summary: idea.summary,
    what_it_is: idea.what_it_is,
    who_pays_you: idea.who_pays_you,
    how_money_comes: idea.how_money_comes,
    what_you_need: idea.what_you_need,
    first_30_days: idea.first_30_days,
    what_hurts: idea.what_hurts,
    verdict: idea.verdict,
    faq: idea.faq,
    validate_prompt: idea.validate_prompt,
    investment_band: idea.investment_band,
    gender_fit: idea.gender_fit,
    life_stage: idea.life_stage,
    place: idea.place,
    work_mode: idea.work_mode,
    time_needed: idea.time_needed,
    skill_level: idea.skill_level,
    status: idea.confidence === "flagged" ? "flagged" : "published",
    flag_reason: idea.flag_reason ?? null,
    writer: idea.writer,
  }));
  flagged += rows.filter((r) => r.status === "flagged").length;
  await upsert("ideas", rows, "code");
  ideaCount += rows.length;
}
console.log(`Imported ${list.length} subcategories and ${ideaCount} ideas (${flagged} flagged, hidden until reviewed).`);
