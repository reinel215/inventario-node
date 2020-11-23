import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';







// if (handleSquirrelEvent(app)) {
//     // squirrel event handled and app will exit in 1000ms, so don't do anything elsereturn;


// }


// function handleSquirrelEvent(application) {
//     if (process.argv.length === 1) { return false; }

//     const ChildProcess = require('child_process');
//     const path = require('path');
//     const appFolder = path.resolve(process.execPath, '..');
//     const rootAtomFolder = path.resolve(appFolder, '..');

//     const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
//     const exeName = path.basename(process.execPath);


//     const spawn = function (command, args) {
//         let spawnedProcess, error;
//     }

// }



let win: BrowserWindow



function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600, show: false });


    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/inventario/index.html`),
            protocol: 'file:',
            slashes: true,
        })
    );

    // win.webContents.openDevTools();

    win.on('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        win = null;
    });
}


app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})