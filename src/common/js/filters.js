// 作为过滤器过滤掉时间和状态
const filters = {
  // 有两种状态，若是status为’date‘则是单单获取日期，若是status为’time‘则还需要时间
  dateTime(date,status) {
    const getDate = new Date(date);
    const year = getDate.getFullYear();
    const month = turnDouble(getDate.getMonth() + 1);
    const cDate = turnDouble(getDate.getDate());

    if (status === 'date') {
      return year + '-' +  month + '-' + cDate
    } else if (status === 'time') {
      const hour = turnDouble(getDate.getHours());
      const minutes = turnDouble(getDate.getMinutes());
      const seconds = turnDouble(getDate.getSeconds());
      return year + '-' +  month + '-' + cDate + '  ' + hour + ':' + minutes + ':' + seconds
    }
  },
  // 这个是表示用户的权限的
  getStatusText(value) {
    if (value === 0) {
      return '受限'
    } else {
      return '启用'
    }
  },
  // 将权限分级，0位一级即目录，1为二级
  getMenuText(value) {
    if (value === 0) {
      return '一级'
    } else if (value === 1) {
      return '二级'
    }
  },
  // 将页面进行是编辑还是添加
  editOrAdd(value) {
    if (!value) {
      return '添加'
    } else if (value) {
      return '编辑'
    }
  },
  // 获取性别的文字
  getGenderText(num) {
    if (num === 1) {
      return '男'
    }
    return '女'
  }
};

// 将获取到的时间假如不是两位数的话在前面加0
function turnDouble(num) {
  // 假如长度为2
  if (num >= 10) {
    return num
  } else { // 否则在前面加0
    return '0' + num
  }
}

export default filters;
