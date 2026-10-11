#!/usr/bin/env node
/**
 * Checks idea files before they may be imported.
 *
 *   node scripts/validate-content.mjs                    every file under content/
 *   node scripts/validate-content.mjs content/C001/S02.json   one or more files
 *
 * A file is one subcategory: its research note plus its 10 ideas.
 * Path: content/C001/S02.json. Format: docs/WRITER_GUIDE.md.
 *
 * Exit code 0 = every checked file passed. Errors block import; warnings do not.
 * Duplicate slugs, titles and sentences are checked against ALL files under
 * content/, not only the ones named, so a writer cannot collide with another.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const CONTENT = join(ROOT, "content");

const WRITERS = ["BusinessIdea.io", "Agent 1", "Agent 2", "Agent 3", "Agent 4", "Agent 5", "Agent 6"];
const BANDS = ["zero", "under_25k", "25k_1l", "1l_5l", "above_5l"];
const GENDER = ["any", "women", "men"];
const LIFE = ["any", "student", "homemaker", "working_professional", "senior_citizen"];
const PLACE = ["any", "village", "small_town", "city", "metro"];
const MODE = ["home", "shop", "online", "field", "mixed"];
const TIME = ["part_time", "full_time", "weekends"];
const SKILL = ["none", "basic", "trained"];

// Word ranges per field: [min, max].
const IDEA_WORDS = {
  title: [3, 9],
  hook: [12, 25],
  summary: [35, 60],
  what_it_is: [70, 140],
  who_pays_you: [45, 120],
  how_money_comes: [50, 120],
  what_you_need: [40, 100],
  what_hurts: [50, 120],
  verdict: [30, 80],
};
const NOTE_WORDS = { intro: [200, 350], how_to_choose: [80, 150] };

// Text that must never appear in visitor copy.
const BANNED = [
  [/\$|\bUSD\b|\bdollars?\b|\bRs\.?\s?\d/i, "use ₹ only (no $, USD, dollars or 'Rs')"],
  [/\bsources?\b|\bcited\b|\baccording to\b|\breference[sd]?\b/i, "no sources, citations or references"],
  [/https?:\/\/|www\.|\.(com|in|org|net|io)\b/i, "no links or website names"],
  [/\d+(\.\d+)?\s?%|\bper ?cent\b/i, "no percentages or statistics"],
  [/\b(crore|lakh)s? (people|users|customers|households|indians)\b/i, "no market-size statistics"],
  [/\bI (charge|sell|deliver|cook|run|started|will charge|will sell|will deliver|offer)\b/, "operator first person: write 'you charge', not 'I charge'"],
  [/\bmy (customers|clients|business|shop|kitchen|orders)\b/i, "operator first person: write 'your customers'"],
  [/\bwe (charge|sell|deliver|cook|offer)\b/i, "operator first person: write 'you'"],
  [/\b(ChatGPT|Claude|Gemini|Grok|Copilot|OpenAI|Anthropic)\b/i, "never name an AI tool"],
];

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

const words = (s) => (typeof s === "string" ? s.trim().split(/\s+/).filter(Boolean).length : 0);
const sentences = (s) =>
  String(s)
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim().toLowerCase().replace(/[^a-z0-9 ]/g, ""))
    .filter((x) => x.split(" ").length >= 8);

function allFiles() {
  if (!existsSync(CONTENT)) return [];
  const out = [];
  for (const c of readdirSync(CONTENT)) {
    const dir = join(CONTENT, c);
    if (!/^C\d{3}$/.test(c) || !statSync(dir).isDirectory()) continue;
    for (const f of readdirSync(dir)) if (/^S\d{2}\.json$/.test(f)) out.push(join(dir, f));
  }
  return out.sort();
}

function load(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    err(rel(file), `not valid JSON (${e.message})`);
    return null;
  }
}
const rel = (f) => relative(ROOT, f).split(sep).join("/");

// Questions and the Validate prompt are the reader speaking, so "I" is right
// there; the operator-first-person rules apply only to the narrator's text.
function checkText(file, where, text, readerVoice = false) {
  if (typeof text !== "string") return;
  for (const [re, why] of BANNED) {
    if (readerVoice && why.startsWith("operator first person")) continue;
    if (re.test(text)) err(file, `${where}: ${why}`);
  }
  if (/—|–/.test(text)) warn(file, `${where}: long dash, use a comma, colon or full stop`);
}

function checkRange(file, where, text, [min, max]) {
  const n = words(text);
  if (typeof text !== "string" || !text.trim()) return err(file, `${where}: missing`);
  if (n < min || n > max) err(file, `${where}: ${n} words, needs ${min} to ${max}`);
  checkText(file, where, text);
}

function checkFaq(file, where, faq, count) {
  if (!Array.isArray(faq) || faq.length !== count) return err(file, `${where}: needs exactly ${count} items`);
  faq.forEach((item, i) => {
    if (!item || typeof item.q !== "string" || typeof item.a !== "string" || !item.q.trim() || !item.a.trim())
      return err(file, `${where}[${i + 1}]: needs "q" and "a"`);
    if (words(item.a) < 20 || words(item.a) > 90) err(file, `${where}[${i + 1}].a: ${words(item.a)} words, needs 20 to 90`);
    checkText(file, `${where}[${i + 1}].q`, item.q, true);
    checkText(file, `${where}[${i + 1}]`, item.a);
  });
}

const oneOf = (file, where, v, list) => {
  if (!list.includes(v)) err(file, `${where}: "${v}" is not one of ${list.join(", ")}`);
};
const someOf = (file, where, v, list) => {
  if (!Array.isArray(v) || v.length === 0) return err(file, `${where}: needs a list with at least one value`);
  for (const x of v) oneOf(file, where, x, list);
};

function similar(a, b) {
  const A = new Set(a.toLowerCase().split(/\W+/).filter((w) => w.length > 2));
  const B = new Set(b.toLowerCase().split(/\W+/).filter((w) => w.length > 2));
  const inter = [...A].filter((w) => B.has(w)).length;
  return inter / Math.max(1, Math.min(A.size, B.size));
}

// ---------------------------------------------------------------- run
const every = allFiles();
const named = process.argv.slice(2).map((p) => join(process.cwd(), p));
const targets = named.length ? named : every;
const targetSet = new Set(targets.map(rel));

const seenSlug = new Map();
const seenTitle = new Map();
const seenSentence = new Map();

for (const path of every.concat(named.filter((p) => !every.includes(p)))) {
  const file = rel(path);
  const checking = targetSet.has(file);
  const data = existsSync(path) ? load(path) : (err(file, "file not found"), null);
  if (!data) continue;

  const m = file.match(/^content\/(C\d{3})\/(S\d{2})\.json$/);
  if (!m) {
    if (checking) err(file, "must live at content/C###/S##.json");
    continue;
  }
  const subCode = `${m[1]}-${m[2]}`;
  const ideas = Array.isArray(data.ideas) ? data.ideas : [];

  // Cross-file registers (every file feeds them; only targets report).
  ideas.forEach((idea, i) => {
    const where = `${file} idea ${i + 1}`;
    if (idea?.slug) {
      if (seenSlug.has(idea.slug) && checking) err(file, `idea ${i + 1}: slug "${idea.slug}" already used in ${seenSlug.get(idea.slug)}`);
      else seenSlug.set(idea.slug, where);
    }
    if (idea?.title) {
      const t = idea.title.toLowerCase().trim();
      if (seenTitle.has(t) && checking) err(file, `idea ${i + 1}: title already used in ${seenTitle.get(t)}`);
      else seenTitle.set(t, where);
    }
    for (const field of ["hook", "summary", "what_it_is", "who_pays_you", "how_money_comes", "what_you_need", "what_hurts", "verdict"]) {
      for (const s of sentences(idea?.[field])) {
        if (seenSentence.has(s) && seenSentence.get(s) !== where && checking)
          err(file, `idea ${i + 1} ${field}: sentence repeated from ${seenSentence.get(s)}: "${s.slice(0, 60)}..."`);
        else seenSentence.set(s, where);
      }
    }
  });
  if (!checking) continue;

  // Research note.
  const note = data.subcategory;
  if (!note || note.code !== subCode) err(file, `subcategory.code must be "${subCode}"`);
  else {
    for (const [k, r] of Object.entries(NOTE_WORDS)) checkRange(file, `subcategory.${k}`, note[k], r);
    checkFaq(file, "subcategory.faq", note.faq, 4);
  }

  // Ideas.
  if (ideas.length !== 10) err(file, `needs exactly 10 ideas, found ${ideas.length}`);
  ideas.forEach((idea, i) => {
    const n = i + 1;
    const w = (f) => `idea ${n} ${f}`;
    const want = `${subCode}-I${String(n).padStart(2, "0")}`;
    if (idea.code !== want) err(file, `${w("code")}: must be "${want}"`);
    if (typeof idea.slug !== "string" || !/^[a-z0-9]+(-[a-z0-9]+){1,7}$/.test(idea.slug))
      err(file, `${w("slug")}: lowercase words joined by hyphens, 2 to 8 words`);
    else if (/business-ideas?$/.test(idea.slug)) err(file, `${w("slug")}: do not end with "business-idea"`);
    if (/business ideas?$/i.test(idea.title || "")) err(file, `${w("title")}: do not end with "Business Idea"`);
    for (const [k, r] of Object.entries(IDEA_WORDS)) checkRange(file, w(k), idea[k], r);
    if (!Array.isArray(idea.first_30_days) || idea.first_30_days.length < 4 || idea.first_30_days.length > 6)
      err(file, `${w("first_30_days")}: needs 4 to 6 steps`);
    else idea.first_30_days.forEach((s, j) => {
      if (words(s) < 6 || words(s) > 35) err(file, `${w("first_30_days")}[${j + 1}]: ${words(s)} words, needs 6 to 35`);
      checkText(file, `${w("first_30_days")}[${j + 1}]`, s);
    });
    checkFaq(file, w("faq"), idea.faq, 3);
    const vp = idea.validate_prompt || "";
    const vs = vp.split(/(?<=[.?!])\s+/).filter(Boolean).length;
    if (!vp.trim() || vs > 3 || words(vp) < 12 || words(vp) > 70) err(file, `${w("validate_prompt")}: 1 to 3 sentences, 12 to 70 words`);
    checkText(file, w("validate_prompt"), vp, true);
    oneOf(file, w("investment_band"), idea.investment_band, BANDS);
    oneOf(file, w("gender_fit"), idea.gender_fit, GENDER);
    someOf(file, w("life_stage"), idea.life_stage, LIFE);
    someOf(file, w("place"), idea.place, PLACE);
    oneOf(file, w("work_mode"), idea.work_mode, MODE);
    oneOf(file, w("time_needed"), idea.time_needed, TIME);
    oneOf(file, w("skill_level"), idea.skill_level, SKILL);
    oneOf(file, w("confidence"), idea.confidence, ["confident", "flagged"]);
    if (idea.confidence === "flagged" && !String(idea.flag_reason || "").trim()) err(file, `${w("flag_reason")}: needed when flagged`);
    oneOf(file, w("writer"), idea.writer, WRITERS);
  });

  // Titles too alike inside one subcategory.
  for (let a = 0; a < ideas.length; a += 1)
    for (let b = a + 1; b < ideas.length; b += 1)
      if (ideas[a]?.title && ideas[b]?.title && similar(ideas[a].title, ideas[b].title) >= 0.75)
        err(file, `ideas ${a + 1} and ${b + 1}: titles too alike ("${ideas[a].title}" / "${ideas[b].title}")`);
}

for (const w of warnings) console.log(`warning  ${w}`);
for (const e of errors) console.log(`ERROR    ${e}`);
const checked = targets.length;
if (errors.length) {
  console.log(`\n${errors.length} error(s) in ${checked} file(s). Fix every ERROR, then run again.`);
  process.exit(1);
}
console.log(`\nPassed: ${checked} file(s), ${warnings.length} warning(s).`);
