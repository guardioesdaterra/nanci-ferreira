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
            translateY: [30, 0],
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
          <Sparkles class="w-4 h-4 text-amber-400" />
        </template>
      </SectionHeader>

      <p
        class="text-white/70 text-center text-fluid-base max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        {{ nanciData.lineage.description }}
      </p>

      <!-- Lineage chain -->
      <div class="grid md:grid-cols-3 gap-6 mb-14 items-stretch">
        <div v-for="(f, i) in nanciData.lineage.figures" :key="f.relation" class="lineage-figure relative card text-center" style="opacity: 0">
          <!-- connecting arrow -->
          <div v-if="i < nanciData.lineage.figures.length - 1" class="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 items-center justify-center z-20">
            <ArrowDown class="w-5 h-5 text-amber-400 rotate-[-90deg]" />
          </div>
          <div class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 border border-white/10">
            <component :is="getIcon(f.icon)" class="w-8 h-8" :class="f.color.includes('emerald') ? 'text-emerald-400' : f.color.includes('amber') ? 'text-amber-400' : 'text-purple-400'" />
          </div>
          <span class="text-amber-400/80 text-xs font-semibold uppercase tracking-wider">{{ f.relation }}</span>
          <h3 class="text-white font-bold text-lg mt-1">{{ f.name }}</h3>
          <p class="text-emerald-400 text-sm mb-3">{{ f.title }}</p>
          <p class="text-white/55 text-sm leading-relaxed">{{ f.description }}</p>
        </div>
      </div>

      <!-- Transmission -->
      <div class="glass rounded-3xl p-8 md:p-10 border border-amber-500/10 max-w-4xl mx-auto">
        <h3 class="text-white font-semibold text-center mb-6 text-xl">O que atravessa gerações</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div
            v-for="(t, i) in nanciData.lineage.transmission"
            :key="t"
            class="flex items-center gap-3 glass-light rounded-xl px-4 py-3"
          >
            <component :is="transmissionIcons[i % transmissionIcons.length]" class="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span class="text-white/80 text-sm">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>