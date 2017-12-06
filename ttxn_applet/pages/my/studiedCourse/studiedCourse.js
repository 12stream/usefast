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


    },
    onLoad: function (options) {
        var that=this;
        that.getList();
    },
    getList:function () {
        var that=this;
        app.pAjax({
            url: host+'/applet/audioPlayRecord/userLearnList',
            data: {
                token: wx.getStorageSync("token"),
                pageNum: that.data.pageNum,
                pageSize: that.data.pageSize,
            },
        }).then(function (res) {
            console.log(res);
            if(res.data.resultCode==0){
                var arr=res.data.data.list.list;
                for(var i in arr){
                    arr[i].jd=that.getjd(arr[i].learnCount,arr[i].sumCount)
                }
                that.setData({
                    conEmpty:!arr.length,
                    pageNum: that.data.pageNum+1,
                    list:arr
                })
            }

        });
    },
    getjd:function (value,maxvalue) {
        var temp=app.progress.percentInt(value,maxvalue);
        if(temp>=100){return '已学完'}
        return temp
    },
    onReachBottom:function () {
        var that=this;
        if(!that.data.againLoading.isHideLoadMore&&!that.data.againLoading.showMore){
            that.setData({
                'againLoading.isHideLoadMore': 1
            });
            app.pAjax({
                url: host+'/applet/audioPlayRecord/userLearnList',
                data: {
                    token: wx.getStorageSync("token"),
                    pageNum: that.data.pageNum,
                    pageSize: that.data.pageSize,
                },
            }).then(function (res) {
                console.log(res);
                if(res.data.resultCode==0){
                    var arr=res.data.data.list.list;
                    for(var i in arr){
                        arr[i].jd=that.getjd(arr[i].learnCount,arr[i].sumCount)
                    }
                    arr=that.data.list.concat(arr);
                    if(res.data.data.list.list.length<that.data.pageSize){
                        that.setData({
                            'againLoading.showMore': 1,
                        })
                    }
                    that.setData({
                        'againLoading.isHideLoadMore': 0,
                        pageNum: that.data.pageNum+1,
                        conEmpty:!arr.length,
                        list:arr
                    })
                }

            });
        }
    },


})