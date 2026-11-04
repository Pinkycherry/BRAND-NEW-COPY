import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, IMG, SRC, questionSections } from "./topic-pages-shared";

/** Seller layout: question page (/questions/what-is-cac). */
export const cac: TopicPage = {
  slug: "customer-acquisition-cost-india",
  sellerRef: "https://ideaproof.io/questions/what-is-cac",
  parent: PARENT,
  seo: {
    title: "What is Customer Acquisition Cost (CAC)? Meaning, Formula & India Examples",
    description: "Customer acquisition cost in plain words for Indian small businesses: the formula, what to count (ads, commission, free samples, your time) and how to bring it down.",
  },
  hero: {
    eyebrow: "Customer acquisition cost",
    h1: "What is customer acquisition cost (CAC)?",
    highlight: "CAC",
    intro: "CAC is what you spend to get one new paying customer. If it costs you ₹300 in ads and discounts to win a customer who earns you ₹200, every new sale makes you poorer. Let's make sure that never happens to you.",
    updated: UPDATED,
    primary: { label: "Work out my CAC", href: "#steps" },
    secondary: { label: "Unit economics", href: "/unit-economics-india" },
    image: IMG.metrics,
    imageAlt: "Working out the cost of winning each customer",
  },
  sections: questionSections({
    takeaways: [
      "**CAC = total spend to win customers ÷ number of new paying customers** in the same period.",
      "Count everything: Instagram and Google ads, marketplace commission, pamphlets, free samples, first-order discounts and delivery you did not charge for.",
      "Compare CAC with what one customer earns you over time. If CAC is higher, growth only burns money.",
      "For many local businesses, word of mouth, a society WhatsApp group or a shopkeeper referral keeps CAC very low.",
    ],
    steps: {
      heading: "How to calculate your CAC, step by step",
      items: [
        { title: "Pick a period", body: "One month is easiest. Use the same month for spend and customers." },
        { title: "Add up every rupee spent to get customers", body: "Ads, boosted posts, influencer barter (count the product value), flyers, stall fees for promotion, referral rewards, discounts on first orders.", check: "Open your UPI and bank history for last month and list every marketing payment." },
        { title: "Count only new paying customers", body: "Not enquiries, not followers, not repeat buyers. People who paid you for the first time." },
        { title: "Divide", body: "₹6,000 spent ÷ 30 new customers = ₹200 CAC. Do this for each channel separately if you can: Instagram, marketplace, pamphlets, referrals." },
        { title: "Compare with what a customer earns you", body: "If a customer orders four times and each order leaves you ₹120 after costs, they earn you ₹480. A ₹200 CAC is fine. A ₹600 CAC is not.", check: "Write your profit per order and how many times a typical customer orders." },
      ],
    },
    table: {
      heading: "What to count in CAC for common Indian businesses",
      columns: ["Business", "Costs that belong in CAC", "Often forgotten"],
      rows: [
        ["Home food / tiffin", "Society group promotions, free tasting boxes, pamphlets", "The free trial tiffins you gave away"],
        ["Online reseller", "Marketplace ads, commission share for new buyers, Instagram ads", "Return shipping on first orders"],
        ["Coaching or tuition", "Free demo classes, local ads, referral discounts", "Your own hours teaching demo batches"],
        ["Salon or local service", "Opening offers, Google Business listing ads, flyers", "Discount coupons that never brought a repeat visit"],
        ["Freelance or agency", "Portfolio site, platform fees, proposals", "Unpaid sample work for prospects"],
      ],
      note: "Examples are for illustration. Use your own numbers.",
    },
    mistakes: {
      heading: "Common CAC mistakes",
      items: [
        { title: "Counting followers as customers", body: "A thousand followers and five buyers means your CAC is the total spend divided by five." },
        { title: "Leaving out discounts", body: "A ₹100 first-order discount is a ₹100 acquisition cost." },
        { title: "Mixing old and new customers", body: "Repeat buyers make the number look better than it is." },
        { title: "Scaling the expensive channel", body: "Measure each channel. Put more money only where CAC is lowest and customers come back." },
      ],
    },
    situations: [
      { title: "Kavya's skincare reseller page, Kochi", body: "Spent on reels promotion and got many likes but few buyers. Counting only paying customers showed her CAC was too high, so she moved budget to repeat-buyer offers on WhatsApp." },
      { title: "A tuition centre in Lucknow", body: "Free demo week brought many students. Counting the teacher's hours, the demo cost more than one month's fee, so they shortened it to two classes." },
      { title: "A plumber in Jaipur", body: "Listing on a local services app brought jobs, but the platform fee per lead was more than his margin on small jobs. He kept the app for big jobs only." },
    ],
    faq: {
      heading: "CAC FAQ",
      items: [
        { q: "What is a good CAC in India?", a: "There is no single right number. A good CAC is clearly lower than the profit a customer brings you over the months they keep buying. Compare your own channels." },
        { q: "Is CAC the same as cost per lead?", a: "No. A lead is an enquiry. CAC counts only people who paid. Your CAC is always higher than your cost per lead." },
        { q: "Should GST on ads be counted?", a: "If you are not able to claim input tax credit on it, include the GST you paid in your spend. Ask your accountant if you are GST registered." },
        { q: "How do I lower CAC without ads?", a: "Ask happy customers for referrals, join local WhatsApp and Telegram groups where your buyers are, partner with shops that serve the same buyers, and give a reason to come back." },
      ],
    },
    tips: [
      "Ask every new customer: \"How did you hear about us?\" Write it down. That one habit tells you which channel works.",
      "Track CAC monthly in a simple sheet. A rising CAC is an early warning.",
      "Use [the ROI calculator](/calculator/roi) before you put more money into any channel.",
    ],
    sources: [SRC.npci, SRC.gst, SRC.udyam],
    related: [
      { label: "Unit economics for India", href: "/unit-economics-india" },
      { label: "Set your first price", href: "/business-pricing-india" },
      { label: "Get your first customer", href: "/first-customer-india" },
      { label: "Product-market fit", href: "/product-market-fit-india" },
    ],
    keepReading: [
      { title: "Unit economics", body: "Profit per order, CAC and repeat rate together.", href: "/unit-economics-india", cta: "Read" },
      { title: "First customer in India", body: "Where your first ten buyers usually come from.", href: "/first-customer-india", cta: "Read" },
      { title: "Startup mistakes to avoid", body: "Mistake 7 is ignoring CAC. Here are the other six.", href: "/startup-mistakes-to-avoid-india", cta: "Read" },
    ],
    deeper: [
      { label: "Customer interviews", href: "/customer-interviews-india" },
      { label: "Market size: TAM, SAM, SOM", href: "/tam-sam-som-india" },
      { label: "Business models compared", href: "/business-models-india" },
    ],
  }),
};

/** Seller layout: question page (/questions/what-is-tam). */
export const tam: TopicPage = {
  slug: "tam-sam-som-india",
  sellerRef: "https://ideaproof.io/questions/what-is-tam",
  parent: PARENT,
  seo: {
    title: "TAM, SAM, SOM Meaning: How to Size Your Market in India",
    description: "TAM, SAM and SOM explained simply for Indian founders, with a bottom-up method you can do for your city or district using numbers you can count yourself.",
  },
  hero: {
    eyebrow: "TAM, SAM, SOM",
    h1: "What is TAM, SAM and SOM? Market size for India",
    highlight: "TAM, SAM and SOM",
    intro: "\"India has 140 crore people\" is not a market size. Your market is the people you can actually reach and serve. Here is how to count them honestly, for your street, your city or the whole country.",
    updated: UPDATED,
    primary: { label: "Size my market", href: "#steps" },
    secondary: { label: "Validate my idea", href: "/how-to-validate-business-idea-india" },
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
      { label: "How to validate a business idea", href: "/how-to-validate-business-idea-india" },
      { label: "Customer interviews", href: "/customer-interviews-india" },
      { label: "Business idea research", href: "/business-idea-research-india" },
    ],
    keepReading: [
      { title: "Market sizing guide", body: "A longer walk-through of TAM, SAM and SOM.", href: "/startup-guides/tam-sam-som-market-sizing", cta: "Read" },
      { title: "Business idea research", body: "Find real data before you decide.", href: "/business-idea-research-india", cta: "Read" },
      { title: "Local business ideas", body: "Ideas where your SOM is your own neighbourhood.", href: "/local-business-ideas-india", cta: "Browse" },
    ],
    deeper: [
      { label: "Customer acquisition cost", href: "/customer-acquisition-cost-india" },
      { label: "Product-market fit", href: "/product-market-fit-india" },
      { label: "Business funding in India", href: "/how-to-get-business-funding-india" },
    ],
  }),
};

/** Seller layout: question page (/questions/money-to-start-business). */
export const moneyToStart: TopicPage = {
  slug: "money-needed-to-start-business-india",
  sellerRef: "https://ideaproof.io/questions/money-to-start-business",
  parent: PARENT,
  seo: {
    title: "How Much Money Do You Need to Start a Business in India?",
    description: "Work out how much money you need to start a business in India: one-time costs, monthly running costs, licences, GST, a safety buffer, and ways to start with less.",
  },
  hero: {
    eyebrow: "Money to start a business",
    h1: "How much money do you need to start a business in India?",
    highlight: "money",
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
        { q: "Where can I get money if I fall short?", a: "Savings, family, MUDRA loans through your bank, and other schemes. See [how to get business funding in India](/how-to-get-business-funding-india)." },
      ],
    },
    tips: [
      "Write two budgets: the minimum to start testing, and the full setup after proof.",
      "Ask suppliers for credit once you have a few orders. It is a free short-term loan.",
      "Take payments by UPI on a business account from day one so your numbers are clear.",
    ],
    sources: [SRC.udyam, SRC.gst, { label: "FSSAI: Food business registration", href: "https://foscos.fssai.gov.in/", note: "Registration or licence for food businesses." }, SRC.mudra],
    related: [
      { label: "How to get business funding", href: "/how-to-get-business-funding-india" },
      { label: "Bootstrapping in India", href: "/bootstrapping-business-india" },
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
      { label: "How to build an MVP", href: "/how-to-build-mvp-india" },
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
  slug: "bootstrapping-business-india",
  sellerRef: "https://ideaproof.io/questions/what-is-bootstrapping",
  parent: PARENT,
  seo: {
    title: "What is Bootstrapping a Business? How to Grow Without Investors in India",
    description: "Bootstrapping explained for Indian founders: growing from your own savings and sales, when it works, how to manage cash, and when outside money makes sense.",
  },
  hero: {
    eyebrow: "Bootstrapping",
    h1: "What is bootstrapping a business in India?",
    highlight: "bootstrapping",
    intro: "Bootstrapping means you grow from your own savings and your customers' money, without investors. Most Indian small businesses grow this way. You keep full control, and every rupee has to earn its place.",
    updated: UPDATED,
    primary: { label: "Is it right for me?", href: "#steps" },
    secondary: { label: "Compare with funding", href: "/how-to-get-business-funding-india" },
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
      { label: "Money needed to start", href: "/money-needed-to-start-business-india" },
      { label: "How to get business funding", href: "/how-to-get-business-funding-india" },
      { label: "Zero-investment business models", href: "/startup-guides/zero-investment-business-models" },
    ],
    keepReading: [
      { title: "Cash-flow calendar", body: "The tool bootstrapped founders use most.", href: "/startup-cash-flow-india", cta: "Open" },
      { title: "Service business ideas", body: "Ideas that can earn from the first month.", href: "/service-business-ideas-india", cta: "Browse" },
      { title: "Startup mistakes to avoid", body: "The traps that drain your own money.", href: "/startup-mistakes-to-avoid-india", cta: "Read" },
    ],
    deeper: [
      { label: "Customer acquisition cost", href: "/customer-acquisition-cost-india" },
      { label: "Unit economics", href: "/unit-economics-india" },
      { label: "First customer in India", href: "/first-customer-india" },
    ],
  }),
};
