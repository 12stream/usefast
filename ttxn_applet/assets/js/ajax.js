var Promise = require('promise.js');
var data = require('var.js');
var ajaxSign=0;
var completeSpeed=100;
function promise(resolve, reject) {

var url=data.url;
    var date = Date.now();
    // //864000000
    // if(date-wx.getStorageSync("date")>2000){
        token();
    // }else{
    //     resolve();
    // }
    // resolve();
    // var url ="http://192.168.0.58";
    function token(){

        wx.request({
            url:url+ '/applet/userInfo/getUserInfo',
            data: {
                token:wx.getStorageSync("token")
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                ajaxSign=1;
                //console.log("token失效?");
                //console.log(res);
                if(res.data.resultCode==0){
                    wx.setStorageSync("date", Date.now());
                    resolve();
                }
                if(res.data.resultCode==2){
                    getToken();
                }
                if(res.data.resultCode==1) {
                    setTimeout(function () {
                        getToken();
                    },3000);
                }
                // //console.log("token shixiao");
            },
            complete: function () {
                //console.log("ajax-complete");
                if(!ajaxSign){
                    setTimeout(function () {
                        token();
                    },completeSpeed);
                }
                // complete
                ajaxSign=0;
            }
        });
        function getToken(){
            wx.login({
                success: function(res) {
                    ajaxSign=1;
                  // //console.log(res);
                    if (res.code) {
                        // //console.log(res.code);
                        var code=res.code;

                        wx.getUserInfo({
                            success: function (res) {
                                ajaxSign=1;
                                //console.log(res);
                                var user=res.userInfo;
                                function getTokenSet(){
                                    wx.request({
                                        url: url+'/applet/user/wxLogin',
                                        data: {
                                            code:code,
                                            name:user.nickName,
                                            head_img: user.avatarUrl,
                                            province :user.province,
                                            city :user.city
                                        },
                                        header: {
                                            'Content-Type': 'application/json'
                                        },
                                        success: function(res) {
                                            ajaxSign=1;
                                            ////console.log(res);
                                            ////console.log(res.data.data.token);
                                            if(res.data.resultCode==0){
                                                ////console.log(res.data.data.token);
                                                wx.setStorageSync("token", res.data.data.token);
                                                wx.setStorageSync("date", Date.now());
                                                ////console.log(wx.getStorageSync("token"));
                                                resolve();
                                            }else{
                                                setTimeout(function () {
                                                    token();
                                                },3000);
                                            }
                                        },
                                        fail:function (res) {
                                            ////console.log(res)
                                            setTimeout(function () {
                                                token();
                                            },3000);
                                        },
                                        complete:function () {
                                            //console.log("ajax-complete-getToken-getTokenSet");
                                            if(!ajaxSign){
                                                setTimeout(function () {
                                                    getTokenSet();
                                                },completeSpeed);
                                            }
                                            ajaxSign=0;
                                        }
                                    })
                                }
                                getTokenSet();
                            }
                        })
                    } else {
                        //console.log('获取用户登录态失败！' + res.errMsg)
                    }
                },
                complete:function () {

                    //console.log("ajax-complete-getToken");
                    if(!ajaxSign){
                        setTimeout(function () {
                            getToken();
                        },completeSpeed);
                    }
                    ajaxSign=0;
                }
            });
        }
    }
}
module.exports =promise;