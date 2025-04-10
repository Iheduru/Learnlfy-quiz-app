<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronRight, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Flashcard from '../components/Flashcard.vue'

const router = useRouter()

const lessons = [
  // Lesson 1: States of Matter
  {
    title: "States of Matter",
    cards: [
      {
        title: 'Steam',
        icon: '💨',
        color: '#38BDF8',
        description: 'A gas expands to fill any container. Its particles move freely and spread apart.'
      },
      {
        title: 'Water',
        icon: '💧',
        color: '#A855F7',
        description: 'A liquid takes the shape of its container but keeps its volume. Its particles are close together.'
      },
      {
        title: 'Ice',
        icon: '❄️',
        color: '#FB923C',
        description: 'Fixed shape & volume. Its particles vibrate but don\'t move freely.'
      },
      {
        title: 'Lightning',
        icon: '⚡',
        color: '#4F46E5',
        description: 'A form of plasma, where electrons have separated from atoms due to high energy.'
      }
    ]
  },
  // Lesson 2: Properties of Matter
  {
    title: "Properties of Matter",
    cards: [
      {
        title: 'Mass',
        icon: '⚖️',
        color: '#38BDF8',
        description: 'The amount of matter in an object. Measured in grams or kilograms.'
      },
      {
        title: 'Volume',
        icon: '📦',
        color: '#A855F7',
        description: 'The amount of space that matter takes up. Measured in liters or cubic meters.'
      },
      {
        title: 'Density',
        icon: '🏋️',
        color: '#FB923C',
        description: 'How much mass is in a given volume. Determines if things float or sink.'
      },
      {
        title: 'Temperature',
        icon: '🌡️',
        color: '#4F46E5',
        description: 'A measure of how hot or cold something is. Affects the movement of particles.'
      }
    ]
  }
]

const currentLessonIndex = ref(0)
const showGrid = ref(true)
const currentCardIndex = ref(0)

const currentLesson = computed(() => lessons[currentLessonIndex.value])
const progress = computed(() => ((currentLessonIndex.value + 1) / lessons.length) * 100)

const nextLesson = () => {
  if (currentLessonIndex.value < lessons.length - 1) {
    currentLessonIndex.value++
    currentCardIndex.value = 0
    showGrid.value = true
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-md mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <button 
          @click="router.push('/')"
          class="p-2 rounded-lg hover:bg-white/50 text-gray-600"
        >
          <ArrowLeft class="w-5 h-5" />
        </button>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Lesson {{ currentLessonIndex + 1 }}</h2>
          <p class="text-gray-600 text-sm">{{ currentLesson.title }}</p>
        </div>
      </div>

      <div class="h-1 w-full bg-gray-200 rounded-full mb-8">
        <div 
          class="h-1 bg-blue-600 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <div v-if="showGrid" class="grid grid-cols-2 gap-4 mb-8">
        <Flashcard
          v-for="card in currentLesson.cards"
          :key="card.title"
          v-bind="card"
        />
      </div>
      <div v-else class="mb-8">
        <Flashcard
          v-bind="currentLesson.cards[currentCardIndex]"
        />
      </div>

      <button
        @click="nextLesson"
        class="w-full bg-blue-700 text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition-all hover:bg-blue-800"
      >
        {{ currentLessonIndex < lessons.length - 1 ? 'Next Lesson' : 'Finish' }}
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>