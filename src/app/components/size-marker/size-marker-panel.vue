<template>
  <div class="full-screen" @mousedown="startHandle">
    <!-- 光标 -->
    <size-marker :attr="attr" style="pointer-events: none;"></size-marker>
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
  },
  components: {
    sizeMarker,
  },
  methods: {
    startHandle($event) {
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
        this.$store.commit('ADD_SIGN', {
          path: this.image.path,
          sign: {
            type: 'size',
            attr: {
              x: result.x0,
              y: result.y0,
              width: (result.xn - result.x0) + 1,
              height: (result.yn - result.y0) + 1,
            },
          },
        });
      });
      this.$el.removeEventListener('mousemove', this.moveHandle);
      document.removeEventListener('mouseup', this.endHandle);
    },
  },
};
</script>

<style scoped>
</style>
