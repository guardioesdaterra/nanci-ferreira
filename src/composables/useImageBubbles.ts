import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { getImagePath } from '@/data/nanci-data'

export interface BubbleConfig {
  id: number
  src: string
  fullSrc: string
  alt: string
  x: number
  y: number
  size: number
  borderRadius: string
  opacity: number
  speed: number
  drift: number
  side: 'left' | 'right'
  delay: number
  floatAmplitude: number
  floatFrequency: number
}

interface UseImageBubblesOptions {
  count?: number
  startImage?: number
  endImage?: number
  minSize?: number
  maxSize?: number
  minOpacity?: number
  maxOpacity?: number
  scrollSpeed?: number
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateBubbleShape(rand: () => number): string {
  const r = () => 28 + rand() * 34
  return `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`
}

export function useImageBubbles(options: UseImageBubblesOptions = {}) {
  const {
    count = 28,
    startImage = 11,
    endImage = 47,
    minSize = 70,
    maxSize = 200,
    minOpacity = 0.5,
    maxOpacity = 0.9,
    scrollSpeed = 0.12,
  } = options

  const bubbles = ref<BubbleConfig[]>([])
  const docHeight = ref(1)

  const expandedId = ref<number | null>(null)

  let scrollY = 0
  let docHeightVal = 1

  let draggingId: number | null = null
  let dragStartX = 0
  let dragStartY = 0
  let dragOffsetX = 0
  let dragOffsetY = 0
  let hasMoved = false

  const elMap = new Map<number, HTMLElement>()
  let rafId: number | null = null

  const totalImages = endImage - startImage + 1

  const generateBubbles = (): BubbleConfig[] => {
    const rand = seededRandom(42)
    const result: BubbleConfig[] = []

    for (let i = 0; i < count; i++) {
      const imageIndex = startImage + (i % totalImages)
      const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right'
      const n = String(imageIndex).padStart(3, '0')

      result.push({
        id: i,
        src: getImagePath(`/galeria/thumbs/thumb-${n}.webp`),
        fullSrc: getImagePath(`/galeria/fotos/foto-${n}.webp`),
        alt: `Memória ${imageIndex}`,
        x: side === 'left'
          ? -2 + rand() * 10
          : 88 + rand() * 10,
        y: (i / count) * 85 + rand() * (85 / count) * 0.5,
        size: minSize + rand() * (maxSize - minSize),
        borderRadius: generateBubbleShape(rand),
        opacity: minOpacity + rand() * (maxOpacity - minOpacity),
        speed: 0.3 + rand() * 1.2,
        drift: (rand() - 0.5) * 20,
        side,
        delay: rand() * Math.PI * 2,
        floatAmplitude: 8 + rand() * 16,
        floatFrequency: 0.0008 + rand() * 0.0012,
      })
    }

    return result
  }

  const updateDimensions = () => {
    scrollY = window.scrollY
    docHeightVal = document.documentElement.scrollHeight
    docHeight.value = docHeightVal
  }

  const tick = () => {
    scrollY = window.scrollY
    const isDragging = draggingId !== null
    const dragId = draggingId
    const dx = dragOffsetX
    const dy = dragOffsetY
    const expId = expandedId.value

    for (const bubble of bubbles.value) {
      const el = elMap.get(bubble.id)
      if (!el) continue

      const t = scrollY
      const parallax = t * scrollSpeed * bubble.speed
      const floatY = Math.sin((t * bubble.floatFrequency + bubble.delay) * bubble.speed) * bubble.floatAmplitude
      const floatX = Math.cos((t * bubble.floatFrequency * 0.7 + bubble.delay + 1.5) * bubble.speed) * (bubble.floatAmplitude * 0.4)
      const wobble = Math.sin((t * 0.0003 + bubble.delay) * 2) * 3

      let translateX = floatX + wobble
      let translateY = -parallax + floatY
      let scale = 1

      if (isDragging && dragId === bubble.id) {
        translateX += dx
        translateY += dy
        scale = 1.08
      } else if (expId === bubble.id) {
        scale = 2.2
      }

      el.style.transform = `translate3d(${translateX}px,${translateY}px,0) scale(${scale})`
    }

    rafId = requestAnimationFrame(tick)
  }

  const registerEl = (id: number, el: HTMLElement | null) => {
    if (el) elMap.set(id, el)
    else elMap.delete(id)
  }

  const getBubbleStyle = (bubble: BubbleConfig) => {
    const isExpanded = expandedId.value === bubble.id
    const currentSize = isExpanded ? bubble.size * 2.2 : bubble.size

    return {
      left: `${bubble.x}%`,
      top: `${bubble.y}%`,
      width: `${currentSize}px`,
      height: `${currentSize}px`,
      borderRadius: bubble.borderRadius,
      opacity: isExpanded
        ? Math.min(bubble.opacity + 0.35, 0.95)
        : bubble.opacity,
      cursor: isExpanded ? 'zoom-out' : 'grab',
      zIndex: isExpanded ? 40 : 1,
      transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
    }
  }

  const getBubbleSrc = (bubble: BubbleConfig): string => {
    return expandedId.value === bubble.id ? bubble.fullSrc : bubble.src
  }

  const startDrag = (e: PointerEvent, bubble: BubbleConfig) => {
    e.preventDefault()
    draggingId = bubble.id
    dragStartX = e.clientX
    dragStartY = e.clientY
    dragOffsetX = 0
    dragOffsetY = 0
    hasMoved = false
  }

  const onDrag = (e: PointerEvent) => {
    if (draggingId === null) return

    const dx = e.clientX - dragStartX
    const dy = e.clientY - dragStartY

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMoved = true
    }

    dragOffsetX = dx
    dragOffsetY = dy
  }

  const endDrag = () => {
    if (draggingId === null) return

    const id = draggingId

    if (hasMoved) {
      const b = bubbles.value.find(b => b.id === id)
      if (b) {
        const newX = b.x + (dragOffsetX / window.innerWidth) * 100
        const newY = b.y + (dragOffsetY / docHeightVal) * 100
        b.x = Math.max(-5, Math.min(95, newX))
        b.y = Math.max(0, Math.min(95, newY))
      }
    } else {
      expandedId.value = expandedId.value === id ? null : id
    }

    draggingId = null
    dragOffsetX = 0
    dragOffsetY = 0
    hasMoved = false
  }

  onMounted(async () => {
    bubbles.value = generateBubbles()
    updateDimensions()
    await nextTick()
    rafId = requestAnimationFrame(tick)
    window.addEventListener('scroll', updateDimensions, { passive: true })
    window.addEventListener('resize', updateDimensions, { passive: true })
    window.addEventListener('pointermove', onDrag)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateDimensions)
    window.removeEventListener('resize', updateDimensions)
    window.removeEventListener('pointermove', onDrag)
    window.removeEventListener('pointerup', endDrag)
    window.removeEventListener('pointercancel', endDrag)
    if (rafId) cancelAnimationFrame(rafId)
    elMap.clear()
  })

  return {
    bubbles,
    getBubbleStyle,
    getBubbleSrc,
    startDrag,
    registerEl,
    docHeight,
  }
}
