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

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    anime({
      targets: '.org-item',
      opacity: [0, 1],
      translateY: ['clamp(1rem, 2vw, 1.5625rem)', 0],
      delay: anime.stagger(70),
      duration: 550,
      easing: 'easeOutCubic',
    })
  }
}, { threshold: 0.1 })

const onCardMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--focus-x', `${e.clientX - rect.left}px`)
  card.style.setProperty('--focus-y', `${e.clientY - rect.top}px`)
}

interface Theme {
  icon: string
  container: string
  line: string
  orb: string
  orbHover: string
  focus: string
  hoverBorder: string
  title: string
  link: string
}

const orgThemes: Record<string, Theme> = {
  'from-emerald-600/30 to-green-700/30': {
    icon: 'text-emerald-400',
    container: 'border-emerald-500/20 bg-emerald-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent',
    orb: 'bg-emerald-500/[0.05]',
    orbHover: 'group-hover:bg-emerald-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,rgba(16,185,129,0.05)_45%,rgba(16,185,129,0)_70%)]',
    hoverBorder: 'hover:border-emerald-500/15',
    title: 'text-emerald-300',
    link: 'text-emerald-300/80 hover:text-white',
  },
  'from-cyan-600/30 to-blue-700/30': {
    icon: 'text-cyan-400',
    container: 'border-cyan-500/20 bg-cyan-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent',
    orb: 'bg-cyan-500/[0.05]',
    orbHover: 'group-hover:bg-cyan-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(6,182,212,0.16)_0%,rgba(6,182,212,0.05)_45%,rgba(6,182,212,0)_70%)]',
    hoverBorder: 'hover:border-cyan-500/15',
    title: 'text-cyan-300',
    link: 'text-cyan-300/80 hover:text-white',
  },
  'from-amber-600/30 to-orange-700/30': {
    icon: 'text-amber-400',
    container: 'border-amber-500/20 bg-amber-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent',
    orb: 'bg-amber-500/[0.05]',
    orbHover: 'group-hover:bg-amber-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(245,158,11,0.16)_0%,rgba(245,158,11,0.05)_45%,rgba(245,158,11,0)_70%)]',
    hoverBorder: 'hover:border-amber-500/15',
    title: 'text-amber-300',
    link: 'text-amber-300/80 hover:text-white',
  },
  'from-rose-600/30 to-red-700/30': {
    icon: 'text-rose-400',
    container: 'border-rose-500/20 bg-rose-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-rose-500/50 to-transparent',
    orb: 'bg-rose-500/[0.05]',
    orbHover: 'group-hover:bg-rose-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(244,63,94,0.16)_0%,rgba(244,63,94,0.05)_45%,rgba(244,63,94,0)_70%)]',
    hoverBorder: 'hover:border-rose-500/15',
    title: 'text-rose-300',
    link: 'text-rose-300/80 hover:text-white',
  },
  'from-purple-600/30 to-indigo-700/30': {
    icon: 'text-purple-400',
    container: 'border-purple-500/20 bg-purple-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent',
    orb: 'bg-purple-500/[0.05]',
    orbHover: 'group-hover:bg-purple-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(168,85,247,0.16)_0%,rgba(168,85,247,0.05)_45%,rgba(168,85,247,0)_70%)]',
    hoverBorder: 'hover:border-purple-500/15',
    title: 'text-purple-300',
    link: 'text-purple-300/80 hover:text-white',
  },
  'from-teal-600/30 to-emerald-700/30': {
    icon: 'text-teal-400',
    container: 'border-teal-500/20 bg-teal-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-teal-500/50 to-transparent',
    orb: 'bg-teal-500/[0.05]',
    orbHover: 'group-hover:bg-teal-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(20,184,166,0.16)_0%,rgba(20,184,166,0.05)_45%,rgba(20,184,166,0)_70%)]',
    hoverBorder: 'hover:border-teal-500/15',
    title: 'text-teal-300',
    link: 'text-teal-300/80 hover:text-white',
  },
  'from-teal-600/30 to-cyan-700/30': {
    icon: 'text-cyan-400',
    container: 'border-cyan-500/20 bg-cyan-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent',
    orb: 'bg-cyan-500/[0.05]',
    orbHover: 'group-hover:bg-cyan-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(6,182,212,0.16)_0%,rgba(6,182,212,0.05)_45%,rgba(6,182,212,0)_70%)]',
    hoverBorder: 'hover:border-cyan-500/15',
    title: 'text-cyan-300',
    link: 'text-cyan-300/80 hover:text-white',
  },
  'from-pink-600/30 to-rose-700/30': {
    icon: 'text-pink-400',
    container: 'border-pink-500/20 bg-pink-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-pink-500/50 to-transparent',
    orb: 'bg-pink-500/[0.05]',
    orbHover: 'group-hover:bg-pink-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(236,72,153,0.16)_0%,rgba(236,72,153,0.05)_45%,rgba(236,72,153,0)_70%)]',
    hoverBorder: 'hover:border-pink-500/15',
    title: 'text-pink-300',
    link: 'text-pink-300/80 hover:text-white',
  },
  'from-green-600/30 to-emerald-700/30': {
    icon: 'text-green-400',
    container: 'border-green-500/20 bg-green-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-green-500/50 to-transparent',
    orb: 'bg-green-500/[0.05]',
    orbHover: 'group-hover:bg-green-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(34,197,94,0.16)_0%,rgba(34,197,94,0.05)_45%,rgba(34,197,94,0)_70%)]',
    hoverBorder: 'hover:border-green-500/15',
    title: 'text-green-300',
    link: 'text-green-300/80 hover:text-white',
  },
  'from-blue-600/30 to-sky-700/30': {
    icon: 'text-blue-400',
    container: 'border-blue-500/20 bg-blue-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent',
    orb: 'bg-blue-500/[0.05]',
    orbHover: 'group-hover:bg-blue-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(59,130,246,0.16)_0%,rgba(59,130,246,0.05)_45%,rgba(59,130,246,0)_70%)]',
    hoverBorder: 'hover:border-blue-500/15',
    title: 'text-blue-300',
    link: 'text-blue-300/80 hover:text-white',
  },
  'from-red-600/30 to-orange-700/30': {
    icon: 'text-red-400',
    container: 'border-red-500/20 bg-red-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-red-500/50 to-transparent',
    orb: 'bg-red-500/[0.05]',
    orbHover: 'group-hover:bg-red-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(239,68,68,0.16)_0%,rgba(239,68,68,0.05)_45%,rgba(239,68,68,0)_70%)]',
    hoverBorder: 'hover:border-red-500/15',
    title: 'text-red-300',
    link: 'text-red-300/80 hover:text-white',
  },
}

const getOrgTheme = (color: string): Theme => orgThemes[color] || orgThemes['from-emerald-600/30 to-green-700/30']
</script>

<template>
  <section id="organizacoes" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (42).webp" :opacity="0.2" :blur="6" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader title="Organizações e Movimentos" badge="Rede de Parcerias" center>
        <template #badge-icon>
          <Building class="size-fluid-icon text-emerald-400" />
        </template>
      </SectionHeader>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
        <div
          v-for="(org, i) in nanciData.organizations"
          :key="i"
          class="org-item relative glass rounded-2xl overflow-hidden border border-white/[0.04] transition-all duration-500 group"
          :class="getOrgTheme(org.color).hoverBorder"
          @mousemove="onCardMove"
          style="opacity: 0"
        >
          <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)]" :class="getOrgTheme(org.color).line" />
          <div class="absolute -top-12 -right-12 w-[clamp(7rem,10vw,11rem)] h-[clamp(7rem,10vw,11rem)] rounded-full blur-3xl pointer-events-none transition-all duration-700" :class="getOrgTheme(org.color).orb + ' ' + getOrgTheme(org.color).orbHover" />
          <div
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :class="getOrgTheme(org.color).focus"
            :style="{ left: 'var(--focus-x, 50%)', top: 'var(--focus-y, 50%)', width: 'clamp(8rem,16vw,14rem)', height: 'clamp(8rem,16vw,14rem)' }"
          >
            <div class="absolute inset-0 rounded-full grain opacity-[0.05] mix-blend-multiply" />
          </div>

          <div class="relative z-10 p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col h-full">
            <div class="flex items-start gap-[clamp(1rem,1.5vw,1.25rem)] mb-[clamp(0.75rem,1.2vw,1rem)]">
              <div
                class="rounded-2xl border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                :class="getOrgTheme(org.color).container"
                style="width: clamp(2.5rem,4vw,3.5rem); height: clamp(2.5rem,4vw,3.5rem);"
              >
                <component :is="getIcon(org.icon)" class="size-fluid-icon-lg" :class="getOrgTheme(org.color).icon" />
              </div>
              <div class="flex-1 min-w-0">
                <span class="block text-[clamp(0.6rem,0.55vw+0.1rem,0.7rem)] font-semibold uppercase tracking-widest mb-[clamp(0.25rem,0.5vw,0.375rem)]" :class="getOrgTheme(org.color).title">{{ org.role }}</span>
                <h3 class="text-white font-bold text-fluid-lg leading-snug">{{ org.name }}</h3>
              </div>
            </div>

            <p class="text-white/55 text-fluid-sm leading-relaxed flex-1">{{ org.description }}</p>

            <a
              v-if="org.link"
              :href="org.link"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-[clamp(0.75rem,1.2vw,1rem)] inline-flex items-center gap-[clamp(0.375rem,0.6vw,0.5rem)] text-fluid-xs font-semibold transition-colors duration-300 group/link"
              :class="getOrgTheme(org.color).link"
            >
              <span>Visitar</span>
              <ArrowUpRight class="size-fluid-icon transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
