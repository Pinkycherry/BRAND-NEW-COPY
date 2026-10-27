# BusinessIdea.io: working rules for Claude

## Commits: always straight to main (founder rule, 28 Oct 2026)

Every commit goes to `main` and is pushed to `main`. No side branches, no pull
requests, nothing for the founder to merge by hand. `main` deploys
https://bbinewcopy.vercel.app automatically. After each push, give the founder
the live page links (not commit links) and add an entry to the site copy log
artifact: https://claude.ai/artifact/RLTddg7r1u7RFnFi76rzVj

## Links: always full, clickable URLs

Whenever you point the founder to any place (a repo file, a GitHub setting, a
PR, a Supabase screen, a Vercel page, an artifact, any website), give the full
URL that opens that exact place in one click. Never a path like
"Settings → Secrets and variables → Actions" or "src/routes/...", and never a
placeholder link.

Common ones:

| Place | URL |
|---|---|
| Repo | https://github.com/Pinkycherry/BRAND-NEW-COPY |
| A file on main | https://github.com/Pinkycherry/BRAND-NEW-COPY/blob/main/PATH |
| GitHub Actions secrets | https://github.com/Pinkycherry/BRAND-NEW-COPY/settings/secrets/actions |
| "Import content" workflow | https://github.com/Pinkycherry/BRAND-NEW-COPY/actions/workflows/import-content.yml |
| Pull requests | https://github.com/Pinkycherry/BRAND-NEW-COPY/pulls |
| Supabase project | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux |
| Supabase API keys | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux/settings/api-keys |
| Supabase table editor | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux/editor |
| Supabase SQL editor | https://supabase.com/dashboard/project/ubuavzcuwvvedojsrmux/sql/new |
| Staging site | https://bbinewcopy.vercel.app |
| Connectors in claude.ai | https://claude.ai/customize/connectors |

## Talking to the founder

Plain, short replies. Spoon-feed steps: numbered, one action each, with the
full URL for every place. He works night shifts; never assume a 9-to-5 day.

## Secrets

Never store a secret key (Supabase service_role, database password, API
tokens) in a file, commit or artifact. If one is pasted into chat, advise
rotating it at the Supabase API keys URL above and putting the new one only
in GitHub Actions secrets.
