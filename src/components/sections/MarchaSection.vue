<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Users, Heart, Megaphone } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { getImagePath } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: '.marcha-content', opacity: [0, 1], translateY: ['1.875rem', 0], delay: anime.stagger(100), duration: 600, easing: 'easeOutCubic' })
          observer.disconnect()
        }
      })
    },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<template>
  <section id="marcha" ref="sectionRef" class="section">
    <SectionBackground :image-path="getImagePath('/dita (banner-marcha).jpeg')" :opacity="0.4" :blur="2" gradient="dark" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader title="Marcha das Mulheres Negras 2025" badge="Liderança Anciã" center>
        <template #badge-icon>
          <Megaphone class="text-purple-400 size-fluid-icon" />
        </template>
      </SectionHeader>

      <div class="grid md:grid-cols-2 gap-[clamp(1.5rem,3vw,2rem)] items-center">
        <!-- Imagem Principal -->
        <div class="marcha-content" style="opacity:0">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              :src="getImagePath('/dita (marcha).jpeg')" 
              alt="Dita na Marcha das Mulheres Negras 2025" 
              class="w-full h-auto object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div class="absolute bottom-[clamp(0.75rem,1.5vw,1rem)] left-[clamp(0.75rem,1.5vw,1rem)] right-[clamp(0.75rem,1.5vw,1rem)]">
              <span class="inline-flex items-center gap-[clamp(0.5rem,1vw,0.625rem)] px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.25rem)] rounded-full bg-purple-500/80 text-white text-fluid-xs">
                <Heart class="size-fluid-icon" />
                Brasília, Janeiro 2025
              </span>
            </div>
          </div>
        </div>

        <!-- Conteúdo -->
        <div class="space-y-[clamp(1rem,2vw,1.5rem)]">
          <div class="marcha-content card" style="opacity:0">
            <div class="flex items-start gap-[clamp(0.75rem,1.5vw,1rem)]">
              <div class="rounded-xl border border-purple-500/20 flex items-center justify-center flex-shrink-0" style="width: clamp(2.5rem, 5vw, 3rem); height: clamp(2.5rem, 5vw, 3rem);">
                <Users class="text-purple-400" style="width: clamp(1.25rem, 2.5vw, 1.5rem); height: clamp(1.25rem, 2.5vw, 1.5rem);" />
              </div>
              <div>
                <h3 class="text-white font-bold text-fluid-lg mb-[clamp(0.375rem,0.8vw,0.5rem)]">Representando o Interior Paulista</h3>
                <p class="text-white/70 text-fluid-xs leading-relaxed">
                  Dita participou como liderança anciã na Marcha das Mulheres Negras 2025 em Brasília, 
                  representando as mulheres negras do interior de São Paulo e levando a voz da 
                  ancestralidade e resistência.
                </p>
              </div>
            </div>
          </div>

          <div class="marcha-content card" style="opacity:0">
            <blockquote class="text-white/80 italic text-center text-fluid-sm">
              "A luta das mulheres negras é a luta pela terra, pela cultura e pela dignidade de nosso povo."
            </blockquote>
            <p class="text-amber-400/80 text-fluid-xs text-center mt-[clamp(0.5rem,1vw,0.75rem)]">— Dita</p>
          </div>

          <div class="marcha-content flex flex-wrap gap-[clamp(0.375rem,0.8vw,0.5rem)] justify-center" style="opacity:0">
            <span class="px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.25rem)] rounded-full text-fluid-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">Ancestralidade</span>
            <span class="px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.25rem)] rounded-full text-fluid-xs bg-pink-500/20 text-pink-300 border border-pink-500/30">Resistência</span>
            <span class="px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.25rem)] rounded-full text-fluid-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">Cultura Popular</span>
          </div>
        </div>
      </div>

      <!-- Banner Secundário -->
      <div class="marcha-content mt-[clamp(2rem,4vw,3rem)]" style="opacity:0">
        <div class="relative rounded-2xl overflow-hidden" style="height: clamp(10rem, 20vw, 16rem);">
          <img 
            :src="getImagePath('/dita (banner-marcha).jpeg')" 
            alt="Banner Marcha das Mulheres Negras 2025" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-transparent to-pink-900/70" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <p class="text-white/90 text-fluid-lg md:text-fluid-xl font-semibold">Mulheres Negras em Marcha</p>
              <p class="text-white/60 text-fluid-xs mt-[clamp(0.25rem,0.5vw,0.25rem)]">Por terra, território e ancestralidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
