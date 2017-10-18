const { BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow = new BrowserWindow({
  title: 'Rular',
  width: screen.getPrimaryDisplay().workAreaSize.width,
  height: screen.getPrimaryDisplay().workAreaSize.height,
  show: false,
  titleBarStyle: 'hidden',
});

// install vue dev-tool chrome-plugin
BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../../vue-devtools/3.1.6_0/'));
// open chrome devtools
mainWindow.webContents.openDevTools();

mainWindow.once('ready-to-show', () => {
  mainWindow.show();
});

mainWindow.on('closed', () => {
  mainWindow = null;
});

module.exports = mainWindow;
