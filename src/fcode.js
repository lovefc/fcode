/*
 * autor:lovefc (http://lovefc.cn)
 * time:2016/4/3
 * update:2017/10/10
 * update:2018/03/31
 * 版权所有,修改必究
 */

var fcode = function() {};

fcode.bgColor = '#304758'; //背景颜色

fcode.codeWidth = '240'; //验证样式宽度

fcode.codeHeight = '240'; //验证样式高度

fcode.fontColor = "#E4E4E4"; //字体颜色

fcode.lineColor = "#00aec7"; //连线的颜色

fcode.lineErrorColor = "#00a254"; //连线错误颜色

fcode.lineSuceessColor = "#cc1c21"; //连续正确颜色

fcode.cookieName = 'fcode_status'; //cookies的名字

fcode.Time = 10; //锁屏的时间

fcode.Debug = false; //用来设置是否禁止F12，鼠标右键

fcode.bgImage = false; //设置背景图片，优先于背景颜色

fcode.customHtml = false; //自定义html

fcode.headhtml = '<div style="margin-top:80px;"><span style="color:#333;height:20px;font: 30px Verdana;">FCode</span><br /><br /></div>';

fcode.shield = function() {
	if(fcode.Debug === true) {
		document.onkeydown = function() {
			var e = window.event || arguments[0];
			if(e.keyCode == 123) {
				return false;
			} else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
				return false;
			} else if((e.shiftKey) && (e.keyCode == 121)) {
				return false;
			}
		};
		document.oncontextmenu = function() {
			return false;
		}
	}
}
fcode.show = function() {
	document.body.style.display = "none";
	$('#4cb1c50ed37392a3').show();
	$('#021c801b5230dbf0').show();
}
fcode.detectionStatus = function() {
	if(fcode.getCookie(fcode.cookieName) != '50d3ea262a610d17') {
		fcode.show();
	}
}
fcode.events = function() {
	if(fcode.getCookie(fcode.cookieName) == '50d3ea262a610d17') {
		fcode.setCookie(fcode.cookieName, "50d3ea262a610d17", "s" + fcode.Time);
	}
}
fcode.getCookie = function(c_name) {
	if(document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if(c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}
fcode.setCookie = function(name, value, time) {
	var strsec = fcode.getSec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
fcode.getSec = function(str) {
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if(str2 == "s") {
		return str1 * 1000;
	} else if(str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if(str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}
fcode.delCookie = function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
fcode.addMata = function() {
	var meta = '<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>';
	meta += '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">';
	$("head").append(meta);
}
fcode.Uppwd = function(url) {
	var x_num = 1;
	var str = fcode.customHtml || '';
	if(("undefined" == typeof str) || str.length == 0) {
		str = fcode.headhtml;
	}
	fcode.addDiv('<center>' + str + '<h4 id="349edb483ae025fa">设置新密码</h4><div id="eefbb7772b90e8f9"></div></center>');
	$("#eefbb7772b90e8f9").on("hasPasswd", function(e, passwd) {
		var n = x_num;
		switch(n) {
			case 1:
				$('#349edb483ae025fa').text('再次输入密码');
				fcode.succes();
				x_num = 2;
				break;
			case 2:
				if(fcode.getCookie('9c412f96cffa4c06') == passwd) {
					$.post(url, {
							pwd: passwd,
						},
						function(data, status) {
							if(data == 'ok' && status == 'success') {
								fcode.succes();
								$('#349edb483ae025fa').text('密码设置成功');
							} else {
								$('#349edb483ae025fa').text('密码设置失败');
								fcode.error();
							}
						});
					x_num = 1;
				} else {
					fcode.error();
					$('#349edb483ae025fa').text('再次密码输入不一致');
					x_num = 1;
					setTimeout(function() {
						$('#349edb483ae025fa').text('设置新密码');
					}, 2000);
				}
				break;
		}
		fcode.setCookie("9c412f96cffa4c06", passwd, "s60");
	});
	fcode.show();
}
fcode.Login = function(callback) {
	fcode.addMata();
	var str = fcode.customHtml || '';
	if(("undefined" == typeof str) || str.length == 0) {
		str = fcode.headhtml;
	}
	fcode.addDiv('<center>' + str + '<div id="eefbb7772b90e8f9"></div></center>');
	$("#eefbb7772b90e8f9").on("hasPasswd", function(e, passwd) {
		callback(passwd);
	});
	$('#4cb1c50ed37392a3').show();
	$('#021c801b5230dbf0').show();
	document.body.style.display = "none";
};
fcode.Start = function(url) {
	if(("undefined" == typeof url) || url.length == 0) {
		return false;
	}
	fcode.addMata();
	var str = fcode.customHtml || '';
	if(("undefined" == typeof str) || str.length == 0) {
		str = fcode.headhtml;
	}
	fcode.addDiv('<center>' + str + '<div id="eefbb7772b90e8f9"></div></center>');
	setInterval("fcode.detectionStatus()", 5000);
	$("#eefbb7772b90e8f9").on("hasPasswd", function(e, passwd) {
		fcode.authentication(url, passwd);
	});
	fcode.detectionStatus();
	document.onkeydown = fcode.events;
	document.onmousemove = fcode.events;
	document.ontouchstart = fcode.events;
	document.ontouchmove = fcode.events;
	document.ontouchup = fcode.events;
};
fcode.checkNum = function(number) {
	if(parseInt(number).toString() == "NaN") {
		return false;
	} else {
		return true;
	}
};
fcode.checkUrl = function(url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)" +
		"?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
		"(([0-9]{1,3}/.){3}[0-9]{1,3}" +
		"|" +
		"([0-9a-z_!~*'()-]+/.)*" +
		"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]/." +
		"[a-z]{2,6})" +
		"(:[0-9]{1,4})?" +
		"((/?)|" +
		"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp(strRegex);
	if(re.test(url)) {
		return(true);
	} else {
		return(false);
	}
};
fcode.checkStatus = function(data, status) {
	//console.log(data);
	if(data == 'ok' && status == 'success') {
		fcode.succes();
		setTimeout(function() {
			$("#4cb1c50ed37392a3").hide();
			$("#021c801b5230dbf0").hide();
			document.body.style.display = "";
		}, 500);
	} else {
		fcode.error();
	}
};
fcode.succes = function() {
	$("#eefbb7772b90e8f9").trigger("passwdRight");
}

fcode.error = function() {
	$("#eefbb7772b90e8f9").trigger("passwdWrong");
}
fcode.authentication = function(url, passwd) {
	if(fcode.checkUrl(url) === true) {
		$.post(url, {
			pwd: passwd,
			time: fcode.Time
		}, fcode.checkStatus);
	} else {
		var d,
			st;
		if(fcode.checkNum(url) === true) {
			if(parseInt(url) === parseInt(passwd)) {
				d = 'ok';
				st = 'success';
				fcode.setCookie(fcode.cookieName, "50d3ea262a610d17", "s" + fcode.Time);
			}
		} else {
			if(url == md5(passwd)) {
				d = 'ok';
				st = 'success';
				fcode.setCookie(fcode.cookieName, "50d3ea262a610d17", "s" + fcode.Time);
			}
		}
		fcode.checkStatus(d, st);
	};
}
fcode.addDiv = function(content) {
	var newMaskID = "4cb1c50ed37392a3";
	var newMaskWidth = document.documentElement.clientWidth;
	var newMaskHeight = document.documentElement.clientHeight;
	var imgstr = '';
	$("html").prepend('<div id="021c801b5230dbf0"></div><div id="' + newMaskID + '"></div>');
	$('#4cb1c50ed37392a3').css({
		"position": "absolute",
		"margin-left": "0",
		"margin-top": "0",
		"height": newMaskHeight + "px",
		"filter": "alpha(opacity=100)",
		"opacity": "1.0",
		"overflow": "hidden",
		"width": newMaskWidth + "px",
		"z-index": "9999",
		"display": "none"
	});
	if(fcode.bgImage) {
		var imgstr = '<img src="' + fcode.bgImage + '" style="height:100%;width:100%;border:0;">';
		$("#021c801b5230dbf0").prepend(imgstr);
	} else {
		$('#4cb1c50ed37392a3').css({
			"background-color": fcode.bgColor,
		});
	}
	$('#021c801b5230dbf0').css({
		"position": "fixed",
		"top": "0",
		"left": "0",
		"bottom": "0",
		"right": "0",
		"z-index": "-1",
		"filter": "alpha(opacity=100)",
		"-moz-opacity": "1",
		"-khtml-opacity": "1",
		"opacity": "1",
		"display": "none"
	});
	$('#4cb1c50ed37392a3').html(content);
	fcode.divShow();
};
fcode.divShow = function() {
	$("#eefbb7772b90e8f9").GesturePasswd({
		backgroundColor: fcode.bgColor,
		color: fcode.fontColor,
		roundRadii: 25,
		pointRadii: 8,
		space: 30,
		width: fcode.codeWidth,
		height: fcode.codeHeight,
		lineColor: fcode.lineColor,
		zindex: 100,
	});
	fcode.shield();
};

! function(a) {
	function b(b, d) {
		return this.each(function() {
			var e = a(this),
				f = a.extend({}, c.DEFAULTS, "object" == typeof b && b),
				g = e.data("GesturePasswd"),
				h = "string" == typeof b ? b : 0 / 0;
			g || e.data("danmu", g = new c(this, f)),
				h && g[h](d)
		})
	}
	var c = function(b, c) {
		this.$element = a(b),
			this.options = c;
		var d = this;
		this.pr = c.pointRadii,
			this.rr = c.roundRadii,
			this.o = c.space,
			this.color = c.color,
			this.$element.css({
				position: "relation",
				//background-color: c.backgroundColor,
				width: this.options.width,
				height: this.options.height,
				overflow: "hidden",
				cursor: "default"
			}),
			a(b).attr("id") || a(b).attr("id", (65535 * Math.random()).toString()),
			this.id = "#" + a(b).attr("id");
		var e = function(a, b) {
			this.x = a,
				this.y = b
		};
		this.result = "",
			this.pList = [],
			this.sList = [],
			this.tP = new e(0, 0),
			this.$element.append('<canvas class="main-c" width="' + c.width + '" height="' + c.height + '" >'),
			this.$c = a(this.id + " .main-c")[0],
			this.$ctx = this.$c.getContext("2d"),
			this.initDraw = function() {
				this.$ctx.strokeStyle = this.color,
					this.$ctx.lineWidth = 2;
				for(var a = 0; 3 > a; a++)
					for(var b = 0; 3 > b; b++) {
						this.$ctx.moveTo(this.o / 2 + 2 * this.rr + b * (this.o + 2 * this.rr), this.o / 2 + this.rr + a * (this.o + 2 * this.rr)),
							this.$ctx.arc(this.o / 2 + this.rr + b * (this.o + 2 * this.rr), this.o / 2 + this.rr + a * (this.o + 2 * this.rr), this.rr, 0, 2 * Math.PI);
						var c = new e(this.o / 2 + this.rr + b * (this.o + 2 * this.rr), this.o / 2 + this.rr + a * (this.o + 2 * this.rr));
						d.pList.length < 9 && this.pList.push(c)
					}
				this.$ctx.stroke(),
					this.initImg = this.$ctx.getImageData(0, 0, this.options.width, this.options.height)
			},
			this.initDraw(),
			this.isIn = function(a, b) {
				for(var c in d.pList)
					if(Math.pow(a - d.pList[c].x, 2) + Math.pow(b - d.pList[c].y, 2) < Math.pow(this.rr, 2))
						return d.pList[c];
				return 0
			},
			this.pointDraw = function(a) {
				arguments.length > 0 && (d.$ctx.strokeStyle = a, d.$ctx.fillStyle = a);
				for(var b in d.sList)
					d.$ctx.moveTo(d.sList[b].x + d.pr, d.sList[b].y), d.$ctx.arc(d.sList[b].x, d.sList[b].y, d.pr, 0, 2 * Math.PI), d.$ctx.fill()
			},
			this.lineDraw = function(a) {
				if(arguments.length > 0 && (d.$ctx.strokeStyle = a, d.$ctx.fillStyle = a), d.sList.length > 0)
					for(var b in d.sList)
						0 != b ? (d.$ctx.lineTo(d.sList[b].x, d.sList[b].y), console.log(d.sList[b].x, d.sList[b].y)) : (console.log(d.sList[b].x, d.sList[b].y), d.$ctx.moveTo(d.sList[b].x, d.sList[b].y))
			},
			this.allDraw = function(a) {
				arguments.length > 0 ? (this.pointDraw(a), this.lineDraw(a), d.$ctx.stroke()) : (this.pointDraw(), this.lineDraw())
			},
			this.draw = function(a, b) {
				d.$ctx.clearRect(0, 0, d.options.width, d.options.height),
					d.$ctx.beginPath(),
					d.$ctx.putImageData(this.initImg, 0, 0),
					d.$ctx.lineWidth = 4,
					d.pointDraw(d.options.lineColor),
					d.lineDraw(d.options.lineColor),
					d.$ctx.lineTo(a, b),
					d.$ctx.stroke()
			},
			this.pointInList = function(a, b) {
				for(var c in b)
					if(a.x == b[c].x && a.y == b[c].y)
						return ++c;
				return !1
			},
			this.touched = !1,
			a(this.id).on("mousedown touchstart", {
				that: d
			}, function(a) {
				a.data.that.touched = !0
			}),
			a(this.id).on("mouseup touchend", {
				that: d
			}, function(c) {
				c.data.that.touched = !1,
					d.$ctx.clearRect(0, 0, d.options.width, d.options.height),
					d.$ctx.beginPath(),
					d.$ctx.putImageData(c.data.that.initImg, 0, 0),
					d.allDraw(d.options.lineColor);
				for(var e in d.sList)
					c.data.that.pointInList(d.sList[e], c.data.that.pList) && (c.data.that.result = c.data.that.result + c.data.that.pointInList(d.sList[e], c.data.that.pList).toString());
				a(b).trigger("hasPasswd", d.result)
			}),
			a(this.id).on("touchmove mousemove", {
				that: d
			}, function(a) {
				if(a.data.that.touched) {
					var b = a.pageX || a.originalEvent.targetTouches[0].pageX,
						c = a.pageY || a.originalEvent.targetTouches[0].pageY;
					b -= d.$element.offset().left,
						c -= d.$element.offset().top;
					var e = a.data.that.isIn(b, c);
					//console.log(b),
					0 != e && (a.data.that.pointInList(e, a.data.that.sList) || a.data.that.sList.push(e)),
						//console.log(a.data.that.sList),
						a.data.that.draw(b, c)
				}
			}),
			a(this.id).on("passwdWrong", {
				that: d
			}, function() {
				d.$ctx.clearRect(0, 0, d.options.width, d.options.height),
					d.$ctx.beginPath(),
					d.$ctx.putImageData(d.initImg, 0, 0),
					d.allDraw(fcode.lineSuceessColor),
					d.result = "",
					d.pList = [],
					d.sList = [],
					setTimeout(function() {
						d.$ctx.clearRect(0, 0, d.options.width, d.options.height),
							d.$ctx.beginPath(),
							d.initDraw()
					}, 500)
			}),
			a(this.id).on("passwdRight", {
				that: d
			}, function() {
				d.$ctx.clearRect(0, 0, d.options.width, d.options.height),
					d.$ctx.beginPath(),
					d.$ctx.putImageData(d.initImg, 0, 0),
					d.allDraw(fcode.lineErrorColor),
					d.result = "",
					d.pList = [],
					d.sList = [],
					setTimeout(function() {
						d.$ctx.clearRect(0, 0, d.options.width, d.options.height),
							d.$ctx.beginPath(),
							d.initDraw()
					}, 500)
			})
	};
	c.DEFAULTS = {
			zindex: 100,
			roundRadii: 25,
			pointRadii: 6,
			space: 30,
			width: 240,
			height: 240,
			lineColor: "#00aec7",
			backgroundColor: "#252736",
			color: "#FFFFFF"
		},
		a.fn.GesturePasswd = b,
		a.fn.GesturePasswd.Constructor = c
}
(jQuery);

(function(g) {
		function o(u, z) {
			var w = (u & 65535) + (z & 65535),
				v = (u >> 16) + (z >> 16) + (w >> 16);
			return(v << 16) | (w & 65535)
		}

		function s(u, v) {
			return(u << v) | (u >>> (32 - v))
		}

		function c(A, w, v, u, z, y) {
			return o(s(o(o(w, A), o(u, y)), z), v)
		}

		function b(w, v, B, A, u, z, y) {
			return c((v & B) | ((~v) & A), w, v, u, z, y)
		}

		function i(w, v, B, A, u, z, y) {
			return c((v & A) | (B & (~A)), w, v, u, z, y)
		}

		function n(w, v, B, A, u, z, y) {
			return c(v ^ B ^ A, w, v, u, z, y)
		}

		function a(w, v, B, A, u, z, y) {
			return c(B ^ (v | (~A)), w, v, u, z, y)
		}

		function d(F, A) {
			F[A >> 5] |= 128 << (A % 32);
			F[(((A + 64) >>> 9) << 4) + 14] = A;
			var w,
				z,
				y,
				v,
				u,
				E = 1732584193,
				D = -271733879,
				C = -1732584194,
				B = 271733878;
			for(w = 0; w < F.length; w += 16) {
				z = E;
				y = D;
				v = C;
				u = B;
				E = b(E, D, C, B, F[w], 7, -680876936);
				B = b(B, E, D, C, F[w + 1], 12, -389564586);
				C = b(C, B, E, D, F[w + 2], 17, 606105819);
				D = b(D, C, B, E, F[w + 3], 22, -1044525330);
				E = b(E, D, C, B, F[w + 4], 7, -176418897);
				B = b(B, E, D, C, F[w + 5], 12, 1200080426);
				C = b(C, B, E, D, F[w + 6], 17, -1473231341);
				D = b(D, C, B, E, F[w + 7], 22, -45705983);
				E = b(E, D, C, B, F[w + 8], 7, 1770035416);
				B = b(B, E, D, C, F[w + 9], 12, -1958414417);
				C = b(C, B, E, D, F[w + 10], 17, -42063);
				D = b(D, C, B, E, F[w + 11], 22, -1990404162);
				E = b(E, D, C, B, F[w + 12], 7, 1804603682);
				B = b(B, E, D, C, F[w + 13], 12, -40341101);
				C = b(C, B, E, D, F[w + 14], 17, -1502002290);
				D = b(D, C, B, E, F[w + 15], 22, 1236535329);
				E = i(E, D, C, B, F[w + 1], 5, -165796510);
				B = i(B, E, D, C, F[w + 6], 9, -1069501632);
				C = i(C, B, E, D, F[w + 11], 14, 643717713);
				D = i(D, C, B, E, F[w], 20, -373897302);
				E = i(E, D, C, B, F[w + 5], 5, -701558691);
				B = i(B, E, D, C, F[w + 10], 9, 38016083);
				C = i(C, B, E, D, F[w + 15], 14, -660478335);
				D = i(D, C, B, E, F[w + 4], 20, -405537848);
				E = i(E, D, C, B, F[w + 9], 5, 568446438);
				B = i(B, E, D, C, F[w + 14], 9, -1019803690);
				C = i(C, B, E, D, F[w + 3], 14, -187363961);
				D = i(D, C, B, E, F[w + 8], 20, 1163531501);
				E = i(E, D, C, B, F[w + 13], 5, -1444681467);
				B = i(B, E, D, C, F[w + 2], 9, -51403784);
				C = i(C, B, E, D, F[w + 7], 14, 1735328473);
				D = i(D, C, B, E, F[w + 12], 20, -1926607734);
				E = n(E, D, C, B, F[w + 5], 4, -378558);
				B = n(B, E, D, C, F[w + 8], 11, -2022574463);
				C = n(C, B, E, D, F[w + 11], 16, 1839030562);
				D = n(D, C, B, E, F[w + 14], 23, -35309556);
				E = n(E, D, C, B, F[w + 1], 4, -1530992060);
				B = n(B, E, D, C, F[w + 4], 11, 1272893353);
				C = n(C, B, E, D, F[w + 7], 16, -155497632);
				D = n(D, C, B, E, F[w + 10], 23, -1094730640);
				E = n(E, D, C, B, F[w + 13], 4, 681279174);
				B = n(B, E, D, C, F[w], 11, -358537222);
				C = n(C, B, E, D, F[w + 3], 16, -722521979);
				D = n(D, C, B, E, F[w + 6], 23, 76029189);
				E = n(E, D, C, B, F[w + 9], 4, -640364487);
				B = n(B, E, D, C, F[w + 12], 11, -421815835);
				C = n(C, B, E, D, F[w + 15], 16, 530742520);
				D = n(D, C, B, E, F[w + 2], 23, -995338651);
				E = a(E, D, C, B, F[w], 6, -198630844);
				B = a(B, E, D, C, F[w + 7], 10, 1126891415);
				C = a(C, B, E, D, F[w + 14], 15, -1416354905);
				D = a(D, C, B, E, F[w + 5], 21, -57434055);
				E = a(E, D, C, B, F[w + 12], 6, 1700485571);
				B = a(B, E, D, C, F[w + 3], 10, -1894986606);
				C = a(C, B, E, D, F[w + 10], 15, -1051523);
				D = a(D, C, B, E, F[w + 1], 21, -2054922799);
				E = a(E, D, C, B, F[w + 8], 6, 1873313359);
				B = a(B, E, D, C, F[w + 15], 10, -30611744);
				C = a(C, B, E, D, F[w + 6], 15, -1560198380);
				D = a(D, C, B, E, F[w + 13], 21, 1309151649);
				E = a(E, D, C, B, F[w + 4], 6, -145523070);
				B = a(B, E, D, C, F[w + 11], 10, -1120210379);
				C = a(C, B, E, D, F[w + 2], 15, 718787259);
				D = a(D, C, B, E, F[w + 9], 21, -343485551);
				E = o(E, z);
				D = o(D, y);
				C = o(C, v);
				B = o(B, u)
			}
			return [E, D, C, B]
		}

		function p(v) {
			var w,
				u = "";
			for(w = 0; w < v.length * 32; w += 8) {
				u += String.fromCharCode((v[w >> 5] >>> (w % 32)) & 255)
			}
			return u
		}

		function j(v) {
			var w,
				u = [];
			u[(v.length >> 2) - 1] = undefined;
			for(w = 0; w < u.length; w += 1) {
				u[w] = 0
			}
			for(w = 0; w < v.length * 8; w += 8) {
				u[w >> 5] |= (v.charCodeAt(w / 8) & 255) << (w % 32)
			}
			return u
		}

		function k(u) {
			return p(d(j(u), u.length * 8))
		}

		function e(w, z) {
			var v,
				y = j(w),
				u = [],
				x = [],
				A;
			u[15] = x[15] = undefined;
			if(y.length > 16) {
				y = d(y, w.length * 8)
			}
			for(v = 0; v < 16; v += 1) {
				u[v] = y[v] ^ 909522486;
				x[v] = y[v] ^ 1549556828
			}
			A = d(u.concat(j(z)), 512 + z.length * 8);
			return p(d(x.concat(A), 512 + 128))
		}

		function t(w) {
			var z = "0123456789abcdef",
				v = "",
				u,
				y;
			for(y = 0; y < w.length; y += 1) {
				u = w.charCodeAt(y);
				v += z.charAt((u >>> 4) & 15) + z.charAt(u & 15)
			}
			return v
		}

		function m(u) {
			return unescape(encodeURIComponent(u))
		}

		function q(u) {
			return k(m(u))
		}

		function l(u) {
			return t(q(u))
		}

		function h(u, v) {
			return e(m(u), m(v))
		}

		function r(u, v) {
			return t(h(u, v))
		}

		function f(v, w, u) {
			if(!w) {
				if(!u) {
					return l(v)
				}
				return q(v)
			}
			if(!u) {
				return r(w, v)
			}
			return h(w, v)
		}
		if(typeof define === "function" && define.amd) {
			define(function() {
				return f
			})
		} else {
			g.md5 = f
		}
	}
	(this));