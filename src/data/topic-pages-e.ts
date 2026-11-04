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
