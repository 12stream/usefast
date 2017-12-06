var app=getApp();
var Promise = require('../../../assets/js/promise.js');
Page({
    data: {
        arr:[{name:"苹果",img:"../assets/img/bg.jpeg",select:0},{name:"苹果2",img:"../assets/img/bg.jpeg",select:0}],
        indexes:{},
        zhiye:0,
        phone:0,
        checkbox:[],
        sPhone:0,
        topic:[]
    },
    onLoad: function (o) {

        this.setData({
            zhiye:o.id
        });

        var that=this;
        var _this=this;
        var token=wx.getStorageSync("token");
        var pr=new Promise(function (rs,rj) {
            app.ajax(function () {
                wx.request({
                    url:app.globalData.globalUrl+ '/applet/userInfo/getUserInfo',
                    data: {
                        token:wx.getStorageSync("token")
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res);
                        // console.log(res.data.data.info.userInfo.tel);
                        if(res.data.resultCode==0){
                                that.setData({sPhone:res.data.data.info.userInfo.tel});
                            if(res.data.data.info.topicList&&res.data.data.info.topicList[0]){
                                console.log("arr");
                                that.setData({topic:res.data.data.info.topicList});
                            }
                            wx.hideLoading();
                        }
                        rs();
                    }
                })
            });
        });
        pr.then(function () {
            app.ajax(function () {
                wx.request({
                    url: app.globalData.globalUrl+'/applet/common/getTopic',
                    data: {
                        token:token
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res);
                        // console.log(that.data.topic);
                        if(res.data.resultCode==0){
                            var arr=res.data.data.tags;
                            for(var i  in arr){
                                arr[i]['select']=false;
                            }
                            // that.data.topic[i]

                            var tarr=that.data.topic;
                            var num=0;

                            for(var j in tarr){
                                // console.log(tarr[j]);
                                for(var i  in arr){
                                    num++;
                                    // console.log(arr[i]);
                                    if(tarr[j].value==arr[i].value){
                                        arr[i].select=true;
                                        break;
                                    }
                                };
                            }
                            //
                            // console.log(arr);
                            // console.log(num);

                            _this.setData({
                                arr:arr
                            });

                            wx.hideLoading()
                        }
                    }
                })
            });
        });




    },
    // Change:function(e) {
    //     //
    //     // console.log(this.data.arr);
    //     console.log(e);
    //     this.setData({
    //         checkbox:e.detail.value
    //     });
    // },
    phone:function(e){
        var myreg = /^1[34578]\d{9}$/;
        // console.log(myreg.test(e.detail.value));
        if(myreg.test(e.detail.value)){
            this.setData({
                phone:e.detail.value
            });
        }else{
            wx.showModal({
                title: '',
                content: '请输入正确的手机号',
                showCancel:false,
                success: function(res) {
                }
            })
        }
    },
    choice:function (e) {
        // console.log(e);
        var t=e.currentTarget.id;
        var param={};
        var string="arr["+t+"].select";
        param[string]=!this.data.arr[t].select;
        this.setData(param);
    },
    next:function () {

    },
    formSubmit:function (e) {
        console.log(this.data);
        console.log(e);
        console.log(e.detail.value.checkbox);
        var that=this;
        var checkbox=e.detail.value.checkbox;
        var obj={
            token:wx.getStorageSync("token"),
            'model.carrer':that.data.zhiye,
            'model.topic':checkbox.toString(),
            'model.tel':that.data.phone
        };
        console.log(obj);

        if(e.detail.value.checkbox.length&&this.data.phone){
            app.ajax(function () {
                wx.request({
                    url: app.globalData.globalUrl+'/applet/user/updateUserInfo',
                    data: obj,
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res);
                        if(res.data.resultCode==0) {

                            if(that.data.sPhone!=that.data.phone){
                                wx.navigateTo({
                                    url: "../activity3/activity3?phone="+that.data.phone
                                });
                            }else{
                                wx.navigateTo({
                                    url: "../activity4/activity4"
                                });
                            }
                            wx.hideLoading();

                        }

                    }
                })
            });

        }else{
            wx.showModal({
                title: '',
                content: '请选择您关注的话题和填写手机号',
                showCancel:false,
                confirmColor:"#333333",
                success: function(res) {

                }
            })
        }
    }
});