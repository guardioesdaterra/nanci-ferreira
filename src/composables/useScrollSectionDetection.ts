import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Modern section detection using Intersection Observer API.
 * No scroll events needed - browser handles detection efficiently.
 * Perfect for navbar active state tracking.
 *
 * @param sections - Array of section IDs to monitor
 * @param threshold - Visibility threshold (default: 0.3)
 */
export function useScrollSectionDetection(
  sections: string[] = ['hero', 'sobre', 'lideranca', 'marcha', 'galeria', 'projetos', 'organizacoes'],
  threshold = 0.3
) {
  const activeSection = ref<string>('hero')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer!.observe(el)
      }
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { activeSection }
}

/**
 * Scroll progress tracker - efficient version using Intersection Observer
 * for milestone-based detection instead of scroll event polling.
 */
export function useScrollProgress() {
  const scrollProgress = ref(0)

  // Update progress on scroll using throttled event
  const updateProgress = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0
  }

  onMounted(() => {
    // Use throttled scroll with RAF for smooth progress updates
    let rafId: number | null = null
    let lastUpdate = 0

    const handleScroll = () => {
      const now = performance.now()
      if (now - lastUpdate >= 16) { // ~60fps throttle
        lastUpdate = now
        updateProgress()
      } else if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateProgress()
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  })

  return { scrollProgress }
}

/**
 * Optimized section detection using scroll position with caching.
 * Hybrid approach: caches element positions, uses throttled scroll.
 * Use this if you need precise scroll-based detection (e.g., parallax timing).
 */
export function useScrollSectionCache(
  sections: string[] = ['hero', 'sobre', 'lideranca', 'marcha', 'galeria', 'projetos', 'organizacoes']
) {
  const activeSection = ref<string>('hero')
  const sectionCache = ref<Map<string, number>>(new Map())

  const initCache = () => {
    sectionCache.value.clear()
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        sectionCache.value.set(id, el.offsetTop)
      }
    })
  }

  const detectActive = (scrollY: number) => {
    const cached = Array.from(sectionCache.value.entries())
    
    // Find the section with the highest offset that's still above scroll position
    for (let i = cached.length - 1; i >= 0; i--) {
      const [id, top] = cached[i]
      if (scrollY >= top - 200) {
        activeSection.value = id
        return
      }
    }
    
    activeSection.value = 'hero'
  }

  onMounted(() => {
    initCache()

    // Recalculate cache on resize (debounced)
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(initCache, 250)
    }

    // Throttled scroll updates
    let lastCall = 0
    let rafId: number | null = null
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastCall >= 16) { // ~60fps
        lastCall = now
        detectActive(window.scrollY)
      } else if (!rafId) {
        rafId = requestAnimationFrame(() => {
          detectActive(window.scrollY)
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  })

  return { activeSection }
}
