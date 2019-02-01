var app=getApp();

var time=60;
function setTime(that){
    if(time==0){
        time=60;
        that.setData({
            time:"发送验证码",
            valueSign:1
        });
        return;
    }else{
        that.setData({time:"重新发送"+time+"秒"});
    }
    time--;
    setTimeout(function(){
        setTime(that);
    },1000);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        submitSign:1,
        value:"",
        phone:0,
        valueSign:1,
        time:"发送验证码"
    },
    onLoad: function (o) {
        this.setData({
            phone:o.phone
        });

    },
    codeBtn:function (e) {
        if(this.data.valueSign){
            this.setData({valueSign:0});
            var token=wx.getStorageSync("token");
            var _this=this;
            app.ajax(function () {
                wx.request({
                    url: app.globalData.globalUrl+'/applet/user/phoneVericode',
                    data: {
                        token:token,
                        mobile:_this.data.phone
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res);
                        if(res.data.resultCode==0){
                            setTime(_this);
                            wx.hideLoading();
                        }

                    },
                    fail:function (res) {
                        _this.setData({valueSign:1});
                    }
                })
            });

        }
    },
    value:function(e){
        if(e.detail.value!=""){
            this.setData({
                value:e.detail.value
            });
        }
    },
    submit:function (e) {
        if(this.data.value&&this.data.submitSign){
            this.setData({
                submitSign:0
            });
            var token=wx.getStorageSync("token");
            var _this=this;
            wx.request({
                url: app.globalData.globalUrl+'/applet/user/updateUserInfo',
                data: {
                    token:token,
                    code:_this.data.value,
                    'model.tel':_this.data.phone
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    console.log(res);
                    _this.setData({submitSign:1});
                    if(res.data.resultCode==0) {
                        wx.redirectTo({
                            url:"../activity4/activity4"
                        });
                    }else{
                        wx.showModal({
                            title: '',
                            content: '验证码错误',
                            showCancel:false,
                            success: function(res) {

                            }
                        })
                    }
                }
            })
        }

    }
});