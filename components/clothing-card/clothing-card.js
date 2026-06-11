const app = getApp()
const selection = require('../../utils/selection.js')

Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  data: {
    isLiked: false,
    isSelected: false,
    imageError: false
  },

  observers: {
    'item.liked,item.selected,item.image': function(liked, selected) {
      this.setData({
        isLiked: Boolean(liked),
        isSelected: Boolean(selected),
        imageError: false
      })
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { id: this.properties.item.id })
    },

    onImageError() {
      this.setData({ imageError: true })
    },

    onLikeTap(e) {
      if (e && e.stopPropagation) e.stopPropagation()

      const id = this.properties.item.id
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
      this.triggerEvent('likechange', { id, liked: index === -1 })
    },

    onSelectTap(e) {
      if (e && e.stopPropagation) e.stopPropagation()

      const id = this.properties.item.id
      const nextSelected = !this.data.isSelected

      if (nextSelected) {
        selection.addSelection(id)
        wx.showToast({ title: '已加入清单', icon: 'success' })
      } else {
        selection.removeSelection(id)
        wx.showToast({ title: '已移出清单', icon: 'none' })
      }

      this.setData({ isSelected: nextSelected })
      this.triggerEvent('selectchange', { id, selected: nextSelected })
    }
  }
})
