import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '@/layout/layout'
Vue.use(VueRouter)

export let constantRouterMap = [{
  path: '/',
  component: () => import('@/view/login/login'),
  hidden: true
}, {
  path: '/',
  component: () => import('@/view/404/404'),
  hidden: true
}, {
  path: '/',
  component: layout,
  redirect: '/home',
  meta: {title: '首页', icon: 'el-icon-s-home'},
  children: [{
    path: '/home',
    // name: 'home',
    component: () => import('@/view/home/home'),
    meta: {title: '首页', icon: 'el-icon-s-home'}
  }]
}
/*, {
  path: '/',
  component: layout,
  redirect: '/patientManagement',
  meta: {title: '患者管理', icon: 'el-icon-user'},
  children: [{
    path: '/appointDetail',
    component: () => import('@/view/patientManagement/appointDetail/appointDetail'),
    meta: {title: '预约详情', icon: 'el-icon-user'}
  }, {
    path: '/patientMedicalRecord',
    component: () => import('@/view/patientManagement/appointDetail/patientMedicalRecord'),
    meta: {title: '患者详情', icon: 'el-icon-user'},
    hidden: true
  }]
}, {
  path: '/',
  component: layout,
  redirect: '/outCallManagement',
  meta: {title: '出诊管理', icon: 'el-icon-s-cooperation'},
  children: [{
    path: '/outCallDetail',
    component: () => import('@/view/outCallManagement/outCallDetail'),
    meta: {title: '出诊详情', icon: 'el-icon-user'}
  }]
}, {
  path: '/',
  component: layout,
  redirect: '/hospitalManagement',
  meta: {title: '医院管理', icon: 'el-icon-office-building'},
  children: [{
    path: '/hospitalDetail',
    component: () => import('@/view/hospitalManagement/hospitalDetail'),
    meta: {title: '医院详情', icon: 'el-icon-user'}
  }, {
    path: '/checkHospital',
    component: () => import('@/view/hospitalManagement/checkHospital'),
    meta: {title: '查看医院详情', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/addHospital',
    component: () => import('@/view/hospitalManagement/addHospital'),
    meta: {title: '添加医院', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/editHospital',
    component: () => import('@/view/hospitalManagement/editHospital'),
    meta: {title: '修改医院', icon: 'el-icon-user'},
    hidden: true
  }]
}, {
  path: '/',
  component: layout,
  redirect: '/departmentDetail',
  meta: {title: '专科管理', icon: 'el-icon-guide'},
  children: [{
    path: '/departmentDetail',
    component: () => import('@/view/departmentManagement/departmentDetail/departmentDetail'),
    meta: {title: '专科详情', icon: 'el-icon-user'}
  }, {
    path: '/departmentSetUp',
    component: () => import('@/view/departmentManagement/departmentSetUp/departmentSetUp'),
    meta: {title: '专科排版', icon: 'el-icon-user'}
  }, {
    path: '/outpatientDetail',
    component: () => import('@/view/departmentManagement/departmentDetail/outpatientDetail'),
    meta: {title: '门诊详情', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/treatRoomDetail',
    component: () => import('@/view/departmentManagement/departmentDetail/treatRoomDetail'),
    meta: {title: '诊室详情', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/outpatientSetUp',
    component: () => import('@/view/departmentManagement/departmentSetUp/outpatientSetUp'),
    meta: {title: '门诊排版', icon: 'el-icon-user'},
    hidden: true
  }]
}, {
  path: '/',
  component: layout,
  redirect: '/userPermission',
  meta: {title: '权限管理', icon: 'el-icon-user'},
  children: [{
    path: '/userList',
    iconCls: 'el-icon-guide',
    component: () => import('@/view/userPermission/user/userList'),
    meta: {title: '用户列表', icon: 'el-icon-user'}
  }, {
    path: '/roleList',
    component: () => import('@/view/userPermission/role/roleList'),
    meta: {title: '角色列表', icon: 'el-icon-user'}
  }, {
    path: '/menuList',
    component: () => import('@/view/userPermission/menu/menuList'),
    meta: {title: '菜单列表', icon: 'el-icon-user'}
  }, {
    path: '/resourceList',
    component: () => import('@/view/userPermission/resource/resourceList'),
    meta: {title: '资源列表', icon: 'el-icon-user'}
  }, {
    path: '/addMenu',
    component: () => import('@/view/userPermission/menu/addMenu'),
    meta: {title: '添加菜单', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/editMenu',
    component: () => import('@/view/userPermission/menu/editMenu'),
    meta: {title: '编辑菜单', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/sonMenu',
    component: () => import('@/view/userPermission/menu/sonMenu'),
    meta: {title: '二级菜单', icon: 'el-icon-user'},
    hidden: true
  }]
}, {
  path: '/',
  component: layout,
  redirect: '/doctorManagement',
  meta: {title: '医生管理', icon: 'el-icon-s-custom'},
  children: [{
    path: '/doctorDetail',
    component: () => import('@/view/doctorManagement/doctorDetail'),
    meta: {title: '医生详情', icon: 'el-icon-user'}
  }, {
    path: '/checkDoctor',
    component: () => import('@/view/doctorManagement/checkDoctor'),
    meta: {title: '查看医生', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/addDoctor',
    component: () => import('@/view/doctorManagement/addDoctor'),
    meta: {title: '添加医生', icon: 'el-icon-user'},
    hidden: true
  }, {
    path: '/editDoctor',
    component: () => import('@/view/doctorManagement/editDoctor'),
    meta: {title: '修改医生', icon: 'el-icon-user'},
    hidden: true
  }]
}, {
  path: '/',
  component: layout,
  redirect: '/setUpManagement',
  meta: {title: '排版管理', icon: 'el-icon-document'},
  children: [{
    path: '/setUpDetail',
    component: () => import('@/view/setUpManagement/setUpDetail'),
    meta: {title: '排版详情', icon: 'el-icon-user'}
  }]
}*/
];
 export const doctorRouterMap = [
   {
     path: '/',
     component: layout,
     redirect: '/patientManagement',
     meta: {title: '患者管理', icon: 'el-icon-user'},
     children: [{
       path: '/appointDetail',
       component: () => import('@/view/patientManagement/appointDetail/appointDetail'),
       meta: {title: '预约详情', icon: 'el-icon-user'}
     }, {
       path: '/patientMedicalRecord',
       component: () => import('@/view/patientManagement/appointDetail/patientMedicalRecord'),
       meta: {title: '患者详情', icon: 'el-icon-user'},
       hidden: true
     }]
   }, {
     path: '/',
     component: layout,
     redirect: '/outCallManagement',
     meta: {title: '出诊管理', icon: 'el-icon-s-cooperation'},
     children: [{
       path: '/outCallDetail',
       component: () => import('@/view/outCallManagement/outCallDetail'),
       meta: {title: '出诊详情', icon: 'el-icon-user'}
     }]
   },
   {path: '*', redirect: '/404', hidden: true}
 ]

export const systemRouterMap = [
  {
    path: '/',
    component: layout,
    redirect: '/hospitalManagement',
    meta: {title: '医院管理', icon: 'el-icon-office-building'},
    children: [{
      path: '/hospitalDetail',
      component: () => import('@/view/hospitalManagement/hospitalDetail'),
      meta: {title: '医院详情', icon: 'el-icon-user'}
    }, {
      path: '/checkHospital',
      component: () => import('@/view/hospitalManagement/checkHospital'),
      meta: {title: '查看医院详情', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/addHospital',
      component: () => import('@/view/hospitalManagement/addHospital'),
      meta: {title: '添加医院', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/editHospital',
      component: () => import('@/view/hospitalManagement/editHospital'),
      meta: {title: '修改医院', icon: 'el-icon-user'},
      hidden: true
    }]
  }, {
    path: '/',
    component: layout,
    redirect: '/departmentDetail',
    meta: {title: '专科管理', icon: 'el-icon-guide'},
    children: [{
      path: '/departmentDetail',
      component: () => import('@/view/departmentManagement/departmentDetail/departmentDetail'),
      meta: {title: '专科详情', icon: 'el-icon-user'}
    }, {
      path: '/departmentSetUp',
      component: () => import('@/view/departmentManagement/departmentSetUp/departmentSetUp'),
      meta: {title: '专科排版', icon: 'el-icon-user'}
    }, {
      path: '/outpatientDetail',
      component: () => import('@/view/departmentManagement/departmentDetail/outpatientDetail'),
      meta: {title: '门诊详情', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/treatRoomDetail',
      component: () => import('@/view/departmentManagement/departmentDetail/treatRoomDetail'),
      meta: {title: '诊室详情', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/outpatientSetUp',
      component: () => import('@/view/departmentManagement/departmentSetUp/outpatientSetUp'),
      meta: {title: '门诊排版', icon: 'el-icon-user'},
      hidden: true
    }]
  }, {
    path: '/',
    component: layout,
    redirect: '/doctorManagement',
    meta: {title: '医生管理', icon: 'el-icon-s-custom'},
    children: [{
      path: '/doctorDetail',
      component: () => import('@/view/doctorManagement/doctorDetail'),
      meta: {title: '医生详情', icon: 'el-icon-user'}
    }, {
      path: '/checkDoctor',
      component: () => import('@/view/doctorManagement/checkDoctor'),
      meta: {title: '查看医生', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/addDoctor',
      component: () => import('@/view/doctorManagement/addDoctor'),
      meta: {title: '添加医生', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/editDoctor',
      component: () => import('@/view/doctorManagement/editDoctor'),
      meta: {title: '修改医生', icon: 'el-icon-user'},
      hidden: true
    }]
  }, {
    path: '/',
    component: layout,
    redirect: '/setUpManagement',
    meta: {title: '排版管理', icon: 'el-icon-document'},
    children: [{
      path: '/setUpDetail',
      component: () => import('@/view/setUpManagement/setUpDetail'),
      meta: {title: '排版详情', icon: 'el-icon-user'}
    }]
  },
  /*{
    path: '/',
    component: layout,
    redirect: '/userPermission',
    meta: {title: '权限管理', icon: 'el-icon-user'},
    children: [{
      path: '/userList',
      iconCls: 'el-icon-guide',
      component: () => import('@/view/userPermission/user/userList'),
      meta: {title: '用户列表', icon: 'el-icon-user'}
    }, {
      path: '/roleList',
      component: () => import('@/view/userPermission/role/roleList'),
      meta: {title: '角色列表', icon: 'el-icon-user'}
    }, {
      path: '/menuList',
      component: () => import('@/view/userPermission/menu/menuList'),
      meta: {title: '菜单列表', icon: 'el-icon-user'}
    }, {
      path: '/resourceList',
      component: () => import('@/view/userPermission/resource/resourceList'),
      meta: {title: '资源列表', icon: 'el-icon-user'}
    }, {
      path: '/addMenu',
      component: () => import('@/view/userPermission/menu/addMenu'),
      meta: {title: '添加菜单', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/editMenu',
      component: () => import('@/view/userPermission/menu/editMenu'),
      meta: {title: '编辑菜单', icon: 'el-icon-user'},
      hidden: true
    }, {
      path: '/sonMenu',
      component: () => import('@/view/userPermission/menu/sonMenu'),
      meta: {title: '二级菜单', icon: 'el-icon-user'},
      hidden: true
    }]
  },*/
  {path: '*', redirect: '/404', hidden: true}
];
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
