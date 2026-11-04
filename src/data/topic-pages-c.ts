import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, UPDATED_ON, IMG, SRC, questionSections } from "./topic-pages-shared";

/** Seller layout: question page (/questions/conduct-customer-interviews). */
export const interviews: TopicPage = {
  slug: "how-to-talk-to-customers-before-starting-a-business-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/questions/conduct-customer-interviews",
  parent: PARENT,
  seo: {
    title: "How to Talk to Customers Before Starting a Business in India",
    description: "How to talk to customers in India before you start: who to meet, where to find them, questions to ask in Hindi, English or your language, and how to read the answers.",
  },
  hero: {
    eyebrow: "Customer interviews",
    h1: "How to Talk to Customers Before Starting a Business in India",
    highlight: "Talk to Customers",
    intro: "The fastest way to know if your idea will work is to sit with ten people who would pay and listen. Not pitch. Listen. Here is exactly what to ask, and where to find them in your town or city.",
    updated: UPDATED,
    primary: { label: "Get the questions", href: "#steps" },
    secondary: { label: "Plan a demand test", href: "/business-demand-test-india" },
    image: IMG.validation,
    imageAlt: "A founder listening to a potential customer",
  },
  sections: questionSections({
    takeaways: [
      "Talk to people who fit your buyer line, not friends and family.",
      "Ask about their past behaviour and spending, not about your idea.",
      "Ten good conversations usually show you a pattern.",
      "End with a small ask: a pre-order, a trial, or an introduction to someone else.",
    ],
    steps: {
      heading: "How to run a customer interview",
      items: [
        { title: "Find the right ten people", body: "Go where they already are: the vegetable market, a society WhatsApp group, the PG near the college, the wholesale lane, a clinic waiting room, a farmers' meeting. Ask shop owners at quiet hours.", check: "Write down three places you will visit this week." },
        { title: "Speak their language", body: "Talk in Hindi, English, Tamil, Bengali or whatever they are comfortable in. People open up in their own language." },
        { title: "Ask about the past, not the future", body: "\"When did this last happen to you?\" \"What did you do?\" \"How much did you spend?\" Past actions are honest; future promises are not." },
        { title: "Keep quiet and take notes", body: "Let silences sit. Write their exact words. Do not defend your idea." },
        { title: "Close with a small ask", body: "\"Can I send you a sample next week?\" \"Would you pay ₹100 now to book the first batch?\" \"Who else should I speak to?\"", check: "Decide your closing ask before the first interview." },
      ],
    },
    table: {
      heading: "Questions to ask, and questions to avoid",
      columns: ["Ask this", "Not this", "Why"],
      rows: [
        ["When did you last face this problem?", "Would you have this problem?", "Real past events, not guesses"],
        ["What did you do about it?", "Would you use my product?", "Shows what they already spend time or money on"],
        ["How much did that cost you?", "How much would you pay?", "People overstate what they would pay"],
        ["What was hardest about it?", "Don't you think my idea is good?", "You want problems, not compliments"],
        ["Who else deals with this?", "Can you share my page?", "Gets you the next interview"],
      ],
    },
    mistakes: {
      heading: "Interview mistakes to avoid",
      items: [
        { title: "Pitching instead of listening", body: "The moment you pitch, people get polite. Save the idea for the end, if at all." },
        { title: "Only asking people like you", body: "If you sell to shopkeepers, meet shopkeepers, not your college friends." },
        { title: "Believing \"I'll definitely buy\"", body: "Only money or time committed counts." },
        { title: "Not writing it down", body: "Memory edits what you hear. Note exact words straight after." },
      ],
    },
    situations: [
      { title: "A laundry pickup idea in a Noida society", body: "Residents said they wanted it, but when asked about last week, most used the press-wala downstairs and were happy. The founder looked at office-goers in PGs instead." },
      { title: "Seed supply for farmers near Nashik", body: "Talking at the mandi showed farmers trusted their local dealer. The founder partnered with dealers instead of selling directly." },
      { title: "A kids' coding class in Mysuru", body: "Parents' real worry was screen time, not coding. The founder changed the class to offline weekend sessions." },
    ],
    faq: {
      heading: "Customer interview FAQ",
      items: [
        { q: "How many customer interviews do I need?", a: "Start with ten people who match your buyer. If the same problem comes up again and again, you have a pattern. If answers are all different, your buyer line is too broad." },
        { q: "Can I do interviews on WhatsApp or phone?", a: "Yes. A call or voice note works well. Video or face to face is better for reading reactions." },
        { q: "Should I pay people for interviews?", a: "Usually not needed. Buying someone a chai and respecting their time is enough. For busy professionals, a small thank-you is fine." },
        { q: "What if everyone says my idea is good?", a: "That usually means you asked about your idea. Go back and ask about their past behaviour and spending instead." },
      ],
    },
    tips: [
      "Do interviews in pairs if you can: one asks, one writes.",
      "Interview at the time and place the problem happens: the morning rush, month-end, harvest time.",
      "After ten interviews, write the three sentences you heard most.",
    ],
    sources: [{ label: "Open Government Data Platform India", href: "https://data.gov.in/", note: "Useful for finding where your buyers are, by district." }],
    related: [
      { label: "How to validate a business idea", href: "/how-to-validate-a-business-idea-in-india" },
      { label: "Get your first customer", href: "/first-customer-india" },
      { label: "Product-market fit", href: "/how-to-know-if-your-business-has-product-market-fit-in-india" },
    ],
    keepReading: [
      { title: "Validation field guide", body: "More ways to test before you build.", href: "/startup-idea-validation", cta: "Read" },
      { title: "Business idea validation framework", body: "A full framework from problem to price.", href: "/startup-guides/business-idea-validation-framework", cta: "Read" },
      { title: "Founder decision journal", body: "Write what you learned after each interview.", href: "/founder-decision-journal", cta: "Open" },
    ],
    deeper: [
      { label: "TAM, SAM, SOM", href: "/how-to-calculate-tam-sam-som-for-a-business-in-india" },
      { label: "Startup mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
      { label: "Demand test for India", href: "/business-demand-test-india" },
    ],
  }),
};

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
