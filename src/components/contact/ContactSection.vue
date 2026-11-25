<script setup>
import { reactive, ref } from 'vue'
import SectionTitle from '../common/SectionTitle.vue'
import { hero, socials } from '../hero/heroData'

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

// No backend yet: opens the visitor's email app with the message filled in.
function send() {
  const subject = encodeURIComponent(`Project idea from ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
  window.location.href = `mailto:${hero.email}?subject=${subject}&body=${body}`
  sent.value = true
}

const input =
  'w-full rounded-lg border border-white/15 bg-white/95 px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-java focus:bg-white focus:ring-4 focus:ring-java/30'
</script>

<template>
  <section id="contact" class="section-space">
    <div class="page-container">
      <div v-reveal class="relative overflow-hidden rounded-2xl bg-ink px-5 py-14 text-white shadow-2xl shadow-ink/30 sm:px-10 lg:px-24 lg:py-20">
        <!-- Decorations -->
        <span class="pointer-events-none absolute -top-24 -right-16 size-72 animate-blob rounded-full bg-java/25 blur-3xl"></span>
        <span class="pointer-events-none absolute -bottom-24 left-1/4 size-72 animate-blob rounded-full bg-javablue/30 blur-3xl [animation-delay:-7s]"></span>
        <span class="pointer-events-none absolute -bottom-20 -left-20 hidden size-48 rounded-full border-[14px] border-java/80 sm:block sm:size-56"></span>
        <span class="pointer-events-none absolute top-16 right-4 hidden size-14 animate-spin-slow rounded-full bg-[repeating-linear-gradient(135deg,var(--color-java)_0_2px,transparent_2px_6px)] opacity-70 sm:block lg:right-8 lg:size-16"></span>
        <span class="pointer-events-none absolute top-1/2 right-6 hidden size-24 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] bg-[size:10px_10px] opacity-20 lg:block"></span>

        <!-- Vertical social media label -->
        <div class="absolute top-1/2 left-4 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
          <span class="text-[11px] tracking-wide text-white/70 [writing-mode:vertical-rl] rotate-180">Social Media</span>
          <span class="h-10 w-px bg-white/30"></span>
          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="text-[11px] capitalize text-white/50 transition [writing-mode:vertical-rl] rotate-180 hover:text-java"
          >{{ s.name }}</a>
        </div>

        <div class="relative mx-auto max-w-3xl">
          <SectionTitle title="Contact" annotation="RestController" dark />

          <p class="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-white/80 lg:text-base">
            Let's build something amazing together! Whether you have a project idea, a collaboration in mind,
            or just want to say hi — I'd love to hear from you. Feel free to reach out and I'll get back to you
            as soon as possible.
          </p>

          <a
            :href="`mailto:${hero.email}`"
            class="group mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-sm transition hover:border-java hover:bg-java/10"
          >
            <svg viewBox="0 0 24 24" class="size-4 text-java transition group-hover:-rotate-12" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            {{ hero.email }}
          </a>

          <a
            :href="hero.cv"
            download
            class="group relative mx-auto mt-5 flex w-full max-w-56 items-center justify-center gap-2 overflow-hidden rounded-lg bg-java-button py-2.5 text-center text-sm font-medium shadow-lg shadow-java/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-java/40"
          >
            <span class="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[110%]"></span>
            <svg viewBox="0 0 24 24" class="relative size-4 group-hover:animate-bounce" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12m-5-5 5 5 5-5M5 20h14" /></svg>
            <span class="relative">Download CV</span>
          </a>

          <p class="mt-10 text-center text-sm text-white/80">
            If you have any idea we can talk about it, let's do something together . . . !
          </p>

          <form class="mt-5 space-y-3" @submit.prevent="send">
            <div class="grid gap-3 sm:grid-cols-2">
              <input v-model="form.name" :class="input" placeholder="Name" required autocomplete="name" />
              <input v-model="form.email" :class="input" type="email" placeholder="Email" required autocomplete="email" />
            </div>
            <textarea v-model="form.message" :class="input" rows="4" placeholder="I have idea!" required></textarea>
            <button
              type="submit"
              class="group flex w-full items-center justify-center gap-2 rounded-lg border border-java/70 py-2.5 font-mono text-sm text-java transition duration-300 hover:bg-java hover:text-white hover:shadow-lg hover:shadow-java/30 active:scale-[0.98]"
            >
              sendMessage()
              <svg viewBox="0 0 24 24" class="size-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
            </button>
            <p v-if="sent" class="text-center font-mono text-xs text-spring">Your email app should open — thanks for reaching out!</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
