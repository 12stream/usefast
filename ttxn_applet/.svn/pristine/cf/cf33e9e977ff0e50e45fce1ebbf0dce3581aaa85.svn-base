var app=getApp();
var host=app.globalData.globalUrl;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sign: 1,
        btnText:'立即领取课程'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (o) {
        console.log(o);
        this.setData({
            sign: o.id
        });
        if(o.id==="0"){
            this.setData({
                btnText: "请前往听课"
            });
        }
        console.log(this.data);
    },
    aBtn: function () {

      var that=this;
      console.log(this.data.id);
        //前往听课
        if(this.data.sign==="0"){
            console.log("ok");

            wx.redirectTo({
                url:"../../my/purchaseContent/purchaseContent"
            });
        }else{
            app.ajax(function () {
                console.log(2);
                wx.request({
                    url: host + '/applet/audioBanner/receiveSuccss',
                    data: {
                        token: wx.getStorageSync("token")
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.data.resultCode == 0) {
                            wx.setStorageSync("isBuy", 1);
                            wx.redirectTo({
                                url:"../../my/purchaseContent/purchaseContent"
                            });
                        }
                    },
                    fail: function (res) {
                        console.log(0)
                    }
                })
            });
        }


    }
})