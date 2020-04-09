/**
 * 作为日期的筛选器，使得日期呈现YYYY-MM-DD的状态
 * **/
export function dateFormYMD(date) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}
