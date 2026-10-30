import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { V2Frame } from "@/components/v2/frame";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

type SourceLink = { label: string; url: string };
type FailureRecord = {
  name: string;
  sector: string;
  event: string;
  date: string;
  summary: string;
  reported: string[];
  founderChecks: string[];
  limitation: string;
  sources: SourceLink[];
};

const records: FailureRecord[] = [
  {
    name: "Koo",
    sector: "Social platform",
    event: "Public service discontinued",
    date: "3 July 2024",
    summary: "Koo's founders announced that the service would be discontinued after partnership discussions did not produce an outcome. Reuters reported that the founders cited a shortage of funding and the high technology costs required to keep the app running.",
    reported: [
      "The founders said partnership talks with larger companies and media groups had fallen through.",
      "The public explanation pointed to funding constraints and the ongoing cost of operating the technology.",
    ],
    founderChecks: [
      "Can the product retain a defined group of users without a temporary news cycle or promotion?",
      "What does it cost to serve an active user, and what revenue can that user realistically support?",
      "If a strategic partnership does not happen, how long can the standalone business operate?",
    ],
    limitation: "The cited report records the founders' public explanation. It is not an audited breakdown of Koo's finances or proof that one factor alone caused the shutdown.",
    sources: [
      { label: "Reuters · 3 July 2024", url: "https://www.reuters.com/technology/indian-social-media-platform-koo-shut-down-after-partnership-talks-fail-2024-07-03/" },
      { label: "TechCrunch · 2 July 2024", url: "https://techcrunch.com/2024/07/02/indian-social-network-koo-to-shut-down/" },
    ],
  },
  {
    name: "Stayzilla",
    sector: "Homestay marketplace",
    event: "Bookings suspended; founder proposed a different model",
    date: "23–24 February 2017",
    summary: "Stayzilla halted operations in its existing form and suspended new bookings while its founder discussed a different business model. In his own account, Yogendra Vasupal described the difficulty of building supply and demand across many locations, the cost of educating both sides of the market, discount pressure and a drift away from cash-flow and working-capital fundamentals.",
    reported: [
      "The founder said the marketplace had to build both host supply and guest demand across many towns, stretching the operation.",
      "He described discount-led competition and the difficulty of recovering the cost of acquiring bookings.",
      "He also reflected that GMV and room-night growth had displaced attention from cash flow and working capital.",
    ],
    founderChecks: [
      "Can one town or neighbourhood reach enough active supply and paying demand before you expand?",
      "After discounts, commissions, support and fulfilment, does each completed transaction contribute cash?",
      "Are you tracking collections, working capital and repeat use—not only bookings or gross transaction value?",
    ],
    limitation: "The public announcement described a halt in the existing operating model and an intended reboot. It should not be presented as proof that every part of the company legally ceased to exist.",
    sources: [
      { label: "Yogendra Vasupal · founder's account · 23 February 2017", url: "https://medium.com/stayzilla/stayzilla-will-reboot-its-operations-5cc5b854b368" },
      { label: "Business Standard · 24 February 2017", url: "https://www.business-standard.com/article/companies/full-text-stayzilla-ceo-explains-why-he-has-to-shut-shop-and-reboot-117022400309_1.html" },
    ],
  },
  {
    name: "Doodhwala",
    sector: "Milk delivery",
    event: "Delivery operations ceased in existing cities",
    date: "14–16 October 2019",
    summary: "Doodhwala stopped delivery operations in its existing cities. Contemporary reporting said FreshToHome took over customer delivery and wallet balances as a migration arrangement. The available reports do not establish one definitive reason for the shutdown.",
    reported: [
      "The reported operating cities were Bengaluru, Pune and Hyderabad.",
      "FreshToHome described the customer and wallet transfer as a migration path, not an acquisition.",
      "Doodhwala had earlier told the press it was operationally profitable and looking for funding; that statement is not an independently audited result.",
    ],
    founderChecks: [
      "Can each delivery area support enough repeat orders per route to cover picking, cold-chain, delivery and support costs?",
      "What happens to contribution margin when order density falls or delivery frequency changes?",
      "Can customer balances, refunds and service continuity be handled if the operating model changes?",
    ],
    limitation: "The reporting confirms the service transition, not the underlying cause. Do not infer insolvency, fraud or a specific unit-economics failure from the service closure alone.",
    sources: [
      { label: "Mint · 14 October 2019", url: "https://www.livemint.com/companies/start-ups/doodhwala-suspends-delivery-services-hands-over-operations-to-freshtohome-11571059792983.html" },
      { label: "The Times of India · 16 October 2019", url: "https://timesofindia.indiatimes.com/business/india-business/doodhwala-ceases-operations-freshtohome-takes-over-delivery/articleshow/71605096.cms" },
    ],
  },
  {
    name: "Lido Learning",
    sector: "Online school tutoring",
    event: "Business operations shut down",
    date: "February 2022",
    summary: "Lido Learning's shutdown was reported in February 2022 after employees described a sudden closure, delayed salaries and uncertainty for tutors and families. Contemporary reporting said the founder told staff the company did not have funds to continue and was exploring a fundraise or acquisition. The public reports do not provide an audited account of the company's finances.",
    reported: ["Business Standard reported concerns about delayed salary and vendor payments.", "The Indian Express reported that staff, tutors, parents and students were affected and described funding difficulties.", "Reports mentioned a proposed fundraise or acquisition search but do not establish that either completed before operations stopped."],
    founderChecks: ["If customers pay in advance, what cash is reserved for classes, refunds and tutor payments?", "Can payroll and delivery commitments be met if a funding round is delayed?", "What is the smallest reliable delivery model that can serve paying students without an oversized fixed team?"],
    limitation: "The sources report employee/customer accounts and statements attributed to the company. They do not establish a complete audited cash position, every refund outcome or one single cause of closure.",
    sources: [
      { label: "The Indian Express · 24 February 2022", url: "https://indianexpress.com/article/business/companies/lido-learning-shuts-staff-clients-in-the-lurch-7788113/lite/" },
      { label: "Business Standard · 24 February 2022", url: "https://www.business-standard.com/article/companies/ronnie-screwvala-backed-startup-lido-learning-shuts-shop-workers-seek-help-122022300602_1.html" },
    ],
  },
  {
    name: "Udayy",
    sector: "Live online learning for school students",
    event: "Operations shut down",
    date: "April 2022; reported 1 June 2022",
    summary: "Udayy shut operations after the return to in-person schooling changed the conditions under which its live online learning model had grown. Co-founder Saumya Yadav told the Economic Times that customer acquisition had become expensive and parents were asking for refunds as children returned to school. She said the founders did not see a sufficiently viable path to continue.",
    reported: ["The co-founder connected the slowdown to schools reopening and children having less time for online classes.", "She cited higher customer acquisition costs and refund requests.", "The company said it returned around $8–8.5 million to investors; this is an attributed founder statement, not an independent performance measure."],
    founderChecks: ["Was demand temporary, or did buyers still need the service when routines returned to normal?", "How much does it cost to acquire a paying family, and how long does that family remain?", "What refund, cancellation and teacher-payment obligations remain when enrolment slows?"],
    limitation: "These reasons are attributed to the co-founder and contemporary reporting. They are not a universal explanation for edtech shutdowns or proof that all online learning demand disappears when schools reopen.",
    sources: [
      { label: "Economic Times · 1 June 2022", url: "https://economictimes.indiatimes.com/tech/startups/edtech-startup-udayy-shuts-down-lays-off-entire-staff/articleshow/91943698.cms" },
      { label: "YourStory · 2 June 2022", url: "https://yourstory.com/2022/06/udayy-edtech-startup-shuts--lays-off-entire-workforce" },
    ],
  },
];

const wrap = "mx-auto max-w-6xl px-4 md:px-6";
const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";
const primary = "inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800";

export const Route = createFileRoute("/failed-startups/india")({
  head: () => ({
    meta: [
      { title: "Indian Startup Shutdowns: Source-Checked Cases and Founder Lessons | BusinessIdea.io" },
      { name: "description", content: "Read source-checked Indian startup service shutdowns, what founders publicly said, what remains unknown, and the operating questions to test before spending." },
      { property: "og:title", content: "Indian startup shutdowns: evidence, limits and founder checks | BusinessIdea.io" },
      { property: "og:description", content: "Five documented Indian service shutdowns or pauses, with source links and clear limits on what the public record proves." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: FailedStartupsPage,
});

function FailedStartupsPage() {
  return <V2Frame active="/topics">
    <JsonLd schema={[
      webPageSchema({
        path: "/failed-startups/india",
        name: "Indian startup shutdowns: source-checked cases",
        description: "A source-led review of five Indian startup service shutdowns or pauses, the founders' public explanations and what remains unknown.",
      }),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Startup risk in India", path: "/failed-startups/india" },
      ]),
    ]} />
    <div className="border-b bg-muted/30 pt-24 lg:pt-28">
      <nav aria-label="Breadcrumb" className={`${wrap} flex flex-wrap items-center gap-2 py-3 text-sm text-muted-foreground`}>
        <a href="/" className="hover:text-primary">Home</a><ChevronRight size={15}/><span>Startup risk in India</span>
      </nav>
    </div>

    <section className="border-b bg-gradient-to-b from-amber-500/10 to-background py-12 lg:py-16">
      <div className={wrap}>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Evidence-led case review · India</span>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">When a startup stops operating, what can we actually learn?</h1>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">A shutdown headline rarely tells the whole story. Read what founders and credible reporting actually said, separate that from interpretation, and turn the evidence into questions to test in your own business.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#case-records" className={primary}>Read the documented cases <ArrowRight size={17}/></a>
          <a href="/business-idea-risk-check" className="inline-flex min-h-11 items-center rounded-xl border bg-card px-5 py-3 font-semibold">Check your own risks</a>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">This page currently reviews five source-checked service shutdowns or pauses. Two of the five examples are from edtech, so this is not a balanced sector sample or a count of all Indian startup failures.</p>
      </div>
    </section>

    <section className="py-10 lg:py-12">
      <div className={wrap}>
        <div className="grid gap-4 md:grid-cols-3">
          <article className={card}><h2 className="font-bold">A service can stop without a legal closure</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">A platform may suspend bookings, transfer customers or change its model. Do not label every event a bankruptcy.</p></article>
          <article className={card}><h2 className="font-bold">A founder explanation is evidence, not an audit</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Keep the speaker and source visible. A public explanation may be incomplete or contested.</p></article>
          <article className={card}><h2 className="font-bold">A pattern is a question, not a verdict</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use a case to decide what to investigate in your own market. It cannot predict whether your idea will succeed.</p></article>
        </div>
      </div>
    </section>

    <section id="case-records" className="scroll-mt-24 bg-muted/20 py-12 lg:py-16">
      <div className={wrap}>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">What the public record says</h2>
          <p className="mt-3 text-muted-foreground">Each record separates the reported event from the founder checks we can reasonably take from it. Open the sources before relying on a detail.</p>
        </div>
        <div className="mt-7 grid gap-5">
          {records.map(record => <article key={record.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-sm font-bold text-primary">{record.sector}</p><h3 className="mt-2 text-2xl font-bold">{record.name}</h3></div>
              <div className="rounded-xl border bg-background px-3 py-2 text-sm"><p className="font-semibold">{record.event}</p><p className="mt-1 text-muted-foreground">{record.date}</p></div>
            </div>
            <p className="mt-5 max-w-4xl leading-7 text-foreground">{record.summary}</p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div><h4 className="font-bold">What was reported</h4><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">{record.reported.map(item=><li key={item}>{item}</li>)}</ul></div>
              <div><h4 className="font-bold">Questions to ask before you spend</h4><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">{record.founderChecks.map(item=><li key={item}>{item}</li>)}</ul></div>
            </div>
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><strong>What this record does not prove:</strong> {record.limitation}</div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4">
              {record.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{source.label}<ExternalLink size={14}/></a>)}
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="py-12 lg:py-16">
      <div className={wrap}>
        <h2 className="text-3xl font-bold">Questions that travel across these cases</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">These are not universal causes of failure. They are operating questions suggested by the specific public records above.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className={card}><h3 className="text-xl font-bold">Can one local market work first?</h3><p className="mt-2 leading-7 text-muted-foreground">For a marketplace or delivery service, measure real supply, repeat buyers and completed transactions in one reachable area before promising nationwide coverage.</p></article>
          <article className={card}><h3 className="text-xl font-bold">Does each transaction leave cash behind?</h3><p className="mt-2 leading-7 text-muted-foreground">Include discounts, delivery, returns, support, payment delays and the founder's time. Revenue or order volume alone does not answer this.</p></article>
          <article className={card}><h3 className="text-xl font-bold">What if the next funding or partnership does not arrive?</h3><p className="mt-2 leading-7 text-muted-foreground">Write a plan that works under a slower-growth case. Treat a possible investor, acquirer or partner as uncertain until an agreement is real.</p></article>
          <article className={card}><h3 className="text-xl font-bold">Which number changes the decision?</h3><p className="mt-2 leading-7 text-muted-foreground">Choose a small set of operating measures tied to cash, repeat use, delivery quality and contribution—not a headline metric that can grow while the business weakens.</p></article>
        </div>
      </div>
    </section>

    <section className="border-y bg-muted/20 py-12 lg:py-16">
      <div className={wrap}>
        <h2 className="text-3xl font-bold">How this page handles evidence</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className={card}><h3 className="font-bold">Included</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A dated public report, a founder or company statement where available, and a source link a reader can open. The event is described narrowly: service stopped, bookings paused or an operating model changed.</p></div>
          <div className={card}><h3 className="font-bold">Not claimed</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">No total number of Indian startup failures, no total capital “lost”, no bankruptcy label without evidence, and no invented founder quotes or financial figures. Illustrative placeholder case studies are excluded.</p></div>
        </div>
      </div>
    </section>

    <section className="py-12 lg:py-16">
      <div className={wrap}>
        <h2 className="text-3xl font-bold">Turn the lesson into your next check</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">Pick the uncertainty you need to reduce. The next step should produce evidence, not another optimistic spreadsheet.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Check the risk before spending","/business-idea-risk-check"],
            ["Test whether a buyer will act","/business-demand-test-india"],
            ["Map your startup cash timing","/startup-cash-flow-india"],
          ].map(([title,href])=><a key={href} href={href} className={card}><h3 className="font-bold">{title}</h3><ArrowRight className="mt-4 text-primary" size={18}/></a>)}
        </div>
        <div className="mt-8"><a href="/browse" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">Browse business ideas <ArrowRight size={17}/></a></div>
      </div>
    </section>
  </V2Frame>;
}
