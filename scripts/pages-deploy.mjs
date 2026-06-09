import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const root = process.cwd();
const maxAttempts = 3;
const retryDelayMs = 15_000;
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT ?? "postquantumlabs-docs";

rmSync(path.join(root, ".wrangler"), { recursive: true, force: true });

const wranglerJs = path.join(root, "node_modules", "wrangler", "bin", "wrangler.js");
const args = [
  wranglerJs,
  "pages",
  "deploy",
  "dist",
  "--project-name",
  projectName,
  "--commit-dirty=true",
];

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  if (attempt > 1) {
    console.log(
      `\nCloudflare upload failed — retrying in ${retryDelayMs / 1000}s (attempt ${attempt}/${maxAttempts})...\n`,
    );
    await sleep(retryDelayMs);
  }

  try {
    execFileSync(process.execPath, args, {
      stdio: "inherit",
      cwd: root,
    });
    process.exit(0);
  } catch (error) {
    if (attempt === maxAttempts) {
      console.error(
        "\nPages deploy failed after multiple attempts. This is usually a transient Cloudflare API error during asset upload.",
      );
      throw error;
    }
  }
}
