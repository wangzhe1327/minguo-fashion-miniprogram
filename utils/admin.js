function callFunction(data) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'adminAppointments',
      data,
      success: res => resolve(res.result || {}),
      fail: reject
    })
  })
}

async function loginAdmin(username, password) {
  const result = await callFunction({
    action: 'login',
    username,
    password
  })

  if (!result.ok) {
    throw new Error(result.error || 'ADMIN_LOGIN_FAILED')
  }

  return {
    token: result.token,
    expiresAt: result.expiresAt
  }
}

async function listAppointments(token) {
  const result = await callFunction({
    action: 'list',
    token
  })

  if (!result.ok) {
    throw new Error(result.error || 'ADMIN_LIST_FAILED')
  }

  return result.appointments || []
}

function getErrorMessage(err) {
  const message = String((err && err.message) || err || '')
  const map = {
    INVALID_ADMIN_LOGIN: '账号或密码不正确',
    ADMIN_SESSION_EXPIRED: '管理员登录已过期，请重新登录',
    INVALID_ACTION: '管理员操作无效',
    ADMIN_LOGIN_FAILED: '管理员登录失败，请稍后再试',
    ADMIN_LIST_FAILED: '预约清单读取失败，请稍后再试'
  }

  return map[message] || '操作失败，请稍后再试'
}

module.exports = {
  loginAdmin,
  listAppointments,
  getErrorMessage
}
