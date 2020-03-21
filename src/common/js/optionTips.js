/**
 * 用作展示成功或者错误时的
 * @param type 表示提示的类型如成功(success)、错误(error）、警告(warning)
 * **/
export function tips(type, message) {
  if (type === 'success') {
    this.$notify({
      title: '成功',
      message: message,
      type: 'success',
      duration: 2000
    })
  } else if (type === 'error') {
    this.$notify.error({
      title: '错误',
      message: message
    });
  } else {
    this.$notify({
      title: '警告',
      message: message,
      type: 'warning'
    });
  }
}
