import { SellerFaq } from "@/components/v2/faq";
import { V2PageCta, V2PageHero, V2PageSection } from "@/components/v2/page-sections";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GlassShell } from "@/components/glass-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/idea-comparison.css";
import { useFounderWorkspace, removeShortlistIdea, clearShortlist, buildFounderPrompt, type WorkspaceIdea } from "@/lib/founder-workspace";
import { ProviderPromptActions } from "@/components/founder-workspace/provider-prompt-actions";

const lenses = [
  { title: "A buyer you can reach", prompt: "Can you name a real group and reach a decision-maker this week?", next: "/first-customer-india", link: "Map the first payer" },
  { title: "A problem that has happened", prompt: "Have you heard a recent workaround or seen an actual purchase?", next: "/business-idea-research-india", link: "Check the evidence" },
  { title: "Cash before collection", prompt: "Which idea ties up more money before a buyer pays?", next: "/startup-costs-india", link: "Map startup cash" },
  { title: "One sale that carries the work", prompt: "Which first offer has a defined price, scope and delivery cost?", next: "/business-pricing-india", link: "Quote the first sale" },
  { title: "Time you can truly give", prompt: "Can you make the first promise alongside work, travel and family obligations?", next: "/startup-idea-validation", link: "Plan a reversible test" },
] as const;
export const Route = createFileRoute("/startup-idea-comparison")({
  head: () => ({ meta: [
    { title: "Compare Two Startup Ideas in India with Evidence | BusinessIdea.io" },
    { name: "description", content: "Compare two business ideas in India by buyer access, observed need, cash, first-sale economics and the time you can truly give. Choose a small next test without a fake score." },
    { property: "og:title", content: "Compare two startup ideas in India | BusinessIdea.io" },
    { property: "og:type", content: "article" },
  ] }),
  component: ComparisonPage,
});
function ComparisonPage() {
  const { shortlist, context } = useFounderWorkspace();
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [nextStep, setNextStep] = useState("");
  const comparisonRows: { label: string; value: (idea: WorkspaceIdea) => string }[] = [
    { label: "Business description", value: idea => idea.description || idea.summary || idea.hook || "Not included in this published record" },
    { label: "Category", value: idea => idea.categoryName || idea.categoryCode || "Not included in this published record" },
    { label: "Starting investment", value: idea => idea.startupCost || idea.investmentBand || "Not included in this published record" },
    { label: "Time demand", value: idea => idea.timeNeeded || "Not included in this published record" },
    { label: "Skills", value: idea => idea.skillLevel || "Not included in this published record" },
    { label: "Work setting", value: idea => idea.workMode || "Not included in this published record" },
    { label: "Target buyer", value: idea => idea.targetCustomer || "Not included in this published record" },
    { label: "Revenue model", value: idea => idea.revenueModel || "Not included in this published record" },
    { label: "Known risks", value: idea => idea.risks || "Not included in this published record" },
    { label: "First steps", value: idea => idea.firstSteps?.join("; ") || "Not included in this published record" },
  ];
  const choiceLines = lenses.map(lens => {
    const chosen = shortlist.find(idea => idea.slug === choices[lens.title]);
    const note = notes[lens.title]?.trim();
    return `- ${lens.title}: ${chosen ? chosen.title : "unclear / more evidence needed"}.${note ? " Founder note: " + note : ""}`;
  }).join("\n");
  const prompt = buildFounderPrompt("compare", shortlist, context) +
    "\n\nFOUNDER'S COMPARISON OBSERVATIONS:\n" + choiceLines +
    (nextStep.trim() ? "\nFounder-defined next step / review date: " + nextStep.trim() : "");
  const updateChoice = (lens: string, slug: string) => setChoices(current => ({ ...current, [lens]: slug }));
  const updateNote = (lens: string, note: string) => setNotes(current => ({ ...current, [lens]: note }));
  return <>
    <JsonLd schema={[
      webPageSchema({ path: "/startup-idea-comparison", name: "Compare two startup ideas in India", description: "Compare two to four published business ideas using actual source fields and the founder's own evidence notes." }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Startup idea comparison", path: "/startup-idea-comparison" }]),
    ]} />
    <GlassShell><div className="ic-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Startup idea comparison</span></nav>
      <V2PageHero className="ic-hero"><div><p className="gh-eyebrow">TWO TO FOUR IDEAS · ONE REAL LIFE</p><h1>Which idea deserves <em>your next Tuesday?</em></h1><p>Compare the published records you selected. Missing information stays visible as a research gap; this page will not invent a winner or a success score for you.</p><a href="#compare-board" className="gh-button gh-button-primary">Compare my saved ideas <ArrowRight size={17}/></a></div><aside><strong>Your shortlist travels with you on this browser.</strong><p className="mt-2">Add ideas from Browse, Blueprints or any published idea detail, then return here.</p><p className="mt-3 font-semibold">{shortlist.length} of 4 ideas saved</p></aside></V2PageHero>

      <section id="compare-board" className="scroll-mt-28 py-10 lg:py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wide text-blue-700">Your actual shortlist</p><h2 className="mt-2 text-2xl font-bold text-slate-950">Compare the source records</h2><p className="mt-2 max-w-3xl text-slate-600">The table shows fields present in your saved records. “Not included” means you need to research that point; it does not mean the business lacks it.</p></div><div className="flex flex-wrap gap-2"><a href="/browse" className="inline-flex min-h-10 items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Find another idea</a>{shortlist.length>0&&<button type="button" onClick={clearShortlist} className="min-h-10 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Clear shortlist</button>}</div></div>
          {shortlist.length<2 ? <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5"><h3 className="font-bold text-slate-950">Choose at least two ideas to compare</h3><p className="mt-2 text-sm leading-6 text-slate-700">Your current selection has {shortlist.length} idea{shortlist.length===1?"":"s"}. Use Add to shortlist on a published idea, then return here. Your choices are stored in this browser, not uploaded to BusinessIdea.io.</p><div className="mt-4 flex flex-wrap gap-3"><a href="/browse" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">Browse published ideas <ArrowRight size={16}/></a><a href="/blueprints" className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800">Browse blueprints</a></div></div>
          : <>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{shortlist.map(idea=><li key={idea.slug} className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><div className="min-w-0"><a href={`/idea/${idea.slug}`} className="font-semibold text-slate-950 hover:underline">{idea.title}</a><p className="mt-1 text-xs text-slate-500">{idea.categoryName || idea.categoryCode || "Published idea"}</p></div><button type="button" onClick={()=>removeShortlistIdea(idea.slug)} className="shrink-0 text-sm font-semibold text-slate-600 hover:text-slate-950">Remove</button></li>)}</ul>
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-slate-100"><tr><th scope="col" className="w-44 p-4 font-bold text-slate-900">What to compare</th>{shortlist.map(idea=><th scope="col" key={idea.slug} className="min-w-56 p-4 font-bold text-slate-900">{idea.title}</th>)}</tr></thead>
                <tbody>{comparisonRows.map(row=><tr key={row.label} className="border-t border-slate-200 align-top"><th scope="row" className="bg-slate-50 p-4 font-semibold text-slate-800">{row.label}</th>{shortlist.map(idea=><td key={idea.slug} className="p-4 leading-6 text-slate-700">{row.value(idea)}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-500">Published fields are source context, not proof of local demand. This comparison is based on records you selected; it does not query the live market.</p>
          </>}
        </div>
      </section>

      {shortlist.length>=2 && <V2PageSection className="ic-assessment" aria-labelledby="ic-assessment-title"><div><p className="gh-eyebrow">YOUR EVIDENCE, NOT A SCORE</p><h2 id="ic-assessment-title">Which idea has stronger evidence for this question?</h2><p>Pick the record that currently has stronger evidence, or leave the answer unclear. Add an observation or source you can check. These notes are included in the prepared prompt below.</p></div><div className="mt-6 grid gap-4 md:grid-cols-2">{lenses.map(lens=><article key={lens.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="text-lg font-bold">{lens.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{lens.prompt}</p><label className="mt-4 block text-sm font-semibold text-slate-800">Current evidence points to<select value={choices[lens.title]||""} onChange={event=>updateChoice(lens.title,event.target.value)} className="mt-2 block min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal"><option value="">Unclear — need evidence</option>{shortlist.map(idea=><option key={idea.slug} value={idea.slug}>{idea.title}</option>)}</select></label><label className="mt-4 block text-sm font-semibold text-slate-800">Observation or source note<textarea rows={3} value={notes[lens.title]||""} onChange={event=>updateNote(lens.title,event.target.value)} placeholder="What happened, when, and where could you verify it?" className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 font-normal leading-6"/></label><p className="mt-2 text-xs text-slate-500">Use “unclear” until you have evidence. A guess is not a finding.</p></article>)}</div><label className="mt-6 block text-sm font-semibold text-slate-800">Your next action and review date<textarea rows={2} value={nextStep} onChange={event=>setNextStep(event.target.value)} placeholder="Example: speak to two likely buyers before placing a stock order; review Friday." className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 font-normal leading-6"/></label><div className="mt-6"><ProviderPromptActions title="Continue this comparison in your AI account" prompt={prompt}/></div></V2PageSection>}

      <V2PageSection className="ic-cost" aria-labelledby="ic-cost-title"><div><p className="gh-eyebrow">THE RISK YOU FEEL AT HOME</p><h2 id="ic-cost-title">A rupee at risk is personal.</h2><p>A deposit, unsold stock or four nights a week can take room from a household. Compare the smallest useful version of each idea, then check the timing of bills rather than only total cost.</p></div><div className="ic-cost-actions"><Link to="/startup-costs-india"><strong>What must I spend first?</strong><span>Map one-time and monthly cash requirements.</span><ArrowUpRight size={17}/></Link><Link to="/startup-cash-flow-india"><strong>When does cash run out?</strong><span>Place bills beside the date customer payment arrives.</span><ArrowUpRight size={17}/></Link></div></V2PageSection>

      <SellerFaq title="Questions about your comparison" faq={[
        {q:"Does this page save selected ideas?",a:<><p>The shortlist is saved in this browser's local storage. It is not uploaded to BusinessIdea.io, and browser data or device changes may remove it.</p></>},
        {q:"Does the table tell me which business will succeed?",a:<><p>No. It shows available published fields beside one another. Missing information remains a question to research; none of these fields proves demand in your own market.</p></>},
        {q:"What happens when I continue to an AI provider?",a:<><p>The selected records and your comparison notes are included in a prepared prompt. The provider opens in a new tab; review it and press send in your own account. BusinessIdea.io does not run the model or store the answer.</p></>},
      ]} />
      <V2PageCta className="ic-final"><div><p className="gh-eyebrow">THE NEXT TUESDAY</p><h2>Choose a test you can finish.</h2><p>Take the idea whose next uncertainty you can resolve responsibly. If the shortlist is empty, begin with published records instead of guessing.</p></div><div><Link to="/startup-idea-validation" className="gh-button gh-button-primary">Plan a validation test <ArrowUpRight size={17}/></Link><Link to="/browse" className="gh-button gh-button-secondary">Find published ideas <ArrowUpRight size={17}/></Link></div></V2PageCta>
    </div></GlassShell>
  </>;
}
