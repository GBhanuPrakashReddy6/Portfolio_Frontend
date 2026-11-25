<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { hero } from '../hero/heroData'
import { navLinks } from './navData'
import { useActiveSection } from './useActiveSection'

const { active, scrolled, progress } = useActiveSection()

const logoFailed = ref(false)
const menuOpen = ref(false)
const header = ref(null)

const close = () => (menuOpen.value = false)

// Close the mobile menu when clicking/tapping anywhere outside the navbar
function onPointerDown(e) {
  if (menuOpen.value && header.value && !header.value.contains(e.target)) close()
}
const onKey = (e) => e.key === 'Escape' && close()
// Close if the screen becomes wide enough to show the desktop nav
const onResize = () => window.innerWidth >= 768 && close()

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
})

// Close the menu once the page scrolls to a new section
watch(active, close)
</script>

<template>
  <!-- Dim the page behind the open mobile menu -->
  <Transition
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="menuOpen" class="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden" aria-hidden="true"></div>
  </Transition>

  <header
    ref="header"
    class="fixed inset-x-0 top-0 z-50 animate-fade-down transition-all duration-300"
    :class="scrolled ? 'bg-page/80 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md' : 'bg-transparent'"
  >
    <div
      class="page-container relative flex items-center justify-between gap-4 transition-all duration-300"
      :class="scrolled ? 'py-2.5' : 'py-4 sm:py-5'"
    >
      <!-- Logo + name -->
      <a href="#home" class="group flex items-center gap-3">
        <span class="grid size-11 place-items-center overflow-hidden rounded-full bg-ink text-sm font-medium text-white ring-2 ring-java ring-offset-2 ring-offset-page transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-105 group-hover:ring-javablue">
          <img v-if="!logoFailed" :src="hero.logo" alt="" class="size-full object-cover" @error="logoFailed = true" />
          <template v-else>{{ hero.firstName[0] }}{{ hero.lastName[0] }}</template>
        </span>
        <!-- name is hidden on tablets / small laptops where the center nav needs the space -->
        <span class="h-8 w-px bg-ink/70 md:hidden lg:block"></span>
        <span class="text-sm leading-tight whitespace-nowrap md:hidden lg:block">{{ hero.firstName }}<br />{{ hero.lastName }}</span>
      </a>

      <!-- Center pill nav (tablet & desktop) -->
      <nav class="hidden items-center gap-1 rounded-xl bg-neutral-200/90 p-1.5 md:flex">
        <a
          href="#home"
          aria-label="Home"
          class="grid size-9 place-items-center rounded-lg transition duration-300"
          :class="active === 'home' ? 'bg-ink text-white' : 'text-ink hover:bg-white'"
        >
          <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
          </svg>
        </a>
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="relative rounded-lg px-2.5 py-2 font-display text-sm whitespace-nowrap transition duration-300 lg:px-3.5"
          :class="active === link.id ? 'bg-ink text-white' : 'text-ink/80 hover:bg-white hover:text-java-deep'"
        >
          {{ link.label }}
          <!-- orange dot under the active link -->
          <span
            class="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-java transition duration-300"
            :class="active === link.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
          ></span>
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <!-- Open to work badge -->
        <a
          v-if="hero.openToWork"
          href="#contact"
          class="flex items-center gap-3 rounded-xl bg-ink px-4 py-3 font-display text-sm whitespace-nowrap text-white shadow-lg shadow-ink/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-java/30 sm:px-5"
        >
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-spring opacity-75"></span>
            <span class="relative inline-flex size-2 rounded-full bg-spring shadow-[0_0_8px_2px_rgba(109,179,63,0.7)]"></span>
          </span>
          <span class="hidden sm:inline">Open to work</span>
        </a>

        <!-- Mobile menu button (animated burger -> X) -->
        <button
          class="relative grid size-11 place-items-center rounded-xl bg-neutral-200 transition active:scale-95 md:hidden"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="absolute h-0.5 w-5 rounded bg-ink transition duration-300" :class="menuOpen ? 'rotate-45' : '-translate-y-1.5'"></span>
          <span class="absolute h-0.5 w-5 rounded bg-ink transition duration-300" :class="menuOpen ? 'scale-x-0 opacity-0' : ''"></span>
          <span class="absolute h-0.5 w-5 rounded bg-ink transition duration-300" :class="menuOpen ? '-rotate-45' : 'translate-y-1.5'"></span>
        </button>
      </div>

      <!-- Mobile dropdown -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-3 scale-95"
        leave-to-class="opacity-0 -translate-y-3 scale-95"
      >
        <nav
          v-if="menuOpen"
          class="absolute inset-x-4 top-full mt-2 origin-top rounded-2xl bg-white p-2 shadow-2xl shadow-black/15 sm:inset-x-8 md:hidden"
        >
          <a
            v-for="(link, i) in [{ label: 'Home', id: 'home' }, ...navLinks]"
            :key="link.id"
            :href="`#${link.id}`"
            class="flex animate-fade-up items-center justify-between rounded-xl px-4 py-3 font-display text-sm transition"
            :class="active === link.id ? 'bg-ink text-white' : 'hover:bg-neutral-100'"
            :style="{ animationDelay: `${i * 50}ms` }"
            @click="close"
          >
            {{ link.label }}
            <span class="text-xs opacity-50">0{{ i }}</span>
          </a>
        </nav>
      </Transition>
    </div>

    <!-- orange scroll-progress bar along the bottom of the navbar -->
    <span
      class="absolute bottom-0 left-0 h-[2px] bg-java-button transition-[width,opacity] duration-150"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
      :style="{ width: `${progress * 100}%` }"
    ></span>
  </header>
</template>
