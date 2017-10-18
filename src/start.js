const { app } = require('electron');

app.on('ready', () => {
  // 载入主窗口
  const mainWindow = require('./main-process/main-window.js');
  mainWindow.loadURL('http://localhost:8000/app.html');
});

