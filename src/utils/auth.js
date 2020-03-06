// 用于记录保存token的js文件
import Cookie from 'js-cookie'

const tokenKey = 'appoint_admin'

export function getToken() {
  return Cookie.get(tokenKey)
}

export function setToken(token) {
  return Cookie.set(tokenKey, token)
}

export function removeToken() {
  return Cookie.remove(tokenKey)
}
