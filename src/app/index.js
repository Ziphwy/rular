import Vue from 'vue';
import './base.css';
import app from './app.vue';

new Vue({
  render(h) {
    return h(app);
  },
}).$mount('App');
