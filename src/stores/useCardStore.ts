import { defineStore } from 'pinia'
import { useBrowserStore } from '@/stores/useBrowserStore'

import WeatherCard12 from '@/components/WeatherCard12.vue'
import CPUHistoryUtilizationCard from '@/components/CPUHistoryUtilizationCard.vue'
import GPUHistoryUtilizationCard from '@/components/GPUHistoryUtilizationCard.vue'
import APUCard from '@/components/APUCard.vue'
import ClockCard from '@/components/ClockCard.vue'
import WeatherCard11 from '@/components/WeatherCard11.vue'
import TimeCard11 from '@/components/TimeCard11.vue'
import MusicCard from '@/components/MusicCard.vue'
import NetSpeedCard from '@/components/NetSpeedCard.vue'
import CPUCard from '@/components/CPUCard.vue'
import GPUCard from '@/components/GPUCard.vue'
import RAMCard from '@/components/RAMCard.vue'
import SensorCard from '@/components/SensorCard.vue'

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [] as { name: string; component: any; type: string; hasBorder: boolean }[],
    gridLenth: 6
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
          { name: 'NetSpeed', component: markRaw(NetSpeedCard), type: '11', hasBorder: true },
          { name: 'Music', component: markRaw(MusicCard), type: '11', hasBorder: true },
          {
            name: 'CPUHistoryUtilizationCard',
            component: markRaw(CPUHistoryUtilizationCard),
            type: '11',
            hasBorder: true
          },
          { name: 'WeatherCard11', component: markRaw(WeatherCard11), type: '11', hasBorder: true },

          { name: 'RAMCard', component: markRaw(RAMCard), type: '11', hasBorder: true },
          { name: 'SensorCard', component: markRaw(SensorCard), type: '11', hasBorder: true },

          { name: 'CPUCard', component: markRaw(CPUCard), type: '11', hasBorder: true },
          { name: 'GPUCard', component: markRaw(GPUCard), type: '11', hasBorder: true },
          { name: 'ClockCaed', component: markRaw(ClockCard), type: '11', hasBorder: false },
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
