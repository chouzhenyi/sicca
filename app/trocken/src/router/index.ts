import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      meta: {
        title: '关于',
      },
    },
    {
      path: '/struggle',
      name: 'struggle',
      component: () => import('@/views/struggle.vue'),
      meta: {
        title: '奋斗',
      },
    },
  ],
})

export default router
