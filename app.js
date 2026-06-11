const cloudAssets = require('./utils/cloudAssets.js')

App({
  globalData: {
    favorites: [],
    selectionList: [],
    userInfo: null
  },

  onLaunch() {
    cloudAssets.initCloud()

    const favorites = wx.getStorageSync('favorites') || []
    this.globalData.favorites = favorites
    this.globalData.selectionList = wx.getStorageSync('selectionList') || []
    this.globalData.userInfo = wx.getStorageSync('userInfo') || null
  }
})
