/**
 * India topic pages on the purchased topics layout.
 *
 * Markup and class names are the seller's topics components (breadcrumb bar,
 * hero, card grid, accordion FAQ, CTA band) and the page loads the seller's
 * own stylesheet from public/bought/topics/. Every word, link and SEO field
 * comes from the page's data file in src/data/topic-pages*.ts, so titles and
 * slugs can be renamed there without touching this file. Header and footer
 * are the shared site header and footer.
 */
import menuPanels from "./menu-panels.json";
import menuBindings from "./menus.html?raw";
import sharedHeaderStyles from "@/components/v2/v2.css?raw";
import sellerShell from "./topics.html?raw";
import { canonicalUrl, CO_FOUNDER, TEAM } from "@/lib/site-config";

export type Link = { label: string; href: string; note?: string };
export type Section =
  | { type: "takeaways"; heading: string; intro?: string; items: string[] }
  | { type: "steps"; heading: string; intro?: string; items: { title: string; body: string; check?: string }[] }
  | { type: "table"; heading: string; intro?: string; columns: string[]; rows: string[][]; note?: string }
  | { type: "list"; heading: string; intro?: string; items: { title: string; body: string }[] }
  | { type: "cards"; heading: string; intro?: string; items: { title: string; body: string; href?: string; cta?: string }[] }
  | { type: "quiz"; heading: string; intro?: string; items: string[]; result: string }
  | { type: "faq"; heading: string; intro?: string; items: { q: string; a: string }[] }
  | { type: "sources"; heading: string; items: Link[] }
  | { type: "chips"; heading: string; intro?: string; items: Link[] }
  | { type: "cta"; heading: string; body: string; button: Link; note?: string };

export type TopicPage = {
  slug: string;
  sellerRef: string;
  /** ISO date of the last content review, shown on the page and in schema. */
  updated: string;
  parent: Link;
  seo: { title: string; description: string };
  hero: { eyebrow: string; h1: string; highlight?: string; intro: string; sub?: string; updated: string; primary: Link; secondary?: Link; image: string; imageAlt: string };
  sections: Section[];
};

const STYLE = (() => {
  const blocks = [...sellerShell.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  return blocks.join("\n");
})();

const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
/** Inline emphasis: **bold** only. */
const rich = (v: string) =>
  esc(v)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
    .replace(/\[([^\]]+)\]\((\/[^)\s]*|#[^)\s]*)\)/g, '<a class="text-primary underline-offset-2 hover:underline" href="$2">$1</a>');

const ICON = {
  arrow: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[18px] h-[18px] text-primary shrink-0 mt-0.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  chevron: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  sep: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  alert: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[18px] h-[18px] text-amber-600 shrink-0 mt-0.5" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
};

const BTN = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation active:scale-[0.98] active:opacity-90 h-12 rounded-lg px-6 text-base min-h-[48px] w-full sm:w-auto";
const BTN_DARK = `${BTN} bg-slate-900 text-white hover:bg-slate-700 shadow-sm hover:shadow-md`;
const BTN_LIGHT = `${BTN} border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-900 shadow-sm`;
const CARD = "rounded-lg border bg-card text-card-foreground shadow-sm h-full";
const SEC = ["py-10 md:py-12 px-4", "py-10 md:py-12 px-4 bg-muted/20 border-y border-border/40"];

function head(title: string, sub?: string) {
  return `<div class="flex items-end justify-between mb-6"><div><h2 class="text-xl md:text-2xl font-bold mb-1">${esc(title)}</h2>${sub ? `<p class="text-sm text-muted-foreground">${rich(sub)}</p>` : ""}</div></div>`;
}

let faqId = 0;
const ANCHOR: Partial<Record<Section["type"], string>> = { steps: "steps", list: "mistakes", quiz: "check" };
let used = new Set<string>();
function anchorFor(s: Section): string {
  const id = "heading" in s && /^compare/i.test(s.heading) ? "compare" : ANCHOR[s.type];
  if (!id || used.has(id)) return "";
  used.add(id);
  return ` id="${id}"`;
}

function section(s: Section, i: number): string {
  const tone = SEC[i % 2];
  const anchor = anchorFor(s);
  const wrap = (inner: string, width = "max-w-6xl") => `<section${anchor} class="${tone} scroll-mt-24"><div class="container mx-auto ${width}">${inner}</div></section>`;
  switch (s.type) {
    case "takeaways":
      return wrap(`${head(s.heading, s.intro)}<ul class="grid md:grid-cols-2 gap-3">${s.items.map((t) => `<li class="flex gap-3 ${CARD} p-4 text-[15px] leading-relaxed">${ICON.check}<span>${rich(t)}</span></li>`).join("")}</ul>`, "max-w-5xl");
    case "steps":
      return wrap(`${head(s.heading, s.intro)}<ol class="space-y-3">${s.items.map((st, n) => `<li class="${CARD} p-5"><div class="flex gap-4"><span class="w-9 h-9 shrink-0 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center">${n + 1}</span><div><h3 class="font-semibold text-[16px] mb-1">${esc(st.title)}</h3><p class="text-sm text-muted-foreground leading-relaxed">${rich(st.body)}</p>${st.check ? `<p class="mt-3 text-sm rounded-md bg-primary/5 border border-primary/15 px-3 py-2"><span class="font-semibold text-foreground">Try this now:</span> ${rich(st.check)}</p>` : ""}</div></div></li>`).join("")}</ol>`, "max-w-4xl");
    case "table":
      return wrap(`${head(s.heading, s.intro)}<div class="overflow-x-auto rounded-xl border border-border/60 bg-white"><table class="w-full text-sm"><thead class="bg-muted/40"><tr>${s.columns.map((c) => `<th class="text-left font-semibold px-4 py-3">${esc(c)}</th>`).join("")}</tr></thead><tbody>${s.rows.map((r) => `<tr class="border-t border-border/50">${r.map((c, k) => `<td class="px-4 py-3 align-top ${k === 0 ? "font-medium text-foreground" : "text-muted-foreground"}">${rich(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${s.note ? `<p class="text-xs text-muted-foreground mt-3">${rich(s.note)}</p>` : ""}`, "max-w-5xl");
    case "list":
      return wrap(`${head(s.heading, s.intro)}<div class="grid md:grid-cols-2 gap-3">${s.items.map((m) => `<div class="${CARD} p-5"><div class="flex gap-3">${ICON.alert}<div><h3 class="font-semibold text-[15px] mb-1">${esc(m.title)}</h3><p class="text-sm text-muted-foreground leading-relaxed">${rich(m.body)}</p></div></div></div>`).join("")}</div>`, "max-w-5xl");
    case "cards":
      return wrap(`${head(s.heading, s.intro)}<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">${s.items.map((c, n) => {
        const body = `<div class="${CARD} ${c.href ? "hover:border-primary hover:shadow-md transition-all" : ""} animate-fade-up" style="animation-delay: ${(n * 0.04).toFixed(2)}s;"><div class="p-5"><h3 class="font-semibold text-[15px] mb-1 ${c.href ? "group-hover:text-primary transition-colors" : ""}">${esc(c.title)}</h3><p class="text-xs text-muted-foreground mb-3 leading-relaxed">${rich(c.body)}</p>${c.href ? `<span class="inline-flex items-center gap-1 text-xs font-medium text-primary">${esc(c.cta ?? "Open")} ${ICON.arrow}</span>` : ""}</div></div>`;
        return c.href ? `<a class="group" href="${esc(c.href)}">${body}</a>` : body;
      }).join("")}</div>`);
    case "quiz":
      return wrap(`${head(s.heading, s.intro)}<div class="bg-white rounded-xl border border-border/60 p-5" data-topic-quiz><ul class="space-y-2">${s.items.map((q, n) => `<li><label class="flex gap-3 items-start text-[15px] cursor-pointer"><input type="checkbox" class="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" data-q="${n}"><span>${rich(q)}</span></label></li>`).join("")}</ul><p class="mt-4 text-sm text-muted-foreground" data-quiz-out data-total="${s.items.length}">Tick what is true for you today. ${rich(s.result)}</p></div>`, "max-w-3xl");
    case "faq":
      return wrap(`<h2 class="text-xl md:text-2xl font-bold mb-1">${esc(s.heading)}</h2>${s.intro ? `<p class="text-sm text-muted-foreground mb-6">${rich(s.intro)}</p>` : '<div class="mb-6"></div>'}<div class="bg-white rounded-xl border border-border/60 px-4" data-orientation="vertical">${s.items.map((f) => {
        const id = `topic-faq-${++faqId}`;
        return `<div data-state="closed" class="border-b last:border-b-0"><h3 class="flex"><button type="button" aria-controls="${id}" aria-expanded="false" data-state="closed" class="flex flex-1 items-center justify-between py-4 transition-all [&[data-state=open]>svg]:rotate-180 text-left text-[15px] font-medium hover:no-underline" data-topic-acc><span>${esc(f.q)}</span>${ICON.chevron}</button></h3><div id="${id}" hidden role="region" class="overflow-hidden text-sm"><div class="pb-4 pt-0 text-muted-foreground leading-relaxed">${rich(f.a)}</div></div></div>`;
      }).join("")}</div>`, "max-w-3xl");
    case "sources":
      return wrap(`${head(s.heading, "Official pages we checked for this guide. Rules change; confirm on the official page before you apply.")}<ul class="grid sm:grid-cols-2 gap-2 text-sm">${s.items.map((l) => `<li class="${CARD} px-4 py-3"><a class="text-primary hover:underline" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>${l.note ? `<p class="text-xs text-muted-foreground mt-1">${rich(l.note)}</p>` : ""}</li>`).join("")}</ul>`, "max-w-5xl");
    case "chips":
      return wrap(`${head(s.heading, s.intro)}<div class="flex flex-wrap gap-2">${s.items.map((l) => `<a class="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors" href="${esc(l.href)}">${esc(l.label)} ${ICON.arrow}</a>`).join("")}</div>`, "max-w-5xl");
    case "cta":
      return `<section class="py-10 md:py-14 px-4 bg-gradient-to-br from-brand-500/10 via-brand-400/5 to-background border-t border-border/40"><div class="container mx-auto max-w-3xl text-center"><h2 class="text-2xl md:text-3xl font-bold mb-3">${esc(s.heading)}</h2><p class="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">${rich(s.body)}</p><a class="${BTN_DARK}" href="${esc(s.button.href)}">${esc(s.button.label)} ${ICON.arrow}</a>${s.note ? `<p class="text-xs text-muted-foreground mt-3">${rich(s.note)}</p>` : ""}</div></section>`;
  }
}

function hero(p: TopicPage) {
  const h = p.hero;
  const title = h.highlight ? esc(h.h1).replace(esc(h.highlight), `<span class="gradient-text">${esc(h.highlight)}</span>`) : esc(h.h1);
  return `<section class="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/60 to-white py-8 md:py-10 lg:py-14 border-b border-border/40" aria-labelledby="topic-hero"><div aria-hidden="true" class="absolute -top-10 -right-20 w-[28rem] h-[28rem] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none animate-glow-float"></div><div class="container mx-auto max-w-6xl px-4 relative z-10"><div class="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center"><div class="lg:col-span-7 order-2 lg:order-1"><div class="flex items-center gap-2 mb-3 animate-fade-up flex-wrap"><span class="text-sm font-semibold tracking-tight text-slate-900">${esc(h.eyebrow)}</span><div class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold border-transparent bg-secondary text-secondary-foreground ml-auto sm:ml-2 text-[10px] sm:text-xs">${esc(h.updated)}</div></div><h1 id="topic-hero" class="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-3 md:mb-4 animate-fade-up" style="animation-delay: 0.05s;">${title}</h1><p class="text-[15px] md:text-lg text-muted-foreground max-w-2xl mb-3 md:mb-4 animate-fade-up" style="animation-delay: 0.1s;">${rich(h.intro)}</p>${h.sub ? `<p class="text-[13px] md:text-sm text-muted-foreground mb-5 md:mb-6 animate-fade-up leading-relaxed" style="animation-delay: 0.15s;">${rich(h.sub)}</p>` : ""}<div class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 animate-fade-up" style="animation-delay: 0.2s;"><a class="${BTN_DARK}" href="${esc(h.primary.href)}">${esc(h.primary.label)} ${ICON.arrow}</a>${h.secondary ? `<a class="${BTN_LIGHT}" href="${esc(h.secondary.href)}">${esc(h.secondary.label)}</a>` : ""}</div>${byline(p)}</div><div class="lg:col-span-5 order-1 lg:order-2"><div class="relative rounded-2xl overflow-hidden border border-border/60 shadow-lg animate-fade-up"><img src="${esc(h.image)}" alt="${esc(h.imageAlt)}" width="640" height="420" class="w-full h-auto object-cover" loading="eager" decoding="async"></div></div></div></div></section>`;
}

const REVIEWER = TEAM.find((m) => /verification/i.test(m.role)) ?? TEAM[0];
const longDate = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
function byline(p: TopicPage) {
  return `<p class="mt-5 text-[13px] text-muted-foreground leading-relaxed animate-fade-up" style="animation-delay: 0.25s;">Written by <a class="font-medium text-foreground hover:text-primary" href="/about">${esc(CO_FOUNDER.name)}</a>, editorial lead · Reviewed by <a class="font-medium text-foreground hover:text-primary" href="/about">${esc(REVIEWER.name)}</a>, research and verification · Last updated <time datetime="${esc(p.updated)}">${esc(longDate(p.updated))}</time></p>`;
}

function crumbs(p: TopicPage) {
  return `<div class="bg-muted/30 border-b pt-24 lg:pt-28 pb-3"><div class="container mx-auto max-w-6xl px-4"><nav class="flex flex-wrap items-center text-sm text-muted-foreground" aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-1.5 sm:gap-2.5"><li class="inline-flex items-center gap-1.5"><a aria-label="Home" class="flex items-center text-muted-foreground hover:text-primary" href="/">${ICON.home}</a></li><li class="mx-1" aria-hidden="true">${ICON.sep}</li><li class="inline-flex items-center gap-1.5"><a class="hover:text-primary" href="${esc(p.parent.href)}">${esc(p.parent.label)}</a></li><li class="mx-1" aria-hidden="true">${ICON.sep}</li><li class="inline-flex items-center gap-1.5"><span class="text-foreground font-medium">${esc(p.hero.eyebrow)}</span></li></ol></nav></div></div>`;
}

function schema(p: TopicPage) {
  const url = canonicalUrl(`/${p.slug}`);
  const faq = p.sections.find((s) => s.type === "faq") as Extract<Section, { type: "faq" }> | undefined;
  const graph: unknown[] = [
    { "@type": "Article", headline: p.hero.h1, description: p.seo.description, inLanguage: "en-IN", mainEntityOfPage: url, dateModified: p.updated, author: { "@type": "Person", name: CO_FOUNDER.name, url: canonicalUrl("/about") }, reviewedBy: { "@type": "Person", name: REVIEWER.name, url: canonicalUrl("/about") }, publisher: { "@type": "Organization", name: "BusinessIdea.io" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") }, { "@type": "ListItem", position: 2, name: p.parent.label, item: canonicalUrl(p.parent.href) }, { "@type": "ListItem", position: 3, name: p.hero.eyebrow, item: url }] },
  ];
  if (faq) graph.push({ "@type": "FAQPage", mainEntity: faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") } })) });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

const SCRIPT = `<script>(function(){document.querySelectorAll('[data-topic-acc]').forEach(function(b){b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')==='true';var r=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',String(!open));b.dataset.state=open?'closed':'open';b.closest('[data-state]').dataset.state=open?'closed':'open';if(r)r.hidden=open;});});document.querySelectorAll('[data-topic-quiz]').forEach(function(q){var out=q.querySelector('[data-quiz-out]');var base=out.textContent;q.addEventListener('change',function(){var n=q.querySelectorAll('input:checked').length;var t=+out.dataset.total;out.textContent=n+' of '+t+' ticked. '+(n===t?'You are ready for the next step.':base.replace(/^Tick what is true for you today\\. /,''));});});})();</script>`;

export function renderTopicPage(p: TopicPage): Response {
  faqId = 0;
  used = new Set();
  const url = canonicalUrl(`/${p.slug}`);
  const main = `<main class="flex-1">${crumbs(p)}${hero(p)}${p.sections.map(section).join("")}</main>`;
  const html = `<!DOCTYPE html><html lang="en-IN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="robots" content="noindex, nofollow, noarchive, noimageindex"><title>${esc(p.seo.title)}</title><meta name="description" content="${esc(p.seo.description)}"><link rel="canonical" href="${esc(url)}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(p.seo.title)}"><meta property="og:description" content="${esc(p.seo.description)}"><meta property="og:url" content="${esc(url)}"><meta property="og:locale" content="en_IN"><meta property="og:site_name" content="BusinessIdea.io"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${schema(p)}</script><style>${STYLE}</style><link rel="stylesheet" href="/bought/topics/styles/index-BpDyUYDe.css"><style id="bbi-shared-header-styles">${sharedHeaderStyles}</style></head><body><div id="root"><div class="min-h-screen flex flex-col">${menuPanels.header}${main}${menuPanels.footer}</div></div>${menuBindings}${SCRIPT}</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
