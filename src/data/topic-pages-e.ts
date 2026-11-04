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
