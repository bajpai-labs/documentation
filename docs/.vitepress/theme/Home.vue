<script setup lang="ts">
import { withBase } from "vitepress";

import DocsFooter from "../components/DocsFooter.vue";
import DocsNav from "../components/DocsNav.vue";
import PageSection from "../components/PageSection.vue";
import ProjectCard from "../components/ProjectCard.vue";
import SectionBackdrop from "../components/SectionBackdrop.vue";
import { DOC_PROJECTS } from "../projects";

const quickLinks = [
  { label: "Quickstart", href: withBase("/vortex-pqc/getting-started"), note: "Install and first key exchange" },
  { label: "Overview", href: withBase("/vortex-pqc/overview"), note: "What VORTEX-256 is and why" },
  { label: "Integration guide", href: withBase("/vortex-pqc/guides-key-exchange"), note: "Wire into a real protocol" },
  { label: "API reference", href: withBase("/vortex-pqc/api-reference"), note: "Python and C API" },
  { label: "Security model", href: withBase("/vortex-pqc/security"), note: "Threat model and responsible use" },
  { label: "FAQ", href: withBase("/vortex-pqc/faq"), note: "Common questions" },
];

const syncRows = [
  {
    source: "bajpai-labs/vortex-pqc",
    sourceUrl: "https://github.com/bajpai-labs/vortex-pqc",
    dest: "docs/vortex-pqc/",
    liveUrl: withBase("/vortex-pqc/"),
  },
  {
    source: "bajpai-labs/kyber-pqc",
    sourceUrl: "https://github.com/bajpai-labs/kyber-pqc",
    dest: "docs/kyber-pqc/",
    liveUrl: withBase("/kyber-pqc/"),
  },
];
</script>

<template>
  <div class="bl-docs-home" data-page-identity="docs-portal">
    <DocsNav />

    <section class="oss-registry-hero section-tone-charcoal-deep" aria-label="Documentation portal hero">
      <div class="section-grid-overlay section-grid-overlay--dark" aria-hidden />
      <SectionBackdrop variant="constellation" :on-dark="true" class="sb-fade" />
      <div class="hero-gold-flow" aria-hidden />

      <div class="section-inner pt-nav-offset oss-registry-hero__body">
        <div class="oss-registry-hero__split">
          <div class="oss-registry-hero__charter">
            <p class="eyebrow">Post Quantum Labs · Open-source docs</p>
            <h1 class="text-h1">
              Documentation that
              <span class="gold-gradient">ships from research</span>
            </h1>
            <p class="oss-registry-hero__lede">
              Primary source of documentation for Bajpai Labs post-quantum cryptography projects.
              Synced automatically from each project's CI pipeline on every main-branch update.
            </p>
            <ul class="oss-registry-hero__chips" aria-label="Registry signals">
              <li v-for="chip in ['CI-synced', 'Mermaid diagrams', 'Production APIs']" :key="chip">{{ chip }}</li>
            </ul>
            <div class="oss-registry-hero__actions">
              <a :href="withBase('/vortex-pqc/')" class="page-hero__btn-primary">VORTEX-256 docs</a>
              <a href="https://bajpailabs.com/open-source" class="page-hero__btn-secondary" target="_blank" rel="noopener">
                Open-source catalog
              </a>
            </div>
          </div>

          <aside class="oss-registry-hero__terminal">
            <div class="oss-registry-hero__terminal-top" aria-hidden />
            <SectionBackdrop variant="constellation" :on-dark="true" class="sb-terminal-bg" />
            <div class="oss-registry-hero__terminal-inner">
              <div class="oss-registry-hero__terminal-head">
                <p class="eyebrow">Manifest</p>
                <span class="oss-registry-hero__manifest-id">PQL-DOCS-2026</span>
              </div>
              <div class="oss-registry-hero__stats">
                <div class="oss-registry-stat-cell">
                  <div class="stat-number">{{ DOC_PROJECTS.length }}</div>
                  <p>Projects</p>
                </div>
                <div class="oss-registry-stat-cell">
                  <div class="stat-number">2</div>
                  <p>PQC lanes</p>
                </div>
              </div>
              <div class="oss-registry-hero__terminal-code">
                <p class="cmd">$ pip install vortex-pqc</p>
                <p class="dim"># kyber-pqc</p>
                <p class="dim mt">→ postquantumlabs.com/docs/&lt;project&gt;</p>
              </div>
              <div class="oss-registry-hero__terminal-foot">
                <a href="https://pypi.org/user/bajpai__krishna/" target="_blank" rel="noopener">PyPI channel</a>
                <a href="https://github.com/bajpai-labs/documentation" target="_blank" rel="noopener">GitHub</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <PageSection tone="parchment" backdrop="folio-stack" compact>
      <div class="section-header">
        <div>
          <p class="eyebrow">Flagship releases</p>
          <h2 class="text-h2">Start with the lab's anchor packages</h2>
        </div>
        <p class="section-header__aside">
          VORTEX-256 and Kyber-PQC — the same names behind research and client deployments.
        </p>
      </div>
      <ul class="project-grid">
        <ProjectCard
          v-for="(project, i) in DOC_PROJECTS"
          :key="project.slug"
          :project="project"
          :index="i"
        />
      </ul>
    </PageSection>

    <PageSection tone="vellum" backdrop="fabric-mesh" compact>
      <div class="section-header section-header--center">
        <p class="eyebrow">Publication pipeline</p>
        <h2 class="text-h2">How docs are published</h2>
        <p class="section-header__lede">
          Each project repo pushes doc changes here via GitHub Actions. This site rebuilds on every push to main.
        </p>
      </div>
      <div class="sync-table-wrap">
        <table class="sync-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Live URL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in syncRows" :key="row.source">
              <td>
                <a :href="row.sourceUrl" target="_blank" rel="noopener">{{ row.source }}</a>
              </td>
              <td><code>{{ row.dest }}</code></td>
              <td><a :href="row.liveUrl">{{ row.liveUrl }}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageSection>

    <PageSection tone="parchment-2" compact>
      <div class="section-header">
        <div>
          <p class="eyebrow">VORTEX-256</p>
          <h2 class="text-h2">Quick links</h2>
        </div>
      </div>
      <ul class="quick-links">
        <li v-for="link in quickLinks" :key="link.href">
          <a :href="link.href" class="quick-links__item">
            <span class="quick-links__label">{{ link.label }}</span>
            <span class="quick-links__note">{{ link.note }}</span>
          </a>
        </li>
      </ul>
    </PageSection>

    <DocsFooter />
  </div>
</template>
