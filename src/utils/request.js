import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
})

const user = store.state.user

// request拦截器
service.interceptors.request.use(config => {
  config.data = {...config.data, ...user};
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    if (response.status === 200) {
      if (response.data.status === 'SUCCESS') {
        return response.data.data
      } else {
        Message({
          message: response.data.retMsg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(response.data.retMsg)
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.Message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service