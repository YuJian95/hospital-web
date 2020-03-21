import request from '@/utils/request'
/**
 * 此页面用于医院的门诊的所有API接口
 * 1、分页获取专科编号下的门诊列表信息
 * 2、更新门诊信息
 * 3、添加门诊信息
 * 4、删除门诊信息
 * **/
// 1、分页获取专科编号下的门诊列表信息
export function getOutpatientListById(pageNum, pageSize, specialId) {
  return request({
    url: '/hospital/outpatient/alone',
    method: 'get',
    params: {pageNum, pageSize, specialId}
  })
}
// 2、更新门诊信息
export function updateOutpatient(id, data) {
  return request({
    url: '/hospital/outpatient/' + id,
    method: 'put',
    data
  })
}
// 3、添加门诊信息
export function addOutpatient(data) {
  return request({
    url: '/hospital/outpatient',
    method: 'post',
    data
  })
}
// 4、删除门诊信息
export function deleteOutpatient(id) {
  return request({
    url: '/hospital/outpatient/' + id,
    method: 'delete'
  })
}
