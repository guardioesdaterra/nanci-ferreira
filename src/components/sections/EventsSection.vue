<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sparkles, Music, Calendar, Users, GraduationCap, Gem } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)

const iconComponents = {
  Music,
  Calendar,
  Users,
  GraduationCap,
  Gem,
}

const getIcon = (name: string) => {
  return iconComponents[name as keyof typeof iconComponents]
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: '.event-item', opacity: [0, 1], translateY: ['0.9375rem', 0], delay: anime.stagger(60), duration: 400, easing: 'easeOutCubic' })
          observer.disconnect()
        }
      })
    },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (64).webp" :opacity="0.25" :blur="3" gradient="subtle" />

    <div class="max-w-4xl mx-auto relative z-10">
      <SectionHeader title="Eventos e Participações" badge="Agenda Cultural" center>
        <template #badge-icon>
          <Calendar class="size-fluid-icon text-emerald-400" />
        </template>
      </SectionHeader>

      <div class="card p-[clamp(1rem,2vw,1.5rem)] md:p-[clamp(1.5rem,3vw,2rem)]">
        <div class="flex flex-wrap justify-center gap-[clamp(0.5rem,1vw,0.75rem)]">
          <div v-for="e in nanciData.events" :key="e.name" class="event-item flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] glass-light rounded-full px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.375rem,0.8vw,0.5rem)] md:px-[clamp(1rem,2vw,1.5rem)] md:py-[clamp(0.5rem,1vw,0.75rem)]" style="opacity:0">
            <component :is="getIcon(e.icon)" class="size-fluid-icon text-emerald-400" />
            <span class="text-white/80 text-fluid-sm">{{ e.name }}</span>
          </div>
        </div>
      </div>

      <div class="mt-[clamp(1.5rem,3vw,2rem)] text-center">
        <span class="inline-flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] text-white/50 text-fluid-sm">
          <Sparkles class="size-fluid-icon text-emerald-400" />
          Participação ativa em eventos culturais e ambientais
        </span>
      </div>
    </div>
  </section>
</template>
