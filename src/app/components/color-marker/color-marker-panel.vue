<template>
  <div class="full-screen" @mousemove="moveHandle" @click="clickHandle">
    <color-marker :color="color" :x="x" :y="y" style="pointer-events: none;"></color-marker>
  </div>
</template>

<script>
import colorMarker from './color-marker.vue';
import { process } from '../../image-processor';

export default {
  name: 'color-marker-panel',
  props: ['image'],
  data() {
    return {
      x: 0,
      y: 0,
      color: [],
    };
  },
  components: {
    colorMarker,
  },
  methods: {
    moveHandle($event) {
      process(this.image.path, 'getColor', { x: $event.offsetX, y: $event.offsetY })
        .then(({ result }) => {
          this.x = $event.offsetX;
          this.y = $event.offsetY;
          this.color = result;
        });
    },
    clickHandle($event) {

    },
  },
};
</script>

<style scoped>

</style>
