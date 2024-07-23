import { app, BrowserWindow } from 'electron'
import { spawn } from 'child_process'
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600
  })

  mainWindow.webContents.session.on('select-hid-device', (event, details, callback) => {
    //Add events to handle devices being added or removed before the callback on
    //`select-hid-device` is called.
    mainWindow.webContents.session.on('hid-device-added', (event, device) => {
      console.log('hid-device-added FIRED WITH', device)
      //Optionally update details.deviceList
    })

    mainWindow.webContents.session.on('hid-device-removed', (event, device) => {
      console.log('hid-device-removed FIRED WITH', device)
      //Optionally update details.deviceList
    })

    event.preventDefault()
    if (details.deviceList && details.deviceList.length > 0) {
      callback(details.deviceList[0].deviceId)
    }
  })

  mainWindow.webContents.session.setPermissionCheckHandler(
    (webContents, permission, requestingOrigin, details) => {
      if (permission === 'hid' && details.securityOrigin === 'file:///') {
        return true
      }
    }
  )

  mainWindow.webContents.session.setDevicePermissionHandler((details) => {
    if (details.deviceType === 'hid' && details.origin === 'file://') {
      return true
    }
  })

  mainWindow.loadFile('dist/index.html')
  // 启动子进程来执行 Bash 命令获取 sensor 型号
  const child = spawn('./smc', ['list'])
  let sensorInfo = ''

  child.stdout.on('data', (data) => {
    sensorInfo += data.toString()
  })

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    console.log(sensorInfo)
    // 可以选择发送信息到渲染进程，或做其他处理
    mainWindow.webContents.send('sensor-model', sensorInfo)
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
