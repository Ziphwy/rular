import Vuex from 'vuex';
import Vue from 'vue';
import { blobToImage, transformLength, transformColor } from '../../commons/image';
import { process } from '../services/processor';
import baseOption from '../components/base-option';
import colorOption from '../components/color-marker/option';
import distanceOption from '../components/distance-marker/option';
import sizeOption from '../components/size-marker/option';
import { register, initOption } from '../services/option-manager';

register(colorOption, distanceOption, sizeOption, baseOption);

/* eslint no-shadow: 0 */
const state = {
  currentFile: {},
  fileIndex: {},
  fileList: [],
  optionList: initOption(),
  currentTool: 'distance',
};

const mutations = {
  ADD_FILE(state, file) {
    state.fileList.push(Object.freeze(file));
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
};

const actions = {
  async addFile({ state, commit }, blob) {
    const { name, path, size } = blob;
    if (!state.fileIndex[path]) {
      await blobToImage(blob).then((imgElement) => {
        process(path, 'loadImage');
        commit('ADD_FILE', {
          name,
          path,
          size,
          imgElement,
          width: imgElement.naturalWidth,
          height: imgElement.naturalHeight,
        });
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
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

