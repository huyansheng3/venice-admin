import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'

import user from './modules/user'
import order from './modules/order'
import currency from './modules/currency'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    order,
    currency
  },
  getters
})

export default store