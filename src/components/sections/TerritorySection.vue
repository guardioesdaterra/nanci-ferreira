<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MapPin, Landmark, Sunrise, Flame, Compass, Mountain } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.territory-content',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(120),
            duration: 650,
            easing: 'easeOutCubic',
          })
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
  <section id="territorio" ref="sectionRef" class="section overflow-hidden">
    <SectionBackground image-path="/dita (63).webp" :opacity="0.35" :blur="3" gradient="dark" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader :title="nanciData.territory.title" :badge="nanciData.territory.badge" center>
        <template #badge-icon>
          <Flame class="w-4 h-4 text-amber-400" />
        </template>
      </SectionHeader>

      <p class="text-white/70 text-center text-fluid-base max-w-3xl mx-auto mb-12 leading-relaxed">
        {{ nanciData.territory.description }}
      </p>

      <!-- Frontier card -->
      <div class="territory-content card max-w-4xl mx-auto mb-10" style="opacity: 0">
        <div class="flex flex-col md:flex-row items-start gap-6">
          <div class="w-14 h-14 rounded-2xl border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Compass class="w-7 h-7 text-amber-400" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-3">
              <MapPin class="w-4 h-4 text-amber-400" />
              <h3 class="text-white font-bold text-lg">{{ nanciData.territory.frontier.title }}</h3>
            </div>
            <p class="text-white/60 text-sm leading-relaxed mb-4">{{ nanciData.territory.frontier.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="feature in nanciData.territory.frontier.features" :key="feature" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-amber-500/15 text-amber-200 border border-amber-500/20">
                <Landmark class="w-3.5 h-3.5 text-amber-400" />
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ancestral Futurism -->
      <div class="grid md:grid-cols-2 gap-6 items-stretch mb-10">
        <div class="territory-content card" style="opacity: 0">
          <div class="w-14 h-14 rounded-2xl border border-emerald-500/20 flex items-center justify-center mb-4">
            <Sunrise class="w-7 h-7 text-emerald-400" />
          </div>
          <h3 class="text-white font-bold text-lg mb-2">{{ nanciData.territory.ancestralFuture.title }}</h3>
          <p class="text-white/60 text-sm leading-relaxed">{{ nanciData.territory.ancestralFuture.description }}</p>
        </div>

        <div class="territory-content glass-light rounded-2xl p-8 flex flex-col justify-center border border-emerald-500/15" style="opacity: 0">
          <Flame class="w-8 h-8 text-emerald-400 mb-4" />
          <blockquote class="text-emerald-200/90 italic text-lg md:text-xl leading-relaxed text-center">
            "{{ nanciData.territory.ancestralFuture.quote }}"
          </blockquote>
          <span class="text-white/50 text-sm text-center mt-4">{{ nanciData.territory.ancestralFuture.quoteAuthor }}</span>
        </div>
      </div>

      <!-- Landmarks -->
      <div class="territory-content flex flex-wrap justify-center gap-3" style="opacity: 0">
        <span v-for="l in nanciData.territory.landmarks" :key="l" class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/5 text-white/80 border border-white/10 hover:border-emerald-500/40 transition-colors">
          <Mountain class="w-4 h-4 text-emerald-400" />
          {{ l }}
        </span>
      </div>
    </div>
  </section>
</template>