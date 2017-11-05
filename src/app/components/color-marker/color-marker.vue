<template>
  <div class="sign" :style="posStyles">
    <div class="text" :style="styles">{{ transformColor }}</div>
  </div>
</template>

<script>
import { invertColor } from '../../../commons/image';
import { divideProp } from '../../../commons/utils';

export default {
  name: 'color-marker',
  props: ['attr'],
  computed: {
    ...divideProp('attr', ['x', 'y', 'color']),
    posStyles() {
      return {
        transform: `translate(${this.x}px,${this.y}px)`,
      };
    },
    styles() {
      return {
        background: `${this.transformColor}`,
        color: `rgba(${invertColor(this.color).join(',')})`,
        fontSize: `${this.$store.getters.scaleFontSize}px`,
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
.text {
    border: 1px solid;
    border-radius: 2px;
    font-size: 12px;
    position: relative;
    left: 1em;
}
</style>
