<template>
	<div>
    <el-row>
      <el-col :span="3"  :offset="1">
        <span class="label">百科首页</span>
      </el-col>
    </el-row>
		<el-row>
			<el-col :span="8"  :offset="8">
        <img src="./img/search_icon.png" alt="搜索" class="search">
        <el-input
          class="search_input"
          v-model="seacehValue"
          suffix-icon="el-icon-search"
          placeholder="请输入词条名称"
          @blur="seacrhEntryTypeIist(seacehValue)"
        ></el-input>
			</el-col>
      <el-col :span="7" :offset="9">
        <ul class="entryType">
          <li v-for="(index,value) in entryType" :key="value" @click="getEntryTypeIist(index.type_id)">{{index.type_name}}</li>
        </ul>
      </el-col>
		</el-row>
		<el-row style="margin-top: 40px;">
      <el-col :span="1" :offset="1">
        <el-button type="primary" @click="createEntry=true">创建</el-button>
      </el-col>
      </el-row>
    <el-row style="margin-top: 20px;">
			<el-col :span="22" class="center" style="margin-top: 8px">
        <el-table :data="throughpass" v-loading="loadingPass" style="width: 100%" stripe :header-cell-style="{ background: '#C1C1C1', color: '#ffffff' }">
          <el-table-column width="50" >
            <template slot="header" slot-scope="scope">
              <i class="el-icon-setting"></i>
            </template>
            <template slot-scope="scope">
              <a href="#"><i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i></a>
            </template>
          </el-table-column>
          <el-table-column prop="entryName" label="百科名"></el-table-column>
          <el-table-column prop="typeName" label="百科分类"></el-table-column>
          <el-table-column prop="editCount" label="编辑次数"></el-table-column>
          <el-table-column prop="transpondCount" label="转发数"></el-table-column>
          <el-table-column prop="collectionCount" label="收藏数"></el-table-column>
          <el-table-column prop="browseCount" label="浏览数"></el-table-column>
          <el-table-column prop="entry_id" label="操作">
            <template slot-scope="scope">
              <a class="link" style="color:#3295D9;text-decoration:none">编辑</a>
              <a class="link" style="color:#3295D9;text-decoration:none">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          :current-page="current"
          @current-change="handleCurrentChange"
        />
      </el-col>
		</el-row>
		<div class="layer" v-if="createEntry">
			<div class="create_window">
				<div class="window_top">
					<p>
						<img src="./img/create.png" alt="" />
						创建词条
					</p>
					<img src="./img/down.png" alt="" @click="downLayer()" />
				</div>
				<div style="overflow: hidden;">
					<div class="text">
            词条分类：
            <el-select v-model="value" placeholder="请先选择词条分类" style="width: 480px;" width="480px" @change="examine">
              <el-option  v-for="item in entryType" :key="item.type_id" :label="item.type_name" :value="item.type_id" ></el-option>
            </el-select>

				<!--		<el-autocomplete popper-class="my-autocomplete" :trigger-on-focus="false" style="width: 480px;" v-model="state" :fetch-suggestions="querySearch" @select="handleSelect"  :disabled="newstate" @change="examine">
							<template slot-scope="props">
								<div class="name">{{ props.item.name }}已被创建，您可以点击词条名查看具体内容并完善</div>
								<span class="addr">{{ props.item.name }}</span>
							</template>
						</el-autocomplete>
-->
					</div>
          <div class="text">
            新建词条：
            <el-input popper-class="my-autocomplete" v-model="state" placeholder="请输入内容" style="width: 480px;"  @change="examine"></el-input>
          </div>
					<div class="text">
            关联词条：
            <el-select
              v-model="newRntry"
              popper-class="my-autocomplete"
              filterable
              reserve-keyword
              remote
              :remote-method="remoteMethod"
              :loading="cinemaloading"
              v-el-select-loadmore="loadmore"
              style="width: 480px;"
              placeholder="请输入需要关联的词条"
              :disabled="newstate"
            >
              <el-option v-for="item in restaurants" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
					</div>
				</div>
				<div class="prompt">
					<p class="prompt_title">瀚叶百科规范的词条名应该是一个专有名词，请使用正式的全称或最常用的名称</p>
					<p>例如：</p>
					<p>
						<img src="./img/icon-test.png" alt="" />
						大连万达集团、周星驰、速度与激情7
					</p>
					<p>
						<img src="./img/wrong.png" alt="" />
						万达、星爷、速7
					</p>
				</div>
				<div class="btns">
					<el-button :type="btncreate" :disabled="create" @click="handleCreate" v-loading="creatsing">创建词条</el-button>
					<el-button type="info" @click="downLayer()">取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BoxOfficeRecord',
	components: {},
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
	data() {
		return {
		    //关联的词条名
      associated:null,
		    //seaceh 绑定的值
      seacehValue:null,
			//当前页
      current:1,
			creatsing:false,
			total: 1,
      //词条类型
      entryType:[],
			//词条类型ID
      entryTypeID:null,
			//表格展示的数据类型状态
      listState:0,
			//state
      state:"",
			//新的词条
      newRntry:"",
			//创建词条时搜索词条的页码
      secarhPage:1,
      //新建词条input状态
      newstate:true,
      cinemaloading: true,
			loadingPass: true,
			submitnum: '',
			createnum: '',
			passnum: '',
			createEntry: false,
			btncreate: 'info',
			create: true,
			restaurants: [],
			throughaudit: [],
			throughFail: [],
			state4: '',
			timeout: null,
			activeName: 'first',
			throughpass: [],
			options: [],
			value: ''

		};
	},
	watch: {
    value: function (val, oldVal) {
        this.newstate= false
    },
  },
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
	mounted() {
/*		this.getmessage();*/
/*		this.gettypes();*/
		this.getTableData()
    this.getEntryType()
	},
	methods: {
		//获取词条类型
    getEntryType() {
      this.$http({
        url: this.$http.adornUrl('web/entry/getEntryTypeList'),
        method: 'GET'
      })
        .then(({ data }) => {
          this.entryType=data.data
          console.log("词条分类",this.entryType)
        })
        .catch(err => {
          // this.$message.error('请求失败');
        });
    },
		//展示词条类型列表数据
    getEntryTypeIist(val,page){
      this.listState=1
      this.loadingPass=true;
      this.entryTypeId=val;
      if(page){
        var url ='web/entry/getEntryList?current='+page+"&size="+10+'&typeId='+this.entryTypeId
      }else {
        var url='web/entry/getEntryList?typeId='+val
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'GET'
      })
        .then(({ data }) => {
          this.throughpass=data.page.records;
          this.total=parseInt(data.page.total);
          this.loadingPass=false;
        })
        .catch(err => {
          // this.$message.error('请求失败');
        });
    },
		//获取搜索的词条列表数据
    seacrhEntryTypeIist(val){
        console.log(val,"search")
      this.listState=2
      this.loadingPass=true;
        if(val){
          var url='web/entry/getEntryList?entryName='+val
        }else {
        var url='web/entry/getEntryList'
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'GET'
      })
        .then(({ data }) => {
          this.throughpass=data.page.records;
          this.total=parseInt(data.page.total);
          this.current=data.page.current;
          this.loadingPass=false;
        })
        .catch(err => {
          // this.$message.error('请求失败');
        });
    },
		getmessage() {
			this.$http({
				url: this.$http.adornUrl('web/entry/getEntryList'),
				method: 'POST'
			})
				.then(({ data }) => {
					this.submitnum = data.result.submit_sum;
					this.createnum = data.result.pass_sum;
					this.passnum = data.result.pass_radio;
				})
				.catch(err => {
					// this.$message.error('请求失败');
				});
		},
		//输入词条名并选择词条分类后才能创建词条
		examine(){
			if(this.state==''||this.value==''){
				this.create=true
				this.btncreate='info'
			}else{
				this.create=false
				this.btncreate='primary'
			}
		},
    remoteMethod(query) {
      // console.log(1);
      this.restaurants = [];
      if (query !== '') {
        this.cinemaloading = true;
        this.newRntry = query;
      }
      // console.log(this.cinemaname);
      this.getList(this.newRntry);
    },
		//词条搜索结果滚轮下滑下翻一页
    loadmore() {
		    console.log("翻页+1")
      this.secarhPage++;
      this.getList(this.newRntry);
    },
		//词条名检查是否有该词条
    getList(name) {
      console.log("查询词条匹配结果")
			this.$http({
				url: this.$http.adornUrl('web/entry/getEntryRelation?likeName='+name+'&typeId='+this.value+'&current='+this.secarhPage+"&size="+10),
				method: 'POST'
			})
				.then(({ data }) => {
          this.cinemaloading = false;
			    console.log("模糊搜索词条",data.page.records)
					this.restaurants=data.page.records
          console.log(this.restaurants)
        /*  for(let i=0;i<this.restaurants.length;i++){
            this.restaurants[i].value =this.restaurants[i].name
          }*/
				})
		},
		link(type){
			if(type=='演员'){
				this.$router.push({ name: '演员资料' });
			}else{

			}
		},
		//跳转创建词条
		handleCreate() {
			this.creatsing=true
      if(this.newRntry){
			    var url='web/entry/createEntry?typeId='+this.value+'&entryName='+this.state+"&relationId="+this.newRntry
      }
      else {
          var url='web/entry/createEntry?typeId='+this.value+'&entryName='+this.state
      }
			this.$http({
				url: this.$http.adornUrl(url),
				method: 'POST'
			})
				.then(({ data }) => {
					console.log(data,"创建词条")
          if(data.code==0){
            this.creatsing=true
            sessionStorage.setItem('entrys', JSON.stringify(data.result))
            this.$router.push('/wikipedia/createMovie');
          }
				})
				.catch(err => {
					this.creatsing=false
				});
		},
		//取消创建词条
		downLayer() {
			this.createEntry = false;
			this.state="";
			this.newRntry="";
			this.value="";
		},
		//点击创建词条
		entry() {
			this.createEntry = true;
		},
		//获取列表数据
		getTableData(val) {
		    console.log(val,"uvl")
		    if(val){
		        var url ='web/entry/getEntryList?current='+val+"&size="+10
        }else {

		        var url='web/entry/getEntryList'
      }
			this.$http({
				url: this.$http.adornUrl(url),
				method: 'POST'
			})
				.then(({ data }) => {
			    this.throughpass=data.page.records;
			    this.total=parseInt(data.page.total)
          this.loadingPass = false;
				})
				.catch(err => {
					// this.$message.error('请求失败');
				});
		},
		//列表翻页
		handleCurrentChange(val) {
      this.loadingPass = true;
      this.current=val
		    if(this.listState==0){
          this.getTableData(val);
        }
        else if(this.listState==1){
          this.getEntryTypeIist(this.entryTypeId,val)
        }
		},
		//获取词条分类
		gettypes() {
			this.$http({
				url: this.$http.adornUrl('web/entry/listEntryType'),
				method: 'POST'
			})
				.then(({ data }) => {
					this.options = data.entryTypes;

				})
				.catch(err => {
					// this.$message.error('请求失败');
				});
		},
		//删除词条
		delect(id) {
			this.$http({
				url: this.$http.adornUrl('web/entry/delete?entryIds=' + id),
				method: 'POST'
			})
				.then(({ data }) => {
					let _this = this;
					_this.$message({
						message: '删除成功',
						onClose: function() {
							_this.getTableData(1);
							_this.getTableData(2);
							_this.getTableData(3);
						}
					});
				})
				.catch(err => {
					// this.$message.error('请求失败');
				});
		}
	}
};
</script>
<style>
.el-tabs__item:focus.is-active.is-focus:not(:active) {
	-webkit-box-shadow: none;
	box-shadow: none;
}
</style>
<style lang="scss" scoped>
.layer {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2000;
	background: rgba(0, 0, 0, 0.4);
}
.create_window {
	width: 710px;
	height: 480px;
	background: rgb(237, 237, 237);
	border-radius: 8px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -215px;
	margin-left: -355px;
}
.center {
	float: none;
	margin: 0 auto;
}
.top {
	margin-top: 42px;
}
.information {
	padding-bottom: 2px;
	border-bottom: 4px solid #40a9ff;
}
.item {
	text-align: center;
}
.item > img {
	display: inline-block;
}
.item_num {
	display: inline-block;
	vertical-align: middle;
	margin-left: 10px;
	font-size: 18px;
	color: #464646;
}
.item_num > span {
	display: block;
	font-size: 50px;
}
.create {
	display: block;
	margin: 20px auto 0;
}
.divider {
	width: 1px;
	height: 50px;
	background: #a3a3a3;
	float: right;
	margin-top: 20px;
}
.window_top {
	background: #4c4c4c;
	height: 60px;
	line-height: 60px;
}
.window_top p {
	margin: 0;
	float: left;
	padding-left: 20px;
	font-size: 16px;
	font-family: SimSun;
	font-weight: bold;
	color: rgb(255, 255, 255);
}
.window_top p img {
	margin-right: 13px;
}
.window_top > img {
	float: right;
	margin-right: 20px;
	margin-top: 25px;
}
.text {
	float: right;
	margin-right: 86px;
	margin-top: 26px;
}
.el-input--medium .el-input__inner {
	height: 40px;
	line-height: 40px;
}
.prompt {
	padding-left: 135px;
	margin-top: 20px;
}
.prompt p {
	margin: 0;
	font-size: 14px;
	line-height: 22px;
	color: rgb(76, 76, 76);
}
.prompt p img {
	margin-top: -3px;
	margin-right: 5px;
}
.prompt .prompt_title {
	margin-bottom: 20px;
}
.btns {
	margin-top: 43px;
	text-align: center;
}
.link {
	cursor: pointer;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
	  color: #4c4c4c;
	  font-size: 15px
    }
    .addr {
      font-size: 15px;
      color: #0084cf;
    }
  }
}
//新改动CSS
.search{
  height: 40px;
  margin-right: 30px;
  vertical-align: top
}
.search_input{
  width: 80%;
}
  .entryType{
    cursor:pointer;
    list-style:none;
    width: 100%;
    li{
      float: left;
      margin: auto 8px;
    }
  }
</style>
<style>
.el-tabs__nav-wrap::after {
	display: none;
}
</style>
