"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
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
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600, show: false });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/inventario/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    // win.webContents.openDevTools();
    win.on('ready-to-show', function () {
        win.show();
    });
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map