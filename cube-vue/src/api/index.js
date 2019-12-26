// 导入get方法
import { get } from './helpers'

const getSeller = get('api/seller')
const getGoods = get('api/goods')
const getRatings = get('api/ratings')

// 再导出这些接口方法
export {
  getSeller,
  getGoods,
  getRatings
}
