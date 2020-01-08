import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    // 把token 保存 到user上
    setUser (state, data) {
      state.user = data
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
