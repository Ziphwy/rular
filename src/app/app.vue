<template>
  <div class="app full-screen">
    <div class="title">欢迎使用</div>
    <div class="content">
      <editor></editor>
    </div>
  </div>
</template>

<script>
import editor from './components/editor.vue';

export default {
  name: 'app',
  components: {
    editor,
  },
};
</script>

<style scoped>
@font-face {
  font-family: CamingoCode;
  src: url('./assets/CamingoCode-Regular.ttf');
}
.app {
  font-family: monaco;
  background: rgba(15, 15, 15, 0.925);
}
.title {
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  line-height: 30px;
  color: #e6e6e6;
  text-align: center;
  -webkit-app-region: drag;
  font-size: 12px;
}
.content {
  height: calc(100% - 30px);
  min-height: calc(100% - 30px);
  -webkit-app-region: no-drag;
}
</style>
