import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentMenu: '',
    currentImg: {name: '', detail: {url: '', ratio: '', size: '', type: ''}}
  },
  mutations: {
    changeCurrentMenu(state, newMenu){
      state.currentMenu = newMenu
    },
    changeCurrentImg(state, newImg){
      state.currentImg = newImg
    }
  }
});
