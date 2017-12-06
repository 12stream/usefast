
var app = getApp();
var host = app.globalData.globalUrl;
var topArr = [];
var topArrVal = [];
var jobArr = [];
var jobArrVal = '';
//var mobileTel = '';
Page({
  data: {
    userInfo: {},
    topic: '',
    active: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
   app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    that.getUserInfo();
  },
  getUserInfo: function(){
    var that = this;
    var jobNameArr = [];
    var topicNameArr = [];
    wx.request({
      url: host+'/applet/userInfo/getUserInfo',
      data: {
        'token': wx.getStorageSync("token")
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data.data.info.userInfo.topic);
        that.setData({
          topArrVal: res.data.data.info.userInfo.topic,
          jobArrVal: res.data.data.info.userInfo.carrer
         // mobileTel: res.data.data.info.userInfo.tel
        });
        console.log(res.data.data.info);
        if (!that.isNull(res.data.data.info.carrerList[0])){
          for (var key in res.data.data.info.carrerList) {
            if (res.data.data.info.carrerList[key].hasOwnProperty('name')) {
              jobNameArr.push(res.data.data.info.carrerList[key].name);
            }
          }
        }

        if (!that.isNull(res.data.data.info.topicList[0])) {
          for (var key in res.data.data.info.topicList) {
            if (res.data.data.info.topicList[key].hasOwnProperty('name')) { //没有：false
              topicNameArr.push(res.data.data.info.topicList[key].name);
            }
          }
        }

        if (wx.getStorageSync("userMobile") != ''){
          that.setData({
            phonenum: wx.getStorageSync("userMobile")
          });
        }else{
          if (that.isNull(res.data.data.info.userInfo.tel)){
            res.data.data.info.userInfo.tel = ''
          }
          that.setData({
            phonenum: res.data.data.info.userInfo.tel
          });
        }
        that.setData({
          jobName: jobNameArr.join(" "),
          topicName: topicNameArr.join(" ")
        })
      },
      fail: function () {
        //fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /*setTopic: function (e) {
    let val = e.detail.value;
    this.setData({
      topicval: val
    })
  },*/
  isNull:function(data){ 
    return(data == "" || data == undefined || data == null) ? "null": false; 
  },
  ckChange: function (e) {
    this.setData({
      topicVal: e.detail.value
    })
  },
  ckChange_t: function (e) {
    this.setData({
      jobVal: e.detail.value
    })
  },
  selectTopic: function (e) {
    this.getTopic();
    this.setData({
      topic: true
    });
    this.showModal();
    topArr.length=0;
  },
  selectJob: function () {
    this.getJobInfo();
    this.setData({
      topic: false
    });
    this.showModal();
    jobArr.length=0;
  },
  showModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0)
  },
  hideModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  getTopic: function(){
    var that = this;
    wx.request({
      url: host + '/applet/common/getTopic',
      data: {
        'token': wx.getStorageSync("token")
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i = 0, listL = res.data.data.tags.length; i < listL; i++) {
          res.data.data.tags[i]['checked'] = false;
        }
        that.setData({
            topicList: res.data.data
        })
      },
      fail: function () {
        //fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getJobInfo: function () {
    var that = this;
    wx.request({
      url: host + '/applet/common/getCarrer',
      data: {
        'token': wx.getStorageSync("token")
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i in res.data.data.tags) {
          res.data.data.tags[i]['checked'] = false;
        }
        that.setData({
          jobList: res.data.data
        })

      },
      fail: function () {
        //fail
      },
      complete: function () {
        // complete
      }
    })
  },
  selectedTopic: function(e){
      var currentId = e.currentTarget.dataset.id;
      var obj = {};
      var ckToplistStr = "topicList.tags[" + currentId + "].checked";
      obj[ckToplistStr] = !this.data.topicList.tags[currentId].checked;
      this.setData(obj);
      if (obj[ckToplistStr]) {
        topArr.push(e.currentTarget.dataset.name);
      } else {
        topArr.splice(topArr.indexOf(e.currentTarget.dataset.name), 1);
      }
  },
  selectedJob: function(e){
    var currentId = e.currentTarget.dataset.id;
    var obj = {};
    var ckJoblistStr = "jobList.tags[" + currentId + "].checked";
    obj[ckJoblistStr] = !this.data.jobList.tags[currentId].checked;
    this.setData(obj);
    if (obj[ckJoblistStr]){
      jobArr.push(e.currentTarget.dataset.name);
    }else{
      jobArr.splice(jobArr.indexOf(e.currentTarget.dataset.name), 1);
    }
  },
  submitTopic: function(){
    if (topArr.length != 0) {
      this.setData({ topicName: topArr.join(" ") });
    }
    this.hideModal();
  },
  submitJob: function () {
    if (jobArr.length != 0){
      this.setData({ jobName: jobArr.join(" ") });
    }
    this.hideModal();
  },
  updateUserInfo: function(){
    var that = this;
    var tel = this.data.phonenum; 
    if (this.data.jobVal != undefined){
        var jobv = this.data.jobVal.join(",");
    }else{
        var jobv = this.data.jobArrVal;
    }

    if (this.data.topicVal != undefined) {
        var topicv = this.data.topicVal.join(",");
    }else{
        var topicv = this.data.topArrVal;
    }
   
   if(tel === undefined){
      tel = '';
   }
    wx.request({
      url: host + '/applet/user/updateUserInfo',
      data: {
        'token': wx.getStorageSync("token"),
        'model.tel': tel,
        'model.carrer': jobv,
        'model.topic': topicv
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        //fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onShow: function () {
    if (wx.getStorageSync("userMobile") != ''){
      this.setData({
        phonenum: wx.getStorageSync("userMobile")
      });
    }  
  },
  onUnload: function () {
    this.updateUserInfo();
  }
})
