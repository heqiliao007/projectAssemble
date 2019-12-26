import Vue from 'vue'
import './cube-ui'
import './register'
import App from './App.vue'
import router from './router'
import store from './store'

// import './src/common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
