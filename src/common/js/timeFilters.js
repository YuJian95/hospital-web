/**
 * 作为医生出诊的时间段
 * 1、将数字转为时间
 * 2、将时间转为数字
 * **/
// 1、将数字转为时间
export function outCallTime(value) {
  if (value === 1) {
    return '08:30~12:00'
  }
  return '14:00~18:00'
}
// 2、将时间转为数字
export function timeToNum(value) {
  if (value === '08:30~12:00') {
    return 1
  }
  return 2
}
