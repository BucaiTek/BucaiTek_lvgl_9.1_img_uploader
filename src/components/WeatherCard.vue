<script setup lang="ts">
import { useBrowserStore } from '@/stores/useBrowserStore'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useTimeStore } from '@/stores/useTimeStore'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const browserStore = useBrowserStore()
const weatherStore = useWeatherStore()

const timeStore = useTimeStore()
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
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

    <n-popover trigger="hover" placement="top" :show-arrow="false" style="margin-bottom: -15px">
      <template #trigger>
        <i style="font-size: 65px; margin-top: 20px" :class="'qi-' + weatherStore.weatherIcon"> </i>
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
        <div style="display: flex; flex-direction: column; align-items: center; min-width: 60px">
          <span>{{ t('home.lable.humidity') }}</span>
          <span>{{ weatherStore.humidity }}</span>
        </div>
      </div>
    </n-collapse-transition>
  </div>
</template>
