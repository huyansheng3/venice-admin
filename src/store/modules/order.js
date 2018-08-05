import {
  queryApproveListByCondition,
  getOrder
} from '@/api/order'


const order = {
  state: {
    orderList: null,
    page: {
      "pageNum": 1,
      "pageSize": 10,
      "pages": 0,
      "total": 0
    }
  },
  mutations: {

  },
  actions: {
    async queryApproveListByCondition({
      state,
      commit
    }, payload) {
      await queryApproveListByCondition({
        data: {}
      })
    }
  }
}



export default order