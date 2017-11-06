<template>
  <div class="full-screen">
    <component v-for="(sign, index) in image.signList" 
               :is="sign.type" 
               :attr="sign.attr" 
               :key="`sign-${index}`" 
               :tabindex="index" 
               @keydown.native.delete="delSign(index)">
    </component>
  </div>
</template>

<script>
import colorMarker from './color-marker/color-marker.vue';
import distanceMarker from './distance-marker/distance-marker.vue';
import sizeMarker from './size-marker/size-marker.vue';

export default {
  name: 'sign-panel',
  props: ['image'],
  components: {
    color: colorMarker,
    distance: distanceMarker,
    size: sizeMarker,
  },
  methods: {
    delSign(index) {
      this.$store.commit('DEL_SIGN', { path: this.image.path, index });
    },
  },
};
</script>

<style scoped>

</style>
