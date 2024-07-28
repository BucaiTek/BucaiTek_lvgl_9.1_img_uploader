import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ConfiguratorView from '@/views/ConfiguratorView.vue'
import Python from '@/views/PythonView.vue'

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
    },
    {
      path: '/python',
      name: 'python',
      component: Python
    }
  ]
})

export default router
