const{contextBridge}=require('electron');contextBridge.exposeInMainWorld('recoverAI',{platform:'desktop',version:process.versions.electron});
