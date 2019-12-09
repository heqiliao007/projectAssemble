/**
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
  { path: '/homepage', component: _import('modules/HomePages/homepages'), name: 'homepage', meta: { title: '首页' } },
  { path: '/personnel', component: _import('modules/Personnel_management_system/Personnel_management_system'), name: 'personnel', meta: { title: '潜水人员管理' } },
  { path: '/accident', component: _import('modules/Accident_report/Accident_report'), name: 'accident', meta: { title: '潜水事故报告' } },
  { path: '/plan', component: _import('modules/Plan/Plan'), name: 'plan', meta: { title: '计划制定' } },
  { path: '/plan_main',
    component: _import('modules/Plan/Plan_main'),
    name: 'plan_main',
    meta: { title: '计划制定' },
    children: [
      {
        path: '/mission_profile/:id/:type',
        props: true,
        component: _import('modules/Plan/Mission_profile'),
        name: 'mission_profile',
        meta: { title: '任务概况' }
      },
      {path: '/mission_profile', component: _import('modules/Plan/Mission_profile'), name: 'mission_profile1', meta: { title: '任务概况' }},
      { path: '/perform_unit', component: _import('modules/Plan/Perform_unit'), name: 'Perform_unit', meta: { title: '执行单位' } },
      { path: '/plan_equipment', component: _import('modules/Plan/Equipment'), name: 'plan_equipment', meta: { title: '潜水装备' } },
      { path: '/tab_breath', component: _import('modules/Plan/Breath/Tab_breath'), name: 'tab_breath', meta: { title: '呼吸气体' } },
      { path: '/select_breath', component: _import('modules/Plan/Breath/Select_breath'), name: 'select_breath', meta: { title: '选择呼吸气体' } },
      { path: '/diving_program', component: _import('modules/Plan/Diving_program'), name: 'diving_program', meta: { title: '潜水方案' } },
      { path: '/supplies', component: _import('modules/Plan/Supplies'), name: 'supplies', meta: { title: '物资准备' } },
      { path: '/staff_personnel', component: _import('modules/Plan/Staff_personnel'), name: 'staff_personnel', meta: { title: '人员准备' } },
      { path: '/dive_event', component: _import('modules/Plan/Dive_event'), name: 'dive_event', meta: { title: '潜水后事项' } },
      { path: '/experts_ensure', component: _import('modules/Plan/Experts_ensure'), name: 'experts_ensure', meta: { title: '专家保证' } },
      { path: '/risk_control', component: _import('modules/Plan/Risk_control'), name: 'risk_control', meta: { title: '风险控制' } }
    ]
  },
  { path: '/search', component: _import('modules/Plan/Search'), name: 'search', meta: { title: '搜索' } },
  { path: '/equipment', component: _import('modules/Equipment_management/Equipment_management'), name: 'equipment', meta: { title: '潜水装备管理' } },
  { path: '/modify_personnel', component: _import('modules/Personnel_management_system/Modify'), name: 'modify_personnel', meta: { title: '查询/修改 人员' } },
  { path: '/modify_accident', component: _import('modules/Accident_report/Modify'), name: 'modify_accident', meta: { title: '查询/修改 事故' } },
  { path: '/modify_equipment', component: _import('modules/Equipment_management/Modify'), name: 'modify_equipment', meta: { title: '查询/修改  装备' } },
  { path: '/personnel_details/:id', props: true, component: _import('modules/Personnel_management_system/Details_information'), name: 'personnel_details', meta: { title: '人员详情信息' } },
  { path: '/equipment_details', component: _import('modules/Equipment_management/Details_information'), name: 'equipment_details', meta: { title: '装备详情信息' } },
  { path: '/equipment_statistics', component: _import('modules/Equipment_management/Statistics'), name: 'equipment_statistics', meta: { title: '统计分析' } },
  { path: '/personnel_statistics', component: _import('modules/Personnel_management_system/Statistics'), name: 'personnel_statistics', meta: { title: '统计分析' } },
  { path: '/report_statistics', component: _import('modules/Accident_report/Statistics'), name: 'report_statistics', meta: { title: '统计分析' } },
  { path: '/new_report', component: _import('modules/Accident_report/New_report'), name: 'new_report', meta: { title: '人员详情信息' } },

  // 风险控制
  { path: '/risk_main',
    component: _import('modules/Risk/Risk_main'),
    name: 'risk_main',
    meta: { title: '风险制定' },
    children: [
      { path: '/risk_management', component: _import('modules/Risk/Risk_management'), name: 'risk_management', meta: { title: '风险控制' } },
      { path: '/project_information', component: _import('modules/Risk/Project_information'), name: 'project_information', meta: { title: '项目信息' } },
      { path: '/risk_search', component: _import('modules/Risk/Search'), name: 'risk_search', meta: { title: '风险搜索' } },
      { path: '/hazard_identification', component: _import('modules/Risk/Hazard_identification'), name: 'hazard_identification', meta: { title: '识别风险' } },
      { path: '/environmental_factors', component: _import('modules/Risk/Environmental_factors'), name: 'environmental_factors', meta: { title: '环境因素' } },
      { path: '/evaluation_management', component: _import('modules/Risk/Evaluation_management'), name: 'evaluation_management', meta: { title: '评估小结' } },
      { path: '/risk_decision', component: _import('modules/Risk/Risk_decision'), name: 'risk_decision', meta: { title: '风险决策' } },
      { path: '/supervision_and_administration', component: _import('modules/Risk/Supervision_and_administration'), name: 'supervision_and_administration', meta: { title: '监督管理' } },
      { path: '/implementation_of_control', component: _import('modules/Risk/implementation_of_control'), name: 'implementation_of_control', meta: { title: '实施控制' } },
      { path: '/danger_term_inplement', component: _import('modules/Risk/Inplement_control/Term_inplement'), name: 'danger_term_inplement', meta: { title: '逐项实施' } },
      { path: '/secondary_measure', component: _import('modules/Risk/Secondary_measure'), name: 'secondary_measure', meta: { title: '辅助措施' } },
      { path: '/control_and_decision', component: _import('modules/Risk/Control_and_Decision '), name: 'control_and_decision', meta: { title: '逐项控制和决策' } },
      { path: '/management_review', component: _import('modules/Risk/Management_review'), name: 'management_review', meta: { title: '记录风险管理过程' } },
      { path: '/management_process', component: _import('modules/Risk/Management_process'), name: 'management_process', meta: { title: '管理审核' } },
      { path: '/check_and_inplement', component: _import('modules/Risk/Check/Check_and_inplement'), name: 'check_and_inplement', meta: { title: '查对落实' } }
    ]
  },
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'login' },
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
      next({ name: 'login' })
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

router.beforeEach((to, from, next) => {
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
    }).then(({data}) => {
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
      router.push({ name: 'login' })
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
        } catch (e) {}
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
    // console.log('\n')
    // console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    // console.log(mainRoutes.children)
    // console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
