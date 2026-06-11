const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = 'photoAlbums'

function normalizeCode(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '')
}

function isExpired(expireAt) {
  if (!expireAt) return false
  const expireTime = new Date(expireAt).getTime()
  return Number.isFinite(expireTime) && Date.now() > expireTime
}

async function getTempFileURLs(fileIDs) {
  const urlMap = {}
  const uniqueFileIDs = Array.from(new Set(fileIDs.filter(Boolean)))

  for (let i = 0; i < uniqueFileIDs.length; i += 20) {
    const batch = uniqueFileIDs.slice(i, i + 20)
    const res = await cloud.getTempFileURL({ fileList: batch })
    ;(res.fileList || []).forEach(item => {
      if (item.fileID && item.tempFileURL) {
        urlMap[item.fileID] = item.tempFileURL
      }
    })
  }

  return urlMap
}

exports.main = async event => {
  const pickupCode = normalizeCode(event.pickupCode)

  if (!/^[A-Z0-9-]{4,32}$/.test(pickupCode)) {
    return { ok: false, error: 'INVALID_CODE' }
  }

  const albumRes = await db.collection(COLLECTION)
    .where({
      pickupCode,
      status: 'published'
    })
    .limit(1)
    .get()

  const album = albumRes.data && albumRes.data[0]
  if (!album) {
    return { ok: false, error: 'NOT_FOUND' }
  }

  if (isExpired(album.expireAt)) {
    return { ok: false, error: 'EXPIRED' }
  }

  const photos = (album.photos || [])
    .map((photo, index) => ({
      id: String(photo.id || `${album._id}_${index}`),
      name: photo.name || `照片 ${index + 1}`,
      fileID: photo.fileID || photo.fileId || '',
      size: photo.size || '',
      width: photo.width || 0,
      height: photo.height || 0,
      retouched: Boolean(photo.retouched)
    }))
    .filter(photo => photo.fileID)

  const urlMap = await getTempFileURLs(photos.map(photo => photo.fileID))

  return {
    ok: true,
    album: {
      id: album._id,
      title: album.title || '摄影相册',
      customerName: album.customerName || '',
      photographer: album.photographer || '',
      shootDate: album.shootDate || '',
      expireAt: album.expireAt || '',
      notice: album.notice || '',
      photos: photos.map(photo => ({
        ...photo,
        tempFileURL: urlMap[photo.fileID] || ''
      }))
    }
  }
}
