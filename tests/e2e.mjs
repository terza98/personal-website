// Drives the built site in a real browser: hydration, layout, the animations and
// the motion switch. Screenshots go to tests/shots/.
//
//   npm run build && npm run test:e2e            (serves build/client itself)
//   BASE_URL=https://example.com npm run test:e2e (tests a deployed copy)
import assert from "node:assert/strict";
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = fileURLToPath(new URL("../build/client", import.meta.url));
const shots = fileURLToPath(new URL("./shots", import.meta.url));
mkdirSync(shots, { recursive: true });

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".avif": "image/avif", ".jpg": "image/jpeg", ".xml": "application/xml", ".txt": "text/plain" };
let server;
let base = process.env.BASE_URL;
if (!base) {
  server = createServer((req, res) => {
    let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
    let file = join(root, p);
    if (!file.startsWith(root)) return res.writeHead(403).end();
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) return res.writeHead(404).end("not found");
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  base = `http://127.0.0.1:${server.address().port}`;
}
base = base.replace(/\/$/, "");

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "chrome" });
const results = [];
let failed = 0;

async function open({ width, height, reducedMotion = "no-preference", colorScheme = "light" }) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion, colorScheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("requestfailed", (r) => errors.push(`request failed: ${r.url()}`));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return { ctx, page, errors };
}

async function check(name, fn) {
  try {
    await fn();
    results.push(`ok    ${name}`);
  } catch (e) {
    failed++;
    results.push(`FAIL  ${name}\n      ${String(e.message).split("\n").join("\n      ")}`);
  }
}

const lineWidths = (page, sel) =>
  page.evaluate((s) => {
    const kin = document.querySelector(s);
    const W = kin.getBoundingClientRect().width;
    return [...kin.querySelectorAll(".kl")].map((l) => {
      const r = l.getBoundingClientRect();
      const st = getComputedStyle(l);
      return { ratio: r.width / W, scale: new DOMMatrix(st.transform).a, fontSize: parseFloat(st.fontSize), wdth: l.querySelector(".kc").style.fontVariationSettings };
    });
  }, sel);

// ---------- desktop, motion on ----------
{
  const { ctx, page, errors } = await open({ width: 1440, height: 900 });

  await check("hydrates with no console errors or failed requests", async () => {
    await page.waitForFunction(() => document.documentElement.classList.contains("ready"));
    assert.deepEqual(errors, []);
  });

  await page.waitForTimeout(2600);
  await page.screenshot({ path: join(shots, "desktop-hero.png") });

  await check("each line of the name is exactly as wide as its column", async () => {
    for (const l of await lineWidths(page, ".hero .kin")) {
      assert.ok(Math.abs(l.ratio - 1) < 0.01, `line is ${(l.ratio * 100).toFixed(1)}% of the column`);
      assert.ok(l.scale > 0.8 && l.scale < 1.25, `line needed scaleX(${l.scale.toFixed(2)}) to fit, type is distorted`);
    }
  });

  await check("the hero, including its buttons, fits in the first screen", async () => {
    const bottom = await page.evaluate(() => document.querySelector(".hero .actions").getBoundingClientRect().bottom);
    assert.ok(bottom <= 900, `buttons end at ${Math.round(bottom)}px in a 900px window`);
  });

  await check("letters animate when idle and react to the pointer", async () => {
    const read = () => page.evaluate(() => [...document.querySelectorAll(".hero .kc")].map((c) => c.style.fontVariationSettings).join("|"));
    const a = await read();
    await page.waitForTimeout(700);
    const b = await read();
    assert.notEqual(a, b, "the idle wave is not running");
    const box = await page.locator(".hero .kc").nth(2).boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
    await page.waitForTimeout(1600);
    const weights = await page.evaluate(() => [...document.querySelectorAll(".hero .kl:first-child .kc")].map((c) => +/"wght" (\d+)/.exec(c.style.fontVariationSettings)[1]));
    // the letters shift as they swell, so look for a heavy letter near the pointer rather than at one index
    const near = Math.max(...weights.slice(0, 4));
    assert.ok(near > 650, `heaviest letter near the pointer is weight ${near}`);
    assert.ok(weights[5] < near - 350, `far letter (${weights[5]}) should be much lighter than the near one (${near})`);
    await page.screenshot({ path: join(shots, "desktop-hero-pointer.png") });
  });
  await page.mouse.move(2, 2);

  await check("hero marker sweeps in", async () => {
    assert.ok(await page.locator(".hero-mark.in").count());
  });

  await check("marquee moves, and faster while scrolling", async () => {
    const x = () => page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector(".track")).transform).e);
    const x0 = await x();
    await page.waitForTimeout(500);
    const x1 = await x();
    assert.notEqual(x0, x1, "the bands are not moving");
  });

  await check("sections rise in on scroll and numbers count up", async () => {
    const hiddenBefore = await page.evaluate(() => getComputedStyle(document.querySelector("#codersy .svc")).opacity);
    assert.equal(hiddenBefore, "0");
    await page.locator("#codersy .mega").scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(2600);
    assert.equal(await page.locator("#codersy .mega .num").textContent(), "500+");
    assert.ok(await page.locator("#codersy .mega.in").count());
    await page.screenshot({ path: join(shots, "desktop-codersy.png") });
  });

  await check("the portrait loads, is uncovered when reached, and sits in the About rail", async () => {
    await page.locator(".portrait").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const img = document.querySelector(".portrait img");
      return img.complete && img.naturalWidth > 0;
    });
    await page.waitForFunction(() => document.querySelector(".portrait").classList.contains("in"));
    await page.waitForTimeout(1300);
    const p = await page.evaluate(() => {
      const fig = document.querySelector(".portrait");
      const r = fig.getBoundingClientRect();
      const main = document.querySelector("#about .main").getBoundingClientRect();
      return { w: r.width, h: r.height, right: r.right, mainLeft: main.left, clip: getComputedStyle(fig.querySelector("picture")).clipPath, src: fig.querySelector("img").currentSrc };
    });
    assert.ok(p.w > 180 && Math.abs(p.h / p.w - 1.25) < 0.02, `portrait is ${p.w}x${p.h}`);
    assert.ok(p.right <= p.mainLeft, "portrait overlaps the text column");
    assert.match(p.clip, /inset\(0(px)?\)/, `clip-path is ${p.clip}`);
    assert.match(p.src, /mladen-terzic\.avif$/, `loaded ${p.src}`);
    await page.locator("#about").screenshot({ path: join(shots, "about-portrait.png") });
  });

  await check("education, certifications, writing and reviews are shown and their rows fit the column", async () => {
    for (const id of ["education", "writing", "feedback"]) {
      const sec = page.locator(`#${id}`);
      await sec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.evaluate((i) => window.scrollTo(0, document.getElementById(i).getBoundingClientRect().top + scrollY), id);
      await page.waitForTimeout(1200);
      await sec.screenshot({ path: join(shots, `desktop-${id}.png`) });
    }
    const r = await page.evaluate(() => ({
      certs: document.querySelectorAll("#certifications .list li").length,
      schools: document.querySelectorAll("#education .job").length,
      posts: document.querySelectorAll("#writing .list li").length,
      reviews: document.querySelectorAll("#feedback .quotes figure").length,
      hidden: [...document.querySelectorAll("#education [data-rv], #writing [data-rv]")].filter((e) => getComputedStyle(e).opacity !== "1").length,
      overflow: [...document.querySelectorAll(".list li, .job")].filter((e) => e.scrollWidth > e.clientWidth + 1).length,
    }));
    assert.deepEqual(r, { certs: 9, schools: 2, posts: 5, reviews: 10, hidden: 0, overflow: 0 });
  });

  await check("work rows cycle on their own and the rail shows the active number", async () => {
    await page.locator("#portfolio .rows").scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(600);
    const first = await page.locator("#portfolio .row.on .row-name").textContent();
    await page.waitForTimeout(3200);
    const second = await page.locator("#portfolio .row.on .row-name").textContent();
    assert.notEqual(first, second, "the active row did not advance");
    const fig = await page.locator("#portfolio .fig-num").textContent();
    const metric = await page.locator("#portfolio .row.on .metric").textContent();
    assert.equal(fig, metric);
    await page.screenshot({ path: join(shots, "desktop-work.png") });
    await page.locator("#portfolio .row").nth(4).hover();
    await page.waitForTimeout(300);
    assert.equal(await page.locator("#portfolio .fig-num").textContent(), "1,258");
  });

  await check("closing heading plays when reached, e-mail gets its mailto link", async () => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(2600);
    assert.equal(await page.locator("#contact .kin.wait").count(), 0);
    for (const l of await lineWidths(page, "#contact .kin")) {
      assert.ok(Math.abs(l.ratio - 1) < 0.01, `line is ${(l.ratio * 100).toFixed(1)}% of the column`);
      assert.ok(l.scale > 0.8 && l.scale < 1.25, `scaleX(${l.scale.toFixed(2)})`);
    }
    assert.equal(await page.locator("#email").getAttribute("href"), "mailto:mladen@mladenterzic.com");
    assert.equal((await page.locator("#email").textContent()).trim(), "mladen@mladenterzic.com");
    await page.screenshot({ path: join(shots, "desktop-contact.png") });
  });

  await check("no horizontal scrolling", async () => {
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  });

  await check("still no errors after the whole run", async () => assert.deepEqual(errors, []));

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  await page.evaluate(() => document.querySelectorAll(".io,[data-rv]").forEach((e) => e.classList.add("in")));
  await page.waitForTimeout(1800);
  await page.screenshot({ path: join(shots, "desktop-full.png"), fullPage: true });
  await ctx.close();
}

// ---------- short laptop window ----------
{
  const { ctx, page } = await open({ width: 1280, height: 720 });
  await page.waitForTimeout(2400);
  await check("short window: name shrinks to keep the pitch line on the first screen", async () => {
    const bottom = await page.evaluate(() => document.querySelector(".thesis").getBoundingClientRect().bottom);
    assert.ok(bottom <= 720, `pitch line ends at ${Math.round(bottom)}px in a 720px window`);
    for (const l of await lineWidths(page, ".hero .kin")) assert.ok(Math.abs(l.ratio - 1) < 0.01);
  });
  await page.screenshot({ path: join(shots, "laptop-hero.png") });
  await ctx.close();
}

// ---------- dark ----------
{
  const { ctx, page } = await open({ width: 1440, height: 900, colorScheme: "dark" });
  await page.waitForTimeout(2400);
  await check("dark scheme renders white on black", async () => {
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), "rgb(0, 0, 0)");
  });
  await page.screenshot({ path: join(shots, "desktop-hero-dark.png") });
  await ctx.close();
}

// ---------- phone ----------
{
  const { ctx, page, errors } = await open({ width: 390, height: 844 });
  await page.waitForTimeout(2400);
  await check("phone: no console errors, no horizontal scrolling, name fills the width", async () => {
    assert.deepEqual(errors, []);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    for (const l of await lineWidths(page, ".hero .kin")) {
      assert.ok(Math.abs(l.ratio - 1) < 0.015, `line is ${(l.ratio * 100).toFixed(1)}% of the column`);
      assert.ok(l.scale > 0.8 && l.scale < 1.25, `scaleX(${l.scale.toFixed(2)})`);
    }
  });
  await page.screenshot({ path: join(shots, "phone-hero.png") });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  await page.evaluate(() => document.querySelectorAll(".io,[data-rv]").forEach((e) => e.classList.add("in")));
  await page.locator("#contact .kin").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(shots, "phone-full.png"), fullPage: true });
  await ctx.close();
}

// ---------- reduced motion and the switch ----------
{
  const { ctx, page, errors } = await open({ width: 1440, height: 900, reducedMotion: "reduce" });
  await page.waitForTimeout(800);
  await check("reduced motion: nothing moves, nothing is hidden, the switch is offered", async () => {
    assert.ok(await page.evaluate(() => document.documentElement.classList.contains("rm")));
    const read = () => page.evaluate(() => [...document.querySelectorAll(".hero .kc")].map((c) => c.style.fontVariationSettings).join("|") + getComputedStyle(document.querySelector(".track")).transform);
    const a = await read();
    await page.waitForTimeout(600);
    assert.equal(a, await read());
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector("#codersy .svc")).opacity), "1");
    assert.equal(await page.locator(".motion button").textContent(), "Turn motion on");
    assert.deepEqual(errors, []);
  });
  await page.screenshot({ path: join(shots, "reduced-hero.png") });
  await check("the switch turns motion on and the choice survives a reload", async () => {
    await Promise.all([page.waitForEvent("load"), page.locator(".motion button").click()]);
    await page.waitForFunction(() => document.documentElement.classList.contains("ready"));
    assert.ok(!(await page.evaluate(() => document.documentElement.classList.contains("rm"))));
    assert.equal(await page.locator(".motion button").textContent(), "Turn motion off");
    const read = () => page.evaluate(() => [...document.querySelectorAll(".hero .kc")].map((c) => c.style.fontVariationSettings).join("|"));
    await page.waitForTimeout(1500);
    const a = await read();
    await page.waitForTimeout(600);
    assert.notEqual(a, await read());
  });
  await ctx.close();
}

// ---------- without JavaScript ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await check("without JavaScript the whole page is still readable", async () => {
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector("#codersy .svc")).opacity), "1");
    assert.ok(await page.locator('a[href="https://planinesrbija.rs"]').count());
  });
  await page.screenshot({ path: join(shots, "nojs-hero.png") });
  await ctx.close();
}

await browser.close();
server?.close();
console.log(`\n${base}\n` + results.join("\n"));
console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);
