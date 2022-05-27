import os from 'os'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  platform: os.platform(),
  setTitle: (title:string | number) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  handleCounter: (callback:(...args:any[])=>any) => ipcRenderer.on('update-counter', callback)
})
