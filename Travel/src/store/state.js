let defaultCity = '北京'
try {
  if (localStorage.city) {
    // 取出
    defaultCity = localStorage.city
  }
} catch (e) {}

export default {
  city: defaultCity
}
