// Renders scripts/pitch/pitch.html to public/stixnvibes-stall-pitch.pdf.
// Needs Playwright with Chromium: `npx playwright install chromium` once, or
// set CHROMIUM_PATH to an existing Chromium binary.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "../../public/stixnvibes-stall-pitch.pdf");

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await page.goto(`file://${path.join(here, "pitch.html")}`);
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, format: "A4", printBackground: true });
if (process.argv.includes("--png")) await page.screenshot({ path: out.replace(/\.pdf$/, ".png"), fullPage: true });
await browser.close();
console.log(`Wrote ${out}`);
