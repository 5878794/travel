/*
animate_css
animate_class
animate_js
get_param_from_url
get_new_image_size
time_stamp
loadImages
array
touch_event
touch_slide_event
btn_click_effect
pull_refresh
video_inline
online
getUserMedia
send_sms
gravitySensor
*/
/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-5
 * Time: 上午11:49
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



var DEVICE = {};



//*****************************************************
//获取浏览器或设备名称  以及版本号
//*****************************************************
//输出结果:
//---------------------------------------------------------
//DEVICE.isIpad             @param:bloom    是否是：ipad
//DEVICE.isIphone           @param:bloom    是否是：ipbone
//DEVICE.isAndroid          @param:bloom    是否是：android
//DEVICE.isIe               @param:bloom    是否是：ie
//DEVICE.isFirefox          @param:bloom    是否是：firefox
//DEVICE.isChrome           @param:bloom    是否是：chrome
//DEVICE.isOpera            @param:bloom    是否是：opera
//DEVICE.isSafari           @param:bloom    是否是：safari
//DEVICE.isPc				@param:bloom	是否是：pc
//DEVICE.isPhone			@param:bloom	是否是：移动设备，非pc

//DEVICE.ver                @param:number   浏览器版本或  ipad/iphone/android系统版本
//---------------------------------------------------------
(function () {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/ipad; cpu os ([\d_]+)/)) ? Sys.ipad = s[1].replace(/_/g, ".") :
		(s = ua.match(/iphone os ([\d_]+)/)) ? Sys.iphone = s[1].replace(/_/g, ".") :
			(s = ua.match(/android[ \/]([\d.]+)/)) ? Sys.android = s[1] :
				(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
					(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
						(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
							(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
								(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
									(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : Sys._ = 0;


	DEVICE.isIpad = (Sys.hasOwnProperty("ipad"));
	DEVICE.isIphone = (Sys.hasOwnProperty("iphone"));
	DEVICE.isAndroid = (Sys.hasOwnProperty("android"));
	DEVICE.isIe = (Sys.hasOwnProperty("ie"));
	DEVICE.isFirefox = (Sys.hasOwnProperty("firefox"));
	DEVICE.isChrome = (Sys.hasOwnProperty("chrome"));
	DEVICE.isOpera = (Sys.hasOwnProperty("opera"));
	DEVICE.isSafari = (Sys.hasOwnProperty("safari"));


	DEVICE.ver = 0;
	var ver;
	for (var key in Sys) {
		if (Sys.hasOwnProperty(key)) {
			ver = Sys[key];
		}
	}
	ver = ver.split(".");
	var _ver = [];
	for (var i = 0, l = ver.length; i < l; i++) {
		if (i >= 2) {
			break;
		}
		_ver.push(ver[i]);
	}
	_ver = _ver.join(".");
	DEVICE.ver = _ver;

	DEVICE.isPhone = (DEVICE.isAndroid || DEVICE.isIpad || DEVICE.isIphone);
})();


(function(){
	var p = navigator.platform;
	var win = p.indexOf("Win") == 0;
	var mac = p.indexOf("Mac") == 0;
	var x11 = (p == "X11") || (p.indexOf("Linux") == 0);

	DEVICE.isPc = (win || mac || x11);
	DEVICE.isPhone = !DEVICE.isPc;
	DEVICE.isMac = mac;
	DEVICE.isWin = win;
	DEVICE.isLinux = x11;

})();





//*****************************************************
//处理浏览器css前缀问题 以及其它一些属性
//*****************************************************
//输出结果：
//属性：------------------------------------------------
//DEVICE.has3d              @param:bloom    是否支持3d
//DEVICE.hasTouch           @param:bloom    是否是触摸屏
//DEVICE.hasTransform       @param:bloom    是否支持变形
//DEVICE.language           @param:str      语言版本  zh-cn

//事件：------------------------------------------------
//DEVICE.RESIZE_EV          @param:str      窗口变化
//DEVICE.START_EV           @param:str      点击
//DEVICE.MOVE_EV            @param:str      移动
//DEVICE.END_EV             @param:str      释放
//DEVICE.CANCEL_EV          @param:str      点击结束
//DEVICE.TRNEND_EV          @param:str      变形结束 ｅｇ:webkitTransitionEnd

//函数：------------------------------------------------
//DEVICE.nextFrame          fn              执行动画函数　１秒６０帧
//DEVICE.cancelFrame        fn              停止动画
//DEVICE.counter            fn              计数器 返回页面全局唯一ｉｄ数字，从１开始。
//DEVICE.fixObjCss          fn              ｊｑ调用，免ｃｓｓ前缀（部分）
//DEVICE.fixCss             fn              免ｃｓｓ前缀（部分）
//-----------------------------------------------------
(function () {
	var dummyStyle = document.createElement("div").style,
		vendor = (function () {
			if (window.navigator.msPointerEnabled) {
				return "";
			}
			if ("MozTransform" in dummyStyle) {
				return "";
			}
			var vendors = 'webkitT,MozT,msT,OT,t'.split(','),
				t,
				i = 0,
				l = vendors.length;

			for (; i < l; i++) {
				t = vendors[i] + 'ransform';
				if (t in dummyStyle) {
					return vendors[i].substr(0, vendors[i].length - 1);
				}
			}

			return false;
		})(),
		prefixStyle = function (style) {
			if (!vendor) return style;

			style = style.charAt(0).toUpperCase() + style.substr(1);
			return vendor + style;
		},
		has3d = prefixStyle('perspective') in dummyStyle,


		windowTouch = (window.navigator.msMaxTouchPoints && window.navigator.msMaxTouchPoints > 0) ? true : false,
		webkitTouch = 'ontouchstart' in window,
		hasTouch = (webkitTouch || windowTouch),
		hasTransform = vendor !== false,

		_transform = prefixStyle('transform'),
		_transitionProperty = prefixStyle('transitionProperty'),
		_transitionDuration = prefixStyle('transitionDuration'),
		_transformOrigin = prefixStyle('transformOrigin'),
		_transitionTimingFunction = prefixStyle('transitionTimingFunction'),
		_transitionDelay = prefixStyle('transitionDelay'),

		FULLSCREEN_EV = (function(){
			if (vendor === false) return "fullscreenchange";

			var fullscreenchange = {
				'': 'fullscreenchange',
				'webkit': 'webkitfullscreenchange',
				'Moz': 'mozfullscreenchange',
				'O': 'ofullscreenchange',
				'ms': 'msfullscreenchange'
			};

			return fullscreenchange[vendor];
		})(),
		//鼠标锁定状态变化事件
		LOCKPOINTER_EV = (function(){
			if (vendor === false) return "pointerlockchange";

			var pointerlockchange = {
				'': 'pointerlockchange',
				'webkit': 'webkitpointerlockchange',
				'Moz': 'mozpointerlockchange',
				'O': 'opointerlockchange',		//无
				'ms': 'mspointerlockchange'		//无
			};

			return pointerlockchange[vendor];
		})(),

		RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
		START_EV = webkitTouch ? 'touchstart' : windowTouch ? 'MSPointerDown' : 'mousedown',
		MOVE_EV = webkitTouch ? 'touchmove' : windowTouch ? 'MSPointerMove' : 'mousemove',
		END_EV = webkitTouch ? 'touchend' : windowTouch ? 'MSPointerUp' : 'mouseup',
		CANCEL_EV = webkitTouch ? 'touchcancel' : windowTouch ? 'MSPointerUp' : 'mouseup',
		TRNEND_EV = (function () {
			if (vendor === false) return "transitionend";

			var transitionEnd = {
				'': 'transitionend',
				'webkit': 'webkitTransitionEnd',
				'Moz': 'transitionend',
				'O': 'otransitionend',
				'ms': 'MSTransitionEnd'
			};

			return transitionEnd[vendor];
		})(),
		ANIEND_EV = (function(){
			if (vendor === false) return "animationEnd";

			var transitionEnd = {
				'': 'animationEnd',
				'webkit': 'webkitAnimationEnd',
				'Moz': 'mozAnimationEnd',
				'O': 'oanimationend',
				'ms': 'MSAnimationEnd'
			};

			return transitionEnd[vendor];
		})(),
		nextFrame = (function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return setTimeout(callback, 1);
				};
		})(),
		cancelFrame = (function () {
			return window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.webkitCancelRequestAnimationFrame ||
				window.mozCancelRequestAnimationFrame ||
				window.oCancelRequestAnimationFrame ||
				window.msCancelRequestAnimationFrame ||
				clearTimeout;
		})(),
		checkDomHasPosition = function(dom){
			var position = dom.css("positon");
			return (
				position == "fixed" ||
				position == "absolute" ||
				position == "relative"
			)
		},
		counter = (function () {
			var a = 0;
			return function () {
				a += 1;
				return a;
			}
		})(),
		language = (navigator.browserLanguage || navigator.language).toLowerCase(),


		t_v = (function () {
			var _vendors = 'webkitT,MozT,msT,OT'.split(','),
				t,
				i = 0,
				l = _vendors.length;

			for (; i < l; i++) {
				t = _vendors[i] + 'ransform';
				if (t in dummyStyle) {
					return ("-" + _vendors[i].substr(0, _vendors[i].length - 1) + "-");
				}
			}
			return "";
		})(),
		getCssName = function (style) {
			return (style in dummyStyle) ? style :
				   (t_v + style in dummyStyle) ? t_v + style : style;
		},
	//判断盒子模型的版本 2009版 2011版  2013版
		boxVendors = "",
		boxType = (function () {
			if ("boxPack" in dummyStyle) {
				return 2009;
			}
			if (t_v + "box-pack" in dummyStyle) {
				boxVendors = t_v;
				return 2009;
			}


			if ("flexPack" in dummyStyle) {
				return 2011;
			}
			if (t_v + "flex-pack" in dummyStyle) {
				boxVendors = t_v;
				return 2011;
			}


			if ("flexBasis" in dummyStyle) {
				return 2013;
			}
			if (t_v + "flex-basis" in dummyStyle) {
				boxVendors = t_v;
				return 2013;
			}
		})(),

	//（值）定义盒子模型 display:flex
		box = (boxType == 2013) ? boxVendors + "flex" :
			(boxType == 2011) ? boxVendors + "flexbox" :
				(boxType == 2009) ? boxVendors + "box" : "flex",
	//与盒子内布局方向相同，  start  end 。。。
		align_items = (boxType == 2013) ? boxVendors + "align-items" :
			(boxType == 2011) ? boxVendors + "flex-pack" :
				(boxType == 2009) ? boxVendors + "box-pack" : "align-items",
	//与盒子内布局方向相反，  start  end 。。。
		justify_content = (boxType == 2013) ? boxVendors + "justify-content" :
			(boxType == 2011) ? boxVendors + "flex-align" :
				(boxType == 2009) ? boxVendors + "box-align" : "justify-content",

	//盒子子元素所占比例
		flex = (boxType == 2013) ? boxVendors + "flex" :
			(boxType == 2011) ? boxVendors + "flex" :
				(boxType == 2009) ? boxVendors + "box-flex" : "flex",

	//盒子方向
		flex_direction = (boxType == 2013) ? boxVendors + "flex-direction" :
			(boxType == 2011) ? boxVendors + "flex-direction" :
				(boxType == 2009) ? boxVendors + "box-orient" : "flex-direction",

	//（值）横向排列
		flex_direction_row = (boxType == 2013) ? "row" :
			(boxType == 2011) ? "row" :
				(boxType == 2009) ? "horizontal" : "row",

	//（值）纵向排列
		flex_direction_column = (boxType == 2013) ? "column" :
			(boxType == 2011) ? "column" :
				(boxType == 2009) ? "vertical" : "column",


		animation = getCssName("animation"),
		box_shadow = getCssName("box-shadow"),
		backgroundSize = getCssName("background-size"),
		transform = getCssName("transform"),
		transformOrigin = getCssName("transform-origin"),
		transformStyle = getCssName("transform-style"),
		perspective = getCssName("perspective"),
		perspectiveOrigin = getCssName("perspective-origin"),
		border_radius = getCssName("border-radius"),
		box_sizing = getCssName("box-sizing"),
		background_clip = getCssName("background-clip"),
		border_bottom_left_radius = getCssName("border-bottom-left-radius"),
		border_bottom_right_radius = getCssName("border-bottom-right-radius"),
		border_top_left_radius = getCssName("border-top-left-radius"),
		border_top_right_radius = getCssName("border-top-right-radius"),
		backface_visibility = getCssName("backface-visibility"),
		transition = getCssName("transition"),
		transition_property = getCssName("transition-property"),
		transition_duration = getCssName("transition-duration"),
		transition_timing_function = getCssName("transition-timing-function");


	var css = {
			"box": box,
			"justify-content": justify_content,
			"align-items": align_items,
			"background-size": backgroundSize,
			"background-clip": background_clip,
			"flex": flex,
			"flex-direction": flex_direction,
			"row": flex_direction_row,
			"column": flex_direction_column,
			"transform": transform,
			"transform-origin":transformOrigin,
			"transform-style":transformStyle,
			"perspective":perspective,
			"perspective-origin":perspectiveOrigin,
			"border-radius": border_radius,
			"border-bottom-left-radius": border_bottom_left_radius,
			"border-bottom-right-radius": border_bottom_right_radius,
			"border-top-left-radius": border_top_left_radius,
			"border-top-right-radius": border_top_right_radius,
			"box-sizing": box_sizing,
			"box-shadow": box_shadow,
			"backface-visibility": backface_visibility,
			"transition": transition,
			"transition-property": transition_property,
			"transition-duration": transition_duration,
			"transition-timing-function": transition_timing_function,
			"animation":animation
		},
		gz = (function () {
			var reg, a = [];
			for (var key in css) {
				if (css.hasOwnProperty(key)) {
					if (key == "box" || key == "transition" || key == "flex") {
						a.push("([^-]" + key + "[^-])");
					} else if (key == "row" || key == "column") {
						a.push(key);
					} else {
						a.push("([^-]" + key + ")");
					}
				}
			}
			reg = a.join("|");
			return new RegExp(reg, "ig");
		})(),
		css_prefix = function (data) {
			var text = JSON.stringify(data),
				newtext = cssfile_prefix(text);
			return JSON.parse(newtext);
		},
		cssfile_prefix = function (data) {
			return  data.replace(gz, function (a) {
				var str = a.substr(1, a.length - 2);
				if (str == "box" || str == "transition" || str == "flex") {
					var newstr = css[str];
					return a.substr(0, 1) + newstr + a.substr(a.length - 1);
				} else if (a == "row" || a == "column") {
					return css[a];
				} else {
					return a.substr(0, 1) + css[a.substr(1)];
				}
			});
		},
		fix_css = function (css) {
			css = css.replace(/;/ig, " ; ");
			return cssfile_prefix(" "+css);
		};

	dummyStyle = null;


	DEVICE.has3d = has3d;         //是否支持3d
	DEVICE.hasTouch = hasTouch;  //是否是触摸屏
	DEVICE.hasTransform = hasTransform;  //是否支持变形


	DEVICE._transform = transform;        //自动添加前缀
	DEVICE._transitionProperty = _transitionProperty;
	DEVICE._transitionDuration = _transitionDuration;
	DEVICE._transformOrigin = _transformOrigin;
	DEVICE._transitionTimingFunction = _transitionTimingFunction;
	DEVICE._transitionDelay = _transitionDelay;


	DEVICE.RESIZE_EV = RESIZE_EV;    //窗口变化
	DEVICE.START_EV = START_EV;  //点击
	DEVICE.MOVE_EV = MOVE_EV;   //移动
	DEVICE.END_EV = END_EV;     //释放
	DEVICE.CANCEL_EV = CANCEL_EV;      //结束
	DEVICE.TRNEND_EV = TRNEND_EV;       //变形结束 webkitTransitionEnd
	DEVICE.ANIEND_EV = ANIEND_EV;       //webkitAnimationEnd
	DEVICE.FULLSCREEN_EV = FULLSCREEN_EV;  //全屏事件监听
	DEVICE.LOCKPOINTER_EV = LOCKPOINTER_EV;	//锁定鼠标

	DEVICE.nextFrame = nextFrame;
	DEVICE.cancelFrame = cancelFrame;

	DEVICE.language = language;   //语言版本  zh-cn
	DEVICE.counter = counter;        //计数器  fn

	DEVICE.fixObjCss = css_prefix;
	DEVICE.fixCss = fix_css;


	DEVICE.css = css;
	DEVICE.boxType = boxType;
	DEVICE.boxVendors = boxVendors;

	DEVICE.checkDomHasPosition = checkDomHasPosition;

	DEVICE.trim = function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	DEVICE.getBetweenNumber = function(val,min,max){
		val = (val>max)? max : val;
		val = (val<min)? min : val;
		return val;
	};

})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-5
 * Time: 上午11:48
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */





//判断是否是数字
$.isNumber = function(val){
	return typeof val === 'number';
};
//判断是否是字符串
$.isString = function(val){
	return typeof val === 'string';
};
//判断是否是布尔
$.isBoolean = function(val){
	return typeof val === 'boolean';
};
//判断是否是对象   jqmobi有
$.isObject = function(str){
	if(str === null || typeof str === 'undefined' || $.isArray(str))
	{
		return false;
	}
	return typeof str === 'object';
};
//判断是否是数组   jqmobi有
$.isArray = function (arr){
	return arr.constructor === Array;
};
//判断是函数    jqmobi有
$.isFunction = function(fn){
	return typeof fn === 'function'
};
//判断定义值没
$.isUndefined = function(val){
	return typeof val === 'undefined'
};
//判断是否是网址
$.isUrl = function(url){
	var strRegex = "[a-zA-z]+://[^s]*";
	var re=new RegExp(strRegex);
	return re.test(url);
};


$.getDom = function(obj){
	var returnobj;

	if(!obj){return returnobj;}

	if($.isString(obj)){
		returnobj = document.getElementById(obj);
	}else if($.isObject(obj)){
		if(obj.length == 1){
			returnobj = obj.get(0);
		}
		if(obj.nodeType == 1){
			returnobj = obj;
		}
	}

	return returnobj;
};
$.getArray = function(str){
	return ($.isArray(str))? str : [];
};
$.getFunction = function(fn){
	return ($.isFunction(fn))? fn : function(){};
};
$.getBloom = function(str){
	return ($.isBoolean(str))? str : false;
};
$.getObj = function(obj){
	return ($.isObject(obj))? obj : {};
};
$.getNumber = function(str){
	str = parseInt(str);
	str = str || 0;
	return str;
};


//设置css样式
$.fn.css3 = function(css){
	$(this).css(DEVICE.fixObjCss(css));
	return $(this);
};
//返回style的css变换
$.css3 = function(css){
	return DEVICE.fixCss(css);
};/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午10:11
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//css动画
$.fn.cssAnimate=(function(){

	var cssanimagefn = {},
		counter = (function(){
			var a = 0;
			return function(){
				a += 1;
				return a;
			}
		})(),
		device = DEVICE,
		clearfn = function(obj,keyname){
			obj.removeEventListener(device.TRNEND_EV,cssanimagefn[keyname],false);
			delete cssanimagefn[keyname];
			delete obj.__bens_cssfn_id__;
		};

	return function(data,time,callback,is_3d,type){
		var _this=$(this),
			_that = _this.get(0),
			_thatstyle = _that.style;

		type = type || "ease";
		data = JSON.parse(DEVICE.fixObjCss(JSON.stringify(data)));
		time = time || 1000;
		callback = $.getFunction(callback);
		is_3d = ($.isBoolean(is_3d))?  is_3d : false;

		if(_that.__bens_cssfn_id__){
			var temp_key = _that.__bens_cssfn_id__;
			clearfn(_that,temp_key);
		}

		var thiskey = counter();
		_that.__bens_cssfn_id__ = thiskey;


		cssanimagefn[thiskey]=function(e){
			var p_name = e.propertyName;
			if(e.target == _that && data.hasOwnProperty(p_name)){

				//_this.get(0).style["webkitTransition"]="all 0 ease";
				_thatstyle[device._transitionProperty] = "";
				_thatstyle[device._transitionDuration] = "";
				_thatstyle[device._transitionTimingFunction] = "";
				_thatstyle["webkitTransformStyle"]="";
				_thatstyle["webkitBackfaceVisibility"]="";
				_thatstyle.willChange = "auto";

				callback();
				clearfn(_that,thiskey);
			}
		};

		_thatstyle[device._transitionProperty] = "all";
		_thatstyle[device._transitionDuration] = time+"ms";
		_thatstyle[device._transitionTimingFunction] = type;
		_thatstyle.willChange = "all";

		_thatstyle["webkitTransformStyle"]="preserve-3d";   //webkit私有
		if(!is_3d){
			_thatstyle["webkitBackfaceVisibility"]="hidden";    //webkit私有
		}else{
			_thatstyle["webkitBackfaceVisibility"]="visible";    //webkit私有
		}


		setTimeout(function(){
			_that.addEventListener(device.TRNEND_EV,cssanimagefn[thiskey],false);
			_this.css(data);
		},1);

	}
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午10:12
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//css3 class动画
//$.fn.classAnimate(params)
//@param obj     {"0%":"transform:scale(1);background:#000;","100%":"transform:scale(2);background:#fff;"}
//@param time    时间毫秒:2000
//@param type    动画方式:linear
//@param infinite  动画是否循环: true/false
//@param alternate 动画是否反向:  true/false
//@param callback  动画完成回调:fn    循环时无效


//停止循环的动画
//$.fn.removeClassAnimate();


$.fn.classAnimate = (function(){
	var fns = {},
		clearFn = function(obj,_id){
			obj.get(0).removeEventListener(DEVICE.ANIEND_EV,fns[_id],false);
			obj.removeCss3Animate();
			delete fns[_id];
		},
		addFn = function(id,obj,callback){
			var _id = "__temp_"+DEVICE.counter()+"__";
			obj.get(0).addEventListener(DEVICE.ANIEND_EV,fns[_id] = function(e){
				if(id == e.animationName){
					callback.call(this);
					clearFn(obj,_id);
				}
			},false);
		};

	return function(obj,time,type,infinite,alternate,callback){
		var id = "__keyframes_"+DEVICE.counter()+"__";
		time = parseInt(time) || 1000;
		type = type || "linear";
		infinite = $.getBloom(infinite);
		//callback = $.getFunction(callback);
		alternate = $.getBloom(alternate);

		time = time+"ms";
		infinite = (infinite)? "infinite" :"";
		alternate = (alternate)? "alternate" : "";
		var class_name = id+"class__";

		if(!$.isObject(obj)){
			throw("css3Animate 参数样式结构错误");
		}



		//生成style
		var last_style = "";
		var style = $("<style id='"+class_name+"'></style>");

		var css = " animation: " + id + " " + time + " " + type + " " + infinite + " " + alternate +";";
		css = $.css3(css);
		css = "."+class_name+"{"+css+"} @keyframes "+id+"{";

		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				var this_val = $.css3(obj[key]);
				css += key + " {" + this_val + "}";
				last_style = this_val;
			}
		}

		css +=  "}";


		style.text(css);
		$("head").append(style);



		//生成最终的css
		var last_css = {};
		last_style = last_style.split(";");
		for(var z=0,zl=last_style.length;z<zl;z++){
			var this_style = last_style[z].split(":");
			if(this_style.length == 2){
				var _key = $.trim(this_style[0]),
					_val = $.trim(this_style[1]);
				last_css[_key] = _val;
			}
		}




		$(this).each(function(){
			if($(this).css("display") == "none" || $(this).css("visibility") == "hidden"){

			}else{
				$(this).addClass(class_name);
				$(this).css(last_css);
				$(this).get(0).__animate_css3_class__ = class_name;
			}
		});


		if(!$.isFunction(callback)){return $(this);}
		if(infinite){return $(this);}


		$(this).each(function(){
			if($(this).css("display") == "none" || $(this).css("visibility") == "hidden"){

			}else{
				addFn(id,$(this),callback);
			}
		});

		return $(this);
	}
})();



$.fn.removeClassAnimate = function(){
	var temp = {};


	$(this).each(function(){
		var class_name = $(this).get(0).__animate_css3_class__;
		temp[class_name] = true;
		$(this).removeClass(class_name);
	});

	for(var key in temp){
		if(temp.hasOwnProperty(key)){
			var style = $("#"+key);
			if(style.length != 0){
				style.remove();
			}
		}
	}
};/**
 * Created by beens on 15/11/7.
 */







//h5动画函数
//var a = new DEVICE.jsAnimate({
//    start:0,                  //@param:number   初始位置
//    end:1,                    //@param:number   结束位置
//    time:800,                 //@param:number   动画执行时间  ms
//    type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
//    class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
//    stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
//        $("#aaa").css({opacity:val})
//    },
//    endFn:function(){         //@param:fn       动画结束执行
//
//    },
//    alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
//    infinite:false            //@param:boolean  动画是否循环执行，默认：false
//                                                设置该参数endFn将失效
//})

//a.play();
//a.stop();



DEVICE.jsAnimate = (function(){
    var nextFrame = DEVICE.nextFrame,
        cancelFrame = DEVICE.cancelFrame;

    //缓动算法
    //t:当前时间
    //b:初始值
    //c:变化量
    //d:持续时间
    var tween = {
        //线性
        Linear: function(t,b,c,d){
            return c*t/d + b;
        },
        //2次方缓动
        Quad: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            }
        },
        //3次方缓动
        Cubic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            }
        },
        //4次方缓动
        Quart: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            }
        },
        //5次方缓动
        Quint: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            }
        },
        //正选曲线缓动
        Sine: {
            easeIn: function(t,b,c,d){
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t,b,c,d){
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            }
        },
        //指数曲线的缓动
        Expo: {
            easeIn: function(t,b,c,d){
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t,b,c,d){
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //圆形曲线的缓动
        Circ: {
            easeIn: function(t,b,c,d){
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            }
        },
        //指数衰减的正弦曲线缓动
        Elastic: {
            easeIn: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
            },
            easeInOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            }
        },
        //超过范围的三次方缓动
        Back: {
            easeIn: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            }
        },
        //指数衰减的反弹缓动
        Bounce: {
            easeIn: function(t,b,c,d){
                return c - tween.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t,b,c,d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOut: function(t,b,c,d){
                if (t < d/2) return tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                else return tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        }
    };

    var animate = function(opt){
        this.runTime = opt.time;     //动画持续时间
        this.stepFn = opt.stepFn || function(){};   //每步执行的函数，参数：自动返回当前动画执行的百分比
        this.endFn = opt.endFn || function(){};     //动画执行完毕回调
        this.start = opt.start;
        this.end = opt.end;
        this.type = opt.type || "Linear";
        this.class = opt.class || "easeIn";
        this.alternate = ($.isBoolean(opt.alternate))? opt.alternate : false;
        this.infinite = ($.isBoolean(opt.infinite))? opt.infinite : false;


        this._checkParam();


        this.startTime = 0;         //动画开始时间
        this.endTime = 0;           //动画结束时间
        this.nowTime = 0;           //当前动画执行到的时间
        this._useedTime = 0;        //停止后在开始动画时的之前动画时间总和
        this._fn = null;            //nextFrame 临时赋值变量
        this.isRuning = false;      //动画是否在运行
        this.autoStop = false;      //动画是否由最小化窗口暂停

        this.addEvent();
    };

    animate.prototype = {
        //检查tween动画参数是否正确
        _checkParam:function(){
            if(this.type != "Linear"){
                if(tween[this.type] && tween[this.type][this.class]){

                }else{
                    this.type = "Cubic";
                    this.class = "easeIn";
                    console.log("参数不正确已使用Cubic easeIn");
                }
            }
        },
        //动画完成执行
        _complete:function(){
            //如果无限循环执行
            if(this.infinite){
                //是否反向执行
                if(this.alternate){
                    var a = this.start,
                        b = this.end;
                    this.end = a;
                    this.start = b;
                    this._useedTime = 0;
                    this.play();
                }else{
                    this._useedTime = 0;
                    this.play();
                }
            }else{
                //是否反向执行
                if(this.alternate){
                    var a = this.start,
                        b = this.end;
                    this.end = a;
                    this.start = b;
                    this._useedTime = 0;
                    this.alternate = false;
                    this.play();
                }else{
                    this.endFn();
                }
            }
        },
        //浏览器最小化时停止动画，恢复时执行
        addEvent:function(){
            var _this =this;
            document.addEventListener('visibilitychange', function() {
                if(document.hidden){
                    //最小化
                    if(_this.isRuning){
                        _this.autoStop = true;
                        _this.stop();
                    }
                }else{
                    //恢复窗口
                    if(_this.autoStop){
                        _this.autoStop = false;
                        _this.play();
                    }
                }
            },false)
        },
        //执行
        _go:function(){
            var _this = this;

            var __step__ = function(){
                var now_time = new Date().getTime() + _this._useedTime,
                    use_time = now_time  - _this.startTime,
                    pre = use_time/_this.runTime;

                _this.nowTime = now_time;

                if(now_time>=_this.endTime){
                    _this.stepFn(_this.end);
                    _this.stop();
                    _this._complete();
                    return;
                }


                var _tween = (_this.type == "Linear")? tween.Linear : tween[_this.type][_this.class],
                    val = _tween(pre,_this.start,_this.end-_this.start,1);

                _this.stepFn(val);
                _this._fn = nextFrame(__step__);
            };

            __step__();
        },
        //开始动画
        play:function(){
            this.startTime = new Date().getTime();
            this.endTime = this.startTime + this.runTime;
            this.isRuning = true;
            this._go();
        },
        //暂停动画
        stop:function(){
            cancelFrame(this._fn);
            this._fn = null;
            this.isRuning = false;
            //重置运行时间
            this._useedTime = this.nowTime - this.startTime;
        },
        //从头开始动画
        restart:function(){
            this._useedTime = 0;
            this.play();
        }

    };

    return animate;
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:16
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//获取地址栏参数
DEVICE.getParamFromUrl = function(param){
	var find_val = "";

	var search = window.location.search;
	search = search.substr(1);
	var searchs = search.split("&");

	for( var i= 0,l=searchs.length;i<l;i++){
		var this_val =  searchs[i],
			this_keys = this_val.split("="),
			this_key = this_keys[0];

		if(this_key == param){
			find_val = this_keys[1];
			break;
		}
	}
	return decodeURI(find_val);

};/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:23
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//获取适合容器的图片大小
DEVICE.getNewImageSize = function(imgwidth,imgheight,objwidth,objheight){
	var newimgwidth,newimgheight;

	if(!imgwidth || !imgheight){
		return {
			width:objwidth,
			height:objheight
		}
	}


	if(imgwidth>0 && imgheight>0){
		if(imgwidth/imgheight>=objwidth/objheight){
			if(imgwidth>objwidth){
				newimgwidth = objwidth;
				newimgheight = imgheight*objwidth/imgwidth;
			}else{
				newimgwidth = imgwidth;
				newimgheight = imgheight;
			}
		}else{
			if(imgheight>objheight){
				newimgheight = objheight;
				newimgwidth = imgwidth*objheight/imgheight;
			}else{
				newimgwidth = imgwidth;
				newimgheight = imgheight;
			}
		}
	}else{
		newimgwidth = objwidth;
		newimgheight = objheight;
	}


	return {
		width:newimgwidth,
		height:newimgheight
	}
};
/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:28
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//stamp2time和time2stamp   2个时间转换的毫秒数会被忽略。
DEVICE.stamp2time = function(b){
	b = b || new Date().getTime();
	var a = new Date(parseInt(b));
	var year=a.getFullYear();
	var month=parseInt(a.getMonth())+1;
	month= (month<10)? "0"+month : month;
	var date=a.getDate();
	date= (date<10)? "0"+date : date;
	var hours=a.getHours();
	hours= (hours<10)? "0"+hours : hours;
	var minutes=a.getMinutes();
	minutes= (minutes<10)? "0"+minutes : minutes;
	var seconds=a.getSeconds();
	seconds= (seconds<10)? "0"+seconds : seconds;

	return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
};
//传入时间戳，输出日期部分
DEVICE.stamp2date = function (b) {
	b = b || new Date().getTime();
	var a = new Date(parseInt(b));
	var year = a.getFullYear();
	var month = parseInt(a.getMonth()) + 1;
	month = (month < 10) ? "0" + month : month;
	var date = a.getDate();
	date = (date < 10) ? "0" + date : date;
	return year + "-" + month + "-" + date;
};
//a :   2012-12-13   2012-12-12 12:12:33  自动补位
DEVICE.time2stamp = function(a){
	if(!a){
		return new Date().getTime();
	}


	var new_str = a.replace(/:/g,'-');
	new_str = new_str.replace(/ /g,'-');
	new_str = new_str.replace(/\//ig,'-');
	var arr = new_str.split("-");
	if(arr.length != 6){
		for(var i= 0,l=6-arr.length;i<l;i++){
			arr.push(0);
		}
	}

	return new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5])).getTime();
};/**
 * Created by beens on 15/10/29.
 */


//DEVICE.loadImages({
//    res:[                     //要加载的资源图片数组
//       "images/aa.png",
//       "images/bb.png"
//    ],
//    preFn:function(n,total){  //加载完成1个执行   n：加载数  total：总数
//
//    },
//    completeFn:function(){    //加载完成回调
//
//    }
//});



DEVICE.loadImages = function(opt){
    var res = opt.res || [],
        preFn = opt.preFn || function(){},
        completeFn = opt.completeFn || function(){},
        total = res.length,
        n = 0;

    var loaded = function(){
        n++;
        preFn(n,total);
        if(n == total){
            completeFn();
        }
    };

    var load = function(src){
        var img = new Image();
        img.onload = function(){
            loaded();
        };
        img.onerror = function(){
            loaded();
        };

        img.src = src;
    };


    for(var i= 0,l=res.length;i<l;i++){
        var src = res[i];
        load(src);
    }
};/**
 * Created by bens on 16-1-13.
 */



//数组操作类
//--------------------------------------------------------------------

//数组添加数组
//Array.prototype.pushArray([1,2,3,4])

//获取数组中的最大值（数组中必须全数字）
//Array.prototype.findMax();

//获取数组中的最小值（数组中必须全数字）
//Array.prototype.findMin();

//数组排序（数组中必须全数字）
//@type= "" || "desc"      正序/倒序
//Array.prototype.sortByNumber(type)

//数组排序（排序的是全中文）
//数组中全中文或是对象中的某个key的值为全中文
//不指定key时默认认为数组中都是字符
//@type = "" || "desc"
//@key =  数组中对象的key值
//Array.prototype.sortByChine(key,type);

//删除数组中的重复值（不支持数组中含对象）
//Array.prototype.delReplace();








//将一个数组添加到另一个数组末尾  会改变原数组
Array.prototype.pushArray = function(b){
	this.push.apply(this,b);
	return this;
};
//获取数组中的最大值  数组中不能有字母或对象
// null,false转换为1  true转换为2   可以filter（function）后在求值
Array.prototype.findMax= function(){
	return Math.max.apply(null,this);
};
//获取数组中的最小值 数组中不能有字母
Array.prototype.findMin= function(){
	return Math.min.apply(null,this);
};
//数组排序  按数字大小   默认是按字符排序
Array.prototype.sortByNumber= function(type){
	if(type == "desc"){
		this.sort(function(a,b){ return (a>b)? -1 : 1; });
	}else{
		this.sort(function(a,b){ return (a>b)? 1 : -1; });
	}
	return this;
};
//数组排序  中文    数组中如果是对象使用key,否则传空   type默认从小到大，desc反序
Array.prototype.sortByChine= function(key,type){
	this.sort(function(a,b){
		if(key){
			a = a[key];
			b = b[key];
		}
		a = a.toString();
		b = b.toString();

		if(type == "desc"){
			return b.localeCompare(a);
		}else{
			return a.localeCompare(b);
		}
	});

	return this;
};
//删除数组中的重复项（不能处理对象）
Array.prototype.delReplace = function(){
	var arr = this,
		obj = {},
		back = [];

	for(var i= 0,l=arr.length;i<l;i++){
		var val = arr[i];
		if(!obj.hasOwnProperty(val)){
			obj[val] = true;
			back.push(val);
		}
	}

	return back;

};


//删除数组中的一个值 用原生的filter方法返回新数组  不写了
//  array.filter(function(a,index){if(a!=3){return a;}})/*
// * Filename :
// * =====================================
// * Created with WebStorm.
// * User: bens
// * Date: 15-8-6
// * Time: 上午11:39
// * Email:5878794@qq.com
// * =====================================
// * Desc:
// */



//事件 $$
(function(){
	var device = DEVICE,
		createMyTouchEven = function(obj){
			this.obj=obj;
			this.mytarget=null;

			if(this.obj==null){return;}

			this.clickLongTimeFn=null;
			this.clickTimeFn=null;
			this.points=[];

			this.isTouchOk=true;
			this.isTouchStarted=false;
			this.isTouchMoved=false;
			this.isLongClicked=false;
			this.isTouchEnded=false;


			this.clickDownEven=null;
			this.clickOkEven=null;
			this.clickUpEven=null;
			this.longClickEven=null;
			//this.slideUpEven=null;
			//this.slideDownEven=null;
			//this.slideRightEven=null;
			//this.slideLeftEven=null;

			this.touchSTime=null;
			this.touchJQ=400;
			//this.touchDelay=10;
			this.longClickDelay=100000;
			this.allowMove=10;
			this.hasTouch=device.hasTouch;

			this.eventBind();
		};

	createMyTouchEven.prototype = {
		eventBind:function(){
			var _this=this;
			this.obj.addEventListener(device.START_EV,this.touchStart=function(e){_this.touchStartHandler(e);},false);
			this.obj.addEventListener(device.MOVE_EV,this.touchMove=function(e){_this.touchMoveHandler(e);},false);
			this.obj.addEventListener(device.END_EV,this.touchEnd=function(){_this.touchEndHandler();},false);

			this.clickDownEven=document.createEvent('Event');
			this.clickDownEven.initEvent("myclickdown", true, true);

			this.clickOkEven=document.createEvent('Event');
			this.clickOkEven.initEvent("myclickok", true, true);

			this.clickUpEven=document.createEvent('Event');
			this.clickUpEven.initEvent("myclickup", true, true);

			this.longClickEven=document.createEvent('Event');
			this.longClickEven.initEvent("mylongclick", true, true);

			/*
			 this.slideUpEven=document.createEvent('Event');
			 this.slideUpEven.initEvent("myslideup", true, true);

			 this.slideDownEven=document.createEvent('Event');
			 this.slideDownEven.initEvent("myslidedown", true, true);

			 this.slideRightEven=document.createEvent('Event');
			 this.slideRightEven.initEvent("myslideright", true, true);

			 this.slideLeftEven=document.createEvent('Event');
			 this.slideLeftEven.initEvent("myslideleft", true, true);
			 */
		},
		f5:function(){
			this.points=[];
			this.isTouchStarted=false;
			this.isTouchMoved=false;
			this.isLongClicked=false;
			this.isTouchEnded=false;
		},
		isTouchOkFn:function(){
			//判断是否是有效点击
			var nowdatatime=new Date().getTime();

			//点击时间间隔控制
			if(this.touchSTime){
				/*
				 if(nowdatatime-this.touchSTime>this.touchJQ){
				 //有效
				 this.isTouchOk=true;
				 }else{
				 //无效
				 this.isTouchOk=false;
				 }
				 */
				this.isTouchOk = (nowdatatime-this.touchSTime>this.touchJQ);
				if(this.isTouchOk){
					this.touchSTime=nowdatatime;
				}
			}else{
				this.isTouchOk = true;
				this.touchSTime=nowdatatime;
			}

		},
		//长按事件监听
		clickLongListenerFn:function(){
			var _this=this;
			this.clickLongTimeFn=setTimeout(function(){
				_this.isLongClicked=true;
				_this.isTouchEnded=true;
				//长按。。。。。
				//触发事件
				_this.clickUpEven.mytarget=_this.mytarget;
				_this.longClickEven.mytarget=_this.mytarget;
				_this.obj.dispatchEvent(_this.clickUpEven);
				_this.obj.dispatchEvent(_this.longClickEven);
				//_this.clickUpHandler(e);
				//_this.clickLongHandler(e);
			},this.longClickDelay);
		},
		//点击时
		touchStartHandler:function(e){
			//e.preventDefault();

			this.isTouchOkFn(); //判断是否是有效点击
			if(!this.isTouchOk){return;}

			this.mytarget=e.target;
			this.mytarget.clickX = (e.touches)? e.touches[0].clientX : e.clientX;
			this.mytarget.clickY = (e.touches)? e.touches[0].clientY : e.clientY;

			this.f5();			//刷新参数
			this.savePoint(e);	//记录当前点

			//点击延时执行
			var _this=this;
			//this.clickTimeFn=setTimeout(function(){
				_this.touchStartHandlerGo();
			//},this.touchDelay);
		},
		//点击后延迟执行
		touchStartHandlerGo:function(){
			this.isTouchStarted=true;

			//注册长按事件
			this.clickLongListenerFn();

			//执行按下动作
			//
			this.clickDownEven.mytarget=this.mytarget;
			this.obj.dispatchEvent(this.clickDownEven);
			//this.clickDownHandler(e);
		},
		//移动时判断 未动 长滑
		touchMoveCondition:function(){
			var poinglength=this.points.length;
			//当前点
			var thispointx=this.points[poinglength-1].x;
			var thispointy=this.points[poinglength-1].y;
			//初始点击时的点
			var yuanpointx=this.points[0].x;
			var yuanpointy=this.points[0].y;



			if(!this.isTouchMoved){
				//规定的移动范围内算作未移动处理
				if(thispointx>=yuanpointx-this.allowMove && thispointx<=yuanpointx+this.allowMove && thispointy>=yuanpointy-this.allowMove && thispointy<=yuanpointy+this.allowMove){
					this.isTouchMoved=false;
				}else{
					this.isTouchMoved=true;
				}
			}
		},
		//移动时的处理
		touchMoveHandler:function(e){
//            e.preventDefault();
			if(!this.isTouchOk){return;}
			if(this.isTouchEnded){return;}
			if(this.isLongClicked){
				return;
			}



			//记录当前点
			this.savePoint(e);


			//判断移动超出
			this.touchMoveCondition();

			if(this.isTouchMoved){		//判断移动类型
				clearTimeout(this.clickTimeFn);
				clearTimeout(this.clickLongTimeFn);
				if(this.isTouchStarted){
					this.isTouchEnded=true;
					this.clickUpEven.mytarget=this.mytarget;
					this.obj.dispatchEvent(this.clickUpEven);
					//this.clickUpHandler(e);
				}

			}

		},
		//点击结束的处理
		touchEndHandler:function(){
			if(!this.isTouchOk){return;}
			clearTimeout(this.clickTimeFn);
			clearTimeout(this.clickLongTimeFn);
			//if(this.isTouchEnded){return;}   //move超出  没有进入滑动  结束
			if(this.isLongClicked){return;}  //长按了  结束


			this.isTouchEnded=true;


			if(this.isTouchStarted){
				var _this=this;
				if(!this.isTouchMoved){
					//延时执行
					setTimeout(function(){
						_this.clickUpEven.mytarget=_this.mytarget;
						_this.clickOkEven.mytarget=_this.mytarget;
						_this.obj.dispatchEvent(_this.clickUpEven);
						_this.obj.dispatchEvent(_this.clickOkEven);

					},200)
				}else{
					//判断是否触发移动   和   判断移动类型  this.touchSTime
					/*
					 var thistime = new Date().getTime();
					 if(thistime-this.touchSTime <= device.slideTriggerMaxTime ){
					 //执行滑动事件
					 _this.chooseSlideType();

					 }
					 */
				}
			}
		},
		//判断滑动类型
		chooseSlideType:function(){
			var thisstartpoint = this.points[0],
				pointlength = this.points.length,
				thisendpoint = this.points[pointlength-1],
				hlength = Math.abs(thisstartpoint.x - thisendpoint.x),
				vlength = Math.abs(thisstartpoint.y - thisendpoint.y),
				_this = this;

			if(hlength>vlength){
				//横向移动
				if(thisstartpoint.x > thisendpoint.x){
					//左滑
					_this.slideLeftEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideLeftEven);
				}else{
					//右滑
					_this.slideRightEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideRightEven);
				}
			}else{
				//纵向移动
				if(thisstartpoint.y > thisendpoint.y){
					//上滑
					_this.slideUpEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideUpEven);
				}else{
					//下滑
					_this.slideDownEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideDownEven);
				}
			}


		},
		savePoint:function(e){
			var touch;
			if(this.hasTouch){
				touch=e.touches[0];
			}else{
				touch=e;
			}
			this.points.push({x:touch.clientX,y:touch.clientY});
		}
	};

	var events = {
		addClickListener:function(){
			var _this=this;
			new createMyTouchEven(document);
			//clickok
			document.addEventListener("myclickok",function(e){
//                e.preventDefault();
				_this.dothis("myclickok",e);
			},false);
			//clickdown
			document.addEventListener("myclickdown",function(e){
//                e.preventDefault();
				_this.dothis("myclickdown",e);
			},false);
			//clickup
			document.addEventListener("myclickup",function(e){
//                e.preventDefault();
				_this.dothis("myclickup",e);
			},false);
			//longclick
			document.addEventListener("mylongclick",function(e){
//                e.preventDefault();
				_this.dothis("mylongclick",e);
			},false);

			/*
			 //slideup
			 document.addEventListener("myslideup",function(e){
			 e.preventDefault();
			 _this.dothis("myslideup",e);
			 },false);
			 //slidedown
			 document.addEventListener("myslidedown",function(e){
			 e.preventDefault();
			 _this.dothis("myslidedown",e);
			 },false);
			 //slideleft
			 document.addEventListener("myslideleft",function(e){
			 e.preventDefault();
			 _this.dothis("myslideleft",e);
			 },false);
			 //slideright
			 document.addEventListener("myslideright",function(e){
			 e.preventDefault();
			 _this.dothis("myslideright",e);
			 },false);
			 */

		},
		dothis:function(type,e){
			var _this=this,
				that=e.mytarget,
				isfind = false;

			var gonext = function(obj){
				var p_obj = obj.parentNode;
				handlerthis(p_obj);
			};

			var handlerthis = function(obj){
				if(!obj){ return;}
				if(obj.nodeName.toLowerCase() == "html"){ return;}

				var _eventid = obj.__bens_eventid__;

				if(_this.savefn[_eventid]){
					isfind = true;
					if(_this.savefn[_eventid][type]){
						_this.savefn[_eventid][type].call(obj,e);
					}
				}


				if(!isfind){
					gonext(obj);
				}

			};

			handlerthis(that);
		},
		savefn:{}
	};
	events.addClickListener();

	var eventBind = function(a){
		this.objs = null;               //传入的obj
		if(typeof(a) === "object"){
			if(a.length && a.length >0){
				this.objs = a;
			}else{
				this.objs = $(a);
			}
		}else{
			this.objs = $(a);
		}
		this.idArray = [];
		this.saveobj = events.savefn;
		this.init();
	};
	eventBind.prototype = {
		init:function(){
			if(this.objs.length == 0){console.log("有事件绑定失败");return;}

			var _this = this;

			//遍历对象 写入事件id
			this.objs.each(function(){
				var thisobj = this;

				if(thisobj.__bens_eventid__){
					_this.idArray.push(thisobj.__bens_eventid__);
				}else{
					var eventname = "e" + device.counter();
					thisobj.__bens_eventid__ = eventname;
					_this.idArray.push(eventname);
					_this.saveobj[eventname] = {};
				}

			});

		},
		savefn:function(fn,type){
			var data = this.idArray;

			for(var i= 0,l=data.length;i<l;i++){
				var id = data[i];
				this.saveobj[id][type] = fn;
			}
		},
		trigger:function(type){
			for(var i= 0,l=this.idArray.length;i<l;i++){
				var id = this.idArray[i];
				if( this.saveobj[id] && this.saveobj[id][type]){
					this.saveobj[id][type]();
				}
			}
			return this;
		},
		myclickok:function(callback){
			this.savefn(callback,"myclickok");
			return this;
		},
		myclickdown:function(callback){
			this.savefn(callback,"myclickdown");
			return this;
		},
		myclickup:function(callback){
			this.savefn(callback,"myclickup");
			return this;
		},
		mylongclick:function(callback){
			this.savefn(callback,"mylongclick");
			return this;
		},
		unbind:function(type){
			var data = this.idArray,
				delall = false,
				_this = this;

			if(type && typeof(type) == "boolean"){
				delall = true;
			}

			var clearAll = function(this_obj){
				var id = this_obj.__bens_eventid__;
				delete this_obj.__bens_eventid__;
				delete _this.saveobj[id];
			};


			this.objs.each(function(){
				var this_obj = this;
				if(delall){
					clearAll(this_obj);
				}else{
					delete _this.saveobj[id][type];

					//检查是否所有事件都为空
					var this_data = _this.saveobj[id],
						isnull = true;

					for(var key in this_data){
						if(this_data[key]){
							isnull = false;
							break;
						}
					}
					if(isnull){
						clearAll(this_obj);
					}
				}
			});


			return this;
		}
		/*
		 myslideup:function(callback){
		 if(callback){
		 this.events[this.name].myslideup=callback;
		 return this;
		 }
		 },
		 myslidedown:function(callback){
		 if(callback){
		 this.events[this.name].myslidedown=callback;
		 return this;
		 }
		 },
		 myslideright:function(callback){
		 if(callback){
		 this.events[this.name].myslideright=callback;
		 return this;
		 }
		 },
		 myslideleft:function(callback){
		 if(callback){
		 this.events[this.name].myslideleft=callback;
		 return this;
		 }
		 }
		 */

	};

	window.temp_event = events.savefn;
	window.$$ = function(a){
		return new eventBind(a);
	};


})();

/**
 * Created by beens on 15/12/23.
 */


//touch滑动事件封装（简单版）
//var a = new DEVICE.touchSlideEvent({
//    dom:$("#div"),          //@param:jqobj   要监听的dom
//    startFn:function(){},   //@param:fn      手指按下时执行
//    moveFn:function(opt){   //@param:fn      手指滑动时执行
//        //opt.start.x   初始点 x，y
//        //opt.start.y
//        //opt.end.x     当前点 x ，y
//        //opt.end.y
//        //opt.move.x    当前点到初始点的距离  x ，y
//        //opt.move.y
//    },
//    endFn:function(opt,isSlide){    //@param：fn  手指释放的时候执行
//        //opt同上
//        //isSlide   布尔，是否触发快速滑动
//    },
//    slideLeftFn:function(){},     //@param:fn   快速左滑促发
//    slideRightFn:function(){},    //@param:fn   快速右滑促发
//    slideUpFn:function(){},       //@param:fn   快速上滑促发
//    slideDownFn:function(){},     //@param:fn   快速下滑促发
//    slideMaxTime:500,       //@param：number  触发快速滑动的最大时间 默认：500 ms
//    useDirection:"x"        //@param:str    "x","y","xy"
//                            //使用哪个方向的滑动   默认：x
//});

//销毁
//a.destroy();



DEVICE.touchSlideEvent = (function(){
    var touch = function(opt){
        opt = opt || {};
        this.dom = opt.dom || $("body");

        this.startFn = opt.startFn || function(){};
        this.moveFn = opt.moveFn || function(){};
        this.endFn = opt.endFn || function(){};
        this.slideLeftFn = opt.slideLeftFn || function(){};
        this.slideRightFn = opt.slideRightFn || function(){};
        this.slideUpFn = opt.slideUpFn || function(){};
        this.slideDownFn = opt.slideDownFn || function(){};

        this.slideMaxTime = opt.slideMaxTime || 500;
        this.useDirection = opt.useDirection || "x";   // x,y,xy


        this.touchStartFn = null;
        this.touchMoveFn = null;
        this.touchEndFn = null;
        this.points = [];
        this.isTouched = false;
        this.touchTime = 0;

        this.init();
    };
    touch.prototype = {
        init:function(){
            this.addEvent();
        },
        addEvent:function(){
            var obj = this.dom.get(0),
                _this = this;

            obj.addEventListener(DEVICE.START_EV,this.touchStartFn = function(e){
                _this.start(e);
            },false);
            document.addEventListener(DEVICE.MOVE_EV,this.touchMoveFn = function(e){
                _this.move(e);
            },false);
            document.addEventListener(DEVICE.END_EV,this.touchEndFn = function(e){
                _this.end(e)
            },false);
        },
        start:function(e){
            this.isTouched = true;
            this.clearPoint();
            this.savePoint(e);
            this.touchTime = new Date().getTime();
            this.startFn();
        },
        move:function(e){
            if(!this.isTouched){return;}
            //e.preventDefault();
            //e.stopPropagation();

            this.savePoint(e);

            if(this.points.length<2){return;}

            var points = this.getStartAndEndPoint(),
                move_x = Math.abs(points.move.x),
                move_y = Math.abs(points.move.y);

            if(this.useDirection == "x"){
                if(move_x > move_y){
                    e.preventDefault();
                    this.moveFn(points);
                }
            }else if(this.useDirection == "y"){
                if(move_y > move_x){
                    e.preventDefault();
                    this.moveFn(points);
                }
            }else{
                e.preventDefault();
                this.moveFn(points);
            }
        },
        end:function(){
            if(!this.isTouched){return;}
            this.isTouched = false;
            var time = new Date().getTime(),
                points = this.getStartAndEndPoint(),
                notSlide = (time - this.touchTime > this.slideMaxTime);
            this.endFn(points,!notSlide);

            //超时不触发滑动
            if(notSlide){return;}

            var m_x = points.move.x,
                m_y = points.move.y,
                is_x_long = (Math.abs(m_x) >= Math.abs(m_y));

            //右滑
            if(m_x>0 && is_x_long){
                if(this.useDirection != "y"){
                    this.slideRightFn();
                }
            }
            //左滑
            if(m_x<0 && is_x_long){
                if(this.useDirection != "y") {
                    this.slideLeftFn();
                }
            }
            //上滑
            if(m_y<0 && !is_x_long){
                if(this.useDirection != "x") {
                    this.slideUpFn();
                }
            }
            //下滑
            if(m_y>0 && !is_x_long){
                if(this.useDirection != "x") {
                    this.slideDownFn();
                }
            }


        },
        savePoint:function(e){
            var touch = (e.touches)? e.touches[0] : e;
            this.points.push({x:touch.clientX,y:touch.clientY});
        },
        clearPoint:function(){
            this.points = [];
        },
        getStartAndEndPoint:function(){
            var sPoint = this.points[0],
                len = this.points.length,
                ePoint = this.points[len-1],
                moveX = ePoint.x - sPoint.x,
                moveY = ePoint.y - sPoint.y;

            return {
                start:sPoint,
                end:ePoint,
                move:{
                    x:moveX,
                    y:moveY
                }
            }
        },
        destroy:function(){
            this.dom.get(0).removeEventListener(DEVICE.START_EV,this.touchStartFn,false);
            document.removeEventListener(DEVICE.MOVE_EV,this.touchMoveFn,false);
            document.removeEventListener(DEVICE.END_EV,this.touchEndFn,false);
        }
    };
    return touch;
})();


/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-9-19
 * Time: 下午8:52
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */




DEVICE.BtnTouchEffect = (function(){
	var btn_effect = function(opt){
		this.bgColor = opt.bgColor || "#ccc";
		this.dom = opt.dom;
		this.time = opt.time || 300;

		this.domWidth = parseInt(this.dom.width());
		this.domHeight = parseInt(this.dom.height());
		this.domOffsetLeft = this.dom.offset().left;
		this.domOffsetTop = this.dom.offset().top;
		this.div = null;

		this.init();
	};

	btn_effect.prototype = {
		init:function(){
			this.setDomStyle();
			this.addEvent();
		},
		setDomStyle:function(){
			if(!DEVICE.checkDomHasPosition(this.dom)){
				this.dom.css({
					position:"relative"
				})
			}
			this.dom.css({
				overflow:"hidden"
			})
		},
		createDom:function(){
			var div = $("<div></div>");
			div.css3({
				width:0,height:this.domHeight+"px",
				"border-radius":"999999px",
				position:"absolute",left:"50%",top:"50%",
				"border-width":"10px",
				"border-style":"solid",
				"border-color":this.bgColor,
				"margin-left":"-10px",
				"margin-top":-this.domHeight/2 -10 + "px",
				opacity:0
			});
			return div;

		},
		addEvent:function(){
			var _this = this;
			this.dom.get(0).addEventListener(DEVICE.START_EV,this.fn = function(e){
				e = (e.touchs)? e.touches[0] : e;

				var x = e.pageX - _this.domOffsetLeft,
					y = e.pageY - _this.domOffsetTop;

				_this.showEffect(x,y);
			},false);
		},
		showEffect:function(x,y){
			if(this.div){this.div.remove();}

			var div = this.createDom();
			div.css({
				left:x +"px"
			});
			this.dom.append(div);
			this.div = div;


			div.cssAnimate({
				"border-width":"40px",
				width:this.domWidth*2 + "px",
				"margin-left": -this.domWidth - 40 + "px",
				"margin-top": -this.domHeight/2 - 40 + "px",
				opacity:1
			},this.time,function(){},true,"easy");

		}

	};

	return btn_effect;
})();/**
 * Created by beens on 15/12/18.
 */


//下拉刷新插件，自动屏幕浏览器顶部的自带事件（比如ios顶部的弹性回滚）
//ajax取数据成功失败都要执行相应的回调刷新页面(a.refreshComplete()或a.nextPageLoadComplete())


//a = new DEVICE.pullRefresh({
//    dom:$("#aaa"),           //@param:jqobj   跟随浏览器滑动的主体dom
//    refreshDom:div,          //@param:jqobj  下拉刷新时显示的div
//                                             该div会自动定位到主体dom的上方
//    refreshFn:function(){    //@param:fn      触发刷新时执行
//        div.text("正在加载")
//
//        setTimeout(function(){
//            a.refreshComplete();    //数据加载完成后调用该方法隐藏刷新时显示的dom
//        },3000)
//
//    },
//                                     //可释放刷新的点在refreshDom的2/3高度
//    nowRefreshCanRunFn:function(){   //拉动到可以释放刷新时执行的函数
//        div.text("释放刷新");
//    },
//    nowRefreshNotCanRunFn:function(){  //拉动到不可以释放刷新时执行的函数
//        div.text("下拉刷新");
//    },
//    nextPageDom:$("#ts1"),        //@param:jqobj 上啦加载下一页时显示的div
//                                                 该div会自动定位到主体dom的下方
//    nextPageFn:function(){         //@param:fn      触发加下下一页时执行
//        $("#ts1").text("正在加载")
//
//        setTimeout(function(){
//            var div = "adfasdf<br/>";
//            for(var i= 0,l=100;i<l;i++){
//                a.body.append(div);
//            }
//            a.nextPageLoadComplete();  //数据加载完成后调用该方法隐藏刷新时显示的dom
//        },3000)
//    },
//                                      //可释放的点在nextPageDom的2/3高度
//    nextPageCanRunFn:function(){      //拉动到可以释放加载下一页时执行的函数
//        $("#ts1").text("释放加载")
//    },
//    nextPageNotCanRunFn:function(){   //拉动到不可释放加载下一页时执行的函数
//        $("#ts1").text("上拉加载")
//    }



//});


//a.refreshComplete();          //数据加载完成后调用该方法隐藏刷新时显示的dom
//a.nextPageLoadComplete();     //数据加载完成后调用该方法隐藏下一页时显示的dom
//a.destroy();                  //销毁功能






(function(){
    var pullRefresh = function(opt){
        //刷新要显示的div
        this.refreshDom = opt.refreshDom;      //下拉刷新要显示的div  jqobj
        this.refreshFn = opt.refreshFn || function(){}; //刷新触发执行
        this.nextPageDom = opt.nextPageDom;     //上拉加载更多要显示的div jqobj
        this.nextPageFn = opt.nextPageFn || function(){};  //加载更多执行
        this.nowRefreshCanRunFn = opt.nowRefreshCanRunFn || function(){};
        this.nowRefreshNotCanRunFn = opt.nowRefreshNotCanRunFn || function(){};
        this.nextPageCanRunFn = opt.nextPageCanRunFn || function(){};
        this.nextPageNotCanRunFn = opt.nextPageNotCanRunFn || function(){};
        //要移动的主体
        this.body = opt.dom || $("body");   //滑动的主体 jqobj

        //移动块的外包裹层
        this.main = null;

        //判断是否已点击
        this.isTouch = false;
        //判断是否已经被下拉
        this.state = false;
        //判断是否正在从服务器请求数据
        this.isRefreshing = false;
        this.isNextPageing = false;
        //已修正的距离
        this.y = 0;
        //顶部刷新dom的高度
        this.refreshDomHeight = parseInt(this.refreshDom.height());
        this.nextPageDomHeight = parseInt(this.nextPageDom.height());
        this.maxScrollTop = null;
        this.canPullBottom = false;
        this.mainHeight = 0;
        //触摸点的记录
        this.points = [];
        //回弹动画函数
        this.backAnimateFn = null;

        //
        this.touchEndFn = null;
        this.touchMoveFn = null;
        this.touchStartFn = null;


        this.init();
    };
    pullRefresh.prototype = {
        init:function(){
            this.setMainDiv();
            this.setRefreshDiv();
            this.setNextPageDiv();
            this.refresh();
            this.addEvent();
        },
        setMainDiv:function(){
            var div = $("<div></div>");
            div.css({
                width:"100%",
                overflow:"hidden"
            });
            div.insertAfter(this.body);
            div.append(this.body);

            this.main = div;
            if(!DEVICE.checkDomHasPosition(this.body)){
                this.body.css({
                    position:"relative"
                })
            }
        },
        //设置刷新的div样式
        setRefreshDiv:function(){
            this.refreshDom.css({
                position:"absolute",
                left:0,
                top:-this.refreshDomHeight + "px"
            });

            this.body.append(this.refreshDom);

        },
        //设置下拉加载的div样式
        setNextPageDiv:function(){
            this.nextPageDom.css({
                position:"absolute",
                left:0,
                bottom:-this.nextPageDomHeight + "px"
            });


            this.body.append(this.nextPageDom);
        },
        //事件监听
        addEvent:function(){
            var _this = this;
            document.addEventListener(DEVICE.START_EV,this.touchStartFn = function(e){
                _this.touchStart(e);
            },false);
            document.addEventListener(DEVICE.MOVE_EV,this.touchMoveFn = function(e){
                _this.touchMove(e);
            },false);
            document.addEventListener(DEVICE.END_EV,this.touchEndFn = function(e){
                _this.touchEnd();
            },false);
        },


        touchStart:function(e){
            if(this.isRefreshing || this.isNextPageing){return;}
            this.isTouch = true;
            this.clearPoint();
            this.savePoint(e);
        },
        touchMove:function(e){
            if(this.isRefreshing || this.isNextPageing){return;}
            if(!this.isTouch){return;}
            this.savePoint(e);

            var l = this.points.length;
            if(l<2){return;}

            var s_y = this.points[l-2],
                e_y = this.points[l-1];


            if(this.state){
                if(this.state == "top"){
                    this.pullTop(e_y - s_y,e);
                }else{
                    this.pullBottom(e_y - s_y,e);
                }
                return;

            }


            //判断是否在下拉
            if(s_y < e_y){
                //下拉
                this.pullTop(e_y - s_y,e);
            }else{
                //上提
                this.pullBottom(e_y - s_y,e);
            }


        },
        touchEnd:function(){
            if(this.isRefreshing || this.isNextPageing){return;}
            if(!this.isTouch){return;}
            if(!this.state){return;}

            if(this.state == "top"){
                this.refreshTouchEnd();

            }else{
                this.nextPageTouchEnd();
            }


        },
        refreshTouchEnd:function(){
            var _this = this;

            if(this.y<=0){
                _this.y = 0;
                _this.state = null;
                _this.backAnimateFn = null;
                return;
            }


            //判断是否执行刷新  超过刷新dom的2/3高度
            var end = 0,
                time = 400;
            if(this.y >= this.refreshDomHeight*2/3){
                this.isRefreshing = true;
                this.refreshFn();
                end = this.refreshDomHeight*2/3;
                time = 100;
            }




            //顶部刷新在显示，需要回滚
            this.backAnimateFn = new DEVICE.jsAnimate({
                start:this.y,             //@param:number   初始位置
                end:end,                    //@param:number   结束位置
                time:time,                 //@param:number   动画执行时间  ms
                type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
                class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
                stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
                    _this.y = val;
                    $(window).scrollTop(0);
                    _this.body.css3({
                        transform:"translate3d(0,"+_this.y+"px,0)"
                    });
                },
                endFn:function(){         //@param:fn       动画结束执行
                    _this.y = end;
                    _this.state = null;
                    _this.backAnimateFn = null;
                },
                alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
                infinite:false            //@param:boolean  动画是否循环执行，默认：false
            });

            this.backAnimateFn.play();

            if(end !=0){
                var height = this.mainHeight+this.refreshDomHeight*2/3;
                this.main.css({height:height+"px"});
            }


        },
        nextPageTouchEnd:function(){
            var _this = this;

            if(this.y>=0){
                _this.y = 0;
                _this.state = null;
                _this.backAnimateFn = null;
                return;
            }


            //判断是否执行刷新  超过下一页dom的2/3高度
            var end = 0,
                time = 400;
            if(Math.abs(this.y) >= this.nextPageDomHeight*2/3){
                this.isNextPageing = true;
                this.nextPageFn();
                end = -this.nextPageDomHeight*2/3;
                time = 100;
            }




            //底部加载在显示，需要回滚
            this.backAnimateFn = new DEVICE.jsAnimate({
                start:this.y,             //@param:number   初始位置
                end:end,                    //@param:number   结束位置
                time:time,                 //@param:number   动画执行时间  ms
                type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
                class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
                stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
                    _this.y = val;
                    $(window).scrollTop(this.maxScrollTop);
                    _this.body.css3({
                        transform:"translate3d(0,"+_this.y+"px,0)"
                    });
                },
                endFn:function(){         //@param:fn       动画结束执行
                    _this.y = end;
                    _this.state = null;
                    _this.backAnimateFn = null;
                },
                alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
                infinite:false            //@param:boolean  动画是否循环执行，默认：false
            });

            this.backAnimateFn.play();
            if(end != 0){
                var height = this.mainHeight + this.nextPageDomHeight*2/3;
                this.main.css({height:height+"px"});
                this.body.css({"padding-top":this.nextPageDomHeight*2/3+"px"});
                var top = $(window).scrollTop() + this.nextPageDomHeight*2/3;
                $(window).scrollTop(top);
            }
        },
        //完全隐藏刷新dom
        refreshComplete:function(){
            var _this = this;
            this.backAnimateFn = new DEVICE.jsAnimate({
                start:this.y,             //@param:number   初始位置
                end:0,                    //@param:number   结束位置
                time:400,                 //@param:number   动画执行时间  ms
                type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
                class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
                stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
                    _this.y = val;
                    //$(window).scrollTop(0);
                    _this.body.css3({
                        transform:"translate3d(0,"+_this.y+"px,0)"
                    });
                },
                endFn:function(){         //@param:fn       动画结束执行
                    _this.y = 0;
                    _this.state = null;
                    _this.backAnimateFn = null;
                    _this.isRefreshing = false;
                },
                alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
                infinite:false            //@param:boolean  动画是否循环执行，默认：false
            });
            this.backAnimateFn.play();
            this.refresh();
        },
        nextPageLoadComplete:function(){
            var _this = this;
            //this.backAnimateFn = new DEVICE.jsAnimate({
            //    start:this.y,             //@param:number   初始位置
            //    end:0,                    //@param:number   结束位置
            //    time:400,                 //@param:number   动画执行时间  ms
            //    type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
            //    class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
            //    stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
            //        _this.y = val;
            //        //$(window).scrollTop(this.maxScrollTop);
            //        _this.body.css3({
            //            transform:"translate3d(0,"+_this.y+"px,0)"
            //        });
            //    },
            //    endFn:function(){         //@param:fn       动画结束执行
            //        _this.y = 0;
            //        _this.state = null;
            //        _this.backAnimateFn = null;
            //        _this.isNextPageing = false;
            //    },
            //    alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
            //    infinite:false            //@param:boolean  动画是否循环执行，默认：false
            //});
            //this.backAnimateFn.play();
            this.refresh();

            //var top = $(window).scrollTop()+_this.nextPageDomHeight*2/3;
            _this.body.css3({
                transform:"translate3d(0,0,0)"
            });
            //$(window).scrollTop(top);
            _this.y = 0;
            _this.state = null;
            _this.backAnimateFn = null;
            _this.isNextPageing = false;

        },
        //记录触摸的点
        savePoint:function(e){
            var point = (e.touches)? e.touches[0] : e;

            var y = point.clientY;
            this.points.push(y);
        },
        //清空记录的点
        clearPoint:function(){
            this.points = [];
        },

        //刷新
        refresh:function(){
            this.mainHeight = parseInt(this.body.height());
            this.main.css({height:this.mainHeight+"px"});
            this.maxScrollTop = parseInt($("body").height()) - window.innerHeight;
            this.canPullBottom = (this.maxScrollTop>0);
            this.body.css({"padding-top":0});

        },
        //上提
        pullBottom:function(len,e){
            if(!this.canPullBottom){return;}
            if($(window).scrollTop() != this.maxScrollTop){return;}

            this.state = "bottom";

            this.y += len/2;
            this.y = (Math.abs(this.y) > this.nextPageDomHeight)? -this.nextPageDomHeight : this.y;

            if(this.y <= 0){
                e.stopPropagation();
                e.preventDefault();
                this.body.css3({
                    transform:"translate3d(0,"+this.y+"px,0)"
                });
            }

            if(Math.abs(this.y) >= this.nextPageDomHeight*2/3){
                this.nextPageCanRunFn();
            }else{
                this.nextPageNotCanRunFn();
            }

        },
        //下拉
        pullTop:function(len,e){
            if($(window).scrollTop() != 0){
                return;
            }

            this.state = "top";

            this.y += len/2;
            this.y = (this.y > this.refreshDomHeight)? this.refreshDomHeight : this.y;

            if(this.y >= 0){
                e.stopPropagation();
                e.preventDefault();
                this.body.css3({
                    transform:"translate3d(0,"+this.y+"px,0)"
                });
            }

            if(this.y >= this.refreshDomHeight*2/3){
                this.nowRefreshCanRunFn();
            }else{
                this.nowRefreshNotCanRunFn();
            }

        },
        destroy:function(){
            document.removeEventListener(DEVICE.START_EV,this.touchStartFn,false);
            document.removeEventListener(DEVICE.MOVE_EV,this.touchMoveFn,false);
            document.removeEventListener(DEVICE.END_EV,this.touchEndFn,false);
            this.refreshDom.css({display:"none"});
            this.nextPageDom.css({display:"none"});
        }

    };

    DEVICE.pullRefresh = pullRefresh;
})();




//iphone，ipad中视频在页面中直接播放，并可以动自动播放。 不会强制使用视频播放器播放视频

//DEVICE.makeVideoPlayableInline({
//    dom:$("#test"),     //要插入的dom
//    videoSrc:"test/fll.mp4",  //视频地址
//    autoPlay:true,    //自动播放
//    loop:true,       //循环播放
//    muted:false,     //是否静音
//    isCordova:false   //是否是在cordova中使用
//});




DEVICE.makeVideoPlayableInline = function(opt){
    var dom = opt.dom || $("body"),
        videoSrc = opt.videoSrc || "",
        autoPlay = (opt.autoPlay)? "autoPlay" : "",
        muted = (opt.muted)? "muted" : "",
        loop = (opt.loop)?  "loop" : "",
        isCordova = opt.isCordova || false,
		playFn = opt.playFn || function(){};

    if(isCordova){
        muted = (muted)? "" : "muted";
    }

    dom.css({"overflow":"hidden"});

    //去除视屏的播放按钮样式等
    var style = "<style>" +
        ".IIV::-webkit-media-controls-play-button," +
        ".IIV::-webkit-media-controls-start-playback-button {" +
            "opacity: 0;" +
            "pointer-events: none;" +
            "width: 5px;" +
        "}</style>";
    $("head").append(style);

    //创建视屏


    var autoPlay1 = (DEVICE.isPhone)? "" : autoPlay;
    var video = $("<video "+loop+" "+autoPlay1+" "+muted+" src='"+videoSrc+"'></video>");
    dom.append(video);

	video.get(0).addEventListener("play",function(){
		playFn();
	},false);


	var makeVideoPlayableInline = function () {
        "use strict";
        function e(e) {
            function r(t) {
                n = requestAnimationFrame(r), e(t - (i || t)), i = t
            }

            var n, i;
            this.start = function () {
                n || r(0)
            }, this.stop = function () {
                cancelAnimationFrame(n), n = null, i = 0
            }
        }

        function r(e, r, n, i) {
            function t(r) {
                Boolean(e[n]) === Boolean(i) && r.stopImmediatePropagation(), delete e[n]
            }

            return e.addEventListener(r, t, !1), t
        }

        function n(e, r, n, i) {
            function t() {
                return n[r]
            }

            function d(e) {
                n[r] = e
            }

            i && d(e[r]), Object.defineProperty(e, r, {get: t, set: d})
        }

        function i(e, r, n) {
            n.addEventListener(r, function () {
                return e.dispatchEvent(new Event(r))
            })
        }

        function t(e, r) {
            Promise.resolve().then(function () {
                e.dispatchEvent(new Event(r))
            })
        }

        function d(e) {
            var r = new Audio;
            return i(e, "play", r), i(e, "playing", r), i(e, "pause", r), r.crossOrigin = e.crossOrigin, r.src = e.src || e.currentSrc || "data:", r
        }

        function a(e, r, n) {
            (f || 0) + 200 < Date.now() && (e[h] = !0, f = Date.now()), n || (e.currentTime = r), T[++w % 3] = 100 * r | 0
        }

        function o(e) {
            return e.driver.currentTime >= e.video.duration
        }

        function u(e) {
            var r = this;
            r.video.readyState >= r.video.HAVE_FUTURE_DATA ? (r.hasAudio || (r.driver.currentTime = r.video.currentTime + e * r.video.playbackRate / 1e3, r.video.loop && o(r) && (r.driver.currentTime = 0)), a(r.video, r.driver.currentTime)) : r.video.networkState !== r.video.NETWORK_IDLE || r.video.buffered.length || r.video.load(), r.video.ended && (delete r.video[h], r.video.pause(!0))
        }

        function s() {
            var e = this, r = e[g];
            return e.webkitDisplayingFullscreen ? void e[b]() : ("data:" !== r.driver.src && r.driver.src !== e.src && (a(e, 0, !0), r.driver.src = e.src), void(e.paused && (r.paused = !1, e.buffered.length || e.load(), r.driver.play(), r.updater.start(), r.hasAudio || (t(e, "play"), r.video.readyState >= r.video.HAVE_ENOUGH_DATA && t(e, "playing")))))
        }

        function c(e) {
            var r = this, n = r[g];
            n.driver.pause(), n.updater.stop(), r.webkitDisplayingFullscreen && r[E](), n.paused && !e || (n.paused = !0, n.hasAudio || t(r, "pause"), r.ended && (r[h] = !0, t(r, "ended")))
        }

        function v(r, n) {
            var i = r[g] = {};
            i.paused = !0, i.hasAudio = n, i.video = r, i.updater = new e(u.bind(i)), n ? i.driver = d(r) : (r.addEventListener("canplay", function () {
                r.paused || t(r, "playing")
            }), i.driver = {
                src: r.src || r.currentSrc || "data:", muted: !0, paused: !0, pause: function () {
                    i.driver.paused = !0
                }, play: function () {
                    i.driver.paused = !1, o(i) && a(r, 0)
                }, get ended() {
                    return o(i)
                }
            }), r.addEventListener("emptied", function () {
                var e = !i.driver.src || "data:" === i.driver.src;
                i.driver.src && i.driver.src !== r.src && (a(r, 0, !0), i.driver.src = r.src, e ? i.driver.play() : i.updater.stop())
            }, !1), r.addEventListener("webkitbeginfullscreen", function () {
                r.paused ? n && !i.driver.buffered.length && i.driver.load() : (r.pause(), r[b]())
            }), n && (r.addEventListener("webkitendfullscreen", function () {
                i.driver.currentTime = r.currentTime
            }), r.addEventListener("seeking", function () {
                T.indexOf(100 * r.currentTime | 0) < 0 && (i.driver.currentTime = r.currentTime)
            }))
        }

        function p(e) {
            var i = e[g];
            e[b] = e.play, e[E] = e.pause, e.play = s, e.pause = c, n(e, "paused", i.driver), n(e, "muted", i.driver, !0), n(e, "playbackRate", i.driver, !0), n(e, "ended", i.driver), n(e, "loop", i.driver, !0), r(e, "seeking"), r(e, "seeked"), r(e, "timeupdate", h, !1), r(e, "ended", h, !1)
        }

        function l(e, r, n) {
            void 0 === r && (r = !0), void 0 === n && (n = !0), n && !y || e[g] || (v(e, r), p(e), e.classList.add("IIV"), !r && e.autoplay && e.play(), "MacIntel" !== navigator.platform && "Windows" !== navigator.platform || console.warn("iphone-inline-video is not guaranteed to work in emulated environments"))
        }

        var f, m = "undefined" == typeof Symbol ? function (e) {
            return "@" + (e || "@") + Math.random()
        } : Symbol, y = /iPhone|iPod/i.test(navigator.userAgent) && void 0 === document.head.style.grid, g = m(), h = m(), b = m("nativeplay"), E = m("nativepause"), T = [], w = 0;
        return l.isWhitelisted = y, l
    }();


    makeVideoPlayableInline(
        video.get(0),
        (muted)? true : false
    );

    if(autoPlay){
        setTimeout(function(){
            video.get(0).play();
        },0)
    }

    return video.get(0);
};



/**
 * Created by beens on 15/11/16.
 */



//查看是否联网

//获取当前联网状态
//DEVICE.isOnline.state();  //返回true/false

//事件监听触发
//DEVICE.isOnline.onLineFn = function(){console.log("on")};
//DEVICE.isOnline.offLineFn = function(){console.log("off")};



DEVICE.isOnline = (function(){
    window.addEventListener("online",function(){
        a.onLineFn();
    },false);
    window.addEventListener("offline",function(){
        a.offLineFn();
    },false);

    var a = {
        state:function(){
            return window.navigator.onLine;
        },
        onLineFn:function(){},
        offLineFn:function(){}
    };

    return a;

})();/**
 * Created by beens on 15/11/16.
 */




//获取摄像头照相，获取到的图片比例4：3
//var a = new DEVICE.getUserMedia({
//    dom:dom,                  //@param:jqdom   要实时显示的dom容器
//    errorFn:function(msg){}   //@param:fn      出错时回调
//});

////获取图片，返回base64格式
//a.getImage();

//判断是否支持
//a.isSupport();

//停止采集
//a.stop();


//支持：chrome,firefox，edge，opera  手机目前只有chrome支持




DEVICE.getUserMedia = (function(){
    var getUserMedia = function(opt){
        this.dom = opt.dom;
        this.errorFn = opt.errorFn || function(){};


        this._checkSupport();
        if(!this.getMedia){
            this.errorFn("not support getUserMedia api !");
            return;
        }

        this.domWidth = parseInt(this.dom.width());
        this.domHeight = parseInt(this.dom.height());
        this.videoWidth = 0;
        this.videoHeihgt = 0;

        this.video = null;
        this.canvas = null;
        this.ctx = null;

        this._init();
    };
    getUserMedia.prototype = {
        _init:function(){
            this._getVideoSize();
            this._createVideo();
            this._createCanvas();
            this._play();
        },
        isSupport:function(){
            return (this.getMedia)? true :false;
        },
        _getVideoSize:function(){
            //视频比例必须为4：3  要不最终输出图片会被拉伸，很奇怪
            if(this.domWidth/this.domHeight > 4/3){
                this.videoWidth = 4*this.domHeight/3;
                this.videoHeihgt = this.domHeight;
            }else{
                this.videoWidth = this.domWidth;
                this.videoHeihgt = this.domWidth*3/4;
            }
        },
        _checkSupport:function(){
            navigator.getMedia =  navigator.getUserMedia ||
                                  navigator.webkitGetUserMedia ||
                                  navigator.mozGetUserMedia ||
                                  navigator.msGetUserMedia;

            this.getMedia = navigator.getMedia;
        },
        _createVideo:function(){
            var video = $("<video autoplay width='"+this.videoWidth+"' height='"+this.videoHeihgt+"'></video>");
            this.dom.append(video);
            this.video = video;

            video.css({
                "margin-top":(this.domHeight-this.videoHeihgt)/2 + "px",
                "margin-left":(this.domWidth - this.videoWidth)/2 + "px"
            })

        },
        _play:function(){
            var _this = this;

            navigator.getMedia (
                // constraints
                {
                    video: true,
                    audio: false
                },
                // successCallback
                function(localMediaStream) {
                    _this.localMediaStream = localMediaStream;
                    _this.video.get(0).src = window.URL.createObjectURL(localMediaStream);
                    _this.video.get(0).onloadedmetadata = function(e) {
                        _this.video.get(0).play();
                    };
                },
                // errorCallback
                function(err) {
                    var _this = this;
                    _this.errorFn(err);
                }

            );
        },
        _createCanvas:function(){
            var canvas = $("<canvas></canvas>"),
                ctx = canvas.get(0).getContext("2d");

            canvas.get(0).width = this.videoWidth;
            canvas.get(0).height = this.videoHeihgt;


            this.ctx = ctx;
            this.canvas = canvas;
        },
        getImage:function(){
            this.ctx.drawImage(this.video.get(0),0,0,this.videoWidth,this.videoHeihgt);
            var src = this.canvas.get(0).toDataURL("image/png");

            return src;
        },
        stop:function(){
            if(this.localMediaStream){
                if(this.localMediaStream.stop){
                    this.localMediaStream.stop();
                }
                var track = this.localMediaStream.getTracks() || [];
                track = track[0];
                if(track.stop){
                    track.stop();
                }
                this.video.get(0).src = "";
            }
        }
    };

    return getUserMedia;
})();/**
 * Created by beens on 15/12/17.
 */





//调用发送短信界面
//DEVICE.sendSMS(10086,"11");
//也可以直接写成a链接。

DEVICE.sendSMS = function(phone,text){
    if(DEVICE.isAndroid || DEVICE.isIphone){
        window.location.href = "sms:"+phone+"?body="+text;
    }
};



//打电话
//DEVICE.tel(10086);
//也可以直接写成a链接


DEVICE.tel = function(number){
    if(DEVICE.isAndroid || DEVICE.isIphone) {
        window.location.href = "tel:" + number;
    }
};

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//重力感应

//var obj = $("#test");
//new DEVICE.gravitySensor({
//    moveFn:function(x,y){
//        //x:y轴旋转角度 -90 - 90
//        //y:x轴旋转角度 -90 - 90
//        //旋转角度可转换成百分比在转换成实际的移动像素x,y
//        //手机横向时 x=y  y=x;
//        obj.css3({transform:"translate3d("+x+"px,"+y+"px,0)"});
//    }
//});

DEVICE.gravitySensor = function () {
    function sensor(opt) {
        _classCallCheck(this, sensor);

        this.moveFn = opt.moveFn || function () {};

        this._init();
    }

    _createClass(sensor, [{
        key: "_init",
        value: function _init() {
            this._addEvent();
        }
    }, {
        key: "_addEvent",
        value: function _addEvent() {
            var _this = this;

            window.addEventListener("deviceorientation", function (e) {
                //设备水平放置到桌面时  beta和gamma的值都为0
                //x:e.beta  -180 - 180   绕x轴旋转角度
                //y:e.gamma  -90 - 90    绕y轴旋转角度

                //e.alpha  0-360  设备指示的方向，根据指南针的设定情况而定
                _this.handlerEvent(e);
            }, false);
        }
    }, {
        key: "handlerEvent",
        value: function handlerEvent(e) {
            var beta = e.beta,
                gamma = e.gamma;

            //强制只返回-90 - 90度的值
            //beta = DEVICE.getBetweenNumber(beta,-90,90);
            //gamma = DEVICE.getBetweenNumber(gamma,-90,90);

            this._xMove(gamma, beta);
        }
    }, {
        key: "_xMove",
        value: function _xMove(x, y) {
            y = DEVICE.getBetweenNumber(y, -90, 90);
            //参数为度数
            this.moveFn(x, y);
        }
    }]);

    return sensor;
}();

//$(document).ready(function(){
//    var obj = $("#test");
//    new DEVICE.gravitySensor({
//        moveFn:function(x,y){
//            console.log(y)
//            obj.css3({transform:"translate3d("+x+"px,"+y+"px,0)"});
////                console.log(x+"   "+y)
//        }
//    });
//});

//# sourceMappingURL=gravitySensor-compiled.js.map