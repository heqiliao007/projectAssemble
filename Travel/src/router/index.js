import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/Home'
// import City from '@/components/city/City'
// import Detail from '@/components/detail/Detail'

Vue.use(Router)
// 异步组件拆分 
// 当app.js少的时候不建议异步组件拆分 会额外发起http请求 代价大于js文件
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/home/Home')
    }, {
      path: '/city',
      name: 'City',
      component: () => import('@/components/city/City')
    }, {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import('@/components/detail/Detail')
    }],
  // 滚动行为
  // 保持原先的滚动位置，就像重新加载页面 只在支持 history.pushState 的浏览器中可用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
