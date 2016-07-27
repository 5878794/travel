/*
page_change
show_scroll_bar
message
select
window_open_url
notify
loading
network
*/
/**
 * Created by beens on 15/12/14.
 */



if(!window.CAPP){CAPP = {};}



CAPP.ready = (function(){
    var a = 0,
        isReady = false,
        cache = [],
        isWeb = DEVICE.getParamFromUrl("web"),
        n = (isWeb)? 1 : 2;

    var init = function(){
        a++;
        if(a == n){
            isReady = true;
            run();
        }
    };

    document.addEventListener("deviceready",function(){
        init();
    },false);
    $(document).ready(function(){
        init();
    });



    var run = function(){
        for(var i = 0,l=cache.length;i<l;i++){
            cache[i]();
        }
    };


    return function(fn){
        if(isReady){
            fn();
        }else{
            cache.push(fn);
        }
    };

})();





//退出app
CAPP.Exit = function(){
    navigator.app.exitApp();
};/**
 * Created by beens on 15/12/12.
 */


//install CLI
//cordova plugin add https://github.com/Telerik-Verified-Plugins/NativePageTransitions


//www
//http://plugins.telerik.com/cordova/plugin/native-page-transitions


//页面切换过度效果（已增加回退后保存scroll高度的js）
//              （插件原理：抓屏然后加载另一个页面在滑动进来，
//               注意：执行后页面已跳转到新的页面，js执行新页面的，老的页面不执行
//               注意：每个页面都需要引用该js）



//切换到某个页面（滑动效果）
//CAPP.Page.slideTo({href:""});
//后退返回
//CAPP.Page.slideBack();



//其它效果暂未添加





if(!window.CAPP){CAPP = {};}


CAPP.Page = {
    //获取地址栏中当前html文件名称
    getHtmlName:function(){
        var url = window.location.href,
            l = url.lastIndexOf("/")+1;

        url = url.substr(l);
        return url.replace(window.location.search,"");
    },


    //页面滑动
    slideTo:function(opt){
        var options = {
                "direction"        :  opt.direction || "left",      //滑动方向  left|right|up|down
                "duration"         :  opt.duration || 500,          //动画时间  500ms
                "slowdownfactor"   :  opt.slowdownfactor || 1,      //动画重叠等级  1-4？   1：不重叠
                "iosdelay"         :  -1,                           //延迟开始时间，-1为手动切换
                "androiddelay"     :  -1,
                "winphonedelay"    :  -1,
                "fixedPixelsTop"   :  opt.fixedPixelsTop || 0,      //动画从页面顶部多少px开始(顶部导航不切换页面时使用)
                "fixedPixelsBottom":  opt.fixedPixelsBottom || 0,   //动画从页面底部多少px开始
                "href"             :  opt.href || ""               //跳转到哪个页面
            },
            successFn = opt.endFn || function(){},    //切换完成执行
            errorFn = opt.errorFn || function(){};     //切换失败执行

        if(!opt.notSave){
            this._saveSession();
        }


        window.plugins.nativepagetransitions.slide(
            options,
            function () {
                successFn();
            },
            function () {  // called in case you pass in weird values
                errorFn("页面暂时无法打开，请稍后重试！");
            }
        );
    },
    //页面滑动回退
    slideBack:function(){
        var url = this._getBackPageName();

        if(url){
            this.slideTo({
                href:url,
                direction:"right",
                notSave:true
            })
        }
    },


    flipTo:function(){

    },
    fadeTo:function(){

    },
    drawerTo:function(){

    },
    //保存页面跳转记录
    _saveSession:function(){
        var url = this.getHtmlName(),
            y = window.scrollY,
            x = window.scrollX,
            data = sessionStorage.getItem("_back_history_") || "[]";

        data = JSON.parse(data);



        data.push({
            url:url,
            x:x,
            y:y
        });

        sessionStorage.setItem("_back_history_",JSON.stringify(data));
    },
    //获取上个页面文件名
    _getBackPageName:function(){
        var data = sessionStorage.getItem("_back_history_") || "[]";

        data = JSON.parse(data);
        var l = data.length;


        if(l==0){
            return "";
        }

        return data[l-1].url;
    }
};




document.addEventListener("deviceready",function(){
    $(document).ready(function(){
        //获取记录中最后一个页面
        var data = sessionStorage.getItem("_back_history_") || "[]";
        data = JSON.parse(data);

        var url = CAPP.Page.getHtmlName(),
            l = data.length,
            _data = data[l-1];


        //判断是否是后退页面，重置后退页面的滚轮高度
        if(_data && _data.url == url){
            var x = _data.x,
                y = _data.y;
            window.scrollTo(x,y);

            data.pop();
            sessionStorage.setItem("_back_history_",JSON.stringify(data));

        }

        //页面切换
        window.plugins.nativepagetransitions.executePendingTransition(
            function(){},
            function(){}
        );
    });
},false);



/**
 * Created by beens on 15/12/14.
 */


//cordova原生屏蔽垂直滚动条，使用该库可控制是否显示滚动条

//install CLI
//cordova plugin add cordova-android-scrollbar

//www
//https://github.com/mayflower/cordova-android-scrollbar


//显示滚动条
//CAPP.ScrollBar.show();




if(!window.CAPP){CAPP = {};}

CAPP.ScrollBar = {
    show:function(){
        this._run(true);
    },
    _run:function(state){
        mayflower.AndroidScrollbar.toggleVerticalScrollbarVisibility(state)
            .then(
            function() {
                console.log('Vertical scrollbar enabled');
            },
            function(error) {
                console.log('error', error);
            }
        );
    }
};

/**
 * Created by beens on 15/12/14.
 */




//cordova 在页面上显示提示信息

//install CLI
//cordova plugin add cordova-plugin-x-toast

//www
//https://www.npmjs.com/package/cordova-plugin-x-toast


//显示信息
//CAPP.Message.show("message",{
//    duration:"short",           //显示时长   short, long  默认：short
//    position:"center",          //显示位置   'top', 'center', 'bottom'  默认：center
//    addPixelsY:0,               //y坐标修正  默认：0
//    success:function(){},
//    error:function(){}
//});
//隐藏信息  一般不需要调用，显示了会自动消失
//CAPP.Message.hide();





if(!window.CAPP){CAPP = {};}


CAPP.Message = {
    show:function(message,opt){
        opt = opt || {};
        var option = {
            message:message || "",
            duration:opt.duration || "short",       //持续时间：   short, long
            position:opt.position || "center",      //位置：   'top', 'center', 'bottom'
            addPixelsY:opt.addPixelsY  || 0         //y坐标修正
        };
        var success = opt.success || function(){},  //成功回调
            error = opt.error || function(){};      //失败回调

        window.plugins.toast.showWithOptions(
            option,
            success,
            error
        );

    },
    hide:function(){
        window.plugins.toast.hide();
    }
};/**
 * Created by beens on 15/12/14.
 */




//cordova 系统原生的select

//install CLI
//cordova plugin add cordova-plugin-listpicker

//www
//https://github.com/roberthovhannisyan/PhoneGap-Plugin-ListPicker


//CAPP.SelectShow({
//    title:"请选择数字",      //标题
//    lists:[                 //显示的列表
//        {text:"1",value:"a1"},
//        {text:"2",value:"a2"}
//    ],
//    selected:"a2",          //默认选中哪个，为空不选中
//    okBtn:"好",              //确认button名字，android不显示
//    escBtn:"不好",
//    success:function(a){        //选择后返回value值
//        console.log(a)
//    }
//});






if(!window.CAPP){CAPP = {};}


CAPP.SelectShow = function(opt){

    var title = opt.title || "请选择",
        lists = opt.lists || [],
        selected = opt.selected || lists[0].value,
        okBtn = opt.okBtn || "完成",
        escBtn = opt.escBtn || "取消",
        success = opt.success || function(){};


    var config = {
        title: title,
        items: lists,
        selectedValue: selected,
        doneButtonLabel: okBtn,
        cancelButtonLabel: escBtn
    };

    // Show the picker
    window.plugins.listpicker.showPicker(config,
        function(item) {
            success(item);
        },
        function() {
            //cancel fn
        }
    );


};
/**
 * Created by beens on 15/12/15.
 */




//cordova 打开一个网页

//install CLI
//cordova plugin add cordova-plugin-inappbrowser

//www
//https://www.npmjs.com/package/cordova-plugin-inappbrowser



//打开一个地址
//CAPP.WindowOpenUrl.open({
//    //打开的地址
//    url:"http://www.baidu.com",
//    //打开方式  _blank（app自身），_system（系统浏览器中）
//    target:"_blank",
//    //是否显示地址栏
//    location:false,
//    //初始是否隐藏。（可以用事件监听在加载完成后显示）
//    hidden:false,
//    //ios 关闭按钮文字
//    closebuttoncaption:"关闭",
//    //ios 关闭弹性滚动
//    disallowoverscroll:true,
//    //ios 允许自动播放
//    mediaPlaybackRequiresUserAction:true,
//    //ios 允许在线视频回退？
//    allowInlineMediaPlayback:true,
//    //打开页面切换效果 fliphorizontal,crossdissolve,coververtical
//    transitionstyle:"coververtical",
//    //关闭按钮位置  top,bottom
//    toolbarposition:"top",
//    //页面加载完成执行
//    loadedFn:function(){
//        this.show();    //显示页面     hidden=true时可以这样显示
//        var _this = this;
//        setTimeout(function(){
//            _this.close();  //页面关闭
//        },10000)
//    },
//    //需要注入的js和css文件  路径相对index.html
//    addJsFiles:["a.js",...],
//    addCssFiles:["a.css",...]
//});
//关闭打开的页面
//CAPP.WindowOpenUrl.close();
//显示  （初始隐藏时调用）
//CAPP.WindowOpenUrl.show();







if(!window.CAPP){CAPP = {};}


CAPP.WindowOpenUrl = {
    _obj:null,
    open:function(opt){
        var js_files = opt.addJsFiles || [],
            css_files = opt.addCssFiles || [],
            js_codes = "",
            css_codes = "",
            _this = this;

        this._readFiles(js_files,function(js){
            js_codes = js;
            _this._readFiles(css_files,function(css){
                css_codes = css;
                opt.addJsFiles = js_codes;
                opt.addCssFiles = css_codes;
                _this._run(opt);
            })
        });
    },
    _run:function(opt){
            //打开的地址
        var url = opt.url,
            //打开方式  _blank（app自身），_system（系统浏览器中）
            target = opt.target || "_blank",
            //是否显示地址栏
            location = opt.location || false,
            //是否隐藏。（可以用事件监听是否加载完成在显示）
            hidden = opt.hidden || false,
            //ios 关闭按钮文字
            closebuttoncaption = opt.closeButtonText || "关闭",
            //ios 关闭弹性滚动
            disallowoverscroll = opt.disallowoverscroll || true,
            //ios 允许自动播放
            mediaPlaybackRequiresUserAction = true,
            //ios 允许在线视频回退？
            allowInlineMediaPlayback = true,
            //打开页面切换效果 fliphorizontal,crossdissolve,coververtical
            transitionstyle = "coververtical",
            //关闭按钮位置  top,bottom
            toolbarposition = "top",
            loadedFn = opt.loadedFn || function(){},
            addJsCode = opt.addJsFiles || "",
            addCssCode = opt.addCssFiles || "";






        var options = {
            location:(location)? "yes" : "no",
            hidden:(hidden)? "yes" : "no",
            disallowoverscroll : (disallowoverscroll)? "yes" : "no",
            closebuttoncaption:closebuttoncaption,
            mediaPlaybackRequiresUserAction:(mediaPlaybackRequiresUserAction)? "yes" : "no",
            allowInlineMediaPlayback:(allowInlineMediaPlayback)?"yes":"no",
            transitionstyle: transitionstyle,
            toolbarposition:toolbarposition
        };
        var send_options = "";
        for(var key in options){
            if(options.hasOwnProperty(key)){
                send_options+= key+"="+options[key]+","
            }
        }
        send_options = send_options.substr(0,send_options.length-1);


        var _this = this;
        this._obj = cordova.InAppBrowser.open(url,target,send_options);
        this._obj.addEventListener("loadstop",function(){
            if(addJsCode){
                _this._obj.executeScript({code:addJsCode});
            }
            if(addCssCode){
                _this._obj.insertCSS({code:addCssCode});
            }
            loadedFn.call(_this);
        });
    },
    close:function(){
        this._obj.close();
    },
    show:function(){
        this._obj.show();
    },
    _readFiles:function(files,endFn){
        var texts = [];

        var getFile = function(filename){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', filename , true);
            xhr.responseType = 'text';
            xhr.onload = function() {
                texts.push(this.response);
                getFiles();
            };

            xhr.send();
        };

        var getFiles = function(){
            if(files.length == 0){
                endFn(texts.join(""));
            }else{
                var file = files.shift();
                getFile(file);
            }




        };

        getFiles();
    }
};/**
 * Created by beens on 15/12/16.
 */



//cordova 设备通知

//install CLI
//cordova plugin add cordova-plugin-dialogs

//www
//https://github.com/apache/cordova-plugin-dialogs




//alert
//CAPP.alert("信息内容",
//    {
//        title:"",     //标题， 默认值：提示
//        btnName:""    //按钮名称  默认：确定
//    }
//);
//confirm
//CAPP.confirm("信息内容",
//    {
//        title:"",     //标题， 默认值：提示
//        btnYes:"",    //确定按钮名称  默认：确定
//        btnEsc:"",    //取消按钮名称  默认：取消
//        success:function(){},  //点btnYes  执行
//        cancel:function(){}    //点btnEsc  执行
//    }
//);
//弹出输入对话框
//CAPP.prompt("信息内容",
//    {
//        title:"",     //标题， 默认值：提示
//        btnYes:"",    //确定按钮名称  默认：确定
//        btnEsc:"",    //取消按钮名称  默认：取消
//        val:"",       //输入框中显示的值  默认：空
//        success:function(){},  //点btnYes  执行
//        cancel:function(){}    //点btnEsc  执行
//    }
//);
//响起通知声音    number：响几次
//CAPP.beep(1);






if(!window.CAPP){CAPP = {};}

CAPP.alert = function(msg,opt){
    opt = opt || {};
    var title = opt.title || "提示",
        btn = opt.btnName || "确定",
        callback = opt.callback || function(){};

    navigator.notification.alert(msg, callback, title, btn);
};
CAPP.confirm = function(msg,opt){
    opt = opt || {};
    var title = opt.title || "提示",
        btnYes = opt.btnYes || "确定",
        btnEsc = opt.btnEsc || "取消",
        success = opt.success || function(){},
        cancel = opt.cancel || function(){};


    navigator.notification.confirm(msg, function(a){
        if(a == 1){
            success();
        }else{
            cancel();
        }
    }, title, [btnYes,btnEsc]);
};
CAPP.prompt = function(msg,opt){
    opt = opt || {};
    var title = opt.title || "提示",
        btnYes = opt.btnYes || "确定",
        btnEsc = opt.btnEsc || "取消",
        ts = opt.val || "",
        success = opt.success || function(){},
        cancel = opt.cancel || function(){};

    navigator.notification.prompt(
        msg,
        function(rs){
            if(rs.buttonIndex == 1){
                success(rs.input1);
            }else{
                cancel();
            }
        },
        title,
        [btnYes,btnEsc],
        ts
    )
};
CAPP.beep = function(times){
    navigator.notification.beep(times);
};/**
 * Created by beens on 15/12/17.
 */

//cordova loading

//install CLI
//cordova plugin add cordova-plugin-spinner

//www
//https://www.npmjs.com/package/cordova-plugin-spinner





if(!window.CAPP){CAPP = {};}

CAPP.loading = {
    show:function(text){
        SpinnerPlugin.activityStart(text);
    },
    hide:function(){
        SpinnerPlugin.activityStop();
    }
};/**
 * Created by beens on 16/3/23.
 */



//install CLI
//cordova plugin add cordova-plugin-network-information


//www
//https://www.npmjs.com/package/cordova-plugin-network-information



if(!window.CAPP){CAPP = {};}

CAPP.networkState = function(){
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'wifi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.CELL]     = 'Cell';
    states[Connection.NONE]     = false;

    return states[networkState];
};


