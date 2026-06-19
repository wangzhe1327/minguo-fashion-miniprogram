const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const { getStatusBarHeight } = require('../../utils/system.js')
const selection = require('../../utils/selection.js')
const app = getApp()

function toCardItem(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    categoryName: item.categoryName,
    subtitle: item.subtitle,
    image: item.image,
    serialNo: item.serialNo || String(item.id).padStart(2, '0')
  }
}

function toCardItems(items) {
  return (items || []).map(toCardItem)
}

Page({
  data: {
    statusBarHeight: 44,
    categories: [],
    banners: [],
    clothingList: [],
    activeCategory: 'all',
    currentCategoryName: '精选',
    searchKeyword: '',
    selectionCount: 0,
    isLoadingAssets: true
  },

  onLoad() {
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      categories: data.categories,
      selectionCount: selection.getSelectionList().length,
      isLoadingAssets: true
    })

    this.loadHomeAssets()
  },

  async loadHomeAssets() {
    try {
      const resolved = await resolveCloudUrls({
        banners: data.banners,
        clothingList: toCardItems(data.clothingList)
      })

      this.setData({
        banners: resolved.banners || [],
        clothingList: this.decorateItems(resolved.clothingList),
        isLoadingAssets: false
      })
    } catch (err) {
      console.warn('load home assets failed', err)
      this.setData({
        clothingList: this.decorateItems(toCardItems(data.clothingList)),
        isLoadingAssets: false
      })
    }
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
    const clothingList = await resolveCloudUrls(toCardItems(data.getByCategory(id)))

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

    const clothingList = await resolveCloudUrls(toCardItems(filtered))
    this.setData({ clothingList: this.decorateItems(clothingList) })
  },

  async onClearSearch() {
    const clothingList = await resolveCloudUrls(toCardItems(data.getByCategory(this.data.activeCategory)))
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
