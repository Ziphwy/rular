<template>
  <div class="sign" :style="posStyles">
    <div class="line" :style="styles" :class="{ vertical: this.direct === 'y'}">
      <div class="text" :style="textScale">{{ displayLength }}</div>
      <div class="range" :style="rangeStyles"></div>
    </div>
  </div>
</template>

<script>
import { divideProp } from '../../../commons/utils';

export default {
  name: 'distance-marker',
  props: ['attr'],
  computed: {
    ...divideProp('attr', ['direct', 'x', 'y', 'length', 'range']),
    posStyles() {
      return {
        transform: `translate(${this.x}px,${this.y}px)`,
      };
    },
    styles() {
      return {
        width: `${this.length}px`,
      };
    },
    textScale() {
      return {
        fontSize: `${this.$store.getters.scaleFontSize}px`,
      };
    },
    rangeStyles() {
      return {
        top: `${-this.range}px`,
        height: `${(this.range * 2) + 1}px`,
        width: `${this.length}px`,
      };
    },
    displayLength() {
      return this.$store.getters.transformLength(this.length);
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
.sign:focus {
    box-shadow: 0 0 5px 1px red;
}
.line {
  border-bottom: 1px solid red;
  height: 1px;
  font-size: 12px;
  text-align: center;
  color: red;
}
.line .range {
  position: absolute;
  left: 0;
  border-left: 1px solid red;
  border-right: 1px solid red;
}

.line .text {
  display: inline-block;
  padding: 4px;
}

.vertical {
  transform: rotate(90deg);
  transform-origin: 0 0;
}

.vertical .text {
  transform: rotate(-90deg);
  transform-origin: 0 0;
}
</style>
