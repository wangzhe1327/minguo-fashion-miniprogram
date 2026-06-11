const { getStatusBarHeight } = require('../../utils/system.js')
const config = require('../../utils/retouchConfig.js')
const retouchOrders = require('../../utils/retouchOrders.js')
const photoAlbums = require('../../utils/photoAlbums.js')

Page({
  data: {
    statusBarHeight: 44,
    draft: null,
    photos: [],
    packages: config.packages,
    effects: config.effects,
    deliveries: config.deliveries,
    packageId: 'portrait',
    effectId: 'minguo-film',
    deliveryId: 'standard',
    intensity: 60,
    amount: 0,
    form: {
      contactName: '',
      contactPhone: '',
      remark: ''
    },
    acceptedTerms: false,
    submitting: false,
    ordersLoading: false,
    orders: [],
    savingResult: false
  },

  onLoad() {
    this.setData({ statusBarHeight: getStatusBarHeight() })
    this.loadDraft()
    this.loadOrders()
  },

  onShow() {
    this.loadDraft()
    this.loadOrders()
  },

  loadDraft() {
    const draft = wx.getStorageSync('retouchDraft') || null
    const photos = ((draft && draft.photos) || []).map(photo => ({
      ...photo,
      displayUrl: photo.displayUrl || photo.tempFileURL || photo.url || ''
    }))

    this.setData({
      draft,
      photos,
      amount: config.estimateAmount(photos.length, this.data.packageId, this.data.deliveryId)
    })
  },

  async loadOrders() {
    if (this.data.ordersLoading) return

    this.setData({ ordersLoading: true })
    try {
      const orders = await retouchOrders.listRetouchOrders()
      this.setData({ orders })
    } catch (err) {
      wx.showToast({ title: retouchOrders.getErrorMessage(err), icon: 'none' })
    } finally {
      this.setData({ ordersLoading: false })
    }
  },

  updateAmount(nextData) {
    const packageId = nextData.packageId || this.data.packageId
    const deliveryId = nextData.deliveryId || this.data.deliveryId
    const amount = config.estimateAmount(this.data.photos.length, packageId, deliveryId)
    this.setData({ ...nextData, amount })
  },

  selectPackage(e) {
    this.updateAmount({ packageId: e.currentTarget.dataset.id })
  },

  selectEffect(e) {
    this.setData({ effectId: e.currentTarget.dataset.id })
  },

  selectDelivery(e) {
    this.updateAmount({ deliveryId: e.currentTarget.dataset.id })
  },

  onIntensityChange(e) {
    this.setData({ intensity: e.detail.value })
  },

  onNameInput(e) {
    this.setData({ 'form.contactName': e.detail.value })
  },

  onPhoneInput(e) {
    this.setData({ 'form.contactPhone': e.detail.value })
  },

  onRemarkInput(e) {
    this.setData({ 'form.remark': e.detail.value })
  },

  toggleTerms() {
    this.setData({ acceptedTerms: !this.data.acceptedTerms })
  },

  previewDraftPhoto(e) {
    const current = e.currentTarget.dataset.url
    const urls = this.data.photos.map(photo => photo.displayUrl).filter(Boolean)
    if (!current || !urls.length) return

    wx.previewImage({ current, urls })
  },

  previewResult(e) {
    const current = e.currentTarget.dataset.url
    const orderId = e.currentTarget.dataset.orderId
    const order = this.data.orders.find(item => item.id === orderId)
    const urls = order ? (order.resultPhotos || []).map(photo => photo.displayUrl).filter(Boolean) : []
    if (!current || !urls.length) return

    wx.previewImage({ current, urls })
  },

  async saveResult(e) {
    if (this.data.savingResult) return

    const orderId = e.currentTarget.dataset.orderId
    const photoId = e.currentTarget.dataset.photoId
    const order = this.data.orders.find(item => item.id === orderId)
    const photo = order && (order.resultPhotos || []).find(item => item.id === photoId)
    if (!photo) return

    this.setData({ savingResult: true })
    try {
      await photoAlbums.savePhotoToAlbum({
        ...photo,
        tempFileURL: photo.displayUrl || photo.tempFileURL
      })
      wx.showToast({ title: '已保存成片', icon: 'success' })
    } catch (err) {
      wx.showToast({ title: '保存失败，请重试', icon: 'none' })
    } finally {
      this.setData({ savingResult: false })
    }
  },

  goGallery() {
    wx.navigateTo({ url: '/pages/gallery/gallery' })
  },

  async submitOrder() {
    if (this.data.submitting) return

    if (!this.data.photos.length) {
      wx.showToast({ title: '请先选择照片', icon: 'none' })
      return
    }

    if (!this.data.acceptedTerms) {
      wx.showToast({ title: '请先确认服务说明', icon: 'none' })
      return
    }

    this.setData({ submitting: true })
    try {
      const draft = this.data.draft || {}
      const order = await retouchOrders.createRetouchOrder({
        albumId: draft.albumId || '',
        albumTitle: draft.albumTitle || '',
        pickupCode: draft.pickupCode || '',
        photos: this.data.photos,
        packageId: this.data.packageId,
        effectId: this.data.effectId,
        deliveryId: this.data.deliveryId,
        intensity: this.data.intensity,
        remark: this.data.form.remark,
        contactName: this.data.form.contactName,
        contactPhone: this.data.form.contactPhone,
        acceptedTerms: this.data.acceptedTerms
      })

      wx.showModal({
        title: '已提交精修需求',
        content: `订单 ${order.orderNo} 已进入处理队列，预估费用 ¥${order.amount}。`,
        showCancel: false
      })
      wx.removeStorageSync('retouchDraft')
      this.setData({
        draft: null,
        photos: [],
        acceptedTerms: false,
        amount: 0
      })
      this.loadOrders()
    } catch (err) {
      wx.showToast({ title: retouchOrders.getErrorMessage(err), icon: 'none' })
    } finally {
      this.setData({ submitting: false })
    }
  }
})
