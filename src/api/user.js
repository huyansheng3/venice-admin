import request from '@/utils/request'

// POST /swftApi/loginApp


export function loginApp(data) {
  return request({
    url: '/swftApi/loginApp',
    method: 'post',
    data
  })
}