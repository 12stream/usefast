var login=require("login.js");
var Promise = require('promise.js');
var app = getApp();
var forI=2;

function httpsPromisify(options) {
    //console.log('Promise');
    return new Promise(function(resolve, reject) {
        forNetwork(options,resolve, reject);
    })
    function forNetwork(options,resolve, reject) {

        //console.log('forNetwork');
        //console.log(resolve);
        //console.log(options);
        options.data.token=wx.getStorageSync("token");
        options = Object.assign(options, {
            header: {
                'Content-Type': 'application/json'
            },
            success(result) {

                //console.log('success');
                //console.log(result);
                if (result.statusCode === 200) {
                    if(result.data.resultCode==0){
                        resolve(result);
                    }else{
                        //console.log(resolve);
                        forPromFn(options);
                    }
                } else {
                    // reject(result);
                    if(forI){
                        forI--;
                        setTimeout(function () {
                            forNetwork(options,resolve, reject);
                        },1000);
                    }else{
                        reject(result);
                    }
                }

                function forPromFn(options) {

                    var forProm=new Promise(function (resolve, reject) {
                        login(resolve);
                    });
                    forProm.then(function () {
                        //console.log("forProm");
                        options.data.token=wx.getStorageSync("token");
                        wx.hideLoading();
                        wx.request(options);
                    });
                }
                wx.hideLoading();
            },
            fail:reject
        });

        wx.request(options);
    }

}


module.exports=function (options) {
    //console.log(options);
    // if(options.loading){
        // wx.showLoading({ title: "载入中", mask: true, success: function () { }, fail: function () { }, complete: function () { } });

        // app.load.close(that);
    // }
    var prom=new Promise(function (resolve,reject) {
        wx.checkSession({
            success: function(res){
                //console.log(res);
                resolve()
            },
            fail: function(res){
                login(resolve);
            }
        });
    });

    return prom.then(function () {
        return httpsPromisify(options);
    });

};
