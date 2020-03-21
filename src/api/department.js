import request from '@/utils/request'
/**
 * 此页面用于医院的专科的所有API接口
 * 1、分页获取专科列表信息
 * 2、添加专科信息
 * 3、更新专科信息
 * 4、删除专科信息
 * **/
// 1、分页获取专科列表信息
export function getDepartmentList(pageNum, pageSize, name) {
  return request({
    url: '/hospital/special/list',
    method: 'get',
    params: {pageNum, pageSize, name}
  })
}
// 2、添加专科信息
export function addDepartment(data) {
  return request({
    url: '/hospital/special',
    method: 'post',
    data
  })
}
// 3、更新专科信息
export function updateDepartment(id,data) {
  return request({
    url: '/hospital/special/' + id,
    method: 'put',
    data
  })
}
// 4、删除专科信息
export function deleteDepartmentByID(id) {
  return request({
    url: '/hospital/special/' + id,
    method: 'delete'
  })
}
