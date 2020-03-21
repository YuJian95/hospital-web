/**
 * 关于权限的api接口
 * 1、获取当前用户的权限
 * 2、获取父级的所有信息
 * **/
import request from '@/utils/request'

//1、获取当前用户的权限
export function getUserPermission(accountId) {
  return request({
    url: '/power/account/permission',
    method: 'get',
    params: {accountId}
  })
}
// 2、获取父级的所有信息(type表示的是儿子的type）
export function getParentPermission(type) {
  return request({
    url: '/power/permission/list/type',
    method: 'get',
    params: {type}
  })
}
