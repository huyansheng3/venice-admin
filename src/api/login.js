import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/system/LoginUser',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/system/GetAdminInfo',
    method: 'post',
    data: {
      AdminToken: token
    }
  })
}

export function logout() {
  return request({
    url: '/api/member/logout',
    method: 'post'
  })
}
