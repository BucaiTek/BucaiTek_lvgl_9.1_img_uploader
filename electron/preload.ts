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
  music: async (key: string) => {
    switch (key) {
      case 'lyric':
        return await ipcRenderer.invoke('music-lyric')
      case 'play':
        return await ipcRenderer.invoke('music-play')
      case 'pause':
        return await ipcRenderer.invoke('music-pause')
      case 'next':
        return await ipcRenderer.invoke('music-next')
      case 'previous':
        return await ipcRenderer.invoke('music-previous')
    }
  }
})
