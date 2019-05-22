// pages/purchaseContent/purchaseContent.js
var app = getApp();
var host = app.globalData.globalUrl;
Page({
    data: {
        loadingHidden: false,
        nullInfo: true,
        isHideLoadMore: true,
        loadingComplete: false,
        pageNum: 1,
        totalPage: '',
        sign:0
    },
    onLoad: function(o){
        this.setData({
            sign:o.sign
        });
        console.log(this.data);
        console.log(getCurrentPages());
        this.getBuyRecord();

    },
    getBuyRecord: function () {
        var that = this;
        app.ajax(function () {
            wx.request({
                url: host + '/applet/audioBuyRecord/getBuyContentList',
                data: {
                    'token': wx.getStorageSync("token"),
                    'pageNum': 1,
                    'pageSize': 10
                },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    if(res.data.resultCode==0){
                        if (res.data.data.list.list.length === 0){
                            that.setData({
                                nullInfo: false
                            });
                        }else{
                            that.setData({
                                nullInfo: true
                            });
                        }
                        that.setData({
                            buyContentList: res.data.data.list.list
                        });
                        wx.hideLoading();
                    }
                },
                fail: function () {
                },
                complete: function () {
                    // complete
                }
            })
        });

    },
    onReachBottom: function (e) {
        var that = this;
        if (that.data.pageNum > that.data.totalPage) {
            that.setData({
                loadingComplete: true
            })
        } else {
            that.setData({ isHideLoadMore: false });
            setTimeout(function () {
                wx.request({
                    url: app.globalData.globalUrl + '/applet/audioBuyRecord/getBuyContentList',
                    data: {
                        token: wx.getStorageSync("token"),
                        pageNum: that.data.pageNum,
                        pageSize: 10
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        if(res.data.resultCode==0){
                            var arr = that.data.buyContentList.concat(res.data.data.list.list);
                            that.setData({
                                buyContentList: arr,
                                pageNum: ++that.data.pageNum,
                                isHideLoadMore: true
                            });
                            wx.hideLoading();
                        }
                    }
                });
            }, 500);
        }
    },
    otherCourse: function () {
        wx.redirectTo({
            url: '../../list/courseList/courseList'
        })
    }

})