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
},
  {
  path: '/',
  component: layout,
  name: '患者管理',
  redirect: '/patientManagement',
  iconCls: 'el-icon-question', //图标样式class
  children: [{
    path: '/appointDetail',
    component: () => import('@/view/patientManagement/appointDetail'),
    name: '预约详情'
  }, {
    path: '/treatHistorySelect',
    component: () => import('@/view/patientManagement/treatHistorySelect'),
    name: '就诊查询'
  }]
}, {
    path: '/',
    component: layout,
    name: '出诊管理',
    redirect: '/outCallManagement',
    iconCls: 'el-icon-question', //图标样式class
    children: [{
      path: '/outCallDetail',
      component: () => import('@/view/outCallManagement/outCallDetail'),
      name: '出诊详情'
    }]
  },
  {
    path: '/',
    component: layout,
    name: '医院管理',
    redirect: '/hospitalManagement',
    iconCls: 'el-icon-office-building', //图标样式class
    children: [{
      path: '/hospitalDetail',
      component: () => import('@/view/hospitalManagement/hospitalDetail'),
      name: '医院详情'
    }, {
      path: '/checkHospital',
      component: () => import('@/view/hospitalManagement/checkHospital'),
      name: '查看医院详情',
      hidden: true
    }, {
      path: '/addOrEditHospital',
      component: () => import('@/view/hospitalManagement/addOrEditHospital'),
      name: '添加修改医院',
      hidden: true
    }]
  }, {
    path: '/',
    component: layout,
    name: '专科管理',
    redirect: '/departmentDetail',
    iconCls: 'el-icon-guide', //图标样式class
    children: [{
      path: '/departmentDetail',
      component: () => import('@/view/departmentManagement/departmentDetail/departmentDetail'),
      name: '专科详情'
    }, {
      path: '/departmentSetUp',
      component: () => import('@/view/departmentManagement/departmentSetUp/departmentSetUp'),
      name: '专科排版'
    }, {
      path: '/outpatientDetail',
      component: () => import('@/view/departmentManagement/departmentDetail/outpatientDetail'),
      name: '门诊详情',
      hidden: true
    }, {
      path: '/outpatientSetUp',
      component: () => import('@/view/departmentManagement/departmentSetUp/outpatientSetUp'),
      name: '门诊排版',
      hidden: true
    }, {
      path: '/outCallSetUp',
      component: () => import('@/view/departmentManagement/departmentSetUp/outCallSetUp'),
      name: '诊室排版',
      hidden: true
    }]
  }, {
    path: '/',
    component: layout,
    name: '医生管理',
    redirect: '/doctorManagement',
    iconCls: 'el-icon-s-custom', //图标样式class
    children: [{
      path: '/doctorDetail',
      component: () => import('@/view/doctorManagement/doctorDetail'),
      name: '医生详情'
    }, {
      path: '/checkDoctor',
      component: () => import('@/view/doctorManagement/checkDoctor'),
      name: '查看医生',
      hidden: true
    }, {
      path: '/addEditDoctor',
      component: () => import('@/view/doctorManagement/addEditDoctor'),
      name: '添加/修改医生',
      hidden: true
    }]
  }, {
    path: '/',
    component: layout,
    name: '排版管理',
    redirect: '/setUpManagement',
    iconCls: 'el-icon-document', //图标样式class
    children: [{
      path: '/setUpDetail',
      component: () => import('@/view/setUpManagement/setUpDetail'),
      name: '排版详情'
    }]
  }
  ]
let initRoute = routes.length

var router = new VueRouter({
  routes,
  initRoute: initRoute
})
export default router;
