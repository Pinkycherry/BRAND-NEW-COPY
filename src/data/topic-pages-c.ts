import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, UPDATED_ON, IMG, SRC, questionSections } from "./topic-pages-shared";

/** Seller layout: question page (/questions/how-to-build-mvp). */
export const mvp: TopicPage = {
  slug: "how-to-build-an-mvp-with-low-investment-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/questions/how-to-build-mvp",
  parent: PARENT,
  seo: {
    title: "How to Build an MVP With Low Investment in India",
    description: "Build a minimum viable product in India without big spending: a WhatsApp catalogue, a Google Form, a UPI QR code, a first batch or a manual service. Steps and examples.",
  },
  hero: {
    eyebrow: "Build an MVP",
    h1: "How to Build an MVP With Low Investment in India",
    highlight: "MVP",
    intro: "An MVP (minimum viable product) is the smallest thing you can sell to learn if people want it. In India it is often not an app at all. It is a WhatsApp catalogue, a UPI QR code and you, doing the work by hand.",
    updated: UPDATED,
    primary: { label: "Build mine", href: "#steps" },
    secondary: { label: "Validate first", href: "/how-to-validate-a-business-idea-in-india" },
    image: IMG.hub,
    imageAlt: "A simple first version of a product",
  },
  sections: questionSections({
    takeaways: [
      "Your MVP must be something people can **pay for**, not just look at.",
      "Do things that don't scale first: deliver yourself, take orders on WhatsApp, track in a notebook.",
      "Build only what tests your riskiest guess.",
      "Spend on an app, a shop or machines only after the MVP shows real demand.",
    ],
    steps: {
      heading: "How to build your MVP, step by step",
      items: [
        { title: "Pick the one guess that could kill your idea", body: "Will people pay this price? Will shops stock it? Will students come every week? Your MVP tests that one thing.", check: "Write your riskiest guess in one line." },
        { title: "Choose the simplest form", body: "A WhatsApp Business catalogue, an Instagram page, a Google Form, a printed menu, a single sample batch, a free trial class, a manual service." },
        { title: "Set up payment", body: "A UPI QR code on a business account is enough to start. Real payment is the test." },
        { title: "Launch to your interview list first", body: "The people you spoke to in [customer interviews](/how-to-talk-to-customers-before-starting-a-business-in-india) are your first buyers." },
        { title: "Measure and change one thing at a time", body: "Orders, repeat orders, complaints, time per order. Change price, menu, delivery area or product, one at a time." },
      ],
    },
    table: {
      heading: "MVP options for common Indian businesses",
      columns: ["Business", "Simple MVP", "What it tests"],
      rows: [
        ["Cloud kitchen", "A fixed weekly menu on WhatsApp, pre-orders only", "Taste, price and repeat orders"],
        ["Clothing brand", "Ten designs, made to order, sold on Instagram", "Which designs and sizes sell"],
        ["Local service app", "A phone number and a Google Sheet of service partners", "Whether customers book and pay"],
        ["B2B supply", "Deliver to five shops yourself", "Whether shops reorder"],
        ["Online course", "A live batch on a video call before recording anything", "Whether students pay and finish"],
      ],
    },
    mistakes: {
      heading: "MVP mistakes",
      items: [
        { title: "Building an app first", body: "Many Indian buyers are happy to order on WhatsApp or by phone. Test demand before code." },
        { title: "Making it free", body: "Free tells you little. Charge something, even a small amount." },
        { title: "Perfect packaging before proof", body: "Plain, clean and labelled is enough for the first batch." },
        { title: "Testing too many things at once", body: "If you change price, menu and area together, you will not know what worked." },
      ],
    },
    situations: [
      { title: "A millet breakfast brand in Chennai", body: "Sold 30 jars to office colleagues through a Google Form and UPI before talking to any shop." },
      { title: "A tractor rental idea in rural Punjab", body: "The founder took bookings on phone calls for his own tractor for one season before building any app." },
      { title: "A wedding planning service in Jaipur", body: "Planned two small family functions at cost to build a portfolio and testimonials before charging full fees." },
    ],
    faq: {
      heading: "MVP FAQ",
      items: [
        { q: "How much does an MVP cost in India?", a: "It depends on the business, but many service and food MVPs cost little beyond your time, a phone and a small first batch. Only spend on what tests your riskiest guess." },
        { q: "No-code or custom app for an MVP?", a: "Start with no-code tools or no app at all. Build custom software only once people are paying and the manual way is breaking." },
        { q: "Do I need registrations for an MVP?", a: "For a small test, often not, but check the rules that apply to you, such as FSSAI for food. Register on Udyam for free once you start selling regularly." },
      ],
    },
    tips: [
      "Set a deadline: launch your MVP within 14 days.",
      "Keep a notebook of every order and every complaint.",
      "Call every first-time buyer after a week and ask what to improve.",
    ],
    sources: [{ label: "WhatsApp Business", href: "https://business.whatsapp.com/", note: "Catalogue and quick replies for small businesses." }, SRC.npci, SRC.udyam, { label: "FSSAI: Food business registration", href: "https://foscos.fssai.gov.in/" }],
    compare: {
      heading: "Compare your options",
      columns: ["Approach", "Cost", "Speed", "When to choose"],
      rows: [
        ["Manual service + WhatsApp", "Very low", "Days", "Almost always, first"],
        ["No-code tools (forms, sheets, site builders)", "Low", "A week or two", "When orders grow beyond what you can track by hand"],
        ["Custom app or software", "High", "Months", "After proven demand, when the manual way breaks"],
      ],
    },
    related: [
      { label: "Customer interviews", href: "/how-to-talk-to-customers-before-starting-a-business-in-india" },
      { label: "Product-market fit", href: "/how-to-know-if-your-business-has-product-market-fit-in-india" },
      { label: "Money needed to start", href: "/how-much-money-is-needed-to-start-a-business-in-india" },
    ],
    keepReading: [
      { title: "MVP development guide", body: "A longer guide to building your first version.", href: "/startup-guides/minimum-viable-product-development", cta: "Read" },
      { title: "Online business ideas", body: "Ideas you can test with a phone and a catalogue.", href: "/online-business-ideas-india", cta: "Browse" },
      { title: "Weekend market stall check", body: "Test a product with real buyers in one weekend.", href: "/weekend-market-stall-profit-check", cta: "Check" },
    ],
    deeper: [
      { label: "How to validate a business idea", href: "/how-to-validate-a-business-idea-in-india" },
      { label: "First-price workbench", href: "/business-pricing-india" },
      { label: "Startup mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
    ],
  }),
};
