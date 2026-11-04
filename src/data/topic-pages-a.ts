import type { TopicPage } from "@/bought/topic-page";
import { PARENT, UPDATED, UPDATED_ON, IMG, SRC, TOOLS, CALCS, EXPLORE, CTA } from "./topic-pages-shared";

/** Seller layout: topic hub (/topics/validation-methods). Sections: 5-step process, methods by category, methods compared, CTA. */
export const validateIdea: TopicPage = {
  slug: "how-to-validate-a-business-idea-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/topics/validation-methods",
  parent: PARENT,
  seo: {
    title: "How to Validate a Business Idea in India Before You Invest Your Savings",
    description: "Validate your business idea in India before you put in savings: talk to real buyers, take a UPI advance, test in your own town and read the signs honestly.",
  },
  hero: {
    eyebrow: "Validate a business idea",
    h1: "How to Validate a Business Idea in India",
    highlight: "Validate",
    intro: "Before you resign, take a loan or ask your family for money, find out if real people near you will pay. You can do it in two weekends, with your phone and a few hundred rupees.",
    sub: "Built for first-time founders in Indian cities and towns: **buyers who pay by UPI**, family who will ask questions, and a market you can walk through.",
    updated: UPDATED,
    primary: { label: "Start the 5 steps", href: "#steps" },
    secondary: { label: "Plan a demand test", href: "/business-demand-test-india" },
    image: IMG.validation,
    imageAlt: "A founder checking early buyer interest on a phone",
  },
  sections: [
    {
      type: "steps",
      heading: "The 5-step validation process",
      intro: "Do them in order. Each step either gives you a reason to continue or saves you money.",
      items: [
        { title: "Write down who pays and why, in one line", body: "Not \"everyone\". Name the person: \"working mothers in Pune who want a healthy tiffin for school\", or \"kirana owners in my taluka who lose stock to expiry\". If you cannot name them, you cannot find them.", check: "Write your one line now. Read it out to someone at home. Do they picture a real person?" },
        { title: "Talk to 10 of those people, not your friends", body: "Visit the market, the society WhatsApp group, the clinic waiting room, the wholesale lane. Ask about their problem and what they do today. Do not pitch. Listen for money already being spent on a bad fix.", check: "List 10 names or places where you will meet these people this week." },
        { title: "Ask for a small commitment", body: "Interest is cheap. A ₹100 UPI advance, a pre-order, a signed trial or a shop owner giving you shelf space is real. If nobody commits anything, that is your answer for now.", check: "Decide what your small commitment will be and the amount you will ask for." },
        { title: "Run a tiny real test", body: "Make 20 tiffins, one weekend stall, one batch of the product, or one client project. Charge your real price. Count orders, repeat buyers and complaints. See [the demand test](/business-demand-test-india).", check: "Pick a date for your first paid test within the next 14 days." },
        { title: "Read the numbers honestly and decide", body: "Did people pay, come back and tell others? Does the price cover cost, GST if it applies, and your own time? Continue, change one thing, or stop. All three are good decisions when the evidence says so.", check: "Before the test, write what result would make you continue. Hold yourself to it." },
      ],
    },
    {
      type: "cards",
      heading: "Validation methods by category",
      intro: "Choose the method that fits how your buyers live. You do not need all of them.",
      items: [
        { title: "Talk: customer conversations", body: "Ten honest conversations with the people who would pay. The cheapest method there is, and the one most founders skip.", href: "/how-to-talk-to-customers-before-starting-a-business-in-india", cta: "How to run them" },
        { title: "Sell: pre-orders and UPI advances", body: "Ask for money before you build. A small advance tells you more than a hundred likes.", href: "/first-customer-india", cta: "Get your first customer" },
        { title: "Show: a stall, a sample, a demo", body: "A weekend market stall, a sample box for five shops, a demo at a society meet. People react honestly to something they can touch.", href: "/weekend-market-stall-profit-check", cta: "Check stall numbers" },
        { title: "Size: how many buyers are really near you", body: "Count the buyers you can actually reach in your area or online, not the whole country.", href: "/how-to-calculate-tam-sam-som-for-a-business-in-india", cta: "Size your market" },
        { title: "Build small: a first version", body: "A WhatsApp catalogue, a Google Form, a single product. Just enough to deliver and learn.", href: "/how-to-build-an-mvp-with-low-investment-in-india", cta: "Build an MVP" },
        { title: "Count: unit economics", body: "What one order costs you, what it earns, and what it costs to find each buyer.", href: "/unit-economics-india", cta: "Check the numbers" },
      ],
    },
    {
      type: "table",
      heading: "Validation methods compared",
      intro: "Pick by your time, your money and how strong a signal you need.",
      columns: ["Method", "Time it takes", "Money you spend", "How strong the signal is", "Best for"],
      rows: [
        ["10 customer conversations", "1 week", "Travel and tea", "Medium: tells you the problem is real", "Every idea, first"],
        ["UPI advance or pre-order", "1–2 weeks", "Almost nothing", "Strong: people paid", "Food, classes, services, products to order"],
        ["Weekend stall or sample batch", "1–2 weekends", "Stock and stall fee", "Strong: real buyers, real price", "Food, retail, handmade products"],
        ["WhatsApp or Instagram catalogue", "A few days", "Almost nothing", "Medium: enquiries, some orders", "Reselling, home products, local delivery"],
        ["One paid client project", "2–4 weeks", "Your time", "Strong: someone paid for your skill", "Freelance, agency, consulting"],
        ["Friends and family saying \"good idea\"", "1 day", "Nothing", "Weak: they love you, not the product", "Not for validation"],
      ],
      note: "A strong signal is money or a repeat order. Compliments, likes and \"I will definitely buy\" are weak signals.",
    },
    {
      type: "cta",
      heading: "Start validating your idea today",
      body: "Write your one line about who pays, then run the free risk check. It shows you which of the five steps matters most for your idea.",
      button: { label: "Run the free risk check", href: "/business-idea-risk-check" },
      note: "Free · About 5 minutes",
    },
  ],
};

/** Seller layout: question page (/questions/how-to-get-funding). */
export const getFunding: TopicPage = {
  slug: "how-to-get-funding-for-a-small-business-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/questions/how-to-get-funding",
  parent: PARENT,
  seo: {
    title: "How to Get Funding for a Small Business in India: Loans, Schemes and Investors",
    description: "Where a first-time founder in India can get money: own savings, MUDRA loans, Stand-Up India, PMEGP, the Startup India Seed Fund, angels and VCs, and which one fits you.",
  },
  hero: {
    eyebrow: "Business funding in India",
    h1: "How to Get Funding for a Small Business in India",
    highlight: "Funding",
    intro: "Most small businesses in India do not start with investors. They start with savings, a bank loan or a government scheme. Find the source that fits your stage, so you do not chase the wrong money for months.",
    sub: "Covers **MUDRA**, **Stand-Up India**, **PMEGP**, **CGTMSE**, the **Startup India Seed Fund**, angels and VCs, in plain words.",
    updated: UPDATED,
    primary: { label: "Find your funding source", href: "#compare" },
    secondary: { label: "How much do I need?", href: "/calculator/funding-needed" },
    image: IMG.funding,
    imageAlt: "A founder planning business funding",
  },
  sections: [
    {
      type: "takeaways",
      heading: "Key takeaways",
      items: [
        "**Match money to your stage.** A tiffin service or tailoring unit needs a bank loan or savings, not a venture capitalist.",
        "**MUDRA loans** are for non-farm micro businesses and come in four sizes: Shishu up to ₹50,000, Kishore up to ₹5 lakh, Tarun up to ₹10 lakh and Tarun Plus up to ₹20 lakh for those who repaid a Tarun loan.",
        "**The Startup India Seed Fund** is for DPIIT-recognised startups and is given through selected incubators, not directly.",
        "**Udyam registration is free** and is the first document most banks and schemes ask a small business for.",
        "**Show proof before you ask.** A few paying customers make every lender and investor take you more seriously.",
      ],
    },
    {
      type: "steps",
      heading: "Step by step: getting your first business money",
      items: [
        { title: "Work out the exact amount and what it is for", body: "Rent deposit, machines, first stock, licences and three to six months of running cost. Lenders ask \"for what?\" before \"how much?\". Use the [startup cost calculator](/calculator/startup-cost).", check: "Write five lines: item, rupees, why you need it." },
        { title: "Register on Udyam", body: "It is free and online with your Aadhaar. Many banks and government schemes for small businesses ask for it.", check: "Keep your Aadhaar, PAN and bank details ready, then register on the official Udyam portal only." },
        { title: "Choose your route: loan, scheme, grant or investor", body: "Loans need repayment but you keep full ownership. Investors take a share of your company. Grants are rare and come with conditions. Use the comparison table below." },
        { title: "Prepare a short, honest project report", body: "What you sell, to whom, at what price, your costs, and how you will repay. Banks look at your repayment ability and your own contribution." },
        { title: "Apply through the right door", body: "MUDRA through your bank, NBFC or MFI; Stand-Up India and PMEGP through their official portals; the Seed Fund through an incubator. Avoid agents who promise approval for a fee.", check: "Visit your bank branch and ask which schemes they process for a business like yours." },
      ],
    },
    {
      type: "table",
      heading: "What lenders and investors look at",
      intro: "No invented benchmarks here: these are the questions you will be asked.",
      columns: ["Who", "What they check first", "What helps you"],
      rows: [
        ["Bank (MUDRA, CGTMSE-backed loans)", "Can you repay from the business? Is your own contribution in?", "A clear project report, Udyam, bank statements, a few months of sales if you have them"],
        ["Stand-Up India / PMEGP", "Eligibility and a new (greenfield) enterprise", "Correct documents, training certificate if asked, a realistic project cost"],
        ["Seed Fund incubator", "DPIIT recognition, a product idea that can scale", "A prototype or pilot, a small team, early users"],
        ["Angel investor", "You, the problem and early traction", "Paying customers, a sharp pitch, honest numbers"],
        ["Venture capital fund", "Can this become very large?", "Fast growth, a big market and a team that can hire"],
      ],
    },
    {
      type: "list",
      heading: "Common mistakes founders make while raising money",
      items: [
        { title: "Chasing VCs for a local business", body: "A bakery, salon or coaching centre can be very profitable and still not fit venture capital. A bank loan may serve you far better." },
        { title: "Paying an agent for a \"guaranteed\" loan", body: "Government scheme applications are made on official portals and bank branches. Nobody can guarantee approval." },
        { title: "Borrowing for everything at once", body: "Start with what you need to reach your first paying customers. Borrow more once sales prove the need." },
        { title: "Mixing family money without terms", body: "Write down whether family money is a loan or a share, and when it will be returned. It protects your relationships." },
      ],
    },
    {
      type: "cards",
      heading: "Real situations: which money fits",
      items: [
        { title: "Meena, home tiffin service, Nagpur", body: "Needs a bigger stove, steel containers and two months of groceries. A Shishu or Kishore MUDRA loan or savings fits. She does not need an investor." },
        { title: "Arjun, mobile repair shop, a small town in Bihar", body: "Needs tools, a counter and opening stock. A MUDRA loan through his bank, with Udyam registration, is the natural first door." },
        { title: "Two engineers, farm software, Bengaluru", body: "Building a product for many districts. After DPIIT recognition, an incubator-led Seed Fund grant and later angel money can fit." },
      ],
    },
    {
      type: "faq",
      heading: "Business funding FAQ",
      items: [
        { q: "Can I get a business loan without collateral in India?", a: "Yes, many small business loans are collateral-free. MUDRA loans do not need collateral, and banks can cover other micro and small enterprise loans with a CGTMSE guarantee. Your bank decides based on your repayment ability." },
        { q: "What is Tarun Plus under MUDRA?", a: "Tarun Plus covers loans above ₹10 lakh up to ₹20 lakh, for entrepreneurs who have taken and repaid a Tarun loan before." },
        { q: "Who can apply for the Startup India Seed Fund?", a: "A DPIIT-recognised startup, generally incorporated not more than two years before applying, through one of the selected incubators. Check the official Seed Fund portal for current rules." },
        { q: "Do I need GST registration to get a loan?", a: "Not always. GST registration depends on your turnover and what you sell. Lenders may ask for it if you are already registered. Udyam registration is more commonly asked." },
        { q: "Is angel tax still a worry for startups?", a: "The angel tax has been abolished for all classes of investors. Tax rules keep changing, so confirm your own case with a chartered accountant." },
      ],
    },
    {
      type: "takeaways",
      heading: "Expert tips",
      items: [
        "Visit two banks, not one. Branch experience with schemes differs.",
        "Keep business and personal money in separate accounts from day one. Take UPI payments on a business account.",
        "Ask your bank about the exact documents before you print anything.",
        "Raise only what gets you to the next proof point: first 50 customers, first repeat order, first profitable month.",
      ],
    },
    { type: "sources", heading: "Sources", items: [SRC.mudra, SRC.mudraPlus, SRC.standUp, SRC.pmegp, SRC.cgtmse, SRC.seedFund, SRC.dpiit, SRC.udyam, SRC.budget2024] },
    {
      type: "table",
      heading: "Compare your funding options",
      columns: ["Source", "You give up", "Best stage", "Where to apply"],
      rows: [
        ["Own savings and family", "Your own risk", "Before the first sale", "At home: write the terms down"],
        ["MUDRA loan", "Repayment with interest", "Micro business starting or growing", "Your bank, NBFC or MFI"],
        ["Stand-Up India", "Repayment with interest", "New enterprise by SC/ST or women entrepreneurs", "Official Stand-Up India portal or bank"],
        ["PMEGP", "Repayment; part of the cost is subsidised", "New micro enterprise", "KVIC PMEGP portal"],
        ["Startup India Seed Fund", "Conditions; sometimes debt or equity-linked", "DPIIT-recognised startup, proof of concept", "Through a selected incubator"],
        ["Angel investors", "A share of your company", "Early traction, scalable idea", "Angel networks, founder referrals"],
        ["Venture capital", "A larger share and board seat", "Fast growth", "VC funds"],
      ],
    },
    {
      type: "chips",
      heading: "Related questions",
      items: [
        { label: "How much money do I need to start?", href: "/how-much-money-is-needed-to-start-a-business-in-india" },
        { label: "Should I bootstrap instead?", href: "/how-to-start-a-business-without-investors-in-india" },
        { label: "Cash-flow calendar", href: "/startup-cash-flow-india" },
        { label: "Startup terms in plain words", href: "/startup-terms-india" },
      ],
    },
    CTA,
    {
      type: "cards",
      heading: "Keep reading",
      items: [
        { title: "How much money you need to start", body: "Work out the real number before you ask anyone for it.", href: "/how-much-money-is-needed-to-start-a-business-in-india", cta: "Read" },
        { title: "Bootstrapping in India", body: "Grow from your own sales first. How and when it works.", href: "/how-to-start-a-business-without-investors-in-india", cta: "Read" },
        { title: "Why Indian startups fail", body: "Learn from founders who ran out of money before they found buyers.", href: "/failed-startups/india", cta: "Read" },
      ],
    },
    {
      type: "chips",
      heading: "Deeper answers founders ask for",
      items: [
        { label: "Product-market fit in India", href: "/how-to-know-if-your-business-has-product-market-fit-in-india" },
        { label: "Customer acquisition cost", href: "/what-is-customer-acquisition-cost-for-a-small-business-in-india" },
        { label: "Unit economics for India", href: "/unit-economics-india" },
        { label: "Launch evidence plan", href: "/startup-launch-plan-india" },
      ],
    },
    TOOLS,
    CALCS,
    EXPLORE,
    {
      type: "takeaways",
      heading: "Rules worth knowing before you apply",
      intro: "Limits and schemes are revised from time to time. Always confirm the current figure on the official page linked in Sources.",
      items: [
        "**MUDRA** now goes up to ₹20 lakh through the Tarun Plus category, for borrowers who have repaid a Tarun loan.",
        "**Angel tax** has been abolished for all classes of investors.",
        "**MSME limits** were raised: a micro enterprise can have investment up to ₹2.5 crore and turnover up to ₹10 crore, so more growing businesses still count as micro.",
      ],
    },
  ],
};

/** Seller layout: guide (/avoid-startup-failure). */
export const mistakes: TopicPage = {
  slug: "common-mistakes-to-avoid-when-starting-a-business-in-india",
  updated: UPDATED_ON,
  sellerRef: "https://ideaproof.io/avoid-startup-failure",
  parent: PARENT,
  seo: {
    title: "Common Mistakes to Avoid When Starting a Business in India",
    description: "The seven validation mistakes first-time founders in India make most often, the red flags to check today, and a 14-day plan to test your idea before you spend.",
  },
  hero: {
    eyebrow: "Startup mistakes to avoid",
    h1: "Common Mistakes to Avoid When Starting a Business in India",
    highlight: "Mistakes",
    intro: "Most businesses do not fail on launch day. They fail months earlier, on a day the founder skipped one honest check. Here are the traps, and how you catch each one early.",
    updated: UPDATED,
    primary: { label: "See the 7 mistakes", href: "#mistakes" },
    secondary: { label: "Indian startup failures", href: "/failed-startups/india" },
    image: IMG.hub,
    imageAlt: "A founder reviewing what went wrong in a business plan",
  },
  sections: [
    {
      type: "takeaways",
      heading: "What failed founders tell us",
      intro: "From the post-mortems in our [India failure research](/failed-startups/india) and [why startups fail](/why-startups-fail-2026-2027):",
      items: [
        "They built first and asked buyers later.",
        "They trusted praise from family and friends over money from strangers.",
        "They set a price that did not cover delivery, GST, platform fees or their own time.",
        "They spent on ads, rent or an app before one customer came back for a second order.",
      ],
    },
    {
      type: "cards",
      heading: "The hard truth",
      items: [
        { title: "Your idea is not the risk", body: "Your untested guesses are. Who pays, how much, how often and how you reach them: each one is a guess until someone pays." },
        { title: "Savings run out quietly", body: "Rent, salaries and EMIs keep going whether or not orders come. That is why testing small first protects your family's money." },
        { title: "Stopping early is not failure", body: "Closing a weak idea after two weekends is cheaper than closing a shop after two years." },
      ],
    },
    {
      type: "steps",
      heading: "The prevention ladder",
      intro: "Climb one rung at a time. Do not skip to the top.",
      items: [
        { title: "Problem", body: "Real people near you have this problem and already spend money or time on it." },
        { title: "Buyer", body: "You can name who pays and where to find them." },
        { title: "Price", body: "They pay a price that covers your cost, GST where it applies, and your time." },
        { title: "Repeat", body: "Some come back, or tell others, without you pushing." },
        { title: "Scale", body: "Only now spend on rent, staff, ads or an app." },
      ],
    },
    {
      type: "list",
      heading: "7 validation mistakes and how to catch them",
      items: [
        { title: "1. Asking family instead of buyers", body: "Your family wants you to be happy. Catch it: talk to ten strangers who fit your buyer line. See [customer interviews](/how-to-talk-to-customers-before-starting-a-business-in-india)." },
        { title: "2. Counting likes as demand", body: "Reels and likes cost nothing. Catch it: ask for a ₹100 UPI advance or a pre-order." },
        { title: "3. Pricing from the competitor, not your cost", body: "The shop next door may have no rent or family labour. Catch it: build your price in the [first-price workbench](/business-pricing-india)." },
        { title: "4. Forgetting GST, fees and delivery", body: "Marketplace commission, payment fees, packing and delivery can eat the margin. Catch it: check [unit economics](/unit-economics-india) on one order." },
        { title: "5. Signing rent before testing", body: "A lease and deposit lock you in. Catch it: test with a stall, home kitchen, shared space or online catalogue first." },
        { title: "6. Building the app before the service", body: "Many Indian buyers are happy to order on WhatsApp. Catch it: run the service manually first. See [how to build an MVP](/how-to-build-an-mvp-with-low-investment-in-india)." },
        { title: "7. Ignoring what it costs to find each buyer", body: "Ads and commissions add up. Catch it: work out your [customer acquisition cost](/what-is-customer-acquisition-cost-for-a-small-business-in-india) before you scale." },
      ],
    },
    {
      type: "steps",
      heading: "The 14-day validation sprint",
      items: [
        { title: "Days 1–2: write your buyer line and your guesses", body: "Who pays, what price, how often, how you will reach them.", check: "Write your top three guesses on paper." },
        { title: "Days 3–6: ten conversations", body: "Meet buyers where they are: market, society group, office canteen, wholesale lane." },
        { title: "Days 7–9: ask for a commitment", body: "UPI advance, pre-order, trial agreement, shelf space." },
        { title: "Days 10–13: one small paid test", body: "A batch, a stall, a client, a class. Real price, real delivery." },
        { title: "Day 14: decide", body: "Continue, change one thing, or stop. Use [pivot or stop](/business-idea-pivot-or-stop) to decide calmly." },
      ],
    },
    {
      type: "quiz",
      heading: "10 red flags to check today",
      intro: "Tick each one that is true. Every tick is a mistake you have already avoided.",
      items: [
        "I have spoken to at least ten possible buyers who are not friends or family.",
        "Someone outside my family has paid me, even a small amount.",
        "I know my cost for one order or one unit.",
        "My price covers GST if it applies to me, fees and delivery.",
        "I know where my next ten buyers will come from.",
        "I have not signed a lease or bought machines yet, or I have proof I need them.",
        "I know how many months my savings can cover.",
        "My family knows the plan and the amount at risk.",
        "I have decided what result would make me stop.",
        "At least one buyer has come back or referred someone.",
      ],
      result: "Fewer than seven ticks? Fix those first, before spending more.",
    },
    {
      type: "list",
      heading: "What founders get wrong about validation",
      items: [
        { title: "\"Validation takes months\"", body: "Two weekends of honest testing is enough to know if you should continue." },
        { title: "\"I need a finished product first\"", body: "You need something you can show, sell or deliver by hand." },
        { title: "\"Someone will copy my idea\"", body: "Most ideas are already being done somewhere. Your edge is doing it well for your buyers." },
        { title: "\"A survey is enough\"", body: "People say yes on forms. Watch what they pay for." },
      ],
    },
    {
      type: "cards",
      heading: "Founders who caught the mistake early",
      intro: "Everyday situations, not famous stories.",
      items: [
        { title: "The cake order that did not cover the cost", body: "A home baker in Indore noticed every order earned less than the cream, box and delivery cost. She raised the price and lost a few buyers but started earning." },
        { title: "The coaching batch that never filled", body: "A teacher in Patna planned rent for a classroom, ran a free demo first, and found parents wanted evening online batches instead. No rent needed." },
        { title: "The reseller who checked fees", body: "A Surat saree reseller counted marketplace commission and returns on ten orders before ordering bulk stock, and moved to WhatsApp orders for repeat buyers." },
      ],
    },
    {
      type: "chips",
      heading: "Failures that could have been prevented",
      items: [
        { label: "Indian startup failure research", href: "/failed-startups/india" },
        { label: "Why startups fail", href: "/why-startups-fail-2026-2027" },
        { label: "Business idea risk check", href: "/business-idea-risk-check" },
      ],
    },
    TOOLS,
    {
      type: "faq",
      heading: "Frequently asked questions",
      items: [
        { q: "What is the most common startup mistake in India?", a: "Building or spending before checking that strangers will pay. Talk to buyers and take a small advance first." },
        { q: "How many customers should I talk to before starting?", a: "Start with ten people who fit your buyer line. If most describe the same problem and some agree to pay, keep going." },
        { q: "Should I quit my job to test my idea?", a: "Usually not. Most of the 14-day sprint fits evenings and weekends. Quit when the numbers, not the excitement, say so." },
        { q: "Do I need to register before testing?", a: "For a tiny test, often not. Before regular selling, check Udyam, GST and any local licence (FSSAI for food, for example) that applies to you." },
      ],
    },
    { ...CTA, heading: "Run the 14-day sprint, not the risk." },
  ],
};
