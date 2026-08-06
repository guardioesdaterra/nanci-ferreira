<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Leaf, Users, Crown, ArrowDown, Sparkles, Shovel, Gem, BookOpen } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)

const iconComponents = {
  Leaf,
  Users,
  Crown,
}

const transmissionIcons = [BookOpen, Shovel, Gem, Leaf, Users]

const getIcon = (name: string) => iconComponents[name as keyof typeof iconComponents]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.lineage-figure',
            opacity: [0, 1],
            translateY: ['1.875rem', 0],
            scale: [0.95, 1],
            delay: anime.stagger(120),
            duration: 600,
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
  <section id="linhagem" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (13).webp" :opacity="0.3" :blur="3" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader :title="nanciData.lineage.title" :badge="nanciData.lineage.badge" center>
        <template #badge-icon>
          <Sparkles class="size-fluid-icon text-amber-400" />
        </template>
      </SectionHeader>

      <p
        class="text-white/70 text-center text-fluid-base max-w-3xl mx-auto mb-[clamp(1.5rem,4vw,3rem)] leading-relaxed"
      >
        {{ nanciData.lineage.description }}
      </p>

      <!-- Lineage chain -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-[clamp(0.75rem,1.5vw,1.5rem)] md:gap-[clamp(1rem,2vw,1.5rem)] mb-[clamp(1.75rem,4vw,3.5rem)] items-stretch">
        <div v-for="(f, i) in nanciData.lineage.figures" :key="f.relation"
             class="lineage-figure relative card text-center"
             :class="i === nanciData.lineage.figures.length - 1 && nanciData.lineage.figures.length % 2 !== 0 ? 'col-span-2 md:col-span-1' : ''"
             style="opacity: 0">
          <!-- connecting arrow -->
          <div v-if="i < nanciData.lineage.figures.length - 1" class="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 items-center justify-center z-20">
            <ArrowDown class="size-fluid-icon text-amber-400 rotate-[-90deg]" />
          </div>
          <div class="w-[clamp(2.5rem,5vw,4rem)] h-[clamp(2.5rem,5vw,4rem)] mx-auto rounded-2xl flex items-center justify-center mb-[clamp(0.75rem,1.5vw,1rem)] border border-white/10">
            <component :is="getIcon(f.icon)" class="size-fluid-icon-lg" :class="f.color.includes('emerald') ? 'text-emerald-400' : f.color.includes('amber') ? 'text-amber-400' : 'text-purple-400'" />
          </div>
          <span class="text-amber-400/80 text-fluid-xs font-semibold uppercase tracking-wider">{{ f.relation }}</span>
          <h3 class="text-white font-bold text-fluid-lg mt-[clamp(0.125rem,0.3vw,0.25rem)]">{{ f.name }}</h3>
          <p class="text-emerald-400 text-fluid-sm mb-[clamp(0.5rem,1vw,0.75rem)]">{{ f.title }}</p>
          <p class="text-white/55 text-fluid-sm leading-relaxed">{{ f.description }}</p>
        </div>
      </div>

      <!-- Transmission -->
      <div class="glass rounded-3xl p-[clamp(1.5rem,3vw,2rem)] md:p-[clamp(2rem,4vw,2.5rem)] border border-amber-500/10 max-w-4xl mx-auto">
        <h3 class="text-white font-semibold text-center mb-[clamp(1rem,2vw,1.5rem)] text-fluid-xl">O que atravessa gerações</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-[clamp(0.5rem,1vw,0.75rem)]">
          <div
            v-for="(t, i) in nanciData.lineage.transmission"
            :key="t"
            class="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] glass-light rounded-xl px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.5rem,1vw,0.75rem)]"
          >
            <component :is="transmissionIcons[i % transmissionIcons.length]" class="size-fluid-icon text-amber-400 flex-shrink-0" />
            <span class="text-white/80 text-fluid-sm">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
