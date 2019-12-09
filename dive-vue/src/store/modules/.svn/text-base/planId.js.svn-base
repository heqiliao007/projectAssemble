let localPlanId = ''
// let localexistId = ''
try {
  if (sessionStorage.getItem('vuex')) {
    // 取出
    localPlanId = JSON.parse(sessionStorage.getItem('vuex')).planId
    // localexistId = JSON.parse(sessionStorage.getItem('vuex')).existId
  }
} catch (e) {}
export default {
  namespaced: true,
  state: {
    planId: localPlanId,
    // 本身存在的id
    existId: '',
    planType: ''
  },
  mutations: {
    changePlanId (state, planId) {
        // 公共数据state=传过来的planId
      state.planId = planId
    },
    changeExistId (state, existId) {
        // 公共数据state=传过来的existId
      state.existId = existId
    },
    changePlanType (state, planType) {
        // 公共数据state=传过来的existId
      state.planType = planType
    }
  }
}
