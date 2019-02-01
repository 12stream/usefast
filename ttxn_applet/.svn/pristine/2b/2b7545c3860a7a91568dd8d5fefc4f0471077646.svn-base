var app = getApp();
var host = app.globalData.globalUrl;
Page({
  data: {
    loadingHidden: false,
    nullInfo: true,
    isHideLoadMore: true,
    loadingComplete: false,
    pageNum: 1,
    totalPage: ''
  },
  onLoad: function () {
    this.getBuyRecord();
  },
  getBuyRecord: function () {
    var that = this;
    app.ajax(function () {
        wx.request({
            url: host + '/applet/audioBuyRecord/getBuyRecordList',
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
                console.log(res);
                if(res.data.resultCode==0) {
                    if (res.data.data.list.list.length === 0) {
                        that.setData({
                            nullInfo: false
                        });
                    } else {
                        that.setData({
                            nullInfo: true
                        });
                    }
                    that.setData({
                        buyRecordList: res.data.data.list.list
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
          url: app.globalData.globalUrl + '/applet/audioBuyRecord/getBuyRecordList',
          data: {
            token: wx.getStorageSync("token"),
            pageNum: that.data.pageNum,
            pageSize: 10
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            var arr = that.data.buyRecordList.concat(res.data.data.list.list);
            that.setData({
              buyRecordList: arr,
              pageNum: ++that.data.pageNum,
              isHideLoadMore: true
            });
          }
        });
      }, 500);
    }
  },
  otherCourse: function(){
    wx.switchTab({ url: '../../index/index' });
  }
})