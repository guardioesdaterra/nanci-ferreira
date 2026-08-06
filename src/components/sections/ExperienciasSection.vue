<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Globe, ExternalLink, MapPin, Sparkles, Calendar, Users, GraduationCap, Gem, Music,
  Mountain, TreePine, Flame, Mic2, Handshake, Star, Instagram, Building2, Compass,
} from 'lucide-vue-next'
import anime from 'animejs'
import { SectionBackground } from '@/components/ui'
import { nanciData } from '@/data/nanci-data'

const sectionRef = ref<HTMLElement | null>(null)

const eventIcons: Record<string, any> = { Music, Calendar, Users, GraduationCap, Gem }
const festivalIcons: Record<string, any> = { Mountain, TreePine, Flame }

const getEventIcon = (name: string) => eventIcons[name] || Calendar
const getFestivalIcon = (name: string) => festivalIcons[name] || Music

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.exp-header',
            opacity: [0, 1],
            translateY: ['1.25rem', 0],
            duration: 600,
            easing: 'easeOutCubic',
          })
          anime({
            targets: '.exp-panel',
            opacity: [0, 1],
            translateX: (el: HTMLElement) => el.dataset.side === 'left' ? ['-1.875rem', 0] : ['1.875rem', 0],
            duration: 650,
            easing: 'easeOutCubic',
          })
          anime({
            targets: '.event-item',
            opacity: [0, 1],
            translateY: ['0.625rem', 0],
            delay: anime.stagger(40),
            duration: 350,
            easing: 'easeOutCubic',
          })
          anime({
            targets: '.exp-divider',
            opacity: [0, 1],
            scaleX: [0, 1],
            duration: 800,
            easing: 'easeOutCubic',
          })
          anime({
            targets: '.festival-chip',
            opacity: [0, 1],
            scale: [0.88, 1],
            delay: anime.stagger(70),
            duration: 400,
            easing: 'easeOutCubic',
          })
          anime({
            targets: '.forum-row',
            opacity: [0, 1],
            translateY: ['1.25rem', 0],
            duration: 550,
            easing: 'easeOutCubic',
          })
          anime({
            targets: '.partner-link',
            opacity: [0, 1],
            x: ['-0.625rem', 0],
            delay: anime.stagger(60),
            duration: 350,
            easing: 'easeOutCubic',
          })
          observer.disconnect()
        }
      })
    },
    { threshold: 0.08 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" id="experiencias" class="section">
    <SectionBackground image-path="/dita (83).webp" :opacity="0.3" :blur="4" gradient="subtle" />

    <!-- Subtle ambient orbs -->
    <div class="absolute top-1/4 left-[15%] w-[clamp(200px,25vw,350px)] h-[clamp(200px,25vw,350px)] rounded-full bg-emerald-500/[0.025] blur-[clamp(50px,10vw,100px)] pointer-events-none" />
    <div class="absolute bottom-1/4 right-[10%] w-[clamp(180px,22vw,300px)] h-[clamp(180px,22vw,300px)] rounded-full bg-amber-500/[0.025] blur-[clamp(50px,10vw,100px)] pointer-events-none" />

    <div class="max-w-6xl mx-auto w-full relative z-10">
      <!-- Header -->
      <div class="exp-header text-center mb-[clamp(2rem,3.5vw,3.5rem)]" style="opacity: 0">
        <div class="inline-flex items-center gap-[clamp(0.375rem,0.6vw,0.5rem)] glass-leaf rounded-full px-[clamp(1rem,1.5vw,1.25rem)] py-[clamp(0.5rem,0.7vw,0.5rem)] mb-[clamp(1rem,1.5vw,1.25rem)] border border-emerald-500/20">
          <MapPin class="size-fluid-icon text-emerald-400" />
          <span class="text-emerald-300 text-fluid-sm font-medium tracking-wide">Experiências</span>
        </div>
        <h2 class="font-display text-fluid-3xl md:text-fluid-4xl text-gradient mb-[clamp(0.5rem,0.8vw,0.75rem)] tracking-tight leading-tight">
          Turismo & Cultura
        </h2>
        <div class="w-[clamp(3rem,5vw,4rem)] h-[clamp(1.5px,0.4vw,3px)] bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-500 mx-auto mb-[clamp(1rem,1.5vw,1.25rem)] rounded-full" />
        <p class="text-white/50 text-fluid-sm md:text-fluid-base max-w-lg mx-auto leading-relaxed">
          Conectando visitantes com a riqueza cultural e natural da região, e levando a voz da ancestralidade para festivais e fóruns.
        </p>
      </div>

      <!-- Split screen panels -->
      <div class="grid md:grid-cols-2 gap-[clamp(1rem,1.5vw,1.25rem)] md:gap-[clamp(1.25rem,1.8vw,1.5rem)] items-stretch mb-[clamp(2rem,3vw,2.5rem)]">
        <!-- Left: Turismo -->
        <div
          class="exp-panel relative glass rounded-2xl overflow-hidden border border-white/[0.08] hover:border-emerald-500/25 transition-all duration-500 group"
          data-side="left"
          style="opacity: 0"
        >
          <!-- Top accent -->
          <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[clamp(7rem,10vw,12rem)] h-[clamp(7rem,10vw,12rem)] rounded-full bg-emerald-500/[0.06] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div class="relative z-10 p-[clamp(1.25rem,2vw,2rem)] flex flex-col items-center text-center h-full">
            <div class="w-[clamp(2.5rem,4vw,3.5rem)] h-[clamp(2.5rem,4vw,3.5rem)] rounded-2xl border border-emerald-500/20 flex items-center justify-center mb-[clamp(1rem,1.5vw,1.25rem)] group-hover:scale-110 transition-transform duration-300 bg-emerald-500/[0.06]">
              <Globe class="size-fluid-icon-lg text-emerald-400" />
            </div>

            <h3 class="text-white font-bold text-fluid-xl md:text-fluid-2xl mb-[clamp(0.125rem,0.3vw,0.25rem)]">Turismo</h3>
            <p class="text-emerald-400 text-fluid-sm font-medium mb-[clamp(0.5rem,0.8vw,0.75rem)]">Prata Expedições</p>
            <p class="text-white/55 text-fluid-sm leading-relaxed mb-[clamp(1rem,1.5vw,1.25rem)] max-w-xs">
              Guia turística com conhecimento histórico, social e ambiental da Cascata e do Planalto Alcalino.
            </p>

            <!-- Route tags -->
            <div class="flex flex-wrap justify-center gap-[clamp(0.375rem,0.6vw,0.5rem)] mb-[clamp(1.25rem,2vw,1.5rem)]">
               <span class="inline-flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs bg-emerald-500/10 text-emerald-300/90 border border-emerald-500/15">
                <MapPin class="size-fluid-icon" />
                Cascata
              </span>
               <span class="inline-flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs bg-emerald-500/10 text-emerald-300/90 border border-emerald-500/15">
                <Mountain class="size-fluid-icon" />
                Planalto Alcalino
              </span>
               <span class="inline-flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs bg-emerald-500/10 text-emerald-300/90 border border-emerald-500/15">
                <TreePine class="size-fluid-icon" />
                Mata Atlântica
              </span>
            </div>

            <div class="mt-auto pt-[clamp(0.75rem,1vw,1rem)] border-t border-white/[0.06] w-full">
              <a href="https://prataexpedicoes.com.br/" target="_blank" rel="noopener noreferrer" class="btn-primary text-fluid-sm w-full justify-center group/btn">
                <span>Conhecer roteiros</span>
                <ExternalLink class="size-fluid-icon group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Agenda Cultural -->
        <div
          class="exp-panel relative glass rounded-2xl overflow-hidden border border-white/[0.08] hover:border-amber-500/25 transition-all duration-500 group"
          data-side="right"
          style="opacity: 0"
        >
          <div class="absolute top-0 inset-x-0 h-[clamp(1px,0.3vw,2px)] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[clamp(7rem,10vw,12rem)] h-[clamp(7rem,10vw,12rem)] rounded-full bg-amber-500/[0.06] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div class="relative z-10 p-[clamp(1.25rem,2vw,2rem)] flex flex-col h-full">
            <!-- Header -->
            <div class="text-center mb-[clamp(1rem,1.5vw,1.25rem)]">
              <div class="w-[clamp(2.5rem,4vw,3.5rem)] h-[clamp(2.5rem,4vw,3.5rem)] rounded-2xl border border-amber-500/20 flex items-center justify-center mx-auto mb-[clamp(1rem,1.5vw,1.25rem)] group-hover:scale-110 transition-transform duration-300 bg-amber-500/[0.06]">
                <Calendar class="size-fluid-icon-lg text-amber-400" />
              </div>
              <h3 class="text-white font-bold text-fluid-xl md:text-fluid-2xl mb-[clamp(0.125rem,0.3vw,0.25rem)]">Agenda Cultural</h3>
              <p class="text-amber-400 text-fluid-sm font-medium">Eventos e Participações</p>
            </div>

            <!-- Event pills -->
            <div class="flex flex-wrap justify-center gap-[clamp(0.375rem,0.6vw,0.5rem)] flex-1 mb-[clamp(0.75rem,1.2vw,1rem)]">
              <div
                v-for="e in nanciData.events"
                :key="e.name"
                class="event-item flex items-center gap-[clamp(0.375rem,0.6vw,0.5rem)] glass-light rounded-full px-[clamp(0.75rem,1.1vw,0.875rem)] py-[clamp(0.5rem,0.7vw,0.5rem)] border border-white/[0.06] hover:border-amber-500/25 transition-all duration-300 cursor-default"
                style="opacity: 0"
              >
                <component :is="getEventIcon(e.icon)" class="size-fluid-icon text-amber-400" />
                <span class="text-white/80 text-fluid-sm">{{ e.name }}</span>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-auto pt-[clamp(0.75rem,1vw,1rem)] border-t border-white/[0.06] text-center">
              <span class="inline-flex items-center gap-[clamp(0.375rem,0.6vw,0.5rem)] text-white/55 text-fluid-xs">
                <Sparkles class="size-fluid-icon text-amber-400" />
                Participação ativa em eventos culturais e ambientais
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="exp-divider flex items-center gap-[clamp(0.75rem,1.2vw,1rem)] mb-[clamp(1.5rem,2.5vw,2rem)] opacity-0" style="transform: scaleX(0)">
        <span class="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <Compass class="size-fluid-icon text-emerald-500/40" />
        <span class="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      <!-- Festivais 2026 -->
      <div class="relative glass rounded-2xl p-[clamp(1rem,1.5vw,1.5rem)] md:p-[clamp(1.25rem,1.8vw,1.5rem)] border border-white/[0.06] mb-[clamp(1rem,1.5vw,1.25rem)] overflow-hidden group/fest">
        <div class="absolute -top-12 -right-12 w-[clamp(6rem,8vw,9rem)] h-[clamp(6rem,8vw,9rem)] rounded-full bg-emerald-500/[0.04] blur-3xl pointer-events-none group-hover/fest:bg-emerald-500/[0.07] transition-all duration-700" />

        <div class="relative z-10">
          <div class="flex items-center gap-[clamp(0.5rem,0.8vw,0.75rem)] mb-[clamp(0.75rem,1.2vw,1rem)]">
            <div class="w-[clamp(1.75rem,2.5vw,2.25rem)] h-[clamp(1.75rem,2.5vw,2.25rem)] rounded-xl border border-emerald-500/20 flex items-center justify-center flex-shrink-0 bg-emerald-500/[0.06]">
              <Star class="size-fluid-icon text-emerald-400" />
            </div>
            <div>
              <h4 class="text-white font-semibold text-fluid-sm">Festivais 2026</h4>
              <p class="text-white/55 text-fluid-xs">Representação ativa em eventos culturais da região</p>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-[clamp(0.5rem,0.8vw,0.625rem)]">
            <a
              v-for="f in nanciData.festivals2026"
              :key="f.name"
              :href="f.link"
              target="_blank"
              rel="noopener noreferrer"
              class="festival-chip flex items-center gap-[clamp(0.375rem,0.6vw,0.5rem)] glass-light rounded-full px-[clamp(0.75rem,1.2vw,1rem)] py-[clamp(0.5rem,0.8vw,0.625rem)] border border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-500/[0.08] transition-all duration-300 group/chip"
              style="opacity: 0"
            >
              <component :is="getFestivalIcon(f.icon)" class="size-fluid-icon text-emerald-400 group-hover/chip:scale-110 transition-transform" />
              <span class="text-white/85 text-fluid-sm font-medium">{{ f.name }}</span>
              <Instagram class="size-fluid-icon text-white/45 group-hover/chip:text-emerald-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <!-- Fórum de Pontos de Cultura -->
      <div class="relative glass rounded-2xl p-[clamp(1rem,1.5vw,1.5rem)] md:p-[clamp(1.25rem,1.8vw,1.5rem)] border border-amber-500/[0.10] hover:border-amber-500/25 transition-all duration-500 overflow-hidden group/forum">
        <div class="absolute -top-12 -right-12 w-[clamp(7rem,10vw,11rem)] h-[clamp(7rem,10vw,11rem)] rounded-full bg-amber-500/[0.04] blur-3xl pointer-events-none group-hover/forum:bg-amber-500/[0.07] transition-all duration-700" />

        <div class="relative z-10">
          <div class="forum-row flex flex-col md:flex-row md:items-center gap-[clamp(0.75rem,1.2vw,1rem)] md:gap-[clamp(1rem,1.5vw,1.25rem)]" style="opacity: 0">
            <div class="flex-shrink-0">
              <div class="w-[clamp(2.5rem,4vw,3.5rem)] h-[clamp(2.5rem,4vw,3.5rem)] rounded-2xl border border-amber-500/25 flex items-center justify-center bg-amber-500/[0.08]">
                <Mic2 class="size-fluid-icon-lg text-amber-400" />
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-[clamp(0.375rem,0.6vw,0.5rem)] mb-[clamp(0.375rem,0.6vw,0.5rem)]">
                <h4 class="text-white font-bold text-fluid-base md:text-fluid-lg">{{ nanciData.forum2026.title }}</h4>
                <span class="inline-flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] px-[clamp(0.5rem,0.8vw,0.625rem)] py-[clamp(0.125rem,0.2vw,0.125rem)] rounded-full text-fluid-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/25">
                  {{ nanciData.forum2026.location }}
                </span>
              </div>
              <p class="text-white/55 text-fluid-sm leading-relaxed">{{ nanciData.forum2026.description }}</p>
            </div>
          </div>

          <!-- Partners + links row -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-[clamp(0.5rem,0.8vw,0.75rem)] mt-[clamp(0.75rem,1.2vw,1rem)] pt-[clamp(0.75rem,1.2vw,1rem)] border-t border-white/[0.06]">
            <div class="flex flex-wrap gap-[clamp(0.375rem,0.6vw,0.5rem)] flex-1">
              <span
                v-for="p in nanciData.forum2026.partners"
                :key="p"
                class="inline-flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs font-medium glass-light border border-white/[0.06] text-white/60"
              >
                <Handshake class="size-fluid-icon text-amber-400/60" />
                {{ p }}
              </span>
            </div>

            <div v-if="nanciData.forum2026.links?.length" class="flex flex-wrap gap-[clamp(0.375rem,0.6vw,0.5rem)]">
              <a
                v-for="link in nanciData.forum2026.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="partner-link inline-flex items-center gap-[clamp(0.375rem,0.7vw,0.5rem)] px-[clamp(0.625rem,0.9vw,0.75rem)] py-[clamp(0.3rem,0.5vw,0.375rem)] rounded-full text-fluid-xs font-semibold border border-white/[0.08] text-white/55 hover:text-white hover:border-amber-500/30 hover:bg-amber-500/[0.06] transition-all duration-300"
                style="opacity: 0"
              >
                <Building2 class="size-fluid-icon text-amber-400/60" />
                {{ link.label }}
                <ExternalLink class="size-fluid-icon text-white/50" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
