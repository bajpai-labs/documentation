<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, withBase } from "vitepress";

import { DOC_PROJECTS } from "../projects";

const route = useRoute();
const scrolled = ref(false);
const mobileOpen = ref(false);

const liveProjects = DOC_PROJECTS.filter((p) => p.status === "live");

function onScroll() {
  scrolled.value = window.scrollY > 16;
}

function closeMobile() {
  mobileOpen.value = false;
}

function isActive(prefix: string) {
  return route.path.startsWith(prefix);
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header :class="['glass-nav docs-nav', scrolled && 'glass-nav--scrolled']">
    <div class="docs-nav__inner">
      <a :href="withBase('/')" class="docs-nav__brand" @click="closeMobile">
        <span class="docs-nav__logo-wrap">
          <picture>
            <source :srcset="withBase('/logo-nav.webp')" type="image/webp" />
            <img :src="withBase('/logo-nav.png')" width="36" height="36" alt="Bajpai Labs" />
          </picture>
        </span>
        <span class="docs-nav__title gold-text">Bajpai Labs</span>
      </a>

      <nav class="docs-nav__links" aria-label="Documentation">
        <a :href="withBase('/')" :class="['hero-nav-link', route.path === '/' || route.path === '/index.html' ? 'is-active' : '']">
          Docs home
        </a>
        <a
          v-for="project in liveProjects"
          :key="project.slug"
          :href="withBase(`/${project.slug}/`)"
          :class="['hero-nav-link', isActive(`/${project.slug}`) && 'is-active']"
        >
          {{ project.title }}
        </a>
        <a href="https://bajpailabs.com" class="hero-nav-link" target="_blank" rel="noopener">
          bajpailabs.com
        </a>
      </nav>

      <div class="docs-nav__actions">
        <a
          href="https://github.com/bajpai-labs/documentation"
          class="docs-nav__cta"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        <button
          type="button"
          class="docs-nav__menu-btn"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span v-if="mobileOpen">✕</span>
          <span v-else>☰</span>
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="docs-nav__drawer">
      <nav aria-label="Mobile documentation">
        <a :href="withBase('/')" class="docs-nav__drawer-link" @click="closeMobile">Docs home</a>
        <a
          v-for="project in liveProjects"
          :key="project.slug"
          :href="withBase(`/${project.slug}/`)"
          class="docs-nav__drawer-link"
          @click="closeMobile"
        >
          {{ project.title }}
        </a>
        <a href="https://bajpailabs.com" class="docs-nav__drawer-link" target="_blank" rel="noopener" @click="closeMobile">
          bajpailabs.com
        </a>
        <a
          href="https://github.com/bajpai-labs/documentation"
          class="docs-nav__drawer-link"
          target="_blank"
          rel="noopener"
          @click="closeMobile"
        >
          GitHub
        </a>
      </nav>
    </div>
  </header>
</template>
