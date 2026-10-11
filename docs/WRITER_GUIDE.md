# Writer Guide

Everything a writer needs to write ideas for BusinessIdea.io. Read it fully once before your first file. The full plan is `docs/MASTER_PLAN.md`; this guide is the part you work from every day.

## 1. What you produce

One JSON file per subcategory, at `content/C###/S##.json`, holding:
- the subcategory's research note (`intro`, `how_to_choose`, 4 `faq`), and
- exactly 10 ideas for that subcategory.

The finished example to copy, in structure and in tone: **`content/C001/S01.json`**. Read all of it before you start.

Your list of categories and subcategories, in order, with names and slugs: `src/data/taxonomy.ts`. The audience, keywords and search intent for each subcategory: `src/data/taxonomy-details.json` (look it up by the subcategory slug). File codes follow the order in `taxonomy.ts`: the 1st category is C001, its 3rd subcategory is S03, so its file is `content/C001/S03.json`.

## 2. How to write one subcategory

1. Read the subcategory's entry in `taxonomy-details.json`: who it is for and what people search.
2. Plan 10 different businesses inside this subcategory. Each one must be a different business, not the same business described another way. Vary the customer, the place, the time of day, the skill or the delivery model.
3. Write the research note, then the 10 ideas, in the exact format of the example.
4. Run `node scripts/validate-content.mjs content/C###/S##.json` and fix every ERROR until it says Passed. Fix warnings too where you can.
5. Commit with the message `Agent N: C###-S## 10 ideas` and move to the next subcategory.

## 3. Fields and lengths

Research note (`subcategory`):

| Field | Length |
|---|---|
| `code` | `C###-S##`, same as the file |
| `intro` | 200 to 350 words |
| `how_to_choose` | 80 to 150 words |
| `faq` | exactly 4 items of `{ "q": ..., "a": ... }`, answers 20 to 90 words |

Each idea:

| Field | Length / allowed values |
|---|---|
| `code` | `C###-S##-I01` to `I10`, in order |
| `slug` | lowercase words joined by hyphens, 2 to 8 words, unique on the whole site, never ending in `business-idea` |
| `title` | 3 to 9 words, never ending in "Business Idea" |
| `hook` | 12 to 25 words |
| `summary` | 35 to 60 words |
| `what_it_is` | 70 to 140 words |
| `who_pays_you` | 45 to 120 words |
| `how_money_comes` | 50 to 120 words |
| `what_you_need` | 40 to 100 words |
| `first_30_days` | 4 to 6 steps, each 6 to 35 words |
| `what_hurts` | 50 to 120 words |
| `verdict` | 30 to 80 words, says "Build this if..." and "Walk away if..." |
| `faq` | exactly 3 items, answers 20 to 90 words |
| `validate_prompt` | 1 to 3 sentences, 12 to 70 words, the reader asking about this exact idea in India |
| `investment_band` | `zero`, `under_25k`, `25k_1l`, `1l_5l`, `above_5l` |
| `gender_fit` | `any`, `women`, `men` (use `any` unless the idea clearly fits one group better) |
| `life_stage` | list of `any`, `student`, `homemaker`, `working_professional`, `senior_citizen` |
| `place` | list of `any`, `village`, `small_town`, `city`, `metro` |
| `work_mode` | `home`, `shop`, `online`, `field`, `mixed` |
| `time_needed` | `part_time`, `full_time`, `weekends` |
| `skill_level` | `none`, `basic`, `trained` |
| `confidence` | `confident`, or `flagged` with a one-line `flag_reason` |
| `writer` | your name exactly as given, e.g. `Agent 1` |

## 4. The voice (this is what readers pay for)

- Talk to one Indian person who wants to start something. Say **"you"**. They are the one who cooks, sells, charges, delivers.
- Sound like an elder brother or sister sitting across the table: warm, encouraging, honest. The reader should feel "this could be me".
- Describe the business as a picture of the reader's day, not as a list of orders. **Never write a field as a chain of commands.**

| Wrong (instruction manual) | Right (our voice) |
|---|---|
| Meet the bride before accepting the event. Conduct a paid trial in good light. | Before you take a wedding, you meet the bride and do a paid trial in good light, so she knows exactly how she will look and you know exactly what she wants. |
| Show a small set of inspected gifts suited to the occasion. | You show the family a few gifts you have checked yourself, the kind their guests will actually use. |
| Maintain a calendar and contingency plan. | Keep one calendar and a backup plan, because a bride will never forgive a makeup artist who did not turn up. |

- The narrator may say "I" only for an opinion ("I like this one for homemakers"). Never "I charge", "my customers", "we deliver".
- Short sentences. Simple Indian English. Everyday Indian words are welcome: dabba, kirana, mandi, mess, PG, society, UPI.
- Honest. Every idea says what will hurt and ends with a straight verdict, including when to walk away.
- India only: Indian customers, places, festivals, habits, payment by UPI.

## 5. Never

- No sources, references, citations, links or website names. We are the source.
- No statistics, percentages or market sizes. No exact prices or earnings presented as fact. For real numbers the reader taps **Validate**; say so where it helps ("tap Validate for today's numbers in your area").
- No dollars or foreign currency. Rupees only, written ₹ with Indian grouping (₹1,00,000).
- No names of AI tools.
- No copied sentences. The checker compares every sentence with every other file on the site.
- No long dashes (— or –). Use a comma, a colon or a full stop.
- Never edit a file outside your own categories, and never edit site code, `src/data/`, `docs/` or `scripts/`.

## 6. Confidence

Mark an idea `flagged` only if it is **illegal, clearly dangerous for an untrained person, or does not work in India at all**. Everything else is `confident`.

Not reasons to flag: needing FSSAI registration, a trade licence, a permit, basic electrical or safety training, insurance, or local rules. Those go into `what_you_need` and `what_hurts`, written plainly, and the idea stays `confident`. A flagged idea is hidden from the site, so over-flagging throws away good ideas.

## 7. Do not repeat ideas from other categories

Many categories overlap (work from home, home based, women friendly, local service). Before planning a subcategory, look at the titles already written in `content/` for similar subcategories, including the example `content/C001/S01.json`. If a business already exists anywhere on the site, do not write it again under a new name. Find a genuinely different business.
