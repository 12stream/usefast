var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      name:1,
        img:2,
        value:3
    }],
      hide:0
  },
  /**
   * 生命周期函数--监听页面加载
*/
  onLoad: function (options) {
      var _this=this;
      app.pAjax({
          url: app.globalData.globalUrl+'/applet/audioBanner/receiveBannerList',
          data: {
              token:wx.getStorageSync("token")
          },
          loading:1
      }).then(function (res) {
          console.log(res);
          if(res.data.resultCode==0){
              var number=res.data.data.code;
              switch (number) {
                  case '0':
                      wx.navigateTo({
                          url:"../activity4/activity4?id=0",
                      });
                      break;
                  case "1":
                      wx.navigateTo({
                          url:"../activity4/activity4?id=1",
                      });
                      break;
                  case "2":
                      _this.setData({
                          hide:1
                      });
                      app.pAjax({
                          url: app.globalData.globalUrl+'/applet/common/getCarrer',
                          data:{
                              token:wx.getStorageSync("token")
                          },
                      }).then(function (res) {
                              _this.setData({list:res.data.data.tags});
                      });
                      break;
              }
          }
      });

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
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})