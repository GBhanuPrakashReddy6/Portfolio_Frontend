<script setup>
import { computed, ref } from 'vue'
import SectionTitle from '../common/SectionTitle.vue'
import SmartImage from '../common/SmartImage.vue'
import CodeCard from './CodeCard.vue'
import { services, techStack } from './servicesData'

const index = ref(0)
const direction = ref(1)
const current = computed(() => services[index.value])

// file name shown in the code window, taken from the class name in the snippet
const fileName = computed(() => {
  const m = current.value.code?.join(' ').match(/class (\w+)/)
  return m ? `${m[1]}.java` : 'Main.java'
})

function go(step) {
  direction.value = step
  index.value = (index.value + step + services.length) % services.length
}

// basic swipe support on touch screens
let startX = 0
const onTouchStart = (e) => (startX = e.touches[0].clientX)
const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - startX
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
}
</script>

<template>
  <section id="services" class="section-space">
    <div class="page-container">
      <SectionTitle title="Services" annotation="Service" />

      <!-- Arrows -->
      <div class="mt-6 flex items-center justify-between">
        <button class="group flex gap-1 rounded-full p-2 transition hover:bg-java/10 hover:text-java-deep" aria-label="Previous service" @click="go(-1)">
          <svg v-for="o in [0.8, 0.5, 0.25]" :key="o" viewBox="0 0 24 24" class="size-4 transition group-hover:-translate-x-0.5" :style="{ opacity: o }" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 6-6 6 6 6" /></svg>
        </button>
        <span class="font-mono text-xs text-ink/50">
          <span class="text-java-deep">{{ String(index + 1).padStart(2, '0') }}</span> / {{ String(services.length).padStart(2, '0') }}
        </span>
        <button class="group flex gap-1 rounded-full p-2 transition hover:bg-java/10 hover:text-java-deep" aria-label="Next service" @click="go(1)">
          <svg v-for="o in [0.25, 0.5, 0.8]" :key="o" viewBox="0 0 24 24" class="size-4 transition group-hover:translate-x-0.5" :style="{ opacity: o }" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 6 6 6-6 6" /></svg>
        </button>
      </div>

      <!-- Slide -->
      <div v-reveal="150" class="relative mt-4" @touchstart.passive="onTouchStart" @touchend="onTouchEnd">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          leave-active-class="transition duration-200 ease-in"
          :enter-from-class="direction > 0 ? 'opacity-0 translate-x-6' : 'opacity-0 -translate-x-6'"
          :leave-to-class="direction > 0 ? 'opacity-0 -translate-x-6' : 'opacity-0 translate-x-6'"
        >
          <article :key="index" class="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
            <div class="flex flex-col md:min-h-[22rem] lg:min-h-[26rem]">
              <h3 class="font-display text-xl font-medium sm:text-2xl lg:text-3xl">{{ current.title }}</h3>
              <p class="mt-5 max-w-md text-sm leading-relaxed text-ink/70 lg:text-base">
                {{ current.description }}
                <br />Features:
              </p>
              <ul class="mt-6 space-y-2.5 text-sm text-ink/75 lg:text-base">
                <li
                  v-for="(f, i) in current.features"
                  :key="f"
                  class="flex animate-fade-right items-start gap-2.5"
                  :style="{ animationDelay: `${150 + i * 90}ms` }"
                >
                  <svg viewBox="0 0 24 24" class="mt-0.5 size-4 shrink-0 text-java-deep" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                  {{ f }}
                </li>
              </ul>
              <div class="mt-8 flex flex-wrap gap-2 md:mt-auto">
                <span
                  v-for="t in current.tags"
                  :key="t"
                  class="rounded-full border border-java/30 bg-java/10 px-3 py-1 font-mono text-[11px] text-java-deep transition hover:-translate-y-0.5 hover:bg-java hover:text-white"
                >{{ t }}</span>
              </div>
            </div>

            <div class="aspect-[4/3] overflow-hidden rounded-xl shadow-2xl shadow-ink/20 ring-1 ring-ink/10 transition duration-500 hover:-translate-y-1 hover:shadow-java/20 md:aspect-auto md:h-full md:min-h-[22rem] lg:min-h-[26rem]">
              <SmartImage v-if="current.image" :src="current.image" :alt="current.title" dark />
              <CodeCard v-else :lines="current.code" :file="fileName" />
            </div>
          </article>
        </Transition>
      </div>

      <!-- Dots -->
      <div class="mt-6 flex justify-center gap-2">
        <button
          v-for="(s, i) in services"
          :key="s.title"
          :aria-label="`Show ${s.title}`"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="i === index ? 'w-8 bg-java' : 'w-1.5 bg-ink/25 hover:bg-ink/50'"
          @click="direction = i > index ? 1 : -1; index = i"
        ></button>
      </div>

      <!-- Tech stack marquee (pauses on hover) -->
      <div v-reveal class="mt-16 lg:mt-20">
        <p class="mb-6 text-center font-mono text-xs text-ink/50 sm:text-sm">
          <span class="text-java-deep">import</span> my.tech.stack.*;
        </p>
        <div class="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <!-- items use margin (not gap) so the loop is seamless at -50% -->
          <ul class="flex w-max animate-marquee py-3 group-hover:[animation-play-state:paused]">
            <li
              v-for="(t, i) in [...techStack, ...techStack]"
              :key="i"
              :aria-hidden="i >= techStack.length"
              class="mr-4 flex shrink-0 items-center gap-3 rounded-2xl sm:mr-6 border border-ink/5 bg-white px-4 py-3 shadow-md shadow-ink/5 transition duration-300 hover:-translate-y-1.5 hover:border-java/40 hover:shadow-lg hover:shadow-java/15 sm:px-5"
            >
              <img :src="t.icon" :alt="t.name" class="size-8 sm:size-10" loading="lazy" />
              <span class="font-display text-xs sm:text-sm">{{ t.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
