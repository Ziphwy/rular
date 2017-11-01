<template>
  <div class="flex flex-center image-tab">
    <div class="thumbnail" v-for="(file, index) in fileList" :key="index" @click="selectFile(file.path)">
      <canvas class="canvas" v-draw="file.imgElement" :width="file.width" :height="file.height"></canvas>
      <div class="text">{{ file.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'image-tab',
  computed: {
    fileList() {
      return this.$store.state.fileList;
    },
  },
  methods: {
    selectFile(path) {
      this.$store.commit('SELECT_FILE', path);
      this.$emit('close');
    },
  },
  directives: {
    draw(canvas, binding) {
      const imgElement = binding.value;
      const context = canvas.getContext('2d');
      context.drawImage(imgElement, 0, 0, imgElement.naturalWidth, imgElement.naturalHeight);
    },
  },
};
</script>

<style scoped>
.image-tab {
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  overflow: auto;
  flex-wrap: wrap;
  padding: 10px;
}
.thumbnail {
  padding: 10px;
  border-radius: 4px;
}
.thumbnail:hover {
  background-color: rgba(191, 191, 191, 0.5);
}
.thumbnail .canvas {
    width: 247px;
    height: 400px;
}
.thumbnail .text {
  text-align: center;
  font-size: 12px;
  color: #eee;
  padding: 5px;
}
</style>
