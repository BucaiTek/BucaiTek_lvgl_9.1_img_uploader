<template>
  <div class="chart-container" ref="chartContainerRef">
    <v-chart
      :theme="theme"
      class="chart"
      ref="chartRef"
      :option="chartOption"
    />
  </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import { ref } from 'vue'
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useBrowserStore } from '@/stores/useBrowserStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const hardwareStore = useHardwareStore()
const browserStore = useBrowserStore()
const theme = computed(() => (browserStore.theme.name === 'dark' ? 'dark' : 'light'))

const chartRef = ref<typeof VChart | null>(null)
const chartContainerRef = ref<HTMLElement | null>(null)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const chartContainerDom = chartContainerRef.value
  if (!chartContainerDom) return

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (chartRef.value) {
        chartRef.value.resize()
      }
    }
  })

  resizeObserver.observe(chartContainerDom)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

const chartOption = ref({
  animation: false,
  backgroundColor: '',
  title: {
    text: computed(() => t('card.cpu.GPU_Utilization_History')),
    subtext: computed(() => hardwareStore.gpu.model),
    left: 'center'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: (params: any) => {
      let totalUtil = params.find((p: any) => p.seriesName === 'Total').value[1]
      return `Device: ${totalUtil}%`
    }
  },
  darkMode: true,
  grid: {
    top: 55,
    left: 40,
    right: 20,
    bottom: 30
  },
  xAxis: {
    show: false,
    min: 0,
    max: 50
  },
  yAxis: {
    min: 0,
    max: 100,
    axisLabel: {
      formatter: '{value}%'
    }
  },
  series: [
    {
      name: 'Total',
      data: computed(() =>
        hardwareStore.gpuUtilizationHistory.device.map((usage, index) => [index, usage])
      ),
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      stack: 'total',

      itemStyle: {
        color: 'rgba(0, 122, 255, 0.4)'
      },
      areaStyle: {
        color: 'rgba(0, 122, 255, 1)' // 蓝色半透明
      }
    }
  ]
})
</script>

<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  transition: width 0.3s ease;
}
.chart {
  padding-top: 13px;
}
</style>
