import { defineStore } from 'pinia'
import { useBrowserStore } from '@/stores/useBrowserStore'

import IndexCard from '@/components/IndexCard.vue'
import CPUCard from '@/components/CPUCard.vue'
import GPUCard from '@/components/GPUCard.vue'
import APUCard from '@/components/APUCard.vue'

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [] as { name: string; component: any; type: string; hasBorder: boolean }[]
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
          { name: 'IndexCard', component: markRaw(IndexCard), type: '12', hasBorder: true },
          { name: 'APUCard', component: markRaw(APUCard), type: '12', hasBorder: false },
          { name: 'CPUCard', component: markRaw(CPUCard), type: '11', hasBorder: true },
          { name: 'GPUCard', component: markRaw(GPUCard), type: '11', hasBorder: true }
        ]
      }
    },

    haneleCardStyle(type: string) {
      const browserStore = useBrowserStore()

      switch (type) {
        case '11':
          if (browserStore.collapsed) {
            return {
              width: '260px',
              height: '240px',
              gridColumn: 'span 1',
              gridRow: 'span 1'
            }
          } else {
            return {
              width: '330px',
              height: '240px',
              gridColumn: 'span 1',
              gridRow: 'span 1'
            }
          }
        case '12':
          if (browserStore.collapsed) {
            return {
              width: '260px',
              height: '490px',
              gridColumn: 'span 1',
              gridRow: 'span 2'
            }
          } else {
            return {
              width: '330px',
              height: '490px',
              gridColumn: 'span 1',
              gridRow: 'span 2'
            }
          }
        case '21':
          if (browserStore.collapsed) {
            return {
              width: '530px',
              height: '240px',
              gridColumn: 'span 2',
              gridRow: 'span 1'
            }
          } else {
            return {
              width: '670px',
              height: '240px',
              gridColumn: 'span 2',
              gridRow: 'span 1'
            }
          }
        case '22':
          if (browserStore.collapsed) {
            return {
              width: '530px',
              height: '490px',
              gridColumn: 'span 2',
              gridRow: 'span 2'
            }
          } else {
            return {
              width: '670px',
              height: '490px',
              gridColumn: 'span 2',
              gridRow: 'span 2'
            }
          }
      }
    },
    calcGridColWidth() {
      const browserStore = useBrowserStore()

      if (browserStore.collapsed) {
        return {
          gridTemplateColumns: `repeat(3, 260px)`
        }
      } else {
        return {
          gridTemplateColumns: `repeat(3, 330px)`
        }
      }
    }
  }
})
