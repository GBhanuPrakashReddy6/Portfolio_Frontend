import { onBeforeUnmount, onMounted, ref } from 'vue'
import { sections } from './navData'

// Shared state: which section is in the middle of the screen, and how far the page is scrolled.
const active = ref('home')
const progress = ref(0)
const scrolled = ref(false)

let observer = null
let users = 0

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
  scrolled.value = window.scrollY > 20
}

function start() {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id
    },
    // a thin line across the middle of the screen decides the active section
    { rootMargin: '-45% 0px -54% 0px' },
  )
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

function stop() {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
}

export function useActiveSection() {
  onMounted(() => {
    if (users++ === 0) start()
  })
  onBeforeUnmount(() => {
    if (--users === 0) stop()
  })
  return { active, progress, scrolled }
}
