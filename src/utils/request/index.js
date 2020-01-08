import axios from 'axios'
import jsonBig from 'json-bigint'
// import { BASE_URL } from '@/constants/base.constants '
import { BASE_URL } from '@/constants/base.constants'

import store from '@/store'

// 自定义实例默认值
const request = axios.create({
  baseURL: BASE_URL
})

// 处理请求参数（id）超出js的安全数值范围 问题
request.defaults.transformResponse = [
  function (data) {
    try {
      return jsonBig.parse(data)
    } catch (error) {
      return {}
    }
  }
]

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const user = store.state.user
    // let token = window.localStorage.getItem('user-token')
    // config 请求参数的配置
    // 统一注入token
    if (user) {
      config.headers.Authorization = `Bearer ${user}`
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data ? response.data : {}
  }, function (error) {
    // 对响应错误做点什么
    // let status = error.response.status
    // let message = error.response.statusText
    // this.Notify({ type: 'warning', message: status + message })
    return Promise.reject(error)
  }
)

export default request
