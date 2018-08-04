import request from '@/utils/request'

export function getShopInfo(params) { //获取店铺信息
  return request({
    url: '/api/shop/GetShopInfo',
    method: 'post',
    data: params
  })
} 

export function createdShop(params) { //创建店铺
  return request({
    url: '/system/CreatedShop',
    method: 'post',
    data: params
  })
}

export function deleteShop(params) { //删除店铺
  return request({
    url: '/system/DeleteShop',
    method: 'post',
    data: params
  })
}

export function getShopList(params) { //获取店铺列表
  return request({
    url: '/system/GetShopList',
    method: 'post',
    data: params
  })
}

export function editShop(params) { //编辑店铺
  return request({
    url: '/system/EditShop',
    method: 'post',
    data: params
  })
}

export function editShopCategory(params) { //编辑店铺商品分类
  return request({
    url: '/system/EditShopCategory',
    method: 'post',
    data: params
  })
}

export function addShopCategory(params) { //添加店铺商品分类
  return request({
    url: '/system/AddShopCategory',
    method: 'post',
    data: params
  })
}

export function deleteShopCategory(params) { //删除店铺商品分类
  return request({
    url: '/system/DeleteShopCategory',
    method: 'post',
    data: params
  })
}
