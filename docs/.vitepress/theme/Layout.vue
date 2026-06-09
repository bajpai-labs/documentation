<script setup lang="ts">
import { computed } from "vue";
import DefaultLayout from "vitepress/dist/client/theme-default/Layout.vue";
import { useData, useRoute } from "vitepress";

import DocPageHero from "../components/DocPageHero.vue";
import DocsFooter from "../components/DocsFooter.vue";
import DocsNav from "../components/DocsNav.vue";
import { DOC_PROJECTS } from "../projects";
import Home from "./Home.vue";

const { frontmatter } = useData();
const route = useRoute();

const isHome = computed(() => frontmatter.value.layout === "home");

const projectMeta = computed(() => {
  for (const project of DOC_PROJECTS) {
    if (route.path.includes(`/${project.slug}`)) return project;
  }
  return null;
});

const docHeroTitle = computed(() => String(frontmatter.value.docHeroTitle ?? ""));
const docHeroDescription = computed(() => frontmatter.value.docHeroDescription as string | undefined);
</script>

<template>
  <Home v-if="isHome" />

  <div
    v-else
    class="bl-docs-layout"
    :class="{ 'bl-docs-layout--project': !!projectMeta }"
    :data-project="projectMeta?.slug"
  >
    <DocsNav />
    <DefaultLayout>
      <template #doc-top>
        <DocPageHero
          v-if="projectMeta && docHeroTitle"
          :project="projectMeta"
          :title="docHeroTitle"
          :description="docHeroDescription"
        />
      </template>
    </DefaultLayout>
    <DocsFooter />
  </div>
</template>
