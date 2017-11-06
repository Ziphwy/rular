const { dialog, BrowserWindow, Menu } = require('electron');

let mainWindow;

function openFile() {
  const filePath = dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    filters: [
      { name: 'Images', extensions: ['jpg', 'png'] },
    ],
    properties: [
      'openFile',
    ],
  });
  mainWindow.webContents.send('open-file', { path: filePath });
}

// function openDirectory() {

// }

const template = [
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
    label: 'File',
    submenu: [
      {
        label: 'openFile',
        click: openFile,
      },
      // {
      //   label: 'openDirectory',
      //   click: openDirectory,
      // },
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

module.exports = {
  init(window) {
    mainWindow = window;
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  },
};

