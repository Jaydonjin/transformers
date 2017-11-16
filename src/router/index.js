import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import mediaLibrary from '../view/media-library/media-library2.vue'
import transformation from"../view/transformation/transformation.vue"

Vue.use(VueRouter);

export const page404 = {
  path: '/*',
  name: 'error_404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => {
    require(['../pages/error_page/404.vue'], resolve);
  }
};

export const appRouter = [
  {
    path: '/console',
    redirect: '/console/media_library',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'media_library',
        name: 'media_library',
        component: mediaLibrary,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: 'media_library',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'transformations',
        name: 'transformations',
        component: transformation,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
];

export const routers = [
  ...appRouter,
  page404
];
export default new VueRouter({
  routes: routers,
  mode: 'history'
})

