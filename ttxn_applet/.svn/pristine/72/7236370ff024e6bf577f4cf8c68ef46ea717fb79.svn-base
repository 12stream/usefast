var app = getApp();
var host = app.globalData.globalUrl;
var validate=require('../../../assets/js/validate.js');

Page({
    data: {
        content:0,
        imgArr:[],

        index:-1,

        btnOpen:1
    },
    onLoad: function (options) {
        var that=this;
    },
    file:function () {
        var that=this;
        wx.chooseImage({
            success: function(res) {
                console.log(res);
                var tempFilePaths = res.tempFilePaths;
                var arr=that.data.imgArr.concat(tempFilePaths);
                if(arr.splice(6,arr.length-6))
                    that.setData({
                        imgArr:arr
                    });
                console.log(that.data.imgArr);
            }
        })
    },
    formSubmit:function (e) {
        var that=this;
        if(!that.data.btnOpen){return}


        // console.log(e);
        var value=e.detail.value;
        console.log(value);

        if(!validate.empty(value.question)){
            wx.showModal({
                title: '',
                content: '请描述您的问题',
                showCancel:false,
            });
            return
        }
        // 验证
        if(!validate.minLength(value.question,2)){
            wx.showModal({
                title: '',
                content: '评论发表不能低于2个字',
                showCancel:false,
            });
            return
        }

        if(!validate.empty(value.phone)){
            wx.showModal({
                title: '',
                content: '请留下你的手机号，方便我们联系您',
                showCancel:false,
            });
            return
        }
        if(!validate.phone(value.phone)){
            wx.showModal({
                title: '',
                content: '您输入的手机号格式不正确',
                showCancel:false,
            });
            return
        }
        // end 验证

        var i=0;
        function uploadFile(id){
            wx.uploadFile({
                url: host+'/applet/feedback/saveUserFeedback?token='+wx.getStorageSync("token")+'&content='+value.question+'&tel='+value.phone+'&id='+id+'&imgState=1',
                filePath: that.data.imgArr[i],
                name: 'img',
                success: function(res){
                    console.log(res);
                    res.data=JSON.parse(res.data);
                    setSuccess(res);
                }
            })
        }
        function upText() {
            wx.request({
                url: host+'/applet/feedback/saveUserFeedback',
                data: {
                    token: wx.getStorageSync("token"),
                    content:value.question,
                    tel:value.phone,
                    id:0,
                    imgState:0
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    setSuccess(res);
                }
            })
        }
        function setSuccess(res) {
            if(res.data.resultCode==0){
                if(res.data.data.record.state==1){
                    wx.showModal({
                        title: '',
                        content: '请不用重复提交问题',
                        showCancel:false,
                        success: function(res) {
                        }
                    });
                    return
                }
                i++;
                if(i<that.data.imgArr.length){
                    uploadFile(res.data.data.record.id);
                }else{
                    wx.hideLoading()
                    wx.showModal({
                        title: '',
                        content: '提交成功',
                        showCancel:false,
                        success: function(res) {
                            if (res.confirm) {

                                wx.navigateBack({delta: 1})
                            }
                        }
                    })
                }
            }
        }
        that.setData({btnOpen:0});
        wx.showLoading({ title: "正在提交", mask: true, success: function () { }, fail: function () { }, complete: function () { } });
        if(that.data.imgArr.length==0){
            upText();
        }else{
            uploadFile(0);
        }
    },

//    弹窗
    openfenxiang:function (e) {
        console.log(e);
        this.setData({
            fenxiang:1,
            fxSubjectId:e.target.dataset.subjectid,
            fxTitle:e.target.dataset.title,
            index:e.target.dataset.index
        });
    },
    delArr:function () {
        var that=this;
        var arr=that.data.imgArr;
        arr.splice(that.data.index,1);
        that.setData({
            fenxiang:0,
            imgArr:arr
        });
        this.setData({
            fenxiang:0
        });
    },
    fenxiangColse:function () {
        this.setData({
            fenxiang:0
        });
    },

});