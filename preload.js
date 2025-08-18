const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // API
  callAPI: (params) => ipcRenderer.invoke('call-api', params),
  fetchModels: (params) => ipcRenderer.invoke('fetch-available-models', params),

  // Window controls
  minimize: () => ipcRenderer.send('minimize-app'),
  maximize: () => ipcRenderer.send('maximize-app'),
  close: () => ipcRenderer.send('close-app'),
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
});


