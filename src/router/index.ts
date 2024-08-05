import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ConfiguratorView from '@/views/ConfiguratorView.vue'
import TerminalView from '@/views/TerminalView.vue'
import SettingView from '@/views/SettingView.vue'

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
      path: '/terminal',
      name: 'terminal',
      component: TerminalView
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView
    }
  ]
})

export default router
