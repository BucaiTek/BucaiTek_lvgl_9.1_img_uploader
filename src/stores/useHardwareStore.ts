import { defineStore } from 'pinia'

export const useHardwareStore = defineStore('hardwareStore', {
  state: () => ({
    intervalId: null as number | null,
    chipModel: null as null | string,
    cpuETemp: null as null | string[],
    cpuPTemp: null as null | string[],
    gpuTemp: null as null | string[],
    fanData: null as null | object[]
  }),
  actions: {
    async init() {
      this.chipModel = await window.electronAPI?.getChipModel('')
      console.log('CPU 型号:', this.chipModel)
    },
    async getSensorData() {
      let sensorData = await window.electronAPI?.getSensorData('')
      if (!this.chipModel) return
      // 读取风扇数量
      const fanNumber = sensorData['FNum'] || 0 // 从传感器数据中获取风扇数量
      // 读取风扇信息
      let fans = []
      for (let i = 0; i < fanNumber; i++) {
        fans.push({
          //如果没有F${i}Ac这个传感器，设置为0
          actual: sensorData[`F${i}Ac`] || 0, // 实际转速
          min: sensorData[`F${i}Mn`], // 最小值
          max: sensorData[`F${i}Mx`] // 最大值
        })
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

      this.cpuETemp = efficiencyCores
        .map((core) => `${sensorData[core]}`)
        .filter((temp) => temp !== 'undefined')
      this.cpuPTemp = performanceCores
        .map((core) => `${sensorData[core]}`)
        .filter((temp) => temp !== 'undefined')
      this.gpuTemp = gpuCores
        .map((core) => `${sensorData[core]}`)
        .filter((temp) => temp !== 'undefined')
    }
  }
})
