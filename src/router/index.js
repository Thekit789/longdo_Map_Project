import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/LongDoMap',
      name: 'MAP',
      component: () => import('../components/LongDoMap.vue'),
    },
  ],
})

export default router
