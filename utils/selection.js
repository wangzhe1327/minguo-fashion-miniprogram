const STORAGE_KEY = 'selectionList'

function normalizeIds(ids) {
  return Array.from(new Set((ids || [])
    .map(id => parseInt(id, 10))
    .filter(id => Number.isFinite(id) && id > 0)))
}

function syncGlobal(ids) {
  const app = typeof getApp === 'function' ? getApp() : null
  if (app && app.globalData) {
    app.globalData.selectionList = ids
  }
}

function getSelectionList() {
  const ids = normalizeIds(wx.getStorageSync(STORAGE_KEY) || [])
  syncGlobal(ids)
  return ids
}

function saveSelectionList(ids) {
  const next = normalizeIds(ids)
  wx.setStorageSync(STORAGE_KEY, next)
  syncGlobal(next)
  return next
}

function isSelected(id) {
  return getSelectionList().includes(parseInt(id, 10))
}

function addSelection(id) {
  const ids = getSelectionList()
  const next = normalizeIds(ids.concat(parseInt(id, 10)))
  return saveSelectionList(next)
}

function removeSelection(id) {
  const target = parseInt(id, 10)
  return saveSelectionList(getSelectionList().filter(item => item !== target))
}

function clearSelection() {
  return saveSelectionList([])
}

function parsePrice(price) {
  const value = String(price || '').replace(/[^\d.]/g, '')
  return Number(value) || 0
}

function getSelectionSummary(items) {
  const list = items || []
  const total = list.reduce((sum, item) => sum + parsePrice(item.price), 0)
  const categories = Array.from(new Set(list.map(item => item.categoryName || item.category).filter(Boolean)))
  return {
    count: list.length,
    total,
    totalText: total ? `约 ¥${total}` : '待确认',
    categoriesText: categories.length ? categories.join('、') : '未选择'
  }
}

function buildConsultText(items, form) {
  const list = items || []
  const info = form || {}
  const lines = [
    '您好，我想咨询以下民国风服装：',
    '',
    `使用场景：${info.scene || '待沟通'}`,
    `使用日期：${info.date || '待确定'}`,
    `人数/件数：${info.people || list.length || '待确定'}`,
    info.remark ? `备注：${info.remark}` : '备注：暂无',
    '',
    '选款清单：'
  ]

  list.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}｜${item.categoryName || item.category || '分类待确认'}｜${item.price || '价格待确认'}`)
  })

  lines.push('')
  lines.push('麻烦帮我确认库存、尺码建议和搭配方案，谢谢。')
  return lines.join('\n')
}

module.exports = {
  getSelectionList,
  saveSelectionList,
  isSelected,
  addSelection,
  removeSelection,
  clearSelection,
  getSelectionSummary,
  buildConsultText
}
