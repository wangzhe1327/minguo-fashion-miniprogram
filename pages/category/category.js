const { clothingImage, resolveCloudUrls } = require('../../utils/cloudAssets.js')
const data = require('../../utils/data.js')
const app = getApp()

const categoryBanners = {
  all: clothingImage(8),
  qipao: clothingImage(25),
  tongzhuang: clothingImage(1),
  hanfu: clothingImage(7)
}

const categoryDesc = {
  all: '精选传统服饰，涵盖旗袍、童装、汉服，展现东方美学。',
  qipao: '旗袍——东方女性的经典之美。修身剪裁，盘扣点缀，尽显优雅身姿。',
  tongzhuang: '童装——传承之美从小开始。儿童西装、旗袍、连衣裙，精致可爱。',
  hanfu: '汉服——华夏衣冠，礼仪之邦。马面裙、新中式套装，古典优雅。'
}

Page({
  data: {
    statusBarHeight: 44,
    categories: [],
    clothingList: [],
    activeCategory: 'all',
    currentBanner: '',
    currentDesc: categoryDesc.all
  },

  async onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    const currentBanner = await resolveCloudUrls(categoryBanners.all)
    const clothingList = await resolveCloudUrls(data.clothingList)
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight,
      categories: data.categories,
      currentBanner,
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
    const currentBanner = await resolveCloudUrls(categoryBanners[id] || categoryBanners.all)
    const clothingList = await resolveCloudUrls(data.getByCategory(id))
    const favorites = app.globalData.favorites

    this.setData({
      activeCategory: id,
      currentBanner,
      currentDesc: categoryDesc[id] || categoryDesc.all,
      clothingList: clothingList.map(item => ({
        ...item,
        liked: favorites.includes(item.id)
      }))
    })
  },

  onClothingTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})
