<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BookOpen, Sprout, Gem, School, TentTree, LockOpen, CircleCheck } from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground, SectionHeader } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)

const pillarIcons = {
  BookOpen,
  Sprout,
  Gem,
}

const getPillarIcon = (name: string) => pillarIcons[name as keyof typeof pillarIcons]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.pedagogy-item',
            opacity: [0, 1],
            translateY: [25, 0],
            delay: anime.stagger(100),
            duration: 550,
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
  <section id="metodo" ref="sectionRef" class="section">
    <SectionBackground image-path="/dita (35).webp" :opacity="0.3" :blur="3" gradient="subtle" />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader :title="nanciData.pedagogy.title" :badge="nanciData.pedagogy.badge" center>
        <template #badge-icon>
          <BookOpen class="w-4 h-4 text-emerald-400" />
        </template>
      </SectionHeader>

      <p class="text-white/70 text-center text-fluid-base max-w-3xl mx-auto mb-6 leading-relaxed">
        {{ nanciData.pedagogy.description }}
      </p>

      <!-- Weekly commitment strip -->
      <div class="pedagogy-item glass-light rounded-2xl px-6 py-4 max-w-3xl mx-auto mb-12 flex items-center justify-center gap-3 text-center border border-emerald-500/10" style="opacity: 0">
        <Sprout class="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <p class="text-emerald-200/90 text-sm">{{ nanciData.pedagogy.weeklyCommitment }}</p>
      </div>

      <!-- Method pillars -->
      <div class="grid md:grid-cols-3 gap-5 mb-14">
        <div v-for="p in nanciData.pedagogy.pillars" :key="p.title" class="pedagogy-item card" style="opacity: 0">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-white/10" :class="p.color.includes('emerald') ? 'border-emerald-500/20' : p.color.includes('amber') ? 'border-amber-500/20' : 'border-cyan-500/20'">
            <component :is="getPillarIcon(p.icon)" class="w-7 h-7" :class="p.color.includes('emerald') ? 'text-emerald-400' : p.color.includes('amber') ? 'text-amber-400' : 'text-cyan-400'" />
          </div>
          <h3 class="text-white font-semibold text-lg mb-2">{{ p.title }}</h3>
          <p class="text-white/55 text-sm leading-relaxed">{{ p.description }}</p>
        </div>
      </div>

      <!-- Transmission fronts -->
      <div class="grid md:grid-cols-2 gap-6 mb-14">
        <div class="pedagogy-item card" style="opacity: 0">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl border border-sky-500/20 flex items-center justify-center">
              <School class="w-6 h-6 text-sky-400" />
            </div>
            <h3 class="text-white font-bold text-lg">{{ nanciData.pedagogy.fronts.formal.title }}</h3>
          </div>
          <p class="text-white/60 text-sm mb-4 leading-relaxed">{{ nanciData.pedagogy.fronts.formal.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="s in nanciData.pedagogy.fronts.formal.spaces" :key="s" class="px-3 py-1 rounded-full text-xs bg-sky-500/15 text-sky-300 border border-sky-500/20">{{ s }}</span>
          </div>
        </div>

        <div class="pedagogy-item card" style="opacity: 0">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl border border-emerald-500/20 flex items-center justify-center">
              <TentTree class="w-6 h-6 text-emerald-400" />
            </div>
            <h3 class="text-white font-bold text-lg">{{ nanciData.pedagogy.fronts.nonFormal.title }}</h3>
          </div>
          <p class="text-white/60 text-sm mb-4 leading-relaxed">{{ nanciData.pedagogy.fronts.nonFormal.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="s in nanciData.pedagogy.fronts.nonFormal.spaces" :key="s" class="px-3 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">{{ s }}</span>
          </div>
        </div>
      </div>

      <!-- Accessibility -->
      <div class="pedagogy-item glass rounded-3xl p-8 md:p-10 border border-rose-500/10 max-w-4xl mx-auto" style="opacity: 0">
        <div class="flex items-center gap-3 mb-4 justify-center">
          <div class="w-12 h-12 rounded-xl border border-rose-500/20 flex items-center justify-center">
            <LockOpen class="w-6 h-6 text-rose-400" />
          </div>
          <h3 class="text-white font-bold text-xl">{{ nanciData.pedagogy.accessibility.title }}</h3>
        </div>
        <p class="text-white/65 text-sm text-center mb-6 leading-relaxed max-w-2xl mx-auto">
          {{ nanciData.pedagogy.accessibility.description }}
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <span v-for="item in nanciData.pedagogy.accessibility.items" :key="item" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-rose-500/15 text-rose-200 border border-rose-500/20">
            <CircleCheck class="w-3.5 h-3.5 text-rose-300" />
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>