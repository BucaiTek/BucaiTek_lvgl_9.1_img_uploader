<script setup lang="ts">
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const hardwareStore = useHardwareStore()
const showDetail = ref(true)

const formatBytes = (bytes: number | null, decimals = 2) => {
  if (bytes === null) return { size: '', unit: '' }
  if (bytes === 0) return { size: '0', unit: 'Bytes' }
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return {
    size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    unit: sizes[i]
  }
}
const toggleDetail = () => {
  showDetail.value = !showDetail.value
}
</script>

<template>
  <div class="cpu-card">
    <n-collapse-transition
      @click="toggleDetail"
      :show="hardwareStore.net.bandwidthUp != null"
      style="display: flex; justify-content: center"
    >
      <n-icon size="35">
        <svg
          enable-background="new 0 0 512 512"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="_x32_7_x2C__Ram_x2C__Memory_x2C__Peripheral_x2C__Component_Copmuter_x2C__Computer_Hardware_x2C__processor"
          >
            <g>
              <g>
                <path
                  d="m492 334.75h-472c-10.477 0-19-8.523-19-19v-84c0-9.374 7.626-17 17-17h5.5c4.007 0 7.773-1.561 10.606-4.394s4.394-6.6 4.394-10.606c0-8.271-6.729-15-15-15h-5.5c-9.374 0-17-7.626-17-17v-16.5c0-10.477 8.523-19 19-19h276.76c4.143 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5h-276.76c-2.206 0-4 1.794-4 4v16.5c0 1.103.897 2 2 2h5.5c16.542 0 30 13.458 30 30 0 8.014-3.12 15.547-8.786 21.214-5.667 5.666-13.2 8.786-21.214 8.786h-5.5c-1.103 0-2 .897-2 2v84c0 2.206 1.794 4 4 4h472c2.206 0 4-1.794 4-4v-84c0-1.103-.897-2-2-2h-5.5c-16.542 0-30-13.458-30-30 0-16.582 13.417-30 30-30h5.5c1.103 0 2-.897 2-2v-16.5c0-2.206-1.794-4-4-4h-135.24c-4.143 0-7.5-3.357-7.5-7.5s3.357-7.5 7.5-7.5h135.24c10.477 0 19 8.523 19 19v16.5c0 9.374-7.626 17-17 17h-5.5c-8.289 0-15 6.709-15 15 0 8.271 6.729 15 15 15h5.5c9.374 0 17 7.626 17 17v84c0 10.477-8.523 19-19 19z"
                />
              </g>
              <g id="XMLID_778_">
                <path
                  d="m164 379.75h-116c-13.51 0-24.5-10.99-24.5-24.5v-28c0-4.143 3.357-7.5 7.5-7.5h150c4.143 0 7.5 3.357 7.5 7.5v28c0 13.51-10.99 24.5-24.5 24.5zm-125.5-45v20.5c0 5.238 4.262 9.5 9.5 9.5h116c5.238 0 9.5-4.262 9.5-9.5v-20.5z"
                />
              </g>
              <g id="XMLID_779_">
                <path
                  d="m464 379.75h-228.5c-13.51 0-24.5-10.99-24.5-24.5v-28c0-4.143 3.357-7.5 7.5-7.5h262.5c4.143 0 7.5 3.357 7.5 7.5v28c0 13.51-10.99 24.5-24.5 24.5zm-238-45v20.5c0 5.238 4.262 9.5 9.5 9.5h228.5c5.238 0 9.5-4.262 9.5-9.5v-20.5z"
                />
              </g>
              <g id="XMLID_780_">
                <path
                  d="m68.5 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_781_">
                <path
                  d="m106 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_782_">
                <path
                  d="m143.5 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_783_">
                <path
                  d="m256 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_784_">
                <path
                  d="m293.5 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_785_">
                <path
                  d="m331 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_786_">
                <path
                  d="m368.5 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_787_">
                <path
                  d="m406 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g id="XMLID_788_">
                <path
                  d="m443.5 379.75c-4.143 0-7.5-3.357-7.5-7.5v-45c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v45c0 4.143-3.357 7.5-7.5 7.5z"
                />
              </g>
              <g>
                <path
                  d="m262.25 304.75h-88.75c-4.143 0-7.5-3.357-7.5-7.5s3.357-7.5 7.5-7.5h88.75c8.96 0 16.25-7.29 16.25-16.25v-80c0-8.96-7.29-16.25-16.25-16.25h-162.5c-8.96 0-16.25 7.29-16.25 16.25v80c0 8.96 7.29 16.25 16.25 16.25h13.75c4.143 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5h-13.75c-17.231 0-31.25-14.019-31.25-31.25v-80c0-17.231 14.019-31.25 31.25-31.25h162.5c17.231 0 31.25 14.019 31.25 31.25v80c0 17.231-14.019 31.25-31.25 31.25z"
                />
              </g>
              <g><circle cx="326.757" cy="139.75" r="7.5" /></g>
              <g><circle cx="143.5" cy="297.25" r="7.5" /></g>
              <g id="XMLID_789_">
                <path
                  d="m355.75 304.75h-27c-7.03 0-12.75-5.72-12.75-12.75v-117c0-7.03 5.72-12.75 12.75-12.75h27c7.03 0 12.75 5.72 12.75 12.75v117c0 7.03-5.72 12.75-12.75 12.75zm-24.75-15h22.5v-112.5h-22.5z"
                />
              </g>
              <g id="XMLID_790_">
                <path
                  d="m430.75 304.75h-27c-7.03 0-12.75-5.72-12.75-12.75v-117c0-7.03 5.72-12.75 12.75-12.75h27c7.03 0 12.75 5.72 12.75 12.75v117c0 7.03-5.72 12.75-12.75 12.75zm-24.75-15h22.5v-112.5h-22.5z"
                />
              </g>
            </g>
          </g>
          <g id="Layer_1" />
        </svg>
      </n-icon>
      <span style="font-size: 22px; padding-left: 10px">
        {{ t('home.lable.ram') }}
      </span>
    </n-collapse-transition>
    <div style="padding-top: 15px">
      <n-collapse-transition
        @click="toggleDetail"
        :show="hardwareStore.ram.memoryUsed != 0"
        style="display: flex; justify-content: center"
      >
        <div class="inoneline" style="display: flex; font-size: 20px">
          <div style="min-width: 50px">
            {{ t('home.lable.ramUsed') }}
          </div>
          <div class="inoneline" style="min-width: 160px">
            <div class="inoneline">
              <div style="min-width: 75px; text-align: right">
                {{ formatBytes(hardwareStore.ram.memoryUsed).size }}
              </div>
              <div style="min-width: 30px; text-align: right">
                {{ formatBytes(hardwareStore.ram.memoryUsed).unit }}
              </div>
            </div>
            <div class="inoneline" style="min-width: 20px; justify-content: center">
              {{ ' / ' }}
            </div>
            <div class="inoneline">
              <div style="min-width: 30px">
                {{ formatBytes(hardwareStore.ram.memoryTotal).size }}
              </div>
              <div style="min-width: 30px; text-align: right">
                {{ formatBytes(hardwareStore.ram.memoryTotal).unit }}
              </div>
            </div>
          </div>
        </div>
      </n-collapse-transition>

      <n-collapse-transition :show="showDetail">
        <div style="padding-top: 10px" v-if="showDetail">
          <n-collapse-transition
            :show="hardwareStore.ram.appMemory != 0"
            style="display: flex; justify-content: center"
          >
            <div style="display: flex; font-size: 15px; min-width: 190px">
              <div :style="locale === 'zh_CN' ? 'min-width: 70px' : 'min-width: 86px'">
                {{ t('home.lable.ramApp') }}
              </div>
              <div style="padding-left: 10px; min-width: 60px; text-align: right">
                {{ formatBytes(hardwareStore.ram.appMemory).size }}
              </div>
              <div style="padding-left: 10px; min-width: 40px">
                {{ formatBytes(hardwareStore.ram.appMemory).unit }}
              </div>
            </div>
          </n-collapse-transition>
          <n-collapse-transition
            :show="hardwareStore.ram.wiredMemory != 0"
            style="display: flex; justify-content: center"
          >
            <div style="display: flex; font-size: 15px; min-width: 190px">
              <div :style="locale === 'zh_CN' ? 'min-width: 70px' : 'min-width: 86px'">
                {{ t('home.lable.ramWired') }}
              </div>
              <div style="padding-left: 10px; min-width: 60px; text-align: right">
                {{ formatBytes(hardwareStore.ram.wiredMemory).size }}
              </div>
              <div style="padding-left: 10px; min-width: 40px">
                {{ formatBytes(hardwareStore.ram.wiredMemory).unit }}
              </div>
            </div>
          </n-collapse-transition>
          <n-collapse-transition
            :show="hardwareStore.ram.wiredMemory != 0"
            style="display: flex; justify-content: center"
          >
            <div style="display: flex; font-size: 15px; min-width: 190px">
              <div :style="locale === 'zh_CN' ? 'min-width: 70px' : 'min-width: 86px'">
                {{ t('home.lable.ramCompressed') }}
              </div>
              <div style="padding-left: 10px; min-width: 60px; text-align: right">
                {{ formatBytes(hardwareStore.ram.compressedMemory).size }}
              </div>
              <div style="padding-left: 10px; min-width: 40px">
                {{ formatBytes(hardwareStore.ram.compressedMemory).unit }}
              </div>
            </div>
          </n-collapse-transition>
          <n-collapse-transition
            :show="hardwareStore.ram.wiredMemory != 0"
            style="display: flex; justify-content: center"
          >
            <div style="display: flex; font-size: 15px; min-width: 190px">
              <div :style="locale === 'zh_CN' ? 'min-width: 70px' : 'min-width: 86px'">
                {{ t('home.lable.ramSwap') }}
              </div>
              <div style="padding-left: 10px; min-width: 60px; text-align: right">
                {{ formatBytes(hardwareStore.ram.swapUsed).size }}
              </div>
              <div style="padding-left: 10px; min-width: 40px">
                {{ formatBytes(hardwareStore.ram.swapUsed).unit }}
              </div>
            </div>
          </n-collapse-transition>
        </div>
      </n-collapse-transition>
    </div>
  </div>
</template>

<style scoped>
.cpu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.inoneline {
  display: flex;
  align-items: center; /* 确保所有内容垂直居中 */
}
</style>
