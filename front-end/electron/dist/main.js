"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
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