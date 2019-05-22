var app=getApp();
var util = require('../../../utils/util.js');
var player = require('../../common/player.js');
var that=null;
var audioCtx=null;
Page({
    data: {
        // audioList:['http://sc1.111ttt.com/2016/1/09/28/202280605509.mp3','https://xuenong.b0.upaiyun.com/audio/files/201708/e871025a3bac4157b5a71dafbc8279f6.mp3'],
        audioType:-1,
        audioList:[],
        audioLength:0,
        audioNumber:0,
        audioSign:0,
        stopTime:null,
        audioId:0,
        automaticPlay:0,

        //正常进来

        audoPlay:1,
        //
        mp3:'',
        //播放记录
        PlayRecordList:[],
        playRecorColse:0,
        recorAutomaticPlay:0,
        // jtAudio:0,
        downloadPercent:0,

        playlistColse:0,
        playListIndex:0,

        btnSign:1,

        percent:0,
        percentText:0,

        audioMaxTime:100,
        audioMaxTimeText:0,
        lImg:'',
        title:'',
        subjectId:'',
        msg:"",

        live:0,
        liveNum:0,

        plNum:0,

        tip:0
    },
    /*
     * 生命周期函数--监听页面加载
     * pages/deatil/playAudio/playAudio?subjectId=c6524558f52843b4b756525f883abca1
     https://xue.dfs168.com/applet/audioNews/audioNewsList?token=f4ce9f4eeb1a51e8c2fc77b64f82e83f&
     newsId=da3d626faa384520bdc6e16189344b92&pageNum=1&pageSize=10

    subjectId:o.subjectId||'c6524558f52843b4b756525f883abca1',
    id:o.id||'da3d626faa384520bdc6e16189344b92'
     */
    onLoad: function (uo) {
        that=this;
        var o=wx.getStorageSync("audioInfoXz");
        // audioCtx = wx.createAudioContext('myAudio')
        console.log(uo);
        if(wx.getStorageSync("token")!=uo.token){
            if( wx.getStorageSync('pauseAudio')){
                that.setData({
                    automaticPlay:1
                });
            }
            //分享
            that.getFxAudioList(uo);
        }else{
            //播放历史
            
            if(uo.to){
                that.setData({recorAutomaticPlay:1});
                that.recorToGetAudioList(uo);
            }else{
                //进来
                // that.onLoadInit();
                // that.setData();
                that.getFxAudioList(uo);
            }

        }
        that.getPlayRecord();
    },
    onLoadInit:function () {

        var that=this;
            var o=wx.getStorageSync("audioInfoXz");
            // console.log(o);
            // if(o.subjectId){
            var mp3Url=wx.getStorageSync("playaudioArr");

            this.setData({
                subjectId:o.subjectId,
                id:o.id,
                audioId:o.audioId,
                audioType:o.type,
                mp3:mp3Url[mp3Url.length-1],
            });
            this.getAudioList();
            // }else{
            //
            // }
    },
    onShow:function (e) {
        //console.log(e);
        var that=this;
    },
    onUnload: function () {
        var that=this;
        //console.log("onUnload");
        // clearInterval(wx.getStorageSync("timer"));
            clearInterval(that.data.stopTime);
            wx.setStorageSync("audioInfoList",that.data.audioList);
            wx.setStorageSync('onShowGetList',1);
        // var onUnObj={
        //     zx:function () {
        //         that.setDAtaAudio();
        //         var arr=that.data.audioList;
        //         var index=that.data.audioNumber;
        //
        //         wx.setStorageSync('audioInfo',[
        //             arr[index].id,arr[index].title,arr[index].img,that.data.mp3
        //         ]);
        //         wx.setStorageSync('playaudioArr',[
        //             arr[index].id,arr[index].title,arr[index].img,that.data.mp3
        //         ])
        //         var obj=wx.getStorageSync('audioInfoXz')
        //         obj.audioId=arr[index].id
        //         wx.setStorageSync('audioInfoXz',obj)
        //     },
        //     kc:function () {
        //         var arr=that.data.audioList;
        //         var index=that.data.audioNumber;
        //
        //         wx.setStorageSync('audioInfo',[
        //             // arr[index].infoId,arr[index].title,arr[index].s_img,that.data.mp3,index
        //             arr[index].infoId,arr[index].title,arr[index].s_img
        //         ]);
        //         wx.setStorageSync('playaudioArr',[
        //             arr[index].infoId,arr[index].title,arr[index].s_img,that.data.mp3
        //         ])
        //         var obj=wx.getStorageSync('audioInfoXz')
        //         obj.audioId=arr[index].infoId
        //         wx.setStorageSync('audioInfoXz',obj)
        //     }
        // }

    },
    //分享
    getFxAudioList:function (o) {
        var that=this;
        app.pAjax({
            url: app.globalData.globalUrl + '/applet/audioSubject/getSubjectDetails',
            data: {
                token: wx.getStorageSync("token"),
                pageNum: 1,
                pageSize: 50,
                subjectId: o.subjectId || o.id
            },
        }).then(function (res) {
            // console.log(res);

            // current_price
            // isBuy

            console.log(res);
            that.setData({
                plNum:res.data.data.commentCount.commentCount
            });
            var data=res.data.data.list.list;
            if(data[0].isBuy=="已购买"||data[0].current_price==0){

                o.label=data[0].l_title;
                wx.setStorageSync("audioInfoXz",o);
                wx.setStorageSync("audioInfoList",data);
                that.onLoadInit();
            }else{
                wx.showModal({
                    title: '',
                    content: '此音频是付费版',
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url:"../courseDetails/courseDetails?subjectId="+o.subjectId,
                            });
                        } else if (res.cancel) {

                        }
                    }
                })

            }

        });

    },
    //取数组
    getAudioList:function () {
        var that=this;
        
        var obj={
            //质询趣事
            zxqs:function () {
                obj.getList()
            },
            getList:function () {
                var res=wx.getStorageSync("audioInfoList");
                console.log(res);

                var arr=res;

                var t=-1;
                for(var i in arr){
                    if(that.data.audioId==arr[i].infoId){t=i;break;}
                    if(that.data.audioId==arr[i].id){t=i;break;}
                }
                if(t==-1){t=0}

                that.setData({
                    title:res[t].title,
                    lImg:res[0].s_img,
                    audioList:res,
                    audioLength:res.length,
                    audioNumber:parseInt(t),
                    live:res[0].msg,
                    msg:res[0].msg,
                    liveNum:res[0].sumCount
                });
                that.playAudioInit();
            }
        }
        obj.getList()
    },
    onShareAppMessage:function (e) {
        var that=this;
        var audioTo=wx.getStorageSync("audioInfoXz");
        return {
            title:that.data.audioList[0].title,
            path: "/pages/deatil/playAudio/playAudio?subjectId=" + audioTo.subjectId + "&audioId=" + audioTo.audioId + "&token=" + wx.getStorageSync("token")
        }
    },
    //收藏
    liveBtn:function (e) {
        // console.log(e);
        // console.log(e.currentTarget.dataset.audioid);
        var that=this;
        // console.log(that.data.audioId);
        wx.request({
            url: app.globalData.globalUrl + '/applet/collect/saveSubjectCollect',
            data: {
                token: wx.getStorageSync("token"),
                subjectId: this.data.subjectId,
                audioId:e.currentTarget.dataset.subjectid
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                // console.log(res);
                if (res.data.resultCode == 0) {
                    // that.data.audioList[0].msg=(that.data.msg=='课程已收藏'? '课程未收藏':'课程已收藏');
                    that.setData({
                        msg:(that.data.msg=='课程已收藏'? '课程未收藏':'课程已收藏'),
                    })
                    // console.log(that.data.audioList);
                }
            }
        })
    },
    //播放记录
    getPlayRecord:function () {

        var that=this;
        var host=app.globalData.globalUrl;
        wx.request({
            url: host + '/applet/audioPlayRecord/getPlayRecordList',

            data: {
                token: wx.getStorageSync("token"),
                pageSize:30,
                pageNum:1
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res);
                if (res.data.resultCode == 0) {
                    var arr= res.data.data.list.list;
                    for(var i in arr){
                        var bfb=parseInt((arr[i].play_duration/arr[i].totalTime)*100);
                        if(bfb>100){bfb=100}
                        arr[i].play_duration=bfb;
                        arr[i].play_date=app.time.timeDifference(arr[i].play_date);
                    }
                    that.setData({PlayRecordList: res.data.data.list.list});
                }
            }
        })
    },
    recorToGetAudioList:function (o) {
        var that=this;

        app.pAjax({
            url: app.globalData.globalUrl + '/applet/audioSubject/getSubjectDetails',
            data: {
                token: wx.getStorageSync("token"),
                pageNum: 1,
                pageSize: 50,
                subjectId: o.subjectId
            },
        }).then(function (res) {

            console.log(res);
            wx.setStorageSync("audioInfoList",res.data.data.list.list);

            that.onLoadInit();
        });
    },

    playRecorColse:function () {
      this.setData({
          playRecorColse:0
      });
    },
    playRecorOpen:function () {
        this.setData({
            playRecorColse:1
        });
    },
    playRecordAudio:function (e) {

        var that=this;
        var arr=  that.data.audioList;
        var sign=1;

        if(e.currentTarget.dataset.isexist==1){
            wx.hideLoading()
            that.setData({tip:1});
            setTimeout(function () {
                that.setData({tip:0})
            },2000);
            return
        }

        for(var i in arr){
            if(arr[i].infoId==e.currentTarget.dataset.audioid){
                that.setDAtaAudio();
                that.playAudio(parseInt(i));
                sign=0;
                that.playRecorColse();
                break;
            }
        }
        if(sign){
            var obj=wx.getStorageSync('audioInfoXz');
            obj.subjectId=that.data.PlayRecordList[i].subject_id;
            obj.audioId=e.currentTarget.dataset.audioid;
            wx.setStorageSync('audioInfoXz',obj);
            that.setDAtaAudio();
            wx.redirectTo({
                url:"playAudio?subjectId="+e.currentTarget.dataset.subjectid+"&audioId="+e.currentTarget.dataset.audioid+"&to=1&token="+wx.getStorageSync("token")
            });
        }
    },
    //列表
    playlistBtn:function () {
        this.setData({
            playlistColse:1
        });
    },
    playlistColse:function () {
        this.setData({
            playlistColse:0
        });
    },
    //播放 按钮组
    playAudioInit:function (e) {
        var that=this;
        
        if(that.data.automaticPlay){
            that.playAudio(that.data.audioNumber);
        }else if(that.data.recorAutomaticPlay){
            that.playAudio(that.data.audioNumber);
        }else{
            
            that.jtAudio();
        }
    },
    playAudioBtn:function (e) {
        var that=this;
        if(this.data.btnSign) {
            this.setData({
                btnSign: 0
            });
            var index = that.data.audioNumber;
            that.playAudio(that.data.audioNumber);
            that.setData({
                btnSign:1
            });
        }
    },
    stopAudioBtn:function (e) {
        //console.log(e);
        var that=this;
        if(this.data.btnSign){
            this.setData({
                btnSign:0
            });
            var that=this;
            wx.pauseBackgroundAudio()
            setTimeout(function () {
                that.setData({
                    btnSign:1
                });
            },50)
        }
    },
    playAudioListBtn:function (e) {
        
        var that=this;
        that.playAudio(parseInt(e.currentTarget.id));
        that.setDAtaAudio();
        that.playlistColse();
    },
    //监听
    jtAudio:function () {

        // wx.getBackgroundAudioPlayerState({
        //     complete: function (res) {
        //         wx.pauseBackgroundAudio()
        //         res.currentPosition
        //         audioCtx.play();
        //         audioCtx.seek(res.currentPosition);
        //     }
        // })
        // return
        var that=this;
        // var index=that.data.audioNumber;
        var next=0;
        clearInterval(that.data.stopTime)
        that.setData({
            stopTime:setInterval(function () {
                wx.getBackgroundAudioPlayerState({
                    complete: function (res) {
                        // console.log('onBackgroundAudioPlay-zt');
                        // console.log("jtAudio");
                        // console.log(res);

                        if(that.data.audoPlay){
                            if(next){
                                next=0;
                                that.nextPlay();
                                return;
                            }
                            // console.log((res.downloadPercent))
                            if(res.downloadPercent==100){
                                // if(res.currentPosition==res.duration){
                                //console.log((res.currentPosition+2))
                                if((res.currentPosition+2)>=res.duration){

                                    next=1;
                                    if(that.data.audioNumber==that.data.audioLength-1){
                                        clearInterval(that.data.stopTime);
                                        that.setDAtaAudio();
                                    }
                                }
                            }

                        }

                        that.setData({
                            percent:res.currentPosition,
                            percentText:util.formatTime(res.currentPosition),
                            audioSign:res.status,
                            audioMaxTime:res.duration,
                            audioMaxTimeText:util.formatTime(res.duration),
                            downloadPercent:res.downloadPercent
                        })
                    }
                })
            },1000)
        });
    },
    //播放器
    sliderchange: function (e) {
        var value=e.detail.value;
        value=parseInt(value);
        if(app.data.phone){
            wx.seekBackgroundAudio({
                position:value
            })
        }else if(this.data.downloadPercent=100){
            wx.seekBackgroundAudio({
                position:value
            })
        }else {
            return false;
        }
    },
    nextPlay:function (e) {
        if(this.data.btnSign) {
            this.setData({
                btnSign: 0
            });
            var that = this;
            if (that.data.audioNumber != (that.data.audioLength - 1)) {
                that.playAudio(++that.data.audioNumber);
                this.setDAtaAudio();
            }
            setTimeout(function () {
                that.setData({
                    btnSign:1
                });
            },50)
        }
    },
    lastPlay:function (e) {
        if(this.data.btnSign) {
            this.setData({
                btnSign: 0
            });
            var that = this;
            if (that.data.audioNumber != 0) {
                that.playAudio(--that.data.audioNumber);
                this.setDAtaAudio();
            }
            setTimeout(function () {
                that.setData({
                    btnSign:1
                });
            },50)
        }
    },
    //播放
    playAudio:function(num){
        // console.log(num);
        var that=this;
        if(that.data.audioType){
            that.setData({
                audioSign:1,
                audioNumber:num,
                title:that.data.audioList[num].title,
                btnSign: 1,
                mp3:that.data.audioList[num].url,
            });
            wx.playBackgroundAudio({
                dataUrl: that.data.audioList[num].url,
                success:function (res) {
                    wx.hideLoading();
                }
            })
        }else{
            app.pAjax({
                url: app.globalData.globalUrl + '/applet/audio/getAudioInfoUrl',
                data: { 'audioId': that.data.audioList[num].infoId,  'token': wx.getStorageSync("token") },
            }).then(function (res) {
                // console.log(res);
                that.setData({
                    audioSign:1,
                    audioNumber:num,
                    title:that.data.audioList[num].title,
                    audioId:that.data.audioList[num].infoId,
                    // btnSign: 1,
                    mp3:res.data.data.audioInfo.url,
                });
                wx.showLoading({title: "载入中",});
                // audioCtx.setSrc(res.data.data.audioInfo.url);
                // audioCtx.play();
                wx.playBackgroundAudio({
                    dataUrl: res.data.data.audioInfo.url,
                    title:'天天学农',
                    coverImgUrl:'/assets/images/er.jpg',
                    success:function (res) {
                        // console.log(res);
                        wx.hideLoading();
                    }
                })
                if(that.data.automaticPlay||that.data.recorAutomaticPlay){
                    that.jtAudio();
                }
            });
        }
    },
    setDAtaAudio:function () {
        var that=this;
        // console.log(that.data.audioId);
        // console.log(that.data.percent);
        if(!that.data.percent){return}

        console.log(player);
        wx.request({
            url: app.globalData.globalUrl + '/applet/audioPlayRecord/getPlayRecordDuration',
            data: {
                'audioId': that.data.audioId, 'duration': that.data.percent, 'token': wx.getStorageSync("token")
            },
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
        })
    }
})