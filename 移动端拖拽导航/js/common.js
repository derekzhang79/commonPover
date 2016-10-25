
//刷新页面
window.addEventListener('reLode', function() {
	window.location.reload();
})


//分享
/*
 
 * option点击事件id
 * messages分享内容
 * urls分享链接
 * title分享标题
 * imgUrl分享图片地址
 * */
function shareFn(option, messages, urls, title, imgUrl) {
	//分享
	updateSerivces();
	//打开分享
	mui("#" + option)[0].addEventListener("tap", function() {
		shareShow();
	})
	var shares = null,
		bhref = false;
	var Intent = null,
		File = null,
		Uri = null,
		main = null;
	/**
	 * 更新分享服务
	 */
	function updateSerivces() {
		plus.share.getServices(function(s) {
			shares = {};
			for (var i in s) {
				var t = s[i];
				shares[t.id] = t;
			}
		}, function(e) {
			console.log("获取分享服务列表失败：" + e.message);
		});
	}

	/**
	 * 分享操作
	 * @param {String} id
	 */
	function shareAction(id, ex) {
		var s = null;
		//		console.log( "分享操作：" );
		if (!id || !(s = shares[id])) {
			console.log("无效的分享服务！");
			return;
		}
		if (s.authenticated) {
			console.log("---已授权---");
			shareMessage(s, ex);
		} else {
			console.log("---未授权---");
			s.authorize(function() {
				shareMessage(s, ex);
			}, function(e) {
				console.log("认证授权失败：" + e.code + " - " + e.message);
			});
		}
	}

	/**
	 * 发送分享消息
	 * @param {plus.share.ShareService} s
	 */
	function shareMessage(s, ex) {
		//		var url="../../img/add.png";
		//		plus.io.resolveLocalFileSystemURL(url,function(entry){
		//			pic.src=entry.toLocalURL();
		//			pic.realUrl=url;
		//		},function(e){
		//			console.log("读取Logo文件错误："+e.message);
		//		} );
		var msg = {
			extra: {
				scene: ex
			}
		};
		msg.href = urls;
		msg.title = title;
		msg.content = messages;
		//		if(bhref){
		//			msg.href=sharehref.value;
		//			if(sharehrefTitle&&sharehrefTitle.value!=""){
		//				msg.title=sharehrefTitle.value;
		//			}
		//			if(sharehrefDes&&sharehrefDes.value!=""){
		//				msg.content+= "；下载地址：" +  "www.baidu.com";
		//			}
		//			msg.thumbs=["../../img/balimilogo.png"];
		//			msg.pictures=["../../img/balimilogo.png"];
		//		}
		msg.thumbs = ["http://img.87money.com/51fbao/app/balimilogo.png"];
		msg.pictures = ["../../img/balimilogo.png"];
		console.log(JSON.stringify(msg));
		s.send(msg, function() {
			console.log("分享到\"" + s.description + "\"成功！ ");
		}, function(e) {
			alert("分享到\"" + s.description + "\"失败: " + e.code + " - " + e.message);
		});
	}

	// 打开分享
	function shareShow() {
		bhref = false;
		var ids = [{
				id: "weixin",
				ex: "WXSceneSession"
			}, {
				id: "weixin",
				ex: "WXSceneTimeline"
			}, {
				id: "sinaweibo"
			}],
			bts = [{
				title: "发送给微信好友"
			}, {
				title: "分享到微信朋友圈"
			}, {
				title: "分享到新浪微博"
			}];
		if (plus.os.name == "iOS") {
			ids.push({
				id: "qq"
			});
			bts.push({
				title: "分享到QQ"
			});
		}
		plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: bts
			},
			function(e) {
				var i = e.index;
				if (i > 0) {
					shareAction(ids[i - 1].id, ids[i - 1].ex);
				}
			}
		);
	}
}
/*
 
 * 改变状态栏颜色
 * */
mui.init({
	swipeBack: false,
	statusBarBackground: '#55aee5'
});
/*
 * 请求错误、超时
 * */

function timeOut() {
	var box = mui('body')[0];
	var div = document.createElement("div");
	div.id = "re_Cover";
	var html = '';
	html = '<div style="position: absolute;z-index: 999;top: 0;padding: 0 10%;width: 100%;height:100%;background: rgba(0,0,0,0.5);">';
	html += '<div class="tc" style="25rem;height: 9rem;margin: 75% auto;padding:1rem 0 0 0;background:#fff;border-radius:5px ;">';
	html += '<h4 style="color:#ff7f00;margin-bottom: 0.6rem;">温馨提示</h4>';
	html += '<p>耽误您的时间，我们深感抱歉</p>';
	html += '<div style="margin-top:0.2rem"> ';
	html += '<button id="re_Btn" style="background:#ff7f00;color:#fff;width:7rem;border:none;" class="c_c22">重新加载</button>';
	html += '<button id="cancel_Btn1" style="margin-left:1.5rem;background:#ff7f00;color:#fff;width:7rem;border:none" class="c_c22">取消</button>';
	html += '</div>';
	html += '</div> ';
	html += '</div>';
	div.innerHTML = html;
	box.appendChild(div);
	mui("#re_Btn")[0].addEventListener("tap", function() {
		window.location.reload();
		$("#re_Cover").remove();
	});
	mui("#cancel_Btn1")[0].addEventListener("tap", function() {
		$("#re_Cover").remove();
	})


}

//跳转至详情页

function openDetail(pid, productName) {
	mui.openWindow({
		id: "detail.html",
		url: "product/detail.html",
		styles: {
			top: '0',
			bottom: '0'

		},
		extras: {
			pid: pid,
			title: productName
		},
		createNew: true
	})
}
/*
 加载动画
 * */
function LoadAnimation() {
	var box = mui('body')[0];
	var div = document.createElement("div");
	div.className = "LoadAnimation";
	var html = '';
	html = '<div id="LoadAnimation" style="z-index: 999;position: fixed; height:100%; background:rgba(255,255,255,0.3);width: 100%;top:0%;padding:70% 50%">';
	html += '<i class="fa fa-spinner fa-spin"></i>';
	html += '</div>';
	div.innerHTML = html;
	box.appendChild(div);
}
/*
 * 关闭加载动画
 */
function closeWaiting() {
	$(".LoadAnimation").remove();
}

/*
 
 * 检测登陆
 * */
function checkedLogin() {

}

/*
 
 * 验证是否实名认证
 * */
function checkedRealName() {

}

/*手机号验证
 * phoneNumber 手机号码
 * */
function checkedPhone(phoneNumber) {
	var telephone = plus.storage.getItem("telephone");
	var mobilereg = /^1\d{10}$/;
	if (phoneNumber == '') {
		mui.toast('电话号码不能为空');
		return false;
	} else if (phoneNumber && !mobilereg.test(phoneNumber)) {
		mui.toast('请输入有效的电话号码！');
		return false;

	} else {
		return true;
	}
}
/*
 * 三位一逗号数字处理
 */

function formatNum(strNum) {
	if (strNum.length <= 3) {

		return strNum;

	}

	if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {

		return strNum;

	}

	var a = RegExp.$1,
		b = RegExp.$2,
		c = RegExp.$3;

	var re = new RegExp();

	re.compile("(\\d)(\\d{3})(,|$)");

	while (re.test(b)) {

		b = b.replace(re, "$1,$2$3");

	}

	return a + "" + b + "" + c;

}

//网络检测
function onNetChange(pageUrl) {
	var nt = plus.networkinfo.getCurrentType();
	switch (nt) {
		case plus.networkinfo.CONNECTION_ETHERNET:
		case plus.networkinfo.CONNECTION_WIFI:
			break;
		case plus.networkinfo.CONNECTION_CELL2G:
		case plus.networkinfo.CONNECTION_CELL3G:
		case plus.networkinfo.CONNECTION_CELL4G:
			//					alert("Switch to Cellular networks!");  

			break;
		default:
			mui.openWindow({
				url: "network.html",
				id: "network.html",
				styles: {
					top: 0,
					bottom: 0
				},
				extras: {
					pageId: pageUrl
				}
			});
			break;
	}
}

//版本更新
//version 版本号
function upDate(version) {
	$.ajax({
		type: "get",
		contentType: "application/json",
		dataType: "json",
		async: false,
		url: url + "/appVer/v1/checkAppVersion",
		data: {
			"platform": channals()
		},
		success: function(msg) {
			if (msg.data.isUpdate == 0) {
				mui.toast("已是最新版不用更新")
			} else {
				if (msg.data.forcedUpdate == 0) {
					mui.toast("有新版本可选择更新");
					var btnArray = ['是', '否'];
					mui.confirm('有可更新版本' + msg.data.id + '', '提示', btnArray, function(e) {
						if (e.index == 0) {
							var url = msg.data.downLoadUrl;
							var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
								mui.toast("正在下载...")
								if (status == 200) { // 下载成功

									var path = d.filename;
									plus.runtime.install(path); // 安装下载的apk文件
									console.log(d.filename);
								} else { //下载失败
									alert("Download failed: " + status);
								}
							});
							dtask.start();
						}
					})



				} else {
					var url = msg.data.downLoadUrl;
					var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
						mui.toast("正在下载...")
						if (status == 200) { // 下载成功

							var path = d.filename;
							plus.runtime.install(path); // 安装下载的apk文件
							console.log(d.filename);
						} else { //下载失败
							alert("Download failed: " + status);
						}
					});
					dtask.start();

				}

			}
			console.log(JSON.stringify(msg))

		},
		error: function(e) {
			console.log(JSON.stringify(e))
		}
	});

}


//版本更新
//version 版本号
function upDate1(version) {
	
	$.ajax({
		type: "get",
		contentType: "application/json",
		dataType: "json",
		data:{
			"platform": channals()
		},
		async: false,
		url: getUrlParam() + "/appVer/v1/checkAppVersion",
		success: function(msg) { 
			if (msg.code == 1000) {
				mui.toast(msg.msg);
				//	    			mui.toast("已是最新版不用更新")
			} else {
				console.log(JSON.stringify(msg))
				if (msg.data.minVersion<version<msg.data.maxVersion) {
					var btnArray = ['立即升级', '取消'];
					mui.confirm('描述:' + msg.data.versionDsc + '', '更新提示', btnArray, function(e) {
						if (e.index == 0) {
							var urls = url+msg.data.path;
							var dtask = plus.downloader.createDownload(urls, {}, function(d, status) {
								mui.toast("正在下载...")
								if (status == 200) { // 下载成功

									var path = d.filename;
									plus.runtime.install(path); // 安装下载的apk文件
									console.log(d.filename);
								} else { //下载失败
									alert("Download failed: " + status);
								}
							});
							dtask.start();
						}
					})



				} else {
					var urls = url+msg.data.path;
					var dtask = plus.downloader.createDownload(urls, {}, function(d, status) {
						mui.toast("正在下载...")
						if (status == 200) { // 下载成功

							var path = d.filename;
							plus.runtime.install(path); // 安装下载的apk文件
							console.log(d.filename);
						} else { //下载失败
							alert("Download failed: " + status);
						}
					});
					dtask.start();

				}

			}
			//	    		nwaiting.close();
			console.log(JSON.stringify(msg))

		},
		error: function(e) {
			console.log(JSON.stringify(e))
		}
	});

}