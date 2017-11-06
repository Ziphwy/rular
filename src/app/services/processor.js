import { ipcRenderer, desktopCapturer, clipboard, screen } from 'electron';
import store from './store';

const resolveFunc = {};

ipcRenderer.on('main', (sender, resp) => {
  const { code, pid, path, method, args, result } = resp;
  if (resolveFunc[pid]) {
    if (code === '0000') {
      resolveFunc[pid]({ path, method, args, result });
    }
    delete resolveFunc[pid];
  }
});

ipcRenderer.on('open-file', (sender, { path: pathList }) => {
  store.dispatch('getFileByPath', pathList);
});

ipcRenderer.on('capture', () => {
  const point = screen.getCursorScreenPoint();
  const display = screen.getDisplayNearestPoint(point);
  desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      width: display.size.width * 2,
      height: display.size.height * 2,
    },
  }, (err, sources) => {
    if (err) {
      throw Error();
    }
    sources.forEach((source) => {
      if (new RegExp(display.id).test(source.id)) {
        clipboard.writeImage(source.thumbnail);
      }
    });
  });
});

export function process(path, method, args) {
  return new Promise((resolve, reject) => {
    const pid = Math.random().toString();
    try {
      resolveFunc[pid] = resolve;
      ipcRenderer.send('main', {
        pid,
        path,
        method,
        args,
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function notice() {

}

