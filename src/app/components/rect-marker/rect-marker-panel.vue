<template>
  <div class="full-screen" @mousedown="startHandle">
    <rect-marker :width="width" :height="height" :x="x" :y="y" style="pointer-events: none;"></rect-marker>
  </div>
</template>

<script>
import rectMarker from './rect-marker.vue';
import { process } from '../../image-processor';

export default {
  name: 'rect-marker-panel',
  props: ['image'],
  data() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  },
  components: {
    rectMarker,
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
      }).then(({ result }) => {
        this.x = result.x0;
        this.y = result.y0;
        this.width = (result.xn - result.x0) + 1;
        this.height = (result.yn - result.y0) + 1;
      });
      this.$el.removeEventListener('mousemove', this.moveHandle);
      document.removeEventListener('mouseup', this.endHandle);
    },
  },
  directives: {
    drag: {
      bind($el, binding) {
        const { start, move, end } = binding.value;
        const startPos = { x: 0, y: 0 };

        function moveHandle(event) {
          if (move) {
            move.call($el, {
              curPos: {
                x: event,
              },
              movePos: {
                x: event.offsetX - startPos.x,
                y: event.offsetY - startPos.y,
              },
            }, event);
          }
        }

        function endHandle(event) {
          $el.removeEventListener('mousemove', moveHandle);
          document.removeEventListener('mouseup', endHandle);
          if (end) {
            end.call($el, {
              movePos: {
                x: event.offsetX - startPos.x,
                y: event.offsetY - startPos.y,
              },
            }, event);
          }
        }

        $el.addEventListener('mousedown', (event) => {
          $el.addEventListener('mousemove', moveHandle);
          document.addEventListener('mouseup', endHandle);
          startPos.x = event.offsetX;
          startPos.y = event.offsetY;
          if (start) start.call($el, { startPos }, event);
        }, false);
      },
    },
  },
};
</script>

<style scoped>

</style>
