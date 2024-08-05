<script setup lang="ts">
import { useInfoStore } from '@/stores/useInfoStore'
import { useBrowserStore } from '@/stores/useBrowserStore'
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const infoStore = useInfoStore()
const browserStore = useBrowserStore()
const hardwareStore = useHardwareStore()

onMounted(async () => {

})

onUnmounted(() => {
  
})

const showLocation = computed(() => {
  if (!infoStore.country || !infoStore.city) return ''
  return infoStore.country + ' ' + infoStore.region + ' ' + infoStore.city
})

const showWeather = computed(() => {
  if (!infoStore.weather) return ''
  return infoStore.weather
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
    <n-card :class="{ 'expanded-style': browserStore.collapsed }" size="large">
      <template #header>
        <n-h2 style="margin: 0">{{ t('home.lable.info') }}</n-h2>
      </template>

      <n-collapse-transition :show="infoStore.time != null">
        <div class="text_in_one_line">
          <n-h3 style="margin: 0; min-width: 95px">{{ t('home.lable.time') }}</n-h3>
          <n-text>
            <n-time :time="infoStore.time" type="datetime" />
          </n-text>
        </div>
      </n-collapse-transition>
      <n-collapse-transition :show="infoStore.country != ''">
        <div class="text_in_one_line">
          <n-h3 style="margin: 0; min-width: 95px">{{ t('home.lable.location') }}</n-h3>
          <n-text>{{ showLocation }}</n-text>
        </div>
      </n-collapse-transition>

      <n-collapse-transition :show="infoStore.weather != ''">
        <div class="text_in_one_line">
          <n-h3 style="margin: 0; min-width: 95px">{{ t('home.lable.weather') }}</n-h3>
          <n-text>{{ showWeather }}</n-text>
        </div>
      </n-collapse-transition>

      <n-collapse-transition :show="infoStore.temperature.current != null">
        <n-collapse>
          <n-collapse-item style="margin-left: -22px">
            <template #header>
              <n-h3
                :style="
                  locale === 'zh_CN' ? 'margin: 0; min-width: 95px' : 'margin: 0; min-width: 147px'
                "
                >{{ t('home.lable.temperature') }}</n-h3
              >
              <n-text>
                {{ showCurrentTemperature }}
              </n-text>
            </template>
            <div style="margin-left: 30px; margin-top: -10px">
              <div class="text_in_one_line">
                <n-h6 style="min-width: 140px; margin: 0">{{
                  t('home.lable.current_temperature')
                }}</n-h6>
                <n-text>{{ showCurrentTemperature }}</n-text>
              </div>
              <div class="text_in_one_line">
                <n-h6 style="min-width: 140px; margin: 0">{{
                  t('home.lable.min_temperature')
                }}</n-h6>
                <n-text>{{ showMinTemperature }}</n-text>
              </div>
              <div class="text_in_one_line">
                <n-h6 style="min-width: 140px; margin: 0">{{
                  t('home.lable.max_temperature')
                }}</n-h6>
                <n-text>{{ showMaxTemperature }}</n-text>
              </div>
            </div>
          </n-collapse-item>
        </n-collapse>
      </n-collapse-transition>
    </n-card>
    <n-card :class="{ 'expanded-style': browserStore.collapsed }" size="large">
      <template #header>
        <n-h2 style="margin: 0">{{ t('home.lable.system_data') }}</n-h2>
      </template>

      <div v-if="hardwareStore.useSystemReader">
        <n-collapse-transition
          :show="hardwareStore.cpuETemp != null && hardwareStore.cpuETemp.length > 0"
        >
          <div class="text_in_one_line">
            <n-h3 style="margin: 0; min-width: 170px">{{ t('home.lable.cpu') }}</n-h3>
            <n-text>{{ hardwareStore.cpuAvgeTemp }}</n-text>
          </div>
        </n-collapse-transition>
        <n-collapse-transition
          :show="hardwareStore.gpuTemp != null && hardwareStore.gpuTemp.length > 0"
        >
          <div class="text_in_one_line">
            <n-h3 style="margin: 0; min-width: 170px">{{ t('home.lable.gpu') }}</n-h3>
            <n-text>{{ hardwareStore.gpuAvgeTemp }}</n-text>
          </div>
        </n-collapse-transition>
        <n-collapse-transition
          :show="hardwareStore.fanData != null && hardwareStore.fanData.length > 0"
        >
          <div class="text_in_one_line">
            <n-h3 style="margin: 0; min-width: 170px">{{ t('home.lable.fan') }}</n-h3>
            <n-text>{{ hardwareStore.fanData![0]['actual'] }}</n-text>
          </div>
        </n-collapse-transition>
      </div>
      <div v-else-if="hardwareStore.useSystemReader == false">
        <n-text>{{ t('home.text.not_support') }}</n-text>
      </div>
    </n-card>
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
  max-width: 300px;
  margin: 10px 10px;
  min-height: 450px;
  transition:
    margin 0.3s ease-in-out,
    max-width 0.3s ease-in-out; /* 添加max-width到过渡效果 */
}

.text_in_one_line {
  display: flex;
  align-items: center;
}

.n-card :v-deep .n-collapse {
  display: block; /* 确保 n-collapse 使用块级布局 */
}

.n-card :v-deep .n-collapse-item__header-extra {
  margin-left: 13px;
  justify-content: flex-start;
  display: flex;
  width: 100%;
}

.expanded-style {
  margin: 10px 18px; /* 增大左右间距 */
  max-width: 320px; /* 增大最大宽度 */
}
</style>
