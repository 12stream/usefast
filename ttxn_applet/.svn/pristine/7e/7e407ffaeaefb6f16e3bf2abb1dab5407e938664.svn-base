var app = getApp();
var host = app.globalData.globalUrl;
var validate=require('../../../assets/js/validate.js');

Page({
    data: {
        conEmpty:0,
        list:[],

        pageNum:1,
        pageSize:10,
        againLoading:{
            isHideLoadMore:0,
            showMore:0
        },


        fenxiang:0,
        fxSubjectId:0,
        fxAudioId:0,
        fxTitle:0,

        index:-1
    },
    onLoad: function (options) {
        var that=this;
        that.getList();
    },
    getList:function () {
        var that=this;
        app.pAjax({
            url: host+'/applet/collect/userSubjectCollectList',
            data: {
                token: wx.getStorageSync("token"),
                pageNum: that.data.pageNum,
                pageSize: that.data.pageSize,
            },
        }).then(function (res) {
            console.log(res);
            if(res.data.resultCode==0) {
                var arr = res.data.data.userCollect.list;
                for (var i in arr) {
                    arr[i].jd = parseInt((arr[i].learnCount / arr[i].sumCount) * 100)
                }
                console.log(arr);
                that.setData({
                    conEmpty: !arr.length,
                    list: arr
                })
            }
        });
    },
    onReachBottom:function () {

        var that=this;
        if(!that.data.againLoading.isHideLoadMore&&!that.data.againLoading.showMore){
            that.setData({
                'againLoading.isHideLoadMore': 1
            });
            app.pAjax({
                url: host+'/applet/collect/userSubjectCollectList',
                data: {
                    token: wx.getStorageSync("token"),
                    pageNum: that.data.pageNum+1,
                    pageSize: that.data.pageSize,
                },
            }).then(function (res) {
                console.log(res);

                if(res.data.resultCode==0) {
                    var arr = res.data.data.userCollect.list;
                    for (var i in arr) {
                        arr[i].jd = parseInt((arr[i].learnCount / arr[i].sumCount) * 100)
                    }
                    arr=that.data.list.concat(arr);

                    if(res.data.data.userCollect.list.length<that.data.pageSize){
                        that.setData({
                            'againLoading.showMore': 1,
                        })
                    }
                    that.setData({
                        'againLoading.isHideLoadMore': 0,
                        pageNum: that.data.pageNum+1,
                        conEmpty: !arr.length,
                        list: arr
                    })

                    console.log(arr);
                }
            });
        }
    },

    //分享
    onShareAppMessage: function (e) {
        console.log(e);
        var that=this;
        that.fenxiangColse();
        var audioTo=that.data;
        console.log(audioTo);
        return {
            title:audioTo.fxTitle,
            path: "/pages/deatil/courseDetails/courseDetails?subjectId=" + audioTo.fxSubjectId
        }
    },
    openfenxiang:function (e) {
        console.log(e);
        this.setData({
            fenxiang:1,
            fxSubjectId:e.target.dataset.subjectid,
            fxTitle:e.target.dataset.title,
            index:e.target.dataset.index
        });
    },
    fenxiangColse:function () {
        this.setData({
            fenxiang:0
        });
    },

//    收藏
    shouc:function () {
        console.log(1);
        var that=this;
        wx.request({
            url: host + '/applet/collect/saveSubjectCollect',
            data: {
                token: wx.getStorageSync("token"),
                subjectId: this.data.fxSubjectId
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                var arr=that.data.list;
                arr.splice(that.data.index,1);
                that.setData({
                    fenxiang:0,
                    list:arr
                });
            }
        })
    }
})