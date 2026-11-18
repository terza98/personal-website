// Checks the prerendered page (build/client/index.html), which is exactly what
// crawlers receive. Run `npm run build` first.
// To check a deployed copy instead: SITE_URL=https://www.mladenterzic.com npm test
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const html = process.env.SITE_URL
  ? await (await fetch(process.env.SITE_URL)).text()
  : readFileSync(new URL("../build/client/index.html", import.meta.url), "utf8");
// only the static markup: the hydration payload at the end of the page is not links
const markup = html.replace(/<script\b[\s\S]*?<\/script>/g, "");

const anchors = [...markup.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
  href: /href="([^"]*)"/.exec(m[1])?.[1],
  rel: /rel="([^"]*)"/.exec(m[1])?.[1] ?? "",
  text: m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim(),
}));
const to = (href) => anchors.filter((a) => a.href === href);

// Every outbound link the previous versions of the site carried as a followed
// link. These pass authority to the sites they point at. Do not remove one, and
// do not add rel="nofollow" to one, without deciding to give that link up.
const BACKLINKS = [
  // mladenterzic.com before the rebuild
  "https://codersy.com",
  "https://www.codersy.com",
  "https://shopifyexpertdevelopers.com",
  "https://planinesrbija.rs",
  // the earlier portfolio in this repository
  "https://mlbutik.rs",
  "https://leathergallery.co.za",
  "https://leathergallery.co.za/",
  "https://aavalabs.eu/",
  "https://www.andersbarslund.com/",
  "https://us.creative.com",
  "https://inkbotdesign.com/",
  "https://djfurth.com/",
  "https://pointsofcare.com/",
];

for (const href of BACKLINKS) {
  test(`backlink is present and followed: ${href}`, () => {
    const found = to(href);
    assert.ok(found.length > 0, `no <a href="${href}"> in the prerendered page`);
    for (const a of found) {
      assert.ok(!/nofollow|sponsored|ugc/.test(a.rel), `rel="${a.rel}" would stop this link passing authority`);
    }
  });
}

test("anchor text of the previous site's footer links is unchanged", () => {
  const expected = {
    "https://www.codersy.com": "Codersy | Shopify Development Agency",
    "https://shopifyexpertdevelopers.com": "Shopify expert developers directory",
    "https://planinesrbija.rs": "Book an accommodation at Serbian mountains!",
    "https://mlbutik.rs": "ML Butik",
  };
  for (const [href, text] of Object.entries(expected)) {
    assert.ok(
      to(href).some((a) => a.text === text),
      `no link to ${href} with the text "${text}"`,
    );
  }
});

test("no page-level directive tells crawlers not to follow links", () => {
  const robots = /<meta name="robots" content="([^"]*)"/.exec(html)?.[1] ?? "";
  assert.ok(!/nofollow|noindex/.test(robots), `robots meta is "${robots}"`);
});

test("profile links exist", () => {
  for (const href of [
    "https://www.linkedin.com/in/mladen-terzic/",
    "https://github.com/terza98/",
    "https://x.com/mladenterzic_",
    "https://www.upwork.com/freelancers/mladenterzic",
  ]) {
    assert.ok(to(href).length > 0, `missing ${href}`);
  }
});

test("search metadata carried over from the previous site", () => {
  assert.match(html, /<title>Mladen Terzić - Full-Stack Developer &amp; Shopify Expert<\/title>/);
  assert.match(html, /<meta name="description" content="Senior Full-Stack Developer/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.mladenterzic\.com\/"/);
  assert.match(html, /property="og:image" content="https:\/\/www\.mladenterzic\.com\/assets\/images\/mladen-terzic\.jpg"/);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.deepEqual(ld.map((d) => d["@type"]).sort(), ["Organization", "Person", "WebSite"]);
});

test("section anchors that old links may point at still exist", () => {
  for (const id of ["hello", "skills", "experience", "education", "portfolio", "feedback", "contact"]) {
    assert.match(markup, new RegExp(`id="${id}"`), `#${id} is gone`);
  }
});

test("the page is real HTML before any script runs", () => {
  assert.match(markup, /<h1[^>]*aria-label="Mladen Terzić"/);
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
  assert.match(markup, /Stores that moved the numbers\./);
  // the address is split so that proxies which rewrite e-mail addresses in HTML leave the markup alone
  assert.ok(!/[\w.]+@[\w-]+\.\w+/.test(markup.replace(/<[^>]+>/g, "\n")), "a plain e-mail address is in the markup");
});

test("the portrait is in the page, with alt text and a fallback format", () => {
  const img = /<img\b[^>]*alt="Portrait of Mladen Terzić"[^>]*>/.exec(markup)?.[0] ?? "";
  assert.match(img, /src="\/assets\/images\/mladen-terzic\.jpg"/);
  assert.match(img, /width="800"/);
  assert.match(markup, /<source[^>]*type="image\/avif"[^>]*mladen-terzic\.avif/);
});

test("education, certifications and writing from the Codersy author page are in the page", () => {
  const text = markup.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
  assert.match(text, /Bachelor of Engineering, Information Technology/);
  assert.match(text, /University of Belgrade, School of Electrical Engineering/);
  assert.match(text, /Electrical Engineering High School “Nikola Tesla”/);
  assert.match(text, /2017 — 2021/);
  assert.equal(anchors.filter((a) => a.href?.startsWith("https://www.credly.com/badges/")).length, 9);
  assert.match(text, /Developing Apps for Shopify Aug 2025 · valid to Aug 2027/);
  for (const id of ["certifications", "writing"]) assert.match(markup, new RegExp(`id="${id}"`));
  // links into codersy.com: followed, like the other links to my own sites
  for (const href of [
    "https://www.codersy.com/reports/shopify-speed-2026",
    "https://www.codersy.com/author/mladen-terzic",
    "https://www.codersy.com/glossary",
    "https://www.codersy.com/blog/shopify-plus/how-to-choose-a-shopify-plus-agency",
  ]) {
    const found = to(href);
    assert.ok(found.length > 0, `missing ${href}`);
    for (const a of found) assert.ok(!/nofollow/.test(a.rel), `${href} is nofollow`);
  }
  const person = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1]))
    .find((d) => d["@type"] === "Person");
  assert.equal(person.alumniOf.length, 2);
  assert.equal(person.hasCredential.length, 9);
  assert.equal(person.image, "https://www.mladenterzic.com/assets/images/mladen-terzic.jpg");
});
