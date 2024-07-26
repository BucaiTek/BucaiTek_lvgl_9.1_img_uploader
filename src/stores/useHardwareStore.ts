import { c } from 'naive-ui'
import { defineStore } from 'pinia'

interface FanData {
  actual: number // 实际转速
  min: number // 最小转速
  max: number // 最大转速
}

export const useHardwareStore = defineStore('hardwareStore', {
  state: () => ({
    useSystemReader: null as boolean | null,
    intervalId: null as number | null,
    chipModel: null as null | string,
    cpuETemp: null as null | number[],
    cpuPTemp: null as null | number[],
    gpuTemp: null as null | number[],
    cpuAvgeTemp: null as null | number,
    gpuAvgeTemp: null as null | number,
    fanData: null as null | FanData[]
  }),
  actions: {
    async init() {
      try {
        const flag = await window.electronAPI?.check_electron()
        if (flag === 'BucaiTek') {
          this.useSystemReader = true
          this.chipModel = await window.electronAPI?.getChipModel('')
          console.log('CPU 型号:', this.chipModel)
          this.startReadSysData()
        } else {
          console.log('Electron not available')
          this.useSystemReader = false
        }
      } catch (e) {
        console.error(e)
        this.useSystemReader = false
      }
    },
    async getSensorData() {
      if (!this.useSystemReader) return
      let sensorData = await window.electronAPI?.getSensorData('')
      if (!this.chipModel) return
      // 读取风扇数量
      const fanNumber = sensorData['FNum'] || 0 // 从传感器数据中获取风扇数量
      // 读取风扇信息
      let fans = []
      for (let i = 0; i < fanNumber; i++) {
        fans.push({
          //如果没有F${i}Ac这个传感器，设置为0
          actual: 0, // 实际转速
          min: sensorData[`F${i}Mn`], // 最小值
          max: sensorData[`F${i}Mx`] // 最大值
        })
      }
      for (let i = 0; i < fanNumber; i++) {
        try {
          let actual = sensorData[`F${i}Ac`]
          if (actual) {
            if (actual < fans[i].min) {
              fans[i].actual = 0
            } else {
              fans[i].actual = actual
            }
          }
        } catch (e) {
          console.error(e)
        }
      }
      this.fanData = fans

      let efficiencyCores = [] as string[]
      let performanceCores = [] as string[]
      let gpuCores = [] as string[]
      // Define cores based on CPU model
      if (this.chipModel.includes('M1')) {
        efficiencyCores = ['Tp09', 'Tp0T']
        performanceCores = ['Tp01', 'Tp05', 'Tp0D', 'Tp0H', 'Tp0L', 'Tp0P', 'Tp0X', 'Tp0b']
        gpuCores = ['Tg05', 'Tg0D', 'Tg0L', 'Tg0T']
      } else if (this.chipModel.includes('M2')) {
        efficiencyCores = ['Tp1h', 'Tp1t', 'Tp1p', 'Tp1l']
        performanceCores = ['Tp01', 'Tp05', 'Tp09', 'Tp0D', 'Tp0X', 'Tp0b', 'Tp0f', 'Tp0j']
        gpuCores = ['Tg0f', 'Tg0j']
      } else if (this.chipModel.includes('M3')) {
        efficiencyCores = ['Te05', 'Te0L', 'Te0P', 'Te0S']
        performanceCores = [
          'Tf04',
          'Tf09',
          'Tf0A',
          'Tf0B',
          'Tf0D',
          'Tf0E',
          'Tf44',
          'Tf49',
          'Tf4A',
          'Tf4B',
          'Tf4D',
          'Tf4E'
        ]
        gpuCores = ['Tf14', 'Tf18', 'Tf19', 'Tf1A', 'Tf24', 'Tf28', 'Tf29', 'Tf2A']
      }

      let cpuETemps = efficiencyCores
        .map((core) => parseFloat(sensorData[core]))
        .filter((temp) => !isNaN(temp))
      let cpuPTemps = performanceCores
        .map((core) => parseFloat(sensorData[core]))
        .filter((temp) => !isNaN(temp))
      let gpuTemps = gpuCores
        .map((core) => parseFloat(sensorData[core]))
        .filter((temp) => !isNaN(temp))

      let cpuAverageTemp =
        [...cpuETemps, ...cpuPTemps].reduce((acc, temp) => acc + temp, 0) /
        (cpuETemps.length + cpuPTemps.length)
      let gpuAverageTemp = gpuTemps.reduce((acc, temp) => acc + temp, 0) / gpuTemps.length

      this.cpuAvgeTemp = parseInt(cpuAverageTemp.toFixed(0))
      this.gpuAvgeTemp = parseInt(gpuAverageTemp.toFixed(0))
      this.cpuETemp = cpuETemps
      this.cpuPTemp = cpuPTemps
      this.gpuTemp = gpuTemps
    },
    startReadSysData() {
      if (this.intervalId || !this.useSystemReader) {
        return
      }
      this.intervalId = setInterval(() => {
        this.getSensorData()
      }, 1000)
    },
    stopReadSysData() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }
  }
})
