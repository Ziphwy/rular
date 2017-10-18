<template>
  <div class="app full-screen">
    <div class="title">欢迎使用</div>
    <div class="content">
      <div class="flex flex-column flex-center background">
        <div class="app-name">Rular</div>
        <div class="app-author">Author By Zfhuang</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
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
  height: calc(100% - 24px);
  min-height: calc(100% - 24px);
  -webkit-app-region: no-drag;
}
.background {
  width: 100%;
  height: 100%;
}
.app-name {
  font-family: fantasy;
  -webkit-text-fill-color: rgba(0, 0, 0, 0.3);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
  font-size: 100px;
}

.app-author {
  font-family: fantasy;
  -webkit-text-fill-color: rgba(0, 0, 0, 0.3);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
  font-size: 40px;
}
</style>
