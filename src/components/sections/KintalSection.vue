<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import {
  MapPin, ExternalLink, Instagram, Camera,
  Trophy, Sparkles, ArrowUpRight, Gem, Music, MessageCircle, Compass,
} from 'lucide-vue-next'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { ConnectedSpaces, themes, getIcon, isInstagram } from '@/components/culture'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
}, { threshold: 0.1 })

const featured = nanciData.culturePoints.filter((p) => p.featured)
const partners = nanciData.culturePoints.filter((p) => !p.featured)

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
        subtitle="Pontos de Cultura, ONGs e coletivos por onde Dita transita — uma rede viva de saberes, arte e resistência."
      >
        <template #badge-icon>
          <Sparkles class="size-fluid-icon text-emerald-400" />
        </template>
      </SectionHeader>

      <!-- Featured: Pontos mais conectados à Dita -->
      <ConnectedSpaces :points="featured" :show="isVisible" />

      <!-- Partner network divider -->
      <div class="flex items-center gap-[clamp(1rem,2vw,2rem)] my-[clamp(1.5rem,3vw,3rem)] transition-opacity duration-700" :class="isVisible ? 'opacity-100' : 'opacity-0'">
        <span class="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-emerald-400/40" />
        <span class="flex items-center gap-[clamp(0.5rem,1vw,1rem)] text-fluid-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/70">
          <Trophy class="size-fluid-icon" />
          A Rede Local da Dita
        </span>
        <span class="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-emerald-400/40" />
      </div>

      <!-- Partner grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(0.75rem,1.5vw,1.5rem)] md:gap-[clamp(1rem,2vw,2rem)] items-stretch">
        <div
          v-for="(p, i) in partners"
          :key="p.name"
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
          :class="[themes[p.color].hover, isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
          :style="{ transitionDelay: `${120 + i * 90}ms` }"
        >
          <div class="absolute -top-[clamp(3.5rem,7vw,7rem)] -right-[clamp(3.5rem,7vw,7rem)] w-[clamp(9rem,18vw,18rem)] h-[clamp(9rem,18vw,18rem)] rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-125" :class="['bg-gradient-to-br', p.color]" />

          <div class="relative z-10 p-[clamp(0.875rem,1.5vw,1.25rem)] md:p-[clamp(1rem,2vw,1.5rem)] h-full flex flex-col">
            <div class="flex items-start justify-between gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.25rem,0.4vw,0.375rem)]">
              <div v-if="p.logo" class="w-[clamp(3rem,6vw,5.5rem)] h-[clamp(3rem,6vw,5.5rem)] rounded-xl bg-white flex items-center justify-center shadow-lg p-[clamp(0.375rem,0.75vw,0.75rem)] overflow-hidden transition-transform duration-500 group-hover:scale-110 shrink-0">
                <img :src="p.logo" :alt="`Logo ${p.name}`" class="w-full h-full object-contain" loading="lazy" />
              </div>
              <div v-else class="w-[clamp(3rem,6vw,5.5rem)] h-[clamp(3rem,6vw,5.5rem)] rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 shrink-0" :class="p.color">
                <component :is="getIcon(p.icon)" class="w-[clamp(1.5rem,3vw,2.75rem)] h-[clamp(1.5rem,3vw,2.75rem)] text-white drop-shadow" />
              </div>

              <div v-if="p.badge" class="flex flex-col items-end gap-[clamp(0.375rem,0.6vw,0.5rem)]">
                <span class="inline-flex items-center gap-[clamp(0.25rem,0.4vw,0.375rem)] px-[clamp(0.5rem,0.8vw,0.625rem)] py-[clamp(0.125rem,0.25vw,0.25rem)] rounded-full text-fluid-xs font-bold uppercase tracking-wider text-white" :class="['bg-gradient-to-r', p.color]">
                  <Trophy class="size-fluid-icon" />
                  {{ p.badge }}
                </span>
              </div>

              <span v-else class="inline-flex items-center px-[clamp(0.5rem,0.8vw,0.625rem)] py-[clamp(0.125rem,0.25vw,0.25rem)] rounded-full text-fluid-xs font-semibold uppercase tracking-wider" :class="['bg-gradient-to-r', p.color, 'text-white/90']">
                {{ p.type }}
              </span>
            </div>

            <h3 class="text-fluid-lg font-bold text-white leading-snug">{{ p.name }}</h3>

            <p v-if="p.handle" class="text-fluid-xs text-white/70 mt-0 tracking-wide">{{ p.handle }}</p>

            <p class="text-fluid-xs font-medium mt-0 mb-[clamp(0.25rem,0.4vw,0.375rem)] flex items-center gap-[clamp(0.375rem,0.75vw,0.75rem)]" :class="themes[p.color].text">
              <span v-if="p.since" class="inline-flex items-center gap-[clamp(0.25rem,0.4vw,0.375rem)]"><MapPin class="size-fluid-icon" />{{ p.since }}</span>
              <span v-else>{{ p.relation }}</span>
            </p>

            <p class="text-white/75 text-fluid-xs leading-relaxed group-hover:text-white/85 transition-colors duration-300">
              {{ p.description }}
            </p>

            <div class="mt-auto pt-[clamp(0.375rem,0.6vw,0.5rem)] border-t border-white/[0.06] space-y-[clamp(0.375rem,0.6vw,0.5rem)]">
              <div v-if="p.event" class="glass-light rounded-xl p-[clamp(0.5rem,0.8vw,0.75rem)] border border-white/10">
                <div class="flex items-center gap-[clamp(0.375rem,0.75vw,0.75rem)] mb-[clamp(0.125rem,0.2vw,0.125rem)]">
                  <Mountain class="size-fluid-icon" :class="themes[p.color].text" />
                  <span class="text-white font-semibold text-fluid-xs">{{ p.event.name }}</span>
                </div>
                <p class="text-white/75 text-fluid-xs mb-[clamp(0.25rem,0.4vw,0.375rem)]">{{ p.event.description }}</p>
                <div class="flex flex-wrap gap-[clamp(0.25rem,0.4vw,0.375rem)]">
                  <div v-for="(part, j) in p.event.participations" :key="part" class="flex items-center gap-[clamp(0.375rem,0.75vw,0.75rem)] text-white/75 text-fluid-xs">
                    <component :is="participationIcons[j % participationIcons.length]" class="size-fluid-icon" :class="themes[p.color].text" />
                    {{ part }}
                  </div>
                </div>
              </div>

              <div v-else class="flex flex-wrap gap-[clamp(0.25rem,0.4vw,0.375rem)]">
                <span
                  v-for="a in p.activities"
                  :key="a"
                  class="inline-flex items-center gap-[clamp(0.375rem,0.75vw,0.75rem)] px-[clamp(0.625rem,1.25vw,1.25rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] rounded-full text-fluid-xs font-medium"
                  :class="['backdrop-blur-md border', themes[p.color].chip, 'border-white/10']"
                >
                  <span class="w-1 h-1 rounded-full" :class="themes[p.color].dot"></span>
                  {{ a }}
                </span>
              </div>

              <div v-if="p.links && p.links.length" class="flex flex-wrap gap-[clamp(0.375rem,0.6vw,0.5rem)]">
                <a
                  v-for="l in p.links"
                  :key="l.label"
                  :href="l.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`${l.label} de ${p.name}`"
                  class="inline-flex items-center gap-[clamp(0.375rem,0.75vw,0.75rem)] px-[clamp(0.875rem,1.75vw,1.75rem)] py-[clamp(0.5rem,1vw,1rem)] rounded-full text-fluid-xs font-semibold transition-all duration-300 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 hover:border-white/20 whitespace-nowrap flex-shrink-0 group/link"
                >
                  <Instagram v-if="l.type === 'instagram'" class="size-fluid-icon" />
                  <Camera v-else-if="l.type === 'gallery'" class="size-fluid-icon" />
                  <ExternalLink v-else class="size-fluid-icon" />
                  {{ l.label }}
                </a>
              </div>
              <a
                v-else-if="p.link"
                :href="p.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Visitar ${p.name}`"
                class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(1rem,2vw,2rem)] py-[clamp(0.5rem,1vw,1rem)] rounded-full text-fluid-xs font-semibold transition-all duration-300 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 hover:border-white/20 group/link"
              >
                <span>Visitar</span>
                <Instagram v-if="isInstagram(p.link)" class="size-fluid-icon" />
                <ExternalLink v-else class="size-fluid-icon" />
                <ArrowUpRight class="size-fluid-icon transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Regional references -->
      <div
        class="glass-light rounded-2xl p-[clamp(1rem,2vw,2rem)] md:p-[clamp(1.25rem,2.5vw,2.5rem)] mt-[clamp(1.25rem,2.5vw,2.5rem)] transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div class="flex flex-wrap items-center justify-between gap-[clamp(0.75rem,1.5vw,1.5rem)] mb-[clamp(1rem,2vw,2rem)]">
          <div class="flex items-center gap-[clamp(0.75rem,1.5vw,1.5rem)]">
            <div class="w-[clamp(2.5rem,5vw,5rem)] h-[clamp(2.5rem,5vw,5rem)] rounded-xl border border-teal-500/20 flex items-center justify-center">
              <Compass class="size-fluid-icon-lg text-teal-400" />
            </div>
            <div>
              <h3 class="text-white font-bold text-fluid-lg leading-tight">Rede Cultural da Região</h3>
              <p class="text-white/60 text-fluid-sm">Saberes que se espalham pela região</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-[clamp(0.75rem,1.5vw,1.5rem)]">
          <span
            v-for="c in nanciData.regionalCulture"
            :key="c"
            class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(1rem,2vw,2rem)] py-[clamp(0.5rem,1vw,1rem)] rounded-full text-fluid-sm font-medium border border-white/10 bg-white/5 backdrop-blur-md text-white/75 hover:text-white hover:bg-white/10 hover:border-teal-400/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"></span>
            {{ c }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
