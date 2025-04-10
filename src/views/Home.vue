<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BookOpen, Shuffle } from 'lucide-vue-next'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
        LearnlyApp Mini Quiz
      </h1>
      <p class="text-gray-600 mb-8">Choose your learning mode to begin the quiz</p>
      
      <div class="grid gap-4">
        <button
          @click="router.push('/flashcards')"
          class="group bg-white border border-gray-200 rounded-2xl p-6 text-left transition-all hover:shadow-lg hover:border-primary/20 hover:bg-white/50"
        >
          <div class="flex items-center gap-4 mb-2">
            <div class="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen class="w-6 h-6" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900">Tap-to-Reveal Mode</h2>
          </div>
          <p class="text-gray-600 text-sm">
            Explore concepts through interactive flashcards
          </p>
        </button>
        
        <button
          @click="router.push('/swipe')"
          class="group bg-white border border-gray-200 rounded-2xl p-6 text-left transition-all hover:shadow-lg hover:border-primary/20 hover:bg-white/50"
        >
          <div class="flex items-center gap-4 mb-2">
            <div class="p-2 rounded-lg bg-primary/10 text-primary">
              <Shuffle class="w-6 h-6" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900">Swipe-to-Categorize Mode</h2>
          </div>
          <p class="text-gray-600 text-sm">
            Test your knowledge by categorizing concepts
          </p>
        </button>
      </div>
    </div>
  </div>
</template>