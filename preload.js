const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    closeApp: () => ipcRenderer.send('close-app'),
    getRates: () => ipcRenderer.invoke('get-rates')
});
