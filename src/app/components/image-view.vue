<template>
  <div class="flex flex-center view" :style="viewStyles">
    <div class="image-view" :style="styles">
      <div class="canvas"></div>
      <color-marker-panel :image="image" v-show="curTool === 'color-marker'"></color-marker-panel>
      <distance-marker-panel :image="image" v-show="curTool === 'distance-marker'"></distance-marker-panel>
      <rect-marker-panel :image="image" v-show="curTool === 'rect-marker'"></rect-marker-panel>
    </div>
    <div class="scale-button">
      <div class="button" @mousedown="startScale(-1)">-</div>
      <div class="button" @mousedown="startScale(1)">+</div>
    </div>
    <div class="tool-list">
      <div class="button" v-for="(tool, i) in toolList" :key="i" @click="changeTool(tool)">{{ tool.name }}</div>
    </div>
  </div>
</template>

<script>
import colorMarkerPanel from './color-marker/color-marker-panel.vue';
import distanceMarkerPanel from './distance-marker/distance-marker-panel.vue';
import rectMarkerPanel from './rect-marker/rect-marker-panel.vue';

export default {
  name: 'image-view',
  props: ['image'],
  data() {
    return {
      scale: 1,
      curTool: 'rect-marker',
      toolList: [
        {
          name: 'COLR',
          id: 'color-marker',
        },
        {
          name: 'DIST',
          id: 'distance-marker',
        },
        {
          name: 'RECT',
          id: 'rect-marker',
        },
      ],
      pressTimer: null,
    };
  },
  computed: {
    styles() {
      return {
        // width: `${this.image.width}px`,
        // height: `${this.image.height}px`,
        transform: `scale(${this.scale})`,
      };
    },
    viewStyles() {
      return {
        width: `${this.image.width * this.scale + 100}px`,
        height: `${this.image.height * this.scale + 100}px`,
      };
    },
  },
  components: {
    colorMarkerPanel,
    distanceMarkerPanel,
    rectMarkerPanel,
  },
  mounted() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { width, height, imageElement } = this.image;
    canvas.height = height;
    canvas.width = width;
    ctx.drawImage(imageElement, 0, 0, width, height);
    this.$el.getElementsByClassName('canvas')[0].appendChild(canvas);
  },
  methods: {
    scaleView(sign) {
      const nScale = this.scale + 0.05 * sign;
      this.scale = Math.min(50, Math.max(0, nScale));
    },
    startScale(sign) {
      this.scaleView(sign);

      this.stopScale();
      this.scaleTimer = setInterval(() => {
        this.scaleView(sign);
      }, 200);

      document.addEventListener('mouseup', this.stopScale);
    },
    stopScale() {
      document.removeEventListener('mouseup', this.stopScale);
      clearTimeout(this.scaleTimer);
    },
    changeTool(tool) {
      this.curTool = tool.id;
    },
  },
};
</script>

<style>
canvas {
  display: block;
}
</style>
 

<style scoped>
.view {
  transition: all 1000ms;
  margin: auto;
  min-height: 100%;
}
.image-view {
  position: relative;
  box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.5);
  transition: transform 500ms;
}

.canvas {
  cursor: default;
}

.scale-button {
  position: fixed;
  bottom: 15px;
  left: 20px;
  display: flex;
  width: 80px;
  justify-content: space-between;
}

.scale-button .button {
  width: 35px;
  height: 35px;
  border-radius: 30px;
  font-size: 22px;
}

.button {
  background: rgba(12, 12, 12, 0.9);
  box-shadow: 0px 0px 5px 0px #000;
  color: #eee;
  text-align: center;
}

.tool-list {
  position: fixed;
  bottom: 15px;
  right: 20px;
}

.tool-list .button {
  width: 50px;
  height: 50px;
  border-radius: 60px;
  font-size: 16px;
  line-height: 50px;
}
</style>
