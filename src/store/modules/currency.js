import {
  getCurrencyList,
  saveCurrency
} from '@/api/currency'

const order = {
  state: {
    currencyList: null,
    pageNum: 0,
    pageSize: 20,
  },
  mutations: {
    setCurrencyList(state, payload) {
      state.currencyList = payload
    },
    setPageParams(state, {
      pageNum,
      pageSize
    }) {
      state.pageNum = pageNum
      state.pageSize = pageSize
    }
  },
  actions: {
    async getCurrencyList({ // 获取订单列表
      commit,
      state
    }, payload) {
      const result = await getCurrencyList({
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        ...payload
      })
      const {
        dataList = [],
          pageNum,
          pageSize
      } = result || {}
      commit('setCurrencyList', dataList)
      commit('setPageParams', {
        pageNum,
        pageSize
      })
    },
  },

  saveCurrency({
    dispatch
  }, payload) {
    return saveCurrency(payload).then(() => {
      dispatch('getCurrencyList')
    })

  }
}



export default order