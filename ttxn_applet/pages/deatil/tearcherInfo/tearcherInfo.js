// tearcherInfo.js
var app = getApp();
var host = app.globalData.globalUrl;
var  utils=require("../../../utils/util.js")
var WxParse = require('../../../assets/wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据 v
     */
    data: {
                   list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (o) {
        var that=this;
        app.load.open(this);
        var id = o.tearch_id;

        wx.request({
            url: host + '/applet/teacher/getTeacherDetails',
            header: {
                'content-type': 'application/json'
            },
            data: {
                token: wx.getStorageSync('token'),
                id: id,
                pageNum:1,
                pageSize:10
            },
            success: function (res) {


                console.log(res);
                var arr = res.data.data.list.list;
                  for (var i=0,j=arr.length;i<j;i++){
                      arr[i].creat_time=utils.filter(arr[i].upTime)
                  }
                console.log(res);
                WxParse.wxParse('insertData', 'html', (res.data.data.list.list[0].content).trim(),that);
                        that.setData({
                            li_length: res.data.data.list.list.length,
                             list:arr
                        })
                app.load.close(that);
            },
            error: function (e) {

            },
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function(){


    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})