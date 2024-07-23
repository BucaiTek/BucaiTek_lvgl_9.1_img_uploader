import { defineStore } from 'pinia'

export const useHardwareStore = defineStore('hardwareStore', {
  state: () => ({
    intervalId: null as number | null,
    chipModel: null as null | string,
    cpuTemp: null as null | string[],
    gpuTemp: null as null | string[]
  }),
  actions: {
    async init() {
      this.chipModel = await window.electronAPI?.getChipModel('')
      console.log('CPU 型号:', this.chipModel)
    }
  }
})
