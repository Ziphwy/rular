<template>
  <div class="full-screen" @mousedown="startHandle">
    <!-- 光标 -->
    <size-marker :attr="attr" style="pointer-events: none;" v-show="isShowCursor"></size-marker>
    <div class="save-btn" :style="saveStyles" v-show="isShowSave" @mousedown.stop @click.stop="saveSign">save</div>
  </div>
</template>

<script>
import sizeMarker from './size-marker.vue';
import { process } from '../../services/processor';

export default {
  name: 'size-marker-panel',
  props: ['image'],
  data() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isShowCursor: false,
      isShowSave: false,
    };
  },
  computed: {
    attr() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      };
    },
    tolerance() {
      return this.$store.state.optionList.size.tolerance;
    },
    currentTool() {
      return this.$store.state.currentTool;
    },
    saveStyles() {
      return {
        top: `${this.y + this.height + 5}px`,
        left: `${this.x + this.width + 5}px`,
      };
    },
  },
  components: {
    sizeMarker,
  },
  methods: {
    startHandle($event) {
      this.isShowCursor = true;
      this.isShowSave = false;
      this.x = $event.offsetX;
      this.y = $event.offsetY;
      this.width = 0;
      this.height = 0;
      this.$el.addEventListener('mousemove', this.moveHandle);
      document.addEventListener('mouseup', this.endHandle);
    },
    moveHandle($event) {
      this.width = Math.max(0, $event.offsetX - this.x);
      this.height = Math.max(0, $event.offsetY - this.y);
    },
    endHandle($event) {
      this.width = Math.max(0, $event.offsetX - this.x);
      this.height = Math.max(0, $event.offsetY - this.y);
      process(this.image.path, 'getSimilarRect', {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        tolerance: this.tolerance,
      }).then(({ result }) => {
        this.x = result.x0;
        this.y = result.y0;
        this.width = (result.xn - result.x0) + 1;
        this.height = (result.yn - result.y0) + 1;
        this.isShowSave = true;
      });
      this.$el.removeEventListener('mousemove', this.moveHandle);
      document.removeEventListener('mouseup', this.endHandle);
    },
    saveSign() {
      this.isShowSave = false;
      this.$store.commit('ADD_SIGN', {
        path: this.image.path,
        sign: {
          type: 'size',
          attr: {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
          },
        },
      });
    },
  },
  watch: {
    currentTool(v) {
      if (v !== 'distance') {
        this.isShowCursor = false;
      }
    },
  },
};
</script>

<style scoped>
.save-btn {
  font-size: 12px;
    color: #eee;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    padding: 0 2px;
    position: absolute;
}
</style>
