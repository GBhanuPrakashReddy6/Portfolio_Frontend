<script setup>
import { computed, ref } from 'vue'

// Animated 1–5 star picker. Use with v-model.
// Mouse: hover to preview, click to choose. Keyboard: arrow keys / 1–5.
const model = defineModel({ type: Number, default: 0 })
const props = defineProps({
  invalid: { type: Boolean, default: false },
})

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!']
const EMOJI = ['', '😕', '😐', '🙂', '😄', '🤩']

const hover = ref(0)
const burstKey = ref(0) // changes on every pick to replay the burst animation
const shown = computed(() => hover.value || model.value)

function pick(n) {
  model.value = n
  burstKey.value++
}

function onKey(e) {
  const n = model.value
  if (['ArrowRight', 'ArrowUp'].includes(e.key)) pick(Math.min(5, n + 1))
  else if (['ArrowLeft', 'ArrowDown'].includes(e.key)) pick(Math.max(1, n - 1))
  else if (/^[1-5]$/.test(e.key)) pick(Number(e.key))
  else return
  e.preventDefault()
  // move focus to the selected star (roving focus)
  e.currentTarget.querySelector(`[data-star="${model.value}"]`)?.focus()
}
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-x-4 gap-y-2"
    :class="props.invalid ? 'animate-shake' : ''"
  >
    <div
      role="radiogroup"
      aria-label="Your rating"
      class="flex items-center gap-1 sm:gap-1.5"
      @keydown="onKey"
      @mouseleave="hover = 0"
    >
      <button
        v-for="n in 5"
        :key="n"
        type="button"
        role="radio"
        :data-star="n"
        :aria-checked="model === n"
        :aria-label="`${n} star${n > 1 ? 's' : ''} – ${LABELS[n]}`"
        :tabindex="(model || 1) === n ? 0 : -1"
        class="group/star relative grid size-9 place-items-center rounded-full outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-java/60 sm:size-10"
        @mouseenter="hover = n"
        @focus="hover = 0"
        @click="pick(n)"
      >
        <!-- soft glow behind lit stars -->
        <span
          class="absolute inset-1 rounded-full bg-java/25 blur-md transition duration-300"
          :class="n <= shown ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
        ></span>

        <!-- the star -->
        <svg
          :key="n <= model ? `on-${burstKey}` : 'off'"
          viewBox="0 0 24 24"
          class="relative size-7 transition-all duration-200 ease-out group-hover/star:scale-125 group-active/star:scale-90 sm:size-8"
          :class="[
            n <= shown ? 'text-java drop-shadow-[0_2px_6px_rgba(231,111,0,0.45)]' : 'text-ink/15',
            n <= model ? 'animate-star-pop' : '',
          ]"
          :style="{ animationDelay: `${(n - 1) * 60}ms` }"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
          stroke-linejoin="round"
        >
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
        </svg>

        <!-- little sparks that fly out of the star you clicked -->
        <span v-if="n === model && burstKey" :key="burstKey" class="pointer-events-none absolute inset-0" aria-hidden="true">
          <span
            v-for="d in 8"
            :key="d"
            class="spark absolute top-1/2 left-1/2 size-1.5 rounded-full"
            :class="d % 2 ? 'bg-java' : 'bg-javablue'"
            :style="{ '--angle': `${d * 45}deg` }"
          ></span>
        </span>
      </button>
    </div>

    <!-- label + emoji for the current (hovered or chosen) rating -->
    <!-- <Transition
      mode="out-in"
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0 translate-y-2 scale-90"
      leave-to-class="opacity-0 -translate-y-2 scale-90"
    >
      <span
        :key="shown"
        class="inline-flex min-w-28 items-center gap-1.5 font-mono text-xs sm:text-sm"
        :class="shown ? 'text-java-deep' : 'text-ink/40'"
        aria-live="polite"
      >
        <template v-if="shown">
          <span class="text-base sm:text-lg">{{ EMOJI[shown] }}</span>
          {{ LABELS[shown] }}
          <span class="text-ink/35">{{ shown }}/5</span>
        </template>
        <template v-else>Tap a star to rate</template>
      </span>
    </Transition> -->
  </div>
</template>

<style scoped>
.spark {
  transform: translate(-50%, -50%);
  animation: spark 0.6s ease-out forwards;
}
@keyframes spark {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-22px) scale(0.3);
  }
}
@media (prefers-reduced-motion: reduce) {
  .spark { display: none; }
}
</style>
