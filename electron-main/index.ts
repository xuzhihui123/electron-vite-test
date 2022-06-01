/* eslint-disable dot-notation */
// electron-main/index.ts

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // 渲染进程中调用Node.js
      contextIsolation: false, // 改为false才能引入pixi.js 至于为什么暂时改为false
      preload: path.join(__dirname, '../electron-preload/index.js')
    }
  })

  // 窗口最大化
  win.maximize()

  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: app.name,
  //     submenu: [
  //       {
  //         click: () => win.webContents.send('update-counter', 1),
  //         label: 'Increment'
  //       },
  //       {
  //         click: () => win.webContents.send('update-counter', -1),
  //         label: 'Decrement'
  //       }
  //     ]
  //   }

  // ])
  // Menu.setApplicationMenu(menu)
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
    // eslint-disable-next-line no-undef
    console.log(customConfig.env)
    console.log('process.env', process.env)
    console.log(import.meta.env)
    // console.log(222, process.env['TEST_VARIABLE']) 生产环境拿不到
    win.loadFile(path.join(__dirname, '../index.html'))
  } else {
    // eslint-disable-next-line no-undef
    console.log(customConfig.env)
    console.log(import.meta.env)
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    // 这边开发环境变量需要通过中扩号来获取,不通过中括号取不到，外设环境变量需要通过cross-env
    // console.log(process.env['TEST_VARIABLE'])
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
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
