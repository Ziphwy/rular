import { ipcRenderer } from 'electron';

const resolveFunc = {};

ipcRenderer.on('main', (sender, resp) => {
  const { pid, path, method, args, result } = resp;
  if (resolveFunc[pid]) {
    resolveFunc[pid]({ path, method, args, result });
    delete resolveFunc[pid];
  }
});
// window.test = process;
export function process(path, method, args) {
  return new Promise((resolve, reject) => {
    const pid = Math.random().toString();
    try {
      // console.log({
      //   pid,
      //   path,
      //   method,
      //   args,
      // });
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

