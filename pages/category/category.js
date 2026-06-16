const { clothingImage, resolveCloudUrls } = require('../../utils/cloudAssets.js')
const { getStatusBarHeight } = require('../../utils/system.js')
const selection = require('../../utils/selection.js')
const data = require('../../utils/data.js')
const app = getApp()

function toCardItem(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    categoryName: item.categoryName,
    subtitle: item.subtitle,
    image: item.image,
    price: item.price
  }
}

function toCardItems(items) {
  return (items || []).map(toCardItem)
}

const categoryBanners = {
  all: clothingImage(8),
  qipao: clothingImage(25),
  tongzhuang: clothingImage(1),
  hanfu: clothingImage(7)
}

const categoryDesc = {
  all: '精选民国风与传统服饰，适合写真、演出、亲子和日常主题搭配。',
  qipao: '旗袍线条利落，适合复古写真、晚宴和精致中式造型。',
  tongzhuang: '童装以舒适和上镜为重点，适合亲子照、节日活动和学生主题。',
  hanfu: '汉服与新中式款更适合礼仪、活动、国风拍摄和文艺场景。'
}

Page({
  data: {
    statusBarHeight: 44,
    categories: [],
    clothingList: [],
    activeCategory: 'all',
    currentBanner: '',
    currentDesc: categoryDesc.all,
    selectionCount: 0,
    isLoadingAssets: true
  },

  onLoad() {
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      categories: data.categories,
      currentDesc: categoryDesc.all,
      selectionCount: selection.getSelectionList().length,
      isLoadingAssets: true
    })

    this.loadCategoryAssets('all')
  },

  async loadCategoryAssets(id) {
    const loadToken = (this._categoryLoadToken || 0) + 1
    this._categoryLoadToken = loadToken

    try {
      const resolved = await resolveCloudUrls({
        currentBanner: categoryBanners[id] || categoryBanners.all,
        clothingList: toCardItems(data.getByCategory(id))
      })

      if (this._categoryLoadToken !== loadToken) return

      this.setData({
        activeCategory: id,
        currentBanner: resolved.currentBanner || '',
        currentDesc: categoryDesc[id] || categoryDesc.all,
        clothingList: this.decorateItems(resolved.clothingList),
        selectionCount: selection.getSelectionList().length,
        isLoadingAssets: false
      })
    } catch (err) {
      console.warn('load category assets failed', err)
      if (this._categoryLoadToken !== loadToken) return

      this.setData({
        activeCategory: id,
        currentDesc: categoryDesc[id] || categoryDesc.all,
        clothingList: this.decorateItems(toCardItems(data.getByCategory(id))),
        selectionCount: selection.getSelectionList().length,
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
    this.setData({
      activeCategory: id,
      currentDesc: categoryDesc[id] || categoryDesc.all,
      selectionCount: selection.getSelectionList().length,
      isLoadingAssets: true
    })

    this.loadCategoryAssets(id)
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
  }
})
