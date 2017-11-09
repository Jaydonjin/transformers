// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css'
import VueClipboards  from 'vue2-clipboards';


Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueClipboards);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  store.commit('changeCurrentMenu', route.name);
  console.log(store.state.currentMenu);
  iView.LoadingBar.finish();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
