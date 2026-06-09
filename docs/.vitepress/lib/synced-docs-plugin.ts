import type MarkdownIt from "markdown-it";

import { preprocessSyncedDocs } from "./preprocess-synced-docs";

/** Markdown-it plugin: clean + sectionize synced project docs before render. */
export function syncedDocsPlugin(md: MarkdownIt): void {
  const render = md.render.bind(md);
  md.render = (src, env = {}) => {
    const id = String(env.relativePath ?? env.path ?? "");
    const next = preprocessSyncedDocs(src, id);
    return render(next, env);
  };
}
