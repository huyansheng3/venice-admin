import request from '@/utils/request'

export function getArticleList(params) {
  return request({
    url: '/api/cms/GetArticleList',
    method: 'post',
    data: params
  })
}

export function getArticle(params) {
  return request({
    url: '/api/cms/GetArticle',
    method: 'post',
    data: params
  })
}

export function createdArticle(params) {
  return request({
    url: '/system/CreatedArticle',
    method: 'post',
    data: params
  })
}

export function deleteArticle(params) {
  return request({
    url: '/system/DeleteArticle',
    method: 'post',
    data: params
  })
}

export function editArticle(params) {
  return request({
    url: '/system/EditArticle',
    method: 'post',
    data: params
  })
}

export function getGoodsCategoryList(params) {
  return request({
    url: '/system/GetGoodsCategoryList',
    method: 'post',
    data: params
  })
}

export function getGoodsCategory(params) {
  return request({
    url: '/system/GetGoodsCategory',
    method: 'post',
    data: params
  })
}


export function createGoodsCategory(params) {
  return request({
    url: '/system/CreateGoodsCategory',
    method: 'post',
    data: params
  })
}

export function editGoodsCategory(params) {
  return request({
    url: '/system/EditGoodsCategory',
    method: 'post',
    data: params
  })
}

export function deleteGoodsCategory(params) {
  return request({
    url: '/system/DeleteGoodsCategory',
    method: 'post',
    data: params
  })
}

export function getSearchGoodsList(params) {
  return request({
    url: '/system/GetProductList',
    method: 'post',
    data: params
  })
}
