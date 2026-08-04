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
  <section id="documentario" class="section py-20 md:py-28 relative">
    <SectionBackground
      image-path="/nanci-dita-full.webp"
      :opacity="0.1"
      :blur="4"
      gradient="subtle"
    />

    <div class="max-w-6xl mx-auto px-4 relative z-10">
      <SectionHeader
        title="Documentários"
        subtitle="Projetos Audiovisuais"
        description="Conheça os documentários em que Nanci participa como co-diretora e colaboradora"
      />

      <!-- Documentary List -->
      <div class="mt-12 md:mt-16 space-y-12 md:space-y-16">
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
                <div class="relative z-10 flex flex-col items-center gap-4">
                  <div class="w-20 h-20 md:w-24 md:h-24 rounded-full border border-emerald-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play class="w-10 h-10 md:w-12 md:h-12 text-emerald-400 fill-emerald-400 ml-1" />
                  </div>
                  <p class="text-white/80 font-medium text-center px-4">Clique para assistir</p>
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
                <div class="text-center relative z-10 px-6">
                  <div class="mb-4">
                    <Play class="w-12 h-12 md:w-16 md:h-16 text-emerald-400/30 mx-auto mb-4" />
                  </div>
                  <p class="text-white/80 font-medium mb-2">Reprodução em outros sites desativada</p>
                  <p class="text-white/60 text-sm mb-6">Assista diretamente no YouTube</p>
                  <a
                    :href="`https://www.youtube.com/watch?v=${doc.videoId}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 hover:border-emerald-500/50 transition-colors font-medium"
                  >
                    <ExternalLink class="w-5 h-5" />
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
                  <p class="text-white/40 text-sm mt-2">Link do vídeo será disponibilizado em breve</p>
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
                class="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
                aria-label="Fechar vídeo"
              >
                <X class="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          <!-- Info below video -->
          <div class="mt-8 md:mt-10">
            <div class="grid md:grid-cols-3 gap-6">
              <!-- Title and Description -->
              <div class="md:col-span-2">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">
                  {{ doc.title }}
                </h3>
                <p class="text-white/70 leading-relaxed text-base md:text-lg">
                  {{ doc.description }}
                </p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span v-for="tag in doc.tags" :key="tag" class="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Credits / Details -->
              <div class="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h4 class="text-white font-semibold mb-4 flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-emerald-400" />
                  Detalhes
                </h4>
                <div class="space-y-3 text-sm">
                  <div v-for="(value, key) in doc.details" :key="key">
                    <p class="text-white/50 text-xs uppercase tracking-wide mb-1">{{ key }}</p>
                    <p class="text-white/90 font-medium">{{ value }}</p>
                  </div>
                  <div>
                    <p class="text-white/50 text-xs uppercase tracking-wide mb-1">Ano</p>
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

<style scoped>
.section {
  position: relative;
  overflow: hidden;
}
</style>
