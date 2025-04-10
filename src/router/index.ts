import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Flashcards from '../views/Flashcards.vue'
import SwipeQuiz from '../views/SwipeQuiz.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      component: Flashcards
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: SwipeQuiz
    }
  ]
})

export default router