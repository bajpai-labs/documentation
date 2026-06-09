import type { DefaultTheme } from "vitepress";

export type DocProject = {
  slug: string;
  title: string;
  badge?: string;
  description: string;
  github: string;
  pypi?: string;
  status: "live" | "coming-soon";
  sidebar: DefaultTheme.SidebarItem[];
};

/** Registry of synced open-source project documentation. */
export const DOC_PROJECTS: DocProject[] = [
  {
    slug: "vortex-pqc",
    title: "VORTEX-256",
    badge: "Research preview",
    description: "Novel post-quantum KEM built on Rotational Module Learning With Errors (RotMLWE).",
    github: "https://github.com/bajpai-labs/vortex-pqc",
    pypi: "https://pypi.org/project/vortex-pqc/",
    status: "live",
    sidebar: [
      {
        text: "Start here",
        collapsed: false,
        items: [
          { text: "Documentation home", link: "/vortex-pqc/" },
          { text: "Quickstart", link: "/vortex-pqc/getting-started" },
          { text: "Overview", link: "/vortex-pqc/overview" },
          { text: "Integration guide", link: "/vortex-pqc/guides-key-exchange" },
          { text: "Core concepts", link: "/vortex-pqc/concepts" },
          { text: "Security model", link: "/vortex-pqc/security" },
        ],
      },
      {
        text: "Learn",
        collapsed: false,
        items: [
          { text: "Cryptography deep dive", link: "/vortex-pqc/cryptography" },
          { text: "Comparison guide", link: "/vortex-pqc/comparison" },
          { text: "Glossary", link: "/vortex-pqc/glossary" },
        ],
      },
      {
        text: "Build",
        collapsed: false,
        items: [
          { text: "Key management", link: "/vortex-pqc/guides-key-management" },
          { text: "Python guide", link: "/vortex-pqc/guides-python" },
          { text: "C library guide", link: "/vortex-pqc/guides-c-library" },
          { text: "Performance", link: "/vortex-pqc/performance" },
        ],
      },
      {
        text: "Reference",
        collapsed: false,
        items: [
          { text: "API reference", link: "/vortex-pqc/api-reference" },
          { text: "PEM format", link: "/vortex-pqc/pem-format" },
          { text: "Troubleshooting", link: "/vortex-pqc/troubleshooting" },
          { text: "FAQ", link: "/vortex-pqc/faq" },
        ],
      },
      {
        text: "Contribute",
        collapsed: true,
        items: [
          { text: "Architecture", link: "/vortex-pqc/architecture" },
          { text: "Development guide", link: "/vortex-pqc/development" },
        ],
      },
    ],
  },
  {
    slug: "kyber-pqc",
    title: "Kyber-PQC",
    description: "ML-KEM-512 (Kyber-512) implementation.",
    github: "https://github.com/bajpai-labs/kyber-pqc",
    status: "coming-soon",
    sidebar: [
      {
        text: "Kyber-PQC",
        items: [{ text: "Coming soon", link: "/kyber-pqc/" }],
      },
    ],
  },
];

export function projectSidebars(): DefaultTheme.Sidebar {
  const sidebars: DefaultTheme.Sidebar = {
    "/": [
      {
        text: "Projects",
        items: DOC_PROJECTS.map((project) => ({
          text: project.title,
          link: `/${project.slug}/`,
        })),
      },
    ],
  };

  for (const project of DOC_PROJECTS) {
    sidebars[`/${project.slug}/`] = project.sidebar;
  }

  return sidebars;
}
