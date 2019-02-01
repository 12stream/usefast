var util = require('../../../utils/util.js');
var player = require("../../common/player.js");
var app = getApp();
var host = app.globalData.globalUrl;
var audioArr=[];
Page({
  data: {
      conEmpty:0,

      loadingHidden: false,
      nullInfo: true,
      isHideLoadMore: true,
      loadingComplete: false,
      pageNum: 1,
      totalPage: '',
      playIndex:-1,
      todayList:[],
      ztList:[],
      gzList:[],

      fenxiang:0,
      fxSubjectId:0,
      fxAudioId:0,
      fxTitle:0,

      tip:0
  },
  onLoad: function () {
    this.getLearnRecord();
  },
  getLearnRecord: function () {
      var that = this;
      var dateArr = [];
      var dateFormArr = [];
      app.time.isToday(1504692741000)
      app.pAjax({
          url: host + '/applet/audioPlayRecord/getPlayRecordList',
          data: {
              'token': wx.getStorageSync("token"),
              'pageNum': that.data.pageNum,
              'pageSize': 30
          }
      }).then(function (res) {
          console.log(res);

          if(res.data.resultCode==0) {
              var arr = res.data.data.list.list;
              var todayList=[];
              var ztList=[];
              var gzList=[];
              for (var i in arr) {
                  //转化时间
                  arr[i].durationTime = app.time.sConversionTime(arr[i].totalTime);

                  //进度
                  let temp = app.progress.percentInt(arr[i].play_duration,arr[i].duration);
                  if (temp == 0) {
                      temp = "不足1"
                  }
                  arr[i].jingdu = temp;
                  //   区分时间
                  if (app.time.isToday(arr[i].play_date)) {
                          todayList.push(arr[i]);
                      } else if (app.time.isYesterday(arr[i].play_date)) {
                          ztList.push(arr[i]);
                      } else {
                          gzList.push(arr[i]);
                  }
              }
              that.setData({
                  conEmpty: !arr.length,
                  todayList:todayList,
                  ztList:ztList,
                  gzList:gzList,
              })
              console.log(that.data);
          }
      })

  },

    onShareAppMessage: function (e) {
      console.log(e);
        var that=this;
        that.fenxiangColse();
        var audioTo=that.data;
        console.log(audioTo);
        return {
            title:audioTo.fxTitle,
            path: "/pages/deatil/playAudio/playAudio?subjectId=" + audioTo.fxSubjectId + "&audioId=" + audioTo.fxAudioId + "&token=" + wx.getStorageSync("token")
        }
    },
    openfenxiang:function (e) {
      this.setData({
          fenxiang:1,
          fxSubjectId:e.target.dataset.subjectid,
          fxAudioId:e.target.dataset.audioid,
          fxTitle:e.target.dataset.title,
      });
    },
    fenxiangColse:function () {
        this.setData({
            fenxiang:0
        });
    },

    //跳转
    audioUrlBtn: function () {
        var audioTo = wx.getStorageSync("audioInfoXz");
        var audioInfo = wx.getStorageSync("playaudioArr");
        // if (audioInfo[0] == audioTo.audioId) {
        wx.navigateTo({
            url: "../../deatil/playAudio/playAudio?subjectId=" + audioTo.subjectId + "&audioId=" + audioTo.audioId + "&token=" + wx.getStorageSync("token")
        });
        // }
    },
//播放器
    onShow: function () {
        var that = this;

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
    playNow: function (e) {
        console.log(e);
        var that = this;
        if(e.currentTarget.dataset.isexist==1){
            wx.hideLoading()
            that.setData({tip:1});
            setTimeout(function () {
                that.setData({tip:0})
            },2000);
            return
        }
        clearInterval(wx.getStorageSync("timer"));
        var obj=wx.getStorageSync("audioInfoXz");
        obj.subjectId=e.currentTarget.dataset.subjectid;
        obj.audioId=e.currentTarget.dataset.audioid;
        obj.token=wx.getStorageSync("token");
        console.log(e.currentTarget.dataset.label);
        obj.label=e.currentTarget.dataset.label;
        wx.setStorageSync("audioInfoXz",obj);
        audioArr.length = 0;
        var audioId = e.currentTarget.dataset.audioid;
        var audio_ti = e.currentTarget.dataset.ti;
        var audio_img = e.currentTarget.dataset.img;
        audioArr.push(audioId, audio_ti, audio_img);
        wx.setStorageSync("audioInfo", audioArr);
        console.log(audioId);
        this.getAudio(audioId);
        this.setData({
            playIndex:e.currentTarget.dataset.index,
            sign: e.currentTarget.dataset.sign,
            playId: 'none',
        });
    },
    getAudio: function (audioId) {

        var that = this;
        app.ajax(function () {
            wx.request({
                url: app.globalData.globalUrl + '/applet/audio/getAudioInfoUrl',
                data: {
                    'audioId': audioId,
                    'token': wx.getStorageSync("token")
                },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    console.log(res);
                    // res.data.data.
                    audioArr.push(res.data.data.audioInfo.url);
                    that.play(audioArr);
                    wx.setStorageSync("playaudioArr", audioArr);
                },
                fail: function () { },
                complete: function () { }
            })
        });
    },
    play: function (arr) {
      console.log('play');
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
    },
})
