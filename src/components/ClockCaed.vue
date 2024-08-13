<script setup>
import { useTimeStore } from '@/stores/useTimeStore'
const timeStore = useTimeStore()
</script>

<template>
  <n-collapse-transition class="clock-container" :show="timeStore.clockHourCss != ''">
    <div>
      <div class="clock">
        <div class="hour" :style="{ transform: timeStore.clockHourCss }"></div>
        <div class="min" :style="{ transform: timeStore.clockMinCss }"></div>
        <div class="sec" :style="{ transform: timeStore.clockSecCss }"></div>
        <div class="center-dot"></div>
      </div>
    </div>
  </n-collapse-transition>
</template>

<style scoped>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8); /* 缩小到原始大小的50% */
  transform-origin: center; /* 确保缩放以时钟的中心为中心 */

  height: 198px;
  width: 100%;
}
.clock {
  position: relative;
  width: 18em;
  height: 18em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--n-color);
  background-image: url(@/assets/clock-face.png);
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  border: 5px solid var(--n-color);
  box-shadow:
    0 -15px 15px rgba(255, 255, 255, 0.05),
    inset 0 -15px 15px rgba(255, 255, 255, 0.05),
    0 15px 15px rgba(0, 0, 0, 0.3),
    inset 0 15px 15px rgba(0, 0, 0, 0.3);
}
.hour,
.min,
.sec {
  position: absolute;
  display: flex;
  justify-content: center;
  border-radius: 50%;
}
.hour {
  height: 10em;
  width: 10em;
  background-color: transparent;
}
.min {
  height: 12em;
  width: 12em;
  background-color: transparent;
}
.sec {
  height: 13em;
  width: 13em;
  background-color: transparent;
}
.hour::before,
.min::before,
.sec::before {
  content: '';
  position: absolute;
  border-radius: 6px;
}
.hour::before {
  height: 50%;
  width: 6px;
  background-color: #888;
}
.min::before {
  height: 50%;
  width: 4px;
  background-color: #888;
}
.sec::before {
  height: 60%;
  width: 2px;
  background-color: #f00;
}

.center-dot {
  height: 1em;
  width: 1em;
  background-color: #888;
  z-index: 10;
  border-radius: 50%;
}
</style>
