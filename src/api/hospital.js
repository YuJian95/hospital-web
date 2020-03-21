import request from '@/utils/request'
/**
 * 关于医院管理模块的接口
 * 1、获取所有医院信息
 * 2、添加医院
 * 3、修改医院信息
 * 4、删除医院信息
 * **/
// 1、获取所有医院信息、pageNum代表第几页，pageSize代表一页有多少，name代表医院名称
export function getHospitalInfo(pageNum, pageSize, name) {
  return request({
    url: '/hospital/info/list',
    method: 'get',
    params: {pageNum, pageSize, name}
  })
}
// 2、添加医院
export function addHospital(data) {
  return  request({
    url: '/hospital/info',
    method: 'post',
    data
  })
}
// 3、修改医院信息
export function updateHospital(id, data) {
  return request({
    url: '/hospital/info/' + id,
    method: 'put',
    data
  })
}
// 4、删除医院信息
export function deleteHospitalByID(id) {
  return request({
    url: 'hospital/info/' + id,
    method: 'delete'
  })
}
