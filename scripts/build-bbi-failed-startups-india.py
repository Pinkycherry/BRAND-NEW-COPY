"""Convert the purchased India snapshot without changing its research copy.

Source: src/bought/research-2.html. Re-run after replacing that export.
The original remains untouched for comparison and future editorial work.
"""

from pathlib import Path
from lxml import html

root = Path(__file__).resolve().parents[1]
source = root / "src/bought/research-2.html"
target = root / "src/bought/research-2-bbi.html"
document = html.fromstring(source.read_text())
main = document.xpath("//main")
assert len(main) == 1
main = main[0]

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

for node in main.xpath('.//text()[contains(., "IdeaProof")]'):
    parent = node.getparent()
    if node.is_tail:
        parent.tail = (parent.tail or "").replace("IdeaProof database", "source database")
    else:
        parent.text = (parent.text or "").replace("IdeaProof database", "source database")

markup = html.tostring(main, encoding="unicode", method="html")
assert "IdeaProof" not in markup and "ideaproof.io" not in markup
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
</style></head><body><div id="bbi-india-header"></div><div class="min-h-screen flex flex-col bg-background">'''+markup+'''</div><div id="bbi-india-footer"></div>
<script>(function(){const input=document.getElementById('india-case-search');if(!input)return;const cards=[...input.closest('section').querySelectorAll('.space-y-2 > .block')];input.addEventListener('input',()=>{const q=input.value.trim().toLocaleLowerCase();for(const card of cards)card.hidden=!!q&&!card.textContent.toLocaleLowerCase().includes(q)})})()</script>
</body></html>'''
target.write_text(page)
print(f"{target.relative_to(root)}: {len(case_cards)} source case cards")
