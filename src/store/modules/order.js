import {
  getOrderList,
  getOrder
} from '@/api/order'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const order = {
  state: {
    orderListData: null
  },
  mutations: {
    SET_ORDER_LIST_DATA: (state, orderListData) => {
      state.orderListData = orderListData
    }
  },
  actions: {
    GetOrderList({ // 获取订单列表
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        getOrderList(formData).then(response => {
          commit('SET_ORDER_LIST_DATA', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetOrder({ // 获取订单详细信息
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        getOrder(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}



export default order
