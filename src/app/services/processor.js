import { ipcRenderer } from 'electron';

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

