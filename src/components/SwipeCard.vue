<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  content: string
  icon: string
  correctSwipe: 'left' | 'right'
}>()

const swipeDirection = ref(0)
const startX = ref(0)
const isAnimatingOut = ref(false)

const cardTransform = computed(() => {
  const rotate = swipeDirection.value * 0.1
  const scale = Math.max(1 - Math.abs(swipeDirection.value) / 1000, 0.95)
  return {
    transform: `translateX(${swipeDirection.value}px) rotate(${rotate}deg) scale(${scale})`,
    opacity: Math.max(1 - Math.abs(swipeDirection.value) / 500, 0.5)
  }
})

const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  const currentX = e.touches[0].clientX
  swipeDirection.value = currentX - startX.value
}

const handleTouchEnd = () => {
  const threshold = 100
  if (Math.abs(swipeDirection.value) > threshold) {
    const direction = swipeDirection.value > 0 ? 'right' : 'left'
    isAnimatingOut.value = true
    setTimeout(() => {
      emit('swipe', direction === props.correctSwipe)
      swipeDirection.value = 0
      isAnimatingOut.value = false
    }, 300)
  } else {
    swipeDirection.value = 0
  }
}

const emit = defineEmits<{
  (e: 'swipe', correct: boolean): void
}>()
</script>

<template>
  <div
    class="swipe-card relative w-full aspect-[3/4] touch-pan-y"
    :class="{ 'animate-slide-out': isAnimatingOut }"
    :style="cardTransform"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-3xl shadow-xl">
      <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
        <div class="text-4xl mb-4">{{ icon }}</div>
        <h3 class="text-2xl font-semibold text-center">{{ content }}</h3>
      </div>
      <div class="absolute inset-x-0 top-0 h-2 flex space-x-1 p-1">
        <div class="flex-1 bg-cyan-300 rounded-full"></div>
        <div class="flex-1 bg-blue-400 rounded-full"></div>
        <div class="flex-1 bg-cyan-300 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swipe-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-out {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(200%) rotate(30deg) !important;
  opacity: 0 !important;
}
</style>