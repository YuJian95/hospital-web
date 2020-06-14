import request from '@/utils/request'
/**
 * 用于获取医生的信息
 * 1、分页获取医生的信息
 * 2、添加医生信息
 * 3、更新医生信息
 * 4、删除医生信息
 * 5、获取出诊时间
 * 6、创建医生管理员
 * 7、获取用户挂自己号的列表
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
// 5、获取出诊时间
export function getVisitPlanList(doctorId, startDate, endDate) {
  return request({
    url: '/visit/plan/doctor',
    method: 'get',
    params: {doctorId, startDate, endDate}
  })
}
// 6、创建医生管理员
export function createDoctorManager(data) {
  return request({
    url: '/power/account/admin/register',
    method: 'post',
    data
  })
}
// 7、获取用户挂自己号的列表
export function getPatientList(doctorId, date, time, pageNum, pageSize) {
  return request({
    url: '/visit/appointment/user',
    method: 'get',
    params: {doctorId, date, time, pageNum, pageSize}
  })
}
