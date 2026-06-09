/**
 * Removes GitHub-README chrome from synced project markdown so VitePress
 * can own the page hero, nav, and typography.
 */
export function stripGithubChrome(markdown: string, fileId: string): string {
  if (!/(^|\/)(vortex-pqc|kyber-pqc)\//.test(fileId.replace(/\\/g, "/"))) {
    return markdown;
  }

  let content = markdown;

  // Drop centered blocks that are GitHub-only chrome (badges, nav, taglines).
  content = content.replace(/<p\s+align="center">[\s\S]*?<\/p>\s*/gi, (block) => {
    if (block.includes("img.shields.io")) return "";
    if (block.includes('href="README') || block.includes("← Documentation")) return "";
    if (block.includes("<strong>") || block.includes("<sub>")) return "";
    if (block.includes("Didn't find your answer")) return "";
    return block;
  });

  content = content.replace(/<h1\s+align="center">[\s\S]*?<\/h1>\s*/gi, "");

  // Any remaining centered paragraphs (taglines, footers)
  content = content.replace(/<p\s+align="center">[\s\S]*?<\/p>\s*/gi, "");

  content = content.replace(/^<br\s*\/?>\s*$/gim, "");

  return content.trimStart();
}
