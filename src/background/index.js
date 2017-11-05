import { ipcRenderer } from 'electron';
import { getImageByPath, imageToCanvas } from '../commons/image';
import PixStore from './pix-store';

const pixStore = new PixStore();

const processor = {
  loadImage(path) {
    const start = Date.now();
    getImageByPath(path).then((imgElement) => {
      const { naturalWidth, naturalHeight } = imgElement;
      const imageData = imageToCanvas(imgElement).context.getImageData(0, 0, naturalWidth, naturalHeight);
      pixStore.addPixesData(path, imageData);
      console.log(`${path} :${Date.now() - start}`);
    });
  },
  getColor(path, { x, y }) {
    return pixStore.getPixesData(path).getPix('x', x, y);
  },
  getSimilarRange(path, { direct, main, cross, range, tolerance }) {
    return pixStore.getPixesData(path).getSimilarRange(direct, main, cross, range, tolerance);
  },
  getSimilarRect(path, { x, y, width, height, tolerance }) {
    return pixStore.getPixesData(path).getSimilarRect(x, y, width, height, tolerance);
  },
};

ipcRenderer.on('processor', (event, payload) => {
  const { pid, path, method, args } = payload;
  // console.log(path, method, args);
  let result;
  try {
    result = processor[method](path, args);
    event.sender.send('processor', {
      pid,
      code: '0000',
      resp: 'success',
      path,
      method,
      args,
      result,
    });
  } catch (e) {
    event.sender.send({
      code: '9999',
      resp: 'fail',
    });
  }
});

