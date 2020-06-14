import request from '@/utils/request'
/**
 * 作为所有患者的信息的API接口
 * 1、获取患者就诊记录
 * 2、修改用户就诊状态
 * 3、获取患者病历
 * 4、添加新病历
 * 5、修改病历
 * 6、重新叫号
 * 7、获取患者曾经的就诊记录
 * **/
// 1、获取患者就诊记录
export function getPatientTreatRecord(cardId, pageNum, pageSize) {
  return request({
    url: '/visit/appointment/list',
    method: 'get',
    params: {cardId, pageNum, pageSize}
  })
}

// 2、修改用户就诊状态，表示完成就诊
export function updateTreatStatusFinish(id) {
  return request({
    url: '/visit/appointment/finish/' +  id,
    method: 'put'
  })
}

// 3、获取患者病历
export function getTreatRecordCase(cardId, appointmentId) {
  return request({
    url: '/user/case',
    method: 'get',
    params: {cardId, appointmentId}
  })
}
// 4、添加新病历
export function addPatientCase(data) {
  return request({
    url: '/user/case',
    method: 'post',
    data
  })
}
// 5、修改病历
export function updatePatientCase(id, data, cardId) {
  return request({
    url: '/user/case/' + id ,
    method: 'put',
    data
  })
}
// 6、重新叫号
export function updateStatusAgain(id) {
  return request({
    url: '/visit/appointment/miss/' + id,
    method: 'put'
  })
}
