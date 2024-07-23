import { contextBridge, ipcRenderer } from "electron";

//通过contextBridge 向渲染进程暴露一个全局的window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
  ping: async (data: string) => {
    const result = await ipcRenderer.invoke('ping', data);
    return result;
  }
});