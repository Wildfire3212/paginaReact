const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const path = require('path');
const isDev = require('electron-is-dev');

let appWindow;

function crearVentana() {

    appWindow = new BrowserWindow ({
        width: 1200,
        height: 600,
        center: true,
        resizable: true,
        minWidth: 600,
        minHeight: 400,
        show: false,
        icon: 'icon.png',
        webPreferences: {
            nodeIntegration: true,
          }
    })

        
    appWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    appWindow.once('ready-to-show',()=>{
        appWindow.show();
    })

    app.on('window-all-closed', ()=>{
        if(process.platform !== 'win32'){
            app.quit();
        }
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        crearVentana();
        }
    });    
}

app.on('ready',crearVentana);

