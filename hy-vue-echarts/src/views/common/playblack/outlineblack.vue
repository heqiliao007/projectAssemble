<template>
  <div class="outlineblack">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <div></div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>剧本概要库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->
    <div class="hend">
      <span>剧本概要详情</span>
    </div>
    <!-- 搜索栏 -->
    <div class="sou">
      <div>剧本名称 : </div>
      <div><el-input v-model="input.name" placeholder="请输入剧本名称"></el-input></div>
      <div>剧本类型 : </div>
      <div>
        <el-select v-model="input.scriptType" placeholder="请选择剧本类型">
          <el-option
            v-for="item in scriptTypelist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>年代 : </div>
      <div>
        <el-select v-model="input.age" placeholder="请选择年代">
          <el-option
            v-for="item in agelist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div><el-button type="primary" @click="getoutlineblack()">查询</el-button></div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="outlineblacklist" stripe :header-cell-style="headerCellStyle" v-loading="loading" style="width: 97%">
        <el-table-column :render-header="renderHeader" fixed width="50">
          <template slot-scope="scope">
            <i class="iconfont iconhistogram-copy" style="color: #0084CF;" @click=""></i>
          </template>
        </el-table-column>
        <el-table-column label="剧本名称" fixed width="100" prop="name">
          <template slot-scope="scope">
            <a :href="geturl(scope.row.url)" target="_blank">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="typenames" width="100"></el-table-column>
        <el-table-column label="年代" prop="age" width="100"></el-table-column>

        <el-table-column label="状态" prop="state" width="100"></el-table-column>

        <el-table-column label="发布时间" prop="releasetime" width="100"></el-table-column>
        <el-table-column label="作者" prop="authorname" width="130"></el-table-column>
        <el-table-column label="剧本类型" prop="scripttypename" width="100"></el-table-column>
        <el-table-column label="标签" prop="tagnames" width="150"></el-table-column>
        <el-table-column label="基本内容" prop="intro" ></el-table-column>
      </el-table>
    </div>
    <el-pagination style="float: right; padding: 3px 0;margin:8px 34px 40px 0" background layout="prev, pager, next" :total="total" @current-change="changePage" />
   
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading:true,
      headerCellStyle: {
				color: '#fff',
				backgroundColor: '#C1C1C1'
				// 'padding-left': '13px'
      },
      input:{
        name:'', //剧本名称
        scriptType:'',//剧本类型
        age:'' // 年代
      },
      total:null, //总条数
      current: 1, //当前页
      size: 10, //每页条数
      scriptTypelist:[], //剧本类型字典
      agelist:[], //年代字典
      outlineblacklist:[], //剧本概要数据
    }
  },
  created(){
    this.getscriptType()
    this.getage()
    this.getoutlineblack()
  },
  methods:{
    renderHeader(h, { column }) {
			return h('i', {
				class: 'el-icon-setting'
			});
    },
    geturl(val){
      return `http://www.juben.cn/jbk/${val}`
    },
    //剧本类型字典
    getscriptType(){
      this.$http({
        url: this.$http.adornUrl('/web/sysdict/scriptType'),
        method: 'post',
      }).then(({data}) => {
        if(!data.code) {
          this.scriptTypelist = data.dict
        }
      })
    },
    //年代字典
    getage(){
       this.$http({
        url: this.$http.adornUrl('/web/sysdict/scriptAge'),
        method: 'post',
      }).then(({data}) => {
        if(!data.code) {
          this.agelist = data.dict
        }
      })
    },
    //获取剧本概要库
    getoutlineblack(){
      //?current=${this.current}&size=${this.size}&name=${this.input.name}&scriptType=${this.input.scriptType}&age=${this.input.age}
      let productid = sessionStorage.getItem('firstmenu')
       this.$http({
        url: this.$http.adornUrl(`/web/script//list/${productid}/0?current=${this.current}&size=${this.size}&name=${this.input.name}&scriptType=${this.input.scriptType}&age=${this.input.age}`),
      }).then(({data}) => {
        if(!data.code) {
          this.loading = false
          this.total = Number(data.page.total)
          this.outlineblacklist = data.page.records
        }
      })
    },
    //分页事件
    changePage(val){
      this.current = val
      this.getoutlineblack()
    }
  },
  
}
</script>

<style lang="scss">

  .outlineblack {
      padding-left: 70px;
      padding-right: 77px;
    .breadcrumb{
      position: absolute;
      top: 100px;
      overflow: hidden;
      >div{
        float: left;
        &:nth-child(1){
          width: 2px;
          height: 16px;
          margin-right: 8px;
          background: #40a9ff;
        }
        
      }
    }
    .hend{
      color: #303133;
      font-size: 18px;
      margin-top: 30px;
      margin-bottom: 30px;
      >span{
        border-bottom: 2px solid #40a9ff;
        padding-bottom: 4px;
      }
    }
    .sou{
      margin-bottom: 20px;
      overflow: hidden;
      line-height: 40px;
      >div{
        float: left;
        margin-right: 18px;
      }
    }
    .table{
      .cell{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
  
</style>
