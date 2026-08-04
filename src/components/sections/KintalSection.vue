<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import {
  Users, HandHeart, TreePine, Mountain, MapPin, ExternalLink, Instagram,
  Trophy, Sparkles, ArrowUpRight, Gem, Music, MessageCircle, Compass,
} from 'lucide-vue-next'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
}, { threshold: 0.1 })

const pointIcons: Record<string, any> = {
  Users,
  HandHeart,
  TreePine,
  Mountain,
}

const getIcon = (name: string) => pointIcons[name] || Users

const themes: Record<string, { text: string; chip: string; dot: string; border: string; hover: string }> = {
  'from-emerald-500 to-green-600': {
    text: 'text-emerald-300',
    chip: 'bg-emerald-500/10 text-emerald-300/90',
    dot: 'bg-emerald-400',
    border: 'border-emerald-500/25',
    hover: 'hover:border-emerald-500/40 group-hover:shadow-emerald-500/20',
  },
  'from-cyan-500 to-sky-600': {
    text: 'text-cyan-300',
    chip: 'bg-cyan-500/10 text-cyan-300/90',
    dot: 'bg-cyan-400',
    border: 'border-cyan-500/25',
    hover: 'hover:border-cyan-500/40 group-hover:shadow-cyan-500/20',
  },
  'from-amber-500 to-orange-600': {
    text: 'text-amber-300',
    chip: 'bg-amber-500/10 text-amber-300/90',
    dot: 'bg-amber-400',
    border: 'border-amber-500/25',
    hover: 'hover:border-amber-500/40 group-hover:shadow-amber-500/20',
  },
  'from-purple-500 to-indigo-600': {
    text: 'text-purple-300',
    chip: 'bg-purple-500/10 text-purple-300/90',
    dot: 'bg-purple-400',
    border: 'border-purple-500/25',
    hover: 'hover:border-purple-500/40 group-hover:shadow-purple-500/20',
  },
}

const featured = nanciData.culturePoints.find((p) => p.featured) || nanciData.culturePoints[0]
const partners = nanciData.culturePoints.filter((p) => !p.featured)

const isInstagram = (link?: string) => !!link && link.includes('instagram.com')

const participationIcons = [Gem, Music, MessageCircle]
</script>

<template>
  <section id="kintal" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (42).webp" :opacity="0.25" :blur="4" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader
        title="Pontos de Cultura"
        badge="Rede de Saberes e Resistência"
        center
        subtitle="Pontos de Cultura, ONGs e coletivos por onde Dita transita — uma rede viva de saberes, arte e resistência na Serra da Mantiqueira."
      >
        <template #badge-icon>
          <Sparkles class="w-4 h-4 text-emerald-400" />
        </template>
      </SectionHeader>

      <!-- Featured: Guardiões da Terra -->
      <div
        class="relative rounded-3xl p-[1.5px] overflow-hidden transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/60 via-teal-400/20 to-green-500/40" />
        <div class="absolute inset-0 rounded-3xl animate-border-glow" />

        <div class="relative rounded-3xl glass overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-green-500/[0.05]" />
          <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-emerald-500/20 blur-3xl" />

          <div class="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 p-6 md:p-9 items-center">
            <div>
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg glow-emerald"
                >
                  <Trophy class="w-3.5 h-3.5" />
                  {{ featured.type }}
                </span>
                <span class="inline-flex items-center gap-1.5 text-sm text-emerald-200/90">
                  <Sparkles class="w-3.5 h-3.5" />
                  {{ featured.relation }}
                </span>
              </div>

              <h3 class="text-3xl md:text-4xl font-bold text-gradient mb-3">{{ featured.name }}</h3>

              <p class="text-white/75 text-fluid-base max-w-2xl leading-relaxed mb-6">
                {{ featured.description }}
              </p>

              <div class="flex flex-wrap gap-3 mb-7">
                <span
                  v-for="a in featured.activities"
                  :key="a"
                  class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 bg-white/5"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="themes[featured.color].dot"></span>
                  {{ a }}
                </span>
              </div>

              <a
                v-if="featured.link"
                :href="featured.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-emerald-950 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                style="background: linear-gradient(135deg, #6ee7b7 0%, #34d399 60%, #22d3ee 120%)"
              >
                <Instagram v-if="isInstagram(featured.link)" class="w-4 h-4" />
                <ExternalLink v-else class="w-4 h-4" />
                <span>Visitar Guardiões da Terra</span>
                <ArrowUpRight class="w-4 h-4" />
              </a>
            </div>

            <div class="hidden md:flex flex-col items-center gap-4 pr-2">
              <div
                class="w-28 h-28 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-2xl shrink-0"
                :class="featured.color"
              >
                <component :is="getIcon(featured.icon)" class="w-14 h-14 text-white drop-shadow-lg" />
              </div>
              <div class="text-center">
                <span class="text-emerald-300/80 text-xs font-medium">{{ featured.handle }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partner grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 items-stretch">
        <div
          v-for="(p, i) in partners"
          :key="p.name"
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
          :class="[themes[p.color].hover, isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
          :style="{ transitionDelay: `${120 + i * 90}ms` }"
        >
          <div class="absolute -top-14 -right-14 w-36 h-36 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-125" :class="['bg-gradient-to-br', p.color]" />

          <div class="relative z-10 p-6 h-full flex flex-col">
            <div class="flex items-start justify-between gap-3 mb-4">
              <div
                class="w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110"
                :class="p.color"
              >
                <component :is="getIcon(p.icon)" class="w-7 h-7 text-white drop-shadow" />
              </div>

              <div v-if="p.badge" class="flex flex-col items-end gap-1.5">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" :class="['bg-gradient-to-r', p.color]">
                  <Trophy class="w-3 h-3" />
                  {{ p.badge }}
                </span>
              </div>

              <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" :class="['bg-gradient-to-r', p.color, 'text-white/90']">
                {{ p.type }}
              </span>
            </div>

            <h3 class="text-lg font-bold text-white mb-1 leading-snug">{{ p.name }}</h3>

            <p class="text-xs font-medium mb-3 flex items-center gap-1.5" :class="themes[p.color].text">
              <span v-if="p.since" class="inline-flex items-center gap-1"><MapPin class="w-3 h-3" />{{ p.since }}</span>
              <span v-else>{{ p.relation }}</span>
            </p>

            <p class="text-white/50 text-sm leading-relaxed mb-4 flex-grow group-hover:text-white/70 transition-colors duration-300">
              {{ p.description }}
            </p>

            <!-- Encontro das Montanhas -->
            <div v-if="p.event" class="glass-light rounded-xl p-3.5 border border-white/10 mb-4">
              <div class="flex items-center gap-2 mb-1.5">
                <Mountain class="w-3.5 h-3.5" :class="themes[p.color].text" />
                <span class="text-white font-semibold text-xs">{{ p.event.name }}</span>
              </div>
              <p class="text-white/60 text-xs mb-2.5">{{ p.event.description }}</p>
              <div class="space-y-1.5">
                <div v-for="(part, j) in p.event.participations" :key="part" class="flex items-center gap-2 text-white/75 text-xs">
                  <component :is="participationIcons[j % participationIcons.length]" class="w-3 h-3" :class="themes[p.color].text" />
                  {{ part }}
                </div>
              </div>
            </div>

            <!-- Activities chips -->
            <div v-else class="flex flex-wrap gap-1.5 mb-4">
              <span
                v-for="a in p.activities"
                :key="a"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                :class="['backdrop-blur-md border', themes[p.color].chip, 'border-white/10']"
              >
                <span class="w-1 h-1 rounded-full" :class="themes[p.color].dot"></span>
                {{ a }}
              </span>
            </div>

            <div class="mt-auto">
              <a
                v-if="p.link"
                :href="p.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 hover:border-white/20 group/link"
              >
                <span>Visitar</span>
                <Instagram v-if="isInstagram(p.link)" class="w-3.5 h-3.5" />
                <ExternalLink v-else class="w-3.5 h-3.5" />
                <ArrowUpRight class="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
              <div v-else class="h-9" />
            </div>
          </div>
        </div>
      </div>

      <!-- Regional references -->
      <div
        class="glass-light rounded-2xl p-6 md:p-8 mt-8 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
              <Compass class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="text-white font-bold text-lg leading-tight">Rede Cultural da Região</h3>
              <p class="text-white/50 text-sm">Saberes que se espalham pela Mantiqueira</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="c in nanciData.regionalCulture"
            :key="c"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/5 backdrop-blur-md text-white/75 hover:text-white hover:bg-white/10 hover:border-teal-400/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"></span>
            {{ c }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>