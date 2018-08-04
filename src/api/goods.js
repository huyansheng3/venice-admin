import request from '@/utils/request'

export function getGoodsList(params) { 
  return request({
    url: '/system/GetGoodsList',
    method: 'post',
    data: params
  })
}
export function createdGoods(params) {
  return request({
    url: '/system/CreatedProduct',
    method: 'post',
    data: params
  })
}
export function deleteGoods(params) {
  return request({
    url: '/system/DeleteGoods',
    method: 'post',
    data: params
  })
}
export function editGoods(params) {
  return request({
    url: '/system/EditGoods',
    method: 'post',
    data: params
  })
}
export function getProduct(params) {
  return request({
    url: '/api/shop/GetProduct',
    method: 'post',
    data: params
  })
}
export function getAllCategory() {
  return request({
    url: '/system/GetAllCategory',
    method: 'post',
    data: {}
  })
}
export function createdCategory(params) {
  return request({
    url: '/system/CreatedCategory',
    method: 'post',
    data: params
  })
}
export function deleteCategory(params) {
  return request({
    url: '/system/DeleteCategory',
    method: 'post',
    data: params
  })
}
export function editCategory(params) {
  return request({
    url: '/system/EditCategory',
    method: 'post',
    data: params
  })
}



