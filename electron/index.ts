import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'node:url'

//const logo_path = path.join(process.resourcesPath, 'files/logo_Template@2x.png')
const logo_path = 'files/logo_Template@2x.png'

//const BCMonitorPath = path.join(process.resourcesPath, 'files/BCMonitor')
const BCMonitorPath = 'files/BCMonitor'

let mainWindow = null as BrowserWindow | null

let willQuitApp = false // 添加一个标志，用于检测是否真的应该退出应用程序

const __dirname = path.dirname(fileURLToPath(import.meta.url))

ipcMain.handle('request-BCMonitor', async (event, value) => {
  return new Promise((resolve, reject) => {
    const BCMonitor = spawn(BCMonitorPath)
    let BCMonitorStdout = ''

    BCMonitor.stdout.on('data', (data) => {
      BCMonitorStdout += data.toString()
    })

    BCMonitor.stderr.on('data', (data) => {})

    BCMonitor.on('error', (err) => {
      reject(err)
    })

    BCMonitor.on('close', (code) => {
      resolve(BCMonitorStdout)
    })
  })
})

ipcMain.handle('music-lyric', async (event, value) => {
  return new Promise((resolve, reject) => {
    const BCMonitor = spawn(BCMonitorPath, ['music'])
    let BCMonitorStdout = ''

    BCMonitor.stdout.on('data', (data) => {
      BCMonitorStdout += data.toString()
    })

    BCMonitor.stderr.on('data', (data) => {})

    BCMonitor.on('error', (err) => {
      reject(err)
    })

    BCMonitor.on('close', (code) => {
      resolve(BCMonitorStdout)
    })
  })
})

ipcMain.handle('music-play', async () => {
  return new Promise(() => {
    spawn(BCMonitorPath, ['music', 'play'])
  })
})

ipcMain.handle('music-pause', async () => {
  return new Promise(() => {
    spawn(BCMonitorPath, ['music', 'pause'])
  })
})

ipcMain.handle('music-next', async () => {
  return new Promise(() => {
    spawn(BCMonitorPath, ['music', 'next'])
  })
})

ipcMain.handle('music-previous', async () => {
  return new Promise(() => {
    spawn(BCMonitorPath, ['music', 'previous'])
  })
})

ipcMain.handle('check-electron', (event, value) => {
  return 'BucaiTek'
})

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Main window',
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    maxWidth: 900,
    maxHeight: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, '../dist-electron/preload.mjs')
    }
  })

  //mainWindow.loadFile('dist/index.html', { hash: 'home' })
  mainWindow.loadURL('http://localhost:5173')
  mainWindow.on('close', (e) => {
    if (!willQuitApp && mainWindow !== null) {
      e.preventDefault() // 阻止窗口的关闭事件
      mainWindow.hide() // 只隐藏窗口
    }
  })
}

const contextMenu = Menu.buildFromTemplate([
  {
    label: '退出',
    type: 'normal',
    click: () => {
      willQuitApp = true
      app.quit()
    }
  }
])

app.on('before-quit', () => {
  willQuitApp = true
})

let tray = null as Tray | null
app.on('ready', () => {
  //app.dock.hide()

  tray = new Tray(logo_path)

  tray.on('click', () => {
    if (mainWindow === null) {
      willQuitApp = true
      app.quit()
    } else {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        mainWindow.show()
      }
    }
  })

  tray.on('right-click', () => {
    if (tray) tray.popUpContextMenu(contextMenu)
  })
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
