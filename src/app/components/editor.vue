<template>
  <div class="editor" @dragover.prevent @drop.prevent="openFile">
    <div class="flex flex-column flex-center background">
      <div class="app-name">Rular</div>
      <div class="app-author">Author By Zfhuang</div>
    </div>
    <div class="flex flex-center views">
      <image-view v-for="img in images" :key="img.path" :image="img" v-show="current === img.path"></image-view>
    </div>
  </div>
</template>

<script>
import imageView from './image-view.vue';
import { loadImage } from '../../commons/image';

export default {
  name: 'editor',
  data() {
    return {
      images: [],
      current: '',
    };
  },
  components: {
    imageView,
  },
  methods: {
    openFile($event) {
      const { files } = $event.dataTransfer;
      Object.keys(files).forEach((i) => {
        const { name, path, size } = files[i];
        if (!/\.(?:png|jpe?g|bmp$)/.test(name)) { return alert(`${path} is not an image.`); }

        return loadImage(files[i]).then((imageElement) => {
          this.images.push({
            name,
            path,
            size,
            imageElement,
            width: imageElement.naturalWidth,
            height: imageElement.naturalHeight,
          });
          this.current = path;
        });
      });
    },
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  position: relative;
}
.app-name {
  font-family: fantasy;
  -webkit-text-fill-color: rgba(0, 0, 0, 0.3);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
  font-size: 100px;
}
.app-author {
  font-family: fantasy;
  -webkit-text-fill-color: rgba(0, 0, 0, 0.3);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
  font-size: 40px;
}
.editor {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5) inset;
  position: relative;
}
.editor::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/*滑槽*/

.editor::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, .3);
}

/*滑块*/

.editor::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, .3)
}
.editor::-webkit-scrollbar-button {
  display: none;
}
.editor::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, .3);
}
.editor::-webkit-resizer {
  display: none;
}
.views {
  position: absolute;
  top: 0;
  left: 0;
    width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
