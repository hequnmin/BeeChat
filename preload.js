// import { contextBridge, ipcRenderer } from 'electron';

// contextBridge.exposeInMainWorld('dialog', {
//   openDialog: () => {
//     const { dialog } = require('electron');
//     return dialog.showOpenDialogSync({ properties: ['openFile'] });
//   }
// });
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)