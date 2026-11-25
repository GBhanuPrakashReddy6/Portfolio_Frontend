<script setup>
import { ref } from 'vue'
import SectionTitle from '../common/SectionTitle.vue'
import { projects } from './projectsData'

// Full class names written out so Tailwind can see them
const spans = {
  xs: 'lg:col-span-2',
  sm: 'lg:col-span-3',
  md: 'lg:col-span-4',
  lg: 'lg:col-span-5',
}

// remembers which screenshots failed to load, so the styled card is shown instead
const broken = ref({})
</script>

<template>
  <section id="projects" class="section-space">
    <div class="page-container">
      <SectionTitle title="Projects" annotation="Repository" />

      <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-5">
        <a
          v-for="(p, i) in projects"
          :key="p.title"
          v-reveal="(i % 3) * 120"
          :href="p.link"
          target="_blank"
          rel="noopener"
          class="group relative h-56 overflow-hidden rounded-xl shadow-lg shadow-ink/10 ring-1 ring-ink/5 transition-[box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-java/25 hover:ring-java/50 sm:h-64 lg:h-72 2xl:h-80"
          :class="spans[p.size]"
        >
          <!-- screenshot -->
          <img
            v-if="p.image && !broken[p.title]"
            :src="p.image"
            :alt="p.title"
            loading="lazy"
            class="size-full object-cover transition duration-700 group-hover:scale-110"
            @error="broken[p.title] = true"
          />

          <!-- styled placeholder card (no screenshot) -->
          <div
            v-else
            class="relative size-full overflow-hidden transition duration-700 group-hover:scale-105"
            :class="i % 2 === 0 ? 'bg-ink text-white' : 'bg-white text-ink'"
          >
            <span
              class="absolute inset-0 bg-[linear-gradient(rgba(248,152,32,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,152,32,0.08)_1px,transparent_1px)] bg-[size:22px_22px]"
            ></span>
            <span
              class="absolute -top-16 -right-16 size-48 animate-blob rounded-full blur-3xl"
              :class="i % 2 === 0 ? 'bg-java/30' : 'bg-javablue/25'"
              :style="{ animationDelay: `${-i * 2}s` }"
            ></span>
            <span class="absolute top-5 left-5 font-mono text-3xl font-bold text-java/80 transition duration-500 group-hover:rotate-[-8deg] group-hover:text-java sm:text-4xl">{ }</span>
          </div>

          <!-- info: always visible at the bottom, stack chips slide up on hover -->
          <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-4 text-white sm:p-5">
            <span class="font-mono text-[10px] tracking-wide text-java uppercase sm:text-[11px]">{{ p.category }}</span>
            <span class="mt-1 font-display text-sm leading-snug font-medium sm:text-base">{{ p.title }}</span>
            <div
              class="mt-0 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100"
            >
              <span
                v-for="s in p.stack"
                :key="s"
                class="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] backdrop-blur"
              >{{ s }}</span>
            </div>
          </div>

          <!-- arrow -->
          <span
            class="absolute top-4 right-4 grid size-9 scale-75 place-items-center rounded-full bg-java text-white opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:rotate-[-45deg] group-hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>
      </div>

      <p v-reveal class="mt-10 text-center">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener"
          class="group inline-flex items-center gap-2 font-mono text-sm text-ink/70 transition hover:text-java-deep"
        >
          git clone --all-projects
          <svg viewBox="0 0 24 24" class="size-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </p>
    </div>
  </section>
</template>
