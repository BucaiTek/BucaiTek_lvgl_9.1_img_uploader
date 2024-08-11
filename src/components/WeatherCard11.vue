<script setup lang="ts">
import { useWeatherStore } from '@/stores/useWeatherStore'
const weatherStore = useWeatherStore()

</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
    <div style="font-size: 18px; margin-top: 10px">
      <n-collapse-transition :show="weatherStore.region != ''">
        {{ weatherStore.region }} {{ weatherStore.city }}
      </n-collapse-transition>
    </div>

    <n-popover trigger="hover" placement="top" :show-arrow="false" style="margin-bottom: -15px">
      <template #trigger>
        <i style="font-size: 65px; margin-top: 0px" :class="'qi-' + weatherStore.weatherIcon"> </i>
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
  </div>
</template>
