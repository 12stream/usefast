var util = require('../../../utils/util.js');
var player = require("../../common/player.js");
var app=getApp();
var audioArr = [];
Page({
  data: {
    indexes:-1,
    arr:[],
    leg:0,
    playNum2: 0,
    item:{
      playing: false,
      playTime: 0,
      maxTime: 0,
      endTime: '00:00',
      formatedPlayTime: '00:00'
    }
  },
  onLoad: function (options) {
    var _this=this;
    _this.getList(options);
    var getList = setInterval(function(){
      if (_this.data.arr.length != 0) {
        clearInterval(getList);
        _this.autoPlay();
      }
    },1000)
  },
  onUnload: function () {
    //player.clearInterval();
  },
  getList: function(o){
    var _this = this;
    var dateFormArr = [];
    app.pAjax({
        url: app.globalData.globalUrl + '/applet/audio/getDurationAudio',
        data: {
            token: wx.getStorageSync("token"),
            duration: o.id
        },
        loading:1
    }).then(function (res) {
            for (var i = 0, listL = res.data.data.list.length; i < listL; i++) {
                dateFormArr.push(res.data.data.list[i].duration);
            }
            var newArr = dateFormArr.map(function (item) {
                return util.formatTime(item);
            })
            for (var k in res.data.data.list) {
                res.data.data.list[k]['playSj'] = newArr[k];
            }
            _this.setData({
                arr: res.data.data.list,
                leg: res.data.data.list.length
            });

    });
  },
  autoPlay: function(){
    clearInterval(wx.getStorageSync("timer"));
      var audioInfoXz=wx.getStorageSync("audioInfoXz")
      if(typeof audioInfoXz !="object"){audioInfoXz={};}
      wx.setStorageSync("audioInfoXz",Object.assign(audioInfoXz,{label:'随意听'}));
    var that = this;
    setTimeout(function(){
         audioArr.length = 0;
         var playList = that.data.arr;
         var timerVolun = null;
          if (playList.length != that.data.playNum2){
                audioArr.push(playList[that.data.playNum2].id, playList[that.data.playNum2].title, 'https://ttxuenong.oss-cn-shenzhen.aliyuncs.com/audio/images/37f0607b4b2b497986ad734b2ec24f8b.jpg');
                wx.setStorageSync("audioInfo", audioArr);
                audioArr.push(playList[that.data.playNum2].url);
                that.play(audioArr);
                wx.setStorageSync("playaudioArr", audioArr);
                that.setData({indexes: 'none',playId: playList[that.data.playNum2].id});
                wx.setStorageSync("timer", 'timerVolun');
                timerVolun = setInterval(function(){
                        if (that.isNull(that.data.item.maxTime)){ 
                            setTimeout(function(){
                              that.setData({ 'item.maxTime': 'default' });
                            },500)
                        }else{
                              if (player.time_to_sec('00:' + that.data.item.formatedPlayTime) + 2 > that.data.item.maxTime) {   
                                    that.setData({ playNum2: ++that.data.playNum2 });
                                    that.nextPlay(that, playList, that.data.playNum2,  playList[that.data.playNum2].url);
                                    if (that.data.playNum2 > playList.length - 1) { clearInterval(timerVolun); }
                              }
                        }
                      },1000);
          }
    },200) 
  },
  isNull: function (data) {
    return (data == "" || data == undefined || data == null) ? true : false;
  },
  nextPlay: function (that,playList,num,url){
      that.setData({ playId: 'none' });
    if (num < playList.length){
      audioArr.length = 0;
      audioArr.push(playList[num].id, playList[num].title, 'ttxuenong.oss-cn-shenzhen.aliyuncs.com/audio/images/37f0607b4b2b497986ad734b2ec24f8b.jpg');
      wx.setStorageSync("audioInfo", audioArr);
      wx.setStorageSync("playaudioArr", audioArr);
	    audioArr.push(url);
      that.play(audioArr);
      that.setData({ playId: playList[num].id });
    }
  },
    playAudio:function (e) {
        audioArr.length = 0;
        var audio_id = e.currentTarget.dataset.id;
        var audio_ti = e.currentTarget.dataset.ti;
        var audio_img = 'ttxuenong.oss-cn-shenzhen.aliyuncs.com/audio/images/37f0607b4b2b497986ad734b2ec24f8b.jpg';
        var audio_url = e.currentTarget.dataset.url;
        audioArr.push(audio_id, audio_ti, audio_img);
        this.setData({ indexes: e.currentTarget.dataset.idx, playId: 'none' });
        wx.setStorageSync("audioInfo", audioArr);
        audioArr.push(audio_url);
        this.play(audioArr);
        var audioInfoXz=wx.getStorageSync("audioInfoXz")
        if(typeof audioInfoXz !="object"){audioInfoXz={};}
        wx.setStorageSync("audioInfoXz",Object.assign(audioInfoXz,{label:'随意听'}));
        wx.setStorageSync("playaudioArr", audioArr);
    },
    onShow: function () {
      var that = this;
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          wx.getStorageSync("audioInfo").push(res.dataUrl);
          that.setData({playId: wx.getStorageSync("audioInfo")[0]});
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
    }
})