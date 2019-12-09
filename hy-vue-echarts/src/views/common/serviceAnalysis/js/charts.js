//函数参数分别代表：abscissa：横坐标，ordinate：纵坐标名称数组，ordinateData:纵坐标对应数据，color：颜色数组，box：图表容器
//例如bar(["无双","影","李茶的姑妈","反贪风暴","无极","吉普车"],['人次占比','票房占比','场次占比'],[[5, 20, 36, 10, 10, 20],[8,16,23,12,14,25],[10,18,30,22,15,22]],['red','blue','green'],'main')
//柱状图
function bar(abscissa, ordinate, ordinateData, color, box) {
	$('.tables').remove()
	$($('#' + box).children('div')[0]).show()
	var myChart = echarts.init(document.getElementById(box));
	console.log(myChart)
	myChart.clear();
	var series = [];
	for (var i = 0; i < ordinateData.length; i++) {
		series.push({
			name: ordinate[i],
			type: 'bar',
			data: ordinateData[i],
			itemStyle: {
				normal: {
					color: color[i]
				}
			},
		})
	}
	// 指定图表的配置项和数据
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
			  type: 'shadow'
			},
		},
		legend: {
			data: ordinate,
			x: 'right',
		},
		toolbox: {
		  show: true
		},
		calculable: true,
		xAxis: {
			type: 'category',
			data: abscissa,
			axisLabel: {
				interval: 0,
				rotate: -40
			}
		},
		yAxis: {
			type: 'value'
		},
		series: series
	};
	console.log(myChart.setOption)
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option, true);
}
//条形图
function chart(abscissa, ordinate, ordinateData, color, box) {
	$('.tables').remove()
	$($('#' + box).children('div')[0]).show()
	var myChart = echarts.init(document.getElementById(box));
	myChart.clear();
	var series = [];
	for (var i = 0; i < ordinateData.length; i++) {
		series.push({
			name: ordinate[i],
			type: 'bar',
			data: ordinateData[i],
			itemStyle: {
				normal: {
					color: color[i]
				}
			},
		})
	}
	// 指定图表的配置项和数据
	var option = {
		// title: {
		//     text: 'ECharts 入门示例'
		// },
		tooltip: {},
		legend: {
			data: ordinate,
			x: 'right',
		},
		xAxis: {
			type: 'value'
		},
		yAxis: {
			type: 'category',
			data: abscissa,
		},
		series: series
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option, true);
}
//折线图
function line(abscissa, ordinate, ordinateData, color, box) {
	$('.tables').remove()
	$($('#' + box).children('div')[0]).show()
	var myChart = echarts.init(document.getElementById(box));
	myChart.clear();
	var series = [];
	for (var i = 0; i < ordinateData.length; i++) {
		series.push({
			name: ordinate[i],
			type: 'line',
			data: ordinateData[i],
			itemStyle: {
				normal: {
					color: color[i]
				}
			},
		})
	}
	// 指定图表的配置项和数据
	var option = {
		// title: {
		//     text: 'ECharts 入门示例'
		// },
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			data: ordinate,
			x: 'right',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: abscissa,
			axisLabel: {
				interval: 0,
				rotate: -40
			}
		},
		yAxis: {
			type: 'value'
		},
		series: series
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option, true);
}
//饼图最多一张图表10个饼图
function pie(abscissa, ordinate, ordinateData, color, box) {
	$('.tables').remove()
	$($('#' + box).children('div')[0]).show()
	var place = [],
		size = [],
		series = [],
		titles = [],
		titletop = [],
		titleleft = [];
	if (ordinate.length == 1) {
		place = [
			['50%', '50%']
		];
		size = [0, 110];
		titletop = ['90%'];
		titleleft = ['48%'];
	} else if (ordinate.length == 2) {
		place = [
			['25%', '50%'],
			['75%', '50%']
		]
		size = [0, 110];
		titletop = ['90%', '90%'];
		titleleft = ['22%', '72%'];
	} else if (ordinate.length == 3) {
		place = [
			['20%', '50%'],
			['50%', '50%'],
			['80%', '50%']
		]
		size = [0, 90];
		titletop = ['90%', '90%', '90%'];
		titleleft = ['17%', '47%', '77%'];
	} else if (ordinate.length == 4) {
		place = [
			['15%', '50%'],
			['38.5%', '50%'],
			['62.5%', '50%'],
			['85%', '50%']
		]
		size = [0, 60];
		titletop = ['85%', '85%', '85%', '85%'];
		titleleft = ['12%', '35.5%', '59.5%', '82%'];
	} else if (ordinate.length == 5) {
		place = [
			['14%', '50%'],
			['32%', '50%'],
			['50%', '50%'],
			['67%', '50%'],
			['86%', '50%']
		]
		size = [0, 45];
		titletop = ['80%', '80%', '80%', '80%', '80%'];
		titleleft = ['12%', '30%', '47%', '65%', '84%'];
	} else if (ordinate.length == 6) {
		place = [
			['20%', '30%'],
			['50%', '30%'],
			['80%', '30%'],
			['20%', '72%'],
			['50%', '72%'],
			['80%', '72%']
		]
		size = [0, 40];
		titletop = ['48%', '48%', '48%', '90%', '90%', '90%'];
		titleleft = ['17%', '47%', '77%', '17%', '47%', '77%'];
	} else if (ordinate.length == 7) {
		place = [
			['15%', '30%'],
			['38.5%', '30%'],
			['62.5%', '30%'],
			['85%', '30%'],
			['15%', '72%'],
			['38.5%', '72%'],
			['62.5%', '72%']
		]
		size = [0, 40];
		titletop = ['48%', '48%', '48%', '48%', '90%', '90%', '90%'];
		titleleft = ['12%', '35.5%', '59.5%', '82%', '12%', '35.5%', '59.5%'];
	} else if (ordinate.length == 8) {
		place = [
			['15%', '30%'],
			['38.5%', '30%'],
			['62.5%', '30%'],
			['85%', '30%'],
			['15%', '72%'],
			['38.5%', '72%'],
			['62.5%', '72%'],
			['85%', '72%']
		]
		size = [0, 40];
		titletop = ['48%', '48%', '48%', '48%', '90%', '90%', '90%', '90%'];
		titleleft = ['12%', '35.5%', '59.5%', '82%', '12%', '35.5%', '59.5%', '82%'];
	} else if (ordinate.length == 9) {
		place = [
			['13%', '30%'],
			['31%', '30%'],
			['49%', '30%'],
			['67%', '30%'],
			['87%', '30%'],
			['13%', '72%'],
			['31%', '72%'],
			['49%', '72%'],
			['67%', '72%']
		]
		size = [0, 40];
		titletop = ['48%', '48%', '48%', '48%', '48%', '90%', '90%', '90%', '90%'];
		titleleft = ['10%', '28%', '46%', '64%', '84%', '10%', '28%', '46%', '64%', ];
	} else if (ordinate.length == 10) {
		place = [
			['13%', '30%'],
			['31%', '30%'],
			['49%', '30%'],
			['67%', '30%'],
			['87%', '30%'],
			['13%', '72%'],
			['31%', '72%'],
			['49%', '72%'],
			['67%', '72%'],
			['87%', '67%']
		]
		size = [0, 40];
		titletop = ['48%', '48%', '48%', '48%', '48%', '90%', '90%', '90%', '90%', '90%'];
		titleleft = ['10%', '28%', '46%', '64%', '84%', '10%', '28%', '46%', '64%', '84%'];
	}
	for (let i = 0; i < ordinate.length; i++) {
		var data = [];
		for (var j = 0; j < abscissa.length; j++) {
			console.log(i,j,ordinateData)
			data.push({
				value: ordinateData[i][j],
				name: abscissa[j]
			})
		}
		titles.push({
			text: ordinate[i],
			top: titletop[i],
			left: titleleft[i],
			textStyle: {
				color: '#000',
				fontSize: '24px'
			}
		})
		series.push({
			name: ordinate[i],
			color: color,
			type: 'pie',
			center: place[i],
			radius: size,
			data: data,
		})
	}
	console.log(titles)
	var myChart = echarts.init(document.getElementById(box));
	myChart.clear();
	// 指定图表的配置项和数据
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		title: titles,
		toolbox: {
			show: false,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: false,
		series: series
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option, true);
}
//列表
function table(abscissa, ordinate, ordinateData, color, box) {
	$('#' + box).children('div').hide()
	var table = $('<table style="width: 100%;table-layout:fixed;" cellpadding="0" border="1" cellspacing="0" class="tables"></table>')
	var th = $('<tr><th style="word-wrap:break-word;"></th></tr>')
	for (var j = 0; j < abscissa.length; j++) {
		th.append('<th style="word-wrap:break-word;">' + abscissa[j] + '</th>')
	}
	table.append(th)
	for (let i = 0; i < ordinate.length; i++) {
		var tr = $('<tr><td style="word-wrap:break-word;">' + ordinate[i] + '</td></tr>')
		for (var j = 0; j < abscissa.length; j++) {
			tr.append('<td style="word-wrap:break-word;">' + ordinateData[i][j] + '</td>')
		}
		table.append(tr)
	}
	$('#' + box).append(table)
	$('#' + box).css({
		'overflowX': 'hidden',
		'overflowY': 'auto'
	})
}
//右侧选择修改图表
var abscissa = ["无双", "影", "李茶的姑妈", "反贪风暴", "无极", "吉普车", "肖申克的救赎", "阿甘正传", "功夫"]
var ordinate = ['人次占比', '票房占比', '场次占比']
var ordinateData = [
	[5, 20, 36, 10, 10, 20, 42, 38, 50],
	[8, 16, 23, 12, 14, 25, 43, 32, 52],
	[10, 18, 30, 22, 15, 22, 38, 34, 47]
]
var box = 'main'
var color = []
var charttype=''
$('.charts').click(function() {
	var dimensionality = [];
	var measurement = [];
	// for(var i=0;$('.isColorListW').length;i++){
	//     dimensionality.push($($('.isColorListW')[i]).html())
	// }
	// for(var i=0;$('.isColorListDu').length;i++){
	//     measurement.push($($('.isColorListDu')[i]).html())
	// }
	if ($(this).attr('id') == 'bar') {
		window.charttype='bar'
		bar(abscissa, ordinate, ordinateData, color, box)
	} else if ($(this).attr('id') == 'chart') {
		window.charttype='chart'
		chart(abscissa, ordinate, ordinateData, color, box)
	} else if ($(this).attr('id') == 'line') {
		window.charttype='line'
		line(abscissa, ordinate, ordinateData, color, box)
	} else if ($(this).attr('id') == 'pie') {
		window.charttype='pie'
		pie(abscissa, ordinate, ordinateData, color, box)
	} else if ($(this).attr('id') == 'table') {
		window.charttype='table'
		table(abscissa, ordinate, ordinateData, color, box)
	}
})
