import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ConfiguratorView from '@/views/ConfiguratorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: ConfiguratorView
    }
  ]
})

export default router
