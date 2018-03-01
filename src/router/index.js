import Vue from 'vue';
import VueRouter from 'vue-router';


import login from '@views/login.vue';

import main from '@src/main.vue';


Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/login', component: login
  },
  {
    path: '/', redirect: '/login'
  }
]

const router = new VueRouter({
  //滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router;

