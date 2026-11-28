<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import SectionTitle from '../common/SectionTitle.vue'
import StarRating from './StarRating.vue'
import { fetchRecommendations, submitRecommendation } from '@/api/recommendations'

// Loaded from the backend: approved ones + this visitor's own pending ones.
// Stays empty if the backend can't be reached.
const list = ref([])
const track = ref(null)

onMounted(async () => {
  try {
    list.value = await fetchRecommendations()
  } catch (e) {
    console.warn('Recommendations API unavailable.', e)
  }
})

function scroll(dir) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('article')
  el.scrollBy({ left: dir * ((card?.offsetWidth ?? 280) + 20), behavior: 'smooth' })
}

// ---- "Worked with me before?" form ----
// Saved in the backend as "pending": only this visitor sees it until it's approved.
// `website` is a hidden honeypot field that only bots fill in.
const empty = () => ({ rating: 0, name: '', email: '', role: '', text: '', logo: '', website: '' })
const form = reactive(empty())
const fileName = ref('')
const thanks = ref(false)
const sending = ref(false)
const error = ref('')
const fieldErrors = ref({})
const ratingShake = ref(false)

// Clear a field's error as soon as the visitor changes that field.
for (const key of ['rating', 'name', 'email', 'role', 'text']) {
  watch(
    () => form[key],
    () => {
      if (fieldErrors.value[key]) fieldErrors.value = { ...fieldErrors.value, [key]: undefined }
    },
  )
}

const MAX_LOGO_BYTES = 500 * 1024

function onLogo(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > MAX_LOGO_BYTES) {
    fieldErrors.value = { ...fieldErrors.value, logo: 'Logo must be smaller than 500 KB' }
    e.target.value = ''
    return
  }
  fieldErrors.value = { ...fieldErrors.value, logo: undefined }
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = () => (form.logo = reader.result)
  reader.readAsDataURL(file)
}

function validate() {
  const errs = {}
  if (!form.rating) errs.rating = 'Please pick a star rating'
  if (!form.name.trim()) errs.name = 'Please enter your name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email'
  if (form.text.trim().length < 10) errs.text = 'Please write at least 10 characters'
  return errs
}

async function submit() {
  error.value = ''
  thanks.value = false
  const errs = validate()
  if (fieldErrors.value.logo) errs.logo = fieldErrors.value.logo
  fieldErrors.value = errs
  if (Object.keys(errs).length) {
    if (errs.rating) {
      // replay the shake animation on the stars
      ratingShake.value = false
      requestAnimationFrame(() => (ratingShake.value = true))
      setTimeout(() => (ratingShake.value = false), 500)
    }
    return
  }
  sending.value = true
  try {
    const saved = await submitRecommendation({ ...form, role: form.role.trim() || null, logo: form.logo || null })
    list.value.unshift(saved)
    Object.assign(form, empty())
    fileName.value = ''
    thanks.value = true
    track.value?.scrollTo({ left: 0, behavior: 'smooth' })
  } catch (e) {
    error.value = e instanceof TypeError ? 'Could not reach the server. Please try again later.' : e.message
    fieldErrors.value = e.errors || {}
  } finally {
    sending.value = false
  }
}

const initials = (n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

const labelCls = 'mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ink/60'

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
            :key="r.id ?? i"
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
                <p v-if="r.role" class="text-xs text-ink/50">{{ r.role }}</p>
              </div>
              <span class="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-xs text-white ring-2 ring-java/0 transition duration-300 group-hover:ring-java">
                <img v-if="r.logo" :src="r.logo" alt="" class="size-full object-cover" />
                <template v-else>{{ initials(r.name) }}</template>
              </span>
            </div>
            <div class="mt-3 flex gap-0.5" :aria-label="`${r.rating || 5} out of 5 stars`">
              <svg v-for="s in 5" :key="s" viewBox="0 0 24 24" class="size-3.5 transition duration-300 group-hover:scale-110" :class="s <= (r.rating || 5) ? 'text-java' : 'text-ink/15'" :style="{ transitionDelay: `${s * 40}ms` }" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
            </div>
            <p class="relative mt-3 text-xs leading-relaxed text-ink/70 sm:text-[13px]">{{ r.text }}</p>
            <!-- <p
              v-if="r.pending"
              class="relative mt-auto w-fit rounded-full bg-java/10 px-2.5 py-1 pt-1 font-mono text-[10px] text-java-deep"
              title="Only you can see this until it is approved"
            >⏳ Awaiting approval · only visible to you</p> -->
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

      <form
        v-reveal
        novalidate
        class="mx-auto mt-8 max-w-4xl rounded-2xl border border-ink/5 bg-white/70 p-5 shadow-lg shadow-ink/5 backdrop-blur sm:p-8"
        @submit.prevent="submit"
      >
        <!-- Rating -->
        <div class="flex flex-col items-center gap-2 border-b border-ink/10 pb-6 text-center">
          <!-- <span :class="labelCls">How was working with me? <span class="text-java-deep">*</span></span> -->
          <StarRating v-model="form.rating" :invalid="ratingShake" class="justify-center" />
          <p v-if="fieldErrors.rating" class="text-xs text-red-600">{{ fieldErrors.rating }}</p>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <!-- Left column -->
          <div class="flex min-w-0 flex-col gap-4">
            <label class="block">
              <span :class="labelCls">Name <span class="text-java-deep">*</span></span>
              <input v-model="form.name" :class="input" placeholder="Jane Doe" required maxlength="80" autocomplete="name" />
              <span v-if="fieldErrors.name" class="mt-1 block text-xs text-red-600">{{ fieldErrors.name }}</span>
            </label>
            <label class="block">
              <span :class="labelCls">Email <span class="text-java-deep">*</span> <span class="font-sans normal-case tracking-normal text-ink/40">(not shown publicly)</span></span>
              <input v-model="form.email" :class="input" type="email" placeholder="jane@company.com" required maxlength="120" autocomplete="email" />
              <span v-if="fieldErrors.email" class="mt-1 block text-xs text-red-600">{{ fieldErrors.email }}</span>
            </label>
            <label class="block">
              <span :class="labelCls">Role / Company</span>
              <input v-model="form.role" :class="input" placeholder="Tech Lead at Acme" maxlength="80" autocomplete="organization-title" />
              <span v-if="fieldErrors.role" class="mt-1 block text-xs text-red-600">{{ fieldErrors.role }}</span>
            </label>
            <!-- honeypot: hidden from people, bots fill it in -->
            <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden" />
          </div>

          <!-- Right column -->
          <div class="flex min-w-0 flex-col gap-4">
            <label class="flex flex-1 flex-col">
              <span :class="labelCls">Your recommendation <span class="text-java-deep">*</span></span>
              <textarea
                v-model="form.text"
                :class="input"
                class="min-h-36 flex-1 resize-none"
                placeholder="What was it like working together?"
                required
                minlength="10"
                maxlength="1000"
              ></textarea>
              <span class="mt-1 flex justify-between gap-2 text-xs">
                <span class="text-red-600">{{ fieldErrors.text }}</span>
                <span class="shrink-0 font-mono text-ink/40">{{ form.text.length }}/1000</span>
              </span>
            </label>
            <div>
              <span :class="labelCls">Logo</span>
              <label
                class="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-ink/25 bg-white/60 px-4 py-2 text-sm transition duration-300 hover:border-java hover:bg-white"
              >
                <span class="grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-ink/5 text-ink/50">
                  <img v-if="form.logo" :src="form.logo" alt="" class="size-full object-cover" />
                  <svg v-else viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4m0 0-4 4m4-4 4 4M4 20h16" /></svg>
                </span>
                <span class="truncate" :class="fileName ? 'text-ink' : 'text-ink/45'">{{ fileName || 'Upload an image (optional, max 500 KB)' }}</span>
                <input type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml" class="sr-only" @change="onLogo" />
              </label>
              <span v-if="fieldErrors.logo" class="mt-1 block text-xs text-red-600">{{ fieldErrors.logo }}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="sending"
          class="group relative mt-6 w-full overflow-hidden rounded-lg bg-ink py-3 text-sm text-white shadow-lg shadow-ink/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-java/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          <!-- orange fill slides in from the left on hover -->
          <span class="absolute inset-0 origin-left scale-x-0 bg-java-button transition-transform duration-500 group-hover:scale-x-100"></span>
          <span class="relative">{{ sending ? 'Sending…' : 'Send recommendation' }}</span>
        </button>

        <p v-if="thanks" class="mt-4 text-center text-xs text-spring">
          Thank you! Your recommendation is saved
        </p>
        <p v-if="error" class="mt-4 text-center text-xs text-red-600">{{ error }}</p>
      </form>
    </div>
  </section>
</template>
