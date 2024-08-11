<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { useTimeStore } from '@/stores/useTimeStore'
const timeStore = useTimeStore()
</script>

<template>
  <div class="time-card">
    <n-collapse-transition :show="timeStore.time != null">
      <div style="font-size: 60px; display: flex; align-items: center; justify-content: center">
        {{ timeStore.formatTime(timeStore.time!.getHours()) }} :
        {{ timeStore.formatTime(timeStore.time!.getMinutes()) }}
      </div>
      <div
        style="
          margin-top: -10px;
          font-size: 21px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div style="min-width: 90px; display: flex; align-items: center; justify-content: center">
          {{ timeStore.days_All[timeStore.time!.getDay()] }}
        </div>
        <div
          style="min-width: 10px; display: flex; align-items: center; justify-content: center"
        ></div>
        <div style="min-width: 90px; display: flex; align-items: center; justify-content: center">
          {{ timeStore.month[timeStore.time!.getMonth()] }}
          {{ timeStore.time!.getDate() }}
        </div>
      </div>
    </n-collapse-transition>
  </div>
</template>

<style scoped>
.time-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
