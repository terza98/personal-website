// Everything the page says, in one place. Components only decide how it looks.

export const SITE_URL = "https://www.mladenterzic.com";
export const EMAIL = { user: "mladen", domain: "mladenterzic.com" };
export const BOOK_URL = "https://codersy.com/contact";

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
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
  { year: "2017", text: "Founded Codersy, a Shopify Plus partner from year one" },
  { year: "2021", text: "BE in Information Technology, University of Belgrade" },
  { year: "2025", text: "Six Shopify certifications, from app development to headless" },
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
  { role: "Front-end, WordPress & Shopify Developer", org: "Upwork · Remote", when: "Mar 2015 — Present" },
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
];
