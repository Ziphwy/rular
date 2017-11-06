/** eslint global-require:0 */
const path = require('path');
const electron = require('electron');
const menu = require('./menu.js');
const processWindow = require('./process-window');

let mainWindow;

function getMainWindow() {
  if (mainWindow) {
    return mainWindow;
  }
  const { BrowserWindow, screen } = electron;
  mainWindow = new BrowserWindow({
    title: 'Rular',
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    show: false,
    titleBarStyle: 'hidden',
  });

  menu.init(mainWindow);

  if (process.env.NODE_ENV === 'development') {
    // install vue dev-tool chrome-plugin
    BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../../vue-devtools/3.1.6_0/'));
    // open chrome devtools
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    processWindow().destroy(); // 关闭后台窗口
  });

  return mainWindow;
}


module.exports = getMainWindow;
