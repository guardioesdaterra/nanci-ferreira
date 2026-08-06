<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Heart, ArrowRight, Sparkles, TreePine, Leaf, Instagram, Mail } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground } from '@/components/ui'

const sectionRef = ref<HTMLElement | null>(null)

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime.timeline({ easing: 'easeOutExpo' })
            .add({ targets: '.cta-icon', opacity: [0, 1], scale: [0.5, 1], duration: 800 })
            .add({ targets: '.cta-title', opacity: [0, 1], translateY: ['1.875rem', 0], duration: 800 }, '-=600')
            .add({ targets: '.cta-desc', opacity: [0, 1], translateY: ['1.25rem', 0], duration: 600 }, '-=500')
            .add({ targets: '.cta-buttons', opacity: [0, 1], translateY: ['1.25rem', 0], duration: 600 }, '-=400')
            .add({ targets: '.cta-quote', opacity: [0, 1], duration: 600 }, '-=300')
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="section-compact">
    <SectionBackground
      image-path="/nanci-dita-close.webp"
      :opacity="0.4"
      :blur="2"
      gradient="vignette"
    />

    <!-- Decorative elements -->
    <div class="absolute bottom-[clamp(2rem,5vw,6rem)] left-[clamp(1rem,3vw,6rem)] opacity-10">
      <TreePine class="text-emerald-500" style="width: clamp(4rem, 10vw, 6rem); height: clamp(4rem, 10vw, 6rem);" />
    </div>
    <div class="absolute top-[clamp(3rem,6vw,12rem)] right-[clamp(1rem,3vw,6rem)] opacity-10">
      <Leaf class="text-emerald-500 animate-float" style="width: clamp(3rem, 6vw, 4rem); height: clamp(3rem, 6vw, 4rem);" />
    </div>

    <div class="w-full max-w-3xl mx-auto text-center relative z-10 px-[5vw]">
      <div class="glass rounded-3xl p-[clamp(2rem,4vw,3rem)] border border-emerald-500/20 relative overflow-hidden">
        <!-- Animated background gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-rose-500/5 animate-gradient" />

        <div class="relative">
          <!-- Icon -->
          <div class="cta-icon rounded-full border border-rose-500/20 flex items-center justify-center mx-auto mb-[clamp(1.25rem,2.5vw,1.5rem)]" style="opacity: 0; width: clamp(3rem, 6vw, 4rem); height: clamp(3rem, 6vw, 4rem);">
            <Heart class="text-rose-400" style="width: clamp(1.5rem, 3vw, 2rem); height: clamp(1.5rem, 3vw, 2rem);" />
          </div>

          <!-- Title -->
          <h2 class="cta-title font-display text-fluid-3xl md:text-fluid-4xl mb-[clamp(0.75rem,1.5vw,1rem)] leading-tight" style="opacity: 0">
            <span class="text-gradient">Preservando Tradições,</span>
            <br />
            <span class="text-white">Construindo o Futuro</span>
          </h2>

          <!-- Description -->
          <p class="cta-desc text-fluid-base text-white/80 mb-[clamp(1.5rem,3vw,2rem)] leading-relaxed max-w-xl mx-auto" style="opacity: 0">
            Acompanhe a jornada de Nanci Ferreira e faça parte desta transformação que integra arte, sustentabilidade e sabedoria ancestral.
          </p>

          <!-- Buttons -->
          <div class="cta-buttons flex flex-col sm:flex-row gap-[clamp(0.5rem,1vw,0.75rem)] justify-center mb-[clamp(1.5rem,3vw,2rem)]" style="opacity: 0">
            <button class="btn-primary group" @click="scrollTo('#sobre')">
              <span>Conhecer a História</span>
              <ArrowRight class="group-hover:translate-x-1 transition-transform" style="width: clamp(0.875rem, 1.5vw, 1rem); height: clamp(0.875rem, 1.5vw, 1rem);" />
            </button>
            <a
              href="https://www.instagram.com/dita22067/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-outline group"
            >
              <Instagram style="width: clamp(0.875rem, 1.5vw, 1rem); height: clamp(0.875rem, 1.5vw, 1rem);" />
              <span>Seguir no Instagram</span>
            </a>
          </div>

          <!-- Contact -->
          <div class="cta-buttons flex justify-center gap-[clamp(0.75rem,1.5vw,1rem)] mb-[clamp(1.5rem,3vw,2rem)]" style="opacity: 0">
            <a
              href="mailto:dita.13.ferreira@gmail.com"
              class="inline-flex items-center gap-[clamp(0.5rem,1vw,0.625rem)] text-white/60 hover:text-emerald-400 transition-colors text-fluid-xs"
            >
              <Mail style="width: clamp(0.875rem, 1.5vw, 1rem); height: clamp(0.875rem, 1.5vw, 1rem);" />
              <span class="break-all">dita.13.ferreira@gmail.com</span>
            </a>
          </div>

          <!-- Quote -->
          <div class="cta-quote pt-[clamp(1rem,2vw,1.5rem)] border-t border-emerald-500/20" style="opacity: 0">
            <div class="flex justify-center mb-[clamp(0.5rem,1vw,0.75rem)]">
              <Sparkles class="text-emerald-400" style="width: clamp(1rem, 2vw, 1.25rem); height: clamp(1rem, 2vw, 1.25rem);" />
            </div>
            <blockquote class="text-emerald-200/80 italic text-fluid-sm leading-relaxed max-w-md mx-auto">
              "O simples é poderoso"
            </blockquote>
            <cite class="block text-white/55 mt-[clamp(0.5rem,1vw,0.75rem)] text-fluid-xs">
              — Nanci Ferreira
            </cite>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
