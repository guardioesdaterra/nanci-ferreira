<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  title: string
  subtitle?: string
  badge?: string
  center?: boolean
  description?: string
}

defineProps<Props>()

const headerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (headerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(headerRef.value)
  }
})
</script>

<template>
  <div
    ref="headerRef"
    class="mb-[clamp(2rem,4vw,4rem)] transition-all duration-1000"
    :class="[
      center ? 'text-center' : '',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    ]"
  >
    <!-- Badge -->
    <div
      v-if="badge"
      class="inline-flex items-center gap-[clamp(0.625rem,1.3vw,0.875rem)] glass-leaf rounded-full px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.5rem,1vw,0.625rem)] mb-[clamp(1.25rem,2.5vw,1.5rem)] border border-emerald-500/20 transition-all duration-700 delay-100"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <slot name="badge-icon" />
      <span class="text-emerald-300 text-fluid-sm font-medium tracking-wide">{{ badge }}</span>
    </div>

    <!-- Title -->
    <h2 
      class="font-display text-fluid-3xl md:text-fluid-4xl text-gradient mb-[clamp(0.75rem,1.5vw,1rem)] tracking-tight transition-all duration-700 delay-200 leading-tight"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      {{ title }}
    </h2>

    <!-- Divider -->
    <div
      v-if="center"
      class="bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-500 mx-auto mb-[clamp(1.25rem,2.5vw,1.5rem)] rounded-full transition-all duration-700 delay-300"
      :class="isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
      style="width: clamp(3rem, 5vw, 4rem); height: clamp(2px, 0.4vw, 3px);"
    />

    <!-- Subtitle -->
    <p 
      v-if="subtitle" 
      class="text-white/50 text-fluid-base max-w-2xl leading-relaxed transition-all duration-700 delay-400"
      :class="[
        center ? 'mx-auto' : '',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      ]"
    >
      {{ subtitle }}
    </p>

    <!-- Description -->
    <p 
      v-if="description" 
      class="text-white/50 text-fluid-sm max-w-2xl leading-relaxed transition-all duration-700 delay-400 mt-[clamp(0.5rem,1vw,0.75rem)]"
      :class="[
        center ? 'mx-auto' : '',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
