// pages/index/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["北京", "北京", "东城"],
    regionText: "",
    icon: "999",
    coordinate: [0, 0]
  },

  setRegionText: function (type) {
    var loc = ""
    var that = this
    if (type == 2) {
      loc = that.data.region[0] + ", " + that.data.region[1]
    } else {
      loc = that.data.region[0] + ", " + that.data.region[1] + ", " + that.data.region[2]
    }
   
    that.setData({
      regionText: loc
    })
    app.globalData.regionText = that.data.regionText
  },

  toThreeDay: function () {
    wx.navigateTo({
      url: '../threeDay/threeDay',
    })
  },

  // type == 0 未获取当前位置（默认）
  // type == 1 使用当前位置
  // type == 2 地区不可用且使用上一级行政区
  getCity: function (type = 0) {
    var that = this
    if (type == 1) {
      var loc = that.data.coordinate[0] + ',' + that.data.coordinate[1]
      var aid = ''
    } else {
      if (type == 0) {
        var loc = that.data.region[2]
      } else {
        var loc = that.data.region[1]
      }
      var aid = that.data.region[0]
    } 
    console.log(loc)
    wx.request({
      url: 'https://geoapi.heweather.net/v2/city/lookup?',
      data: {
        location: loc,
        adm: aid,
        key: "cdc22bb541704ce682ee9daf62ab1066"
      },
      success: function (e) {
        console.log(e.data)
        if (e.data.code == 200) {
          that.setData({
            regionId: e.data.location[0].id
          })
          if (type == 1) {
            that.setData({
              region: [e.data.location[0].adm1, e.data.location[0].adm2, e.data.location[0].name]
            })
          }
          app.globalData.regionId = that.data.regionId
          that.setRegionText(type)
          that.getWeather()
        } else {
          wx.showModal({
            title: "提示",
            content: '未找到当前地区信息，是否获取上一级行政区域 ' + that.data.region[1] + ' 的天气？',
            success (res) {
              if (res.confirm) {
                console.log('获取上级行政区天气')
                that.getCity(2)
              } else if (res.cancel) {
                wx.showToast({
                  title: '获取地区天气失败',
                  icon: 'none'
                })
              }
            }
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: "Error",
          content: e.errMsg,
          showCancel: false,
        })
      }
    })
  },

  getWeather: function () {
    var that = this
    console.log(that.data.regionId)
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
          })
        } else {
          wx.showModal({
            title: "Error",
            content: e.data.code,
            showCancel: false,
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: "Error",
          content: e.errMsg,
          showCancel: false,
        })
      }

    })
  },

  changeRegion: function (e) {
    var loc = ['', '', '']
    var array = e.detail.value
    for (var i in array) {
      let len = array[i].length
      if (array[0].charAt(array[0].length - 1) == "区") {
        loc[i] = array[i]
        continue
      }
      if (array[i] && len > 2) {
        loc[i] = array[i].substr(0, len - 1)
      } else {
        loc[i] = array[i]
      }
    }
    console.log(loc)
    this.setData({
      region: loc
    })
    this.getCity()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      success: function (e) {
        that.setData({
          coordinate: [e.longitude, e.latitude]
        })
        console.log(that.data.coordinate)
        that.getCity(1)
      },
      fail: function () {
        wx.showToast({
          title: '未获取到当前位置信息',
          icon: 'none'
        })
        that.getCity()
      }
    })
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
