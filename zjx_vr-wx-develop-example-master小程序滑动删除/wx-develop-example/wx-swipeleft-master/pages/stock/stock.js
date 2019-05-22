// pages/stock/stock.js
//加载插件
var wxCharts = require('wxcharts.js');

Page({
  data: {
    obj1: {
      a: 1,
      b: 2
    },
    obj2: {
      b: 3,
      c: 4
    },
    a: 5,
    multiArray: [['长城客栈', '时代骄子', '南山智园'], ['201', '202', '203', '204', '205']],
    multiIndex: [0, 0],
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log(e);
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['201', '202', '203', '204', '205'];
            break;
          case 1:
            data.multiArray[1] = ['301', '302', '303', '304', '305'];
            break;
            case 2:
            data.multiArray[1] = ['401', '402', '403', '404', '405'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
      // case 1:
      //   switch (data.multiIndex[0]) {
      //     case 0:
      //       switch (data.multiIndex[1]) {
      //         case 0:
      //           data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
      //           break;
      //         case 1:
      //           data.multiArray[2] = ['蛔虫'];
      //           break;
      //         case 2:
      //           data.multiArray[2] = ['蚂蚁', '蚂蟥'];
      //           break;
      //         case 3:
      //           data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
      //           break;
      //         case 4:
      //           data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
      //           break;
      //       }
      //       break;
      //     case 1:
      //       switch (data.multiIndex[1]) {
      //         case 0:
      //           data.multiArray[2] = ['鲫鱼', '带鱼'];
      //           break;
      //         case 1:
      //           data.multiArray[2] = ['青蛙', '娃娃鱼'];
      //           break;
      //         case 2:
      //           data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
      //           break;
      //       }
      //       break;
      //   }
      //   data.multiIndex[2] = 0;
      //   console.log(data.multiIndex);
      //   break;
    }
    this.setData(data);
  },
  onLoad: function (options) {

    //建立连接
    wx.connectSocket({
      url: "ws://localhost:12345",
    })

    //连接成功
    wx.onSocketOpen(function () {
      wx.sendSocketMessage({
        data: 'stock',
      })
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      var objData = JSON.parse(data.data);
      console.log(data);
      new wxCharts({
        canvasId: 'lineCanvas',//指定canvas的id
        animation: false,
        type: 'line',//类型是线形图
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],

        series: [{
          name: '交易量',
          data: objData,//websocket接收到的数据
          format: function (val) {
            if (typeof val == "string") {
              val = parseFloat(val);
            }
            return val.toFixed(2) + '万元';
          }
        },
        ],
        yAxis: {
          title: '交易金额 (万元)',
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: 320,
        height: 200
      });
    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
  }
})