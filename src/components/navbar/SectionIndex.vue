<script setup>
import { computed } from 'vue'
import { sections } from './navData'
import { useActiveSection } from './useActiveSection'

const { active, progress } = useActiveSection()

const activeIndex = computed(() => Math.max(0, sections.findIndex((s) => s.id === active.value)))

// every row has the same fixed height, so numbers can never overlap
const ROW = 2.75 // rem
</script>

<template>
  <!-- Fixed section numbers on the right (desktop, 1024px+).
       1024–1399px: a compact version that fits inside the page's 48px side padding.
       1400px+: full size, there is free space beside the content.
       The nav itself ignores clicks so it never blocks the page; only the links are clickable. -->
  <nav
    class="pointer-events-none fixed top-1/2 right-1.5 z-40 hidden -translate-y-1/2 lg:block min-[1400px]:right-5 2xl:right-8"
    aria-label="Page sections"
  >
    <div class="flex items-stretch gap-1.5 min-[1400px]:gap-3">
      <!-- numbers -->
      <ul class="flex flex-col">
        <li
          v-for="(s, i) in sections"
          :key="s.id"
          class="flex animate-fade-left items-center justify-end"
          :style="{ height: `${ROW}rem`, animationDelay: `${700 + i * 90}ms` }"
        >
          <a
            :href="`#${s.id}`"
            class="group pointer-events-auto relative flex h-full items-center justify-end"
            :aria-current="active === s.id ? 'true' : undefined"
            :aria-label="s.label"
          >
            <!-- section name: slides out to the left on hover -->
            <span
              class="pointer-events-none absolute right-full mr-3 translate-x-3 rounded-md bg-ink px-2.5 py-1 text-[11px] whitespace-nowrap text-white opacity-0 shadow-lg transition duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            >
              {{ s.label }}
            </span>

            <!-- the number -->
            <span
              :key="active === s.id ? `${s.id}-on` : `${s.id}-off`"
              class="block w-6 text-right font-display tabular-nums transition-colors duration-300 min-[1400px]:w-9"
              :class="
                active === s.id
                  ? 'animate-num-pop text-[13px] font-semibold text-java-deep min-[1400px]:text-lg'
                  : 'text-[10px] text-ink/35 group-hover:text-java-deep min-[1400px]:text-[11px]'
              "
            >
              {{ s.n }}
            </span>
          </a>
        </li>
      </ul>

      <!-- track: scroll progress + sliding dot -->
      <div class="relative w-0.5 rounded-full bg-ink/10 min-[1400px]:w-[3px]">
        <span
          class="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-javablue to-java transition-[height] duration-200 ease-out"
          :style="{ height: `${progress * 100}%` }"
        ></span>

        <span
          class="absolute left-1/2 -ml-[5px] size-[10px] transition-[top] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          :style="{ top: `calc(${activeIndex * ROW + ROW / 2}rem - 5px)` }"
        >
          <span class="absolute inset-0 animate-ring rounded-full bg-java"></span>
          <span class="absolute inset-0 rounded-full border-2 border-page bg-java shadow"></span>
        </span>
      </div>
    </div>
  </nav>
</template>
