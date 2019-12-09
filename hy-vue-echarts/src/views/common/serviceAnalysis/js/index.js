var token = getCookie('token')
// var link=window.location.href.split('serviceAnalysis/index.html')[0]
var link=window.location.href.split('src/views/common/serviceAnalysis/index.html')[0]
function getCookie(name) {
	var cookies = document.cookie;
	var list = cookies.split("; "); // 解析出名/值对列表

	for (var i = 0; i < list.length; i++) {
		var arr = list[i].split("="); // 解析出名和值
		if (arr[0] == name)
			return decodeURIComponent(arr[1]); // 对cookie值解码
	}
	return "";
}
function setCookie(name,value) { 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
$(function() {
	laydate.render({
	  elem: '#text'
	  ,range: true
	});
	var url = window.location.href.split('/').slice(0,4).join('/')
	console.log(url)
	$('.header_logo>a').attr('href',url+'/#/home')
	$('#move').click(function(){
		setCookie('firstmenu', '');
		setCookie('secondmenu', '');
		sessionStorage.setItem('secondmenus', '');
		sessionStorage.setItem('moduleId','1')
		setCookie('_data_active_id','1');
		window.location.href=url+'/#/box_office/recommond/recommond';
	})
	$('#video').click(function(){
		setCookie('firstmenu', '');
		setCookie('secondmenu', '');
		sessionStorage.setItem('secondmenus', '');
		sessionStorage.setItem('moduleId','2')
		setCookie('_data_active_id','2');
		window.location.href=url+'/#/videoTank/drama';
	})
	$('#letter').click(function(){
		setCookie('firstmenu', '');
		setCookie('secondmenu', '');
		sessionStorage.setItem('secondmenus', '');
		sessionStorage.setItem('moduleId','6')
		setCookie('_data_active_id','6');
		window.location.href=url+'/#/networkLiterature/index';
	})
	$('#entry').click(function(){
		setCookie('firstmenu', '');
		setCookie('secondmenu', '');
		sessionStorage.setItem('secondmenus', '');
		sessionStorage.setItem('moduleId','7')
		setCookie('_data_active_id','7');
		window.location.href=url+'/#/wikipedia/index';
	})
	// $.ajax({
	// 	type: "POST",
	// 	url: "http://222.73.81.124:8521/web/diy/catalog/9",
	// 	success: function(msg) {
	// 		console.log(msg)
	// 		if(msg.code==401){
	// 			window.location.href=link
	// 		}else if(msg.code==0){
	// 			var selectedList = []
	// 			var chooseDuliang = []
	// 			var dimension = []
	// 			for (let o = 0; o < msg.list.length; o++) {
	// 				//大类
	// 				// console.log(msg.list[o].type=='1',msg.list[o].type=='2',msg.list[o].type=='3')
	// 				if (msg.list[o].type == '0') {
	// 					// 下拉框选择的list内容
	// 					selectedList.push({
	// 						name: msg.list[o].name,
	// 						value: msg.list[o].id
	// 					})
	// 					// 度量
	// 				} else if (msg.list[o].type == '2') {
	// 					chooseDuliang.push({
	// 						name: msg.list[o].name,
	// 						value: msg.list[o].id
	// 					})
	// 					// 维度
	// 				} else if (msg.list[o].type == '3') {
	// 					dimension.push({
	// 						name: msg.list[o].name,
	// 						value: msg.list[o].id
	// 					})
	// 				}
	// 				if (o == msg.list.length - 1) {
	// 					for (var i = 0; i < selectedList.length; i++) {
	// 						$('#selectedList').append('<option value=' + selectedList[i].value + ' >' + selectedList[i].name +
	// 							'</option>')
	// 					}
	// 					// 可选择的度量选项
	// 					var htmlChoose = ''
	// 					for (var j = 0; j < chooseDuliang.length; j++) {
	// 						htmlChoose += '<p class="leftcomm dragNameDu" draggable="true" data-id=' + chooseDuliang[j].value +
	// 							'><span class="addDu" data-id=' + chooseDuliang[j].value + '>' + chooseDuliang[j].name + '</span></p>'
	// 					}
	// 					$('#chooseDuliang').html(htmlChoose)
	// 					//添加维度到页面
	// 					var dimensionhtml = ''
	// 					for (var k = 0; k < dimension.length; k++) {
	// 						dimensionhtml += '<p class="leftcomm">' +
	// 							'<span class="addWei dragNameW" draggable="true" data-id=' + dimension[k].value + '>' + dimension[k].name +
	// 							'</span>' +
	// 							'<!-- 目前图标是灰色状态。不显示列表和搜索框 -->' +
	// 							'<img class="nosearch nosearch' + dimension[k].value + '" searchid=' + dimension[k].value +
	// 							' src="img/searchGray.png" >' +
	// 							'<!-- 目前图标是蓝色状态，显示列表和搜索框 -->' +
	// 							'<img class="search search' + dimension[k].value + '" searchid=' + dimension[k].value +
	// 							' src="img/search.png" >' +
	// 							'</p>' +
	// 							'<input type="search" name="movie" id="" value="" class="movieInput search' + dimension[k].value +
	// 							' searchinput' + dimension[k].value + '" searchname="'+dimension[k].name+'" searchid="' + dimension[k].value + '"/>' +
	// 							'<div id="movieList" class="movieList movieList' + dimension[k].value + '">' +
	// 							'</div>'
	// 					}
	// 					$('.dimension').html(dimensionhtml)
	// 				}
	// 			}
	// 		}else{
	// 			$('.warning p').html(msg.msg)
	// 			$('.warning').show()
	// 			setTimeout(function(){
	// 				$('.warning').hide()
	// 			},3000)
	// 		}
	// 	},
	// 	error: function(XHR, textStatus, errorThrown) {
	// 		$('.warning p').html('请求失败')
	// 		$('.warning').show()
	// 		setTimeout(function(){
	// 			$('.warning').hide()
	// 		},3000)
	// 	},
	// 	headers: {
	// 		"token": token,
	// 		"Content-Type": "application/json"
	// 	}
	// });
	var customScroll = new scrollbot('.movieList',10)
	document.onreadystatechange = function(){
		customScroll.refresh();
	}
})

// 图标是蓝色状态的时候,点击按钮,隐藏搜索框以及对应列表
$(document).on('click', '.search', function() {
	var searchid = $(this).attr('searchid')
	var showhtml = '.nosearch' + searchid
	var hidehtml = '.search' + searchid
	var listhtml = '.movieList' + searchid
	$('.searchinput' + searchid).val('')
	$(showhtml).show()
	$(hidehtml).hide()
	$(listhtml).hide()
})

function search(e) {
	var showhtml = '.no' + e
	var hidehtml = '.' + e
	$(showhtml).show()
	$(hidehtml).hide()
}
// 图标是灰色状态的时候,点击按钮,显示搜索框以及对应列表
$(document).on('click', '.nosearch', function() {
	if ($(this).hasClass('nodatename')) {

	} else {
		welist($(this).attr('searchid'))
	}
})
//获取维度对应列表
function welist(id) {
	var searchid = id
	var hidename = '.search' + searchid
	var listhtml = '.movieList' + searchid
	console.log(hidename)
	var json = {
		"diyId": searchid
	}
	$(listhtml).html(' ')
	if($('.searchinput' + searchid).attr('searchname')=='电影'&&$('.searchinput' + searchid).val()==''){
		
	}else{
		$.ajax({
			type: "POST",
			url: "http://222.73.81.124:8521/web/diy/field/1",
			data: "diyId=" + searchid + "&like=" + $('.searchinput' + searchid).val(),
			success: function(msg) {
				// if(msg.code==401){
				// 	window.location.href=link
				// }else if(msg.code==0){
				// 	if (msg.result.length > 50) {
				// 		var resultnum = 50
				// 	} else {
				// 		var resultnum = msg.result.length
				// 	}
				// 	for (var i = 0; i < resultnum; i++) {
				// 		$(listhtml).append('<p class="movieItem"><span class="dragNameW addWei" diy-id='+searchid+' draggable="true" data-id=' + msg.result[
				// 				i].tar +
				// 			'>' +
				// 			msg.result[i].ori + '</span></p>')
				// 	}
				// }else{
				// 	$('.warning p').html(msg.msg)
				// 	$('.warning').show()
				// 	setTimeout(function(){
				// 		$('.warning').hide()
				// 	},3000)
				// }
			},
			error: function(XHR, textStatus, errorThrown) {
				$('.warning p').html('请求失败')
				$('.warning').show()
				setTimeout(function(){
					$('.warning').hide()
				},3000)
			},
			headers: {
				"token": token
			}
		});
	}
	$(hidename).show()
	$(listhtml).show()
}

function nosearch(e) {
	var hidename = '.' + e
	$(hidename).show()
	var showname
	var itemHtml = ''
	var htmlId
	var dragNameW = 'dragNameW'
	if (e === 'datename') {
		showname = $('.nodatename')
		itemHtml = '<input type="date" name="" id="date" value="" />'
		htmlId = $('.datename')
	}
	htmlId.html(itemHtml)
	showname.hide()
}
// 日期选择赋值
// $(document).on("change", "#date", function() {
// 	var id = 'date'
// 	var isWei = 2
// 	add(id, $(this).val(), isWei, $('#duliangList')) // 参数：动态添加的属性值，度量列表，维度htmlid
// })
// 添加维度
var weiduList = []
// 点击事件的时候===添加维度
// $(document).on("click", ".addWei", function(e) {
// 	e.preventDefault();
// 	var isWei = 1 // 添加到维度list里
// 	add($(this).attr("diy-id"),$(this).attr("data-id"), $(this).text(), isWei, $('#weiduList')) // 参数：动态添加的属性值，维度列表，维度htmlid
// })
// 拖拽某个元素的事件===添加维度
$(document).on('dragstart', '.dragNameW', function(e) {
	$('#duliangList').off('dragover')
	$('#duliangList').off('dragenter')
	$('#duliangList').off('drop')
	var isWei = 1
	var weidataId = $(this).attr("data-id")
	var weidataName = $(this).text()
	var diyid=$(this).attr("diy-id")
	// $('#weiduList').on('drop', function(){)
	$(document).on('dragenter', '#weiduList', function() {})
	$(document).on('dragover', '#weiduList', function() {
		event.preventDefault()
	})
	$('#weiduList').on('drop', function(e) {
		add(diyid,weidataId, weidataName, isWei, $('#weiduList'))
	})
	$(document).on('drop', '#weiduList', function() {
		var timer = setInterval(function() {
			$('#weiduList').off('dragover')
			$('#weiduList').off('dragenter')
			$('#weiduList').off('drop')
			clearInterval(timer);
		}, 30)
	})
})
// 度量的列表,已选中的度量{name: '电影'}
var duliangList = []
// 添加度量===点击事件
// $(document).on("click", ".addDu", function() {
// 	var isWei = 2
// 	add($(this).attr("diy-id"),$(this).attr("data-id"), $(this).text(), isWei, $('#duliangList')) // 参数：动态添加的属性值，度量列表，维度htmlid
// })
// 添加度量===拖拽事件
$(document).on('dragstart', '.dragNameDu', function(e) {
	$('#duliangList').off('dragover')
	$('#duliangList').off('dragenter')
	$('#duliangList').off('drop')
	var isWei = 2
	var dudataId = $(this).attr("data-id")
	var dudataName = $(this).text().replace(/\s+/g,"");
	var diyid=$(this).attr("diy-id")
	// $('#weiduList').on('drop', function(){)
	$(document).on('dragenter', '#duliangList', function() {
		// console.log('进入维度')
	})
	$(document).on('dragover', '#duliangList', function() {
		// console.log('移动')
		event.preventDefault()
	})
	$('#duliangList').on('drop', function(e) {
		add(diyid,dudataId, dudataName, isWei, $('#duliangList'))
	})
	$(document).on('drop', '#duliangList', function() {
		var timer = setInterval(function() {
			$('#duliangList').off('dragover')
			$('#duliangList').off('dragenter')
			$('#duliangList').off('drop')
			clearInterval(timer);
		}, 30)
	})
})
// 点击维度列表里面的数据移除元素
$(document).on("click", ".remove", function(e) {
	var isWei = 1
	e.preventDefault();
	// console.log(weiduList)
	var obj = {};
	weiduList = weiduList.reduce(function(item, next) { // 对数组进行去重处理
		obj[next.name] ? '' : obj[next.name] = true && item.push(next);
		return item;
	}, []);
	remove($(this).attr("data-id"), isWei, $('#weiduList')) // 参数：动态添加的属性值当前点击的元素，度量列表，维度htmlid
	// console.log(weiduList)
})
// 点击度量列表中的数据移除元素
$(document).on("click", ".removeDu", function() {
	var isWei = 2
	var obj = {};
	duliangList = duliangList.reduce(function(item, next) { // 对数组进行去重处理
		obj[next.name] ? '' : obj[next.name] = true && item.push(next);
		return item;
	}, []);
	remove($(this).attr("data-id"), isWei, $('#duliangList')) // 参数：动态添加的属性值当前点击的元素，度量列表，维度html
})
// 点击颜色里面的元素移除
$(document).on("click", ".removeColor", function(e) {
	var isWei = 3
	e.preventDefault();
	var obj = {};
	colorList = colorList.reduce(function(item, next) { // 对数组进行去重处理
		obj[next.name] ? '' : obj[next.name] = true && item.push(next);
		return item;
	}, []);
	remove($(this).attr("data-id"), isWei, $('#colorList')) // 参数：动态添加的属性值当前点击的元素，度量列表，维度htmlid
})
// 添加维度和度量的公用方法,拖拽,输入,点击事件调用
var colorList = []
var type = -1 // 添加的数据类型
// 拖拽维度列表中的数据到颜色列表中
$(document).on('dragstart', '.isColorListW', function(e) {
	$('#colorList').off('dragover')
	$('#colorList').off('dragenter')
	$('#colorList').off('drop')
	var isWei = 3
	var dudataId = $(this).attr("data-id")
	var dudataName = $(this).text().replace(/\s+/g,"")
	var isColor = $(this).attr("data-index")
	var diyid=$(this).attr("diy-id")
	// $('#weiduList').on('drop', function(){)
	$(document).on('dragenter', '#colorList', function() {})
	$(document).on('dragover', '#colorList', function() {
		// console.log('移动')
		event.preventDefault()
	})
	$('#colorList').on('drop', function(e) {
		add(diyid,dudataId, dudataName, isWei, $('#colorList'), isColor)
	})
	$(document).on('drop', '#colorList', function() {
		var timer = setInterval(function() {
			$('#colorList').off('dragover')
			$('#colorList').off('dragenter')
			$('#colorList').off('drop')
			clearInterval(timer);
		}, 30)
	})
})
// 拖拽度量列表中的数据到颜色列表中
$(document).on('dragstart', '.isColorListDu', function(e) {
	$('#colorList').off('dragover')
	$('#colorList').off('dragenter')
	$('#colorList').off('drop')
	var isWei = 3
	var dudataId = $(this).attr("data-id")
	var dudataName = $(this).text()
	var isColor = $(this).attr("data-index")
	var diyid=$(this).attr("diy-id")
	// console.log()
	// $('#weiduList').on('drop', function(){)
	$(document).on('dragenter', '#colorList', function() {})
	$(document).on('dragover', '#colorList', function() {
		event.preventDefault()
	})
	$('#colorList').on('drop', function(e) {
		add(diyid,dudataId, dudataName, isWei, $('#colorList'), isColor)
	})
	$(document).on('drop', '#colorList', function() {
		var timer = setInterval(function() {
			$('#colorList').off('dragover')
			$('#colorList').off('dragenter')
			$('#colorList').off('drop')
			clearInterval(timer);
		}, 30)
	})
})

function add(diyid,addId, addName, isWei, htmlId, isColor) {
	// console.log(addId, isWei, htmlId, isColor,diyid)
	var listItem = { // 接收绑定的属性值，并赋值给数组的某一项
		name: addName,
		nameid: addId,
		diyid:diyid
	}
	// list.push(weiduListItem)
	var obj = {};
	var html = ''
	if (isWei === 1) { // 维度标签的类名
		// className = 'remove'
		weiduList.push(listItem)
		weiduList = weiduList.reduce(function(item, next) { // 对数组进行去重处理
			obj[next.name] ? '' : obj[next.name] = true && item.push(next);
			return item;
		}, []);
		for (var i = 0; i < weiduList.length; i++) { // 对去重后的数组渲染到页面
			html += '<span draggable="true" class="remove isColorListW" diy-id=' + weiduList[i].diyid + ' data-id=' + weiduList[i].nameid + ' data-index=' + isWei +
				'>' + weiduList[i].name + '</span>'
		}
		console.log($('#duliangList').html())
		if($('#duliangList').html()==''||$('#duliangList').html()==null){
			
		}else{
			$('.dates').show()
		}
	} else if (isWei === 2) { // 度量标签的类名
		// className = 'removeDu'
		duliangList.push(listItem)
		duliangList = duliangList.reduce(function(item, next) { // 对数组进行去重处理
			obj[next.name] ? '' : obj[next.name] = true && item.push(next);
			return item;
		}, []);
		for (var i = 0; i < duliangList.length; i++) { // 对去重后的数组渲染到页面
			html += '<span draggable="true" class="removeDu isColorListDu" data-id=' + duliangList[i].nameid + ' data-index=' +
				isWei + '>' + duliangList[i].name + '</span>'
		}
		if($('#weiduList').html()==''||$('#weiduList').html()==null){
			
		}else{
			$('.dates').show()
		}
	} else if (isWei === 3) {
		// className = ''
		console.log('添加元素')
		if (type === -1) { // colorlist为空
			colorList.push(listItem)
			colorList = colorList.reduce(function(item, next) { // 对数组进行去重处理
				obj[next.name] ? '' : obj[next.name] = true && item.push(next);
				return item;
			}, []);
			for (var i = 0; i < colorList.length; i++) { // 对去重后的数组渲染到页面
				html += '<span class="removeColor" data-id=' + colorList[i].nameid + '>' + colorList[i].name + '</span>'
			}
			type = isColor
		} else if (type != isColor) {
			alert('不能同时为度量和维度加颜色')
			colorList = colorList.reduce(function(item, next) { // 对数组进行去重处理
				obj[next.name] ? '' : obj[next.name] = true && item.push(next);
				return item;
			}, []);
			for (var i = 0; i < colorList.length; i++) { // 对去重后的数组渲染到页面
				html += '<span class="removeColor" data-id=' + colorList[i].nameid + '>' + colorList[i].name + '</span>'
			}
			// type = isColor
		} else {
			colorList.push(listItem)
			colorList = colorList.reduce(function(item, next) { // 对数组进行去重处理
				obj[next.name] ? '' : obj[next.name] = true && item.push(next);
				return item;
			}, []);
			for (var i = 0; i < colorList.length; i++) { // 对去重后的数组渲染到页面
				html += '<span class="removeColor" data-id=' + colorList[i].nameid + '>' + colorList[i].name + '</span>'
			}
		}
	}
	// 维度的数组
	htmlId.html(html)
}
$('#success').click(function(){
	$('.dates').hide()
	getListData()
})
// // 移除页面中维度和度量的元素
function remove(removeId, isWei, htmlId) {
	console.log(removeId, isWei, htmlId)
	// console.log(list)
	var index = -1
	var className
	var html = ''
	var list = []
	if (isWei === 1) {
		className = 'remove'
		list = weiduList
	} else if (isWei === 2) {
		className = 'removeDu'
		list = duliangList
	} else if (isWei === 3) {
		console.log('移除')
		className = 'removeColor'
		list = colorList
		console.log(colorList)
	}
	console.log(list)
	for (var k = 0; k < list.length; k++) {
		if (removeId === list[k].nameid) {
			index = k
			break
		} else {
			index = -1
		}
	}
	if (index != -1) {
		list.splice(index, 1)
		if (isWei === 1) {
			className = 'remove'
			weiduList = list
		} else if (isWei === 2) {
			className = 'removeDu'
			duliangList = list
		} else if (isWei === 3) {
			className = 'removeColor'
			colorList = list
			if (colorList.length === 0) {
				type = -1
			}
		}
		for (var i = 0; i < list.length; i++) { // 对去重后的数组渲染到页面
			html += '<span class=' + className + ' diy-id=' + list[i].diyid + ' data-id=' + list[i].nameid + '>' + list[i].name + '</span>'
		}
		htmlId.html(html)
		getListData()
	} else {
		alert('暂无可移除的维度')
	}
}
//维度搜索框输入内容回车事件
$(document).on('keypress', '.movieInput', function(event) {
	if (event.keyCode == "13") {
		welist($(this).attr('searchid'))
	}
});
//点击顶部清除
$('.clean').click(function() {
	duliangList.length = 0
	colorList.length = 0
	weiduList.length = 0
	$('#duliangList').off('dragover')
	$('#duliangList').off('dragenter')
	$('#duliangList').off('drop')
	$('#weiduList').off('dragover')
	$('#weiduList').off('dragenter')
	$('#weiduList').off('drop')
	$('#colorList').off('dragover')
	$('#colorList').off('dragenter')
	$('#colorList').off('drop')
	$('#duliangList').html(' ')
	$('#weiduList').html(' ')
	$('#colorList').html(' ')
	$('#main').children('div').hide()
	$('.tables').remove()
})
//改变维度或者读取获取数据
function getListData() {
	$('.loading').show()
	var lists = [];
	//维度
	for (let j = 0; j < $('#weiduList .remove').length; j++) {
		if($($('#weiduList .remove')[j]).attr('diy-id')=='undefined'){
			lists.push({
				'diyId': $($('#weiduList .remove')[j]).attr('data-id'),
				"queryType": 1
			})
		}else{
			if(lists.length==0){
				lists.push({
					'diyId': $($('#weiduList .remove')[j]).attr('diy-id'),
					'params':[$($('#weiduList .remove')[j]).attr('data-id')],
					"queryType": 1
				})
			}else{
				for(var n=0;n<lists.length;n++){
					if(lists[n].diyId==$($('#weiduList .remove')[j]).attr('diy-id')){
						if(lists[n].params.indexOf($($('#weiduList .remove')[j]).attr('data-id'))==-1){
							lists[n].params.push($($('#weiduList .remove')[j]).attr('data-id'))
							lists[n].queryType=8
						}
					}else if(n==lists.length-1){
						lists.push({
							'diyId': $($('#weiduList .remove')[j]).attr('diy-id'),
							'params':[$($('#weiduList .remove')[j]).attr('data-id')],
							"queryType": 1
						})
					}
				}
			}
		}
	}
	//度量
	for (var k = 0; k < $('#duliangList .removeDu').length; k++) {
		console.log($($('#duliangList .removeDu')[k]).attr('data-id'))
		if ($($('#duliangList .removeDu')[k]).attr('data-id') == 'date') {
			lists.push({
				'diyId': 14,
				"queryType": 1,
				'params': $($('#duliangList .removeDu')[k]).text()
			})
		} else {
			lists.push({
				'diyId': $($('#duliangList .removeDu')[k]).attr('data-id'),
				"queryType": 1
			})
		}
	}
	$.ajax({
		url: "http://222.73.81.124:8521/web/diy/dswl",
		contentType: "application/x-www-form-urlencoded",
		type: "POST",
		// data: 'diys=' + JSON.stringify(lists),
		success: function(msg) {
			console.log(msg)
			if(msg.code==401){
				window.location.href=link
			}else if(msg.code==0){
				var xshaft = []
				var yshaft = []
				var shaftdata = []
				for (let k = 0; k < $('#duliangList .removeDu').length; k++) {
					yshaft.push($($('#duliangList .removeDu')[k]).text())
					shaftdata.push([])
					for (var i = 0; i < msg.result.length; i++) {
						// console.log(msg.result[i][$($('#duliangList .removeDu')[k]).text()],$($('#duliangList .removeDu')[k]).text())
						shaftdata[k].push(msg.result[i]['总'+$($('#duliangList .removeDu')[k]).text()])
					}
				}
				if($('#weiduList .remove').length==1){
					if($($('#weiduList .remove')[0]).attr('diy-id')=='undefined'){
						for (var i = 0; i < msg.result.length; i++) {
							for (var j = 0; j < $('#weiduList .remove').length; j++) {
								console.log(msg.result[i][$($('#weiduList .remove')[j]).html()])
								xshaft.push(msg.result[i][$($('#weiduList .remove')[j]).html()])
							}
						}
					}else{
						for (var j = 0; j < $('#weiduList .remove').length; j++) {
							xshaft.push($($('#weiduList .remove')[j]).html())
						}
					}
				}else{
					var two=0
					for(var i=0;i<$('#weiduList .remove').length;i++){
						if($($('#weiduList .remove')[i]).attr('diy-id')=='undefined'){
							
						}else{
							two++
						}
					}
					if(two==0){
						
					}else if(two==1){
						
					}else if(two==2){
						
					}
				}
				// for (var i = 0; i < msg.result.length; i++) {
				// 	for (var j = 0; j < $('#weiduList .remove').length; j++) {
				// 		console.log(msg.result[i][$($('#weiduList .remove')[j]).html()])
				// 		xshaft.push(msg.result[i][$($('#weiduList .remove')[j]).html()])
				// 	}
				// }
				console.log(yshaft, shaftdata,xshaft)
				window.abscissa = xshaft
				window.ordinate = yshaft
				window.ordinateData = shaftdata
				$('.loading').hide()
				if (charttype == '' || charttype == 'bar') {
					bar(abscissa, ordinate, ordinateData, [], 'main')
				} else if (charttype == 'line') {
					line(abscissa, ordinate, ordinateData, [], 'main')
				} else if (charttype == 'chart') {
					chart(abscissa, ordinate, ordinateData, [], 'main')
				} else if (charttype == 'pie') {
					pie(abscissa, ordinate, ordinateData, [], 'main')
				} else if (charttype == 'table') {
					$('.tables').remove()
					table(abscissa, ordinate, ordinateData, [], 'main')
				}
			}else{
				$('.warning p').html(msg.msg)
				$('.warning').show()
				setTimeout(function(){
					$('.warning').hide()
				},3000)
			}
		},
		error: function(XHR, textStatus, errorThrown) {
			$('.warning p').html('请求失败')
			$('.warning').show()
			setTimeout(function(){
				$('.warning').hide()
			},3000)
		},
		headers: {
			"token": token
		}
	});
}
