// pages/blex/blex.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.startConnect();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  time(){

  },
  startConnect(){
    var that = this;
    wx.showLoading({
      title:'开启蓝牙适配'
    })
    wx.openBluetoothAdapter({
          success:function(res){
            console.log(res);
              console.log('初始化蓝牙适配器');
              that.getBluetoothAdapterState();
          },
          fail:function(err){
              console.log(err);
              wx.showToast({
                title: '蓝牙初始化失败',
                duration:2000
              })
          }
    });
    wx.onBluetoothAdapterStateChange(function(res){
        var available = res.available;
        if (available) {//判断用户是否开启系统蓝牙
            that.getBluetoothAdapterState();
        }
    })
  },
  //获取本机蓝牙适配器状态，是否是可用的
  getBluetoothAdapterState(){
    var that = this;
    wx.getBluetoothAdapterState({
      success: function(res) {
        var available = res.available,
        discovering = res.discovering;
        if(!available){
            wx.showToast({
              title: '设备无法开启蓝牙连接',
              duration:2000
            })
            setTimeout(function(){
              wx.hideToast()
            },2000)
        }else{
          if(!discovering){
            that.startBluetoothDevicesDiscovery();//开始扫描附近的蓝牙设备
            that.getConnectedBluetoothDevices();//获取本机已配对的蓝牙设备
          }
        }
      },
    })
  },
  //开始搜索蓝牙设备，提示蓝牙搜索
  startBluetoothDevicesDiscovery(){
    var that = this;
    wx.showToast({
      title: '蓝牙搜索',
    })
    wx.startBluetoothDevicesDiscovery({
      services: [],//此参数必填，不填此属性，将无法获取任何已配对的设备，，官方没有提示
      allowDuplicateKey: false,
      success: function(res) {
        //判断蓝牙是否处于搜索状态
        if (res.isDiscovering){
              that.getBluetoothAdapterState()
        }else{
          that.onBluetoothDeviceFound();
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  getConnectedBluetoothDevices(){
    var that = this;
    wx.getConnectedBluetoothDevices({
      services: [that.serviceId],
      success: function(res) {
        console.log('获取处于连接状态的设备',res);
        that.setData({
          s:res
        })
        var devices = res['devices'],
            flag = false,
            index = 0,
            conDevList = [];
            devices.forEach(function(value,index,array){
              if(value['name'].indexOf('FeiZhi') != -1){
                //如果存在包含FeiZhi字段的设备
                flag = true;
                index = 1;
                conDevList.push(value['deviceId']);
                that.deviceId = value['deviceId'];
                return;
              }
            });
            if(flag){
              this.connectDeviceIndex = 0;
              that.loopConnect(conDevList);
            }
            else{
              if(!this.getConnectedTimer){
                that.getConnectedTimer = setTimeout(function(){
                  that.getConnectedBluetoothDevices();
                },5000)
              }
            }
      },
      fail:function(err){
        if(!this.getConnectedTimer){
         that.getConnectedTimer = setTimeout(function(){
           that.getConnectedBluetoothDevices();
         },5000)
        }
      }
    })
  },
  //如果蓝牙启动失败，回到第二步
  onBluetoothDeviceFound(){
    var that = this;
    console.log('onBluetoothDeviceFound');
    wx.onBluetoothDeviceFound(function(res){
      console.log('new device list has founded')
      console.log(res);
      if(name !=''){
        if(name.indexOf('FeiZhi') !=-1){
          var deviceId = res.devices[0]['deviceId'];
          that.deviceId = deviceId;
          console.log(that.deviceId);
          that.startConnectDevices();
        }
      }
    })
  },
  startConnectDevices(ltype,array){
      var that = this;
      clearTimeout(that.getConnectedTimer);
      that.getConnectedTimer = null;
      clearTimeout(that.discoveryDevicesTimer);
      that.stopBluetoothDevicesDiscovery();
      this.isConnectting  = true;
      wx.createBLEConnection({
        deviceId:that.deviceId,
        success:function(res){
            if(res.errCode ==0){
              setTimeout(function(){
                that.getSevice(that.deviceId);
              },5000)
            }
        },
        fail:function(err){
          console.log('连接失败：',err);
          if(ltype == 'loop'){
            that.connectDeviceIndex +=1;
            that.loopConnect(array);
          }else{
            that.startBluetoothDevicesDiscovery();
            that.getConnectedBluetoothDevices();
          }
        },
        complete:function(){
          console.log('complete connect devices');
          this.isConnectting = false;
        }
      })
  },
  getService(){
    var that = this;
    wx.onBLEConnectionStateChange(function(res){
      console.log(res);
    });
    wx.getBLEDeviceServices({
      deviceId: deviceId,
      success: function(res) {
        that.getCharacter(deviceId,res.services)
      },
    })
  },
  getCharacter(deviceId, services){
    var that = this;
    services.forEach(function(value,index,array){
      if(value == that.serviceId){
        that.serviced = array[index];
      }
    });
    wx.getBLEDeviceCharacteristics({
      deviceId:that.serviceId,
      success:function(res){
        that.writeBLECharacteristicValue(deviceId,that,serviceId,that,characterId_write);
        that.openNotifyService(deviceId,that,serviceId,that.characterId_read);
      },
      fail:function(err){
          console.log(err)
      },
      complete:function(){
        console.log('complete');
      }
    })
  },
  loopConnect(deviceId){
      var that = this;
      var listLen = devicesId.length;
      if(devicesId[this.connectDeviceIndex]){
          this.devicesId = devicesId[this.connectDevicesId];
          this.startConnectDevices('loop',devicesId);
      }else{
        console.log('已配对的设备小程序蓝牙连接失败');
        that.startBluetoothDevicesDiscovery();
        that.getConnectedBluetoothDevices();
      }
  }
})