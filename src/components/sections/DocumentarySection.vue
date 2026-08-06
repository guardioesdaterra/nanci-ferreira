<script setup lang="ts">
import { ref } from 'vue'
import { Play, X, ExternalLink } from 'lucide-vue-next'
import { SectionHeader, SectionBackground } from '@/components/ui'

interface Documentary {
  id: string
  title: string
  description: string
  videoId: string
  year: string
  director: string
  role: string
  tags: string[]
  details?: Record<string, string>
  embeddable?: boolean
  previewImage?: string
}

const documentaries: Documentary[] = [
  {
    id: 'prata-ativa',
    title: 'Prata Ativa',
    description: 'Documentário que retrata a luta pela preservação ambiental, cultural e antinuclear na região do Planalto Alcalino.',
    videoId: '4u-1omWU3iI',
    year: '2024',
    director: 'Nanci Ferreira',
    role: 'Co-diretora',
    tags: ['Preservação Ambiental', 'Documentário', '2024'],
    previewImage: 'https://img.youtube.com/vi/4u-1omWU3iI/hqdefault.jpg',
    details: {
      'Co-direção': 'Nanci Ferreira',
      'Tema': 'Água e Mineração',
      'Região': 'Planalto Alcalino',
    },
  },
  {
    id: 'aguas-prata',
    title: 'Águas da Prata: nas crônicas de Ademaro Prézia',
    description: 'Documentário que explora a história e a memória de Águas da Prata através das crônicas de Ademaro Prézia, com participação de Nanci Ferreira. Produção com recursos da Lei Paulo Gustavo em colaboração com o Ponto de Cultura Culturando na Montanha.',
    videoId: 'MNh1Z2hgf9s',
    year: '2024',
    director: 'Maíra Aragão',
    role: 'Participação',
    tags: ['História Local', 'Memória', 'Lei Paulo Gustavo'],
    embeddable: false,
    previewImage: 'https://img.youtube.com/vi/MNh1Z2hgf9s/hqdefault.jpg',
    details: {
      'Direção': 'Maíra Aragão',
      'Incentivo': 'Lei Paulo Gustavo',
      'Participação': 'Nanci Ferreira',
    },
  },
]

const playingDocId = ref<string | null>(null)

const handlePlayClick = (docId: string) => {
  playingDocId.value = docId
}

const handleClose = () => {
  playingDocId.value = null
}
</script>

<template>
  <section id="documentario" class="section">
    <SectionBackground
      image-path="/nanci-dita-full.webp"
      :opacity="0.1"
      :blur="4"
      gradient="subtle"
    />

    <div class="max-w-6xl mx-auto relative z-10">
      <SectionHeader
        title="Documentários"
        subtitle="Projetos Audiovisuais"
        description="Conheça os documentários em que Nanci participa como co-diretora e colaboradora"
      />

      <!-- Documentary List -->
      <div class="mt-[clamp(3rem,4vw,4.5rem)] md:mt-[clamp(4rem,5vw,5rem)] space-y-[clamp(3rem,6vw,4rem)] md:space-y-[clamp(4rem,8vw,5rem)]">
        <div v-for="doc in documentaries" :key="doc.id" class="documentary-card">
          <!-- Video Container -->
          <div class="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl">
            <!-- Responsive aspect ratio container -->
            <div class="relative w-full pt-[56.25%] bg-black">
              <!-- Placeholder / Thumbnail for embeddable videos -->
              <div
                v-if="playingDocId !== doc.id && doc.videoId && doc.embeddable !== false"
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-800/50 to-black/80 cursor-pointer group"
                @click="handlePlayClick(doc.id)"
                :style="doc.previewImage ? { backgroundImage: `url(${doc.previewImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
              >
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-b from-slate-800/50 via-black/40 to-black/80" />

                <!-- Play button -->
                <div class="relative z-10 flex flex-col items-center gap-[clamp(1rem,2vw,1.25rem)]">
                  <div class="w-[clamp(5rem,6vw,6rem)] h-[clamp(5rem,6vw,6rem)] md:w-[clamp(6rem,7vw,7rem)] md:h-[clamp(6rem,7vw,7rem)] rounded-full border border-emerald-400/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play class="w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)] md:w-[clamp(3rem,3.5vw,3.5rem)] md:h-[clamp(3rem,3.5vw,3.5rem)] text-emerald-400 fill-emerald-400 ml-[clamp(0.25rem,0.5vw,0.25rem)]" />
                  </div>
                  <p class="text-white/80 font-medium text-center px-[clamp(1rem,2vw,2rem)]">Clique para assistir</p>
                </div>
              </div>

              <!-- Non-embeddable video - YouTube link -->
              <div
                v-else-if="doc.videoId && doc.embeddable === false"
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-800/50 to-black/80"
                :style="doc.previewImage ? { backgroundImage: `url(${doc.previewImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
              >
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-b from-slate-800/70 via-black/60 to-black/90" />
                <div class="text-center relative z-10 px-[clamp(1.5rem,2.5vw,2.5rem)]">
                  <div class="mb-[clamp(1rem,1.5vw,1.5rem)]">
                    <Play class="w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] md:w-[clamp(4rem,5vw,5rem)] md:h-[clamp(4rem,5vw,5rem)] text-emerald-400/70 mx-auto mb-[clamp(1rem,1.5vw,1.5rem)]" />
                  </div>
                  <p class="text-white/80 font-medium mb-[clamp(0.5rem,0.75vw,0.75rem)]">Reprodução em outros sites desativada</p>
                  <p class="text-white/60 text-fluid-sm mb-[clamp(1.5rem,2vw,2rem)]">Assista diretamente no YouTube</p>
                  <a
                    :href="`https://www.youtube.com/watch?v=${doc.videoId}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-[clamp(0.5rem,0.75vw,0.75rem)] px-[clamp(1.5rem,2.5vw,2.5rem)] py-[clamp(0.75rem,1vw,1rem)] rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 hover:border-emerald-500/50 transition-colors font-medium"
                  >
                    <ExternalLink class="w-[clamp(1.25rem,1.5vw,1.5rem)] h-[clamp(1.25rem,1.5vw,1.5rem)]" />
                    Assistir no YouTube
                  </a>
                </div>
              </div>

              <!-- No video available message -->
              <div
                v-else-if="!doc.videoId"
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-800/50 to-black/80"
              >
                <div class="text-center relative z-10">
                  <p class="text-white/60 font-medium">Vídeo em breve</p>
                  <p class="text-white/55 text-fluid-sm mt-[clamp(0.5rem,0.75vw,0.75rem)]">Link do vídeo será disponibilizado em breve</p>
                </div>
              </div>

              <!-- Embedded Video -->
              <iframe
                v-if="playingDocId === doc.id && doc.videoId && doc.embeddable !== false"
                class="absolute inset-0 w-full h-full"
                :src="`https://www.youtube.com/embed/${doc.videoId}`"
                :title="`${doc.title} - Documentário`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />

              <!-- Close button when playing -->
              <button
                v-if="playingDocId === doc.id && doc.videoId && doc.embeddable !== false"
                @click="handleClose"
                class="absolute top-[clamp(1rem,2vw,1.25rem)] right-[clamp(1rem,2vw,1.25rem)] z-20 p-[clamp(0.5rem,1vw,0.75rem)] rounded-full bg-black/50 hover:bg-black/75 transition-colors"
                aria-label="Fechar vídeo"
              >
                <X class="w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.5rem,2vw,2rem)] text-white" />
              </button>
            </div>
          </div>

          <!-- Info below video -->
          <div class="mt-[clamp(2rem,2.5vw,2.5rem)] md:mt-[clamp(2.5rem,3vw,3rem)]">
            <div class="grid md:grid-cols-3 gap-[clamp(1.5rem,2vw,2rem)]">
              <!-- Title and Description -->
              <div class="md:col-span-2">
                <h3 class="text-fluid-2xl md:text-fluid-3xl font-bold text-white mb-[clamp(0.75rem,1vw,1rem)]">
                  {{ doc.title }}
                </h3>
                <p class="text-white/70 leading-relaxed text-fluid-base md:text-fluid-lg">
                  {{ doc.description }}
                </p>
                <div class="mt-[clamp(1.25rem,1.5vw,1.5rem)] flex flex-wrap gap-[clamp(0.5rem,0.75vw,0.75rem)]">
                  <span v-for="tag in doc.tags" :key="tag" class="inline-block px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.5rem,0.75vw,0.75rem)] rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-fluid-sm font-medium">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Credits / Details -->
              <div class="bg-white/5 border border-white/10 rounded-xl p-[clamp(1.5rem,2vw,2rem)] backdrop-blur-sm">
                <h4 class="text-white font-semibold mb-[clamp(1rem,1.5vw,1.5rem)] flex items-center gap-[clamp(0.5rem,0.75vw,0.75rem)]">
                  <div class="w-[clamp(0.5rem,0.75vw,0.75rem)] h-[clamp(0.5rem,0.75vw,0.75rem)] rounded-full bg-emerald-400" />
                  Detalhes
                </h4>
                <div class="space-y-[clamp(0.5rem,1vw,0.75rem)] text-fluid-sm">
                  <div v-for="(value, key) in doc.details" :key="key">
                    <p class="text-white/50 text-fluid-xs uppercase tracking-wide mb-[clamp(0.25rem,0.375vw,0.375rem)]">{{ key }}</p>
                    <p class="text-white/90 font-medium">{{ value }}</p>
                  </div>
                  <div>
                    <p class="text-white/50 text-fluid-xs uppercase tracking-wide mb-[clamp(0.25rem,0.375vw,0.375rem)]">Ano</p>
                    <p class="text-white/90 font-medium">{{ doc.year }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
