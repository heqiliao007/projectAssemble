/* jshint esversion: 6 */
/**
 *
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {
    path: '/home_Page',
    redirect: '/home',
    component: _import('common/homePage/home_Page'),
    name: 'home_Page',
    children: [
      { path: '/home', component: _import('common/homePage/home_index'), name: 'home_index', meta: { title: '首页', isTab: true } },
      { path: '/login', component: _import('common/homePage/logins'), name: 'login', meta: { title: '登录', isTab: true } },
      { path: '/register', component: _import('common/homePage/home_register'), name: 'home_register', meta: { title: '注册', isTab: true } },
      { path: '/home_we', component: _import('common/homePage/home_we'), name: 'home_we', meta: { title: '了解我们', isTab: true } },
    ],
  },

  { path: '/add_product', component: _import('common/homePage/add_product'), name: 'add_product', meta: { title: 'Demo' } },

  { path: '/home_modul', redirect: '/home', component: _import('common/hModul/home_modul'), name: 'home_modul', meta: { title: '选择模块' } },
  { path: '/box_office/salesAnalysis/cinemaChainDetails', component: _import('common/boxOffice/salesAnalysis/cinemaChainDetails'), name: '院线详情', meta: { title: '院线详情' } },
  {
    path: '/recommend',
    component: _import('common/recommend/home'),
    name: 'recommond-home',
    //电影智库
    children: [
      { path: '/box_office/recommond/recommond', component: _import('common/boxOffice/recommond/recommond'), name: '智库推荐', meta: { title: '智库推荐', isTab: true } },
      { path: '/box_office/salesAnalysis/anlysis', component: _import('common/boxOffice/salesAnalysis/analysis'), name: 'analysis', meta: { title: '影片', isTab: true } },
      { path: '/box_office/salesAnalysis/cinema', component: _import('common/boxOffice/salesAnalysis/cinema'), name: '影院', meta: { title: '影院', isTab: true } },
      { path: '/box_office/salesAnalysis/shadow', component: _import('common/boxOffice/salesAnalysis/shadow'), name: 'shadow', meta: { title: '影投', isTab: true } },
      { path: '/box_office/salesAnalysis/province', component: _import('common/boxOffice/salesAnalysis/province'), name: '省份', meta: { title: '省份', isTab: true } },
      { path: '/box_office/salesAnalysis/overseas', component: _import('common/boxOffice/salesAnalysis/overseas'), name: '海外票房', meta: { title: '海外票房', isTab: true } },
      { path: '/box_office/salesAnalysis/city', component: _import('common/boxOffice/salesAnalysis/city'), name: 'city', meta: { title: '城市', isTab: true } },
      { path: '/box_office/salesAnalysis/market', component: _import('common/boxOffice/salesAnalysis/market'), name: '大盘', meta: { title: '大盘', isTab: true } },
      { path: '/box_office/salesAnalysis/cinemaChain', component: _import('common/boxOffice/salesAnalysis/cinemaChain'), name: 'cinemaChain', meta: { title: '院线', isTab: true } },
      { path: '/box_office/marketing/marketing', component: _import('common/boxOffice/marketing/marketing'), name: '认知指数值榜', meta: { title: '认知指数值榜', isTab: true } },
      { path: '/box_office/marketing/buy', component: _import('common/boxOffice/marketing/buy'), name: '购票指数榜', meta: { title: '购票指数榜', isTab: true } },
      { path: '/box_office/marketing/praise', component: _import('common/boxOffice/marketing/praise'), name: '口碑指数榜', meta: { title: '口碑指数榜', isTab: true } },
      { path: '/box_office/invest/trend', component: _import('common/boxOffice/invest/trend'), name: '类型趋势', meta: { title: '类型趋势', isTab: true } },
      { path: '/box_office/invest/record', component: _import('common/boxOffice/invest/record'), name: '电影备案', meta: { title: '电影备案', isTab: true } },
      { path: '/box_office/invest/production', component: _import('common/boxOffice/invest/production'), name: '制作中', meta: { title: '制作中', isTab: true } },
      { path: '/box_office/industry/corporateEarnings', component: _import('common/boxOffice/industry/corporateEarnings'), name: '公司财报', meta: { title: '公司财报', isTab: true } },
      { path: '/box_office/industry/characterRanking', component: _import('common/boxOffice/industry/characterRanking'), name: '人物排行', meta: { title: '人物排行', isTab: true } },
      { path: '/box_office/industry/actorAppeal', component: _import('common/boxOffice/industry/actorAppeal'), name: '演员号召力', meta: { title: '演员号召力', isTab: true } },
      { path: '/box_office/industry/institutionalRanking', component: _import('common/boxOffice/industry/institutionalRanking'), name: '机构排行', meta: { title: '机构排行', isTab: true } },
      { path: '/box_office/arrange/film', component: _import('common/boxOffice/arrange/film'), name: '影片', meta: { title: '影片', isTab: true } },
      { path: '/box_office/arrange/region', component: _import('common/boxOffice/arrange/region'), name: '地域', meta: { title: '地域', isTab: true } },
      { path: '/box_office/arrange/city', component: _import('common/boxOffice/arrange/city'), name: '城市', meta: { title: '城市', isTab: true } },
      { path: '/box_office/arrange/chians', component: _import('common/boxOffice/arrange/chians'), name: '院线', meta: { title: '院线', isTab: true } },
      { path: '/box_office/arrange/invest', component: _import('common/boxOffice/arrange/invest'), name: '影投', meta: { title: '影投', isTab: true } },
      { path: '/box_office/arrange/investDails/:shadowCastId', props: true, component: _import('common/boxOffice/arrange/investDails'), name: '影投详情', meta: { title: '影投详情', isTab: false } },
      { path: '/box_office/arrange/provencevDails', component: _import('common/boxOffice/arrange/provencevDails'), name: '省份详情', meta: { title: '省份详情', isTab: false } },
      { path: '/box_office/arrange/theater', component: _import('common/boxOffice/arrange/theater'), name: 'box-office-arrange-theater', meta: { title: '影院', isTab: true } },
      { path: '/box_office/arrange/time', component: _import('common/boxOffice/arrange/time'), name: '时段', meta: { title: '时段', isTab: true } },
      { path: '/box_office/issue/release', component: _import('common/boxOffice/issue/release'), name: '将上映', meta: { title: '将上映', isTab: true } },
      { path: '/box_office/issue/showing', component: _import('common/boxOffice/issue/showing'), name: '热映中', meta: { title: '热映中', isTab: true } },
      { path: '/box_office/intelligence/intelligence', component: _import('common/boxOffice/intelligence/intelligence'), name: '影院情报', meta: { title: '影院情报' } },
      { path: '/Advertising/advertising', component: _import('common/Advertising/advertising'), name: '电影植入', meta: { title: '电影植入' } },
      { path: '/video', component: _import('common/video/video'), name: 'video', meta: { title: '详情页', isTab: true } },
      { path: '/movieDetails', component: _import('common/video/movieDetails'), name: '影院详情', meta: { title: '影院详情', isTab: false } },
    ]
  },
  // 视频智库
  {
    path: '/videoTank',
    component: _import('common/recommend/home'),
    name: 'viedeoTank-Home',
    children: [
      { path: '/videoTank/drama', component: _import('common/videoTank/drama'), name: '剧集', meta: { title: '剧集', isTab: true } },
      { path: '/videoTank/movie', component: _import('common/videoTank/movie'), name: '电影', meta: { title: '电影', isTab: true } },
      { path: '/videoTank/variety', component: _import('common/videoTank/variety'), name: '综艺', meta: { title: '综艺', isTab: true } },
      { path: '/videoTank/comic', component: _import('common/videoTank/comic'), name: '动漫', meta: { title: '动漫', isTab: true } },
      { path: '/videoTank/type', component: _import('common/videoTank/type'), name: '类型分析', meta: { title: '类型分析', isTab: true } },
      { path: '/videoTank/typeTrend', component: _import('common/videoTank/typeTrend'), name: 'typeTrend', meta: { title: '类型趋势', isTab: true } },
      { path: '/videoTank/personAdvator', component: _import('common/videoTank/personAdvator'), name: '人群画像', meta: { title: '人群画像', isTab: true } },
      { path: '/videoTank/total', component: _import('common/videoTank/total'), name: '总榜', meta: { title: '总榜', isTab: true } },
      { path: '/videoTank/exponent', component: _import('common/videoTank/exponent'), name: '指数榜', meta: { title: '指数榜', isTab: true } },
      { path: '/videoTank/mechanism', component: _import('common/videoTank/mechanism'), name: '机构榜', meta: { title: '机构榜', isTab: true } },
      { path: '/videoTank/broadcast', component: _import('common/videoTank/broadcast'), name: '播出情报', meta: { title: '播出情报', isTab: true } },
      { path: '/Advertising/advertisement', component: _import('common/Advertising/advertisement'), name: '剧集植入', meta: { title: '剧集植入', isTab: true } },
      { path: '/Advertising/wait', component: _import('common/Advertising/wait'), name: 'IP调性分析', meta: { title: 'IP调性分析', isTab: true } },
      { path: '/Advertising/analyze', component: _import('common/Advertising/advariety'), name: '综艺植入', meta: { title: '综艺植入', isTab: true } }
    ]
  },
  // 百科词条
  {
    path: '/wikipedia',
    component: _import('common/recommend/home'),
    name: 'wikipedia-Home',
    children: [
      { path: '/wikipedia/index', component: _import('common/wikipedia/index'), name: '文化百科', meta: { title: '文化百科', isTab: true } },
      { path: '/wikipedia/draft', component: _import('common/wikipedia/draft'), name: '草稿箱', meta: { title: '草稿箱', isTab: true } },
      { path: '/wikipedia/collection', component: _import('common/wikipedia/collection'), name: '我的收藏', meta: { title: '我的收藏', isTab: true } },
      { path: '/wikipedia/policiesRegulations', component: _import('common/wikipedia/policiesRegulations'), name: '政策法规', meta: { title: '政策法规', isTab: true } },
      { path: '/wikipedia/keyLeader', component: _import('common/wikipedia/keyLeader'), name: '重要领导人语录', meta: { title: '重要领导人语录', isTab: true } },
      { path: '/wikipedia/anaDetails', component: _import('common/wikipedia/anaDetails'), name: '重要领导人语录详情', meta: { title: '重要领导人语录详情', isTab: true } },
      { path: '/wikipedia/createMovie', component: _import('common/wikipedia/create/createMovie'), name: '创建', meta: { title: '创建', isTab: true } },
      { path: '/wikipedia/analysis', component: _import('common/wikipedia/analysis/index'), name: '自助分析', meta: { title: '自助分析', isTab: true } }
    ]
  },
  // 网络文学
  {
    path: '/networkLiterature',
    component: _import('common/recommend/home'),
    name: 'networkLiterature-Home',
    children: [
      { path: '/videoTank/dramaDail', component: _import('common/videoTank/dramaDail'), name: '剧集详情', meta: { title: '剧集详情', isTab: false } },
      { path: '/networkLiterature/index', component: _import('common/networkLiterature/index'), name: '文学类型', meta: { title: '文学类型', isTab: true } },
      { path: '/networkLiterature/worksRanking', component: _import('common/networkLiterature/worksRanking'), name: '作品排行', meta: { title: '作品排行', isTab: true } },
      { path: '/networkLiterature/netAnalysis', component: _import('common/networkLiterature/netAnalysis'), name: '网文分析', meta: { title: '网文分析', isTab: true } },
      { path: '/networkLiterature/networksDails', component: _import('common/networkLiterature/networksDails'), name: 'literatureType', meta: { title: '文学类型', isTab: false } },
      { path: '/networkLiterature/literaryWorks', component: _import('common/networkLiterature/literaryWorks'), name: '文学作品', meta: { title: '文学作品', isTab: true } },
      { path: '/networkLiterature/signingPlatform', component: _import('common/networkLiterature/signingPlatform'), name: '签约平台', meta: { title: '签约平台', isTab: true } },
      { path: '/cityDetails', component: _import('common/video/cityDetails'), name: 'cityDetails', meta: { title: '城市详情' } },
      { path: '/takeWay', component: _import('common/video/takeWay'), name: 'takeWay', meta: { title: '服化道' } },,
      { path: '/anaphasis', component: _import('common/video/anaphasis'), name: 'anaphasis', meta: { title: '后期' } },
    ]
  },
  // 剧本
  {
    path: '/playblack',
    component: _import('common/recommend/home'),
    name: 'wikipedia-Home',
    children: [
      { path: '/playblack/goodsblack', component: _import('common/playblack/goodsblack'), name: '剧本精品库', meta: { title: '剧本精品库', isTab: true } },
      { path: '/playblack/outlineblack', component: _import('common/playblack/outlineblack'), name: '剧本概要库', meta: { title: '剧本概要库', isTab: true } },
      { path: '/playblack/analysis', component: _import('common/playblack/analysis'), name: '分析报告', meta: { title: '分析报告', isTab: true } },
      { path: '/playblack/particulars', component: _import('common/playblack/particulars'), name: '详情', meta: { title: '剧本精品库', isTab: true } }
    ]
  },
  // 评价体系
  {
    path: '/playblack',
    component: _import('common/recommend/home'),
    name: 'wikipedia-Home',
    children: [
      { path: '/evaluationSystem/invest', component: _import('common/evaluationSystem/invest'), name: '投资风向', meta: { title: '投资风向', isTab: true } },
      { path: '/evaluationSystem/ipValue', component: _import('common/evaluationSystem/ipValue'), name: 'IP价值指数', meta: { title: 'IP价值指数', isTab: true } }
    ]
  },
   // 数据日报
  {
    path: '/playblack',
    component: _import('common/recommend/home'),
    name: 'wikipedia-Home',
    children: [
      { path: '/datadaily/dataDaily', component: _import('common/datadaily/dataDaily'), name: '数据日报', meta: { title: '数据日报', isTab: true } },
    ]
  },

  { path: '/searchList', component: _import('common/searchList/searchList'), name: '高级搜索', meta: { title: '搜索列表', isTab: true } },
  { path: '/contrastDetails', component: _import('common/boxOffice/contrast/contrastDetails'), name: 'contrastDetails', meta: { title: '对比详情', isTab: true } },
  { path: '/moreIndicators', component: _import('common/moreIndicators/more_indicators'), name: 'more_indicators', meta: { title: '更多指标', isTab: false } },
  { path: '/cinemaDetails', component: _import('common/video/cinemaDetails'), name: 'cinemaDetails', meta: { title: '院线详情' } },
  { path: '/actor', component: _import('common/wikipedia/actor'), name: '演员资料', meta: { title: '演员资料', isTab: true } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home_Page' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
    { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } }
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'home_Page' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})
// const router = new Router({
//   mode: 'history',
//   scrollBehavior: (to, from, savedPosition) => {
//     if (to.hash) {
//       return {
//         selector: to.hash
//       }
//     }
//   },
//   isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
//   routes: globalRoutes.concat(mainRoutes)
// })
router.beforeEach((to, from, next) => {
  next()
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({ data }) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'home_Page' })
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) { }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

router.beforeEach((to, from, next) => {
  document.title = (to.meta && to.meta.title) || 'ZFJ_PRO'
  next()
})

export default router
