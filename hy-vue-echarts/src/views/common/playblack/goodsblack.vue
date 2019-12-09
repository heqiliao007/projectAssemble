<template>
  <div class="goodsblack">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <div></div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>剧本精品库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->
    <div class="hend">
      <span>精品剧本详情</span>
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
      <div><el-button type="primary" @click="getdata">查询</el-button></div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" stripe :header-cell-style="headerCellStyle" v-loading="loading" style="width: 97%" >
        <el-table-column :render-header="renderHeader" fixed width="40">
          <template slot-scope="scope">
            <i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
            <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="剧本名称" fixed width="140">
          <template slot-scope="scope">
            <span class="cu" @click="$router.push({path:'/playblack/particulars',query:{id:scope.row.id}})">{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出处" prop="source" width="100"></el-table-column> 
        <el-table-column label="类型" prop="typenames" width="100"></el-table-column>
        <el-table-column label="年代" prop="age" width="100"></el-table-column>
        <el-table-column label="作者" prop="authorname" width="100"></el-table-column>
        <el-table-column label="国际" prop="country" width="100"></el-table-column>
        <el-table-column label="标签" prop="tagnames" width="300"></el-table-column>
        <el-table-column label="简介" prop="intro" ></el-table-column>
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
      scriptTypelist:[], //剧本类型字典
      agelist:[], //年代字典
      tableData:[],
      total:null, //总条数
      current: 1, //当前页
      size: 10, //每页条数
      id:'',
      poid:''
    }
  },
  created() {
    if(!this.id){
      this.poid = setInterval(()=>{
        this.id = sessionStorage.getItem('firstmenu')
      },10)
    }
  },
  watch: {
    id(){
      this.poid = ''
      this.getdata()
    }
  },
  mounted(){
    this.getscriptType()
    this.getage()
  },
  methods:{
    renderHeader(h, { column }) {
			return h('i', {
				class: 'el-icon-setting'
			});
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
    getdata(){
      this.$http({
        url: this.$http.adornUrl(`/web/script//list/${this.id}/1?current=${this.current}&size=${this.size}&name=${this.input.name}&scriptType=${this.input.scriptType}&age=${this.input.age}`),
      }).then(({data}) => {
        console.log(data)
         if(!data.code){
           this.loading = false
           this.total = Number(data.page.total)
           this.tableData = data.page.records
           
         }
      })
    },
    changePage(val){
      this.current = val
      this.getdata()
    }
   
  },
}
</script>

<style lang="scss">
  .cu{
    cursor: pointer;
    color: #409EFF
  }
  .goodsblack {
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
