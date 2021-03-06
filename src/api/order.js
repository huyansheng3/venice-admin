import request from '@/utils/request'

// POST /tradeOrder/queryApproveListByCondition
export function queryApproveListByCondition(data) {
  return request({
    url: '/tradeOrder/queryApproveListByCondition',
    method: 'post',
    data: data
  })
}

// POST /tradeOrder/queryListByCondition
export function queryListByCondition(data) {
  return request({
    url: '/tradeOrder/queryListByCondition',
    method: 'post',
    data: data
  })
}



export function getOrder(data) {
  return request({
    url: '/system/GetOrder',
    method: 'post',
    data: data
  })
}

// POST /tradeOrder/approveAgree

export function approveAgree(data) {
  return request({
    url: '/tradeOrder/approveAgree',
    method: 'post',
    data: data
  })
}

// POST /tradeOrder/approveReject

export function approveReject(data) {
  return request({
    url: '/tradeOrder/approveReject',
    method: 'post',
    data: data
  })
}


// GET /tradeOrder/queryOrder

export function queryOrder(params) {
  return request({
    url: '/tradeOrder/queryOrder',
    method: 'get',
    params
  })
}
