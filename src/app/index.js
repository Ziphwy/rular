import Vue from 'vue';
import './base.css';
import app from './app.vue';
import store from './services/store';

document.body.appendChild(document.createElement('App'));

new Vue({
  render(h) {
    return h(app);
  },
  store,
}).$mount('App');
