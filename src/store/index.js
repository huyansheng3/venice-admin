import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'

import admin from './modules/admin'
import user from './modules/user'
import goods from './modules/goods'
import cms from './modules/cms'
import shop from './modules/shop'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    admin,
    user,
    goods,
    cms,
    shop,
    order
  },
  getters
})

export default store
