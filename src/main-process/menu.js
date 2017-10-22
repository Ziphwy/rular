const { dialog, BrowserWindow } = require('electron');
const mainWindow = require('./main-window.js');

function openFile() {
  const filePath = dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    filters: [
      { name: 'Images', extensions: ['jpg', 'png'] },
    ],
    properties: [
      'openFile',
    ],
  });
  mainWindow.webContents.send('open-file', filePath);
}

function openDirectory() {

}

module.exports = [
  {
    label: 'Rular',
    submenu: [
      {
        label: 'about',
      },
      {
        role: 'toggledevtools',
      },
      {
        role: 'quit',
      },
    ],
  },
  {
    label: '文件',
    submenu: [
      {
        label: '打开文件',
        click: openFile,
      },
      {
        label: '打开文件夹',
        click: openDirectory,
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  },
];
