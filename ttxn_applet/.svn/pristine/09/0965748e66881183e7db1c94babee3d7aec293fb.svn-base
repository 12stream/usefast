var Promise = require('promise.js');
var data = require('var.js');
var _data={
    code:'',
    user:null,
    url:data.url,
};
var url=_data.url;

function login(resolve) {
    // console.log("login");
    wx.login({
        success: function(res) {
            // console.log(res);
            _data.code=res.code;
            getUserInfo(resolve);
        }
    });
}
function getUserInfo(resolve) {
    wx.getUserInfo({
        success: function (res) {
            //console.log(res);
            _data.user=res.userInfo;
            getToken(resolve);

        }
    })
}
function getToken(resolve) {
    //console.log("getToken");
    var user=_data.user;
    var model=null;

    wx.getSystemInfo({
        success: function(res) {
            model=res;

            wx.request({
                url: url+'/applet/user/wxLogin',
                data: {
                    code:_data.code,
                    name:user.nickName,
                    head_img: user.avatarUrl,
                    province :user.province,
                    city :user.city,
                    model:model.model,
                    system:model.system,
                    version:model.version,
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    //console.log("getToken-res");
                    var token=res.data.data.token;
                    wx.setStorageSync("token", token);
                    //console.log(resolve);

                    resolve();
                },
                fail:function (res) {
                    //console.log(res);
                }
            })
        }
    });
}
module.exports=login;