import {
  getGoodsList,
  createdGoods,
  deleteGoods,
  editGoods,
  getProduct,
  getAllCategory,
  createdCategory,
  deleteCategory,
  editCategory
} from '@/api/goods'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const goods = {
  state: {
    goodsListData: null
  },
  mutations: {
    SET_GOODS_LIST_DATA: (state, goodsListData) => {
      state.goodsListData = goodsListData
    }
  },
  actions: {
    GoodsList({ // 获取商品信息列表
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        getGoodsList(formData).then(response => {
          commit('SET_GOODS_LIST_DATA', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CreatedGoods({ // 创建商品
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        createdGoods(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteGoods({ // 删除商品
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        deleteGoods(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditGoods({ // 编辑商品信息
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        editGoods(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetProduct({ // 获取商品信息
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        getProduct(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAllCategory({ // 获取商品分类
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getAllCategory().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CreatedCategory({ // 创建节点分类
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        createdCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteCategory({ // 删除节点分类
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        deleteCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EeditCategory({ // 编辑节点分类
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        editCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}



export default goods
