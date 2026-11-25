<script setup>
import { computed } from 'vue'

// IDE-style window that "types" Java code line by line.
const props = defineProps({
  lines: { type: Array, required: true },
  file: { type: String, default: 'Main.java' },
})

const KEYWORDS = new Set(['public', 'private', 'protected', 'class', 'interface', 'record', 'return', 'void', 'new', 'var', 'final', 'static', 'import', 'package', 'extends', 'implements', 'this', 'null', 'true', 'false'])
const TYPES = new Set(['Long', 'String', 'List', 'Order', 'OrderEvent', 'Customer', 'Optional', 'Map', 'Integer'])

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// One pass over the line: strings, annotations, words, or any other single character.
const TOKEN = /("(?:[^"\\]|\\.)*")|(@\w+)|(\b\w+\b)|([\s\S])/g

function highlight(line) {
  let out = ''
  for (const [, str, anno, word, other] of line.matchAll(TOKEN)) {
    if (str) out += `<span class="text-spring">${escape(str)}</span>`
    else if (anno) out += `<span class="text-java">${anno}</span>`
    else if (word && KEYWORDS.has(word)) out += `<span class="text-[#cc7832]">${word}</span>`
    else if (word && TYPES.has(word)) out += `<span class="text-[#8fb8d8]">${word}</span>`
    else out += escape(word ?? other)
  }
  return out
}

const html = computed(() => props.lines.map(highlight))
</script>

<template>
  <div class="relative flex size-full flex-col overflow-hidden bg-ink text-left font-mono text-[11px] text-white/85 sm:text-[13px] lg:text-sm">
    <!-- glow -->
    <span class="pointer-events-none absolute -top-24 -right-24 size-64 animate-blob rounded-full bg-java/20 blur-3xl"></span>
    <span class="pointer-events-none absolute -bottom-24 -left-24 size-64 animate-blob rounded-full bg-javablue/25 blur-3xl [animation-delay:-6s]"></span>

    <!-- title bar -->
    <div class="relative flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-2.5">
      <span class="flex gap-1.5">
        <span class="size-2.5 rounded-full bg-[#ff5f57]"></span>
        <span class="size-2.5 rounded-full bg-[#febc2e]"></span>
        <span class="size-2.5 rounded-full bg-spring"></span>
      </span>
      <span class="rounded-t-md border-b-2 border-java px-2 py-0.5 text-[11px] text-white/80">{{ file }}</span>
    </div>

    <!-- code -->
    <div class="relative flex-1 overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
      <div
        v-for="(line, i) in html"
        :key="i"
        class="flex animate-fade-right gap-4 leading-7 whitespace-pre"
        :style="{ animationDelay: `${200 + i * 140}ms` }"
      >
        <span class="w-4 shrink-0 text-right text-white/25 select-none">{{ i + 1 }}</span>
        <span v-html="line"></span>
        <span
          v-if="i === html.length - 1"
          class="-ml-3 inline-block h-5 w-2 self-center animate-blink bg-java/80"
        ></span>
      </div>
    </div>

    <!-- status bar -->
    <div class="relative flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-1.5 text-[10px] text-white/45">
      <span class="flex items-center gap-1.5"><span class="size-1.5 animate-pulse rounded-full bg-spring"></span>BUILD SUCCESS</span>
      <span>Java 21 · UTF-8</span>
    </div>
  </div>
</template>
