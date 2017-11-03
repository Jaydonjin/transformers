import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/pages/Home'
import mediaLibrary from '../view/media-library/media-libraty.vue'

Vue.use(VueRouter);

export const page404 = {
  path: '/*',
  name: 'error_404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => { require(['../pages/error_page/404.vue'], resolve); }
};

export const appRouter = [
  {
    path: '/console',
    redirect:'/console/dashboard',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'media_library',
        name: 'media_library',
        component: mediaLibrary,
      },
      {
        path: 'dashboard',
        name: 'dashboard',
      },
      {
        path: 'transformations',
        name: 'transformations',
      }
    ]
  },
];

export const routers = [
  ...appRouter,
  page404
];
export default new VueRouter({
  routes: routers
})
