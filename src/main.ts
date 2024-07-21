import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import zhCN from '@/locales/zh_CN'
import enUS from '@/locales/en_US'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

const app = createApp(App)
const i18n = createI18n({
  locale: 'zh_CN',
  allowComposition: true,
  messages: {
    en_US: enUS,
    zh_CN: zhCN
  }
})

app.use(createPinia())
app.use(router).use(naive).use(i18n)

app.mount('#app')
