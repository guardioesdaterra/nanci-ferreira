<script setup lang="ts">
import { Globe, ExternalLink, MapPin } from 'lucide-vue-next'
import { SectionBackground } from '@/components/ui'
</script>

<template>
  <section class="section">
    <SectionBackground image-path="/dita (83).webp" :opacity="0.35" :blur="3" gradient="subtle" />

    <div class="max-w-3xl mx-auto relative z-10">
      <div class="text-center mb-[clamp(2rem,4vw,3rem)]">
        <div class="inline-flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] glass-light rounded-full px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(1rem,2vw,1.5rem)]">
          <MapPin class="size-fluid-icon text-emerald-400" />
          <span class="text-white/80 text-fluid-sm font-medium">Experiências</span>
        </div>
        <h2 class="text-fluid-3xl font-bold text-gradient mb-[clamp(0.5rem,1vw,0.75rem)]">Turismo</h2>
        <p class="text-white/60 text-fluid-sm">Conectando visitantes com a riqueza cultural e natural da região.</p>
      </div>

      <div class="card text-center">
        <div class="w-[clamp(3rem,6vw,3rem)] h-[clamp(3rem,6vw,3rem)] mx-auto rounded-xl border border-emerald-500/20 flex items-center justify-center mb-[clamp(1rem,2vw,1.5rem)]">
          <Globe class="size-fluid-icon-lg text-emerald-400" />
        </div>
        <h3 class="text-white font-semibold text-fluid-lg mb-[clamp(0.25rem,0.5vw,0.375rem)]">Prata Expedições</h3>
        <p class="text-emerald-400 text-fluid-sm mb-[clamp(0.75rem,1.5vw,1rem)]">Guia Local</p>
        <p class="text-white/60 text-fluid-sm mb-[clamp(1rem,2vw,1.5rem)]">Guia turística com conhecimento histórico, social e ambiental da região.</p>
        <a href="https://prataexpedicoes.com.br/" target="_blank" class="btn-outline text-fluid-sm">
          Conhecer roteiros <ExternalLink class="size-fluid-icon" />
        </a>
      </div>
    </div>
  </section>
</template>
