import request from '@/utils/request'
/**
 * 作为所有给医生排版出诊计划的API接口
 * 1、获取全部的出诊计划
 * 2、添加出诊计划
 * 3、修改出诊计划
 * **/
// 1、获取全部的出诊计划
export function getAllOutCallList(day, pageNum, pageSize, hospitalId, specialId, outpatientId) {
  return request({
    url: '/visit/plan/list',
    method: 'get',
    params: {day, pageNum, pageSize, hospitalId, specialId, outpatientId}
  })
}
// 2、添加出诊计划
export function addOutCall(data) {
  return request({
    url: '/visit/plan',
    method: 'post',
    data
  })
}
// 3、修改出诊计划,id为出诊id
export function updateOutCall(id, data) {
  return request({
    url: '/visit/plan/' + id,
    method: 'put',
    data
  })
}
// 4、删除某条出诊计划,id为出诊id
export function deleteOutCallById(id) {
  return request({
    url: '/visit/plan/' + id,
    method: 'delete'
  })
}
