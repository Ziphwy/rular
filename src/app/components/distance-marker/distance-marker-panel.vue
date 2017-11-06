<template>
  <div class="full-screen" 
       @mousemove="moveHandle" 
       @click="clickHandle" 
       @mousewheel.ctrl.prevent="changeRange"
       @keydown.esc="resumeDirect"
       tabindex="-1">
    <distance-marker :attr="attr" style="pointer-events: none;" v-show="isShowCursor"></distance-marker>
  </div>
</template>

<script>
import distanceMarker from './distance-marker.vue';
import { process } from '../../services/processor';
import { throttle, limit } from '../../../commons/utils';

export default {
  name: 'distance-marker-panel',
  props: ['image'],
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      x: 0,
      y: 0,
      length: 0,
      isAltDown: false,
      isShowCursor: false,
    };
  },
  mounted() {
    window.addEventListener('keydown', this.resumeDirect);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.resumeDirect);
  },
  computed: {
    attr() {
      return {
        x: this.x,
        y: this.y,
        length: this.length,
        range: this.range,
        direct: this.direct,
      };
    },
    direct() {
      return this.$store.state.optionList.distance.direct;
    },
    tolerance() {
      return this.$store.state.optionList.distance.tolerance;
    },
    range() {
      return this.$store.state.optionList.distance.range;
    },
    currentTool() {
      return this.$store.state.currentTool;
    },
  },
  components: {
    distanceMarker,
  },
  methods: {
    process() {
      return process(this.image.path, 'getSimilarRange', {
        main: this.mouseX,
        cross: this.mouseY,
        direct: this.direct,
        range: this.range,
        tolerance: this.tolerance,
      }).then(({ result }) => {
        if (this.direct === 'x') {
          this.x = result.p0;
          this.y = this.mouseY;
        } else {
          this.x = this.mouseX;
          this.y = result.p0;
        }
        this.length = (result.pn - result.p0) + 1;
      });
    },
    moveHandle: throttle(function moveHandle($event) {
      this.isShowCursor = true;
      this.mouseX = $event.offsetX;
      this.mouseY = $event.offsetY;
      this.process();
    }),
    clickHandle() {
      this.process().then(() => {
        this.$store.commit('ADD_SIGN', {
          path: this.image.path,
          sign: {
            type: 'distance',
            attr: this.attr,
          },
        });
      });
    },
    changeRange: throttle(function changeRange($event) {
      this.$store.commit('SET_OPTION', {
        type: 'distance',
        option: {
          range: limit(this.range + Math.sign($event.wheelDelta), 0, 300),
        },
      });
      this.process();
    }, 50, 50),
    resumeDirect($event) {
      if ($event.keyCode === 27 && this.$store.state.currentTool === 'distance') {
        const direct = this.direct === 'x' ? 'y' : 'x';
        this.$store.commit('SET_OPTION', {
          type: 'distance',
          option: {
            direct,
          },
        });
        this.process();
      }
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

</style>
