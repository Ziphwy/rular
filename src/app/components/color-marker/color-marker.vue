<template>
  <div class="sign" :style="styles">
    <div>{{ transformColor }}</div>
  </div>
</template>

<script>
export default {
  name: 'color-marker',
  props: ['color', 'x', 'y'],
  data() {
    return {
      mode: 'hex',
    };
  },
  computed: {
    styles() {
      return {
        transform: `translate(${this.x}px,${this.y}px)`,
        background: `${this.transformColor}`,
      };
    },
    transformColor() {
      return `rgba(${this.color.join(',')})`;
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
