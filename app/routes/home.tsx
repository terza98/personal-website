import { useEffect } from "react";
import { Bands } from "~/components/Bands";
import { MotionSwitch } from "~/components/bits";
import {
  About,
  Codersy,
  Contact,
  Education,
  Elsewhere,
  Experience,
  Footer,
  Header,
  Hero,
  Words,
  Writing,
} from "~/components/sections";
import { Work } from "~/components/Work";
import { AUTHOR_URL, certifications, education, EMAIL, PHOTO, SITE_URL, socials } from "~/content";
import { useArrivals } from "~/lib/arrivals";
import type { Route } from "./+types/home";

const TITLE = "Mladen Terzić - Full-Stack Developer & Shopify Expert";
const DESCRIPTION =
  "Senior Full-Stack Developer & Shopify Expert with 10+ years experience. Agency owner of Codersy.com specializing in React, Next.js & e-commerce.";
const IMAGE = `${SITE_URL}${PHOTO}.jpg`;

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mladen Terzić",
  alternateName: "Mladen Terzic",
  description: "Senior Full-Stack Web Developer and Shopify Expert with over 10 years of experience",
  url: SITE_URL,
  image: IMAGE,
  jobTitle: "Senior Full-Stack Developer & Shopify Expert",
  worksFor: { "@type": "Organization", name: "Codersy", url: "https://codersy.com" },
  address: { "@type": "PostalAddress", addressLocality: "Lazarevac", addressCountry: "Serbia" },
  email: `${EMAIL.user}@${EMAIL.domain}`,
  sameAs: [...socials.map((s) => s.href), AUTHOR_URL],
  knowsAbout: [
    "Full-Stack Development",
    "Shopify Development",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "E-commerce",
    "Shopify Plus",
    "OpenAI API",
    "Remix",
    "Hydrogen",
    "Liquid (template language)",
    "Headless commerce",
    "Shopify app development",
    "Shopify Functions",
    "Core Web Vitals",
    "Ecommerce platform migration",
    "Technical SEO",
  ],
  alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school, url: e.href })),
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    url: c.href,
    recognizedBy: { "@type": "Organization", name: "Shopify" },
  })),
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codersy",
  url: "https://codersy.com",
  founder: { "@type": "Person", name: "Mladen Terzić" },
  description: "Specialized Shopify and full-stack development agency",
  sameAs: [SITE_URL],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mladen Terzić Portfolio",
  url: SITE_URL,
  description: "Portfolio website of Mladen Terzić - Senior Full-Stack Developer and Shopify Expert",
  author: { "@type": "Person", name: "Mladen Terzić" },
  inLanguage: "en-US",
};

export const meta: Route.MetaFunction = () => [
  { title: TITLE },
  { name: "description", content: DESCRIPTION },
  { name: "author", content: "Mladen Terzić" },
  { name: "robots", content: "index, follow" },
  { tagName: "link", rel: "canonical", href: `${SITE_URL}/` },
  { property: "og:type", content: "website" },
  { property: "og:url", content: `${SITE_URL}/` },
  { property: "og:title", content: TITLE },
  { property: "og:description", content: DESCRIPTION },
  { property: "og:image", content: IMAGE },
  { property: "og:site_name", content: "Mladen Terzić Portfolio" },
  { property: "og:locale", content: "en_US" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: TITLE },
  { name: "twitter:description", content: DESCRIPTION },
  { name: "twitter:image", content: IMAGE },
  { name: "twitter:creator", content: "@mladenterzic_" },
  { name: "geo.region", content: "RS-14" },
  { name: "geo.placename", content: "Lazarevac, Serbia" },
  { "script:ld+json": person },
  { "script:ld+json": organization },
  { "script:ld+json": website },
];

export default function Home() {
  useArrivals();

  // the hero marker does not wait to be scrolled to; its CSS delay times the sweep
  useEffect(() => {
    const t = window.setTimeout(() => document.querySelector(".hero-mark")?.classList.add("in"), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Bands />
        <About />
        <Experience />
        <Education />
        <Codersy />
        <Work />
        <Writing />
        <Words />
        <Elsewhere />
        <Contact />
      </main>
      <Footer />
      <MotionSwitch />
    </div>
  );
}
