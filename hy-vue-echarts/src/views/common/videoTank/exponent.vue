<template>
  <div>
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-button :type="exponent === 'baidu' ? 'primary' : ''" size="small" @click="chooseExponent('baidu')">百度指数</el-button>
        <el-button :type="exponent === 'wechat' ? 'primary' : ''" size="small" @click="chooseExponent('wechat')">微信指数</el-button>
        <el-button :type="exponent === 'microblog' ? 'primary' : ''" size="small" @click="chooseExponent('microblog')">微博指数</el-button>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">剧集指数榜 <span style="font-size: 16px;color: #666666;margin-left: 23px;" v-show="startDate && endDate">{{startDate}} —— {{endDate}}</span></p>
          <el-button :type="tableDataparams1.attribute == '' ? 'primary' : ''" style="float: left;margin-top: 16px;margin-left: 132px; border-radius: 22px;" size="small" @click="chooseAttribute({type: '1', id: ''})">全部</el-button>
          <div  v-for="item in listAll1" :key="item.code">
            <el-button :type="tableDataparams1.attribute == item.code ? 'primary' : ''" style="float: left;margin-top: 16px;margin-left: 32px; border-radius: 22px;" size="small" @click="chooseAttribute({type: '1', id: item.code})">{{item.name}}</el-button>
          </div>
        </div>
        <div style="height: 430px;">
            <el-table
              v-loading='tableDataparams1.loading'
              :data="tableData1"
              style="width: 100%; font-size:18px"
              row-class-name="table-row"
              header-row-class-name="table-header"
							:header-cell-style="headerCellStyle"
            >
              <el-table-column type="index" width='60px' label="排名">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="nameCn" label="名称">
                <template slot-scope="scope">
                  <a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="exponent" label="指数"></el-table-column>
            </el-table>
          </div>
      </el-col>
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">综艺指数榜 <span style="font-size: 16px;color: #666666;margin-left: 23px;" v-show="startDate && endDate">{{startDate}} —— {{endDate}}</span></p>
          <el-button :type="tableDataparams3.attribute == '' ? 'primary' : ''" style="float: left;margin-top: 16px;margin-left: 122px; border-radius: 22px;" size="small" @click="chooseAttribute({type: '3', id: ''})">全部</el-button>
          <div  v-for="item in listAll3" :key="item.code">
            <el-button :type="tableDataparams3.attribute == item.code ? 'primary' : ''" style="float: left;margin-top: 16px;margin-left: 32px; border-radius: 22px;" size="small" @click="chooseAttribute({type: '3', id: item.code})">{{item.name}}</el-button>
          </div>

        </div>
        <div style="height: 430px;">
            <el-table
              v-loading='tableDataparams3.loading'
              :data="tableData3"
              style="width: 100%; font-size:18px"
              row-class-name="table-row"
              header-row-class-name="table-header"
							:header-cell-style="headerCellStyle"
            >
              <el-table-column type="index" width='60px' label="排名">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="nameCn" label="名称">
                <template slot-scope="scope">
                  <a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="exponent" label="指数"></el-table-column>
            </el-table>
          </div>
      </el-col>

    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">电影指数榜 <span style="font-size: 16px;color: #666666;margin-left: 23px;" v-show="startDate && endDate">{{startDate}} —— {{endDate}}</span></p>
          <el-button :type="tableDataparams2.attribute == ''? 'primary' : ''" style="float: left;margin-top: 16px;margin-left: 122px; border-radius: 22px;" size="small" @click="chooseAttribute({type: '2', id: ''})">全部</el-button>
          <div  v-for="item in listAll2" :key="item.code">
            <el-button :type="tableDataparams2.attribute == item.code ? 'primary' : ''" style="float: left;margin-top: 16px;margin-left: 32px; border-radius: 22px;" size="small" @click="chooseAttribute({type: '2', id: item.code})">{{item.name}}</el-button>
          </div>

        </div>
        <div style="height: 430px;">
            <el-table
              :data="tableData2"
              v-loading='tableDataparams2.loading'
              style="width: 100%; font-size:18px"
              row-class-name="table-row"
              header-row-class-name="table-header"
							:header-cell-style="headerCellStyle"
            >
              <el-table-column type="index" width='60px' label="排名">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="nameCn" label="名称">
                <template slot-scope="scope">
                  <a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="exponent" label="指数"></el-table-column>
            </el-table>
          </div>
      </el-col>
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">动漫指数榜 <span style="font-size: 16px;color: #666666;margin-left: 23px;" v-show="startDate && endDate">{{startDate}} —— {{endDate}}</span></p>
        </div>
        <div style="height: 430px;">
            <el-table
              :data="tableData4"
              v-loading='tableDataparams4.loading'
              style="width: 100%; font-size:18px"
              row-class-name="table-row"
							:header-cell-style="headerCellStyle"
            >
              <el-table-column type="index" width='60px' label="排名">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="nameCn" label="名称">
                <template slot-scope="scope">
                  <a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="exponent" label="指数"></el-table-column>
            </el-table>
          </div>
      </el-col>
    </el-row>
    <div class="cover" v-if="isSearching == 'true'" />
		<div class="search" v-if="isSearching == 'true'">
			<div class="search-box">
				<span>日期：</span>
				<el-date-picker v-model="date" @change="chooseDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				<span>媒体</span>
				<el-select v-model="from" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in fromOption" :key="item.id" :label="item.names" :value="item.id"></el-option>
				</el-select>
				<el-button type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
  </div>
</template>

<script>
  // import echarts from 'echarts'
    export default {
      name: 'boxOfficeTrend',
      components: {
      },
      data () {
        return {
					headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
          isSearching: false,
          loading: true,
          tableDataparams1: {
            loading: true,
            code: '1', // 剧集数据
            attribute: '', // 电视剧1， 网剧2等。点击按钮的事件后赋值
          },
          tableDataparams2: {
            loading: true,
            code: '2', // 电影数据
            attribute: '' // 点击按钮的事件后赋值
          },
          tableDataparams3: {
            loading: true,
            code: '3', // 综艺数据
            attribute: '' // 点击按钮的事件后赋值
          },
          tableDataparams4: {
            loading: true,
            code: '4', // 动漫数据
            attribute: '' // 点击按钮的事件后赋值
          },
          from: '', // 筛选项-媒体
          fromOption: [], // 媒体下拉列表
          exponent: 'baidu', // 默认为‘baidu’， microblog微博， wechat： 微信
          code: '', // 1剧集，2电影，3综艺，4动漫
          startDate: '', // 开始时间
          endDate: '', // 结束时间
          date: [],
          listAll1: [], // 剧集那妞
          listAll2: [], // 电影按钮
          listAll3: [], // 综艺按钮
          tableData1: [],
          tableData2: [],
          tableData3: [],
          tableData4: []
        }
      },
      created () {
        window.addEventListener('setItem', () => {
          this.newVal = sessionStorage.getItem('watchStorage');
          this.isSearching = this.newVal;
        });
      },
      mounted () {
        this.getlistFrom()
        this.getlistAll1()
        this.getlistAll2()
        this.getlistAll3()
        this.getTable(this.tableDataparams1) // 获取剧集数据
        this.getTable(this.tableDataparams2) // 获取电影数据
        this.getTable(this.tableDataparams3) // 获取综艺数据
        this.getTable(this.tableDataparams4) // 获取动漫数据
      },
      methods: {
        // 格式化时间为2019-04-02
        CurentTime(now) {
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var clock = year + '-';
          if (month < 10) clock += '0';
          clock += month + '-';
          if (day < 10) clock += '0';
          clock += day;
          return clock;
        },
        chooseDate (val) {
          console.log(val)
          this.startDate = this.CurentTime(val[0])
          this.endDate = this.CurentTime(val[1])
        },
        chooseExponent (val) {
          this.exponent = val
          this.tableDataparams1 = {
            loading: true,
            code: '1', // 电影数据
            attribute: '' // 点击按钮的事件后赋值
          }
          this.tableDataparams2 = {
            loading: true,
            code: '2', // 电影数据
            attribute: '' // 点击按钮的事件后赋值
          }
          this.tableDataparams3 = {
            loading: true,
            code: '3', // 综艺数据
            attribute: '' // 点击按钮的事件后赋值
          }
          this.tableDataparams4 = {
            loading: true,
            code: '4', // 动漫数据
            attribute: '' // 点击按钮的事件后赋值
          }
          this.getTable(this.tableDataparams1) // 获取剧集数据
          this.getTable(this.tableDataparams2) // 获取电影数据
          this.getTable(this.tableDataparams3) // 获取综艺数据
          this.getTable(this.tableDataparams4) // 获取动漫数据
        },
        //点击查询
        getBoxoffice() {
          this.loading = true;
          this.isSearching='false'
          this.exponent = 'baidu'
          this.getTable(this.tableDataparams1) // 获取剧集数据
          this.getTable(this.tableDataparams2) // 获取电影数据
          this.getTable(this.tableDataparams3) // 获取综艺数据
          this.getTable(this.tableDataparams4) // 获取动漫数据
        },
        // 获取媒体列表/web/broadcast/{type}/listFrom
        getlistFrom () {
          let type = 'all'
          this.$http({
				    url: this.$http.adornUrl('/web/broadcast/all/listFrom'),
            method: 'get'
          })
          .then(({ data }) => {
            console.log(data, '媒体')
            if (data.code === 0) {
              this.fromOption = data.listFrom
            }
          })
          .catch(err => {
            console.log('请求失败：', err);
          });
        },
        // 获取剧集的按钮web/videoattribute/listAll/1
        getlistAll1 () {
          let type = 'all'
          this.$http({
				    url: this.$http.adornUrl('web/videoattribute/listAll/1'),
            method: 'get'
          })
          .then(({ data }) => {
            console.log(data, '剧集按钮')
            if (data.code === 0) {
              this.listAll1 = data.list
              // this.fromOption = data.listFrom
            }
          })
          .catch(err => {
            console.log('请求失败：', err);
          });
        },
        // 获取综艺的按钮web/videoattribute/listAll/1
        getlistAll3 () {
          let type = 'all'
          this.$http({
				    url: this.$http.adornUrl('web/videoattribute/listAll/3'),
            method: 'get'
          })
          .then(({ data }) => {
            console.log(data, '综艺按钮')
            if (data.code === 0) {
              this.listAll3 = data.list
              // this.fromOption = data.listFrom
            }
          })
          .catch(err => {
            console.log('请求失败：', err);
          });
        },
        // 获取电影按钮
        getlistAll2 () {
          let type = 'all'
          this.$http({
				    url: this.$http.adornUrl('web/videoattribute/listAll/2'),
            method: 'get'
          })
          .then(({ data }) => {
            console.log(data, '电影按钮')
            if (data.code === 0) {
              this.listAll2 = data.list
              // this.fromOption = data.listFrom
            }
          })
          .catch(err => {
            console.log('请求失败：', err);
          });
        },
        chooseAttribute (e) {
          console.log(e)
          if (e.type === '1') {
            this.tableDataparams1 = {
              loading: true,
              code: '1', // 剧集数据
              attribute: e.id // 点击按钮的事件后赋值
            }
            this.getTable(this.tableDataparams1)
          } else if (e.type === '2') {
            this.tableDataparams2 = {
              loading: true,
              code: '2', // 电影数据
              attribute: e.id // 点击按钮的事件后赋值
            }
            this.getTable(this.tableDataparams2)
          } else if (e.type === '3') {
            this.tableDataparams3 = {
              loading: true,
              code: '3', // 综艺数据
              attribute: e.id // 点击按钮的事件后赋值
            }
            this.getTable(this.tableDataparams3)
          }
        },
        // 获取表格数据web/thermal/{exponent}/{code}/exponentList
        getTable (params) {
          this.$http({
				    url: this.$http.adornUrl('web/thermal/'+this.exponent+'/'+ params.code +'/exponentList'),
            method: 'POST',
            data: {
              startDate: this.startDate,
              endDate: this.endDate,
              from: this.from,
              attribute: params.attribute,
              code: params.attribute,
              exponent: this.exponent
            }
          })
            .then(({ data }) => {
              console.log(data, params.code)
              if (data.code === 0) {
                if (params.code == 1) {
                  this.tableData1 = data.list
                  this.tableDataparams1.loading = false
                } else if (params.code == 2) {
                  this.tableData2 = data.list
                  this.tableDataparams2.loading = false

                } else if (params.code == 3) {
                  this.tableData3 = data.list
                  this.tableDataparams3.loading = false
                } else if (params.code == 4) {
                  this.tableData4 = data.list
                  this.tableDataparams4.loading = false
                }
              }
              this.loading = false;
            })
            .catch(err => {
              console.log('请求失败：', err);
          });
        }
      }
    }
</script>

<style scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
  .text_hover{
    cursor: pointer;
    display: inline-block;
  }
  .types{
    display: inline-block;
    width: 72px;
    height: 28px;
    margin-right: 10px;
    background: #3295D9;
    border-radius: 14px;
    line-height: 28px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
  }
  .types i{
    margin-left: 6px;
  }
  .cover {
	position: fixed;
	left: 0;
	top: 128px;
	background: #333333;
	width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
	height: 100%;
	filter: alpha(opacity=35); /*设置透明度为60%*/
	opacity: 0.35; /*非IE浏览器下设置透明度为60%*/
	z-index: 2000;
}
.search {
	background: #ffffff;
	position: fixed;
	top: 128px;
	width: 100%;
	z-index: 2000;
}
.search-box {
	height: 58px;
	line-height: 58px;
	margin: 0 auto;
	text-align: center;
}
</style>
