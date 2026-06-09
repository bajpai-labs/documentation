<template>
  <footer class="site-footer">
    <SectionBackdrop variant="footer-ledger" />
    <div class="section-grid-overlay section-grid-overlay--light" aria-hidden />
    <div class="section-inner site-footer__inner">
      <div class="site-footer__grid">
        <div>
          <a :href="withBase('/')" class="site-footer__brand">
            <img :src="withBase('/logo-nav.png')" width="32" height="32" alt="" class="site-footer__logo" />
            <span>Bajpai Labs</span>
          </a>
          <p class="site-footer__tagline">
            Post-quantum cryptography documentation from Bajpai Labs. Synced from open-source project repos.
          </p>
        </div>
        <div>
          <p class="site-footer__label">Documentation</p>
          <nav class="site-footer__nav">
            <a :href="withBase('/')">Portal</a>
            <a :href="withBase('/vortex-pqc/')">VORTEX-256</a>
            <a :href="withBase('/kyber-pqc/')">Kyber-PQC</a>
          </nav>
        </div>
        <div>
          <p class="site-footer__label">Lab</p>
          <nav class="site-footer__nav">
            <a href="https://bajpailabs.com" target="_blank" rel="noopener">bajpailabs.com</a>
            <a href="https://bajpailabs.com/open-source" target="_blank" rel="noopener">Open source</a>
            <a href="https://bajpailabs.com/research" target="_blank" rel="noopener">Research</a>
          </nav>
        </div>
      </div>
      <div class="folio-rule" aria-hidden />
      <div class="site-footer__legal">
        <p>© {{ year }} Bajpai &amp; Co. Research Private Limited. MIT open-source docs.</p>
        <p>
          <a href="mailto:hello@bajpailabs.com">hello@bajpailabs.com</a>
          · postquantumlabs.com/docs
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { withBase } from "vitepress";

import SectionBackdrop from "./SectionBackdrop.vue";

const year = new Date().getFullYear();
</script>
