<script setup lang="ts">
import SectionBackdrop from "./SectionBackdrop.vue";

defineProps<{
  id?: string;
  tone?: "vellum" | "parchment" | "parchment-2" | "charcoal-deep";
  backdrop?: "hero-field" | "constellation" | "folio-stack" | "fabric-mesh" | "footer-ledger";
  compact?: boolean;
  onDark?: boolean;
}>();
</script>

<template>
  <section
    :id="id"
    :class="[
      'homepage-section',
      tone && `section-tone-${tone}`,
      backdrop && 'homepage-section--has-backdrop',
      compact && 'homepage-section--compact',
      onDark && 'homepage-section--dark',
    ]"
  >
    <div
      :class="[
        'section-grid-overlay',
        onDark ? 'section-grid-overlay--dark' : 'section-grid-overlay--light',
      ]"
      aria-hidden
    />
    <SectionBackdrop v-if="backdrop" :variant="backdrop" :on-dark="onDark" />
    <div class="section-inner">
      <slot />
    </div>
  </section>
</template>
