const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const { getStatusBarHeight } = require('../../utils/system.js')
const selection = require('../../utils/selection.js')

const scenes = ['拍摄写真', '活动演出', '亲子/学生', '日常穿搭', '其他用途']

Page({
  data: {
    statusBarHeight: 44,
    items: [],
    summary: {
      count: 0,
      totalText: '待确认',
      categoriesText: '未选择'
    },
    scenes,
    sceneIndex: 0,
    form: {
      scene: scenes[0],
      date: '',
      people: '',
      remark: ''
    }
  },

  onLoad() {
    this.setData({ statusBarHeight: getStatusBarHeight() })
  },

  onShow() {
    this.loadSelection()
  },

  async loadSelection() {
    const ids = selection.getSelectionList()
    const rawItems = ids.map(id => data.getById(id)).filter(Boolean)
    const items = await resolveCloudUrls(rawItems)

    this.setData({
      items,
      summary: selection.getSelectionSummary(items)
    })
  },

  onSceneChange(e) {
    const sceneIndex = parseInt(e.detail.value, 10)
    this.setData({
      sceneIndex,
      'form.scene': scenes[sceneIndex]
    })
  },

  onDateChange(e) {
    this.setData({ 'form.date': e.detail.value })
  },

  onPeopleInput(e) {
    this.setData({ 'form.people': e.detail.value })
  },

  onRemarkInput(e) {
    this.setData({ 'form.remark': e.detail.value })
  },

  removeItem(e) {
    const id = e.currentTarget.dataset.id
    selection.removeSelection(id)
    wx.showToast({ title: '已移出清单', icon: 'none' })
    this.loadSelection()
  },

  clearAll() {
    if (!this.data.items.length) return

    wx.showModal({
      title: '清空选款清单',
      content: '确定移出当前清单中的所有服装吗？',
      confirmText: '清空',
      confirmColor: '#B43D32',
      success: res => {
        if (!res.confirm) return
        selection.clearSelection()
        this.loadSelection()
      }
    })
  },

  copyConsult() {
    if (!this.data.items.length) {
      wx.showToast({ title: '请先加入服装', icon: 'none' })
      return
    }

    const text = selection.buildConsultText(this.data.items, this.data.form)
    wx.setClipboardData({
      data: text,
      success: () => wx.showToast({ title: '咨询单已复制', icon: 'success' })
    })
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
