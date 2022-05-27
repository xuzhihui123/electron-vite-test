// electron-main/index.ts

import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron'
import path from 'path'

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: true, // 启用才能使用contextBridge应用编程接口
      nodeIntegration: true,
      preload: path.join(__dirname, '../electron-preload/index.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])
  Menu.setApplicationMenu(menu)
  win.webContents.openDevTools()

  ipcMain.on('counter-value', (_event, value) => {
    console.log('主进程接受', value) // will print value to Node console
  })

  // 设置标题
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win!.setTitle(title)
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = 'http://localhost:3000'
    win.loadURL(url)
  }
}

app.whenReady().then(() => {
  async function handleFileOpen () {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
    if (canceled) {
      return null
    } else {
      return filePaths[0]
    }
  }

  ipcMain.handle('dialog:openFile', handleFileOpen)

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
