import Vuex from 'vuex';
import Vue from 'vue';
import { blobToImage, transformLength, transformColor, getFileByPath } from '../../commons/image';
import { process } from '../services/processor';
import baseOption from '../components/base-option';
import colorOption from '../components/color-marker/option';
import distanceOption from '../components/distance-marker/option';
import sizeOption from '../components/size-marker/option';
import { register, initOption } from '../services/option-manager';

const nodePath = require('path');

register(colorOption, distanceOption, sizeOption, {
  type: 'none',
  createOption() {},
  createOptionConfig() { return { type: 'none', icon: 'cursor' }; },
}, baseOption);

/* eslint no-shadow: 0 */
const state = {
  currentFile: {},
  fileIndex: {},
  fileList: [],
  scale: 1,
  optionList: initOption(),
  signList: {},
  currentTool: 'distance',
};

const mutations = {
  ADD_FILE(state, file) {
    state.fileList.push(file);
    state.fileIndex[file.path] = state.fileList.length - 1;
  },
  RM_FILE(state, path) {
    const index = state.imgIndex[path];
    state.fileList.splice(index, 1);
    delete state.fileIndex[path];
  },
  SELECT_FILE(state, path) {
    state.currentFile = state.fileList[state.fileIndex[path]];
  },
  SWITCH_TOOL(state, toolId) {
    state.currentTool = toolId;
  },
  SET_OPTION(state, { type, option }) {
    state.optionList[type] = Object.assign(state.optionList[type], option);
  },
  SET_SCALE(state, value) {
    state.scale = value;
  },
  ADD_SIGN(state, { path, sign }) {
    state.fileList[state.fileIndex[path]].signList.push(sign);
  },
  DEL_SIGN(state, { path, index }) {
    state.fileList[state.fileIndex[path]].signList.splice(index, 1);
  },
};

const actions = {
  async getFileByPath({ state, commit }, pathList) {
    pathList.forEach(async (path) => {
      if (!state.fileIndex[path]) {
        const { stat, imgElement } = await getFileByPath(path);
        process(path, 'loadImage');
        commit('ADD_FILE', {
          name: nodePath.basename(path),
          path,
          size: stat.size,
          imgElement,
          width: imgElement.naturalWidth,
          height: imgElement.naturalHeight,
          signList: [],
        });
      }
      commit('SELECT_FILE', path);
    });
  },
  async addFile({ state, commit }, blob) {
    const { name, path, size } = blob;
    if (!state.fileIndex[path]) {
      const imgElement = await blobToImage(blob);
      process(path, 'loadImage');
      commit('ADD_FILE', {
        name,
        path,
        size,
        imgElement,
        width: imgElement.naturalWidth,
        height: imgElement.naturalHeight,
        signList: [],
      });
    }
    commit('SELECT_FILE', path);
  },
};

const getters = {
  transformLength({ optionList: { base }, currentFile: { width } }) {
    return num => transformLength({ num, width, ...base });
  },
  transformColor({ optionList: { base } }) {
    return color => transformColor({ color, ...base });
  },
  scaleFontSize({ scale }) {
    if (scale > 1) return 12;
    return Math.max(Math.min(Math.floor(12 / scale), 30), 1);
  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

