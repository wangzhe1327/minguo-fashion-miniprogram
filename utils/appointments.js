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

async function createAppointment(payload) {
  const result = await callFunction('createAppointment', payload)

  if (!result.ok) {
    throw new Error(result.error || 'CREATE_FAILED')
  }

  return result.appointment
}

function getErrorMessage(err) {
  const message = String((err && err.message) || err || '')
  const map = {
    EMPTY_ITEMS: '请先选择需要预约的衣服',
    TOO_MANY_ITEMS: '单次预约最多选择 50 件衣服',
    DATE_REQUIRED: '请先选择预约日期',
    PHONE_REQUIRED: '请填写联系电话，方便确认预约',
    CREATE_FAILED: '预约提交失败，请稍后再试'
  }

  return map[message] || '预约提交失败，请稍后再试'
}

module.exports = {
  createAppointment,
  getErrorMessage
}
