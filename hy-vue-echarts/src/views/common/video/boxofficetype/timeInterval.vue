<template>
  <div>
    <el-row>
      <el-button type="primary" @click="chooseTab(1)">时段</el-button>
      <el-button @click="chooseTab(2)">影院</el-button>
      <el-button @click="chooseTab(3)">院线</el-button>
      <el-button @click="chooseTab(4)">影投</el-button>
      <el-button @click="chooseTab(5)">地域</el-button>
      <el-button @click="chooseTab(6)">省份</el-button>
      <el-button @click="chooseTab(7)">城市</el-button>
      <el-button @click="chooseTab(8)">周票房</el-button>
      <el-button @click="chooseTab(9)">预售</el-button>
      <el-button @click="chooseTab(10)">竞争分析</el-button>
    </el-row>
    <el-row style="margin-top:5px; position: relative;">
      日期：
      <el-date-picker
        v-model="timeDate"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      地区：
      <el-select v-model="cityValue" placeholder="请选择">
        <el-option
          v-for="item in cityOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      院线：
      <el-select v-model="boxofficeValue" placeholder="请选择">
        <el-option
          v-for="item in boxofficeOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      影院：
      <el-select v-model="cinemaValue" placeholder="请选择">
        <el-option
          v-for="item in cinemaOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="position: relative; top:0; right:0;">查询</el-button>
    </el-row>
    <el-row style="margin-top:5px; position: relative;">
      <div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
        <div class="title-l">
            <el-button type="text">《无名之辈》票房趋势</el-button>
                <el-button type="text">2108-12-10 -- 2018-12-20</el-button>
                <el-select v-model="trendValue" placeholder="票房趋势">
                  <el-option
                    v-for="item in trendOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="dateValue" placeholder="全天">
                  <el-option
                    v-for="item in dateOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
        </div>
        <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
      </div>
      <div id="J_chartbarBoxoffice" style="height: 400px"></div>
    </el-row>
    <el-row style="background: #ffffff;padding: 0;margin: 10px;">
      <el-col :span="24" style="padding: 0">
          <div style="overflow:hidden;border-bottom: 1px solid #DEDEDE">
            <div class="title-l">
                <el-button type="text">《无名之辈》</el-button>
            </div>
            <div style="float: right;">
                <el-button type="text" class="f-blue">更多指标+</el-button>
                <el-button type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
            </div>
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              row-class-name="table-row"
            >
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="currentboxoffice" label="当前票房（万）">
              </el-table-column>
              <el-table-column prop="movie1" label="票房占比"></el-table-column>
              <el-table-column prop="movie2" label="当前场次">
              </el-table-column>
              <el-table-column prop="movie3" label="场次占比"></el-table-column>
              <el-table-column prop="movie4" label="当前人次（万）"></el-table-column>
              <el-table-column prop="movie5" label="当前排座（万）"></el-table-column>
              <el-table-column prop="movie6" label="人次占比"></el-table-column>
              <el-table-column prop="movie7" label="当前平均票价"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :total="1000"
            />
          </div>
      </el-col>
    </el-row>
  </div>
</template>
