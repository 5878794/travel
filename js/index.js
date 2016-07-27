/**
 * Created by beens on 16/7/27.
 */



CAPP.ready(function(){
    INDEX.init();
});


var INDEX = {
    init:function(){
        this.playMovie();
        this.setVideoCss();
        this.bindEvent();
    },
    playMovie:function(){
        DEVICE.makeVideoPlayableInline({
            dom:$("#video"),     //要插入的dom
            videoSrc:"mp4/fll.mp4",  //视频地址
            autoPlay:true,    //自动播放
            loop:true,       //循环播放
            muted:false,     //是否静音
            isCordova:false   //是否是在cordova中使用
        });
    },
    setVideoCss:function(){
        var video = $("#video").find("video"),
            height = window.innerWidth*352/640,
            win_height = window.innerHeight,
            scale = win_height/height+0.1;

        video.css3({
            width:window.innerWidth+"px",
            transform:"scaleY("+scale+")"
        })
    },
    bindEvent:function(){
        var btn = $("#index_btn"),
            _this = this;

        btn.get(0).addEventListener(DEVICE.START_EV,function(){
            var dom = $(this);
            dom.css({background:"#e5e5e5"});
            setTimeout(function(){
                dom.css({background:"#fff"});
                _this.showLogin();
            },300);
        },false);

    },
    showLogin:function(){
        var dom = $("#index_main_body"),
            btn = $("#index_btn"),
            login = $("#index_login");

        var step1 = function(){
            btn.cssAnimate({
                opacity:0
            },400,function(){
                btn.css({display:"none"});
                step2();
            })
        };

        var step2 = function(){
            var height = window.innerHeight * 0.5;
            dom.cssAnimate({
                transform:"translateY(-"+height+"px)"
            },300,function(){
                login.css({display:"block"});
                step3();
            })
        };

        var step3 = function(){
            dom.cssAnimate({
                height:"3rem"
            },500,function(){
                step4();
            })
        };

        var step4 = function(){
            login.cssAnimate({
                opacity:1
            },300)
        };

        step1();
    }
};