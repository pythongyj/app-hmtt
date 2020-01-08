// 验证配置模块
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
// 加载中文语言包
import { messages } from 'vee-validate/dist/locale/zh_CN.json'
import * as rules from 'vee-validate/dist/rules'

// // 注册全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示消息
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

// 手机号验证
extend('mobile', {
  validate: value => {
    return /^1(3|5|6|7|8|9)\d{9}$/.test(value)
  },
  message: '{_field_}格式错误'
})

// 验证码 验证
extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式错误'
})
