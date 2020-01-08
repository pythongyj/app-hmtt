/**
 * 用户相关的请求模块
 */
import axios from '@/utils/request'
/**
 * 引入常量
 */
import { LOGIN, MODILE_CODE } from '../constants/user.constants '

/**
 * 用户登录
 */
export const login = data => {
  return axios({
    method: 'POST',
    url: LOGIN,
    data
  })
}

/**
 * 获取短信验证码
 */
export const getSmsCode = mobile => {
  return axios({
    method: 'GET',
    url: MODILE_CODE + mobile
  })
}
