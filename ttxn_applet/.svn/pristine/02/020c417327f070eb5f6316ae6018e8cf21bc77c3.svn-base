var app=getApp();
var time=require('../../../utils/util.js') ;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list: [{ l_title: '', s_title: '', s_img: '', duration: '', subjects: '', times: '', original_price: '', current_price: ''}],
        isHideLoadMore: true,
        showMore:1,
        pageSize:5,
        pageNum:1,
        reachBottom:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (o) {
        o.id
        this.setData({
            subjectId: o.id
        });
        var _this,that=this;
      this.getCourseList();
    },
    onReachBottom: function (e ){

        if(this.data.reachBottom&&this.data.showMore){
            var that=this;
            that.setData({
                reachBottom:0,
                isHideLoadMore: false
            });
            setTimeout(function () {
                app.pAjax({
                    url: app.globalData.globalUrl + '/applet/audioSubject/audioSubjectList',
                    data: {
                        token: wx.getStorageSync("token"),
                        pageNum: that.data.pageNum,
                        pageSize: that.data.pageSize,
                        subjectId:that.data.subjectId
                    },
                }).then(function (res) {
                    console.log(res);
                    if (res.data.resultCode == 0) {
                        if(res.data.data.list.list.length<that.data.pageSize){
                            that.setData({
                                showMore: 0
                            });
                        }
                        var arr = that.data.list.concat(res.data.data.list.list);
                        for (var i in arr) {
                          arr[i].duration = time.formatTime(arr[i].duration);
                        }
                        that.setData({
                            list: arr,
                            pageNum: ++that.data.pageNum,
                            isHideLoadMore: true,
                            reachBottom:1,
                        });
                    }
                });
            },500);
        }
    },
    onUnload: function () {
        wx.reLaunch({
            url:"../../index/index"
        });
    },
    onShow:function () {
      if (wx.getStorageSync("isBuy")){
        this.getCourseList();
      }
    },
    getCourseList:function(){
      var that = this;
      this.setData({
        pageNum: 1,
        list: []
      });
      app.pAjax({
          url: app.globalData.globalUrl + '/applet/audioSubject/audioSubjectList',
          data: {
              token: wx.getStorageSync("token"),
              pageNum: that.data.pageNum,
              pageSize: that.data.pageSize,
              subjectId: that.data.subjectId
          },
          loading:1
      }).then(function (res) {
        //   console.log(res);
              var arr = res.data.data.list.list;
              for (var i in arr) {
                  arr[i].duration = time.formatTime(arr[i].duration);
              }
              for (var i in arr) {
                  arr[i].isBuy = arr[i].isBuy
              }
              that.setData({
                  list: res.data.data.list.list,
                  pageNum: ++that.data.pageNum,
                  reachBottom:1
              });

      });
    }

})