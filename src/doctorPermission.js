// 该页面是医生的权限，动态增加医生权限的路由
import router from '@/router'
import layout from '@/layout/layout'

const permission = [{
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
},{
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
}]

// 递归生成一个路由配置
// function createRouteConfigByPermission (permission) {
//   permission.forEach(function (item,index) {
//     router.options.routes.push(item)
//   })
// }
//
// createRouteConfigByPermission(permission)
// export default router
export default permission
