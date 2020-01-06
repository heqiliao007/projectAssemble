import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

// localStorage最好使用try catch
export default new Vuex.Store({
  // state: {
  //   //1. city: localStorage.city || '北京'
  //   //2. city: defaultCity
  //   3.city: state
  // },
  // 进一步简化
  state,
  // actions: {
  //   //   上下文ctx
  //   changeCity (ctx, city) {
  //   action调用mutation要通过commit这个方法
  //     ctx.commit('changeCity', city)
  //   }
  // },
  // 没有异步操作的时候组件可以直接调用mutations不用actions转发
  // mutations: {
  //   mutations
  // }
  mutations,
  // vuex里getters的作用类似computed计算属性的作用 缓存数据
  getters: {
    doubleCity (state) {
      return state.city + ' ' + state.city
    }
  }
})
