<template>
  <div class="full-screen" @mousemove="moveHandle" @click="clickHandle">
    <distance-marker :direct="direct" :range="range" :length="length" :x="x" :y="y" style="pointer-events: none;"></distance-marker>
  </div>
</template>

<script>
import distanceMarker from './distance-marker.vue';
import { process } from '../../services/processor';
import { throttle } from '../../../commons/utils';

const last = 0;
export default {
  name: 'distance-marker-panel',
  props: ['image'],
  data() {
    return {
      x: 0,
      y: 0,
      length: 0,
    };
  },
  computed: {
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
  methods: {
    moveHandle: throttle(function moveHandle($event) {
      process(this.image.path, 'getSimilarRange', {
        main: $event.offsetX,
        cross: $event.offsetY,
        direct: this.direct,
        range: this.range,
      }).then(({ result }) => {
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
      // process(this.image.path, 'getSimilarRange', {
      //   main: $event.offsetX,
      //   cross: $event.offsetY,
      //   direct: this.direct,
      //   range: this.range,
      // }).then(({ result }) => {
      //   if (this.direct === 'x') {
      //     this.x = result.p0;
      //     this.y = $event.offsetY;
      //   } else {
      //     this.x = $event.offsetX;
      //     this.y = result.p0;
      //   }
      //   this.length = (result.pn - result.p0) + 1;
      // });
    },
  },
};
</script>

<style scoped>

</style>
