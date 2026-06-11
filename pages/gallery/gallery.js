const { getStatusBarHeight } = require('../../utils/system.js')
const photoAlbums = require('../../utils/photoAlbums.js')

Page({
  data: {
    statusBarHeight: 44,
    pickupCode: '',
    album: null,
    photos: [],
    selectedIds: [],
    loading: false,
    saving: false,
    progressText: ''
  },

  onLoad(options) {
    const pickupCode = photoAlbums.normalizePickupCode(options.code || wx.getStorageSync('lastPickupCode') || '')

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      pickupCode
    })

    if (options.code) {
      this.searchAlbum()
    }
  },

  goBack() {
    wx.navigateBack()
  },

  onCodeInput(e) {
    this.setData({
      pickupCode: photoAlbums.normalizePickupCode(e.detail.value)
    })
  },

  async searchAlbum() {
    if (this.data.loading) return

    const pickupCode = photoAlbums.normalizePickupCode(this.data.pickupCode)
    if (!pickupCode) {
      wx.showToast({ title: '请输入取片码', icon: 'none' })
      return
    }

    this.setData({
      loading: true,
      progressText: '',
      album: null,
      photos: [],
      selectedIds: []
    })

    try {
      const album = await photoAlbums.getPhotoAlbum(pickupCode)
      const selectedIds = album.photos.map(photo => photo.id)

      wx.setStorageSync('lastPickupCode', pickupCode)
      this.setData({
        album,
        selectedIds,
        photos: this.decoratePhotos(album.photos, selectedIds)
      })
    } catch (err) {
      wx.showToast({ title: photoAlbums.getErrorMessage(err), icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  },

  decoratePhotos(photos, selectedIds) {
    return (photos || []).map(photo => ({
      ...photo,
      selected: selectedIds.includes(photo.id),
      displayUrl: photo.tempFileURL || photo.url || ''
    }))
  },

  togglePhoto(e) {
    const id = e.currentTarget.dataset.id
    const selectedIds = this.data.selectedIds.slice()
    const index = selectedIds.indexOf(id)

    if (index > -1) {
      selectedIds.splice(index, 1)
    } else {
      selectedIds.push(id)
    }

    this.setData({
      selectedIds,
      photos: this.decoratePhotos(this.data.photos, selectedIds)
    })
  },

  toggleAll() {
    const selectedIds = this.data.selectedIds.length === this.data.photos.length
      ? []
      : this.data.photos.map(photo => photo.id)

    this.setData({
      selectedIds,
      photos: this.decoratePhotos(this.data.photos, selectedIds)
    })
  },

  previewPhoto(e) {
    const current = e.currentTarget.dataset.url
    const urls = this.data.photos.map(photo => photo.displayUrl).filter(Boolean)

    if (!current || !urls.length) return

    wx.previewImage({ current, urls })
  },

  async saveOne(e) {
    const id = e.currentTarget.dataset.id
    const photo = this.data.photos.find(item => item.id === id)
    if (!photo || this.data.saving) return

    this.setData({ saving: true, progressText: '正在保存 1/1' })

    try {
      await photoAlbums.savePhotoToAlbum(photo)
      wx.showToast({ title: '已保存到相册', icon: 'success' })
    } catch (err) {
      wx.showToast({ title: '保存失败，请重试', icon: 'none' })
    } finally {
      this.setData({ saving: false, progressText: '' })
    }
  },

  async saveSelected() {
    if (this.data.saving) return

    const selected = this.data.photos.filter(photo => this.data.selectedIds.includes(photo.id))
    if (!selected.length) {
      wx.showToast({ title: '请选择照片', icon: 'none' })
      return
    }

    this.setData({ saving: true })

    let savedCount = 0
    try {
      for (let i = 0; i < selected.length; i += 1) {
        this.setData({ progressText: `正在保存 ${i + 1}/${selected.length}` })
        await photoAlbums.savePhotoToAlbum(selected[i])
        savedCount += 1
      }

      wx.showToast({ title: `已保存 ${savedCount} 张`, icon: 'success' })
    } catch (err) {
      wx.showModal({
        title: '保存中断',
        content: savedCount ? `已保存 ${savedCount} 张，剩余照片可稍后继续保存。` : '照片保存失败，请检查网络或相册权限。',
        showCancel: false
      })
    } finally {
      this.setData({ saving: false, progressText: '' })
    }
  },

  goRetouch() {
    const selected = this.data.photos.filter(photo => this.data.selectedIds.includes(photo.id))

    if (!selected.length) {
      wx.showToast({ title: '请先选择照片', icon: 'none' })
      return
    }

    wx.setStorageSync('retouchDraft', {
      albumId: this.data.album ? this.data.album.id : '',
      albumTitle: this.data.album ? this.data.album.title : '',
      pickupCode: photoAlbums.normalizePickupCode(this.data.pickupCode),
      photos: selected.map(photo => ({
        id: photo.id,
        name: photo.name,
        fileID: photo.fileID,
        tempFileURL: photo.tempFileURL,
        url: photo.url,
        displayUrl: photo.displayUrl,
        retouched: photo.retouched
      }))
    })

    wx.navigateTo({ url: '/pages/retouch/retouch' })
  }
})
