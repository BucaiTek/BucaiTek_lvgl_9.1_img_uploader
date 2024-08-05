import { defineStore } from 'pinia'

interface FanData {
  actual: number
  min: number
  max: number
}

const Platform = {
  M1: 'm1',
  M2: 'm2',
  M3: 'm3',
  ALL: 'all'
}

let All_Sensors = [
  { key: 'TA%P', name: 'Ambient %', platform: Platform.ALL },
  { key: 'TZ%C', name: 'Thermal zone %', platform: Platform.ALL },
  { key: 'TC0D', name: 'CPU diode', platform: Platform.ALL },
  { key: 'TC0E', name: 'CPU diode virtual', platform: Platform.ALL },
  { key: 'TC0F', name: 'CPU diode filtered', platform: Platform.ALL },
  { key: 'TC0H', name: 'CPU heatsink', platform: Platform.ALL },
  { key: 'TC0P', name: 'CPU proximity', platform: Platform.ALL },
  { key: 'TCAD', name: 'CPU package', platform: Platform.ALL },
  { key: 'TC%c', name: 'CPU core %', platform: Platform.ALL },
  { key: 'TC%C', name: 'CPU Core %', platform: Platform.ALL },
  { key: 'TCGC', name: 'GPU Intel Graphics', platform: Platform.ALL },
  { key: 'TG0D', name: 'GPU diode', platform: Platform.ALL },
  { key: 'TGDD', name: 'GPU AMD Radeon', platform: Platform.ALL },
  { key: 'TG0H', name: 'GPU heatsink', platform: Platform.ALL },
  { key: 'TG0P', name: 'GPU proximity', platform: Platform.ALL },
  { key: 'Tm0P', name: 'Mainboard', platform: Platform.ALL },
  { key: 'TW0P', name: 'Airport', platform: Platform.ALL },
  { key: 'TL0P', name: 'Display', platform: Platform.ALL },
  { key: 'TI%P', name: 'Thunderbolt %', platform: Platform.ALL },
  { key: 'TH%A', name: 'Disk % (A)', platform: Platform.ALL },
  { key: 'TH%B', name: 'Disk % (B)', platform: Platform.ALL },
  { key: 'TH%C', name: 'Disk % (C)', platform: Platform.ALL },
  { key: 'TTLD', name: 'Thunderbolt left', platform: Platform.ALL },
  { key: 'TTRD', name: 'Thunderbolt right', platform: Platform.ALL },
  { key: 'TN0D', name: 'Northbridge diode', platform: Platform.ALL },
  { key: 'TN0H', name: 'Northbridge heatsink', platform: Platform.ALL },
  { key: 'TN0P', name: 'Northbridge proximity', platform: Platform.ALL },
  { key: 'Tp09', name: 'CPU E-Core 1', platform: Platform.M1 },
  { key: 'Tp0T', name: 'CPU E-Core 2', platform: Platform.M1 },
  { key: 'Tp01', name: 'CPU P-Core 1', platform: Platform.M1 },
  { key: 'Tp05', name: 'CPU P-Core 2', platform: Platform.M1 },
  { key: 'Tp0D', name: 'CPU P-Core 3', platform: Platform.M1 },
  { key: 'Tp0H', name: 'CPU P-Core 4', platform: Platform.M1 },
  { key: 'Tp0L', name: 'CPU P-Core 5', platform: Platform.M1 },
  { key: 'Tp0P', name: 'CPU P-Core 6', platform: Platform.M1 },
  { key: 'Tp0X', name: 'CPU P-Core 7', platform: Platform.M1 },
  { key: 'Tp0b', name: 'CPU P-Core 8', platform: Platform.M1 },
  { key: 'Tg05', name: 'GPU 1', platform: Platform.M1 },
  { key: 'Tg0D', name: 'GPU 2', platform: Platform.M1 },
  { key: 'Tg0L', name: 'GPU 3', platform: Platform.M1 },
  { key: 'Tg0T', name: 'GPU 4', platform: Platform.M1 },
  { key: 'Tm02', name: 'Memory 1', platform: Platform.M1 },
  { key: 'Tm06', name: 'Memory 2', platform: Platform.M1 },
  { key: 'Tm08', name: 'Memory 3', platform: Platform.M1 },
  { key: 'Tm09', name: 'Memory 4', platform: Platform.M1 },
  { key: 'Tp1h', name: 'CPU E-Core 1', platform: Platform.M2 },
  { key: 'Tp1t', name: 'CPU E-Core 2', platform: Platform.M2 },
  { key: 'Tp1p', name: 'CPU E-Core 3', platform: Platform.M2 },
  { key: 'Tp1l', name: 'CPU E-Core 4', platform: Platform.M2 },
  { key: 'Tp01', name: 'CPU P-Core 1', platform: Platform.M2 },
  { key: 'Tp05', name: 'CPU P-Core 2', platform: Platform.M2 },
  { key: 'Tp09', name: 'CPU P-Core 3', platform: Platform.M2 },
  { key: 'Tp0D', name: 'CPU P-Core 4', platform: Platform.M2 },
  { key: 'Tp0X', name: 'CPU P-Core 5', platform: Platform.M2 },
  { key: 'Tp0b', name: 'CPU P-Core 6', platform: Platform.M2 },
  { key: 'Tp0f', name: 'CPU P-Core 7', platform: Platform.M2 },
  { key: 'Tp0j', name: 'CPU P-Core 8', platform: Platform.M2 },
  { key: 'Tg0f', name: 'GPU 1', platform: Platform.M2 },
  { key: 'Tg0j', name: 'GPU 2', platform: Platform.M2 },
  { key: 'Te05', name: 'CPU E-Core 1', platform: Platform.M3 },
  { key: 'Te0L', name: 'CPU E-Core 2', platform: Platform.M3 },
  { key: 'Te0P', name: 'CPU E-Core 3', platform: Platform.M3 },
  { key: 'Te0S', name: 'CPU E-Core 4', platform: Platform.M3 },
  { key: 'Tf04', name: 'CPU P-Core 1', platform: Platform.M3 },
  { key: 'Tf09', name: 'CPU P-Core 2', platform: Platform.M3 },
  { key: 'Tf0A', name: 'CPU P-Core 3', platform: Platform.M3 },
  { key: 'Tf0B', name: 'CPU P-Core 4', platform: Platform.M3 },
  { key: 'Tf0D', name: 'CPU P-Core 5', platform: Platform.M3 },
  { key: 'Tf0E', name: 'CPU P-Core 6', platform: Platform.M3 },
  { key: 'Tf44', name: 'CPU P-Core 7', platform: Platform.M3 },
  { key: 'Tf49', name: 'CPU P-Core 8', platform: Platform.M3 },
  { key: 'Tf4A', name: 'CPU P-Core 9', platform: Platform.M3 },
  { key: 'Tf4B', name: 'CPU P-Core 10', platform: Platform.M3 },
  { key: 'Tf4D', name: 'CPU P-Core 11', platform: Platform.M3 },
  { key: 'Tf4E', name: 'CPU P-Core 12', platform: Platform.M3 },
  { key: 'Tf14', name: 'GPU 1', platform: Platform.M3 },
  { key: 'Tf18', name: 'GPU 2', platform: Platform.M3 },
  { key: 'Tf19', name: 'GPU 3', platform: Platform.M3 },
  { key: 'Tf1A', name: 'GPU 4', platform: Platform.M3 },
  { key: 'Tf24', name: 'GPU 5', platform: Platform.M3 },
  { key: 'Tf28', name: 'GPU 6', platform: Platform.M3 },
  { key: 'Tf29', name: 'GPU 7', platform: Platform.M3 },
  { key: 'Tf2A', name: 'GPU 8', platform: Platform.M3 },
  { key: 'TaLP', name: 'Airflow left', platform: Platform.ALL },
  { key: 'TaRF', name: 'Airflow right', platform: Platform.ALL },
  { key: 'TH0x', name: 'NAND', platform: Platform.ALL },
  { key: 'TB1T', name: 'Battery 1', platform: Platform.ALL },
  { key: 'TB2T', name: 'Battery 2', platform: Platform.ALL },
  { key: 'TW0P', name: 'Airport', platform: Platform.ALL },
  { key: 'VCAC', name: 'CPU IA', platform: Platform.ALL },
  { key: 'VCSC', name: 'CPU System Agent', platform: Platform.ALL },
  { key: 'VC%C', name: 'CPU Core %', platform: Platform.ALL },
  { key: 'VCTC', name: 'GPU Intel Graphics', platform: Platform.ALL },
  { key: 'VG0C', name: 'GPU', platform: Platform.ALL },
  { key: 'VM0R', name: 'Memory', platform: Platform.ALL },
  { key: 'Vb0R', name: 'CMOS', platform: Platform.ALL },
  { key: 'VD0R', name: 'DC In', platform: Platform.ALL },
  { key: 'VP0R', name: '12V Rail', platform: Platform.ALL },
  { key: 'Vp0C', name: '12V VCC', platform: Platform.ALL },
  { key: 'VV2S', name: '3V', platform: Platform.ALL },
  { key: 'VR3R', name: '3.3V', platform: Platform.ALL },
  { key: 'VV1S', name: '5V', platform: Platform.ALL },
  { key: 'VV9S', name: '12V', platform: Platform.ALL },
  { key: 'VeES', name: 'PCI 12V', platform: Platform.ALL },
  { key: 'IC0R', name: 'CPU High side', platform: Platform.ALL },
  { key: 'IG0R', name: 'GPU High side', platform: Platform.ALL },
  { key: 'ID0R', name: 'DC In', platform: Platform.ALL },
  { key: 'IBAC', name: 'Battery', platform: Platform.ALL },
  { key: 'PC0C', name: 'CPU Core', platform: Platform.ALL },
  { key: 'PCAM', name: 'CPU Core (IMON)', platform: Platform.ALL },
  { key: 'PCPC', name: 'CPU Package', platform: Platform.ALL },
  { key: 'PCTR', name: 'CPU Total', platform: Platform.ALL },
  { key: 'PCPT', name: 'CPU Package total', platform: Platform.ALL },
  { key: 'PCPR', name: 'CPU Package total (SMC)', platform: Platform.ALL },
  { key: 'PC0R', name: 'CPU Computing high side', platform: Platform.ALL },
  { key: 'PC0G', name: 'CPU GFX', platform: Platform.ALL },
  { key: 'PCEC', name: 'CPU VccEDRAM', platform: Platform.ALL },
  { key: 'PCPG', name: 'GPU Intel Graphics', platform: Platform.ALL },
  { key: 'PG0R', name: 'GPU', platform: Platform.ALL },
  { key: 'PCGC', name: 'Intel GPU', platform: Platform.ALL },
  { key: 'PCGM', name: 'Intel GPU (IMON)', platform: Platform.ALL },
  { key: 'PC3C', name: 'RAM', platform: Platform.ALL },
  { key: 'PPBR', name: 'Battery', platform: Platform.ALL },
  { key: 'PDTR', name: 'DC In', platform: Platform.ALL },
  { key: 'PSTR', name: 'System Total', platform: Platform.ALL },
  { key: 'PDBR', name: 'PDB', platform: Platform.M1 }
]

export const useHardwareStore = defineStore('hardwareStore', {
  state: () => ({
    useSystemReader: null as boolean | null,
    intervalId: null as number | null,
    platform: Platform.ALL,
    cpu: {
      efficiencyCoreCount: 0 as number,
      performanceCoreCount: 0 as number,
      totalCoreCount: 0 as number,
      utilizationUser: 0 as number,
      utilizationSystem: 0 as number,
      utilizationIdle: 0 as number,
      coresUtilization: [] as number[],
      model: ''
    },
    gpu: {
      coreCount: 0 as number,
      model: '',
      utilizationRenderer: 0 as number,
      utilizationTiler: 0 as number,
      utilizationDevice: 0 as number
    },
    cpuUtilizationHistory: {
      user: [] as number[],
      system: [] as number[]
    },
    gpuUtilizationHistory: {
      renderer: [] as number[],
      tiler: [] as number[],
      device: [] as number[]
    },
    ram: {
      memoryUsed: 0 as number,
      memoryTotal: 0 as number,
      appMemory: 0 as number,
      wiredMemory: 0 as number,
      compressedMemory: 0 as number,
      swapUsed: 0 as number,
      swapTotal: 0 as number,
      cachedMemory: 0 as number
    },
    net: {
      bandwidthUp: null as number | null,
      bandwidthDown: null as number | null
    },
    disks: [] as { storeUsed: number; storeFree: number; storeTotal: number; name: string }[],
    fans: [] as FanData[],
    sensors: [] as { key: string; name: string; value: any }[],
    sensor: {
      averageTemperature: {
        cpu: 0 as number,
        gpu: 0 as number,
        memory: 0 as number
      },
      temperatureSensors: [] as { key: string; name: string; value: any }[],
      voltageSensors: [] as { key: string; name: string; value: any }[],
      currentSensors: [] as { key: string; name: string; value: any }[],
      powerSensors: [] as { key: string; name: string; value: any }[]
    }
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
      }, 1500)
    },
    stopReadSysData() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    updateHardwareData(data: Record<string, any>) {
      if (this.sensors.length === 0) {
        this.cpu.model = data.CPU.model
        this.gpu.model = data.GPU.model

        if (this.cpu.model.includes('M1')) {
          this.platform = Platform.M1
        } else if (this.cpu.model.includes('M2')) {
          this.platform = Platform.M2
        } else if (this.cpu.model.includes('M3')) {
          this.platform = Platform.M3
        }

        All_Sensors.forEach((sensor) => {
          if (sensor.platform === Platform.ALL || sensor.platform === this.platform) {
            if (data.Sensors[sensor.key]) {
              this.sensors.push({
                key: sensor.key,
                name: sensor.name,
                value: data.Sensors[sensor.key]
              })
            }
          }
        })
      } else {
        this.sensors.forEach((sensor) => {
          if (data.Sensors[sensor.key] !== undefined) {
            sensor.value = data.Sensors[sensor.key]
          }
        })
      }

      const cpuSensor = this.sensors.filter((sensor) => sensor.key.startsWith('Tp'))
      const gpuSensor = this.sensors.filter((sensor) => sensor.key.startsWith('Tg'))
      const memorySensor = this.sensors.filter((sensor) => sensor.key.startsWith('Tm'))
      this.sensor.averageTemperature.cpu =
        cpuSensor.reduce((sum, sensor) => sum + sensor.value, 0) / cpuSensor.length
      this.sensor.averageTemperature.gpu =
        gpuSensor.reduce((sum, sensor) => sum + sensor.value, 0) / gpuSensor.length
      this.sensor.averageTemperature.memory =
        memorySensor.reduce((sum, sensor) => sum + sensor.value, 0) / memorySensor.length

      this.sensor.temperatureSensors = this.sensors.filter((sensor) => sensor.key.startsWith('T'))
      this.sensor.voltageSensors = this.sensors.filter((sensor) => sensor.key.startsWith('V'))
      this.sensor.currentSensors = this.sensors.filter((sensor) => sensor.key.startsWith('I'))
      this.sensor.powerSensors = this.sensors.filter((sensor) => sensor.key.startsWith('P'))

      if (data.CPU.utilizations[0] != 0) {
        this.cpu.efficiencyCoreCount = data.CPU.cores[0]
        this.cpu.performanceCoreCount = data.CPU.cores[1]
        this.cpu.totalCoreCount = data.CPU.cores[0] + data.CPU.cores[1]
        this.cpu.coresUtilization = data.CPU.coresUtilization
        this.cpu.utilizationUser = data.CPU.utilizations[0]
        this.cpu.utilizationSystem = data.CPU.utilizations[1]
        this.cpu.utilizationIdle = data.CPU.utilizations[2]
      }

      if (data.GPU.utilization.device != 0) {
        this.gpu.coreCount = data.GPU.coreCount
        this.gpu.utilizationDevice = data.GPU.utilization.device
        this.gpu.utilizationRenderer = data.GPU.utilization.renderer
        this.gpu.utilizationTiler = data.GPU.utilization.tiler
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
      if (fanCount) {
        var tempFan = [] as FanData[]
        for (let i = 0; i < fanCount; i++) {
          const fanData: FanData = {
            actual: data.Sensors[`F${i}Ac`],
            min: data.Sensors[`F${i}Mn`],
            max: data.Sensors[`F${i}Mx`]
          }
          tempFan.push(fanData)
        }
        this.fans = tempFan
      }
      this.updateUtilizationHistory()
    },
    updateUtilizationHistory() {
      this.cpuUtilizationHistory.user.push(this.cpu.utilizationUser)
      this.cpuUtilizationHistory.system.push(this.cpu.utilizationSystem)
      this.gpuUtilizationHistory.renderer.push(this.gpu.utilizationRenderer)
      this.gpuUtilizationHistory.tiler.push(this.gpu.utilizationTiler)
      this.gpuUtilizationHistory.device.push(this.gpu.utilizationDevice)

      const maxLength = 100
      if (this.cpuUtilizationHistory.user.length > maxLength) {
        this.cpuUtilizationHistory.user.shift()
        this.cpuUtilizationHistory.system.shift()
      }
      if (this.gpuUtilizationHistory.renderer.length > maxLength) {
        this.gpuUtilizationHistory.renderer.shift()
        this.gpuUtilizationHistory.tiler.shift()
        this.gpuUtilizationHistory.device.shift()
      }
    }
  }
})
