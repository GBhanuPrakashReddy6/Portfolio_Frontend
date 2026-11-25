<script setup>
import { ref, watch } from 'vue'

// Shows the image, or a soft gradient placeholder if the file doesn't exist yet.
const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  label: { type: String, default: '' },
  dark: { type: Boolean, default: false },
})

const failed = ref(!props.src)
watch(() => props.src, (v) => (failed.value = !v))
</script>

<template>
  <img
    v-if="!failed"
    :src="src"
    :alt="alt"
    loading="lazy"
    class="size-full object-cover"
    @error="failed = true"
  />
  <div
    v-else
    class="grid size-full place-items-center p-4 text-center font-display text-xs"
    :class="
      dark
        ? 'bg-[radial-gradient(circle_at_30%_20%,#4b4b4b,#151515_70%)] text-white/50'
        : 'bg-[radial-gradient(circle_at_30%_20%,#ffffff,#d4d4d4_75%)] text-ink/40'
    "
  >
    {{ label || alt }}
  </div>
</template>
