# BusinessIdea.io: category architecture site

The site layout, header, footer, styles, motion and page templates of the live
BBI site (bbusiness.online), carried over and rebuilt around the approved
**100 main categories x 10 subcategories** architecture.

## What is indexed

- `/category/<category>`: 100 main category pages, each listing its ten subcategories.
- `/category/<category>/<subcategory>`: 1,000 subcategory pages. Each one shows who it suits,
  what people search for and what it will cover. The ideas section stays empty until ideas are added.
- No idea pages. `/idea/*`, lists, FAQ, India Atlas and validate routes were removed.

`/sitemap-categories.xml` lists exactly these 1,100 URLs. `/sitemap-index.xml` is the one to submit.

## Data

| File | What | Loaded where |
|---|---|---|
| `src/data/taxonomy.ts` | Names and slugs for 100 categories and 1,000 subcategories | Browser and server (nav, browse, search) |
| `src/data/taxonomy-details.json` | Per subcategory: target people, ten focus keywords, search intent, scope | Server only, through `src/lib/taxonomy.functions.ts` |

Both files are generated from the approved sheet (`bbi-category-architecture.html`).
Do not hand-edit slugs. Helpers live in `src/lib/catalog.ts`.

## Run

```
bun install
bun run dev      # vite dev
bun run build    # Cloudflare Workers output in .output/
```

Optional environment (the blog, newsletter and Google sign-in use them; every category page works without):
`VITE_IDEAVAULT_DB_URL`, `VITE_IDEAVAULT_DB_ANON_KEY` (build), `IDEAVAULT_DB_URL`, `IDEAVAULT_DB_ANON_KEY` (runtime).

Packages: bun only. `bun.lock` is the only lockfile.
