import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, UPDATED_ON, IMG, SRC, TOOLS, CTA } from "./topic-pages-shared";

/** Seller layout: topic hub (/topics/fundraising). Sections: funding stages, topics by category, what investors look for, prepare to raise. */
export const raiseFunds: TopicPage = {
  slug: "how-to-raise-funds-for-a-startup-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/topics/fundraising",
  parent: PARENT,
  seo: {
    title: "How to Raise Funds for a Startup in India: Stages, Sources and Preparation",
    description: "A clear path to raise funds for your startup in India: which money fits each stage, from savings and MUDRA to the Seed Fund, angels and VCs, and how to prepare before you ask.",
  },
  hero: {
    eyebrow: "Raise funds for a startup",
    h1: "How to Raise Funds for a Startup in India",
    highlight: "Raise Funds",
    intro: "Raising money is not one big pitch. It is a ladder: your own savings, then a loan or a scheme, then an incubator, then angels, and only for some businesses, venture capital. Find your rung today, and you will know exactly who to talk to next.",
    sub: "Built for Indian founders: **DPIIT recognition**, the **Startup India Seed Fund**, **MUDRA**, angel networks and the paperwork Indian investors check.",
    updated: UPDATED,
    primary: { label: "See the funding stages", href: "#stages" },
    secondary: { label: "How much do I need?", href: "/calculator/funding-needed" },
    image: IMG.funding,
    imageAlt: "A founder preparing to raise funds for a startup",
  },
  sections: [
    {
      type: "table",
      heading: "Funding stages for Indian startups",
      intro: "Most founders start at the top row. Move down only when you have the proof each row asks for.",
      columns: ["Stage", "What you have", "Money that usually fits", "Where to go"],
      rows: [
        ["Idea", "A problem and a few buyer conversations", "Your savings, family money with written terms", "Test first: [validate your idea](/how-to-validate-a-business-idea-in-india)"],
        ["First sales", "Paying customers, even a few", "[MUDRA](https://www.mudra.org.in/) loan (Shishu, Kishore, Tarun, Tarun Plus), bank loan with a CGTMSE guarantee", "Your bank branch, NBFC or MFI"],
        ["Proof of concept", "A prototype or pilot, DPIIT recognition", "[Startup India Seed Fund](https://seedfund.startupindia.gov.in/): up to ₹20 lakh for proof of concept, up to ₹50 lakh for market entry", "A selected incubator"],
        ["Early traction", "Repeat buyers, growing monthly sales", "Angel investors and angel networks", "Founder referrals, incubator demo days"],
        ["Growth", "Fast, repeatable growth in a large market", "Venture capital funds, some backed by [SIDBI's Fund of Funds](https://www.sidbi.in/en/ffs)", "VC funds that invest at your stage"],
      ],
      note: "Not every business should climb to the bottom row. Many profitable Indian businesses never take investor money. See [how to start a business without investors](/how-to-start-a-business-without-investors-in-india).",
    },
    {
      type: "cards",
      heading: "Fundraising topics by category",
      intro: "Pick the question you have today.",
      items: [
        { title: "Loans and government schemes", body: "MUDRA, Stand-Up India, PMEGP and CGTMSE, explained in plain words.", href: "/how-to-get-funding-for-a-small-business-in-india", cta: "Read" },
        { title: "How much money you need", body: "Your real number in rupees before you ask anyone.", href: "/how-much-money-is-needed-to-start-a-business-in-india", cta: "Work it out" },
        { title: "Funding needed calculator", body: "Months of running cost until break-even, plus a buffer.", href: "/calculator/funding-needed", cta: "Calculate" },
        { title: "Proof investors want", body: "Repeat buyers and referrals: the signs of product-market fit.", href: "/how-to-know-if-your-business-has-product-market-fit-in-india", cta: "Check" },
        { title: "Market size for your pitch", body: "A bottom-up TAM, SAM and SOM investors believe.", href: "/how-to-calculate-tam-sam-som-for-a-business-in-india", cta: "Size it" },
        { title: "Cost of each customer", body: "Investors always ask what a new customer costs you.", href: "/what-is-customer-acquisition-cost-for-a-small-business-in-india", cta: "Learn" },
        { title: "Unit economics", body: "Profit on one order, the number every lender checks.", href: "/unit-economics-india", cta: "Learn" },
        { title: "Startup terms in plain words", body: "Equity, dilution, valuation and runway without jargon.", href: "/startup-terms-india", cta: "Read" },
        { title: "Founder glossary", body: "Every money word you will hear in a pitch meeting.", href: "/founder-glossary", cta: "Open" },
      ],
    },
    {
      type: "list",
      heading: "What investors and lenders look for",
      intro: "No secret formula. These are the questions you will be asked, in a bank branch or an angel meeting.",
      items: [
        { title: "People already pay you", body: "Even small, steady sales beat a big plan with no buyers. Start with [your first customer](/first-customer-india)." },
        { title: "Buyers come back", body: "Repeat orders show the business can grow without buying every sale." },
        { title: "Each sale makes money", body: "Profit per order after delivery, fees and GST. Check it with the [break-even calculator](/calculator/break-even)." },
        { title: "You know your market", body: "Who buys, how many there are near you or online, and why they choose you." },
        { title: "Your papers are clean", body: "Company or LLP filings on the [MCA portal](https://www.mca.gov.in/), GST returns if registered, [Udyam](https://udyamregistration.gov.in/), and a separate business bank account." },
        { title: "You are committed", body: "Your own money and time are already in. Lenders call it your contribution; angels call it skin in the game." },
        { title: "The money has a plan", body: "Exactly what you will spend it on and what proof it will buy you by when." },
      ],
    },
    {
      type: "steps",
      heading: "Prepare your startup to raise funds",
      intro: "Do these in order. Each one makes the next conversation easier.",
      items: [
        { title: "Get proof from real buyers first", body: "A few paying customers change every conversation. If you are not there yet, run the [demand test](/business-demand-test-india).", check: "Write down how many paying customers you have today, and how many came back." },
        { title: "Choose the right business structure", body: "A proprietorship is fine for a bank loan. To take equity from angels or VCs you will usually need a private limited company, registered on the [MCA portal](https://www.mca.gov.in/). Ask a chartered accountant which fits you." },
        { title: "Apply for DPIIT recognition if you qualify", body: "It opens the [Seed Fund](https://seedfund.startupindia.gov.in/) and other Startup India benefits. Eligibility and the application are on the [Startup India portal](https://www.startupindia.gov.in/content/sih/en/startupgov/startup_recognition_page.html)." },
        { title: "Put your numbers in one place", body: "Monthly sales, costs, customer count, repeat rate and cash in the bank. Use the [cash-flow calendar](/startup-cash-flow-india) and [startup cost ledger](/startup-costs-india).", check: "Fill last month's numbers into the cash-flow calendar tonight." },
        { title: "Make a short, honest pitch", body: "Problem, buyer, proof, numbers, what you need and what it buys. Ten slides or a two-page note is enough to start." },
        { title: "Keep a folder of documents ready", body: "PAN, incorporation papers, GST and Udyam certificates, bank statements, any customer agreements. Investors and banks will ask for them." },
        { title: "Get the agreement checked", body: "Before you sign a term sheet or shareholder agreement, have a chartered accountant or startup lawyer read it." },
      ],
    },
    { type: "sources", heading: "Sources", items: [SRC.dpiit, SRC.seedFund, SRC.mudra, SRC.mudraPlus, SRC.cgtmse, SRC.sidbi, SRC.mca, SRC.udyam, SRC.budget2024] },
  ],
};
