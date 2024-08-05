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

const formatBytes = (bytes: number | null, decimals = 2) => {
  if (bytes === null) return ''
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const formatNetSpeed = (bytes: number | null, decimals = 1) => {
  if (bytes === null) return ''
  if (bytes === 0) return '0 B/s'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s']
  let i = Math.floor(Math.log(bytes) / Math.log(k))

  if (bytes / Math.pow(k, i) > 999 && i < sizes.length - 1) {
    i++
  }

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const formatSensor = (value: number) => {
  return value.toFixed(1)
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
                  <n-h3 style="margin: 0; min-width: 90px">{{ t('home.lable.ram') }}</n-h3>
                  <n-text>
                    {{ formatBytes(hardwareStore.ram.memoryUsed) }} /
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

          <n-collapse-transition :show="hardwareStore.net.bandwidthUp != null">
            <n-collapse>
              <n-collapse-item style="margin-left: -22px">
                <template #header>
                  <n-h3 style="margin: 0; min-width: 90px">{{ t('home.lable.netSpeed') }}</n-h3>
                  <n-text>
                    {{ formatNetSpeed(hardwareStore.net.bandwidthUp) }} /
                    {{ formatNetSpeed(hardwareStore.net.bandwidthDown) }}
                  </n-text>
                </template>
                <div style="margin-left: 30px; margin-top: -15px">
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.netUploading')
                    }}</n-h6>
                    <n-text>{{ formatNetSpeed(hardwareStore.net.bandwidthUp, 2) }}</n-text>
                  </div>
                  <div class="text_in_one_line">
                    <n-h6 style="min-width: 140px; margin: 0">{{
                      t('home.lable.netDownloading')
                    }}</n-h6>
                    <n-text>{{ formatNetSpeed(hardwareStore.net.bandwidthDown, 2) }}</n-text>
                  </div>
                </div>
              </n-collapse-item>
            </n-collapse>
          </n-collapse-transition>

          <n-collapse-transition :show="hardwareStore.sensors.length > 0">
            <n-collapse>
              <n-collapse-item style="margin-left: -22px">
                <template #header>
                  <n-h3 style="margin: 0; min-width: 160px">{{ t('home.lable.sensor') }}</n-h3>
                  <n-text> {{ hardwareStore.sensors.length }}</n-text>
                </template>
                <div style="margin-left: -10px; margin-top: -15px">
                  <n-collapse>
                    <n-collapse-item>
                      <template #header>
                        <n-h6 style="margin: 0; min-width: 100px">{{
                          t('home.lable.temperature')
                        }}</n-h6>
                      </template>
                      <div style="margin-left: 10px; margin-top: -15px">
                        <div
                          v-for="(sensor, index) in hardwareStore.sensor.temperatureSensors"
                          :key="index"
                        >
                          <div class="text_in_one_line">
                            <n-text style="min-width: 150px">{{ sensor.name }}: </n-text>
                            <n-text>{{ formatSensor(sensor.value) }} °C</n-text>
                          </div>
                        </div>
                      </div>
                    </n-collapse-item>
                  </n-collapse>
                  <n-collapse>
                    <n-collapse-item>
                      <template #header>
                        <n-h6 style="margin: 0; min-width: 100px">{{
                          t('home.lable.voltage')
                        }}</n-h6>
                      </template>
                      <div style="margin-left: 10px; margin-top: -15px">
                        <div
                          v-for="(sensor, index) in hardwareStore.sensor.voltageSensors"
                          :key="index"
                        >
                          <div class="text_in_one_line">
                            <n-text style="min-width: 150px">{{ sensor.name }}: </n-text>
                            <n-text>{{ formatSensor(sensor.value) }} V</n-text>
                          </div>
                        </div>
                      </div>
                    </n-collapse-item>
                  </n-collapse>
                  <n-collapse>
                    <n-collapse-item>
                      <template #header>
                        <n-h6 style="margin: 0; min-width: 100px">{{
                          t('home.lable.current')
                        }}</n-h6>
                      </template>
                      <div style="margin-left: 10px; margin-top: -15px">
                        <div
                          v-for="(sensor, index) in hardwareStore.sensor.currentSensors"
                          :key="index"
                        >
                          <div class="text_in_one_line">
                            <n-text style="min-width: 150px">{{ sensor.name }}: </n-text>
                            <n-text>{{ formatSensor(sensor.value) }} A</n-text>
                          </div>
                        </div>
                      </div>
                    </n-collapse-item>
                  </n-collapse>
                  <n-collapse>
                    <n-collapse-item>
                      <template #header>
                        <n-h6 style="margin: 0; min-width: 100px">{{ t('home.lable.power') }}</n-h6>
                      </template>
                      <div style="margin-left: 10px; margin-top: -15px">
                        <div
                          v-for="(sensor, index) in hardwareStore.sensor.powerSensors"
                          :key="index"
                        >
                          <div class="text_in_one_line">
                            <n-text style="min-width: 150px">{{ sensor.name }}: </n-text>
                            <n-text>{{ formatSensor(sensor.value) }} W</n-text>
                          </div>
                        </div>
                      </div>
                    </n-collapse-item>
                  </n-collapse>
                </div>
              </n-collapse-item>
            </n-collapse>
          </n-collapse-transition>

          <n-collapse-transition :show="hardwareStore.disks.length > 0">
            <n-collapse>
              <n-collapse-item style="margin-left: -22px">
                <template #header>
                  <n-h3 style="margin: 0; min-width: 100px">{{ t('home.lable.disk') }}</n-h3>
                  <n-text>
                    {{ hardwareStore.disks.length }}
                  </n-text>
                </template>

                <div style="margin-left: -10px; margin-top: -15px">
                  <n-collapse v-for="disk in hardwareStore.disks" :key="disk.name">
                    <n-collapse-item>
                      <template #header>
                        <n-text style="margin: 0; min-width: 100px">{{ disk.name }}</n-text>
                      </template>
                      <div style="margin-left: 15px; margin-top: -15px">
                        <div class="text_in_one_line">
                          <n-text style="margin: 0">已用空间:</n-text>
                          <n-text>
                            {{ formatBytes(disk.storeUsed) }}/{{ formatBytes(disk.storeTotal) }}
                          </n-text>
                        </div>
                      </div>
                    </n-collapse-item>
                  </n-collapse>
                </div>
              </n-collapse-item>
            </n-collapse>
          </n-collapse-transition>

          <n-collapse-transition :show="hardwareStore.fans.length > 0">
            <n-collapse>
              <n-collapse-item style="margin-left: -22px">
                <template #header>
                  <n-h3 style="margin: 0; min-width: 100px">{{ t('home.lable.fan') }}</n-h3>
                  <n-text>
                    {{ hardwareStore.fans.length }}
                  </n-text>
                </template>
                <div style="margin-left: 30px; margin-top: -15px">
                  <div v-for="(fan, index) in hardwareStore.fans" :key="index">
                    <div class="text_in_one_line">
                      <n-h6 style="min-width: 100px; margin: 0">Fan{{ index }}:</n-h6>
                      <n-text>
                        {{ fan.actual }}
                      </n-text>
                    </div>
                  </div>
                </div>
              </n-collapse-item>
            </n-collapse>
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
