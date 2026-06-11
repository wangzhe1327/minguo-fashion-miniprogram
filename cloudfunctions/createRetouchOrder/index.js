const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = 'retouchOrders'

const packages = {
  basic: { name: '基础精修', price: 19 },
  portrait: { name: '人像精修', price: 39 },
  commercial: { name: '商业精修', price: 69 }
}

const effects = {
  natural: '自然通透',
  'minguo-film': '民国胶片',
  'soft-light': '柔光肤感',
  cinematic: '电影暗调',
  'old-photo': '旧照颗粒'
}

const deliveries = {
  standard: { name: '标准交付', multiplier: 1 },
  rush: { name: '加急交付', multiplier: 1.3 },
  express: { name: '特急交付', multiplier: 1.8 }
}

function normalizeCode(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '')
}

function sanitizeText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function sanitizePhoto(photo, index) {
  return {
    id: sanitizeText(photo.id || `photo_${index + 1}`, 80),
    name: sanitizeText(photo.name || `照片 ${index + 1}`, 80),
    fileID: sanitizeText(photo.fileID || photo.fileId || '', 300),
    tempFileURL: sanitizeText(photo.tempFileURL || photo.url || '', 800),
    retouched: Boolean(photo.retouched)
  }
}

function makeOrderNo() {
  const date = new Date()
  const day = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('')
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `RT${day}${random}`
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

exports.main = async event => {
  const wxContext = cloud.getWXContext()
  const photos = (event.photos || []).map(sanitizePhoto).filter(photo => photo.fileID || photo.tempFileURL)
  const packageId = sanitizeText(event.packageId, 40)
  const effectId = sanitizeText(event.effectId, 40)
  const deliveryId = sanitizeText(event.deliveryId, 40)
  const currentPackage = packages[packageId]
  const effectName = effects[effectId]
  const delivery = deliveries[deliveryId]

  if (!photos.length) return { ok: false, error: 'EMPTY_PHOTOS' }
  if (photos.length > 30) return { ok: false, error: 'TOO_MANY_PHOTOS' }
  if (!currentPackage) return { ok: false, error: 'INVALID_PACKAGE' }
  if (!effectName) return { ok: false, error: 'INVALID_EFFECT' }
  if (!delivery) return { ok: false, error: 'INVALID_DELIVERY' }
  if (!event.acceptedTerms) return { ok: false, error: 'TERMS_REQUIRED' }

  const amount = Math.round(currentPackage.price * photos.length * delivery.multiplier)
  const now = db.serverDate()
  const orderNo = makeOrderNo()
  const order = {
    orderNo,
    openid: wxContext.OPENID,
    status: 'submitted',
    albumId: sanitizeText(event.albumId, 80),
    albumTitle: sanitizeText(event.albumTitle, 120),
    pickupCode: normalizeCode(event.pickupCode),
    photos,
    resultPhotos: [],
    packageId,
    packageName: currentPackage.name,
    effectId,
    effectName,
    deliveryId,
    deliveryName: delivery.name,
    intensity: Math.max(0, Math.min(100, parseInt(event.intensity, 10) || 60)),
    amount,
    remark: sanitizeText(event.remark, 300),
    contactName: sanitizeText(event.contactName, 40),
    contactPhone: sanitizeText(event.contactPhone, 30),
    acceptedTerms: Boolean(event.acceptedTerms),
    createdAt: now,
    updatedAt: now,
    statusLogs: [
      {
        status: 'submitted',
        text: '用户提交精修特效需求',
        createdAt: now
      }
    ]
  }

  await ensureCollection()
  const res = await db.collection(COLLECTION).add({ data: order })

  return {
    ok: true,
    order: {
      id: res._id,
      orderNo,
      status: order.status,
      amount,
      photoCount: photos.length
    }
  }
}
