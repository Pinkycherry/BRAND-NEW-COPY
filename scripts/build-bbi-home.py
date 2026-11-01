"""Fill the purchased home snapshot with BBI copy, keeping its DOM and classes.

The source file remains untouched so seller composition can be compared at any time.
Run: python scripts/build-bbi-home.py
"""
from lxml import html
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/bought/home.html'
DEST = ROOT / 'src/bought/home-bbi.html'
doc = html.document_fromstring(SOURCE.read_text())

def node(id):
    return doc.get_element_by_id(id)

def text(el, value):
    for child in list(el):
        el.remove(child)
    el.text = value

def put(el, selector, value, index=0):
    found = el.xpath(selector)
    if len(found) > index:
        text(found[index], value)

def remove(el):
    if el is not None and el.getparent() is not None:
        el.getparent().remove(el)

def heading(el, title, intro):
    put(el, './/h2[not(contains(@class,"sr-only"))]', title)
    for p in el.xpath('.//h2[not(contains(@class,"sr-only"))]/following-sibling::p')[:1]:
        text(p, intro)

def move_link(a, url, label=None):
    a.set('href', url)
    if label is not None:
        text(a, label)

# The purchased frame stays intact. Replace its visible actions with real BBI routes.
doc.xpath('//title')[0].text = 'BusinessIdea.io — Find a business idea that fits your life'
for meta in doc.xpath('//meta[@name="description"]'):
    meta.set('content', 'Explore researched business ideas for India, read practical guides and use tools to test your next step.')
for meta in doc.xpath('//meta[@name="keywords"]'):
    meta.set('content', 'business ideas India, small business ideas, startup guides, business calculators')
for meta in doc.xpath('//head/meta'):
    key=meta.get('name') or meta.get('property') or ''
    if key in ('title','og:title','twitter:title'):
        meta.set('content','BusinessIdea.io — Find a business idea that fits your life')
    elif key in ('description','og:description','twitter:description'):
        meta.set('content','Explore researched business ideas for India, practical guides and tools to test your next step.')
    elif key in ('og:site_name','application-name','apple-mobile-web-app-title'):
        meta.set('content','BusinessIdea.io')
    elif key in ('og:url','twitter:url','twitter:domain'):
        meta.set('content','https://businessidea.io/')
    elif key in ('og:image','twitter:image','og:image:alt','twitter:image:alt','twitter:site','twitter:creator','article:author','content-signals') or 'ideaproof' in meta.get('content','').lower():
        remove(meta)
for link in doc.xpath('//head/link'):
    rel=link.get('rel','')
    href=link.get('href','')
    if rel in ('modulepreload','dns-prefetch','preconnect','preload','ai-index','ai-terms','alternate') or 'ideaproof.io' in href or 'supabase.co' in href or 'fonts.gstatic.com' in href:
        remove(link)
    elif rel=='canonical': link.set('href','https://businessidea.io/')
    elif rel=='sitemap': link.set('href','/sitemap.xml')

navs = doc.xpath('//nav')
if navs:
    nav = navs[0]
    anchors = nav.xpath('.//a[@href]')
    if anchors:
        move_link(anchors[0], '/', 'BusinessIdea.io')
    for button in nav.xpath('.//button'):
        label = ' '.join(button.itertext()).strip()
        target = {'Validate':'/blueprints', 'Learn':'/startup-guides', 'Free Tools':'/tools', 'Sign up Get Report':'/blueprints'}.get(label)
        if target:
            button.tag = 'a'
            button.attrib.pop('type', None)
            button.set('href', target)
            text(button, {'Validate':'Explore ideas', 'Learn':'Guides', 'Free Tools':'Tools', 'Sign up Get Report':'Browse ideas'}[label])
        else:
            remove(button)
    for anchor in nav.xpath('.//a[@href]'):
        if anchor.get('href') == '#':
            remove(anchor)
    for anchor in nav.xpath('.//a[contains(@href,"pricing")]'):
        move_link(anchor, '/pricing', 'Pricing')
    # Seller-only panels and a disconnected search/mobile control have no live BBI target.
    for panel in nav.xpath('.//*[@role="menu"]|.//*[@role="dialog"]'):
        remove(panel)
if len(navs)>1:
    remove(navs[1])  # Seller-only screen-reader sitemap with unrelated destinations.

hero = node('hero')
put(hero, './/h1', 'Tired of paying for generic answers to your business idea?')
hero_ps = hero.xpath('.//p')
if hero_ps:
    text(hero_ps[0], 'The truth about business ideas')
if len(hero_ps)>1:
    text(hero_ps[1], 'We paid three platforms to test four ideas and got generic answers back. BBI tells you who pays, how money works and what may hurt in year one, so you can decide what to test next.')
for el in hero.xpath('.//*[contains(text(),"We built a free home")]'):
    if len(el) == 0: text(el, 'Start with your time, skills and place. Follow the questions to a business you can actually try.')
for form in hero.xpath('.//form'):
    form.set('action','/blueprints'); form.set('method','get')
    for child in list(form): form.remove(child)
    form.append(html.fragment_fromstring('''<div class="flex w-full items-center gap-3 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200"><input type="search" name="q" aria-label="Search business ideas" placeholder="Search business ideas by title" class="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-slate-900 outline-none"><button type="submit" class="shrink-0 rounded-xl bg-[#7c3aed] px-5 py-3 font-semibold text-white transition hover:bg-[#6d28d9]">Search ideas</button></div>'''))
for a in hero.xpath('.//a'):
    move_link(a,'/blueprints','Browse published blueprints')
hero_core=hero.xpath('./div[contains(@class,"max-w-5xl")]/div[contains(@class,"text-center")]')
if hero_core:
    core=hero_core[0]
    for child in list(core):
        classes=child.get('class','')
        if 'flex flex-col sm:flex-row items-center' in classes:
            child.clear(); child.set('class','mb-6 text-center font-display text-xs font-bold uppercase tracking-[.18em] text-[#7c3aed]'); child.text='The truth about business ideas'
        elif 'flex flex-wrap items-center justify-center gap-2' in classes:
            child.clear(); child.set('class','mb-5 text-center text-xs text-slate-500'); child.text='Start with one honest blueprint. Follow the buyer, the money and the risks.'

# Keep the purchased report section and six-tab/card treatment. The content
# within the report slot is a real published BBI idea, substituted per request.
reports = node('reports')
put(reports,'.//h2[contains(@class,"sr-only")]', 'A published business idea from the BBI library')
heading(reports,'See the work behind an idea.','Read who pays, how money comes in, the work involved and the hard parts before choosing a direction.')
for tab,label in zip(reports.xpath('.//button')[:6], ['What it is','Who pays','How money comes','What you need','What hurts','Verdict']):
    text(tab,label)
put(reports,'.//h3','{{BBI_IDEA_TITLE}}')
for p in reports.xpath('.//p'):
    content=' '.join(p.itertext())
    if '100-point viability' in content or 'score' in content.lower() or 'No-Code' in content:
        text(p,'{{BBI_IDEA_SUMMARY}}')
    elif 'Every founder I know' in content or 'Real signal' in content:
        text(p,'{{BBI_IDEA_HOOK}}')
    elif 'Tap to unlock' in content:
        text(p,'Read the published idea, including its risks and first steps.')
for a in reports.xpath('.//a[@href]'):
    if not a.get('href','').startswith('https://'):
        move_link(a,'{{BBI_IDEA_URL}}','Read the published idea')
# Publisher logos used as purported report sources are not evidence for our idea.
for a in reports.xpath('.//a[starts-with(@href,"https://")]'):
    remove(a)

how = node('how-it-works')
heading(how, 'From curiosity to a decision you can explain.', 'Choose an idea, understand the buyer, test the numbers and decide on a small first step.')
steps = [
 ('Describe your situation','Start with the time, skills and place you actually have.'),
 ('Explore categories','Follow a category into a focused list of ideas.'),
 ('Read the idea','See the offer and who might pay for it.'),
 ('Understand demand','Look for a buyer before you make a big commitment.'),
 ('Check startup costs','Separate one-time costs from money you will spend each month.'),
 ('Test the price','Ask whether the price can cover the work and leave a margin.'),
 ('Find the first customer','Try a small offer in the place where buyers already are.'),
 ('Notice what hurts','Take delivery, competition and cash-flow risks seriously.'),
 ('Make a decision','Write down what would make you continue or stop.'),
 ('Keep learning','Use guides and calculators as the next question appears.'),
]
for h,(name,description) in zip(how.xpath('.//h3'),steps):
    text(h,name)
    for p in h.xpath('./following-sibling::p')[:1]: text(p,description)
for p in how.xpath('.//p'):
    if any(x in ' '.join(p.itertext()) for x in ('credits','frontier AI','GO / NO-GO','investor-ready','minutes')):
        text(p,'Explore the evidence and choose the next practical action.')

under = node('under-the-hood')
heading(under, 'An honest idea is more useful than an exciting headline.', 'Our guides ask who pays, how delivery works and what could change your decision.')
under_h = under.xpath('.//h3')
for h,t in zip(under_h,['Start with the buyer','Follow the cost of delivery','Read the difficult parts']): text(h,t)

generators = node('ai-generators')
heading(generators,'Tools for the decisions in front of you.','Use a calculator or guide when you need to put your own numbers beside an idea.')
tool_cards = [
 ('Break-even calculator','Find the sales needed to cover your costs.','/calculator/break-even'),
 ('Startup cost calculator','Build a more realistic first budget.','/calculator/startup-cost'),
 ('Return on investment','Compare the return with the money you put in.','/calculator/roi'),
 ('Funding needed','See how much cash the plan may require.','/calculator/funding-needed'),
 ('Unit economics','Understand revenue and cost for each sale.','/unit-economics-india'),
 ('Cash flow','Look at when money enters and leaves.','/startup-cash-flow-india'),
 ('Pricing','Test the price of your offer.','/business-pricing-india'),
 ('Business demand','Ask whether buyers want the offer.','/business-demand-test-india'),
 ('Research desk','Collect the questions that matter.','/business-idea-research-india'),
 ('Time fit','Check the work against your available hours.','/business-idea-time-fit'),
 ('Market research','Estimate a market from actual buyers.','/market-research'),
 ('Business models','See how different businesses earn.','/business-models-india'),
 ('All tools','Find the tool that fits your next question.','/tools'),
]
cards = generators.xpath('.//a[.//h3]')
for a,(title,description,url) in zip(cards,tool_cards):
    a.set('href',url)
    text(a.xpath('.//h3')[0],title)
    ps=a.xpath('.//p')
    if ps: text(ps[0],description)

learn = node('learn-hub')
heading(learn,'Find a path through the idea library.','Explore ideas, practical guides, articles and calculators; follow what fits your situation.')

# Keep the seller's moving external-tool logo strip, without an endorsement claim.
proof=node('social-proof')
put(proof,'.//h2','Useful tools and places to learn')
for el in proof.xpath('.//*[contains(text(),"Numbers we stand behind")]'):
    if len(el)==0: text(el,'Explore tools used across the web')
for el in proof.xpath('.//*[contains(text(),"Founders served") or contains(text(),"Raised by users") or contains(text(),"Validation accuracy") or contains(text(),"Failures studied")]'):
    if len(el)==0: text(el,'')
for el in proof.xpath('.//*[contains(text(),"10,000+") or contains(text(),"$2.3M+") or contains(text(),"89%") or contains(text(),"1,000+")]'):
    if len(el)==0: text(el,'')

# Seller testimonials are unverified. Use the factual origin and team narrative
# from our About page instead of attaching made-up quotes to made-up founders.
voices=node('testimonials')
heading(voices,'Why we built BBI.','We wanted a clearer starting point after business-idea answers that sounded generic when the stakes were personal.')
for h,t in zip(voices.xpath('.//h3'),['The starting question','The idea library','The people behind it']): text(h,t)
for p in voices.xpath('.//p')[1:]:
    text(p,'Read our founder story and meet the team on the About page.')

radar=node('live-radar')
heading(radar,'Ideas change as you learn more.','Use recent published ideas to keep exploring and check the questions against your own situation.')

plans=node('pricing-teaser')
heading(plans,'Choose the plan that fits your next step.','Two paid plan prices are set. The exact inclusions are being specified before checkout.')
plan_cards=plans.xpath('.//div[contains(@class,"group relative flex h-full flex-col rounded") and .//a]')
for i,card in enumerate(plan_cards):
    if i>1: remove(card); continue
    for el in card.xpath('.//div|.//p|.//li|.//span'):
        value=' '.join(el.itertext()).strip()
        if len(el)==0 and (re.search(r'(\d+cr|credits|free|idea ·|TAM|GO/NO-GO|PDF export|launch|month|subscriber)',value,re.I) or '$' in value):
            text(el,'')
    amount='₹199' if i==0 else '₹299'
    for el in card.xpath('.//*[contains(text(),"$") or contains(text(),"/mo") or contains(text(),"one-time")]'):
        if len(el)==0: text(el,amount)
    for a in card.xpath('.//a'):
        move_link(a,'/pricing','See pricing')
for p in plans.xpath('.//p'):
    if any(x in ' '.join(p.itertext()).lower() for x in ('credits','free','subscription')):
        text(p,'Plan benefits will be stated on the pricing page before purchase.')
for a in plans.xpath('.//a'):
    move_link(a,'/pricing','See pricing')

faq=node('faq')
heading(faq,'Honest answers to fair questions.','Learn how to browse, read an idea and decide what to check next.')
for e in faq.xpath('.//*[contains(text(),"nicholas@ideaproof.io")]'):
    if len(e)==0: text(e,'Questions? Contact our team through the contact page.')
for e in faq.xpath('.//*[contains(text(),"Is the whole library free?")]'):
    if len(e)==0: text(e,'How does pricing work?')
for e in faq.xpath('.//*[contains(text(),"Browsing and searching the library is free")]'):
    if len(e)==0: text(e,'BBI has two paid plan prices, ₹199 and ₹299. Plan inclusions are being specified before checkout.')

# Keep seller's footer columns and typography, but remove the seller's legal
# identity/social handles and link each remaining item to a real BBI route.
for footer in doc.xpath('//footer'):
    for a in footer.xpath('.//a'):
        href=a.get('href','')
        label=' '.join(a.itertext()).strip()
        if 'x.com/idea_proof' in href or 'github.com/ideaproof' in href:
            remove(a)
        elif label=='Idea Proof': move_link(a,'/','BusinessIdea.io')
        elif 'privacy' in href: move_link(a,'/privacy','Privacy Policy')
        elif 'terms' in href: move_link(a,'/terms','Terms & Conditions')
        elif 'cookies' in href: move_link(a,'/cookie-policy','Cookie Policy')
        elif 'contact' in href: move_link(a,'/contact','Contact')
        elif 'sitemap' in href: move_link(a,'/sitemap','Site Map')
        else: remove(a)
    for p in footer.xpath('.//p'):
        if 'NT VENTURES' in ' '.join(p.itertext()): text(p,'© BusinessIdea.io')

# Remove inherited seller analytics and hydration code, which would overwrite
# server-filled data on load. Original CSS and all seller section classes stay.
for script in doc.xpath('//script'):
    remove(script)

# No old page-specific relative links survive. Contextual route map only;
# unknown destinations become ordinary text instead of dead or fake buttons.
route_map={
 'lists':'/lists','tools':'/tools','pricing':'/pricing','about':'/about',
 'faq':'/faq','contact':'/contact','market-research':'/market-research',
 'startup-failure-database':'/failed-startups','business-plan':'/business-plan',
 'startup-idea-generator':'/browse','startup-cost':'/calculator/startup-cost',
 'break-even':'/calculator/break-even','roi':'/calculator/roi',
 'case-studies':'/case-studies','blog':'/blog','guides':'/startup-guides',
 'templates':'/templates','glossary':'/glossary','sitemap':'/sitemap',
}
for a in doc.xpath('//a[@href]'):
    href=a.get('href') or ''
    if href.startswith('./pages/'):
        key=href.removeprefix('./pages/').split('.')[0]
        if key in route_map: a.set('href',route_map[key])
        else: remove(a)
    elif href=='#' or 'ideaproof.io' in href: remove(a)

# The seller's visual shells and section order are the reference. Where a
# product component has no BBI counterpart (AI scoring, funding claims and
# fictional testimonials), fill that same shell with the corresponding BBI
# library component. Keep the seller's type scale, cards, backgrounds and
# spacing rather than introducing the old gh-/gl- layouts.
def fill(sid, markup):
    section=node(sid)
    container=next((x for x in section if x.tag=='div' and 'relative mx-auto w-full max-w-6xl' in (x.get('class') or '')),None)
    if container is None: raise RuntimeError('Missing purchased section container: '+sid)
    for child in list(container): container.remove(child)
    for fragment in html.fragments_fromstring(markup):
        if isinstance(fragment,str): continue
        container.append(fragment)

def intro(no,eyebrow,title,body):
    return f'''<div class="mb-10 sm:mb-16 max-w-3xl mx-auto text-center">
      <div class="mb-6 flex items-center gap-4 justify-center"><span class="relative inline-flex flex-shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10 px-3 py-1 text-xs font-bold text-[#7c3aed]">{no}</span><span class="font-display text-xs font-semibold uppercase tracking-[.18em] text-[#7c3aed]">{eyebrow}</span></div>
      <h2 class="font-display text-balance text-[34px] font-semibold leading-[1.05] tracking-[-.035em] text-[#0f172a] sm:text-[46px]">{title}</h2>
      <p class="mt-5 text-pretty text-[15px] leading-[1.65] text-[#475569] sm:text-[17px]">{body}</p></div>'''

def card(title,body,url,cta='Explore'):
    return f'''<a class="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl" href="{url}"><h3 class="mt-auto font-display text-[21px] font-semibold leading-tight tracking-[-.015em] text-[#0f172a]">{title}</h3><p class="mt-3 text-[14px] leading-[1.65] text-slate-600">{body}</p><span class="mt-6 text-sm font-semibold text-[#7c3aed]">{cta} →</span></a>'''

fill('reports',intro('01','A published idea','See the work behind an idea.','This is a published idea from our library, not a simulated validation report.')+'''
  <div class="mb-6 flex flex-wrap items-center justify-center gap-2">'''+''.join(f'<span class="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{x}</span>' for x in ['What it is','Who pays','How money comes','What you need','What hurts','Verdict'])+'''</div>
  <article class="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-2xl sm:p-10"><p class="text-xs font-bold uppercase tracking-widest text-[#7c3aed]">Published business idea</p><h3 class="mt-3 font-display text-3xl font-semibold text-[#0f172a]">{{BBI_IDEA_TITLE}}</h3><p class="mt-5 text-base leading-7 text-slate-600">{{BBI_IDEA_SUMMARY}}</p><div class="mt-7 grid gap-4 md:grid-cols-3"><div class="rounded-xl bg-slate-50 p-5"><h4 class="font-semibold">Who pays</h4><p class="mt-2 text-sm leading-6 text-slate-600">{{BBI_IDEA_BUYER}}</p></div><div class="rounded-xl bg-slate-50 p-5"><h4 class="font-semibold">How money comes</h4><p class="mt-2 text-sm leading-6 text-slate-600">{{BBI_IDEA_MONEY}}</p></div><div class="rounded-xl bg-slate-50 p-5"><h4 class="font-semibold">What hurts</h4><p class="mt-2 text-sm leading-6 text-slate-600">{{BBI_IDEA_RISK}}</p></div></div><a class="mt-8 inline-flex rounded-xl bg-[#7c3aed] px-6 py-3 font-semibold text-white transition hover:bg-[#6d28d9]" href="{{BBI_IDEA_URL}}">Read this idea →</a></article>''')

fill('how-it-works',intro('02','Step by step','Grab the idea. Find the buyer. Test the difficult part.','The useful question is whether you can make the first sale with the time, money and place you actually have.')+'''
  <ol class="mx-auto max-w-5xl divide-y divide-slate-200/70">'''+''.join(f'''<li class="grid gap-4 py-8 md:grid-cols-[5rem_1fr_1fr] md:items-start"><span class="font-display text-3xl text-[#7c3aed]">0{i}</span><h3 class="font-display text-2xl font-semibold text-[#0f172a]">{title}</h3><p class="text-base leading-7 text-slate-600">{body} <a class="font-semibold text-[#7c3aed] underline-offset-4 hover:underline" href="{url}">{action} →</a></p></li>''' for i,title,body,url,action in [
 (1,'Browse','Search by industry, place or the work you can do alongside your current life.','/blueprints','Read blueprints'),
 (2,'Read the honest version','See who buys, how the money works and what tends to hurt before you spend.','{{BBI_IDEA_URL}}','Open an idea'),
 (3,'Test your next move','Take one question into the field, then use your own numbers to decide what comes next.','/startup-idea-validation','Work through validation'),
 ])+'''</ol>''')

fill('under-the-hood',intro('03','Why the library exists','We got tired of the same ideas recycled into infinity.','A headline about dropshipping or an online business is easy to publish. The buyer, first order, costs and risks are the part you actually need.')+'''
  <div class="mx-auto grid max-w-5xl gap-10 py-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center"><p class="font-display text-2xl leading-relaxed text-[#0f172a] sm:text-3xl">A genuine business blueprint is worth more than a hundred recycled suggestions.</p><div class="border-l-2 border-[#7c3aed] pl-6 text-base leading-8 text-slate-600">We research who pays, how the work is delivered and when the answer should be to walk away. <a href="/about" class="font-semibold text-[#7c3aed] hover:underline">Why we built BBI →</a></div></div>''')

fill('ai-generators',intro('04','Run the numbers','Make your next move add up.','When a blueprint sounds possible, check the money with your own figures. The calculators show the workings on screen.')+'''
  <div class="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white/90 p-6 ring-1 ring-slate-200 sm:p-9"><div class="grid gap-x-9 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">'''+''.join(f'''<a class="group flex items-center justify-between gap-4 border-b border-slate-200 pb-4 font-display font-semibold text-[#0f172a] transition hover:text-[#7c3aed]" href="{url}">{name}<span aria-hidden="true" class="text-[#7c3aed] transition group-hover:translate-x-1">↗</span></a>''' for name,url in [('Break-even','/calculator/break-even'),('Startup cost','/calculator/startup-cost'),('Return on investment','/calculator/roi'),('Funding needed','/calculator/funding-needed'),('Unit economics','/unit-economics-india'),('Cash flow','/startup-cash-flow-india')])+'''</div><a class="mt-7 inline-flex font-semibold text-[#7c3aed] hover:underline" href="/tools">All tools →</a></div>''')

fill('learn-hub',intro('05','The library','Every category, and what it actually holds.','Start with a subject that makes sense for your life, then read a published blueprint rather than a list of promises.')+'''
  <h3 class="font-display text-2xl font-semibold">Ways into the library</h3><div class="mt-5 flex flex-wrap gap-3">{{BBI_CATEGORY_CARDS}}</div>
  <div class="mt-12 flex items-center justify-between gap-4"><h3 class="font-display text-2xl font-semibold">Business guides</h3><a class="text-sm font-semibold text-[#7c3aed]" href="/startup-guides">All guides →</a></div><div class="bbi-home-rail mt-5">{{BBI_GUIDE_CARDS}}</div>
  <div class="mt-12 flex items-center justify-between gap-4"><h3 class="font-display text-2xl font-semibold">From the blog</h3><a class="text-sm font-semibold text-[#7c3aed]" href="/blog">All articles →</a></div><div class="bbi-home-rail mt-5">{{BBI_BLOG_CARDS}}</div>''')

fill('social-proof',intro('06','Interactive canopy map','The Golden Tree of Business Growth.','The transparent tree from the original BBI homepage now lives here too. Follow one branch into a real published idea.')+'''
  <div class="mx-auto max-w-5xl"><img src="/images/golden-tree@2x.webp" width="1400" height="793" loading="lazy" alt="The original transparent golden business-idea tree" class="mx-auto w-full object-contain"><div class="mt-4 flex flex-wrap justify-center gap-3">{{BBI_TREE_CARDS}}</div></div>
  <div class="mt-16 overflow-hidden border-y border-slate-200 py-6"><span class="font-display text-xs font-bold tracking-[.18em] text-slate-500">BUILT WITH</span><div class="bbi-logo-track mt-5">'''+''.join(f'''<a class="font-display text-xl font-semibold text-[#0f172a] transition hover:text-[#7c3aed]" href="{url}" target="_blank" rel="noopener noreferrer">{name}</a>''' for name,url in [('React','https://react.dev/'),('TypeScript','https://www.typescriptlang.org/'),('Node.js','https://nodejs.org/'),('GitHub','https://github.com/'),('Supabase','https://supabase.com/'),('Vercel','https://vercel.com/')])*2+'''</div></div>''')

fill('testimonials',intro('07','Who is behind this','We have been where you are.','Our founder paid three platforms to check four ideas and received answers too generic to act on. That experience shaped the questions we ask in every blueprint.')+'''
  <div class="mx-auto max-w-4xl border-l-4 border-[#7c3aed] pl-6 sm:pl-10"><blockquote class="font-display text-2xl leading-relaxed text-[#0f172a] sm:text-3xl">“We tell you who will actually pay you, how the money works, and what will hurt in year one. Then we give it to you straight.”</blockquote><p class="mt-7 text-sm text-slate-600">From the original BBI founder promise. <a href="/about" class="font-semibold text-[#7c3aed] hover:underline">Read the full story and meet the team →</a></p></div>''')

fill('live-radar',intro('08','Featured blueprints','Blueprints worth your afternoon.','These are real ideas from our source library. Open one and follow the buyer, money and difficult parts through the full article.')+'''<div class="bbi-home-rail mt-5">{{BBI_RECENT_CARDS}}</div><a class="mt-7 inline-flex font-semibold text-[#7c3aed] hover:underline" href="/blueprints">Browse the full blueprint library →</a>''')

fill('pricing-teaser',intro('09','Pricing, honestly','Two prices. The details must be clear first.','BBI now has paid plans at ₹199 and ₹299. We will state the exact benefits before asking you to purchase.')+'''<div class="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-10 border-y border-slate-200 py-10"><span class="font-display text-5xl font-semibold text-[#0f172a]">₹199</span><span class="text-sm uppercase tracking-[.2em] text-slate-400">or</span><span class="font-display text-5xl font-semibold text-[#0f172a]">₹299</span></div><p class="mt-7 text-center text-slate-600">No checkout is offered until the plan terms are published. <a href="/pricing" class="font-semibold text-[#7c3aed] hover:underline">See the pricing page →</a></p>''')

# The seller's original research strip uses a horizontal card row. Turn the
# same row into our own published blog carousel instead of seller articles.
for section in doc.xpath('//main/section[not(@id)]'):
    if 'Most-read research on IdeaProof' in ' '.join(section.itertext()):
        section.clear()
        section.set('class','py-12')
        section.append(html.fragment_fromstring('''<div class="relative mx-auto w-full max-w-6xl px-5 sm:px-8"><h2 class="font-display text-2xl font-semibold">More from the BBI blog</h2><div class="bbi-home-rail mt-5">{{BBI_BLOG_MORE_CARDS}}</div></div>'''))

style=html.Element('style')
style.text='''
.bbi-home-rail{overflow:hidden;padding:0.4rem 0 1rem}
.bbi-home-track{display:flex;width:max-content;gap:1rem;animation:bbi-home-move 55s linear infinite}
.bbi-home-rail:hover .bbi-home-track,.bbi-home-rail:focus-within .bbi-home-track{animation-play-state:paused}
.bbi-home-track a{flex:0 0 min(82vw,275px);max-width:275px}
.bbi-home-rail a img{width:100%;height:145px;object-fit:cover;border-radius:0.75rem;margin-bottom:1rem}
@keyframes bbi-home-move{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.bbi-home-rail{overflow-x:auto}.bbi-home-track{animation:none}}
'''
doc.xpath('//head')[0].append(style)

# Strip any inherited seller script/style fragments and headings left outside
# these filled slots; no seller trademark or fabricated currency should ship.
for el in doc.xpath('//body//*[not(self::script) and not(self::style)]'):
    if el.text and any(s in el.text for s in ('IdeaProof','ideaproof.io','NT VENTURES','Marco D.','Elena R.','Jordan K.')):
        el.text=el.text.replace('IdeaProof','BBI').replace('ideaproof.io','businessidea.io')
        if any(s in el.text for s in ('NT VENTURES','Marco D.','Elena R.','Jordan K.')): el.text=''
    if el.tail and 'IdeaProof' in el.tail: el.tail=el.tail.replace('IdeaProof','BBI')
for el in doc.xpath('//span[text()="Free"]'):
    text(el,'Research')
for el in doc.xpath('//button[text()="Free Tools"]'):
    el.tag='a'; el.set('href','/tools'); text(el,'Tools')
for footer in doc.xpath('//footer'):
    for el in footer.xpath('.//*[contains(text(),"Data-driven validation for the modern entrepreneur")]'):
        if len(el)==0: text(el,'Researched business ideas and practical decisions for India.')
    for el in footer.xpath('.//*[contains(text(),"All Systems Operational")]'):
        if len(el)==0: text(el,'Explore the library')
    footer_routes={
      'Product':'/browse','Tools Directory':'/tools','Marketing Suite':'/tools',
      'Calculators':'/calculator','Templates':'/templates','Industry Validators':'/browse',
      'Resources':'/startup-guides','Guides':'/startup-guides','Compare':'/startup-idea-comparison',
      'Startup Ideas':'/browse','New Idea Lists (750+)':'/lists','Ideas by Demographic':'/browse',
      'Ideas by Budget':'/browse','Ideas by Industry':'/browse','Ideas by Location':'/browse',
      'Failure Analysis':'/failed-startups','Research Datasets':'/market-research','Topics':'/topics',
    }
    for button in footer.xpath('.//button'):
        label=' '.join(button.itertext()).strip()
        if label in footer_routes:
            button.tag='a'; button.attrib.pop('type',None); button.set('href',footer_routes[label])
            text(button,'All business lists' if label=='New Idea Lists (750+)' else label)
        else: remove(button)
for a in doc.xpath('//a[@href="/browse"]'):
    if 'AI startup idea generator' in ' '.join(a.itertext()).lower():
        text(a,'Browse business ideas')
for button in node('faq').xpath('.//button'):
    label=' '.join(button.itertext()).strip()
    if label=='Get founder insights':
        button.tag='a'; button.set('href','/blog'); button.attrib.pop('type',None)
        text(button,'Read the blog'); continue
    parent=button.getparent()
    if parent is None or len(parent)<2: continue
    parent.tag='details'; parent.set('name','home-faq')
    if label=='Are these real business ideas or just inspiration?': parent.set('open','')
    button.tag='summary'; button.attrib.pop('type',None); button.attrib.pop('aria-expanded',None)
    answer=parent[1]
    answer.attrib.pop('style',None)
    answer.set('class','px-5 pb-5 text-sm leading-7 text-slate-600 sm:px-6')
doc.xpath('//head/style')[-1].text += '\n#faq summary{list-style:none}#faq summary::-webkit-details-marker{display:none}\n'
for form in node('hero').xpath('.//form'):
    buttons=form.xpath('.//button')
    for extra in buttons[:-1]: remove(extra)
for form in doc.xpath('//form[not(@action)]'):
    form.tag='div'
    for field in form.xpath('.//input'): remove(field)
    for el in form.xpath('.//*[contains(text(),"Weekly. No spam.")]'):
        if len(el)==0: text(el,'Read practical articles from the BBI blog.')

output=html.tostring(doc,encoding='unicode',method='html')
DEST.write_text(output)
print(f'Built {DEST.relative_to(ROOT)} from purchased composition')
