import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, UPDATED_ON, IMG, SRC, questionSections } from "./topic-pages-shared";

/** Seller layout: question page (/questions/what-is-tam). */
export const tam: TopicPage = {
  slug: "how-to-calculate-tam-sam-som-for-a-business-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/questions/what-is-tam",
  parent: PARENT,
  seo: {
    title: "How to Calculate TAM, SAM and SOM for a Business in India",
    description: "TAM, SAM and SOM explained simply for Indian founders, with a bottom-up method you can do for your city or district using numbers you can count yourself.",
  },
  hero: {
    eyebrow: "TAM, SAM, SOM",
    h1: "How to Calculate TAM, SAM and SOM for a Business in India",
    highlight: "TAM, SAM and SOM",
    intro: "\"India has 140 crore people\" is not a market size. Your market is the people you can actually reach and serve. Here is how to count them honestly, for your street, your city or the whole country.",
    updated: UPDATED,
    primary: { label: "Size my market", href: "#steps" },
    secondary: { label: "Validate my idea", href: "/how-to-validate-a-business-idea-in-india" },
    image: IMG.metrics,
    imageAlt: "Sizing a market from total to reachable buyers",
  },
  sections: questionSections({
    takeaways: [
      "**TAM** (total addressable market): everyone in India who could ever buy this kind of product or service.",
      "**SAM** (serviceable available market): the part you can serve with your product, language, price and delivery area.",
      "**SOM** (serviceable obtainable market): the share of SAM you can realistically win in the next one to three years.",
      "For a local business, SOM is what matters. For investors, show all three, built bottom-up.",
    ],
    steps: {
      heading: "How to calculate TAM, SAM and SOM bottom-up",
      intro: "Bottom-up means you count buyers and multiply by what they spend. It is more believable than quoting a big report.",
      items: [
        { title: "Define one buyer and one purchase", body: "\"A family with school children in my city buying a monthly tiffin plan\". Be exact." },
        { title: "Count the buyers in your area", body: "Use Census data for households, school lists for students, society counts, the number of shops in a market lane, or the members of a trade association.", check: "Write the source you will use for your count." },
        { title: "Estimate spend per buyer per year", body: "Ask in your customer conversations what they spend today on the current solution." },
        { title: "Multiply for SAM, then take a realistic share for SOM", body: "Buyers you can reach × yearly spend = SAM. Then ask: how many can I serve with my time, kitchen, team and money? That is SOM." },
        { title: "Only then scale up to TAM", body: "Repeat the count for every city like yours, or use a credible published figure. Note your source." },
      ],
    },
    table: {
      heading: "TAM, SAM, SOM for three Indian ideas (method, not numbers)",
      columns: ["Idea", "TAM: who could buy", "SAM: who you can serve", "SOM: who you can win soon"],
      rows: [
        ["Home tiffin service", "Working families buying cooked meals across India", "Families within your delivery radius in your city", "The number of tiffins your kitchen can make and deliver each day"],
        ["Tally and GST filing service", "Small businesses that need bookkeeping", "Small businesses in your district who prefer your language", "Clients you and one assistant can handle each month"],
        ["Handmade toys sold online", "Parents buying toys online in India", "Buyers reachable through the marketplaces and social apps you use", "Orders you can make and ship each month"],
      ],
      note: "Fill each cell with counts you can source. Never use a number you cannot explain.",
    },
    mistakes: {
      heading: "Common market-size mistakes",
      items: [
        { title: "Quoting the whole population", body: "Most people will never buy your product. Start from real buyers." },
        { title: "Using a global report for India", body: "Indian prices, incomes and habits differ. Use India and local data." },
        { title: "Confusing SOM with ambition", body: "SOM is limited by what you can deliver, not by what you hope." },
        { title: "No source", body: "Every number in your sizing should say where it came from." },
      ],
    },
    situations: [
      { title: "A dairy delivery idea in Coimbatore", body: "Counting apartments in five nearby societies gave a believable SAM. The founder could deliver to only one society at first, which became the SOM." },
      { title: "A GST filing service in Indore", body: "The founder counted traders from a local association list and talked to twenty. That bottom-up count convinced a bank more than a national figure." },
      { title: "A Marathi language learning app", body: "Instead of all smartphone users, the founder sized the market as families outside Maharashtra with Marathi roots who want children to learn it." },
    ],
    faq: {
      heading: "TAM SAM SOM FAQ",
      items: [
        { q: "Do I need TAM, SAM, SOM for a small business?", a: "You need SOM: how many buyers you can reach and serve. TAM and SAM matter more when you talk to investors or plan to expand." },
        { q: "Where can I find market data for India?", a: "Census of India for households and population, government ministry reports, trade associations, and your own count of shops, societies or schools in an area. Always note the source." },
        { q: "Top-down or bottom-up: which is better?", a: "Bottom-up. It starts with buyers you can count and spend you have heard about from them. Use top-down only as a cross-check." },
        { q: "How big should TAM be for investors?", a: "Investors want to see that the market can support a large company, but a believable, sourced bottom-up number impresses more than a huge one." },
      ],
    },
    tips: [
      "Do your count on paper first, then in a sheet.",
      "Ask ten buyers what they spend today. That number is better than any report.",
      "Size one city well before you size India.",
    ],
    sources: [
      { label: "Census of India", href: "https://censusindia.gov.in/", note: "Population and household counts by state and district." },
      { label: "Open Government Data Platform India", href: "https://data.gov.in/", note: "Government datasets you can filter by sector and region." },
      SRC.udyam,
    ],
    related: [
      { label: "How to validate a business idea", href: "/how-to-validate-a-business-idea-in-india" },
      { label: "Customer interviews", href: "/how-to-talk-to-customers-before-starting-a-business-in-india" },
      { label: "Business idea research", href: "/business-idea-research-india" },
    ],
    keepReading: [
      { title: "Market sizing guide", body: "A longer walk-through of TAM, SAM and SOM.", href: "/startup-guides/tam-sam-som-market-sizing", cta: "Read" },
      { title: "Business idea research", body: "Find real data before you decide.", href: "/business-idea-research-india", cta: "Read" },
      { title: "Local business ideas", body: "Ideas where your SOM is your own neighbourhood.", href: "/local-business-ideas-india", cta: "Browse" },
    ],
    deeper: [
      { label: "Customer acquisition cost", href: "/what-is-customer-acquisition-cost-for-a-small-business-in-india" },
      { label: "Product-market fit", href: "/how-to-know-if-your-business-has-product-market-fit-in-india" },
      { label: "Business funding in India", href: "/how-to-get-funding-for-a-small-business-in-india" },
    ],
  }),
};

/** Seller layout: question page (/questions/money-to-start-business). */
export const moneyToStart: TopicPage = {
  slug: "how-much-money-is-needed-to-start-a-business-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/questions/money-to-start-business",
  parent: PARENT,
  seo: {
    title: "How Much Money Is Needed to Start a Business in India? A Rupee-by-Rupee Plan",
    description: "Work out how much money you need to start a business in India: one-time costs, monthly running costs, licences, GST, a safety buffer, and ways to start with less.",
  },
  hero: {
    eyebrow: "Money to start a business",
    h1: "How Much Money Is Needed to Start a Business in India?",
    highlight: "Money",
    intro: "The honest answer: it depends on what you sell, but you can work out your own number in one evening. Do it before you ask family, take a loan or break an FD.",
    updated: UPDATED,
    primary: { label: "Work out my number", href: "#steps" },
    secondary: { label: "Startup cost calculator", href: "/calculator/startup-cost" },
    image: IMG.funding,
    imageAlt: "Listing business start-up costs in rupees",
  },
  sections: questionSections({
    takeaways: [
      "Your number = **one-time costs + monthly running costs × months until you break even + a safety buffer.**",
      "Many service and online businesses can start with very little: a phone, a UPI QR code and your skill.",
      "Shops, kitchens and manufacturing need more: rent deposit, fit-out, equipment, licences and stock.",
      "Keep personal emergency money separate. Never put all your savings into month one.",
    ],
    steps: {
      heading: "The main kinds of start-up money",
      items: [
        { title: "One-time setup costs", body: "Rent deposit, interiors, equipment, first stock, signboard, website, registration fees.", check: "List each item with a rupee amount. Mark which ones you can rent, borrow or buy second-hand." },
        { title: "Licences and registration", body: "Udyam registration is free. Depending on your business you may need a shop and establishment registration, FSSAI for food, trade licence from the local body, and GST registration if your turnover or the way you sell requires it." },
        { title: "Monthly running costs", body: "Rent, electricity, internet, salaries, raw material, packaging, delivery, platform fees, loan EMI." },
        { title: "Months to break even", body: "Be honest. Use the [break-even calculator](/calculator/break-even) to see how many orders a month you need." },
        { title: "A safety buffer", body: "Add a few extra months of running costs for slow months, festival stock or a late-paying client." },
      ],
    },
    table: {
      heading: "What drives the cost, by business model",
      columns: ["Model", "Big cost items", "Ways to start smaller"],
      rows: [
        ["Service from home (tuition, design, tailoring)", "Tools, phone, internet, a little marketing", "Start with your existing setup and a UPI QR code"],
        ["Home food", "Kitchen equipment, packaging, FSSAI registration", "Start with pre-orders for a fixed menu"],
        ["Reselling online", "First stock, photos, marketplace fees, returns", "Order small batches or dropship before stocking"],
        ["Retail shop", "Deposit, interiors, stock, staff", "Test with a weekend stall or a shared shop first"],
        ["Small manufacturing", "Machines, power, raw material, space, licences", "Job-work through an existing unit before buying machines"],
      ],
    },
    mistakes: {
      heading: "Money mistakes to avoid",
      items: [
        { title: "Forgetting running costs", body: "Founders budget for the setup and run out of money in month three." },
        { title: "Buying new when used will do", body: "Second-hand equipment and rented space cut the starting amount a lot." },
        { title: "Big stock on day one", body: "Unsold stock is cash stuck on a shelf. Buy small, reorder often." },
        { title: "No buffer for GST and fees", body: "If GST applies to you, it is collected for the government, not your profit." },
      ],
    },
    situations: [
      { title: "A mehendi artist in Ahmedabad", body: "Started with cones, a phone and Instagram. Her main cost was travel to clients. She bought a ring light only after bookings came in." },
      { title: "A tea stall near a college in Pune", body: "The largest costs were the cart, a gas connection and the first month's supplies. He tested the spot with a borrowed cart for two weeks first." },
      { title: "A printing shop in a Tier-3 town", body: "The machine was the big cost. The owner did job-work through a nearby press for three months to prove demand before buying." },
    ],
    faq: {
      heading: "Start-up money FAQ",
      items: [
        { q: "Can I start a business with no money in India?", a: "You can start some service businesses with almost no cash: tutoring, freelancing, cooking to order, repair services, reselling on order. You still need your time, a phone and a few customers. See [zero-investment business models](/startup-guides/zero-investment-business-models)." },
        { q: "Is Udyam registration free?", a: "Yes. Register only on the official Udyam portal. Avoid sites that charge a fee for it." },
        { q: "Do I need GST registration to start?", a: "It depends on your turnover, what you sell and whether you sell across states or through e-commerce platforms. Check the GST portal or ask a chartered accountant before you start." },
        { q: "Where can I get money if I fall short?", a: "Savings, family, MUDRA loans through your bank, and other schemes. See [how to get business funding in India](/how-to-get-funding-for-a-small-business-in-india)." },
      ],
    },
    tips: [
      "Write two budgets: the minimum to start testing, and the full setup after proof.",
      "Ask suppliers for credit once you have a few orders. It is a free short-term loan.",
      "Take payments by UPI on a business account from day one so your numbers are clear.",
    ],
    sources: [SRC.udyam, SRC.gst, { label: "FSSAI: Food business registration", href: "https://foscos.fssai.gov.in/", note: "Registration or licence for food businesses." }, SRC.mudra],
    related: [
      { label: "How to get business funding", href: "/how-to-get-funding-for-a-small-business-in-india" },
      { label: "Bootstrapping in India", href: "/how-to-start-a-business-without-investors-in-india" },
      { label: "Startup cost ledger", href: "/startup-costs-india" },
    ],
    keepReading: [
      { title: "Startup cost ledger", body: "Write every cost in one place, in rupees.", href: "/startup-costs-india", cta: "Open" },
      { title: "Cash-flow calendar", body: "See when money comes in and goes out each month.", href: "/startup-cash-flow-india", cta: "Open" },
      { title: "Side business ideas", body: "Ideas you can start next to a job, with little money.", href: "/side-business-ideas-india", cta: "Browse" },
    ],
    deeper: [
      { label: "First-price workbench", href: "/business-pricing-india" },
      { label: "Unit economics", href: "/unit-economics-india" },
      { label: "How to build an MVP", href: "/how-to-build-an-mvp-with-low-investment-in-india" },
    ],
    rules: [
      "**Udyam registration** is free and online with Aadhaar.",
      "**GST registration** thresholds are generally ₹40 lakh turnover for suppliers of goods and ₹20 lakh for services, lower in some states, and some sellers must register regardless of turnover.",
      "**The composition scheme** lets small businesses pay GST at a flat rate with simpler filing, within a turnover limit.",
    ],
  }),
};

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
