<template>
	<div style="width: 100%; margin-top: -20px; padding-top: 0px;">
		<div class="networkContent">
				<p style="font-size: 18px; color: #4C4C4C;">作品排行榜</p>
				<p style="width: 45px; border-bottom: 2px solid #40A9FF; margin-top: -10px;"></p>
        <p>
          <el-dropdown @command='handleChooseOption' style='margin-left: 0px; border: 1px solid #ccc; background-color: #fff; width: 140px; text-align: center; line-height: 30px;' class='project-container'>
					  <span class="el-dropdown-link">
					    {{option}}<i class="iconfont iconsanjiaoxing" style="margin-left: 40px;"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown" class="project-dropdown">
					    <el-dropdown-item
							:class="option == item.name ? 'colorBlue' : ''"
					    :command="{label: item.name, id: item.id}"
					    v-for="item in options"
					    :key="item.id">{{item.name}}</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
          <el-dropdown @command='handleChooseType' style='margin-left: 10px; border: 1px solid #ccc; background-color: #fff; width: 100px; text-align: center; line-height: 30px;' class='project-container'>
					  <span class="el-dropdown-link">
					    {{typeChoose}}<i class="iconfont iconsanjiaoxing" style="margin-left: 10px;"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown" class="project-dropdown">
					    <el-dropdown-item
							:class="typeChoose == item.label ? 'colorBlue' : ''"
					    :command="{label: item.label, id: item.value}"
					    v-for="item in typeOptions"
					    :key="item.value">{{item.label}}</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
        </p>
				<el-row>
					<el-table
						:data="tableData"
						stripe
						:header-cell-style='headerCellStyle'
            v-loading='loading'
						style="width: 97%">
						<el-table-column
							:render-header="renderHeader"
							fixed
							width="50">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
						<el-table-column
							label="小说名称"
              fixed
              width="220"
							prop="name">
							<template slot-scope="scope">
								<!-- <i class="iconfont iconhistogram" style="color: #0084CF;"></i> -->
								<span style="margin-left: 10px; color: #0084CF;" class='text_hover'  @click="alink(scope.row)">{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="作者"
							prop="author_name"
							width="100">
						</el-table-column>
						<el-table-column
							label="类型"
							prop="type_names"
							width="100">
						</el-table-column>
						<el-table-column
							label="连载状态"
							prop="state"
							width="100">
						</el-table-column>
						<el-table-column
							label="连载平台"
							prop="platform_names"
							width="130">
						</el-table-column>
            <el-table-column
							label="最新章节"
							prop="last_chapter"
							width="360">
						</el-table-column>
            <el-table-column
							label="总字数"
							prop="words"
							width="100">
						</el-table-column>
						<el-table-column
							label="作品评分"
							prop="score"
							width="100">
						</el-table-column>
						<el-table-column
							label="作品点击量"
							prop="hits"
							width="100">
						</el-table-column>
						<el-table-column
							label="作品推荐量"
							prop="recommendation"
							width="100">
						</el-table-column>
            <el-table-column
							label="作品评论数"
							prop="comment"
							width="100">
						</el-table-column>
						<el-table-column
							label="作品粉丝数"
							prop="fans"
							width="100">
						</el-table-column>
						<el-table-column
							label="订阅数"
							prop="subscription"
							width="100">
						</el-table-column>
            <el-table-column
							label="下载数"
							prop="download"
							width="100">
						</el-table-column>
            <el-table-column
							label="打赏"
							prop="reward"
							width="100">
						</el-table-column>
					</el-table>
					<el-pagination
					  style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
					  background
					  layout="prev, pager, next"
					  :total="total"
            @current-change = "changePage"
					/>
				</el-row>
			</div>
		</div>

	<!-- </div> -->
</template>

<script>
	import basicImg from "./img/basic.png";
	export default {
		data () {
			return {
        loading: true,
				headerCellStyle: {
					"color":"#fff",
					'backgroundColor': '#C1C1C1'
        },
        productid: '',

        typeChoose: '',
        typeOptions: [
          // {label: '玄幻', value: '1'},
          // {label: '武侠', value: '2'},
          // {label: '游戏', value: '3'},
        ],
        current: 1, // 当前页面
        total: 1,
        typeId: '1', // 类型id
        platformId: '3', // 平台id
        option: '全部',
        options: [
          {label: '小说阅读网', value: '3'},
          {label: '晋江文学城', value: '4'}
        ],
				basicImg: basicImg,
				tableData: [
					// {icon: '', name: '爱我就别想太多', author: '李洪海', type: '玄幻·奇幻', status: '正在连载', platform: '江户', score: '9.7', redtime: '152652', monthtime: '237848', recommendtime: '132871', fans: '374878', comment: '2647846'}
				]
			}
    },
    mounted() {
      this.getcookie()
      this.getData()
      this.getTypeOption()
      this.getOption()
    },
		methods: {
			handleChooseType(command) {
        this.typeChoose = command.label
        this.typeId = command.id
        this.current = 1
        this.loading = true
        this.getData()
        console.log('type', command)
      },
      // 分页数据查询
      changePage (val) {
        // console.log(val)
        let _this = this
        _this.loading = true
        // console.log(_this.platformId, _this.typeId)
        _this.current = val
        _this.getData()
      },
      handleChooseOption (command) {
        // this.option = command
        this.option = command.label
        this.platformId = command.id
        this.current = 1
        this.loading = true
        this.getData()
        console.log('type', command)
      },
      getcookie () {
        this.productid=this.$cookie.get('productid')
        if(this.productid==null){
          this.productid='9'
        }
      },
       // 获取文学类型/web/sysdict/webLiteraryType
      getTypeOption () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/sysdict/webLiteraryType'),
          method: 'POST',
        }).then(({data}) => {
          console.log(data, '获取文学类型')
          if (data.code === 0) {
            _this.typeOptions = data.dict
            _this.typeChoose = data.dict[0].label
            _this.typeId = data.dict[0].value
            // _this.pageinfo = data.details[0]
            // _this.weekshowList = data.page.records
          }
        })
      },
       // 获取平台
      getOption () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/wlplatform/getPlatformList'),
          method: 'POST',
        }).then(({data}) => {
          console.log(data, '获取文学类型')
          if (data.code === 0) {
            _this.options = data.list
            _this.option = data.list[0].name
            _this.platformId = data.list[0].id
            // _this.pageinfo = data.details[0]
            // _this.weekshowList = data.page.records
          }
        })
      },
      // 获取列表数据/web/webliterary/getAnalysisWithLiterature/{productid}
      getData () {
        console.log(this.typeId, 'typeid', this.platformId, 'platformId')
        let _this = this
        var params = new URLSearchParams();
        params.productid = _this.productid
        params.typeId = _this.typeId
        params.platformId = _this.platformId
        _this.$http({
          url: _this.$http.adornUrl('/web/webliterary/getAnalysisWithLiterature/' + _this.productid + '?platformId=' + _this.platformId + '&typeId=' + _this.typeId + '&current=' + _this.current + '&size=10'),
          method: 'POST',
          // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            platformId: this.platformId
          }
        }).then(({data}) => {
          console.log(data, '签约平台===列表数据')
          if (data.code === 0) {
            console.log(data)
            for (let i = 0; i < data.page.records.length; i++) {
              if (data.page.records[i].state == '1') {
                data.page.records[i].state = '完结'
              } else if (data.page.records[i].state == '2') {
                data.page.records[i].state = '连载中'
              }
            }
            _this.tableData = data.page.records
            _this.total = Number(data.page.total)
            _this.loading = false
            // _this.tableData = data.list
            // _this.pageinfo = data.details[0]
            // _this.weekshowList = data.page.records
          }
        })
      },
			// 修改表头图标
			renderHeader(h, {column}) {
				return h ('i', {
							'class':'el-icon-setting'
						})
			},
			alink(e) {
				// console.log(val)
				this.$router.push({
					path: '/networkLiterature/networksDails',
					query: {
						id: e.id,
						lastmenu: '文学作品'
					}
				})
				// this.$router.push({path:'/networkLiterature/networksDails'})
			},
		}
	}
</script>

<style lang="scss" scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
  .text_hover{
    cursor: pointer;
    display: inline-block;
  }
	.colorBlue {
    color: #40A9FF;
  }
  .project-dropdown{
    width:150px;
    height:250px;
    overflow: auto;
  }
	.networkContent {
		width: 95%;
		height: auto;
		margin: 10px auto;
		box-sizing: border-box;
		padding: 10px 5px;
		.title_header {
			border-left: 2px solid #40A9FF;
			box-sizing: border-box;
			padding-left: 10px;
			font-size: 12px;
		}
	}
	.showImg {
		box-shadow: 5px 5px 10px gray;
		width: 155px;
		height: 190px;
		background-color: #D3D3D3;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
