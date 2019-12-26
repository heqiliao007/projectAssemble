// 一些默认参数
export const urlMap = {
  development: '/',
  production: 'http://ustbhuangyi.com/sell/'
}
export const baseUrl = urlMap[process.env.NODE_ENV]
export const ERR_OK = 0
