<script setup lang="ts">
import { useInfoStore } from '@/stores/useInfoStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const infoStore = useInfoStore()

onMounted(async () => {
  infoStore.startTimer()
  await infoStore.fetchIPInfo()
  await infoStore.fetchWeatherInfo()
})

onUnmounted(() => {
  infoStore.stopTimer()
})

const showLocation = computed(() => {
  if (!infoStore.country || !infoStore.city) return ''
  return infoStore.country + ' ' + infoStore.city
})

const showCurrentTemperature = computed(() => {
  if (!infoStore.temperature.current) return ''
  return infoStore.temperature.current + '°C'
})

const showMinTemperature = computed(() => {
  if (!infoStore.temperature.current) return ''
  return infoStore.temperature.min + '°C'
})

const showMaxTemperature = computed(() => {
  if (!infoStore.temperature.max) return ''
  return infoStore.temperature.max + '°C'
})
</script>

<template>
  <div class="home">
    <n-card size="large">
      <template #header>
        <n-h2 style="margin: 0">{{ t('home.lable.info') }}</n-h2>
      </template>
      <div class="text_in_one_line">
        <n-h3 style="margin: 0 20px 0 0">{{ t('home.lable.location') }}</n-h3>
        <n-text> {{ showLocation }} </n-text>
      </div>
      <div class="text_in_one_line">
        <n-h3 style="margin: 0 20px 0 0">{{ t('home.lable.time') }}</n-h3>
        <n-text>
          <n-time :time="infoStore.time" :time-zone="infoStore.timeZone" type="datetime" />
        </n-text>
      </div>

      <n-collapse>
        <n-collapse-item style="margin-left: -22px">
          <template #header>
            <n-h3 style="margin: 0; min-width: 40px">{{ t('home.lable.temperature') }}</n-h3>
          </template>
          <template #header-extra>
            <n-text style=""> {{ showCurrentTemperature }} </n-text>
          </template>
          <div style="margin-left: 30px; margin-top: -10px">
            <div class="text_in_one_line">
              <n-h6 style="margin: 0 20px 0 0">{{ t('home.lable.current_temperature') }}</n-h6>
              <n-text> {{ showCurrentTemperature }} </n-text>
            </div>
            <div class="text_in_one_line">
              <n-h6 style="margin: 0 20px 0 0">{{ t('home.lable.max_temperature') }}</n-h6>
              <n-text> {{ showMaxTemperature }} </n-text>
            </div>
            <div class="text_in_one_line">
              <n-h6 style="margin: 0 20px 0 0">{{ t('home.lable.min_temperature') }}</n-h6>
              <n-text> {{ showMinTemperature }} </n-text>
            </div>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-card>
    <n-card title="卡片"> 卡片内容 </n-card>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: flex-start;
  min-height: calc(100vh - 100px);
  padding: 10px 14px;
}

.n-card {
  max-width: 325px;
  margin: 10px 10px;
  min-height: 450px;
}

.text_in_one_line {
  display: flex;
  align-items: center;
}

.n-card ::v-deep .n-collapse {
  display: block; /* 确保 n-collapse 使用块级布局 */
}

.n-card ::v-deep .n-collapse-item__header-extra {
  margin-left: 16px;
  justify-content: flex-start;
  display: flex;
  width: 100%;
}
</style>
