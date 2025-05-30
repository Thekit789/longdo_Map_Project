import { createRouter, createWebHistory } from 'vue-router'
import MapLayoutView from '@/views/MapLayoutView.vue'
import LongDoMap from '../components/LongDoMap.vue'

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
      component: MapLayoutView,
      children: [
        {
          path: '',
          name: 'longdomap-content',
          component: LongDoMap,
        },
      ],
    },
  ],
})

export default router
