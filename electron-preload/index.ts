import os from 'os'
console.log(os)
// import { contextBridge, ipcRenderer } from 'electron'

// console.log('renderer', customConfig.env)

// 需要将主进程的contextIsolation设置为true才行 这边因为pixi.js所以设置为false
// contextBridge.exposeInMainWorld('electronAPI', {
//   platform: os.platform(),
//   setTitle: (title:string | number) => ipcRenderer.send('set-title', title),
//   openFile: () => ipcRenderer.invoke('dialog:openFile'),
//   handleCounter: (callback:(...args:any[])=>any) => ipcRenderer.on('update-counter', callback)
// })
export {}
