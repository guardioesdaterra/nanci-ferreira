import { onMounted, onUnmounted } from 'vue'

/**
 * Throttles scroll events using requestAnimationFrame for optimal performance.
 * Prevents excessive updates during rapid scrolling.
 *
 * @param callback - Function to execute on throttled scroll
 * @param fps - Target frames per second (default: 60)
 */
export function useThrottledScroll(
  callback: (scrollY: number) => void,
  fps = 60
) {
  let lastCall = 0
  let rafId: number | null = null
  const delay = 1000 / fps

  const handleScroll = () => {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeSinceLastCall >= delay) {
      lastCall = now
      callback(window.scrollY)
    } else if (!rafId) {
      // Schedule update for next frame if we haven't already
      rafId = requestAnimationFrame(() => {
        callback(window.scrollY)
        lastCall = Date.now()
        rafId = null
      })
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  })
}

/**
 * Debounces scroll events for actions that should happen once scrolling stops.
 * Useful for expensive operations like recalculating layouts.
 *
 * @param callback - Function to execute when scrolling stops
 * @param wait - Milliseconds to wait after last scroll event (default: 150)
 */
export function useDebouncedScroll(
  callback: (scrollY: number) => void,
  wait = 150
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const handleScroll = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      callback(window.scrollY)
      timeoutId = null
    }, wait)
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })
}

/**
 * High-performance scroll detection using requestAnimationFrame.
 * Better than scroll event for animations and real-time updates.
 *
 * @param callback - Called with current scrollY every frame if scrolling
 */
export function useAnimationFrameScroll(
  callback: (scrollY: number) => void
) {
  let rafId: number | null = null
  let lastScrollY = window.scrollY

  const loop = () => {
    const currentScrollY = window.scrollY
    if (currentScrollY !== lastScrollY) {
      lastScrollY = currentScrollY
      callback(currentScrollY)
    }
    rafId = requestAnimationFrame(loop)
  }

  onMounted(() => {
    rafId = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  })
}
