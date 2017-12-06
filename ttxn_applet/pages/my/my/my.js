var util = require('../../../utils/util.js');
var player = require("../../common/player.js");
var app = getApp();
var host = app.globalData.globalUrl; 
var audioInfo = wx.getStorageSync("audioInfo");

//获取应用实例
var app = getApp();
Page({
  data: {
      timeToday:0,
      course:0,
      userInfo: {},
      days:'0',
      item:{
          playing: false,
          playTime: 0,
          maxTime: 0,
          endTime: '00:00',
          formatedPlayTime: '00:00'
      },
      hideIssuance:0,
  },
  onLoad: function () {

      var that = this;
      app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
              userInfo:userInfo
          })
      });
      app.pAjax({
          url: host + '/applet/common/getSwitch',
          data: { 'token': wx.getStorageSync("token")},
      }).then(function (res) {
          // console.log(res);


          if(res.data.data.version ==  app.version){
              that.setData({hideIssuance:(res.data.data.switch=="open" ? 1:0)});
          }
      });
  },
    //跳转
    audioUrlBtn:function () {
        var audioTo=wx.getStorageSync("audioInfoXz");
        var audioInfo=wx.getStorageSync("playaudioArr");

        // if(audioInfo[0]==audioTo.audioId){
            wx.navigateTo({
                url:"../../deatil/playAudio/playAudio?subjectId="+audioTo.subjectId+"&audioId="+audioTo.audioId+"&token="+wx.getStorageSync("token")
            });
        // }
    },
  getUserInfo: function () {
    var that = this;
    wx.request({
      url: host + '/applet/userInfo/getUserInfo',
      data: {
        'token': wx.getStorageSync("token")
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
          if (res.data.resultCode == 0) {
              let timeToday=0;
              (function (){
                  let temp=res.data.data.info.sumDuration;
                  if(temp){
                      timeToday=parseInt(temp/60);
                      if(temp%60>0){
                          ++timeToday;
                      }
                  }
              })();

            that.setData({
                timeToday:timeToday,
                course:res.data.data.info.sumCount,
            });
          }
      },
      fail: function () {
        //fail
      },
      complete: function () {
        // complete
      }
    })
  },
  isNull: function (data) {
    return (data == "" || data == undefined || data == null) ? "null" : false;
  },
  onShow: function () {


    var that = this;
      that.getUserInfo();
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        wx.getStorageSync("audioInfo").push(res.dataUrl);
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
  }
})
