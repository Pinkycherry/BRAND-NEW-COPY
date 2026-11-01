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
        target = {'Validate':'/startup-idea-validation', 'Learn':'/startup-guides', 'Free Tools':'/tools', 'Sign up Get Report':'/browse'}.get(label)
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
put(hero, './/h1', 'A business idea should fit your life, not just look good on a list.')
hero_ps = hero.xpath('.//p')
if hero_ps:
    text(hero_ps[0], 'Business ideas for people starting from zero')
if len(hero_ps)>1:
    text(hero_ps[1], 'Explore researched ideas, see who pays and what can go wrong, then decide what to test before spending.')
for el in hero.xpath('.//*[contains(text(),"We built a free home")]'):
    if len(el) == 0: text(el, 'Start with your time, skills and place. Follow the questions to a business you can actually try.')
for form in hero.xpath('.//form'):
    form.set('action','/search'); form.set('method','get')
    for field in form.xpath('.//input'):
        field.set('name','q'); field.set('placeholder','Search business ideas'); field.attrib.pop('disabled',None)
    for button in form.xpath('.//button'):
        button.attrib.pop('disabled',None); button.set('type','submit'); text(button,'Search ideas')
for a in hero.xpath('.//a'):
    move_link(a,'/browse','Browse the idea library')

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

fill('how-it-works',intro('02','How it works','An idea is a starting point. The next step is evidence.','Choose a direction, understand the buyer, check the cost and test a small first offer.')+'''<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">'''+''.join(card(t,d,u,'Open') for (t,d),u in zip(steps,['/browse','/lists','{{BBI_IDEA_URL}}','/business-demand-test-india','/calculator/startup-cost','/business-pricing-india','/first-customer-india','/business-idea-risk-check','/founder-decision-journal','/startup-guides']))+'''</div>''')

fill('under-the-hood',intro('03','The BBI lens','Look past the exciting headline.','A useful idea explains who pays, what you have to do and what could make it hard.')+'''<div class="grid gap-6 md:grid-cols-3">'''+card('Who is the buyer?','Start with a real person and a specific problem.','/business-idea-research-india')+card('Can it make money?','Put the price, costs and time beside each other.','/unit-economics-india')+card('What could go wrong?','Take difficult delivery and slow sales seriously.','/business-idea-risk-check')+'''</div>''')

fill('ai-generators',intro('04','Founder tools','Use a tool when you reach a real question.','Our calculators and practical workspaces help you test costs, price and demand.')+'''<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">'''+''.join(card(t,d,u,'Open tool') for t,d,u in tool_cards)+'''</div>''')

fill('learn-hub',intro('05','The library','Follow the subject that fits your situation.','The categories come from our live library; the reading rows link to our published guides and articles.')+'''
  <h3 class="font-display text-2xl font-semibold">Explore categories</h3><div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{{BBI_CATEGORY_CARDS}}</div>
  <div class="mt-12 flex items-center justify-between gap-4"><h3 class="font-display text-2xl font-semibold">Business guides</h3><a class="text-sm font-semibold text-[#7c3aed]" href="/startup-guides">All guides →</a></div><div class="bbi-home-rail mt-5">{{BBI_GUIDE_CARDS}}</div>
  <div class="mt-12 flex items-center justify-between gap-4"><h3 class="font-display text-2xl font-semibold">From the blog</h3><a class="text-sm font-semibold text-[#7c3aed]" href="/blog">All articles →</a></div><div class="bbi-home-rail mt-5">{{BBI_BLOG_CARDS}}</div>''')

fill('social-proof',intro('06','The golden tree','Start with a direction and follow the branches.','Our golden tree belongs to the original BBI story. Follow an interest into a category, a focused list and a practical idea.')+'''
  <div class="grid items-center gap-8 lg:grid-cols-2"><img src="/images/golden-tree@2x.webp" width="1400" height="793" loading="lazy" alt="The original transparent golden business-idea tree" class="w-full object-contain"><div class="rounded-2xl bg-white p-8 ring-1 ring-slate-200"><h3 class="font-display text-2xl font-semibold">Find your branch.</h3><p class="mt-4 leading-7 text-slate-600">Begin with your time, place and skills. The library gives you ways to narrow the choice without pretending that one idea is right for everyone.</p><a href="/browse" class="mt-6 inline-flex rounded-xl bg-[#7c3aed] px-6 py-3 font-semibold text-white hover:bg-[#6d28d9]">Explore categories →</a></div></div>
  <div class="mt-12"><h3 class="font-display text-xl font-semibold">Useful tools around the web</h3><p class="mt-2 text-sm text-slate-600">External resources; each link opens its own website.</p><div class="bbi-home-rail mt-5">'''+''.join(card(name,description,url,'Visit website') for name,description,url in [('Node.js','JavaScript runtime for building online tools.','https://nodejs.org/'),('GitHub','Keep code and collaborate on a project.','https://github.com/'),('Supabase','Database and application services.','https://supabase.com/'),('Vercel','Publish and host web projects.','https://vercel.com/')])+'''</div></div>''')

fill('testimonials',intro('07','Our origin','Why we built BBI.','The founder tried paid validation platforms for his own ideas and received answers that felt too generic to act on.')+'''<div class="grid gap-6 md:grid-cols-3">'''+card('A personal starting point','A business decision affects time, money and the people around you.','/about','Read our story')+card('An honest answer','The idea page should discuss the hard parts as plainly as the promise.','/lists','Browse ideas')+card('Meet the team','Read the original About story and the people behind the work.','/about','Meet the team')+'''</div>''')

fill('live-radar',intro('08','Keep exploring','New ideas give you new questions.','Browse recently published ideas from the live library and decide which one deserves a closer look.')+'''<div class="bbi-home-rail mt-5">{{BBI_RECENT_CARDS}}</div>''')

fill('pricing-teaser',intro('09','Pricing','Two ways to continue.','The plan prices are ₹199 and ₹299. Their exact inclusions will be specified before checkout.')+'''<div class="grid items-stretch gap-7 pt-8 md:grid-cols-2">'''+card('₹199','Paid plan. The included features are pending confirmation.','/pricing','See pricing')+card('₹299','Paid plan. The included features are pending confirmation.','/pricing','See pricing')+'''</div>''')

# The seller's original research strip uses a horizontal card row. Turn the
# same row into our own published blog carousel instead of seller articles.
for section in doc.xpath('//main/section[not(@id)]'):
    if 'Most-read research on IdeaProof' in ' '.join(section.itertext()):
        section.clear()
        section.set('class','py-12')
        section.append(html.fragment_fromstring('''<div class="relative mx-auto w-full max-w-6xl px-5 sm:px-8"><h2 class="font-display text-2xl font-semibold">More from the BBI blog</h2><div class="bbi-home-rail mt-5">{{BBI_BLOG_CARDS}}</div></div>'''))

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
