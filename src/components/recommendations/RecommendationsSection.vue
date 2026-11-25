<script setup>
import { reactive, ref } from 'vue'
import SectionTitle from '../common/SectionTitle.vue'
import { recommendations } from './recommendationsData'

const list = ref([...recommendations])
const track = ref(null)

function scroll(dir) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('article')
  el.scrollBy({ left: dir * ((card?.offsetWidth ?? 280) + 20), behavior: 'smooth' })
}

// ---- "Worked with me before?" form ----
// No backend yet: new recommendations are shown on the page only until reload.
const form = reactive({ name: '', email: '', text: '', logo: '' })
const fileName = ref('')
const thanks = ref(false)

function onLogo(e) {
  const file = e.target.files?.[0]
  if (!file) return
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = () => (form.logo = reader.result)
  reader.readAsDataURL(file)
}

function submit() {
  list.value.unshift({ name: form.name, role: 'Client', logo: form.logo, text: form.text })
  Object.assign(form, { name: '', email: '', text: '', logo: '' })
  fileName.value = ''
  thanks.value = true
  track.value?.scrollTo({ left: 0, behavior: 'smooth' })
}

const initials = (n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

const input =
  'w-full rounded-lg border border-ink/20 bg-white/60 px-4 py-2.5 text-sm placeholder:text-ink/35 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-java focus:bg-white focus:ring-4 focus:ring-java/20'
</script>

<template>
  <section id="recommendations" class="section-space">
    <div class="page-container">
      <SectionTitle title="Recommendation" annotation="Autowired" />

      <!-- Cards -->
      <div class="relative mt-12 lg:mt-16">
        <div
          ref="track"
          class="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[8%] pb-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <article
            v-for="(r, i) in list"
            :key="i"
            v-reveal="Math.min(i, 4) * 100"
            class="group relative my-2 flex w-64 shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-ink/5 bg-white p-5 shadow-md shadow-ink/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-java/15 sm:w-72 2xl:w-80"
          >
            <!-- orange bar grows across the top on hover -->
            <span class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-java-button transition-transform duration-500 group-hover:scale-x-100"></span>
            <!-- big quote mark -->
            <span class="pointer-events-none absolute -right-1 -bottom-8 font-display text-8xl text-java/10 transition duration-500 group-hover:-translate-y-2 group-hover:text-java/20">”</span>

            <div class="flex items-start justify-between">
              <div>
                <p class="font-display text-sm">{{ r.name }}</p>
                <p class="text-xs text-ink/50">{{ r.role }}</p>
              </div>
              <span class="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-xs text-white ring-2 ring-java/0 transition duration-300 group-hover:ring-java">
                <img v-if="r.logo" :src="r.logo" alt="" class="size-full object-cover" />
                <template v-else>{{ initials(r.name) }}</template>
              </span>
            </div>
            <div class="mt-3 flex gap-0.5 text-java" aria-label="5 stars">
              <svg v-for="s in 5" :key="s" viewBox="0 0 24 24" class="size-3.5 transition duration-300 group-hover:scale-110" :style="{ transitionDelay: `${s * 40}ms` }" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
            </div>
            <p class="relative mt-3 text-xs leading-relaxed text-ink/70 sm:text-[13px]">{{ r.text }}</p>
          </article>
        </div>

        <div class="mt-4 flex justify-center gap-3">
          <button class="grid size-10 place-items-center rounded-full border border-ink/20 transition duration-300 hover:-translate-x-0.5 hover:border-java hover:bg-java hover:text-white active:scale-90" aria-label="Previous" @click="scroll(-1)">
            <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 6-6 6 6 6" /></svg>
          </button>
          <button class="grid size-10 place-items-center rounded-full border border-ink/20 transition duration-300 hover:translate-x-0.5 hover:border-java hover:bg-java hover:text-white active:scale-90" aria-label="Next" @click="scroll(1)">
            <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <!-- Form -->
      <p class="mt-14 text-center text-sm sm:text-base">Worked with me before? Tell others about your experience!</p>

      <form v-reveal class="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-[1fr_2fr]" @submit.prevent="submit">
        <div class="space-y-4">
          <input v-model="form.name" :class="input" placeholder="Name" required autocomplete="name" />
          <input v-model="form.email" :class="input" type="email" placeholder="Email" required autocomplete="email" />
          <label class="block cursor-pointer text-sm underline decoration-java underline-offset-4 transition hover:text-java-deep">
            {{ fileName || 'Upload Logo' }}
            <input type="file" accept="image/*" class="sr-only" @change="onLogo" />
          </label>
        </div>
        <div class="flex flex-col gap-4">
          <textarea v-model="form.text" :class="input" class="min-h-28 flex-1" placeholder="Your Text" required></textarea>
          <button
            type="submit"
            class="group relative overflow-hidden rounded-lg bg-ink py-2.5 text-sm text-white shadow-lg shadow-ink/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-java/25 active:scale-[0.98]"
          >
            <!-- orange fill slides in from the left on hover -->
            <span class="absolute inset-0 origin-left scale-x-0 bg-java-button transition-transform duration-500 group-hover:scale-x-100"></span>
            <span class="relative">Send</span>
          </button>
        </div>
        <p v-if="thanks" class="text-center text-xs text-spring md:col-span-2">Thank you! Your recommendation was added.</p>
      </form>
    </div>
  </section>
</template>
