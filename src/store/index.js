import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentMenu:''
  },
  mutations: {
    increment (state) {
      state.count++
    },
    changeCurrentMenu(state,newMenu){
      state.currentMenu = newMenu
    }
  }
});
