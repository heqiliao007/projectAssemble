<template>
  <div class="moreContaint">
    <el-row>
      <el-col :span="4">
        <div class="moreContaintLeft_header">
          <span class="title">已选指标</span>
          <span style="margin-left:10px; color: #3295D9;" @click="recovery">恢复默认</span>
        </div>
        <div class="moreContaintLeft_body">
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="label">{{ node.label }}</span>
              <span class="icon">
                <el-button

                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  X
                </el-button>
              </span>
            </span>
          </el-tree>
            <!-- <ul v-for="(item, index) in ischooseList" :key="index">
              <li>{{item.name}}
                <span class="icon" v-show="item.closable">X</span>
              </li>
            </ul> -->
          <p class="upandedown">上下拖动指标进行排序</p>
          <el-button class='sureButton' type="primary" @click="onSure">确 认</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="moreContaintMiddle1_header">
          <span class="title">基本信息</span>
          <span style="margin-left:10px;">（已选择<i style="color:#3295D9; font-style: normal"> 4 </i> /13）</span>
        </div>
        <div class="moreContaintMiddle1_body" v-for="(baseItem, index) in baseInfoList" :key='index'>
          <el-checkbox v-model="baseItem.checked" @change="handleCheckedBaseInfoChange(baseItem)">{{baseItem.name}}</el-checkbox>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="moreContaintMiddle2_header">
          <span class="title">票房分析</span>
          <span style="margin-left:10px;">（已选择<i style="color:#3295D9; font-style: normal"> 4 </i> /13）</span>
        </div>
        <div class="moreContaintMiddle2_body" v-for="(boxOfficeItem, index) in boxOfficeList" :key='index'>
          <el-checkbox v-model="boxOfficeItem.checked" @change="handleCheckedboxOfficeItemChange(boxOfficeItem)">{{boxOfficeItem.name}}</el-checkbox>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="solid"></div>
      </el-col>
      <el-col :span="4">
        <div class="">
          <div class="moreContaintMiddle2_header">
            <span class="title">收益分析</span>
            <span style="margin-left:10px;">（已选择<i style="color:#3295D9; font-style: normal"> 4 </i> /6）</span>
          </div>
          <div class="moreContaintMiddle2_body" v-for="(revenueListItem, index) in revenueList" :key='index'>
            <el-checkbox v-model="revenueListItem.checked" @change="handleCheckedrevenueListItemChange(revenueListItem)">{{revenueListItem.name}}</el-checkbox>
          </div>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="">
          <div class="moreContaintMiddle2_header">
            <span class="title">黄金场分析</span>
            <span style="margin-left:10px;">（已选择<i style="color:#3295D9; font-style: normal"> 4 </i> /6）</span>
          </div>
          <div class="moreContaintMiddle2_body" v-for="(goldMarketItem, index)  in goldMarketList" :key='index'>
            <el-checkbox v-model="goldMarketItem.checked" @change="handleCheckedgoldMarketItemChange(goldMarketItem)">{{goldMarketItem.name}}</el-checkbox>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Sortable  from 'sortablejs'
// import headEr from "../head/head-er";
export default {
  data() {
    return {
      chooseList:[
        {
          id: 1,
          label: '排名',
          closable: false
        }, {
          id: 2,
          label: '影片名称',
          closable: true
        }, {
          id: 3,
          label: '对比分析',
          closable: true
        }, {
          id: 4,
          label: '当前票房（万）',
          closable: true
        }
      ],
      data: [{
          id: 1,
          label: '排名',
          closable: false
        }, {
          id: 2,
          label: '影片名称',
          closable: true
        }, {
          id: 3,
          label: '对比分析',
          closable: true
        }, {
          id: 4,
          label: '当前票房（万）',
          closable: true
        }],
      baseInfoList: [
        { id: 1, name: '排名', checked: true },
        { id: 2, name: '影片名称', checked: true },
        { id: 3, name: '对比分析', checked: true   },
        { id: 4, name: '上映日期', checked: false },
        { id: 5, name: '历史排名', checked: false },
        { id: 6, name: '影片制式', checked: false },
        { id: 7, name: '作品类型', checked: false },
        { id: 8, name: '导演', checked: false },
        { id: 9, name: '出品公司', checked: false },
        { id: 10, name: '制作公司', checked: false },
        { id: 11, name: '发行公司', checked: false },
        { id: 12, name: '国别', checked: false },
        { id: 13, name: '投资规模', checked: false },
      ],
      boxOfficeList: [
        { id: 14, name: '当前票房（万）', checked: true },
        { id: 15, name: '累计票房（万）', checked: false },
        { id: 16, name: '当前场次', checked: false },
        { id: 17, name: '累计票房', checked: false },
        { id: 18, name: '当前人次（万）', checked: false },
        { id: 19, name: '累计人次（万）', checked: false },
        { id: 20, name: '场次占比', checked: false },
        { id: 21, name: '人次占比', checked: false },
        { id: 22, name: '票房占比', checked: false },
        { id: 23, name: '票房占全国比', checked: false },
        { id: 24, name: '票房环比', checked: false },
        { id: 25, name: '场次环比', checked: false },
        { id: 26, name: '场次占全国比', checked: false },
        { id: 27, name: '人次占全国比', checked: false },
        { id: 28, name: '人次环比', checked: false },
        { id: 29, name: '排座占比', checked: false },
        { id: 30, name: '上午场票房（万）', checked: false },
        { id: 31, name: '上午场人次（万）', checked: false },
        { id: 32, name: '上午场场次', checked: false },
        { id: 33, name: '下午场票房', checked: false },
        { id: 34, name: '下午场场次', checked: false },
        { id: 35, name: '下午场人次', checked: false },
        { id: 36, name: '当前平均票价', checked: false },
        { id: 37, name: '累计上映天数', checked: false },
        { id: 38, name: '服务器', checked: false },
      ],
      revenueList: [
        { id: 39, name: '上座率', checked: false },
        { id: 40, name: '放映影院', checked: false },
        { id: 41, name: '放映银幕', checked: false },
        { id: 42, name: '单银幕票房', checked: false },
        { id: 43, name: '场均收入', checked: false },
        { id: 44, name: '场均人次', checked: false }
      ],
      goldMarketList: [
        { id: 45, name: '黄金场票房', checked: false },
        { id: 46, name: '黄金场场次', checked: false },
        { id: 47, name: '黄金场人次（万）', checked: false },
        { id: 48, name: '黄金场场次人次', checked: false },
        { id: 49, name: '黄金场票房占比', checked: false },
        { id: 50, name: '黄金场场次占比', checked: false },
        { id: 51, name: '黄金场人次占比', checked: false }
      ]
    };
  },
  components:{
    draggable,
    Sortable
  },
  methods: {
    // 点击确认按钮，保存所有选项
    onSure () {
      console.log('点击确认按钮')
    },
    // 点击恢复默认选项
    recovery () {
      console.log('点击恢复')
      let _this = this
      _this.data = [
        {
          id: 1,
          label: '排名',
          closable: false
        }, {
          id: 2,
          label: '影片名称',
          closable: true
        }, {
          id: 3,
          label: '对比分析',
          closable: true
        }, {
          id: 4,
          label: '当前票房（万）',
          closable: true
        }
      ]
    },
    remove(node, data) {
      let _this = this
      console.log(data.id)
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        // 改变右侧已经选中的状态--基本信息
        for (let i = 0; i < _this.baseInfoList.length; i++) {
          if (data.id === _this.baseInfoList[i].id) {
            _this.baseInfoList[i].checked = false
            return
          }
        }
        // 改变右侧已经选中的状态--票房信息
        for (let j = 0; j < _this.boxOfficeList.length; j++) {
          if (data.id === _this.boxOfficeList[j].id) {
            _this.boxOfficeList[j].checked = false
            return
          }
        }
        // 改变右侧收益分析状态
        for (let k = 0; k < _this.revenueList.length; k++) {
          if (data.id === _this.revenueList[k].id) {
            _this.revenueList[k].checked = false
            return
          }
        }
        // 改变右侧黄金场分析状态
        for (let v = 0; v < _this.goldMarketList.length; v++) {
          if (data.id === _this.goldMarketList[v].id) {
            _this.goldMarketList[v].checked = false
            return
          }
        }
        // for ()
        // if (data.id === )
      },
    // 基本信息选择
    handleCheckedBaseInfoChange (e) {
      console.log('基本信息单选,', e.checked)
      if (e.checked === false) {
        const index = this.data.findIndex(e => e.id === this.data.id)
        this.data.splice(index, 1)
      } else {
        this.data.push({
          id: e.id,
          label: e.name,
          closable: e.checked
        })
      }
    },
    // 票房分析选择
    handleCheckedboxOfficeItemChange (e) {
      console.log('票房分析选择', e)
      if (e.checked === false) {
        const index = this.data.findIndex(e => e.id === this.data.id)
        this.data.splice(index, 1)
      } else {
        this.data.push({
          id: e.id,
          label: e.name,
          closable: e.checked
        })
      }
    },
    // 收入分析
    handleCheckedrevenueListItemChange (e) {
      console.log('收入分析')
            console.log('基本信息单选,', e.checked)
      if (e.checked === false) {
        const index = this.data.findIndex(e => e.id === this.data.id)
        this.data.splice(index, 1)
      } else {
        this.data.push({
          id: e.id,
          label: e.name,
          closable: e.checked
        })
      }
    },
    // 黄金档选择
    handleCheckedgoldMarketItemChange (e) {
      console.log('黄金档选择')
            console.log('基本信息单选,', e.checked)
      if (e.checked === false) {
        const index = this.data.findIndex(e => e.id === this.data.id)
        this.data.splice(index, 1)
      } else {
        this.data.push({
          id: e.id,
          label: e.name,
          closable: e.checked
        })
      }
    },
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log(dropNode.data.label)
      // return true;
      if (dropNode.data.label === '') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      // console.log('1')
      console.log(draggingNode.data.label.indexOf('1'))
      return draggingNode.data.label.indexOf('') === 0;
    }
  },
  mounted() {

    // this.handleClick(this.activeName);
  },
  components: {
    // headEr
  }
};
</script>
<style lang="scss" scoped>
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .moreContaint {
    border-top: 1px solid #eee;
    .moreContaintLeft_header {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;
      padding-left: 2px;
      padding-right: 2px;
    }
    .moreContaintLeft_body > ul{
      width: 100%;
      background-color: #F5F5F5;
      line-height: 40px;
      position: relative;
    }
    .moreContaintMiddle1_header, .moreContaintMiddle2_header {
      margin-top: 10px;
      margin-left: 110px;
      /* display: flex; */
      /* flex-direction: row;
      justify-content: space-between; */
      box-sizing: border-box;
      padding-left: 2px;
      padding-right: 2px;
    }
    .moreContaintMiddle1_body, .moreContaintMiddle2_body {
      margin-left: 110px;
      margin-top: 10px;
    }
    .moreContaintMiddle2_header, .moreContaintMiddle2_body {
      margin-left: 0px;
    }
  }
  .custom-tree-node {
    width: 100%;
    /* background-color: #F5F5F5; */
    line-height: 40px;
    position: relative;
  }
  .label {
    width: 100%;
    background-color: #F5F5F5;
  }
  .icon{
        /* text-align: right; */
        position: absolute;
        top: 50%;
        right: 0px;
        transform: translateY(-50%);
      }
  .upandedown {
        width: 100%;
        color:#0096DC;
        text-align: center;
        margin-top: 20px;
      }
  .sureButton {
    position: relative;
    width: 50%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .solid {
    height: 300px;
    border-right: 6px solid #DEDEDE;
    margin-top: 86px;
    margin-right: 40px;
  }
  ul {
    list-style: none;
  }
</style>
