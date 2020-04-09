import request from '@/utils/request'
/**
 * 用于获取医生的信息
 * 1、分页获取医生的信息
 * 2、添加医生信息
 * 3、更新医生信息
 * 4、删除医生信息
 * **/
// 1、分页获取医生的信息
export function getDoctorList(specialId, outpatientId, pageNum, pageSize, name) {
  return request({
    url: '/hospital/doctor/list/name',
    method: 'get',
    params: {specialId, outpatientId, pageNum, pageSize, name}
  })
}
// 2、添加医生信息
export function addDoctor(data) {
  return request({
    url: '/hospital/doctor',
    method: 'post',
    data
  })
}
// 3、更新医生信息
export function updateDoctor(id, data) {
  return request({
    url: '/hospital/doctor/' + id,
    method: 'put',
    data
  })
}
// 4、删除医生信息
export function deleteDoctor(id) {
  return request({
    url: '/hospital/doctor/' + id,
    method: 'delete'
  })
}
// 获取某个医生的信息
export function getDoctorInfo(doctorId) {
  return request({
    url: '/hospital/doctor/' + doctorId,
    method: 'get'
  })
}
