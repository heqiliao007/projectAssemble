<template>
  <div class="goodsblack">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <div></div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据日报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->

    <!-- 搜索栏 -->
    <div class="sou">
      <div>名称 : </div>
      <div><el-input v-model="name" placeholder="请输入数据日报名称"></el-input></div>

      <div><el-button type="primary" @click="getdata">查询</el-button></div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" stripe :header-cell-style="headerCellStyle" v-loading="loading" style="width: 97%" >
        <el-table-column label="日期" prop="createdate" width="200">
          <template slot-scope="scope">

            <span>{{ detcreatedate(scope.row.createdate) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="名称" prop="name" >
           <template slot-scope="scope">
            <a class="btna" :href="scope.row.fileurl" target="_blank">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <!--  -->
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
      name:'', //剧本名称
      current: '1',
      tableData:[],
      total:0,
    }
  },
  created(){
    this.getdata()
  },
  methods:{
    getdata(){
      let id = this.$cookie.get('productid')
      this.$http({
        url: this.$http.adornUrl(`/web/datadaily/pageList/${id}?name=${this.name}&current=${this.current}&size=10`),
      }).then(({data}) => {
         if(!data.code){
           this.loading = false
           this.total = Number(data.page.totalCount)
           this.tableData = data.page.list
         }
      })
    },
    changePage(val){
      this.current = val
      this.getdata()
    },
    detcreatedate(val){
      return val.split(' ')[0]
    }
  },
}
</script>

<style lang="scss">
  .cu{
    cursor: pointer;
  }
  .goodsblack {
    padding-left: 70px;
    padding-right: 77px;
    // position: relative;
    .btna{
      text-decoration-line: none;
      color: rgb(64, 158, 255);
    }
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
