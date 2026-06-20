const { getStatusBarHeight } = require('../../utils/system.js')
const admin = require('../../utils/admin.js')

const SESSION_KEY = 'adminSession'

function pad(value) {
  return String(value).padStart(2, '0')
}

function formatTime(value) {
  if (!value) return '时间待同步'

  if (typeof value === 'object') {
    if (value.$date) value = value.$date
    if (value.seconds) value = value.seconds * 1000
    if (value._seconds) value = value._seconds * 1000
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '时间待同步'

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function getStatusText(status) {
  const map = {
    submitted: '已提交',
    confirmed: '已确认',
    cancelled: '已取消',
    completed: '已完成'
  }

  return map[status] || '已提交'
}

function decorateAppointment(item) {
  return {
    ...item,
    createdAtText: formatTime(item.createdAt),
    statusText: getStatusText(item.status),
    items: item.items || []
  }
}

Page({
  data: {
    statusBarHeight: 44,
    username: '',
    password: '',
    token: '',
    isLoggedIn: false,
    isLoggingIn: false,
    isLoading: false,
    appointments: []
  },

  onLoad() {
    const session = wx.getStorageSync(SESSION_KEY) || {}
    const isLoggedIn = Boolean(session.token && session.expiresAt > Date.now())

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      token: isLoggedIn ? session.token : '',
      isLoggedIn
    })

    if (isLoggedIn) {
      this.loadAppointments()
    } else {
      wx.removeStorageSync(SESSION_KEY)
    }
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  async onAdminLogin() {
    if (this.data.isLoggingIn) return

    const username = String(this.data.username || '').trim()
    const password = String(this.data.password || '')

    if (!username || !password) {
      wx.showToast({ title: '请输入账号和密码', icon: 'none' })
      return
    }

    this.setData({ isLoggingIn: true })
    wx.showLoading({ title: '登录中' })

    try {
      const session = await admin.loginAdmin(username, password)
      wx.setStorageSync(SESSION_KEY, session)
      this.setData({
        token: session.token,
        isLoggedIn: true,
        password: '',
        appointments: []
      })
      await this.loadAppointments()
    } catch (err) {
      wx.showToast({
        title: admin.getErrorMessage(err),
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
      this.setData({ isLoggingIn: false })
    }
  },

  async loadAppointments() {
    if (this.data.isLoading) return

    this.setData({ isLoading: true })

    try {
      const appointments = await admin.listAppointments(this.data.token)
      this.setData({
        appointments: appointments.map(decorateAppointment)
      })
    } catch (err) {
      const message = admin.getErrorMessage(err)
      if (message.indexOf('过期') > -1) {
        wx.removeStorageSync(SESSION_KEY)
        this.setData({
          token: '',
          isLoggedIn: false,
          appointments: []
        })
      }
      wx.showToast({ title: message, icon: 'none' })
    } finally {
      this.setData({ isLoading: false })
    }
  },

  onRefresh() {
    this.loadAppointments()
  },

  onLogout() {
    wx.removeStorageSync(SESSION_KEY)
    this.setData({
      token: '',
      isLoggedIn: false,
      username: '',
      password: '',
      appointments: []
    })
  },

  goBack() {
    wx.navigateBack()
  }
})
