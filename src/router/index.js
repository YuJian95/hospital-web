import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '@/layout/layout'
Vue.use(VueRouter)

let routes = [{
  path: '/',
  name: '登录',
  component: () => import('@/view/login/login'),
  hidden: true
}, {
  path: '/',
  name: '404',
  component: () => import('@/view/404/404'),
  hidden: true
}, {
  path: '/',
  component: layout,
  name: '测试管理',
  redirect: '/testManagement',
  iconCls: 'el-icon-question', //图标样式class
  children: [{
    path: '/test1',
    component: () => import('@/view/testManagement/test1'),
    name: '测试一'
  }, {
    path: '/test2',
    component: () => import('@/view/testManagement/test2'),
    name: '测试二'
  }]
}, {
  path: '/',
  component: layout,
  name: '展示管理',
  redirect: '/showManagement',
  iconCls: 'el-icon-question', //图标样式class
  children: [{
    path: '/show1',
    component: () => import('@/view/showManagement/show1'),
    name: '展示一'
  }, {
    path: '/show2',
    component: () => import('@/view/showManagement/show2'),
    name: '展示二'
  }]
}]

var router = new VueRouter({
  routes
}
)
export default router;
