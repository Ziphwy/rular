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

export function getImage() {}
