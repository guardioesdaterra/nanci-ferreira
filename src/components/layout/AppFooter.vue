<script setup lang="ts">
import { Leaf, ChevronRight, Heart, TreePine, Crown } from 'lucide-vue-next'

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#linhagem', label: 'Linhagem' },
  { href: '#territorio', label: 'Território' },
  { href: '#metodo', label: 'Método Dita' },
  { href: '#lideranca', label: 'Liderança' },
  { href: '#organizacoes', label: 'Parcerias' },
  { href: '#ods', label: 'ODS' },
]

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative glass border-t border-emerald-500/10 py-[clamp(2rem,4vw,2.5rem)] px-[clamp(1rem,3vw,1rem)] mb-[clamp(4rem,8vw,4rem)] md:mb-0 overflow-hidden">
    <div class="absolute top-0 right-0 opacity-5">
      <TreePine class="text-emerald-500" style="width: clamp(8rem, 18vw, 10rem); height: clamp(8rem, 18vw, 10rem);" />
    </div>

    <div class="max-w-5xl mx-auto relative z-10">
      <div class="grid md:grid-cols-2 gap-[clamp(1.5rem,3vw,2rem)]">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-[clamp(0.375rem,0.8vw,0.5rem)] mb-[clamp(0.75rem,1.5vw,1rem)]">
            <div class="rounded-full border border-emerald-500/20 flex items-center justify-center" style="width: clamp(2rem, 3.5vw, 2.25rem); height: clamp(2rem, 3.5vw, 2.25rem);">
              <Leaf class="text-emerald-400" style="width: clamp(0.875rem, 1.5vw, 1rem); height: clamp(0.875rem, 1.5vw, 1rem);" />
            </div>
            <h3 class="text-fluid-lg font-bold">
              <span class="text-white">Nanci</span>
              <span class="text-emerald-400"> Ferreira</span>
            </h3>
          </div>
          <p class="text-white/60 text-fluid-sm leading-relaxed mb-[clamp(0.5rem,1vw,0.75rem)] max-w-sm">
            Uma vida dedicada à arte, sustentabilidade e preservação dos saberes ancestrais da Mata Atlântica.
          </p>
          <div class="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] text-white/50 text-fluid-xs">
            <span class="flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)]">
              <Heart class="text-rose-400" style="width: clamp(0.625rem, 1vw, 0.75rem); height: clamp(0.625rem, 1vw, 0.75rem);" />
              Cascata, Águas da Prata - SP
            </span>
            <span class="flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)]">
              <Crown class="text-amber-400" style="width: clamp(0.625rem, 1vw, 0.75rem); height: clamp(0.625rem, 1vw, 0.75rem);" />
              Liderança Anciã
            </span>
          </div>
        </div>

        <!-- Links -->
        <div class="grid grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)]">
          <div>
            <h4 class="text-emerald-400 font-semibold mb-[clamp(0.5rem,1vw,0.75rem)] text-fluid-sm">Navegação</h4>
            <ul class="space-y-[clamp(0.25rem,0.5vw,0.375rem)]">
              <li v-for="link in navLinks" :key="link.href">
                <a
                  :href="link.href"
                  class="text-white/50 hover:text-white text-fluid-sm flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] transition-colors"
                  @click.prevent="scrollTo(link.href)"
                >
                  <ChevronRight class="text-emerald-500" style="width: clamp(0.625rem, 1vw, 0.75rem); height: clamp(0.625rem, 1vw, 0.75rem);" />
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-emerald-400 font-semibold mb-[clamp(0.5rem,1vw,0.75rem)] text-fluid-sm">Contato</h4>
            <ul class="space-y-[clamp(0.25rem,0.5vw,0.375rem)] text-white/50 text-fluid-sm">
              <li>Cascata, Águas da Prata</li>
              <li>São Paulo, Brasil</li>
              <li>
                <a href="mailto:dita.13.ferreira@gmail.com" class="hover:text-emerald-400 transition-colors">
                  dita.13.ferreira@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-emerald-500/10 mt-[clamp(1.5rem,3vw,2rem)] pt-[clamp(1rem,2vw,1.25rem)] text-center">
        <p class="text-white/45 text-fluid-xs">
          © {{ new Date().getFullYear() }} Nanci Ferreira. Feito com 💚 para a natureza.
        </p>
      </div>
    </div>
  </footer>
</template>
