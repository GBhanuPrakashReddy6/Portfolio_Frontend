<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Types each line, pauses, deletes it, then types the next one.
const props = defineProps({ lines: { type: Array, required: true } })

const text = ref('')
let line = 0
let timer = null

function tick(deleting = false) {
  const full = props.lines[line]
  if (!deleting) {
    text.value = full.slice(0, text.value.length + 1)
    if (text.value === full) timer = setTimeout(() => tick(true), 1800)
    else timer = setTimeout(() => tick(false), 45 + Math.random() * 45)
  } else {
    text.value = full.slice(0, text.value.length - 1)
    if (!text.value) {
      line = (line + 1) % props.lines.length
      timer = setTimeout(() => tick(false), 350)
    } else timer = setTimeout(() => tick(true), 22)
  }
}

onMounted(() => (timer = setTimeout(() => tick(false), 1200)))
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div
    class="inline-flex max-w-full items-center gap-2 rounded-lg border border-ink/10 bg-ink px-3 py-2 font-mono text-[11px] text-white/90 shadow-lg shadow-ink/20 sm:px-4 sm:text-sm"
  >
    <span class="flex gap-1">
      <span class="size-2 rounded-full bg-[#ff5f57]"></span>
      <span class="size-2 rounded-full bg-[#febc2e]"></span>
      <span class="size-2 rounded-full bg-spring"></span>
    </span>
    <span class="text-spring">~/dev</span>
    <span class="text-java">$</span>
    <span class="truncate">{{ text }}</span>
    <span class="-ml-1.5 inline-block h-4 w-2 shrink-0 animate-blink bg-java"></span>
  </div>
</template>
