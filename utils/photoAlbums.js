const { clothingImage, resolveCloudUrls } = require('./cloudAssets.js')

const DEMO_PICKUP_CODE = 'DEMO2026'

const demoPhotos = [
  { id: 'demo-01', name: '示例成片 01', fileID: clothingImage(8), retouched: true },
  { id: 'demo-02', name: '示例成片 02', fileID: clothingImage(25), retouched: true },
  { id: 'demo-03', name: '示例成片 03', fileID: clothingImage(7), retouched: false }
]

function normalizePickupCode(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '')
}

function callGetPhotoAlbum(pickupCode) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getPhotoAlbum',
      data: { pickupCode },
      success: res => resolve(res.result || {}),
      fail: reject
    })
  })
}

async function getDemoAlbum() {
  const urls = await resolveCloudUrls(demoPhotos.map(photo => photo.fileID))

  return {
    id: 'demo',
    title: '演示取片相册',
    customerName: '体验用户',
    photographer: '锦衣旧梦摄影师',
    shootDate: '2026-06-11',
    expireAt: '2026-12-31',
    notice: '真实使用时，请把客户成片上传到云存储并在 photoAlbums 集合中绑定取片码。',
    photos: demoPhotos.map((photo, index) => ({
      ...photo,
      tempFileURL: urls[index] || ''
    }))
  }
}

async function getPhotoAlbum(pickupCode) {
  const code = normalizePickupCode(pickupCode)

  if (!code) {
    throw new Error('EMPTY_CODE')
  }

  if (code === DEMO_PICKUP_CODE) {
    return getDemoAlbum()
  }

  const result = await callGetPhotoAlbum(code)
  if (result.ok && result.album) {
    return result.album
  }

  throw new Error(result.error || 'FETCH_FAILED')
}

function downloadByUrl(url) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success: res => {
        if (res.statusCode >= 200 && res.statusCode < 300 && res.tempFilePath) {
          resolve(res.tempFilePath)
        } else {
          reject(new Error(`DOWNLOAD_FAILED_${res.statusCode}`))
        }
      },
      fail: reject
    })
  })
}

function downloadByCloud(fileID) {
  return new Promise((resolve, reject) => {
    wx.cloud.downloadFile({
      fileID,
      success: res => resolve(res.tempFilePath),
      fail: reject
    })
  })
}

function saveImage(filePath) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath,
      success: resolve,
      fail: reject
    })
  })
}

function openAlbumSetting() {
  return new Promise(resolve => {
    wx.showModal({
      title: '需要相册权限',
      content: '请允许保存图片到系统相册。',
      confirmText: '去设置',
      success: modalRes => {
        if (!modalRes.confirm) {
          resolve(false)
          return
        }

        wx.openSetting({
          success: settingRes => {
            resolve(Boolean(settingRes.authSetting['scope.writePhotosAlbum']))
          },
          fail: () => resolve(false)
        })
      },
      fail: () => resolve(false)
    })
  })
}

function isAuthError(err) {
  const message = String((err && err.errMsg) || err || '')
  return message.includes('auth') || message.includes('authorize') || message.includes('permission')
}

async function savePhotoToAlbum(photo) {
  const source = photo.tempFileURL || photo.url || ''
  const filePath = source ? await downloadByUrl(source) : await downloadByCloud(photo.fileID)

  try {
    await saveImage(filePath)
    return true
  } catch (err) {
    if (!isAuthError(err)) {
      throw err
    }

    const allowed = await openAlbumSetting()
    if (!allowed) {
      throw err
    }

    await saveImage(filePath)
    return true
  }
}

function getErrorMessage(err) {
  const message = String((err && err.message) || err || '')
  const map = {
    EMPTY_CODE: '请输入取片码',
    INVALID_CODE: '取片码格式不正确',
    NOT_FOUND: '没有找到这个取片码',
    EXPIRED: '这个相册已过期',
    FETCH_FAILED: '相册读取失败'
  }

  return map[message] || '相册读取失败，请稍后再试'
}

module.exports = {
  DEMO_PICKUP_CODE,
  normalizePickupCode,
  getPhotoAlbum,
  savePhotoToAlbum,
  getErrorMessage
}
