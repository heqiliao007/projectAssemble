<template>
  <div class="showDataCard  row-m20-p20">


    <div class="cardCount">
      <div class="title_chard">
        <div class="row-m20-p20">
          <span>票房基础数据(当日)</span>
        </div>
      </div>

      <ul>
        <li>
          <div class="card_1">
            <p class="el-icon-s-marketing"><span>票房(万)</span></p>
            <p><span>{{card.sumbox_office.sumbox_office}}</span></p>
            <p><i v-bind:class="[card.sumbox_office.up ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i><span>{{card.sumbox_office.box_office_ratio}}%</span><span>对比昨天</span>
            </p>
          </div>
        </li>
        <li>
          <div class="card_2">
            <p class="el-icon-video-camera-solid"><span>场次(场)</span></p>
            <p><span>{{card.sumplaytimes.sumplaytimes}}</span></p>
            <p><i v-bind:class="[card.sumplaytimes.up ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i><span>{{card.sumplaytimes.playtime_ratio}}%</span><span>对比昨天</span>
            </p>
          </div>
        </li>
        <li>
          <div class="card_3">
            <p class="el-icon-s-custom"><span>人次(万)</span></p>
            <p><span>{{card.sumperson_time.sumperson_time}}</span></p>
            <p><i v-bind:class="[card.sumperson_time.up ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i><span>{{card.sumperson_time.person_time_ratio}}%</span><span>对比昨天</span>
            </p>
          </div>
        </li>
        <li>
          <div class="card_4">
            <div>
              <label @click.stop.prevent="clickMonth()"><span>{{showDate}}</span><span
                class="el-icon-caret-bottom"></span></label>
              <el-date-picker ref="month"
                              v-model="selectMonth"
                              type="month"
                              placeholder="选择月"
                              width="0"
              >
              </el-date-picker>
            </div>
            <div>
              <el-calendar v-model="initValue"></el-calendar>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <br/>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'info-card-change',
    data () {
      return {
        setClass: {
          up: false,
          down: false
        },
        month: {date: '', format: moment().format('YYYY-MM-DD')},
        responseData: {},
        card: {
          sumbox_office: {sumbox_office: '加载中...', box_office_ratio: '0', up: true},
          sumplaytimes: {sumplaytimes: '加载中...', playtime_ratio: '0', up: true},
          sumperson_time: {sumperson_time: '加载中...', person_time_ratio: '0', up: true}
        },
        selectMonth: null,
        initValue: new Date()
      }
    },
    methods: {
      clickMonth () {
        let moth = this.$refs.month
        moth.focus()
      },
      async getDatas () {
        return this.$http({
          url: this.$http.adornUrl('/web/boxoffice/cumulativeboxoffice/' + this.month.format),
          method: 'post'
        }).then(({data}) => {
          return data.cumulativeBoxOffice[0]
        }).then((obj) => {
          this.card.sumbox_office.sumbox_office = (obj.sumbox_office / 10000).toFixed(0)
          this.card.sumplaytimes.sumplaytimes = obj.sumplaytimes
          this.card.sumperson_time.sumperson_time = (obj.sumperson_time / 10000).toFixed(0)
        })
      },
      async dailysta () {
        return this.$http({
          // url: this.$http.adornUrl('/web/boxoffice/dailysta/' + this.month.format),
          url: this.$http.adornUrl('/web/boxoffice/dailysta'),  /* todo 没有发送日期；  */
          method: 'post'
        }).then(({data}) => {
          return data.data
        }).then((obj) => {
          this.card.sumbox_office.up = (this.card.sumbox_office.box_office_ratio = +obj.box_office_ratio) >= 0
          this.card.sumplaytimes.up = (this.card.sumplaytimes.playtime_ratio = +obj.playtime_ratio) >= 0
          this.card.sumperson_time.up = (this.card.sumperson_time.person_time_ratio = +obj.person_time_ratio) >= 0
          return obj
        }).then((obj) => {
          //环比数据，不知道是今天还是环比的那天;
          // this.card.sumbox_office.sumbox_office = (obj.box_office / 10000).toFixed(0)
          // this.card.sumplaytimes.sumplaytimes = obj.playtime
          // this.card.sumperson_time.sumperson_time = (obj.person_time / 10000).toFixed(0)
          return obj
        })
      }
    },
    mounted () {
      this.getDatas().then(() => {
        this.dailysta()
      }).catch((e) => {
        console.log(e)
      })
    },
    computed: {
      showDate () {
        return moment(this.initValue).format('YYYY-MM')
      }
    },
    watch: {
      'initValue' (n, old) {
        this.month.format = moment(n).format('YYYY-MM-DD')
				this.$parent.getBoxoffice(this.month.format);
        this.dailysta()
      },
      'selectMonth' (n, old) {
        this.initValue = this.selectMonth
      }
    }
  }
</script>

<style scoped lang="scss">


  .showDataCard {
    /*position: relative;*/
    overflow: auto;
    padding-top: 25px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: inline-block;
        width: 25%;
        float: left;
        /*background-color: red;*/
        background-color: #f5f5f5;
      }
    }

    .cardCount {

      text-align: center;
      /*height: 200px;*/

      .title_chard {
        /*导航标题文字样式*/
        z-index: 2;
        position: absolute;

        * {
          padding: 0;
          margin: 0;
        }

        color: #636363;
        font-size: 18px;
        /*font-weight: bolder;*/
      }

      li {
        height: 215.4px; //设置高度
        position: relative;
      }

      li > div {
        position: absolute;
        width: 96%;
        /*margin: 0 auto;*/
        background-color: #ffffff;
        bottom: 0px;
        padding: 1em;
      }

      li > div {
        //card里面的通用样式设置样式
        border-radius: 3px;
        color: #b3b3b3;

        p {
          /*line-height: 1rem;*/
          /*font-weight: bold;*/
          margin: .3em 0;
        }

        > p:nth-of-type(1) {
          font-size: 16px;

          span {
            padding-left: .5em;
          }
        }

        > p:nth-of-type(2) {
          font-size: 38px;
          font-weight: bolder;
        }

        > p:nth-of-type(3) {
          color: #000000;
          font-size: 18px;

          span:first-of-type {
            padding-left: .2em;
          }

          span:last-of-type {
            padding-left: .5em;
            font-weight: bold;
          }
        }
      }

      .card_1 {
        p:nth-of-type(2) {
          color: #f05757;
        }
      }

      .card_2 {
        p:nth-of-type(2) {
          color: #0096dc;
        }
      }

      .card_3 {
        p:nth-of-type(2) {
          color: #b451ca;
        }
      }

    }

    .el-icon-caret-top, .el-icon-caret-top + span {
      color: red;

    }

    .el-icon-caret-bottom, .el-icon-caret-bottom + span {
      color: #00d300;
    }

  }

</style>
<style lang="scss">

  .showDataCard {

    .card_4 {

      > div {
        /*text-align: center;*/
        width: 95%;
        /*height:100%;*/
        margin: 0 auto;
        /*div[class='el-button-group']>button:nth-last-of-type(1){*/
        /*//隐藏下一个月*/
        /*display: none;*/
        /*}*/
      }

      > div:first-of-type {
        /*标题选择月份*/
        background-color: white;
        position: relative;

        .el-input {
          /*隐藏输入框;*/
          position: absolute;
          padding: 0 0;
          left: 0px;
          top: -4em;
          z-index: -1;
        }

        span:nth-of-type(1) {
          font-size: 20px;
        }

        span:nth-of-type(2) {
          vertical-align: text-top;
          padding-left: .3em;
          color: inherit;
        }

      }

      > div:last-of-type {
        .el-calendar {
          /*height:100%;*/
          width: 100%;

          .el-calendar__body {
            padding: 0;
          }

          .el-calendar__header {
            padding: 0;
          }
        }

        .el-calendar-table {
          width: inherit;
          margin: auto auto;
          /*padding-bottom: 10px; // 时间的白色底部靠上;*/

          .el-calendar-day {
            //高度继承继承父元素
            height: inherit;
          }

          thead {
            th {
              color: #0084cf;
              font-weight: bold;
              text-align: center;
              padding: 13px 3px; //调整星期间隔
              width: 13.2%; //调整宽度;
            }
          }

          .is-selected {
            //选中后的样式;
            border-radius: 300px;
            /*border: 1px solid #40a9ff;*/
            background-color: #40a9ff;
            color: white;
          }
        }

        .el-calendar__header {
          //隐藏头部
          display: none;
        }

        .el-calendar__body {
          //调整表格样式
          td {
            border: none;

            .el-calendar-day {
              padding: 2px 7px; //调整日期宽度的间隔
              margin: auto 3px;

              span {
              }
            }
          }
        }

      }
    }

    /*.popper__arrow{*/
    /*display: none;*/
    /*}*/

  }

</style>
