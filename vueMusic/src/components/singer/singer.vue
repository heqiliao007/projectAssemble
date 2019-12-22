<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

// 数据前10条为热门
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  name: 'Singer',
  data() {
    // singer:[]
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          // this.singers = res.data.list
          this.singers = this._normolizeSinger(res.data.list)
          console.log(this.singers)
          // console.log(this._normolizeSinger(this.singers))
        }
      })
    },
    // 规范化数组
    _normolizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          // 热门条数小于10条就push进数组 需要id和name 头像
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
            // avator: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger.mid}.jpg?max_age=2592000`
          }))
        }
        // 做一个聚合 把Findex相同的聚合
        const key = item.Findex
        if (!map[key]) {
          // 如果没有Findex 就创建一个对象赋值给map[key]
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
          // avator: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger.mid}.jpg?max_age=2592000`
        }))
      })
      console.log(map)
      // 为了得到有序列表，我们需要处理map
      let hot = [] // 热门
      let ret = [] // 剩下的
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 排序 按字母升序
      // 即若返回值大于0的时候交换a与b的位置，其他情况位置不变。
      // 所以，得出结论：
      // 升序：return a - b
      // 降序：return b - a
      ret.sort((a, b) => {
        // charCodeAt 第一个字符的下标开始是0。如果index是负数，或者大于等于字符串的长度，则返回NaN。 返回指定位置的字符的Unicode编码
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      console.log(ret)
      // 连接两个或多个数组 一维
      console.log(hot.concat(ret))

      return hot.concat(ret)
    }
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>