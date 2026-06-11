const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    userInfo: {},
    favorites: [],
    favoriteItems: [],
    browseCount: 0
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight,
      userInfo: app.globalData.userInfo || {},
      favorites: app.globalData.favorites || [],
      browseCount: wx.getStorageSync('browseCount') || 0
    })
    this.updateFavorites()
  },

  onShow() {
    this.setData({
      favorites: app.globalData.favorites || [],
      userInfo: app.globalData.userInfo || {},
      browseCount: wx.getStorageSync('browseCount') || 0
    })
    this.updateFavorites()
  },

  async updateFavorites() {
    const favorites = app.globalData.favorites || []
    const favoriteItems = await resolveCloudUrls(data.clothingList
      .filter(item => favorites.includes(item.id))
      .map(item => ({ ...item, liked: true })))
    this.setData({ favoriteItems })
  },

  onLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({ userInfo: res.userInfo })
        wx.showToast({ title: '登录成功', icon: 'success' })
      },
      fail: () => {
        wx.showToast({ title: '登录取消', icon: 'none' })
      }
    })
  },

  goToFavorites() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  goToHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  goToAbout() {
    wx.showModal({
      title: '关于锦衣旧梦',
      content: '锦衣旧梦是一款专注于传统服饰展示的小程序，收录旗袍、童装、汉服等精美服饰，让用户领略东方传统服饰之美。',
      showCancel: false
    })
  },

  onClothingTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})
