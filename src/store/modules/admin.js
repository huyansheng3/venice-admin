import {
  login,
  logout,
  getInfo,
} from '@/api/login'
import {
  createUser,
  getAdminList,
  editAdminInfo,
  authorizedAdmin,
  getAdminInfo,
  delectAdmin,
  getStatisData
} from '@/api/admin'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const admin = {
  state: {
    userData: null,
    adminData: null,
  },
  mutations: {
    SET_USER_DATA: (state, userData) => {
      state.userData = userData
    },
    SET_ADMIN_DATA: (state,adminData) => {
      state.adminData = adminData
    }
  },
  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username.trim(), userInfo.password).then(response => {
          setToken(response.Data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    },token) {
      return new Promise((resolve, reject) => {
        getInfo(token).then(response => {
          commit('SET_USER_DATA', response.Data)
          resolve(response.Data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_USER_DATA', null)
        removeToken()
        resolve()
      })
    },

    // 创建管理员
    CreateUser({
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        createUser(formData).then(response=>{
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 管理员列表
    AdminList({
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        getAdminList(formData).then(response=>{
          commit('SET_ADMIN_DATA',response);
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 编辑管理员
    EditAdminInfo({
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        editAdminInfo(formData).then(response=>{
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 审核管理员
    AuthorizedAdmin({
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        authorizedAdmin(formData).then(response=>{
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 管理员信息
    AdminInfo({
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        getAdminInfo(formData).then(response=>{
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除管理员信息
    DeleteAdmin({
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        delectAdmin(formData).then(response=>{
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
     // 统计信息
     GetStatisData({
      commit,
      state
    },formData) {
      return new Promise((resolve, reject) => {
        getStatisData(formData).then(response=>{
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default admin
