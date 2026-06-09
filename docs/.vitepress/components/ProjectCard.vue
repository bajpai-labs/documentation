<script setup lang="ts">
import { withBase } from "vitepress";

import type { DocProject } from "../projects";

defineProps<{
  project: DocProject;
  index: number;
}>();
</script>

<template>
  <li class="oss-featured-release">
    <span class="oss-featured-release__index">Release 0{{ index + 1 }}</span>
    <a
      v-if="project.status === 'live'"
      :href="withBase(`/${project.slug}/`)"
      class="oss-featured-release__title"
    >
      {{ project.title }}
    </a>
    <span v-else class="oss-featured-release__title oss-featured-release__title--muted">
      {{ project.title }}
    </span>
    <p v-if="project.badge" class="oss-featured-release__badge">{{ project.badge }}</p>
    <p class="oss-featured-release__desc">{{ project.description }}</p>
    <p v-if="project.status === 'live'" class="oss-featured-release__pip">
      pip install {{ project.slug }}
    </p>
    <p v-else class="oss-featured-release__pip oss-featured-release__pip--muted">Documentation syncing soon</p>
    <div class="oss-featured-release__links">
      <a :href="project.github" target="_blank" rel="noopener">GitHub</a>
      <a v-if="project.pypi" :href="project.pypi" target="_blank" rel="noopener">PyPI</a>
      <a v-if="project.status === 'live'" :href="withBase(`/${project.slug}/`)">Read docs →</a>
    </div>
  </li>
</template>
