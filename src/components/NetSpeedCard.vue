<script setup lang="ts">
import {
  SpeedRound as SpeedRoundIcon,
  ArrowUpwardRound as ArrowUpwardRoundIcon,
  ArrowDownwardRound as ArrowDownwardRoundIcon
} from '@vicons/material'
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const hardwareStore = useHardwareStore()

const formatNetSpeed = (bytes: number | null, decimals = 2) => {
  if (bytes === null) return { speed: '', unit: '' }
  if (bytes === 0) return { speed: '0', unit: 'B/s' }
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s']
  let i = Math.floor(Math.log(bytes) / Math.log(k))

  if (bytes / Math.pow(k, i) > 999 && i < sizes.length - 1) {
    i++
  }

  return {
    speed: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    unit: sizes[i]
  }
}
</script>

<template>
  <div class="net-card">
    <n-collapse-transition
      :show="hardwareStore.net.bandwidthUp != null"
      style="display: flex; justify-content: center"
    >
      <n-icon size="35">
        <SpeedRoundIcon />
      </n-icon>
      <span style="font-size: 22px; padding-left: 10px"> {{ t('card.net.netSpeed') }} </span>
    </n-collapse-transition>
    <div style="padding-top: 15px">
      <n-collapse-transition
        :show="hardwareStore.net.bandwidthUp != null"
        style="display: flex; justify-content: center"
      >
        <div style="display: flex; font-size: 20px">
          <n-icon size="30">
            <ArrowUpwardRoundIcon />
          </n-icon>
          <div style="min-width: 80px; text-align: right">
            {{ formatNetSpeed(hardwareStore.net.bandwidthUp).speed }}
          </div>
          <div style="padding-left: 10px; min-width: 50px">
            {{ formatNetSpeed(hardwareStore.net.bandwidthUp).unit }}
          </div>
        </div>
      </n-collapse-transition>
      <n-collapse-transition
        :show="hardwareStore.net.bandwidthDown != null"
        style="display: flex; justify-content: center"
      >
        <div style="display: flex; font-size: 20px">
          <n-icon size="30">
            <ArrowDownwardRoundIcon />
          </n-icon>
          <div style="min-width: 80px; text-align: right">
            {{ formatNetSpeed(hardwareStore.net.bandwidthDown).speed }}
          </div>
          <div style="padding-left: 10px; min-width: 50px">
            {{ formatNetSpeed(hardwareStore.net.bandwidthDown).unit }}
          </div>
        </div>
      </n-collapse-transition>
    </div>
  </div>
</template>

<style scoped>
.net-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
