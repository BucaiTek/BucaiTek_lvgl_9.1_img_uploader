import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getChipModel: async (data: string) => {
    const result = await ipcRenderer.invoke('request-chip-model', data)
    return result
  },
  fetchSensorData: async (data: string) => {
    const result = await ipcRenderer.invoke('request-sensor-data', data)
    return result
  }
})
