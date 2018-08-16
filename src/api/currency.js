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

export function deleteCurrency(params) {
  return request({
    url: '/swftConfig/deleteCurrConfig',
    method: 'get',
    params
  })
}


export function queryEntrustRate(params) {
  return request({
    url: '/swftConfig/queryEntrustRate',
    method: 'get',
    params
  })
}

export function queryInterestRate(params) {
  return request({
    url: '/swftConfig/queryInterestRate',
    method: 'get',
    params
  })
}

// POST /swftConfig/saveRateConfig

export function saveRateConfig(data) {
  return request({
    url: '/swftConfig/saveRateConfig',
    method: 'post',
    data
  })
}

// POST /swftApi/queryAllCurrList 

export function queryCurrList(data) {
  return request({
    url: '/swftApi/queryAllCurrList',
    method: 'post',
    data
  })
}
