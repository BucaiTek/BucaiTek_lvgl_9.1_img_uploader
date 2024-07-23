import { app, BrowserWindow } from 'electron'


function createWindow () {
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
  
  mainWindow.loadFile('dist/index.html')
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
