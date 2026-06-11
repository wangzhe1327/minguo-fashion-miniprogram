const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const { getStatusBarHeight } = require('../../utils/system.js')
const selection = require('../../utils/selection.js')
const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    categories: [],
    banners: [],
    clothingList: [],
    activeCategory: 'all',
    currentCategoryName: '精选',
    searchKeyword: '',
    selectionCount: 0
  },

  async onLoad() {
    const banners = await resolveCloudUrls(data.banners)
    const clothingList = await resolveCloudUrls(data.clothingList)

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      categories: data.categories,
      banners,
      clothingList: this.decorateItems(clothingList),
      selectionCount: selection.getSelectionList().length
    })
  },

  onShow() {
    this.syncItemStates()
  },

  decorateItems(items) {
    const favorites = app.globalData.favorites || []
    const selectedIds = selection.getSelectionList()

    return (items || []).map(item => ({
      ...item,
      liked: favorites.includes(item.id),
      selected: selectedIds.includes(item.id)
    }))
  },

  syncItemStates() {
    if (!this.data.clothingList.length) return

    this.setData({
      clothingList: this.decorateItems(this.data.clothingList),
      selectionCount: selection.getSelectionList().length
    })
  },

  async onCategoryTap(e) {
    const id = e.currentTarget.dataset.id
    const category = data.categories.find(item => item.id === id)
    const clothingList = await resolveCloudUrls(data.getByCategory(id))

    this.setData({
      activeCategory: id,
      currentCategoryName: category ? category.name : '精选',
      clothingList: this.decorateItems(clothingList),
      searchKeyword: ''
    })
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
  },

  async onSearch() {
    const keyword = this.data.searchKeyword.trim().toLowerCase()
    const source = keyword ? data.clothingList : data.getByCategory(this.data.activeCategory)

    const filtered = keyword
      ? source.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.subtitle.toLowerCase().includes(keyword) ||
        item.categoryName.toLowerCase().includes(keyword) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
      : source

    const clothingList = await resolveCloudUrls(filtered)
    this.setData({ clothingList: this.decorateItems(clothingList) })
  },

  async onClearSearch() {
    const clothingList = await resolveCloudUrls(data.getByCategory(this.data.activeCategory))
    this.setData({
      searchKeyword: '',
      clothingList: this.decorateItems(clothingList)
    })
  },

  onBannerTap(e) {
    const bannerId = e.currentTarget.dataset.id
    const banner = data.banners.find(item => item.id === bannerId)
    const clothing = banner ? data.clothingList.find(item => item.name === banner.title) : null

    if (clothing) {
      wx.navigateTo({ url: `/pages/detail/detail?id=${clothing.id}` })
    }
  },

  onClothingTap(e) {
    const id = e.detail.id || e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  },

  onSelectionChange() {
    this.syncItemStates()
  },

  onLikeChange() {
    this.syncItemStates()
  },

  goSelection() {
    wx.switchTab({ url: '/pages/selection/selection' })
  },

  goGallery() {
    wx.navigateTo({ url: '/pages/gallery/gallery' })
  }
})
