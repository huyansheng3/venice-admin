import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/system/GetOrderList',
    method: 'post',
    data: params
  })
}
export function getOrder(params) {
  return request({
    url: '/system/GetOrder',
    method: 'post',
    data: params
  })
}
