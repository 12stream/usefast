//index.js
Page({
  data: {
    list_data: [],
    title: "正在加载数据..."
  },
  onLoad: function () {
    var that = this
    that.setData({
      list_data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    })
  },
  onReachBottom: function () {
    var that = this
    setTimeout(function () {
      that.setData({
        list_data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        title: "数据加载完毕"
      })
    }, 1000)
  }
})