<script setup>
import { hero } from '../hero/heroData'
import JavaCup from '../common/JavaCup.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer v-reveal class="page-container pt-8 pb-6">
    <div class="relative flex flex-col items-center justify-between gap-4 pb-4 sm:flex-row">
      <a :href="`mailto:${hero.email}`" class="group flex items-center gap-2 font-display text-lg transition hover:text-java-deep sm:text-xl">
        Chat with me
        <JavaCup class="size-7 transition duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      </a>
      <p class="font-display text-lg sm:text-xl">
        Thanks For Visiting<span class="text-java">.</span>
      </p>
      <!-- animated gradient divider -->
      <span class="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-java),var(--color-javablue),transparent)] bg-[size:200%_100%] animate-gradient"></span>
    </div>
    <div class="mt-3 flex flex-col items-center justify-between gap-2 text-xs text-ink/50 sm:flex-row">
      <p class="font-mono">
        ©{{ year }} {{ hero.firstName }} {{ hero.lastName }} · built with
        <span class="text-java-deep">☕ Java</span> on the back &amp; Vue on the front
      </p>
      <a href="#home" class="group flex items-center gap-1 transition hover:text-java-deep">
        <svg viewBox="0 0 24 24" class="size-3 transition group-hover:-translate-y-1" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 15 6-6 6 6" /></svg>
        Back to top
      </a>
    </div>
  </footer>
</template>
