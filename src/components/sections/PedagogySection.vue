<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { BookOpen, Sprout, Gem, School, TentTree, LockOpen, CircleCheck } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    anime({
      targets: '.pedagogy-item',
      opacity: [0, 1],
      translateY: ['clamp(1rem, 2vw, 1.5625rem)', 0],
      delay: anime.stagger(90),
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

const pillarIcons: Record<string, any> = { BookOpen, Sprout, Gem }

interface Theme {
  icon: string
  container: string
  line: string
  orb: string
  orbHover: string
  focus: string
  hoverBorder: string
  title: string
}

const pillarThemes: Record<string, Theme> = {
  'from-amber-500 to-orange-600': {
    icon: 'text-amber-400',
    container: 'border-amber-500/20 bg-amber-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent',
    orb: 'bg-amber-500/[0.05]',
    orbHover: 'group-hover:bg-amber-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(245,158,11,0.16)_0%,rgba(245,158,11,0.05)_45%,rgba(245,158,11,0)_70%)]',
    hoverBorder: 'hover:border-amber-500/15',
    title: 'text-amber-300',
  },
  'from-emerald-500 to-green-600': {
    icon: 'text-emerald-400',
    container: 'border-emerald-500/20 bg-emerald-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent',
    orb: 'bg-emerald-500/[0.05]',
    orbHover: 'group-hover:bg-emerald-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,rgba(16,185,129,0.05)_45%,rgba(16,185,129,0)_70%)]',
    hoverBorder: 'hover:border-emerald-500/15',
    title: 'text-emerald-300',
  },
  'from-cyan-500 to-teal-600': {
    icon: 'text-cyan-400',
    container: 'border-cyan-500/20 bg-cyan-500/[0.06]',
    line: 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent',
    orb: 'bg-cyan-500/[0.05]',
    orbHover: 'group-hover:bg-cyan-500/[0.09]',
    focus: 'bg-[radial-gradient(circle,rgba(6,182,212,0.16)_0%,rgba(6,182,212,0.05)_45%,rgba(6,182,212,0)_70%)]',
    hoverBorder: 'hover:border-cyan-500/15',
    title: 'text-cyan-300',
  },
}

const getPillarTheme = (color: string): Theme => pillarThemes[color] || pillarThemes['from-emerald-500 to-green-600']
</script>

<template>
  <section id="metodo" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (35).webp" :opacity="0.3" :blur="3" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader :title="nanciData.pedagogy.title" :badge="nanciData.pedagogy.badge" :description="nanciData.pedagogy.description" center>
        <template #badge-icon>
          <BookOpen class="size-fluid-icon text-emerald-400" />
        </template>
      </SectionHeader>

      <!-- 3 Pillars -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] mb-[clamp(3rem,6vw,4rem)]">
        <div
          v-for="(p, i) in nanciData.pedagogy.pillars"
          :key="p.title"
          class="pedagogy-item relative glass rounded-2xl overflow-hidden border border-white/[0.04] transition-all duration-500 group"
          :class="getPillarTheme(p.color).hoverBorder"
          @mousemove="onCardMove"
          style="opacity: 0"
        >
          <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)]" :class="getPillarTheme(p.color).line" />
          <div class="absolute -top-16 -right-16 w-[clamp(7rem,10vw,11rem)] h-[clamp(7rem,10vw,11rem)] rounded-full blur-3xl pointer-events-none transition-all duration-700" :class="getPillarTheme(p.color).orb + ' ' + getPillarTheme(p.color).orbHover" />
          <div
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :class="getPillarTheme(p.color).focus"
            :style="{ left: 'var(--focus-x, 50%)', top: 'var(--focus-y, 50%)', width: 'clamp(8rem,16vw,14rem)', height: 'clamp(8rem,16vw,14rem)' }"
          >
            <div class="absolute inset-0 rounded-full grain opacity-[0.05] mix-blend-multiply" />
          </div>

          <div class="relative z-10 p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col items-center text-center h-full">
            <div
              class="rounded-2xl border flex items-center justify-center mb-[clamp(1rem,1.5vw,1.25rem)] group-hover:scale-110 transition-transform duration-300"
              :class="getPillarTheme(p.color).container"
              style="width: clamp(3rem,5vw,3.75rem); height: clamp(3rem,5vw,3.75rem);"
            >
              <component :is="pillarIcons[p.icon]" class="size-fluid-icon-lg" :class="getPillarTheme(p.color).icon" />
            </div>
            <span class="block text-[clamp(0.6rem,0.55vw+0.1rem,0.7rem)] font-semibold uppercase tracking-widest mb-[clamp(0.375rem,0.6vw,0.5rem)]" :class="getPillarTheme(p.color).title">Pilar {{ ['I', 'II', 'III'][i] }}</span>
            <h3 class="text-white font-bold text-fluid-lg leading-snug mb-[clamp(0.5rem,0.8vw,0.75rem)]">{{ p.title }}</h3>
            <p class="text-white/55 text-fluid-sm leading-relaxed">{{ p.description }}</p>
          </div>
        </div>
      </div>

      <!-- Espaços Formais & Não Formais -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)] mb-[clamp(3rem,6vw,4rem)]">
        <!-- Formal -->
        <div class="pedagogy-item relative glass rounded-2xl overflow-hidden border border-white/[0.04] hover:border-sky-500/15 transition-all duration-500 group" style="opacity: 0" @mousemove="onCardMove">
          <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
          <div class="absolute -top-12 -right-12 w-[clamp(7rem,10vw,11rem)] h-[clamp(7rem,10vw,11rem)] rounded-full bg-sky-500/[0.05] blur-3xl group-hover:bg-sky-500/[0.09] transition-all duration-700 pointer-events-none" />
          <div
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.16)_0%,rgba(14,165,233,0.05)_45%,rgba(14,165,233,0)_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="{ left: 'var(--focus-x, 50%)', top: 'var(--focus-y, 50%)', width: 'clamp(8rem,16vw,14rem)', height: 'clamp(8rem,16vw,14rem)' }"
          >
            <div class="absolute inset-0 rounded-full grain opacity-[0.05] mix-blend-multiply" />
          </div>

          <div class="relative z-10 p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col h-full">
            <div class="flex items-start gap-[clamp(1rem,1.5vw,1.25rem)]">
              <div class="rounded-2xl border border-sky-500/20 bg-sky-500/[0.06] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style="width: clamp(2.5rem,4vw,3.5rem); height: clamp(2.5rem,4vw,3.5rem);">
                <School class="size-fluid-icon-lg text-sky-400" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-bold text-fluid-lg leading-snug mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ nanciData.pedagogy.fronts.formal.title }}</h3>
                <p class="text-white/55 text-fluid-sm leading-relaxed mb-[clamp(0.75rem,1.2vw,1rem)]">{{ nanciData.pedagogy.fronts.formal.description }}</p>
                <div class="flex flex-wrap gap-[clamp(0.375rem,0.6vw,0.5rem)]">
                  <span
                    v-for="s in nanciData.pedagogy.fronts.formal.spaces"
                    :key="s"
                    class="inline-flex items-center px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs bg-sky-500/10 text-sky-300/90 border border-sky-500/15"
                  >{{ s }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Não Formal -->
        <div class="pedagogy-item relative glass rounded-2xl overflow-hidden border border-white/[0.04] hover:border-emerald-500/15 transition-all duration-500 group" style="opacity: 0" @mousemove="onCardMove">
          <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div class="absolute -top-12 -right-12 w-[clamp(7rem,10vw,11rem)] h-[clamp(7rem,10vw,11rem)] rounded-full bg-emerald-500/[0.05] blur-3xl group-hover:bg-emerald-500/[0.09] transition-all duration-700 pointer-events-none" />
          <div
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,rgba(16,185,129,0.05)_45%,rgba(16,185,129,0)_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="{ left: 'var(--focus-x, 50%)', top: 'var(--focus-y, 50%)', width: 'clamp(8rem,16vw,14rem)', height: 'clamp(8rem,16vw,14rem)' }"
          >
            <div class="absolute inset-0 rounded-full grain opacity-[0.05] mix-blend-multiply" />
          </div>

          <div class="relative z-10 p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col h-full">
            <div class="flex items-start gap-[clamp(1rem,1.5vw,1.25rem)]">
              <div class="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style="width: clamp(2.5rem,4vw,3.5rem); height: clamp(2.5rem,4vw,3.5rem);">
                <TentTree class="size-fluid-icon-lg text-emerald-400" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-bold text-fluid-lg leading-snug mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ nanciData.pedagogy.fronts.nonFormal.title }}</h3>
                <p class="text-white/55 text-fluid-sm leading-relaxed mb-[clamp(0.75rem,1.2vw,1rem)]">{{ nanciData.pedagogy.fronts.nonFormal.description }}</p>
                <div class="flex flex-wrap gap-[clamp(0.375rem,0.6vw,0.5rem)]">
                  <span
                    v-for="s in nanciData.pedagogy.fronts.nonFormal.spaces"
                    :key="s"
                    class="inline-flex items-center px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs bg-emerald-500/10 text-emerald-300/90 border border-emerald-500/15"
                  >{{ s }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acesso Livre -->
      <div class="pedagogy-item relative glass rounded-2xl overflow-hidden border border-white/[0.04] hover:border-rose-500/15 transition-all duration-500 group mb-[clamp(3rem,6vw,4rem)]" style="opacity: 0" @mousemove="onCardMove">
        <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
        <div class="absolute -top-12 -right-12 w-[clamp(7rem,10vw,11rem)] h-[clamp(7rem,10vw,11rem)] rounded-full bg-rose-500/[0.05] blur-3xl group-hover:bg-rose-500/[0.09] transition-all duration-700 pointer-events-none" />
        <div
          class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.16)_0%,rgba(244,63,94,0.05)_45%,rgba(244,63,94,0)_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :style="{ left: 'var(--focus-x, 50%)', top: 'var(--focus-y, 50%)', width: 'clamp(8rem,16vw,14rem)', height: 'clamp(8rem,16vw,14rem)' }"
        >
          <div class="absolute inset-0 rounded-full grain opacity-[0.05] mix-blend-multiply" />
        </div>

        <div class="relative z-10 p-[clamp(1.25rem,2vw,1.75rem)]">
          <div class="flex items-start gap-[clamp(1rem,1.5vw,1.25rem)]">
            <div class="rounded-2xl border border-rose-500/20 bg-rose-500/[0.06] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style="width: clamp(2.5rem,4vw,3.5rem); height: clamp(2.5rem,4vw,3.5rem);">
              <LockOpen class="size-fluid-icon-lg text-rose-400" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-bold text-fluid-lg leading-snug mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ nanciData.pedagogy.accessibility.title }}</h3>
              <p class="text-white/55 text-fluid-sm leading-relaxed mb-[clamp(0.75rem,1.2vw,1rem)]">{{ nanciData.pedagogy.accessibility.description }}</p>
              <div class="flex flex-wrap gap-[clamp(0.375rem,0.6vw,0.5rem)]">
                <span
                  v-for="item in nanciData.pedagogy.accessibility.items"
                  :key="item"
                  class="inline-flex items-center gap-[clamp(0.375rem,0.5vw,0.5rem)] px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs bg-rose-500/10 text-rose-200/90 border border-rose-500/15"
                >
                  <CircleCheck class="size-fluid-icon text-rose-300" />
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compromisso Semanal -->
      <div class="pedagogy-item relative glass rounded-2xl overflow-hidden border border-white/[0.04] hover:border-emerald-500/15 transition-all duration-500 group mx-auto" style="opacity: 0; max-width: 48rem;" @mousemove="onCardMove">
        <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div class="absolute -bottom-12 -left-12 w-[clamp(7rem,10vw,11rem)] h-[clamp(7rem,10vw,11rem)] rounded-full bg-emerald-500/[0.05] blur-3xl group-hover:bg-emerald-500/[0.09] transition-all duration-700 pointer-events-none" />
        <div
          class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,rgba(16,185,129,0.05)_45%,rgba(16,185,129,0)_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :style="{ left: 'var(--focus-x, 50%)', top: 'var(--focus-y, 50%)', width: 'clamp(8rem,16vw,14rem)', height: 'clamp(8rem,16vw,14rem)' }"
        >
          <div class="absolute inset-0 rounded-full grain opacity-[0.05] mix-blend-multiply" />
        </div>

        <div class="relative z-10 p-[clamp(1.5rem,2.5vw,2rem)] flex flex-col sm:flex-row items-center gap-[clamp(1rem,1.5vw,1.25rem)] text-center sm:text-left">
          <div class="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] flex items-center justify-center flex-shrink-0" style="width: clamp(2.75rem,4.5vw,3.5rem); height: clamp(2.75rem,4.5vw,3.5rem);">
            <Sprout class="size-fluid-icon-lg text-emerald-400" />
          </div>
          <div>
            <span class="block text-emerald-400/80 text-[clamp(0.65rem,0.6rem+0.15vw,0.75rem)] font-semibold uppercase tracking-wider mb-[clamp(0.25rem,0.5vw,0.375rem)]">Compromisso Semanal</span>
            <p class="text-white/80 text-fluid-sm leading-relaxed">{{ nanciData.pedagogy.weeklyCommitment }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
