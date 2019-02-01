var util = require('../../../utils/util.js');
var player = require("../../common/player.js");
var app = getApp();
var audioArr = [];
// [{title:1,create_time:2,duration:3}]
Page({
    data: {
        totalRow:1000,
        img:1,
        list:[],
        isHideLoadMore: true,
        showMore:1,
        pageSize:10,
        pageNum:1,
        playNum2: 0,
        newsId:0,
        item: {
            playing: false,
            playTime: 0,
            maxTime: 0,
            endTime: '00:00',
            formatedPlayTime: '00:00',
        },
        sign:-1,
    },

    onLoad: function (o) {
        console.log('onLoad');
        this.setData({
            newsId: o.id
        });
        var _this=this;
        var dateFormArr = [];
        app.pAjax({
            url: app.globalData.globalUrl+'/applet/audioNews/audioNewsList',
            data: {
                token:wx.getStorageSync("token"),
                newsId:o.id ,
                pageNum: 1,
                pageSize:10,
            },
            loading:1
        }).then(function (res) {
            console.log(res);
            for (var i = 0, listL = res.data.data.list.list.length; i < listL; i++) {
                dateFormArr.push(res.data.data.list.list[i].duration);
            }
            var newArr = dateFormArr.map(function (item) {
                return util.formatTime(item);
            })
            for (var k in res.data.data.list.list) {
                res.data.data.list.list[k]['playSj'] = newArr[k];
            }
            _this.setData({
                img: res.data.data.list.list[0].big_img,
                totalRow:res.data.data.list.totalRow,
                pageNum: ++_this.data.pageNum,
                list:res.data.data.list.list
            });
            //临时变动

            console.log(_this.data);
        });
    },
    onUnload: function () {
        //player.clearIntervalf();
    },
    isNull: function (data) {
        return (data == "" || data == undefined || data == null) ? true : false;
    },
    playAll: function(){
        clearInterval(wx.getStorageSync("timer"));
        var that = this;
        setTimeout(function(){
            var playList = that.data.list;
            var timerList = null;
            if (playList.length != that.data.playNum2){
                // that.setData({sign: 'none',playId: playList[that.data.playNum2].id });
                audioArr.length = 0;
                audioArr.push(playList[that.data.playNum2].id, playList[that.data.playNum2].title, playList[that.data.playNum2].img);
               that.setAudioInfo(audioArr);
                audioArr.push(playList[that.data.playNum2].url);
                that.play(audioArr);
                wx.setStorageSync("playaudioArr", audioArr);
                wx.setStorageSync("timer", 'timerList');
                timerList = setInterval(function(){
                    if (that.isNull(that.data.item.maxTime)) {
                        that.setData({ 'item.maxTime': 1 });
                    } else {
                        if (player.time_to_sec('00:' + that.data.item.formatedPlayTime) + 2 > that.data.item.maxTime) {
                            that.setData({ playNum2: ++that.data.playNum2 });
                            that.nextPlay(that, playList, that.data.playNum2,playList[that.data.playNum2].url);
                            if (that.data.playNum2 > playList.length - 1) { clearInterval(timerList); }
                        }
                    }
                },1000);
            }
        },500)
    },
    //处理数据
    //跳转
    // audioUrlBtn:function () {
    //     var that=this;
    //     console.log("url");
    //     wx.navigateTo({
    //         url:"../../deatil/playAudio/playAudio",
    //     });
    // },
    setAudioInfo:function (audioArr) {
        var that=this;
        // wx.setStorageSync("audioInfoXz", {
        //     type:'news',
        //     page:that.data.pageNum,
        //     size:that.data.pageSize,
        //     audioId:that.data.audioId,
        // });
        wx.setStorageSync("audioInfo", audioArr);
    },
    playAllBtn: function(){
        this.setData({
            playNum2: 0
        });
        this.playAll();
    },
    nextPlay: function (that,playList,num,url){
        var that=this;
        if (num < playList.length){
            audioArr.length = 0;
            audioArr.push(playList[num].id, playList[num].title, playList[num].img);
            that.setAudioInfo(audioArr);
            audioArr.push(url);
            that.play(audioArr);
            wx.setStorageSync("playaudioArr", audioArr);
            that.setData({ playId: playList[num].id });
        }
    },
    onReachBottom: function (e ){
        if(this.data.showMore){
            var that=this;
            var dateFormArr = [];
            that.setData({isHideLoadMore: false});
            setTimeout(function () {
                app.pAjax({
                    url: app.globalData.globalUrl+'/applet/audioNews/audioNewsList',
                    data: {
                        token:wx.getStorageSync("token"),
                        newsId:that.data.newsId ,
                        pageNum: that.data.pageNum,
                        pageSize:10,
                    },
                    loading:1
                }).then(function (res) {
                    console.log(res);
                    if(res.data.data.list.list<that.data.pageSize){
                        that.setData({
                            showMore: 0
                        });
                    }
                    var arr = that.data.list.concat(res.data.data.list.list);
                    for (var i = 0, listL = res.data.data.list.list.length; i < listL; i++) {
                        dateFormArr.push(res.data.data.list.list[i].duration);
                    }
                    var newArr = dateFormArr.map(function (item) {
                        return util.formatTime(item);
                    })
                    for (var k in res.data.data.list.list) {
                        res.data.data.list.list[k]['playSj'] = newArr[k];
                    }
                    that.setData({
                        list: arr,
                        pageNum: ++that.data.pageNum,
                        isHideLoadMore: true,
                    });
                });
            },500);
        }
    },
    playAudio: function (e) {

        var that=this;
        audioArr.length = 0;
        var audio_id = e.currentTarget.dataset.id;
        var audio_ti = e.currentTarget.dataset.ti;
        var audio_img = e.currentTarget.dataset.img;
        this.setData({
            sign:e.currentTarget.dataset.sign,
            playNum2: 0,
            playId: 'none',
            audioId:e.currentTarget.dataset.id
        });
        var audio_url = e.currentTarget.dataset.url;
        audioArr.push(audio_id, audio_ti, audio_img);
        that.setAudioInfo(audioArr);
        audioArr.push(audio_url);
        this.play(audioArr);
        wx.setStorageSync("playaudioArr", audioArr);
    },
    onShow: function () {
        // console.log('onShow');
        var that = this;
        wx.getBackgroundAudioPlayerState({
            success: function (res) {
                that.setData({
                    playId: wx.getStorageSync("audioInfo")[0],
                    sign:-1
                });
                wx.getStorageSync("audioInfo").push(res.dataUrl);
                if (res.status === 0) {
                    that.pause(wx.getStorageSync("audioInfo"));
                    player.getDuration(wx.getStorageSync("audioInfo")[0], res.currentPosition);
                } else if (res.status === 1) {
                    that.play(wx.getStorageSync("audioInfo"));
                }
            }
        });
    },
    onHide: function () {
        this.setData({ 'item.isShowPlayer': '0', paddBott: '16rpx' });
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
    seek: function () {
        wx.seekBackgroundAudio({
            position: 180
        })
    }
})