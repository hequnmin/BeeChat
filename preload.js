const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'message',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)