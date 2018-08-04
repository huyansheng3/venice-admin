import {
  getUserList
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const admin = {
  state: {
    userListData: null
  },
  mutations: {
    SET_USER_LIST_DATA: (state, userListData) => {
      state.userListData = userListData
    }
  },
  actions: {
    GetUserList({ // 获取用户信息列表
      commit,
      state
    }, formData) {
      return new Promise((resolve, reject) => {
        getUserList(formData).then(response => {
          commit('SET_USER_LIST_DATA', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default admin
