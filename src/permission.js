import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import layout from '@/layout/layout'
import {systemRouterMap, doctorRouterMap,constantRouterMap} from "./router";
import {getCookie, setCookie} from "@/utils/cookies";

export function getPermission() {

  if (getCookie('username') === 'admin' ) {
    let array = constantRouterMap.concat(systemRouterMap);
    router.options.routes = array;
    router.onReady(() => {

      router.addRoutes(array)
    });
  } else {
    let array = constantRouterMap.concat(doctorRouterMap);
    router.options.routes = array;
    router.addRoutes(array)
  }
  // let a = {
  //   path: '/',
  //   component: layout,
  //   redirect: '/setUpManagement',
  //   meta: {title: '排版管理', icon: 'el-icon-document'},
  //   children: [{
  //     path: '/setUpDetail',
  //     component: () => import('@/view/setUpManagement/setUpDetail'),
  //     meta: {title: '排版详情', icon: 'el-icon-user'}
  //   }]
  // };
  // router.options.routes.push(a)
  // store.dispatch('GenerateRoutes', 'admin').then(() => {
  //   router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
  // })

}
