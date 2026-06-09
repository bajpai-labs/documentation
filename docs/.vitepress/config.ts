import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

import { resolveSyncedPageMeta } from "./lib/doc-pages-meta";
import { syncedDocsPlugin } from "./lib/synced-docs-plugin";
import { DOC_PROJECTS, projectSidebars } from "./projects";

const SITE_ORIGIN = "https://postquantumlabs.com";
const BAJPAI_LABS_ORIGIN = "https://bajpailabs.com";

export default withMermaid(
  defineConfig({
    title: "Post Quantum Labs",
    titleTemplate: ":title · Bajpai Labs Docs",
    description:
      "Open-source post-quantum cryptography documentation from Bajpai Labs — VORTEX-256, Kyber-PQC, and more.",
    lang: "en-US",
    base: "/docs/",
    srcDir: ".",
    cleanUrls: true,
    lastUpdated: true,
    appearance: false,

    rewrites: {
      "vortex-pqc/README.md": "vortex-pqc/index.md",
    },

    head: [
      ["link", { rel: "icon", href: "/docs/favicon-32.png", type: "image/png", sizes: "32x32" }],
      ["link", { rel: "icon", href: "/docs/favicon.ico", sizes: "any" }],
      ["link", { rel: "apple-touch-icon", href: "/docs/logo-192.png", sizes: "192x192" }],
      [
        "link",
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
      ],
      [
        "link",
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
      ["meta", { name: "theme-color", content: "#b8860b" }],
      ["meta", { property: "og:site_name", content: "Post Quantum Labs" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { name: "author", content: "Bajpai Labs" }],
    ],

    themeConfig: {
      logo: { src: "/logo-nav.png", width: 36, height: 36 },
      siteTitle: "Bajpai Labs",
      outline: { level: [2, 3] },
      search: { provider: "local" },
      nav: [],

      sidebar: projectSidebars(),

      socialLinks: [
        { icon: "github", link: "https://github.com/bajpai-labs" },
      ],

      footer: {
        message: `MIT © <a href="${BAJPAI_LABS_ORIGIN}">Bajpai Labs</a> · Post-quantum open source`,
        copyright: `Published at <a href="${SITE_ORIGIN}/docs/">${SITE_ORIGIN}/docs</a>`,
      },

      editLink: {
        pattern:
          "https://github.com/bajpai-labs/documentation/edit/main/docs/:path",
        text: "Edit this page on GitHub",
      },
    },

    transformPageData(pageData) {
      pageData.frontmatter.head ??= [];
      const canonical = `${SITE_ORIGIN}/docs${pageData.relativePath.replace(/index\.md$/, "").replace(/\.md$/, "").replace(/\/$/, "")}`;
      pageData.frontmatter.head.push([
        "link",
        { rel: "canonical", href: canonical },
      ]);

      const pageMeta = resolveSyncedPageMeta(pageData.relativePath);
      if (pageMeta) {
        pageData.title = pageMeta.title;
        pageData.frontmatter.docHeroTitle = pageMeta.title;
        if (pageMeta.description) {
          pageData.frontmatter.docHeroDescription = pageMeta.description;
        }
        // Let DocPageHero own the visible title — body starts at first ## section.
        pageData.frontmatter.title = "";
      }
    },

    mermaid: {
      theme: "base",
      themeVariables: {
        primaryColor: "#f5edd8",
        primaryTextColor: "#16120a",
        primaryBorderColor: "#b8860b",
        lineColor: "#3a3834",
        secondaryColor: "#ede0c0",
        tertiaryColor: "#fdfbf5",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      },
    },

    markdown: {
      theme: "github-light",
      lineNumbers: true,
      config(md) {
        md.use(syncedDocsPlugin);
      },
    },
  }),
);
