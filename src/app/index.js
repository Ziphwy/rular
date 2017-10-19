import Vue from 'vue';
import './base.css';
import app from './app.vue';
import { process } from './image-processor';

new Vue({
  render(h) {
    return h(app);
  },
}).$mount('App');

window.imageProcessor = process;
