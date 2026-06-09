import { stripGithubChrome } from "./strip-github-chrome";
import { wrapDocSections } from "./wrap-doc-sections";

export function preprocessSyncedDocs(markdown: string, fileId: string): string {
  let content = stripGithubChrome(markdown, fileId);
  content = wrapDocSections(content, fileId);
  return content;
}
