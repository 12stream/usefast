// var aldstat=require("/utils/ald-stat.js");
var ajax = require('/assets/js/ajax.js');
var pAjax = require('/assets/js/ajax2.js');
var Promise = require('/assets/js/promise.js');
var validate = require('/assets/js/validate.js');
var time = require('/assets/js/time.js');
var progress = require('/assets/js/progress.js');
var load = require('/assets/js/load.js');
var tip = require('/assets/js/tip.js');
var data = require('/assets/js/var.js');

var ajaxSign = 1;
var pr = null;
// var ajaxArr=[];
// var promise={};
// var num=0;
function onlaunch() {
    if (ajaxSign == 1) {
        ajaxSign = 0;
        pr = new Promise(ajax);
        pr.then(function () { ajaxSign == 0 })
    } else {
        pr.then(function () { ajaxSign == 0 })
    }
}
App({
    onLaunch: function () {
        wx.getSystemInfo({
            success: function(res) {
                if(res.system.indexOf('iOS')==0){
                    data.phone=true;
                }else{
                    data.phone=false;
                }
            }
        })
        //调用API从本地缓存中获取数据
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())



        // console.log(ajaxb);
        // console.log("ajax2-fn");
        /*
                success: function (res) {
            console.log(res);
            if (res.data.resultCode == 0) {
                that.setData({list: res.data.data.tags});
            }
        },
        fail: function (res) {
            console.log(0)
        }
        */
        // onlaunch();
    },
    onShow: function () {
        // onlaunch();
    },
    ajax: function (fn) {

        if (ajaxSign == 1) {
            ajaxSign = 0;
            pr = new Promise(ajax);
            wx.showLoading({ title: "载入中", mask: true, success: function () { }, fail: function () { }, complete: function () { } });
            pr.then(function () { fn(); ajaxSign = 1; })
        } else {
            pr.then(function () { fn(); })
        }
    },
    onEvent:function (_that) {
        var that=this;
        that.tip.onEvent(_that);
    },
    pAjax: pAjax,
    time:time,
    validate:validate,
    progress:progress,
    load:load,
    tip:tip,
    data:data,
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    // data: {
    //     item: {
    //         playing: false,
    //         playTime: 0,
    //         formatedPlayTime: '00:00:00'
    //     }
    // },
    //将秒钟转成00:00格式
    timeChange: function (time) {

        //分钟
        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        //秒
        var second = time % 60,
            seconds = parseInt(second);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var allTime = "" + minutes + "" + ":" + "" + seconds + "";
        return allTime;

    },
    //多少天，小时，分钟更新
    countTime: function (time) {
        time = new Date('2017/09/05 20:33').getTime();
        var time = time;
        var now = new Date().getTime();
        var days = (now - time) / (1000 * 3600 * 24);
        if (days > 31) {
            what_time = "很久以前更新";
        } else if (days > 1 && days <= 30) {
            days = parseInt(days);
            what_time = days + "天以前更新"
        } else {
            days = days * 24;
            if (days >= 1) {
                what_time = parseInt(days) + "小时以前更新"
            } else {
                days = days * 60;
                if (days > 5) {
                    what_time = parseInt(days) + "分钟以前更新"
                } else {
                    what_time = "刚刚更新"
                }
            }
        }
        return what_time;

    },
    globalData: {
        hideIssuance: 0,
        globalUrl: data.url,
        userInfo: null
    },
    version: 'v0.2',
});