<template>
  <div class="handle">
    <el-tabs v-model="activeName" style="margin-top:18px">
      <!-- 潜水事故处置流程列表 -->
      <el-tab-pane label="潜水事故处置流程列表" name="first">
        <el-row>
          <el-col :span="21" class="trees">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current>
              <span class="custom-tree-node" slot-scope="{ node,data }">
                <span>
                     <img :class="data.className"/>
                     {{ node.label }}
                </span>    
              </span>
            </el-tree>
          </el-col>
          <el-col :span="3" style="padding-left:18px;">
            <el-button style="width:100%;">查看</el-button>
            <el-button style="width:100%;margin:10px 0 0 0px;">打开表</el-button>
          </el-col>
      </el-row>
      </el-tab-pane>
      <!-- 其他应急处置流程 -->
      <el-tab-pane label="其他应急处置流程" name="second">
        <el-table
          border
          max-height="400"
          :data = "handleData"
          :cell-style="{fontSize:'18px'}"
          class="tables"
          :header-cell-class-name="headerCell"
        >
          <el-table-column align="center">
            <el-table-column label="程序名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <el-table-column label="来源" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.origin"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center"  label="负责人">
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="职务" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.post">
                  <el-option label="区域一" value="1"></el-option>
                  <el-option label="区域二" value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'EmergencyHandle',
  data () {
    return {
      activeName: 'first',
      data: [{
        id: 1,
        label: '减压不当',
        className: 'tree-icon',
        children: [{
          id: 5,
          label: '减压过快',
          className: 'tree-icon'
        }, {
          id: 6,
          label: '减压过慢',
          className: 'tree-icon'
        }, {
          id: 7,
          label: '水面减压间隔时间过长',
          className: 'tree-icon'
        }]
      }, {
        id: 2,
        label: '意外事件',
        className: 'tree-icon',
        children: [{
          id: 8,
          label: '二级 2-1',
          className: 'tree-icon'
        }, {
          id: 9,
          label: '二级 2-2',
          className: 'tree-icon'
        }]
      }, {
        id: 3,
        label: '例外暴露',
        className: 'tree-icon',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }, {
        id: 4,
        label: '疾病救治',
        className: 'tree-icon',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      handleData: [{
        post: ''
      }]
    }
  },
  methods: {
    headerCell (row, column, rowIndex, columnIndex) {
      return 'headerCell'
    },
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys())
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    
    /deep/ .handle .el-tabs__item{
      font-size: $text-size26;
      color: $color-text-333;
    }
    /deep/ .handle  .el-tabs__header{
      margin: 6px 0 15px;
    }
    /deep/ .handle .el-select-dropdown__list .el-select-dropdown__item{
      font-size: $text-size-small;
    }
    /deep/ .handle .el-form-item__label{
      font-size: $text-size16;
    }
    /deep/ .handle .el-input__inner{
        border: none;
    }
    .handle{
        .trees{
          border:2px solid $color-border-blue;
          // height: 192px;
          padding:16px 16px 200px;
          .tree-icon{
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url(../img/folder.png);
            background-size:100% 100%;
          }
        }
        .tables{
          border:1px solid $color-border-blue;
          border-top:none;
        }
        .borders{
          border:2px solid $color-border-blue;
          height: 638px;
          & .tables{
            border-left:0;
            border-right:0;
          }
        }
    }
</style>