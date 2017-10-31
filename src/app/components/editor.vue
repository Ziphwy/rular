<template>
  <div class="editor" @dragover.prevent @drop.prevent="openFile">
    <div class="flex flex-column flex-center background" v-show="fileList.length < 1">
      <div class="app-name">Rular</div>
      <div class="app-author">Author By Ziphwy</div>
    </div>
    <keep-alive>
      <image-view v-for="file in fileList" :key="file.path" :image="file" v-if="currentFile.path === file.path"></image-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import imageView from './image-view.vue';

export default {
  name: 'editor',
  computed: {
    ...mapState(['currentFile', 'fileList']),
  },
  components: {
    imageView,
  },
  methods: {
    openFile($event) {
      const { files } = $event.dataTransfer;
      Object.keys(files).forEach((i) => {
        const { name, path } = files[i];
        if (!/\.(?:png|jpe?g|bmp$)/.test(name)) {
          return alert(`${path} is not an image.`);
        }
        return this.$store.dispatch('addFile', files[i]);
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
  text-align: center;
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
  background: rgba(0, 0, 0, 0.3);
}

/*滑块*/

.editor::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.3);
}
.editor::-webkit-scrollbar-button {
  display: none;
}
.editor::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0.3);
}
.editor::-webkit-resizer {
  display: none;
}
.views {
  /* position: absolute;
  top: 0;
  left: 0; */
  padding: 20px;
}
</style>
