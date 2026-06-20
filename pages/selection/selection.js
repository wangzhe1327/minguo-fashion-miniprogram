const data = require('../../utils/data.js')
const { resolveCloudUrls } = require('../../utils/cloudAssets.js')
const { getStatusBarHeight } = require('../../utils/system.js')
const selection = require('../../utils/selection.js')
const appointments = require('../../utils/appointments.js')

const scenes = ['拍摄写真', '活动演出', '亲子/学生', '日常穿搭', '其他用途']

Page({
  data: {
    statusBarHeight: 44,
    items: [],
    summary: {
      count: 0,
      racksText: '未选择',
      categoriesText: '未选择'
    },
    isSubmittingAppointment: false,
    scenes,
    sceneIndex: 0,
    form: {
      scene: scenes[0],
      date: '',
      people: '',
      contactName: '',
      contactPhone: '',
      remark: ''
    }
  },

  onLoad() {
    const contact = wx.getStorageSync('appointmentContact') || {}

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      'form.contactName': contact.contactName || '',
      'form.contactPhone': contact.contactPhone || ''
    })
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

  onContactNameInput(e) {
    this.setData({ 'form.contactName': e.detail.value })
  },

  onContactPhoneInput(e) {
    this.setData({ 'form.contactPhone': e.detail.value })
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

  buildAppointmentItems() {
    return (this.data.items || []).map(item => {
      const source = data.getById(item.id) || item

      return {
        id: source.id,
        name: source.name,
        category: source.category,
        categoryName: source.categoryName,
        rackCode: source.rackCode,
        rackLabel: source.rackLabel,
        subtitle: source.subtitle,
        image: source.image
      }
    })
  },

  validateAppointment() {
    const form = this.data.form

    if (!this.data.items.length) return '请先选择需要预约的衣服'
    if (!form.date) return '请先选择预约日期'
    if (!String(form.contactPhone || '').trim()) return '请填写联系电话'
    return ''
  },

  submitAppointment() {
    if (this.data.isSubmittingAppointment) return

    const error = this.validateAppointment()
    if (error) {
      wx.showToast({ title: error, icon: 'none' })
      return
    }

    wx.showModal({
      title: '确认提交预约',
      content: `日期：${this.data.form.date}\n衣服：${this.data.items.length} 件（${this.data.summary.racksText}）`,
      confirmText: '提交',
      confirmColor: '#7C3F22',
      success: res => {
        if (!res.confirm) return
        this.createAppointment()
      }
    })
  },

  async createAppointment() {
    this.setData({ isSubmittingAppointment: true })
    wx.showLoading({ title: '提交中' })

    try {
      const form = this.data.form
      const appointment = await appointments.createAppointment({
        form,
        items: this.buildAppointmentItems(),
        racksText: this.data.summary.racksText,
        categoriesText: this.data.summary.categoriesText
      })

      wx.setStorageSync('appointmentContact', {
        contactName: form.contactName,
        contactPhone: form.contactPhone
      })

      selection.clearSelection()
      await this.loadSelection()

      wx.showModal({
        title: '预约已提交',
        content: `预约编号：${appointment.appointmentNo}\n你的预约清单已保存，店家会查看后联系确认。`,
        showCancel: false,
        confirmText: '知道了'
      })
    } catch (err) {
      wx.showToast({
        title: appointments.getErrorMessage(err),
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
      this.setData({ isSubmittingAppointment: false })
    }
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
