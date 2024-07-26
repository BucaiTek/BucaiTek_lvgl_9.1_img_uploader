import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'node:url'

let mainWindow = null as BrowserWindow | null

let willQuitApp = false // 添加一个标志，用于检测是否真的应该退出应用程序
function processSensorData(sensorData, sensorList) {
  const lines = sensorData.split('\n')
  const sensorValues = {}
  let fanNumber = 0 // 初始风扇数量为0

  // 第一阶段：预先扫描以确定风扇数量
  lines.forEach((line) => {
    const parts = line.split(/\s+/)
    if (parts.length === 2) {
      const key = parts[0].replace(/[^\w]/g, '')
      if (key === 'FNum') {
        fanNumber = parseInt(parts[1]) // 解析出风扇数量
      }
    }
  })
  if (fanNumber != 0) {
    sensorList.push('FNum')
    // 添加风扇相关的传感器标识到sensorList
    for (let i = 0; i < fanNumber; i++) {
      sensorList.push(`F${i}St`, `F${i}Fb`, `F${i}Fc`, `F${i}Mn`, `F${i}Mx`)
    }
  }

  // 第二阶段：处理整个数据
  lines.forEach((line) => {
    const parts = line.split(/\s+/)
    if (parts.length === 2) {
      const key = parts[0].replace(/[^\w]/g, '')
      if (sensorList.includes(key)) {
        const value = parseFloat(parts[1])
        sensorValues[key] = value // 添加到结果中
      }
    }
  })
  return sensorValues
}

let cpuModel = ''
let sensorInfo = ''
let allSensors = null as null | string[]
const __dirname = path.dirname(fileURLToPath(import.meta.url))
ipcMain.handle('request-chip-model', (event, value) => {
  return cpuModel
})

ipcMain.handle('request-sensor-data', (event, value) => {
  return processSensorData(sensorInfo, allSensors)
})

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Main window',
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, '../dist-electron/preload.mjs')
    }
  })

  mainWindow.loadFile('dist/index.html', { hash: 'home' })

  const child = spawn('sysctl', ['-a'])
  child.stdout.on('data', (data) => {
    cpuModel += data.toString()
  })

  child.on('close', () => {
    const match = cpuModel.match(/machdep.cpu.brand_string:\s(.+)/)
    if (match) {
      cpuModel = match[1]
      console.log('CPU 型号:', cpuModel)
      fetchSensorData(cpuModel)
    }
  })

  function fetchSensorData(cpuModel) {
    let efficiencyCores = [] as string[]
    let performanceCores = [] as string[]
    let gpuCores = [] as string[]

    if (cpuModel.includes('M1')) {
      efficiencyCores = ['Tp09', 'Tp0T']
      performanceCores = ['Tp01', 'Tp05', 'Tp0D', 'Tp0H', 'Tp0L', 'Tp0P', 'Tp0X', 'Tp0b']
      gpuCores = ['Tg05', 'Tg0D', 'Tg0L', 'Tg0T']
    } else if (cpuModel.includes('M2')) {
      efficiencyCores = ['Tp1h', 'Tp1t', 'Tp1p', 'Tp1l']
      performanceCores = ['Tp01', 'Tp05', 'Tp09', 'Tp0D', 'Tp0X', 'Tp0b', 'Tp0f', 'Tp0j']
      gpuCores = ['Tg0f', 'Tg0j']
    } else if (cpuModel.includes('M3')) {
      efficiencyCores = ['Te05', 'Te0L', 'Te0P', 'Te0S']
      performanceCores = [
        'Tf04',
        'Tf09',
        'Tf0A',
        'Tf0B',
        'Tf0D',
        'Tf0E',
        'Tf44',
        'Tf49',
        'Tf4A',
        'Tf4B',
        'Tf4D',
        'Tf4E'
      ]
      gpuCores = ['Tf14', 'Tf18', 'Tf19', 'Tf1A', 'Tf24', 'Tf28', 'Tf29', 'Tf2A']
    }

    allSensors = efficiencyCores.concat(performanceCores, gpuCores)

    //生产环境
    //const sysReaderPath = path.join(process.resourcesPath, 'tools/sys_reader')
    //const child = spawn(sysReaderPath)

    //开发环境
    const child = spawn('tools/sys_reader')

    child.stdout.on('data', (data) => {
      sensorInfo += data.toString()
    })

    child.on('close', () => {})
  }

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
      willQuitApp = true // 设置标志为 true 并退出
      app.quit()
    }
  }
])

app.on('before-quit', () => {
  willQuitApp = true // 在应用程序即将退出前设置标志为 true
})

let tray = null as Tray | null
app.on('ready', () => {
  tray = new Tray('tools/logo32*32@1x.png')

  tray.on('click', () => {
    mainWindow?.show()
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
