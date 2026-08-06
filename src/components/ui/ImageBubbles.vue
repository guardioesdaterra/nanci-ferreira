<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useImageBubbles } from '@/composables/useImageBubbles'

interface Props {
  count?: number
  minSize?: number
  maxSize?: number
  minOpacity?: number
  maxOpacity?: number
  scrollSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 28,
  minSize: 70,
  maxSize: 200,
  minOpacity: 0.5,
  maxOpacity: 0.9,
  scrollSpeed: 0.12,
})

const { bubbles, getBubbleStyle, getBubbleSrc, startDrag, registerEl, docHeight } = useImageBubbles({
  count: props.count,
  minSize: props.minSize,
  maxSize: props.maxSize,
  minOpacity: props.minOpacity,
  maxOpacity: props.maxOpacity,
  scrollSpeed: props.scrollSpeed,
})

const loaded = ref(false)

onMounted(async () => {
  await nextTick()
  loaded.value = true
})
</script>

<template>
  <div class="image-bubbles-root">
    <div
      class="image-bubbles-layer"
      :class="{ 'is-loaded': loaded }"
      :style="{ height: `${docHeight}px` }"
      aria-hidden="true"
    >
      <div
        v-for="bubble in bubbles"
        :key="bubble.id"
        class="image-bubble"
        :class="{ 'is-loaded': loaded }"
        :style="getBubbleStyle(bubble)"
        :ref="(el) => registerEl(bubble.id, el as HTMLElement)"
        @pointerdown.prevent="startDrag($event, bubble)"
      >
        <img
          :src="getBubbleSrc(bubble)"
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-bubbles-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

.image-bubbles-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  overflow: visible;
}

.image-bubble {
  position: absolute;
  overflow: hidden;
  mix-blend-mode: screen;
  will-change: transform;
  backface-visibility: hidden;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
}

.image-bubble:hover {
  filter: brightness(1.2);
}

.image-bubble img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

@media (max-width: 768px) {
  .image-bubbles-root {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .image-bubble {
    transition: opacity 0.8s ease !important;
  }
}
</style>
