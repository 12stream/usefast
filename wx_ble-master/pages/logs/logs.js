//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    blex: '',
    startblex: "",
    list: []
  },
  onLoad: function () {
    this.startConnect();
  },
  // 开启蓝牙适配
  startConnect: function () {
    var that = this;
    // 判断客户端是否连接了蓝牙
    wx.openBluetoothAdapter({
      success: function (res) {
        wx.showModal({
          title: '初始化蓝牙设备！',
        });
        console.log("csh" + res);
        // 客户端连接了蓝牙,获取蓝牙适配的状态，判断设备蓝牙是否可用
        that.getBluetoothAdapterState();
      },
      fail: function (err) {
        wx.showModal({
          title: "蓝牙初始化失败",
        });
      }
    })
    // 监听客户端是否开启蓝牙
    wx.onBluetoothAdapterStateChange(function (res) {
      var available = res.available;
      console.log("kehuduan" + res);
      // 如果用户蓝牙从未开启转为开启，获取蓝牙适配的状态，判断设备蓝牙是否可用
      if (available) {
        that.getBluetoothAdapterState();
      }
    })
  },
  // 获取本机蓝牙状态，discovering参数为是否正在搜索设备，available参数为蓝牙适配器是否可用
  getBluetoothAdapterState: function () {
    var that = this;
    wx.getBluetoothAdapterState({
      success: function (res) {
        console.log("keyong");
        console.log(res);
        var available = res.available,
          discovering = res.discovering;
        if (!available) {
          wx.showModal({
            title: '设备无法开启蓝牙连接',
          })
        } else {
          // 蓝牙适配器可用后，判断蓝牙适配器可用时开启扫描蓝牙设备和开启获取已连接的蓝牙设备
          if (!discovering) {
            that.startBluetoothDevicesDiscovery();
          }
        }
      },
    })
  },
  // 开始搜索新设备
  startBluetoothDevicesDiscovery: function () {
    var that = this;
    // 此处的services可以是指定的蓝牙，不填则代表搜索所有的蓝牙设备
    wx.startBluetoothDevicesDiscovery({
      services: [],
      allowDuplicatesKey: false,
      success: function (res) {
        wx.showModal({
          title: "搜索12",
          content: JSON.stringify(res)
        })
        console.log("12121");
        console.log(res);
        // 判断有没有搜索到，没有则监听客户端是否开启蓝牙，，，有则监听寻找到新设备的事件，从而获取设备信息
        if (!res.isDiscovering) {//true
          console.log("未搜到");
          that.getBluetoothAdapterState();
        } else {
          console.log("搜到");
          that.onBluetoothDeviceFound();
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  // 监听寻找到新设备的事件，获取蓝牙的相关信息
  onBluetoothDeviceFound: function () {
    var that = this;
    // var lists=that.data.list;
    wx.onBluetoothDeviceFound(function (res) {
      wx.showModal({
        title: 'new device list has founded' + res.devices[0]['name'],
        content: JSON.stringify(res),
      })
      console.log("uuid");
      console.log(res.devices);
      console.log(res.devices[0].deviceId);
      that.setData({
        dId: res.devices[0].deviceId
      })
      that.getConnectedBluetoothDevices();
    })
  },
  // 获取已配对的蓝牙设备
  getConnectedBluetoothDevices: function () {
    var that = this;
    var lists = that.data.list;
    wx.getBluetoothDevices({
      success: function (res) {
        console.log("获取");
        console.log(res.devices);
        if (res.devices==null) {
          that.getConnectedTimer = setTimeout(function () {
            that.getConnectedBluetoothDevices();
          }, 5000)
        } else {
          res.devices.forEach(function (value, index) {
            console.log(value.deviceId);
            console.log(index);
            lists.push(value);
            that.setData({
              newDevice: lists,
              showDevices: JSON.stringify(lists)
            })
            console.log("that.data.newDevice");
            console.log(that.data.newDevice);
          })
        }
        
        // wx.getConnectedBluetoothDevices({
        //   services: [that.data.dId],
        //   success: function (res) {
        //     console.log("获取连接");
        //     console.log(res);
        //     var devices = res['devices'],
        //       flag = flag,
        //       index = 0,
        //       conDevList = [];
        //     console.log(flag);
        //   },
        //   fail: function (err) {
        //     if (!this.getConnectedTimer) {
        //       that.getConnectedBluetoothDevices();
        //     }
        //   }
        // })
        
      },
    })

  },
  // 用于连接已经搜索到的蓝牙设备
  connectTO(e){
    wx.showModal({
      title: '',
      content: e.currentTarget.id,
    })
      var that = this;
      wx.createBLEConnection({
        deviceId: e.currentTarget.id,
        success: function(res) {
          that.setData({
            connectedDeviceId: e.currentTarget.id
          })
          console.log("nihao连接");
          console.log(res);
          // 连接成功后,获取蓝牙设备所有 service（服务）
          wx.getBLEDeviceServices({
            deviceId: e.currentTarget.id,
            success: function(res) {
              that.setData({
                services: res.services
              })
              console.log("fuwu");
              console.log(res);
              console.log(that.data.services);
              that.setData({
                serviceId: that.data.services[1].uuid,
                needDeviceId: e.currentTarget.id
              });
              // 获取蓝牙设备某个服务中的所有 characteristic（特征值） 需要对其延迟1s左右
              setTimeout(function(){
                  wx.getBLEDeviceCharacteristics({
                    deviceId: e.currentTarget.id,
                    serviceId: that.data.serviceId,
                    success: function(res) {
                      console.log('000000000000' + that.data.serviceId);
                      // 此处获得的res.characteristics特征值中的properties中indicate为false，notify为false，read为false，write为true
                      // res.characteristics[1]中的properties中的indicate为flase，notify为true，read为false，write为false
                      console.log('device getBLEDeviceCharacteristics:', res.characteristics)
                      for (var i = 0; i < res.characteristics.length; i++) {
                        if (res.characteristics[i].uuid.indexOf("808D") != -1) {
                          that.setData({
                            cd20: res.characteristics[i].uuid,
                            characteristics20: res.characteristics[i]
                          });
                        }
                        if (res.characteristics[i].uuid.indexOf("FFC1") != -1) {
                          that.setData({
                            cd01: res.characteristics[i].uuid,
                            characteristics01: res.characteristics[i]
                          });
                        }
                        if (res.characteristics[i].uuid.indexOf("FFC2") != -1) {
                          that.setData({
                            cd02: res.characteristics[i].uuid,
                            characteristics02: res.characteristics[i]
                          });
                        } if (res.characteristics[i].uuid.indexOf("57B1") != -1) {
                          that.setData({
                            cd03: res.characteristics[i].uuid,
                            characteristics03: res.characteristics[i]
                          });
                        }
                        if (res.characteristics[i].uuid.indexOf("23AB") != -1) {
                          that.setData({
                            cd04: res.characteristics[i].uuid,
                            characteristics04: res.characteristics[i]
                          });
                        }
                      }
                      console.log('cd01= ' + that.data.cd01 + 'cd02= ' + that.data.cd02 + 'cd03= ' + that.data.cd03 + 'cd04= ' + that.data.cd04 + 'cd20= ' + that.data.cd20);

                      /**
                      * 回调获取 设备发过来的数据
                      */
                      wx.onBLECharacteristicValueChange(function (res) {
                        // console.log('characteristic value comed:', characteristic.value)
                        console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
                        //{value: ArrayBuffer, deviceId: "D8:00:D2:4F:24:17", serviceId: "ba11f08c-5f14-0b0d-1080-007cbe238851-0x600000460240", characteristicId: "0000cd04-0000-1000-8000-00805f9b34fb-0x60800069fb80"}
                        /**
                         * 监听cd04cd04中的结果
                         */
                        // if (characteristic.characteristicId.indexOf("cd01") != -1) {
                        //   const result = characteristic.value;
                        //   const hex = that.buf2hex(result);
                        //   console.log(hex);
                        // }
                        // if (characteristic.characteristicId.indexOf("cd04") != -1) {
                        //   const result = characteristic.value;
                        //   const hex = that.buf2hex(result);
                        //   console.log(hex);
                        //   that.setData({ result: hex });
                        // }

                      })

                      /**
                                    * 顺序开发设备特征notifiy
                                    */
                      wx.notifyBLECharacteristicValueChanged({
                        deviceId: e.currentTarget.id,
                        serviceId: that.data.serviceId,
                        characteristicId: that.data.cd03,
                        state: true,
                        success: function (res) {
                          // success
                          console.log('notifyBLECharacteristicValueChanged success', res);
                        },
                        fail: function (res) {
                          console.log('notifyBLECharacteristicValueChanged fail', res);
                        },
                        complete: function (res) {
                          // complete
                        }
                      })
                      wx.notifyBLECharacteristicValueChanged({
                        deviceId: e.currentTarget.id,
                        serviceId: that.data.serviceId,
                        characteristicId: that.data.cd04,
                        state: true,
                        success: function (res) {
                          // success
                          console.log('notifyBLECharacteristicValueChanged success', res);
                        },
                        fail: function (res) {
                          // fail
                        },
                        complete: function (res) {
                          // complete
                        }
                      })
                    },
                  })
              },1500)
            },
          })
        },
        fail: function () {
          wx.showModal({
            title: '调用失败',
            content: '',
          })
        },
        complete: function () {
          wx.showModal({
            title: '调用结束',
            content: '',
          })
        }
      })
  },
  /**
    * 发送 数据到设备中,此处的 arrayBuffer需要按你和设备的协议填写
    */
  bindViewTap: function () {
    var that = this;
    // var hex = 'AA5504B10000B5'
    // var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
    //   return parseInt(h, 16)
    // }))
    // var list = [];
    // typedArray.forEach(function (value, index) {
    //   console.log(value.toString(2));
    //   list.push(value.toString(2));
    // })
    // console.log(list);
    var hex = 'AA5504B10000B5'
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    console.log(typedArray)
    console.log([0xAA, 0x55, 0x04, 0xB1, 0x00, 0x00, 0xB5]) 
    var buffer1 = typedArray.buffer
    console.log(buffer1)
    wx.writeBLECharacteristicValue({
      deviceId: that.data.needDeviceId,
      serviceId: that.data.serviceId,
      characteristicId: that.data.cd03,
      value: buffer1,
      success: function (res) {
        // success
        console.log("success  指令发送成功");
        console.log(res);
      },
      fail: function (res) {
        // fail
        console.log(res);
      },
      complete: function (res) {
        // complete
      }
    })

  },
})
