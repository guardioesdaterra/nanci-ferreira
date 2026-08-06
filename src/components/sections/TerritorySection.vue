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
            translateY: ['1.875rem', 0],
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
  <section id="territorio" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (63).webp" :opacity="0.35" :blur="3" gradient="dark" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader :title="nanciData.territory.title" :badge="nanciData.territory.badge" center>
        <template #badge-icon>
          <Flame class="size-fluid-icon text-amber-400" />
        </template>
      </SectionHeader>

      <p class="text-white/70 text-center text-fluid-base max-w-3xl mx-auto mb-[clamp(2rem,3vw,3rem)] leading-relaxed">
        {{ nanciData.territory.description }}
      </p>

      <!-- Frontier card -->
      <div class="territory-content card max-w-4xl mx-auto mb-[clamp(1.5rem,3vw,2.5rem)]" style="opacity: 0">
        <div class="flex flex-col md:flex-row items-start gap-[clamp(1.5rem,3vw,2rem)]">
          <div class="w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] rounded-2xl border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Compass class="size-fluid-icon-lg text-amber-400" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.5rem,1vw,1rem)]">
              <MapPin class="size-fluid-icon text-amber-400" />
              <h3 class="text-white font-bold text-fluid-lg">{{ nanciData.territory.frontier.title }}</h3>
            </div>
            <p class="text-white/60 text-fluid-sm leading-relaxed mb-[clamp(1rem,1.5vw,1.5rem)]">{{ nanciData.territory.frontier.description }}</p>
            <div class="flex flex-wrap gap-[clamp(0.5rem,1vw,1rem)]">
              <span v-for="feature in nanciData.territory.frontier.features" :key="feature" class="inline-flex items-center gap-[clamp(0.25rem,0.5vw,0.5rem)] px-[clamp(0.5rem,1.5vw,1rem)] py-[clamp(0.25rem,0.75vw,0.5rem)] rounded-full text-fluid-xs bg-amber-500/15 text-amber-200 border border-amber-500/20">
                <Landmark class="size-fluid-icon text-amber-400" />
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ancestral Futurism -->
      <div class="grid md:grid-cols-2 gap-[clamp(1.5rem,3vw,2rem)] items-stretch mb-[clamp(1.5rem,3vw,2.5rem)]">
        <div class="territory-content card" style="opacity: 0">
          <div class="w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] rounded-2xl border border-emerald-500/20 flex items-center justify-center mb-[clamp(1rem,1.5vw,1.5rem)]">
            <Sunrise class="size-fluid-icon-lg text-emerald-400" />
          </div>
          <h3 class="text-white font-bold text-fluid-lg mb-[clamp(0.5rem,1vw,1rem)]">{{ nanciData.territory.ancestralFuture.title }}</h3>
          <p class="text-white/60 text-fluid-sm leading-relaxed">{{ nanciData.territory.ancestralFuture.description }}</p>
        </div>

        <div class="territory-content glass-light rounded-2xl p-[clamp(1.5rem,3vw,3rem)] flex flex-col justify-center border border-emerald-500/15" style="opacity: 0">
          <Flame class="size-fluid-icon-lg text-emerald-400 mb-[clamp(1rem,1.5vw,1.5rem)]" />
          <blockquote class="text-emerald-200/90 italic text-fluid-lg leading-relaxed text-center">
            "{{ nanciData.territory.ancestralFuture.quote }}"
          </blockquote>
          <span class="text-white/60 text-fluid-sm text-center mt-[clamp(1rem,1.5vw,1.5rem)]">{{ nanciData.territory.ancestralFuture.quoteAuthor }}</span>
        </div>
      </div>

      <!-- Landmarks -->
      <div class="territory-content flex flex-wrap justify-center gap-[clamp(0.75rem,1.5vw,1.5rem)]" style="opacity: 0">
        <span v-for="l in nanciData.territory.landmarks" :key="l" class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,1rem)] rounded-full text-fluid-sm bg-white/5 text-white/80 border border-white/10 hover:border-emerald-500/40 transition-colors">
          <Mountain class="size-fluid-icon text-emerald-400" />
          {{ l }}
        </span>
      </div>
    </div>
  </section>
</template>
