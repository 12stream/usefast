var app = getApp();
var host = app.globalData.globalUrl;
var newCom_url = host +'/applet/comment/saveUserComment';
var page_size=6;
var page_number=1;
var time=require("../../../assets/js/time.js");
// emptyComment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        length_str: 0,    //输入字数
        isHide: true,         // 是否隐藏弹框  ，默认隐藏
        subjectId: '',
        dataArr: [],
        toTop: true,              //收起箭头默认向上
        isComplete:false  ,        //是否加载完成  默认没有
        totalPage:"",              //总页数

    },
    nodeInfo: function (ele) {
        var query = wx.createSelectorQuery()
        query.select('#'+ele).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
            // console.log(res)
            res[0].top       // #the-id节点的上边界坐标
            res[1].scrollTop // 显示区域的竖直滚动位置
            if (res[0].height >= 80) {
                console.log(111);
                that.data.dataArr[idx].isHide = false;
              
            } else {
                console.log(222);
                that.data.dataArr[idx].isHide = true;
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (op) {
        var that = this;
        this.setData({
            subjectId: op.subjectId,
            isEmpty: op.isEmpty
        });
        wx.setStorageSync('subjectId', op.subjectId);
        wx.setStorageSync('isEmpty', op.isEmpty);
        that.requestData();
    },
    controlTb: function (e) {
        var that = this;
        var idx = e.currentTarget.dataset.idx;
        that.data.dataArr[idx].toTop = !that.data.dataArr[idx].toTop;
        //  that.nodeInfo(e.currentTarget.dataset.id);

        that.setData({
            dataArr: that.data.dataArr
        });
        // that.setData({
        //     dataArr: that.data.dataArr
        // })
    },
    requestRemark: function () {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        // console.log(e);
        // console.log('页面渲染完成!')

    },

    startComment: function () {
        this.setData({
            isHide: false
        })
    },
    hideBox: function () {
        this.setData({
            isHide: true
        })
    },
    Focus: function (e) {
        //   console.log(e);
    },
    Blur: function (e) {
        //   console.log(e);
      
    },
    Confirm: function (e) {
        //   console.log(e);
          console.log("完成了")
    },
    Input: function (e) {
        // console.log(e);
        var length_str = e.detail.value.length
        this.setData({
            length_str: length_str,
            content: e.detail.value
        })
    },
    //发表
    pubLish: function () {
        var that = this;
        if (that.data.length_str < 2) {
            wx.showLoading({
                title: '不能少于2个字',
            });
            setTimeout(function () {
                wx.hideLoading()
            }, 1500)
        } else {
            wx.request({
                url: host + '/applet/comment/saveUserComment',
                header: {
                    'content-type': 'application/json'
                },
                data: {
                    token: wx.getStorageSync('token'),
                    id: that.data.subjectId,
                    content: that.data.content
                },
                success: function (res) {
                    console.log(that.data.content)
                    wx.showToast({
                        title: '发表成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.setData({
                        isHide: true
                    })
                    wx.navigateTo({
                        url: 'emptyComment?subjectId=' + wx.getStorageSync('subjectId') + '&isEmpty=' + wx.getStorageSync('isEmpty'),
                    })
                },
                error: function (e) {
                    wx.showToast({
                        title: '网络故障,请稍后重试',
                        icon: '',
                        duration: 1500
                    })
                },
                complete: function () {
                    setTimeout(function () {
                        that.setData({
                            isHide: true
                        })
                    }, 3000)
                }

            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    timeTochange:function (obj) {
        for (var i = 0, j = obj.length; i < j; i++) {
            var what_time;
            var time = new Date(obj[i].create_time).getTime();
            var now = new Date().getTime();
            var days = ((now - time) / (1000 * 3600 * 24));
            // console.log(days);
            if (days > 31) {
                what_time = "很久以前更新";
            } else if (days > 1 && days <= 31) {
                days = parseInt(days);
                what_time = days + "天以前更新"
            } else {
                days = days * 24;
                if (days >= 1) {
                    what_time = parseInt(days) + "小时以前更新"
                } else {
                    days = days * 60;
                    if (days > 5) {
                        what_time = parseInt(days) + "分钟以前更新"
                    } else {
                        what_time = "刚刚更新"
                    }
                }
            }
            obj[i].what_time = what_time; 
        }
    },
    //获取 评论列表
    requestData: function (){
        var that =this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: host + '/applet/comment/subjectCommentList',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            data: {
                token: wx.getStorageSync('token'),
                id: that.data.subjectId,
                pageNum:1,
                pageSize: 6
            },
            success: function (res) {
                wx.hideLoading();
                console.log(res)
                var arr = res.data.data.userComment.list;
                for (var i = 0, j = arr.length; i < j; i++) {
                    arr[i].toTop = true;
                    arr[i].commentTime = time.timeDifference(arr[i].commentTime);
                    if (arr[i].content.length >= 88) {
                        arr[i].isHide = false;
                    } else {
                        arr[i].isHide = true;
                    }
                }
                that.setData({
                    dataArr: arr,
                    totalPage: res.data.data.userComment.totalPage
                })
            },
            error: function (e) {
                console.log(e)
            }
        })
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
         page_number++;
        //  console.log(page_number);
        // var  num=page_size*page_number;
        // console.log(num);
        // this.requestData(newCom_url,num);
        var that = this;
        var dateFormArr = [];
        if (page_number > that.data.totalPage) {
            that.setData({
                isComplete: true
            })
        } else {
            that.setData({ isHideLoadMore: false });
            setTimeout(function () {
                app.ajax(function () {
                    wx.request({
                        url: host + '/applet/comment/subjectCommentList',
                        data: {
                            token: wx.getStorageSync("token"),
                            id: that.data.subjectId,
                            pageNum: page_number,
                            pageSize: 6
                        },
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function (res) {
                            console.log(res);
                            if (res.data.resultCode == 0) {
                                var arr = that.data.dataArr.concat(res.data.data.userComment.list);
                                for (var i = 0, j = arr.length; i < j; i++) {
                                    arr[i].commentTime = time.timeDifference(arr[i].commentTime);
                                    arr[i].toTop = true;
                                    if (arr[i].content.length >= 88) {
                                        arr[i].isHide = false;
                                    } else {
                                        arr[i].isHide = true;
                                    }
                                }
                                // for (var i = 0, listL = res.data.data.userComment.list.length; i < listL; i++) {
                                //     res.data.data.list.list[i]['play_time_c'] = dateArr[i];
                                // }
                               
                                // var newArr = dateFormArr.map(function (item) {
                                //     return util.formatTime(item);
                                // });
                                // for (var k in res.data.data.userComment.list) {
                                //     res.data.data.list.list[k]['playSj'] = newArr[k];
                                // }
                                that.setData({
                                     dataArr: arr,
                                    // pageNum: ++that.data.pageNum,
                                    isHideLoadMore: true
                                });
                                wx.hideLoading();
                            }
                        }
                    });
                });

            }, 500);
        }
      
     
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})