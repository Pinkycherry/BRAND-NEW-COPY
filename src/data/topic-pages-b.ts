import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, UPDATED_ON, IMG, SRC, questionSections } from "./topic-pages-shared";

/** Seller layout: question page (/questions/what-is-bootstrapping). */
export const bootstrapping: TopicPage = {
  slug: "how-to-start-a-business-without-investors-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/questions/what-is-bootstrapping",
  parent: PARENT,
  seo: {
    title: "How to Start a Business Without Investors in India: A Bootstrapping Guide",
    description: "Bootstrapping explained for Indian founders: growing from your own savings and sales, when it works, how to manage cash, and when outside money makes sense.",
  },
  hero: {
    eyebrow: "Bootstrapping",
    h1: "How to Start a Business Without Investors in India",
    highlight: "Without Investors",
    intro: "Bootstrapping means you grow from your own savings and your customers' money, without investors. Most Indian small businesses grow this way. You keep full control, and every rupee has to earn its place.",
    updated: UPDATED,
    primary: { label: "Is it right for me?", href: "#steps" },
    secondary: { label: "Compare with funding", href: "/how-to-get-funding-for-a-small-business-in-india" },
    image: IMG.funding,
    imageAlt: "A founder growing a business from its own sales",
  },
  sections: questionSections({
    takeaways: [
      "You own 100% of the business and make every decision.",
      "Growth is paced by your sales, so cash flow is everything.",
      "It suits businesses that can earn from the first month: services, food, trading, local shops, agencies.",
      "You can still use a bank loan while bootstrapping. A loan is not giving away ownership.",
    ],
    steps: {
      heading: "How to bootstrap, step by step",
      items: [
        { title: "Start with something you can sell this month", body: "A service, a pre-order product, a small batch. Revenue first, features later.", check: "Write the one thing you could sell within 30 days." },
        { title: "Get paid upfront where you can", body: "Advances, monthly plans paid in advance, deposits for custom orders. UPI makes small advances easy." },
        { title: "Keep fixed costs tiny", body: "Work from home, share a space, rent equipment, hire part-time. Fixed costs are what sink bootstrapped businesses." },
        { title: "Reinvest profit in what brings customers back", body: "Better quality, faster delivery, a second product for existing buyers." },
        { title: "Review cash every week", body: "Money in, money out, what is due. Use the [cash-flow calendar](/startup-cash-flow-india)." },
      ],
    },
    table: {
      heading: "When bootstrapping fits, and when it struggles",
      columns: ["Situation", "Bootstrapping fits", "Outside money may help"],
      rows: [
        ["You can earn from month one", "Yes", "Not needed yet"],
        ["Customers pay before or soon after delivery", "Yes", "Not needed yet"],
        ["Big machines or licences before any sale", "Hard", "Bank loan or scheme"],
        ["A product that needs a long build before revenue", "Hard", "Grant, incubator or angel"],
        ["A market where the fastest player wins everything", "Risky", "Investors"],
      ],
    },
    mistakes: {
      heading: "Bootstrapping mistakes",
      items: [
        { title: "Not paying yourself anything", body: "If the business cannot pay you at least a little over time, it is a hobby. Plan for it." },
        { title: "Giving long credit to customers", body: "Thirty to sixty-day payment terms can starve a small business. Ask for part advance." },
        { title: "Saying yes to every custom request", body: "Custom work eats time. Price it properly or politely say no." },
        { title: "Mixing household and business money", body: "Keep separate accounts so you can see if the business really earns." },
      ],
    },
    situations: [
      { title: "A digital marketing freelancer in Bhubaneswar", body: "Started with two local clients paying monthly in advance. Hired an assistant only when a third client signed." },
      { title: "A pickle brand from a home kitchen in Guntur", body: "Sold to relatives and a local store first, then used profit for better packaging and FSSAI registration before selling online." },
      { title: "A two-person software studio in Kolkata", body: "Took client projects to fund their own product slowly, instead of raising money early." },
    ],
    faq: {
      heading: "Bootstrapping FAQ",
      items: [
        { q: "Is bootstrapping better than raising funds?", a: "Neither is better for everyone. Bootstrapping keeps control and suits businesses that earn early. Raising money suits ideas that need a lot of money before they can earn." },
        { q: "Can a bootstrapped business take a loan?", a: "Yes. A MUDRA or other bank loan adds debt, not new owners. Borrow only what the business can repay from sales." },
        { q: "How long can I bootstrap?", a: "As long as the business pays its bills and grows at a pace you are happy with. Many family businesses in India are bootstrapped for generations." },
      ],
    },
    tips: [
      "Sell first, build second.",
      "Ask every happy customer for one referral.",
      "Track your monthly profit, not just sales.",
    ],
    sources: [SRC.mudra, SRC.udyam, SRC.npci],
    compare: {
      heading: "Compare your options",
      columns: ["Route", "Control", "Speed", "Risk to you"],
      rows: [
        ["Bootstrapping", "Full", "Paced by sales", "Your savings and time"],
        ["Bank loan", "Full", "Faster setup", "Repayment even in a slow month"],
        ["Angel or VC money", "Shared", "Fastest", "Pressure to grow fast; you own less"],
      ],
    },
    related: [
      { label: "Money needed to start", href: "/how-much-money-is-needed-to-start-a-business-in-india" },
      { label: "How to get business funding", href: "/how-to-get-funding-for-a-small-business-in-india" },
      { label: "Zero-investment business models", href: "/startup-guides/zero-investment-business-models" },
    ],
    keepReading: [
      { title: "Cash-flow calendar", body: "The tool bootstrapped founders use most.", href: "/startup-cash-flow-india", cta: "Open" },
      { title: "Service business ideas", body: "Ideas that can earn from the first month.", href: "/service-business-ideas-india", cta: "Browse" },
      { title: "Startup mistakes to avoid", body: "The traps that drain your own money.", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india", cta: "Read" },
    ],
    deeper: [
      { label: "Customer acquisition cost", href: "/what-is-customer-acquisition-cost-for-a-small-business-in-india" },
      { label: "Unit economics", href: "/unit-economics-india" },
      { label: "First customer in India", href: "/first-customer-india" },
    ],
  }),
};
