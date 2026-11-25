<script setup>
import { socials } from './heroData'
</script>

<template>
  <aside class="flex flex-col items-center gap-6">
    <span class="h-20 w-px bg-gradient-to-b from-transparent to-java"></span>
    <a
      v-for="s in socials"
      :key="s.name"
      :href="s.href"
      target="_blank"
      rel="noopener"
      :aria-label="s.name"
      class="text-ink transition duration-300 hover:-translate-y-0.5 hover:scale-125 hover:text-java-deep"
    >
      <!-- Instagram -->
      <svg v-if="s.name === 'instagram'" viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <!-- GitHub -->
      <svg v-else-if="s.name === 'github'" viewBox="0 0 24 24" class="size-6" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2" />
      </svg>
      <!-- LinkedIn -->
      <svg v-else-if="s.name === 'linkedin'" viewBox="0 0 24 24" class="size-6" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
      </svg>
      <!-- Telegram -->
      <svg v-else-if="s.name === 'telegram'" viewBox="0 0 24 24" class="size-6" fill="currentColor">
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24m5.56 8.16-1.97 9.28c-.15.66-.54.82-1.09.51l-3-2.21-1.45 1.39c-.16.16-.3.3-.6.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.38-.12l-6.87 4.32-2.96-.92c-.64-.2-.66-.64.14-.95l11.57-4.46c.53-.2 1 .13.84.93" />
      </svg>
    </a>
    <span class="h-20 w-px bg-gradient-to-b from-javablue to-transparent"></span>
  </aside>
</template>
