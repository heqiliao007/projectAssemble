import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import sidebar from './modules/sidebar'
import planId from './modules/planId'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    common,
    user,
    sidebar,
    planId
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (data) {
      return {
        // 设置只储存state中的某些数据
        planCurIndex: data.sidebar.planCurIndex,
        riskCurIndex: data.sidebar.riskCurIndex,
        planId: data.planId.planId
        // existId: data.planId.existId
      }
    }
  })],
  strict: process.env.NODE_ENV !== 'production'
})
