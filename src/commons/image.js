const fs = require('fs');

export function loadImage(imgBlob) {
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

export function getImage(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      loadImage(new Blob([data])).then(resolve);
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
