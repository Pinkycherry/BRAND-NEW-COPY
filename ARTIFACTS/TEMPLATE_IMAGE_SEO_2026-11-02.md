# Image SEO correction — 2026-11-02 17:13 IST

Founder decision: **16:9 only** for every new featured or thumbnail image, on phone and desktop. The earlier three template image attempts are rejected and stored outside the repository. Any earlier 4:5 or 1:1 recommendation in handover notes is superseded. Keep image files small as compressed local WebP; retain a 16:9 display box and intrinsic dimensions, without stretching.

`IMAGE_SEO.md` is the existing six-field contract. Each image needs a semantic lowercase `.webp` filename with at least five topical keywords, a ten-word natural alt sentence, one focus keyword, three supporting keywords, two long-tail phrases and a context-led description. The description concerns the business topic, the page content and BusinessIdea.io; it must not narrate colours, faces, poses or the visual style. The page must use the same image in `og:image`, `og:image:alt` and Twitter large-image metadata. Above-fold images load eagerly; below-fold images load lazily.

The template-family implementation keeps those fields in `src/config/template-imagery.ts`. Three optimized 1600×900 WebP assets are under `public/images/templates/`. Those specific entries are a local implementation, **not** a claim that the entire site's image SEO is done.

**PENDING: site-wide SEO audit and repair.** Review every page's slug, title, meta description, heading hierarchy, canonical/social metadata, focus/supporting keywords, image filename, alt, dimensions, file size and structured data. No site-wide SEO completion is claimed. The founder explicitly called current site-wide SEO and image SEO inadequate.
