/** eslint global-require:0 */
const electron = require('electron');

let processWindow;

function getProcessWindow() {
  if (processWindow) {
    return processWindow;
  }
  const { BrowserWindow } = electron;
  processWindow = new BrowserWindow({
    title: 'rular-processor',
    show: false,
  });

  processWindow.once('ready-to-show', () => {
    if (process.env.NODE_ENV === 'development') {
      processWindow.show();
    }
  });

  processWindow.on('closed', () => {
    processWindow = null;
  });

  return processWindow;
}


module.exports = getProcessWindow;
