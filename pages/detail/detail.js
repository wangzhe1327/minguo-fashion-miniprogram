const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    item: {},
    specs: [],
    recommendations: [],
    isLiked: false
  },

  async onLoad(options) {
    const sysInfo = wx.getSystemInfoSync()
    const id = parseInt(options.id)
    const item = await resolveCloudUrls(data.getById(id))

    if (!item) {
      wx.showToast({ title: '服装不存在', icon: 'error' })
      setTimeout(() => wx.navigateBack(), 1500)
      return
    }

    const favorites = app.globalData.favorites
    const specs = this.parseSpecs(item.detailDesc)
    const recommendations = await resolveCloudUrls(data.clothingList
      .filter(c => c.category === item.category && c.id !== item.id)
      .slice(0, 4))

    this.setData({
      statusBarHeight: sysInfo.statusBarHeight,
      item,
      specs,
      recommendations,
      isLiked: favorites.includes(id)
    })
  },

  parseSpecs(desc) {
    return desc.split('\n').map(line => {
      const parts = line.split('：')
      return { label: parts[0], value: parts[1] || '' }
    })
  },

  goBack() {
    wx.navigateBack()
  },

  toggleLike() {
    const id = this.data.item.id
    let favorites = app.globalData.favorites
    const index = favorites.indexOf(id)

    if (index > -1) {
      favorites.splice(index, 1)
      wx.showToast({ title: '已取消收藏', icon: 'none' })
    } else {
      favorites.push(id)
      wx.showToast({ title: '已收藏', icon: 'success' })
    }

    app.globalData.favorites = favorites
    wx.setStorageSync('favorites', favorites)
    this.setData({ isLiked: index === -1 })
  },

  onShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onShareAppMessage() {
    const item = this.data.item
    return {
      title: `${item.name} - ${item.subtitle}`,
      path: `/pages/detail/detail?id=${item.id}`,
      imageUrl: item.image
    }
  },

  onRecommendTap(e) {
    const id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  onTryOn() {
    wx.navigateTo({
      url: `/pages/tryon/tryon?id=${this.data.item.id}`
    })
  }
})
