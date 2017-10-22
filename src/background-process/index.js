import { ipcRenderer } from 'electron';
import { getImage, imageToCanvas } from '../commons/image';
import PixStore from './pix-store';

const pixStore = new PixStore();

const processor = {
  loadImage(path) {
    getImage(path).then((imgElement) => {
      const { naturalWidth, naturalHeight } = imgElement;
      const imageData = imageToCanvas(imgElement).context.getImageData(0, 0, naturalWidth, naturalHeight);
      pixStore.addPixesData(path, imageData);
    });
  },
  getColor(path, { x, y }) {
    return pixStore.getPixesData(path).getPix('x', x, y);
  },
  getSimilarRange(path, { direct, main, cross, range, tolerence }) {
    return pixStore.getPixesData(path).getSimilarRange(direct, main, cross, range, tolerence);
  },
  getSimilarRect(path, { x, y, width, height, tolerence }) {
    return pixStore.getPixesData(path).getSimilarRect(x, y, width, height, tolerence);
  },
};

ipcRenderer.on('processor', (event, payload) => {
  const { pid, path, method, args } = payload;
  // console.log(path, method, args);
  if (!processor[method]) {
    event.sender.send({
      code: '9999',
      resp: 'fail',
    });
  }
  const result = processor[method](path, args);
  event.sender.send('processor', {
    pid,
    code: '0000',
    resp: 'success',
    path,
    method,
    args,
    result,
  });
});

