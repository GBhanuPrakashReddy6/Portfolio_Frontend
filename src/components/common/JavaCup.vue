<!-- Java coffee cup with animated steam -->
<template>
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <!-- steam -->
    <g stroke="var(--color-java)" stroke-width="1.8" stroke-linecap="round">
      <path class="animate-steam" d="M11 9c-1.5-1.5 1.5-3 0-5" />
      <path class="animate-steam [animation-delay:0.4s]" d="M16 9c-1.5-1.5 1.5-3 0-5" />
      <path class="animate-steam [animation-delay:0.8s]" d="M21 9c-1.5-1.5 1.5-3 0-5" />
    </g>
    <!-- cup -->
    <path d="M6 13h19v6a7 7 0 0 1-7 7h-5a7 7 0 0 1-7-7z" fill="var(--color-javablue)" />
    <path d="M25 15h1.5a3 3 0 0 1 0 6H24" stroke="var(--color-javablue)" stroke-width="2" />
    <path d="M4 28h23" stroke="var(--color-javablue)" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>
