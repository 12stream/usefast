// pages/settings/oncePassword/oncePasswordMessage/oncePasswordMessage.js
var config = require('./../../utils/config.js')
var pickerFile = require('./../../utils/picker_datetime.js');
var app = getApp();
var telReg = "^(1[345789])\\d{9}$";//手机的老式正则验证^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telNumber: '',
    sendState: '-1',
    value: '',
    value2: '',
    sub: true,
    jwt: '',
    choice1Result:0,
    choice2Result: 1,  //默认情况下，选择开锁的方式为二维码开锁
    choiceWay:0,
    list: [],
    svalidtime: [],
    evalidtime: [],
    arrayRoom: [[],[]],
    arrayName:['游客','员工','其他'],
    indexRoom:[]
  },
  // 二维码开锁
  switch2Change(e){
    console.log(e.detail.value);
    //开锁方式的选择
    if (e.detail.value){
      this.setData({
        choice2Result: 1
      })
    }else{
      this.setData({
        choice2Result: 0
      })
    }
  },
  // 密码开锁
  switch1Change(e) {
    console.log(e.detail.value);
    if (e.detail.value) {
      this.setData({
        choice1Result: 1
      })
    } else {
      this.setData({
        choice1Result: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var mobile = wx.getStorageSync("userphone"); //获取登录时的手机号码
    that.setData({
      mobile: mobile
    })
    //获取房源
    wx.request({
      url: config.roomMessageUrl,
      method: "GET",
      success: function (res) {
        console.log(res);
        var addRName = [];//房源所在的地方的名字
        var addRNum = [];//房源所在的地方的房间
        for (var i = 0; i < res.data.data.length; i++) {
          var rname = res.data.data[i].name;
          var rid = res.data.data[i].houseRooms;
          addRName.push(rname);
          addRNum.push(rid);
          that.setData({
            arrayRoom: [addRName,[]],
            rid: addRNum
          })

        }
        //获取所有的房间号
        var result = [];
        for(var j=0;j<that.data.rid.length;j++){
          var endRNum = [];
          for(var k=0;k<that.data.rid[j].length;k++){
              var eRoomNum = that.data.rid[j][k].roomNum;
              endRNum.push(eRoomNum);
          }
          result.push(endRNum);
         
        }
         that.setData({
           enterERoomNum: result,
          })
           console.log(that.data.enterERoomNum);
           that.setData({
             arrayRoom: [that.data.arrayRoom[0], that.data.enterERoomNum[0]]
           })
      },
      fail: function (res) {
        console.log(res)
      }
    })

    
  //日期选择
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
    });
  },
  //起始时间
  startTap: function () {
    this.datetimePicker.setPicker('startDate');
  },
  //失效时间
  endTap: function () {
    this.datetimePicker.setPicker('endtDate');
  },
  //表单提交
  formSubmit: function (e) {
    //判断选择开锁方式
    if (this.data.choice1Result == 0 && this.data.choice2Result==0){
         this.data.choiceWay = 0;
    } else if (this.data.choice1Result == 0 && this.data.choice2Result == 1){
         this.data.choiceWay = 1;
    } else if (this.data.choice1Result == 1 && this.data.choice2Result == 0) {
         this.data.choiceWay = 2;
    }else{
         this.data.choiceWay = 3;
    }
    console.log(e)
    var nowtime = new Date();
    var unowtime = nowtime.getTime() / 1000;//现在的时间戳
    var ustartTime = Date.parse(new Date(e.detail.value.start)) / 1000;//开始的时间戳
    var uendtime = Date.parse(new Date(e.detail.value.end)) / 1000;//结束的时间戳
    console.log(unowtime);
    console.log(ustartTime);
    console.log(uendtime);
    console.log(this.data.choiceWay);
//获取房间的id
    wx.request({
      url: config.roomMessageUrl,
      method: "GET",
      success: function (res) {
        var roomName = [];
        var rn = that.data.arrayRoom[1][that.data.indexRoom[1]];//所选择的房间号
        var ra = that.data.arrayRoom[0][that.data.indexRoom[0]];//所选择的房源地方
        for (var i = 0; i < res.data.data.length; i++) {
          var rname = res.data.data[i].name;
          roomName.push(rname);
          that.setData({
            cRoomName: roomName
          })
          if (ra == rname){
              var flag = true;
           } 
        }
        console.log(that.data.cRoomName);

        for (var j = 0; j < that.data.rid.length; j++) {
            for (var k = 0; k < that.data.rid[j].length; k++) {
              var eRoomNId = that.data.rid[j][k].roomNum;
              console.log(eRoomNId);
              if (rn == eRoomNId){
                console.log(that.data.rid[j][k].id);
                var roId = that.data.rid[j][k].id;
                var rflag = true;
              }
            }

        }
        if(flag==true &&rflag ==true){
          that.setData({
            rooId:roId
          })
        }

      },
      fail: function (res) {
        console.log(res)
      }
    })

    var that = this;
    if (uendtime <= ustartTime) {
      wx.showToast({
        title: '开始时间不能大于失效时间',
        image: "/images/login/error.png"
      })
    } else if (uendtime <= unowtime){
      wx.showToast({
        title: '失效时间不能比现在时间小',
        image: "/images/login/error.png"
      })
    } else if (ustartTime +180 <= unowtime) {
      console.log(this.data.arrayRoom[1]);
      wx.showToast({
        title: '开始时间不能比现在时间小',
        image: "/images/login/error.png"
      })
    }else {
      wx.request({
        url: config.openLockApplyUrl,
        data: {
          "roomId": that.data.rooId,
          "name":that.data.indexName+1,
          "pwdStartAt":e.detail.value.start,
          "pwdEndAt": e.detail.value.end,
          "pwdType":that.data.choiceWay,
          "remark":e.detail.value.noticename,
          "mobile": that.data.mobile
        },
        method: "POST",
        success: function (res) {
          if(res.data.code ==0){
             wx.redirectTo({
               url: '/pages/applyList/applyList',
             })
          }else{
            wx.showModal({
              title: '注意!',
              content: res.data.msg,
            })
          }
          
        },
        fail: function (res) {
          console.log(res)
        }
      })

        
    }
  },
  goApplyList(){
    wx.redirectTo({
      url: '/pages/applyList/applyList',
    })
  },
  bindPickerName(e){
    console.log(e.detail.value-0);
    this.setData({
      indexName: e.detail.value-0
    })
  },
  bindPickerRoom(e){
    console.log(e);
    console.log(e.detail.value[1]);
    if(e.detail.value[0]==null){
      e.detail.value[0] =0;
    }
    this.setData({
      indexRoom: e.detail.value
    })
  },
  bindColumnPickerRoom(e){
    var that = this;
    console.log(e);
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      arrayRoom: that.data.arrayRoom,
      indexRoom: that.data.indexRoom
    };
    data.indexRoom[e.detail.column] = e.detail.value;
    console.log(that.data.enterERoomNum);
    console.log(that.data.rid);
    console.log(that.data.arrayRoom[0].length);
    console.log(data.indexRoom[0]);
    for (var i = 0; i < that.data.arrayRoom[0].length;i++){
      if (data.indexRoom[0] == i){
        data.arrayRoom[1] = that.data.enterERoomNum[i];
      }
    }
      this.setData(data);
  }
})