import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentMenu:''
  },
  mutations: {
    changeCurrentMenu(state,newMenu){
      state.currentMenu = newMenu
    }
  }
});
