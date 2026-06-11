const { clothingImage, resolveCloudUrls } = require('../../utils/cloudAssets.js')
const { getStatusBarHeight } = require('../../utils/system.js')
const selection = require('../../utils/selection.js')
const data = require('../../utils/data.js')
const app = getApp()

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
    selectionCount: 0
  },

  async onLoad() {
    const currentBanner = await resolveCloudUrls(categoryBanners.all)
    const clothingList = await resolveCloudUrls(data.clothingList)

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      categories: data.categories,
      currentBanner,
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
    const currentBanner = await resolveCloudUrls(categoryBanners[id] || categoryBanners.all)
    const clothingList = await resolveCloudUrls(data.getByCategory(id))

    this.setData({
      activeCategory: id,
      currentBanner,
      currentDesc: categoryDesc[id] || categoryDesc.all,
      clothingList: this.decorateItems(clothingList),
      selectionCount: selection.getSelectionList().length
    })
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
