//index.js
var util = require('../../assets/js/util.js');
var player = require("../common/player.js");
var NL_Date = require('../../assets/js/getDate.js');
var app = getApp();
var host = app.globalData.globalUrl;
var currentSubject = [];
var audioArr = [];
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({
    data: {
        imgUrls: [
            '/assets/images/banner.jpg'
        ],
        // newChange:{                                    //新增的绑定数据
        //      isNearly:'',                        //是否最新
        //      isSerial:'' ,                       //是否连载   
        //      serTime: ''                            //更新时间
        // },
        banner: [],
        playNum: 0,
        playNum2: 0,
        city: "",
        district: "",
        weather: {
            cdate: '',
            nlDate: NL_Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            cweather: "",
            c1: "",
            c2: ""
        },
        xz: true,
        zbavatar: '',
        newsId: "",
        item: {
            audio_de: {
                endTime: '00:00',
                formatedPlayTime: '00:00',
            },           //  模板数据
            playing: false,
            playTime: 0,
            maxTime: 0,
            title2: '123',
            title: '12345',
            label: '',
            jdRight: "transform: rotate(45deg);",
            jfLeft: "transform: rotate(45deg);",
        },
        hideIssuance: 0,

        //  课程列表 加载更多
        subjectList: [],
        subjectNum: 1,
        subjectPageSize: 6,
        reachBottom: 0,
        isHideLoadMore: 0,
        showMore: 0
    },
    onShow:function () {
    },
    disappearTime:function (e){
        var  idx=e.currentTarget.dataset.idx;
        this.data.subjectList[idx].show_time=false;
        this.data.subjectList[idx].is_update =0;

           this.setData({
               idx:idx,
               subjectList: this.data.subjectList
           })
    },
    onLoad: function (options) {
        app.load.open(this);
        var that = this;
        // this.loadInfo();
        this.getBanners();
    },
    onReady: function () {

    },

    onPullDownRefresh: function () {
        this.getBanners();
        this.setData({
            subjectNum: 1
        });
    },
    stopPullDownRefresh: function () {
        wx.stopPullDownRefresh({
            complete: function (res) {
                //console.log(res, new Date());
            }
        })
    },

    scroll: function (e) {
        // console.log(e)
    },
    getBanners: function () {

        var that = this;
        app.pAjax({
            url: host + '/applet/audioBanner/homePageBannerList',
            data: { 'token': wx.getStorageSync("token") },
        }).then(function (res) {

            var arr=res.data.data.list;
            arr=[0,1,0,0,0,0,0,0,0,0,0];
            if(arr.length>6){
                arr.splice(6,(arr.length-6))
            }
            wx.stopPullDownRefresh();
            that.setData({
                banner: res.data.data.list
            });
            hideI();

            that.getNjsubject();
        });
        function hideI() {
            app.pAjax({
                url: host + '/applet/common/getSwitch',
                data: { 'token': wx.getStorageSync("token") },
            }).then(function (res) {
                if (res.data.data.version == app.version) {
                    that.setData({ hideIssuance: (res.data.data.switch == "open" ? 1 : 0) });
                }
            });
        }
    },

    getXnthings: function () {
    },
    countTime:function (time){
        var what_time;
        var time = new Date(time).getTime();
        var now = new Date().getTime();
        var days = ((now - time) / (1000 * 3600 * 24));
        // console.log(days);
        if (days > 31) {
            what_time = "很久以前更新";
        } else if (days >= 1 && days <= 31) {
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
       
    },
    //最新 图标，更新时间
      update:function (obj){
          var that=this;
           //最新开始
            var isNear = '', create_timeArr = [];
            // console.log(arr.length);
            for (var i = 0, j = obj.length; i < j; i++) {
                // console.log(arr[i].create_time);
                //    obj[i].is_serial ==0? false : true;
                   obj[i].is_serial = obj[i].is_serial == 0 ? false : true;
                let timeStamp = new Date(obj[i].create_time);
                let time = timeStamp.getTime();
                let now = new Date().getTime();
                let days = ((now - time) / (1000 * 3600 * 24));
                // console.log(days);
                if (days > 7) {
                    isNear = false;
                } else {
                    isNear=true;
                }
                obj[i].isNear = isNear;
            };
            // //最新结束
            //什么时候开始更新
            for (var i = 0, j = obj.length; i < j; i++) {
                var what_time;
                // var time = new Date(obj[i].create_time).getTime();
                var time = new Date(obj[i].upTime);
                var now = new Date().getTime();
                var days =((now-time)/(1000*3600*24));
                // console.log(days);
                if (days > 31) {
                    what_time = "很久以前更新";
                } else if (days > 1 && days <= 31) {
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
                obj[i].what_time = what_time;                   
            };
          
            that.setData({
                subjectList: obj,
                reachBottom: 1,

            });
            
          app.load.close(that);
      },
    //获取课程
    getNjsubject: function () {
        var that = this;
        app.pAjax({
            // url: app.globalData.globalUrl + '/applet/audioSubject/audioSubjectList',
            url: app.globalData.globalUrl + '/applet/audioSubject/audioSubjectFreeList',
            data: {
                token: wx.getStorageSync("token"),
                pageNum: that.data.subjectNum,
                pageSize: that.data.subjectPageSize,
            },
        }).then(function (res) {
            console.log(res);

            var arr = res.data.data.list.list;
            that.update(arr);        //   调用   更新时间，最新图标 ，
            that.setData({
                subjectNum: that.data.subjectNum+1,
            });
            //最新开始
            // var isNear = '', create_timeArr = [];
            // console.log(arr.length);
            // for (var i = 0, j = arr.length; i < j; i++) {
            //     // console.log(arr[i].create_time);
            //     arr[i].is_serial ==0? false : true;
            //     let timeStamp = new Date(arr[i].create_time);
            //     let time = timeStamp.getTime();
            //     let now = new Date().getTime();
            //     let days = ((now - time) / (1000 * 3600 * 24));
            //     // console.log(days);
            //     if (days > 7) {
            //         isNear = false;
            //     } else {
            //         isNear=true;
            //     }
            //     arr[i].isNear = isNear;
            // };
            // //最新结束
            // //什么时候开始更新
            // for (var i = 0, j = arr.length; i < j; i++) {
            //     var what_time;
            //     var time = new Date(arr[i].create_time).getTime();
            //     var now = new Date().getTime();
            //     var days =((now-time)/(1000*3600*24));
            //     // console.log(days);
            //     if (days > 31) {
            //         what_time = "很久以前更新";
            //     } else if (days > 1 && days <= 30) {
            //         days = parseInt(days);
            //          what_time = days + "天以前更新"
            //     } else {
            //         days = days * 24;
            //         if (days >= 1) {
            //              what_time = parseInt(days) + "小时以前更新"
            //         } else {
            //             days = days * 60;
            //             if (days > 5) {
            //                  what_time = parseInt(days) + "分钟以前更新"
            //             } else {
            //                  what_time = "刚刚更新"
            //             }
            //         }
            //     }
            //     arr[i].what_time = what_time;                   
            // };
            // that.setData({
            //     subjectList: res.data.data.list.list,
            //     subjectNum: ++that.data.subjectNum,
            //     reachBottom: 1,

            // });
        });
    },
    bottomGetNjsubject: function () {

        var that = this;
        if (that.data.reachBottom) {
            that.setData({
                reachBottom: 0,
                isHideLoadMore: 1,
            });
            app.pAjax({
                // url: app.globalData.globalUrl + '/applet/audioSubject/audioSubjectList',
                url: app.globalData.globalUrl + '/applet/audioSubject/audioSubjectFreeList',
                data: {
                    token: wx.getStorageSync("token"),
                    pageNum: that.data.subjectNum,
                    pageSize: that.data.subjectPageSize,
                },
            }).then(function (res) {
                console.log(res);
                if (res.data.data.list.list.length < that.data.subjectPageSize) {
                    
                    var arr = that.data.subjectList.concat(res.data.data.list.list);
                    that.update(arr);
                    that.setData({
                        subjectList: arr,
                        subjectNum: that.data.subjectNum+1,
                        isHideLoadMore: 0,
                        showMore: 1,
                        reachBottom: 0,
                    });
                } else {
                    
                    var arr = that.data.subjectList.concat(res.data.data.list.list);
                    that.update(arr);
                    that.setData({
                        subjectList: arr,
                        subjectNum: that.data.subjectNum+1,
                        reachBottom: 1,
                        isHideLoadMore: 0,
                    });
                    
                }

            });
        }
    },
    onReachBottom: function (e) {
        this.bottomGetNjsubject();

    },
    //跳转
    audioUrlBtn: function () {
        var audioTo = wx.getStorageSync("audioInfoXz");
        var audioInfo = wx.getStorageSync("playaudioArr");
        // if (audioInfo[0] == audioTo.audioId) {
        wx.navigateTo({
            url: "../deatil/playAudio/playAudio?subjectId=" + audioTo.subjectId + "&audioId=" + audioTo.audioId + "&token=" + wx.getStorageSync("token")
        });
        // }
    },
    playAudio: function (e) {
        // console.log(this.data.item)
        audioArr.length = 0;
        var audio_id = e.currentTarget.dataset.id;
        var audio_ti = e.currentTarget.dataset.ti;
        var audio_img = e.currentTarget.dataset.img;
        audioArr.push(audio_id, audio_ti, audio_img);
        wx.setStorageSync("audioInfo", audioArr);
        this.getAudio(audio_id);
        var audioInfoXz = wx.getStorageSync("audioInfoXz")
        if (typeof audioInfoXz != "object") { audioInfoXz = {}; }
        wx.setStorageSync("audioInfoXz", Object.assign(audioInfoXz, { label: '学农资讯' }));
        this.setData({
            idx: e.currentTarget.dataset.idx,
            playId: 'none',
            playNum2: 0
        });
    },
    getAudio: function (audioId) {
        var that = this;
        app.pAjax({
            url: host + '/applet/audio/getAudioInfoUrl',
            data: { 'audioId': audioId, 'token': wx.getStorageSync("token") },
        }).then(function (res) {

            audioArr.push(res.data.data.audioInfo.url);
            that.play(audioArr);
            wx.setStorageSync("playaudioArr", audioArr);
        });
    },
    onShow: function () {
        //console.log(getApp().globalData);
        var that = this;
        if (wx.getStorageSync("isBuy")) {
            this.getNjsubject();
            wx.setStorageSync("isBuy", 0);
        }
        wx.getBackgroundAudioPlayerState({
            success: function (res) {

                that.setData({
                    playId: wx.getStorageSync("audioInfo")[0],
                    idx: 'none'
                });
                wx.getStorageSync("audioInfo").push(res.dataUrl);
                if (res.status === 0) {
                    that.pause(wx.getStorageSync("audioInfo"));
                    player.getDuration(wx.getStorageSync("audioInfo")[0], res.currentPosition);
                } else if (res.status === 1) {
                    that.play(wx.getStorageSync("audioInfo"));
                } else {
                    player.getDuration(wx.getStorageSync("audioInfo")[0], res.currentPosition);
                }
            }
        });
    },
    onHide: function () {
        this.setData({ 'item.isShowPlayer': '0', paddBott: '16rpx' });
    },
    onUnload: function () {
        player.clearIntervalf();
    },
    isNull: function (data) {
        return (data == "" || data == undefined || data == null) ? true : false;
    },
    playThingsAudio: function (e) {
        clearInterval(wx.getStorageSync("timer"));
        audioArr.length = 0;
        this.setData({
            playNum: 0
        });
        var that = this;

        if (e === undefined) {
            var funId = wx.getStorageSync("funId");
            var funImg = wx.getStorageSync("funImg");
        } else {
            var funId = e.currentTarget.dataset.id;
            var funImg = e.currentTarget.dataset.img;
            wx.setStorageSync("funId", funId);
            wx.setStorageSync("funImg", funImg);
        }
        app.ajax(function () {
            wx.request({
                url: host + '/applet/audioFun/getAudioFunList',
                data: { 'funId': funId, 'token': wx.getStorageSync("token") },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    wx.hideLoading();
                    // console.log(res);
                    var audioInfoXz = wx.getStorageSync("audioInfoXz")
                    if (typeof audioInfoXz != "object") { audioInfoXz = {}; }
                    wx.setStorageSync("audioInfoXz", Object.assign(audioInfoXz, { label: '学农趣事' }));
                    var playList = res.data.data.list;
                    var timerThings = null;
                    if (playList.length != that.data.playNum) {
                        audioArr.push(playList[that.data.playNum].id, playList[that.data.playNum].title, funImg);
                        wx.setStorageSync("audioInfo", audioArr);
                        audioArr.push(playList[that.data.playNum].url);
                        that.play(audioArr);
                        wx.setStorageSync("playaudioArr", audioArr);
                        wx.setStorageSync("timer", 'timerThings');
                        timerThings = setInterval(function () {
                            if (that.isNull(that.data.item.maxTime)) {
                                setTimeout(function () {
                                    that.setData({ 'item.maxTime': 'default' });
                                }, 500)
                            } else {
                                if (player.time_to_sec('00:' + that.data.item.formatedPlayTime) + 2 > that.data.item.maxTime) {
                                    that.setData({ playNum: ++that.data.playNum });
                                    that.nextPlay2(that, playList, that.data.playNum, funImg);
                                    if (that.data.playNum > playList.length - 1) { clearInterval(timerThings); }
                                }
                            }
                        }, 1000);
                    }
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                }
            })
        });
    },
    nextPlay2: function (that, playList, num, funImg) {
        if (num < playList.length) {
            audioArr.length = 0;
            audioArr.push(playList[num].id, playList[num].title, funImg);
            wx.setStorageSync("audioInfo", audioArr);
            that.getAudio(playList[num].id);
            that.setData({ playId: playList[num].id });
        }
    },
    lxPlay: function () {
        clearInterval(wx.getStorageSync("timer"));
        var that = this;
        var playList = that.data.xninfoList.list;
        var timerInfo = null;
        if (playList.length != that.data.playNum2) {
            that.setData({ idx: 'none' });
            audioArr.length = 0;
            audioArr.push(playList[that.data.playNum2].id, playList[that.data.playNum2].title, playList[that.data.playNum2].img);
            wx.setStorageSync("audioInfo", audioArr);
            that.getAudio(playList[that.data.playNum2].id);
            that.setData({ playId: playList[that.data.playNum2].id });
            wx.setStorageSync("timer", 'timerInfo');
            timerInfo = setInterval(function () {
                if (that.isNull(that.data.item.maxTime)) {
                    setTimeout(function () {
                        that.setData({ 'item.maxTime': 'default' });
                    }, 1000)
                } else {
                    if (player.time_to_sec('00:' + that.data.item.formatedPlayTime) + 2 > that.data.item.maxTime) {
                        that.setData({ playNum2: ++that.data.playNum2 });
                        that.nextPlay(that, playList, that.data.playNum2);
                        if (that.data.playNum2 > playList.length - 1) { clearInterval(timerInfo); }
                    }
                }
            }, 1000);
        }
    },
    nextPlay: function (that, playList, num) {
        that.setData({ playId: 'none' });
        if (num < playList.length) {
            audioArr.length = 0;
            audioArr.push(playList[num].id, playList[num].title, playList[num].img);
            wx.setStorageSync("audioInfo", audioArr);
            that.getAudio(playList[num].id);
            that.setData({ playId: playList[num].id });
        }
    },
    lxPlayBtn: function () {

        this.setData({
            playNum2: 0
        });
        var audioInfoXz = wx.getStorageSync("audioInfoXz")
        if (typeof audioInfoXz != "object") { audioInfoXz = {}; }
        wx.setStorageSync("audioInfoXz", Object.assign(audioInfoXz, { label: '学农资讯' }));
        this.lxPlay();
    },
    onShareAppMessage: function () {
        return {
            title: '天天学农两分钟，掌握农技更轻松',
            desc: '3步获取免费课程~~~',
            path: 'pages/index/index'
        }
    },
    play: function (arr) {
        if (arr.length >= 3) {
            player.play(arr, this);
        } else {
            player.play(wx.getStorageSync("playaudioArr"), this);
        }
    },
    pause: function (arr) {
        player.pause(arr, this);
    },
    _enableInterval: function () {
        player._enableInterval(this);
    },
    seek: function (e) {
        player.seek(110, this);
    }
})
