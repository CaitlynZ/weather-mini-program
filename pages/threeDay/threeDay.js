// pages/threeDay/threeDay.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getForcase: function () {
    var that = this
    console.log(that.data.regionId)
    wx.request({
      url: 'https://devapi.heweather.net/v7/weather/3d?',
      data: {
        location: that.data.regionId,
        key: "cdc22bb541704ce682ee9daf62ab1066",
      },
      success: function (e) {
        if (e.data.code == 200) {
          console.log(e.data.daily)
          that.setData({
            forcasts: e.data.daily,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      regionId: app.globalData.regionId,
      regionText: app.globalData.regionText
    })
    this.getForcase()
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
