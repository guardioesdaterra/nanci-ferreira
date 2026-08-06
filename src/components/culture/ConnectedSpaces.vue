<script setup lang="ts">
import { Sparkles, Trophy, ArrowUpRight, Instagram, ExternalLink, HandHeart } from 'lucide-vue-next'
import type { CulturePoint } from '@/data/nanci-data'
import { themes, getIcon, isInstagram } from './theme'

defineProps<{
  points: CulturePoint[]
  show?: boolean
}>()
</script>

<template>
  <div
    class="relative rounded-3xl p-[clamp(1px,0.15vw,1.5px)] overflow-hidden transition-all duration-700"
    :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/60 via-amber-300/20 to-rose-500/50" />
    <div class="absolute inset-0 rounded-3xl animate-border-glow" />

    <div class="relative rounded-3xl glass overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-[clamp(2px,0.4vw,3px)] bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400" />
      <div class="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />

      <!-- Shared label -->
      <div class="relative z-10 flex items-center gap-[clamp(0.75rem,1.5vw,1.5rem)] px-[clamp(1rem,2vw,2rem)] pt-[clamp(1.25rem,2.5vw,2.5rem)]">
        <span class="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-emerald-400/40" />
        <span class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] text-fluid-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
          <Sparkles class="size-fluid-icon text-emerald-300" />
          O espaço mais conectado à trajetória de Dita
        </span>
        <span class="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-rose-400/40" />
      </div>

      <!-- Unified sections: divided, not split -->
      <div
        v-for="(p, i) in points"
        :key="p.name"
        class="relative z-10"
        :class="i > 0 ? 'border-t border-white/10' : ''"
      >
        <div class="absolute inset-0 bg-gradient-to-br" :class="themes[p.color].wash" />
        <div class="absolute -top-[clamp(4rem,8vw,8rem)] -right-[clamp(4rem,8vw,8rem)] w-[clamp(14rem,28vw,28rem)] h-[clamp(14rem,28vw,28rem)] rounded-full blur-3xl" :class="themes[p.color].orb" />

        <div class="relative z-10 grid md:grid-cols-[1fr_auto] gap-[clamp(1rem,2vw,2rem)] items-center p-[clamp(1.1rem,2.2vw,2.2rem)] md:p-[clamp(1.5rem,3vw,3rem)]">
          <div class="flex flex-col gap-[clamp(1rem,2vw,2rem)]">
            <span
              class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(0.75rem,1.5vw,1.5rem)] py-[clamp(0.375rem,0.75vw,0.75rem)] rounded-full text-fluid-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 shadow-lg w-fit"
            >
              <Trophy class="size-fluid-icon" />
              {{ p.type }}
            </span>

            <h3 class="text-fluid-2xl md:text-fluid-3xl font-bold text-gradient leading-tight">{{ p.name }}</h3>

            <div
              v-if="p.founders"
              class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(0.875rem,1.75vw,1.75rem)] py-[clamp(0.5rem,1vw,1rem)] rounded-xl backdrop-blur-md border border-white/15 w-fit"
              :class="themes[p.color].chip"
            >
              <HandHeart class="size-fluid-icon shrink-0" :class="themes[p.color].text" />
              <span class="text-fluid-xs font-semibold uppercase tracking-wide text-white">{{ p.founders }}</span>
            </div>

            <p class="text-white/90 text-fluid-sm leading-relaxed">
              {{ p.description }}
            </p>

            <div class="flex flex-wrap gap-[clamp(0.5rem,1vw,1rem)]">
              <span
                v-for="a in p.activities"
                :key="a"
                class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(0.875rem,1.75vw,1.75rem)] py-[clamp(0.375rem,0.75vw,0.75rem)] rounded-full text-fluid-xs font-semibold backdrop-blur-md border border-white/10"
                :class="themes[p.color].chip"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="themes[p.color].dot"></span>
                {{ a }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-[clamp(0.75rem,1.5vw,1.5rem)]">
              <a
                v-if="p.link"
                :href="p.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Visitar ${p.name}`"
                class="inline-flex items-center gap-[clamp(0.5rem,1vw,1rem)] px-[clamp(1.5rem,3vw,3rem)] py-[clamp(0.625rem,1.25vw,1.25rem)] rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                :style="{ background: themes[p.color].btn, color: themes[p.color].btnText }"
              >
                <Instagram v-if="isInstagram(p.link)" class="size-fluid-icon" />
                <ExternalLink v-else class="size-fluid-icon" />
                <span>Visitar {{ p.name }}</span>
                <ArrowUpRight class="size-fluid-icon" />
              </a>
              <p v-if="p.handle" class="text-fluid-xs font-medium tracking-wide text-white/70">{{ p.handle }}</p>
            </div>
          </div>

          <div
            class="w-[clamp(5rem,10vw,8rem)] h-[clamp(5rem,10vw,8rem)] rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-2xl shrink-0"
            :class="p.color"
          >
            <component :is="getIcon(p.icon)" class="w-[clamp(3rem,6vw,4.5rem)] h-[clamp(3rem,6vw,4.5rem)] text-white drop-shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
