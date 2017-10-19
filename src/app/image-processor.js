import { ipcRenderer } from 'electron';

export function process(pid, path, method, args) {
  return new Promise((resolve, reject) => {
    try {
      ipcRenderer.send('main', {
        path,
        pid,
        method,
        args,
      });
      ipcRenderer.on('main', (sender, resp = {}) => {
        if (resp.pid === pid) {
          resolve(resp);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function notice() {

}

