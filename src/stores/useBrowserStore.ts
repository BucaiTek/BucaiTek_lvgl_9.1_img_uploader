import { darkTheme } from 'naive-ui'
import { defineStore } from 'pinia'

export const useBrowserStore = defineStore('browserStore', {
  state: () => ({
    supportHid: false,
    collapsed: false,
    theme: null as any,
    browserLanguage: navigator.language.split('-')[0]
  }),
  actions: {}
})
