import { defineStore } from 'pinia'
import { useBrowserStore } from '@/stores/useBrowserStore'

import WeatherCard12 from '@/components/WeatherCard12.vue'
import CPUHistoryUtilizationCard from '@/components/CPUHistoryUtilizationCard.vue'
import GPUHistoryUtilizationCard from '@/components/GPUHistoryUtilizationCard.vue'
import APUCard from '@/components/APUCard.vue'
import ClockCaed from '@/components/ClockCaed.vue'
import WeatherCard11 from '@/components/WeatherCard11.vue'
import TimeCard11 from '@/components/TimeCard11.vue'
import MusicCard from '@/components/MusicCard.vue'

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [] as { name: string; component: any; type: string; hasBorder: boolean }[],
    gridLenth: 3
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
          { name: 'TimeCard11', component: markRaw(TimeCard11), type: '11', hasBorder: true },
          { name: 'Music', component: markRaw(MusicCard), type: '11', hasBorder: true },
          {
            name: 'CPUHistoryUtilizationCard',
            component: markRaw(CPUHistoryUtilizationCard),
            type: '11',
            hasBorder: true
          },
          { name: 'WeatherCard11', component: markRaw(WeatherCard11), type: '11', hasBorder: true },
          { name: 'ClockCaed', component: markRaw(ClockCaed), type: '11', hasBorder: false },
          {
            name: 'GPUHistoryUtilizationCard',
            component: markRaw(GPUHistoryUtilizationCard),
            type: '11',
            hasBorder: true
          }
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
          gridTemplateColumns: `repeat(${this.gridLenth}, 260px)`
        }
      } else {
        return {
          gridTemplateColumns: `repeat(${this.gridLenth}, 330px)`
        }
      }
    }
  }
})
