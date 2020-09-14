// pages/index/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["北京市", "北京市", "东城区"],
    icon: "999",
    notFound: false
  },

  toThreeDay: function () {
    wx.navigateTo({
      url: '../threeDay/threeDay',
    })
  },

  getCity: function () {
    var that = this
    wx.request({
      url: 'https://geoapi.heweather.net/v2/city/lookup?',
      data: {
        location: that.data.region[2],
        adm: that.data.region[0],
        key: "cdc22bb541704ce682ee9daf62ab1066"
      },
      success: function (e) {
        console.log(e.data)
        if (e.data.code == 200) {
          that.setData({
            regionId: e.data.location[0].id,
            notFound: false
          })
          app.globalData.regionId = that.data.regionId
          app.globalData.region = that.data.region
          that.getWeather(that)
        } else {
          wx.showModal({
            title: "Error",
            content: e.data.code,
            showCancel: false,
          })
          that.setData({
            notFound: true
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: "Error",
          content: e.errMsg,
          showCancel: false,
        })
        that.setData({
          notFound: true
        })
      }
    })
  },

  getWeather: function (that) {
    wx.request({
      url: 'https://devapi.heweather.net/v7/weather/now?',
      data: {
        location: that.data.regionId,
        key: "cdc22bb541704ce682ee9daf62ab1066"
      },
      success: function (e) {
        console.log(e.data.now)
        if (e.data.code == 200) {
          that.setData({
            now: e.data.now,
            icon: e.data.now.icon,
            notFound: false,
          })
        } else {
          wx.showModal({
            title: "Error",
            content: e.data.code,
            showCancel: false,
          })
          that.setData({
            notFound: true
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: "Error",
          content: e.errMsg,
          showCancel: false,
        })
        that.setData({
          notFound: true
        })
      }

    })
  },

  changeRegion: function (e) {
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.getCity()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCity()
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

  }
})
