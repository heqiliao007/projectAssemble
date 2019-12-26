import axios from 'axios'
// import { baseUrl, ERR_OK } from './config'
import { ERR_OK } from './config'

export function get (url) {
  // params参数
  return function (params = {}) {
    // 避免url参数传递
    return axios.get(url, {
      params
    }).then((res) => {
      // 解构赋值，res.data对象
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {

    })
  }
}
