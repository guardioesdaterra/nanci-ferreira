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
      delay: anime.stagger(100),
      duration: 550,
      easing: 'easeOutCubic',
    })
  }
}, { threshold: 0.1 })

const pillarIcons: Record<string, any> = {
  BookOpen,
  Sprout,
  Gem,
}

const getPillarIcon = (name: string) => pillarIcons[name]

const pillarColors: Record<string, { icon: string; container: string }> = {
  'from-amber-500 to-orange-600': { icon: 'text-amber-400', container: 'border-amber-500/20 bg-amber-500/10' },
  'from-emerald-500 to-green-600': { icon: 'text-emerald-400', container: 'border-emerald-500/20 bg-emerald-500/10' },
  'from-cyan-500 to-teal-600': { icon: 'text-cyan-400', container: 'border-cyan-500/20 bg-cyan-500/10' },
}

const getPillarColors = (color: string) => pillarColors[color] || { icon: 'text-emerald-400', container: 'border-emerald-500/20 bg-emerald-500/10' }
</script>

<template>
  <section id="metodo" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (35).webp" :opacity="0.3" :blur="3" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader :title="nanciData.pedagogy.title" :badge="nanciData.pedagogy.badge" center>
        <template #badge-icon>
          <BookOpen class="size-fluid-icon text-emerald-400" />
        </template>
      </SectionHeader>

      <p class="text-white/70 text-center text-fluid-base max-w-3xl mx-auto mb-[clamp(1rem, 2vw, 1.5rem)] leading-relaxed">
        {{ nanciData.pedagogy.description }}
      </p>

      <!-- Weekly commitment strip -->
      <div class="pedagogy-item glass rounded-2xl max-w-3xl mx-auto mb-[clamp(3.5rem, 7vw, 4.5rem)] overflow-hidden" style="opacity: 0">
        <div class="flex items-center gap-[clamp(1rem, 2vw, 1.5rem)] p-[clamp(1rem, 2vw, 1.5rem)]">
          <div class="w-[clamp(2.25rem, 4.5vw, 2.75rem)] h-[clamp(2.25rem, 4.5vw, 2.75rem)] rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Sprout class="size-fluid-icon text-emerald-400" />
          </div>
          <div>
            <span class="block text-emerald-400/80 text-[clamp(0.625rem,0.6rem+0.15vw,0.7rem)] font-semibold uppercase tracking-wider mb-[clamp(0.125rem,0.2vw,0.2rem)]">Compromisso Semanal</span>
            <p class="text-white/75 text-fluid-xs leading-relaxed">{{ nanciData.pedagogy.weeklyCommitment }}</p>
          </div>
        </div>
      </div>

      <!-- Method pillars -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-[clamp(1rem, 2vw, 1.5rem)] mb-[clamp(3.5rem, 7vw, 4.5rem)]">
        <div v-for="p in nanciData.pedagogy.pillars" :key="p.title" class="pedagogy-item card">
          <div class="flex items-start justify-between gap-[clamp(0.75rem,1.5vw,1rem)]">
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-semibold text-fluid-xs leading-snug mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ p.title }}</h3>
              <p class="text-white/55 text-fluid-xs leading-relaxed">{{ p.description }}</p>
            </div>
            <div
              class="rounded-lg border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style="width: clamp(2.25rem, 4.5vw, 2.75rem); height: clamp(2.25rem, 4.5vw, 2.75rem);"
              :class="getPillarColors(p.color).container"
            >
              <component :is="getPillarIcon(p.icon)" class="size-fluid-icon" :class="getPillarColors(p.color).icon" />
            </div>
          </div>
        </div>
      </div>

      <!-- Transmission fronts -->
      <div class="grid sm:grid-cols-2 gap-[clamp(1rem, 2vw, 1.5rem)] mb-[clamp(3.5rem, 7vw, 4.5rem)]">
        <div class="pedagogy-item card">
          <div class="flex items-start justify-between gap-[clamp(0.75rem,1.5vw,1rem)]">
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-semibold text-fluid-xs leading-snug mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ nanciData.pedagogy.fronts.formal.title }}</h3>
              <p class="text-white/55 text-fluid-xs leading-relaxed mb-[clamp(0.75rem,1.5vw,1rem)]">{{ nanciData.pedagogy.fronts.formal.description }}</p>
              <div class="flex flex-wrap gap-[clamp(0.375rem,0.75vw,0.5rem)]">
                <span v-for="s in nanciData.pedagogy.fronts.formal.spaces" :key="s" class="px-[clamp(0.625rem,1.25vw,0.875rem)] py-[clamp(0.125rem,0.3vw,0.2rem)] rounded-full text-fluid-xs bg-sky-500/15 text-sky-300 border border-sky-500/20">{{ s }}</span>
              </div>
            </div>
            <div class="rounded-lg border border-sky-500/20 bg-sky-500/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style="width: clamp(2.25rem, 4.5vw, 2.75rem); height: clamp(2.25rem, 4.5vw, 2.75rem);">
              <School class="size-fluid-icon text-sky-400" />
            </div>
          </div>
        </div>

        <div class="pedagogy-item card">
          <div class="flex items-start justify-between gap-[clamp(0.75rem,1.5vw,1rem)]">
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-semibold text-fluid-xs leading-snug mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ nanciData.pedagogy.fronts.nonFormal.title }}</h3>
              <p class="text-white/55 text-fluid-xs leading-relaxed mb-[clamp(0.75rem,1.5vw,1rem)]">{{ nanciData.pedagogy.fronts.nonFormal.description }}</p>
              <div class="flex flex-wrap gap-[clamp(0.375rem,0.75vw,0.5rem)]">
                <span v-for="s in nanciData.pedagogy.fronts.nonFormal.spaces" :key="s" class="px-[clamp(0.625rem,1.25vw,0.875rem)] py-[clamp(0.125rem,0.3vw,0.2rem)] rounded-full text-fluid-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">{{ s }}</span>
              </div>
            </div>
            <div class="rounded-lg border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style="width: clamp(2.25rem, 4.5vw, 2.75rem); height: clamp(2.25rem, 4.5vw, 2.75rem);">
              <TentTree class="size-fluid-icon text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Accessibility -->
      <div class="pedagogy-item card max-w-4xl mx-auto">
        <div class="flex items-start justify-between gap-[clamp(0.75rem,1.5vw,1rem)]">
          <div class="flex-1 min-w-0">
            <h3 class="text-white font-semibold text-fluid-xs leading-snug mb-[clamp(0.25rem,0.5vw,0.375rem)]">{{ nanciData.pedagogy.accessibility.title }}</h3>
            <p class="text-white/55 text-fluid-xs leading-relaxed mb-[clamp(0.75rem,1.5vw,1rem)]">{{ nanciData.pedagogy.accessibility.description }}</p>
            <div class="flex flex-wrap gap-[clamp(0.375rem,0.75vw,0.5rem)]">
              <span v-for="item in nanciData.pedagogy.accessibility.items" :key="item" class="inline-flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] px-[clamp(0.625rem,1.25vw,0.875rem)] py-[clamp(0.125rem,0.3vw,0.2rem)] rounded-full text-fluid-xs bg-rose-500/15 text-rose-200 border border-rose-500/20">
                <CircleCheck class="size-fluid-icon text-rose-300" />
                {{ item }}
              </span>
            </div>
          </div>
          <div class="rounded-lg border border-rose-500/20 bg-rose-500/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style="width: clamp(2.25rem, 4.5vw, 2.75rem); height: clamp(2.25rem, 4.5vw, 2.75rem);">
            <LockOpen class="size-fluid-icon text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
