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

function getSelectionSummary(items) {
  const list = items || []
  const racks = Array.from(new Set(list
    .map(item => item.rackLabel || (item.rackCode ? `${item.rackCode}区` : ''))
    .filter(Boolean)
  ))
  const categories = Array.from(new Set(list.map(item => item.categoryName || item.category).filter(Boolean)))
  return {
    count: list.length,
    racksText: racks.length ? racks.join('、') : '未选择',
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

  list.forEach(item => {
    const rackLabel = item.rackLabel || (item.rackCode ? `${item.rackCode}区` : '未分区')
    lines.push(`- ${rackLabel}｜${item.name}｜${item.categoryName || item.category || '分类待确认'}`)
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
