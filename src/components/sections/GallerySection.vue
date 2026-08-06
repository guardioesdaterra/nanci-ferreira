<script setup lang="ts">
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { useIntersectionObserver, useSwipe, onKeyStroke } from '@vueuse/core'
import { Camera, Image as ImageIcon, Film, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Expand, PlayCircle, Loader2 } from 'lucide-vue-next'
import { getImagePath } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
}, { threshold: 0.05 })

const PHOTO_COUNT = 78
const PAGE_SIZE = 24
const GAP = 6

const thumbDims: [number, number][] = [
  [480,320], [480,320], [480,320], [480,320], [480,320], [480,320], [480,320], [480,320], [480,320], [480,719],
  [480,320], [480,719], [480,320], [480,719], [480,320], [480,320], [480,719], [480,719], [480,320], [480,719],
  [480,719], [480,320], [480,320], [480,320], [480,719], [480,320], [480,320], [480,719], [480,320], [480,320],
  [480,320], [480,320], [480,320], [480,320], [480,320], [480,270], [480,320], [480,321], [480,718], [480,320],
  [480,320], [480,640], [480,640], [480,394], [480,315], [480,270], [480,270], [480,853], [480,623], [480,360],
  [480,360], [480,270], [480,270], [480,270], [480,270], [480,320], [480,320], [480,320], [480,320], [480,320],
  [480,320], [480,320], [480,320], [480,499], [480,320], [480,349], [480,562], [480,480], [480,270], [480,266],
  [480,266], [480,640], [480,360], [480,360], [480,360], [480,270], [480,320], [480,320],
]

const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(3, '0')
  const [w, h] = thumbDims[i]
  return {
    thumb: getImagePath(`/galeria/thumbs/thumb-${n}.webp`),
    full: getImagePath(`/galeria/fotos/foto-${n}.webp`),
    alt: `Memória ${i + 1}`,
    w, h,
  }
})

const videos = [
  { src: getImagePath('/galeria/videos/video-001.webm'), poster: getImagePath('/galeria/thumbs/poster-001.webp'), title: 'Memória I', desc: 'Registros de momentos vividos na roça e na cultura popular.' },
  { src: getImagePath('/galeria/videos/video-002.webm'), poster: getImagePath('/galeria/thumbs/poster-002.webp'), title: 'Memória II', desc: 'Imagens da história e da trajetória cultural da Dita.' },
]

type Tab = 'fotos' | 'videos'
const activeTab = ref<Tab>('fotos')
const page = ref(1)
const totalPages = computed(() => Math.ceil(photos.length / PAGE_SIZE))
const pagedPhotos = computed(() => photos.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))

const stageRef = ref<HTMLElement | null>(null)
const photosGridRef = ref<HTMLElement | null>(null)
const gridHeight = ref(0)
const itemStyles = ref<Record<string, string>[]>([])

function computeLayout() {
  const el = photosGridRef.value
  if (!el) return
  const width = el.clientWidth
  if (width <= 0) return

  const cols = width >= 1024 ? 4 : width >= 500 ? 3 : 2
  const colW = (width - GAP * (cols - 1)) / cols
  const colH = new Array(cols).fill(0)
  const styles: Record<string, string>[] = []

  for (const p of pagedPhotos.value) {
    const h = Math.round(colW * (p.h / p.w))
    const c = colH.indexOf(Math.min(...colH))
    styles.push({
      position: 'absolute',
      left: `${c * (colW + GAP)}px`,
      top: `${colH[c]}px`,
      width: `${colW}px`,
      height: `${h}px`,
    })
    colH[c] += h + GAP
  }

  itemStyles.value = styles
  gridHeight.value = Math.max(...colH)
}

let ro: ResizeObserver | null = null

watch(isVisible, async (v) => {
  if (v) {
    await nextTick()
    await nextTick()
    computeLayout()
    if (photosGridRef.value && !ro) {
      ro = new ResizeObserver(() => computeLayout())
      ro.observe(photosGridRef.value)
    }
  }
})

onBeforeUnmount(() => ro?.disconnect())

watch(pagedPhotos, async () => {
  await nextTick()
  await nextTick()
  computeLayout()
})

watch(page, async () => {
  await nextTick()
  stageRef.value?.scrollTo({ top: 0 })
})

watch(activeTab, async () => {
  await nextTick()
  await nextTick()
  computeLayout()
})

const setTab = (tab: Tab) => { activeTab.value = tab; page.value = 1 }
const goToPage = (p: number) => { if (p >= 1 && p <= totalPages.value) page.value = p }

const lightboxIndex = ref<number | null>(null)
const lightboxRef = ref<HTMLElement | null>(null)
const lightboxLoaded = ref(false)
const currentPhoto = computed(() => lightboxIndex.value !== null ? photos[lightboxIndex.value] : null)

const openLightbox = (index: number) => {
  lightboxLoaded.value = false
  lightboxIndex.value = index
  document.body.style.overflow = 'hidden'
}
const closeLightbox = () => {
  lightboxIndex.value = null
  lightboxLoaded.value = false
  document.body.style.overflow = ''
}
const navigateLightbox = (dir: number) => {
  if (lightboxIndex.value === null) return
  const next = lightboxIndex.value + dir
  if (next >= 0 && next < photos.length) { lightboxLoaded.value = false; lightboxIndex.value = next }
}
const onLightboxImageLoad = () => { lightboxLoaded.value = true }

const { direction } = useSwipe(lightboxRef, {
  onSwipeEnd() {
    if (direction.value === 'left') navigateLightbox(1)
    if (direction.value === 'right') navigateLightbox(-1)
  }
})
onKeyStroke('Escape', closeLightbox)
onKeyStroke('ArrowRight', () => { if (lightboxIndex.value !== null) navigateLightbox(1) })
onKeyStroke('ArrowLeft', () => { if (lightboxIndex.value !== null) navigateLightbox(-1) })
</script>

<template>
  <section id="galeria" ref="sectionRef" class="relative min-h-screen w-full flex flex-col overflow-hidden pt-[clamp(2rem,4vw,4rem)] pb-[clamp(4rem,6vw,5rem)] px-[clamp(1rem,2vw,1.5rem)] sm:px-[clamp(1.25rem,2.5vw,1.5rem)] md:px-[clamp(1.5rem,3vw,1.5rem)]">
    <div class="absolute inset-0 -z-10">
      <img :src="getImagePath('/dita3.webp')" alt="" aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover opacity-[0.07] blur-sm scale-105" loading="lazy" decoding="async" />
      <div class="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#070707]/95 to-[#050505]" />
    </div>

    <div class="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0 relative z-10">
      <Transition name="slide-up">
        <div v-if="isVisible" class="text-center mb-[clamp(1.25rem,2.5vw,2.5rem)]">
          <span class="inline-flex items-center gap-[clamp(0.5rem,1vw,0.625rem)] glass-leaf rounded-full px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.3rem,0.6vw,0.375rem)] mb-[clamp(0.5rem,1vw,0.75rem)] border border-emerald-500/20 text-emerald-300 text-fluid-xs font-medium tracking-wide">
            <Camera class="size-fluid-icon" />
            Acervo
          </span>
          <h2 class="font-display text-fluid-2xl sm:text-fluid-3xl md:text-fluid-4xl text-gradient mb-[clamp(0.25rem,0.5vw,0.5rem)] tracking-tight leading-tight">Memórias em Movimento</h2>
          <div class="bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-500 mx-auto mb-[clamp(0.5rem,1vw,0.75rem)] rounded-full" style="width: clamp(3rem, 5vw, 4rem); height: clamp(2px, 0.4vw, 3px);" />
          <p class="text-white/55 text-fluid-sm sm:text-fluid-base max-w-xl mx-auto leading-relaxed">
            Fotos e vídeos que registram a trajetória de vida, cultura e conexão com a natureza.
          </p>
        </div>
      </Transition>

      <Transition name="fade" appear>
        <div v-if="isVisible" class="flex-1 flex flex-col min-h-0">
          <div class="flex justify-center mb-[clamp(0.75rem,1.5vw,1.25rem)]">
            <div class="inline-flex glass-light rounded-full p-[clamp(0.25rem,0.5vw,0.375rem)] gap-[clamp(0.125rem,0.3vw,0.25rem)]">
              <button class="px-[clamp(0.75rem,1.5vw,1.5rem)] py-[clamp(0.5rem,1vw,0.625rem)] rounded-full text-fluid-xs font-semibold flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] transition-all duration-300"
                :class="activeTab === 'fotos' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-white/55 hover:text-white hover:bg-white/10'"
                @click="setTab('fotos')">
                <ImageIcon class="size-fluid-icon flex-shrink-0" />
                <span>Fotos</span>
                <span class="text-fluid-xs font-medium px-[clamp(0.25rem,0.5vw,0.375rem)] py-[clamp(0.0625rem,0.15vw,0.125rem)] rounded-full flex-shrink-0"
                  :class="activeTab === 'fotos' ? 'bg-white/20' : 'bg-white/10'">{{ photos.length }}</span>
              </button>
              <button class="px-[clamp(0.75rem,1.5vw,1.5rem)] py-[clamp(0.5rem,1vw,0.625rem)] rounded-full text-fluid-xs font-semibold flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] transition-all duration-300"
                :class="activeTab === 'videos' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-white/55 hover:text-white hover:bg-white/10'"
                @click="setTab('videos')">
                <Film class="size-fluid-icon flex-shrink-0" />
                <span>Vídeos</span>
                <span class="text-fluid-xs font-medium px-[clamp(0.25rem,0.5vw,0.375rem)] py-[clamp(0.0625rem,0.15vw,0.125rem)] rounded-full flex-shrink-0"
                  :class="activeTab === 'videos' ? 'bg-white/20' : 'bg-white/10'">{{ videos.length }}</span>
              </button>
            </div>
          </div>

          <!-- Pagination — above grid -->
          <div v-if="activeTab === 'fotos'" class="mb-[clamp(0.75rem,1.5vw,1.25rem)] flex items-center justify-center" aria-live="polite">
            <div class="inline-flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] glass-light rounded-full px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.3rem,0.6vw,0.375rem)]">
              <button class="pag-btn" :disabled="page === 1" :class="{ 'opacity-25 pointer-events-none': page === 1 }" @click="goToPage(1)" aria-label="Primeira página">
                <ChevronsLeft class="size-fluid-icon" />
              </button>
              <button class="pag-btn" :disabled="page === 1" :class="{ 'opacity-25 pointer-events-none': page === 1 }" @click="goToPage(page - 1)" aria-label="Página anterior">
                <ChevronLeft class="size-fluid-icon" />
              </button>
              <span class="text-white/70 text-fluid-xs font-semibold tabular-nums px-[clamp(0.5rem,1vw,0.75rem)] min-w-[3rem] text-center select-none">
                {{ page }} / {{ totalPages }}
              </span>
              <button class="pag-btn" :disabled="page === totalPages" :class="{ 'opacity-25 pointer-events-none': page === totalPages }" @click="goToPage(page + 1)" aria-label="Próxima página">
                <ChevronRight class="size-fluid-icon" />
              </button>
              <button class="pag-btn" :disabled="page === totalPages" :class="{ 'opacity-25 pointer-events-none': page === totalPages }" @click="goToPage(totalPages)" aria-label="Última página">
                <ChevronsRight class="size-fluid-icon" />
              </button>
            </div>
          </div>

          <div ref="stageRef" class="flex-1 min-h-0">
            <div v-show="activeTab === 'fotos'" ref="photosGridRef" class="relative w-full"
              :style="{ height: gridHeight + 'px' }">
              <div v-for="(photo, i) in pagedPhotos" :key="`${page}-${i}`"
                class="absolute rounded-lg overflow-hidden cursor-pointer group"
                :style="itemStyles[i]"
                @click="openLightbox((page - 1) * PAGE_SIZE + i)">
                <img :src="photo.thumb" :alt="photo.alt"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" decoding="async" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div class="rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300" style="width: clamp(1.75rem, 3vw, 2.25rem); height: clamp(1.75rem, 3vw, 2.25rem);">
                    <Expand class="text-white" style="width: clamp(0.875rem, 1.5vw, 1rem); height: clamp(0.875rem, 1.5vw, 1rem);" />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'videos'" class="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.75rem,1.5vw,1.25rem)]">
              <div v-for="video in videos" :key="video.src"
                class="rounded-xl sm:rounded-2xl overflow-hidden glass border border-white/[0.08] group hover:border-white/[0.15] transition-all duration-500">
                <div class="relative aspect-video bg-black/50 overflow-hidden">
                  <video :src="video.src" :poster="video.poster" controls preload="metadata" playsinline
                    class="w-full h-full object-contain bg-black">Seu navegador não suporta vídeos HTML5.</video>
                  <div class="absolute top-[clamp(0.5rem,1vw,0.625rem)] left-[clamp(0.5rem,1vw,0.625rem)] pointer-events-none flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] glass-light rounded-full px-[clamp(0.5rem,1vw,0.625rem)] py-[clamp(0.2rem,0.4vw,0.25rem)]">
                    <PlayCircle class="size-fluid-icon text-emerald-400 flex-shrink-0" />
                    <span class="text-fluid-xs font-medium text-white/80">{{ video.title }}</span>
                  </div>
                </div>
                <div class="px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.5rem,1vw,0.875rem)] sm:px-[clamp(1rem,2vw,1rem)]">
                  <p class="text-white/60 text-fluid-xs leading-relaxed">{{ video.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxIndex !== null && currentPhoto" ref="lightboxRef"
          class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center touch-pan-y select-none" @click.self="closeLightbox">
          <button class="absolute top-[clamp(0.75rem,1.5vw,1rem)] right-[clamp(0.75rem,1.5vw,1rem)] z-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors" style="width: clamp(2.5rem, 4vw, 2.75rem); height: clamp(2.5rem, 4vw, 2.75rem);" @click="closeLightbox"><X style="width: clamp(1.125rem, 2vw, 1.25rem); height: clamp(1.125rem, 2vw, 1.25rem);" /></button>
          <button v-if="lightboxIndex > 0" class="nav-btn left-[clamp(0.5rem,1.5vw,1rem)] z-20" @click="navigateLightbox(-1)"><ChevronLeft class="text-white" style="width: clamp(1.25rem, 2.5vw, 1.5rem); height: clamp(1.25rem, 2.5vw, 1.5rem);" /></button>
          <button v-if="lightboxIndex < photos.length - 1" class="nav-btn right-[clamp(0.5rem,1.5vw,1rem)] z-20" @click="navigateLightbox(1)"><ChevronRight class="text-white" style="width: clamp(1.25rem, 2.5vw, 1.5rem); height: clamp(1.25rem, 2.5vw, 1.5rem);" /></button>
          <div class="relative max-w-[92vw] sm:max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] flex items-center justify-center">
            <Transition name="fade">
              <div v-if="!lightboxLoaded" class="absolute inset-0 flex items-center justify-center"><Loader2 class="text-emerald-400 animate-spin" style="width: clamp(1.5rem, 3vw, 2rem); height: clamp(1.5rem, 3vw, 2rem);" /></div>
            </Transition>
            <img :src="currentPhoto.full" :alt="currentPhoto.alt"
              class="lightbox-image max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain transition-opacity duration-300"
              :class="lightboxLoaded ? 'opacity-100' : 'opacity-0'" @load="onLightboxImageLoad" />
          </div>
          <div class="absolute bottom-0 left-0 right-0 pb-[clamp(1rem,2vw,1.5rem)] pt-[clamp(2rem,3vw,2.5rem)] bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] pointer-events-none">
            <div class="text-white/50 text-fluid-xs sm:hidden">← deslize para navegar →</div>
            <div class="glass-light rounded-full px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.3rem,0.6vw,0.375rem)] text-white/70 text-fluid-xs tabular-nums">{{ (lightboxIndex ?? 0) + 1 }} / {{ photos.length }}</div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.slide-up-enter-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(clamp(1rem, 2.5vw, 1.5rem)); }
.fade-enter-active { transition: opacity 0.8s ease 0.2s; }
.fade-enter-from { opacity: 0; }
.page-swap-enter-active { transition: opacity 0.15s ease; }
.page-swap-leave-active { transition: opacity 0.1s ease; }
.page-swap-enter-from, .page-swap-leave-to { opacity: 0; }

.pag-btn {
  @apply rounded-full flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all duration-200;
  width: clamp(1.75rem, 3vw, 2.25rem);
  height: clamp(1.75rem, 3vw, 2.25rem);
}
.nav-btn {
  @apply absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 active:bg-white/25 transition-all;
  width: clamp(2.5rem, 4vw, 3rem);
  height: clamp(2.5rem, 4vw, 3rem);
}
.lightbox-image {
  border-radius: clamp(2px, 0.4vw, 4px);
  filter: brightness(1.04) contrast(1.015);
  box-shadow: 0 0 clamp(5rem, 10vw, 6.25rem) rgba(0, 0, 0, 0.8);
  animation: lightboxReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes lightboxReveal {
  from { opacity: 0; transform: scale(1.03); }
  to { opacity: 1; transform: scale(1); }
}
.lightbox-enter-active { transition: opacity 0.25s ease; }
.lightbox-leave-active { transition: opacity 0.2s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }
</style>
