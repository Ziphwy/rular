<template>
  <div class="full-screen" @mousemove.ctrl="moveHandle" @click="clickHandle">
    <color-marker :attr="attr" style="pointer-events: none;" v-show="isShowCursor"></color-marker>
  </div>
</template>

<script>
import colorMarker from './color-marker.vue';
import { throttle } from '../../../commons/utils';
import { process } from '../../services/processor';

export default {
  name: 'color-marker-panel',
  props: ['image'],
  data() {
    return {
      x: 0,
      y: 0,
      color: [],
      isShowCursor: false,
    };
  },
  computed: {
    attr() {
      return {
        x: this.x,
        y: this.y,
        color: this.color,
      };
    },
    currentTool() {
      return this.$store.state.currentTool;
    },
  },
  components: {
    colorMarker,
  },
  methods: {
    process($event) {
      return process(this.image.path, 'getColor', { x: $event.offsetX, y: $event.offsetY });
    },
    moveHandle: throttle(function moveHandle($event) {
      this.isShowCursor = true;
      this.process($event).then(({ result }) => {
        this.x = $event.offsetX;
        this.y = $event.offsetY;
        this.color = result;
      });
    }, 50, 50),
    clickHandle($event) {
      this.process($event).then(({ result }) => {
        this.$store.commit('ADD_SIGN', {
          path: this.image.path,
          sign: {
            type: 'color',
            attr: {
              x: $event.offsetX,
              y: $event.offsetY,
              color: result,
            },
          },
        });
      });
    },
  },
  watch: {
    currentTool(v) {
      if (v !== 'color') {
        this.isShowCursor = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
