import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:4173/docs/vortex-pqc/overview";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`PAGE: ${e.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`CONSOLE: ${msg.text()}`);
});
page.on("requestfailed", (req) => {
  errors.push(`FAILED: ${req.url()} — ${req.failure()?.errorText}`);
});

await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(4000);

const appLen = (await page.locator("#app").innerHTML()).length;
const mermaidBlocks = page.locator(".mermaid");
const count = await mermaidBlocks.count();
let svgCount = 0;
for (let i = 0; i < count; i++) {
  const html = await mermaidBlocks.nth(i).innerHTML();
  if (html.includes("<svg")) svgCount++;
}

console.log("URL:", url);
console.log("App HTML length:", appLen);
console.log("Mermaid blocks:", count, "with SVG:", svgCount);
if (errors.length) console.log("Errors:\n" + errors.join("\n"));

await browser.close();
