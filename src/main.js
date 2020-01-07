import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Components from '@/components'
import '@/utils/register-vant'
import 'amfe-flexible'
import '@/utils/request'

Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
