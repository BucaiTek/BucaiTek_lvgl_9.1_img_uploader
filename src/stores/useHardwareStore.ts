import { defineStore } from 'pinia'

interface FanData {
  actual: number // 实际转速
  min: number // 最小转速
  max: number // 最大转速
}

type Platform = 'M1' | 'M2' | 'M3'
type HardwareType = 'CPU' | 'GPU'

export const useHardwareStore = defineStore('hardwareStore', {
  state: () => ({
    useSystemReader: null as boolean | null,
    intervalId: null as number | null,
    cpu: {
      efficiencyCoreCount: null as number | null,
      performanceCoreCount: null as number | null,
      totalCoreCount: null as number | null,
      utilizationUser: null as number | null,
      utilizationSystem: null as number | null,
      utilizationIdle: null as number | null,
      coresUtilization: [] as number[],
      averageTemperature: null as number | null,
      coresTemperature: [] as number[],
      model: ''
    },
    gpu: {
      coreCount: null as number | null,
      model: '',
      utilizationRenderer: null as number | null,
      utilizationTiler: null as number | null,
      utilizationDevice: null as number | null,
      averageTemperature: null as number | null,
      coresTemperature: [] as number[]
    },
    ram: {
      memoryUsed: null as number | null,
      memoryTotal: null as number | null,
      appMemory: null as number | null,
      wiredMemory: null as number | null,
      compressedMemory: null as number | null,
      swapUsed: null as number | null,
      swapTotal: null as number | null,
      cachedMemory: null as number | null
    },
    net: {
      bandwidthUp: null as number | null,
      bandwidthDown: null as number | null
    },
    disks: [] as { storeUsed: number; storeFree: number; storeTotal: number; name: string }[],
    fans: [] as FanData[],
    sensors: {} as Record<string, number> // 由于传感器类型多样，使用键值对来存储所有传感器数据
  }),
  actions: {
    async init() {
      try {
        const flag = await window.electronAPI?.check_electron()
        if (flag === 'BucaiTek') {
          this.useSystemReader = true
          this.startReadSysData()
        } else {
          this.useSystemReader = false
        }
      } catch (e) {
        console.error(e)
        this.useSystemReader = false
      }
    },
    async getSensorData() {
      if (!this.useSystemReader) return
      let jsonString = await window.electronAPI?.BCMonitor('json')
      if (jsonString) {
        try {
          let jsonData = JSON.parse(jsonString)
          this.updateHardwareData(jsonData)
        } catch (e) {
          console.error('Error parsing JSON:', e)
        }
      }
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
    },
    updateHardwareData(data: Record<string, any>) {
      this.sensors = data.Sensors

      this.cpu.model = data.CPU.model
      this.cpu.efficiencyCoreCount = data.CPU.cores[0]
      this.cpu.performanceCoreCount = data.CPU.cores[1]
      this.cpu.totalCoreCount = data.CPU.cores[0] + data.CPU.cores[1]
      this.cpu.coresUtilization = data.CPU.coresUtilization
      this.cpu.utilizationUser = data.CPU.utilizations[0]
      this.cpu.utilizationSystem = data.CPU.utilizations[1]
      this.cpu.utilizationIdle = data.CPU.utilizations[2]

      const cpuTemperatureInfo = this.getTemperatureByModel(this.cpu.model, 'CPU')
      if (cpuTemperatureInfo) {
        this.cpu.averageTemperature = cpuTemperatureInfo.average
        this.cpu.coresTemperature = cpuTemperatureInfo.temperatures
      }

      this.gpu.model = data.GPU.model
      this.gpu.coreCount = data.GPU.coreCount
      this.gpu.utilizationDevice = data.GPU.utilization.device
      this.gpu.utilizationRenderer = data.GPU.utilization.renderer
      this.gpu.utilizationTiler = data.GPU.utilization.tiler

      const gpuTemperatureInfo = this.getTemperatureByModel(this.gpu.model, 'GPU')

      if (gpuTemperatureInfo) {
        this.gpu.averageTemperature = gpuTemperatureInfo.average
        this.gpu.coresTemperature = gpuTemperatureInfo.temperatures
      }

      this.ram.swapTotal = data.RAM.swap[1]
      this.ram.swapUsed = data.RAM.swap[0]
      this.ram.memoryTotal = data.RAM.memory[1]
      this.ram.memoryUsed = data.RAM.memory[0]
      this.ram.appMemory = data.RAM.app
      this.ram.compressedMemory = data.RAM.compressed
      this.ram.wiredMemory = data.RAM.wired
      this.ram.cachedMemory = data.RAM.cached

      this.net.bandwidthUp = data.NET.bandwidth[0]
      this.net.bandwidthDown = data.NET.bandwidth[1]

      this.disks = Object.keys(data.DISK).map((key) => ({
        storeUsed: data.DISK[key].store[0],
        storeFree: data.DISK[key].store[1],
        storeTotal: data.DISK[key].store[2],
        name: data.DISK[key].name
      }))

      const fanCount = data.Sensors.FNum
      this.fans = []
      for (let i = 0; i < fanCount; i++) {
        const fanData: FanData = {
          actual: data.Sensors[`F${i}Ac`],
          min: data.Sensors[`F${i}Mn`],
          max: data.Sensors[`F${i}Mx`]
        }
        this.fans.push(fanData)
      }
    },
    getTemperatureByModel(
      model: string,
      type: HardwareType
    ): { average: number; temperatures: number[] } {
      const sensorMap: Record<Platform, Record<HardwareType, string[]>> = {
        M1: {
          CPU: ['Tp09', 'Tp0T', 'Tp01', 'Tp05', 'Tp0D', 'Tp0H', 'Tp0L', 'Tp0P', 'Tp0X', 'Tp0b'],
          GPU: ['Tg05', 'Tg0D', 'Tg0L', 'Tg0T']
        },
        M2: {
          CPU: [
            'Tp1h',
            'Tp1t',
            'Tp1p',
            'Tp1l',
            'Tp01',
            'Tp05',
            'Tp09',
            'Tp0D',
            'Tp0X',
            'Tp0b',
            'Tp0f',
            'Tp0j'
          ],
          GPU: ['Tg0f', 'Tg0j']
        },
        M3: {
          CPU: [
            'Te05',
            'Te0L',
            'Te0P',
            'Te0S',
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
          ],
          GPU: ['Tf14', 'Tf18', 'Tf19', 'Tf1A', 'Tf24', 'Tf28', 'Tf29', 'Tf2A']
        }
      }

      let platform: Platform
      let hardwareType: HardwareType

      if (model.includes('M1')) {
        platform = 'M1'
      } else if (model.includes('M2')) {
        platform = 'M2'
      } else if (model.includes('M3')) {
        platform = 'M3'
      } else {
        return { average: 0, temperatures: [] }
      }

      const sensors = sensorMap[platform][type]
      let temperatures: number[] = []
      let totalTemperature = 0
      let count = 0
      sensors.forEach((sensorKey) => {
        const temp = this.sensors[sensorKey]
        if (temp !== undefined) {
          temperatures.push(temp)
          totalTemperature += temp
          count++
        } else {
          temperatures.push(0)
        }
      })
      const average = count > 0 ? totalTemperature / count : 0

      return {
        average,
        temperatures
      }
    }
  }
})
