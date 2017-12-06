var app = getApp();
var util = require('../../../utils/util.js');
var player = require("../../common/player.js");
var host = app.globalData.globalUrl;
var audioArr = [];
var token = '';
var subjectIdc = '';
var WxParse = require('../../../assets/wxParse/wxParse.js');
var that=null;
Page({
    data: {
        many_remark:66,   // 默认评论数  
        two_one:false,          //默认 课程内容隐藏
        isFixed: false,
        l_title: '',
        s_title: '',
        l_img: '',
        filter_op: '',
        head1_img: '',
        alter_user: '',
        now_price: 0,
        times: '',
        content: '',
        isBuy: "已购买",
        tryListen: '',    //能否试听
        list: [],
        showModal: false,
        loadingHidden: false,
        look_height: 160,
        xz: 0,
        showAlert: 0,
        sign: -1,
        playNum2: 0,
        item: {
            playing: false,
            playTime: 0,
            maxTime: 0,
            endTime: '00:00',
            formatedPlayTime: '00:00',
        },
        state_nav: 0,
        topP: 219,
        topP2: null,
        isCollect: null,  //shi否收藏
        audioPageUrl: '../playAudio/playAudio',
        text: '大话水浒是非得失是非得\n失',
        get: 0,
        hideMoneyBox: 0,
        tip:{
            tip:0,
            tipText:''
        },

    //    课程兑换码
        isCode:0,
        isExchange:0,
        dhm:0,
        WeChat:'',
        dhfz:0,
        btnNO:1,
        codeMsg:'',
    },

    onLoad: function (o) {
        var _this= this;

            that =this;
        app.onEvent(that);
        
        app.load.open(this);
        that.openCodeAlert();
        // console.log(o);
         wx.setStorageSync('show_time', 'false')
        this.storageEleinfo('v-banner')
        this.storageEleinfo('v-banner')

        if(o.subjectId){
            that.setData({
                onShowGetList:0,
                subjectId: o.subjectId
            });
        }
        this.getCouresDetails(o);

    },
    // onPageScroll: function (e) {
    //     this.storageEleinfo('cd-text')
    //     var opNum = e.scrollTop
    //     var that = this
    //     wx.getStorage({
    //         key: 'v-banner-height',
    //         success: function (res) {
    //             that.setData({
    //                 look_height: res.data
    //             })
    //         },
    //     })
    //     if (opNum == 0) {
    //         that.setData({
    //             filter_op: "opacity:0;display:none!important"
    //         })
    //     } else if (opNum > that.data.look_height - 44) {
    //         that.setData({
    //             filter_op: "opacity: 1;display:flex" 
    //         })
    //     } else {
    //         var change = opNum / (that.data.look_height)
    //         that.setData({
    //             filter_op: "opacity:"+change+";display:flex"
    //         })
    //     }
    // },
    adquirePosition: function (ele) {
        var that = this;
        var query = wx.createSelectorQuery()
        query.select(ele).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
            res[0].top
        })
    },
    storageEleinfo: function (el) {
        var query = wx.createSelectorQuery()
        query.select('.' + el).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
            res[0].top
            wx.setStorage({
                key: el + '-height',
                data: res[0].height
            })
        })
    },
    clickTo: function (ele) {
        var that = this;
        var query = wx.createSelectorQuery()
        query.select('#' + ele).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
            res[0].top
            wx.pageScrollTo({
                scrollTop: that.data.topP - 40
            })
        })
    },
    productLesson: function (res) {
        var that = this;
        that.setData({
            state_nav: 0,
            two_one:false
        })
        // that.clickTo('target-fixed');
    },
    contentLesson: function (res) {
        var that = this;
        that.setData({
            state_nav: 1,
            two_one: true
        })
        wx.getStorage({
            key: 'cd-text-height',
            success: function (res) {
                that.setData({
                    topP2: res.data
                })
            }
        })
        // wx.pageScrollTo({
        //     scrollTop: 270 + that.data.topP2
        // })
    },

    //    课程兑换码
    isDhPower:function () {
        if(that.data.isCode==1){
            if(that.data.isExchange==1){
                return true
            }else{
                return false
            }
        }else{
            return true
        }
    },
    openCodeAlert:function () {
        if (that.isDhPower()){
            return true
        }else{
            that.setData({dhm:1});
            return false
        }
    },
    closeCodeAlert:function () {that.setData({dhm:0});},
    copyWeChat:function () {wx.setClipboardData({data:that.data.WeChat, success: function(res) {that.setData({dhfz:1});setTimeout(function () {that.setData({dhfz:0});},2000)}})},
    sendCode:function (e) {
        if(that.data.btnNO){
            if(e.detail.value.input.trim()==''){
                that.setData({
                    codeMsg:'请输入兑换码'
                });
                setTimeout(function(){
                    that.setData({
                        codeMsg:''
                    });
                },2000);
                return
            }
            that.setData({btnNO:0});
            setTimeout(function(){that.setData({btnNO:1});},5000);
            wx.request({
                url: host+'/applet/redeem/findUserRedeem',
                data: {
                    token:wx.getStorageSync("token"),
                    redeemCode :e.detail.value.input ,
                    subjectId :that.data.subjectId
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    console.log(res);
                    that.setData({
                        btnNO:1
                    });
                    if(res.data.resultCode==0){

                        if(res.data.data.result.isExist==1){
                            that.closeCodeAlert();
                            that.tooltip("兑换成功");
                            that.setData({
                                isExchange:1,
                            });
                        }else{
                            that.setData({
                                codeMsg:res.data.data.result.isExistMsg
                            });
                            setTimeout(function(){that.setData({codeMsg:''});},2000)
                        }
                    }
                }
            })
        }
    },
    //end课程兑换码

    lessonCollect: function (op) {
        var that = this;
        wx.request({
            url: host + '/applet/collect/saveSubjectCollect',
            data: {
                token: wx.getStorageSync("token"),
                subjectId: this.data.subjectId
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                // console.log(res)
                that.data.isCollect = !that.data.isCollect
                if (that.data.isCollect == 1) {
                    that.setData({
                        isCollect: 1
                    })
                    wx.showToast({
                        title: '收藏成功',
                        duration: 1000
                    })
                } else {
                    that.setData({
                        isCollect: 0
                    })
                    wx.showToast({
                        title: '取消成功',
                        duration: 1000
                    })
                }
            },
            fail: function () {
                console.log('获取失败')
            }
        })
    },
    onUnload: function () {
        player.clearIntervalf();

    },
    ifLove: function (op) {
        this.lessonCollect();
    },
    audioUrlBtn: function () {
        var that = this;
        if (that.data.isBuy || !that.data.current_price) {
            var audioTo = wx.getStorageSync("audioInfoXz");
            var audioInfo = wx.getStorageSync("playaudioArr");
            wx.navigateTo({
                url: "../playAudio/playAudio?subjectId=" + audioTo.subjectId + "&audioId=" + audioTo.audioId + "&token=" + wx.getStorageSync("token")
            });
        }
    },
    getCouresDetails: function (o) {
        var _this,
            that = this;
        app.pAjax({
            url: app.globalData.globalUrl + '/applet/audioSubject/getSubjectDetails',
            data: {
                token: wx.getStorageSync("token"),
                pageNum: 1,
                pageSize: 50,
                subjectId: o.subjectId || o.id
            },
            loading: true
        }).then(function (res) {
            console.log(res);
            var many_remark = res.data.data.commentCount.commentCount;
                if (many_remark>=99){
                   many_remark= "99+";
                 }else{
                   many_remark=many_remark;
                 }
                ;
            var timeArr = [];
            for (var i = 0, j = res.data.data.list.list.length; i < j; i++) {
                timeArr.push(app.timeChange(res.data.data.list.list[i].duration));
            }
            for (var i = 0, j = res.data.data.list.list.length; i < j; i++) {
                res.data.data.list.list[i].duration = timeArr[i];
            }
            WxParse.wxParse('insertData', 'html', (res.data.data.list.list[0].content).trim(),that);

            that.setData({
                many_remark:many_remark,
                get: 1,
                hideMoneyBox: 1,
                l_title: res.data.data.list.list[0].l_title,
                isCollect: res.data.data.list.list[0].msg == '课程未收藏' ? 0 : 1,
                s_title: res.data.data.list.list[0].s_title,
                l_img: res.data.data.list.list[0].l_img,
                s_img: res.data.data.list.list[0].s_img,
                head1_img: res.data.data.list.list[0].img,
                teacher_name: res.data.data.list.list[0].teacher_name,
                now_price: res.data.data.list.list[0].current_price,
                current_price: res.data.data.list.list[0].current_price,
                original_price: res.data.data.list.list[0].original_price,
                times: res.data.data.list.list[0].times,
                content: (res.data.data.list.list[0].content).trim(),

                isBuy: (res.data.data.list.list[0].isBuy == '已购买' ? 1 : 0),
                list:res.data.data.list.list,
                loadingHidden: true,
                head_img: res.data.data.list.list[0].img,
                durations: util.toTimeHMS(res.data.data.list.list[0].durations),
                isCode:res.data.data.isCode.isCode,
                isExchange:res.data.data.isCode.isExchange,
                WeChat:res.data.data.isCode.wxCode,
            });
            setTimeout(function () {app.load.close(that);},200)
            //    是否可以试听
            // for (var i = 0, j = that.data.list.length; i < j; i++) {
            //     if (that.data.list[i].audio_status == 1) {
            //         // wx.setStorageSync('isTry', true)
            //         that.setData({
            //             tryListen: true
            //         })
            //         return false
            //     } else {
            //         that.setData({
            //             tryListen: false
            //         })
            //     }
            // }

        });
    },
    getAudio: function (audioId) {
        var that = this;

        app.ajax(function () {
            wx.request({
                url: app.globalData.globalUrl + '/applet/audio/getAudioInfoUrl',
                data: {
                    'audioId': audioId,
                    'subjectId': subjectIdc,
                    'token': wx.getStorageSync("token")
                },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {

                    // console.log(res);
                    audioArr.push(res.data.data.audioInfo.url);
                    that.play(audioArr);

                    wx.setStorageSync("playaudioArr", audioArr);
                },
                fail: function () { },
                complete: function () { }
            })
        });
    },
    isNull: function (data) {
        return (data == "" || data == undefined || data == null) ? true : false;
    },
    playNow: function (e) {
        if(!that.openCodeAlert()){return false}
        clearInterval(wx.getStorageSync("timer"));
        audioArr.length = 0;
        var audioId = e.currentTarget.dataset.id;
        var audio_ti = e.currentTarget.dataset.ti;
        var audio_img = e.currentTarget.dataset.img;
        audioArr.push(audioId, audio_ti, audio_img);
        wx.setStorageSync("audioInfo", audioArr);
        // console.log(wx.getStorageSync('audioInfo'))
        this.getAudio(audioId);
        this.setData({
            sign: e.currentTarget.dataset.sign,
            playId: 'none',
        });

        if (that.data.isBuy || !that.data.current_price) {
            wx.setStorageSync("audioInfoXz", {
                subjectId: that.data.subjectId,
                audioId: audioId,
                token: wx.getStorageSync("token"),
                label: that.data.l_title
            });
            wx.setStorageSync("audioInfoList", that.data.list);
        }

    },
    startPlay: function () {
        clearInterval(wx.getStorageSync("timer"));
        var that = this;
        var playList = that.data.list;
        var timerCourse = null;
        if (playList.length != that.data.playNum2) {
            that.setData({
                sign: 'none'
            });

            audioArr.length = 0;
            audioArr.push(playList[that.data.playNum2].infoId, playList[that.data.playNum2].title, playList[that.data.playNum2].s_img);
            wx.setStorageSync("audioInfo", audioArr);
            that.getAudio(playList[that.data.playNum2].infoId);
            that.setData({
                playId: playList[that.data.playNum2].infoId
            });

            wx.setStorageSync("audioInfoXz", {
                subjectId: that.data.subjectId,
                audioId: playList[that.data.playNum2].infoId,
                token: wx.getStorageSync("token"),
                label: that.data.l_title
            });
            wx.setStorageSync("timer", 'timerCourse');

            timerCourse = setInterval(function () {

                if (that.isNull(that.data.item.maxTime)) {

                    setTimeout(function () {
                        that.setData({
                            'item.maxTime': 'default'
                        });
                    }, 500)
                    if (that.data.playNum2 >= playList.length ) {
                        clearInterval(timerCourse);
                    }
                } else {

                    if (player.time_to_sec('00:' + that.data.item.formatedPlayTime) + 2 > that.data.item.maxTime) {
                        that.setData({
                            playNum2: ++that.data.playNum2
                        });

                        that.nextPlay(that, playList, that.data.playNum2);
                        if (that.data.playNum2 > playList.length - 1) {
                            player.clearIntervalf(that);
                            clearInterval(timerCourse);
                        }
                    }
                }
            }, 1000);
        }
    },
    nextPlay: function (that, playList, num) {
        that.setData({
            playId: 'none'
        });
        if (num < playList.length) {
            audioArr.length = 0;
            audioArr.push(playList[num].infoId, playList[num].title, playList[num].s_img);
            wx.setStorageSync("audioInfo", audioArr);
            that.getAudio(playList[num].infoId);
            that.setData({
                playId: playList[num].infoId
            });
        }
    },
    startPlayBtn: function () {
        if(!that.openCodeAlert()){return false}
        this.setData({playNum2: 0});
        this.startPlay();
    },
    playTest: function () {
        var that = this;
        var playList = that.data.list;
        audioArr.length = 0;
        for (var i = 0, listL = playList.length; i < listL; i++) {
            if (playList[i].audio_status === '1') {
                audioArr.push(playList[i].infoId, playList[i].title, playList[i].s_img);
                wx.setStorageSync("audioInfo", audioArr);
                that.getAudio(playList[i].infoId);
                that.setData({
                    playId: playList[i].infoId
                });
            }
        }
       // wx.removeStorage({ key: "audioInfoXz" });
    },
    buyAlertBtn: function () {
        this.setData({
            showAlert: 1
        });
    },
    alertColse: function () {
        this.setData({
            showAlert: 0
        });
    },
    onShareAppMessage: function () {
        return {
            title: this.data.l_title,
            desc: this.data.s_title,
            path: 'pages/deatil/courseDetails/courseDetails?subjectId=' + this.data.subjectId
        }

    },

    onShow: function () {
        var that = this;
        if(wx.getStorageSync("onShowGetList")){
            wx.setStorageSync('onShowGetList',0);
            that.getCouresDetails({subjectId:wx.getStorageSync("audioInfoXz").subjectId});
        }
        wx.getBackgroundAudioPlayerState({
            success: function (res) {
                // console.log(res);
                wx.getStorageSync("audioInfo").push(res.dataUrl);
                that.setData({
                    playId: wx.getStorageSync("audioInfo")[0],
                    sign: wx.getStorageSync("audioInfo")[4]
                });
                if (res.status === 0) {
                    that.pause(wx.getStorageSync("audioInfo"));
                    if (res.currentPosition != undefined) {
                        player.getDuration(wx.getStorageSync("audioInfo")[0], res.currentPosition);
                    }
                } else if (res.status === 1) {
                    that.play(wx.getStorageSync("audioInfo"));
                }
            }
        });
    },
    onHide: function () {
        this.setData({
            'item.isShowPlayer': '0',
            paddBott: '16rpx'
            
        });
    },
    play: function (arr) {
        var that = this;
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
    }
})

