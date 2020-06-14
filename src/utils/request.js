// 作为封装axios请求的js文件
import { getToken } from "@/utils/auth";
import axios from 'axios';
import { Message, MessageBox } from "element-ui";
import store from '@/store';

// 创建axios实例
console.log(process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: 'http://localhost:8080/hospital',
  timeout: 15000  // 请求超过15秒就报错
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求都带上自定义的token，并根据实际情况进行修改
    config.headers['Authorization'] = getToken()
    return config
  }
  return config
}, error => {
  // 当请求错误时
  console.log(error)
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // if !200 start
    if (res.code !== 200) {
      Message({
        message: res.massage,
        type: 'error',
        duration: 3 * 1000
      })

      // code = 401 表示未登录
      // if 401 start
      if (res.code === 401) {
        MessageBox.confirm('登录失效，请重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            // 为了重新实例化vue-router对象，避免有bug
            location.reload()
          })
        })
      } // if 401 end
      return Promise.reject('error')
    } else { // if !200 end
      return response.data
    }
  }, // response end

  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
