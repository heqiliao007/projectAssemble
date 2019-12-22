import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
// 轮播图
export function getRecommend() {
//   const url = 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg'
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // Object.assign方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象（ target ）。方法里第一个{ }是目标对象。
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  // 这里返回一个promise对象
  return jsonp(url, data, options)
}
// 歌单
// config文件夹下index.js中的proxyTable只是用于解决跨域问题，但这次的不只是跨域问题，而是跨域+host以及referer的限制！如果只是跨域问题，那么jsonp就足以解决！从纯前端的角度，我们是无法修改host和referer的，如何改变host和referer？
// 亲测可用的解决办法：axios+devServer配置
// 调用代理接口
export function getDistList() {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const url = 'api/getDistList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    platform: 'yqq.json',
    loginUin: 0,
    hostUin: 0,
    sin: 0,
    ein: 19,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
    // platform: 'yqq',
    // hostUin: 0,
    // sin: 0,
    // ein: 29,
    // sortId: 5,
    // needNewCode: 0,
    // categoryId: 10000000,
    // rnd: Math.random()
  })
  // 这里返回一个promise对象
  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}