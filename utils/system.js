function getStatusBarHeight() {
  if (typeof wx === 'undefined') return 44

  if (wx.getWindowInfo) {
    const windowInfo = wx.getWindowInfo()
    return windowInfo.statusBarHeight || 44
  }

  return 44
}

module.exports = {
  getStatusBarHeight
}
