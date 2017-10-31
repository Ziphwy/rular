<template>
  <div class="sign" :style="styles">
    <div>{{ transformColor }}</div>
  </div>
</template>

<script>
export default {
  name: 'color-marker',
  props: ['color', 'x', 'y'],
  computed: {
    styles() {
      return {
        transform: `translate(${this.x}px,${this.y}px)`,
        background: `${this.transformColor}`,
      };
    },
    transformColor() {
      return this.$store.getters.transformColor(this.color);
    },
  },
};
</script>

<style scoped>
.sign {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
