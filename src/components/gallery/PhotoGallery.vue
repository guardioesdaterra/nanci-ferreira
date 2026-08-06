<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSwipe, onKeyStroke } from '@vueuse/core'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-vue-next'

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

const props = defineProps<{
  images: GalleryImage[]
  categories?: string[]
}>()

const activeCategory = ref('Todos')
const selectedIndex = ref<number | null>(null)
const visibleCount = ref(20)
const lightboxRef = ref<HTMLElement | null>(null)
const loadedImages = ref<Set<number>>(new Set())

const filteredImages = computed(() => {
  if (activeCategory.value === 'Todos') return props.images
  return props.images.filter((img) => img.category === activeCategory.value)
})

const displayedImages = computed(() => filteredImages.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredImages.value.length)
const currentImage = computed(() => selectedIndex.value !== null ? displayedImages.value[selectedIndex.value] : null)

const setCategory = (cat: string) => {
  activeCategory.value = cat
  visibleCount.value = 20
}

const openLightbox = (index: number) => {
  selectedIndex.value = index
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedIndex.value = null
  document.body.style.overflow = ''
}

const navigate = (dir: number) => {
  if (selectedIndex.value === null) return
  const next = selectedIndex.value + dir
  if (next >= 0 && next < displayedImages.value.length) {
    selectedIndex.value = next
  }
}

const onImageLoad = (index: number) => {
  loadedImages.value.add(index)
}

// Swipe gestures
const { direction } = useSwipe(lightboxRef, {
  onSwipeEnd() {
    if (direction.value === 'left') navigate(1)
    if (direction.value === 'right') navigate(-1)
  }
})

// Keyboard navigation
onKeyStroke('Escape', closeLightbox)
onKeyStroke('ArrowRight', () => navigate(1))
onKeyStroke('ArrowLeft', () => navigate(-1))

watch(activeCategory, () => {
  visibleCount.value = 20
  loadedImages.value.clear()
})
</script>

<template>
  <div>
    <!-- Category Filter -->
    <div class="flex flex-wrap gap-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(2rem,4vw,3rem)] justify-center">
      <button
        v-for="cat in categories"
        :key="cat"
        class="px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full text-fluid-sm font-medium transition-all duration-300"
        :class="activeCategory === cat 
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
          : 'glass-light text-white/70 hover:text-white hover:bg-white/10'"
        @click="setCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[clamp(0.5rem,1vw,0.75rem)] md:gap-[clamp(0.75rem,1.5vw,1rem)]">
      <div
        v-for="(image, index) in displayedImages"
        :key="`${image.src}-${index}`"
        class="gallery-item aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
        :style="{ '--delay': (index % 20) * 30 + 'ms' }"
        @click="openLightbox(index)"
      >
        <div v-if="!loadedImages.has(index)" class="absolute inset-0 bg-white/5 animate-pulse" />
        <img
           :src="image.src"
           :alt="image.alt"
           class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
           :class="loadedImages.has(index) ? 'opacity-100' : 'opacity-0'"
           loading="lazy"
           decoding="async"
           fetchpriority="low"
           @load="onImageLoad(index)"
        />
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div class="w-[clamp(2.5rem,5vw,2.75rem)] h-[clamp(2.5rem,5vw,2.75rem)] rounded-full backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:scale-100 scale-75 transition-transform duration-300">
            <Expand class="size-fluid-icon text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div v-if="hasMore" class="mt-[clamp(2.5rem,5vw,4rem)] text-center">
      <button 
        class="btn-outline group"
        @click="visibleCount += 20"
      >
        <span>Ver mais fotos</span>
        <span class="text-emerald-400">({{ filteredImages.length - visibleCount }})</span>
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="selectedIndex !== null && currentImage"
          ref="lightboxRef"
          class="fixed inset-0 z-[100] bg-black flex items-center justify-center touch-pan-y"
          @click.self="closeLightbox"
        >
          <!-- Cinema vignette overlay -->
          <div class="cinema-vignette pointer-events-none" />

          <!-- Navigation -->
          <button
            v-if="selectedIndex > 0"
            class="nav-btn left-[clamp(0.5rem,1vw,1rem)] md:left-[clamp(1rem,2vw,1.25rem)]"
            @click="navigate(-1)"
          >
            <ChevronLeft class="size-fluid-icon-lg" />
          </button>
          
          <button
            v-if="selectedIndex < displayedImages.length - 1"
            class="nav-btn right-[clamp(0.5rem,1vw,1rem)] md:right-[clamp(1rem,2vw,1.25rem)]"
            @click="navigate(1)"
          >
            <ChevronRight class="size-fluid-icon-lg" />
          </button>

          <!-- Image -->
          <div class="relative max-w-[95vw] max-h-[85vh]">
            <img
              :src="currentImage.src"
              :alt="currentImage.alt"
              class="cinema-image max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <!-- Close -->
          <button
            class="absolute top-[clamp(1rem,2vw,1.25rem)] right-[clamp(1rem,2vw,1.25rem)] w-[clamp(2.5rem,5vw,2.75rem)] h-[clamp(2.5rem,5vw,2.75rem)] rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            @click="closeLightbox"
          >
            <X class="size-fluid-icon" />
          </button>

          <!-- Counter -->
          <div class="absolute bottom-[clamp(1rem,2vw,1.25rem)] left-1/2 -translate-x-1/2 glass-light rounded-full px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] text-white/80 text-fluid-sm">
            {{ selectedIndex + 1 }} / {{ displayedImages.length }}
          </div>

          <!-- Swipe hint (mobile) -->
          <div class="absolute bottom-[clamp(3rem,6vw,4rem)] left-1/2 -translate-x-1/2 text-white/50 text-fluid-xs md:hidden">
            Deslize para navegar
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.gallery-item {
  animation: fadeSlideIn 0.5s ease-out backwards;
  animation-delay: var(--delay);
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(clamp(1rem, 2vw, 1.25rem)) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.nav-btn {
  @apply absolute top-1/2 -translate-y-1/2 w-[clamp(2.5rem,5vw,2.75rem)] h-[clamp(2.5rem,5vw,2.75rem)] rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-all z-10;
}

.nav-btn:hover {
  transform: translateY(-50%) scale(1.1);
}

.cinema-image {
  border-radius: clamp(3px, 0.4vw, 4px);
  filter: brightness(1.05) contrast(1.02);
  box-shadow: 0 0 clamp(6rem, 12vw, 7.5rem) rgba(0, 0, 0, 0.9);
  animation: cinemaReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.cinema-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 40%,
    rgba(0, 0, 0, 0.55) 75%,
    rgba(0, 0, 0, 0.9) 100%
  );
  animation: vignetteFade 0.6s ease;
}

@keyframes cinemaReveal {
  from {
    opacity: 0;
    transform: scale(1.04);
    filter: brightness(0.7) blur(clamp(2px, 0.4vw, 4px));
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1.05) contrast(1.02);
  }
}

@keyframes vignetteFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: all 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from img,
.lightbox-leave-to img {
  transform: scale(0.9);
}
</style>
