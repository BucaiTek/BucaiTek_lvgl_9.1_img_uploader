<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref } from 'vue'
import { useHardwareStore } from '@/stores/useHardwareStore'
import { useBrowserStore } from '@/stores/useBrowserStore'
const hardwareStore = useHardwareStore()
const browserStore = useBrowserStore()

const calcTotalUtilization = computed(() => {
  return hardwareStore.cpuUtilizationHistory.user.map((userUtil, index) => {
    const systemUtil = hardwareStore.cpuUtilizationHistory.system[index] || 0
    return [index, userUtil + systemUtil]
  })
})

const option = ref({
  animation: false,
  backgroundColor: '',
  title: {
    text: 'CPU Utilization',
    subtext: computed(() => hardwareStore.cpu.model),
    left: 'center'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: (params) => {
      let totalUtil = params.find((p) => p.seriesName === 'Total').value[1]
      let systemUtil = params.find((p) => p.seriesName === 'System').value[1]
      return `User: ${totalUtil - systemUtil}%<br>System: ${systemUtil}%<br>Idle: ${100 - totalUtil}%`
    }
  },
  darkMode: 'dark',
  grid: {
    top: 55,
    left: 40,
    right: 40,
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
      data: calcTotalUtilization,
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'lttb',
      stack: 'total',

      itemStyle: {
        color: 'rgba(0, 122, 255, 0.4)'
      },
      areaStyle: {
        color: 'rgba(0, 122, 255, 1)' // 蓝色半透明
      }
    },
    {
      name: 'System',
      data: computed(() =>
        hardwareStore.cpuUtilizationHistory.system.map((usage, index) => [index, usage])
      ),
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: {
        color: 'rgba(255, 59, 47, 0)'
      },
      areaStyle: {
        color: 'rgba(255, 59, 47, 1)' // 红色半透明
      }
    }
  ]
})
</script>

<style scoped>
.chart {
  padding-top: 20px;
}
</style>
