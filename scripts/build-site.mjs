import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const root = process.cwd();
const vitepressDist = path.join(root, "docs", ".vitepress", "dist");
const outDir = path.join(root, "dist");

const rootRedirectHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Post Quantum Labs · Bajpai Labs</title>
    <link rel="icon" href="/docs/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="icon" href="/docs/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/docs/logo-192.png" sizes="192x192" />
    <meta http-equiv="refresh" content="0; url=/docs/" />
    <link rel="canonical" href="https://postquantumlabs.com/docs/" />
    <script>location.replace("/docs/");</script>
  </head>
  <body>
    <p>Redirecting to <a href="/docs/">documentation</a>…</p>
  </body>
</html>
`;

async function main() {
  if (!existsSync(vitepressDist)) {
    console.error("Missing VitePress output. Run: vitepress build docs");
    process.exit(1);
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(outDir, "docs"), { recursive: true });

  await cp(vitepressDist, path.join(outDir, "docs"), { recursive: true });
  await writeFile(path.join(outDir, "index.html"), rootRedirectHtml, "utf8");

  console.log("Site bundle ready:");
  console.log("  dist/index.html       → redirects to /docs/");
  console.log("  dist/docs/            → VitePress documentation site");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
