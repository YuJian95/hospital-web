/**
 * 用于处理医生获取出诊计划时的本周和下周的时间调整
 * 每周以周日开始
 * getWeek方法是用于获取这个日期所在的那周的周日和周六
 * **/
export function getWeek(date) {
  let currentDate = new Date(date);
  let day = currentDate.getDay();
  let current = currentDate.getDate();
  // 获取本周周日
  let week7 = new Date(currentDate.setDate(current - day)); // 获取周日的日期
  let week6 = new Date(currentDate.setDate(week7.getDate() + 6)); // 获取周六的时间
  let week = {
    sunday: week7,
    saturday: week6
  }
  return week;
}

// 获取日期格式
export function dateForm(date) {
  let currentDate = new Date(date);
  let year = currentDate.getFullYear();
  let month = turnDouble(currentDate.getMonth() + 1);
  let current = turnDouble(currentDate.getDate());
  return year + '-' + month + '-' + current
}

function turnDouble(num) {
  // 假如长度为2
  if (num >= 10) {
    return num
  } else { // 否则在前面加0
    return '0' + num
  }
}
