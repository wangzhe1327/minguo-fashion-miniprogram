const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = 'appointments'

function sanitizeText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function sanitizePhone(value) {
  return sanitizeText(value, 30).replace(/[^\d+\-\s]/g, '').slice(0, 30)
}

function sanitizeItem(item, index) {
  const id = parseInt(item.id, 10)

  return {
    id: Number.isFinite(id) ? id : index + 1,
    name: sanitizeText(item.name, 120),
    category: sanitizeText(item.category, 40),
    categoryName: sanitizeText(item.categoryName, 40),
    rackCode: sanitizeText(item.rackCode, 10),
    rackLabel: sanitizeText(item.rackLabel, 20),
    subtitle: sanitizeText(item.subtitle, 160),
    image: sanitizeText(item.image || item.fileID || item.fileId, 500)
  }
}

function makeAppointmentNo() {
  const date = new Date()
  const day = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('')
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `AP${day}${random}`
}

async function ensureCollection() {
  try {
    await db.createCollection(COLLECTION)
  } catch (err) {
    const message = String(err && err.message)
    if (!message.includes('already exists') && !message.includes('Collection already exists')) {
      console.warn('ensure appointments collection skipped', err)
    }
  }
}

exports.main = async event => {
  const wxContext = cloud.getWXContext()
  const form = event.form || {}
  const items = (event.items || [])
    .map(sanitizeItem)
    .filter(item => item.name)
  const date = sanitizeText(form.date || event.date, 30)
  const contactPhone = sanitizePhone(form.contactPhone || event.contactPhone)

  if (!items.length) return { ok: false, error: 'EMPTY_ITEMS' }
  if (items.length > 50) return { ok: false, error: 'TOO_MANY_ITEMS' }
  if (!date) return { ok: false, error: 'DATE_REQUIRED' }
  if (!contactPhone) return { ok: false, error: 'PHONE_REQUIRED' }

  const now = db.serverDate()
  const appointmentNo = makeAppointmentNo()
  const appointment = {
    appointmentNo,
    openid: wxContext.OPENID,
    status: 'submitted',
    scene: sanitizeText(form.scene || event.scene, 80),
    date,
    people: sanitizeText(form.people || event.people, 30),
    remark: sanitizeText(form.remark || event.remark, 300),
    contactName: sanitizeText(form.contactName || event.contactName, 40),
    contactPhone,
    itemCount: items.length,
    racksText: sanitizeText(event.racksText, 120),
    categoriesText: sanitizeText(event.categoriesText, 120),
    items,
    source: 'selection',
    createdAt: now,
    updatedAt: now,
    statusLogs: [
      {
        status: 'submitted',
        text: '用户提交服装预约清单',
        createdAt: now
      }
    ]
  }

  await ensureCollection()
  const res = await db.collection(COLLECTION).add({ data: appointment })

  return {
    ok: true,
    appointment: {
      id: res._id,
      appointmentNo,
      status: appointment.status,
      date,
      itemCount: items.length
    }
  }
}
