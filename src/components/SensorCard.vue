<script setup lang="ts">
import { useHardwareStore } from '@/stores/useHardwareStore'
import { SensorsRound as SensorsRoundIcon } from '@vicons/material'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const hardwareStore = useHardwareStore()
const showModal = ref(false)
</script>

<template>
  <div class="sensor-card" @click="showModal = true">
    <n-collapse-transition
      :show="hardwareStore.net.bandwidthUp != null"
      style="display: flex; justify-content: center"
    >
      <n-icon size="35">
        <SensorsRoundIcon />
      </n-icon>
      <span style="font-size: 22px; padding-left: 10px">
        {{ t('home.lable.sensor') }}
      </span>
    </n-collapse-transition>
    <div style="padding-top: 15px">
      <n-collapse-transition
        :show="hardwareStore.gpu.utilizationDevice != 0"
        style="display: flex; justify-content: center"
      >
        <div style="display: flex; font-size: 20px">
          <div :style="locale === 'zh_CN' ? 'min-width: 80px' : 'min-width: 100px'">
            {{ t('home.lable.utilizationDevice') }}
          </div>
          <div style="padding-left: 10px; min-width: 50px">
            {{ hardwareStore.gpu.utilizationDevice }}%
          </div>
        </div>
      </n-collapse-transition>
      <n-collapse-transition
        :show="hardwareStore.gpu.utilizationRenderer != 0"
        style="display: flex; justify-content: center"
      >
        <div style="display: flex; font-size: 20px">
          <div :style="locale === 'zh_CN' ? 'min-width: 80px' : 'min-width: 100px'">
            {{ t('home.lable.utilizationRenderer') }}
          </div>
          <div style="padding-left: 10px; min-width: 50px">
            {{ hardwareStore.gpu.utilizationRenderer }}%
          </div>
        </div>
      </n-collapse-transition>
      <n-collapse-transition
        :show="hardwareStore.gpu.utilizationTiler != 0"
        style="display: flex; justify-content: center"
      >
        <div style="display: flex; font-size: 20px">
          <div :style="locale === 'zh_CN' ? 'min-width: 80px' : 'min-width: 100px'">
            {{ t('home.lable.utilizationTiler') }}
          </div>
          <div style="padding-left: 10px; min-width: 50px">
            {{ hardwareStore.gpu.utilizationTiler }}%
          </div>
        </div>
      </n-collapse-transition>
    </div>
  </div>
  <n-modal v-model:show="showModal" transform-origin="center" preset="dialog">
    <template #icon>
      <SensorsRoundIcon />
    </template>
    <template #header>
      <span>{{ t('home.lable.sensor') }}</span>
    </template>
    <template #default>
      <n-collapse-transition>
        <div style="display: flex; flex-direction: column; align-items: center">
          <div style="display: flex; font-size: 20px">
            <div :style="locale === 'zh_CN' ? 'min-width: 80px' : 'min-width: 100px'">
              {{ t('home.lable.utilizationDevice') }}
            </div>
            <div style="padding-left: 10px; min-width: 50px">
              {{ hardwareStore.gpu.utilizationDevice }}%
            </div>
          </div>
          <div style="display: flex; font-size: 20px">
            <div :style="locale === 'zh_CN' ? 'min-width: 80px' : 'min-width: 100px'">
              {{ t('home.lable.utilizationRenderer') }}
            </div>
            <div style="padding-left: 10px; min-width: 50px">
              {{ hardwareStore.gpu.utilizationRenderer }}%
            </div>
          </div>
          <div style="display: flex; font-size: 20px">
            <div :style="locale === 'zh_CN' ? 'min-width: 80px' : 'min-width: 100px'">
              {{ t('home.lable.utilizationTiler') }}
            </div>
            <div style="padding-left: 10px; min-width: 50px">
              {{ hardwareStore.gpu.utilizationTiler }}%
            </div>
          </div>
        </div>
      </n-collapse-transition>
    </template>
  </n-modal>
</template>

<style scoped>
.sensor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
