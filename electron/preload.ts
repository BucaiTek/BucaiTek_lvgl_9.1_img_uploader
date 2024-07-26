import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  check_electron: async () => {
    const result = await ipcRenderer.invoke('check-electron')
    return result
  },
  getChipModel: async (data: string) => {
    const result = await ipcRenderer.invoke('request-chip-model', data)
    return result
  },
  getSensorData: async (data: string) => {
    const result = await ipcRenderer.invoke('request-sensor-data', data)
    return result
  }
})
