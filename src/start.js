/* eslint-env node */
const { app, ipcMain } = require('electron');
const getMainWindow = require('./main-process/main-window.js');
const getProcessWindow = require('./main-process/process-window.js');

app.on('ready', () => {
  // 载入主窗口
  const mainWindow = getMainWindow();
  mainWindow.loadURL('http://localhost:8000/app.html');

  const processWindow = getProcessWindow();
  processWindow.loadURL('http://localhost:8000/process.html');

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
});

