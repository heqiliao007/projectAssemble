<template>
  <div style="padding: 34px 70px;">
    <el-table
    	:data="tableData"
    	style="width: 100%; font-size:18px"
    	stripe
    	v-loading="loading"
    	row-class-name="table-row"
    	header-row-class-name="table-header"
    	:header-cell-style="headerCellStyle"
    >
    	<el-table-column :render-header="renderHeader" fixed width="50">
    		<template slot-scope="scope">
    			<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
    		</template>
    	</el-table-column>
    	<el-table-column prop="publish_date" label="发布日期"></el-table-column>
    	<el-table-column prop="implement_date" label="实施日期"></el-table-column>
    	<el-table-column prop="publish_organization" label="发布机构"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
    	<el-table-column prop="label_names" label="标签"></el-table-column>
    	<el-table-column prop="scope" label="范围"></el-table-column>
    </el-table>
    <el-pagination
    	style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
    	background
    	layout="prev, pager, next"
    	:page-size="10"
    	:total="totalPage"
    	:current-page="page"
    	@current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  export default {
  	data() {
  		return {
  			headerCellStyle: {
  				color: '#fff',
  				backgroundColor: '#C1C1C1'
  			},
        loading:true,
        totalPage:0,
        page:1,
        tableData:[]
  		};
  	},
  	created() {},
  	mounted() {
      this.getcookie()
      this.getdata()
  	},
  	methods: {
      // 修改表头图标
      renderHeader(h, { column }) {
      	return h('i', {
      		class: 'el-icon-setting'
        })
      },
      //获取productid
      getcookie() {
      	this.productid = this.$cookie.get('productid');
      },
      getdata(){
        this.$http({
        	url: this.$http.adornUrl('web/policiesregulations/getPoliciesList'),
        	method: 'POST'
        })
        	.then(({ data }) => {
            this.loading=false
            this.tableData=data.page.records
            this.totalPage=data.page.total-0
        	})
      },
      //翻页
      handleCurrentChange(val){
        this.loading=true
        this.page=val
        this.getdata()
      }
    },
  	components: {
  	}
  };
</script>

<style>
</style>
