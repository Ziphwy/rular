import Vue from 'vue';
import './base.css';
import app from './app.vue';
import store from './services/store';

new Vue({
  render(h) {
    return h(app);
  },
  store,
}).$mount('App');
