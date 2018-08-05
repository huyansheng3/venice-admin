import request from '@/utils/request'

// POST /tradeOrder/queryApproveListByCondition
export function queryApproveListByCondition(data) {
  return request({
    url: '/tradeOrder/queryApproveListByCondition',
    method: 'post',
    data: data
  })
}

export function getOrder(params) {
  return request({
    url: '/system/GetOrder',
    method: 'post',
    data: params
  })
}