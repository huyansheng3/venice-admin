import {
  getCurrencyList,
  saveCurrency,
  deleteCurrency,
  queryCurrList,
} from '@/api/currency'

const order = {
  state: {
    currencyList: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    pages: 1,
    availableCurrList: [],
  },
  mutations: {
    setCurrencyList(state, payload) {
      state.currencyList = payload
    },
    setPageParams(state, {
      pageNum,
      pageSize,
      total,
      pages,
    }) {
      state.pageNum = pageNum
      state.pageSize = pageSize
      state.total = total
      state.pages = pages
    },

    setCurrentPage(state, currentPage) {
      state.pageNum = currentPage
    },
    setAvailableCurrList(state, payload) {
      state.availableCurrList = payload
    },

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
      } = result || {}
      commit('setCurrencyList', dataList)
      commit('setPageParams', result)
    },
    saveCurrency({
      dispatch
    }, payload) {
      return saveCurrency(payload)
        .then(() => {
          dispatch('getCurrencyList')
        })
    },
    deleteCurrency({
      dispatch
    }, payload) {
      return deleteCurrency(payload)
        .then(() => {
          dispatch('getCurrencyList')
        })
    },
    async queryAvailableCurrList({
      commit
    }, payload) {
      const result = await queryCurrList(payload)
      commit('setAvailableCurrList', result)
    },

  },
}



export default order
