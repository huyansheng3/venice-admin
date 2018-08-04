import request from '@/utils/request'

export function createUser(params) {
  return request({
    url: '/system/CreateUser',
    method: 'post',
    data: params
  })
}

export function editAdminInfo(params) {
  return request({
    url: '/system/EditAdminInfo',
    method: 'post',
    data: params
  })
}

export function authorizedAdmin(params) {
  return request({
    url: '/system/AuthorizedAdmin',
    method: 'post',
    data: params
  })
}
export function getAdminList(params) {
  return request({
    url: '/system/GetAdminList',
    method: 'post',
    data: params
  })
}
export function getAdminInfo(params) {
  return request({
    url: '/system/GetAdminInfo',
    method: 'post',
    data: params
  })
}
export function delectAdmin(params) {
  return request({
    url: '/system/DelectAdmin',
    method: 'post',
    data: params
  })
}

export function getStatisData(params) {
  return request({
      url: '/statis/GetStatisData',
      method: 'post',
      data: params
  })
}