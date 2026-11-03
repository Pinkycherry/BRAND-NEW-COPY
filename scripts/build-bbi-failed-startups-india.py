"""Convert the purchased India snapshot without changing its research copy.

Source: src/bought/research-2.html. Re-run after replacing that export.
The original remains untouched for comparison and future editorial work.
"""

from pathlib import Path
from lxml import html
from decimal import Decimal
import re

root = Path(__file__).resolve().parents[1]
source = root / "src/bought/research-2.html"
target = root / "src/bought/research-2-bbi.html"
document = html.fromstring(source.read_text())
main = document.xpath("//main")
assert len(main) == 1
main = main[0]

# Place the second original editorial image beside the purchased comparison
# section. It is decorative; the source chart and every data label remain.
comparison = main.xpath('.//h2[contains(., "Failure Reasons: India vs Global Average")]')[0].getparent().getparent().getparent()
comparison.insert(1, html.fragment_fromstring('<figure class="my-5"><img src="./images/failure-reasons-india-global-original.webp" alt="Two startup teams studying customer and cash decisions in different markets" loading="lazy" width="1672" height="941" class="w-full rounded-xl border border-border/60 object-cover" style="aspect-ratio:16/9;object-fit:cover"></figure>'))

# The exported Recharts SVGs serialize as raw nested markup in this static
# conversion and leave fixed-height blank areas. Replace only those three chart
# wrappers; keep their surrounding source headings, legends, and commentary.
charts = main.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," recharts-responsive-container ")]')
assert len(charts) == 3
industry, comparison_chart, capital = charts
industry.addprevious(html.fragment_fromstring('<figure><img src="./images/failure-industries-original.webp" alt="Indian founders examine several different business sectors" loading="lazy" width="1672" height="941" class="w-full rounded-xl border border-border/60 object-cover" style="aspect-ratio:16/9;object-fit:cover"></figure>'))
industry.drop_tree()
comparison_chart.drop_tree()
capital_slot = capital.getparent()  # The source fixes this wrapper to 320px.
capital_slot.addprevious(html.fragment_fromstring('<figure><img src="./images/failure-capital-original.webp" alt="Indian founder reviewing cash records with a colleague" loading="lazy" width="1672" height="941" class="w-full rounded-xl border border-border/60 object-cover" style="aspect-ratio:16/9;object-fit:cover"></figure>'))
capital_slot.drop_tree()

# The seller's 87 case links point to detail pages that were not supplied with
# this export. Keep each source card and its data visible, without dead links.
case_section = main.xpath('.//h2[contains(., "Failed Startups (87)")]')[0].getparent().getparent()
case_cards = case_section.xpath('.//a[starts-with(@href, "./pages/")]')
assert len(case_cards) == 87
for card in case_cards:
    card.tag = "div"
    card.attrib.pop("href", None)

search = case_section.xpath('.//input[@placeholder="Search..."]')[0]
search.set("id", "india-case-search")
search.set("type", "search")
search.set("aria-label", "Search the 87 purchased case records")

# Other seller-relative page links have no destination in this site. Preserve
# their labels and adjacent text while removing the dead navigation.
for anchor in main.xpath('.//a[starts-with(@href, "./pages/")]'):
    anchor.tag = "span"
    anchor.attrib.pop("href", None)
for anchor in main.xpath('.//a[@href="/"]'):
    if "Validate" in anchor.text_content():
        anchor.set("href", "/startup-idea-validation")

# The snapshot's company favicon collection contains empty files and missing
# paths. Use neutral initials in the same 48px position rather than broken or
# misleading logos. The supplied hero illustration remains as exported.
for image in main.xpath('.//img'):
    if "hero-failure-india" in image.get("src", ""):
        image.set("src", "./images/failure-india-original.webp")
        image.set("alt", "Original illustration of a founder's rupee ledger and startup notes")
        image.set("width", "1752")
        image.set("height", "897")
        image.set("style", "aspect-ratio:16/9;object-fit:contain")
        continue
    if any(name in image.get("src", "") for name in ("failure-reasons-india-global-original", "failure-industries-original", "failure-capital-original")):
        continue
    company = image.get("alt", "").removesuffix(" logo").strip()
    initials = "".join(word[0] for word in company.split()[:2] if word).upper()[:2] or "•"
    image.tag = "span"
    image.attrib.clear()
    image.set("class", "bbi-case-initial shrink-0")
    image.set("aria-hidden", "true")
    image.text = initials

for node in main.xpath('.//text()[contains(., "IdeaProof")]'):
    parent = node.getparent()
    if node.is_tail:
        parent.tail = (parent.tail or "").replace("IdeaProof database", "database")
    else:
        parent.text = (parent.text or "").replace("IdeaProof database", "database")

# Editorial display conversion only. The purchased source retains every
# original figure. A fixed rate avoids pretending these are live FX quotes.
RATES = {"$": Decimal("85"), "£": Decimal("110")}
UNITS = {"B": Decimal("1000000000"), "M": Decimal("1000000"), "K": Decimal("1000"), "": Decimal(1)}
RANGE = re.compile(r"(?P<symbol>[$£])(?P<start>\d+(?:\.\d+)?)[-–](?P<end>\d+(?:\.\d+)?)(?P<unit>[BMK])\b", re.I)
AMOUNT = re.compile(r"(?P<symbol>[$£])(?P<number>\d[\d,]*(?:\.\d+)?)(?P<unit>[BMK])?(?P<plus>\+)?(?P<per>/month)?", re.I)

def rupees(value):
    if value >= 10**12:
        amount, unit = value / Decimal(10**12), " lakh crore"
    elif value >= 10**7:
        amount, unit = value / Decimal(10**7), " crore"
    elif value >= 10**5:
        amount, unit = value / Decimal(10**5), " lakh"
    else:
        amount, unit = value, ""
    rounded = amount.quantize(Decimal("0.01"))
    return "₹" + f"{rounded:,.2f}".rstrip("0").rstrip(".") + unit

def convert(text):
    def range_replace(match):
        factor = RATES[match["symbol"]] * UNITS[match["unit"].upper()]
        return rupees(Decimal(match["start"]) * factor) + "–" + rupees(Decimal(match["end"]) * factor)
    text = RANGE.sub(range_replace, text)
    def amount_replace(match):
        factor = RATES[match["symbol"]] * UNITS[(match["unit"] or "").upper()]
        return rupees(Decimal(match["number"].replace(",", "")) * factor) + (match["plus"] or "") + (match["per"] or "")
    return AMOUNT.sub(amount_replace, text).replace("USD millions raised", "Approximate rupees raised")

for node in main.xpath('.//text()'):
    if "$" not in node and "£" not in node and "USD millions" not in node:
        continue
    parent = node.getparent()
    if node.is_tail:
        parent.tail = convert(parent.tail or "")
    else:
        parent.text = convert(parent.text or "")

markup = html.tostring(main, encoding="unicode", method="html")
assert "IdeaProof" not in markup and "ideaproof.io" not in markup
assert "recharts-" not in markup
assert markup.count('class="block"') >= 87

# Reuse the purchased stylesheet, spacing, cards, chart rendering, illustrations
# and Inter/Outfit font files. The shared site header/footer are injected by the
# route, just as on the existing lists page.
page = '''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Failed Startups in India | BusinessIdea.io</title>
<link rel="stylesheet" href="./styles/index-BpDyUYDe.css">
<style>
@font-face{font-family:Inter;src:url('./images/s_inter_v13_UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2.bin') format('woff2');font-display:swap;font-weight:400 700}
@font-face{font-family:Outfit;src:url('./images/s_outfit_v15_QGYvz_MVcBeNP4NJtEtq.woff2.bin') format('woff2');font-display:swap;font-weight:600 700}
body{margin:0;font-family:Inter,system-ui,sans-serif}h1,h2,h3{font-family:Outfit,Inter,system-ui,sans-serif}
#india-case-search{font-family:inherit}
.bbi-case-initial{display:inline-grid;place-items:center;width:48px;height:48px;flex:none;border-radius:9px;background:#f1edfa;color:#633bb0;font:700 13px Inter,system-ui,sans-serif;box-shadow:inset 0 0 0 1px #e3dbee}
</style></head><body><div id="bbi-india-header"></div><div class="min-h-screen flex flex-col bg-background">'''+markup+'''</div><div id="bbi-india-footer"></div>
<script>(function(){const input=document.getElementById('india-case-search');if(!input)return;const cards=[...input.closest('section').querySelectorAll('.space-y-2 > .block')];input.addEventListener('input',()=>{const q=input.value.trim().toLocaleLowerCase();for(const card of cards)card.hidden=!!q&&!card.textContent.toLocaleLowerCase().includes(q)})})()</script>
</body></html>'''
target.write_text(page)
print(f"{target.relative_to(root)}: {len(case_cards)} source case cards")
