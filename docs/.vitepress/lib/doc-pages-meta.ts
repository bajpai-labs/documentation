export type DocPageMeta = {
  title: string;
  description?: string;
};

/** Page-level hero copy for synced vortex-pqc docs (source of truth for the site shell). */
export const VORTEX_PAGE_META: Record<string, DocPageMeta> = {
  index: {
    title: "VORTEX-256",
    description:
      "The post-quantum KEM built on Rotational Module Learning With Errors — install in 60 seconds, integrate in 15 minutes.",
  },
  "getting-started": {
    title: "Getting Started",
    description: "Install vortex-pqc, run your first key exchange, and save keys as PEM files in under five minutes.",
  },
  overview: {
    title: "Overview",
    description: "What VORTEX-256 is, why RotMLWE matters, and how it compares to ML-KEM for practitioners.",
  },
  "guides-key-exchange": {
    title: "Key Exchange Guide",
    description: "Wire VORTEX-256 into a real client–server protocol with serialization and session keys.",
  },
  concepts: {
    title: "Core Concepts",
    description: "KEM primitives, RotMLWE, Frobenius orbits, and implicit rejection explained clearly.",
  },
  security: {
    title: "Security Model",
    description: "Threat model, guarantees, limitations, and responsible use before any production evaluation.",
  },
  cryptography: {
    title: "Cryptography Deep Dive",
    description: "Full mathematical specification, algorithms, and correctness argument for VORTEX-256.",
  },
  comparison: {
    title: "Comparison Guide",
    description: "How VORTEX-256 positions against ML-KEM, NTRU, and other lattice KEM families.",
  },
  glossary: {
    title: "Glossary",
    description: "Terms and notation used across the VORTEX-256 documentation.",
  },
  "guides-key-management": {
    title: "Key Management",
    description: "PEM files, rotation, storage, permissions, and operational key hygiene.",
  },
  "guides-python": {
    title: "Python Guide",
    description: "Package API patterns, backends, error handling, and production integration notes.",
  },
  "guides-c-library": {
    title: "C Library Guide",
    description: "Static linking, headers, memory safety, and embedding the native implementation.",
  },
  performance: {
    title: "Performance",
    description: "Benchmarks, native vs pure Python, and optimization guidance.",
  },
  "api-reference": {
    title: "API Reference",
    description: "Every Python and C function, types, and constants in vortex-pqc.",
  },
  "pem-format": {
    title: "PEM Format",
    description: "Encoding specification for VORTEX keys and ciphertexts on the wire.",
  },
  troubleshooting: {
    title: "Troubleshooting",
    description: "Common errors, diagnostics, and a practical debug playbook.",
  },
  faq: {
    title: "FAQ",
    description: "Frequently asked questions about VORTEX-256, packaging, and adoption.",
  },
  architecture: {
    title: "Architecture",
    description: "Repository layout, backends, CI/CD, and how documentation syncs to this site.",
  },
  development: {
    title: "Development Guide",
    description: "Local setup, testing, linting, releases, and contributing to vortex-pqc.",
  },
};

export function resolveSyncedPageMeta(relativePath: string): DocPageMeta | null {
  const normalized = relativePath.replace(/\\/g, "/");
  const match = normalized.match(/(?:vortex-pqc|kyber-pqc)\/(.+)\.md$/);
  if (!match) return null;

  let key = match[1];
  if (key === "README") key = "index";
  if (key.endsWith("/README")) key = key.replace("/README", "/index");
  if (key.endsWith("/index")) key = key.replace("/index", "") || "index";

  if (normalized.includes("vortex-pqc/")) {
    return VORTEX_PAGE_META[key] ?? humanizePageKey(key);
  }

  if (normalized.includes("kyber-pqc/")) {
    return key === "index"
      ? { title: "Kyber-PQC", description: "ML-KEM-512 (Kyber-512) implementation documentation." }
      : humanizePageKey(key);
  }

  return null;
}

function humanizePageKey(key: string): DocPageMeta {
  const title = key
    .split("/")
    .pop()!
    .replace(/^guides-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { title };
}
