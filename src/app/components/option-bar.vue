<template>
  <div class="setting flex flex-center" @mouseover="active && (spread = true)" @mouseleave="active && (spread = false)">
    <div class="icon button" :class="[option.icon, (active ? 'active': '')]" @click="select"></div>
    <div class="flex flex-center tool-option" :class="spread ? 'show' : 'hide'" :style="spreadStyles" ref="content" v-show="option.attr">

      <div class="flex option" 
           v-for="(optVal, optKey) in option.attr" 
           :key="optKey" 
           v-if="option.attr[optKey].type === 'number'">
        <label :for="optKey">{{ optKey }}</label> 
        <div class="option-input">
          <input type="number" :name="optKey" :value="option.attr[optKey].value" @input="update($event, option.attr[optKey].type)">
        </div>
      </div>

      <div class="flex option" 
           v-for="(optVal, optKey) in option.attr" 
           :key="optKey" 
           v-if="option.attr[optKey].type === 'text'">
        <label :for="optKey">{{ optKey }}</label> 
        <div class="option-input">
          <input type="text" :name="optKey" :value="option.attr[optKey].value" @input="update($event, option.attr[optKey].type)">
        </div>
      </div> 

      <div class="flex option" 
           v-for="(optVal, optKey) in option.attr" 
           :key="optKey" 
           v-if="option.attr[optKey].type === 'select'">
        <label :for="optKey">{{ optKey }}</label>
        <div class="option-input" 
             @click="change(optKey, option.attr[optKey].value, option.attr[optKey].group)">{{ option.attr[optKey].value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'option-bar',
  props: ['option', 'active'],
  data() {
    return {
      width: '',
      spread: true,
    };
  },
  computed: {
    spreadStyles() {
      return (
        this.spread
          ? { width: `${this.width}px` }
          : {}
      );
    },
  },
  mounted() {
    this.width = this.$refs.content.offsetWidth;
    this.spread = false;
  },
  methods: {
    update($event, type) {
      let { value } = $event.target;
      if (type === 'number') {
        value = Number(value);
      }
      this.$emit('update:option', { [$event.target.name]: value });
    },
    change(key, value, group) {
      const i = (group.indexOf(value) + 1) % group.length;
      this.$emit('update:option', { [key]: group[i] });
    },
    select() {
      this.spread = true;
      this.$emit('select', this.option.type);
    },
  },
};
</script>

<style scoped>
.setting {
  padding: 5px;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 10px;
  margin: 10px 0;
}

.setting .option {
  padding: 0 2px 0 4px;
}

.tool-option::before, 
.tool-option::after {
    content: ' ';
    display: block;
    width: 15px;
}

.button {
  background-color: rgba(81, 81, 81, 0.9);
  box-shadow: 0px 0px 5px 0px #000;
  color: #eee;
  text-align: center;
  padding: 1px;
  background-clip: content-box;
  transition: background-color 300ms;
}

.button.active {
  background-color: rgba(12, 12, 12, 0.9);
}

.setting .button {
  width: 50px;
  height: 50px;
  border-radius: 60px;
  font-size: 16px;
  line-height: 50px;
  background-size: 30px;
}

.setting .tool-option {
  background: rgba(12, 12, 12, 0.9);
  border-radius: 10em;
  height: 35px;
  line-height: 35px;
  color: #eee;
  font-size: 12px;
  box-shadow: 0px 0px 5px 0px #000;
  overflow: hidden;
  transition: 300ms;
  background-clip: content-box;
  padding: 1px;
}

.setting .tool-option.hide {
  padding: 0;  
  margin-left: 0;
  opacity: 0;
  width: 0;
}

.setting:hover .tool-option.show {
  padding: 1px;  
  margin-left: 10px;
  opacity: 1;
}

.setting .option-input {
  width: 3em;
  text-align: center;
  margin: 0 5px;
  background: rgba(86, 86, 86, 0.36);
}

/* ::-webkit-inner-spin-button {
  display: none;
} */
</style>
