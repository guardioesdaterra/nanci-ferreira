import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface VirtualScrollOptions {
  itemHeight: number
  containerHeight?: number
  buffer?: number // Extra items to render outside viewport
}

/**
 * Virtual scrolling for large lists.
 * Only renders visible items + buffer, dramatically improves performance.
 *
 * @param items - Array of items to virtualize
 * @param options - Configuration (itemHeight is required)
 */
export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
) {
  const {
    itemHeight,
    containerHeight = typeof window !== 'undefined' ? window.innerHeight : 600,
    buffer = 5
  } = options

  const scrollY = ref(0)
  const containerRef = ref<HTMLElement | null>(null)

  const visibleStart = computed(() => {
    const index = Math.floor(scrollY.value / itemHeight)
    return Math.max(0, index - buffer)
  })

  const visibleEnd = computed(() => {
    const index = Math.ceil((scrollY.value + containerHeight) / itemHeight)
    return Math.min(items.length, index + buffer)
  })

  const visibleItems = computed(() => {
    return items.slice(visibleStart.value, visibleEnd.value)
  })

  const offsetY = computed(() => visibleStart.value * itemHeight)

  const totalHeight = computed(() => items.length * itemHeight)

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement
    scrollY.value = target.scrollTop
  }

  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
    }
  })

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    visibleItems,
    offsetY,
    totalHeight,
    containerRef,
    visibleStart,
    visibleEnd,
    scrollY
  }
}

/**
 * Windowed grid virtual scrolling.
 * For 2D layouts (grids/galleries).
 */
export function useVirtualGrid<T>(
  items: T[],
  options: {
    itemWidth: number
    itemHeight: number
    containerWidth?: number
    containerHeight?: number
    gap?: number
    buffer?: number
  }
) {
  const {
    itemWidth,
    itemHeight,
    containerWidth = typeof window !== 'undefined' ? window.innerWidth : 800,
    containerHeight = typeof window !== 'undefined' ? window.innerHeight : 600,
    gap = 12,
    buffer = 1
  } = options

  const scrollY = ref(0)
  const containerRef = ref<HTMLElement | null>(null)

  // Calculate columns per row
  const colsPerRow = computed(() => {
    const availableWidth = containerWidth - 16 // padding
    const cellWidth = itemWidth + gap
    return Math.floor(availableWidth / cellWidth)
  })

  // Calculate total rows
  const totalRows = computed(() =>
    Math.ceil(items.length / colsPerRow.value)
  )

  // Calculate visible range
  const visibleStartRow = computed(() => {
    const row = Math.floor(scrollY.value / (itemHeight + gap))
    return Math.max(0, row - buffer)
  })

  const visibleEndRow = computed(() => {
    const row = Math.ceil((scrollY.value + containerHeight) / (itemHeight + gap))
    return Math.min(totalRows.value, row + buffer)
  })

  // Get visible items
  const visibleItems = computed(() => {
    const startIndex = visibleStartRow.value * colsPerRow.value
    const endIndex = Math.min(
      visibleEndRow.value * colsPerRow.value,
      items.length
    )
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index
    }))
  })

  const offsetY = computed(() => visibleStartRow.value * (itemHeight + gap))
  const totalHeight = computed(() => totalRows.value * (itemHeight + gap))

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement
    scrollY.value = target.scrollTop
  }

  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
    }
  })

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    visibleItems,
    offsetY,
    totalHeight,
    containerRef,
    colsPerRow,
    visibleStartRow,
    visibleEndRow,
    scrollY
  }
}

/**
 * Smooth scroll-to with animation.
 * Better UX than instant scroll.
 */
export function useSmoothScroll() {
  const scrollTo = (target: number | HTMLElement, options: ScrollBehavior = 'smooth') => {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options })
    } else {
      target.scrollIntoView({ behavior: options })
    }
  }

  const scrollToElement = (selector: string, options: ScrollBehavior = 'smooth') => {
    const el = document.querySelector(selector)
    if (el) {
      scrollTo(el as HTMLElement, options)
    }
  }

  return { scrollTo, scrollToElement }
}
