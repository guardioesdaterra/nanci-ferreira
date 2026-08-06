<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Crown, Users, GraduationCap, Music, HeartHandshake, School } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)

const iconComponents = {
  Crown,
  Users,
  GraduationCap,
  Music,
  HeartHandshake,
  School,
}

const getIcon = (name: string) => {
  return iconComponents[name as keyof typeof iconComponents]
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: '.leadership-card', opacity: [0, 1], translateY: ['1.25rem', 0], delay: anime.stagger(80), duration: 400, easing: 'easeOutCubic' })
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
  <section id="lideranca" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (94).webp" :opacity="0.35" :blur="3" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader :title="nanciData.leadership.title" badge="Ancestralidade" center>
        <template #badge-icon>
          <Crown class="text-amber-400 size-fluid-icon" />
        </template>
      </SectionHeader>

      <!-- Highlights -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-[clamp(0.75rem,1.5vw,1rem)] mb-[clamp(1.5rem,3vw,2rem)]">
        <div v-for="(h, i) in nanciData.leadership.highlights" :key="i" class="leadership-card card" style="opacity:0">
          <div class="flex items-start gap-[clamp(0.5rem,1vw,0.75rem)]">
            <div class="rounded-lg border border-white/10 flex items-center justify-center flex-shrink-0" style="width: clamp(2rem, 4vw, 2.5rem); height: clamp(2rem, 4vw, 2.5rem);">
              <component :is="getIcon(h.icon)" class="size-fluid-icon" :class="h.color.includes('emerald') ? 'text-emerald-400' : h.color.includes('amber') ? 'text-amber-400' : h.color.includes('purple') ? 'text-purple-400' : h.color.includes('rose') ? 'text-rose-400' : h.color.includes('cyan') ? 'text-cyan-400' : 'text-emerald-400'" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(0.25rem,0.5vw,0.375rem)]">
                <h3 class="text-white font-semibold text-fluid-xs truncate">{{ h.title }}</h3>
                <span class="text-white/50 text-fluid-xs flex-shrink-0">{{ h.year }}</span>
              </div>
              <p class="text-amber-400/80 text-fluid-xs mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ h.subtitle }}</p>
              <p class="text-white/60 text-fluid-xs">{{ h.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Activism -->
      <div class="glass rounded-2xl p-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto text-center">
        <h3 class="text-white font-semibold mb-[clamp(0.5rem,1vw,0.75rem)] text-fluid-lg">Áreas de Atuação</h3>
        <div class="flex flex-wrap justify-center gap-[clamp(0.375rem,0.8vw,0.5rem)]">
          <span v-for="a in nanciData.activism" :key="a" class="px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.25rem)] rounded-full text-fluid-xs bg-white/5 text-white/80 border border-white/10">{{ a }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
