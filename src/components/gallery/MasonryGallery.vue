<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

interface Props {
  images: GalleryImage[]
  categories?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => ['Todos'],
})

const activeCategory = ref('Todos')
const selectedIndex = ref<number | null>(null)
const visibleCount = ref(16)

const filteredImages = computed(() => {
  if (activeCategory.value === 'Todos') return props.images
  return props.images.filter((img) => img.category === activeCategory.value)
})

const displayedImages = computed(() => filteredImages.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredImages.value.length)

const loadMore = () => {
  visibleCount.value += 16
}

const setCategory = (cat: string) => {
  activeCategory.value = cat
  visibleCount.value = 16
}

const openLightbox = (index: number) => {
  selectedIndex.value = index
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedIndex.value = null
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (selectedIndex.value !== null && selectedIndex.value < displayedImages.value.length - 1) {
    selectedIndex.value++
  }
}

const prevImage = () => {
  if (selectedIndex.value !== null && selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (selectedIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div>
    <!-- Filter Bar -->
    <div class="flex flex-wrap gap-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(1.5rem,3vw,2rem)]">
      <button
        v-for="cat in categories"
        :key="cat"
        class="px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full text-fluid-sm font-medium transition-colors"
        :class="activeCategory === cat ? 'bg-emerald-500 text-white' : 'glass-light text-white/70 hover:text-white'"
        @click="setCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(0.5rem,1vw,0.75rem)]">
      <div
        v-for="(image, index) in displayedImages"
        :key="image.src"
        class="aspect-square rounded-xl overflow-hidden cursor-pointer group"
        @click="openLightbox(index)"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>

    <!-- Load More -->
    <div v-if="hasMore" class="mt-[clamp(2rem,4vw,3rem)] text-center">
      <button class="btn-outline" @click="loadMore">
        Carregar mais ({{ filteredImages.length - visibleCount }} restantes)
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedIndex !== null"
          class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          @click="closeLightbox"
        >
          <button
            v-if="selectedIndex > 0"
            class="absolute left-[clamp(1rem,2vw,1.25rem)] top-1/2 -translate-y-1/2 w-[clamp(2.5rem,5vw,3rem)] h-[clamp(2.5rem,5vw,3rem)] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10"
            @click.stop="prevImage"
          >
            <ChevronLeft class="size-fluid-icon-lg" />
          </button>
          
          <button
            v-if="selectedIndex < displayedImages.length - 1"
            class="absolute right-[clamp(1rem,2vw,1.25rem)] top-1/2 -translate-y-1/2 w-[clamp(2.5rem,5vw,3rem)] h-[clamp(2.5rem,5vw,3rem)] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10"
            @click.stop="nextImage"
          >
            <ChevronRight class="size-fluid-icon-lg" />
          </button>

          <img
            :src="displayedImages[selectedIndex].src"
            :alt="displayedImages[selectedIndex].alt"
            class="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            @click.stop
          />

          <button
            class="absolute top-[clamp(1rem,2vw,1.25rem)] right-[clamp(1rem,2vw,1.25rem)] w-[clamp(2.5rem,5vw,3rem)] h-[clamp(2.5rem,5vw,3rem)] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            @click="closeLightbox"
          >
            <X class="size-fluid-icon-lg" />
          </button>

          <div class="absolute bottom-[clamp(1rem,2vw,1.25rem)] left-1/2 -translate-x-1/2 text-white/60 text-fluid-sm">
            {{ selectedIndex + 1 }} / {{ displayedImages.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
