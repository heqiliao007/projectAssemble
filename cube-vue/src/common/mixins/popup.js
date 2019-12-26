// 弹层 给抽象出来
const EVENT_SHOW = 'show'
const EVENT_HIDE = 'hide'

export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$emit(EVENT_SHOW)
    },
    hide () {
      this.visible = false
      // 派发这个事件
      this.$emit(EVENT_HIDE)
    }
  }
}
