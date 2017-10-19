/** eslint global-require:0 */
const path = require('path');
const electron = require('electron');

let processWindow;

function getProcessWindow() {
  if (processWindow) {
    return processWindow;
  }
  const { BrowserWindow } = electron;
  processWindow = new BrowserWindow({
    title: 'rular-process',
    show: false,
  });

  processWindow.once('ready-to-show', () => {
    processWindow.show();
  });

  processWindow.on('closed', () => {
    processWindow = null;
  });

  return processWindow;
}


module.exports = getProcessWindow;
