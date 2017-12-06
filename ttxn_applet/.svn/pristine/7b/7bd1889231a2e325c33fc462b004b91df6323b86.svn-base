var util = require('../../../utils/util.js');
var player = require("../../common/player.js");
var app = getApp();
Page({
    data:{
        item: {
          playing: false,
          playTime: 0,
          maxTime: 0,
          endTime: '00:00',
          formatedPlayTime: '00:00'
        }
    },
    onLoad: function (options) {
    },
    onShow: function () {
      var that = this;
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          wx.getStorageSync("audioInfo").push(res.dataUrl);
          if (res.status === 0){
            that.pause(wx.getStorageSync("audioInfo"));
            if (res.currentPosition != undefined) {
              player.getDuration(wx.getStorageSync("audioInfo")[0], res.currentPosition);
            }
          } else if (res.status === 1){
            that.play(wx.getStorageSync("audioInfo"));
          }else{
            //player.getDuration(wx.getStorageSync("audioInfo")[0], res.currentPosition);
          }
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
    onHide: function(){
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
});
