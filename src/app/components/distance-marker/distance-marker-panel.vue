<template>
  <div class="full-screen" @mousemove="moveHandle" @click="clickHandle">
    <distance-marker :direct="direct" :range="range" :length="length" :x="x" :y="y" style="pointer-events: none;"></distance-marker>
  </div>
</template>

<script>
import distanceMarker from './distance-marker.vue';
import { process } from '../../image-processor';

export default {
  name: 'distance-marker-panel',
  props: ['image'],
  data() {
    return {
      x: 0,
      y: 0,
      length: 0,
      direct: 'x',
      range: 1,
    };
  },
  components: {
    distanceMarker,
  },
  methods: {
    moveHandle($event) {
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
    },
    clickHandle($event) {},
  },
};
</script>

<style scoped>

</style>
