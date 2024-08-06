<script setup lang="ts">
import { useBrowserStore } from '@/stores/useBrowserStore'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useTimeStore } from '@/stores/useTimeStore'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const browserStore = useBrowserStore()
const weatherStore = useWeatherStore()
const hardwareStore = useHardwareStore()

const timeStore = useTimeStore()
</script>

<template>
  <main class="scroll-container">
    <div
      class="cards-container"
      :style="{ 'scroll-padding-left': browserStore.collapsed ? '12px' : '14px' }"
    >
      <n-card :class="{ 'expanded-card-style': !browserStore.collapsed }">
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <div style="font-size: 60px">
            <n-collapse-transition :show="timeStore.time != null">
              {{
                locale.includes('zh')
                  ? timeStore.days_zh[timeStore.time!.getDay()]
                  : timeStore.days[timeStore.time!.getDay()]
              }}
            </n-collapse-transition>
          </div>
          <div style="font-size: 18px; margin-top: -18px">
            <n-collapse-transition :show="timeStore.time != null">
              {{ timeStore.formatTime(timeStore.time!.getHours()) }}:{{
                timeStore.formatTime(timeStore.time!.getMinutes())
              }}
              ·
              {{
                locale.includes('zh')
                  ? timeStore.month_zh[timeStore.time!.getMonth()]
                  : timeStore.month[timeStore.time!.getMonth()]
              }}{{ locale.includes('zh') ? '' : ', ' }}{{ timeStore.time!.getDate()
              }}{{ locale.includes('zh') ? '日' : '' }}
            </n-collapse-transition>
          </div>

          <div style="font-size: 18px; margin-top: -5px">
            <n-collapse-transition :show="weatherStore.region != ''">
              {{ weatherStore.region }} {{ weatherStore.city }}
            </n-collapse-transition>
          </div>

          <n-popover
            trigger="hover"
            placement="top"
            :show-arrow="false"
            style="margin-bottom: -15px"
          >
            <template #trigger>
              <i
                style="font-size: 65px; margin-top: 20px"
                :class="'qi-' + weatherStore.weatherIcon"
              >
              </i>
            </template>
            <span>
              <i style="font-size: 13px" :class="'qi-' + weatherStore.weatherIcon"> </i>
              {{ weatherStore.weather }}</span
            >
          </n-popover>

          <div style="font-size: 30px; margin-top: -10px">
            <n-collapse-transition :show="weatherStore.temperature.current != null">
              {{ weatherStore.temperature.current }}°C
            </n-collapse-transition>
          </div>

          <div style="font-size: 16px; margin-top: -6px">
            <n-collapse-transition :show="weatherStore.temperature.current != null">
              {{ weatherStore.temperature.min }} / {{ weatherStore.temperature.max }}
            </n-collapse-transition>
          </div>
          <n-collapse-transition :show="weatherStore.windDirction.length > 0">
            <div style="display: flex; justify-content: space-around; margin-top: 40px">
              <div
                class="dynamic-margin"
                style="display: flex; flex-direction: column; align-items: center; min-width: 60px"
                :style="{ 'margin-right': browserStore.collapsed ? '16px' : '30px' }"
              >
                <span>{{ t('home.lable.UVIndex') }}</span>
                <span>{{ weatherStore.uv }}</span>
              </div>
              <div
                class="dynamic-margin"
                style="display: flex; flex-direction: column; align-items: center; min-width: 60px"
                :style="{ 'margin-right': browserStore.collapsed ? '16px' : '30px' }"
              >
                <span>{{ t('home.lable.wind') }}</span>
                <span>{{ weatherStore.wind }} KPH</span>
              </div>
              <div
                style="display: flex; flex-direction: column; align-items: center; min-width: 60px"
              >
                <span>{{ t('home.lable.humidity') }}</span>
                <span>{{ weatherStore.humidity }}</span>
              </div>
            </div>
          </n-collapse-transition>
        </div>
      </n-card>
      <n-card
        v-show="hardwareStore.suppportBCMonitor"
        :class="{ 'expanded-card-style': !browserStore.collapsed }"
      >
        2
      </n-card>
      <n-card
        v-show="hardwareStore.suppportBCMonitor"
        :class="{ 'expanded-card-style': !browserStore.collapsed }"
      >
        3
      </n-card>
      <n-card
        v-show="hardwareStore.suppportBCMonitor"
        :class="{ 'expanded-card-style': !browserStore.collapsed }"
      >
        4
      </n-card>

      <n-card
        v-show="!hardwareStore.suppportBCMonitor"
        :class="{ 'expanded-card-style': !browserStore.collapsed }"
      >
        Not Support
      </n-card>
    </div>
  </main>
</template>

<style scoped>
.scroll-container {
  width: 100%;
  height: calc(100vh - 80px);
}

.cards-container {
  padding: 30px 0 0 12px;
  display: flex; /* 使用flex布局使元素横向排列 */
  flex-direction: row; /* 横向排列 */
  align-items: center; /* 垂直居中对齐（根据需要调整） */
  scroll-snap-type: x mandatory; /* 滑动对齐 */
  white-space: nowrap;
  overflow-x: scroll; /* 允许横向滚动 */
  overflow-y: hidden; /* 防止纵向滚动 */
}

.n-card {
  flex: 0 0 auto; /* 避免卡片被拉伸或压缩 */
  width: 255px;
  height: 470px;
  margin-right: 14px; /* 添加间隔 */
  scroll-snap-align: start;
  transition:
    margin 0.1s ease-in-out,
    width 0.2s ease-in-out; /* 添加max-width到过渡效果 */
}

.scroll-container ::-webkit-scrollbar {
  display: none; /* 针对WebKit浏览器 */
}

.scroll-container {
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

.expanded-card-style {
  width: 320px;
  margin-right: 15px;
  margin-left: 3px;
}

.dynamic-margin {
  transition: margin-right 0.2s ease-in-out; /* 平滑过渡动画 */
}
</style>
