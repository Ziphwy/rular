import { ipcRenderer } from 'electron';


ipcRenderer.on('processor', (event, payload) => {
  const { pid, path, method, args } = payload;
  console.log(pid, path, method, args);
  event.sender.send('processor', {
    pid, path, method, args,
  });
});
