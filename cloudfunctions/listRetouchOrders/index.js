const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = 'retouchOrders'

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

function formatOrder(order, urlMap) {
  const photos = (order.photos || []).map(photo => ({
    ...photo,
    displayUrl: photo.tempFileURL || urlMap[photo.fileID] || ''
  }))
  const resultPhotos = (order.resultPhotos || []).map(photo => ({
    ...photo,
    displayUrl: photo.tempFileURL || urlMap[photo.fileID] || ''
  }))

  return {
    id: order._id,
    orderNo: order.orderNo,
    status: order.status,
    albumTitle: order.albumTitle,
    pickupCode: order.pickupCode,
    photos,
    resultPhotos,
    packageId: order.packageId,
    effectId: order.effectId,
    deliveryId: order.deliveryId,
    intensity: order.intensity,
    amount: order.amount,
    remark: order.remark,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    statusLogs: order.statusLogs || []
  }
}

async function ensureCollection() {
  try {
    await db.createCollection(COLLECTION)
  } catch (err) {
    const message = String(err && err.message)
    if (!message.includes('already exists') && !message.includes('Collection already exists')) {
      console.warn('ensure retouchOrders collection skipped', err)
    }
  }
}

exports.main = async () => {
  const wxContext = cloud.getWXContext()
  await ensureCollection()

  let res
  try {
    res = await db.collection(COLLECTION)
      .where({ openid: wxContext.OPENID })
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()
  } catch (err) {
    console.warn('list retouch orders failed', err)
    return { ok: true, orders: [] }
  }

  const fileIDs = []
  ;(res.data || []).forEach(order => {
    ;(order.photos || []).forEach(photo => photo.fileID && fileIDs.push(photo.fileID))
    ;(order.resultPhotos || []).forEach(photo => photo.fileID && fileIDs.push(photo.fileID))
  })

  const urlMap = await getTempFileURLs(fileIDs)

  return {
    ok: true,
    orders: (res.data || []).map(order => formatOrder(order, urlMap))
  }
}
