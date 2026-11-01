"""Keep the purchased lists composition while clearing seller-specific content.

Run after replacing src/bought/lists.html. Dynamic slots are filled by the route.
"""
from copy import deepcopy
from pathlib import Path
from lxml import html

root = Path(__file__).resolve().parents[1]
page = html.parse(str(root / 'src/bought/lists.html'))
sections = page.xpath('//main/section')
assert len(sections) == 18, 'Review the purchased composition before transforming it.'

def inner(node, markup):
    node[:] = []
    node.text = None
    for child in html.fragments_fromstring(markup):
        if isinstance(child, str):
            node.text = (node.text or '') + child
        else:
            node.append(child)

def shell(markup):
    return '<div class="container mx-auto max-w-6xl px-4">' + markup + '</div>'

def heading(title, intro, marker):
    return (f'<div class="flex items-center gap-3 mb-2"><span class="p-2 rounded-lg bg-primary/10 text-primary" aria-hidden="true">✦</span>'
            f'<h2 class="text-2xl font-bold">{title}</h2></div><p class="text-muted-foreground mb-6">{intro}</p>'
            f'<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{marker}</div>')

inner(sections[0], '''<div class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" aria-hidden="true"></div>
<div class="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
<div class="container mx-auto max-w-6xl px-4 relative"><div class="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center"><div>
<span class="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold mb-3">BusinessIdea.io library</span>
<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">Business idea lists, tools and guides</h1>
<p class="text-lg text-muted-foreground mb-5">Explore published business ideas by category and find a path that fits your situation.</p>
<form action="/all-business-ideas" method="get" class="flex gap-2 mb-6"><label class="sr-only" for="lists-search">Search business idea lists</label><input id="lists-search" name="q" type="search" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base" placeholder="Search business idea lists"><button type="submit" class="rounded-lg bg-slate-900 px-5 py-2 text-white font-semibold hover:bg-slate-700">Search</button></form>
<div class="flex flex-wrap gap-3"><a class="inline-flex min-h-11 items-center rounded-lg bg-slate-900 px-6 text-white font-semibold transition hover:bg-slate-700" href="/browse">Browse ideas</a><a class="inline-flex min-h-11 items-center rounded-lg border border-border px-6 font-semibold transition hover:border-primary hover:text-primary" href="/startup-guides">Read startup guides</a></div>
</div><div><img src="./images/hero-lists-2026-CeVZDP34.png" alt="Illustration of business idea lists with a lightbulb and magnifying glass" width="1536" height="1024" loading="eager" class="relative w-full h-auto max-w-xs sm:max-w-sm lg:max-w-md mx-auto drop-shadow-xl"></div></div></div>''')
sections[0].set('class', sections[0].get('class').replace(' border-b border-border/40', ''))

inner(sections[1], shell('''<h2 class="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Explore the library</h2><div class="flex flex-wrap gap-2">{{BBI_CHIPS}}</div>'''))
inner(sections[2], shell('''<ol class="grid sm:grid-cols-3 gap-3"><li class="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"><span class="h-7 w-7 shrink-0 rounded-full bg-primary text-white text-sm font-bold grid place-items-center">1</span><div><h3 class="font-semibold text-sm">Find a list</h3><p class="text-xs text-muted-foreground leading-snug mt-0.5">Browse published lists by category or search for a topic.</p></div></li><li class="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"><span class="h-7 w-7 shrink-0 rounded-full bg-primary text-white text-sm font-bold grid place-items-center">2</span><div><h3 class="font-semibold text-sm">Read an idea</h3><p class="text-xs text-muted-foreground leading-snug mt-0.5">Open a full business idea before you decide what to test.</p></div></li><li class="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"><span class="h-7 w-7 shrink-0 rounded-full bg-primary text-white text-sm font-bold grid place-items-center">3</span><div><h3 class="font-semibold text-sm">Check your next step</h3><p class="text-xs text-muted-foreground leading-snug mt-0.5">Use a relevant guide or calculator to work through the decision.</p></div></li></ol>'''))
inner(sections[3], shell('''<div class="max-w-2xl mb-5"><h2 id="next-step-guides" class="text-xl font-bold">Choose what to do next</h2><p class="mt-1 text-sm text-muted-foreground">Follow the question you need to answer before you begin.</p></div><nav aria-label="Next-step guides" class="grid gap-4 md:grid-cols-3">{{BBI_NEXT_STEPS}}</nav>'''))
inner(sections[4], shell('''<h2 class="text-2xl font-bold mb-6">Featured list</h2>{{BBI_FEATURED}}'''))
names = [
    ('For people and places', 'Explore business ideas suited to different people and places.'),
    ('Flexible ways to work', 'Explore ways to start with the time and skills you have.'),
    ('Food and local commerce', 'Explore published food and local commerce ideas.'),
    ('Products and creative work', 'Explore product, fashion and creative business ideas.'),
    ('Digital and online', 'Explore digital services and online business ideas.'),
    ('Services and business models', 'Explore local services and other business models.'),
]
for index, (title, intro) in enumerate(names, 5):
    inner(sections[index], shell(heading(title, intro, '{{BBI_SHELF_' + str(index) + '}}')))
    sections[index].set('id', 'bbi-shelf-' + str(index))
inner(sections[11], shell(heading('Tools &amp; resources', 'Use a calculator or explore the tools library.', '{{BBI_TOOLS}}')))
inner(sections[12], shell(heading('Strategy &amp; guides', 'Read our published guides before taking the next step.', '{{BBI_GUIDES}}')))
inner(sections[13], shell('''<h2 class="text-2xl font-bold mb-2">Explore more lists</h2><p class="text-muted-foreground mb-6 text-sm">Continue into the complete list index.</p><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{{BBI_INDEX}}</div><a href="/all-business-ideas" class="inline-flex min-h-11 items-center rounded-lg bg-slate-900 px-6 mt-6 text-white font-semibold transition hover:bg-slate-700">View all business idea lists →</a>'''))
inner(sections[14], '''<div class="container mx-auto max-w-3xl px-4"><div class="text-center mb-8"><span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold mb-3">FAQ</span><h2 class="text-2xl md:text-3xl font-bold text-balance">Frequently asked questions</h2></div><div class="space-y-3">{{BBI_FAQ}}</div></div>''')
inner(sections[15], '''<div class="container mx-auto max-w-4xl px-4 text-center"><h2 class="text-3xl font-bold mb-4 text-balance">Ready to explore an idea?</h2><p class="text-lg text-muted-foreground mb-8">Start with a published idea, then use the relevant guide to test your decision.</p><div class="flex flex-col sm:flex-row gap-4 justify-center"><a href="/browse" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-900 px-6 text-white font-semibold transition hover:bg-slate-700">Browse ideas</a><a href="/startup-idea-validation" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-6 font-semibold transition hover:border-primary hover:text-primary">How to validate your idea</a></div></div>''')
inner(sections[16], '<h2>BusinessIdea.io business idea lists</h2><p>Browse published categories, lists and business ideas.</p>')
inner(sections[17], shell('''<h2 id="most-read-heading" class="text-2xl md:text-3xl font-bold mb-2">Business guides and articles</h2><p class="text-muted-foreground mb-6 max-w-2xl">Read more before you choose your next step.</p><div class="bbi-lists-rail" aria-label="Business guides and articles">{{BBI_ARTICLES}}</div>'''))
for section in sections:
    section.set('class', section.get('class', '').replace(' border-b border-border', '').replace(' border-t border-border', '').replace(' border-y border-border', ''))

# Keep the purchased filter strip and its pill treatment. Its original React
# handlers are gone with the seller bundle; our small handler is added below.
for button in page.xpath('//button'):
    if (button.text or '').strip() == 'All Lists':
        strip = button.getparent()
        buttons = strip.xpath('./button')
        for index, item in enumerate(buttons):
            item.text = ['All lists', *[title for title, _ in names]][index]
            item.set('type', 'button')
            item.set('data-lists-filter', str(index))
            item.set('aria-pressed', 'true' if index == 0 else 'false')
        break

for script in page.xpath('//script'):
    script.drop_tree()
for meta in page.xpath('//meta[@property or @name]'):
    if meta.get('name') not in ('viewport', 'theme-color', 'color-scheme'):
        meta.drop_tree()
for link in page.xpath('//link[@rel="canonical"]'):
    link.set('href', 'https://bbinewcopy.vercel.app/lists')
for link in page.xpath('//link'):
    if link.get('rel') != 'stylesheet':
        link.drop_tree()
for meta in page.xpath('//meta[@http-equiv]'):
    meta.drop_tree()
for font_style in page.xpath('//head/style'):
    if '@font-face' in (font_style.text or ''):
        font_style.text = (font_style.text or '').replace(
            'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
            '/bought/lists/images/s_inter_v13_UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2.bin'
        ).replace(
            'https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtq.woff2',
            '/bought/lists/images/s_outfit_v15_QGYvz_MVcBeNP4NJtEtq.woff2.bin'
        )
    else:
        font_style.drop_tree()
for title in page.xpath('//title'):
    title.text = 'Business Idea Lists | BusinessIdea.io'

# The purchased footer and header are replaced by the same shared site frame at response time.
for footer in page.xpath('//footer'):
    footer.drop_tree()
for header in page.xpath('//header'):
    header.drop_tree()
for nav in page.xpath('//nav[contains(@class,"fixed top-0")]'):
    nav.drop_tree()
for nav in page.xpath('//nav[@aria-label="Breadcrumb"] | //nav[contains(@class,"flex flex-wrap items-center")]'):
    if nav.xpath('.//ol'):
        inner(nav, '<ol class="flex flex-wrap items-center gap-2 text-sm"><li><a href="/">Home</a></li><li aria-hidden="true">›</li><li aria-current="page">Lists</li></ol>')
for node in page.xpath('//*[@id="GOOGLE_INPUT_CHEXT_FLAG"]'):
    node.drop_tree()
for node in page.xpath('//noscript'):
    node.drop_tree()
for node in page.xpath('//main/preceding-sibling::div[contains(@class,"fixed left-1/2")] | //main/following-sibling::div[contains(@class,"min-h-[320px]")]'):
    node.drop_tree()
for node in page.xpath('//main/div[contains(@class,"border-b")]'):
    node.set('class', node.get('class', '').replace(' border-b', ''))
body = page.xpath('//body')[0]
body.insert(0, html.fragment_fromstring('<div id="bbi-list-header"></div>'))
body.append(html.fragment_fromstring('<div id="bbi-list-footer"></div>'))

style = html.Element('style')
style.text = '''
body { overflow-x: clip; }
main { padding-top: 96px; }
main > section { scroll-margin-top: 96px; }
.bbi-lists-rail { display:flex; gap:1rem; width:max-content; animation:bbi-lists-scroll 35s linear infinite; }
.bbi-lists-rail:hover, .bbi-lists-rail:focus-within { animation-play-state:paused; }
.bbi-lists-rail > a { width: min(75vw, 260px); flex:none; }
[data-lists-filter][aria-pressed="true"] { background: hsl(var(--primary)); color:white; }
@keyframes bbi-lists-scroll { to { transform:translateX(-50%); } }
@media (prefers-reduced-motion:reduce) { .bbi-lists-rail { animation:none; } }
'''
page.xpath('//head')[0].append(style)
output = html.tostring(page.getroot(), encoding='unicode', method='html', doctype='<!DOCTYPE html>')
(root / 'src/bought/lists-bbi.html').write_text(output)
