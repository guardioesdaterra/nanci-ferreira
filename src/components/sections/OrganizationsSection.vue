<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Users, Music, Mountain, Globe, Building, Leaf, GraduationCap, Heart, Shield, ArrowUpRight } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const iconComponents: Record<string, any> = {
  Globe,
  Building,
  Leaf,
  Users,
  Music,
  Mountain,
  Heart,
  GraduationCap,
  Shield,
}

const getIcon = (name: string) => iconComponents[name]

const getIconColor = (color: string) => {
  const colorMap: Record<string, string> = {
    'from-emerald-600/30 to-green-700/30': 'text-emerald-400',
    'from-cyan-600/30 to-blue-700/30': 'text-cyan-400',
    'from-amber-600/30 to-orange-700/30': 'text-amber-400',
    'from-rose-600/30 to-red-700/30': 'text-rose-400',
    'from-purple-600/30 to-indigo-700/30': 'text-purple-400',
    'from-teal-600/30 to-emerald-700/30': 'text-teal-400',
    'from-teal-600/30 to-cyan-700/30': 'text-teal-400',
    'from-pink-600/30 to-rose-700/30': 'text-pink-400',
    'from-green-600/30 to-emerald-700/30': 'text-green-400',
    'from-blue-600/30 to-sky-700/30': 'text-blue-400',
    'from-red-600/30 to-orange-700/30': 'text-red-400',
  }
  return colorMap[color] || 'text-emerald-400'
}

const getGradientClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; glow: string; border: string }> = {
    'from-emerald-600/30 to-green-700/30': { bg: 'from-emerald-500 to-green-600', glow: 'group-hover:shadow-emerald-500/20', border: 'group-hover:border-emerald-500/30' },
    'from-cyan-600/30 to-blue-700/30': { bg: 'from-cyan-500 to-blue-600', glow: 'group-hover:shadow-cyan-500/20', border: 'group-hover:border-cyan-500/30' },
    'from-amber-600/30 to-orange-700/30': { bg: 'from-amber-500 to-orange-600', glow: 'group-hover:shadow-amber-500/20', border: 'group-hover:border-amber-500/30' },
    'from-rose-600/30 to-red-700/30': { bg: 'from-rose-500 to-red-600', glow: 'group-hover:shadow-rose-500/20', border: 'group-hover:border-rose-500/30' },
    'from-purple-600/30 to-indigo-700/30': { bg: 'from-purple-500 to-indigo-600', glow: 'group-hover:shadow-purple-500/20', border: 'group-hover:border-purple-500/30' },
    'from-teal-600/30 to-emerald-700/30': { bg: 'from-teal-500 to-emerald-600', glow: 'group-hover:shadow-teal-500/20', border: 'group-hover:border-teal-500/30' },
    'from-teal-600/30 to-cyan-700/30': { bg: 'from-teal-500 to-cyan-600', glow: 'group-hover:shadow-teal-500/20', border: 'group-hover:border-teal-500/30' },
    'from-pink-600/30 to-rose-700/30': { bg: 'from-pink-500 to-rose-600', glow: 'group-hover:shadow-pink-500/20', border: 'group-hover:border-pink-500/30' },
    'from-green-600/30 to-emerald-700/30': { bg: 'from-green-500 to-emerald-600', glow: 'group-hover:shadow-green-500/20', border: 'group-hover:border-green-500/30' },
    'from-blue-600/30 to-sky-700/30': { bg: 'from-blue-500 to-sky-600', glow: 'group-hover:shadow-blue-500/20', border: 'group-hover:border-blue-500/30' },
    'from-red-600/30 to-orange-700/30': { bg: 'from-red-500 to-orange-600', glow: 'group-hover:shadow-red-500/20', border: 'group-hover:border-red-500/30' },
  }
  return colorMap[color] || { bg: 'from-emerald-500 to-green-600', glow: 'group-hover:shadow-emerald-500/20', border: 'group-hover:border-emerald-500/30' }
}

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    anime({
      targets: '.org-card',
      opacity: [0, 1],
      translateY: ['clamp(1rem, 2vw, 1.875rem)', 0],
      delay: anime.stagger(50),
      duration: 600,
      easing: 'easeOutCubic',
    })
  }
}, { threshold: 0.1 })
</script>

<template>
  <section id="organizacoes" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (42).webp" :opacity="0.2" :blur="6" gradient="subtle" />

    <div class="max-w-7xl mx-auto relative z-10">
      <SectionHeader title="Organizações e Movimentos" badge="Rede de Parcerias" center>
        <template #badge-icon>
          <Building class="size-fluid-icon text-emerald-400" />
        </template>
      </SectionHeader>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[clamp(0.75rem,1.5vw,1rem)]">
        <div
          v-for="(org, i) in nanciData.organizations"
          :key="i"
          class="org-card card group"
          :class="[getGradientClasses(org.color).glow, getGradientClasses(org.color).border]"
          :style="{ transitionDelay: `${i * 40}ms` }"
          style="opacity: 0"
        >
          <div class="flex items-start gap-[clamp(0.5rem,1vw,0.75rem)]">
            <div
              class="rounded-lg border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110"
              style="width: clamp(2rem, 4vw, 2.5rem); height: clamp(2rem, 4vw, 2.5rem);"
            >
              <component :is="getIcon(org.icon)" class="size-fluid-icon" :class="getIconColor(org.color)" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-semibold text-fluid-xs leading-snug mb-[clamp(0.125rem,0.25vw,0.25rem)]">{{ org.name }}</h3>
              <span
                class="inline-flex items-center px-[clamp(0.375rem,0.75vw,0.5rem)] py-[clamp(0.0625rem,0.15vw,0.125rem)] rounded-full text-fluid-xs font-bold uppercase tracking-wider text-white/95"
                :class="['bg-gradient-to-r', getGradientClasses(org.color).bg]"
              >
                {{ org.role }}
              </span>
            </div>
          </div>

          <p class="text-white/60 text-fluid-xs mt-[clamp(0.5rem,1vw,0.75rem)] leading-relaxed">{{ org.description }}</p>

          <a
            v-if="org.link"
            :href="org.link"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-[clamp(0.5rem,1vw,0.75rem)] inline-flex items-center gap-[clamp(0.375rem,0.75vw,0.5rem)] text-fluid-xs font-semibold text-white/50 hover:text-white transition-colors duration-300 group/link"
          >
            <span>Visitar</span>
            <ArrowUpRight class="size-fluid-icon transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
