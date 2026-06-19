const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const { getStatusBarHeight } = require('../../utils/system.js')
const selection = require('../../utils/selection.js')
const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    userInfo: {},
    favorites: [],
    favoriteItems: [],
    selectionCount: 0,
    browseCount: 0,
    totalCount: 0
  },

  onLoad() {
    this.setData({ statusBarHeight: getStatusBarHeight() })
    this.refreshProfile()
  },

  onShow() {
    this.refreshProfile()
  },

  async refreshProfile() {
    const favorites = app.globalData.favorites || []
    const selectedIds = selection.getSelectionList()
    const favoriteItems = await resolveCloudUrls(data.clothingList
      .filter(item => favorites.includes(item.id))
      .map(item => ({
        ...item,
        liked: true,
        selected: selectedIds.includes(item.id)
      })))

    this.setData({
      userInfo: app.globalData.userInfo || {},
      favorites,
      favoriteItems,
      selectionCount: selectedIds.length,
      browseCount: wx.getStorageSync('browseCount') || 0,
      totalCount: data.clothingList.length
    })
  },

  onLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: res => {
        app.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({ userInfo: res.userInfo })
        wx.showToast({ title: '登录成功', icon: 'success' })
      },
      fail: () => {
        wx.showToast({ title: '登录已取消', icon: 'none' })
      }
    })
  },

  goToSelection() {
    wx.switchTab({ url: '/pages/selection/selection' })
  },

  goToGallery() {
    wx.navigateTo({ url: '/pages/gallery/gallery' })
  },

  goToRetouch() {
    wx.navigateTo({ url: '/pages/retouch/retouch' })
  },

  goToFavorites() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  goToHistory() {
    const history = wx.getStorageSync('browseHistory') || []
    const names = history
      .map(id => data.getById(id))
      .filter(Boolean)
      .slice(0, 8)
      .map(item => item.name)

    wx.showModal({
      title: '最近浏览',
      content: names.length ? names.join('\n') : '还没有浏览记录',
      showCancel: false
    })
  },

  goToAbout() {
    wx.showModal({
      title: '关于浮光旅影',
      content: '浮光旅影专注民国风与传统服饰选款展示，支持收藏、清单汇总和咨询文案整理。',
      showCancel: false
    })
  },

  onClothingTap(e) {
    const id = e.detail.id || e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onSelectionChange() {
    this.refreshProfile()
  },

  onLikeChange() {
    this.refreshProfile()
  }
})
