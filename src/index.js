/* eslint-env node */
const { app, ipcMain } = require('electron');
const getMainWindow = require('./main-process/main-window.js');
const getProcessWindow = require('./main-process/process-window.js');
const nodePath = require('path');

function init() {
  let mainUrl = `file://${nodePath.resolve(__dirname, './page/app.html')}`;
  let processUrl = `file://${nodePath.resolve(__dirname, './page/process.html')}`;
  if (process.env.NODE_ENV === 'development') {
    mainUrl = 'http://localhost:8000/page/app.html';
    processUrl = 'http://localhost:8000/page/process.html';
  }

  const mainWindow = getMainWindow();
  mainWindow.loadURL(mainUrl);

  const processWindow = getProcessWindow();
  processWindow.loadURL(processUrl);

  ipcMain.on('main', (event, payload) => {
    const { pid, path, method, args } = payload;
    processWindow.webContents.send('processor', {
      pid, path, method, args,
    });
  });

  ipcMain.on('processor', (event, payload) => {
    const { code, pid, path, method, args, result } = payload;
    mainWindow.webContents.send('main', {
      code, pid, path, method, args, result,
    });
  });
}


app.on('ready', () => {
  init();
});

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    ipcMain.removeAllListeners('main');
    ipcMain.removeAllListeners('processor');

    init();
  }
});
