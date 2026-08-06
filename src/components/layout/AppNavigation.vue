<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Home, User, Building2, Instagram, Camera, Crown, Megaphone, Leaf, Flame, BookOpen } from 'lucide-vue-next'
import { useDevice, useScrollSectionDetection, useScrollProgress } from '@/composables'
import { getImagePath } from '@/data/nanci-data'

const { isMobile } = useDevice()
const { activeSection } = useScrollSectionDetection()
const { scrollProgress } = useScrollProgress()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const navItems = [
  { href: '#hero', label: 'Início', icon: Home },
  { href: '#sobre', label: 'Sobre', icon: User },
  { href: '#linhagem', label: 'Linhagem', icon: Leaf },
  { href: '#territorio', label: 'Território', icon: Flame },
  { href: '#metodo', label: 'Método', icon: BookOpen },
  { href: '#lideranca', label: 'Liderança', icon: Crown },
  { href: '#marcha', label: 'Marcha 2025', icon: Megaphone },
  { href: '#galeria', label: 'Galeria', icon: Camera },
  { href: '#organizacoes', label: 'Parcerias', icon: Building2 },
]

// Track scroll position for glass header effect with throttling
let rafId: number | null = null

const updateScrolled = () => {
  scrolled.value = window.scrollY > 50
}

const handleScrollThrottled = () => {
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      updateScrolled()
      rafId = null
    })
  }
}

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (!el) return
  
  // Use View Transitions API if available
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      el.scrollIntoView({ behavior: 'smooth' })
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const isActive = (href: string) => activeSection.value === href.slice(1)

onMounted(() => {
  updateScrolled() // Set initial state
  window.addEventListener('scroll', handleScrollThrottled, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollThrottled)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <!-- Desktop Header -->
  <header
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'glass py-[clamp(0.5rem,1vw,0.75rem)]' : 'py-[clamp(0.75rem,1.2vw,1rem)] bg-transparent'"
  >
    <div class="progress-bar" :style="{ width: `${scrollProgress}%` }" />
    
    <div class="max-w-7xl mx-auto px-[clamp(0.75rem,1.5vw,1rem)] flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] group" @click.prevent="scrollTo('#hero')">
        <div class="rounded-full border border-emerald-500/20 p-[clamp(0.125rem,0.25vw,0.125rem)] group-hover:scale-105 transition-transform" style="width: clamp(2rem, 3.5vw, 2.5rem); height: clamp(2rem, 3.5vw, 2.5rem);">
          <div class="w-full h-full rounded-full overflow-hidden bg-forest-950">
            <img :src="getImagePath('/dita_logo.png')" alt="Logo" class="w-full h-full object-cover" />
          </div>
        </div>
        <span class="font-bold text-fluid-lg">
          <span class="text-white">Nanci</span>
          <span class="text-emerald-400"> Ferreira</span>
        </span>
      </a>

      <nav class="flex items-center gap-[clamp(0.125rem,0.3vw,0.25rem)]">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="nav-link"
          :class="isActive(item.href) ? 'nav-link-active' : ''"
          @click.prevent="scrollTo(item.href)"
        >
          {{ item.label }}
          <span v-if="isActive(item.href)" class="nav-indicator" />
        </a>

        <a
          href="https://www.instagram.com/dita22067/"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-[clamp(0.5rem,1vw,0.625rem)] rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-transform"
          style="width: clamp(1.75rem, 3vw, 2.25rem); height: clamp(1.75rem, 3vw, 2.25rem);"
        >
          <Instagram class="text-white" style="width: clamp(0.875rem, 1.5vw, 1rem); height: clamp(0.875rem, 1.5vw, 1rem);" />
        </a>
      </nav>
    </div>
  </header>

  <!-- Mobile Header -->
  <header v-if="isMobile" class="fixed top-0 left-0 right-0 z-50 glass py-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(0.75rem,1.5vw,1rem)] safe-top">
    <div class="flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-[clamp(0.375rem,0.8vw,0.5rem)]" @click.prevent="scrollTo('#hero')">
        <div class="rounded-full border border-emerald-500/20 p-[clamp(0.125rem,0.25vw,0.125rem)]" style="width: clamp(1.75rem, 3.5vw, 2rem); height: clamp(1.75rem, 3.5vw, 2rem);">
          <div class="w-full h-full rounded-full overflow-hidden bg-forest-950">
            <img :src="getImagePath('/dita_logo.png')" alt="Logo" class="w-full h-full object-cover" />
          </div>
        </div>
        <span class="font-bold text-fluid-sm">
          <span class="text-white">Nanci</span>
          <span class="text-emerald-400"> Ferreira</span>
        </span>
      </a>

      <button
        class="hamburger-btn relative rounded-2xl flex items-center justify-center border border-white/[0.08] transition-all duration-300"
        style="width: clamp(2.25rem, 4.5vw, 2.75rem); height: clamp(2.25rem, 4.5vw, 2.75rem);"
        :class="mobileMenuOpen ? 'bg-white/[0.08] border-white/[0.15] scale-95' : 'bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.12]'"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Menu"
      >
        <span class="hamburger-lines" :class="{ open: mobileMenuOpen }">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>

    <div class="progress-bar" :style="{ width: `${scrollProgress}%` }" />
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition name="menu">
    <div
      v-if="isMobile && mobileMenuOpen"
      class="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-[clamp(6rem,15vw,6rem)] px-[clamp(1rem,3vw,1.25rem)] pb-[clamp(1rem,2vw,1.5rem)]"
    >
      <nav class="flex flex-col gap-[clamp(0.25rem,0.6vw,0.375rem)]">
        <a
          v-for="(item, i) in navItems"
          :key="item.href"
          :href="item.href"
          class="menu-item flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] px-[clamp(1rem,2.5vw,1.25rem)] py-[clamp(0.75rem,1.5vw,0.875rem)] rounded-2xl transition-all duration-300"
          :class="isActive(item.href) ? 'bg-emerald-500/[0.12] text-emerald-400 border border-emerald-500/20' : 'text-white/70 hover:bg-white/[0.05] border border-transparent'"
          :style="{ animationDelay: `${i * 40}ms` }"
          @click.prevent="scrollTo(item.href)"
        >
          <div class="rounded-xl flex items-center justify-center"
               style="width: clamp(1.75rem, 3.5vw, 2rem); height: clamp(1.75rem, 3.5vw, 2rem);"
               :class="isActive(item.href) ? 'bg-emerald-500/15' : 'bg-white/[0.06]'">
            <component :is="item.icon" class="size-fluid-icon" />
          </div>
          <span class="font-medium text-fluid-sm">{{ item.label }}</span>
        </a>

        <div class="h-px bg-white/[0.06] my-[clamp(0.375rem,0.8vw,0.5rem)]" />

        <a
          href="https://www.instagram.com/dita22067/"
          target="_blank"
          class="menu-item flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] px-[clamp(1rem,2.5vw,1.25rem)] py-[clamp(0.75rem,1.5vw,0.875rem)] rounded-2xl text-pink-400 hover:bg-white/[0.05] border border-transparent transition-all duration-300"
          :style="{ animationDelay: `${navItems.length * 40}ms` }"
        >
          <div class="rounded-xl flex items-center justify-center bg-pink-500/10"
               style="width: clamp(1.75rem, 3.5vw, 2rem); height: clamp(1.75rem, 3.5vw, 2rem);">
            <Instagram class="size-fluid-icon" />
          </div>
          <span class="font-medium text-fluid-sm">Instagram</span>
        </a>
      </nav>
    </div>
  </Transition>

  <!-- Mobile Bottom Navigation -->
  <nav v-if="isMobile" class="fixed bottom-0 left-0 right-0 z-50 glass safe-bottom border-t border-emerald-500/10">
    <div class="flex items-center justify-around py-[clamp(0.375rem,0.8vw,0.5rem)] px-[clamp(0.125rem,0.3vw,0.25rem)]">
      <a
        v-for="item in navItems.slice(0, 5)"
        :key="item.href"
        :href="item.href"
        class="flex flex-col items-center gap-[clamp(0.0625rem,0.15vw,0.125rem)] py-[clamp(0.375rem,0.8vw,0.5rem)] px-[clamp(0.375rem,0.8vw,0.5rem)] rounded-xl transition-all"
        :class="isActive(item.href) ? 'text-emerald-400 bg-emerald-500/10' : 'text-white/60'"
        @click.prevent="scrollTo(item.href)"
      >
        <component :is="item.icon" style="width: clamp(1.125rem, 2.2vw, 1.25rem); height: clamp(1.125rem, 2.2vw, 1.25rem);" />
        <span class="text-fluid-xs font-medium">{{ item.label }}</span>
      </a>

      <a
        href="https://www.instagram.com/dita22067/"
        target="_blank"
        class="flex flex-col items-center gap-[clamp(0.0625rem,0.15vw,0.125rem)] py-[clamp(0.375rem,0.8vw,0.5rem)] px-[clamp(0.375rem,0.8vw,0.5rem)] rounded-xl text-pink-400"
      >
        <Instagram style="width: clamp(1.125rem, 2.2vw, 1.25rem); height: clamp(1.125rem, 2.2vw, 1.25rem);" />
        <span class="text-fluid-xs font-medium">Social</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.progress-bar {
  @apply absolute bottom-0 left-0 h-0.5 bg-emerald-500/60;
  transition: width 0.15s ease-out;
}

.nav-link {
  @apply relative rounded-full text-fluid-sm font-medium text-white/70 transition-all duration-300;
  padding: clamp(0.375rem, 0.8vw, 0.5rem) clamp(0.625rem, 1.2vw, 0.75rem);
}

.nav-link:hover {
  @apply text-white bg-white/5;
}

.nav-link-active {
  @apply text-emerald-400 bg-emerald-500/10;
}

.nav-indicator {
  @apply absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full;
}

/* Hamburger animated lines */
.hamburger-lines {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(0.25rem, 0.5vw, 0.3125rem);
  width: clamp(1rem, 1.8vw, 1.125rem);
  height: clamp(1rem, 1.8vw, 1.125rem);
}

.hamburger-lines span {
  display: block;
  width: 100%;
  height: clamp(1px, 0.2vw, 1.5px);
  background: white;
  border-radius: clamp(6.25rem, 10vw, 6.25rem);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.hamburger-lines span:nth-child(1) {
  width: 100%;
}
.hamburger-lines span:nth-child(2) {
  width: 75%;
}

.hamburger-lines.open span:nth-child(1) {
  transform: translateY(clamp(0.325rem, 0.65vw, 0.40625rem)) rotate(45deg);
}
.hamburger-lines.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger-lines.open span:nth-child(3) {
  width: 100%;
  transform: translateY(clamp(-0.325rem, -0.65vw, -0.40625rem)) rotate(-45deg);
}

/* Menu overlay transitions */
.menu-enter-active {
  transition: opacity 0.3s ease;
}
.menu-leave-active {
  transition: opacity 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

/* Staggered menu item entrance */
.menu-item {
  animation: menuSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes menuSlideIn {
  from {
    opacity: 0;
    transform: translateX(clamp(-0.75rem, -1.5vw, -0.75rem));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
