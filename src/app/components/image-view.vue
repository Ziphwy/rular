<template>
  <div class="flex flex-center view" :style="viewStyles">
    <div class="image-view" :style="styles">
      <div class="canvas"></div>
      <sign-panel :image="image"></sign-panel>
      <color-marker-panel :image="image" v-show="currentTool === 'color'"></color-marker-panel>
      <distance-marker-panel :image="image" v-show="currentTool === 'distance'"></distance-marker-panel>
      <size-marker-panel :image="image" v-show="currentTool === 'size'"></size-marker-panel>
    </div>
    <div class="scale-button">
      <div class="button" @mousedown="startScale(-1)">-</div>
      <div class="button" @mousedown="startScale(1)">+</div>
    </div>
    <div class="flex flex-column option-bar">
      <option-bar v-for="(type, index) in getOptionTypes()" 
                  :key="type"
                  :option="initOptionConfig(type, optionList)" 
                  :active="type === currentTool || type === 'base'" 
                  @select="swichTool" 
                  @update:option="getUpdateOptionFunc(type)($event)"></option-bar>    
    </div>
  </div>
</template>
 
<script>
import { mapState } from 'vuex';
import { imageToCanvas } from '../../commons/image';
import { limit } from '../../commons/utils';
import optionBar from './option-bar.vue';
import colorMarkerPanel from './color-marker/color-marker-panel.vue';
import distanceMarkerPanel from './distance-marker/distance-marker-panel.vue';
import sizeMarkerPanel from './size-marker/size-marker-panel.vue';
import signPanel from './sign-panel.vue';
import { initOptionConfig, getOptionTypes } from '../services/option-manager';

export default {
  name: 'image-view',
  props: ['image'],
  data() {
    return {
      pressTimer: null,
    };
  },
  computed: {
    styles() {
      return {
        transform: `scale(${this.scale})`,
      };
    },
    viewStyles() {
      return {
        width: `${(this.image.width * this.scale) + 100}px`,
        height: `${(this.image.height * this.scale) + 100}px`,
      };
    },
    ...mapState(['currentTool', 'optionList', 'scale']),
  },
  components: {
    colorMarkerPanel,
    distanceMarkerPanel,
    sizeMarkerPanel,
    optionBar,
    signPanel,
  },
  mounted() {
    const { canvas } = imageToCanvas(this.image.imgElement);
    this.$el.getElementsByClassName('canvas')[0].appendChild(canvas);
  },
  methods: {
    initOptionConfig,
    getOptionTypes,
    getUpdateOptionFunc(type) {
      return (option) => {
        this.$store.commit('SET_OPTION', { type, option });
      };
    },
    swichTool(type) {
      if (type === 'base') return;
      this.$store.commit('SWITCH_TOOL', type);
    },
    startScale(sign) {
      this.$store.commit('SET_SCALE', limit(this.scale + (0.125 * sign), 0, 2));
    },
  },
};
</script>

<style>
canvas {
  display: block;
}
.color {
  background-image: url("../assets/icon_color.png");
}
.distance {
  background-image: url("../assets/icon_distance.png");
}
.size {
  background-image: url("../assets/icon_rect.png");
}
.set {
  background-image: url("../assets/setting.png");
}
</style>
 

<style scoped>
.view {
  transition: all 1000ms;
  margin: auto;
  min-height: 100%;
}
.image-view {
  position: relative;
  box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.5);
  transition: transform 500ms;
}

.button {
  background-color: rgba(12, 12, 12, 0.9);
  box-shadow: 0px 0px 5px 0px #000;
  color: #eee;
  text-align: center;
  padding: 1px;
  background-clip: content-box;
}

.canvas {
  cursor: default;
}

.scale-button {
  position: fixed;
  bottom: 15px;
  left: 20px;
  display: flex;
  width: 90px;
  justify-content: space-between;
  padding: 5px;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 10px;
}

.scale-button .button {
  width: 35px;
  height: 35px;
  border-radius: 30px;
  font-size: 22px;
  line-height: 30px;
}


.option-bar {
  position: fixed;
  bottom: 15px;
  right: 20px;
  align-items: flex-end;
}
</style>
