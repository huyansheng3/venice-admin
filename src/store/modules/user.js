import {
  loginApp
} from '@/api/user'
import Cookies from 'js-cookie'
import router from '@/router'

const defaultInfo = {
  "equipmentNo": "123",
  "sourceType": "IOS",
  // "userNo": "1@wuyongshi.top",
  // "userPassword": "123456"
}

let userInfo = {}
try {
  userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user'));
} catch (e) {
  console.error(e);
}

const user = {
  state: {
    ...defaultInfo,
    sessionUuid: '',
    ...userInfo
  },
  getters: {
    isAuth(state) {
      return Boolean(state.sessionUuid) && Boolean(state.userNo)
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state = { ...state,
        ...payload
      }
    },
    resetUserInfo(state) {
      state.sessionUuid = ''
      state.userNo = ''
    }
  },
  actions: {
    async login({
      commit
    }, payload) {
      const result = await loginApp({ ...defaultInfo,
        ...payload
      })
      Cookies.set('user', result);
      commit('setUserInfo', result)
    },
    logout({
      commit
    }) {
      Cookies.remove('user');
      commit('resetUserInfo')
      router.push({
        name: 'login'
      })
    }
  }
}

export default user
