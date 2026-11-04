import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, UPDATED_ON, IMG, SRC, TOOLS, CALCS, EXPLORE, CTA } from "./topic-pages-shared";

const FOOD = ["food-business-ideas", "home-kitchen-food-business-ideas", "street-food-business-ideas", "cloud-kitchen-business-ideas", "packaged-snack-business-ideas", "bakery-and-confectionery-business-ideas", "catering-business-ideas", "sweet-shop-and-mithai-business-ideas", "restaurant-and-eatery-business-ideas", "regional-specialty-food-business-ideas"];
const ONLINE = ["online-business-ideas", "reselling-business-ideas", "affiliate-and-content-site-business-ideas", "work-from-home-business-ideas"];
const BROAD = ["home-based-business-ideas", "women-friendly-business-ideas", "village-and-small-town-business-ideas", "freelance-business-ideas", "printing-and-signage-business-ideas", "tailoring-and-boutique-business-ideas", ...FOOD.slice(0, 3), ...ONLINE.slice(0, 2)];
const FSSAI = { label: "FSSAI FoSCoS: food registration and licence", href: "https://foscos.fssai.gov.in/", note: "Every food business needs FSSAI registration or a licence, depending on its size." };
const ASCI = { label: "ASCI: advertising code for India", href: "https://www.ascionline.in/", note: "Self-regulatory rules for honest advertising, including influencer posts." };
const CONSUMER = { label: "Department of Consumer Affairs", href: "https://consumeraffairs.nic.in/", note: "Consumer protection rules, including those for e-commerce sellers." };
const VALIDATORS = [
  { label: "How to validate a business idea in India", href: "/how-to-validate-a-business-idea-in-india" },
  { label: "How to validate a food business idea", href: "/how-to-validate-a-food-business-idea-in-india" },
  { label: "How to validate an online selling idea", href: "/how-to-validate-an-online-selling-business-idea-in-india" },
  { label: "Is my business idea good?", href: "/how-to-check-if-your-business-idea-is-good-in-india" },
];

/** Seller layout: metrics hub (/topics/saas-metrics). Sections: quick reference table, calculate instantly. */
export const businessNumbers: TopicPage = {
  slug: "business-numbers-every-small-business-in-india-should-track",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/topics/saas-metrics",
  parent: PARENT,
  seo: {
    title: "Business Numbers Every Small Business in India Should Track Each Month",
    description: "The ten business numbers every small business owner in India should track: sales, profit per order, break-even, customer cost, repeat buyers, cash runway and more, in rupees.",
  },
  hero: {
    eyebrow: "Business numbers to track",
    h1: "Business Numbers Every Small Business in India Should Track",
    highlight: "Business Numbers",
    intro: "You do not need an accountant's software to know if your business is healthy. Ten simple numbers, written in a notebook or a sheet once a month, tell you whether to push, fix or pause. Most owners track only sales. You will track what actually keeps the shutter open.",
    sub: "Works for a **kirana**, a **home kitchen**, a **tuition centre**, an **online store** or a **freelance service**.",
    updated: UPDATED,
    primary: { label: "See the 10 numbers", href: "#numbers" },
    secondary: { label: "Open the calculators", href: "/calculator" },
    image: IMG.metrics,
    imageAlt: "A shop owner noting monthly business numbers",
  },
  sections: [
    {
      type: "table",
      heading: "Your business numbers: quick reference",
      intro: "Work each one out for last month. Then do it again next month and compare.",
      columns: ["Number", "What it tells you", "How to work it out", "Where to go next"],
      rows: [
        ["Monthly sales", "How much money came in", "Add every UPI, cash and card receipt for the month", "[Cash-flow calendar](/startup-cash-flow-india)"],
        ["Profit per order", "Whether each sale makes you money", "Price minus material, packing, delivery, platform fee and GST you cannot claim back", "[Unit economics](/unit-economics-india)"],
        ["Break-even orders", "Sales needed before you stop losing money", "Monthly fixed costs ÷ profit per order", "[Break-even calculator](/calculator/break-even)"],
        ["Customer acquisition cost", "What each new buyer costs you", "Marketing spend ÷ new paying customers", "[CAC for small businesses](/what-is-customer-acquisition-cost-for-a-small-business-in-india)"],
        ["Repeat buyers", "Whether people come back", "Last month's buyers who bought again this month", "[Product-market fit](/how-to-know-if-your-business-has-product-market-fit-in-india)"],
        ["Average order value", "How much a typical buyer spends", "Monthly sales ÷ number of orders", "[First-price workbench](/business-pricing-india)"],
        ["Money owed to you", "Cash stuck with customers on credit", "Total unpaid bills from customers", "Ask for part advance on new orders"],
        ["Stock on the shelf", "Cash sitting as unsold goods", "Value of stock at cost price", "Buy smaller batches more often"],
        ["Cash runway", "How many months you can keep going", "Cash in bank ÷ monthly loss (or monthly fixed costs if not yet earning)", "[Funding needed calculator](/calculator/funding-needed)"],
        ["Your own pay", "Whether the business pays you for your time", "What you could take home each month after all costs", "[ROI calculator](/calculator/roi)"],
      ],
      note: "Keep business and personal money in separate bank accounts so these numbers are real. If you are GST registered, your [GST portal](https://www.gst.gov.in/) returns are a useful monthly check on sales.",
    },
    {
      type: "cards",
      heading: "Calculate your numbers instantly",
      intro: "Free calculators and tools in rupees. Put in last month's figures and see where you stand.",
      items: [
        { title: "Break-even calculator", body: "Orders a month before you stop losing money.", href: "/calculator/break-even", cta: "Calculate" },
        { title: "Startup cost calculator", body: "Every rupee you need before the first sale.", href: "/calculator/startup-cost", cta: "Calculate" },
        { title: "Funding needed calculator", body: "How many months your money lasts, and how much more you need.", href: "/calculator/funding-needed", cta: "Calculate" },
        { title: "ROI calculator", body: "Is the money and time you put in coming back?", href: "/calculator/roi", cta: "Calculate" },
        { title: "Cash-flow calendar", body: "Money in and out, month by month.", href: "/startup-cash-flow-india", cta: "Open" },
        { title: "Unit economics", body: "Profit per order and the cost of each buyer, together.", href: "/unit-economics-india", cta: "Open" },
        { title: "Money needed to start", body: "Plan your start-up amount properly.", href: "/how-much-money-is-needed-to-start-a-business-in-india", cta: "Read" },
        { title: "Market size for your area", body: "How many buyers you can actually reach.", href: "/how-to-calculate-tam-sam-som-for-a-business-in-india", cta: "Read" },
        { title: "All calculators", body: "Every free calculator on one page.", href: "/calculator", cta: "Browse" },
      ],
    },
    { type: "sources", heading: "Sources", items: [SRC.gst, SRC.udyam, SRC.npci, { label: "RBI: Financial Education", href: "https://rbi.org.in/FinancialEducation/", note: "Reserve Bank of India material on managing money and credit." }] },
  ],
};

/** Seller layout: generator tool page (/business-plan). Sections: 3 steps, real output, why, statistics, everything about, FAQ, continue, resources, CTA. */
export const businessPlan: TopicPage = {
  slug: "how-to-write-a-business-plan-for-a-bank-loan-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/business-plan",
  parent: PARENT,
  seo: {
    title: "How to Write a Business Plan for a Bank Loan in India (Project Report Guide)",
    description: "Write a business plan your bank will read: the project report sections Indian banks expect for MUDRA and other loans, the numbers to show, documents to attach and mistakes to avoid.",
  },
  hero: {
    eyebrow: "Business plan for a bank loan",
    h1: "How to Write a Business Plan for a Bank Loan in India",
    highlight: "Business Plan",
    intro: "The bank manager has ten minutes for your file. A clear, honest project report tells them who you sell to, how the money will be used, and how you will repay. You can write it yourself, in plain words, this weekend.",
    sub: "For **MUDRA**, **Stand-Up India**, **PMEGP** and regular **MSME loans**. No consultant needed to start.",
    updated: UPDATED,
    primary: { label: "Start with 3 steps", href: "#steps" },
    secondary: { label: "Loans and schemes", href: "/how-to-get-funding-for-a-small-business-in-india" },
    image: IMG.funding,
    imageAlt: "A founder preparing a project report for a bank loan",
  },
  sections: [
    {
      type: "steps",
      heading: "Three steps to a bank-ready business plan",
      items: [
        { title: "Collect your numbers", body: "Project cost, your own contribution, monthly sales you expect, monthly costs and the loan you need. Use the [startup cost calculator](/calculator/startup-cost) and [break-even calculator](/calculator/break-even).", check: "Write your total project cost and your own contribution on one line." },
        { title: "Write the plan in the bank's order", body: "Use the sections below. Keep each one short and true. Banks prefer plain facts to big promises." },
        { title: "Attach proof and visit the branch", body: "Udyam certificate, KYC, quotations for machines, rent agreement, bank statements and any early orders. Ask the branch which scheme they will process." },
      ],
    },
    {
      type: "cards",
      heading: "What a bank-ready plan contains",
      intro: "The usual sections of a project report for a small business loan.",
      items: [
        { title: "1. About you and the business", body: "Your name, experience, address, business structure (proprietorship, partnership, LLP or company) and [Udyam](https://udyamregistration.gov.in/) number." },
        { title: "2. What you sell and to whom", body: "Your product or service and your buyers in one paragraph. See [how to check your idea](/how-to-check-if-your-business-idea-is-good-in-india)." },
        { title: "3. Market and competition", body: "Who else sells near you and why buyers will choose you. Use our [competitor analysis guide](/how-to-do-competitor-analysis-for-a-small-business-in-india)." },
        { title: "4. Project cost", body: "Machinery, furniture, deposit, first stock and working capital, with quotations." },
        { title: "5. Means of finance", body: "Your contribution, the loan amount and any subsidy (for example under [PMEGP](https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp))." },
        { title: "6. Sales and profit estimate", body: "Monthly sales, costs and profit for the first years, built from real prices. See [business numbers to track](/business-numbers-every-small-business-in-india-should-track)." },
        { title: "7. Repayment plan", body: "How the monthly EMI will be paid from profit, month by month." },
        { title: "8. Licences and approvals", body: "GST if applicable, FSSAI for food, shop registration, pollution consent for some units." },
        { title: "9. Documents attached", body: "KYC, photos, quotations, rent or ownership papers, bank statements, any orders or letters of intent." },
      ],
    },
    {
      type: "takeaways",
      heading: "Why a written plan helps you",
      items: [
        "It shows the bank you have thought about repayment, not just the loan.",
        "It forces you to check your price and costs before you borrow.",
        "It helps you borrow the right amount: not too little to finish, not too much to repay.",
        "Your family can read it and understand exactly what is at stake.",
      ],
    },
    {
      type: "table",
      heading: "Numbers your plan must show",
      intro: "Banks look for these, whatever the scheme.",
      columns: ["Number", "Why the bank asks", "How to get it right"],
      rows: [
        ["Total project cost", "To size the loan", "Add quotations; do not guess"],
        ["Your own contribution", "Shows commitment", "Savings or family money you are putting in"],
        ["Working capital", "Money to run the first months", "Use the [funding needed calculator](/calculator/funding-needed)"],
        ["Monthly sales estimate", "To check repayment", "Based on real prices and early orders if you have them"],
        ["Break-even point", "When the business stops losing money", "Use the [break-even calculator](/calculator/break-even)"],
        ["Monthly EMI", "Repayment ability", "Ask the branch for the rate and tenure, then check the EMI fits your profit"],
      ],
    },
    {
      type: "chips",
      heading: "Everything about planning and funding on our site",
      items: [
        { label: "How to get funding for a small business", href: "/how-to-get-funding-for-a-small-business-in-india" },
        { label: "How to raise funds for a startup", href: "/how-to-raise-funds-for-a-startup-in-india" },
        { label: "How much money is needed to start", href: "/how-much-money-is-needed-to-start-a-business-in-india" },
        { label: "Startup cost ledger", href: "/startup-costs-india" },
        { label: "Launch evidence plan", href: "/startup-launch-plan-india" },
        { label: "Templates", href: "/templates" },
      ],
    },
    { type: "dbfaq", heading: "Frequently asked questions", categories: BROAD, match: "(loan|bank|licen|register|registration|cost|invest|capital|money)", limit: 8 },
    {
      type: "cards",
      heading: "Continue your journey",
      items: [
        { title: "Check your idea first", body: "A plan built on a tested idea is far stronger.", href: "/how-to-check-if-your-business-idea-is-good-in-india", cta: "Check" },
        { title: "Common mistakes to avoid", body: "The traps that make a loan hard to repay.", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india", cta: "Read" },
        { title: "Browse business ideas", body: "See how similar businesses earn and what they cost.", href: "/browse", cta: "Browse" },
      ],
    },
    TOOLS,
    { ...CTA, heading: "Ready to write your plan?", body: "Start with your numbers in the free startup cost calculator, then fill the nine sections above in plain words.", button: { label: "Open the startup cost calculator", href: "/calculator/startup-cost" } },
    { type: "sources", heading: "Sources", items: [SRC.mudra, SRC.standUp, SRC.pmegp, SRC.cgtmse, SRC.udyam, SRC.gst, FSSAI, { label: "RBI: lending to MSMEs", href: "https://www.rbi.org.in/", note: "Reserve Bank of India guidance for banks on MSME lending." }] },
  ],
};

/** Seller layout: analysis tool page (/competitor-analysis). Sections: 3 steps, why, statistics, FAQ, continue, resources, CTA, deeper answers. */
export const competitors: TopicPage = {
  slug: "how-to-do-competitor-analysis-for-a-small-business-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/competitor-analysis",
  parent: PARENT,
  seo: {
    title: "How to Do Competitor Analysis for a Small Business in India",
    description: "Study your competitors the practical Indian way: visit their shop, read their Google Maps reviews, check marketplace listings, compare price and service, and find the gap you can fill.",
  },
  hero: {
    eyebrow: "Competitor analysis",
    h1: "How to Do Competitor Analysis for a Small Business in India",
    highlight: "Competitor Analysis",
    intro: "Your biggest competitor might not be a brand at all. It might be the aunty two streets away who has cooked for the colony for fifteen years, or the shop that gives credit to everyone. Here is how to study them honestly, and find the space they leave for you.",
    updated: UPDATED,
    primary: { label: "Start in 3 steps", href: "#steps" },
    secondary: { label: "Check my idea", href: "/how-to-check-if-your-business-idea-is-good-in-india" },
    image: IMG.validation,
    imageAlt: "A founder visiting local competitors",
  },
  sections: [
    {
      type: "steps",
      heading: "Three simple steps to study your competitors",
      items: [
        { title: "List everyone your buyer uses today", body: "Shops, home sellers, apps, marketplaces, the unorganised option, and doing it themselves. Search Google Maps, JustDial, [IndiaMART](https://www.indiamart.com/) and the marketplaces your buyers use.", check: "Write five competitors, including at least one that is not a brand." },
        { title: "Visit, buy and ask", body: "Buy from each one as a customer. Note price, quality, packing, delivery time, payment options (UPI, credit, COD) and how they treat you. Read their reviews for complaints." },
        { title: "Find the gap you can fill", body: "Late delivery? No evening slots? No regional language? Poor hygiene? The gap their buyers complain about is your opening." },
      ],
    },
    {
      type: "takeaways",
      heading: "Why competitor analysis matters for a small business",
      items: [
        "It tells you the price buyers already accept in your area.",
        "It shows you what buyers complain about, so you can do it better.",
        "It stops you entering a lane that is already crowded and cheap.",
        "Banks and investors expect you to know who else sells what you sell. See [business plan for a bank loan](/how-to-write-a-business-plan-for-a-bank-loan-in-india).",
      ],
    },
    {
      type: "table",
      heading: "What to compare for each competitor",
      columns: ["Compare", "How to find out", "What it tells you"],
      rows: [
        ["Price", "Buy or ask; check marketplace listings", "The range buyers accept"],
        ["Quality", "Try the product or service yourself", "Where you can be better"],
        ["Delivery and timing", "Order and note the time", "A service gap you can fill"],
        ["Payment options", "UPI, cash, credit, COD", "What buyers in your area expect"],
        ["Reviews", "Google Maps, marketplace ratings", "The most common complaints"],
        ["Location and reach", "Walk the area; check delivery radius", "Where they do not reach"],
        ["Trust", "How long they have been there, who recommends them", "Why buyers stay with them"],
      ],
    },
    { type: "dbfaq", heading: "Frequently asked questions", categories: BROAD, match: "(compet|rival|other shops|differen|stand out|market)", limit: 8 },
    {
      type: "cards",
      heading: "Continue your journey",
      items: [
        { title: "Talk to customers", body: "Ask buyers why they use your competitors.", href: "/how-to-talk-to-customers-before-starting-a-business-in-india", cta: "Read" },
        { title: "Size your market", body: "How many buyers are left for you.", href: "/how-to-calculate-tam-sam-som-for-a-business-in-india", cta: "Read" },
        { title: "Set your first price", body: "Price against competitors without losing money.", href: "/business-pricing-india", cta: "Open" },
      ],
    },
    TOOLS,
    { ...CTA, heading: "Ready to study your competition?", body: "Pick five competitors, buy from each this week, and note every complaint you hear. Then run the free risk check." },
    {
      type: "chips",
      heading: "Deeper answers founders ask for",
      items: [
        { label: "Business idea research", href: "/business-idea-research-india" },
        { label: "Market research", href: "/market-research" },
        { label: "Competitor analysis framework", href: "/startup-guides/competitor-analysis-framework" },
        { label: "Common mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
        { label: "Business models compared", href: "/business-models-india" },
      ],
    },
    { type: "sources", heading: "Sources", items: [{ label: "IndiaMART", href: "https://www.indiamart.com/", note: "B2B supplier and seller listings across India." }, SRC.ondc, SRC.gem, CONSUMER, SRC.udyam] },
  ],
};

/** Seller layout: funding FAQ guide (/startup-funding-faq). 14 sections. FAQ questions come from our database. */
export const fundingQuestions: TopicPage = {
  slug: "startup-funding-questions-for-first-time-founders-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/startup-funding-faq",
  parent: PARENT,
  seo: {
    title: "Startup Funding Questions for First-Time Founders in India, Answered",
    description: "Plain answers to the funding questions first-time founders in India ask: loans vs investors, MUDRA, the Seed Fund, how much to raise, what lenders check and when to raise.",
  },
  hero: {
    eyebrow: "Startup funding questions",
    h1: "Startup Funding Questions for First-Time Founders in India",
    highlight: "Funding Questions",
    intro: "Every first-time founder has the same worries at night. Will a bank lend to me? Do I need an investor? How much should I ask for? Here are straight answers, built on official Indian sources and our own idea guides.",
    updated: UPDATED,
    primary: { label: "Jump to the questions", href: "#questions" },
    secondary: { label: "Funding stages", href: "/how-to-raise-funds-for-a-startup-in-india" },
    image: IMG.funding,
    imageAlt: "A founder reading answers about startup funding",
  },
  sections: [
    {
      type: "takeaways",
      heading: "Startup funding in short",
      items: [
        "Most small businesses in India start with **savings and a bank loan**, not investors.",
        "**MUDRA** loans cover non-farm micro businesses, up to ₹20 lakh through Tarun Plus.",
        "**DPIIT recognition** opens the Startup India Seed Fund, given through incubators.",
        "**Investors take ownership**; loans need repayment. Choose by your stage, not by excitement.",
      ],
    },
    {
      type: "table",
      heading: "Funding facts from official sources",
      intro: "Limits change from time to time; check the official page before you apply.",
      columns: ["Scheme or rule", "What it offers", "Official source"],
      rows: [
        ["MUDRA (PMMY)", "Shishu up to ₹50,000; Kishore up to ₹5 lakh; Tarun up to ₹10 lakh; Tarun Plus up to ₹20 lakh", "[mudra.org.in](https://www.mudra.org.in/)"],
        ["Startup India Seed Fund", "Up to ₹20 lakh for proof of concept; up to ₹50 lakh for market entry", "[seedfund.startupindia.gov.in](https://seedfund.startupindia.gov.in/)"],
        ["Stand-Up India", "Loans from ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs", "[standupmitra.in](https://www.standupmitra.in/)"],
        ["Udyam registration", "Free, online, Aadhaar-based MSME registration", "[udyamregistration.gov.in](https://udyamregistration.gov.in/)"],
        ["MSME micro limit", "Investment up to ₹2.5 crore and turnover up to ₹10 crore", "[News On AIR](https://newsonair.gov.in/govt-notifies-revised-criteria-for-classifying-msmes)"],
      ],
    },
    {
      type: "table",
      heading: "Every funding source, compared",
      columns: ["Source", "Repay?", "Ownership", "Best for"],
      rows: [
        ["Savings and family", "Agree terms", "Yours", "Testing and the first months"],
        ["MUDRA and bank loans", "Yes, with interest", "Yours", "Micro and small businesses with sales"],
        ["PMEGP", "Yes; part subsidised", "Yours", "New micro enterprises"],
        ["Seed Fund via incubator", "Depends on form", "Sometimes shared", "DPIIT-recognised startups proving a product"],
        ["Angel investors", "No", "Shared", "Early traction, scalable idea"],
        ["Venture capital", "No", "Shared, with board rights", "Fast growth in large markets"],
      ],
    },
    {
      type: "steps",
      heading: "The funding stages, explained",
      items: [
        { title: "Idea stage", body: "Use your own money to test. [Validate the idea](/how-to-validate-a-business-idea-in-india) before you borrow." },
        { title: "First customers", body: "A MUDRA or bank loan can fund equipment and stock once people pay you." },
        { title: "Proof of concept", body: "DPIIT-recognised startups can apply to the Seed Fund through an incubator." },
        { title: "Early traction", body: "Angel investors come in when buyers return and sales grow." },
        { title: "Growth", body: "Venture capital, for the few businesses that must grow very fast." },
      ],
    },
    {
      type: "steps",
      heading: "How a first fundraise usually goes",
      items: [
        { title: "Know your number", body: "Use the [funding needed calculator](/calculator/funding-needed)." },
        { title: "Prepare your papers", body: "Udyam, GST if registered, bank statements, company or LLP filings on [MCA](https://www.mca.gov.in/)." },
        { title: "Write a short plan or pitch", body: "See [business plan for a bank loan](/how-to-write-a-business-plan-for-a-bank-loan-in-india)." },
        { title: "Meet the right door", body: "Bank branch for loans; incubators for the Seed Fund; angel networks for equity." },
        { title: "Read before you sign", body: "Have a chartered accountant or lawyer read loan terms or a term sheet." },
      ],
    },
    {
      type: "list",
      heading: "Six funding habits that work",
      items: [
        { title: "Raise after proof, not before", body: "Even ten paying customers change the conversation." },
        { title: "Borrow for assets that earn", body: "A machine that makes products, not a fancy office." },
        { title: "Keep business money separate", body: "Clean statements make banks trust you." },
        { title: "Ask two banks", body: "Branch experience with schemes differs." },
        { title: "Write down family money", body: "Loan or share, and when it comes back." },
        { title: "Track your numbers monthly", body: "See [business numbers to track](/business-numbers-every-small-business-in-india-should-track)." },
      ],
    },
    { type: "dbfaq", heading: "Founder funding questions", intro: "Real questions from our published idea guides, on money, loans and costs. More on our [founder FAQ page](/faq).", categories: BROAD, match: "(loan|fund|invest|money|capital|mudra|bank|cost|budget|start with|how much)", limit: 16 },
    {
      type: "cards",
      heading: "Validate before you raise",
      items: [
        { title: "Is my business idea good?", body: "Six questions every lender will ask.", href: "/how-to-check-if-your-business-idea-is-good-in-india", cta: "Check" },
        { title: "Validate your idea", body: "Five steps with real buyers.", href: "/how-to-validate-a-business-idea-in-india", cta: "Start" },
        { title: "Product-market fit", body: "The proof investors look for.", href: "/how-to-know-if-your-business-has-product-market-fit-in-india", cta: "Read" },
      ],
    },
    {
      type: "chips",
      heading: "Learn from funding mistakes",
      items: [
        { label: "Indian startup failures", href: "/failed-startups/india" },
        { label: "Common mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
        { label: "Why startups fail", href: "/why-startups-fail-2026-2027" },
      ],
    },
    TOOLS,
    {
      type: "chips",
      heading: "Related comparisons",
      items: [
        { label: "Loans vs investors", href: "/how-to-get-funding-for-a-small-business-in-india" },
        { label: "Bootstrapping vs raising", href: "/how-to-start-a-business-without-investors-in-india" },
        { label: "Business models compared", href: "/business-models-india" },
        { label: "Frameworks compared", href: "/frameworks-comparison" },
      ],
    },
    {
      type: "cards",
      heading: "Keep exploring",
      items: [
        { title: "How to raise funds for a startup", body: "The full funding ladder for Indian startups.", href: "/how-to-raise-funds-for-a-startup-in-india", cta: "Read" },
        { title: "How much money you need", body: "Your number in rupees.", href: "/how-much-money-is-needed-to-start-a-business-in-india", cta: "Read" },
        { title: "Startup terms in plain words", body: "Equity, dilution, runway and more.", href: "/startup-terms-india", cta: "Read" },
      ],
    },
    EXPLORE,
    { ...CTA, heading: "Raise on evidence, not hope.", body: "Test your idea with real buyers, know your numbers, then walk into the bank or the pitch with proof." },
    { type: "sources", heading: "Sources", items: [SRC.mudra, SRC.mudraPlus, SRC.seedFund, SRC.dpiit, SRC.standUp, SRC.pmegp, SRC.cgtmse, SRC.udyam, SRC.msmeLimits, SRC.sidbi, SRC.budget2024] },
  ],
};

/** Seller layout: guide (/guides/landing-page-validation-facebook-vs-adwords). 18 sections. */
export const adsTest: TopicPage = {
  slug: "how-to-test-demand-with-facebook-and-google-ads-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/guides/landing-page-validation-facebook-vs-adwords",
  parent: PARENT,
  seo: {
    title: "How to Test Demand With Facebook and Google Ads in India on a Small Budget",
    description: "Test if Indians will buy before you build: a simple landing page or WhatsApp link, a small rupee budget on Facebook, Instagram or Google ads, and how to read the results honestly.",
  },
  hero: {
    eyebrow: "Test demand with ads",
    h1: "How to Test Demand With Facebook and Google Ads in India",
    highlight: "Test Demand",
    intro: "Before you buy stock or rent a shop, you can spend a small, fixed amount on ads and see if strangers click, enquire and pay. It is the fastest way to hear the market's honest answer, without your friends being polite.",
    updated: UPDATED,
    primary: { label: "Set up the test", href: "#steps" },
    secondary: { label: "Demand test planner", href: "/business-demand-test-india" },
    image: IMG.hub,
    imageAlt: "A founder running a small ad test on a phone",
  },
  sections: [
    {
      type: "takeaways",
      heading: "Key takeaways",
      items: [
        "Decide your budget and your pass mark **before** you start. Stop when the budget ends.",
        "Send people to one simple page or a WhatsApp chat with one clear offer and a UPI pre-order or enquiry button.",
        "**Meta (Facebook and Instagram)** suits products people discover; **Google search** suits things people already look for.",
        "Count enquiries and pre-orders, not likes.",
      ],
    },
    {
      type: "table",
      heading: "The test at a glance",
      columns: ["Step", "What you do", "Time"],
      rows: [
        ["Offer", "One product or service, one price, one area", "An evening"],
        ["Page", "A simple page, Google Form or WhatsApp Business catalogue", "A day"],
        ["Ads", "A small daily budget on Meta or Google", "Set up in an hour"],
        ["Run", "Let it run until the budget you set is spent", "A few days"],
        ["Decide", "Compare results with your pass mark", "An hour"],
      ],
    },
    {
      type: "takeaways",
      heading: "What is a landing page test?",
      items: [
        "A landing page test shows a real offer to real strangers and measures who takes the next step: an enquiry, a sign-up or a pre-order.",
        "The page can be as simple as a [WhatsApp Business](https://business.whatsapp.com/) catalogue link or a Google Form with a UPI QR code.",
        "It works for products, services, classes and local businesses. See [how to build an MVP with low investment](/how-to-build-an-mvp-with-low-investment-in-india).",
      ],
    },
    {
      type: "table",
      heading: "Facebook and Instagram or Google: which to choose",
      columns: ["Question", "Meta (Facebook, Instagram)", "Google search"],
      rows: [
        ["Do buyers already search for this?", "Not needed; you can show it to them", "Yes; you appear when they search"],
        ["Best for", "Fashion, food, gifts, home products, classes", "Repairs, services, tuition, B2B supplies"],
        ["Targeting", "Area, age, interests", "Search words and area"],
        ["Creative needed", "A clear photo or short video", "A short text ad"],
        ["Watch out for", "Clicks that never enquire", "Searches that do not match your offer"],
      ],
    },
    {
      type: "steps",
      heading: "Set up your landing page",
      items: [
        { title: "One headline that names the buyer and the benefit", body: "\"Fresh home-cooked tiffin for working parents in Baner, delivered by 1 pm\"." },
        { title: "Your real price in rupees", body: "Hiding the price gives false hope. Use the [first-price workbench](/business-pricing-india)." },
        { title: "One action", body: "Pre-order with a small UPI advance, or tap to WhatsApp you. Not both." },
        { title: "Trust details", body: "Your name, area, phone number and FSSAI number if you sell food. Follow [ASCI](https://www.ascionline.in/) rules: no false claims." },
      ],
    },
    {
      type: "steps",
      heading: "Set up a Facebook and Instagram ad",
      items: [
        { title: "Use Meta Business Suite", body: "Create a business page and ad account in your own name. Official help: [Meta Business Help Centre](https://www.facebook.com/business/help)." },
        { title: "Choose a leads, messages or traffic goal", body: "Messages to WhatsApp works well for many Indian small businesses." },
        { title: "Set the area tightly", body: "Only pin codes or cities you can deliver to." },
        { title: "Set a small daily budget and an end date", body: "So you never spend more than you planned.", check: "Write your total test budget and end date before you open the ads screen." },
      ],
    },
    {
      type: "steps",
      heading: "Set up a Google search ad",
      items: [
        { title: "Open Google Ads in your own account", body: "Official help: [Google Ads Help](https://support.google.com/google-ads/)." },
        { title: "Pick a few exact search phrases", body: "The words your buyers type, in English and your local language." },
        { title: "Limit the location", body: "Only the area you serve." },
        { title: "Set a daily budget and end date", body: "Pause the campaign when the test budget is spent." },
      ],
    },
    {
      type: "list",
      heading: "How to read your results",
      items: [
        { title: "Many clicks, no enquiries", body: "The ad is interesting but the offer or price is not. Change one thing and test again." },
        { title: "Enquiries, no pre-orders", body: "People are curious but not convinced. Talk to them; [customer conversations](/how-to-talk-to-customers-before-starting-a-business-in-india) will tell you why." },
        { title: "Pre-orders at your real price", body: "A strong signal. Deliver them well and watch for repeat orders." },
        { title: "Almost nothing happens", body: "Check the area and wording, then consider that demand may be low. That is useful to know now." },
      ],
    },
    {
      type: "table",
      heading: "What to measure",
      intro: "We do not publish generic benchmarks; results depend on your product, price and area. Track these and compare against the pass mark you set.",
      columns: ["Measure", "How to count it", "Why it matters"],
      rows: [
        ["Spend", "Total rupees spent", "Your cost of learning"],
        ["Clicks or messages", "From the ads dashboard", "Interest"],
        ["Enquiries", "Messages or forms with a real question", "Serious interest"],
        ["Pre-orders or advances", "UPI payments received", "The real answer"],
        ["Cost per pre-order", "Spend ÷ pre-orders", "Your early [customer acquisition cost](/what-is-customer-acquisition-cost-for-a-small-business-in-india)"],
      ],
    },
    {
      type: "takeaways",
      heading: "The final word on ad tests",
      items: [
        "A small ad test is cheaper than a wrong shop, a wrong batch or a wrong app.",
        "Set your pass mark first so you cannot argue with the result later.",
        "Use the money people pay you as the signal, not compliments in the comments.",
      ],
    },
    { type: "dbfaq", heading: "Frequently asked questions", categories: ONLINE, match: "(ads|advert|instagram|facebook|online|customers|market|promot|sell)", limit: 8 },
    {
      type: "chips",
      heading: "Deeper answers founders ask for",
      items: [
        { label: "Customer acquisition cost", href: "/what-is-customer-acquisition-cost-for-a-small-business-in-india" },
        { label: "Product-market fit", href: "/how-to-know-if-your-business-has-product-market-fit-in-india" },
        { label: "Common mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
      ],
    },
    {
      type: "chips",
      heading: "People also search for",
      items: [
        { label: "How to validate a business idea in India", href: "/how-to-validate-a-business-idea-in-india" },
        { label: "How to validate an online selling idea", href: "/how-to-validate-an-online-selling-business-idea-in-india" },
        { label: "Online business ideas", href: "/online-business-ideas-india" },
        { label: "Side business ideas", href: "/side-business-ideas-india" },
      ],
    },
    { ...CTA, heading: "Ready to test your idea with real buyers?", body: "Plan your offer, budget and pass mark in the free demand test planner, then run your first ad test this week.", button: { label: "Plan my demand test", href: "/business-demand-test-india" } },
    TOOLS,
    CALCS,
    {
      type: "chips",
      heading: "Related resources",
      items: [
        { label: "Launch evidence plan", href: "/startup-launch-plan-india" },
        { label: "Weekend market stall check", href: "/weekend-market-stall-profit-check" },
        { label: "Validation field guide", href: "/startup-idea-validation" },
        { label: "Founder glossary", href: "/founder-glossary" },
      ],
    },
    {
      type: "takeaways",
      heading: "Rules worth knowing",
      intro: "Rules change; check the official pages in Sources.",
      items: [
        "Ads in India are expected to follow the [ASCI](https://www.ascionline.in/) code: honest claims, clear disclosure for paid influencer posts.",
        "Food sellers should show their FSSAI registration or licence number.",
        "Collect only the customer details you need, and keep them safe.",
      ],
    },
    { type: "sources", heading: "Sources", items: [{ label: "Meta Business Help Centre", href: "https://www.facebook.com/business/help" }, { label: "Google Ads Help", href: "https://support.google.com/google-ads/" }, ASCI, { label: "WhatsApp Business", href: "https://business.whatsapp.com/" }, SRC.npci, FSSAI] },
  ],
};

/** Seller layout: resources hub (/resources). 20 sections. */
export const govResources: TopicPage = {
  slug: "free-government-resources-for-starting-a-business-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/resources",
  parent: PARENT,
  seo: {
    title: "Free Government Resources for Starting a Business in India: Portals, Schemes and Tools",
    description: "Every free official portal a new founder in India needs, in one place: Udyam, GST, MCA, FSSAI, Startup India, MUDRA, GeM, ONDC, Skill India and data sources, plus our free tools.",
  },
  hero: {
    eyebrow: "Free government resources",
    h1: "Free Government Resources for Starting a Business in India",
    highlight: "Free Government Resources",
    intro: "Registration, loans, selling to the government, training and data: most of what a new founder needs is free on official portals. The hard part is knowing which one to open. Bookmark this page and you will always know.",
    sub: "Only **official government portals** and our own **free tools**. Never pay an agent for something the portal gives free.",
    updated: UPDATED,
    primary: { label: "Start with registration", href: "#register" },
    secondary: { label: "Free tools", href: "/tools" },
    image: IMG.hub,
    imageAlt: "Government portals for starting a business in India",
  },
  sections: [
    {
      type: "takeaways",
      heading: "Your free founder resource library",
      items: [
        "Official portals for **registration, tax, loans, selling and training**, grouped by what you need to do.",
        "Our free **calculators, templates and guides** for the work the portals do not do for you.",
        "Each link opens the official site. If any site asks for a fee to do what the portal does free, stop.",
      ],
    },
    {
      type: "cards",
      heading: "Register your business",
      items: [
        { title: "Udyam (MSME) registration", body: "Free, Aadhaar-based registration for micro, small and medium enterprises.", href: "https://udyamregistration.gov.in/", cta: "Open portal" },
        { title: "GST registration", body: "Register, file returns and check thresholds.", href: "https://www.gst.gov.in/", cta: "Open portal" },
        { title: "Company or LLP (MCA)", body: "Incorporate a private limited company or LLP.", href: "https://www.mca.gov.in/", cta: "Open portal" },
        { title: "FSSAI (food businesses)", body: "Food registration or licence through FoSCoS.", href: "https://foscos.fssai.gov.in/", cta: "Open portal" },
        { title: "Startup India (DPIIT)", body: "Recognition, benefits and the Seed Fund.", href: "https://www.startupindia.gov.in/", cta: "Open portal" },
        { title: "Income tax and PAN", body: "PAN and tax filing for you and your business.", href: "https://www.incometax.gov.in/", cta: "Open portal" },
      ],
    },
    {
      type: "cards",
      heading: "Get funding",
      items: [
        { title: "MUDRA loans", body: "Shishu, Kishore, Tarun and Tarun Plus for micro businesses.", href: "https://www.mudra.org.in/", cta: "Open portal" },
        { title: "Stand-Up India", body: "For SC/ST and women entrepreneurs starting a new enterprise.", href: "https://www.standupmitra.in/", cta: "Open portal" },
        { title: "PMEGP", body: "Subsidy on bank loans for new micro enterprises.", href: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp", cta: "Open portal" },
        { title: "CGTMSE", body: "Credit guarantee for collateral-free loans.", href: "https://www.cgtmse.in/", cta: "Open portal" },
        { title: "Startup India Seed Fund", body: "Through selected incubators, for DPIIT-recognised startups.", href: "https://seedfund.startupindia.gov.in/", cta: "Open portal" },
        { title: "SIDBI", body: "Small industries bank and the Fund of Funds for Startups.", href: "https://www.sidbi.in/", cta: "Open portal" },
      ],
    },
    {
      type: "cards",
      heading: "Sell more",
      items: [
        { title: "GeM", body: "Sell products and services to government buyers.", href: "https://gem.gov.in/", cta: "Open portal" },
        { title: "ONDC", body: "Open network to sell online beyond single marketplaces.", href: "https://ondc.org/", cta: "Open portal" },
        { title: "UPI for merchants", body: "Accept payments by UPI; NPCI explains how it works.", href: "https://www.npci.org.in/what-we-do/upi/product-overview", cta: "Learn" },
      ],
    },
    {
      type: "cards",
      heading: "Learn skills",
      items: [
        { title: "Skill India Digital", body: "Free courses and certificates for many trades and skills.", href: "https://www.skillindiadigital.gov.in/", cta: "Open portal" },
        { title: "Ministry of MSME", body: "Schemes, training and support for small businesses.", href: "https://msme.gov.in/", cta: "Open portal" },
        { title: "RBI financial education", body: "Plain guides on money, credit and safe banking.", href: "https://rbi.org.in/FinancialEducation/", cta: "Open" },
      ],
    },
    {
      type: "cards",
      heading: "Find data about your market",
      items: [
        { title: "Census of India", body: "Population and households by district.", href: "https://censusindia.gov.in/", cta: "Open" },
        { title: "Open Government Data", body: "Datasets by sector and state.", href: "https://data.gov.in/", cta: "Open" },
        { title: "Size your market", body: "Use the data to count your buyers.", href: "/how-to-calculate-tam-sam-som-for-a-business-in-india", cta: "Read" },
      ],
    },
    CALCS,
    {
      type: "cards",
      heading: "Templates and frameworks",
      items: [
        { title: "Templates", body: "Plans, personas and canvases you can fill in.", href: "/templates", cta: "Browse" },
        { title: "Business plan for a bank loan", body: "The project report sections banks expect.", href: "/how-to-write-a-business-plan-for-a-bank-loan-in-india", cta: "Read" },
        { title: "Frameworks compared", body: "Which validation framework to use when.", href: "/frameworks-comparison", cta: "Read" },
      ],
    },
    {
      type: "cards",
      heading: "Long-form founder guides",
      items: [
        { title: "Startup guides", body: "Our full guide library.", href: "/startup-guides", cta: "Browse" },
        { title: "Reading room", body: "Curated reading for first-time founders.", href: "/business-idea-reading-room", cta: "Open" },
        { title: "Learning resources", body: "Courses and resources we recommend.", href: "/learning-resources", cta: "Open" },
      ],
    },
    {
      type: "chips",
      heading: "Founder knowledge base",
      items: [
        { label: "Founder glossary", href: "/founder-glossary" },
        { label: "Startup terms in plain words", href: "/startup-terms-india" },
        { label: "Founder FAQ", href: "/faq" },
        { label: "Startup funding questions", href: "/startup-funding-questions-for-first-time-founders-in-india" },
      ],
    },
    { type: "chips", heading: "Validate by industry", items: VALIDATORS },
    { type: "dbideas", heading: "Idea inspiration", intro: "Published ideas from our library.", categories: ["home-based-business-ideas", "village-and-small-town-business-ideas", "women-friendly-business-ideas"], limit: 5, all: { label: "Browse all ideas", href: "/browse" } },
    {
      type: "chips",
      heading: "Ideas for every founder",
      items: [
        { label: "Women-friendly business ideas", href: "/category/women-friendly-business-ideas" },
        { label: "Student business ideas", href: "/category/student-business-ideas" },
        { label: "Senior citizen business ideas", href: "/category/senior-citizen-business-ideas" },
        { label: "Village and small town ideas", href: "/category/village-and-small-town-business-ideas" },
        { label: "Work from home ideas", href: "/category/work-from-home-business-ideas" },
      ],
    },
    {
      type: "chips",
      heading: "Ideas by how much you can start with",
      items: [
        { label: "Side business ideas", href: "/side-business-ideas-india" },
        { label: "Home-based ideas", href: "/category/home-based-business-ideas" },
        { label: "Zero-investment business models", href: "/startup-guides/zero-investment-business-models" },
        { label: "How much money is needed to start", href: "/how-much-money-is-needed-to-start-a-business-in-india" },
      ],
    },
    {
      type: "chips",
      heading: "Idea lists",
      items: [
        { label: "All idea lists", href: "/lists" },
        { label: "Local business ideas", href: "/local-business-ideas-india" },
        { label: "Online business ideas", href: "/online-business-ideas-india" },
        { label: "Product business ideas", href: "/product-business-ideas-india" },
        { label: "Service business ideas", href: "/service-business-ideas-india" },
      ],
    },
    {
      type: "chips",
      heading: "Comparisons",
      items: [
        { label: "Business models compared", href: "/business-models-india" },
        { label: "Startup ideas compared", href: "/startup-idea-comparison" },
        { label: "Loans vs investors", href: "/how-to-get-funding-for-a-small-business-in-india" },
      ],
    },
    {
      type: "chips",
      heading: "Learn from failure",
      items: [
        { label: "Indian startup failures", href: "/failed-startups/india" },
        { label: "Common mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
        { label: "Case studies", href: "/case-studies" },
      ],
    },
    {
      type: "chips",
      heading: "Our research",
      items: [
        { label: "Business idea research", href: "/business-idea-research-india" },
        { label: "Market research", href: "/market-research" },
        { label: "Open source research", href: "/open-source" },
      ],
    },
    TOOLS,
    {
      type: "chips",
      heading: "Topic hubs",
      items: [
        { label: "All startup topics", href: "/topics" },
        { label: "How to raise funds for a startup", href: "/how-to-raise-funds-for-a-startup-in-india" },
        { label: "Business numbers to track", href: "/business-numbers-every-small-business-in-india-should-track" },
      ],
    },
    { type: "dbfaq", heading: "Resource FAQ", categories: BROAD, match: "(register|registration|licen|gst|udyam|fssai|permit|legal)", limit: 8 },
    { ...CTA, heading: "Start with the free portals, not an agent.", body: "Register on Udyam today, then check your idea with our free risk check before you spend." },
  ],
};

/** Seller layout: industry validator (/validate-idea/foodtech). 14 sections. */
export const validateFood: TopicPage = {
  slug: "how-to-validate-a-food-business-idea-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/validate-idea/foodtech",
  parent: PARENT,
  seo: {
    title: "How to Validate a Food Business Idea in India Before You Open",
    description: "Test your food business idea in India before you rent or buy equipment: pre-orders, tasting batches, FSSAI rules, delivery app commission, shelf life and what Indian buyers really pay.",
  },
  hero: {
    eyebrow: "Validate a food business idea",
    h1: "How to Validate a Food Business Idea in India",
    highlight: "Food Business Idea",
    intro: "Everyone says your food is delicious. But will strangers in your area pay for it every week, at a price that covers gas, packing, delivery and your hours at the stove? Here is how to find out before you rent a kitchen.",
    sub: "For **home kitchens**, **tiffin services**, **cloud kitchens**, **street food**, **bakeries**, **sweets** and **packaged snacks**.",
    updated: UPDATED,
    primary: { label: "Check my food idea", href: "/business-idea-risk-check" },
    secondary: { label: "Browse food ideas", href: "/category/food-business-ideas" },
    image: IMG.validation,
    imageAlt: "A home cook testing a food business idea with real buyers",
  },
  sections: [
    {
      type: "cards",
      heading: "What a food idea check covers",
      items: [
        { title: "Taste with strangers", body: "Not family. Ten buyers who fit your target." },
        { title: "Price that covers everything", body: "Ingredients, gas, packing, delivery, app commission and your time. Use the [first-price workbench](/business-pricing-india)." },
        { title: "Repeat orders", body: "Food lives on regulars. Do buyers come back next week?" },
        { title: "Licences", body: "[FSSAI](https://foscos.fssai.gov.in/) registration or licence, and local permissions." },
        { title: "Shelf life and safety", body: "How long it stays fresh, how you store and carry it." },
        { title: "Delivery and reach", body: "Your own delivery, a local partner, or delivery apps and their fees." },
      ],
    },
    { type: "dbideas", heading: "Get inspired: food business ideas", intro: "Published food ideas from our library, with who pays and what it costs.", categories: FOOD, limit: 8, all: { label: "All food business ideas", href: "/category/food-business-ideas" } },
    {
      type: "list",
      heading: "Why food businesses struggle in India",
      intro: "Patterns from our [failure research](/failed-startups/india) and common founder stories.",
      items: [
        { title: "Price set too low", body: "Friends' prices do not cover gas, packing and delivery." },
        { title: "Delivery app fees eat the margin", body: "Commission and discounts can turn a profitable dish into a loss. Count them on every order." },
        { title: "Rent and staff before demand", body: "A kitchen lease before regular orders is the costliest mistake." },
        { title: "Inconsistent taste or timing", body: "Late lunch once is forgiven; twice, the customer leaves." },
        { title: "Missing FSSAI registration", body: "It is required, and buyers and platforms ask for it." },
      ],
    },
    {
      type: "chips",
      heading: "Go deeper on food businesses",
      items: [
        { label: "Home kitchen food ideas", href: "/category/home-kitchen-food-business-ideas" },
        { label: "Cloud kitchen ideas", href: "/category/cloud-kitchen-business-ideas" },
        { label: "Street food ideas", href: "/category/street-food-business-ideas" },
        { label: "Packaged snack ideas", href: "/category/packaged-snack-business-ideas" },
        { label: "Bakery ideas", href: "/category/bakery-and-confectionery-business-ideas" },
        { label: "Weekend market stall check", href: "/weekend-market-stall-profit-check" },
      ],
    },
    {
      type: "steps",
      heading: "Food-specific validation steps",
      items: [
        { title: "Fix one menu and one price", body: "Three or four items, a real price, a pickup or delivery area.", check: "Write your menu and price on one WhatsApp status today." },
        { title: "Take pre-orders with a UPI advance", body: "Share in your society group, office group or with nearby offices. Cook only what is booked." },
        { title: "Run a tasting batch or a weekend stall", body: "Real buyers, real price. Use the [stall profit check](/weekend-market-stall-profit-check)." },
        { title: "Count repeat orders for four weeks", body: "Regulars matter more than first-week excitement. See [product-market fit](/how-to-know-if-your-business-has-product-market-fit-in-india)." },
        { title: "Check the numbers on one order", body: "Profit after every cost, including any app fees. See [unit economics](/unit-economics-india)." },
        { title: "Register before you grow", body: "FSSAI registration or licence first; then GST if your turnover or way of selling needs it." },
      ],
    },
    {
      type: "chips",
      heading: "Questions food founders ask",
      items: [
        { label: "How much money do I need to start?", href: "/how-much-money-is-needed-to-start-a-business-in-india" },
        { label: "How do I find my first customers?", href: "/first-customer-india" },
        { label: "What does each customer cost me?", href: "/what-is-customer-acquisition-cost-for-a-small-business-in-india" },
        { label: "Should I take a MUDRA loan?", href: "/how-to-get-funding-for-a-small-business-in-india" },
      ],
    },
    { type: "dbfaq", heading: "Frequently asked questions", categories: FOOD, limit: 10 },
    {
      type: "list",
      heading: "What this validation can and cannot tell you",
      items: [
        { title: "It can tell you", body: "Whether real buyers near you pay your price and come back." },
        { title: "It can tell you", body: "Which dishes or products sell, and which do not." },
        { title: "It cannot promise", body: "Success at a bigger scale or in another city. Test again before you expand." },
        { title: "It cannot replace", body: "Proper licences, hygiene and food safety rules. Follow FSSAI guidance." },
      ],
    },
    { type: "chips", heading: "Other idea validators", items: VALIDATORS.filter((v) => !v.href.includes("food")) },
    TOOLS,
    CALCS,
    {
      type: "chips",
      heading: "Popular founder questions",
      items: [
        { label: "Is my business idea good?", href: "/how-to-check-if-your-business-idea-is-good-in-india" },
        { label: "Common mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
        { label: "How to build an MVP with low investment", href: "/how-to-build-an-mvp-with-low-investment-in-india" },
        { label: "Business numbers to track", href: "/business-numbers-every-small-business-in-india-should-track" },
      ],
    },
    { ...CTA, heading: "Cook for ten paying strangers before you rent a kitchen.", body: "Run the free risk check for your food idea, then take your first pre-orders this week.", button: { label: "Check my food idea", href: "/business-idea-risk-check" } },
    {
      type: "takeaways",
      heading: "Rules worth knowing",
      intro: "Confirm current rules on the official pages in Sources.",
      items: [
        "Every food business operator needs **FSSAI registration or a licence**; which one depends on the size of the business.",
        "**Udyam registration** is free and helps with MSME schemes and loans.",
        "**GST** depends on your turnover and how you sell; restaurant and packaged food rules differ, so check the GST portal or ask a CA.",
      ],
    },
    { type: "sources", heading: "Sources", items: [FSSAI, SRC.udyam, SRC.gst, SRC.mudra, SRC.npci] },
  ],
};

/** Seller layout: industry validator (/validate-idea/ecommerce). 14 sections. */
export const validateOnline: TopicPage = {
  slug: "how-to-validate-an-online-selling-business-idea-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/validate-idea/ecommerce",
  parent: PARENT,
  seo: {
    title: "How to Validate an Online Selling Business Idea in India Before You Buy Stock",
    description: "Test your online selling idea in India before buying stock: WhatsApp and Instagram pre-orders, marketplace fees, returns and COD, GST for online sellers, ONDC and consumer rules.",
  },
  hero: {
    eyebrow: "Validate an online selling idea",
    h1: "How to Validate an Online Selling Business Idea in India",
    highlight: "Online Selling",
    intro: "Selling online looks easy until the returns arrive and the marketplace fee is bigger than your profit. Before you buy a carton of stock, find out if strangers will pay, keep the product, and order again.",
    sub: "For **resellers**, **handmade products**, **D2C brands**, **WhatsApp and Instagram stores**, and **marketplace sellers**.",
    updated: UPDATED,
    primary: { label: "Check my online idea", href: "/business-idea-risk-check" },
    secondary: { label: "Browse online ideas", href: "/category/online-business-ideas" },
    image: IMG.validation,
    imageAlt: "A founder testing an online selling idea from home",
  },
  sections: [
    {
      type: "cards",
      heading: "What an online selling idea check covers",
      items: [
        { title: "Buyers who pay online", body: "Prepaid UPI orders, not just cart adds." },
        { title: "Profit after every fee", body: "Marketplace commission, shipping, payment fees, packaging and GST. Check [unit economics](/unit-economics-india)." },
        { title: "Returns and COD", body: "How many orders come back, and what that costs." },
        { title: "Cost of each buyer", body: "Ads and discounts per new buyer. See [customer acquisition cost](/what-is-customer-acquisition-cost-for-a-small-business-in-india)." },
        { title: "Repeat buyers", body: "Who orders again without a discount." },
        { title: "Rules for online sellers", body: "GST, consumer protection and product labelling rules." },
      ],
    },
    { type: "dbideas", heading: "Get inspired: online business ideas", intro: "Published online and reselling ideas from our library.", categories: ONLINE, limit: 8, all: { label: "All online business ideas", href: "/category/online-business-ideas" } },
    {
      type: "list",
      heading: "Why online selling businesses struggle in India",
      items: [
        { title: "Fees not counted", body: "Commission, shipping and discounts leave nothing on each order." },
        { title: "High returns", body: "Wrong size, colour or quality brings orders back; each return costs twice." },
        { title: "Too much stock too early", body: "Cash stuck in cartons that do not sell." },
        { title: "Only one channel", body: "A marketplace rule change can stop sales overnight." },
        { title: "Buying every customer with ads", body: "If nobody comes back, ad costs never end." },
      ],
    },
    {
      type: "chips",
      heading: "Go deeper on online businesses",
      items: [
        { label: "Reselling business ideas", href: "/category/reselling-business-ideas" },
        { label: "Online business ideas", href: "/online-business-ideas-india" },
        { label: "Affiliate and content site ideas", href: "/category/affiliate-and-content-site-business-ideas" },
        { label: "Test demand with ads", href: "/how-to-test-demand-with-facebook-and-google-ads-in-india" },
      ],
    },
    {
      type: "steps",
      heading: "Online-selling validation steps",
      items: [
        { title: "Start with ten products, not a hundred", body: "Photograph them well and list them on a [WhatsApp Business](https://business.whatsapp.com/) catalogue or Instagram.", check: "Pick your first ten products and their prices tonight." },
        { title: "Take prepaid UPI orders", body: "Prepaid orders show real intent and cut COD returns." },
        { title: "Order stock only for what is booked", body: "Or use small batches from a supplier who reorders quickly." },
        { title: "Run a small ad test", body: "See [how to test demand with Facebook and Google ads](/how-to-test-demand-with-facebook-and-google-ads-in-india)." },
        { title: "Track returns and repeat orders for a month", body: "Both tell you more than total orders." },
        { title: "Then try a marketplace or ONDC", body: "Compare fees and reach. [ONDC](https://ondc.org/) is one more route beyond single marketplaces." },
      ],
    },
    {
      type: "chips",
      heading: "Questions online sellers ask",
      items: [
        { label: "How much money do I need to start?", href: "/how-much-money-is-needed-to-start-a-business-in-india" },
        { label: "How do I price my products?", href: "/business-pricing-india" },
        { label: "Can I start without investors?", href: "/how-to-start-a-business-without-investors-in-india" },
        { label: "What numbers should I track?", href: "/business-numbers-every-small-business-in-india-should-track" },
      ],
    },
    { type: "dbfaq", heading: "Frequently asked questions", categories: ONLINE, limit: 10 },
    {
      type: "list",
      heading: "What this validation can and cannot tell you",
      items: [
        { title: "It can tell you", body: "Whether strangers pay online for your products at your price." },
        { title: "It can tell you", body: "Which products sell and which come back." },
        { title: "It cannot promise", body: "That a marketplace or ad platform will not change its rules." },
        { title: "It cannot replace", body: "Getting GST, labelling and consumer rules right. Check the official pages." },
      ],
    },
    { type: "chips", heading: "Other idea validators", items: VALIDATORS.filter((v) => !v.href.includes("online")) },
    TOOLS,
    CALCS,
    {
      type: "chips",
      heading: "Popular founder questions",
      items: [
        { label: "Is my business idea good?", href: "/how-to-check-if-your-business-idea-is-good-in-india" },
        { label: "How to build an MVP with low investment", href: "/how-to-build-an-mvp-with-low-investment-in-india" },
        { label: "Common mistakes to avoid", href: "/common-mistakes-to-avoid-when-starting-a-business-in-india" },
        { label: "Competitor analysis", href: "/how-to-do-competitor-analysis-for-a-small-business-in-india" },
      ],
    },
    { ...CTA, heading: "Sell ten products before you buy a hundred.", body: "Run the free risk check for your online idea, then take your first prepaid orders this week.", button: { label: "Check my online idea", href: "/business-idea-risk-check" } },
    {
      type: "takeaways",
      heading: "Rules worth knowing",
      intro: "Confirm current rules on the official pages in Sources.",
      items: [
        "**GST** rules for selling through e-commerce platforms differ from shop thresholds. Check the GST portal or ask a CA before you list.",
        "**Consumer protection rules for e-commerce** require clear seller details, prices and return policies.",
        "**Packaged products** need proper labels with maker details, price and quantity under legal metrology rules.",
      ],
    },
    { type: "sources", heading: "Sources", items: [SRC.gst, CONSUMER, { label: "Legal Metrology (Department of Consumer Affairs)", href: "https://consumeraffairs.nic.in/organisation-and-units/division/legal-metrology", note: "Rules for labelling packaged products." }, SRC.ondc, SRC.npci, SRC.udyam] },
  ],
};
