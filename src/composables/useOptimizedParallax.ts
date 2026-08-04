import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Optimized parallax using requestAnimationFrame instead of scroll events.
 * Reduces jank and improves performance compared to direct scroll listeners.
 *
 * @param speed - Parallax speed multiplier (0.5 = half scroll speed)
 */
export function useOptimizedParallax(speed = 0.5) {
  const offset = ref(0)
  let rafId: number | null = null
  let lastScrollY = 0

  const updateParallax = () => {
    offset.value = lastScrollY * speed
    rafId = requestAnimationFrame(updateParallax)
  }

  const handleScroll = () => {
    lastScrollY = window.scrollY
  }

  onMounted(() => {
    // Use passive scroll listener for position tracking
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Use RAF for smooth animation updates
    rafId = requestAnimationFrame(updateParallax)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  })

  return { offset }
}

/**
 * CSS-based parallax using transform3d (GPU accelerated).
 * Use this for better performance - apply the offset to an element's transform.
 *
 * Usage in template:
 * <div :style="{ transform: `translate3d(0, ${offset}px, 0)` }"></div>
 */
export function useCSS3Parallax(speed = 0.5) {
  const offset = ref(0)
  let ticking = false

  const update = () => {
    offset.value = window.scrollY * speed
    ticking = false
  }

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { offset }
}

/**
 * Element-specific parallax effect.
 * Tracks element position and applies parallax only when in viewport.
 * Prevents unnecessary calculations for off-screen elements.
 */
export function useElementParallax(elementRef: HTMLElement | null, speed = 0.5) {
  const offset = ref(0)
  let rafId: number | null = null
  let isInViewport = false

  // Use Intersection Observer to track viewport visibility
  const updateParallax = () => {
    if (isInViewport) {
      offset.value = window.scrollY * speed
    }
    rafId = requestAnimationFrame(updateParallax)
  }

  onMounted(() => {
    if (!elementRef) return

    // Monitor viewport visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting
      },
      { threshold: 0 }
    )

    observer.observe(elementRef)

    // Start RAF loop
    rafId = requestAnimationFrame(updateParallax)

    return () => {
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  })

  onUnmounted(() => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  })

  return { offset }
}

/**
 * Backdrop parallax effect using will-change and transform3d.
 * Optimized for background images and backdrop elements.
 *
 * @param speed - Parallax intensity (0.3-0.7 recommended for backgrounds)
 */
export function useBackdropParallax(speed = 0.3) {
  const translateY = ref(0)
  let rafId: number | null = null

  const update = () => {
    translateY.value = window.scrollY * speed
    rafId = requestAnimationFrame(update)
  }

  onMounted(() => {
    rafId = requestAnimationFrame(update)

    // Cleanup RAF on unmount
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { 
    style: {
      transform: `translate3d(0, ${translateY.value}px, 0)`,
      willChange: 'transform',
      backfaceVisibility: 'hidden'
    }
  }
}
