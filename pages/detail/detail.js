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

Page({
  data: {
    statusBarHeight: 44,
    item: {},
    specs: [],
    recommendations: [],
    styleTips: [],
    isLiked: false,
    isSelected: false
  },

  async onLoad(options) {
    const id = parseInt(options.id, 10)
    const rawItem = data.getById(id)

    if (!rawItem) {
      wx.showToast({ title: '服装不存在', icon: 'error' })
      setTimeout(() => wx.navigateBack(), 1200)
      return
    }

    const resolved = await resolveCloudUrls({
      item: rawItem,
      recommendations: data.clothingList
      .filter(clothing => clothing.category === rawItem.category && clothing.id !== rawItem.id)
      .slice(0, 6)
      .map(toCardItem)
    })

    this.recordBrowse(rawItem.id)

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      item: resolved.item,
      specs: this.parseSpecs(rawItem.detailDesc),
      recommendations: this.decorateItems(resolved.recommendations),
      styleTips: this.getStyleTips(rawItem),
      isLiked: (app.globalData.favorites || []).includes(rawItem.id),
      isSelected: selection.isSelected(rawItem.id)
    })
  },

  onShow() {
    if (!this.data.item.id) return

    this.setData({
      isLiked: (app.globalData.favorites || []).includes(this.data.item.id),
      isSelected: selection.isSelected(this.data.item.id),
      recommendations: this.decorateItems(this.data.recommendations)
    })
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

  parseSpecs(desc) {
    return String(desc || '')
      .split(/\n|\\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const index = line.search(/[:：]/)
        if (index === -1) {
          return { label: '说明', value: line }
        }
        return {
          label: line.slice(0, index),
          value: line.slice(index + 1)
        }
      })
  },

  getStyleTips(item) {
    if (Array.isArray(item.styleTips) && item.styleTips.length) {
      return item.styleTips
    }

    const common = ['下单前建议确认身高、胸围、腰围和使用日期。']

    if (item.category === 'qipao') {
      return ['适合复古写真、晚宴、中式主题活动。', '可搭配披肩、团扇、珍珠包提升完整度。'].concat(common)
    }

    if (item.category === 'tongzhuang') {
      return ['适合亲子照、儿童节、学校活动和家庭纪念照。', '儿童款建议优先确认身高和活动舒适度。'].concat(common)
    }

    if (item.category === 'hanfu') {
      return ['适合国风拍摄、礼仪活动、舞台表演和新中式场景。', '建议同步确认发饰、鞋履和外搭是否需要。'].concat(common)
    }

    return ['适合主题拍摄、活动演出和日常搭配。'].concat(common)
  },

  recordBrowse(id) {
    const browseCount = wx.getStorageSync('browseCount') || 0
    const history = wx.getStorageSync('browseHistory') || []
    const nextHistory = [id].concat(history.filter(itemId => itemId !== id)).slice(0, 30)

    wx.setStorageSync('browseCount', browseCount + 1)
    wx.setStorageSync('browseHistory', nextHistory)
  },

  goBack() {
    wx.navigateBack()
  },

  toggleLike() {
    const id = this.data.item.id
    const favorites = app.globalData.favorites || []
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

  toggleSelection() {
    const id = this.data.item.id
    const nextSelected = !this.data.isSelected

    if (nextSelected) {
      selection.addSelection(id)
      wx.showToast({ title: '已加入清单', icon: 'success' })
    } else {
      selection.removeSelection(id)
      wx.showToast({ title: '已移出清单', icon: 'none' })
    }

    this.setData({ isSelected: nextSelected })
  },

  goSelection() {
    wx.switchTab({ url: '/pages/selection/selection' })
  },

  onCopyConsult() {
    const text = selection.buildConsultText([this.data.item], {
      scene: '单款咨询',
      date: '待确定',
      people: 1,
      remark: '想了解库存、尺码建议和搭配方案。'
    })

    wx.setClipboardData({
      data: text,
      success: () => wx.showToast({ title: '咨询内容已复制', icon: 'success' })
    })
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
    wx.redirectTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
