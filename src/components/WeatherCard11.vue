<script setup lang="ts">
import { useWeatherStore } from '@/stores/useWeatherStore'
const weatherStore = useWeatherStore()
// 添加一个响应式变量控制悬停状态
const showWeatherDetails = ref(false)

// 定义鼠标进入和离开的事件处理函数
const handleMouseEnter = () => {
  showWeatherDetails.value = true
}
const handleMouseLeave = () => {
  showWeatherDetails.value = false
}
const showTitle = computed(() => {
  return showWeatherDetails.value
    ? weatherStore.weather
    : `${weatherStore.region} ${weatherStore.city}`
})
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
    <div style="font-size: 18px; margin-top: 10px">
      <n-collapse-transition :show="weatherStore.region != ''">
        {{ showTitle }}
      </n-collapse-transition>
    </div>

    <i
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      style="font-size: 65px; margin-top: 0px"
      :class="'qi-' + weatherStore.weatherIcon"
    >
    </i>

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
