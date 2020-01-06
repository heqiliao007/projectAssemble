export default {
  changeCity (state, city) {
    // 公共数据state=传过来的city
    state.city = city
    try {
      // 本地存储city目的是页面的city不变
      localStorage.city = city
    } catch (e) {}
  },
  changeCity1 (state, city) {
    // 公共数据state=传过来的city
    state.city = '111'
  }
}
