<template>
  <div class="sign" :style="posStyles">
    <div class="rect" :style="styles">
      <div class="flex flex-center height">{{ transformHeight }}</div>
      <div class="width">{{ transformWidth }}</div>      
    </div>
  </div>
</template>

<script>
import { divideProp } from '../../../commons/utils';

export default {
  name: 'size-marker',
  props: ['attr'],
  computed: {
    ...divideProp('attr', ['x', 'y', 'width', 'height']),
    posStyles() {
      return {
        transform: `translate(${this.x}px,${this.y}px)`,
      };
    },
    styles() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        fontSize: `${this.$store.getters.scaleFontSize}px`,
      };
    },
    transformWidth() {
      return this.$store.getters.transformLength(this.width);
    },
    transformHeight() {
      return this.$store.getters.transformLength(this.height);
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
.rect {
  border: 1px solid red;
  font-size: 12px;
  text-align: center;
  color: red;
}
.height {
  text-align: left;
  position: absolute;
  top: 0px;
  right: 0;
  height: 100%;
  text-indent: 2px;
  transform: translate(100%, 0);
}
.width {
  position: absolute;
  width: 100%;
  bottom: 0;
  transform: translate(0, 100%);
}
</style>
