import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  check_electron: async () => {
    const result = await ipcRenderer.invoke('check-electron')
    return result
  },
  BCMonitor: async (data: string) => {
    const result = await ipcRenderer.invoke('request-BCMonitor', data)
    return result
  },
})
