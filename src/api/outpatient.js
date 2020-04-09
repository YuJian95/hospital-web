import request from '@/utils/request'
/**
 * 此页面用于医院的门诊的所有API接口
 * 1、分页获取专科编号下的门诊列表信息
 * 2、更新门诊信息
 * 3、添加门诊信息
 * 4、删除门诊信息
 * 5、添加门诊到指定医院
 * 6、添加门诊到指定医院
 * 7、删除医院中的某个门诊
 * 8、获取没有添加到医院去的某个专科的门诊
 * **/
// 1、分页获取专科编号下的门诊列表信息
export function getOutpatientListById(pageNum, pageSize, specialId) {
  return request({
    url: '/hospital/special/list/outpatient',
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
// 5、获取指定医院专科的门诊
export function getOutpatientByHospital(hospitalId, specialId, pageNum, pageSize) {
  return request({
    url: '/hospital/outpatient/list',
    method: 'get',
    params: {hospitalId, specialId, pageNum, pageSize}
  })
}
// 6、添加门诊到指定医院
export function addOutpatientToHospital(data) {
  return request({
    url: '/hospital/outpatient/relation',
    method: 'post',
    data
  })
}
// 7、删除医院中的某个门诊
export function deleteOutpatientFromHospital(hospitalId, outpatientId) {
  return request({
    url: '/hospital/outpatient/relation',
    method: 'delete',
    params: {hospitalId, outpatientId}
  })
}
///8、获取没有添加到医院去的某个专科的门诊
export function getNoHospitalOutpatientList(pageNum, pageSize, specialId) {
  return request({
    url: '/hospital/outpatient/alone',
    method: 'get',
    params: {pageNum, pageSize, specialId}
  })
}
