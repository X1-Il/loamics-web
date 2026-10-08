// Visual QA: full-page screenshots of every route at desktop and mobile widths.
// Usage: node scripts/snap.mjs [baseUrl] [outDir] [route...]
// Uses the locally installed Chrome (no browser download).
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const [, , base = "http://localhost:3000", out = "qa", ...only] = process.argv;
const routes = only.length
  ? only
  : [
      "/",
      "/software",
      "/software/data-collect",
      "/software/datalake",
      "/software/algoengine",
      "/industries/healthcare-industry",
      "/augmented-analytics-business-intelligence-bi",
      "/film",
      "/contact",
      "/brand",
      "/legal-notice",
    ];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const errors = [];
for (const vp of viewports) {
  // Reduced motion: reveal animations resolve instantly so full-page shots are complete.
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: "reduce", deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp.name} ${page.url()}: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`${vp.name} ${page.url()}: ${m.text().slice(0, 300)}`));
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const file = `${out}/${vp.name}${r === "/" ? "-home" : r.replaceAll("/", "-")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`${file}${overflow > 0 ? `  !! horizontal overflow ${overflow}px` : ""}`);
  }
  await ctx.close();
}
await browser.close();
if (errors.length) {
  console.log("\nConsole/page errors:");
  for (const e of [...new Set(errors)]) console.log(" -", e);
}
