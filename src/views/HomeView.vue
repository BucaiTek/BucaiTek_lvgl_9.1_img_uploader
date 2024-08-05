<script setup lang="ts">
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useBrowserStore } from '@/stores/useBrowserStore'
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const weatherStore = useWeatherStore()
const browserStore = useBrowserStore()
const hardwareStore = useHardwareStore()

onMounted(async () => {})

onUnmounted(() => {})

const showLocation = computed(() => {
  if (!weatherStore.country || !weatherStore.city) return ''
  return weatherStore.country + ' ' + weatherStore.region + ' ' + weatherStore.city
})

const showWeather = computed(() => {
  if (!weatherStore.weather) return ''
  return weatherStore.weather
})

const showCurrentTemperature = computed(() => {
  if (!weatherStore.temperature.current) return ''
  return weatherStore.temperature.current + '°C'
})

const showMinTemperature = computed(() => {
  if (!weatherStore.temperature.current) return ''
  return weatherStore.temperature.min + '°C'
})

const showMaxTemperature = computed(() => {
  if (!weatherStore.temperature.max) return ''
  return weatherStore.temperature.max + '°C'
})

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
</script>

<template>
  <div class="home">
    <n-card :class="{ 'expanded-style': browserStore.collapsed }" size="large">
      <template #header>
        <n-h2 style="margin: 0">{{ t('home.lable.info') }}</n-h2>
      </template>

      <n-scrollbar style="max-height: 340px">
        <n-collapse-transition :show="weatherStore.time != null">
          <div class="text_in_one_line">
            <n-h3 style="margin: 0; min-width: 95px">{{ t('home.lable.time') }}</n-h3>
            <n-text>
              <n-time :time="weatherStore.time" type="datetime" />
            </n-text>
          </div>
        </n-collapse-transition>
        <n-collapse-transition :show="weatherStore.country != ''">
          <div class="text_in_one_line">
            <n-h3 style="margin: 0; min-width: 95px">{{ t('home.lable.location') }}</n-h3>
            <n-text>{{ showLocation }}</n-text>
          </div>
        </n-collapse-transition>

        <n-collapse-transition :show="weatherStore.weather != ''">
          <div class="text_in_one_line">
            <n-h3 style="margin: 0; min-width: 95px">{{ t('home.lable.weather') }}</n-h3>
            <n-text>{{ showWeather }}</n-text>
          </div>
        </n-collapse-transition>

        <n-collapse-transition :show="weatherStore.temperature.current != null">
          <n-collapse>
            <n-collapse-item style="margin-left: -22px">
              <template #header>
                <n-h3
                  :style="
                    locale === 'zh_CN'
                      ? 'margin: 0; min-width: 95px'
                      : 'margin: 0; min-width: 147px'
                  "
                  >{{ t('home.lable.temperature') }}</n-h3
                >
                <n-text>
                  {{ showCurrentTemperature }}
                </n-text>
              </template>
              <div style="margin-left: 30px; margin-top: -15px">
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
      </n-scrollbar>
    </n-card>
    <n-card :class="{ 'expanded-style': browserStore.collapsed }" size="large">
      <template #header>
        <n-h2 style="margin: 0">{{ t('home.lable.system_data') }}</n-h2>
      </template>

      <n-scrollbar style="max-height: 340px">
        <div v-if="hardwareStore.useSystemReader">
          <n-collapse-transition :show="hardwareStore.cpu.averageTemperature != 0">
            <div class="text_in_one_line">
              <n-h3 style="margin: 0; min-width: 170px">{{ t('home.lable.cpu') }}</n-h3>
              <n-text>{{ hardwareStore.cpu.averageTemperature.toFixed(1) }}</n-text>
            </div>
          </n-collapse-transition>

          <n-collapse-transition :show="hardwareStore.cpu.utilizationUser != 0">
            <n-collapse>
              <n-collapse-item style="margin-left: -22px">
                <template #header>
                  <n-h3 style="margin: 0; min-width: 160px">{{
                    t('home.lable.cpuUtilization')
                  }}</n-h3>
                  <n-text>
                    {{ hardwareStore.cpu.utilizationUser + hardwareStore.cpu.utilizationSystem }}%
                  </n-text>
                </template>
                <div style="margin-left: 30px; margin-top: -15px">
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.utilizationUser')
                    }}</n-h6>
                    <n-text>{{ hardwareStore.cpu.utilizationUser }}%</n-text>
                  </div>
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.utilizationSystem')
                    }}</n-h6>
                    <n-text>{{ hardwareStore.cpu.utilizationSystem }}%</n-text>
                  </div>
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.utilizationIdle')
                    }}</n-h6>
                    <n-text>{{ hardwareStore.cpu.utilizationIdle }}%</n-text>
                  </div>
                </div>
              </n-collapse-item>
            </n-collapse>
          </n-collapse-transition>

          <n-collapse-transition :show="hardwareStore.gpu.averageTemperature != 0">
            <div class="text_in_one_line">
              <n-h3 style="margin: 0; min-width: 170px">{{ t('home.lable.gpu') }}</n-h3>
              <n-text>{{ hardwareStore.gpu.averageTemperature.toFixed(1) }}</n-text>
            </div>
          </n-collapse-transition>

          <n-collapse-transition :show="hardwareStore.gpu.utilizationDevice != 0">
            <n-collapse>
              <n-collapse-item style="margin-left: -22px">
                <template #header>
                  <n-h3 style="margin: 0; min-width: 160px">{{
                    t('home.lable.gpuUtilization')
                  }}</n-h3>
                  <n-text> {{ hardwareStore.gpu.utilizationDevice }}% </n-text>
                </template>
                <div style="margin-left: 30px; margin-top: -15px">
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.utilizationDevice')
                    }}</n-h6>
                    <n-text>{{ hardwareStore.gpu.utilizationTiler }}%</n-text>
                  </div>
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.utilizationTiler')
                    }}</n-h6>
                    <n-text>{{ hardwareStore.gpu.utilizationTiler }}%</n-text>
                  </div>

                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.utilizationRenderer')
                    }}</n-h6>
                    <n-text>{{ hardwareStore.gpu.utilizationRenderer }}%</n-text>
                  </div>
                </div>
              </n-collapse-item>
            </n-collapse>
          </n-collapse-transition>

          <n-collapse-transition :show="hardwareStore.ram.memoryUsed != 0">
            <n-collapse>
              <n-collapse-item style="margin-left: -22px">
                <template #header>
                  <n-h3 style="margin: 0; min-width: 100px">{{ t('home.lable.ram') }}</n-h3>
                  <n-text>
                    {{ formatBytes(hardwareStore.ram.memoryUsed) }}/
                    {{ formatBytes(hardwareStore.ram.memoryTotal) }}
                  </n-text>
                </template>
                <div style="margin-left: 30px; margin-top: -15px">
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{ t('home.lable.ramApp') }}</n-h6>
                    <n-text>{{ formatBytes(hardwareStore.ram.appMemory) }}</n-text>
                  </div>
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{ t('home.lable.ramWired') }}</n-h6>
                    <n-text>{{ formatBytes(hardwareStore.ram.wiredMemory) }}</n-text>
                  </div>
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.ramCompressed')
                    }}</n-h6>
                    <n-text>{{ formatBytes(hardwareStore.ram.compressedMemory) }}</n-text>
                  </div>
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{ t('home.lable.ramSwap') }}</n-h6>
                    <n-text>{{ formatBytes(hardwareStore.ram.swapUsed) }}</n-text>
                  </div>
                </div>
              </n-collapse-item>
            </n-collapse>
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
      </n-scrollbar>
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
