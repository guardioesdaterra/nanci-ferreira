<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Leaf, Heart, ArrowDown, Star, Camera } from 'lucide-vue-next'
import { SectionBackground } from '@/components/ui'
import { nanciData, getImagePath } from '@/data/nanci-data'

const loaded = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width - 0.5) * 20
  mouseY.value = ((e.clientY - rect.top) / rect.height - 0.5) * 20
}

onMounted(() => {
  setTimeout(() => loaded.value = true, 100)
})

const scrollToAbout = () => {
  document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToGallery = () => {
  document.querySelector('#galeria')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section 
    id="hero" 
    class="relative w-full h-screen flex items-center justify-center overflow-hidden py-12 px-5 sm:py-16 sm:px-8 md:py-20 md:px-12 lg:py-[clamp(3rem,6vh,5rem)] lg:px-[clamp(1.5rem,5vw,4rem)]"
    @mousemove="handleMouseMove"
  >
    <SectionBackground
      image-path="/nanci-dita-full.webp"
      :opacity="0.35"
      :blur="3"
      gradient="vignette"
    />

    <!-- Ambient glow effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute rounded-full opacity-10"
        :style="{
          width: 'clamp(120px, 30vw, 25rem)',
          height: 'clamp(120px, 30vw, 25rem)',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.5) 0%, transparent 70%)',
          left: '10%',
          top: '20%',
          filter: 'blur(clamp(30px, 8vw, 6rem))',
          transform: `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)`
        }"
      />
      <div
        class="absolute rounded-full opacity-10"
        :style="{
          width: 'clamp(100px, 25vw, 22rem)',
          height: 'clamp(100px, 25vw, 22rem)',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)',
          right: '10%',
          bottom: '20%',
          filter: 'blur(clamp(25px, 6vw, 5rem))',
          transform: `translate(${-mouseX * 0.3}px, ${-mouseY * 0.3}px)`
        }"
      />
    </div>

    <!-- Floating particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 6" :key="i" 
        class="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-float"
        :style="{
          left: `${15 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${4 + i * 0.5}s`
        }"
      />
    </div>

    <div class="w-full max-w-5xl mx-auto text-center relative z-10 px-4 sm:px-6 md:px-8">
      <div 
        class="glass-glow rounded-2xl sm:rounded-[clamp(1.5rem,3vw,2rem)] p-5 sm:p-6 md:p-8 lg:p-[clamp(1.25rem,2.5vw,2rem)] border border-emerald-500/10 animate-border-glow"
        :style="{
          transform: `perspective(clamp(600px, 80vw, 1000px)) rotateX(${-mouseY * 0.02}deg) rotateY(${mouseX * 0.02}deg)`
        }"
      >
        <!-- Badge -->
        <div 
          class="hero-item inline-flex items-center gap-2 sm:gap-2.5 glass-light rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-5 md:mb-6 border border-emerald-500/20"
          :class="loaded ? 'animate-in' : 'opacity-0'"
          style="--delay: 0ms"
        >
          <Leaf class="text-emerald-400 w-4 h-4 sm:w-5 sm:h-5" />
          <span class="text-white/80 text-xs sm:text-sm md:text-base font-medium tracking-wide">Águas da Prata • Cascata</span>
          <Star class="text-amber-400 fill-amber-400 w-3 h-3 sm:w-4 sm:h-4" />
        </div>

        <!-- Title -->
        <h1 
          class="hero-item font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5.5vw,4.5rem)] mb-2 sm:mb-3 md:mb-4 tracking-tight leading-[1.05]"
          :class="loaded ? 'animate-in' : 'opacity-0'"
          style="--delay: 100ms"
        >
          <span class="text-gradient" v-html="nanciData.personal.title"></span>
        </h1>

        <!-- Subtitle -->
        <div 
          class="hero-item flex items-center justify-center gap-[clamp(0.75rem,1.5vw,1rem)] mb-[clamp(0.5rem,1vw,0.75rem)]"
          :class="loaded ? 'animate-in' : 'opacity-0'"
          style="--delay: 200ms"
        >
          <Heart class="text-rose-400 animate-pulse w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          <p class="text-lg sm:text-xl md:text-2xl text-white/90">
            <span class="text-emerald-400 font-semibold">"{{ nanciData.personal.nickname }}"</span>
          </p>
        </div>

        <!-- Age Badge -->
        <div 
          class="hero-item inline-block glass-light rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 border border-amber-500/20"
          :class="loaded ? 'animate-in' : 'opacity-0'"
          style="--delay: 300ms"
        >
          <span class="text-white/80 flex items-baseline gap-1.5 sm:gap-2">
            <span class="font-bold text-amber-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{{ nanciData.personal.age }}</span> 
            <span class="text-xs sm:text-sm md:text-base lg:text-lg">anos de sabedoria ancestral</span>
          </span>
        </div>

        <!-- Description -->
        <p 
          class="hero-item text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-3 sm:mb-4 md:mb-5 leading-relaxed"
          :class="loaded ? 'animate-in' : 'opacity-0'"
          style="--delay: 400ms"
        >
          "{{ nanciData.personal.quote }}"
        </p>

        <!-- Profile Image -->
        <div 
          class="hero-item relative mx-auto mb-[clamp(0.75rem,1.5vw,1rem)]"
          :class="loaded ? 'animate-in-scale' : 'opacity-0'"
          style="--delay: 500ms; width: clamp(7rem, 20vw, 16rem); height: clamp(7rem, 20vw, 16rem);"
        >
          <!-- Animated rings -->
          <div class="absolute rounded-full hero-ring" style="inset: clamp(-0.75rem, -2.5vw, -1.5rem); border: 2px solid rgba(52, 211, 153, 0.5); animation: hero-ring-1 2.5s ease-in-out infinite;" />
          <div class="absolute rounded-full hero-ring" style="inset: clamp(-1.25rem, -4vw, -2.75rem); border: 2px solid rgba(16, 185, 129, 0.4); animation: hero-ring-2 3.2s ease-in-out infinite 0.6s;" />
          <div class="absolute rounded-full hero-ring" style="inset: clamp(-1.75rem, -5.5vw, -4rem); border: 2px solid rgba(6, 182, 212, 0.35); animation: hero-ring-3 4s ease-in-out infinite 1s;" />
          <div class="absolute rounded-full hero-ring" style="inset: clamp(-2.25rem, -7vw, -5rem); border: 1px solid rgba(251, 191, 36, 0.2); animation: hero-ring-4 5s ease-in-out infinite 0.3s;" />
          
          <!-- Glow effect -->
          <div class="absolute rounded-full glow-pulse-wrapper" style="inset: clamp(-0.75rem, -2.5vw, -1.5rem); filter: blur(clamp(0.5rem, 1.5vw, 1rem)); background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);" />
          
          <!-- Image container -->
          <div class="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            <img
              :src="getImagePath('/dita-nobackground.png')"
              :alt="nanciData.personal.name"
              class="w-full h-full object-contain scale-[0.9] drop-shadow-2xl"
            />
          </div>
        </div>

        <!-- Info Pills -->
        <div 
          class="hero-item mb-3 sm:mb-4 md:mb-5"
          :class="loaded ? 'animate-in' : 'opacity-0'"
          style="--delay: 600ms"
        >
          <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div v-for="expertise in nanciData.expertise" :key="expertise.title" class="flex items-center gap-1.5 glass-light rounded-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors cursor-default">
              <Leaf class="text-emerald-400 w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span class="text-white/70 text-[0.65rem] sm:text-xs font-medium">{{ expertise.title }}</span>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="flex items-center gap-2.5 glass-light rounded-full px-4 sm:px-5 py-2.5 sm:py-3 border border-rose-500/20 hover:border-rose-500/40 transition-colors cursor-default">
              <Heart class="text-rose-400 w-5 h-5 sm:w-6 sm:h-6" />
              <span class="text-white/90 text-sm sm:text-base md:text-lg font-semibold">Líder Comunitária</span>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div 
          class="hero-item flex flex-wrap justify-center gap-3 sm:gap-4"
          :class="loaded ? 'animate-in' : 'opacity-0'"
          style="--delay: 700ms"
        >
          <button 
            class="btn-primary group"
            @click="scrollToAbout"
          >
            <span>Conheça seu trabalho</span>
            <ArrowDown class="group-hover:translate-y-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            class="btn-outline group"
            @click="scrollToGallery"
          >
            <Camera class="group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
            <span>Ver Galeria</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
      <span class="text-white/50 text-fluid-xs tracking-widest uppercase">Role para explorar</span>
      <div class="rounded-full border-2 border-white/20 flex items-start justify-center p-[clamp(0.5rem,1vw,0.625rem)]" style="width: clamp(1.5rem, 2.5vw, 1.5rem); height: clamp(2.5rem, 4vw, 2.5rem);">
        <div class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-item {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay);
  transform: translateZ(0);
  backface-visibility: hidden;
}

.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.hero-item:not(.animate-in):not(.animate-in-scale) {
  transform: translateY(clamp(1rem, 2vw, 1.875rem));
}

.animate-in-scale {
  opacity: 1 !important;
  transform: scale(1) !important;
}

.hero-item:not(.animate-in-scale):not(.animate-in) {
  transform: scale(0.9);
}

.glow-pulse-wrapper {
  animation: hero-glow 3s ease-in-out infinite 0.3s;
}

.title-highlight {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 800;
  background: linear-gradient(135deg, #34d399 0%, #10b981 40%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.4));
  display: inline-block;
  line-height: 1.1;
}
</style>
