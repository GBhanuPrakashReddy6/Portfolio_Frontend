<script setup>
import { ref } from 'vue'
import { hero, floatingBadges } from './heroData'
import HeroSocials from './HeroSocials.vue'
import HelloBubble from './HelloBubble.vue'
import TypingLine from './TypingLine.vue'

// Shows a placeholder until you add public/hero/profile.png
const photoFailed = ref(false)
</script>

<template>
  <section
    id="home"
    class="relative overflow-hidden lg:landscape:min-h-svh bg-page bg-[linear-gradient(to_right,rgba(15,28,46,0.045)_1px,transparent_1px)] bg-[size:120px_100%] bg-center"
  >
    <!-- soft moving color blobs (Java orange + Java blue) -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span class="absolute top-[18%] left-1/2 size-72 -translate-x-[85%] animate-blob rounded-full bg-java/25 blur-3xl sm:size-96"></span>
      <span class="absolute top-[30%] left-1/2 size-72 -translate-x-[5%] animate-blob rounded-full bg-javablue/25 blur-3xl [animation-delay:-5s] sm:size-96"></span>
    </div>

    <!-- top padding leaves room for the fixed navbar.
         Phone/tablet (and tall portrait screens): content starts right under the navbar.
         Desktop (wide landscape): hero fills the screen with content sitting at the bottom. -->
    <div class="page-container relative flex flex-col pt-24 pb-10 sm:pt-28 lg:landscape:min-h-svh lg:landscape:pb-8">
      <div class="relative flex flex-1 flex-col items-center justify-start lg:landscape:justify-end">
        <!-- Left socials -->
        <HeroSocials class="absolute left-0 top-1/2 hidden -translate-y-1/2 animate-fade-right [animation-delay:600ms] md:flex" />

        <!-- Photo + speech bubble + floating tech badges -->
        <div class="relative w-full max-w-[520px] 3xl:max-w-[620px]">
          <div class="absolute -top-2 right-0 z-10 animate-pop [animation-delay:900ms] sm:-right-1">
            <HelloBubble class="w-24 rotate-[-4deg] animate-float sm:w-36" />
          </div>

          <div
            v-for="(b, i) in floatingBadges"
            :key="b.label"
            class="absolute z-10 flex animate-pop"
            :class="b.pos"
            :style="{ animationDelay: `${1100 + i * 150}ms` }"
          >
            <span
              class="flex animate-float items-center gap-1.5 rounded-full border border-white/70 bg-white/80 py-1 pr-3 pl-1 font-mono text-[10px] font-medium shadow-lg shadow-ink/10 backdrop-blur-md transition hover:scale-110 sm:text-xs"
              :style="{ animationDelay: `${-i * 1.3}s` }"
            >
              <img :src="b.icon" alt="" class="size-5 rounded-full bg-white p-0.5 sm:size-6" />
              {{ b.label }}
            </span>
          </div>

          <img
            v-if="!photoFailed"
            :src="hero.photo"
            :alt="`${hero.firstName} ${hero.lastName}`"
            class="relative mx-auto h-[42svh] w-auto animate-fade-up object-contain object-bottom [animation-delay:150ms] [mask-image:linear-gradient(to_bottom,black_70%,transparent)] sm:h-[52svh]"
            @error="photoFailed = true"
          />

          <!-- Placeholder (shown until your photo is added) -->
          <div
            v-else
            class="mx-auto flex h-[42svh] animate-fade-up items-end justify-center [mask-image:linear-gradient(to_bottom,black_65%,transparent)] sm:h-[52svh]"
          >
            <svg viewBox="0 0 200 220" class="h-full text-neutral-300" fill="currentColor">
              <circle cx="100" cy="70" r="48" />
              <path d="M10 220c0-60 40-95 90-95s90 35 90 95z" />
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h1
          class="relative -mt-10 animate-fade-up text-center font-display text-[clamp(2rem,6.4vw,4.75rem)] leading-[1.05] font-medium tracking-tight [animation-delay:350ms] sm:-mt-14 3xl:text-[5.75rem]"
        >
          <span class="text-java-gradient">{{ hero.highlight }}</span>
          {{ hero.title }}
        </h1>

        <!-- typing terminal line -->
        <div class="mt-4 max-w-full animate-fade-up [animation-delay:450ms]">
          <TypingLine :lines="hero.typing" />
        </div>

        <p class="mt-4 max-w-2xl animate-fade-up text-center text-xs leading-relaxed text-ink/65 [animation-delay:550ms] sm:text-sm">
          {{ hero.description }}
        </p>

        <!-- CTA row -->
        <div class="mt-6 flex w-full max-w-3xl animate-fade-up items-center gap-4 [animation-delay:650ms]">
          <svg viewBox="0 0 24 24" class="size-6 shrink-0 animate-bounce text-java-deep" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
          <a
            :href="hero.cta.href"
            class="group relative flex-1 overflow-hidden rounded-xl bg-java-button py-4 text-center font-display text-sm text-white shadow-xl shadow-java/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-java/40"
          >
            <!-- shine sweep on hover -->
            <span class="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[110%]"></span>
            <span class="relative inline-flex items-center gap-2">
              {{ hero.cta.label }}
              <svg viewBox="0 0 24 24" class="size-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <svg viewBox="0 0 24 24" class="size-6 shrink-0 animate-bounce text-java-deep" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
