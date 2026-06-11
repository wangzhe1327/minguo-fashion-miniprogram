const config = require('./retouchConfig.js')

function callFunction(name, data) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data,
      success: res => resolve(res.result || {}),
      fail: reject
    })
  })
}

async function createRetouchOrder(payload) {
  const result = await callFunction('createRetouchOrder', payload)

  if (!result.ok) {
    throw new Error(result.error || 'CREATE_FAILED')
  }

  return result.order
}

async function listRetouchOrders() {
  const result = await callFunction('listRetouchOrders', {})

  if (!result.ok) {
    throw new Error(result.error || 'LIST_FAILED')
  }

  return (result.orders || []).map(config.enrichOrder)
}

function getErrorMessage(err) {
  const message = String((err && err.message) || err || '')
  const map = {
    EMPTY_PHOTOS: '请先选择需要精修的照片',
    TOO_MANY_PHOTOS: '单次最多提交 30 张照片',
    INVALID_PACKAGE: '请选择精修套餐',
    INVALID_EFFECT: '请选择特效风格',
    INVALID_DELIVERY: '请选择交付时效',
    TERMS_REQUIRED: '请先确认服务说明',
    CREATE_FAILED: '提交失败，请稍后再试',
    LIST_FAILED: '订单读取失败'
  }

  return map[message] || '操作失败，请稍后再试'
}

module.exports = {
  createRetouchOrder,
  listRetouchOrders,
  getErrorMessage
}
