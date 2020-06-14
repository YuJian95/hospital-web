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
// 3、将数字转为性别
export function getGender(num) {
  if (num === 1) {
    return '男'
  } else {
    return '女'
  }
}
// 获取出诊时间段
export function getTimePeriod(num) {
  let time = '';
  switch(num) {
    case 1:
      time = '08:30~09:00';
      break;
    case 2:
      time = '09:00~09:30';
      break;
    case 3:
      time = '09:30~10:00';
      break;
    case 4:
      time = '10:00~10:30';
      break;
    case 5:
      time = '10:30~11:00';
      break;
    case 6:
      time = '11:00~11:30';
      break;
    case 7:
      time = '11:30~12:00';
      break;
    case 8:
      time = '14:00~14:30';
      break;
    case 9:
      time = '14:00~15:00';
      break;
    case 10:
      time = '15:00~15:30';
      break;
    case 11:
      time = '15:30~16:00';
      break;
    case 12:
      time = '16:00~16:30';
      break;
    case 13:
      time = '16:30~17:00';
      break;
    case 14:
      time = '17:00~17:30';
      break;
    case 15:
      time = '17:30~18:00';
      break;
  }
  return time
}
