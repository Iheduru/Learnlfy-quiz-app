<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  icon: string
  color: string
  isFlipped?: boolean
  description?: string
}>()

const isFlippedState = ref(props.isFlipped || false)

const toggleFlip = () => {
  isFlippedState.value = !isFlippedState.value
}

const cardStyle = computed(() => ({
  backgroundColor: props.color
}))
</script>

<template>
  <div 
    @click="toggleFlip"
    class="card-flip relative w-full aspect-square cursor-pointer"
    :class="{ 'flipped': isFlippedState }"
  >
    <div 
      class="card-front rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-white"
      :style="cardStyle"
    >
      <div class="text-3xl mb-4">{{ icon }}</div>
      <h3 class="text-xl font-medium text-center">{{ title }}</h3>
    </div>
    <div 
      v-if="description"
      class="card-back bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center"
    >
      <p class="text-gray-700 text-center">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-flip {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-flip.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-back {
  transform: rotateY(180deg);
}
</style>