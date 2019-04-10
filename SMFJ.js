const electron = require('electron')
const app = electron.app
let mainWindow;
const Menu = electron.Menu
const menuTemplate = [
  {
    label: 'The Hidden Button',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          focusedWindow ? focusedWindow.toggleDevTools() : null
        }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(menuTemplate)

app.on('ready', () => {
  if (!mainWindow) {
    createMainWindow()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function createMainWindow () {
  mainWindow = new electron.BrowserWindow({
    autoHideMenuBar: true
  })
  mainWindow.setMenu(menu)
  mainWindow.loadFile('./src/index.html')
  mainWindow.on('close', () =>{
    mainWindow = null
  })
}
