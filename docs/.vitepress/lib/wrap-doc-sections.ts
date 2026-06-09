const PROJECT_DOC = /(^|\/)(vortex-pqc|kyber-pqc)\//;

/**
 * Wrap each ## section in a full-bleed band (vellum / parchment alternation)
 * so long doc pages match the website's section rhythm.
 */
export function wrapDocSections(markdown: string, fileId: string): string {
  if (!PROJECT_DOC.test(fileId.replace(/\\/g, "/"))) {
    return markdown;
  }

  const lines = markdown.split("\n");
  const chunks: string[] = [];
  let inFence = false;
  let buffer: string[] = [];
  let sectionCount = 0;

  const pushChunk = () => {
    const content = buffer.join("\n").trim();
    buffer = [];
    if (!content) return;
    const tone = sectionCount % 2 === 0 ? "vellum" : "parchment";
    sectionCount += 1;
    chunks.push(
      `<section class="doc-section doc-section--${tone}">`,
      "",
      '<div class="doc-section__inner">',
      "",
      content,
      "",
      "</div>",
      "",
      "</section>",
    );
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      buffer.push(line);
      continue;
    }

    if (!inFence && /^## /.test(line)) {
      pushChunk();
      buffer.push(line);
      continue;
    }

    buffer.push(line);
  }

  pushChunk();

  return chunks.join("\n");
}
