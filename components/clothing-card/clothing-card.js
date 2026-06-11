const app = getApp()

Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  data: {
    isLiked: false
  },

  observers: {
    'item.liked': function(liked) {
      this.setData({ isLiked: liked })
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { id: this.properties.item.id })
    },

    onLikeTap(e) {
      e.stopPropagation()
      const id = this.properties.item.id
      let favorites = app.globalData.favorites
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
    }
  }
})
