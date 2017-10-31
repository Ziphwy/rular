const fs = require('fs');

export function blobToImage(imgBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgBlob);
    reader.onload = function onload() {
      const image = new Image();
      image.src = this.result;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (err) => {
        reject(err);
      };
    };
  });
}

export function getImageByPath(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      blobToImage(new Blob([data])).then(resolve);
    });
  });
}


export function imageToCanvas(imgElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = imgElement.naturalHeight;
  canvas.width = imgElement.naturalWidth;
  context.drawImage(imgElement, 0, 0, imgElement.naturalWidth, imgElement.naturalHeight);
  return {
    canvas,
    context,
  };
}


export function transformLength({ num, width, base, dpr, unit, rfs }) {
  let viewSize = num;
  if (base > 0) {
    viewSize = num * (base / width);
  }
  if (unit === 'rem') {
    return `${parseFloat((viewSize / rfs).toFixed(6))}rem`;
  }
  if (unit === 'dp') {
    return `${parseFloat((viewSize / dpr).toFixed(6))}dp`;
  }
  return `${parseFloat(viewSize.toFixed(2))}px`;
}


export function transformColor({ color, mode }) {
  if (mode === 'hex') {
    if (color[3] === 255) {
      return `#${color.slice(0, 3).map(c => c.toString(16)).join('')}`;
    }
    return `#${color.map(c => c.toString(16)).join('')}`;
  }

  if (color[3] === 255) {
    return `rgb(${color.slice(0, 3).join(',')})`;
  }
  color[3] = parseFloat((color[3] / 255).toFixed(6));
  return `rgba(${color.join(',')})`;
}
