import {
  getShopList,
  getShopInfo,
  createdShop,
  editShop,
  deleteShop,
  editShopCategory,
  addShopCategory,
  deleteShopCategory
} from '@/api/shop'

import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const shop = {
  state: {
    shopData: null
  },
  mutations: {
    SET_SHOP_DATA: (state, shopData) => {
      state.shopData = shopData
    }
  },
  actions: {
    GetShopList({ //获取店铺列表
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        getShopList(formData).then(response => {
          commit('SET_SHOP_DATA', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetShopInfo({ //获取店铺信息
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        getShopInfo(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CreatedShop({ //创建店铺
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        createdShop(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditShop({ //编辑店铺
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        editShop(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteShop({ //删除店铺
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        deleteShop(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditShopCategory({ //编辑店铺商品分类
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        editShopCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddShopCategory({ //添加店铺商品分类
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        addShopCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteShopCategory({ //删除店铺商品分类
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        deleteShopCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default shop
