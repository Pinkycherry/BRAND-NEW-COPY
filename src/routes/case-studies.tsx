import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ShieldCheck, Lightbulb, FileCheck2, Search, TrendingUp } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { STARTUP_GUIDES } from "@/lib/guides-data";

export const Route = createFileRoute("/case-studies")({
  head: () => ({ meta: [
    { title: "Founder Case Studies: Evidence Before Anecdotes | BusinessIdea.io" },
    { name: "description", content: "A source-first founder case study library. See the evidence standard, published cases and practical ways to evaluate a business decision without invented metrics." },
    { property: "og:title", content: "Founder case studies: evidence before anecdotes | BusinessIdea.io" },
    { property: "og:type", content: "website" },
  ] }),
  component: CaseStudiesPage,
});

const wrap = "container mx-auto max-w-6xl px-4";
const card = "rounded-lg border bg-card text-card-foreground shadow-sm";

const standards = [
  { title: "Traceable identity", detail: "A named company, founder or primary source that lets a reader locate the original account.", icon: Search },
  { title: "Dated milestones", detail: "A clear sequence of events, with dates attached to material changes and outcomes.", icon: FileCheck2 },
  { title: "Supported numbers", detail: "Every material figure has a source and is labelled as reported, estimated or independently verified.", icon: TrendingUp },
  { title: "Separated interpretation", detail: "What happened is distinguished from our explanation of why it may have happened.", icon: Lightbulb },
];

function CaseStudiesPage() {
  return <V2Frame active="/case-studies">
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-muted/30 border-b pt-24 lg:pt-28">
        <nav aria-label="Breadcrumb" className={wrap + " flex flex-wrap items-center gap-2 py-3 text-sm text-muted-foreground"}>
          <a href="/" className="hover:text-primary">Home</a><ChevronRight size={15}/><span className="font-medium text-foreground">Case studies</span>
        </nav>
      </div>

      <section aria-labelledby="cs-hero" className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white py-8 md:py-10 lg:py-14 border-b border-border/40">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{backgroundImage:"linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",backgroundSize:"60px 60px"}}/>
        <div aria-hidden="true" className="absolute top-10 -left-32 w-80 h-80 bg-brand-500/12 rounded-full blur-[100px] pointer-events-none"/>
        <div aria-hidden="true" className="absolute top-1/3 -right-28 w-72 h-72 bg-brand-400/10 rounded-full blur-[100px] pointer-events-none"/>
        <div className={wrap + " relative z-10"}>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <img src="/images/bbi-logo.png" alt="" width="28" height="28" className="w-7 h-7 object-contain rounded-md"/>
                <span className="text-sm font-semibold tracking-tight text-slate-900">BusinessIdea.io</span>
                <span className="text-sm text-muted-foreground">· Founder case studies</span>
              </div>
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground mb-4">
                <ShieldCheck size={14} className="mr-1.5"/> Evidence standard first
              </div>
              <h1 id="cs-hero" className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                Founder case studies: <span className="gradient-text">evidence before anecdotes</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-5">
                Learn from real business decisions without invented revenue, fictional growth curves or composite founders presented as fact. Every published story must show what is known, where it came from and what remains uncertain.
              </p>
              <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground bg-background/60 border border-border/60 rounded-full px-4 py-2">
                <span className="font-semibold text-foreground">{CASE_STUDIES.length}</span><span>verified founder cases published</span><span aria-hidden="true">·</span><span>4 publication checks</span><span aria-hidden="true">·</span><span>composites excluded</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#published-cases" className="inline-flex items-center justify-center gap-2 font-medium transition-all bg-slate-900 text-white hover:bg-slate-700 shadow-sm h-12 rounded-lg px-6 text-base min-h-[48px]">View published cases <ArrowRight size={16}/></a>
                <a href="/failed-startups/india" className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 shadow-sm h-12 rounded-lg px-6 text-base min-h-[48px]">Read documented shutdowns</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-border/60 bg-background/60 backdrop-blur-sm p-3 md:p-4 shadow-sm">
                <div aria-hidden="true" className="absolute -inset-4 bg-brand-500/15 blur-3xl rounded-full pointer-events-none"/>
                <img src="/images/purchased/case-studies-x0byv0pT.jpg" alt="Purchased editorial illustration of founder case study cards and growth charts" width="1280" height="960" className="relative w-full h-auto rounded-2xl" loading="eager" fetchPriority="high" decoding="async"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Publication numbers" className="py-10 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              ["0","Verified success cases published"],
              ["4","Evidence checks for every story"],
              ["0","Composite stories presented as real"],
              ["1","Source-first publication standard"],
            ].map(([value,label])=><div key={label} className={card+" p-5 md:p-6 text-center"}>
              <div className="inline-flex p-2.5 bg-primary/10 rounded-lg mb-3"><FileCheck2 size={20} className="text-primary"/></div>
              <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
            </div>)}
          </div>
        </div>
      </section>

      <div className="border-y bg-background/90 backdrop-blur sticky top-14 md:top-16 z-30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 py-2.5 overflow-x-auto">
            <span className="hidden sm:inline-flex text-xs uppercase tracking-wide text-muted-foreground font-semibold">Jump to</span>
            {[["Published cases","#published-cases"],["Evidence standard","#standard"],["How to read a case","#read-a-case"],["Related research","#related"]].map(([label,href])=><a key={href} href={href} className="inline-flex items-center px-3 py-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-xs font-medium whitespace-nowrap min-h-[36px]">{label}</a>)}
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-4 py-12 space-y-14">
        <section id="published-cases" className="scroll-mt-32" aria-labelledby="published-title">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">The case library</p><h2 id="published-title" className="text-2xl md:text-3xl font-bold">Published founder case studies</h2><p className="mt-2 max-w-2xl text-muted-foreground">Only stories that pass the publication checks appear here. A short list is more useful than a large collection of claims readers cannot verify.</p></div>
            <span className="rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground">{CASE_STUDIES.length} published</span>
          </div>
          {CASE_STUDIES.length ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{CASE_STUDIES.map(study=><a key={study.slug} href={`/founder-stories/${study.slug}`} className={card+" group p-5 hover:border-primary/50 transition-colors"}>
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">{study.story_theme}</span><h3 className="mt-3 text-lg font-semibold group-hover:text-primary">{study.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{study.solution_and_offer}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read case study <ArrowRight size={16}/></span>
          </a>)}</div> : <div className="rounded-xl border border-border bg-muted/20 p-6 md:p-9">
            <div className="grid md:grid-cols-[auto_1fr] gap-4 items-start">
              <div className="rounded-xl bg-primary/10 p-3 text-primary"><ShieldCheck size={26}/></div>
              <div><h3 className="text-xl md:text-2xl font-bold">No founder success story has passed the publication check yet.</h3><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">The draft collection includes illustrative composite examples. They are intentionally withheld because they do not describe traceable individual founders. We will publish a case when its identity, milestones and material claims can be checked—not simply to make this page look full.</p><a href="/failed-startups/india" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">Explore documented startup shutdowns <ArrowRight size={16}/></a></div>
            </div>
          </div>}
        </section>

        <section id="standard" className="scroll-mt-32" aria-labelledby="standard-title">
          <div className="max-w-3xl mb-7"><p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Our publication method</p><h2 id="standard-title" className="text-2xl md:text-3xl font-bold">What makes a case study publishable?</h2><p className="mt-3 text-muted-foreground leading-7">A case should be useful to a founder and fair to the people and companies it describes. These checks apply before a story is included.</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{standards.map((item,index)=>{const Icon=item.icon;return <article key={item.title} className={card+" p-5"}>
            <div className="flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground">0{index+1}</span><Icon size={20} className="text-primary"/></div><h3 className="mt-5 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
          </article>})}</div>
        </section>

        <section id="read-a-case" className="scroll-mt-32 grid lg:grid-cols-2 gap-8 items-start" aria-labelledby="read-title">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Read critically</p><h2 id="read-title" className="text-2xl md:text-3xl font-bold">The anatomy of a useful founder case</h2><p className="mt-3 text-muted-foreground leading-7">A strong case study is not a victory lap. It makes the decision, the evidence and the uncertainty visible so another founder can judge whether the lesson applies to their own market.</p></div>
          <div className="space-y-3">{[
            ["Hypothesis","What did the founder believe about the buyer, problem or business model?"],
            ["Signals","What did customers actually do—pay, return, refer, use or decline?"],
            ["Decision","What changed after the evidence, and what alternatives were considered?"],
            ["Outcome","What can be confirmed, what is founder-reported and what remains unknown?"],
          ].map(([title,detail],i)=><div key={title} className={card+" p-4 flex gap-4"}><span className="text-sm font-bold text-primary">0{i+1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p></div></div>)}</div>
        </section>

        <section aria-labelledby="patterns-title" className="border-y bg-muted/20 py-10 px-4 -mx-4 md:mx-0 md:rounded-2xl md:border">
          <div className="container mx-auto max-w-5xl"><p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Founder reading checklist</p><h2 id="patterns-title" className="text-2xl md:text-3xl font-bold">Five questions to take from any case</h2><div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              ["Niche focus","Was the first customer group specific enough to reach and serve?"],
              ["Fast iteration","Did the team test the riskiest assumption before committing major resources?"],
              ["Evidence quality","Were decisions based on customer behaviour or only stated interest?"],
              ["Distribution","How did the business reach buyers, and was that channel repeatable?"],
              ["Cash discipline","Did pricing and delivery leave enough contribution to sustain the model?"],
            ].map(([title,detail])=><div key={title} className={card+" bg-background p-5"}><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p></div>)}
          </div></div>
        </section>

        <section id="related" className="scroll-mt-32" aria-labelledby="related-title">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Keep researching</p><h2 id="related-title" className="text-2xl md:text-3xl font-bold">Use evidence in your own business decisions</h2></div><a href="/business-idea-research-india" className="text-sm font-semibold text-primary hover:underline">Open the research notebook <ArrowRight size={15} className="inline"/></a></div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">{[
            ["Test a buyer problem","/business-demand-test-india","Find out whether a real buyer will commit."],
            ["Compare business models","/business-models-india","Understand delivery, cash timing and hidden costs."],
            ["Study documented shutdowns","/failed-startups/india","Read what public reporting can—and cannot—confirm."],
          ].map(([title,href,detail])=><a key={href} href={href} className={card+" group p-5 hover:border-primary/50 transition-colors"}><h3 className="font-semibold group-hover:text-primary">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{detail}</p><ArrowRight size={17} className="mt-5 text-primary"/></a>)}</div>
          <h2 className="mt-10 text-xl font-bold">Related founder guides</h2><div className="mt-4 flex flex-wrap gap-2">{STARTUP_GUIDES.slice(0,6).map(guide=><a key={guide.slug} className="rounded-full border bg-card px-4 py-2 text-sm hover:border-primary/50" href={`/startup-guides/${guide.slug}`}>{guide.title}</a>)}</div>
        </section>
      </main>
    </div>
  </V2Frame>;
}
