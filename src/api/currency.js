import request from '@/utils/request'

export function getCurrencyList(data) {
  return request({
    url: '/swftConfig/queryCurrCofigListByCondition',
    method: 'post',
    data: data
  })
}

export function saveCurrency(data) {
  return request({
    url: '/swftConfig/saveCurrConfig',
    method: 'post',
    data: data
  })
}