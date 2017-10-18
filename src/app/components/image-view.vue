<template>
  <div class="image-view" :style="styles"></div>
</template>

<script>
  export default {
    name: 'image-view',
    props: ['image'],
    computed: {
      styles() {
        return {
          width: `${this.image.width}px`,
          height: `${this.image.height}px`,
        };
      },
    },
    mounted() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const { width, height, imageElement } = this.image;
      canvas.className = 'canvas';
      canvas.height = height;
      canvas.width = width;
      ctx.drawImage(imageElement, 0, 0, width, height);
      this.$el.appendChild(canvas);
    },
  };
</script>

<style scoped>
.image-view {
  margin: auto;
  position: relative;
  box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.5);
}

.canvas {
  cursor: default;
}
</style>