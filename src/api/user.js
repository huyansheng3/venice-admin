import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/system/GetUserList',
    method: 'post',
    data: params
  })
}

