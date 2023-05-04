
const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow } = electron;

if (process.env.NODE_ENV === 'development') {
  // Reload the window on file changes when in development mode
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit',
  });
}
function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Blueway ATE 2022',
    width: 1024,
    height: 768,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false     //上下文隔离，此参数影响net的使用
    }
  });
  // mainWindow.menuBarVisible = false;
  // mainWindow.loadFile('./index.html');
  // mainWindow.loadURL('http://localhost:3000/');
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.whenReady().then(createWindow);
