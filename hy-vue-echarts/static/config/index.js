/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {}

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://222.73.81.124:8521/'
  // http://222.73.81.124:8521/
  // window.SITE_CONFIG['baseUrl'] = 'http://127.0.0.1:8521/'
  // window.SITE_CONFIG['baseUrl'] = 'http://10.114.55.108:8521/'
  // window.SITE_CONFIG['baseUrl'] = 'http://47.96.118.190:8521/'
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['version'] = '' // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})()
