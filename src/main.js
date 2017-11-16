// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'iview/dist/styles/iview.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueClipboards  from 'vue2-clipboards';
import vueTruncateFilter from 'vue-truncate-filter'
import {user} from '@/services'
import {session} from '@/common'



Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueClipboards);
Vue.use(BootstrapVue);
Vue.use(vueTruncateFilter);


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (session.get('transformers_isLogin')) {
      let userInfo = session.get('transformers_userInfo');
      store.dispatch('login',userInfo);
      next()
    } else {
      user.authorize(to,from)
        .then(({token, userInfo})=>{
          session.set('transformers_userInfo', userInfo);
          store.dispatch('login',userInfo);
          session.set('transformers_isLogin', true);
          session.set('transformers_token', token);
          next()
        })
        .catch(err =>{
          session.delete('transformers_isLogin')
        })
    }
    iView.LoadingBar.start();
  }else {next()}
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
  store,
  template: '<App/>',
  components: {App}
})
