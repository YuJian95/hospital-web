import request from '@/utils/request'
/**
 * 用于整理一切关于诊室的接口的API
 * 1、通过门诊搜索诊室
 * 2、向门诊添加诊室
 * 3、更新诊室信息
 * 4、删除诊室
 * **/
// 1、通过门诊搜索诊室
export function getTreatRoom(outpatientID, pageNum, pageSize) {
  return request({
    url: '/hospital/outpatient/clinic/list/' + outpatientID,
    method: 'get',
    params: {pageNum, pageSize }
  })
}
// 2、向门诊添加诊室
export function addTreatRoom(data) {
  return request({
    url: '/hospital/clinic',
    method: 'post',
    data
  })
}
// 3、更新诊室信息
export function updateTreatRoom(treatRoomId, data) {
  return request({
    url: '/hospital/clinic/' + treatRoomId,
    method: 'put',
    data
  })
}
//
export function deleteTreatRoom(treatRoomId) {
  return request({
    url: '/hospital/clinic/' + treatRoomId,
    method: 'delete'
  })
}
