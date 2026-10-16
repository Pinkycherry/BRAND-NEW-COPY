#!/usr/bin/env node
/**
 * Builds the 200 batch prompts (5 subcategories = 50 ideas each) from the
 * fixed taxonomy and docs/BATCH_PROMPT.md.
 *
 *   node scripts/build-batch-prompts.mjs            prints a summary
 *   node scripts/build-batch-prompts.mjs --json F   writes all batches to F
 *   node scripts/build-batch-prompts.mjs --one B023 prints one full prompt
 *
 * Batch numbering: B001 = C001 S01-S05, B002 = C001 S06-S10, ... B200.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const src = readFileSync(join(ROOT, "src/data/taxonomy.ts"), "utf8");
const taxonomy = JSON.parse(src.slice(src.indexOf("= [") + 2).trim().replace(/;$/, ""));
const details = JSON.parse(readFileSync(join(ROOT, "src/data/taxonomy-details.json"), "utf8"));
const doc = readFileSync(join(ROOT, "docs/BATCH_PROMPT.md"), "utf8");
const rules = doc.split("<!-- PROMPT START -->")[1].split("<!-- PROMPT END -->")[0].trim();

const pad = (n, w) => String(n).padStart(w, "0");

export function batches() {
  const out = [];
  for (const c of taxonomy) {
    const cc = `C${pad(c.n, 3)}`;
    for (const half of [0, 1]) {
      const subs = c.subcategories.slice(half * 5, half * 5 + 5).map((s, i) => {
        const pos = half * 5 + i + 1;
        const d = details[s.slug] ?? {};
        return {
          code: `${cc}-S${pad(pos, 2)}`,
          name: s.name,
          people: d.targetPeople ?? [],
          keywords: (d.keywords ?? []).slice(0, 8),
        };
      });
      out.push({ id: `B${pad(out.length + 1, 3)}`, category: cc, categoryName: c.name, subs });
    }
  }
  return out;
}

export function batchBlock(b) {
  const lines = [
    `YOUR BATCH: ${b.id}`,
    `Category ${b.category}: ${b.categoryName}`,
    `This batch has 5 subcategories. Write 10 ideas for each, using the idea codes shown.`,
    "",
  ];
  b.subs.forEach((s, i) => {
    lines.push(
      `Subcategory ${i + 1} of 5: ${s.code} ${s.name}`,
      `Idea codes: ${s.code}-I01 to ${s.code}-I10`,
      `Who looks for this: ${s.people.join(", ")}`,
      `What they type in search: ${s.keywords.join("; ")}`,
      "",
    );
  });
  lines.push(`Start now with subcategory 1 (${b.subs[0].code}). Reply with the code block only.`);
  return lines.join("\n");
}

export const prompt = (b) => rules.replace("{{BATCH}}", batchBlock(b));

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const all = batches();
  const i = process.argv.indexOf("--json");
  const one = process.argv.indexOf("--one");
  if (i > 0) {
    writeFileSync(process.argv[i + 1], JSON.stringify({ rules, batches: all }));
    console.log(`Wrote ${all.length} batches to ${process.argv[i + 1]}`);
  } else if (one > 0) {
    console.log(prompt(all.find((b) => b.id === process.argv[one + 1])));
  } else {
    console.log(`${all.length} batches, ${all.reduce((n, b) => n + b.subs.length, 0)} subcategories.`);
  }
}
