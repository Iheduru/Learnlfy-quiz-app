<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import SwipeCard from '../components/SwipeCard.vue'

const router = useRouter()

const cards = [
  {
    content: 'Burning Paper',
    icon: '🔥',
    correctSwipe: 'right' as const // Chemical change
  },
  {
    content: 'Ice Melting',
    icon: '❄️',
    correctSwipe: 'left' as const // Physical change
  },
  {
    content: 'Rusting Iron',
    icon: '🔧',
    correctSwipe: 'right' as const // Chemical change
  }
]

const currentIndex = ref(0)
const incorrectCards = ref<typeof cards>([])
const score = ref(0)
const showSuccess = ref(false)

const progress = computed(() => ((currentIndex.value + 1) / cards.length) * 100)
const isComplete = computed(() => currentIndex.value === cards.length - 1 && incorrectCards.value.length === 0)

const handleSwipe = (correct: boolean) => {
  if (correct) {
    score.value++
    if (isComplete.value) {
      showSuccess.value = true
    }
  } else {
    incorrectCards.value.push(cards[currentIndex.value])
  }
  
  if (currentIndex.value < cards.length - 1) {
    currentIndex.value++
  } else if (incorrectCards.value.length > 0) {
    currentIndex.value = 0
    cards.splice(0, cards.length, ...incorrectCards.value)
    incorrectCards.value = []
  }
}

const handleManualSwipe = (direction: 'left' | 'right') => {
  const correct = direction === cards[currentIndex.value].correctSwipe
  handleSwipe(correct)
}
</script>

<template>
  <div class="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-md mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <button 
          @click="router.push('/')"
          class="p-2 rounded-lg hover:bg-white/50 text-gray-600 transition-colors"
        >
          <ArrowLeft class="w-5 h-5" />
        </button>
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-900">Lesson 3.1</h2>
          <p class="text-gray-600 text-sm">
            Tap the arrows below the cards to swipe the cards in the direction of the correct change.
          </p>
        </div>
      </div>

      <div class="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span class="flex items-center gap-2">
          ← Physical Change
        </span>
        <span class="flex items-center gap-2">
          Chemical Change →
        </span>
      </div>

      <div v-if="!showSuccess" class="relative mb-20">
        <SwipeCard
          :content="cards[currentIndex].content"
          :icon="cards[currentIndex].icon"
          :correct-swipe="cards[currentIndex].correctSwipe"
          @swipe="handleSwipe"
        />
        
        <div class="absolute inset-x-0 bottom-0 flex justify-between -mb-16">
          <button
            @click="handleManualSwipe('left')"
            class="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <ArrowLeft class="w-6 h-6" />
          </button>
          <button
            @click="handleManualSwipe('right')"
            class="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <ArrowRight class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">Great Job!</h3>
        <button
          @click="router.push('/')"
          class="px-8 py-3 bg-white rounded-full text-gray-600 shadow-sm hover:shadow transition-all"
        >
          Try Again
        </button>
      </div>

      <button
        v-if="!showSuccess"
        class="w-full bg-blue-700 text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition-all hover:bg-blue-800 mt-8"
      >
        Next
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>