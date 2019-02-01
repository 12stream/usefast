//index.js
var app = getApp();
var host = app.globalData.globalUrl;
var app = getApp();
Page({
  data: {
    time: 60,
    telphone: '',
    Telcode: ''
  },
  setPhone: function (e) {
    let val = e.detail.value;
    this.setData({
      telphone: val
    })
  },
  setTelcode: function(e){
    let val = e.detail.value;
    this.setData({
      Telcode: val
    })
  },
  getCode: function () {
    let _this = this;
    let currentTime = _this.data.time;
    let mobile = _this.data.telphone;
    let mobile_val = Number(mobile);
    console.log(mobile);
    if (!mobile) {
      this.openAlert('请填写手机号码');
    } else {
      if (currentTime == 60) {
        let countDown = setInterval(function () {
          _this.setData({
            time: _this.data.time - 1
          });
          if (_this.data.time == 0) {
            console.log(_this.data.time)
            clearInterval(countDown);
            _this.setData({
              time: 60
            });
          }
        }, 1000);
        
          wx.request({
            url: host + '/applet/user/phoneVericode',
            data: {
              'token': wx.getStorageSync("token"),
               mobile: mobile_val
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.resultCode);  //success
            }
          })
      }
    }
  },
  submitModi: function () {
    var _this = this;
    let _thisData = this.data;
    let telphone = _thisData.telphone;
    let Telcode = _thisData.Telcode;
    var telReg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!telphone) {
      this.openAlert('请填写手机号')
    } else if (!telReg.test(telphone)){
      this.openAlert('手机号码格式错误')
    }else if (!Telcode) {
      this.openAlert('请填写手机验证码')
    }else {
      wx.request({
        url: host + '/applet/user/updateUserInfo',
        data: {
          'token': wx.getStorageSync("token"),
          'code': Telcode,
          'model.tel': telphone
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          if (res.data.resultCode == 0) {
            wx.setStorageSync("userMobile", telphone);
            wx.navigateBack();
          } else {
            _this.openAlert('验证码错误')
          }
        }
      })

      /*wx.navigateTo({
       url: '../myinfo/myinfo'
      })*/
    }
  },
  openAlert: function (content) {
    wx.showModal({
      content: content,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  openToast: function () {
    wx.showToast({
      title: '已完成',
      icon: 'success',
      duration: 2000
    });
  }
})
