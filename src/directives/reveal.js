// v-reveal: fades + slides an element up when it scrolls into view.
// Optional delay in ms:  v-reveal="200"
export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('reveal-in')
        io.disconnect()
        // clear the delay afterwards so hover effects stay snappy
        setTimeout(() => (el.style.transitionDelay = ''), 900 + (binding.value || 0))
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    el._revealObserver = io
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}
