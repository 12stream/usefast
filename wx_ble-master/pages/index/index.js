//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //事件处理函数
  bindViewTap1: function() {
    wx.navigateTo({
      url: '../scanble/scanble'
    })
  },
  onLoad: function () {
    var that = this;
    // var hex = 'AA5504B10000B5'
    // var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
    //   return parseInt(h, 16)
    // }))
    // console.log(typedArray);
    // var list=[];
    // typedArray.forEach(function(value,index){
    //   console.log(value.toString(2));
    //   list.push(value.toString(2));
    // })
    // console.log(list);
    // console.log([0xAA, 0x55, 0x04, 0xB1, 0x00, 0x00, 0xB5]);
    // var buffer1 = typedArray.buffer;
    // console.log(buffer1);


    // var a = [{ "properties": {'indicate':false,'notify':false,'read':false,'write':true}, "uuid": "0000FFC1-0000-1000-8000-00805F9B34FB" }, { "properties": {'indicate':false,'notify':false,'read':false,'write':true}, "uuid": "0000FFC2-0030-1040-8040-02805F2B344B" }];
    // console.log(a);
    // for (var i = 0; i < a.length; i++){
    //   console.log(a[i].uuid);
    //   console.log(a[i].uuid.indexOf("FFC1") != -1);
    //   if (a[i].uuid.indexOf("808D") != -1) {
    //     that.setData({
    //       cd20: a[i].uuid,
    //       characteristics20: a[i]
    //     });
    //   }
    //   if (a[i].uuid.indexOf("FFC1") != -1) {
    //     that.setData({
    //       cd01: a[i].uuid,
    //       characteristics01: a[i]
    //     });
    //   }
    //   if (a[i].uuid.indexOf("FFC2") != -1) {
    //     that.setData({
    //       cd02: a[i].uuid,
    //       characteristics02: a[i]
    //     });
    //   }
    //    if (a[i].uuid.indexOf("57B1") != -1) {
    //     that.setData({
    //       cd03: a[i].uuid,
    //       characteristics03: a[i]
    //     });
    //   }
    //   if (a[i].uuid.indexOf("23AB") != -1) {
    //     that.setData({
    //       cd04: a[i].uuid,
    //       characteristics04: a[i]
    //     });
    //   }
    // }
    // console.log('cd01= ' + that.data.cd01 + 'cd02= ' + that.data.cd02 + 'cd03= ' + that.data.cd03 + 'cd04= ' + that.data.cd04 + 'cd20= ' + that.data.cd20);
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  time() {
    console.time(app.getUserInfo)
    console.timeEnd(app.getUserInfo)
    console.time(app.globalData)
    console.timeEnd(app.globalData)
    console.time(app)
    console.timeEnd(app)
  },
  getvalue(e) {
    console.log(e);
  }
})
