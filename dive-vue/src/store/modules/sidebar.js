let localPlan = 0
let localRisk = 0
try {
  if (sessionStorage.getItem('vuex')) {
    // 取出
    localPlan = JSON.parse(sessionStorage.getItem('vuex')).planCurIndex
    localRisk = JSON.parse(sessionStorage.getItem('vuex')).riskCurIndex
  }
} catch (e) {}
export default {
  namespaced: true,
  state: {
    planCurIndex: localPlan,
    riskCurIndex: localRisk
    // curIndex: 0
  },
  mutations: {
    changePlanIndex (state, planCurIndex) {
        // 公共数据state=传过来的index
      // console.log(planCurIndex)
      state.planCurIndex = planCurIndex
    },
    changeRiskIndex (state, riskCurIndex) {
        // 公共数据state=传过来的index
      // console.log(riskCurIndex)
      state.riskCurIndex = riskCurIndex
    }

  }
}
