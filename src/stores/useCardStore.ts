import { defineStore } from 'pinia'

import IndexCard from '@/components/IndexCard.vue'
import CPUCard from '@/components/CPUCard.vue'
import GPUCard from '@/components/GPUCard.vue'
import APUCard from '@/components/APUCard.vue'

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [] as { name: string; component: any; hasBorder: boolean }[]
  }),
  actions: {
    init() {
      const fetchedConfig = this.fetchConfig()
      if (fetchedConfig) {
        this.cards = fetchedConfig.cards
      }
    },
    fetchConfig() {
      // 模拟配置获取，实际应用中可以替换为从服务器或本地配置获取
      return {
        cards: [
          { name: 'IndexCard', component: markRaw(IndexCard), hasBorder: true },
          { name: 'APUCard', component: markRaw(APUCard), hasBorder: false },
          { name: 'CPUCard', component: markRaw(CPUCard), hasBorder: true },
          { name: 'GPUCard', component: markRaw(GPUCard), hasBorder: true }
        ],
        displayBorder: false
      }
    }
  }
})
