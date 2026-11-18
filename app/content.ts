// Everything the page says, in one place. Components only decide how it looks.

export const SITE_URL = "https://www.mladenterzic.com";
export const EMAIL = { user: "mladen", domain: "mladenterzic.com" };
export const BOOK_URL = "https://codersy.com/contact";
/** The portrait, without extension: there is an .avif and a .jpg of it. */
export const PHOTO = "/assets/images/mladen-terzic";

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#codersy", label: "Codersy" },
  { href: "#portfolio", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export const bands = [
  ["Carl Friedrik", "Manukora", "Manta Sleep", "Fisiocrem", "PHIX", "Andrianna Shamaris", "Soho Nakit", "Tattup"],
  ["Unstrap", "SecondShop", "Qinetiko", "Blossom Aromatherapy", "LGi Linens", "RUVE", "Woolona", "Artisio"],
];

export const timeline = [
  { year: "2014", text: "Started building online stores" },
  { year: "2017", text: "Founded Codersy" },
  { year: "2021", text: "BE in Information Technology, University of Belgrade" },
  { year: "2025", text: "Codersy became a Shopify Plus partner. Nine Shopify certifications, from app development to headless" },
  { year: "2026", text: "Published the Shopify Speed Report, a test of 537 stores" },
];

/** What I work on, as listed on my Codersy author page. */
export const expertise = [
  "Shopify Plus",
  "Shopify theme development (Liquid)",
  "Headless commerce and Hydrogen",
  "Shopify app development",
  "Checkout and Shopify Functions",
  "Site speed and Core Web Vitals",
  "Shopify migrations",
  "Technical SEO for Shopify",
];

export const skills = [
  {
    title: "Full-stack development",
    items:
      "HTML, CSS, Sass, JavaScript, TypeScript, React, Next.js, React Native, Remix, Node.js, GraphQL, Apollo, REST APIs, OpenAI API, PostgreSQL",
  },
  {
    title: "Shopify development",
    items:
      "Liquid, theme development, app development in React, Hydrogen, page speed optimization, custom features, headless CMS, Shopify API",
  },
  {
    title: "CMS development",
    items: "WordPress, Squarespace, Shopify, Wix, Magento, OpenCart, Instapage, ClickFunnels, Thinkific",
  },
  {
    title: "Consulting and SEO audits",
    items: "Screaming Frog, Semrush, Moz, WooRank, Google Analytics, Chartbeat, Crazy Egg",
  },
];

export const jobs = [
  { role: "CEO, Founder", org: "Codersy · Remote", when: "Present" },
  { role: "Senior Shopify Development Team Lead", org: "SecondShop · Calgary, Canada", when: "May 2024 — May 2025" },
  { role: "Lead Developer", org: "Marketplace Solutions · Remote", when: "Dec 2022 — Aug 2023" },
  { role: "Full-stack Shopify Developer", org: "Storetasker · Remote", when: "Sep 2022 — Present" },
  { role: "Co-Founder, CTO", org: "EasyPass · Belgrade", when: "Mar 2021 — Present" },
  { role: "Frontend & Shopify Engineer", org: "Henkel AG & Co. · Berlin", when: "Nov 2020 — Apr 2021" },
  { role: "Frontend & Shopify Engineer", org: "MVP Factory · Berlin", when: "Jun 2020 — Sep 2022" },
  { role: "Front-end, WordPress & Shopify Developer", org: "Upwork · Remote · 210 completed jobs", when: "Mar 2015 — Present" },
];

export const education = [
  {
    degree: "Bachelor of Engineering, Information Technology",
    school: "University of Belgrade, School of Electrical Engineering",
    href: "https://www.etf.bg.ac.rs/",
    when: "2017 — 2021",
  },
  {
    degree: "High school diploma, Electrical and Electronics Engineering",
    school: "Electrical Engineering High School “Nikola Tesla”",
    href: "https://www.teslabg.edu.rs/",
    when: "2013 — 2017",
  },
];

/** Every badge on credly.com/users/mladen-terzic, newest first. Dates are YYYY-MM. */
export const CREDLY_URL = "https://www.credly.com/users/mladen-terzic";
const badge = (id: string) => `https://www.credly.com/badges/${id}`;
export const certifications = [
  { name: "Developing Apps for Shopify", issued: "2025-08", expires: "2027-08", href: badge("c9228e58-7e9a-4ebe-a967-2a3628642550") },
  { name: "Selling Shopify Fundamentals: Verified Skill Badge", issued: "2025-04", expires: "2027-04", href: badge("ddc47c73-8ae4-4f8f-a6c6-ecdc291d58aa") },
  { name: "Solution Planning Fundamentals: Verified Skill Badge", issued: "2025-01", expires: "2027-01", href: badge("2c0b7cbe-2b53-43fd-8474-0a6b7d2a6c86") },
  { name: "Positioning the Value of Shopify Checkout", issued: "2025-01", href: badge("8cea3318-91bb-40a5-b91a-269a4e42d054") },
  { name: "Headless at Shopify for Business Consultants: Verified Skill Badge", issued: "2025-01", expires: "2027-01", href: badge("acd796c4-35da-4620-be18-2b9a4d105d34") },
  { name: "Marketing Your Shopify Services as a Partner", issued: "2025-01", href: badge("ce77ec1c-c9ee-4643-a312-c94b927d1a7d") },
  { name: "Headless at Shopify for Developers: Verified Skill Badge", issued: "2025-01", expires: "2027-01", href: badge("9f72880f-6410-487c-8a3c-362cf38f802d") },
  { name: "Liquid Storefronts for Theme Developers", issued: "2025-01", expires: "2027-01", href: badge("d39db76f-1155-420e-bb73-6f7e72e17558") },
  { name: "Shopify Development Fundamentals: Verified Skill Badge", issued: "2025-01", expires: "2027-01", href: badge("2b24d613-c805-4ba7-9716-0d43d58817d2") },
] as { name: string; issued: string; expires?: string; href: string }[];

// ---- Writing: all on codersy.com, followed links ----
export const AUTHOR_URL = "https://www.codersy.com/author/mladen-terzic";
export const GLOSSARY_URL = "https://www.codersy.com/glossary";
export const research = {
  title: "Shopify Speed Report 2026",
  meta: "537 stores tested · Oct 2026",
  summary:
    "537 Shopify stores tested in October 2026 with PageSpeed Insights and Chrome UX Report data: lab scores, real-visitor Core Web Vitals and what third-party apps cost.",
  href: "https://www.codersy.com/reports/shopify-speed-2026",
};
const post = (path: string) => `https://www.codersy.com/blog/${path}`;
export const articles = [
  { title: "How to Choose a Shopify Plus Agency in 2026: Costs, Red Flags, Questions to Ask", when: "Nov 2026", href: post("shopify-plus/how-to-choose-a-shopify-plus-agency") },
  { title: "104 Shopify Statistics for 2026, With Sources", when: "Nov 2026", href: post("shopify-data-and-analytics/shopify-statistics-and-market-data") },
  { title: "Shopify Markets in 2026: Currencies, Languages, Domains and Duties", when: "Nov 2026", href: post("shopify-international-and-shipping/shopify-markets-guide") },
  { title: "Shopify Plus SEO in 2026: What Changes at Enterprise Scale", when: "Nov 2026", href: post("shopify-seo/shopify-plus-seo") },
  { title: "Shopify Plus Pricing 2026: Licence Fees and the Real Total Cost", when: "Oct 2026", href: post("shopify-plus/shopify-plus-pricing") },
];

export const stats = [
  { count: "35", suffix: "+", text: "industries served" },
  { count: "98", suffix: "%", text: "client retention" },
  { count: "5.0", suffix: "", text: "across 26 reviews on the Shopify Partner Directory" },
  { count: "7", suffix: "", text: "of our own apps on the Shopify App Store" },
];

export const services = [
  "Store builds",
  "Custom apps",
  "Headless and Hydrogen",
  "Shopify Plus and B2B",
  "Migrations",
  "SEO and AI search",
  "Conversion optimization",
  "Maintenance and support",
];

export const work = [
  { name: "Carl Friedrik", meta: "Bags · UK", metric: "+18%", what: "conversion rate", href: "https://codersy.com/projects/carlfriedrik" },
  { name: "Manukora", meta: "Food and drink · NZ / US", metric: "+24%", what: "average order value", href: "https://codersy.com/projects/manukora" },
  { name: "Fisiocrem", meta: "Wellness · Canada", metric: "−38%", what: "load time", href: "https://codersy.com/projects/fisiocrem" },
  { name: "Manta Sleep", meta: "Wellness · US", metric: "+24%", what: "mobile conversion", href: "https://codersy.com/projects/mantasleep" },
  { name: "Andrianna Shamaris", meta: "Home · US", metric: "1,258", what: "products migrated", href: "https://codersy.com/projects/andriannashamaris" },
];

export const quotes = [
  {
    text: "Mladen is a great coder and helped us create something we could only dream of.",
    name: "Greg Parry",
    role: "CEO",
    org: "Leather Gallery",
    href: "https://leathergallery.co.za/",
  },
  {
    text: "Been working with Codersy for a long time - they've been a great support and asset to our company.",
    name: "Niklas Oppermann",
    role: "CEO",
    org: "Carl Friedrik",
  },
  {
    text: "Mladen was extremely helpful on a tight deadline. He was able to take a look at the problem we were having with our website, identify what he needed to do to fix it, and fix the problem ahead of schedule. Very happy!",
    name: "Christina Knapp",
    role: "CEO",
    org: "Points of Care",
    href: "https://pointsofcare.com/",
  },
  {
    text: "10 out of 10, highly recommend you work with Codersy!",
    name: "Nav Lajli",
    role: "CEO",
    org: "Unstrap",
  },
];

/** Verbatim from my Upwork and Storetasker profiles. Upwork hides client names, so those say what the job was. */
export const reviews = [
  {
    text: "Mladen is hands down the best Shopify developer I've worked with. His hourly rate may be higher than average, but he completes work many times faster and to a much higher standard, so it's 100% worth it.",
    client: "Jewellery brand, United Kingdom",
    source: "Upwork, 2022",
  },
  {
    text: "Mladen is one of the most skilled developers I have ever worked with. He not only understood the scope immediately, but he also provided real-time suggestions and feedback. He also has the unique ability to not only start from scratch but also to take over a project at any stage and however messy it is, and make sense of it, fix it and then vastly improve it. I will be working with Mladen far into the future.",
    client: "Shopify Plus project",
    source: "Upwork, 2022",
  },
  {
    text: "Mladen is proactive, and solution minded. He understands funnel from a consumer point of view and know how to act and solve things actively. A rare gem to have in your DTC brand.",
    client: "DTC brand",
    source: "Upwork",
  },
  {
    text: "We've worked with Mladen and his team on two different projects now and his work has always been outstanding. I've personally found him to be extremely knowledgeable, professional and patient.",
    client: "Shopify store modifications",
    source: "Upwork, 2023",
  },
  {
    text: "Most professional Shopify Developer you can find here on Upwork. Solving all Problems.",
    client: "Product page with 500+ variants",
    source: "Upwork, 2024",
  },
  {
    text: "Mladen was available right away and works fast. He provides very clear guides to help as well and is easy to communicate with.",
    client: "Hs Kompact",
    source: "Storetasker",
  },
];
export const reviewSources = [
  { label: "All reviews on Upwork", href: "https://www.upwork.com/freelancers/mladenterzic" },
  { label: "All 10 reviews on Storetasker", href: "https://www.storetasker.com/experts/mladen-terzic" },
];

// ---- Outbound links that must stay on the page and stay followed ----
// These pass authority to the sites they point at. Keep each href exactly as it
// is and never add rel="nofollow" to them. tests/site.test.mjs fails the build
// if one goes missing.

/** Projects of my own. `anchor` is the link text the previous site used. */
export const ventures = [
  { name: "Codersy", anchor: "Codersy | Shopify Development Agency", href: "https://www.codersy.com" },
  { name: "Shopify Expert Developers", anchor: "Shopify expert developers directory", href: "https://shopifyexpertdevelopers.com" },
  { name: "Planine Srbija", anchor: "Book an accommodation at Serbian mountains!", href: "https://planinesrbija.rs" },
  { name: "ML Butik", anchor: "ML Butik", href: "https://mlbutik.rs" },
];

/** Client sites linked from the earlier portfolio. (veientilfullbooket.no was on that list too; the domain no longer exists, so it is not linked.) */
export const clientSites = [
  { name: "Leather Gallery", kind: "Shopify", href: "https://leathergallery.co.za" },
  { name: "Aavalabs", kind: "Shopify", href: "https://aavalabs.eu/" },
  { name: "Anders Barslund", kind: "Squarespace", href: "https://www.andersbarslund.com/" },
  { name: "Creative", kind: "Front-end", href: "https://us.creative.com" },
  { name: "Inkbot Design", kind: "Page speed", href: "https://inkbotdesign.com/" },
  { name: "DJ Furth", kind: "Portfolio", href: "https://djfurth.com/" },
];

/** Profiles. These were rel="nofollow" on the previous site and stay that way. */
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mladen-terzic/" },
  { label: "GitHub", href: "https://github.com/terza98/" },
  { label: "X", href: "https://x.com/mladenterzic_" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/mladenterzic" },
  { label: "Credly", href: CREDLY_URL },
  { label: "Storetasker", href: "https://www.storetasker.com/experts/mladen-terzic" },
  { label: "Shopify Community", href: "https://community.shopify.com/u/mladen_terzic/summary" },
];
