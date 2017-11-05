<template>
  <div class="full-screen" @mousemove="moveHandle" @click="clickHandle" tabindex="-1">
    <distance-marker :attr="attr" style="pointer-events: none;" v-show="isShowSign"></distance-marker>
  </div>
</template>

<script>
import distanceMarker from './distance-marker.vue';
import { process } from '../../services/processor';
import { throttle } from '../../../commons/utils';

export default {
  name: 'distance-marker-panel',
  props: ['image'],
  data() {
    return {
      isShowSign: true,
      x: 0,
      y: 0,
      length: 0,
    };
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
  },
  components: {
    distanceMarker,
  },
  mounted() {
    // window.addEventListener('keydown', (e) => {
    //   if (e.keyCode === 17) {
    //     this.isShowSign = true;
    //   }
    // });
    // window.addEventListener('keyup', (e) => {
    //   if (e.keyCode === 17) {
    //     this.isShowSign = false;
    //   }
    // });
    // window.addEventListener('mousewheel', (e) => {
    //   if (this.isShowSign) {
    //     this.$store.commit('SET_OPTION', {
    //       type: 'distance',
    //       option: {
    //         range: this.range + Math.sign(e.wheelDelta),
    //       },
    //     });
    //     e.preventDefault();
    //   }
    // });
  },
  methods: {
    process($event) {
      return process(this.image.path, 'getSimilarRange', {
        main: $event.offsetX,
        cross: $event.offsetY,
        direct: this.direct,
        range: this.range,
        tolerance: this.tolerance,
      });
    },
    moveHandle: throttle(function moveHandle($event) {
      // if (!this.isShowSign) return;
      this.process($event).then(({ result }) => {
        if (this.direct === 'x') {
          this.x = result.p0;
          this.y = $event.offsetY;
        } else {
          this.x = $event.offsetX;
          this.y = result.p0;
        }
        this.length = (result.pn - result.p0) + 1;
      });
    }, 50, 50),
    clickHandle($event) {
      this.process($event).then(({ result }) => {
        const sign = {
          type: 'distance',
          attr: {
            direct: this.direct,
            range: this.range,
          },
        };
        if (this.direct === 'x') {
          sign.attr.x = result.p0;
          sign.attr.y = $event.offsetY;
        } else {
          sign.attr.x = $event.offsetX;
          sign.attr.y = result.p0;
        }
        sign.attr.length = (result.pn - result.p0) + 1;
        this.$store.commit('ADD_SIGN', {
          path: this.image.path,
          sign,
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
