<template>
	<div class="create_content">
		<div class="editorTop" :class="isFixed === true ? 'isFixed' : ''">
			<div class="toolbar">
				<span class="label">百科首页 > 创建词条</span>
				<div style="display: flex; align-items: center;">
			<!--		<div ref="div1"></div>-->
					<div ref="div2" style="visibility: hidden;"></div>
					<!--<el-button size="mini" style="border-radius: 50px">预览</el-button>-->
					<el-button size="mini" style="border-radius: 50px" @click="savedDraft()">存草稿</el-button>
					<el-button size="mini" type="primary" style="border-radius: 50px; margin-right: 30px" @click="published()">发表</el-button>
				</div>
			</div>
		</div>
		<div :class="isFixed === true ? 'editorTopTwo' : ''" style="background:#ededed; z-index: 999; width: 100%; ">
			<el-row class="createEntry_wrapper">
				<el-col :span="15">
					<span class="createEntry" @click="toDemo">创建词条</span>
				</el-col>
				<el-col :offset="2" :span="7" ><el-button style=" width: 78px;height: 23px;line-height: 23px;padding: 0;font-size: 12px;">取消</el-button></el-col>
			</el-row>
			<!-- <div id="" style="margin: 0 auto;" contenteditable="false"></div> -->
		</div>
		<div class="main">
			<div :class="isFixed === true ? 'left' : ''"><Left /></div>
			<div v-show="isFixed" style="width: 250px"></div>
			<div class="mainBanner">
				<el-form  label-width="120px" class="demo-ruleForm">
					<div class="editorMain">
						<div class="editormaintop">
							<span style="font-size: 24px; font-weight: 700; ">{{entrys.entry_name}}</span>
							<span style="margin: 0px 10px; display: inline-block; height: 10px; border-right: 3px solid #ccc;"></span>
							<!--<span style="color: #0084CF;">修改分类</span>-->
							<div class="editormainbanner">
								<!-- <div style="float: left; width: 70%; height: 33px;line-height: 33px;outline: none;padding-left: 18px;" maxlength="30" @keyup="count($event)" contenteditable="true" class="text"></div> -->
								<el-input :value="entryDesc" @input="count" style="width: 70%;" placeholder="请输入词条描述" maxlength="30"/>
								<span style="margin: 0 15px;font-size: 12px;color: #969696;">{{number}}/30</span>
								<el-button size="small" type="primary" @click="saveEntryDesc">保存</el-button>
							</div>
						</div>
					</div>
					<div class="createMain">
						<div class="createMainCard">
							<div class="createMainTitle"><span>词条简介</span></div>
							<div class="createMainBanner">
								<el-row :gutter="20">
									<el-col :span="8">
										<el-upload
											class="avatar-uploader"
											action="https://jsonplaceholder.typicode.com/posts/"
											accept=".jpg,.jpeg,.png"
											:show-file-list="false"
											:on-success="handleAvatarSuccess"
											:before-upload="beforeAvatarUpload"
										>
											<img v-if="imageUrl" :src="imageUrl" class="avatar" />
											<img v-else src="../img/upload.png" class="avatar-uploader-icon" />
										</el-upload>
										<p style="font-size:12px;color: #FF0000;text-align: center;width: 200px;margin-top: 12px;font-family:SimSun;">
											图片格式JPG、PNG
											<br />
											图片像素不低于320px*320px
										</p>
										<el-upload
											class="upload-demo"
											action="https://jsonplaceholder.typicode.com/posts/"
											accept=".jpg,.jpeg,.png"
											:show-file-list="false"
											:on-success="handleAvatarSuccess"
											:before-upload="beforeAvatarUpload"
											style="text-align: center;width: 200px;"
										>
											<el-button size="small" type="primary">插入概视图</el-button>
										</el-upload>
									</el-col>
									<el-col :span="16" class="upload_form_item">
                    <div v-if='entrys.type_name == "电影"'>
                      <el-form ref="form1" labelWidth="20%" :model="form1" :rules="form1Rule" status-icon>
                      <el-form-item label="地   区：" prop="region">
                        <el-input v-model="form1.region"></el-input>
                      </el-form-item>
                      <el-form-item label="作品类型：" prop="type"><el-input v-model="form1.type"></el-input></el-form-item>
                      <el-form-item label="制   式：" prop="standard"><el-input v-model="form1.standard"></el-input></el-form-item>
                      <el-form-item label="导   演：" prop="director"><el-input v-model="form1.director"></el-input ></el-form-item>
                      <el-form-item label="上映时间：" prop="date"><el-input v-model="form1.date"></el-input></el-form-item>
                      <el-form-item label="时   长：" prop="time"><el-input v-model="form1.time"></el-input></el-form-item>
                      </el-form>
                    </div>
                    <div v-if='entrys.type_name == "演员"'>
                      <el-input
                        type="textarea"
                        :rows="13"
                        placeholder="请输入演员简介"
                        v-model="textarea"
                        maxlength="100"
                        show-word-limit
                      >
                      </el-input>
                    </div>
                    <div v-if='entrys.type_name == "公司"'>
                      <el-input
                        type="textarea"
                        :rows="13"
                        placeholder="请输入公司简介"
                        v-model="textarea1"
                        maxlength="100"
                        show-word-limit
                      >
                      </el-input>
                    </div>
										<div style="margin-top: 40px; text-align:center">
											<el-button size="small" type="primary" >保存</el-button>
										</div>
									</el-col>
								</el-row>
							</div>
						</div>
						<div id="baseInfo">
							<div class="createMainTitle">
								<div>
									<span>基本信息</span>
									<i style="margin: 0px 10px; display: inline-block; height: 10px; border-right: 3px solid #ccc;"></i>
									<i>当前模板：{{entrys.type_name}}</i>
									<!--<i style="color: #0084CF;">更换模板</i>-->
								</div>
								<div class="close">
									收起<span class="transAngles"></span>
								</div>
							</div>
							<div class="createMainBanner" style="height: auto;">
								<el-row :gutter="24">
                  <el-form ref="form2" :model="form2" :rules="form2Rule" status-icon>
									<el-col :span="12">
										<el-form-item  label="中文名：" prop="chinaName" label-width="100px">
                      <el-input v-model="form2.chinaName"></el-input>
										</el-form-item>
                  </el-col>
                    <el-col :span="12">
                    <el-form-item  label="外文名：" prop="foreignName" label-width="100px">
                      <el-input v-model="form2.foreignName"></el-input>
                    </el-form-item>
                    </el-col>
                      <el-col :span="12">
                    <el-form-item  label="其他译名：" prop="otherName" label-width="100px">
                      <el-input v-model="form2.otherName"></el-input>
                    </el-form-item>
                      </el-col>
                        <el-col :span="12">
                    <el-form-item  label="上映时间：" prop="releaseTime" label-width="100px">
                      <el-input v-model="form2.releaseTime"></el-input>
                    </el-form-item>
                        </el-col>
                          <el-col :span="12">
                    <el-form-item  label="主 演：" prop="starring" label-width="100px">
                      <el-input v-model="form2.starring"></el-input>
                    </el-form-item>
                          </el-col>
                            <el-col :span="12">
                    <el-form-item  label="片 长：" prop="runningTime" label-width="100px">
                      <el-input v-model="form2.runningTime"></el-input>
                    </el-form-item>
                            </el-col>
                              <el-col :span="12">
                    <el-form-item  label="类 型：" prop="type" label-width="100px">
                      <el-input v-model="form2.type"></el-input>
                    </el-form-item>
                              </el-col>
                                <el-col :span="12">
                    <el-form-item  label="出品公司：" prop="productCompany" label-width="100px">
                      <el-input v-model="form2.productCompany"></el-input>
                    </el-form-item>
                                </el-col>
                                  <el-col :span="12">
                    <el-form-item  label="发行公司：" prop="distributionCompanies" label-width="100px">
                      <el-input v-model="form2.distributionCompanies"></el-input>
                    </el-form-item>
                                  </el-col>
                                    <el-col :span="12">
                    <el-form-item  label="出品时间：" prop="byTime" label-width="100px">
                      <el-input v-model="form2.byTime"></el-input>
                    </el-form-item>
                                    </el-col>
                                      <el-col :span="12">
                    <el-form-item  label="制片地区：" prop="productionAreas" label-width="100px">
                      <el-input v-model="form2.productionAreas"></el-input>
                    </el-form-item>
                                      </el-col>
                                        <el-col :span="12">
                    <el-form-item  label="对白语言：" prop="dialogueLanguage" label-width="100px">
                      <el-input v-model="form2.dialogueLanguage"></el-input>
                    </el-form-item>
                                        </el-col>
                                          <el-col :span="12">
                    <el-form-item  label="拍摄地点：" prop="location" label-width="100px">
                      <el-input v-model="form2.location"></el-input>
                    </el-form-item>
                                        </el-col>
                                            <el-col :span="12">
                    <el-form-item  label="色 彩：" prop="color" label-width="100px">
                      <el-input v-model="form2.color"></el-input>
                    </el-form-item>
                                        </el-col>
                                              <el-col :span="12">
                    <el-form-item  label="导 演：" prop="director" label-width="100px">
                      <el-input v-model="form2.director"></el-input>
                    </el-form-item>
                                        </el-col>
                                                <el-col :span="12">
                    <el-form-item  label="编 辑：" prop="editor" label-width="100px">
                      <el-input v-model="form2.editor"></el-input>
                    </el-form-item>
                                                </el-col>
                                                  <el-col :span="12">
                    <el-form-item  label="拍摄日期：" prop="dateTaken" label-width="100px">
                      <el-input v-model="form2.dateTaken"></el-input>
                    </el-form-item>
									</el-col>
                  </el-form>
								</el-row>
								<!--<el-row :gutter="24">
									<el-col :span="10">
										<el-button size="mini" style="border: 1px solid #0084CF; color: #0084CF; margin-left: 50px;" @click="addOne">+ 添加自定义项</el-button>
									</el-col>
								</el-row>-->
								<el-row :gutter="24" style="text-align: center;">
									<el-button type="primary" size="mini">保存</el-button>
								</el-row>
							</div>
						</div>
						<!-- <div class="addItem" id="cinama">
							<span v-show="showAdd === 1"><i style="display: block; width: 15px; height: 15px; text-align: center; background: #0084CF; color: #fff;">+</i></span>
							<el-input value="票房" @focus="handleshowAdd(1)" style="width: 95%;margin-left: 10px;position: absolute; right: 0; top:0;"></el-input>
						</div>
						<div class="addItem" id="playtimes">
							<span v-show="showAdd === 2"><i style="display: block; width: 15px; height: 15px; text-align: center; background: #0084CF; color: #fff;">+</i></span>
							<el-input value="排片" @focus="handleshowAdd(2)" style="width: 95%;margin-left: 10px;position: absolute; right: 0; top:0;"></el-input>
						</div>
						<div class="addItem" id="sale">
							<span v-show="showAdd === 3"><i >+</i></span>
							<el-input value="营销" @focus="handleshowAdd(3)" style="width: 95%;margin-left: 10px;position: absolute; right: 0; top:0;"></el-input>
						</div> -->
						<!--<div class="dynamicElement" id="cinama">
							<div class="element_wrapper">
								<div class="dynamicInput_wrapper">
									<span class="wordLength">4/30</span>
									<el-input value="所获奖项" class="dynamicInput"></el-input>
								</div>
								<div class="circle">-</div>
								<el-checkbox></el-checkbox>
								<span>隐藏</span>
								<span class="count">1/3</span>
								<div class="transAngle" style="margin-left: 5px;"></div>
								<span class="addIcon">
									<i style="color: #fff;">+</i>
								</span>
							</div>
							<el-row :gutter="24">
								<el-col :span="12">
									<el-form-item label="中文名:" label-width="100px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="中文名:" label-width="100px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="中文名:" label-width="100px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="代表作:" label-width="100px">
										<div class="addElement"><el-input></el-input><div class="circle optionEle">+</div></div>
										<div class="addElement"><el-input></el-input><div class="circle optionEle">-</div></div>
									</el-form-item>
								</el-col>
							</el-row>
						</div>-->
						<!--<div>
							<div class="hisTory_wrapper" id="playtimes">
								<div class="title">历史代言</div>
								<div class="hisOptions">
									<el-checkbox></el-checkbox>
									<span>隐藏</span>
									<span class="count">1/3</span>
									<div class="AngleWrapper">
										<div class="transAngles top"></div>
										<div class="transAngle bottom"></div>
									</div>
								</div>
							</div>
							<el-row :gutter="24">
								<el-col :span="12">
									<el-form-item label="中文名:" label-width="100px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="中文名:" label-width="100px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="中文名:" label-width="100px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="中文名:" label-width="100px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>-->
						<!--<div class="dynamicElement">
							<div class="element_wrapper">
								<div class="dynamicInput_wrapper">
									<span class="wordLength">4/30</span>
									<el-input value="主要贡献" class="dynamicInput"></el-input>
								</div>
								<div class="circle">-</div>
								<el-checkbox></el-checkbox>
								<span>隐藏</span>
								<span class="count">1/3</span>
								<div class="transAngles" style="margin-left: 5px;"></div>
								<span class="addIcon">
									<i style="color: #fff;">+</i>
								</span>
							</div>
						</div>-->
					<!--	<div style="text-align: center;">
							<el-button type="primary" size="mini">保存</el-button>
						</div>-->
					</div>
				</el-form>
			</div>
			<div class="right"><Right style="height: 100%"/></div>
		</div>
		<!-- <div id="editor">
      <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
    </div>-->
	</div>
</template>

<script>
import Editor from '../../../../../static/plugins/ueditor-1.4.3.3/wangEditor.min';
import E from 'wangeditor';
import Left from '../create/createLeft';
import Right from '../create/createRight';
import { resolve } from 'url';
import { rejects } from 'assert';
export default {
	components: {
		// Header
		Left,
		Right
	},
	data() {
		return {
			entrys:{},
			number:0,
			imageUrl: '',
			isFixed: false,
			showAdd: -1,
			editor: null,
			editor2: null,
			form2:{
        chinaName:"",
        foreignName:"",
        otherName:"",
        releaseTime:"",
        starring:"",
        runningTime:"",
        type:"",
        productCompany:"",
        distributionCompanies:"",
        byTime:"",
        productionAreas:"",
        dialogueLanguage:"",
        location:"",
        color:"",
        director:"",
        editor:"",
        dateTaken:""
      },
			/*form3: [
				{ label: '中文名：', value:this.form2.chinaName,prop:"chinaName", show: false },
        { label: '外文名：', value:this.form2.foreignName,prop:"foreignName", show: false },
        { label: '其他译名：', value:this.form2.otherName,prop:"otherName", show: false },
				{ label: '上映时间：', value:this.form2.releaseTime,prop:"releaseTime", show: false },
        { label: '主 演：', value:this.form2.starring,prop:"starring", show: false },
        { label: '片 长：', value:this.form2.runningTime,prop:"runningTime", show: false },
        { label: '类 型：', value:this.form2.type,prop:"type", show: false },
        { label: '出品公司：', value:this.form2.productCompany,prop:"productCompany", show: false },
        { label: '发行公司：', value:this.form2.distributionCompanies,prop:"distributionCompanies", show: false },
        { label: '出品时间：', value:this.form2.byTime,prop:"byTime", show: false },
        {label:  '制片地区：', value:this.form2.productionAreas,prop:"productionAreas", show: false },
        { label: '对白语言：', value:this.form2.dialogueLanguage,prop:"dialogueLanguage", show: false },
        { label: '拍摄地点：', value: this.form2.location,prop:"location", show: false },
        { label: '色 彩：', value: this.form2.color,prop:"color", show: false },
        { label: '导 演：', value:this.form2.director,prop:"director", show: false },
				{ label: '编 辑：', value:this.form2.editor,prop:"editor", show: false },
				{ label: '拍摄日期：', value:this.form2.dateTaken,prop:"dateTaken", show: false },
			],*/
      form1Rule:{
        type: [
          { required: true, message: '作品类型不能为空', trigger: 'blur' }
        ],
        standard: [
          { required: true, message: '制式不能为空', trigger: 'blur' }
        ],
        director: [
          { required: true, message: '导演不能为空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '时长不能为空', trigger: 'blur' }
        ],
        region:[{
          required: true, message: '地区不能为空', trigger: 'blur'
        }]
      },
      form2Rule:{
        chinaName: [
          { required: true, message: '中文名不能为空', trigger: 'blur' }
        ],
        foreignName: [
          { required: true, message: '英文名不能为空', trigger: 'blur' }
        ],
        releaseTime: [
          { required: true, message: '上映日期不能为空', trigger: 'blur' }
        ],
        productCompany: [
          { required: true, message: '出品公司不能为空', trigger: 'blur' }
        ],
      },

     /* ruleForm2: [
        { label: '中文名：', value: 'chinaName', show: false },
        { label: '职 业：', value: 'occupation', show: false },
        { label: '英文名：', value: 'foreignName', show: false },
        { label: '出品公司：', value: 'company', show: false },
        { label: '国 籍：', value: 'nationality', show: false },
        { label: '代表作品：', value: 'works', show: false }
      ],*/

			fileList2: [
				{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				},
				{
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}
			],
			entryDesc: '', //词条描述
      //演员模板数据
      //演员简介
      textarea:"",
      //公司模板数据
      //公司简介
      textarea1:"",
      //基础信息
      basic_information:[],
      //电影模板
      //电影表单数据
      form1:{
        region:"",
        type:"",
        standard:"",
        director:"",
        date:"",
        time:"",
      },
      //表单提交状态
      formstate:0,
		};
	},
  created() {
		let _this = this;
		window.addEventListener('scroll', this.handleScroll);
		_this.getentrys()

/*		 this.creatEditor();*/
		// this.createEditor()
		// var E = window.wangEditor
		// var editor = new E('#editor')
		// editor.create()
	},
	methods: {
		//获取session里面的词条信息
		getentrys(){
			this.entrys=JSON.parse(sessionStorage.getItem('entrys') || [])
			console.log(this.entrys)
      if(this.entrys.type_name=="电影"){
        this.basic_information=this.ruleForm
        console.log("basic_information",this.basic_information)
      }else if(this.entrys.type_name=="演员"){
        this.basic_information=this.ruleForm2
      }
		},
		//图片上传
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
			console.log(this.imageUrl,"this.imageUrl")
		},
		async beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
			let isLt2M = false;
			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
			}
			let res = await this.getImgPix(file);
			if(res.width >= 320 && res.height >= 320) isLt2M = true
			else{
				this.$message.error('图片像素不低于320px*320px');
			}
			return false && isLt2M ;
		},
		getImgPix(file) {
			return new Promise((resolve, reject) => {
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload=function(e){
					let base64 = this.result;
					let img = new Image();
					img.src = base64;
					resolve(img)
				}
			})
		},
		//输入简介修改字数
		count(e){
			this.number=e.length
			this.entryDesc = this.number>29 ? e.substring(0,29): e;
		},
		creatEditor() {
			let _this = this;
			_this.editor = new E(_this.$refs.div1, _this.$refs.div2);
			_this.editor.customConfig.onchange = html => {
				// _this.formArticle = html
				console.log();
			};
			_this.editor.customConfig.zIndex = 100;
			_this.editor.customConfig.menus = [
				'undo',  // 撤销
				'redo',  // 重复
				'head',  // 标题
				'bold',  // 粗体
				'fontSize',  // 字号
				'fontName',  // 字体
				'italic',  // 斜体
				'underline',  // 下划线
				'strikeThrough',  // 删除线
				'foreColor',  // 文字颜色
				'backColor',  // 背景颜色
				'link',  // 插入链接
				'list',  // 列表
				'justify',  // 对齐方式
				'quote',  // 引用
				'emoticon',  // 表情
				'image',  // 插入图片
				'table',  // 表格
				'video',  // 插入视频
				'code'  // 插入代码
			];
			_this.editor.customConfig.lang = {
				设置标题: 'title',
				正文: 'p',
				链接文字: 'link text',
				链接: 'link',
				上传图片: 'upload image',
				上传: 'upload',
				创建: 'init'
			};
			_this.editor.customConfig.colors = ['#ffffff'];
			_this.editor.create();
		},
		handleScroll() {
			let _this = this;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop > 86) {
				_this.isFixed = true;
			} else {
				_this.isFixed = false;
			}
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleshowAdd(val) {
			event.preventDefault();
			console.log(val);
			this.showAdd = val;
		},
		addOne() {
			let newEle = { label: '', value: 'newele', show: true };
			this.basic_information.push(newEle);
			// $(".createMainBanner").on("click", ".list-body-item", this.doFilterTutor);
		},
		toDemo() {
			// this.$router.push('/wikipedia/demo');
		},
		saveEntryDesc() {

		},
    savedDraft(){
      var data1={
        "entryId": this.entrys.entry_id,
        "entryName": this.entrys.entry_name,
        "entryTypeId": this.entrys.type_id,
        "entryTypeName": this.entrys.type_name,
        "introduction":  this.entryDesc,
        "catalogs": [
          {
            "catalogId": "wmzb_1",
            "catalogName": "概述",
            "order": 1,
            "catalogContent": {
              "作品类型": this.form1.type,
              "地区": this.form1.region,
              "制式：": this.form1.standard,
              "导演": this.form1.director,
              "上映时间":  this.form1.date,
              "时长":  this.form1.time,
            }
          },
          {
            "catalogId": "wmzb_2",
            "catalogName": "基础信息",
            "order": 2,
            "catalogContent": {
              '中文名': this.form2.chinaName,
              '外文名': this.form2.foreignName,
              '其他译名': this.form2.otherName,
              '上映时间': this.form2.releaseTime,
              '主演': this.form2.starring,
              '片长': this.form2.runningTime,
              '类型': this.form2.type,
              '出品公司：': this.form2.productCompany,
              '发行公司：': this.form2.distributionCompanies,
              '出品时间：': this.form2.byTime,
              '制片地区：': this.form2.productionAreas,
              '对白语言：': this.form2.dialogueLanguage,
              '拍摄地点：': this.form2.location,
              '色 彩：': this.form2.color,
              '导 演：': this.form2.director,
              '编 辑：': this.form2.editor,
              '拍摄日期': this.form2.dateTaken
            }
          }
        ]
      }
      if(this.entryDesc==undefined){
        this.$message.error('词条描述不能为空');
      }else {
        this.$refs['form1'].validate((valid) => {
         if(valid){
             console.log("表单1验证通过")
           this.$refs['form2'].validate((valid) => {
               if(valid){
                 console.log("表单2验证通过")
                 this.$http({
                   url: this.$http.adornUrl('web/entry/saveToDrafts'),
                   data:data1,
                   method: 'POST',

                 })
                   .then(({ data }) => {
                     if (data && data.code === 0) {
                       this.$router.push('/wikipedia/draft');
                     }
                   })
               }else {
                   return false
               }
           })
         }else {
             return false
          }
          })      }
      console.log(data1)
      /* this.$http({
       url: this.$http.adornUrl('web/entry/saveToDrafts'),
       method: 'POST',
       data:{}
       })
       .then(({ data }) => {
       this.restaurants=data.page.records
       var restaurants = this.restaurants;
       var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
       // 调用 callback 返回建议列表的数据
       cb(results);
       })*/
    },
    published(){
      var data1={
        "entryId": this.entrys.entry_id,
        "entryName": this.entrys.entry_name,
        "entryTypeId": this.entrys.type_id,
        "entryTypeName": this.entrys.type_name,
        "introduction":  this.entryDesc,
        "catalogs": [
          {
            "catalogId": "wmzb_1",
            "catalogName": "概述",
            "order": 1,
            "catalogContent": {
              "作品类型": this.form1.type,
              "地区": this.form1.region,
              "制式：": this.form1.standard,
              "导演": this.form1.director,
              "上映时间":  this.form1.date,
              "时长":  this.form1.time,
            }
          },
          {
            "catalogId": "wmzb_2",
            "catalogName": "基础信息",
            "order": 2,
            "catalogContent": {
              '中文名': this.form2.chinaName,
              '外文名': this.form2.foreignName,
              '其他译名': this.form2.otherName,
              '上映时间': this.form2.releaseTime,
              '主演': this.form2.starring,
              '片长': this.form2.runningTime,
              '类型': this.form2.type,
              '出品公司：': this.form2.productCompany,
              '发行公司：': this.form2.distributionCompanies,
              '出品时间：': this.form2.byTime,
              '制片地区：': this.form2.productionAreas,
              '对白语言：': this.form2.dialogueLanguage,
              '拍摄地点：': this.form2.location,
              '色 彩：': this.form2.color,
              '导 演：': this.form2.director,
              '编 辑：': this.form2.editor,
              '拍摄日期': this.form2.dateTaken
            }
          }
        ]
      }
      if(this.entryDesc==undefined){
        this.$message.error('词条描述不能为空');
      }else {
        this.$refs['form1'].validate((valid) => {
          if(valid){
            console.log("表单1验证通过")
            this.$refs['form2'].validate((valid) => {
              if(valid){
                console.log("表单2验证通过")
                this.$http({
                  url: this.$http.adornUrl('web/entry/saveAndPublish'),
                  data:data1,
                  method: 'POST',

                })
                  .then(({ data }) => {
                    if (data && data.code === 0) {
                      this.$router.push('/wikipedia/index');
                    }
                  })
              }else {
                return false
              }
            })
          }else {
            return false
          }
        })      }
      console.log(data1)
      /* this.$http({
       url: this.$http.adornUrl('web/entry/saveToDrafts'),
       method: 'POST',
       data:{}
       })
       .then(({ data }) => {
       this.restaurants=data.page.records
       var restaurants = this.restaurants;
       var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
       // 调用 callback 返回建议列表的数据
       cb(results);
       })*/
    }
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	},

};
</script>
<style>
.w-e-text {
	overflow: hidden;
}
.upload_form_item .el-input__inner{
	height: 35px !important;
    line-height: 35px !important;
}
.upload_form_item .el-form-item {
/*	margin-bottom: 9px !important;*/
}
.createMainBanner .el-form-item__content{
	min-width: 80px !important;
}
.dynamicElement{
	margin-top: 20px;
}
.dynamicElement .element_wrapper{
	display: flex;
	align-items: center;
	font-size: 12px;
	position: relative;
	margin-bottom: 20px;
}
.dynamicElement .element_wrapper .dynamicInput_wrapper{
	width: 80%;
	position: relative;
	height: 30px;
}
.dynamicElement .element_wrapper .dynamicInput_wrapper .wordLength{
	position: absolute;
	top: -16px;
	right: 0;
	color: #409eff;
}
.dynamicElement .element_wrapper .dynamicInput{
	width: 100%;
	height: 100%;
	line-height: 30px;
}
.dynamicElement .element_wrapper .dynamicInput .el-input__inner{
	height: 30px;
	line-height: 30px;
	border-radius:0px;
}
.dynamicElement .circle {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 1px solid #999;
	font-size: 16px;
	line-height: 16px;
	text-align: center;
	margin-left: 10px;
}
.dynamicElement .el-checkbox{
	margin: 0 5px;
}
.hisTory_wrapper .el-checkbox{
	margin-right: 5px;
}
.count {
	color: #409EFF;
	font-size: 12px;
	margin-left: 16px;
}
.transAngle{
	width:0;
    height:0;
	border-right:6px solid transparent;
	border-left:6px solid transparent;
	border-top:6px solid #409eff;
}
.transAngles{
	width:0;
    height:0;
	border-right:6px solid transparent;
	border-left:6px solid transparent;
	border-bottom:6px solid #409eff;
}
.dynamicElement .element_wrapper .addIcon{
	position: absolute;
	width: 16px;
	height: 16px;
	background: #409eff;
	line-height: 16px;
	text-align: center;
	top: 7px;
	left: -20px;
}
.addElement{
	position: relative;
}
.addElement:not(:last-child){
	margin-bottom: 10px;
}
.addElement .optionEle{
	position: absolute;
	right: -25px;
	top: 11px;
}
</style>
<style scoped>
.create_content{
	background: #ededed;
	width: 100%;
	margin-top: -50px;
}
body {
	background-color: #f5f5f5;
}
.w-e-text-container {
	height: 48px !important;
}

.toolbar {
	width: 90%;
	margin: 0 auto;
	text-align: center;
	height: 100%;
	line-height: 46px;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* border: 1px solid #ccc; */
}
.toolbar .label{
	position: relative;
	padding-left: 10px;
	line-height: 16px;
	font-size: 12px;
}
.toolbar .label::after{
	position: absolute;
	content: '';
	width: 2px;
	height: 100%;
	background: #409eff;
	top: 0;
	left: 2px;
}
.text {
	border: 1px solid #ccc;
	height: 100px;
	/* background-color: red; */
	overflow-y: none !important;
}
.isFixed {
	position: fixed;
	top: 86;
	left: 0;
	z-index: 999;
}
.editorTopTwo {
	position: fixed;
	top: 132px;
	left: 0;
	z-index: 999;
}
i {
	font-style: normal;
}
.editorTop {
	width: 100%;
	height: 46px;
	background-color: #fff;
}
.createEntry_wrapper{
	width: 90%;
	margin: 0 auto;
	height: 40px;
	display: flex;
	align-items: center;
}
.createEntry{
	position: relative;
}
.createEntry::after{
	position: absolute;
	content: '';
	width: 75%;
	height: 2px;
	background: rgb(64, 169, 255);
	bottom: -5px;
	left: 0;
}
.main {
	width: 90%;
	min-width: 1280px;
	margin: 0 auto;
	/* margin-top: 40px; */
	/* position: relative; */
	display: flex;
	justify-content: space-between;
}
.left {
	position: fixed;
	top: 170px;
	width: 250px;
	box-sizing: border-box;
}
.right {
	/* position: absolute;
	right: 0;
	top: 0; */
	width: 250px;
	min-height: 1391px;
	box-sizing: border-box;
}
.mainBanner {
	width: 60%;
	/* background-color: red; */
	min-height: 1319px;
	/* position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%); */
}
.editorMain {
	width: 100%;
	background-color: #fff;
	height: 130px;
	box-sizing: border-box;
}
.editormaintop {
	line-height: 30px;
	padding-left: 20px;
	padding-top: 20px;
}
.editormaintop .editormainbanner{
	margin-top: 10px;
	display: flex;
	align-items: center;
}
.createMain {
	width: 100%;
	height: auto;
	background-color: #fff;
	margin-top: 10px;
	box-sizing: border-box;
	padding: 34px 36px;
}
.createMainTitle {
	width: 100%;
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid #ccc;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.createMainTitle > span {
	font-size: 18px;
	line-height: 36px;
	position: relative;
}
.createMainTitle > span::after{
	content: '';
	position: absolute;
	width: 100%;
	height: 4px;
	background: #409eff;
	bottom: -7px;
	left: 0;
}
.createMainTitle .close {
	font-size: 12px;
	color: #409eff;
	display: flex;
	align-items: center;
}
.createMainTitle .close .transAngles{
	margin-left: 10px;
}
.createMainBanner {
	margin-top: 10px;
	/* height: 400px; */
	position: relative;
}
.createMainBannerLeft {
	position: absolute;
	top: 0;
	left: 0;
	width: 30%;
	/* background-color: pink; */
}
.addItem {
	position: relative;
	height: 40px;
	margin-top: 20px;
}
.addItem > span {
	display: inline-block;
	box-sizing: border-box;
	padding: 10px;
	width: 30px;
	height: 100%;
}
.avatar-uploader {
	width: 200px;
	height: 275px;
	background: #e6e6e6;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	text-align: center;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	margin-top: 107px;
}
.avatar {
	width: 200px;
	height: 275px;
	display: block;
}
.hisTory_wrapper{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
	margin-bottom: 20px;
}
.hisTory_wrapper .title{
	position: relative;
}
.hisTory_wrapper .title::after{
	position: absolute;
	content: '';
	width: 100%;
	height: 2px;
	background: rgb(64, 169, 255);
	bottom: -5px;
	left: 0;
}
.hisTory_wrapper .hisOptions{
	display: flex;
	align-items: center;
}
.AngleWrapper{
	position: relative;
	width: 12px;
	height: 15px;
	margin-left: 5px;
}
.AngleWrapper .top{
	position: absolute;
	top: 0;
	left: 0;
}
.AngleWrapper .bottom{
	position: absolute;
	left: 0;
	bottom: 0;
}
</style>
