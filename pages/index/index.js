const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    categories: [],
    banners: [],
    clothingList: [],
    activeCategory: 'all',
    currentCategoryName: '精选',
    searchKeyword: ''
  },

  async onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    const banners = await resolveCloudUrls(data.banners)
    const clothingList = await resolveCloudUrls(data.clothingList)
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight,
      categories: data.categories,
      banners,
      clothingList
    })
  },

  onShow() {
    this.updateFavorites()
  },

  updateFavorites() {
    const favorites = app.globalData.favorites
    const clothingList = this.data.clothingList.map(item => ({
      ...item,
      liked: favorites.includes(item.id)
    }))
    this.setData({ clothingList })
  },

  async onCategoryTap(e) {
    const id = e.currentTarget.dataset.id
    const category = data.categories.find(c => c.id === id)
    const clothingList = await resolveCloudUrls(data.getByCategory(id))
    const favorites = app.globalData.favorites

    this.setData({
      activeCategory: id,
      currentCategoryName: category ? category.name : '精选',
      clothingList: clothingList.map(item => ({
        ...item,
        liked: favorites.includes(item.id)
      })),
      searchKeyword: ''
    })
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
  },

  async onSearch() {
    const keyword = this.data.searchKeyword.trim().toLowerCase()
    if (!keyword) {
      const clothingList = await resolveCloudUrls(data.getByCategory(this.data.activeCategory))
      this.setData({
        clothingList,
        activeCategory: this.data.activeCategory
      })
      return
    }

    const all = data.clothingList
    const filtered = all.filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      item.subtitle.toLowerCase().includes(keyword) ||
      item.categoryName.toLowerCase().includes(keyword) ||
      item.tags.some(tag => tag.toLowerCase().includes(keyword))
    )
    const favorites = app.globalData.favorites
    const clothingList = await resolveCloudUrls(filtered)
    this.setData({
      clothingList: clothingList.map(item => ({
        ...item,
        liked: favorites.includes(item.id)
      }))
    })
  },

  onBannerTap(e) {
    const bannerId = e.currentTarget.dataset.id
    const banner = data.banners.find(b => b.id === bannerId)
    if (banner) {
      const clothing = data.clothingList.find(c => c.name === banner.title)
      if (clothing) {
        wx.navigateTo({
          url: `/pages/detail/detail?id=${clothing.id}`
        })
      }
    }
  },

  onClothingTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})
