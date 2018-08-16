import {
  queryApproveListByCondition,
  queryOrder
} from '@/api/order'


const order = {
  state: {
    orderList: null,
    page: {
      "pageNum": 1,
      "pageSize": 10,
      "pages": 0,
      "total": 0
    },
    order: {},
  },
  mutations: {
    setOrder(state, payload) {
      state.order = payload
    }
  },
  actions: {
    async queryApproveListByCondition({
      state,
      commit
    }, payload) {
      await queryApproveListByCondition({
        data: {}
      })
    },
    async queryOrder({
      commit
    }, payload) {
      const result = await queryOrder(payload)
      commit('setOrder', result)
    }
  }
}



export default order
