import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Components from '@/components'
import '@/utils/register-vant'
// 动态设置 REM 基准值
import 'amfe-flexible'
// 加载表单验证的插件设置
import '@/utils/validation'
import '@/styles/index.css'

Vue.use(Components)
// 把封装好的axios 设置到 Vue的原型 链 上
// Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
