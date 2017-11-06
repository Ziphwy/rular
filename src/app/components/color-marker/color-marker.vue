<template>
  <div class="sign" :style="posStyles">
    <div class="line"></div>
    <div class="text" :style="styles">{{ transformColor }}</div>
  </div>
</template>

<script>
import { isLightColor } from '../../../commons/image';
import { divideProp } from '../../../commons/utils';

export default {
  name: 'color-marker',
  props: ['attr'],
  computed: {
    ...divideProp('attr', ['x', 'y', 'color']),
    posStyles() {
      return {
        transform: `translate(${this.x}px,${this.y}px)`,
        color: isLightColor(this.color) ? '#000' : '#fff',
      };
    },
    styles() {
      return {
        background: `${this.transformColor}`,
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
.line {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 1.5em;
  border-top: 1px solid #333;
  transform-origin: 0 0;
  transform: rotate(35deg);
}
.line::before {
  content: " ";
  display: block;
  width: 1px;
  height: 1px;
  border: 1px solid #333;
  position: relative;
  top: -2px;
  left: -2px;
}
.text {
  border: 1px solid;
  border-radius: 2px;
  font-size: 12px;
  position: absolute;
  left: 1em;
}
.sign:focus .text {
  box-shadow: 0 0 5px 1px red;
}
</style>
