<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Sparkles, Shovel, Gem, Leaf, MapPin, Crown, Sprout, Globe, Megaphone } from 'lucide-vue-next'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const iconComponents = {
  Shovel,
  Gem,
  Leaf,
  Sprout,
  Globe,
  Megaphone,
}

const getIcon = (name: string) => {
  return iconComponents[name as keyof typeof iconComponents]
}

const iconColors = ['text-emerald-400', 'text-amber-400', 'text-cyan-400']

const highlightColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-400' },
}

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
}, { threshold: 0.1 })
</script>

<template>
  <section id="sobre" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita-maracatu.webp" :opacity="0.3" :blur="3" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader title="Sobre Nanci" badge="Visionária e Guardiã" center>
        <template #badge-icon>
          <Sparkles class="size-fluid-icon text-emerald-400" />
        </template>
      </SectionHeader>

      <!-- Bio Principal -->
      <div 
        class="glass-glow rounded-3xl p-[clamp(2rem,4vw,2.5rem)] md:p-[clamp(2.5rem,5vw,3rem)] mb-[clamp(2rem,4vw,2.5rem)] max-w-4xl mx-auto border border-emerald-500/10 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="flex items-center justify-center gap-[clamp(0.5rem,1vw,0.75rem)] text-amber-400 text-fluid-sm mb-[clamp(1.25rem,2.5vw,1.75rem)]">
          <MapPin class="size-fluid-icon" />
          <span class="font-medium">{{ nanciData.personal.location }}</span>
        </div>
        <p class="text-white/80 leading-relaxed text-center mb-[clamp(2rem,4vw,2.5rem)] text-fluid-lg max-w-2xl mx-auto">
          {{ nanciData.personal.bio }}
        </p>

        <!-- Bio Highlights -->
        <div class="grid sm:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)] mb-[clamp(2rem,4vw,2.5rem)]">
          <div
            v-for="(h, i) in nanciData.personal.bioHighlights"
            :key="h.label"
            class="flex items-start gap-[clamp(0.75rem,1.5vw,1rem)] p-[clamp(1rem,2vw,1.5rem)] rounded-xl border transition-all duration-500"
            :class="[
              highlightColors[h.color].bg,
              highlightColors[h.color].border,
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            ]"
            :style="{ transitionDelay: `${200 + i * 100}ms` }"
          >
            <div class="size-[clamp(2rem,3vw,2.5rem)] rounded-lg flex items-center justify-center flex-shrink-0" :class="highlightColors[h.color].bg">
              <component :is="getIcon(h.icon)" class="size-fluid-icon" :class="highlightColors[h.color].text" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(0.25rem,0.5vw,0.5rem)]">
                <span class="w-1.5 h-1.5 rounded-full" :class="highlightColors[h.color].dot" />
                <h4 class="font-semibold text-fluid-sm" :class="highlightColors[h.color].text">{{ h.label }}</h4>
              </div>
              <p class="text-white/60 text-fluid-xs leading-relaxed">{{ h.text }}</p>
            </div>
          </div>
        </div>

        <div
          class="inline-flex items-center gap-[clamp(0.625rem,1.25vw,0.875rem)] glass-light rounded-full px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.625rem,1.25vw,0.875rem)] border border-amber-500/20 mx-auto"
        >
          <Crown class="size-fluid-icon text-amber-400" />
          <span class="text-amber-300 text-fluid-sm font-medium">{{ nanciData.personal.lineageTitle }}</span>
        </div>
      </div>

      <!-- Expertise -->
      <div class="grid md:grid-cols-3 gap-[clamp(1.25rem,2.5vw,1.75rem)] mb-[clamp(2.5rem,5vw,3rem)]">
        <div 
          v-for="(skill, i) in nanciData.expertise" 
          :key="i" 
          class="card text-center group transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${200 + i * 100}ms` }"
        >
          <div
            class="size-[clamp(3rem,5vw,4rem)] mx-auto rounded-2xl flex items-center justify-center mb-[clamp(1rem,2vw,1.5rem)] transition-transform duration-300 group-hover:scale-110 border border-white/10"
          >
            <component :is="getIcon(skill.icon)" class="size-fluid-icon-lg" :class="iconColors[i]" />
          </div>
          <h3 class="text-white font-semibold mb-[clamp(0.5rem,1vw,0.75rem)] text-fluid-lg">{{ skill.title }}</h3>
          <p class="text-white/60 text-fluid-sm leading-relaxed">{{ skill.description }}</p>
        </div>
      </div>

      <!-- Cultura Popular -->
      <div 
        class="glass rounded-2xl p-[clamp(1.5rem,3vw,2rem)] max-w-2xl mx-auto text-center border border-amber-500/10 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition-delay: 500ms"
      >
        <h3 class="text-white font-semibold mb-[clamp(1rem,2vw,1.5rem)] text-fluid-lg">Cultura Popular</h3>
        <div class="flex flex-wrap justify-center gap-[clamp(0.5rem,1vw,0.75rem)]">
          <span 
            v-for="(g, i) in nanciData.folkCulture" 
            :key="g" 
            class="px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.375rem,0.75vw,0.5rem)] rounded-full text-fluid-sm bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/20 hover:border-amber-500/40 transition-colors cursor-default"
            :style="{ animationDelay: `${i * 50}ms` }"
          >
            {{ g }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
