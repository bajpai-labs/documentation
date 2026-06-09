<script setup lang="ts">
import { computed } from "vue";
import { useRoute, withBase } from "vitepress";

import type { DocProject } from "../projects";
import SectionBackdrop from "./SectionBackdrop.vue";

const props = defineProps<{
  project: DocProject;
  title: string;
  description?: string;
}>();

const route = useRoute();

const prevNext = computed(() => {
  const flat: { text: string; link: string }[] = [];
  for (const group of props.project.sidebar) {
    const items = group.items ?? [];
    for (const item of items) {
      if (item.link) flat.push({ text: String(item.text), link: item.link });
    }
  }

  const path = route.path.replace(/\/$/, "") || "/";
  const idx = flat.findIndex((item) => {
    const itemPath = item.link.replace(/\/$/, "");
    return path === itemPath || path.endsWith(itemPath);
  });

  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
});
</script>

<template>
  <section class="doc-page-hero section-tone-vellum" :aria-label="`${title} — ${project.title}`">
    <div class="section-grid-overlay section-grid-overlay--light" aria-hidden />
    <SectionBackdrop variant="hero-field" />
    <div class="hero-gold-flow" aria-hidden />

    <div class="section-inner doc-page-hero__inner">
      <nav class="doc-page-hero__crumb" aria-label="Breadcrumb">
        <a :href="withBase('/')">Docs</a>
        <span aria-hidden>/</span>
        <a :href="withBase(`/${project.slug}/`)">{{ project.title }}</a>
        <span aria-hidden>/</span>
        <span>{{ title }}</span>
      </nav>

      <p class="eyebrow">{{ project.badge ?? project.title }}</p>
      <h1 class="text-h1 text-h1--doc">{{ title }}</h1>
      <p v-if="description" class="doc-page-hero__lede">{{ description }}</p>

      <div v-if="prevNext.prev || prevNext.next" class="doc-page-hero__pager">
        <a
          v-if="prevNext.prev"
          :href="withBase(prevNext.prev.link)"
          class="doc-page-hero__pager-link doc-page-hero__pager-link--prev"
        >
          <span class="doc-page-hero__pager-label">Previous</span>
          <span class="doc-page-hero__pager-title">{{ prevNext.prev.text }}</span>
        </a>
        <a
          v-if="prevNext.next"
          :href="withBase(prevNext.next.link)"
          class="doc-page-hero__pager-link doc-page-hero__pager-link--next"
        >
          <span class="doc-page-hero__pager-label">Next</span>
          <span class="doc-page-hero__pager-title">{{ prevNext.next.text }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
