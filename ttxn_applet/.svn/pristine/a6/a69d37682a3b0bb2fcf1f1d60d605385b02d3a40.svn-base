var app = getApp();
var util = require('../../utils/util.js');
var prevAudio = '';
var nowAudio = '';
var context= wx.createCanvasContext('firstCanvas');

//动画圆
var deg=0;
var _that=null;
var _dhDegInterval=null;


var setDuration={
    audioId:0,
    time:0,
    open:1,
    bugOpen:1,
};

function time_to_sec(time) {
    var s = '';
    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];
    s = Number(hour * 3600) + Number(min * 60) + Number(sec);
    return s;
};
function play(arr,_this) {
    
    if(!_dhDegInterval){_dhDegInterval=setInterval(dhDeg,50);}
    wx.setStorageSync('pauseAudio', 1);
    //console.log(setDuration.audioId);
    setDuration.audioId=arr[0];
    if(setDuration.audioId!=arr[0]){
        setDuration.time=0
    }
    setDuration.open=1;
  var that = _this;
  if (prevAudio === ''){
      prevAudio = arr[0];
  }else{
    if (prevAudio != arr[0]){
        if (that.data.item.playTime === undefined) {
            that.data.item.playTime = 0;
        }
        if (that.data.item.playTime != 0){
            getDuration(prevAudio, that.data.item.playTime);
            prevAudio = arr[0];
        }
    }
  }
  wx.playBackgroundAudio({
    dataUrl:arr[3],
    title: arr[1],
    coverImgUrl: arr[2],
    complete: function (res) {
      wx.hideLoading();
      // //console.log(wx.getStorageSync("audioInfoXz").label);
      // //console.log(wx.getStorageSync("audioInfoXz"));
      that.setData({
        'item.audio_de.title': arr[1],
        'item.audio_de.coverImgUrl': arr[2],
        'item.audio_de.title2':arr[4],
        'item.audio_de.label':wx.getStorageSync("audioInfoXz").label,
        'item.playing': true
      });
      that.setData({ 'item.isShowPlayer': '104rpx', paddBott: '120rpx' });
    }
  })
  _this._enableInterval();
  app.globalData.backgroundAudioPlaying = true;
}
function pause(arr,_this) {
    clearInterval(_dhDegInterval);
    
    _dhDegInterval=null;
  var that = _this;
  wx.pauseBackgroundAudio({
    dataUrl: arr[3],
    title: arr[1],
    coverImgUrl: arr[2],
    complete: function (res) {
      that.setData({
        'item.audio_de.title': arr[1],
        'item.audio_de.coverImgUrl': arr[2],
        'item.playing': false
      });
      that.setData({ 'item.isShowPlayer': '104rpx', paddBott: '120rpx' });
    }
  })
    wx.setStorageSync('pauseAudio', 0);
  _this._enableInterval();
  app.globalData.backgroundAudioPlaying = false
}
function seek(time, _this) {
  // clearInterval(this.updateInterval)
  // wx.seekBackgroundAudio({
  //   position: time,
  //   complete: function () {
  //     // 实际会延迟两秒左右才跳过去
  //     setTimeout(function () {
  //       _this._enableInterval()
  //     }, 2000)
  //   }
  // })
}

function dhDeg(that){

    _that.setData({
        'item.deg':(deg+=2)
    });
}


function jindu (that,currentPosition,duration) {

    if(!currentPosition||!duration) {return};
    var i=parseInt((currentPosition/duration)*100);
    if(i>=97){i=100;}
    var rtghtZ=45;
    var leftZ=45;
    if(i>50){
        rtghtZ=225;
        var t=(i%50);
        if(t==0){
            leftZ=225
        }else{
            leftZ+=t*3.6
        }
    }else{

        rtghtZ+=i*3.6
    }
    that.setData({
        'item.jdRight':"transform: rotate("+rtghtZ+"deg);",
        'item.jfLeft':"transform: rotate("+leftZ+"deg);",
    });
}

function _enableInterval(_this) {
  var that = _this
  update()
    _that=_this;
  _this.updateInterval = setInterval(update, 1000)
    wx.onBackgroundAudioStop(function () {
        clearInterval(_dhDegInterval);
        _dhDegInterval=null;
    })
  function update() {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        if (isNaN(res.currentPosition)){
            res.currentPosition  = 0;
        }
          jindu(_this,res.currentPosition,res.duration);
        that.setData({
          'item.playTime': res.currentPosition,
          'item.maxTime': res.duration,
          'item.endTime': util.formatTime(res.duration),
          'item.formatedPlayTime': util.formatTime(res.currentPosition+1),
            'item.audio_de.label':wx.getStorageSync("audioInfoXz").label,
        })
      }
    })
  }
}
function load_player(_this) {
  var that = _this
  _this._enableInterval()
  if (app.globalData.backgroundAudioPlaying) {
    _this.setData({
      playing: true
    })
  }
}
function clearIntervalf(_this) {
  clearInterval(this.updateInterval)
}

function getDuration(audioId, duration) {
    if(!setDuration.open){return}
    setDuration.open=0;
    //console.log(setDuration);
    if(!duration){return}
    //console.log(audioId);
    //没有暂停的
    if(setDuration.audioId!=audioId){
        if(setDuration.time!=duration) {
            //bug id不同 还是会有上一次的 总时间
            setDuration.time=duration;
            wx.request({
                url: app.globalData.globalUrl + '/applet/audioPlayRecord/getPlayRecordDuration',
                data: {
                    'audioId': audioId, 'duration': duration, 'token': wx.getStorageSync("token")
                },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    setDuration.open=1;
                }
            })
        }
    }else{
        if(duration-setDuration.time>0){
            wx.request({
                url: app.globalData.globalUrl + '/applet/audioPlayRecord/getPlayRecordDuration',
                data: {
                    'audioId': audioId, 'duration': duration-setDuration.time, 'token': wx.getStorageSync("token")
                },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    setDuration.time=duration;
                    setDuration.open=1;
                }
            })
        }
    }
}
module.exports = {
  play: play,
  pause: pause,
  seek: seek,
  time_to_sec: time_to_sec,
  _enableInterval: _enableInterval,
  clearIntervalf: clearIntervalf,
  load_player: load_player,
  getDuration: getDuration
}
