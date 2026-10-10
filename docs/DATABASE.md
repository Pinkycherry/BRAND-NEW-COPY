# Database (Supabase, free plan)

Built from zero on 10 October 2026 for BusinessIdea.io. The old site's database is separate and untouched.

## Setup files

Run once, in order, in the project's SQL Editor:

1. `supabase/001_schema.sql`: tables, rules, row level security, the two plans
2. `supabase/002_seed_taxonomy.sql`: 100 categories and 1,000 subcategories

Both are safe to run again. The last query of file 2 must show `100 | 1000 | 2`.

## Project values (public, safe to keep here)

| Item | Value |
|---|---|
| Project name | (fill in) |
| Project ref | (fill in) |
| Region | (fill in) |
| Project URL | (fill in) |
| Publishable / anon key | (fill in) |

## Secret values: never in any file

The secret / service_role key and the database password are stored only as GitHub repository secrets (Settings, Secrets and variables, Actions):

| Secret name | What |
|---|---|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret / service_role key, used only by the import job |
| `SUPABASE_DB_PASSWORD` | Database password |

GitHub encrypts these. Nobody can read them back, only replace them. If one is ever pasted into a chat or file, rotate it in Supabase at once.

## Site environment variables (Vercel project bbinewcopy)

| Name | Value |
|---|---|
| `VITE_IDEAVAULT_DB_URL` | Project URL |
| `VITE_IDEAVAULT_DB_ANON_KEY` | Publishable / anon key |
| `IDEAVAULT_DB_URL` | Project URL |
| `IDEAVAULT_DB_ANON_KEY` | Publishable / anon key |
