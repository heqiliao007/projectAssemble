<template>
  <div>
    <div style="background: #fff;">
      <!-- <div id="editor" class="editor"></div> -->
      <div id="div1" class="toolbar">
      <el-button>预览</el-button>
      <el-button>存草稿</el-button>
      <el-button>发表</el-button>
    </div>
    <div style="padding: 5px 0; color: #ccc">中间隔离带</div>
    <div  class="text" id="div2"> <!--可使用 min-height 实现编辑区域自动增加高度-->
        <!-- <p>请输入内容</p> -->
        <!-- <input  type="text" v-model='name' style="border: 1px solid #eee;"> -->
    </div>
    <div id="div3" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
        <!-- <p>请输入内容</p> -->
        <input type="text" style="border: 1px solid #eee;">
    </div>
      <button class="btn btn-royal" @click="postfillContent()">保存</button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  data() {
    return {
      name: '',
      editor: null
    }
  },
  		name: 'editor',
  	mounted () {
      this.activated()
    },

  	methods:{
      postfillContent() {
        console.log(this.editor.txt.getJSON(), this.name)

      },
      activated () {
  			//请求文章
	      this.aa()
	    },
  		aa(){
  			// 当接口请求成功在执行方法创建富文本编辑器
  			this.bb()
		},
		bb(){
      this.editor = new E('#div1', '#div2', '#div3  ')

      // var editor2 = new E('#div3')
        // editor2.create()
      // var editor = new E('#div1', '#div2')
      this.editor.customConfig.onchange = (html) => {
        this.formArticle = html
      }
      this.editor.customConfig.menus = [
          'undo',  // 撤销
          'redo',  // 重复
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'link',  // 插入链接
          'fontSize',  // 字号
          'fontName',  // 字体
          'list',  // 列表
          'justify',  // 对齐方式
      ]
       this.editor.customConfig.colors = [
        '#ffffff'
    ]
      // editor.customConfig.uploadImgServer = '<%=path%>/Img/upload'; //上传URL
      // editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
      // editor.customConfig.uploadImgMaxLength = 5;
      // editor.customConfig.uploadFileName = 'myFileName';
      // editor.customConfig.uploadImgHooks = {
      // customInsert: function (insertImg, result, editor) {
      //             // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
      //             // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

      //             // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
      //             var url =result.data;
      //             insertImg(url);

      //             // result 必须是一个 JSON 格式字符串！！！否则报错
      //         }
      //     }
          this.editor.create();
    },
	}


}
</script>
<style scoped>
  .toolbar {
    width: 30%;
    margin: 0 auto;
    text-align: center;
    height: 86px;
    line-height: 86px;
    background-color: #ffffff;
    /* border: 1px solid #ccc; */
  }
  .text {

    border: 1px solid #ccc;
    height: 100px;
  }
</style>

