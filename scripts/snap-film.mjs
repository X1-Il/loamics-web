// Renders one still per film scene via the ?t= deep link.
import { chromium } from "playwright-core";
const [, , base = "http://localhost:3000", out = "qa", ...times] = process.argv;
const ts = times.length ? times.map(Number) : [2.5, 7, 12, 17, 22.5, 28, 33.5, 37, 42];
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
for (const t of ts) {
  await page.goto(`${base}${process.env.FILM_PATH ?? "/film"}?t=${t}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await page.locator("canvas").screenshot({ path: `${out}/film-${String(t).replace(".", "_")}.png` });
  console.log("film", t);
}
await browser.close();
