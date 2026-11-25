<script setup>
defineProps({
  title: { type: String, required: true },
  // small Java annotation shown above the title, e.g. "Service" -> @Service
  annotation: { type: String, default: '' },
  dark: { type: Boolean, default: false },
})
</script>

<template>
  <div v-reveal class="group/title">
    <!-- @Annotation label: types in when the title scrolls into view -->
    <p
      v-if="annotation"
      class="mb-2 flex justify-center font-mono text-xs sm:text-sm"
      :class="dark ? 'text-white/60' : 'text-ink/50'"
    >
      <span class="text-java-deep">@</span>
      <span
        class="inline-block overflow-hidden whitespace-nowrap transition-[max-width] delay-500 duration-1000 ease-out max-w-0 group-[.reveal-in]/title:max-w-[20ch]"
      >{{ annotation }}</span>
      <span class="ml-0.5 inline-block h-4 w-[2px] animate-blink bg-java sm:h-5"></span>
    </p>

    <div class="flex items-center gap-4 sm:gap-8">
      <span
        class="h-px flex-1 origin-right scale-x-0 bg-gradient-to-l transition-transform delay-300 duration-1000 ease-out group-[.reveal-in]/title:scale-x-100"
        :class="dark ? 'from-java/70 to-white/10' : 'from-java/70 to-ink/10'"
      ></span>
      <h2 class="relative shrink-0 font-display text-2xl font-medium tracking-tight sm:text-4xl lg:text-5xl 3xl:text-6xl">
        {{ title }}
        <!-- small orange dot like a period -->
        <span class="text-java">.</span>
      </h2>
      <span
        class="h-px flex-1 origin-left scale-x-0 bg-gradient-to-r transition-transform delay-300 duration-1000 ease-out group-[.reveal-in]/title:scale-x-100"
        :class="dark ? 'from-java/70 to-white/10' : 'from-java/70 to-ink/10'"
      ></span>
    </div>
  </div>
</template>
