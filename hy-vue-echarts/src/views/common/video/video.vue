<template>
	<div style="margin: 0 57px 0;">
		<!-- <el-header style="height:135px;"><HeadEr></HeadEr></el-header> -->
		<el-row style="margin: 15px 0;">
			<el-col :span="12">
				<el-breadcrumb separator-class="el-icon-arrow-right" style="border-left: 2px solid rgb(65, 169, 254);padding-left: 6px;">
					<el-breadcrumb-item style="font-weight: 500;" @click.native="goPre" class="text_hover">{{ lastmenu }}</el-breadcrumb-item>
					<el-breadcrumb-item>影片-{{ data.name }}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			<el-col :span="12">
				<div class="right">
					<div class="mores" v-if="more == false">
						<span class="add"></span>
						<span class="back"></span>
						<span class="nocollect" v-if="iscollect == false"></span>
						<span class="collect" v-else></span>
					</div>
					<span class="more" @click="mores()">
						<img src="./img/white/classify-icon.png" alt="" v-if="more" />
						<img src="./img/blue/classify-icon.png" alt="" v-else />
					</span>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<div>
					<span class="name">{{ data.name }}</span>
					<p><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span></p>
					<!-- <span class="contrast">
						<img src="./img/contrast.png" alt="" style="vertical-align: bottom;" />
						对比
					</span> -->
				</div>
				<div style="margin-top: 30px;">
					<el-row>
						<el-col :span="11"><img :src="data.image" alt="" class="main" @error="nofind" /></el-col>
						<el-col :span="13">
							<div class="message">
								<p>
									<span>地区</span>
									：
									<span v-for="item in data.makeAddress" :key="item.id">{{ item.name }}</span>
								</p>
								<p>
									<span>作品类型</span>
									：{{ data.typeId }}
								</p>
								<p>
									<span>制式</span>
									：{{ data.standard }}
								</p>
								<p>
									<span>导演</span>
									：
									<span v-for="item in data.derector" :key="item.id">{{ item.name }}</span>
								</p>
								<p>
									<span>上映时间</span>
									：{{ data.showTime }}
								</p>
								<p>
									<span>时长</span>
									：{{ data.duration }}min
								</p>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="18">
				<el-row>
					<el-col :span="8">
						<div class="statistical">
							<div>
								<div style="text-align: center;" v-if="statistical.releaseDays.length < 3">
									<span class="day" v-if="statistical.releaseDays.length > 0">
										{{ statistical.releaseDays[0] }}
										<span></span>
									</span>
									<span class="day" v-if="statistical.releaseDays.length > 1">
										{{ statistical.releaseDays[1] }}
										<span></span>
									</span>
									天
								</div>
								<div style="text-align: center;" v-else>
									<span class="day">
										9
										<span></span>
									</span>
									<span class="day">
										9
										<span></span>
									</span>
									天+
								</div>
								<p class="time">{{ data.showTime + '~' + data.releaseDate }}</p>
							</div>
							<div class="item" style="margin-top: 40px;">
								<p class="item-top three">
									<span style="color: #CF0000;">{{ statistical.firstDay / 10000 }}</span>
									万
								</p>
								<p class="item-btm">首映日票房</p>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="item">
							<p class="item-top one">
								<span style="color: #0084CF;">{{ statistical.boxOfficeSum }}</span>
								亿
							</p>
							<p class="item-btm">累计票房</p>
						</div>
						<div class="item" style="margin-top: 40px;">
							<p class="item-top four">
								<span style="color: #EAB600;">{{ statistical.firstWeek }}</span>
								万
							</p>
							<p class="item-btm">首周票房</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="item">
							<p class="item-top three">
								<span style="color: #63D84C;">{{ statistical.opens }}</span>
								万
							</p>
							<p class="item-btm">点映票房</p>
						</div>
						<div class="item" style="margin-top: 40px;">
							<p class="item-top five">
								<span style="color: #B451CA;">{{ statistical.firstWeekend }}</span>
								万
							</p>
							<p class="item-btm">首周末票房</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!-- 影片资料部分 -->
		<el-row>
			<p style="font-size: 18px; color: #4C4C4C;">影片资料</p>
			<p style="width: 45px; border-bottom: 3px solid #40A9FF; margin-top: -10px;"></p>
			<el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="12" class="colStyle">
					<p style="width: 50%; padding-left: 5px;margin: 0;" class="hoverLeftStyle">
						<span style="font-size: 14px; color: #4C4C4C; font-weight: 700;">中文名称</span>
						<span style="font-size: 14px; color: #4C4C4C; margin-left: 20px;">{{ data.name }}</span>
					</p>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="24" class="colStyle">
					<p style="font-size: 14px; color: #4C4C4C; font-weight: 700; padding-left: 5px;margin: 0;" class="hoverLeftStyle">影片简介</p>
					<p style="font-size: 14px; color: #4C4C4C; padding-left: 5px;line-height: 18px;margin-top: 0;">{{ data.intro }}</p>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="8" class="colone">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">外文名称</span>
						<span class="contantStyle">{{ data.foreignName }}</span>
					</div>
				</el-col>
				<el-col :span="8" class="coltwo">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">拍摄日期</span>
						<span class="contantStyle">{{ data.filmingDate }}</span>
					</div>
				</el-col>
				<!-- <el-col :span="8" class="colthree">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">其它译名</span>
						<span class="contantStyle">{{ data.othername }}</span>
					</div>
				</el-col> -->
				<el-col :span="8" class="colthree">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">上映时间</span>
						<span class="contantStyle">{{ data.showTime }}</span>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="8" class="colone">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">主演</span>
						<div class="contantStyle" style="display: inline-block;">
							<div style="display: inline-block;" v-for="(item, index) in mainactor" :key="item.id">
								<span class="colorStyle" @click="alink({ id: item.id })" >{{ item.name }}</span>
								<span v-if="index != mainactor.length - 1">，</span>
							</div>
						</div>
						<!-- <span
							class="contantStyle colorStyle text_hover"
							style="display: inline;line-height: 40px;"
							v-for="item in mainactor"
							:key="item"
							@click="alink({ name: item.id })"
						>
							{{ item.name }}
						</span> -->
					</div>
				</el-col>
				<el-col :span="8" class="coltwo">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">片长</span>
						<span class="contantStyle">{{ data.duration }}分钟</span>
					</div>
				</el-col>
				<el-col :span="8" class="colthree">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">类型</span>
						<span class="contantStyle">{{ data.typeId }}</span>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="8" class="colone">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">出品公司</span>
						<div class="contantStyle" style="display: inline-block;">
							<div style="display: inline-block;" v-for="(item, index) in data.productCompany" :key="item.id">
								<span class="colorStyle">{{ item.name }}</span>
								<span v-if="index != data.productCompany.length - 1">，</span>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="8" class="coltwo">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">发行公司</span>
						<div class="contantStyle" style="display: inline-block;">
							<div style="display: inline-block;" v-for="(item, index) in data.publisher" :key="item.id">
								<span class="colorStyle">{{ item.name }}</span>
								<span v-if="index != data.publisher.length - 1">，</span>
							</div>
						</div>
						<!-- <span class="contantStyle colorStyle">{{ data.publisher }}</span> -->
					</div>
				</el-col>
				<el-col :span="8" class="colthree">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">出品时间</span>
						<span class="contantStyle">{{ data.productionTime }}年</span>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="8" class="colone">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">制片地区</span>
						<span class="contantStyle" v-for="item in data.makeAddress" :key="item.id">{{ item.name }}</span>
					</div>
				</el-col>
				<el-col :span="8" class="coltwo">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">对白语言</span>
						<span class="contantStyle">{{ data.dialogue }}</span>
					</div>
				</el-col>
				<el-col :span="8" class="colthree">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">拍摄地点</span>
						<span class="contantStyle" v-for="item in data.filmingAddress" :key="item.id">{{ item.name }}</span>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="8" class="colone">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">色彩</span>
						<span class="contantStyle">{{ data.color }}</span>
					</div>
				</el-col>
				<el-col :span="8" class="coltwo">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">导演</span>
						<div class="contantStyle" style="display: inline-block;">
							<div style="display: inline-block;" v-for="(item, index) in data.derector" :key="item.id">
								<span class="colorStyle">{{ item.name }}</span>
								<span v-if="index != data.derector.length - 1">，</span>
							</div>
						</div>
						<!-- <span class="contantStyle colorStyle" style="width: auto;" v-for="item in data.derector" :key="item.id">{{ item.name }}</span> -->
					</div>
				</el-col>
				<el-col :span="8" class="colthree">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">编剧</span>
						<div class="contantStyle" style="display: inline-block;">
							<div style="display: inline-block;" v-for="(item, index) in data.maker" :key="item.id">
								<span class="colorStyle">{{ item.name }}</span>
								<span v-if="index != data.maker.length - 1">，</span>
							</div>
						</div>
						<!-- <span class="contantStyle colorStyle" style="width: auto;" v-for="item in data.maker" :key="item.id">{{ item.name }}</span> -->
					</div>
				</el-col>
			</el-row>
			<!-- <el-row type="flex" class="row-bg rowStyle" justify="space-between">
				<el-col :span="8" class="colone">
					<div class="colStyle" style="padding-left: 5px;">
						<span class="titleStyle">拍摄日期</span>
						<span class="contantStyle">{{ data.filmingDate }}</span>
					</div>
				</el-col>
			</el-row> -->
		</el-row>
		<el-row><div></div></el-row>
		<!-- 影片票房部分 -->
		<el-row>
			<p style="font-size: 18px; color: #4C4C4C;">影片票房</p>
			<p style="width: 45px; border-bottom: 3px solid #40A9FF; margin-top: -10px;"></p>
			<div>
				<!-- <el-button size="small" :type="menuName == '时段' ? 'primary' : ''" @click="chooseMenu('时段')">时段</el-button> -->
				<el-button size="small" :type="menuName == '影院' ? 'primary' : ''" @click="chooseMenu('影院')">影院</el-button>
				<el-button size="small" :type="menuName == '院线' ? 'primary' : ''" @click="chooseMenu('院线')">院线</el-button>
				<!-- <el-button size="small" :type="menuName == '影投' ? 'primary' : ''" @click="chooseMenu('影投')">影投</el-button> -->
				<el-button size="small" :type="menuName == '地域' ? 'primary' : ''" @click="chooseMenu('地域')">地域</el-button>
				<el-button size="small" :type="menuName == '省份' ? 'primary' : ''" @click="chooseMenu('省份')">省份</el-button>
				<el-button size="small" :type="menuName == '城市' ? 'primary' : ''" @click="chooseMenu('城市')">城市</el-button>
				<!-- <el-button size="small" :type="menuName == '周票房' ? 'primary' : ''" @click="chooseMenu('周票房')">周票房</el-button>
				<el-button size="small" :type="menuName == '预售' ? 'primary' : ''" @click="chooseMenu('预售')">预售</el-button>
				<el-button size="small" :type="menuName == '竞争分析' ? 'primary' : ''" @click="chooseMenu('竞争分析')">竞争分析</el-button> -->
			</div>
			<div v-if="menuName == '竞争分析'" style="margin-top: 20px;">
				<el-button size="small" round>同档期</el-button>
				<el-button size="small" round>同类型</el-button>
			</div>
			<div style="margin-top: 20px;">
				<span v-if="menuName != '周票房'">日期：</span>
				<el-date-picker
					v-if="menuName != '周票房' && menuName != '预售' && menuName != '时段'"
					size="small"
					v-model="date"
					type="date"
					placeholder="选择日期"
				></el-date-picker>
				<el-date-picker
					v-if="menuName == '时段'"
					v-model="date2"
					size="small"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
				<el-button size="small" v-if="menuName == '预售'">总计</el-button>
				<el-button size="small" v-if="menuName == '预售'">今天</el-button>
				<el-button size="small" v-if="menuName == '预售'">明天</el-button>
				<span style="margin-left:26px" v-if="(menuName != '地域' && menuName != '省份' && menuName != '周票房' && menuName != '预售') || menuName == '院线'">地区：</span>
				<el-button
					v-popover:popover2
					size="small"
					style="width:150px; height: 34px; border: 1px solid #eee; text-align: center;"
					v-if="(menuName != '地域' && menuName != '省份' && menuName != '周票房' && menuName != '预售') || menuName == '院线'"
				>
					{{ chooseregionText }}
				</el-button>
				<el-popover
					v-if="(menuName != '地域' && menuName != '省份' && menuName != '周票房' && menuName != '预售') || menuName == '院线'"
					ref="popover2"
					placement="bottom"
					title=""
					width="380"
					trigger="click"
					content=""
				>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="按地域" name="first">
							<template>
								<el-table :data="urbanHierarchy" height="250" :show-header="noshow" @row-click="chooseUrban" style="width: 100%; border: none;">
									<el-table-column prop="label" label="" width=""></el-table-column>
								</el-table>
							</template>
						</el-tab-pane>
						<el-tab-pane label="按地区" name="second">
							<template>
								<el-table :data="region" height="250" @row-click="chooseRegion" :show-header="noshow" style="width: 100%">
									<el-table-column prop="label" label="" width="320"></el-table-column>
								</el-table>
							</template>
						</el-tab-pane>
						<el-tab-pane label="按省份" name="third">
							<template>
								<el-table :data="province" @row-click="chooseProvince" height="250" :show-header="noshow" style="width: 100%">
									<el-table-column prop="value" label="" width="320"></el-table-column>
								</el-table>
							</template>
						</el-tab-pane>
						<!-- <el-tab-pane label="按城市" name="third">省份</el-tab-pane> -->
					</el-tabs>
				</el-popover>
				<span style="margin-left:26px" v-if="menuName != '影投' && menuName != '周票房' && menuName != '预售'">院线：</span>
				<el-select v-if="menuName != '影投' && menuName != '周票房' && menuName != '预售'" v-model="chinasvalue" placeholder="请选择" size="small">
					<el-option v-for="item in chiansOptions" :key="item.id" :label="item.name" :value="item"></el-option>
				</el-select>
				<span style="margin-left:26px" v-if="menuName == '时段' || menuName == '影院' || menuName == '院线'">影院：</span>
				<el-select
					v-if="menuName == '时段' || menuName == '影院' || menuName == '院线'"
					size="small"
					v-model="cinema"
					filterable
					reserve-keyword
					remote
					:remote-method="remoteMethod"
					:loading="cinemaloading"
					v-el-select-loadmore="loadmore"
				>
					<el-option v-for="item in cinemaOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-button type="primary" size="small" v-if="menuName != '周票房' && menuName != '预售'" @click="search()">查询</el-button>
			</div>
			<div v-if="showChart">
				<div style="margin-top: 20px;">
					<span style="display: inline-block; width: 79%; font-weight: 700; font-size: 14px;">{{ data.name }}-票房趋势</span>
					<el-button :type="charttype == '场次' ? 'info' : ''" round @click="changechart('场次')" size="small">场次趋势</el-button>
					<el-button :type="charttype == '人次' ? 'info' : ''" round @click="changechart('人次')" size="small">人次趋势</el-button>
					<el-button :type="charttype == '票房' ? 'info' : ''" round @click="changechart('票房')" size="small">票房趋势</el-button>
					<!-- <span style="display: inline-block; height: 20px; width: 1px; border-right: 2px solid #ccc; margin-bottom: -3px; margin-left: 20px; margin-right: 20px;"></span>
					<span style="display: inline-block; height: 20px; width: 1px; border-right: 2px solid #ccc; margin-bottom: -3px; margin-left: 20px; margin-right: 20px;"></span>
					<el-button type="info" round size="small">全天</el-button>
					<el-button round size="small">上午场</el-button>
					<el-button round size="small">下午场</el-button>
					<el-button round size="small">黄金场</el-button> -->
				</div>
				<div id="boxofficeTrend" style="height: 400px; width: 100%; margin-top: 20px;" v-loading="boxofficeTrendLoading"></div>
			</div>
			<div style="margin-top: 20px;" v-if="showTable">
				<!-- <el-table :data="boxofficetableData" stripe :header-cell-style="headerCellStyle" style="width: 100%">
					<el-table-column type="index" label="排名" width="80px">
						<template slot-scope="scope">
							<span>{{ scope.$index + 1 + (current - 1) * 10 }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="院线名称" width="180"></el-table-column>
					<el-table-column prop="num" label="当前票房（万)" width="180"></el-table-column>
					<el-table-column prop="province" label="省份"></el-table-column>
					<el-table-column prop="city" label="城市"></el-table-column>
					<el-table-column prop="num" label="票房占比"></el-table-column>
					<el-table-column prop="num" label="当前场次"></el-table-column>
					<el-table-column prop="num" label="场次占比"></el-table-column>
					<el-table-column prop="num" label="当前人次（万）"></el-table-column>
					<el-table-column prop="num" label="人次占比"></el-table-column>
				</el-table> -->
				<el-table
					v-if="menuName == '院线'"
					:data="chinastableData"
					stripe
					:header-cell-style="headerCellStyle"
					v-loading="boxofficeloading"
					:row-class-name="tableRowClassName"
					style="width: 100%"
				>
					<el-table-column prop="cinemaline_name" label="所属院线" width="180"></el-table-column>
					<el-table-column prop="box_office" label="当前票房（万)" width="180">
						<template slot-scope="scope">
							<span>{{ parseInt(scope.row.box_office / 10000) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="province_name" label="省份"></el-table-column>
					<el-table-column prop="city_name" label="城市"></el-table-column>
					<el-table-column prop="box_office_rate" label="票房占比">
						<template slot-scope="scope">
							<span v-if="scope.row.box_office_rate == null">{{ scope.row.box_office_rate }}</span>
							<span v-else>{{ scope.row.box_office_rate }}%</span>
						</template>
					</el-table-column>
					<el-table-column prop="playtimes" label="当前场次"></el-table-column>
					<el-table-column prop="play_times" label="场次占比">
						<template slot-scope="scope">
							<span v-if="scope.row.play_times == null">{{ scope.row.play_times }}</span>
							<span v-else>{{ scope.row.play_times }}%</span>
						</template>
					</el-table-column>
					<el-table-column prop="person_time" label="当前人次（万）">
						<template slot-scope="scope">
							<span>{{ parseInt(scope.row.person_time / 10000) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="person_time_rate" label="人次占比">
						<template slot-scope="scope">
							<span v-if="scope.row.person_time_rate == null">{{ scope.row.person_time_rate }}</span>
							<span v-else>{{ scope.row.person_time_rate }}%</span>
						</template>
					</el-table-column>
				</el-table>
				<el-table
					v-if="menuName == '影院'"
					:data="movietableData"
					stripe
					:header-cell-style="headerCellStyle"
					v-loading="boxofficeloading"
					:row-class-name="tableRowClassName"
					style="width: 100%"
				>
					<el-table-column prop="cinema_name" label="影院" width="180"></el-table-column>
					<el-table-column prop="box_office" label="当前票房（万)" width="180">
						<template slot-scope="scope">
							<span>{{ parseInt(scope.row.box_office / 10000) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="belong_cinemaline_name" label="所属院线" width="180"></el-table-column>
					<el-table-column prop="belong_province_name" label="省份"></el-table-column>
					<el-table-column prop="belong_city_name" label="城市"></el-table-column>
					<el-table-column prop="box_office_rate" label="票房占比">
						<template slot-scope="scope">
							<span v-if="scope.row.box_office_rate == null">{{ scope.row.box_office_rate }}</span>
							<span v-else>{{ scope.row.box_office_rate }}%</span>
						</template>
					</el-table-column>
					<el-table-column prop="playtimes" label="当前场次"></el-table-column>
					<el-table-column prop="play_times" label="场次占比">
						<template slot-scope="scope">
							<span v-if="scope.row.play_times == null">{{ scope.row.play_times }}</span>
							<span v-else>{{ scope.row.play_times }}%</span>
						</template>
					</el-table-column>
				</el-table>
				<el-table
					v-if="menuName == '地域' || menuName == '省份' || menuName == '城市'"
					:data="territorytableData"
					stripe
					:header-cell-style="headerCellStyle"
					v-loading="boxofficeloading"
					style="width: 100%"
				>
					<el-table-column prop="label" v-if="menuName == '地域'" label="地域" width="180"></el-table-column>
					<el-table-column prop="cityName" v-if="menuName == '省份'" label="省份" width="180"></el-table-column>
					<el-table-column prop="cityName" v-if="menuName == '城市'" label="城市" width="180"></el-table-column>
					<el-table-column prop="boxOffice" label="当前票房（万)" width="180">
						<template slot-scope="scope">
							<span style="color: #3295D9;">{{ parseInt(scope.row.boxOffice / 10000) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="boxOfficeRate" label="票房占比">
						<template slot-scope="scope">
							<span v-if="scope.row.boxOfficeRate == null">{{ scope.row.boxOfficeRate }}</span>
							<span v-else>{{ scope.row.boxOfficeRate }}%</span>
						</template>
					</el-table-column>
					<el-table-column prop="playTimes" label="当前场次">
						<template slot-scope="scope">
							<span style="color: #3295D9;">{{ scope.row.playTimes }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="playTimesRate" label="场次占比">
						<template slot-scope="scope">
							<span v-if="scope.row.playTimesRate == null">{{ scope.row.playTimesRate }}</span>
							<span v-else>{{ scope.row.playTimesRate }}%</span>
						</template>
					</el-table-column>
					<el-table-column prop="personTime" label="当前人次（万）">
						<template slot-scope="scope">
							<span style="color: #3295D9;">{{ parseInt(scope.row.personTime / 10000) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="personTimeRate" label="人次占比">
						<template slot-scope="scope">
							<span v-if="scope.row.personTimeRate == null">{{ scope.row.personTimeRate }}</span>
							<span v-else>{{ scope.row.personTimeRate }}%</span>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
					background
					layout="prev, pager, next"
					:page-size="10"
					:total="totalPage"
					:current-page="filmpage"
					@current-change="handleCurrentChange"
				/>
			</div>
		</el-row>
		<!-- 电影排片部分 -->
		<el-row>
			<p style="font-size: 18px; color: #4C4C4C;">电影排片</p>
			<p style="width: 45px; border-bottom: 3px solid #40A9FF; margin-top: -10px;"></p>
			<div>
				<el-button size="small" :type="barName == '地域' ? 'primary' : ''" @click="chooseBar('地域')">地域</el-button>
				<el-button size="small" :type="barName == '省份' ? 'primary' : ''" @click="chooseBar('省份')">省份</el-button>
				<el-button size="small" :type="barName == '院线' ? 'primary' : ''" @click="chooseBar('院线')">院线</el-button>
			</div>
			<div style="margin-top: 20px;">
				<span>日期：</span>
				<el-date-picker size="small" v-model="date3" type="date" placeholder="选择日期"></el-date-picker>
				<!-- <span style="margin-left:26px" v-if="barName == '省份'">省份</span>
				<el-select v-model="provincevalue" @change="changeChian" placeholder="请选择" size="small" v-if="barName == '省份'">
					<el-option v-for="item in chiansOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<span style="margin-left:26px" v-if="barName == '城市'">城市：</span>
				<el-select v-model="citysvalue" @change="changeChian" placeholder="请选择" size="small" v-if="barName == '城市'">
					<el-option v-for="item in chiansOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<span style="margin-left:26px" v-if="barName == '院线'">院线：</span>
				<el-select v-model="chinasvalue" @change="changeChian" placeholder="请选择" size="small" v-if="barName == '院线'">
					<el-option v-for="item in chiansOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select> -->
				<el-button type="primary" size="small" @click="boxofficesearch()">查询</el-button>
			</div>
			<div style="margin-top: 20px;">
				<span style="display: inline-block; width: 50%; font-weight: 700; font-size: 14px;">{{ data.name }}-排片分布</span>
			</div>
			<div style="margin-top: 20px;">
				<el-table
					:data="boxofficetableData"
					stripe
					v-loading="boxofficetableloading"
					:header-cell-style="headerCellStyle"
					style="width: 100%"
					:row-class-name="tableRowClassName"
				>
					<el-table-column v-if="barName == '院线'" prop="cinemaline_name" label="院线名称"></el-table-column>
					<el-table-column v-if="barName == '城市'" prop="label" label="地域名称"></el-table-column>
					<el-table-column v-if="barName == '省份'" prop="province_name" label="省份名称"></el-table-column>
					<el-table-column prop="playtimes" label="放映场次"></el-table-column>
					<el-table-column prop="play_times" label="场次占比">
						<template slot-scope="scope">
							<span>{{ Math.round(scope.row.play_times * 100 * 1000) / 1000 }}%</span>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
					background
					layout="prev, pager, next"
					:page-size="10"
					:total="totalPagebox"
					:current-page="filmpagebox"
					@current-change="boxofficeChange"
				/>
			</div>
		</el-row>
		<!-- 营销分析部分 -->
		<el-row>
			<p style="font-size: 18px; color: #4C4C4C;">营销分析</p>
			<p style="width: 45px; border-bottom: 3px solid #40A9FF; margin-top: -10px;"></p>
			<div style="margin-top: 20px;">
				<span>日期：</span>
				<el-date-picker v-model="date4" size="small" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				<el-button type="primary" size="small" @click="marketingSearch()">查询</el-button>
				<el-row class="row-bg" :gutter="24" style="margin-top: 20px;">
					<el-col :span="8">
						<div class="zuopininfobox" style="text-align: center; position: relative;">
							<img class="zuopininfopic" src="./img/renzhi.png" alt="" style="position: absolute; left: 50px; top: 0;" />
							<p>
								<span style="color: #0084CF; font-size: 45px; font-weight: 700;">
									{{ acknowledgeSum }}
									<!-- {{pageinfo.hits/100000}} -->
								</span>
							</p>
							<span style="margin-left: -10px;">认知指数</span>
							<span
								style="display: inline-block; color: #0084CF; font-size: 12px; height: 12px; border-left: 1px solid #0084CF; padding-left: 16px; margin-left: 16px;"
							>
								详情
							</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="zuopininfobox" style="text-align: center; position: relative;">
							<img class="zuopininfopic" src="./img/buyticket.png" style="position: absolute; left: 50px; top: 0;" alt="" />
							<p>
								<span style="color: #0084CF; font-size: 45px; font-weight: 700;">
									<!-- {{pageinfo.recommendation/10000}} -->
									{{ ticketingIndexSum }}
								</span>
							</p>
							<span style="margin-left: -10px;">购票指数</span>
							<span
								style="display: inline-block; color: #0084CF; font-size: 12px; height: 12px; border-left: 1px solid #0084CF; padding-left: 16px; margin-left: 16px;"
							>
								详情
							</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="" style="text-align: center; position: relative;">
							<img class="zuopininfopic" src="./img/koubei.png" style="position: absolute; left: 50px; top: 0;" alt="" />
							<p style="">
								<span style="color: #0084CF; font-size: 45px; font-weight: 700;">
									{{ koubeiSum }}
									<!-- {{pageinfo.comment/10000}} -->
								</span>
							</p>
							<span style="margin-left: -10px;">口碑指数</span>
							<span
								style="display: inline-block; color: #0084CF; font-size: 12px; height: 12px; border-left: 1px solid #0084CF; padding-left: 16px; margin-left: 16px;"
							>
								详情
							</span>
						</div>
					</el-col>
				</el-row>
			</div>
			<el-row :gutter="20" style="margin-top:20px;">
				<el-col :span="14">
					<el-card class="box-card" style="height: 538px;">
						<div slot="header" class="clearfix">
							<span style="font-size: 14px; line-height: 40px; font-weight: 700;">指数与票房趋势分析</span>
							<i style="float: right; padding: 3px 0; font-size: 30px; color: #ccc;" type="text" class="iconfont iconxiazai"></i>
						</div>
						<div style="overflow-y: auto;"><div id="chartTrend" style="height: 360px; min-width: 100%;" v-loading="chartTrendLoading"></div></div>
						<div>
							<ul class="legend">
								<li>
									<span style="background-color: #3fb1e3;"></span>
									认知指数
								</li>
								<li>
									<span style="background-color: #6be6c1;"></span>
									购票指数
								</li>
								<li>
									<span style="background-color: #a0a7eb;"></span>
									口碑指数
								</li>
								<li>
									<span style="background-color: #626c91;"></span>
									票房占比
								</li>
								<li>
									<span style="background-color: #c4ebad;"></span>
									排片占比
								</li>
							</ul>
						</div>
					</el-card>
				</el-col>
				<el-col :span="9">
					<el-card class="box-card" style="height: 538px;">
						<div slot="header" class="clearfix">
							<span style="font-size: 14px; line-height: 40px; font-weight: 700;">{{ data.name }}-指数分布</span>
							<i style="float: right; padding: 3px 0; font-size: 30px; color: #ccc;" type="text" class="iconfont iconxiazai"></i>
						</div>
						<div id="chartTrendnet" style="height: 400px; width: 100%; margin-top: 20px;" v-loading="chartTrendnetLoading"></div>
					</el-card>
				</el-col>
			</el-row>
		</el-row>
		<!-- 列表部分 -->
		<el-row style="margin-top: 20px;">
			<!-- <div>
        <el-button size="small">营销事件</el-button>
        <el-button size="small">网络新闻</el-button>
        <el-button size="small">平面新闻</el-button>
        <el-button size="small">片花/预告片</el-button>
        <el-button size="small">剧照海报</el-button>
        <el-button size="small">微博</el-button>
        <el-button size="small">微信公众号</el-button>
      </div> -->
			<!-- <div style='margin-top: 20px; margin-bottom: 20px; width: 96%; ' v-for='(item, index) in info' :key='index'>
        <el-card class="box-card" style='padding-left: 30px;'>
          <div style='line-height: 20px; color: #9B9B9B; font-size: 12px;'>
            <span>{{item.date}}</span>
            <span>{{item.time}}</span>
          </div>
          <div
          style='font-size:22px; font-family:SourceHanSansCN-Regular; font-weight:400; color:rgba(0,132,207,1); line-height: 40px;'>
            {{item.name}}
          </div>
          <div style='font-size:16px; font-family:SourceHanSansCN-Regular; font-weight:400; color:rgba(122,122,122,1); line-height:22px;'>
            简介：{{item.info}}
          </div>
        </el-card>
      </div> -->
		</el-row>
	</div>
</template>

<script>
import echarts from 'echarts';
export default {
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
			cinemaname: '',
			id: '',
			lastmenu: '',
			mainactor: [], // 主演列表
			basicImg: '',
			data: {
				image: '',
				releaseDate: '',
				name: '',
				region: '',
				typeId: '',
				standard: '',
				derector: '',
				showTime: '',
				duration: '',
				intro: '',
				foreignName: '',
				othername: '',
				mainactor: '',
				productCompany: '',
				publisher: '',
				productionTime: '',
				makeAddress: '',
				dialogue: '',
				filmingAddress: '',
				color: '',
				maker: '',
				filmingDate: ''
			},
			statistical: {
				releaseDays: [0],
				boxOfficeSum: '',
				opens: '',
				firstDay: '',
				firstWeekend: '',
				firstWeek: ''
			},
			iscollect: false,
			hoverId: '',
			charttype: '场次',
			headerCellStyle: { color: '#333', backgroundColor: '#f5f5f5' },
			more: true,
			page: 1,
			totalPage: 0,
			totalPagebox: 0,
			filmpagebox: 1,
			noshow: false,
			boxofficetableloading: true,
			loading: true,
			showChart: false, // 默认图表是展示的
			showTable: true, // 默认表格是展示的
			menuName: '影院', // 默认选中票房的时段
			barName: '城市', // 默认选中排片的地域
			current: 1,
			filmpage: 1,
			chooseregionText: '', // 已选择地区的页面显示文字
			activeName: 'first',
			date: new Date('2019-04-02'),
			date2: [new Date('2019-03-11'), new Date('2019-03-17')],
			date3: new Date('2019-04-02'),
			date4: [new Date('2019-04-02'), new Date('2019-04-25')],
			cinema: '', // 影院
			// timeout:  null, // 搜索影院的时候，显示的缓冲图
			cinemaOptions: [], // 影院的列表获取到的后台返回结果
			list: [],
			areaId: '',
			boxofficeloading: true,
			loadingsearch: false,
			states: [
				'Alabama',
				'Alaska',
				'Arizona',
				'Arkansas',
				'California',
				'Colorado',
				'Connecticut',
				'Delaware',
				'Florida',
				'Georgia',
				'Hawaii',
				'Idaho',
				'Illinois',
				'Indiana',
				'Iowa',
				'Kansas',
				'Kentucky',
				'Louisiana',
				'Maine',
				'Maryland',
				'Massachusetts',
				'Michigan',
				'Minnesota',
				'Mississippi',
				'Missouri',
				'Montana',
				'Nebraska',
				'Nevada',
				'New Hampshire',
				'New Jersey',
				'New Mexico',
				'New York',
				'North Carolina',
				'North Dakota',
				'Ohio',
				'Oklahoma',
				'Oregon',
				'Pennsylvania',
				'Rhode Island',
				'South Carolina',
				'South Dakota',
				'Tennessee',
				'Texas',
				'Utah',
				'Vermont',
				'Virginia',
				'Washington',
				'West Virginia',
				'Wisconsin',
				'Wyoming'
			],
			cinemaloading: true,
			urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
			urbanHierarchy: [], // 地域
			regionCode: '', // 区域编码，传入需要封装到 params 中
			region: [], // 地区
			provinceCode: '', // 	省份编码，传入需要封装到 params 中
			province: [], // 省份
			chinasvalue: '', // 院线
			cinemalineId: '', // 院线ID，传入需要封装到 params 中
			chiansOptions: [], // 院线
			boxofficeTrend: null, // 院线趋势的图表
			boxofficeTrendLoading: true, // 票房趋势部分的图表缓冲
			chartTrend: null, // 营销分析第一个图表
			chartTrendLoading: true, // 营销分析第一个图表缓冲
			chartTrendnet: null, // 营销分析第二个图表网状图
			chartTrendnetLoading: true, // 营销分析第二个图表网状图缓冲
			ticketingIndexSum: '', //底部购票指数
			koubeiSum: '', //底部口碑指数
			acknowledgeSum: '', //底部认知指数
			movietableData: [], //影片票房影院列表
			chinastableData: [], //影片票房院线列表
			territorytableData: [], //影片票房地域列表
			xnames: [],
			session: [], //影片票房图表场次
			sessionof: [], //影片票房图表场次占比
			boxoffice: [], //影片票房图表票房
			boxofficeof: [], //影片票房图表票房占比
			mantime: [], //影片票房图表人次
			mantimeof: [], //影片票房图表人次占比
			formData: {
				pageIndex: 1,
				pageSize: 20
			},
			boxofficetableData: [], // 影片票房模块的表格数据
			info: [
				{
					date: '上映前9天',
					time: '2018-11-7',
					name: '首映陈建斌任素汐出演内幕',
					info:
						'《无名之辈》是由饶晓志执导，陈建斌 、任素汐、 潘斌龙、 章宇、王砚辉、九孔、马吟吟、程怡、宁桓宇、邓恩熙等主演的荒诞喜,简介：《无名之辈》是由饶晓志执导，陈建斌 、任素汐、 潘斌龙、 章宇、王砚辉、九孔、马吟吟、程怡、宁桓宇、邓恩熙等主演的荒诞喜剧电影。该片围绕一把丢失的老枪，讲述了一对低配版的劫匪，一个落魄的保安，一个身体残疾却性格彪悍的毒舌女，这些“无名之辈”身上发生的一系列荒诞故事。该片于2018年11月16日在中国内地上映。'
				},
				{
					date: '上映前9天',
					time: '2018-11-7',
					name: '首映陈建斌任素汐出演内幕',
					info: '《无名之辈》是由饶晓志执导，陈建斌 、任素汐、 潘斌龙、 章宇、王砚辉、九孔、马吟吟、程怡、宁桓宇、邓恩熙等主演的荒诞喜'
				},
				{
					date: '上映前9天',
					time: '2018-11-7',
					name: '首映陈建斌任素汐出演内幕',
					info:
						'《无名之辈》是由饶晓志执导，陈建斌 、任素汐、 潘斌龙、 章宇、王砚辉、九孔、马吟吟、程怡、宁桓宇、邓恩熙等主演的荒诞喜,简介：《无名之辈》是由饶晓志执导，陈建斌 、任素汐、 潘斌龙、 章宇、王砚辉、九孔、马吟吟、程怡、宁桓宇、邓恩熙等主演的荒诞喜剧电影。该片围绕一把丢失的老枪，讲述了一对低配版的劫匪，一个落魄的保安，一个身体残疾却性格彪悍的毒舌女，这些“无名之辈”身上发生的一系列荒诞故事。该片于2018年11月16日在中国内地上映。'
				}
			]
		};
	},
	created() {},
	mounted() {
    this.id = sessionStorage.getItem('movieId');
    console.log(this.id)
		this.lastmenu = this.$route.query.lastmenu || '';
		this.getMovieInfo();
		this.getMovieInfoData();
		this.getstatistics();
		this.getCityList();
		this.getchinasList();
		this.initchartTrendnet();
		this.getBasePic();
		this.getcinemachart();
		this.getList(this.cinemaname);
		this.scheduledata();
		this.btmchartdata();
		this.initchartTrendnetdata();
	},
	methods: {
		goPre() {
			// console.log('===============返回上一级菜单')
			this.$router.go(-1);
		},
		getBasePic() {
			let _this = this;
			let label = 'movie';
			_this
				.$http({
					url: _this.$http.adornUrl('/web/sysdict/defaultPic?label=' + label),
					method: 'POST',
					data: _this.$http.adornData({
						label: label
					})
				})
				.then(({ data }) => {
					this.basicImg = data.url;
				});
		},
		// 找不到图片的时候
		nofind() {
			var img = event.srcElement;
			img.src = this.basicImg;
			img.onerror = null; // 控制不要一直跳动
		},
		// 格式化时间为2019-04-02
		CurentTime(now) {
			if (now == '' || now == null || now == undefined || now == ' ') {
				return '';
			} else {
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var day = now.getDate();
				var clock = year + '-';
				if (month < 10) clock += '0';
				clock += month + '-';
				if (day < 10) clock += '0';
				clock += day;
				return clock;
			}
		},
		// 跳转到演职人员详情页
		alink(e) {
			this.$router.push({
				path: '/actor',
				query: {
					id: e.id,
					lastmenu: '影片详情',
					movie: this.data.name
				}
			});
		},
		//调用电影-单条查询
		getMovieInfo() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('/web/movie/info/' + _this.id),
					method: 'POST'
				})
				.then(({ data }) => {
					// console.log(data, 'info');
					// console.log(data.movie.name);
					_this.data.name = data.movie.name;
					_this.data.typeId = data.movie.typeId.name;
					_this.data.standard = data.movie.standard.name;
					_this.data.showTime =
						data.movie.releaseDay.substring(0, 4) + '年' + data.movie.releaseDay.substring(6, 7) + '月' + data.movie.releaseDay.substring(9, 10) + '日';
					_this.data.duration = data.movie.duration;
					_this.data.intro = data.movie.intro;
					_this.data.foreignName = data.movie.foreignName;
					_this.data.productionTime = data.movie.productionTime.substring(0, 4);
					_this.data.dialogue = data.movie.dialogue;
					_this.data.color = data.movie.color;
					_this.data.filmingDate =
						data.movie.filmingDate.substring(0, 4) + '年' + data.movie.filmingDate.substring(6, 7) + '月' + data.movie.filmingDate.substring(9, 10) + '日';
					var dates = data.movie.releaseDate.split('-') || '';
					_this.data.releaseDate = dates[0] + '年' + dates[1] + '月' + dates[2] + '日';
					_this.data.image = data.movie.image;
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//调用查询电影相关信息
		getMovieInfoData() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('/web/movie/queryMovieInfo?movieId=' + _this.id),
					method: 'POST',
					data: {
						movieId: _this.id
					}
				})
				.then(({ data }) => {
					// console.log(data.result.protagonistsName, '=================info2');
					_this.data.derector = data.result.directorsName;
					_this.data.mainactor = data.result.protagonistsName;
					_this.mainactor = data.result.protagonistsName;
					_this.data.maker = data.result.scriptwritersName;
					_this.data.makeAddress = data.result.productionAreas;
					_this.data.filmingAddress = data.result.shootingAreas;
					_this.data.productCompany = data.result.productionCompany;
					_this.data.publisher = data.result.issuingCompany;
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//调用基础统计数据接口
		getstatistics() {
			this.$http({
				url: this.$http.adornUrl('/web/moviedetailpage/getBaseMovieStatistics/' + this.id),
				method: 'POST',
				data: {
					movieId: this.id
				}
			})
				.then(({ data }) => {
					// console.log(data, 'statistics');
					this.statistical = {
						releaseDays: data.data.releaseDays.split(''),
						boxOfficeSum: Math.floor((data.data.boxOfficeSum / 10000) * 100) / 100,
						opens: data.data.preBoxOffice,
						firstDay: Math.floor(data.data.firstDay),
						firstWeekend: Math.floor(data.data.firstWeekend),
						firstWeek: Math.floor(data.data.firstWeek)
					};
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//表格第一行显示蓝色
		tableRowClassName({ row, rowIndex }) {
			if (rowIndex === 0) {
				return 'warning-row';
			}
			return '';
		},
		mores() {
			this.more = !this.more;
		},
		//影片票房切换子模块
		chooseMenu(val) {
			let _this = this;
			_this.menuName = val;
			this.xnames = [];
			this.session = [];
			this.sessionof = [];
			this.boxoffice = [];
			this.boxofficeof = [];
			this.mantime = [];
			this.mantimeof = [];
			(_this.movietableData = []), //影片票房影院列表
				(_this.chinastableData = []), //影片票房院线列表
				(_this.territorytableData = []);
			_this.boxofficeTrendLoading = true;
			_this.boxofficeloading = true;
			_this.filmpage = 1;
			_this.totalPage = 0;
			_this.charttype = '场次';
			if (val == '时段') {
				_this.showChart = true;
				_this.showTable = true;
				_this.$nextTick(() => {
					_this.initChartBoxTrend();
				});
			} else if (val == '影院') {
				_this.showChart = false;
				_this.showTable = true;
				_this.getcinemachart();
			} else if (val == '院线') {
				_this.showChart = true;
				_this.showTable = true;
				_this.getcaindatas();
				_this.getcainTabledatas()
			} else if (val == '影投') {
				_this.showChart = true;
				_this.showTable = true;
				_this.$nextTick(() => {
					_this.initChartBoxTrend();
				});
			} else if (val == '地域') {
				_this.showChart = true;
				_this.showTable = true;
				_this.getterritorydatas();
				_this.getterritoryTabledatas()
			} else if (val == '省份') {
				_this.showChart = true;
				_this.showTable = true;
				_this.getprovincedatas();
				_this.getprovinceTabledatas()
			} else if (val == '城市') {
				_this.showChart = true;
				_this.showTable = true;
				_this.getcitydatas();
				_this.getcityTabledatas()
			} else if (val == '周票房') {
				_this.showChart = false;
				_this.showTable = true;
				// _this.$nextTick( () => {
				//   this.initChartBoxTrend()
				// })
			} else if (val == '预售') {
				_this.showChart = true;
				_this.showTable = false;
				_this.$nextTick(() => {
					this.initChartBoxTrend();
				});
			} else if (val == '竞争分析') {
				_this.showChart = true;
				_this.showTable = false;
				_this.$nextTick(() => {
					_this.initChartBoxTrend();
				});
			}
		},
		chooseBar(val) {
			this.barName = val;
			this.boxofficetableloading = true;
			this.filmpagebox = 1;
			this.scheduledata();
		},
		// 绘制票房趋部分的图表
		initChartBoxTrend(names, session, sessionof, movie) {
			var type = this.charttype;
			// console.log(names, session, sessionof,type)
			var option = {
				tooltip: {
					trigger: 'axis',
					formatter: function(data) {
						var result = '';
						result += movie + '<br>';
						for (var i = 0; i < data.length; i++) {
							if (i == data.length - 1) {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%';
							} else {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '<br>';
							}
						}
						return result;
					}
					// axisPointer: {
					// 	type: 'cross',
					// 	crossStyle: {
					// 		color: '#999'
					// 	}
					// }
				},
				legend: {
					data: [type, type + '占比']
				},
				xAxis: [
					{
						axisLabel: {
							interval: 0,
							rotate: -40
						},
						type: 'category',
						data: names,
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: type,
						min: 0,
						// max: 10000,
						// interval: 5000,
						axisLabel: {
							formatter: '{value}'
						}
					},
					{
						type: 'value',
						name: type + '占比',
						min: 0,
						// max: 100,
						// interval: 50,
						axisLabel: {
							formatter: '{value} %'
						}
					}
				],
				series: [
					{
						name: type,
						type: 'bar',
						color: ['#3fb1e3'],
						barWidth: '20',
						data: session
					},
					{
						name: type + '占比',
						type: 'line',
						color: ['#6be6c1'],
						yAxisIndex: 1,
						data: sessionof
					}
				]
			};
			this.boxofficeTrend = echarts.init(document.getElementById('boxofficeTrend'));
			this.boxofficeTrend.setOption(option, true);
			window.addEventListener('resize', () => {
				this.boxofficeTrend.resize();
			});
			this.boxofficeTrendLoading = false;
		},
		// 营销分析第一个图表
		initchartTrend(names, data1, data2, data3, data4, data5) {
			var option = {
				tooltip: {
					trigger: 'axis',
					formatter: function(data) {
						// console.log(data);
						var result = '';
						result += data[0].name + '<br>';
						for (var i = 0; i < data.length; i++) {
							if (i == data.length - 1) {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%';
							} else if (i == data.length - 2) {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%<br>';
							} else {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '<br>';
							}
						}
						return result;
					}
					// axisPointer: {
					// 	type: 'cross',
					// 	crossStyle: {
					// 		color: '#999'
					// 	}
					// }
				},
				// legend: {
				// 	data: ['认知指数', '购票指数', '口碑指数', '票房占比', '排片占比'],
				// 	bottom: 'bottom'
				// },
				grid: {
					left: '50',
					right: '60',
					top: '40',
					bottom: '30'
				},
				xAxis: [
					{
						type: 'category',
						data: names,
						// axisLabel: {
						//    interval:0,
						//    rotate:-40
						// },
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '十分制',
						min: 0,
						// max: 10,
						// interval: 2,
						axisLabel: {
							formatter: '{value}'
						}
					},
					{
						type: 'value',
						name: '百分比',
						min: 0,
						// max: 100,
						// interval: 20,
						axisLabel: {
							formatter: '{value} %'
						}
					}
				],
				series: [
					{
						name: '认知指数',
						type: 'line',
						color: ['#3fb1e3'],
						yAxisIndex: 0,
						data: data1
					},
					{
						name: '购票指数',
						type: 'line',
						yAxisIndex: 0,
						color: ['#6be6c1'],
						data: data2
					},
					{
						name: '口碑指数',
						type: 'line',
						yAxisIndex: 0,
						color: ['#a0a7eb'],
						data: data3
					},
					{
						name: '票房占比',
						type: 'bar',
						yAxisIndex: 1,
						color: ['#626c91'],
						barWidth: '10',
						data: data4
					},
					{
						name: '排片占比',
						type: 'bar',
						yAxisIndex: 1,
						color: ['#c4ebad'],
						barWidth: '10',
						data: data5
					}
				]
			};
			this.chartTrend = echarts.init(document.getElementById('chartTrend'));
			this.chartTrend.setOption(option, true);
			window.addEventListener('resize', () => {
				this.chartTrend.resize();
			});
			this.chartTrendLoading = false;
		},
		// 营销分析第二个图表
		initchartTrendnet(data1, data2) {
			var name = this.data.name;
			var option = {
				tooltip: {},
				legend: {
					data: [name, '平均值'],
					orient: 'vertical',
					left: 'left'
				},
				radar: {
					// shape: 'circle',
					name: {
						textStyle: {
							color: '#444',
							// backgroundColor: '#999',
							borderRadius: 3,
							padding: [3, 5]
						}
					},
					shape: 'circle',
					center: ['50%', '50%'],
					indicator: [{ name: '认知指数', max: 10 }, { name: '购票指数', max: 10 }, { name: '口碑指数', max: 10 }]
				},
				series: [
					{
						name: name + ' VS 平均值',
						color: ['#3fb1e3', '#6be6c1'],
						type: 'radar',
						data: [
							{
								value: data1,
								name: name
							},
							{
								value: data2,
								name: '平均值'
							}
						]
						// areaStyle: {normal: {}},
					}
				]
			};
			this.chartTrendnet = echarts.init(document.getElementById('chartTrendnet'));
			this.chartTrendnet.setOption(option, true);
			window.addEventListener('resize', () => {
				this.chartTrendnet.resize();
			});
			this.chartTrendnetLoading = false;
		},
		// 获取地区列表接口
		getCityList() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('/web/sysdict/dictOfRegion'),
					method: 'post',
					data: {}
				})
				.then(({ data }) => {
					if (data.code === 0) {
						_this.urbanHierarchy = data.urbanHierarchy;
						_this.region = data.region;
						_this.province = data.province;
					} else {
						_this.urbanHierarchy = [];
						_this.region = [];
						_this.province = [];
						alert('暂无数据');
					}
				});
		},
		// 选择切换tab
		handleClick(tab, event) {},
		// 选择地域
		chooseUrban(val) {
			let _this = this;
			// console.log(val)
			_this.chooseregionText = val.label;
			_this.urbanHierarchyCode = val.value;
			_this.areaId = val.value;
			// _this.getData()
		},
		// 选择地区
		chooseRegion(val) {
			let _this = this;
			// console.log(val);
			_this.regionCode = val.value;
			_this.chooseregionText = val.label;
			_this.areaId = val.value;
			// _this.getData()
		},
		// 选择省份
		chooseProvince(val) {
			let _this = this;
			// console.log(val);
			_this.provinceCode = val.id;
			_this.chooseregionText = val.value;
			_this.areaId = val.id;
			// _this.getData()
		},
		//获取影院列表
		loadmore() {
			this.formData.pageIndex++;
			this.getList(this.cinemaname);
		},
		getList(name) {
			// console.log(name);
			this.$http({
				url: this.$http.adornUrl('web/cinema/queryCinemaNameAndId?size=' + this.formData.pageSize + '&current=' + this.formData.pageIndex + '&name=' + name),
				method: 'GET'
			}).then(({ data }) => {
				this.cinemaloading = false;
				for (var i = 0; i < data.page.records.length; i++) {
					this.cinemaOptions.push(data.page.records[i]);
				}
			});
			// 这里是接口请求数据, 带分页条件
			// const _res = [1, 2, 3]; // 请求得到的数据
			// this.options = [...this.options, ..._res];
		},
		remoteMethod(query) {
			// console.log(1);
			this.cinemaOptions = [];
			if (query !== '') {
				this.cinemaloading = true;
				this.cinemaname = query;
			}
			// console.log(this.cinemaname);
			this.getList(this.cinemaname);
		},
		// 获取院线列表接口
		getchinasList() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('web/cinema/listcinema'),
					method: 'post',
					data: {}
				})
				.then(({ data }) => {
					if (data.code === 0 && data.listMap != []) {
						_this.chiansOptions = data.listMap;
					} else {
						_this.chiansOptions = [];
						alert('暂无数据');
					}
				});
		},
		//影片票房影院数据
		getcinemachart() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieCinemaStatisticsListEx?movieId=' +
						this.id +
						'&date=' +
						this.CurentTime(this.date) +
						'&cinemalineId=' +
						this.chinasvalue +
						'&areaId=' +
						this.areaId +
						'&current=' +
						this.filmpage +
						'&cinemaId=' +
						this.cinema
				),
				method: 'POST'
			})
				.then(({ data }) => {
					this.totalPage = data.list.total - 0;
					if (data.list.total == '0') {
						this.movietableData = data.list.records;
						this.boxofficeloading = false;
					} else {
						this.movietableData = data.list.records;
						this.gettablefirst();
					}
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//影片票房院线数据
		getcaindatas() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieCinemaLineStatisticsGraph?movieId=' +
						this.id +
						'&date=' +
						this.CurentTime(this.date) +
						'&cinemalineId=' +
						this.chinasvalue +
						'&areaId=' +
						this.areaId
				),
				method: 'POST'
			}).then(({ data }) => {
				var names = [],
					session = [],
					sessionof = [];
				if (data.graph.length > 10) {
					var biaos = '10';
				} else {
					var biaos = data.graph.length;
				}
				for (var i = 0; i < biaos; i++) {
					this.xnames.push(data.graph[i].cinemaline_name);
					this.session.push(data.graph[i].playtimes);
					this.sessionof.push(data.graph[i].play_times);
					this.boxoffice.push(data.graph[i].box_office);
					this.boxofficeof.push(data.graph[i].box_office_rate);
					this.mantime.push(data.graph[i].person_time);
					this.mantimeof.push(data.graph[i].person_time_rate);
				}
				this.$nextTick(() => {
					this.initChartBoxTrend(this.xnames, this.session, this.sessionof, this.data.name);
				});
			});
		},
		getcainTabledatas(){
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieCinemaLineStatisticsList?movieId=' +
						this.id +
						'&date=' +
						this.CurentTime(this.date) +
						'&cinemalineId=' +
						this.chinasvalue +
						'&areaId=' +
						this.areaId +
						'&current=' +
						this.filmpage +
						'&cinemaId=' +
						this.cinema
				),
				method: 'POST'
			})
				.then(({ data }) => {
					this.totalPage = data.list.total - 0;
					if (data.list.total == '0') {
						this.chinastableData = data.list.records;
						this.boxofficeloading = false;
					} else {
						this.chinastableData = data.list.records;
						this.gettablefirst();
					}
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//影片票房地域数据
		getterritorydatas() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieAreaStatisticsGraph?movieId=' + this.id + '&date=' + this.CurentTime(this.date) + '&cinemalineId=' + this.chinasvalue
				),
				method: 'POST'
			})
				.then(({ data }) => {
					if (data.list.length > 10) {
						var biaos = '10';
					} else {
						var biaos = data.list.length;
					}
					for (var i = 0; i < biaos; i++) {
						this.xnames.push(data.list[i].cityNamelabel);
						this.session.push(data.list[i].playTimes);
						this.sessionof.push(data.list[i].playTimesRate);
						this.boxoffice.push(data.list[i].boxOffice);
						this.boxofficeof.push(data.list[i].boxOfficeRate);
						this.mantime.push(data.list[i].personTime);
						this.mantimeof.push(data.list[i].personTimeRate);
					}
					this.$nextTick(() => {
						this.initChartBoxTrend(this.xnames, this.session, this.sessionof, this.data.name);
					});
				})
				.catch(err => {
					// console.log(err);
				});
		},
		getterritoryTabledatas(){
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieAreaStatisticsList?movieId=' +
						this.id +
						'&date=' +
						this.CurentTime(this.date) +
						'&cinemalineId=' +
						this.chinasvalue +
						'&current=' +
						this.filmpage
				),
				method: 'POST'
			})
				.then(({ data }) => {
					this.totalPage = data.page.total - 0;
					this.territorytableData = data.page.records;
					this.boxofficeloading = false;
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//影片票房省份数据
		getprovincedatas() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieProvinceStatisticsGraph?movieId=' + this.id + '&date=' + this.CurentTime(this.date) + '&cinemalineId=' + this.chinasvalue
				),
				method: 'POST'
			})
				.then(({ data }) => {
					if (data.list.length > 10) {
						var biaos = '10';
					} else {
						var biaos = data.list.length;
					}
					for (var i = 0; i < biaos; i++) {
						this.xnames.push(data.list[i].cityName);
						this.session.push(data.list[i].playTimes);
						this.sessionof.push(data.list[i].playTimesRate);
						this.boxoffice.push(data.list[i].boxOffice);
						this.boxofficeof.push(data.list[i].boxOfficeRate);
						this.mantime.push(data.list[i].personTime);
						this.mantimeof.push(data.list[i].personTimeRate);
					}
					this.$nextTick(() => {
						this.initChartBoxTrend(this.xnames, this.session, this.sessionof, this.data.name);
					});
				})
				.catch(err => {
					// console.log(err);
				});
		},
		getprovinceTabledatas(){
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieProvinceStatisticsList?movieId=' +
						this.id +
						'&date=' +
						this.CurentTime(this.date) +
						'&cinemalineId=' +
						this.chinasvalue +
						'&current=' +
						this.filmpage
				),
				method: 'POST'
			})
				.then(({ data }) => {
					this.totalPage = data.page.total - 0;
					if (data.page.total == '0') {
						this.territorytableData = data.page.records;
						this.boxofficeloading = false;
					} else {
						this.territorytableData = data.page.records;
						this.gettablefirst();
					}
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//影片票房城市数据
		getcitydatas() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieCityStatisticsGraph?movieId=' + this.id + '&date=' + this.CurentTime(this.date) + '&cinemalineId=' + this.chinasvalue
				),
				method: 'POST'
			})
				.then(({ data }) => {
					if (data.list.length > 10) {
						var biaos = '10';
					} else {
						var biaos = data.list.length;
					}
					for (var i = 0; i < biaos; i++) {
						this.xnames.push(data.list[i].cityName);
						this.session.push(data.list[i].playTimes);
						this.sessionof.push(data.list[i].playTimesRate);
						this.boxoffice.push(data.list[i].boxOffice);
						this.boxofficeof.push(data.list[i].boxOfficeRate);
						this.mantime.push(data.list[i].personTime);
						this.mantimeof.push(data.list[i].personTimeRate);
					}
					this.$nextTick(() => {
						this.initChartBoxTrend(this.xnames, this.session, this.sessionof, this.data.name);
					});
				})
				.catch(err => {
					// console.log(err);
				});
		},
		getcityTabledatas(){
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getOneMovieCityStatisticsList?movieId=' +
						this.id +
						'&date=' +
						this.CurentTime(this.date) +
						'&cinemalineId=' +
						this.chinasvalue +
						'&current=' +
						this.filmpage
				),
				method: 'POST'
			})
				.then(({ data }) => {
					this.totalPage = data.page.total - 0;
					if (data.page.total == '0') {
						this.territorytableData = data.page.records;
						this.boxofficeloading = false;
					} else {
						this.territorytableData = data.page.records;
						this.gettablefirst();
					}
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//切换图表场次、人次、票房
		changechart(type) {
			if (type == '场次') {
				this.charttype = '场次';
				this.initChartBoxTrend(this.xnames, this.session, this.sessionof, this.data.name);
			} else if (type == '人次') {
				this.charttype = '人次';
				this.initChartBoxTrend(this.xnames, this.mantime, this.mantimeof, this.data.name);
			} else if (type == '票房') {
				this.charttype = '票房';
				this.initChartBoxTrend(this.xnames, this.boxoffice, this.boxofficeof, this.data.name);
			}
		},
		//获取表格总计数据
		gettablefirst() {
			this.$http({
				url: this.$http.adornUrl('/web/moviedetailpage/getStatisticsSumByMovieId/' + this.id),
				method: 'POST'
			})
				.then(({ data }) => {
					var menu = this.menuName;
					if (menu == '时段') {
					} else if (menu == '影院') {
						this.movietableData.unshift({
							cinema_name: '合计',
							box_office: data.data.boxOffice,
							playtimes: data.data.playTimes,
							person_time: data.data.personTime
						});
					} else if (menu == '院线') {
						this.chinastableData.unshift({
							cinemaline_name: '合计',
							box_office: data.data.boxOffice,
							playtimes: data.data.playTimes,
							person_time: data.data.personTime
						});
					} else if (menu == '影投') {
					} else if (menu == '地域') {
					} else if (menu == '省份') {
						this.territorytableData.unshift({
							cityName: '合计',
							boxOffice: data.data.boxOffice,
							playTimes: data.data.playTimes,
							personTime: data.data.personTime
						});
					} else if (menu == '城市') {
						this.territorytableData.unshift({
							cityName: '合计',
							boxOffice: data.data.boxOffice,
							playTimes: data.data.playTimes,
							personTime: data.data.personTime
						});
					} else if (menu == '周票房') {
					} else if (menu == '预售') {
					} else if (menu == '竞争分析') {
					}
					this.boxofficeloading = false;
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//影片票房分页
		handleCurrentChange(val) {
			var menu = this.menuName;
			this.xnames = [];
			this.session = [];
			this.sessionof = [];
			this.boxoffice = [];
			this.boxofficeof = [];
			this.mantime = [];
			this.mantimeof = [];
			// this.movietableData = []//影片票房影院列表
			// this.chinastableData = [] //影片票房院线列表
			// this.territorytableData = [];
			// this.boxofficeTrendLoading = true;
			this.boxofficeloading = true;
			this.filmpage = val;
			if (menu == '时段') {
			} else if (menu == '影院') {
				this.getcinemachart();
			} else if (menu == '院线') {
				this.getcainTabledatas();
			} else if (menu == '影投') {
			} else if (menu == '地域') {
				this.getterritoryTabledatas()
			} else if (menu == '省份') {
				this.getprovinceTabledatas();
			} else if (menu == '城市') {
				this.getcityTabledatas();
			} else if (menu == '周票房') {
			} else if (menu == '预售') {
			} else if (menu == '竞争分析') {
			}
		},
		//电影影片票房查询
		search() {
			var menu = this.menuName;
			this.xnames = [];
			this.session = [];
			this.sessionof = [];
			this.boxoffice = [];
			this.boxofficeof = [];
			this.mantime = [];
			this.mantimeof = [];
			(this.movietableData = []), //影片票房影院列表
				(this.chinastableData = []), //影片票房院线列表
				(this.territorytableData = []);
			this.boxofficeTrendLoading = true;
			this.boxofficeloading = true;
			this.filmpage = 1;
			this.totalPage = 0;
			if (menu == '时段') {
			} else if (menu == '影院') {
				this.getcinemachart();
			} else if (menu == '院线') {
				this.getcaindatas();
			} else if (menu == '影投') {
			} else if (menu == '地域') {
				this.getterritorydatas();
			} else if (menu == '省份') {
				this.getprovincedatas();
			} else if (menu == '城市') {
				this.getcitydatas();
			} else if (menu == '周票房') {
			} else if (menu == '预售') {
			} else if (menu == '竞争分析') {
			}
		},
		//电影排片数据
		scheduledata() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getFilmScheduleStatistics?movieId=' +
						this.id +
						'&date=' +
						this.CurentTime(this.date3) +
						'&type=' +
						this.barName +
						'&current=' +
						this.filmpagebox
				),
				method: 'POST'
			})
				.then(({ data }) => {
					if(data.page.total!=0){
						data.page.records.unshift({
							cinemaline_name: '总计',
							province_name: '总计',
							label: '总计',
							playtimes: data.page.records[1].total_playtimes,
							play_times: data.page.records[1].total_play_times
						});
						this.boxofficetableData = data.page.records;
					}else{
						this.boxofficetableData=[]
					}
					this.boxofficetableloading = false;
					this.totalPagebox = data.page.total - 0;
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//电影排片分页
		boxofficeChange(val) {
			this.boxofficetableloading = true;
			this.filmpagebox = val;
			this.scheduledata();
		},
		//点击电影排片查询
		boxofficesearch() {
			this.boxofficetableloading = true;
			this.filmpagebox = 1;
			this.scheduledata();
		},
		//底部折线图数据
		btmchartdata() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getMarketingDailyStatisticsList/' +
						this.id +
						'?movieId' +
						this.id +
						'&beginDate=' +
						this.CurentTime(this.date4[0]) +
						'&endDate=' +
						this.CurentTime(this.date4[1])
				),
				method: 'POST'
			})
				.then(({ data }) => {
					var names = [],
						perceive = [],
						buy = [],
						wom = [],
						boxOfficeof = [],
						film = [];
					for (var i = 0; i < data.list.length; i++) {
						names.push(data.list[i].date);
						perceive.push(data.list[i].acknowledge);
						buy.push(data.list[i].ticketingIndex);
						wom.push(data.list[i].koubei);
						boxOfficeof.push(data.list[i].boxOffice);
						film.push(data.list[i].playTimes);
					}
					document.getElementById('chartTrend').style.width = names.length * 100 + 'px';
					this.initchartTrend(names, perceive, buy, wom, boxOfficeof, film);
				})
				.catch(err => {
					// console.log(err);
				});
		},
		//底部饼图数据
		initchartTrendnetdata() {
			this.$http({
				url: this.$http.adornUrl(
					'web/moviedetailpage/getMarketingStatisticsChart/' +
						this.id +
						'?movieId=' +
						this.id +
						'&beginDate=' +
						this.CurentTime(this.date4[0]) +
						'&endDate=' +
						this.CurentTime(this.date4[1])
				),
				method: 'POST'
			})
				.then(({ data }) => {
					this.ticketingIndexSum = data.data.ticketingIndexMovie;
					this.koubeiSum = data.data.koubeiMovie;
					this.acknowledgeSum = data.data.acknowledgeMovie;
					var thismovie = [data.data.acknowledgeMovie, data.data.ticketingIndexMovie, data.data.koubeiMovie],
						allmovie = [data.data.acknowledgeSum, data.data.ticketingIndexSum, data.data.koubeiSum];
					this.initchartTrendnet(thismovie, allmovie);
				})
				.catch(err => {
					console.log(err);
				});
		},
		//点击营销分析查询
		marketingSearch() {
			this.chartTrendLoading = true;
			this.initchartTrendnetdata();
			this.btmchartdata();
		}
	},
	components: {
		// HeadEr
	}
};
</script>

<style scoped>
.legend {
	list-style: none;
	text-align: center;
}
.legend li {
	display: inline-block;
	font-size: 16px;
	font-family: MicrosoftYaHei;
	color: rgba(51, 51, 51, 1);
}
.legend span {
	display: inline-block;
	width: 20px;
	height: 4px;
	margin-right: 7px;
	vertical-align: middle;
}
.colthree {
	padding-left: 62px;
}
.coltwo {
	padding: 0 31px;
}
.colone {
	padding-right: 62px;
}
.text_hover {
	cursor: pointer;
	display: inline-block;
}
.colStyle {
	padding-top: 7px;
	line-height: 40px;
	border-bottom: 1px solid #e0e0e0;
	position: relative;
	margin-left: 20px;
}
.colStyle:hover {
	border-bottom: 1px solid #399bff;
}
.colStyle:hover::after {
	content: '';
	position: absolute;
	top: 18px;
	left: -19px;
	display: block;
	width: 4px;
	height: 20px;
	background: #399bff;
}
.titleStyle {
	font-size: 14px;
	color: #4c4c4c;
	font-weight: 700;
	/* margin-right: 20px; */
	display: inline-block;
	width: 100px;
}
.colStyle > span {
	display: inline-block;
	vertical-align: top;
}
.colStyle .contantStyle {
	font-size: 14px;
	color: #4c4c4c;
	line-height: 18px;
	width: calc(100% - 104px);
	margin-top: 10px;
	margin-bottom: 10px;
}
.colStyle .colorStyle {
	color: #0084cf;
	cursor: pointer;
}
.right {
	float: right;
	padding-right: 94px;
}
.more {
	display: inline-block;
	cursor: pointer;
	height: 24px;
	line-height: 24px;
	vertical-align: middle;
}
.mores {
	display: inline-block;
	margin-right: 17px;
	height: 24px;
	line-height: 24px;
	vertical-align: middle;
}
.mores span {
	cursor: pointer;
	display: inline-block;
}
.back {
	width: 24px;
	height: 25px;
	margin-right: 9px;
	background: url(./img/white/transmit-icon.png);
}
.back:hover {
	background: url(./img/blue/transmit-icon.png);
}
.nocollect {
	width: 47px;
	height: 23px;
	background: url(./img/white/collect-icon.png);
}
.nocollect:hover {
	background: url(./img/blue/collect-icon.png);
}
.collect {
	width: 47px;
	height: 23px;
	background: url(./img/blue/collect-icon.png);
}
.add {
	width: 30px;
	height: 21px;
	margin-right: 9px;
	background: url(./img/white/add-icon.png);
}
.add:hover {
	background: url(./img/blue/add-icon.png);
}
.name {
	display: inline-block;
	margin-right: 27px;
	font-size: 30px;
	font-family: SourceHanSansCN-Bold;
	font-weight: bold;
}
.contrast {
	font-size: 12px;
	font-family: SimSun;
	font-weight: 400;
	color: rgba(0, 132, 207, 1);
}
.main {
	width: 100%;
	max-width: 196px;
	height: auto;
}
.message {
	width: 100%;
	margin-top: 23px;
	padding-left: 20px;
	height: 180px;
	border-right: 1px solid #cdcdcd;
	display: inline-block;
	color: #4c4c4c;
}
.message p {
	margin: 0;
	height: 26px;
	line-height: 26px;
	overflow: hidden;
}
.message span:first-of-type {
	width: 64px;
	display: inline-block;
	text-align: justify;
	vertical-align: top;
	color: #969696;
}
.message span:first-of-type::after {
	display: inline-block;
	width: 100%;
	content: '';
	height: 0;
}
.statistical {
	width: 260px;
	margin: 0 auto;
}
.day {
	display: inline-block;
	width: 73px;
	height: 104px;
	border-radius: 5px;
	background: linear-gradient(0deg, rgba(233, 233, 233, 1), rgba(245, 245, 245, 1));
	box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.26);
	font-size: 71px;
	text-align: center;
	line-height: 104px;
	text-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.26);
	position: relative;
	vertical-align: bottom;
}
.day span {
	background: url(./img/daybkg.png);
	display: inline-block;
	width: 75px;
	height: 4px;
	position: absolute;
	top: 50%;
	left: -1px;
	margin-top: -2px;
}
.time {
	font-size: 12px;
	color: rgba(76, 76, 76, 1);
}
.item {
	width: 260px;
	margin: 0 auto;
	border-bottom: 1px solid transparent;
}
.item-top {
	padding-left: 80px;
	font-size: 24px;
	font-family: SourceHanSansCN-Regular;
	white-space: nowrap;
}
.item-top span {
	font-size: 50px;
	font-family: Arial-BoldMT;
	font-weight: bold;
}
.item-btm {
	padding-left: 104px;
}
.item:hover {
	border-bottom: 1px solid #399bff;
}
.three {
	background: url(./img/white/three.png) no-repeat left center;
}
.item:hover .three {
	background: url(./img/blue/three.png) no-repeat left center;
}
.one {
	background: url(./img/white/one.png) no-repeat left center;
}
.item:hover .one {
	background: url(./img/blue/one.png) no-repeat left center;
}
.two {
	background: url(./img/white/two.png) no-repeat left center;
}
.item:hover .two {
	background: url(./img/blue/two.png) no-repeat left center;
}
.four {
	background: url(./img/white/four.png) no-repeat left center;
}
.item:hover .four {
	background: url(./img/blue/four.png) no-repeat left center;
}
.five {
	background: url(./img/white/five.png) no-repeat left center;
}
.item:hover .five {
	background: url(./img/blue/five.png) no-repeat left center;
}
</style>

<style>
body {
	background: #ededed;
	min-width: 960px;
}
.warning-row {
	color: #1389d1;
}
</style>
