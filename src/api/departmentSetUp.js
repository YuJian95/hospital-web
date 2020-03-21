import request from '@/utils/request'
/**
 * 用作专科排版时使用的接口
 * 1、获取指定医院的专科列表
 * 2、添加专科到指定医院
 * 3、删除指定医院的专科
 * **/
// 1、获取指定医院的专科列表
export function getDoctorDepartmentList(hospitalID, pageNum, pageSize) {
  return request({
    url: '/hospital/special/list/' + hospitalID,
    method: 'get',
    params: {pageNum, pageSize}
  })
}
// 2、添加专科到指定医院
export function addDepartmentToHospital(data) {
  return request({
    url: '/hospital/special/relation',
    method: 'post',
    data
  })
}
// 3、删除指定医院的专科
export function deleteDepartmentFromHospital(hospitalId, specialId) {
  return request({
    url: '/hospital/special/relation',
    method: 'delete',
    params: { hospitalId, specialId }
  })
}
