<script setup lang="ts">
defineProps<{
  variant: "hero-field" | "constellation" | "folio-stack" | "fabric-mesh" | "footer-ledger";
  onDark?: boolean;
}>();
</script>

<template>
  <div class="section-backdrop" aria-hidden>
    <!-- hero-field -->
    <template v-if="variant === 'hero-field'">
      <div class="sb-hero-field-wash" />
      <div class="sb-hero-field-grid">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <line
            v-for="i in 14"
            :key="`v-${i}`"
            :x1="i * 7"
            y1="0"
            :x2="i * 7"
            y2="100"
            stroke="currentColor"
            stroke-width="0.1"
          />
          <line
            v-for="y in [20, 40, 60, 80]"
            :key="`h-${y}`"
            x1="0"
            :y1="y"
            x2="100"
            :y2="y"
            stroke="currentColor"
            stroke-width="0.06"
            opacity="0.7"
          />
        </svg>
      </div>
      <svg class="sb-hero-field-orbit" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="64" stroke="currentColor" stroke-width="0.75" />
        <circle cx="80" cy="80" r="44" stroke="currentColor" stroke-width="0.55" opacity="0.75" />
        <circle cx="80" cy="80" r="24" stroke="currentColor" stroke-width="0.45" opacity="0.55" />
      </svg>
    </template>

    <!-- constellation -->
    <template v-else-if="variant === 'constellation'">
      <div :class="['sb-constellation-wash', onDark && 'sb-constellation-wash--dark']" />
      <svg
        :class="['sb-constellation-svg', onDark && 'sb-constellation-svg--dark']"
        viewBox="0 0 400 300"
        fill="none"
      >
        <path
          d="M40 220 L120 180 L200 140 L280 100 L360 60"
          stroke="currentColor"
          stroke-width="0.6"
          opacity="0.45"
          stroke-dasharray="4 6"
        />
        <path d="M80 260 L160 200 L240 160" stroke="currentColor" stroke-width="0.5" opacity="0.35" />
        <circle
          v-for="[cx, cy] in [
            [40, 220], [120, 180], [200, 140], [280, 100], [360, 60],
            [80, 260], [160, 200], [240, 160], [320, 200],
          ]"
          :key="`${cx}-${cy}`"
          :cx="cx"
          :cy="cy"
          r="3"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    </template>

    <!-- folio-stack -->
    <template v-else-if="variant === 'folio-stack'">
      <div class="sb-folio-wash" />
      <svg class="sb-folio-stack" viewBox="0 0 280 360" fill="none">
        <rect x="24" y="48" width="200" height="260" rx="4" stroke="currentColor" stroke-width="0.8" opacity="0.45" />
        <rect x="40" y="32" width="200" height="260" rx="4" stroke="currentColor" stroke-width="0.75" opacity="0.6" />
        <rect x="56" y="16" width="200" height="260" rx="4" stroke="currentColor" stroke-width="0.85" />
        <line v-for="y in [72, 96, 120, 144]" :key="y" x1="72" :y1="y" x2="220" :y2="y" stroke="currentColor" stroke-width="0.45" opacity="0.35" />
      </svg>
      <svg class="sb-folio-cross" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="30" stroke="currentColor" stroke-width="0.6" />
        <path d="M40 16 L40 64 M16 40 L64 40" stroke="currentColor" stroke-width="0.5" opacity="0.5" />
      </svg>
    </template>

    <!-- fabric-mesh -->
    <template v-else-if="variant === 'fabric-mesh'">
      <div class="sb-fabric-wash" />
      <svg class="sb-fabric-mesh" viewBox="0 0 200 200" fill="none">
        <path d="M0 40 H200 M0 80 H200 M0 120 H200 M0 160 H200" stroke="currentColor" stroke-width="0.35" opacity="0.35" />
        <path d="M40 0 V200 M80 0 V200 M120 0 V200 M160 0 V200" stroke="currentColor" stroke-width="0.35" opacity="0.35" />
      </svg>
    </template>

    <!-- footer-ledger -->
    <template v-else-if="variant === 'footer-ledger'">
      <svg class="sb-footer-ledger" viewBox="0 0 400 120" fill="none" preserveAspectRatio="none">
        <path d="M0 60 H400" stroke="currentColor" stroke-width="0.5" opacity="0.2" />
        <path d="M0 30 H400" stroke="currentColor" stroke-width="0.35" opacity="0.12" />
        <path d="M0 90 H400" stroke="currentColor" stroke-width="0.35" opacity="0.12" />
      </svg>
    </template>
  </div>
</template>
