<template>
  <div class="editor" @dragover.prevent @drop.prevent="openFile">
    <div class="icon button tab-btn" :class="[showTab ? 'close-tab' : 'open-tab' ]" @click="showTab = !showTab"></div>
    <div class="flex flex-column flex-center background" v-show="fileList.length < 1">
      <div class="app-name">Rular</div>
      <div class="app-author">Author By Ziphwy</div>
    </div>
    <keep-alive>
      <image-view v-for="file in fileList" :key="file.path" :image="file" v-if="currentFile.path === file.path"></image-view>
    </keep-alive>
    <image-tab v-show="showTab" @close="showTab = false"></image-tab>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import imageView from './image-view.vue';
import imageTab from './image-tab.vue';

export default {
  name: 'editor',
  data() {
    return {
      showTab: false,
    };
  },
  computed: {
    ...mapState(['currentFile', 'fileList']),
  },
  components: {
    imageView,
    imageTab,
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

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/*滑槽*/

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}

/*滑块*/

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0.3);
}
::-webkit-resizer {
  display: none;
}
</style>

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

.tab-btn {
  position: fixed;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  margin: 6px;
}

.open-tab {
  background-image: url("../assets/tab-btn.png");
}

.close-tab {
  background-image: url("../assets/close.png");
}

.views {
  /* position: absolute;
  top: 0;
  left: 0; */
  padding: 20px;
}
</style>
