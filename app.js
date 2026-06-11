const cloudAssets = require('./utils/cloudAssets.js')

App({
  globalData: {
    favorites: [],
    userInfo: null
  },

  onLaunch() {
    cloudAssets.initCloud()

    const favorites = wx.getStorageSync('favorites') || []
    this.globalData.favorites = favorites
  }
})
